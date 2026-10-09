"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { dashCard, EmptyState, StatusBadge, TicketQr } from "@/components/dashboard/ui";
import { isPast, isUpcoming, useAccount } from "@/lib/account-store";
import { formatLongDate, formatRand, formatTime, orderTotals } from "@/lib/utils";
import type { Booking } from "@/types";

const tabs = [
  { id: "upcoming", label: "Upcoming" },
  { id: "past", label: "Past" },
  { id: "cancelled", label: "Cancelled" },
] as const;

export function BookingsView() {
  const bookings = useAccount((state) => state.bookings);
  const cancelBooking = useAccount((state) => state.cancelBooking);
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("upcoming");
  const [target, setTarget] = useState<Booking | null>(null);

  const groups = useMemo(() => ({
    upcoming: bookings.filter((booking) => isUpcoming(booking)),
    past: bookings.filter((booking) => isPast(booking)),
    cancelled: bookings.filter((booking) => booking.status === "cancelled"),
  }), [bookings]);

  const visible = groups[tab];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">My bookings</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Upcoming shows, past nights out and cancelled tickets.</p>
      </div>
      <div role="tablist" aria-label="Booking status" className="flex w-fit gap-1 rounded-2xl bg-white p-1 shadow-sm dark:bg-[#161922]">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            onClick={() => setTab(item.id)}
            className={`h-10 rounded-xl px-4 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 ${tab === item.id ? "bg-rose-600 text-white" : "text-slate-600 dark:text-slate-300"}`}
          >
            {item.label} ({groups[item.id].length})
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className={dashCard}>
          <EmptyState
            title={`No ${tab} bookings`}
            text={tab === "upcoming" ? "Book an event and it will show up in this list." : "Nothing in this tab yet."}
            action={tab === "upcoming" ? <Link href="/dashboard/events" className="inline-flex h-11 items-center rounded-xl bg-rose-600 px-4 text-sm font-semibold text-white">Browse events</Link> : undefined}
          />
        </div>
      ) : (
        <ul className="space-y-4">
          {visible.map((booking) => (
            <li key={booking.id} className={`${dashCard} overflow-hidden sm:flex`}>
              <div className="relative h-40 sm:h-auto sm:w-48">
                <Image src={booking.image} alt="" fill className="object-cover" sizes="192px" />
              </div>
              <div className="flex flex-1 flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs font-bold uppercase tracking-wide text-rose-600">{booking.id}</p>
                    <StatusBadge status={booking.status} />
                  </div>
                  <h2 className="mt-1 text-lg font-bold">{booking.title}</h2>
                  <p className="mt-1 text-sm text-slate-500">{formatLongDate(booking.date)} · {formatTime(booking.date)}</p>
                  <p className="mt-1 flex items-center gap-1 text-sm text-slate-500"><MapPin className="h-4 w-4" aria-hidden="true" />{booking.venue}, {booking.city}</p>
                  <p className="mt-2 text-sm font-semibold">{booking.quantity} × {booking.tierName} · {formatRand(orderTotals([{ unitPrice: booking.unitPrice, quantity: booking.quantity }]).total)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <TicketQr value={booking.id} size={72} />
                  <div className="flex flex-col gap-2">
                    <Link href={`/dashboard/bookings/${booking.id}`} className="inline-flex h-10 items-center justify-center rounded-xl bg-rose-600 px-3 text-sm font-semibold text-white">View ticket</Link>
                    {booking.status !== "cancelled" && isUpcoming(booking) ? (
                      <button type="button" onClick={() => setTarget(booking)} className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 px-3 text-sm font-semibold dark:border-white/10">Cancel</button>
                    ) : null}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={Boolean(target)} onOpenChange={(open) => { if (!open) setTarget(null); }}>
        <DialogContent className="dark:border-white/10 dark:bg-[#161922] dark:text-white">
          <DialogHeader>
            <DialogTitle className="dark:text-white">Cancel this booking?</DialogTitle>
            <DialogDescription className="dark:text-slate-400">
              {target ? `${target.title} (${target.id}) will move to Cancelled. This demo does not issue a refund.` : ""}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setTarget(null)} className="h-11 rounded-xl border border-slate-200 px-4 text-sm font-semibold dark:border-white/10">Keep booking</button>
            <button
              type="button"
              onClick={() => {
                if (target) cancelBooking(target.id);
                setTarget(null);
                setTab("cancelled");
              }}
              className="h-11 rounded-xl bg-rose-600 px-4 text-sm font-semibold text-white"
            >
              Cancel booking
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
