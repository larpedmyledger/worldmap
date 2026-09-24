"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useProgress } from "@/components/providers/ProgressProvider";

export default function ParametresPage() {
  const { progress, updatePreferences, resetAll } = useProgress();

  return (
    <div className="space-y-6 animate-fade-up max-w-lg">
      <PageHeader title="Paramètres" backHref="/" />

      <Card className="space-y-4">
        <label className="flex items-center justify-between gap-4">
          <div>
            <p className="font-medium text-white">Parcours examen</p>
            <p className="text-xs text-slate-500">
              Affiche le parcours accéléré sur l&apos;accueil
            </p>
          </div>
          <input
            type="checkbox"
            checked={progress.preferences.examMode}
            onChange={(e) =>
              updatePreferences({ examMode: e.target.checked })
            }
            className="h-5 w-5 accent-indigo-500"
          />
        </label>
      </Card>

      <Card className="space-y-3">
        <p className="font-medium text-white">Données locales</p>
        <p className="text-sm text-slate-500">
          Ta progression est sauvegardée dans ce navigateur (localStorage).
        </p>
        <Button
          variant="danger"
          onClick={() => {
            if (
              confirm(
                "Réinitialiser toute ta progression ? Cette action est irréversible."
              )
            ) {
              resetAll();
              window.location.href = "/onboarding";
            }
          }}
        >
          Réinitialiser la progression
        </Button>
      </Card>
    </div>
  );
}
