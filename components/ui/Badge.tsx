import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill bg-white/95 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-ink shadow-sm",
        className,
      )}
    >
      {children}
    </span>
  );
}
