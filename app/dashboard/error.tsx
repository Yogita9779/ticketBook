"use client";

import { dashCard } from "@/components/dashboard/ui";

export default function DashboardError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className={`${dashCard} px-6 py-12 text-center`}>
      <h1 className="text-2xl font-extrabold">Something went wrong</h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">The dashboard could not load this view. Your saved account data is still on this device.</p>
      <button type="button" onClick={reset} className="mt-5 inline-flex h-11 items-center rounded-xl bg-rose-600 px-4 text-sm font-semibold text-white">
        Try again
      </button>
    </div>
  );
}
