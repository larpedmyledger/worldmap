export const XP_REWARDS = {
  correct: 10,
  streakBonus: 5,
  newCountry: 25,
  quizComplete: 50,
  reviewSuccess: 15,
  examComplete: 100,
  discoveryKnown: 20,
} as const;

export const LEVEL_THRESHOLDS = [0, 100, 300, 600, 1000, 1500, 2200, 3000, 4000, 5500, 7500, 10000];

export const PLAYER_LEVELS = [
  { id: "debutant", name: "Débutant", emoji: "🌱", minLevel: 1 },
  { id: "novice", name: "Novice", emoji: "⭐", minLevel: 3 },
  { id: "intermediaire", name: "Intermédiaire", emoji: "🔥", minLevel: 5 },
  { id: "avance", name: "Avancé", emoji: "⚡", minLevel: 8 },
  { id: "maitre", name: "Maître du monde", emoji: "🏆", minLevel: 11 },
] as const;

export function xpForLevel(level: number): number {
  if (level <= 1) return LEVEL_THRESHOLDS[1] ?? 100;
  if (level >= LEVEL_THRESHOLDS.length) {
    return LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1]! + (level - LEVEL_THRESHOLDS.length + 1) * 2500;
  }
  return LEVEL_THRESHOLDS[level] ?? level * 500;
}

export function levelFromXp(xp: number): number {
  let level = 1;
  for (let i = 1; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i]!) level = i + 1;
  }
  if (xp >= LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1]!) {
    const extra = xp - LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1]!;
    level = LEVEL_THRESHOLDS.length + Math.floor(extra / 2500);
  }
  return Math.max(1, level);
}

export function xpProgress(xp: number): { level: number; current: number; next: number; percent: number } {
  const level = levelFromXp(xp);
  const prev = level <= 1 ? 0 : xpForLevel(level - 1);
  const next = xpForLevel(level);
  const current = xp - prev;
  const span = Math.max(1, next - prev);
  return {
    level,
    current,
    next: next - prev,
    percent: Math.min(100, Math.round((current / span) * 100)),
  };
}

export function getPlayerTier(level: number) {
  let tier: (typeof PLAYER_LEVELS)[number] = PLAYER_LEVELS[0];
  for (const t of PLAYER_LEVELS) {
    if (level >= t.minLevel) tier = t;
  }
  return tier;
}
