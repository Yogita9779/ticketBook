"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import type { BookingStatus } from "@/types";
import { cn } from "@/lib/utils";

export const dashCard =
  "rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-[#161922] dark:shadow-none";

export function CountUp({ value }: { value: number }) {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? value : 0);

  useEffect(() => {
    if (reduced) {
      setDisplay(value);
      return;
    }
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / 700);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduced, value]);

  return <>{display}</>;
}

export function TicketQr({ value, size = 112 }: { value: string; size?: number }) {
  const cells = 21;
  const bits = useMemo(() => {
    const grid = new Array<boolean>(cells * cells).fill(false);
    let hash = 2166136261;
    for (let index = 0; index < value.length; index += 1) {
      hash ^= value.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    for (let index = 0; index < grid.length; index += 1) {
      hash = Math.imul(hash ^ (hash >>> 16), 2246822507);
      hash ^= hash >>> 13;
      grid[index] = (hash >>> 0) % 3 !== 0;
    }
    const paintFinder = (originX: number, originY: number) => {
      for (let y = 0; y < 7; y += 1) {
        for (let x = 0; x < 7; x += 1) {
          const edge = x === 0 || y === 0 || x === 6 || y === 6 || (x >= 2 && x <= 4 && y >= 2 && y <= 4);
          grid[(originY + y) * cells + (originX + x)] = edge;
        }
      }
    };
    paintFinder(0, 0);
    paintFinder(cells - 7, 0);
    paintFinder(0, cells - 7);
    return grid;
  }, [value]);

  const cell = size / cells;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`Ticket code for ${value}`} className="rounded-lg bg-white">
      <rect width={size} height={size} fill="#ffffff" />
      {bits.map((on, index) =>
        on ? (
          <rect
            key={index}
            x={(index % cells) * cell}
            y={Math.floor(index / cells) * cell}
            width={cell + 0.2}
            height={cell + 0.2}
            fill="#111827"
          />
        ) : null,
      )}
    </svg>
  );
}

const statusStyles: Record<BookingStatus, string> = {
  confirmed: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  pending: "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  cancelled: "bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300",
};

export function StatusBadge({ status }: { status: BookingStatus }) {
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold", statusStyles[status])}>
      {label}
    </span>
  );
}

export function EmptyState({
  title,
  text,
  action,
}: {
  title: string;
  text: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center px-6 py-12 text-center">
      <svg viewBox="0 0 160 120" className="h-28 w-36 text-rose-500" aria-hidden="true">
        <rect x="18" y="28" width="124" height="74" rx="16" className="fill-rose-50 dark:fill-rose-500/10" />
        <path d="M46 28v74M114 28v74" className="stroke-rose-200 dark:stroke-rose-500/30" strokeWidth="2" strokeDasharray="4 6" />
        <circle cx="80" cy="58" r="16" className="fill-white dark:fill-[#161922]" />
        <path d="M80 50.5c2.6 0 4.2 1.7 4.2 4 0 2.8-2.4 3.8-4.2 5.2-1.8-1.4-4.2-2.4-4.2-5.2 0-2.3 1.6-4 4.2-4Z" className="fill-rose-500" />
        <path d="M72 78h16" className="stroke-rose-300" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">{text}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

export function SkeletonBlock({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-2xl bg-slate-200/80 dark:bg-white/10", className)} />;
}

export function HomeSkeleton() {
  return (
    <div className="space-y-6" aria-hidden="true">
      <SkeletonBlock className="h-56 w-full" />
      <div className="grid gap-4 md:grid-cols-3">
        <SkeletonBlock className="h-40" />
        <SkeletonBlock className="h-40" />
        <SkeletonBlock className="h-40" />
      </div>
      <SkeletonBlock className="h-64 w-full" />
    </div>
  );
}

export function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const letters = parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "");
  return letters.join("") || "TH";
}
