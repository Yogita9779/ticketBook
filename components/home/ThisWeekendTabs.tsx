"use client";

import { useMemo, useState } from "react";
import { EventCard } from "@/components/ui/EventCard";
import { EmptyState } from "@/components/ui/Skeletons";
import { formatLongDate } from "@/lib/utils";
import type { EventItem } from "@/types";

const days = [
  { id: "fri", label: "Fri" },
  { id: "sat", label: "Sat" },
  { id: "sun", label: "Sun" },
] as const;

export function ThisWeekendTabs({
  groups,
  labels,
}: {
  groups: Record<(typeof days)[number]["id"], EventItem[]>;
  labels: Record<(typeof days)[number]["id"], string>;
}) {
  const [day, setDay] = useState<(typeof days)[number]["id"]>("fri");
  const events = groups[day];
  const dateLabel = useMemo(() => formatLongDate(`${labels[day]}T00:00:00.000Z`), [labels, day]);

  return (
    <div>
      <div role="tablist" aria-label="This weekend" className="mb-5 flex gap-2">
        {days.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={day === item.id}
            className={`rounded-pill px-4 py-2 text-sm font-semibold ${day === item.id ? "bg-brand text-white" : "bg-white text-ink shadow-card"}`}
            onClick={() => setDay(item.id)}
          >
            {item.label}
            <span className="ml-2 font-medium opacity-80">{formatLongDate(`${labels[item.id]}T00:00:00.000Z`).replace(/ \d{4}$/, "")}</span>
          </button>
        ))}
      </div>
      <p className="mb-4 text-sm text-ink-muted">Showing {dateLabel}</p>
      {events.length === 0 ? (
        <EmptyState title="No events this day" message="Try another day of the weekend, or browse the full calendar." />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
