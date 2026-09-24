"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/cn";

export function PageHeader({
  title,
  subtitle,
  backHref,
  action,
}: {
  title: string;
  subtitle?: string;
  backHref?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div className="min-w-0">
        {backHref && (
          <Link
            href={backHref}
            className="mb-3 inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Link>
        )}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          {title}
        </h1>
        {subtitle && (
          <p className={cn("mt-1 text-slate-400 text-sm sm:text-base")}>{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}
