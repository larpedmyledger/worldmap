import { writeFileSync } from "fs";

function flag(iso) {
  return [...iso.toUpperCase()]
    .map((c) => String.fromCodePoint(0x1f1e6 - 65 + c.charCodeAt(0)))
    .join("");
}

// [iso2, isoNumeric, frenchName, capital, continent, lat, lng, difficulty, funFact?]
const raw = [
  // Europe
  ["AL", "008", "Albanie", "Tirana", "europe", 41.15, 20.17, 2],
  ["DE", "276", "Allemagne", "Berlin", "europe", 51.17, 10.45, 1, "L'Allemagne est le pays le plus peuplé de l'Union européenne."],
  ["AD", "020", "Andorre", "Andorre-la-Vieille", "europe", 42.55, 1.6, 3],
  ["AT", "040", "Autriche", "Vienne", "europe", 47.52, 14.55, 1],
  ["BE", "056", "Belgique", "Bruxelles", "europe", 50.5, 4.47, 1, "Bruxelles accueille le siège de l'Union européenne."],
  ["BY", "112", "Biélorussie", "Minsk", "europe", 53.71, 27.95, 2],
  ["BA", "070", "Bosnie-Herzégovine", "Sarajevo", "europe", 43.92, 17.68, 2],
  ["BG", "100", "Bulgarie", "Sofia", "europe", 42.73, 25.49, 2],
  ["CY", "196", "Chypre", "Nicosie", "europe", 35.13, 33.43, 2],
  ["HR", "191", "Croatie", "Zagreb", "europe", 45.1, 15.2, 2],
  ["DK", "208", "Danemark", "Copenhague", "europe", 56.26, 9.5, 1],
  ["ES", "724", "Espagne", "Madrid", "europe", 40.46, -3.75, 1, "L'Espagne compte 17 communautés autonomes."],
  ["EE", "233", "Estonie", "Tallinn", "europe", 58.6, 25.01, 2],
  ["FI", "246", "Finlande", "Helsinki", "europe", 61.92, 25.75, 1],
  ["FR", "250", "France", "Paris", "europe", 46.23, 2.21, 1, "La France est le pays le plus visité au monde."],
  ["GR", "300", "Grèce", "Athènes", "europe", 39.07, 21.82, 1, "Athènes est l'une des plus anciennes capitales du monde."],
  ["HU", "348", "Hongrie", "Budapest", "europe", 47.16, 19.5, 2],
  ["IE", "372", "Irlande", "Dublin", "europe", 53.14, -7.69, 1],
  ["IS", "352", "Islande", "Reykjavik", "europe", 64.96, -19.02, 2],
  ["IT", "380", "Italie", "Rome", "europe", 41.87, 12.57, 1, "Rome est surnommée la Ville éternelle."],
  ["XK", "983", "Kosovo", "Pristina", "europe", 42.6, 20.9, 3],
  ["LV", "428", "Lettonie", "Riga", "europe", 56.88, 24.6, 2],
  ["LI", "438", "Liechtenstein", "Vaduz", "europe", 47.17, 9.52, 3],
  ["LT", "440", "Lituanie", "Vilnius", "europe", 55.17, 23.88, 2],
  ["LU", "442", "Luxembourg", "Luxembourg", "europe", 49.82, 6.13, 2],
  ["MK", "807", "Macédoine du Nord", "Skopje", "europe", 41.61, 21.75, 3],
  ["MT", "470", "Malte", "La Valette", "europe", 35.94, 14.38, 2],
  ["MD", "498", "Moldavie", "Chișinău", "europe", 47.41, 28.37, 3],
  ["MC", "492", "Monaco", "Monaco", "europe", 43.75, 7.41, 2],
  ["ME", "499", "Monténégro", "Podgorica", "europe", 42.71, 19.37, 3],
  ["NO", "578", "Norvège", "Oslo", "europe", 60.47, 8.47, 1],
  ["NL", "528", "Pays-Bas", "Amsterdam", "europe", 52.13, 5.29, 1, "Une grande partie des Pays-Bas est sous le niveau de la mer."],
  ["PL", "616", "Pologne", "Varsovie", "europe", 51.92, 19.15, 1],
  ["PT", "620", "Portugal", "Lisbonne", "europe", 39.4, -8.22, 1],
  ["CZ", "203", "République tchèque", "Prague", "europe", 49.82, 15.47, 1],
  ["RO", "642", "Roumanie", "Bucarest", "europe", 45.94, 24.97, 2],
  ["GB", "826", "Royaume-Uni", "Londres", "europe", 55.38, -3.44, 1, "Le Royaume-Uni regroupe l'Angleterre, l'Écosse, le pays de Galles et l'Irlande du Nord."],
  ["RU", "643", "Russie", "Moscou", "europe", 61.52, 105.32, 1, "La Russie est le plus grand pays du monde."],
  ["SM", "674", "Saint-Marin", "Saint-Marin", "europe", 43.94, 12.46, 3],
  ["RS", "688", "Serbie", "Belgrade", "europe", 44.02, 21.01, 2],
  ["SK", "703", "Slovaquie", "Bratislava", "europe", 48.67, 19.7, 2],
  ["SI", "705", "Slovénie", "Ljubljana", "europe", 46.15, 14.99, 2],
  ["SE", "752", "Suède", "Stockholm", "europe", 60.13, 18.64, 1],
  ["CH", "756", "Suisse", "Berne", "europe", 46.82, 8.23, 1],
  ["UA", "804", "Ukraine", "Kyiv", "europe", 48.38, 31.17, 1],
  ["VA", "336", "Vatican", "Vatican", "europe", 41.9, 12.45, 2, "Le plus petit État du monde."],

  // Afrique
  ["ZA", "710", "Afrique du Sud", "Pretoria", "afrique", -30.56, 22.94, 1, "L'Afrique du Sud a trois capitales."],
  ["DZ", "012", "Algérie", "Alger", "afrique", 28.03, 1.66, 1],
  ["AO", "024", "Angola", "Luanda", "afrique", -11.2, 17.87, 2],
  ["BJ", "204", "Bénin", "Porto-Novo", "afrique", 9.31, 2.32, 2],
  ["BW", "072", "Botswana", "Gaborone", "afrique", -22.33, 24.68, 2],
  ["BF", "854", "Burkina Faso", "Ouagadougou", "afrique", 12.24, -1.56, 2],
  ["BI", "108", "Burundi", "Gitega", "afrique", -3.37, 29.92, 3],
  ["CV", "132", "Cap-Vert", "Praia", "afrique", 16.0, -24.01, 3],
  ["CM", "120", "Cameroun", "Yaoundé", "afrique", 7.37, 12.35, 2],
  ["CF", "140", "République centrafricaine", "Bangui", "afrique", 6.61, 20.94, 3],
  ["TD", "148", "Tchad", "N'Djamena", "afrique", 15.45, 18.73, 2],
  ["KM", "174", "Comores", "Moroni", "afrique", -11.88, 43.87, 3],
  ["CG", "178", "Congo", "Brazzaville", "afrique", -0.23, 15.83, 2],
  ["CD", "180", "République démocratique du Congo", "Kinshasa", "afrique", -4.04, 21.76, 2],
  ["CI", "384", "Côte d'Ivoire", "Yamoussoukro", "afrique", 7.54, -5.55, 1],
  ["DJ", "262", "Djibouti", "Djibouti", "afrique", 11.83, 42.59, 3],
  ["EG", "818", "Égypte", "Le Caire", "afrique", 26.82, 30.8, 1, "L'Égypte abrite les pyramides de Gizeh."],
  ["ER", "232", "Érythrée", "Asmara", "afrique", 15.18, 39.78, 3],
  ["SZ", "748", "Eswatini", "Mbabane", "afrique", -26.52, 31.47, 3],
  ["ET", "231", "Éthiopie", "Addis-Abeba", "afrique", 9.15, 40.49, 1],
  ["GA", "266", "Gabon", "Libreville", "afrique", -0.8, 11.61, 2],
  ["GM", "270", "Gambie", "Banjul", "afrique", 13.44, -15.31, 3],
  ["GH", "288", "Ghana", "Accra", "afrique", 7.95, -1.02, 2],
  ["GN", "324", "Guinée", "Conakry", "afrique", 9.95, -9.7, 2],
  ["GW", "624", "Guinée-Bissau", "Bissau", "afrique", 11.8, -15.18, 3],
  ["GQ", "226", "Guinée équatoriale", "Malabo", "afrique", 1.65, 10.27, 3],
  ["KE", "404", "Kenya", "Nairobi", "afrique", -0.02, 37.91, 1],
  ["LS", "426", "Lesotho", "Maseru", "afrique", -29.61, 28.23, 3],
  ["LR", "430", "Liberia", "Monrovia", "afrique", 6.43, -9.43, 3],
  ["LY", "434", "Libye", "Tripoli", "afrique", 26.34, 17.23, 2],
  ["MG", "450", "Madagascar", "Antananarivo", "afrique", -18.77, 46.87, 2],
  ["MW", "454", "Malawi", "Lilongwe", "afrique", -13.25, 34.3, 3],
  ["ML", "466", "Mali", "Bamako", "afrique", 17.57, -4.0, 2],
  ["MA", "504", "Maroc", "Rabat", "afrique", 31.79, -7.09, 1],
  ["MU", "480", "Maurice", "Port-Louis", "afrique", -20.35, 57.55, 3],
  ["MR", "478", "Mauritanie", "Nouakchott", "afrique", 21.01, -10.94, 2],
  ["MZ", "508", "Mozambique", "Maputo", "afrique", -18.67, 35.53, 2],
  ["NA", "516", "Namibie", "Windhoek", "afrique", -22.96, 18.49, 2],
  ["NE", "562", "Niger", "Niamey", "afrique", 17.61, 8.08, 2],
  ["NG", "566", "Nigéria", "Abuja", "afrique", 9.08, 8.68, 1, "Le Nigéria est le pays le plus peuplé d'Afrique."],
  ["UG", "800", "Ouganda", "Kampala", "afrique", 1.37, 32.29, 2],
  ["RW", "646", "Rwanda", "Kigali", "afrique", -1.94, 29.87, 2],
  ["ST", "678", "Sao Tomé-et-Principe", "São Tomé", "afrique", 0.19, 6.61, 3],
  ["SN", "686", "Sénégal", "Dakar", "afrique", 14.5, -14.45, 1],
  ["SC", "690", "Seychelles", "Victoria", "afrique", -4.68, 55.49, 3],
  ["SL", "694", "Sierra Leone", "Freetown", "afrique", 8.46, -11.78, 3],
  ["SO", "706", "Somalie", "Mogadiscio", "afrique", 5.15, 46.2, 2],
  ["SD", "729", "Soudan", "Khartoum", "afrique", 12.86, 30.22, 2],
  ["SS", "728", "Soudan du Sud", "Djouba", "afrique", 6.88, 31.31, 2],
  ["TZ", "834", "Tanzanie", "Dodoma", "afrique", -6.37, 34.89, 2],
  ["TG", "768", "Togo", "Lomé", "afrique", 8.62, 0.82, 2],
  ["TN", "788", "Tunisie", "Tunis", "afrique", 33.89, 9.54, 1],
  ["ZM", "894", "Zambie", "Lusaka", "afrique", -13.13, 27.85, 2],
  ["ZW", "716", "Zimbabwe", "Harare", "afrique", -19.02, 29.15, 2],

  // Asie
  ["AF", "004", "Afghanistan", "Kaboul", "asie", 33.94, 67.71, 2],
  ["SA", "682", "Arabie saoudite", "Riyad", "asie", 23.89, 45.08, 1],
  ["AM", "051", "Arménie", "Erevan", "asie", 40.07, 45.04, 2],
  ["AZ", "031", "Azerbaïdjan", "Bakou", "asie", 40.14, 47.58, 2],
  ["BH", "048", "Bahreïn", "Manama", "asie", 26.07, 50.56, 3],
  ["BD", "050", "Bangladesh", "Dacca", "asie", 23.69, 90.36, 2],
  ["BT", "064", "Bhoutan", "Thimphou", "asie", 27.51, 90.43, 3],
  ["MM", "104", "Birmanie", "Naypyidaw", "asie", 21.91, 95.96, 2],
  ["BN", "096", "Brunei", "Bandar Seri Begawan", "asie", 4.54, 114.73, 3],
  ["KH", "116", "Cambodge", "Phnom Penh", "asie", 12.57, 104.99, 2],
  ["CN", "156", "Chine", "Pékin", "asie", 35.86, 104.2, 1, "La Chine est le pays le plus peuplé du monde."],
  ["KP", "408", "Corée du Nord", "Pyongyang", "asie", 40.34, 127.51, 2],
  ["KR", "410", "Corée du Sud", "Séoul", "asie", 35.91, 127.77, 1],
  ["AE", "784", "Émirats arabes unis", "Abou Dabi", "asie", 23.42, 53.85, 1],
  ["GE", "268", "Géorgie", "Tbilissi", "asie", 42.32, 43.36, 2],
  ["IN", "356", "Inde", "New Delhi", "asie", 20.59, 78.96, 1, "L'Inde possède plus d'un milliard d'habitants."],
  ["ID", "360", "Indonésie", "Jakarta", "asie", -0.79, 113.92, 1, "L'Indonésie est le plus grand archipel du monde."],
  ["IQ", "368", "Irak", "Bagdad", "asie", 33.22, 43.68, 2],
  ["IR", "364", "Iran", "Téhéran", "asie", 32.43, 53.69, 1],
  ["IL", "376", "Israël", "Jérusalem", "asie", 31.05, 34.85, 1],
  ["JP", "392", "Japon", "Tokyo", "asie", 36.2, 138.25, 1, "Le Japon est composé de plus de 6 000 îles."],
  ["JO", "400", "Jordanie", "Amman", "asie", 30.59, 36.24, 2],
  ["KZ", "398", "Kazakhstan", "Astana", "asie", 48.02, 66.92, 2],
  ["KG", "417", "Kirghizistan", "Bichkek", "asie", 41.2, 74.77, 3],
  ["KW", "414", "Koweït", "Koweït", "asie", 29.31, 47.48, 2],
  ["LA", "418", "Laos", "Vientiane", "asie", 19.86, 102.5, 2],
  ["LB", "422", "Liban", "Beyrouth", "asie", 33.85, 35.86, 2],
  ["MY", "458", "Malaisie", "Kuala Lumpur", "asie", 4.21, 101.98, 2],
  ["MV", "462", "Maldives", "Malé", "asie", 3.2, 73.22, 3],
  ["MN", "496", "Mongolie", "Oulan-Bator", "asie", 46.86, 103.85, 2],
  ["NP", "524", "Népal", "Katmandou", "asie", 28.39, 84.12, 2],
  ["OM", "512", "Oman", "Mascate", "asie", 21.51, 55.92, 2],
  ["UZ", "860", "Ouzbékistan", "Tachkent", "asie", 41.38, 64.59, 3],
  ["PK", "586", "Pakistan", "Islamabad", "asie", 30.38, 69.35, 1],
  ["PS", "275", "Palestine", "Ramallah", "asie", 31.95, 35.23, 2],
  ["PH", "608", "Philippines", "Manille", "asie", 12.88, 121.77, 2],
  ["QA", "634", "Qatar", "Doha", "asie", 25.35, 51.18, 2],
  ["SG", "702", "Singapour", "Singapour", "asie", 1.35, 103.82, 1],
  ["LK", "144", "Sri Lanka", "Sri Jayawardenapura Kotte", "asie", 7.87, 80.77, 2],
  ["SY", "760", "Syrie", "Damas", "asie", 34.8, 38.99, 2],
  ["TJ", "762", "Tadjikistan", "Douchanbé", "asie", 38.86, 71.28, 3],
  ["TW", "158", "Taïwan", "Taipei", "asie", 23.7, 120.96, 2],
  ["TH", "764", "Thaïlande", "Bangkok", "asie", 15.87, 100.99, 1],
  ["TL", "626", "Timor oriental", "Dili", "asie", -8.87, 125.73, 3],
  ["TM", "795", "Turkménistan", "Achgabat", "asie", 38.97, 59.56, 3],
  ["TR", "792", "Turquie", "Ankara", "asie", 38.96, 35.24, 1, "La Turquie est à cheval entre l'Europe et l'Asie."],
  ["VN", "704", "Viêt Nam", "Hanoï", "asie", 14.06, 108.28, 1],
  ["YE", "887", "Yémen", "Sanaa", "asie", 15.55, 48.52, 2],

  // Océanie
  ["AU", "036", "Australie", "Canberra", "oceanie", -25.27, 133.78, 1, "L'Australie est à la fois un pays et un continent."],
  ["FJ", "242", "Fidji", "Suva", "oceanie", -17.71, 178.07, 2],
  ["KI", "296", "Kiribati", "Tarawa-Sud", "oceanie", -3.37, -168.73, 3],
  ["MH", "584", "Îles Marshall", "Majuro", "oceanie", 7.13, 171.18, 3],
  ["FM", "583", "Micronésie", "Palikir", "oceanie", 7.43, 150.55, 3],
  ["NR", "520", "Nauru", "Yaren", "oceanie", -0.52, 166.93, 3],
  ["NZ", "554", "Nouvelle-Zélande", "Wellington", "oceanie", -40.9, 174.89, 1],
  ["PW", "585", "Palaos", "Ngerulmud", "oceanie", 7.51, 134.58, 3],
  ["PG", "598", "Papouasie-Nouvelle-Guinée", "Port Moresby", "oceanie", -6.31, 143.96, 2],
  ["WS", "882", "Samoa", "Apia", "oceanie", -13.76, -172.1, 3],
  ["SB", "090", "Îles Salomon", "Honiara", "oceanie", -9.65, 160.16, 3],
  ["TO", "776", "Tonga", "Nukuʻalofa", "oceanie", -21.18, -175.2, 3],
  ["TV", "798", "Tuvalu", "Funafuti", "oceanie", -7.11, 177.65, 3],
  ["VU", "548", "Vanuatu", "Port-Vila", "oceanie", -15.38, 166.96, 3],

  // Amérique du Nord
  ["AG", "028", "Antigua-et-Barbuda", "Saint John's", "amerique-nord", 17.06, -61.8, 3],
  ["BS", "044", "Bahamas", "Nassau", "amerique-nord", 25.03, -77.4, 2],
  ["BB", "052", "Barbade", "Bridgetown", "amerique-nord", 13.19, -59.54, 3],
  ["BZ", "084", "Belize", "Belmopan", "amerique-nord", 17.19, -88.5, 3],
  ["CA", "124", "Canada", "Ottawa", "amerique-nord", 56.13, -106.35, 1, "Le Canada est le deuxième plus grand pays du monde."],
  ["CR", "188", "Costa Rica", "San José", "amerique-nord", 9.75, -83.75, 2],
  ["CU", "192", "Cuba", "La Havane", "amerique-nord", 21.52, -77.78, 1],
  ["DM", "212", "Dominique", "Roseau", "amerique-nord", 15.41, -61.37, 3],
  ["SV", "222", "Salvador", "San Salvador", "amerique-nord", 13.79, -88.9, 2],
  ["US", "840", "États-Unis", "Washington", "amerique-nord", 37.09, -95.71, 1, "Les États-Unis comptent 50 États."],
  ["GD", "308", "Grenade", "Saint-Georges", "amerique-nord", 12.12, -61.68, 3],
  ["GT", "320", "Guatemala", "Guatemala", "amerique-nord", 15.78, -90.23, 2],
  ["HT", "332", "Haïti", "Port-au-Prince", "amerique-nord", 18.97, -72.29, 2],
  ["HN", "340", "Honduras", "Tegucigalpa", "amerique-nord", 15.2, -86.24, 2],
  ["JM", "388", "Jamaïque", "Kingston", "amerique-nord", 18.11, -77.3, 2],
  ["MX", "484", "Mexique", "Mexico", "amerique-nord", 23.63, -102.55, 1, "Mexico est l'une des plus grandes métropoles du monde."],
  ["NI", "558", "Nicaragua", "Managua", "amerique-nord", 12.87, -85.21, 2],
  ["PA", "591", "Panama", "Panama", "amerique-nord", 8.54, -80.78, 2, "Le canal de Panama relie l'Atlantique au Pacifique."],
  ["DO", "214", "République dominicaine", "Saint-Domingue", "amerique-nord", 18.74, -70.16, 2],
  ["KN", "659", "Saint-Kitts-et-Nevis", "Basseterre", "amerique-nord", 17.36, -62.78, 3],
  ["LC", "662", "Sainte-Lucie", "Castries", "amerique-nord", 13.91, -60.98, 3],
  ["VC", "670", "Saint-Vincent-et-les-Grenadines", "Kingstown", "amerique-nord", 12.98, -61.29, 3],
  ["TT", "780", "Trinité-et-Tobago", "Port-d'Espagne", "amerique-nord", 10.69, -61.22, 3],

  // Amérique du Sud
  ["AR", "032", "Argentine", "Buenos Aires", "amerique-sud", -38.42, -63.62, 1],
  ["BO", "068", "Bolivie", "Sucre", "amerique-sud", -16.29, -63.59, 2, "La Bolivie a deux capitales : Sucre et La Paz."],
  ["BR", "076", "Brésil", "Brasilia", "amerique-sud", -14.24, -51.93, 1, "Le Brésil couvre près de la moitié de l'Amérique du Sud."],
  ["CL", "152", "Chili", "Santiago", "amerique-sud", -35.68, -71.54, 1],
  ["CO", "170", "Colombie", "Bogota", "amerique-sud", 4.57, -74.3, 1],
  ["EC", "218", "Équateur", "Quito", "amerique-sud", -1.83, -78.18, 2],
  ["GY", "328", "Guyana", "Georgetown", "amerique-sud", 4.86, -58.93, 3],
  ["PY", "600", "Paraguay", "Asunción", "amerique-sud", -23.44, -58.44, 2],
  ["PE", "604", "Pérou", "Lima", "amerique-sud", -9.19, -75.02, 1],
  ["SR", "740", "Suriname", "Paramaribo", "amerique-sud", 3.92, -56.03, 3],
  ["UY", "858", "Uruguay", "Montevideo", "amerique-sud", -32.52, -55.77, 2],
  ["VE", "862", "Venezuela", "Caracas", "amerique-sud", 6.42, -66.59, 1],
];

