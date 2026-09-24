"use client";

import { cn } from "@/lib/cn";

export function flagUrl(isoCode: string, width = 80): string {
  return `https://flagcdn.com/w${width}/${isoCode.toLowerCase()}.png`;
}

export function FlagImage({
  isoCode,
  name,
  size = "md",
  className,
}: {
  isoCode: string;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const dims = {
    sm: { w: 32, h: 24, pw: 40 },
    md: { w: 48, h: 36, pw: 80 },
    lg: { w: 96, h: 72, pw: 160 },
    xl: { w: 160, h: 120, pw: 320 },
  }[size];

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={flagUrl(isoCode, dims.pw)}
      alt={name ? `Drapeau de ${name}` : "Drapeau"}
      width={dims.w}
      height={dims.h}
      loading="lazy"
      className={cn(
        "inline-block rounded-md object-cover shadow-sm border border-slate-700/60 bg-slate-800",
        className
      )}
      style={{ width: dims.w, height: dims.h }}
    />
  );
}
