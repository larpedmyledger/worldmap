import type { UserProgress, CountryProgress, WaterProgress } from "@/types";

export const STORAGE_KEY = "worldmap-progress-v1";

export function createDefaultCountryProgress(): CountryProgress {
  return {
    mastery: 0,
    correct: 0,
    incorrect: 0,
    known: false,
    nextReviewAt: Date.now(),
    lastSeenAt: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  };
}

export function createDefaultWaterProgress(): WaterProgress {
  return {
    mastery: 0,
    correct: 0,
    incorrect: 0,
    known: false,
  };
}

export function createDefaultProgress(): UserProgress {
  return {
    version: 1,
    onboarded: false,
    xp: 0,
    level: 1,
    currentStreak: 0,
    bestStreak: 0,
    totalCorrect: 0,
    totalIncorrect: 0,
    totalAnswered: 0,
    quizzesCompleted: 0,
    examsCompleted: 0,
    unlockedAchievements: [],
    countries: {},
    waters: {},
    recentActivity: [],
    examPath: {
      continents: false,
      mainCountries: false,
      allCountries: false,
      capitals: false,
      worldMap: false,
      oceans: false,
      finalQuiz: false,
    },
    preferences: {
      sound: true,
      examMode: false,
      preferredContinent: null,
    },
    adaptiveDifficulty: 1,
    lastPlayedAt: Date.now(),
  };
}

export function loadProgress(): UserProgress {
  if (typeof window === "undefined") return createDefaultProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultProgress();
    const parsed = JSON.parse(raw) as UserProgress;
    return {
      ...createDefaultProgress(),
      ...parsed,
      preferences: {
        ...createDefaultProgress().preferences,
        ...parsed.preferences,
      },
      examPath: {
        ...createDefaultProgress().examPath,
        ...parsed.examPath,
      },
      countries: parsed.countries ?? {},
      waters: parsed.waters ?? {},
      recentActivity: parsed.recentActivity ?? [],
      unlockedAchievements: parsed.unlockedAchievements ?? [],
    };
  } catch {
    return createDefaultProgress();
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function resetProgress(): UserProgress {
  const fresh = createDefaultProgress();
  saveProgress(fresh);
  return fresh;
}
