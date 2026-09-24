"use client";

import { useCallback } from "react";
import { useProgress } from "@/components/providers/ProgressProvider";
import {
  playCorrect,
  playWrong,
  playClick,
  playStreak,
  playKnow,
  unlockAudio,
} from "@/lib/sounds";

export function useSounds() {
  const { progress } = useProgress();
  const enabled = progress.preferences.sound;

  const safe = useCallback(
    (fn: () => void) => {
      if (!enabled) return;
      unlockAudio();
      fn();
    },
    [enabled]
  );

  return {
    correct: useCallback(
      (streak?: number) =>
        safe(() => {
          if (streak && streak > 0 && streak % 5 === 0) playStreak();
          else playCorrect();
        }),
      [safe]
    ),
    wrong: useCallback(() => safe(playWrong), [safe]),
    click: useCallback(() => safe(playClick), [safe]),
    know: useCallback(() => safe(playKnow), [safe]),
  };
}
