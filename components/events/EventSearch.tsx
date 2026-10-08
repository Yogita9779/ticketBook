"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { EventItem } from "@/types";

type SearchEvent = Pick<EventItem, "title" | "slug" | "category" | "city" | "venue">;

export function EventSearch({ events }: { events: SearchEvent[] }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const suggestions = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (normalized.length < 2) return [];
    return events
      .filter((event) => `${event.title} ${event.venue} ${event.city} ${event.category}`.toLowerCase().includes(normalized))
      .slice(0, 6);
  }, [events, query]);

  return (
    <form action="/search" className="relative mt-3">
      <input type="hidden" name="type" value="events" />
      <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-2">
        <Search className="ml-2 h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
        <input
          name="q"
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search events, artists, venues..."
          aria-label="Search events, artists, venues"
          aria-autocomplete="list"
          aria-expanded={open && suggestions.length > 0}
          className="h-10 min-w-0 flex-1 bg-transparent px-1 text-sm outline-none placeholder:text-slate-400"
        />
        <button type="submit" className="rounded-lg bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700">Search</button>
      </div>
      {open && suggestions.length > 0 ? (
        <ul role="listbox" aria-label="Matching events" className="absolute left-0 right-0 top-full z-30 mt-2 max-h-72 overflow-auto rounded-xl border border-slate-200 bg-white p-1 shadow-xl">
          {suggestions.map((event) => (
            <li key={event.slug} role="option" aria-selected="false">
              <Link
                href={`/events/${event.slug}`}
                onClick={() => setOpen(false)}
                className="flex flex-col rounded-lg px-4 py-3 text-left transition hover:bg-rose-50 focus-visible:bg-rose-50 focus-visible:outline-none"
              >
                <span className="font-semibold text-ink">{event.title}</span>
                <span className="mt-0.5 text-xs text-ink-muted">{event.category} · {event.venue}, {event.city}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </form>
  );
}
