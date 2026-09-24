import type { CountryProgress } from "@/types";
import { createDefaultCountryProgress } from "@/lib/storage";

const DAY_MS = 24 * 60 * 60 * 1000;

export function ensureCountryProgress(
  map: Record<string, CountryProgress>,
  countryId: string
): CountryProgress {
  if (!map[countryId]) {
    map[countryId] = createDefaultCountryProgress();
  }
  return map[countryId]!;
}

export function applyAnswerToCountry(
  progress: CountryProgress,
  correct: boolean,
  markKnown = false
): CountryProgress {
  const next = { ...progress };
  next.lastSeenAt = Date.now();

  if (correct) {
    next.correct += 1;
    next.mastery = Math.min(100, next.mastery + (next.mastery < 40 ? 18 : next.mastery < 70 ? 12 : 8));
    next.easeFactor = Math.min(3.0, next.easeFactor + 0.1);
    next.intervalDays =
      next.intervalDays <= 0 ? 1 : Math.round(next.intervalDays * next.easeFactor);
    next.nextReviewAt = Date.now() + next.intervalDays * DAY_MS;
    if (markKnown || next.mastery >= 50) next.known = true;
  } else {
    next.incorrect += 1;
    next.mastery = Math.max(0, next.mastery - 15);
    next.easeFactor = Math.max(1.3, next.easeFactor - 0.2);
    next.intervalDays = 0;
    next.nextReviewAt = Date.now() + 10 * 60 * 1000;
  }

  return next;
}

export function getDueCountryIds(
  countries: Record<string, CountryProgress>,
  limit = 50
): string[] {
  const now = Date.now();
  return Object.entries(countries)
    .filter(([, p]) => p.known || p.correct + p.incorrect > 0)
    .filter(([, p]) => p.mastery < 80 || p.nextReviewAt <= now)
    .sort((a, b) => {
      const urgencyA = a[1].mastery + (a[1].nextReviewAt > now ? 50 : 0);
      const urgencyB = b[1].mastery + (b[1].nextReviewAt > now ? 50 : 0);
      return urgencyA - urgencyB;
    })
    .slice(0, limit)
    .map(([id]) => id);
}

export function getWeakCountryIds(
  countries: Record<string, CountryProgress>
): string[] {
  return Object.entries(countries)
    .filter(([, p]) => p.correct + p.incorrect > 0 && p.mastery < 70)
    .sort((a, b) => a[1].mastery - b[1].mastery)
    .map(([id]) => id);
}