const countries = raw.map(([iso, num, name, capital, continent, lat, lng, difficulty, funFact]) => {
  const obj = {
    id: iso.toLowerCase(),
    name,
    frenchName: name,
    capital,
    continent,
    flag: flag(iso),
    coordinates: [lat, lng],
    isoCode: iso,
    isoNumeric: num,
    difficulty,
  };
  if (funFact) obj.funFact = funFact;
  return obj;
});

const content = `export type ContinentId =
  | "europe"
  | "afrique"
  | "asie"
  | "oceanie"
  | "amerique-nord"
  | "amerique-sud";

export interface Country {
  id: string;
  name: string;
  frenchName: string;
  capital: string;
  continent: ContinentId;
  flag: string;
  coordinates: [number, number];
  isoCode: string;
  isoNumeric: string;
  difficulty: 1 | 2 | 3;
  funFact?: string;
}

export const CONTINENT_META: Record<
  ContinentId,
  { id: ContinentId; name: string; emoji: string }
> = {
  "amerique-nord": { id: "amerique-nord", name: "Amérique du Nord", emoji: "🌎" },
  "amerique-sud": { id: "amerique-sud", name: "Amérique du Sud", emoji: "🌎" },
  europe: { id: "europe", name: "Europe", emoji: "🌍" },
  afrique: { id: "afrique", name: "Afrique", emoji: "🌍" },
  asie: { id: "asie", name: "Asie", emoji: "🌏" },
  oceanie: { id: "oceanie", name: "Océanie", emoji: "🌏" },
};

export const CONTINENTS = Object.values(CONTINENT_META);

export const COUNTRIES: Country[] = ${JSON.stringify(countries, null, 2)};

export function getCountryById(id: string): Country | undefined {
  return COUNTRIES.find((c) => c.id === id.toLowerCase());
}

export function getCountriesByContinent(continent: ContinentId): Country[] {
  return COUNTRIES.filter((c) => c.continent === continent);
}

export function getCountryByIsoNumeric(isoNumeric: string): Country | undefined {
  const padded = isoNumeric.padStart(3, "0");
  return COUNTRIES.find((c) => c.isoNumeric === padded);
}

export function getCountryByIsoCode(isoCode: string): Country | undefined {
  return COUNTRIES.find((c) => c.isoCode.toUpperCase() === isoCode.toUpperCase());
}
`;

writeFileSync("src/data/countries.ts", content);
console.log(`Generated ${countries.length} countries`);
