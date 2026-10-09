"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DashEventCard } from "@/components/dashboard/DashEventCard";
import { dashCard, EmptyState } from "@/components/dashboard/ui";
import { CITIES, EVENT_CATEGORIES, type EventItem } from "@/types";

const PAGE_SIZE = 9;

export function EventBrowser({ events }: { events: EventItem[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [draft, setDraft] = useState(params.get("q") ?? "");

  useEffect(() => {
    setDraft(params.get("q") ?? "");
  }, [params]);

  const q = (params.get("q") ?? "").trim().toLowerCase();
  const category = params.get("category") ?? "";
  const city = params.get("city") ?? "";
  const date = params.get("date") ?? "";
  const requestedSort = params.get("sort");
  const sort = requestedSort === "price-desc" ? "price-desc" : "price-asc";
  const page = Math.max(1, Number.parseInt(params.get("page") ?? "1", 10) || 1);

  const filtered = useMemo(() => {
    const next = events.filter((event) => {
      const haystack = `${event.title} ${event.venue} ${event.city} ${event.category}`.toLowerCase();
      if (q && !haystack.includes(q)) return false;
      if (category && event.category !== category) return false;
      if (city && event.city !== city) return false;
      if (date && event.date.slice(0, 10) < date) return false;
      return true;
    });
    next.sort((a, b) => {
      if (sort === "price-asc") return a.priceFrom - b.priceFrom;
      if (sort === "price-desc") return b.priceFrom - a.priceFrom;
      return a.priceFrom - b.priceFrom;
    });
    return next;
  }, [category, city, date, events, q, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  function update(patch: Record<string, string>, resetPage = true) {
    const next = new URLSearchParams(params.toString());
    Object.entries(patch).forEach(([key, value]) => {
      if (value) next.set(key, value);
      else next.delete(key);
    });
    if (resetPage) next.delete("page");
    const query = next.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Browse events</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{events.length} experiences across South Africa. Filter by city, category or date.</p>
      </div>
      <form
        className={`${dashCard} grid gap-3 p-4 md:grid-cols-2 xl:grid-cols-6`}
        onSubmit={(event) => {
          event.preventDefault();
          update({ q: draft.trim() });
        }}
      >
        <label className="xl:col-span-2">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Search</span>
          <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Artist, team, venue" className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 dark:border-white/10 dark:bg-[#0c0e14]" />
        </label>
        <label>
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Category</span>
          <select value={category} onChange={(event) => update({ category: event.target.value })} className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 dark:border-white/10 dark:bg-[#0c0e14]">
            <option value="">All</option>
            {EVENT_CATEGORIES.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">City</span>
          <select value={city} onChange={(event) => update({ city: event.target.value })} className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 dark:border-white/10 dark:bg-[#0c0e14]">
            <option value="">All cities</option>
            {CITIES.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">From date</span>
          <input type="date" value={date} onChange={(event) => update({ date: event.target.value })} className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 dark:border-white/10 dark:bg-[#0c0e14]" />
        </label>
        <label>
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Sort</span>
          <select value={sort} onChange={(event) => update({ sort: event.target.value })} className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 dark:border-white/10 dark:bg-[#0c0e14]">
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </label>
      </form>

      <p className="text-sm text-slate-500 dark:text-slate-400" aria-live="polite">{filtered.length} event{filtered.length === 1 ? "" : "s"}</p>

      {visible.length === 0 ? (
        <div className={dashCard}>
          <EmptyState title="No events match" text="Try another city, clear the date, or search for a broader term." action={<button type="button" onClick={() => { setDraft(""); update({ q: "", category: "", city: "", date: "", sort: "price-asc" }); }} className="inline-flex h-11 items-center rounded-xl bg-rose-600 px-4 text-sm font-semibold text-white">Clear filters</button>} />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((event) => <DashEventCard key={event.id} event={event} />)}
        </div>
      )}

      {pages > 1 ? (
        <nav aria-label="Event pages" className="flex items-center justify-center gap-2">
          <button type="button" disabled={current === 1} onClick={() => update({ page: String(current - 1) }, false)} className="h-10 rounded-xl border border-slate-200 px-3 text-sm font-semibold disabled:opacity-40 dark:border-white/10">Previous</button>
          {Array.from({ length: pages }, (_, index) => index + 1).map((number) => (
            <button key={number} type="button" aria-current={number === current ? "page" : undefined} onClick={() => update({ page: String(number) }, false)} className={`h-10 w-10 rounded-xl text-sm font-semibold ${number === current ? "bg-rose-600 text-white" : "border border-slate-200 dark:border-white/10"}`}>{number}</button>
          ))}
          <button type="button" disabled={current === pages} onClick={() => update({ page: String(current + 1) }, false)} className="h-10 rounded-xl border border-slate-200 px-3 text-sm font-semibold disabled:opacity-40 dark:border-white/10">Next</button>
        </nav>
      ) : null}
    </div>
  );
}
