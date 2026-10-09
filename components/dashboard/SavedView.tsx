"use client";

import Link from "next/link";
import { DashEventCard } from "@/components/dashboard/DashEventCard";
import { dashCard, EmptyState } from "@/components/dashboard/ui";
import { useSavedEvents } from "@/hooks/use-saved-events";
import type { EventItem } from "@/types";

export function SavedView({ events }: { events: EventItem[] }) {
  const saved = useSavedEvents();
  if (!saved.ready) {
    return (
      <div className="space-y-6">
        <div className="h-16 w-64 animate-pulse rounded-2xl bg-slate-200 dark:bg-white/10" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <div className="h-72 animate-pulse rounded-2xl bg-slate-200 dark:bg-white/10" />
          <div className="h-72 animate-pulse rounded-2xl bg-slate-200 dark:bg-white/10" />
          <div className="h-72 animate-pulse rounded-2xl bg-slate-200 dark:bg-white/10" />
        </div>
      </div>
    );
  }

  const items = events.filter((event) => saved.has(event.id));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Saved items</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{items.length} event{items.length === 1 ? "" : "s"} kept for later.</p>
      </div>
      {items.length === 0 ? (
        <div className={dashCard}>
          <EmptyState title="No saved events" text="Tap the heart on any event to build a shortlist. The dashboard count updates straight away." action={<Link href="/dashboard/events" className="inline-flex h-11 items-center rounded-xl bg-rose-600 px-4 text-sm font-semibold text-white">Browse events</Link>} />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((event) => <DashEventCard key={event.id} event={event} />)}
        </div>
      )}
    </div>
  );
}
