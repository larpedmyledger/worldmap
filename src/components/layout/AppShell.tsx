"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sidebar, MobileNav } from "@/components/layout/Sidebar";
import { useProgress } from "@/components/providers/ProgressProvider";
import { unlockAudio } from "@/lib/sounds";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { progress, hydrated } = useProgress();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!hydrated) return;
    if (!progress.onboarded && pathname !== "/onboarding") {
      router.replace("/onboarding");
    }
  }, [hydrated, progress.onboarded, pathname, router]);

  useEffect(() => {
    const unlock = () => unlockAudio();
    window.addEventListener("pointerdown", unlock, { once: true });
    return () => window.removeEventListener("pointerdown", unlock);
  }, []);

  if (pathname === "/onboarding") {
    return <main className="min-h-dvh">{children}</main>;
  }

  return (
    <div className="flex min-h-dvh bg-slate-950 text-slate-100">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 pb-24 lg:pb-8 max-w-6xl w-full mx-auto">
          {!hydrated ? (
            <div className="animate-pulse space-y-4">
              <div className="h-8 w-48 rounded-xl bg-slate-900" />
              <div className="h-40 rounded-3xl bg-slate-900" />
            </div>
          ) : (
            children
          )}
        </main>
        <MobileNav />
      </div>
    </div>
  );
}
