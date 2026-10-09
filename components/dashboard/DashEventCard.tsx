"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { useSavedEvents } from "@/hooks/use-saved-events";
import { formatLongDate, formatRand, formatTime } from "@/lib/utils";
import type { EventItem } from "@/types";

export function DashEventCard({ event }: { event: EventItem }) {
  const saved = useSavedEvents();
  const active = saved.ready && saved.has(event.id);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-[#161922]">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={event.image}
          alt={`${event.title} at ${event.venue}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <Badge className="absolute bottom-3 left-3">{event.category}</Badge>
        <button
          type="button"
          aria-pressed={active}
          aria-label={active ? `Remove ${event.title} from saved items` : `Save ${event.title}`}
          onClick={() => saved.toggle(event)}
          className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-slate-800 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600"
        >
          <Heart className={active ? "h-5 w-5 fill-rose-600 text-rose-600" : "h-5 w-5"} aria-hidden="true" />
        </button>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-base font-bold text-slate-900 dark:text-white">{event.title}</h3>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{formatLongDate(event.date)} · {formatTime(event.date)}</p>
        <p className="mt-1 flex items-start gap-1.5 text-sm text-slate-500 dark:text-slate-400">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{event.venue}, {event.city}</span>
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <p className="text-sm font-bold text-slate-900 dark:text-white">From {formatRand(event.priceFrom)}</p>
          <Link
            href={`/dashboard/events/${event.slug}?book=1`}
            className="inline-flex h-10 items-center rounded-xl bg-rose-600 px-3 text-sm font-semibold text-white hover:bg-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 focus-visible:ring-offset-2"
          >
            Book now
          </Link>
        </div>
      </div>
    </article>
  );
}
