"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { CONTINENT_META, type ContinentId } from "@/data/countries";
import { useProgress } from "@/components/providers/ProgressProvider";
import { getContinentStats } from "@/lib/quiz";

const LEVELS = [
  { id: "0", name: "Découverte", desc: "Regarde le pays, le drapeau et la carte", emoji: "👀" },
  { id: "1", name: "Reconnaître le drapeau", desc: "QCM — quel pays ?", emoji: "🏳️" },
  { id: "2", name: "Trouver le pays", desc: "Clique sur la carte", emoji: "🗺️" },
  { id: "3", name: "Pays → capitale", desc: "Quelle est la capitale ?", emoji: "🏛️" },
  { id: "4", name: "Capitale → pays", desc: "De quel pays est cette capitale ?", emoji: "📍" },
  { id: "5", name: "Drapeau → écriture", desc: "Écris le nom du pays", emoji: "✍️" },
  { id: "6", name: "Pays → emplacement", desc: "Montre où se trouve le pays", emoji: "📌" },
];

export default function ContinentHubPage() {
  const params = useParams();
  const continent = params.continent as ContinentId;
  const meta = CONTINENT_META[continent];
  const { progress } = useProgress();

  if (!meta) {
    return <p>Continent introuvable.</p>;
  }

  const stats = getContinentStats(progress, continent);
  const hasStarted = stats.known > 0;

  return (
    <div className="space-y-6 animate-fade-up">
      <PageHeader
        title={`${meta.emoji} ${meta.name}`}
        subtitle={`${stats.known} / ${stats.total} pays connus`}
        backHref="/apprendre"
      />

      <Card className="space-y-3">
        <ProgressBar value={stats.percent} className="h-2.5" />
        <p className="text-sm text-slate-400">
          {hasStarted
            ? "Continue où tu en étais, ou teste tes connaissances."
            : "Tu ne connais presque rien ici ? Parfait. Commence par découvrir."}
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          <Link href={`/apprendre/${continent}/0`}>
            <Button size="lg" className="w-full">
              Apprendre d&apos;abord
            </Button>
          </Link>
          {hasStarted ? (
            <Link href={`/apprendre/${continent}/quiz`}>
              <Button size="lg" variant="secondary" className="w-full">
                Tester mes connaissances
              </Button>
            </Link>
          ) : (
            <Button size="lg" variant="secondary" className="w-full" disabled>
              Tester mes connaissances
            </Button>
          )}
        </div>
      </Card>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-white">Niveaux</h2>
        {LEVELS.map((level) => (
          <Link key={level.id} href={`/apprendre/${continent}/${level.id}`}>
            <Card className="flex items-center gap-4 mb-3 hover:border-indigo-500/40 transition-colors">
              <span className="text-2xl">{level.emoji}</span>
              <div className="min-w-0">
                <p className="font-medium text-white">
                  Niveau {level.id} — {level.name}
                </p>
                <p className="text-xs text-slate-500">{level.desc}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
