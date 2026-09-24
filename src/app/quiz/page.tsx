"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FlagImage } from "@/components/ui/FlagImage";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { QuizSession } from "@/components/quiz/QuizSession";
import { useProgress } from "@/components/providers/ProgressProvider";
import { generateQuizQuestions, getGlobalStats } from "@/lib/quiz";
import { CONTINENTS, type ContinentId } from "@/data/countries";
import { getCountryById } from "@/data/countries";
import { cn } from "@/lib/cn";

export default function QuizPage() {
  const { progress, completeQuiz, addActivity } = useProgress();
  const [count, setCount] = useState<10 | 20 | 50>(10);
  const [continent, setContinent] = useState<ContinentId | "world">("world");
  const [started, setStarted] = useState(false);
  const [result, setResult] = useState<null | {
    correct: number;
    total: number;
    mistakes: { countryId?: string; prompt: string; answer: string; correct: string }[];
  }>(null);

  const stats = getGlobalStats(progress);

  const questions = useMemo(() => {
    if (!started) return [];
    return generateQuizQuestions(progress, count, continent, "map");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, count, continent]);

  if (result) {
    return (
      <div className="space-y-6 max-w-lg mx-auto animate-fade-up">
        <PageHeader title="Résultat du quiz" backHref="/quiz" />
        <Card className="text-center space-y-2">
          <p className="text-4xl font-bold text-white">
            {result.correct}/{result.total}
          </p>
          <p className="text-slate-400">
            {Math.round((result.correct / result.total) * 100)} % de réussite
          </p>
        </Card>
        {result.mistakes.length > 0 && (
          <Card className="space-y-2">
            <p className="font-medium text-white">À réviser</p>
            {result.mistakes.map((m, i) => {
              const c = m.countryId ? getCountryById(m.countryId) : null;
              return (
                <div key={i} className="flex items-center gap-2 text-sm text-slate-400">
                  {c && <FlagImage isoCode={c.isoCode} name={c.name} size="sm" />}
                  <span>{c ? c.name : m.prompt}</span>
                </div>
              );
            })}
          </Card>
        )}
        <div className="grid gap-3">
          <Button
            onClick={() => {
              setResult(null);
              setStarted(true);
            }}
          >
            Nouveau quiz
          </Button>
          <Link href="/revoir">
            <Button variant="secondary" className="w-full">
              Voir les pays à revoir
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (started && questions.length) {
    return (
      <div className="animate-fade-up">
        <PageHeader title="Quiz rapide" backHref="/quiz" />
        <QuizSession
          questions={questions}
          title="Quiz rapide"
          onFinished={(r) => {
            completeQuiz(r.correct, r.total);
            addActivity({
              type: "quiz",
              label: "Quiz rapide",
              score: r.correct,
              total: r.total,
            });
            setStarted(false);
            setResult(r);
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-up">
      <PageHeader
        title="Quiz rapide"
        subtitle="On te donne le nom d'un pays — tu le trouves sur la carte."
      />

      {stats.known < 4 && (
        <Card className="border-amber-500/30 bg-amber-500/5">
          <p className="text-sm text-amber-200">
            Tu connais encore peu de pays. Commence par{" "}
            <Link href="/apprendre" className="underline">
              découvrir leur place sur la carte
            </Link>
            .
          </p>
        </Card>
      )}

      <Card className="space-y-4">
        <p className="text-sm font-medium text-slate-300">Nombre de questions</p>
        <div className="grid grid-cols-3 gap-2">
          {([10, 20, 50] as const).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setCount(n)}
              className={cn(
                "rounded-2xl border py-3 font-semibold transition-colors",
                count === n
                  ? "border-indigo-400 bg-indigo-500/15 text-indigo-200"
                  : "border-slate-700 bg-slate-950 text-slate-400"
              )}
            >
              {n}
            </button>
          ))}
        </div>
      </Card>

      <Card className="space-y-3">
        <p className="text-sm font-medium text-slate-300">Portée</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setContinent("world")}
            className={cn(
              "rounded-xl border px-3 py-1.5 text-sm",
              continent === "world"
                ? "border-indigo-400 text-indigo-200"
                : "border-slate-700 text-slate-400"
            )}
          >
            Monde
          </button>
          {CONTINENTS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setContinent(c.id)}
              className={cn(
                "rounded-xl border px-3 py-1.5 text-sm",
                continent === c.id
                  ? "border-indigo-400 text-indigo-200"
                  : "border-slate-700 text-slate-400"
              )}
            >
              {c.emoji} {c.name}
            </button>
          ))}
        </div>
      </Card>

      <Button size="lg" className="w-full" onClick={() => setStarted(true)}>
        Lancer le quiz
      </Button>
    </div>
  );
}
