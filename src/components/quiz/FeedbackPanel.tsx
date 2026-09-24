"use client";

import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

export function FeedbackPanel({
  correct,
  explanation,
  onContinue,
  streak,
  xpGained,
}: {
  correct: boolean;
  explanation: string;
  onContinue: () => void;
  streak?: number;
  xpGained?: number;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border p-4 space-y-3 animate-in fade-in",
        correct
          ? "border-emerald-500/30 bg-emerald-500/10"
          : "border-rose-500/30 bg-rose-500/10"
      )}
    >
      <p className={cn("font-semibold", correct ? "text-emerald-300" : "text-rose-300")}>
        {correct ? "Correct !" : "Pas tout à fait"}
      </p>
      <p className="text-sm text-slate-300">{explanation}</p>
      {correct && streak && streak >= 3 && (
        <p className="text-sm text-orange-300">🔥 {streak} réponses correctes d&apos;affilée !</p>
      )}
      {xpGained !== undefined && xpGained > 0 && (
        <p className="text-xs text-indigo-300">+{xpGained} XP</p>
      )}
      <Button onClick={onContinue} className="w-full" size="lg">
        Continuer
      </Button>
    </div>
  );
}
