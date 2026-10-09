"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, Sparkles } from "lucide-react";
import { Avatar } from "@/components/dashboard/DashboardShell";
import { DashEventCard } from "@/components/dashboard/DashEventCard";
import { CountUp, dashCard, StatusBadge, TicketQr } from "@/components/dashboard/ui";
import { useSavedEvents } from "@/hooks/use-saved-events";
import { isUpcoming, ticketCount, useAccount } from "@/lib/account-store";
import { formatLongDate, formatRand, formatTime, orderTotals } from "@/lib/utils";
import type { EventItem } from "@/types";

export function DashboardHome({ events }: { events: EventItem[] }) {
  const profile = useAccount((state) => state.profile);
  const bookings = useAccount((state) => state.bookings);
  const saved = useSavedEvents();
  const reduced = useReducedMotion();
  const scroller = useRef<HTMLDivElement>(null);
  const firstName = profile.name.trim().split(/\s+/)[0] || "there";
  const savedEvents = saved.ready ? events.filter((event) => saved.has(event.id)) : [];
  const upcoming = bookings.filter((booking) => isUpcoming(booking)).slice(0, 3);
  const recommended = events.filter((event) => event.featured || event.trendingRank !== null).slice(0, 10);
  const upcomingCount = bookings.filter((booking) => isUpcoming(booking)).length;

  return (
    <div className="space-y-8">
      <motion.section
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-600 via-rose-700 to-rose-950 p-6 text-white shadow-[0_20px_50px_rgba(225,29,72,0.28)] sm:p-8"
      >
        <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-white/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-rose-300/30 blur-3xl" />
        <div className="pointer-events-none absolute -left-8 bottom-0 h-32 w-32 rotate-12 rounded-3xl border border-white/20" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex items-start gap-4">
            <Avatar name={profile.name} avatar={profile.avatar} className="h-16 w-16 text-lg ring-4 ring-white/20" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-rose-100">Your Bookora account</p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Welcome back, {firstName}!</h1>
              <p className="mt-3 max-w-xl text-sm text-white/85 sm:text-base">Manage your bookings, discover new experiences and keep your plans together.</p>
            </div>
          </div>
          <Link href="/dashboard/events" className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-white px-5 text-sm font-bold text-rose-700 hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
            Browse events
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <dl className="relative mt-8 grid gap-3 sm:grid-cols-3">
          {[
            ["Upcoming events", upcomingCount],
            ["Total tickets", ticketCount(bookings)],
            ["Saved", savedEvents.length],
          ].map(([label, value]) => (
            <div key={String(label)} className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md">
              <dt className="text-xs font-semibold uppercase tracking-wide text-rose-100">{label}</dt>
              <dd className="mt-1 text-2xl font-extrabold"><CountUp value={Number(value)} /></dd>
            </div>
          ))}
        </dl>
      </motion.section>

      {upcoming.length > 0 && (
        <section aria-labelledby="upcoming-heading" className={dashCard + " p-5 sm:p-6"}>
          <div className="flex items-center justify-between gap-3">
            <h2 id="upcoming-heading" className="text-xl font-bold">Upcoming bookings</h2>
            <Link href="/dashboard/bookings" className="text-sm font-semibold text-rose-600 hover:underline">View all</Link>
          </div>
          <div className="mt-5 grid gap-4 xl:grid-cols-3">
            {upcoming.map((booking) => (
              <article key={booking.id} className="overflow-hidden rounded-2xl border border-dashed border-rose-200 bg-gradient-to-br from-white to-rose-50/60 dark:border-rose-500/30 dark:from-[#161922] dark:to-rose-950/20">
                <div className="flex items-start justify-between gap-3 p-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-rose-600">{booking.id}</p>
                    <h3 className="mt-1 font-bold">{booking.title}</h3>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{formatLongDate(booking.date)} · {formatTime(booking.date)}</p>
                    <p className="mt-1 flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400"><MapPin className="h-4 w-4" aria-hidden="true" />{booking.venue}, {booking.city}</p>
                  </div>
                  <StatusBadge status={booking.status} />
                </div>
                <div className="flex items-center justify-between gap-3 border-t border-dashed border-rose-200 px-4 py-3 dark:border-rose-500/30">
                  <div>
                    <p className="text-sm font-semibold">{booking.quantity} ticket{booking.quantity === 1 ? "" : "s"} · {booking.tierName}</p>
                    <p className="text-xs text-slate-500">{formatRand(orderTotals([{ unitPrice: booking.unitPrice, quantity: booking.quantity }]).total)}</p>
                  </div>
                  <TicketQr value={booking.id} size={64} />
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      <section aria-labelledby="recommended-heading">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 id="recommended-heading" className="flex items-center gap-2 text-xl font-bold"><Sparkles className="h-5 w-5 text-rose-600" aria-hidden="true" />Recommended for you</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Popular nights out, picked from events near your cities.</p>
          </div>
          <div className="hidden gap-2 sm:flex">
            <button type="button" aria-label="Scroll recommendations backward" onClick={() => scroller.current?.scrollBy({ left: -320, behavior: reduced ? "auto" : "smooth" })} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 dark:border-white/10 dark:bg-[#161922]"><ChevronLeft className="h-4 w-4" /></button>
            <button type="button" aria-label="Scroll recommendations forward" onClick={() => scroller.current?.scrollBy({ left: 320, behavior: reduced ? "auto" : "smooth" })} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 dark:border-white/10 dark:bg-[#161922]"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
        <div ref={scroller} className="flex snap-x gap-4 overflow-x-auto pb-2 [scrollbar-width:none]" tabIndex={0} aria-label="Recommended events">
          {recommended.map((event) => (
            <div key={event.id} className="w-[280px] shrink-0 snap-start sm:w-[320px]">
              <DashEventCard event={event} />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
