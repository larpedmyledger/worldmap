export type ContinentId =
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

export const COUNTRIES: Country[] = [
  {
    "id": "al",
    "name": "Albanie",
    "frenchName": "Albanie",
    "capital": "Tirana",
    "continent": "europe",
    "flag": "🇦🇱",
    "coordinates": [
      41.15,
      20.17
    ],
    "isoCode": "AL",
    "isoNumeric": "008",
    "difficulty": 2
  },
  {
    "id": "de",
    "name": "Allemagne",
    "frenchName": "Allemagne",
    "capital": "Berlin",
    "continent": "europe",
    "flag": "🇩🇪",
    "coordinates": [
      51.17,
      10.45
    ],
    "isoCode": "DE",
    "isoNumeric": "276",
    "difficulty": 1,
    "funFact": "L'Allemagne est le pays le plus peuplé de l'Union européenne."
  },
  {
    "id": "ad",
    "name": "Andorre",
    "frenchName": "Andorre",
    "capital": "Andorre-la-Vieille",
    "continent": "europe",
    "flag": "🇦🇩",
    "coordinates": [
      42.55,
      1.6
    ],
    "isoCode": "AD",
    "isoNumeric": "020",
    "difficulty": 3
  },
  {
    "id": "at",
    "name": "Autriche",
    "frenchName": "Autriche",
    "capital": "Vienne",
    "continent": "europe",
    "flag": "🇦🇹",
    "coordinates": [
      47.52,
      14.55
    ],
    "isoCode": "AT",
    "isoNumeric": "040",
    "difficulty": 1
  },
  {
    "id": "be",
    "name": "Belgique",
    "frenchName": "Belgique",
    "capital": "Bruxelles",
    "continent": "europe",
    "flag": "🇧🇪",
    "coordinates": [
      50.5,
      4.47
    ],
    "isoCode": "BE",
    "isoNumeric": "056",
    "difficulty": 1,
    "funFact": "Bruxelles accueille le siège de l'Union européenne."
  },
  {
    "id": "by",
    "name": "Biélorussie",
    "frenchName": "Biélorussie",
    "capital": "Minsk",
    "continent": "europe",
    "flag": "🇧🇾",
    "coordinates": [
      53.71,
      27.95
    ],
    "isoCode": "BY",
    "isoNumeric": "112",
    "difficulty": 2
  },
  {
    "id": "ba",
    "name": "Bosnie-Herzégovine",
    "frenchName": "Bosnie-Herzégovine",
    "capital": "Sarajevo",
    "continent": "europe",
    "flag": "🇧🇦",
    "coordinates": [
      43.92,
      17.68
    ],
    "isoCode": "BA",
    "isoNumeric": "070",
    "difficulty": 2
  },
  {
    "id": "bg",
    "name": "Bulgarie",
    "frenchName": "Bulgarie",
    "capital": "Sofia",
    "continent": "europe",
    "flag": "🇧🇬",
    "coordinates": [
      42.73,
      25.49
    ],
    "isoCode": "BG",
    "isoNumeric": "100",
    "difficulty": 2
  },
  {
    "id": "cy",
    "name": "Chypre",
    "frenchName": "Chypre",
    "capital": "Nicosie",
    "continent": "europe",
    "flag": "🇨🇾",
    "coordinates": [
      35.13,
      33.43
    ],
    "isoCode": "CY",
    "isoNumeric": "196",
    "difficulty": 2
  },
  {
    "id": "hr",
    "name": "Croatie",
    "frenchName": "Croatie",
    "capital": "Zagreb",
    "continent": "europe",
    "flag": "🇭🇷",
    "coordinates": [
      45.1,
      15.2
    ],
    "isoCode": "HR",
    "isoNumeric": "191",
    "difficulty": 2
  },
  {
    "id": "dk",
    "name": "Danemark",
    "frenchName": "Danemark",
    "capital": "Copenhague",
    "continent": "europe",
    "flag": "🇩🇰",
    "coordinates": [
      56.26,
      9.5
    ],
    "isoCode": "DK",
    "isoNumeric": "208",
    "difficulty": 1
  },
  {
    "id": "es",
    "name": "Espagne",
    "frenchName": "Espagne",
    "capital": "Madrid",
    "continent": "europe",
    "flag": "🇪🇸",
    "coordinates": [
      40.46,
      -3.75
    ],
    "isoCode": "ES",
    "isoNumeric": "724",
    "difficulty": 1,
    "funFact": "L'Espagne compte 17 communautés autonomes."
  },
  {
    "id": "ee",
    "name": "Estonie",
    "frenchName": "Estonie",
    "capital": "Tallinn",
    "continent": "europe",
    "flag": "🇪🇪",
    "coordinates": [
      58.6,
      25.01
    ],
    "isoCode": "EE",
    "isoNumeric": "233",
    "difficulty": 2
  },
  {
    "id": "fi",
    "name": "Finlande",
    "frenchName": "Finlande",
    "capital": "Helsinki",
    "continent": "europe",
    "flag": "🇫🇮",
    "coordinates": [
      61.92,
      25.75
    ],
    "isoCode": "FI",
    "isoNumeric": "246",
    "difficulty": 1
  },
  {
    "id": "fr",
    "name": "France",
    "frenchName": "France",
    "capital": "Paris",
    "continent": "europe",
    "flag": "🇫🇷",
    "coordinates": [
      46.23,
      2.21
    ],
    "isoCode": "FR",
    "isoNumeric": "250",
    "difficulty": 1,
    "funFact": "La France est le pays le plus visité au monde."
  },
  {
    "id": "gr",
    "name": "Grèce",
    "frenchName": "Grèce",
    "capital": "Athènes",
    "continent": "europe",
    "flag": "🇬🇷",
    "coordinates": [
      39.07,
      21.82
    ],
    "isoCode": "GR",
    "isoNumeric": "300",
    "difficulty": 1,
    "funFact": "Athènes est l'une des plus anciennes capitales du monde."
  },
  {
    "id": "hu",
    "name": "Hongrie",
    "frenchName": "Hongrie",
    "capital": "Budapest",
    "continent": "europe",
    "flag": "🇭🇺",
    "coordinates": [
      47.16,
      19.5
    ],
    "isoCode": "HU",
    "isoNumeric": "348",
    "difficulty": 2
  },
  {
    "id": "ie",
    "name": "Irlande",
    "frenchName": "Irlande",
    "capital": "Dublin",
    "continent": "europe",
    "flag": "🇮🇪",
    "coordinates": [
      53.14,
      -7.69
    ],
    "isoCode": "IE",
    "isoNumeric": "372",
    "difficulty": 1
  },
  {
    "id": "is",
    "name": "Islande",
    "frenchName": "Islande",
    "capital": "Reykjavik",
    "continent": "europe",
    "flag": "🇮🇸",
    "coordinates": [
      64.96,
      -19.02
    ],
    "isoCode": "IS",
    "isoNumeric": "352",
    "difficulty": 2
  },
  {
    "id": "it",
    "name": "Italie",
    "frenchName": "Italie",
    "capital": "Rome",
    "continent": "europe",
    "flag": "🇮🇹",
    "coordinates": [
      41.87,
      12.57
    ],
    "isoCode": "IT",
    "isoNumeric": "380",
    "difficulty": 1,
    "funFact": "Rome est surnommée la Ville éternelle."
  },
  {
    "id": "xk",
    "name": "Kosovo",
    "frenchName": "Kosovo",
    "capital": "Pristina",
    "continent": "europe",
    "flag": "🇽🇰",
    "coordinates": [
      42.6,
      20.9
    ],
    "isoCode": "XK",
    "isoNumeric": "983",
    "difficulty": 3
  },
  {
    "id": "lv",
    "name": "Lettonie",
    "frenchName": "Lettonie",
    "capital": "Riga",
    "continent": "europe",
    "flag": "🇱🇻",
    "coordinates": [
      56.88,
      24.6
    ],
    "isoCode": "LV",
    "isoNumeric": "428",
    "difficulty": 2
  },
  {
    "id": "li",
    "name": "Liechtenstein",
    "frenchName": "Liechtenstein",
    "capital": "Vaduz",
    "continent": "europe",
    "flag": "🇱🇮",
    "coordinates": [
      47.17,
      9.52
    ],
    "isoCode": "LI",
    "isoNumeric": "438",
    "difficulty": 3
  },
  {
    "id": "lt",
    "name": "Lituanie",
    "frenchName": "Lituanie",
    "capital": "Vilnius",
    "continent": "europe",
    "flag": "🇱🇹",
    "coordinates": [
      55.17,
      23.88
    ],
    "isoCode": "LT",
    "isoNumeric": "440",
    "difficulty": 2
  },
  {
    "id": "lu",
    "name": "Luxembourg",
    "frenchName": "Luxembourg",
    "capital": "Luxembourg",
    "continent": "europe",
    "flag": "🇱🇺",
    "coordinates": [
      49.82,
      6.13
    ],
    "isoCode": "LU",
    "isoNumeric": "442",
    "difficulty": 2
  },
  {
    "id": "mk",
    "name": "Macédoine du Nord",
    "frenchName": "Macédoine du Nord",
    "capital": "Skopje",
    "continent": "europe",
    "flag": "🇲🇰",
    "coordinates": [
      41.61,
      21.75
    ],
    "isoCode": "MK",
    "isoNumeric": "807",
    "difficulty": 3
  },
  {
    "id": "mt",
    "name": "Malte",
    "frenchName": "Malte",
    "capital": "La Valette",
    "continent": "europe",
    "flag": "🇲🇹",
    "coordinates": [
      35.94,
      14.38
    ],
    "isoCode": "MT",
    "isoNumeric": "470",
    "difficulty": 2
  },
  {
    "id": "md",
    "name": "Moldavie",
    "frenchName": "Moldavie",
    "capital": "Chișinău",
    "continent": "europe",
    "flag": "🇲🇩",
    "coordinates": [
      47.41,
      28.37
    ],
    "isoCode": "MD",
    "isoNumeric": "498",
    "difficulty": 3
  },
  {
    "id": "mc",
    "name": "Monaco",
    "frenchName": "Monaco",
    "capital": "Monaco",
    "continent": "europe",
    "flag": "🇲🇨",
    "coordinates": [
      43.75,
      7.41
    ],
    "isoCode": "MC",
    "isoNumeric": "492",
    "difficulty": 2
  },
  {
    "id": "me",
    "name": "Monténégro",
    "frenchName": "Monténégro",
    "capital": "Podgorica",
    "continent": "europe",
    "flag": "🇲🇪",
    "coordinates": [
      42.71,
      19.37
    ],
    "isoCode": "ME",
    "isoNumeric": "499",
    "difficulty": 3
  },
  {
    "id": "no",
    "name": "Norvège",
    "frenchName": "Norvège",
    "capital": "Oslo",
    "continent": "europe",
    "flag": "🇳🇴",
    "coordinates": [
      60.47,
      8.47
    ],
    "isoCode": "NO",
    "isoNumeric": "578",
    "difficulty": 1
  },
  {
    "id": "nl",
    "name": "Pays-Bas",
    "frenchName": "Pays-Bas",
    "capital": "Amsterdam",
    "continent": "europe",
    "flag": "🇳🇱",
    "coordinates": [
      52.13,
      5.29
    ],
    "isoCode": "NL",
    "isoNumeric": "528",
    "difficulty": 1,
    "funFact": "Une grande partie des Pays-Bas est sous le niveau de la mer."
  },
  {
    "id": "pl",
    "name": "Pologne",
    "frenchName": "Pologne",
    "capital": "Varsovie",
    "continent": "europe",
    "flag": "🇵🇱",
    "coordinates": [
      51.92,
      19.15
    ],
    "isoCode": "PL",
    "isoNumeric": "616",
    "difficulty": 1
  },
  {
    "id": "pt",
    "name": "Portugal",
    "frenchName": "Portugal",
    "capital": "Lisbonne",
    "continent": "europe",
    "flag": "🇵🇹",
    "coordinates": [
      39.4,
      -8.22
    ],
    "isoCode": "PT",
    "isoNumeric": "620",
    "difficulty": 1
  },
  {
    "id": "cz",
    "name": "République tchèque",
    "frenchName": "République tchèque",
    "capital": "Prague",
    "continent": "europe",
    "flag": "🇨🇿",
    "coordinates": [
      49.82,
      15.47
    ],
    "isoCode": "CZ",
    "isoNumeric": "203",
    "difficulty": 1
  },
  {
    "id": "ro",
    "name": "Roumanie",
    "frenchName": "Roumanie",
    "capital": "Bucarest",
    "continent": "europe",
    "flag": "🇷🇴",
    "coordinates": [
      45.94,
      24.97
    ],
    "isoCode": "RO",
    "isoNumeric": "642",
    "difficulty": 2
  },
  {
    "id": "gb",
    "name": "Royaume-Uni",
    "frenchName": "Royaume-Uni",
    "capital": "Londres",
    "continent": "europe",
    "flag": "🇬🇧",
    "coordinates": [
      55.38,
      -3.44
    ],
    "isoCode": "GB",
    "isoNumeric": "826",
    "difficulty": 1,
    "funFact": "Le Royaume-Uni regroupe l'Angleterre, l'Écosse, le pays de Galles et l'Irlande du Nord."
  },
  {
    "id": "ru",
    "name": "Russie",
    "frenchName": "Russie",
    "capital": "Moscou",
    "continent": "europe",
    "flag": "🇷🇺",
    "coordinates": [
      61.52,
      105.32
    ],
    "isoCode": "RU",
    "isoNumeric": "643",
    "difficulty": 1,
    "funFact": "La Russie est le plus grand pays du monde."
  },
  {
    "id": "sm",
    "name": "Saint-Marin",
    "frenchName": "Saint-Marin",
    "capital": "Saint-Marin",
    "continent": "europe",
    "flag": "🇸🇲",
    "coordinates": [
      43.94,
      12.46
    ],
    "isoCode": "SM",
    "isoNumeric": "674",
    "difficulty": 3
  },
  {
    "id": "rs",
    "name": "Serbie",
    "frenchName": "Serbie",
    "capital": "Belgrade",
    "continent": "europe",
    "flag": "🇷🇸",
    "coordinates": [
      44.02,
      21.01
    ],
    "isoCode": "RS",
    "isoNumeric": "688",
    "difficulty": 2
  },
  {
    "id": "sk",
    "name": "Slovaquie",
    "frenchName": "Slovaquie",
    "capital": "Bratislava",
    "continent": "europe",
    "flag": "🇸🇰",
    "coordinates": [
      48.67,
      19.7
    ],
    "isoCode": "SK",
    "isoNumeric": "703",
    "difficulty": 2
  },
  {
    "id": "si",
    "name": "Slovénie",
    "frenchName": "Slovénie",
    "capital": "Ljubljana",
    "continent": "europe",
    "flag": "🇸🇮",
    "coordinates": [
      46.15,
      14.99
    ],
    "isoCode": "SI",
    "isoNumeric": "705",
    "difficulty": 2
  },
  {
    "id": "se",
    "name": "Suède",
    "frenchName": "Suède",
    "capital": "Stockholm",
    "continent": "europe",
    "flag": "🇸🇪",
    "coordinates": [
      60.13,
      18.64
    ],
    "isoCode": "SE",
    "isoNumeric": "752",
    "difficulty": 1
  },
  {
    "id": "ch",
    "name": "Suisse",
    "frenchName": "Suisse",
    "capital": "Berne",
    "continent": "europe",
    "flag": "🇨🇭",
    "coordinates": [
      46.82,
      8.23
    ],
    "isoCode": "CH",
    "isoNumeric": "756",
    "difficulty": 1
  },
  {
    "id": "ua",
    "name": "Ukraine",
    "frenchName": "Ukraine",
    "capital": "Kyiv",
    "continent": "europe",
    "flag": "🇺🇦",
    "coordinates": [
      48.38,
      31.17
    ],
    "isoCode": "UA",
    "isoNumeric": "804",
    "difficulty": 1
  },
  {
    "id": "va",
    "name": "Vatican",
    "frenchName": "Vatican",
    "capital": "Vatican",
    "continent": "europe",
    "flag": "🇻🇦",
    "coordinates": [
      41.9,
      12.45
    ],
    "isoCode": "VA",
    "isoNumeric": "336",
    "difficulty": 2,
    "funFact": "Le plus petit État du monde."
  },
  {
    "id": "za",
    "name": "Afrique du Sud",
    "frenchName": "Afrique du Sud",
    "capital": "Pretoria",
    "continent": "afrique",
    "flag": "🇿🇦",
    "coordinates": [
      -30.56,
      22.94
    ],
    "isoCode": "ZA",
    "isoNumeric": "710",
    "difficulty": 1,
    "funFact": "L'Afrique du Sud a trois capitales."
  },
  {
    "id": "dz",
    "name": "Algérie",
    "frenchName": "Algérie",
    "capital": "Alger",
    "continent": "afrique",
    "flag": "🇩🇿",
    "coordinates": [
      28.03,
      1.66
    ],
    "isoCode": "DZ",
    "isoNumeric": "012",
    "difficulty": 1
  },
  {
    "id": "ao",
    "name": "Angola",
    "frenchName": "Angola",
    "capital": "Luanda",
    "continent": "afrique",
    "flag": "🇦🇴",
    "coordinates": [
      -11.2,
      17.87
    ],
    "isoCode": "AO",
    "isoNumeric": "024",
    "difficulty": 2
  },
  {
    "id": "bj",
    "name": "Bénin",
    "frenchName": "Bénin",
    "capital": "Porto-Novo",
    "continent": "afrique",
    "flag": "🇧🇯",
    "coordinates": [
      9.31,
      2.32
    ],
    "isoCode": "BJ",
    "isoNumeric": "204",
    "difficulty": 2
  },
  {
    "id": "bw",
    "name": "Botswana",
    "frenchName": "Botswana",
    "capital": "Gaborone",
    "continent": "afrique",
    "flag": "🇧🇼",
    "coordinates": [
      -22.33,
      24.68
    ],
    "isoCode": "BW",
    "isoNumeric": "072",
    "difficulty": 2
  },
  {
    "id": "bf",
    "name": "Burkina Faso",
    "frenchName": "Burkina Faso",
    "capital": "Ouagadougou",
    "continent": "afrique",
    "flag": "🇧🇫",
    "coordinates": [
      12.24,
      -1.56
    ],
    "isoCode": "BF",
    "isoNumeric": "854",
    "difficulty": 2
  },
  {
    "id": "bi",
    "name": "Burundi",
    "frenchName": "Burundi",
    "capital": "Gitega",
    "continent": "afrique",
    "flag": "🇧🇮",
    "coordinates": [
      -3.37,
      29.92
    ],
    "isoCode": "BI",
    "isoNumeric": "108",
    "difficulty": 3
  },
  {
    "id": "cv",
    "name": "Cap-Vert",
    "frenchName": "Cap-Vert",
    "capital": "Praia",
    "continent": "afrique",
    "flag": "🇨🇻",
    "coordinates": [
      16,
      -24.01
    ],
    "isoCode": "CV",
    "isoNumeric": "132",
    "difficulty": 3
  },
  {
    "id": "cm",
    "name": "Cameroun",
    "frenchName": "Cameroun",
    "capital": "Yaoundé",
    "continent": "afrique",
    "flag": "🇨🇲",
    "coordinates": [
      7.37,
      12.35
    ],
    "isoCode": "CM",
    "isoNumeric": "120",
    "difficulty": 2
  },
  {
    "id": "cf",
    "name": "République centrafricaine",
    "frenchName": "République centrafricaine",
    "capital": "Bangui",
    "continent": "afrique",
    "flag": "🇨🇫",
    "coordinates": [
      6.61,
      20.94
    ],
    "isoCode": "CF",
    "isoNumeric": "140",
    "difficulty": 3
  },
  {
    "id": "td",
    "name": "Tchad",
    "frenchName": "Tchad",
    "capital": "N'Djamena",
    "continent": "afrique",
    "flag": "🇹🇩",
    "coordinates": [
      15.45,
      18.73
    ],
    "isoCode": "TD",
    "isoNumeric": "148",
    "difficulty": 2
  },
  {
    "id": "km",
    "name": "Comores",
    "frenchName": "Comores",
    "capital": "Moroni",
    "continent": "afrique",
    "flag": "🇰🇲",
    "coordinates": [
      -11.88,
      43.87
    ],
    "isoCode": "KM",
    "isoNumeric": "174",
    "difficulty": 3
  },
  {
    "id": "cg",
    "name": "Congo",
    "frenchName": "Congo",
    "capital": "Brazzaville",
    "continent": "afrique",
    "flag": "🇨🇬",
    "coordinates": [
      -0.23,
      15.83
    ],
    "isoCode": "CG",
    "isoNumeric": "178",
    "difficulty": 2
  },
  {
    "id": "cd",
    "name": "République démocratique du Congo",
    "frenchName": "République démocratique du Congo",
    "capital": "Kinshasa",
    "continent": "afrique",
    "flag": "🇨🇩",
    "coordinates": [
      -4.04,
      21.76
    ],
    "isoCode": "CD",
    "isoNumeric": "180",
    "difficulty": 2
  },
  {
    "id": "ci",
    "name": "Côte d'Ivoire",
    "frenchName": "Côte d'Ivoire",
    "capital": "Yamoussoukro",
    "continent": "afrique",
    "flag": "🇨🇮",
    "coordinates": [
      7.54,
      -5.55
    ],
    "isoCode": "CI",
    "isoNumeric": "384",
    "difficulty": 1
  },
  {
    "id": "dj",
    "name": "Djibouti",
    "frenchName": "Djibouti",
    "capital": "Djibouti",
    "continent": "afrique",
    "flag": "🇩🇯",
    "coordinates": [
      11.83,
      42.59
    ],
    "isoCode": "DJ",
    "isoNumeric": "262",
    "difficulty": 3
  },
  {
    "id": "eg",
    "name": "Égypte",
    "frenchName": "Égypte",
    "capital": "Le Caire",
    "continent": "afrique",
    "flag": "🇪🇬",
    "coordinates": [
      26.82,
      30.8
    ],
    "isoCode": "EG",
    "isoNumeric": "818",
    "difficulty": 1,
    "funFact": "L'Égypte abrite les pyramides de Gizeh."
  },
  {
    "id": "er",
    "name": "Érythrée",
    "frenchName": "Érythrée",
    "capital": "Asmara",
    "continent": "afrique",
    "flag": "🇪🇷",
    "coordinates": [
      15.18,
      39.78
    ],
    "isoCode": "ER",
    "isoNumeric": "232",
    "difficulty": 3
  },
  {
    "id": "sz",
    "name": "Eswatini",
    "frenchName": "Eswatini",
    "capital": "Mbabane",
    "continent": "afrique",
    "flag": "🇸🇿",
    "coordinates": [
      -26.52,
      31.47
    ],
    "isoCode": "SZ",
    "isoNumeric": "748",
    "difficulty": 3
  },
  {
    "id": "et",
    "name": "Éthiopie",
    "frenchName": "Éthiopie",
    "capital": "Addis-Abeba",
    "continent": "afrique",
    "flag": "🇪🇹",
    "coordinates": [
      9.15,
      40.49
    ],
    "isoCode": "ET",
    "isoNumeric": "231",
    "difficulty": 1
  },
  {
    "id": "ga",
    "name": "Gabon",
    "frenchName": "Gabon",
    "capital": "Libreville",
    "continent": "afrique",
    "flag": "🇬🇦",
    "coordinates": [
      -0.8,
      11.61
    ],
    "isoCode": "GA",
    "isoNumeric": "266",
    "difficulty": 2
  },
  {
    "id": "gm",
    "name": "Gambie",
    "frenchName": "Gambie",
    "capital": "Banjul",
    "continent": "afrique",
    "flag": "🇬🇲",
    "coordinates": [
      13.44,
      -15.31
    ],
    "isoCode": "GM",
    "isoNumeric": "270",
    "difficulty": 3
  },
  {
    "id": "gh",
    "name": "Ghana",
    "frenchName": "Ghana",
    "capital": "Accra",
    "continent": "afrique",
    "flag": "🇬🇭",
    "coordinates": [
      7.95,
      -1.02
    ],
    "isoCode": "GH",
    "isoNumeric": "288",
    "difficulty": 2
  },
  {
    "id": "gn",
    "name": "Guinée",
    "frenchName": "Guinée",
    "capital": "Conakry",
    "continent": "afrique",
    "flag": "🇬🇳",
    "coordinates": [
      9.95,
      -9.7
    ],
    "isoCode": "GN",
    "isoNumeric": "324",
    "difficulty": 2
  },
  {
    "id": "gw",
    "name": "Guinée-Bissau",
    "frenchName": "Guinée-Bissau",
    "capital": "Bissau",
    "continent": "afrique",
    "flag": "🇬🇼",
    "coordinates": [
      11.8,
      -15.18
    ],
    "isoCode": "GW",
    "isoNumeric": "624",
    "difficulty": 3
  },
  {
    "id": "gq",
    "name": "Guinée équatoriale",
    "frenchName": "Guinée équatoriale",
    "capital": "Malabo",
    "continent": "afrique",
    "flag": "🇬🇶",
    "coordinates": [
      1.65,
      10.27
    ],
    "isoCode": "GQ",
    "isoNumeric": "226",
    "difficulty": 3
  },
  {
    "id": "ke",
    "name": "Kenya",
    "frenchName": "Kenya",
    "capital": "Nairobi",
    "continent": "afrique",
    "flag": "🇰🇪",
    "coordinates": [
      -0.02,
      37.91
    ],
    "isoCode": "KE",
    "isoNumeric": "404",
    "difficulty": 1
  },
  {
    "id": "ls",
    "name": "Lesotho",
    "frenchName": "Lesotho",
    "capital": "Maseru",
    "continent": "afrique",
    "flag": "🇱🇸",
    "coordinates": [
      -29.61,
      28.23
    ],
    "isoCode": "LS",
    "isoNumeric": "426",
    "difficulty": 3
  },
  {
    "id": "lr",
    "name": "Liberia",
    "frenchName": "Liberia",
    "capital": "Monrovia",
    "continent": "afrique",
    "flag": "🇱🇷",
    "coordinates": [
      6.43,
      -9.43
    ],
    "isoCode": "LR",
    "isoNumeric": "430",
    "difficulty": 3
  },
  {
    "id": "ly",
    "name": "Libye",
    "frenchName": "Libye",
    "capital": "Tripoli",
    "continent": "afrique",
    "flag": "🇱🇾",
    "coordinates": [
      26.34,
      17.23
    ],
    "isoCode": "LY",
    "isoNumeric": "434",
    "difficulty": 2
  },
  {
    "id": "mg",
    "name": "Madagascar",
    "frenchName": "Madagascar",
    "capital": "Antananarivo",
    "continent": "afrique",
    "flag": "🇲🇬",
    "coordinates": [
      -18.77,
      46.87
    ],
    "isoCode": "MG",
    "isoNumeric": "450",
    "difficulty": 2
  },
  {
    "id": "mw",
    "name": "Malawi",
    "frenchName": "Malawi",
    "capital": "Lilongwe",
    "continent": "afrique",
    "flag": "🇲🇼",
    "coordinates": [
      -13.25,
      34.3
    ],
    "isoCode": "MW",
    "isoNumeric": "454",
    "difficulty": 3
  },
  {
    "id": "ml",
    "name": "Mali",
    "frenchName": "Mali",
    "capital": "Bamako",
    "continent": "afrique",
    "flag": "🇲🇱",
    "coordinates": [
      17.57,
      -4
    ],
    "isoCode": "ML",
    "isoNumeric": "466",
    "difficulty": 2
  },
  {
    "id": "ma",
    "name": "Maroc",
    "frenchName": "Maroc",
    "capital": "Rabat",
    "continent": "afrique",
    "flag": "🇲🇦",
    "coordinates": [
      31.79,
      -7.09
    ],
    "isoCode": "MA",
    "isoNumeric": "504",
    "difficulty": 1
  },
  {
    "id": "mu",
    "name": "Maurice",
    "frenchName": "Maurice",
    "capital": "Port-Louis",
    "continent": "afrique",
    "flag": "🇲🇺",
    "coordinates": [
      -20.35,
      57.55
    ],
    "isoCode": "MU",
    "isoNumeric": "480",
    "difficulty": 3
  },
  {
    "id": "mr",
    "name": "Mauritanie",
    "frenchName": "Mauritanie",
    "capital": "Nouakchott",
    "continent": "afrique",
    "flag": "🇲🇷",
    "coordinates": [
      21.01,
      -10.94
    ],
    "isoCode": "MR",
    "isoNumeric": "478",
    "difficulty": 2
  },
  {
    "id": "mz",
    "name": "Mozambique",
    "frenchName": "Mozambique",
    "capital": "Maputo",
    "continent": "afrique",
    "flag": "🇲🇿",
    "coordinates": [
      -18.67,
      35.53
    ],
    "isoCode": "MZ",
    "isoNumeric": "508",
    "difficulty": 2
  },
  {
    "id": "na",
    "name": "Namibie",
    "frenchName": "Namibie",
    "capital": "Windhoek",
    "continent": "afrique",
    "flag": "🇳🇦",
    "coordinates": [
      -22.96,
      18.49
    ],
    "isoCode": "NA",
    "isoNumeric": "516",
    "difficulty": 2
  },
  {
    "id": "ne",
    "name": "Niger",
    "frenchName": "Niger",
    "capital": "Niamey",
    "continent": "afrique",
    "flag": "🇳🇪",
    "coordinates": [
      17.61,
      8.08
    ],
    "isoCode": "NE",
    "isoNumeric": "562",
    "difficulty": 2
  },
  {
    "id": "ng",
    "name": "Nigéria",
    "frenchName": "Nigéria",
    "capital": "Abuja",
    "continent": "afrique",
    "flag": "🇳🇬",
    "coordinates": [
      9.08,
      8.68
    ],
    "isoCode": "NG",
    "isoNumeric": "566",
    "difficulty": 1,
    "funFact": "Le Nigéria est le pays le plus peuplé d'Afrique."
  },
  {
    "id": "ug",
    "name": "Ouganda",
    "frenchName": "Ouganda",
    "capital": "Kampala",
    "continent": "afrique",
    "flag": "🇺🇬",
    "coordinates": [
      1.37,
      32.29
    ],
    "isoCode": "UG",
    "isoNumeric": "800",
    "difficulty": 2
  },
  {
    "id": "rw",
    "name": "Rwanda",
    "frenchName": "Rwanda",
    "capital": "Kigali",
    "continent": "afrique",
    "flag": "🇷🇼",
    "coordinates": [
      -1.94,
      29.87
    ],
    "isoCode": "RW",
    "isoNumeric": "646",
    "difficulty": 2
  },
  {
    "id": "st",
    "name": "Sao Tomé-et-Principe",
    "frenchName": "Sao Tomé-et-Principe",
    "capital": "São Tomé",
    "continent": "afrique",
    "flag": "🇸🇹",
    "coordinates": [
      0.19,
      6.61
    ],
    "isoCode": "ST",
    "isoNumeric": "678",
    "difficulty": 3
  },
  {
    "id": "sn",
    "name": "Sénégal",
    "frenchName": "Sénégal",
    "capital": "Dakar",
    "continent": "afrique",
    "flag": "🇸🇳",
    "coordinates": [
      14.5,
      -14.45
    ],
    "isoCode": "SN",
    "isoNumeric": "686",
    "difficulty": 1
  },
  {
    "id": "sc",
    "name": "Seychelles",
    "frenchName": "Seychelles",
    "capital": "Victoria",
    "continent": "afrique",
    "flag": "🇸🇨",
    "coordinates": [
      -4.68,
      55.49
    ],
    "isoCode": "SC",
    "isoNumeric": "690",
    "difficulty": 3
  },
  {
    "id": "sl",
    "name": "Sierra Leone",
    "frenchName": "Sierra Leone",
    "capital": "Freetown",
    "continent": "afrique",
    "flag": "🇸🇱",
    "coordinates": [
      8.46,
      -11.78
    ],
    "isoCode": "SL",
    "isoNumeric": "694",
    "difficulty": 3
  },
  {
    "id": "so",
    "name": "Somalie",
    "frenchName": "Somalie",
    "capital": "Mogadiscio",
    "continent": "afrique",
    "flag": "🇸🇴",
    "coordinates": [
      5.15,
      46.2
    ],
    "isoCode": "SO",
    "isoNumeric": "706",
    "difficulty": 2
  },
  {
    "id": "sd",
    "name": "Soudan",
    "frenchName": "Soudan",
    "capital": "Khartoum",
    "continent": "afrique",
    "flag": "🇸🇩",
    "coordinates": [
      12.86,
      30.22
    ],
    "isoCode": "SD",
    "isoNumeric": "729",
    "difficulty": 2
  },
  {
    "id": "ss",
    "name": "Soudan du Sud",
    "frenchName": "Soudan du Sud",
    "capital": "Djouba",
    "continent": "afrique",
    "flag": "🇸🇸",
    "coordinates": [
      6.88,
      31.31
    ],
    "isoCode": "SS",
    "isoNumeric": "728",
    "difficulty": 2
  },
  {
    "id": "tz",
    "name": "Tanzanie",
    "frenchName": "Tanzanie",
    "capital": "Dodoma",
    "continent": "afrique",
    "flag": "🇹🇿",
    "coordinates": [
      -6.37,
      34.89
    ],
    "isoCode": "TZ",
    "isoNumeric": "834",
    "difficulty": 2
  },
  {
    "id": "tg",
    "name": "Togo",
    "frenchName": "Togo",
    "capital": "Lomé",
    "continent": "afrique",
    "flag": "🇹🇬",
    "coordinates": [
      8.62,
      0.82
    ],
    "isoCode": "TG",
    "isoNumeric": "768",
    "difficulty": 2
  },
  {
    "id": "tn",
    "name": "Tunisie",
    "frenchName": "Tunisie",
    "capital": "Tunis",
    "continent": "afrique",
    "flag": "🇹🇳",
    "coordinates": [
      33.89,
      9.54
    ],
    "isoCode": "TN",
    "isoNumeric": "788",
    "difficulty": 1
  },
  {
    "id": "zm",
    "name": "Zambie",
    "frenchName": "Zambie",
    "capital": "Lusaka",
    "continent": "afrique",
    "flag": "🇿🇲",
    "coordinates": [
      -13.13,
      27.85
    ],
    "isoCode": "ZM",
    "isoNumeric": "894",
    "difficulty": 2
  },
  {
    "id": "zw",
    "name": "Zimbabwe",
    "frenchName": "Zimbabwe",
    "capital": "Harare",
    "continent": "afrique",
    "flag": "🇿🇼",
    "coordinates": [
      -19.02,
      29.15
    ],
    "isoCode": "ZW",
    "isoNumeric": "716",
    "difficulty": 2
  },
  {
    "id": "af",
    "name": "Afghanistan",
    "frenchName": "Afghanistan",
    "capital": "Kaboul",
    "continent": "asie",
    "flag": "🇦🇫",
    "coordinates": [
      33.94,
      67.71
    ],
    "isoCode": "AF",
    "isoNumeric": "004",
    "difficulty": 2
  },
  {
    "id": "sa",
    "name": "Arabie saoudite",
    "frenchName": "Arabie saoudite",
    "capital": "Riyad",
    "continent": "asie",
    "flag": "🇸🇦",
    "coordinates": [
      23.89,
      45.08
    ],
    "isoCode": "SA",
    "isoNumeric": "682",
    "difficulty": 1
  },
  {
    "id": "am",
    "name": "Arménie",
    "frenchName": "Arménie",
    "capital": "Erevan",
    "continent": "asie",
    "flag": "🇦🇲",
    "coordinates": [
      40.07,
      45.04
    ],
    "isoCode": "AM",
    "isoNumeric": "051",
    "difficulty": 2
  },
  {
    "id": "az",
    "name": "Azerbaïdjan",
    "frenchName": "Azerbaïdjan",
    "capital": "Bakou",
    "continent": "asie",
    "flag": "🇦🇿",
    "coordinates": [
      40.14,
      47.58
    ],
    "isoCode": "AZ",
    "isoNumeric": "031",
    "difficulty": 2
  },
  {
    "id": "bh",
    "name": "Bahreïn",
    "frenchName": "Bahreïn",
    "capital": "Manama",
    "continent": "asie",
    "flag": "🇧🇭",
    "coordinates": [
      26.07,
      50.56
    ],
    "isoCode": "BH",
    "isoNumeric": "048",
    "difficulty": 3
  },
  {
    "id": "bd",
    "name": "Bangladesh",
    "frenchName": "Bangladesh",
    "capital": "Dacca",
    "continent": "asie",
    "flag": "🇧🇩",
    "coordinates": [
      23.69,
      90.36
    ],
    "isoCode": "BD",
    "isoNumeric": "050",
    "difficulty": 2
  },
  {
    "id": "bt",
    "name": "Bhoutan",
    "frenchName": "Bhoutan",
    "capital": "Thimphou",
    "continent": "asie",
    "flag": "🇧🇹",
    "coordinates": [
      27.51,
      90.43
    ],
    "isoCode": "BT",
    "isoNumeric": "064",
    "difficulty": 3
  },
  {
    "id": "mm",
    "name": "Birmanie",
    "frenchName": "Birmanie",
    "capital": "Naypyidaw",
    "continent": "asie",
    "flag": "🇲🇲",
    "coordinates": [
      21.91,
      95.96
    ],
    "isoCode": "MM",
    "isoNumeric": "104",
    "difficulty": 2
  },
  {
    "id": "bn",
    "name": "Brunei",
    "frenchName": "Brunei",
    "capital": "Bandar Seri Begawan",
    "continent": "asie",
    "flag": "🇧🇳",
    "coordinates": [
      4.54,
      114.73
    ],
    "isoCode": "BN",
    "isoNumeric": "096",
    "difficulty": 3
  },
  {
    "id": "kh",
    "name": "Cambodge",
    "frenchName": "Cambodge",
    "capital": "Phnom Penh",
    "continent": "asie",
    "flag": "🇰🇭",
    "coordinates": [
      12.57,
      104.99
    ],
    "isoCode": "KH",
    "isoNumeric": "116",
    "difficulty": 2
  },
  {
    "id": "cn",
    "name": "Chine",
    "frenchName": "Chine",
    "capital": "Pékin",
    "continent": "asie",
    "flag": "🇨🇳",
    "coordinates": [
      35.86,
      104.2
    ],
    "isoCode": "CN",
    "isoNumeric": "156",
    "difficulty": 1,
    "funFact": "La Chine est le pays le plus peuplé du monde."
  },
  {
    "id": "kp",
    "name": "Corée du Nord",
    "frenchName": "Corée du Nord",
    "capital": "Pyongyang",
    "continent": "asie",
    "flag": "🇰🇵",
    "coordinates": [
      40.34,
      127.51
    ],
    "isoCode": "KP",
    "isoNumeric": "408",
    "difficulty": 2
  },
  {
    "id": "kr",
    "name": "Corée du Sud",
    "frenchName": "Corée du Sud",
    "capital": "Séoul",
    "continent": "asie",
    "flag": "🇰🇷",
    "coordinates": [
      35.91,
      127.77
    ],
    "isoCode": "KR",
    "isoNumeric": "410",
    "difficulty": 1
  },
  {
    "id": "ae",
    "name": "Émirats arabes unis",
    "frenchName": "Émirats arabes unis",
    "capital": "Abou Dabi",
    "continent": "asie",
    "flag": "🇦🇪",
    "coordinates": [
      23.42,
      53.85
    ],
    "isoCode": "AE",
    "isoNumeric": "784",
    "difficulty": 1
  },
  {
    "id": "ge",
    "name": "Géorgie",
    "frenchName": "Géorgie",
    "capital": "Tbilissi",
    "continent": "asie",
    "flag": "🇬🇪",
    "coordinates": [
      42.32,
      43.36
    ],
    "isoCode": "GE",
    "isoNumeric": "268",
    "difficulty": 2
  },
  {
    "id": "in",
    "name": "Inde",
    "frenchName": "Inde",
    "capital": "New Delhi",
    "continent": "asie",
    "flag": "🇮🇳",
    "coordinates": [
      20.59,
      78.96
    ],
    "isoCode": "IN",
    "isoNumeric": "356",
    "difficulty": 1,
    "funFact": "L'Inde possède plus d'un milliard d'habitants."
  },
  {
    "id": "id",
    "name": "Indonésie",
    "frenchName": "Indonésie",
    "capital": "Jakarta",
    "continent": "asie",
    "flag": "🇮🇩",
    "coordinates": [
      -0.79,
      113.92
    ],
    "isoCode": "ID",
    "isoNumeric": "360",
    "difficulty": 1,
    "funFact": "L'Indonésie est le plus grand archipel du monde."
  },
  {
    "id": "iq",
    "name": "Irak",
    "frenchName": "Irak",
    "capital": "Bagdad",
    "continent": "asie",
    "flag": "🇮🇶",
    "coordinates": [
      33.22,
      43.68
    ],
    "isoCode": "IQ",
    "isoNumeric": "368",
    "difficulty": 2
  },
  {
    "id": "ir",
    "name": "Iran",
    "frenchName": "Iran",
    "capital": "Téhéran",
    "continent": "asie",
    "flag": "🇮🇷",
    "coordinates": [
      32.43,
      53.69
    ],
    "isoCode": "IR",
    "isoNumeric": "364",
    "difficulty": 1
  },
  {
    "id": "il",
    "name": "Israël",
    "frenchName": "Israël",
    "capital": "Jérusalem",
    "continent": "asie",
    "flag": "🇮🇱",
    "coordinates": [
      31.05,
      34.85
    ],
    "isoCode": "IL",
    "isoNumeric": "376",
    "difficulty": 1
  },
  {
    "id": "jp",
    "name": "Japon",
    "frenchName": "Japon",
    "capital": "Tokyo",
    "continent": "asie",
    "flag": "🇯🇵",
    "coordinates": [
      36.2,
      138.25
    ],
    "isoCode": "JP",
    "isoNumeric": "392",
    "difficulty": 1,
    "funFact": "Le Japon est composé de plus de 6 000 îles."
  },
  {
    "id": "jo",
    "name": "Jordanie",
    "frenchName": "Jordanie",
    "capital": "Amman",
    "continent": "asie",
    "flag": "🇯🇴",
    "coordinates": [
      30.59,
      36.24
    ],
    "isoCode": "JO",
    "isoNumeric": "400",
    "difficulty": 2
  },
  {
    "id": "kz",
    "name": "Kazakhstan",
    "frenchName": "Kazakhstan",
    "capital": "Astana",
    "continent": "asie",
    "flag": "🇰🇿",
    "coordinates": [
      48.02,
      66.92
    ],
    "isoCode": "KZ",
    "isoNumeric": "398",
    "difficulty": 2
  },
  {
    "id": "kg",
    "name": "Kirghizistan",
    "frenchName": "Kirghizistan",
    "capital": "Bichkek",
    "continent": "asie",
    "flag": "🇰🇬",
    "coordinates": [
      41.2,
      74.77
    ],
    "isoCode": "KG",
    "isoNumeric": "417",
    "difficulty": 3
  },
  {
    "id": "kw",
    "name": "Koweït",
    "frenchName": "Koweït",
    "capital": "Koweït",
    "continent": "asie",
    "flag": "🇰🇼",
    "coordinates": [
      29.31,
      47.48
    ],
    "isoCode": "KW",
    "isoNumeric": "414",
    "difficulty": 2
  },
  {
    "id": "la",
    "name": "Laos",
    "frenchName": "Laos",
    "capital": "Vientiane",
    "continent": "asie",
    "flag": "🇱🇦",
    "coordinates": [
      19.86,
      102.5
    ],
    "isoCode": "LA",
    "isoNumeric": "418",
    "difficulty": 2
  },
  {
    "id": "lb",
    "name": "Liban",
    "frenchName": "Liban",
    "capital": "Beyrouth",
    "continent": "asie",
    "flag": "🇱🇧",
    "coordinates": [
      33.85,
      35.86
    ],
    "isoCode": "LB",
    "isoNumeric": "422",
    "difficulty": 2
  },
  {
    "id": "my",
    "name": "Malaisie",
    "frenchName": "Malaisie",
    "capital": "Kuala Lumpur",
    "continent": "asie",
    "flag": "🇲🇾",
    "coordinates": [
      4.21,
      101.98
    ],
    "isoCode": "MY",
    "isoNumeric": "458",
    "difficulty": 2
  },
  {
    "id": "mv",
    "name": "Maldives",
    "frenchName": "Maldives",
    "capital": "Malé",
    "continent": "asie",
    "flag": "🇲🇻",
    "coordinates": [
      3.2,
      73.22
    ],
    "isoCode": "MV",
    "isoNumeric": "462",
    "difficulty": 3
  },
  {
    "id": "mn",
    "name": "Mongolie",
    "frenchName": "Mongolie",
    "capital": "Oulan-Bator",
    "continent": "asie",
    "flag": "🇲🇳",
    "coordinates": [
      46.86,
      103.85
    ],
    "isoCode": "MN",
    "isoNumeric": "496",
    "difficulty": 2
  },
  {
    "id": "np",
    "name": "Népal",
    "frenchName": "Népal",
    "capital": "Katmandou",
    "continent": "asie",
    "flag": "🇳🇵",
    "coordinates": [
      28.39,
      84.12
    ],
    "isoCode": "NP",
    "isoNumeric": "524",
    "difficulty": 2
  },
  {
    "id": "om",
    "name": "Oman",
    "frenchName": "Oman",
    "capital": "Mascate",
    "continent": "asie",
    "flag": "🇴🇲",
    "coordinates": [
      21.51,
      55.92
    ],
    "isoCode": "OM",
    "isoNumeric": "512",
    "difficulty": 2
  },
  {
    "id": "uz",
    "name": "Ouzbékistan",
    "frenchName": "Ouzbékistan",
    "capital": "Tachkent",
    "continent": "asie",
    "flag": "🇺🇿",
    "coordinates": [
      41.38,
      64.59
    ],
    "isoCode": "UZ",
    "isoNumeric": "860",
    "difficulty": 3
  },
  {
    "id": "pk",
    "name": "Pakistan",
    "frenchName": "Pakistan",
    "capital": "Islamabad",
    "continent": "asie",
    "flag": "🇵🇰",
    "coordinates": [
      30.38,
      69.35
    ],
    "isoCode": "PK",
    "isoNumeric": "586",
    "difficulty": 1
  },
  {
    "id": "ps",
    "name": "Palestine",
    "frenchName": "Palestine",
    "capital": "Ramallah",
    "continent": "asie",
    "flag": "🇵🇸",
    "coordinates": [
      31.95,
      35.23
    ],
    "isoCode": "PS",
    "isoNumeric": "275",
    "difficulty": 2
  },
  {
    "id": "ph",
    "name": "Philippines",
    "frenchName": "Philippines",
    "capital": "Manille",
    "continent": "asie",
    "flag": "🇵🇭",
    "coordinates": [
      12.88,
      121.77
    ],
    "isoCode": "PH",
    "isoNumeric": "608",
    "difficulty": 2
  },
  {
    "id": "qa",
    "name": "Qatar",
    "frenchName": "Qatar",
    "capital": "Doha",
    "continent": "asie",
    "flag": "🇶🇦",
    "coordinates": [
      25.35,
      51.18
    ],
    "isoCode": "QA",
    "isoNumeric": "634",
    "difficulty": 2
  },
  {
    "id": "sg",
    "name": "Singapour",
    "frenchName": "Singapour",
    "capital": "Singapour",
    "continent": "asie",
    "flag": "🇸🇬",
    "coordinates": [
      1.35,
      103.82
    ],
    "isoCode": "SG",
    "isoNumeric": "702",
    "difficulty": 1
  },
  {
    "id": "lk",
    "name": "Sri Lanka",
    "frenchName": "Sri Lanka",
    "capital": "Sri Jayawardenapura Kotte",
    "continent": "asie",
    "flag": "🇱🇰",
    "coordinates": [
      7.87,
      80.77
    ],
    "isoCode": "LK",
    "isoNumeric": "144",
    "difficulty": 2
  },
  {
    "id": "sy",
    "name": "Syrie",
    "frenchName": "Syrie",
    "capital": "Damas",
    "continent": "asie",
    "flag": "🇸🇾",
    "coordinates": [
      34.8,
      38.99
    ],
    "isoCode": "SY",
    "isoNumeric": "760",
    "difficulty": 2
  },
  {
    "id": "tj",
    "name": "Tadjikistan",
    "frenchName": "Tadjikistan",
    "capital": "Douchanbé",
    "continent": "asie",
    "flag": "🇹🇯",
    "coordinates": [
      38.86,
      71.28
    ],
    "isoCode": "TJ",
    "isoNumeric": "762",
    "difficulty": 3
  },
  {
    "id": "tw",
    "name": "Taïwan",
    "frenchName": "Taïwan",
    "capital": "Taipei",
    "continent": "asie",
    "flag": "🇹🇼",
    "coordinates": [
      23.7,
      120.96
    ],
    "isoCode": "TW",
    "isoNumeric": "158",
    "difficulty": 2
  },
  {
    "id": "th",
    "name": "Thaïlande",
    "frenchName": "Thaïlande",
    "capital": "Bangkok",
    "continent": "asie",
    "flag": "🇹🇭",
    "coordinates": [
      15.87,
      100.99
    ],
    "isoCode": "TH",
    "isoNumeric": "764",
    "difficulty": 1
  },
  {
    "id": "tl",
    "name": "Timor oriental",
    "frenchName": "Timor oriental",
    "capital": "Dili",
    "continent": "asie",
    "flag": "🇹🇱",
    "coordinates": [
      -8.87,
      125.73
    ],
    "isoCode": "TL",
    "isoNumeric": "626",
    "difficulty": 3
  },
  {
    "id": "tm",
    "name": "Turkménistan",
    "frenchName": "Turkménistan",
    "capital": "Achgabat",
    "continent": "asie",
    "flag": "🇹🇲",
    "coordinates": [
      38.97,
      59.56
    ],
    "isoCode": "TM",
    "isoNumeric": "795",
    "difficulty": 3
  },
  {
    "id": "tr",
    "name": "Turquie",
    "frenchName": "Turquie",
    "capital": "Ankara",
    "continent": "asie",
    "flag": "🇹🇷",
    "coordinates": [
      38.96,
      35.24
    ],
    "isoCode": "TR",
    "isoNumeric": "792",
    "difficulty": 1,
    "funFact": "La Turquie est à cheval entre l'Europe et l'Asie."
  },
  {
    "id": "vn",
    "name": "Viêt Nam",
    "frenchName": "Viêt Nam",
    "capital": "Hanoï",
    "continent": "asie",
    "flag": "🇻🇳",
    "coordinates": [
      14.06,
      108.28
    ],
    "isoCode": "VN",
    "isoNumeric": "704",
    "difficulty": 1
  },
  {
    "id": "ye",
    "name": "Yémen",
    "frenchName": "Yémen",
    "capital": "Sanaa",
    "continent": "asie",
    "flag": "🇾🇪",
    "coordinates": [
      15.55,
      48.52
    ],
    "isoCode": "YE",
    "isoNumeric": "887",
    "difficulty": 2
  },
  {
    "id": "au",
    "name": "Australie",
    "frenchName": "Australie",
    "capital": "Canberra",
    "continent": "oceanie",
    "flag": "🇦🇺",
    "coordinates": [
      -25.27,
      133.78
    ],
    "isoCode": "AU",
    "isoNumeric": "036",
    "difficulty": 1,
    "funFact": "L'Australie est à la fois un pays et un continent."
  },
  {
    "id": "fj",
    "name": "Fidji",
    "frenchName": "Fidji",
    "capital": "Suva",
    "continent": "oceanie",
    "flag": "🇫🇯",
    "coordinates": [
      -17.71,
      178.07
    ],
    "isoCode": "FJ",
    "isoNumeric": "242",
    "difficulty": 2
  },
  {
    "id": "ki",
    "name": "Kiribati",
    "frenchName": "Kiribati",
    "capital": "Tarawa-Sud",
    "continent": "oceanie",
    "flag": "🇰🇮",
    "coordinates": [
      -3.37,
      -168.73
    ],
    "isoCode": "KI",
    "isoNumeric": "296",
    "difficulty": 3
  },
  {
    "id": "mh",
    "name": "Îles Marshall",
    "frenchName": "Îles Marshall",
    "capital": "Majuro",
    "continent": "oceanie",
    "flag": "🇲🇭",
    "coordinates": [
      7.13,
      171.18
    ],
    "isoCode": "MH",
    "isoNumeric": "584",
    "difficulty": 3
  },
  {
    "id": "fm",
    "name": "Micronésie",
    "frenchName": "Micronésie",
    "capital": "Palikir",
    "continent": "oceanie",
    "flag": "🇫🇲",
    "coordinates": [
      7.43,
      150.55
    ],
    "isoCode": "FM",
    "isoNumeric": "583",
    "difficulty": 3
  },
  {
    "id": "nr",
    "name": "Nauru",
    "frenchName": "Nauru",
    "capital": "Yaren",
    "continent": "oceanie",
    "flag": "🇳🇷",
    "coordinates": [
      -0.52,
      166.93
    ],
    "isoCode": "NR",
    "isoNumeric": "520",
    "difficulty": 3
  },
  {
    "id": "nz",
    "name": "Nouvelle-Zélande",
    "frenchName": "Nouvelle-Zélande",
    "capital": "Wellington",
    "continent": "oceanie",
    "flag": "🇳🇿",
    "coordinates": [
      -40.9,
      174.89
    ],
    "isoCode": "NZ",
    "isoNumeric": "554",
    "difficulty": 1
  },
  {
    "id": "pw",
    "name": "Palaos",
    "frenchName": "Palaos",
    "capital": "Ngerulmud",
    "continent": "oceanie",
    "flag": "🇵🇼",
    "coordinates": [
      7.51,
      134.58
    ],
    "isoCode": "PW",
    "isoNumeric": "585",
    "difficulty": 3
  },
  {
    "id": "pg",
    "name": "Papouasie-Nouvelle-Guinée",
    "frenchName": "Papouasie-Nouvelle-Guinée",
    "capital": "Port Moresby",
    "continent": "oceanie",
    "flag": "🇵🇬",
    "coordinates": [
      -6.31,
      143.96
    ],
    "isoCode": "PG",
    "isoNumeric": "598",
    "difficulty": 2
  },
  {
    "id": "ws",
    "name": "Samoa",
    "frenchName": "Samoa",
    "capital": "Apia",
    "continent": "oceanie",
    "flag": "🇼🇸",
    "coordinates": [
      -13.76,
      -172.1
    ],
    "isoCode": "WS",
    "isoNumeric": "882",
    "difficulty": 3
  },
  {
    "id": "sb",
    "name": "Îles Salomon",
    "frenchName": "Îles Salomon",
    "capital": "Honiara",
    "continent": "oceanie",
    "flag": "🇸🇧",
    "coordinates": [
      -9.65,
      160.16
    ],
    "isoCode": "SB",
    "isoNumeric": "090",
    "difficulty": 3
  },
  {
    "id": "to",
    "name": "Tonga",
    "frenchName": "Tonga",
    "capital": "Nukuʻalofa",
    "continent": "oceanie",
    "flag": "🇹🇴",
    "coordinates": [
      -21.18,
      -175.2
    ],
    "isoCode": "TO",
    "isoNumeric": "776",
    "difficulty": 3
  },
  {
    "id": "tv",
    "name": "Tuvalu",
    "frenchName": "Tuvalu",
    "capital": "Funafuti",
    "continent": "oceanie",
    "flag": "🇹🇻",
    "coordinates": [
      -7.11,
      177.65
    ],
    "isoCode": "TV",
    "isoNumeric": "798",
    "difficulty": 3
  },
  {
    "id": "vu",
    "name": "Vanuatu",
    "frenchName": "Vanuatu",
    "capital": "Port-Vila",
    "continent": "oceanie",
    "flag": "🇻🇺",
    "coordinates": [
      -15.38,
      166.96
    ],
    "isoCode": "VU",
    "isoNumeric": "548",
    "difficulty": 3
  },
  {
    "id": "ag",
    "name": "Antigua-et-Barbuda",
    "frenchName": "Antigua-et-Barbuda",
    "capital": "Saint John's",
    "continent": "amerique-nord",
    "flag": "🇦🇬",
    "coordinates": [
      17.06,
      -61.8
    ],
    "isoCode": "AG",
    "isoNumeric": "028",
    "difficulty": 3
  },
  {
    "id": "bs",
    "name": "Bahamas",
    "frenchName": "Bahamas",
    "capital": "Nassau",
    "continent": "amerique-nord",
    "flag": "🇧🇸",
    "coordinates": [
      25.03,
      -77.4
    ],
    "isoCode": "BS",
    "isoNumeric": "044",
    "difficulty": 2
  },
  {
    "id": "bb",
    "name": "Barbade",
    "frenchName": "Barbade",
    "capital": "Bridgetown",
    "continent": "amerique-nord",
    "flag": "🇧🇧",
    "coordinates": [
      13.19,
      -59.54
    ],
    "isoCode": "BB",
    "isoNumeric": "052",
    "difficulty": 3
  },
  {
    "id": "bz",
    "name": "Belize",
    "frenchName": "Belize",
    "capital": "Belmopan",
    "continent": "amerique-nord",
    "flag": "🇧🇿",
    "coordinates": [
      17.19,
      -88.5
    ],
    "isoCode": "BZ",
    "isoNumeric": "084",
    "difficulty": 3
  },
  {
    "id": "ca",
    "name": "Canada",
    "frenchName": "Canada",
    "capital": "Ottawa",
    "continent": "amerique-nord",
    "flag": "🇨🇦",
    "coordinates": [
      56.13,
      -106.35
    ],
    "isoCode": "CA",
    "isoNumeric": "124",
    "difficulty": 1,
    "funFact": "Le Canada est le deuxième plus grand pays du monde."
  },
  {
    "id": "cr",
    "name": "Costa Rica",
    "frenchName": "Costa Rica",
    "capital": "San José",
    "continent": "amerique-nord",
    "flag": "🇨🇷",
    "coordinates": [
      9.75,
      -83.75
    ],
    "isoCode": "CR",
    "isoNumeric": "188",
    "difficulty": 2
  },
  {
    "id": "cu",
    "name": "Cuba",
    "frenchName": "Cuba",
    "capital": "La Havane",
    "continent": "amerique-nord",
    "flag": "🇨🇺",
    "coordinates": [
      21.52,
      -77.78
    ],
    "isoCode": "CU",
    "isoNumeric": "192",
    "difficulty": 1
  },
  {
    "id": "dm",
    "name": "Dominique",
    "frenchName": "Dominique",
    "capital": "Roseau",
    "continent": "amerique-nord",
    "flag": "🇩🇲",
    "coordinates": [
      15.41,
      -61.37
    ],
    "isoCode": "DM",
    "isoNumeric": "212",
    "difficulty": 3
  },
  {
    "id": "sv",
    "name": "Salvador",
    "frenchName": "Salvador",
    "capital": "San Salvador",
    "continent": "amerique-nord",
    "flag": "🇸🇻",
    "coordinates": [
      13.79,
      -88.9
    ],
    "isoCode": "SV",
    "isoNumeric": "222",
    "difficulty": 2
  },
  {
    "id": "us",
    "name": "États-Unis",
    "frenchName": "États-Unis",
    "capital": "Washington",
    "continent": "amerique-nord",
    "flag": "🇺🇸",
    "coordinates": [
      37.09,
      -95.71
    ],
    "isoCode": "US",
    "isoNumeric": "840",
    "difficulty": 1,
    "funFact": "Les États-Unis comptent 50 États."
  },
  {
    "id": "gd",
    "name": "Grenade",
    "frenchName": "Grenade",
    "capital": "Saint-Georges",
    "continent": "amerique-nord",
    "flag": "🇬🇩",
    "coordinates": [
      12.12,
      -61.68
    ],
    "isoCode": "GD",
    "isoNumeric": "308",
    "difficulty": 3
  },
  {
    "id": "gt",
    "name": "Guatemala",
    "frenchName": "Guatemala",
    "capital": "Guatemala",
    "continent": "amerique-nord",
    "flag": "🇬🇹",
    "coordinates": [
      15.78,
      -90.23
    ],
    "isoCode": "GT",
    "isoNumeric": "320",
    "difficulty": 2
  },
  {
    "id": "ht",
    "name": "Haïti",
    "frenchName": "Haïti",
    "capital": "Port-au-Prince",
    "continent": "amerique-nord",
    "flag": "🇭🇹",
    "coordinates": [
      18.97,
      -72.29
    ],
    "isoCode": "HT",
    "isoNumeric": "332",
    "difficulty": 2
  },
  {
    "id": "hn",
    "name": "Honduras",
    "frenchName": "Honduras",
    "capital": "Tegucigalpa",
    "continent": "amerique-nord",
    "flag": "🇭🇳",
    "coordinates": [
      15.2,
      -86.24
    ],
    "isoCode": "HN",
    "isoNumeric": "340",
    "difficulty": 2
  },
  {
    "id": "jm",
    "name": "Jamaïque",
    "frenchName": "Jamaïque",
    "capital": "Kingston",
    "continent": "amerique-nord",
    "flag": "🇯🇲",
    "coordinates": [
      18.11,
      -77.3
    ],
    "isoCode": "JM",
    "isoNumeric": "388",
    "difficulty": 2
  },
  {
    "id": "mx",
    "name": "Mexique",
    "frenchName": "Mexique",
    "capital": "Mexico",
    "continent": "amerique-nord",
    "flag": "🇲🇽",
    "coordinates": [
      23.63,
      -102.55
    ],
    "isoCode": "MX",
    "isoNumeric": "484",
    "difficulty": 1,
    "funFact": "Mexico est l'une des plus grandes métropoles du monde."
  },
  {
    "id": "ni",
    "name": "Nicaragua",
    "frenchName": "Nicaragua",
    "capital": "Managua",
    "continent": "amerique-nord",
    "flag": "🇳🇮",
    "coordinates": [
      12.87,
      -85.21
    ],
    "isoCode": "NI",
    "isoNumeric": "558",
    "difficulty": 2
  },
  {
    "id": "pa",
    "name": "Panama",
    "frenchName": "Panama",
    "capital": "Panama",
    "continent": "amerique-nord",
    "flag": "🇵🇦",
    "coordinates": [
      8.54,
      -80.78
    ],
    "isoCode": "PA",
    "isoNumeric": "591",
    "difficulty": 2,
    "funFact": "Le canal de Panama relie l'Atlantique au Pacifique."
  },
  {
    "id": "do",
    "name": "République dominicaine",
    "frenchName": "République dominicaine",
    "capital": "Saint-Domingue",
    "continent": "amerique-nord",
    "flag": "🇩🇴",
    "coordinates": [
      18.74,
      -70.16
    ],
    "isoCode": "DO",
    "isoNumeric": "214",
    "difficulty": 2
  },
  {
    "id": "kn",
    "name": "Saint-Kitts-et-Nevis",
    "frenchName": "Saint-Kitts-et-Nevis",
    "capital": "Basseterre",
    "continent": "amerique-nord",
    "flag": "🇰🇳",
    "coordinates": [
      17.36,
      -62.78
    ],
    "isoCode": "KN",
    "isoNumeric": "659",
    "difficulty": 3
  },
  {
    "id": "lc",
    "name": "Sainte-Lucie",
    "frenchName": "Sainte-Lucie",
    "capital": "Castries",
    "continent": "amerique-nord",
    "flag": "🇱🇨",
    "coordinates": [
      13.91,
      -60.98
    ],
    "isoCode": "LC",
    "isoNumeric": "662",
    "difficulty": 3
  },
  {
    "id": "vc",
    "name": "Saint-Vincent-et-les-Grenadines",
    "frenchName": "Saint-Vincent-et-les-Grenadines",
    "capital": "Kingstown",
    "continent": "amerique-nord",
    "flag": "🇻🇨",
    "coordinates": [
      12.98,
      -61.29
    ],
    "isoCode": "VC",
    "isoNumeric": "670",
    "difficulty": 3
  },
  {
    "id": "tt",
    "name": "Trinité-et-Tobago",
    "frenchName": "Trinité-et-Tobago",
    "capital": "Port-d'Espagne",
    "continent": "amerique-nord",
    "flag": "🇹🇹",
    "coordinates": [
      10.69,
      -61.22
    ],
    "isoCode": "TT",
    "isoNumeric": "780",
    "difficulty": 3
  },
  {
    "id": "ar",
    "name": "Argentine",
    "frenchName": "Argentine",
    "capital": "Buenos Aires",
    "continent": "amerique-sud",
    "flag": "🇦🇷",
    "coordinates": [
      -38.42,
      -63.62
    ],
    "isoCode": "AR",
    "isoNumeric": "032",
    "difficulty": 1
  },
  {
    "id": "bo",
    "name": "Bolivie",
    "frenchName": "Bolivie",
    "capital": "Sucre",
    "continent": "amerique-sud",
    "flag": "🇧🇴",
    "coordinates": [
      -16.29,
      -63.59
    ],
    "isoCode": "BO",
    "isoNumeric": "068",
    "difficulty": 2,
    "funFact": "La Bolivie a deux capitales : Sucre et La Paz."
  },
  {
    "id": "br",
    "name": "Brésil",
    "frenchName": "Brésil",
    "capital": "Brasilia",
    "continent": "amerique-sud",
    "flag": "🇧🇷",
    "coordinates": [
      -14.24,
      -51.93
    ],
    "isoCode": "BR",
    "isoNumeric": "076",
    "difficulty": 1,
    "funFact": "Le Brésil couvre près de la moitié de l'Amérique du Sud."
  },
  {
    "id": "cl",
    "name": "Chili",
    "frenchName": "Chili",
    "capital": "Santiago",
    "continent": "amerique-sud",
    "flag": "🇨🇱",
    "coordinates": [
      -35.68,
      -71.54
    ],
    "isoCode": "CL",
    "isoNumeric": "152",
    "difficulty": 1
  },
  {
    "id": "co",
    "name": "Colombie",
    "frenchName": "Colombie",
    "capital": "Bogota",
    "continent": "amerique-sud",
    "flag": "🇨🇴",
    "coordinates": [
      4.57,
      -74.3
    ],
    "isoCode": "CO",
    "isoNumeric": "170",
    "difficulty": 1
  },
  {
    "id": "ec",
    "name": "Équateur",
    "frenchName": "Équateur",
    "capital": "Quito",
    "continent": "amerique-sud",
    "flag": "🇪🇨",
    "coordinates": [
      -1.83,
      -78.18
    ],
    "isoCode": "EC",
    "isoNumeric": "218",
    "difficulty": 2
  },
  {
    "id": "gy",
    "name": "Guyana",
    "frenchName": "Guyana",
    "capital": "Georgetown",
    "continent": "amerique-sud",
    "flag": "🇬🇾",
    "coordinates": [
      4.86,
      -58.93
    ],
    "isoCode": "GY",
    "isoNumeric": "328",
    "difficulty": 3
  },
  {
    "id": "py",
    "name": "Paraguay",
    "frenchName": "Paraguay",
    "capital": "Asunción",
    "continent": "amerique-sud",
    "flag": "🇵🇾",
    "coordinates": [
      -23.44,
      -58.44
    ],
    "isoCode": "PY",
    "isoNumeric": "600",
    "difficulty": 2
  },
  {
    "id": "pe",
    "name": "Pérou",
    "frenchName": "Pérou",
    "capital": "Lima",
    "continent": "amerique-sud",
    "flag": "🇵🇪",
    "coordinates": [
      -9.19,
      -75.02
    ],
    "isoCode": "PE",
    "isoNumeric": "604",
    "difficulty": 1
  },
  {
    "id": "sr",
    "name": "Suriname",
    "frenchName": "Suriname",
    "capital": "Paramaribo",
    "continent": "amerique-sud",
    "flag": "🇸🇷",
    "coordinates": [
      3.92,
      -56.03
    ],
    "isoCode": "SR",
    "isoNumeric": "740",
    "difficulty": 3
  },
  {
    "id": "uy",
    "name": "Uruguay",
    "frenchName": "Uruguay",
    "capital": "Montevideo",
    "continent": "amerique-sud",
    "flag": "🇺🇾",
    "coordinates": [
      -32.52,
      -55.77
    ],
    "isoCode": "UY",
    "isoNumeric": "858",
    "difficulty": 2
  },
  {
    "id": "ve",
    "name": "Venezuela",
    "frenchName": "Venezuela",
    "capital": "Caracas",
    "continent": "amerique-sud",
    "flag": "🇻🇪",
    "coordinates": [
      6.42,
      -66.59
    ],
    "isoCode": "VE",
    "isoNumeric": "862",
    "difficulty": 1
  }
];

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
