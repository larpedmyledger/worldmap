"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import type { QuizQuestion } from "@/types";
import { MultipleChoice } from "@/components/quiz/MultipleChoice";
import { WrittenAnswer } from "@/components/quiz/WrittenAnswer";
import { FeedbackPanel } from "@/components/quiz/FeedbackPanel";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { useProgress } from "@/components/providers/ProgressProvider";
import { CONTINENT_META, getCountryById } from "@/data/countries";

const WorldMap = dynamic(
  () => import("@/components/map/WorldMap").then((m) => m.WorldMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-72 rounded-3xl bg-slate-900 animate-pulse" />
    ),
  }
);

export interface QuizFinishResult {
  correct: number;
  total: number;
  mistakes: {
    countryId?: string;
    waterId?: string;
    prompt: string;
    answer: string;
    correct: string;
  }[];
}

export function QuizSession({
  questions,
  examMode = false,
  title,
  onFinished,
}: {
  questions: QuizQuestion[];
  examMode?: boolean;
  title?: string;
  onFinished: (result: QuizFinishResult) => void;
}) {
  const { recordAnswer } = useProgress();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [xpGained, setXpGained] = useState(0);
  const [streak, setStreak] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [mistakes, setMistakes] = useState<QuizFinishResult["mistakes"]>([]);
  const [mapPick, setMapPick] = useState<string | null>(null);

  const question = questions[index];

  const country = useMemo(
    () => (question?.countryId ? getCountryById(question.countryId) : undefined),
    [question]
  );

  if (!question) return null;

  const finishAnswer = (answer: string, correct: boolean) => {
    if (revealed) return;
    setSelected(answer);
    setIsCorrect(correct);
    setRevealed(true);
    setResults((r) => [...r, correct]);

    const nextMistakes = correct
      ? mistakes
      : [
          ...mistakes,
          {
            countryId: question.countryId,
            waterId: question.waterId,
            prompt: question.prompt,
            answer,
            correct: question.correctAnswer,
          },
        ];
    if (!correct) setMistakes(nextMistakes);

    if (!examMode) {
      const result = recordAnswer({
        countryId: question.countryId,
        waterId: question.waterId,
        correct,
      });
      setXpGained(result.xpGained);
      setStreak(result.streak);
    }

    return { correct, nextMistakes };
  };

  const advance = (finalCorrect: boolean, finalMistakes: QuizFinishResult["mistakes"]) => {
    if (index + 1 >= questions.length) {
      const all = [...results, finalCorrect];
      onFinished({
        correct: all.filter(Boolean).length,
        total: questions.length,
        mistakes: finalMistakes,
      });
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setRevealed(false);
    setIsCorrect(false);
    setXpGained(0);
    setMapPick(null);
  };

  const handleContinue = () => {
    const finalMistakes = isCorrect
      ? mistakes
      : mistakes.some(
          (m) => m.prompt === question.prompt && m.answer === selected
        )
        ? mistakes
        : [
            ...mistakes,
            {
              countryId: question.countryId,
              waterId: question.waterId,
              prompt: question.prompt,
              answer: selected ?? "",
              correct: question.correctAnswer,
            },
          ];
    advance(isCorrect, finalMistakes);
  };

  const isMap =
    question.kind === "find-on-map" ||
    question.kind === "locate-on-map" ||
    question.kind === "ocean-map";

  const isWritten =
    question.kind === "flag-written" || question.kind === "ocean-written";

  return (
    <div className="space-y-5 max-w-2xl mx-auto">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-slate-400">
          <span>{title ?? (examMode ? "Examen" : "Quiz")}</span>
          <span>
            Question {index + 1} / {questions.length}
          </span>
        </div>
        <ProgressBar value={(index / questions.length) * 100} />
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6 space-y-5">
        {question.flag && (
          <div className="text-7xl sm:text-8xl text-center leading-none">
            {question.flag}
          </div>
        )}
        <h2 className="text-xl sm:text-2xl font-semibold text-white text-center">
          {question.prompt}
        </h2>
        {country &&
          !isMap &&
          question.kind !== "flag-to-country" &&
          question.kind !== "flag-written" && (
            <p className="text-center text-sm text-slate-500">
              {CONTINENT_META[country.continent].name}
            </p>
          )}

        {question.options && (
          <MultipleChoice
            options={question.options}
            selected={selected}
            correctAnswer={question.correctAnswer}
            revealed={!examMode && revealed}
            onSelect={(value) => {
              finishAnswer(value, value === question.correctAnswer);
            }}
          />
        )}

        {isWritten && (
          <WrittenAnswer
            correctAnswer={question.correctAnswer}
            revealed={!examMode && revealed}
            onSubmit={(value, correct) => {
              finishAnswer(value, correct);
            }}
          />
        )}

        {isMap && (
          <div className="space-y-3">
            <WorldMap
              highlightId={
                !examMode && revealed ? question.countryId : undefined
              }
              selectedId={mapPick}
              correctId={
                !examMode && revealed ? question.countryId ?? null : null
              }
              wrongId={
                !examMode && revealed && !isCorrect ? mapPick : null
              }
              dimOthers={!examMode && revealed}
              onSelect={(id) => {
                setMapPick(id);
                finishAnswer(id, id === question.correctAnswer);
              }}
              className="h-72 sm:h-96"
            />
            {!revealed && (
              <p className="text-center text-xs text-slate-500">
                Clique sur le pays demandé
              </p>
            )}
          </div>
        )}
      </div>

      {!examMode && revealed && (
        <FeedbackPanel
          correct={isCorrect}
          explanation={question.explanation}
          onContinue={handleContinue}
          streak={streak}
          xpGained={xpGained}
        />
      )}

      {examMode && revealed && (
        <Button className="w-full" size="lg" onClick={handleContinue}>
          {index + 1 >= questions.length
            ? "Voir les résultats"
            : "Question suivante"}
        </Button>
      )}
    </div>
  );
}
