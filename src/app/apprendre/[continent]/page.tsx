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
  {
    id: "0",
    name: "Découverte",
    desc: "Vois le pays sur la carte, mémorise sa place",
    emoji: "👀",
    primary: true,
  },
  {
    id: "2",
    name: "Trouver le pays",
    desc: "On te donne le nom — clique au bon endroit",
    emoji: "🗺️",
    primary: true,
  },
  {
    id: "6",
    name: "Situer sur la carte",
    desc: "Entraînement intensif : emplacement seulement",
    emoji: "📌",
    primary: true,
  },
  {
    id: "3",
    name: "Pays → capitale",
    desc: "Optionnel — quelle est la capitale ?",
    emoji: "🏛️",
    primary: false,
  },
  {
    id: "4",
    name: "Capitale → pays",
    desc: "Optionnel — de quel pays est cette capitale ?",
    emoji: "📍",
    primary: false,
  },
  {
    id: "1",
    name: "Drapeaux (bonus)",
    desc: "Optionnel — reconnaître un drapeau",
    emoji: "🏳️",
    primary: false,
  },
  {
    id: "5",
    name: "Drapeau → écriture",
    desc: "Optionnel — écrire le nom du pays",
    emoji: "✍️",
    primary: false,
  },
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
  const primary = LEVELS.filter((l) => l.primary);
  const bonus = LEVELS.filter((l) => !l.primary);

  return (
    <div className="space-y-6 animate-fade-up">
      <PageHeader
        title={`${meta.emoji} ${meta.name}`}
        subtitle={`${stats.known} / ${stats.total} pays — objectif : les situer sur la carte`}
        backHref="/apprendre"
      />

      <Card className="space-y-3">
        <ProgressBar value={stats.percent} className="h-2.5" />
        <p className="text-sm text-slate-400">
          {hasStarted
            ? "Entraîne-toi à cliquer au bon endroit sur la carte."
            : "Commence par découvrir chaque pays sur la carte, puis teste-toi."}
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          <Link href={`/apprendre/${continent}/0`}>
            <Button size="lg" className="w-full">
              Apprendre d&apos;abord
            </Button>
          </Link>
          {hasStarted ? (
            <Link href={`/apprendre/${continent}/2`}>
              <Button size="lg" variant="secondary" className="w-full">
                Situer sur la carte
              </Button>
            </Link>
          ) : (
            <Button size="lg" variant="secondary" className="w-full" disabled>
              Situer sur la carte
            </Button>
          )}
        </div>
      </Card>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-white">Parcours carte</h2>
        {primary.map((level) => (
          <Link key={level.id} href={`/apprendre/${continent}/${level.id}`}>
            <Card className="flex items-center gap-4 mb-3 hover:border-indigo-500/40 transition-colors">
              <span className="text-2xl">{level.emoji}</span>
              <div className="min-w-0">
                <p className="font-medium text-white">{level.name}</p>
                <p className="text-xs text-slate-500">{level.desc}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-medium text-slate-500">Bonus (optionnel)</h2>
        {bonus.map((level) => (
          <Link key={level.id} href={`/apprendre/${continent}/${level.id}`}>
            <Card className="flex items-center gap-4 mb-3 opacity-80 hover:opacity-100 hover:border-slate-600 transition-colors">
              <span className="text-xl">{level.emoji}</span>
              <div className="min-w-0">
                <p className="font-medium text-slate-200 text-sm">{level.name}</p>
                <p className="text-xs text-slate-500">{level.desc}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
