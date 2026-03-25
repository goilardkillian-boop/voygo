import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  color?: "primary" | "success" | "warning" | "error";
  showLabel?: boolean;
}

export function Progress({ value, max = 100, className, color = "primary", showLabel }: ProgressProps) {
  const percentage = Math.min(Math.round((value / max) * 100), 100);

  return (
    <div className={cn("space-y-1", className)}>
      {showLabel && (
        <div className="flex justify-between text-xs text-slate-500">
          <span>{percentage}%</span>
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={cn("h-full rounded-full transition-all duration-500 ease-out", {
            "bg-primary-500": color === "primary",
            "bg-green-500": color === "success",
            "bg-amber-500": color === "warning",
            "bg-red-500": color === "error",
          })}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
