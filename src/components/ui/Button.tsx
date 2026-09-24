import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "success";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/20",
  secondary:
    "bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700",
  ghost: "bg-transparent hover:bg-slate-800/80 text-slate-300",
  danger: "bg-rose-500/90 hover:bg-rose-400 text-white",
  success: "bg-emerald-500 hover:bg-emerald-400 text-white",
};

const sizes: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm rounded-xl",
  md: "px-4 py-2.5 text-sm rounded-2xl",
  lg: "px-6 py-3.5 text-base rounded-2xl",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
