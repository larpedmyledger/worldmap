"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useProgress } from "@/components/providers/ProgressProvider";
import { getGlobalStats } from "@/lib/quiz";

export default function StatsPage() {
  const { progress } = useProgress();
  const stats = getGlobalStats(progress);

  const chartData = stats.continentStats.map((c) => ({
    name: c.name.replace("Amérique ", "Am. "),
    percent: c.percent,
    known: c.known,
  }));

  return (
    <div className="space-y-6 animate-fade-up">
      <PageHeader title="Statistiques" subtitle="Ton portrait de géographe" />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <p className="text-xs text-slate-500">Monde appris</p>
          <p className="text-3xl font-bold mt-1">{stats.worldPercent}%</p>
          <ProgressBar value={stats.worldPercent} className="mt-3" />
        </Card>
        <Card>
          <p className="text-xs text-slate-500">Pays connus</p>
          <p className="text-3xl font-bold mt-1">
            {stats.known}
            <span className="text-base text-slate-500">/{stats.total}</span>
          </p>
        </Card>
        <Card>
          <p className="text-xs text-slate-500">À revoir</p>
          <p className="text-3xl font-bold mt-1 text-orange-300">{stats.weak}</p>
        </Card>
        <Card>
          <p className="text-xs text-slate-500">Taux de réussite</p>
          <p className="text-3xl font-bold mt-1">{stats.successRate}%</p>
        </Card>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Card>
          <p className="text-xs text-slate-500">Meilleur continent</p>
          <p className="text-xl font-semibold mt-1">
            {stats.bestContinent?.emoji} {stats.bestContinent?.name}
          </p>
          <p className="text-sm text-slate-400">{stats.bestContinent?.percent}%</p>
        </Card>
        <Card>
          <p className="text-xs text-slate-500">Continent le plus faible</p>
          <p className="text-xl font-semibold mt-1">
            {stats.worstContinent?.emoji} {stats.worstContinent?.name}
          </p>
          <p className="text-sm text-slate-400">{stats.worstContinent?.percent}%</p>
        </Card>
        <Card>
          <p className="text-xs text-slate-500">Meilleure série</p>
          <p className="text-3xl font-bold mt-1 text-orange-300">
            🔥 {progress.bestStreak}
          </p>
        </Card>
        <Card>
          <p className="text-xs text-slate-500">Questions répondues</p>
          <p className="text-3xl font-bold mt-1">{progress.totalAnswered}</p>
        </Card>
      </div>

      <Card className="h-72">
        <p className="text-sm font-medium mb-4">Progression par continent</p>
        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={chartData}>
            <XAxis
              dataKey="name"
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "#0f172a",
                border: "1px solid #1e293b",
                borderRadius: 12,
              }}
            />
            <Bar dataKey="percent" radius={[8, 8, 0, 0]}>
              {chartData.map((_, i) => (
                <Cell key={i} fill={i % 2 === 0 ? "#6366f1" : "#8b5cf6"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
