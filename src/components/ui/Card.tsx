import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function Card({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const Comp = onClick ? "button" : "div";
  return (
    <Comp
      onClick={onClick}
      className={cn(
        "rounded-3xl bg-slate-900/80 border border-slate-800/80 p-5 text-left",
        onClick && "hover:border-indigo-500/40 hover:bg-slate-900 transition-colors cursor-pointer",
        className
      )}
    >
      {children}
    </Comp>
  );
}
