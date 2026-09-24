"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { answersMatch } from "@/lib/utils";

export function WrittenAnswer({
  correctAnswer,
  revealed,
  onSubmit,
}: {
  correctAnswer: string;
  revealed: boolean;
  onSubmit: (value: string, correct: boolean) => void;
}) {
  const [value, setValue] = useState("");

  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (revealed || !value.trim()) return;
        onSubmit(value, answersMatch(value, correctAnswer));
      }}
    >
      <input
        type="text"
        value={value}
        disabled={revealed}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Écris ta réponse…"
        autoComplete="off"
        className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3.5 text-base text-white placeholder:text-slate-500 outline-none focus:border-indigo-400"
      />
      {!revealed && (
        <Button type="submit" size="lg" className="w-full" disabled={!value.trim()}>
          Valider
        </Button>
      )}
    </form>
  );
}
