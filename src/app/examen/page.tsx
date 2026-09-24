"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { QuizSession } from "@/components/quiz/QuizSession";
import { useProgress } from "@/components/providers/ProgressProvider";
import { generateQuizQuestions } from "@/lib/quiz";
import { CONTINENTS, getCountryById } from "@/data/countries";

export default function ExamPage() {
  const { progress, completeExam, addActivity, recordAnswer } = useProgress();
  const [started, setStarted] = useState(false);
  const [result, setResult] = useState<null | {
    correct: number;
    total: number;
    mistakes: {
      countryId?: string;
      prompt: string;
      answer: string;
      correct: string;
    }[];
  }>(null);

  const questions = useMemo(() => {
    if (!started) return [];
    return generateQuizQuestions(progress, 30, "world", "exam");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);

  if (result) {
    const weakContinents = CONTINENTS.map((c) => {
      const mistakes = result.mistakes.filter((m) => {
        const country = m.countryId ? getCountryById(m.countryId) : null;
        return country?.continent === c.id;
      }).length;
      return { ...c, mistakes };
    })
      .filter((c) => c.mistakes > 0)
      .sort((a, b) => b.mistakes - a.mistakes);

    return (
      <div className="space-y-6 animate-fade-up max-w-xl mx-auto">
        <PageHeader title="Résultat de l'examen" />
        <Card className="text-center space-y-2">
          <p className="text-sm text-slate-500">Score</p>
          <p className="text-5xl font-bold text-white">
            {result.correct}/{result.total}
          </p>
          <p className="text-indigo-300">
            {Math.round((result.correct / result.total) * 100)} %
          </p>
        </Card>

        <Card className="space-y-2">
          <p className="font-medium">Réponses correctes</p>
          <p className="text-emerald-300 text-2xl font-semibold">{result.correct}</p>
          <p className="font-medium mt-3">Erreurs</p>
          <p className="text-rose-300 text-2xl font-semibold">
            {result.total - result.correct}
          </p>
        </Card>

        {result.mistakes.length > 0 && (
          <Card className="space-y-2">
            <p className="font-medium">Pays à réviser</p>
            {result.mistakes.slice(0, 15).map((m, i) => {
              const c = m.countryId ? getCountryById(m.countryId) : null;
              return (
                <p key={i} className="text-sm text-slate-400">
                  {c ? `${c.flag} ${c.name}` : m.prompt}
                </p>
              );
            })}
          </Card>
        )}

        {weakContinents.length > 0 && (
          <Card className="space-y-2">
            <p className="font-medium">Continents problématiques</p>
            {weakContinents.map((c) => (
              <div key={c.id} className="flex justify-between text-sm">
                <span>
                  {c.emoji} {c.name}
                </span>
                <span className="text-rose-300">{c.mistakes} erreurs</span>
              </div>
            ))}
          </Card>
        )}

        <div className="grid gap-3">
          <Link href="/revoir">
            <Button className="w-full">Réviser maintenant</Button>
          </Link>
          <Button
            variant="secondary"
            onClick={() => {
              setResult(null);
              setStarted(false);
            }}
          >
            Retour
          </Button>
        </div>
      </div>
    );
  }

  if (started && questions.length) {
    return (
      <div className="animate-fade-up">
        <PageHeader title="Mode examen" subtitle="Pas de feedback immédiat" />
        <QuizSession
          questions={questions}
          examMode
          title="Examen"
          onFinished={(r) => {
            const mistaken = new Set(
              r.mistakes.map((m) => m.countryId).filter(Boolean) as string[]
            );
            questions.forEach((q) => {
              if (!q.countryId) return;
              recordAnswer({
                countryId: q.countryId,
                correct: !mistaken.has(q.countryId),
              });
            });
            completeExam();
            addActivity({
              type: "exam",
              label: "Mode examen",
              score: r.correct,
              total: r.total,
            });
            setResult(r);
            setStarted(false);
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-up max-w-lg">
      <PageHeader
        title="Mode examen"
        subtitle="30 questions. Aucun feedback jusqu'à la fin."
        backHref="/"
      />
      <Card className="space-y-3">
        <p className="text-sm text-slate-400">
          Simule un vrai examen : drapeaux, capitales, carte et réponses écrites.
        </p>
        <ul className="text-sm text-slate-500 space-y-1 list-disc pl-5">
          <li>30 questions mélangées</li>
          <li>Pas d&apos;indice pendant l&apos;épreuve</li>
          <li>Bilan détaillé à la fin</li>
        </ul>
      </Card>
      <Button size="lg" className="w-full" onClick={() => setStarted(true)}>
        Commencer l&apos;examen
      </Button>
    </div>
  );
}
