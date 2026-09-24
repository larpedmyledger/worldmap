import { cn } from "@/lib/cn";

export function ProgressBar({
  value,
  className,
  barClassName,
}: {
  value: number;
  className?: string;
  barClassName?: string;
}) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("h-2 w-full rounded-full bg-slate-800 overflow-hidden", className)}>
      <div
        className={cn(
          "h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-400 transition-all duration-500",
          barClassName
        )}
        style={{ width: `${v}%` }}
      />
    </div>
  );
}
