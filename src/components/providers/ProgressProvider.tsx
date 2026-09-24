"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ContinentId } from "@/data/countries";
import { checkAchievements } from "@/lib/achievements";
import { applyAnswerToCountry, ensureCountryProgress } from "@/lib/srs";
import {
  createDefaultProgress,
  createDefaultWaterProgress,
  loadProgress,
  resetProgress as resetStored,
  saveProgress,
} from "@/lib/storage";
import { XP_REWARDS, levelFromXp } from "@/lib/xp";
import type { RecentActivity, UserProgress } from "@/types";

interface ProgressContextValue {
  progress: UserProgress;
  hydrated: boolean;
  recordAnswer: (opts: {
    countryId?: string;
    waterId?: string;
    correct: boolean;
    markKnown?: boolean;
  }) => { xpGained: number; newAchievements: string[]; streak: number };
  markCountryKnown: (countryId: string, known: boolean) => void;
  markWaterKnown: (waterId: string) => void;
  addActivity: (activity: Omit<RecentActivity, "id" | "at">) => void;
  completeQuiz: (correct: number, total: number) => void;
  completeExam: () => void;
  setOnboarded: (opts: {
    continent: ContinentId | "world";
    examMode: boolean;
  }) => void;
  updateExamPath: (key: keyof UserProgress["examPath"], value?: boolean) => void;
  updatePreferences: (prefs: Partial<UserProgress["preferences"]>) => void;
  resetAll: () => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(createDefaultProgress);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProgress(loadProgress());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveProgress(progress);
  }, [progress, hydrated]);

  const commit = useCallback((updater: (prev: UserProgress) => UserProgress) => {
    setProgress((prev) => {
      const next = updater(prev);
      next.level = levelFromXp(next.xp);
      next.lastPlayedAt = Date.now();
      const newly = checkAchievements(next);
      if (newly.length) {
        next.unlockedAchievements = [
          ...new Set([...next.unlockedAchievements, ...newly]),
        ];
      }
      return { ...next };
    });
  }, []);

  const recordAnswer: ProgressContextValue["recordAnswer"] = useCallback(
    ({ countryId, waterId, correct, markKnown }) => {
      let xpGained = 0;
      let streak = 0;
      let newAchievements: string[] = [];

      setProgress((prev) => {
        const next: UserProgress = {
          ...prev,
          countries: { ...prev.countries },
          waters: { ...prev.waters },
        };

        next.totalAnswered += 1;
        if (correct) {
          next.totalCorrect += 1;
          next.currentStreak += 1;
          next.bestStreak = Math.max(next.bestStreak, next.currentStreak);
          xpGained += XP_REWARDS.correct;
          if (next.currentStreak > 0 && next.currentStreak % 5 === 0) {
            xpGained += XP_REWARDS.streakBonus;
          }
          next.adaptiveDifficulty = Math.min(5, next.adaptiveDifficulty + 0.15);
        } else {
          next.totalIncorrect += 1;
          next.currentStreak = 0;
          next.adaptiveDifficulty = Math.max(1, next.adaptiveDifficulty - 0.35);
        }

        streak = next.currentStreak;

        if (countryId) {
          const before = ensureCountryProgress(next.countries, countryId);
          const wasKnown = before.known;
          next.countries[countryId] = applyAnswerToCountry(
            before,
            correct,
            markKnown
          );
          if (!wasKnown && next.countries[countryId]!.known) {
            xpGained += XP_REWARDS.newCountry;
          }
          if (correct && markKnown === undefined) {
            // review success bonus when already known
            if (wasKnown) xpGained += Math.floor(XP_REWARDS.reviewSuccess / 2);
          }
        }

        if (waterId) {
          const w = next.waters[waterId] ?? createDefaultWaterProgress();
          if (correct) {
            w.correct += 1;
            w.mastery = Math.min(100, w.mastery + 20);
            if (w.mastery >= 50) w.known = true;
          } else {
            w.incorrect += 1;
            w.mastery = Math.max(0, w.mastery - 15);
          }
          next.waters[waterId] = { ...w };
        }

        next.xp += xpGained;
        next.level = levelFromXp(next.xp);
        next.lastPlayedAt = Date.now();

        const beforeAch = new Set(prev.unlockedAchievements);
        const newly = checkAchievements(next).filter((id) => !beforeAch.has(id));
        newAchievements = newly;
        if (newly.length) {
          next.unlockedAchievements = [
            ...new Set([...next.unlockedAchievements, ...newly]),
          ];
        }

        return next;
      });

      return { xpGained, newAchievements, streak };
    },
    []
  );

  const markCountryKnown = useCallback((countryId: string, known: boolean) => {
    commit((prev) => {
      const next = { ...prev, countries: { ...prev.countries } };
      const p = ensureCountryProgress(next.countries, countryId);
      const wasKnown = p.known;
      next.countries[countryId] = {
        ...p,
        known,
        mastery: known ? Math.max(p.mastery, 40) : p.mastery,
        lastSeenAt: Date.now(),
        nextReviewAt: Date.now() + (known ? 2 * 24 * 60 * 60 * 1000 : 0),
      };
      if (known && !wasKnown) next.xp += XP_REWARDS.discoveryKnown;
      return next;
    });
  }, [commit]);

  const markWaterKnown = useCallback((waterId: string) => {
    commit((prev) => {
      const next = { ...prev, waters: { ...prev.waters } };
      const w = next.waters[waterId] ?? createDefaultWaterProgress();
      next.waters[waterId] = {
        ...w,
        known: true,
        mastery: Math.max(w.mastery, 50),
      };
      next.xp += XP_REWARDS.discoveryKnown;
      return next;
    });
  }, [commit]);

  const addActivity = useCallback((activity: Omit<RecentActivity, "id" | "at">) => {
    commit((prev) => ({
      ...prev,
      recentActivity: [
        { ...activity, id: `${Date.now()}`, at: Date.now() },
        ...prev.recentActivity,
      ].slice(0, 12),
    }));
  }, [commit]);

  const completeQuiz = useCallback((correct: number, total: number) => {
    commit((prev) => ({
      ...prev,
      xp: prev.xp + XP_REWARDS.quizComplete + correct * 2,
      quizzesCompleted: prev.quizzesCompleted + 1,
      recentActivity: [
        {
          id: `${Date.now()}`,
          type: "quiz" as const,
          label: "Quiz rapide",
          score: correct,
          total,
          at: Date.now(),
        },
        ...prev.recentActivity,
      ].slice(0, 12),
    }));
  }, [commit]);

  const completeExam = useCallback(() => {
    commit((prev) => ({
      ...prev,
      xp: prev.xp + XP_REWARDS.examComplete,
      examsCompleted: prev.examsCompleted + 1,
      examPath: { ...prev.examPath, finalQuiz: true },
    }));
  }, [commit]);

  const setOnboarded = useCallback(
    (opts: { continent: ContinentId | "world"; examMode: boolean }) => {
      commit((prev) => ({
        ...prev,
        onboarded: true,
        preferences: {
          ...prev.preferences,
          preferredContinent: opts.continent,
          examMode: opts.examMode,
        },
      }));
    },
    [commit]
  );

  const updateExamPath = useCallback(
    (key: keyof UserProgress["examPath"], value = true) => {
      commit((prev) => ({
        ...prev,
        examPath: { ...prev.examPath, [key]: value },
      }));
    },
    [commit]
  );

  const updatePreferences = useCallback(
    (prefs: Partial<UserProgress["preferences"]>) => {
      commit((prev) => ({
        ...prev,
        preferences: { ...prev.preferences, ...prefs },
      }));
    },
    [commit]
  );

  const resetAll = useCallback(() => {
    const fresh = resetStored();
    setProgress(fresh);
  }, []);

  const value = useMemo(
    () => ({
      progress,
      hydrated,
      recordAnswer,
      markCountryKnown,
      markWaterKnown,
      addActivity,
      completeQuiz,
      completeExam,
      setOnboarded,
      updateExamPath,
      updatePreferences,
      resetAll,
    }),
    [
      progress,
      hydrated,
      recordAnswer,
      markCountryKnown,
      markWaterKnown,
      addActivity,
      completeQuiz,
      completeExam,
      setOnboarded,
      updateExamPath,
      updatePreferences,
      resetAll,
    ]
  );

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
