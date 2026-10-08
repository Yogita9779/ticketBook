import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Rating({ value, count }: { value: number; count?: number }) {
  const rounded = Math.round(value);
  return (
    <div className="flex items-center gap-1" aria-label={`Rated ${value.toFixed(1)} out of 5`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          className={cn("h-3.5 w-3.5", index < rounded ? "fill-amber-400 text-amber-400" : "text-neutral-300")}
        />
      ))}
      <span className="text-sm font-semibold text-ink">{value.toFixed(1)}</span>
      {typeof count === "number" ? <span className="text-xs text-ink-muted">({count})</span> : null}
    </div>
  );
}
