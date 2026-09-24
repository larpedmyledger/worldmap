"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { QuizSession } from "@/components/quiz/QuizSession";
import { WATER_BODIES } from "@/data/oceans";
import { useProgress } from "@/components/providers/ProgressProvider";
import { generateOceanQuestions } from "@/lib/quiz";

export default function OceansPage() {
  const { progress, markWaterKnown, addActivity, completeQuiz, updateExamPath } =
    useProgress();
  const [mode, setMode] = useState<"hub" | "discover" | "quiz">("hub");
  const [discoverIndex, setDiscoverIndex] = useState(0);

  const known = Object.values(progress.waters).filter((w) => w.known).length;
  const water = WATER_BODIES[discoverIndex];

  const questions = useMemo(() => {
    if (mode !== "quiz") return [];
    return generateOceanQuestions(10);
  }, [mode]);

  if (mode === "discover" && water) {
    return (
      <div className="space-y-5 max-w-lg mx-auto animate-fade-up">
        <PageHeader
          title="Découverte — Océans & mers"
          backHref="/oceans"
        />
        <div className="space-y-2">
          <ProgressBar
            value={((discoverIndex + 1) / WATER_BODIES.length) * 100}
          />
          <p className="text-xs text-slate-500 text-right">
            {discoverIndex + 1}/{WATER_BODIES.length}
          </p>
        </div>
        <Card className="text-center space-y-3">
          <p className="text-5xl">{water.type === "ocean" ? "🌊" : "💧"}</p>
          <h2 className="text-2xl font-bold text-white">{water.name}</h2>
          <p className="text-slate-400">{water.description}</p>
          {water.funFact && (
            <p className="text-sm text-indigo-200 bg-slate-950/50 rounded-2xl px-3 py-2">
              💡 {water.funFact}
            </p>
          )}
        </Card>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="secondary"
            onClick={() => {
              if (discoverIndex + 1 >= WATER_BODIES.length) {
                updateExamPath("oceans");
                setMode("hub");
              } else setDiscoverIndex((i) => i + 1);
            }}
          >
            À revoir
          </Button>
          <Button
            variant="success"
            onClick={() => {
              markWaterKnown(water.id);
              if (discoverIndex + 1 >= WATER_BODIES.length) {
                updateExamPath("oceans");
                setMode("hub");
              } else setDiscoverIndex((i) => i + 1);
            }}
          >
            Je connais
          </Button>
        </div>
      </div>
    );
  }

  if (mode === "quiz" && questions.length) {
    return (
      <div className="animate-fade-up">
        <PageHeader title="Quiz océans" backHref="/oceans" />
        <QuizSession
          questions={questions}
          title="Océans & mers"
          onFinished={(r) => {
            completeQuiz(r.correct, r.total);
            addActivity({
              type: "oceans",
              label: "Quiz océans",
              score: r.correct,
              total: r.total,
            });
            updateExamPath("oceans");
            setMode("hub");
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-up">
      <PageHeader
        title="Océans et mers"
        subtitle="Les grands points d'eau à connaître pour l'examen."
      />
      <Card className="space-y-3">
        <p className="text-sm text-slate-400">
          {known}/{WATER_BODIES.length} points d&apos;eau connus
        </p>
        <ProgressBar value={(known / WATER_BODIES.length) * 100} />
        <div className="grid sm:grid-cols-2 gap-3">
          <Button
            size="lg"
            onClick={() => {
              setDiscoverIndex(0);
              setMode("discover");
            }}
          >
            Apprendre d&apos;abord
          </Button>
          <Button size="lg" variant="secondary" onClick={() => setMode("quiz")}>
            Tester mes connaissances
          </Button>
        </div>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2">
        {WATER_BODIES.map((w) => {
          const p = progress.waters[w.id];
          return (
            <Card key={w.id}>
              <p className="text-sm text-slate-500">
                {w.type === "ocean" ? "Océan" : "Mer"}
              </p>
              <p className="font-semibold text-white mt-1">{w.name}</p>
              <p className="text-xs text-slate-500 mt-1">{w.description}</p>
              <ProgressBar value={p?.mastery ?? 0} className="mt-3" />
            </Card>
          );
        })}
      </div>
    </div>
  );
}
