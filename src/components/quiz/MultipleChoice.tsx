"use client";

import { cn } from "@/lib/cn";
import { Check, X } from "lucide-react";

export function MultipleChoice({
  options,
  selected,
  correctAnswer,
  revealed,
  onSelect,
}: {
  options: string[];
  selected: string | null;
  correctAnswer: string;
  revealed: boolean;
  onSelect: (value: string) => void;
}) {
  return (
    <div className="grid gap-3">
      {options.map((opt) => {
        const isSelected = selected === opt;
        const isCorrect = opt === correctAnswer;
        let styles = "border-slate-700 bg-slate-900 hover:border-indigo-400/50";
        if (revealed) {
          if (isCorrect) styles = "border-emerald-500/60 bg-emerald-500/10 text-emerald-200";
          else if (isSelected) styles = "border-rose-500/60 bg-rose-500/10 text-rose-200";
          else styles = "border-slate-800 bg-slate-900/50 opacity-60";
        } else if (isSelected) {
          styles = "border-indigo-400 bg-indigo-500/10";
        }

        return (
          <button
            key={opt}
            type="button"
            disabled={revealed}
            onClick={() => onSelect(opt)}
            className={cn(
              "w-full rounded-2xl border px-4 py-3.5 text-left text-sm sm:text-base transition-all flex items-center justify-between gap-3",
              styles
            )}
          >
            <span>{opt}</span>
            {revealed && isCorrect && <Check className="h-5 w-5 text-emerald-400" />}
            {revealed && isSelected && !isCorrect && <X className="h-5 w-5 text-rose-400" />}
          </button>
        );
      })}
    </div>
  );
}
