import { ACHIEVEMENTS } from "@/data/achievements";
import { COUNTRIES, getCountriesByContinent, type ContinentId } from "@/data/countries";
import type { UserProgress } from "@/types";

export function checkAchievements(progress: UserProgress): string[] {
  const newly: string[] = [];
  const unlocked = new Set(progress.unlockedAchievements);

  const mastered = Object.values(progress.countries).filter((p) => p.mastery >= 80).length;
  const learned = Object.values(progress.countries).filter((p) => p.known).length;
  const oceansLearned = Object.values(progress.waters).filter((p) => p.known).length;

  const continentComplete = (id: ContinentId) => {
    const countries = getCountriesByContinent(id);
    return countries.every((c) => (progress.countries[c.id]?.mastery ?? 0) >= 80);
  };

  for (const a of ACHIEVEMENTS) {
    if (unlocked.has(a.id)) continue;
    let ok = false;
    const c = a.condition;
    switch (c.type) {
      case "countries_learned":
        ok = learned >= c.value;
        break;
      case "correct_answers":
        ok = progress.totalCorrect >= c.value;
        break;
      case "streak":
        ok = progress.bestStreak >= c.value;
        break;
      case "mastered":
        ok = mastered >= c.value;
        break;
      case "quiz_completed":
        ok = progress.quizzesCompleted >= c.value;
        break;
      case "oceans_learned":
        ok = oceansLearned >= c.value;
        break;
      case "level":
        ok = progress.level >= c.value;
        break;
      case "continent_complete":
        if (c.value === "ameriques") {
          ok = continentComplete("amerique-nord") && continentComplete("amerique-sud");
        } else {
          ok = continentComplete(c.value as ContinentId);
        }
        break;
    }
    if (ok) newly.push(a.id);
  }

  return newly;
}

export function isContinentMastered(progress: UserProgress, continent: ContinentId): boolean {
  return getCountriesByContinent(continent).every(
    (c) => (progress.countries[c.id]?.mastery ?? 0) >= 80
  );
}

export function nextGoal(progress: UserProgress): { label: string; detail: string } {
  const continents: ContinentId[] = [
    "europe",
    "amerique-nord",
    "amerique-sud",
    "afrique",
    "asie",
    "oceanie",
  ];

  for (const id of continents) {
    const list = getCountriesByContinent(id);
    const known = list.filter((c) => progress.countries[c.id]?.known).length;
    if (known < list.length) {
      const names: Record<ContinentId, string> = {
        europe: "Europe",
        afrique: "Afrique",
        asie: "Asie",
        oceanie: "Océanie",
        "amerique-nord": "Amérique du Nord",
        "amerique-sud": "Amérique du Sud",
      };
      return {
        label: names[id],
        detail: `${known} / ${list.length} pays connus`,
      };
    }
  }

  return {
    label: "Monde",
    detail: `${Object.values(progress.countries).filter((p) => p.known).length} / ${COUNTRIES.length} pays connus`,
  };
}
