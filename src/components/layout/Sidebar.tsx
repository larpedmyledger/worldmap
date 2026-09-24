"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Globe2,
  Home,
  Map,
  BarChart3,
  RotateCcw,
  Settings,
  GraduationCap,
  Waves,
  Trophy,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { XPBar } from "@/components/ui/XPBar";
import { StreakBadge } from "@/components/ui/StreakBadge";

const NAV = [
  { href: "/", label: "Accueil", icon: Home },
  { href: "/apprendre", label: "Apprendre", icon: BookOpen },
  { href: "/carte", label: "Carte", icon: Map },
  { href: "/quiz", label: "Quiz", icon: GraduationCap },
  { href: "/pays", label: "Pays", icon: Globe2 },
  { href: "/revoir", label: "À revoir", icon: RotateCcw },
  { href: "/oceans", label: "Océans", icon: Waves },
  { href: "/statistiques", label: "Statistiques", icon: BarChart3 },
  { href: "/succes", label: "Succès", icon: Trophy },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-slate-800/80 bg-slate-950/90 px-4 py-6">
      <Link href="/" className="mb-8 px-2">
        <p className="text-xl font-bold tracking-tight text-white">
          <span className="text-indigo-400">World</span>Map
        </p>
        <p className="text-xs text-slate-500 mt-1">Apprends le monde</p>
      </Link>

      <nav className="flex-1 space-y-1">
        {NAV.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-indigo-500/15 text-indigo-300"
                  : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-3 mt-4">
        <StreakBadge />
        <XPBar compact />
        <Link
          href="/parametres"
          className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm text-slate-400 hover:bg-slate-900 hover:text-slate-200"
        >
          <Settings className="h-4 w-4" />
          Paramètres
        </Link>
      </div>
    </aside>
  );
}

const MOBILE_NAV = [
  { href: "/", label: "Accueil", icon: Home },
  { href: "/apprendre", label: "Apprendre", icon: BookOpen },
  { href: "/carte", label: "Carte", icon: Map },
  { href: "/quiz", label: "Quiz", icon: GraduationCap },
  { href: "/statistiques", label: "Stats", icon: BarChart3 },
];

export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-slate-800 bg-slate-950/95 backdrop-blur-md px-2 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-stretch justify-around">
        {MOBILE_NAV.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px]",
                active ? "text-indigo-300" : "text-slate-500"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
