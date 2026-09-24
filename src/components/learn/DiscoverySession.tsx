"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { FlagImage } from "@/components/ui/FlagImage";
import { useProgress } from "@/components/providers/ProgressProvider";
import { useSounds } from "@/hooks/useSounds";
import { CONTINENT_META, type ContinentId } from "@/data/countries";
import { sortCountriesForDiscovery } from "@/lib/quiz";

const WorldMap = dynamic(
  () => import("@/components/map/WorldMap").then((m) => m.WorldMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-72 rounded-3xl bg-slate-900 animate-pulse" />
    ),
  }
);

export function DiscoverySession({
  continent,
  onComplete,
}: {
  continent: ContinentId;
  onComplete: () => void;
}) {
  const { progress, markCountryKnown } = useProgress();
  const sounds = useSounds();
  const countries = useMemo(() => sortCountriesForDiscovery(continent), [continent]);
  const startIndex = useMemo(() => {
    const idx = countries.findIndex((c) => !progress.countries[c.id]?.known);
    return idx === -1 ? 0 : idx;
  }, [countries, progress.countries]);
  const [index, setIndex] = useState(startIndex);

  const country = countries[index];
  if (!country) {
    return (
      <div className="text-center space-y-4 py-12">
        <p className="text-xl font-semibold">Continent terminé !</p>
        <Button onClick={onComplete}>Passer aux exercices</Button>
      </div>
    );
  }

  const knownCount = countries.filter((c) => progress.countries[c.id]?.known).length;

  return (
    <div className="space-y-5 max-w-3xl mx-auto">
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-slate-400">
          <span>Découverte · {CONTINENT_META[continent].name}</span>
          <span>
            {index + 1} / {countries.length}
          </span>
        </div>
        <ProgressBar value={(knownCount / countries.length) * 100} />
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-4">
          <FlagImage isoCode={country.isoCode} name={country.name} size="lg" />
          <div className="min-w-0">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">{country.name}</h2>
            <p className="text-slate-400 mt-1">
              {CONTINENT_META[country.continent].name}
              {" · "}
              Capitale : {country.capital}
            </p>
          </div>
        </div>
        {country.funFact && (
          <p className="text-sm text-slate-400 bg-slate-950/60 rounded-2xl px-4 py-3">
            💡 {country.funFact}
          </p>
        )}
        <p className="text-sm text-indigo-300">Regarde bien sa position sur la carte ↓</p>
      </div>

      <WorldMap
        highlightId={country.id}
        dimOthers
        interactive={false}
        showTooltip={false}
        className="h-72 sm:h-96"
      />

      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="secondary"
          size="lg"
          onClick={() => {
            sounds.click();
            markCountryKnown(country.id, false);
            if (index + 1 >= countries.length) onComplete();
            else setIndex((i) => i + 1);
          }}
        >
          À revoir
        </Button>
        <Button
          variant="success"
          size="lg"
          onClick={() => {
            sounds.know();
            markCountryKnown(country.id, true);
            if (index + 1 >= countries.length) onComplete();
            else setIndex((i) => i + 1);
          }}
        >
          Je connais
        </Button>
      </div>

      <Button
        variant="ghost"
        className="w-full"
        onClick={() => {
          sounds.click();
          if (index + 1 >= countries.length) onComplete();
          else setIndex((i) => i + 1);
        }}
      >
        Passer
      </Button>
    </div>
  );
}
