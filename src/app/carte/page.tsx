"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { getCountryById, CONTINENT_META } from "@/data/countries";

const WorldMap = dynamic(
  () => import("@/components/map/WorldMap").then((m) => m.WorldMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-[60vh] rounded-3xl bg-slate-900 animate-pulse" />
    ),
  }
);

export default function CartePage() {
  const [selected, setSelected] = useState<string | null>(null);
  const country = selected ? getCountryById(selected) : null;

  return (
    <div className="space-y-5 animate-fade-up">
      <PageHeader
        title="Carte du monde"
        subtitle="Zoom, déplacement, clic sur un pays."
      />
      <WorldMap
        selectedId={selected}
        onSelect={setSelected}
        className="h-[55vh] sm:h-[65vh]"
      />
      {country && (
        <Card className="flex items-center gap-4">
          <span className="text-5xl">{country.flag}</span>
          <div>
            <p className="text-xl font-semibold text-white">{country.name}</p>
            <p className="text-sm text-slate-400">
              {CONTINENT_META[country.continent].name} · Capitale : {country.capital}
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
