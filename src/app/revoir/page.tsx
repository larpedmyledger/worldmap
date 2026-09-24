"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FlagImage } from "@/components/ui/FlagImage";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { QuizSession } from "@/components/quiz/QuizSession";
import { useProgress } from "@/components/providers/ProgressProvider";
import { getWeakCountryIds } from "@/lib/srs";
import { getCountryById } from "@/data/countries";
import {
  buildFindOnMap,
  buildLocateOnMap,
} from "@/lib/quiz";

export default function RevoirPage() {
  const { progress, completeQuiz, addActivity } = useProgress();
  const [started, setStarted] = useState(false);

  const weakIds = useMemo(
    () => getWeakCountryIds(progress.countries),
    [progress.countries]
  );

  const questions = useMemo(() => {
    if (!started) return [];
    return weakIds.slice(0, 12).flatMap((id, i) => {
      const c = getCountryById(id);
      if (!c) return [];
      return [i % 2 === 0 ? buildFindOnMap(c) : buildLocateOnMap(c)];
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, weakIds]);

  if (started && questions.length) {
    return (
      <div className="animate-fade-up">
        <PageHeader title="Révision" backHref="/revoir" />
        <QuizSession
          questions={questions}
          title="À revoir"
          onFinished={(r) => {
            completeQuiz(r.correct, r.total);
            addActivity({
              type: "review",
              label: "Révision",
              score: r.correct,
              total: r.total,
            });
            setStarted(false);
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-up">
      <PageHeader
        title="À revoir"
        subtitle="Pays où tu te trompes souvent — ils reviennent plus vite."
      />

      {weakIds.length === 0 ? (
        <Card className="text-center space-y-3 py-8">
          <p className="text-4xl">✨</p>
          <p className="text-white font-medium">Rien à revoir pour le moment.</p>
          <p className="text-sm text-slate-500">
            Continue d&apos;apprendre pour remplir ta liste de révision.
          </p>
          <Link href="/apprendre">
            <Button>Apprendre</Button>
          </Link>
        </Card>
      ) : (
        <>
          <Button size="lg" className="w-full" onClick={() => setStarted(true)}>
            Réviser {Math.min(12, weakIds.length)} pays
          </Button>
          <div className="grid gap-3">
            {weakIds.map((id) => {
              const c = getCountryById(id);
              const p = progress.countries[id];
              if (!c || !p) return null;
              return (
                <Card key={id} className="flex items-center gap-3">
                  <FlagImage isoCode={c.isoCode} name={c.name} size="md" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white">{c.name}</p>
                    <p className="text-xs text-slate-500">
                      Maîtrise : {p.mastery}% · À revoir bientôt
                    </p>
                    <ProgressBar value={p.mastery} className="mt-2" />
                  </div>
                </Card>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
