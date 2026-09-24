import {
  COUNTRIES,
  CONTINENT_META,
  getCountriesByContinent,
  type ContinentId,
  type Country,
} from "@/data/countries";
import { WATER_BODIES, type WaterBody } from "@/data/oceans";
import type { CountryProgress, QuizQuestion, UserProgress } from "@/types";
import { pickRandom, shuffle } from "@/lib/utils";

function distractors(correct: Country, pool: Country[], count = 3): Country[] {
  const sameContinent = pool.filter(
    (c) => c.id !== correct.id && c.continent === correct.continent
  );
  const others = pool.filter((c) => c.id !== correct.id);
  const source = sameContinent.length >= count ? sameContinent : others;
  return pickRandom(source, count);
}

function capitalDistractors(correct: Country, pool: Country[], count = 3): string[] {
  return distractors(correct, pool, count).map((c) => c.capital);
}

export function getEligibleCountries(
  progress: UserProgress,
  continent?: ContinentId | "world",
  options?: { includeUnknown?: boolean; maxDifficulty?: number }
): Country[] {
  const maxDiff = options?.maxDifficulty ?? progress.adaptiveDifficulty;
  let pool =
    continent && continent !== "world"
      ? getCountriesByContinent(continent)
      : [...COUNTRIES];

  pool = pool.filter((c) => c.difficulty <= maxDiff + 1);

  const knownIds = new Set(
    Object.entries(progress.countries)
      .filter(([, p]) => p.known || p.mastery > 0 || p.correct > 0)
      .map(([id]) => id)
  );

  if (!options?.includeUnknown && knownIds.size >= 4) {
    const known = pool.filter((c) => knownIds.has(c.id));
    if (known.length >= 4) {
      const unknownEasy = pool.filter(
        (c) => !knownIds.has(c.id) && c.difficulty === 1
      );
      return [...known, ...pickRandom(unknownEasy, Math.min(3, unknownEasy.length))];
    }
  }

  if (knownIds.size < 4) {
    return pool.filter((c) => c.difficulty === 1);
  }

  return pool;
}

export function buildFlagMcq(country: Country, pool: Country[]): QuizQuestion {
  const opts = shuffle([country, ...distractors(country, pool)]).map((c) => c.name);
  return {
    id: `flag-${country.id}-${Date.now()}`,
    kind: "flag-to-country",
    prompt: "Quel pays possède ce drapeau ?",
    countryId: country.id,
    options: opts,
    correctAnswer: country.name,
    explanation: `${country.name} — capitale : ${country.capital}. Continent : ${CONTINENT_META[country.continent].name}.`,
    isoCode: country.isoCode,
  };
}

export function buildCapitalMcq(country: Country, pool: Country[]): QuizQuestion {
  const opts = shuffle([country.capital, ...capitalDistractors(country, pool)]);
  return {
    id: `cap-${country.id}-${Date.now()}`,
    kind: "country-to-capital",
    prompt: `Quelle est la capitale de ${country.name} ?`,
    countryId: country.id,
    options: opts,
    correctAnswer: country.capital,
    explanation: `La capitale de ${country.name} est ${country.capital}.`,
    isoCode: country.isoCode,
  };
}

export function buildCountryFromCapital(country: Country, pool: Country[]): QuizQuestion {
  const opts = shuffle([country, ...distractors(country, pool)]).map((c) => c.name);
  return {
    id: `cfc-${country.id}-${Date.now()}`,
    kind: "capital-to-country",
    prompt: `${country.capital} est la capitale de quel pays ?`,
    countryId: country.id,
    options: opts,
    correctAnswer: country.name,
    explanation: `${country.capital} est la capitale de ${country.name}.`,
    isoCode: country.isoCode,
  };
}

export function buildFlagWritten(country: Country): QuizQuestion {
  return {
    id: `fw-${country.id}-${Date.now()}`,
    kind: "flag-written",
    prompt: "Quel pays possède ce drapeau ? Écris le nom.",
    countryId: country.id,
    correctAnswer: country.name,
    explanation: `C'est ${country.name} (capitale : ${country.capital}).`,
    isoCode: country.isoCode,
  };
}

export function buildFindOnMap(country: Country): QuizQuestion {
  return {
    id: `map-${country.id}-${Date.now()}`,
    kind: "find-on-map",
    prompt: `Trouve ${country.name} sur la carte.`,
    countryId: country.id,
    correctAnswer: country.id,
    explanation: `${country.name} se trouve en ${CONTINENT_META[country.continent].name}.`,
    isoCode: country.isoCode,
  };
}

export function buildLocateOnMap(country: Country): QuizQuestion {
  return {
    id: `loc-${country.id}-${Date.now()}`,
    kind: "locate-on-map",
    prompt: `Montre-moi où se trouve ${country.name}.`,
    countryId: country.id,
    correctAnswer: country.id,
    explanation: `${country.name} — ${CONTINENT_META[country.continent].name}.`,
    isoCode: country.isoCode,
  };
}

export function buildOceanMcq(water: WaterBody, pool: WaterBody[]): QuizQuestion {
  const wrong = pickRandom(
    pool.filter((w) => w.id !== water.id),
    3
  ).map((w) => w.name);
  return {
    id: `ow-${water.id}-${Date.now()}`,
    kind: "ocean-mcq",
    prompt: water.type === "ocean" ? "Quel océan est décrit ?" : "Quelle mer est décrite ?",
    waterId: water.id,
    options: shuffle([water.name, ...wrong]),
    correctAnswer: water.name,
    explanation: `${water.name} : ${water.description}`,
  };
}

