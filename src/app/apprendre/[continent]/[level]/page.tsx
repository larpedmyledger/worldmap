"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { DiscoverySession } from "@/components/learn/DiscoverySession";
import { QuizSession } from "@/components/quiz/QuizSession";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useProgress } from "@/components/providers/ProgressProvider";
import { CONTINENT_META, type ContinentId } from "@/data/countries";
import {
  generateQuizQuestions,
  getEligibleCountries,
  buildFlagMcq,
  buildCapitalMcq,
  buildCountryFromCapital,
  buildFlagWritten,
  buildFindOnMap,
  buildLocateOnMap,
} from "@/lib/quiz";
import { pickRandom } from "@/lib/utils";
import type { QuizQuestion } from "@/types";

function buildLevelQuestions(
  level: string,
  continent: ContinentId,
  progress: ReturnType<typeof useProgress>["progress"],
  count = 10
): QuizQuestion[] {
  const pool = getEligibleCountries(progress, continent, {
    includeUnknown: level === "0",
    maxDifficulty: progress.adaptiveDifficulty,
  });
  const countries = pickRandom(pool.length ? pool : getEligibleCountries(progress, continent, { includeUnknown: true }), count);

  switch (level) {
    case "1":
      return countries.map((c) => buildFlagMcq(c, pool));
    case "2":
      return countries.map((c) => buildFindOnMap(c));
    case "3":
      return countries.map((c) => buildCapitalMcq(c, pool));
    case "4":
      return countries.map((c) => buildCountryFromCapital(c, pool));
    case "5":
      return countries.map((c) => buildFlagWritten(c));
    case "6":
      return countries.map((c) => buildLocateOnMap(c));
    default:
      return generateQuizQuestions(progress, count, continent, "map");
  }
}

export default function LevelPage() {
  const params = useParams();
  const continent = params.continent as ContinentId;
  const level = params.level as string;
  const meta = CONTINENT_META[continent];
  const { progress, addActivity, completeQuiz } = useProgress();
  const router = useRouter();
  const [done, setDone] = useState<null | { correct: number; total: number }>(null);

  const questions = useMemo(() => {
    if (level === "0" || level === "quiz") return [];
    return buildLevelQuestions(level, continent, progress, 10);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [continent, level]);

  const quizQuestions = useMemo(() => {
    if (level !== "quiz") return [];
    return generateQuizQuestions(progress, 12, continent, "map");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [continent, level]);

  if (!meta) return <p>Continent introuvable.</p>;

  if (level === "0") {
    return (
      <div className="animate-fade-up">
        <PageHeader
          title={`Découverte — ${meta.name}`}
          backHref={`/apprendre/${continent}`}
        />
        <DiscoverySession
          continent={continent}
          onComplete={() => router.push(`/apprendre/${continent}`)}
        />
      </div>
    );
  }

  const activeQuestions = level === "quiz" ? quizQuestions : questions;

  if (done) {
    return (
      <div className="max-w-md mx-auto space-y-4 text-center animate-fade-up py-8">
        <p className="text-5xl">🎉</p>
        <h1 className="text-2xl font-bold text-white">Bravo !</h1>
        <p className="text-slate-400">
          Score : {done.correct} / {done.total}
        </p>
        <Card>
          <p className="text-sm text-slate-300">
            {Math.round((done.correct / done.total) * 100)} % de réussite
          </p>
        </Card>
        <div className="grid gap-3">
          <Link href={`/apprendre/${continent}`}>
            <Button className="w-full">Retour au continent</Button>
          </Link>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => window.location.reload()}
          >
            Recommencer
          </Button>
        </div>
      </div>
    );
  }

  if (!activeQuestions.length) {
    return (
      <div className="text-center space-y-4 py-12">
        <p className="text-slate-400">
          Pas assez de pays connus. Commence par la découverte.
        </p>
        <Link href={`/apprendre/${continent}/0`}>
          <Button>Apprendre d&apos;abord</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-up">
      <PageHeader
        title={`Niveau ${level} — ${meta.name}`}
        backHref={`/apprendre/${continent}`}
      />
      <QuizSession
        questions={activeQuestions}
        title={`Niveau ${level}`}
        onFinished={(result) => {
          completeQuiz(result.correct, result.total);
          addActivity({
            type: "learn",
            label: `${meta.name} · niveau ${level}`,
            score: result.correct,
            total: result.total,
          });
          setDone({ correct: result.correct, total: result.total });
        }}
      />
    </div>
  );
}
