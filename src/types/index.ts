import type { ContinentId } from "@/data/countries";

export type PlayerLevelId =
  | "debutant"
  | "novice"
  | "intermediaire"
  | "avance"
  | "maitre";

export interface CountryProgress {
  mastery: number;
  correct: number;
  incorrect: number;
  known: boolean;
  nextReviewAt: number;
  lastSeenAt: number;
  easeFactor: number;
  intervalDays: number;
}

export interface WaterProgress {
  mastery: number;
  correct: number;
  incorrect: number;
  known: boolean;
}

export interface RecentActivity {
  id: string;
  type: "quiz" | "learn" | "review" | "exam" | "oceans";
  label: string;
  score?: number;
  total?: number;
  at: number;
}

export interface ExamPathProgress {
  continents: boolean;
  mainCountries: boolean;
  allCountries: boolean;
  capitals: boolean;
  worldMap: boolean;
  oceans: boolean;
  finalQuiz: boolean;
}

export interface UserPreferences {
  sound: boolean;
  examMode: boolean;
  preferredContinent: ContinentId | "world" | null;
}

export interface UserProgress {
  version: number;
  onboarded: boolean;
  xp: number;
  level: number;
  currentStreak: number;
  bestStreak: number;
  totalCorrect: number;
  totalIncorrect: number;
  totalAnswered: number;
  quizzesCompleted: number;
  examsCompleted: number;
  unlockedAchievements: string[];
  countries: Record<string, CountryProgress>;
  waters: Record<string, WaterProgress>;
  recentActivity: RecentActivity[];
  examPath: ExamPathProgress;
  preferences: UserPreferences;
  adaptiveDifficulty: number;
  lastPlayedAt: number;
}

export type ExerciseMode =
  | "discovery"
  | "flag-mcq"
  | "find-country"
  | "capital-mcq"
  | "country-from-capital"
  | "flag-written"
  | "locate-country"
  | "oceans";

export type QuestionKind =
  | "flag-to-country"
  | "country-to-capital"
  | "capital-to-country"
  | "flag-written"
  | "find-on-map"
  | "locate-on-map"
  | "ocean-mcq"
  | "ocean-written"
  | "ocean-map";

export interface QuizQuestion {
  id: string;
  kind: QuestionKind;
  prompt: string;
  countryId?: string;
  waterId?: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  flag?: string;
  isoCode?: string;
}

export interface QuizResult {
  correct: number;
  total: number;
  mistakes: { countryId?: string; waterId?: string; prompt: string; answer: string; correct: string }[];
}
