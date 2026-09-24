"use client";

import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { CONTINENTS } from "@/data/countries";
import { useProgress } from "@/components/providers/ProgressProvider";
import { getContinentStats } from "@/lib/quiz";

export default function ApprendrePage() {
  const { progress } = useProgress();

  return (
    <div className="space-y-6 animate-fade-up">
      <PageHeader
        title="Apprendre"
        subtitle="Choisis un continent. Commence par découvrir, puis teste-toi."
      />
      <div className="grid gap-3 sm:grid-cols-2">
        {CONTINENTS.map((c) => {
          const s = getContinentStats(progress, c.id);
          return (
            <Card key={c.id} className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{c.emoji}</span>
                <div>
                  <p className="font-semibold text-white">{c.name}</p>
                  <p className="text-xs text-slate-500">
                    {s.known}/{s.total} pays connus
                  </p>
                </div>
              </div>
              <ProgressBar value={s.percent} />
              <Link href={`/apprendre/${c.id}`}>
                <Button className="w-full">Ouvrir le parcours</Button>
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
