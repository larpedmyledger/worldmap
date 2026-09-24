"use client";

import Link from "next/link";
import { Check, Circle } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useProgress } from "@/components/providers/ProgressProvider";
import { cn } from "@/lib/cn";
import type { UserProgress } from "@/types";

const STEPS: {
  key: keyof UserProgress["examPath"];
  title: string;
  desc: string;
  href: string;
}[] = [
  {
    key: "continents",
    title: "Étape 1 — Continents",
    desc: "Repère les 6 continents.",
    href: "/carte",
  },
  {
    key: "mainCountries",
    title: "Étape 2 — Pays principaux",
    desc: "Europe + Amérique du Nord (découverte).",
    href: "/apprendre/europe/0",
  },
  {
    key: "allCountries",
    title: "Étape 3 — Tous les pays",
    desc: "Parcours les autres continents.",
    href: "/apprendre",
  },
  {
    key: "capitals",
    title: "Étape 4 — Capitales",
    desc: "Niveaux 3 et 4.",
    href: "/apprendre/europe/3",
  },
  {
    key: "worldMap",
    title: "Étape 5 — Carte du monde",
    desc: "Localise les pays sur la carte.",
    href: "/apprendre/europe/2",
  },
  {
    key: "oceans",
    title: "Étape 6 — Océans et mers",
    desc: "Les grands points d'eau.",
    href: "/oceans",
  },
  {
    key: "finalQuiz",
    title: "Étape 7 — Quiz final",
    desc: "Mode examen 30 questions.",
    href: "/examen",
  },
];

export default function ParcoursExamenPage() {
  const { progress, updateExamPath } = useProgress();

  return (
    <div className="space-y-6 animate-fade-up">
      <PageHeader
        title="Parcours examen"
        subtitle="Checklist pour mémoriser rapidement avant l'épreuve."
        backHref="/"
      />

      <div className="space-y-3">
        {STEPS.map((step, i) => {
          const done = progress.examPath[step.key];
          return (
            <Card
              key={step.key}
              className={cn(
                "flex flex-col sm:flex-row sm:items-center gap-4",
                done && "border-emerald-500/30"
              )}
            >
              <div className="flex items-start gap-3 flex-1">
                <div
                  className={cn(
                    "mt-0.5 rounded-full p-1",
                    done ? "text-emerald-400" : "text-slate-600"
                  )}
                >
                  {done ? <Check className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
                </div>
                <div>
                  <p className="font-semibold text-white">{step.title}</p>
                  <p className="text-sm text-slate-500">{step.desc}</p>
                </div>
              </div>
              <div className="flex gap-2 sm:ml-auto">
                <Link href={step.href}>
                  <Button size="sm">{done ? "Revoir" : "Commencer"}</Button>
                </Link>
                {!done && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => updateExamPath(step.key)}
                  >
                    Fait
                  </Button>
                )}
              </div>
              <span className="sr-only">Étape {i + 1}</span>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
