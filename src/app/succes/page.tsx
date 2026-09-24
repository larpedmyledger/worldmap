"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { ACHIEVEMENTS } from "@/data/achievements";
import { useProgress } from "@/components/providers/ProgressProvider";
import { cn } from "@/lib/cn";

export default function SuccesPage() {
  const { progress } = useProgress();
  const unlocked = new Set(progress.unlockedAchievements);

  return (
    <div className="space-y-6 animate-fade-up">
      <PageHeader
        title="Succès"
        subtitle={`${unlocked.size}/${ACHIEVEMENTS.length} débloqués`}
      />
      <div className="grid gap-3 sm:grid-cols-2">
        {ACHIEVEMENTS.map((a) => {
          const ok = unlocked.has(a.id);
          return (
            <Card
              key={a.id}
              className={cn(
                "space-y-1",
                !ok && "opacity-50 grayscale"
              )}
            >
              <p className="text-3xl">{ok ? a.emoji : "🔒"}</p>
              <p className="font-semibold text-white">{a.name}</p>
              <p className="text-sm text-slate-500">{a.description}</p>
              <p className="text-xs text-indigo-300/80 pt-1">
                {ok ? "Débloqué" : "Verrouillé"}
              </p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
