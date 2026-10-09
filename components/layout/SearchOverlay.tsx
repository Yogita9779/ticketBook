"use client";

import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { suggestEvents } from "@/lib/api";
import type { EventItem } from "@/types";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setError("");
      return;
    }
    const handle = window.setTimeout(async () => {
      setLoading(true);
      setError("");
      try {
        const next = await suggestEvents(query);
        setResults(next);
      } catch {
        setError("Suggestions are unavailable right now.");
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => window.clearTimeout(handle);
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] bg-white" role="dialog" aria-modal="true" aria-label="Search Bookora">
      <div className="container-page py-4">
        <form
          className="flex items-center gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            if (query.trim().length < 2) return;
            router.push(`/search?type=events&q=${encodeURIComponent(query.trim())}`);
            onClose();
          }}
        >
          <label htmlFor="overlay-search" className="sr-only">
            Search events, artists, venues
          </label>
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
            <input
              id="overlay-search"
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search events, artists, venues"
              role="combobox"
              aria-expanded={results.length > 0}
              aria-controls={listId}
              aria-autocomplete="list"
              className="h-12 w-full rounded-pill border border-neutral-300 pl-10 pr-4 text-base text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            />
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="flex h-12 w-12 items-center justify-center rounded-full hover:bg-canvas"
          >
            <X className="h-5 w-5" />
          </button>
        </form>
        <div className="mt-4">
          {loading ? <p className="text-sm text-ink-muted">Searching…</p> : null}
          {error ? (
            <p role="alert" className="text-sm text-accent">
              {error}
            </p>
          ) : null}
          {results.length > 0 ? (
            <ul id={listId} role="listbox" className="mt-2 divide-y divide-neutral-100 rounded-card border border-neutral-200">
              {results.map((event) => (
                <li key={event.id} role="option" aria-selected="false">
                  <button
                    type="button"
                    className="flex w-full flex-col px-4 py-3 text-left hover:bg-canvas"
                    onClick={() => {
                      router.push(`/events/${event.slug}`);
                      onClose();
                    }}
                  >
                    <span className="font-medium text-ink">{event.title}</span>
                    <span className="text-sm text-ink-muted">
                      {event.venue}, {event.city}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
          {!loading && query.trim().length >= 2 && results.length === 0 && !error ? (
            <p className="mt-3 text-sm text-ink-muted">No matching events. Press enter to search anyway.</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