function selectCountriesForQuiz(
  progress: UserProgress,
  count: number,
  continent?: ContinentId | "world"
): Country[] {
  const eligible = getEligibleCountries(progress, continent, {
    maxDifficulty: progress.adaptiveDifficulty,
  });
  const weak = Object.entries(progress.countries)
    .filter(([, p]) => p.mastery < 70 && p.correct + p.incorrect > 0)
    .map(([id]) => id);

  const recent = Object.entries(progress.countries)
    .filter(([, p]) => p.lastSeenAt > Date.now() - 1000 * 60 * 60 * 24)
    .map(([id]) => id);

  const prioritized = eligible.filter(
    (c) => weak.includes(c.id) || recent.includes(c.id)
  );
  const rest = eligible.filter((c) => !prioritized.some((p) => p.id === c.id));

  const selected = [
    ...pickRandom(prioritized, Math.min(Math.ceil(count * 0.5), prioritized.length)),
    ...pickRandom(rest, count),
  ];

  const unique = new Map(selected.map((c) => [c.id, c]));
  let result = [...unique.values()].slice(0, count);

  if (result.length < count) {
    const fillers = pickRandom(
      eligible.filter((c) => !unique.has(c.id)),
      count - result.length
    );
    result = [...result, ...fillers];
  }

  return result;
}

export function generateQuizQuestions(
  progress: UserProgress,
  count: number,
  continent?: ContinentId | "world",
  mode: "mixed" | "flags" | "capitals" | "map" | "exam" = "map"
): QuizQuestion[] {
  const countries = selectCountriesForQuiz(progress, count, continent);
  const pool = getEligibleCountries(progress, continent, { includeUnknown: true });

  return countries.map((country, index) => {
    let kinds: Array<() => QuizQuestion> = [];

    if (mode === "flags") {
      kinds = [
        () => buildFlagMcq(country, pool),
        () => buildFlagWritten(country),
      ];
    } else if (mode === "capitals") {
      kinds = [
        () => buildCapitalMcq(country, pool),
        () => buildCountryFromCapital(country, pool),
      ];
    } else if (mode === "exam") {
      // Examen = surtout carte (+ un peu de capitales)
      kinds = [
        () => buildFindOnMap(country),
        () => buildLocateOnMap(country),
        () => buildFindOnMap(country),
        () => buildCapitalMcq(country, pool),
      ];
    } else {
      // Défaut / mixed = situer sur la carte
      kinds = [() => buildFindOnMap(country), () => buildLocateOnMap(country)];
    }

    const builder = kinds[index % kinds.length]!;
    return builder();
  });
}

export function generateOceanQuestions(count: number): QuizQuestion[] {
  const waters = pickRandom(WATER_BODIES, Math.min(count, WATER_BODIES.length));
  return waters.map((w, i) => {
    if (i % 2 === 0) return buildOceanMcq(w, WATER_BODIES);
    return {
      id: `owr-${w.id}-${Date.now()}-${i}`,
      kind: "ocean-written" as const,
      prompt: `Écris le nom : ${w.description}`,
      waterId: w.id,
      correctAnswer: w.name,
      explanation: `${w.name} — ${w.description}`,
    };
  });
}

export function getContinentStats(
  progress: UserProgress,
  continent: ContinentId
): { total: number; known: number; mastered: number; percent: number } {
  const countries = getCountriesByContinent(continent);
  const known = countries.filter((c) => progress.countries[c.id]?.known).length;
  const mastered = countries.filter(
    (c) => (progress.countries[c.id]?.mastery ?? 0) >= 80
  ).length;
  return {
    total: countries.length,
    known,
    mastered,
    percent: countries.length
      ? Math.round((known / countries.length) * 100)
      : 0,
  };
}

export function getGlobalStats(progress: UserProgress) {
  const total = COUNTRIES.length;
  const known = Object.values(progress.countries).filter((p) => p.known).length;
  const mastered = Object.values(progress.countries).filter((p) => p.mastery >= 80).length;
  const weak = Object.values(progress.countries).filter(
    (p) => p.correct + p.incorrect > 0 && p.mastery < 70
  ).length;
  const rate =
    progress.totalAnswered > 0
      ? Math.round((progress.totalCorrect / progress.totalAnswered) * 100)
      : 0;

  const continentStats = (Object.keys(CONTINENT_META) as ContinentId[]).map((id) => ({
    ...CONTINENT_META[id],
    ...getContinentStats(progress, id),
  }));

  const best = [...continentStats].sort((a, b) => b.percent - a.percent)[0];
  const worst = [...continentStats]
    .filter((c) => c.known > 0 || c.percent > 0)
    .sort((a, b) => a.percent - b.percent)[0] ?? continentStats[0];

  return {
    total,
    known,
    mastered,
    weak,
    worldPercent: Math.round((known / total) * 100),
    successRate: rate,
    continentStats,
    bestContinent: best,
    worstContinent: worst,
  };
}

export function sortCountriesForDiscovery(continent: ContinentId): Country[] {
  return [...getCountriesByContinent(continent)].sort((a, b) => {
    if (a.difficulty !== b.difficulty) return a.difficulty - b.difficulty;
    return a.name.localeCompare(b.name, "fr");
  });
}

export function masteryLabel(mastery: number): string {
  if (mastery >= 80) return "Maîtrisé";
  if (mastery >= 50) return "En progrès";
  if (mastery > 0) return "À revoir";
  return "Nouveau";
}

export function getCountryMastery(
  progress: UserProgress,
  countryId: string
): CountryProgress | undefined {
  return progress.countries[countryId];
}
