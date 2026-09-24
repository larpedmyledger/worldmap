"use client";

import Link from "next/link";
import { ArrowRight, Flame, Sparkles, Target, Trophy } from "lucide-react";
import { useProgress } from "@/components/providers/ProgressProvider";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { XPBar } from "@/components/ui/XPBar";
import { CONTINENTS } from "@/data/countries";
import { getContinentStats, getGlobalStats } from "@/lib/quiz";
import { nextGoal } from "@/lib/achievements";
import { getPlayerTier } from "@/lib/xp";

export default function HomePage() {
  const { progress } = useProgress();
  const stats = getGlobalStats(progress);
  const goal = nextGoal(progress);
  const tier = getPlayerTier(progress.level);
  const continueHref =
    progress.preferences.preferredContinent &&
    progress.preferences.preferredContinent !== "world"
      ? `/apprendre/${progress.preferences.preferredContinent}`
      : "/apprendre";

  return (
    <div className="space-y-8 animate-fade-up">
      <header className="space-y-2">
        <p className="text-sm font-medium text-indigo-300">🌍 WorldMap</p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Apprends le monde, un pays à la fois.
        </h1>
        <p className="text-slate-400 max-w-xl">
          Progression douce, révision intelligente, carte interactive.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <p className="text-xs uppercase tracking-wider text-slate-500">Progression</p>
          <p className="mt-2 text-3xl font-bold text-white">{stats.worldPercent}%</p>
          <ProgressBar value={stats.worldPercent} className="mt-3" />
          <p className="mt-2 text-xs text-slate-500">du monde appris</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wider text-slate-500">Pays appris</p>
          <p className="mt-2 text-3xl font-bold text-white">
            {stats.known}
            <span className="text-base font-normal text-slate-500"> / {stats.total}</span>
          </p>
          <p className="mt-2 text-xs text-slate-500 flex items-center gap-1">
            <Target className="h-3.5 w-3.5" /> {stats.weak} à revoir
          </p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wider text-slate-500">Série</p>
          <p className="mt-2 text-3xl font-bold text-orange-300 flex items-center gap-2">
            <Flame className="h-7 w-7" />
            {progress.currentStreak}
          </p>
          <p className="mt-2 text-xs text-slate-500">Meilleure : {progress.bestStreak}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wider text-slate-500">Niveau</p>
          <p className="mt-2 text-2xl font-bold text-white">
            {tier.emoji} {tier.name}
          </p>
          <p className="mt-2 text-xs text-slate-500">{progress.xp.toLocaleString("fr-CA")} XP</p>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <XPBar />
          <Card className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">
                Ton prochain objectif
              </p>
              <p className="mt-1 text-xl font-semibold text-white">
                {goal.label} — {goal.detail}
              </p>
            </div>
            <Link href={continueHref}>
              <Button size="lg">
                Continuer à apprendre
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </Card>
        </div>

        <Card>
          <p className="text-xs uppercase tracking-wider text-slate-500 mb-3">
            Derniers exercices
          </p>
          <div className="space-y-2">
            {progress.recentActivity.length === 0 && (
              <p className="text-sm text-slate-500">Aucun exercice pour l&apos;instant.</p>
            )}
            {progress.recentActivity.slice(0, 5).map((a) => (
              <div
                key={a.id}
                className="flex items-center justify-between rounded-2xl bg-slate-950/60 px-3 py-2"
              >
                <div>
                  <p className="text-sm text-slate-200">{a.label}</p>
                  <p className="text-[11px] text-slate-500">
                    {new Date(a.at).toLocaleString("fr-CA")}
                  </p>
                </div>
                {a.score !== undefined && a.total !== undefined && (
                  <span className="text-sm font-medium text-indigo-300">
                    {a.score}/{a.total}
                  </span>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Continents</h2>
          {progress.preferences.examMode && (
            <Link
              href="/parcours-examen"
              className="text-sm text-indigo-300 hover:text-indigo-200 inline-flex items-center gap-1"
            >
              <Sparkles className="h-4 w-4" />
              Parcours examen
            </Link>
          )}
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {CONTINENTS.map((c) => {
            const s = getContinentStats(progress, c.id);
            return (
              <Card key={c.id} className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-2xl">{c.emoji}</p>
                    <p className="font-semibold text-white mt-1">{c.name}</p>
                    <p className="text-xs text-slate-500">{s.total} pays</p>
                  </div>
                  <p className="text-sm font-medium text-indigo-300">{s.percent}%</p>
                </div>
                <ProgressBar value={s.percent} />
                <p className="text-xs text-slate-500">
                  {s.known} / {s.total} connus
                </p>
                <Link href={`/apprendre/${c.id}`}>
                  <Button variant="secondary" className="w-full">
                    Apprendre
                  </Button>
                </Link>
              </Card>
            );
          })}
        </div>
      </section>

      <div className="grid gap-3 sm:grid-cols-3">
        <Link href="/quiz">
          <Card className="hover:border-indigo-500/40 transition-colors">
            <Trophy className="h-5 w-5 text-indigo-300 mb-2" />
            <p className="font-semibold">Quiz rapide</p>
            <p className="text-xs text-slate-500 mt-1">Questions adaptées à ton niveau</p>
          </Card>
        </Link>
        <Link href="/examen">
          <Card className="hover:border-indigo-500/40 transition-colors">
            <Target className="h-5 w-5 text-violet-300 mb-2" />
            <p className="font-semibold">Mode examen</p>
            <p className="text-xs text-slate-500 mt-1">Sans feedback immédiat</p>
          </Card>
        </Link>
        <Link href="/revoir">
          <Card className="hover:border-indigo-500/40 transition-colors">
            <Flame className="h-5 w-5 text-orange-300 mb-2" />
            <p className="font-semibold">À revoir</p>
            <p className="text-xs text-slate-500 mt-1">{stats.weak} pays faibles</p>
          </Card>
        </Link>
      </div>
    </div>
  );
}
