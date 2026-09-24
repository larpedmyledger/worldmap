"use client";

import { ProgressBar } from "@/components/ui/ProgressBar";
import { getPlayerTier, xpProgress } from "@/lib/xp";
import { useProgress } from "@/components/providers/ProgressProvider";

export function XPBar({ compact = false }: { compact?: boolean }) {
  const { progress, hydrated } = useProgress();
  if (!hydrated) return null;
  const xp = xpProgress(progress.xp);
  const tier = getPlayerTier(progress.level);

  if (compact) {
    return (
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>
            {tier.emoji} Niv. {progress.level}
          </span>
          <span>
            {progress.xp} XP
          </span>
        </div>
        <ProgressBar value={xp.percent} />
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-4 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-500">Niveau</p>
          <p className="text-lg font-semibold text-white">
            {tier.emoji} {tier.name}
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-indigo-300">{progress.level}</p>
          <p className="text-xs text-slate-400">
            {xp.current.toLocaleString("fr-CA")} / {xp.next.toLocaleString("fr-CA")} XP
          </p>
        </div>
      </div>
      <ProgressBar value={xp.percent} className="h-2.5" />
    </div>
  );
}
