"use client";

import { Flame } from "lucide-react";
import { useProgress } from "@/components/providers/ProgressProvider";

export function StreakBadge() {
  const { progress, hydrated } = useProgress();
  if (!hydrated) return null;
  return (
    <div className="inline-flex items-center gap-2 rounded-2xl bg-orange-500/10 border border-orange-500/20 px-3 py-2 text-orange-300">
      <Flame className="h-4 w-4" />
      <div className="leading-tight">
        <p className="text-sm font-semibold">{progress.currentStreak}</p>
        <p className="text-[10px] uppercase tracking-wide text-orange-400/80">
          série · best {progress.bestStreak}
        </p>
      </div>
    </div>
  );
}
