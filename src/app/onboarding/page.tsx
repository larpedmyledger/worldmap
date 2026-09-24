"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { CONTINENTS, type ContinentId } from "@/data/countries";
import { useProgress } from "@/components/providers/ProgressProvider";
import { cn } from "@/lib/cn";

type Step = "welcome" | "continent" | "exam";

export default function OnboardingPage() {
  const [step, setStep] = useState<Step>("welcome");
  const [continent, setContinent] = useState<ContinentId | "world">("europe");
  const { setOnboarded, progress, hydrated } = useProgress();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && progress.onboarded) {
      router.replace("/");
    }
  }, [hydrated, progress.onboarded, router]);

  return (
    <div className="min-h-dvh flex items-center justify-center px-4 bg-slate-950">
      <div className="w-full max-w-lg space-y-8 animate-fade-up">
        {step === "welcome" && (
          <>
            <div className="text-center space-y-4">
              <p className="text-5xl">🌍</p>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                Apprenons le monde.
              </h1>
              <p className="text-slate-400 text-lg">
                Tu pars de zéro ? Aucun problème.
              </p>
              <p className="text-slate-500">
                Nous allons te faire apprendre les pays progressivement.
              </p>
            </div>
            <Button size="lg" className="w-full" onClick={() => setStep("continent")}>
              Commencer
            </Button>
          </>
        )}

        {step === "continent" && (
          <>
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold text-white">
                Quel continent veux-tu apprendre ?
              </h1>
              <p className="text-slate-400 text-sm">
                Tu pourras changer plus tard.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {CONTINENTS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setContinent(c.id)}
                  className={cn(
                    "rounded-2xl border p-4 text-left transition-colors",
                    continent === c.id
                      ? "border-indigo-400 bg-indigo-500/10"
                      : "border-slate-800 bg-slate-900 hover:border-slate-600"
                  )}
                >
                  <p className="text-2xl">{c.emoji}</p>
                  <p className="mt-1 font-medium text-white text-sm">{c.name}</p>
                </button>
              ))}
              <button
                type="button"
                onClick={() => setContinent("world")}
                className={cn(
                  "col-span-2 rounded-2xl border p-4 text-left transition-colors",
                  continent === "world"
                    ? "border-indigo-400 bg-indigo-500/10"
                    : "border-slate-800 bg-slate-900 hover:border-slate-600"
                )}
              >
                <p className="font-medium text-white">🌐 Tout le monde</p>
              </button>
            </div>
            <Button size="lg" className="w-full" onClick={() => setStep("exam")}>
              Continuer
            </Button>
          </>
        )}

        {step === "exam" && (
          <>
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold text-white">Tu prépares un examen ?</h1>
              <p className="text-slate-400 text-sm">
                On peut activer un parcours accéléré recommandé.
              </p>
            </div>
            <div className="grid gap-3">
              <Button
                size="lg"
                className="w-full"
                onClick={() => {
                  setOnboarded({ continent, examMode: true });
                  router.replace("/parcours-examen");
                }}
              >
                Je prépare un examen
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="w-full"
                onClick={() => {
                  setOnboarded({ continent, examMode: false });
                  router.replace(
                    continent === "world" ? "/apprendre" : `/apprendre/${continent}`
                  );
                }}
              >
                Apprendre à mon rythme
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
