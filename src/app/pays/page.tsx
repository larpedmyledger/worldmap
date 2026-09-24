"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { CONTINENTS, COUNTRIES, type ContinentId } from "@/data/countries";
import { useProgress } from "@/components/providers/ProgressProvider";
import { masteryLabel } from "@/lib/quiz";
import { cn } from "@/lib/cn";

type Filter = "all" | "known" | "learn" | "review";

export default function PaysPage() {
  const { progress } = useProgress();
  const [q, setQ] = useState("");
  const [continent, setContinent] = useState<ContinentId | "all">("all");
  const [filter, setFilter] = useState<Filter>("all");

  const list = useMemo(() => {
    return COUNTRIES.filter((c) => {
      if (continent !== "all" && c.continent !== continent) return false;
      const p = progress.countries[c.id];
      const mastery = p?.mastery ?? 0;
      if (filter === "known" && !p?.known) return false;
      if (filter === "learn" && p?.known) return false;
      if (filter === "review" && !(mastery > 0 && mastery < 70)) return false;
      if (q.trim()) {
        const needle = q.toLowerCase();
        return (
          c.name.toLowerCase().includes(needle) ||
          c.capital.toLowerCase().includes(needle)
        );
      }
      return true;
    }).sort((a, b) => a.name.localeCompare(b.name, "fr"));
  }, [continent, filter, progress.countries, q]);

  return (
    <div className="space-y-5 animate-fade-up">
      <PageHeader title="Pays" subtitle={`${list.length} résultats`} />

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Rechercher un pays ou une capitale…"
        className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-indigo-400"
      />

      <div className="flex flex-wrap gap-2">
        {(
          [
            ["all", "Tous"],
            ["known", "Appris"],
            ["learn", "À apprendre"],
            ["review", "À revoir"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setFilter(id)}
            className={cn(
              "rounded-xl border px-3 py-1.5 text-sm",
              filter === id
                ? "border-indigo-400 text-indigo-200"
                : "border-slate-700 text-slate-400"
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setContinent("all")}
          className={cn(
            "rounded-xl border px-3 py-1.5 text-sm",
            continent === "all"
              ? "border-indigo-400 text-indigo-200"
              : "border-slate-700 text-slate-400"
          )}
        >
          Monde
        </button>
        {CONTINENTS.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setContinent(c.id)}
            className={cn(
              "rounded-xl border px-3 py-1.5 text-sm",
              continent === c.id
                ? "border-indigo-400 text-indigo-200"
                : "border-slate-700 text-slate-400"
            )}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {list.map((c) => {
          const p = progress.countries[c.id];
          const mastery = p?.mastery ?? 0;
          return (
            <Card key={c.id} className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{c.flag}</span>
                <div className="min-w-0">
                  <p className="font-semibold text-white truncate">{c.name}</p>
                  <p className="text-xs text-slate-500">Capitale : {c.capital}</p>
                </div>
                <span className="ml-auto text-[11px] text-slate-500">
                  {masteryLabel(mastery)}
                </span>
              </div>
              <ProgressBar value={mastery} />
            </Card>
          );
        })}
      </div>
    </div>
  );
}
