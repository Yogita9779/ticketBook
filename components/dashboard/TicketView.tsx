"use client";

import Link from "next/link";
import { useAccount } from "@/lib/account-store";
import { formatLongDate, formatRand, formatTime, orderTotals } from "@/lib/utils";
import { dashCard, EmptyState, StatusBadge, TicketQr } from "@/components/dashboard/ui";

export function TicketView({ id }: { id: string }) {
  const booking = useAccount((state) => state.bookings.find((item) => item.id === id));

  if (!booking) {
    return (
      <div className={dashCard}>
        <EmptyState title="Ticket not found" text="That booking reference is not in this account." action={<Link href="/dashboard/bookings" className="inline-flex h-11 items-center rounded-xl bg-rose-600 px-4 text-sm font-semibold text-white">Back to bookings</Link>} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-4 flex items-center justify-between gap-3 print:hidden">
        <Link href="/dashboard/bookings" className="text-sm font-semibold text-rose-600 hover:underline">Back to bookings</Link>
        <button type="button" onClick={() => window.print()} className="inline-flex h-11 items-center rounded-xl bg-rose-600 px-4 text-sm font-semibold text-white">Download / print ticket</button>
      </div>
      <article className={`${dashCard} ticket-print overflow-hidden`}>
        <div className="bg-gradient-to-r from-rose-600 to-rose-900 px-6 py-5 text-white">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-rose-100">Bookora</p>
          <h1 className="mt-2 text-2xl font-extrabold">{booking.title}</h1>
          <p className="mt-1 text-sm text-white/80">{booking.category} · {booking.city}</p>
        </div>
        <div className="grid gap-6 p-6 sm:grid-cols-[1fr_auto]">
          <dl className="space-y-3 text-sm">
            <div><dt className="text-slate-500">Booking ID</dt><dd className="font-bold">{booking.id}</dd></div>
            <div><dt className="text-slate-500">Date</dt><dd className="font-semibold">{formatLongDate(booking.date)} · {formatTime(booking.date)}</dd></div>
            <div><dt className="text-slate-500">Venue</dt><dd className="font-semibold">{booking.venue}, {booking.city}</dd></div>
            <div><dt className="text-slate-500">Tickets</dt><dd className="font-semibold">{booking.quantity} × {booking.tierName}</dd></div>
            <div><dt className="text-slate-500">Attendee</dt><dd className="font-semibold">{booking.attendee.name}<span className="mt-0.5 block font-normal text-slate-500">{booking.attendee.email}</span></dd></div>
            <div><dt className="text-slate-500">Paid</dt><dd className="font-semibold">{formatRand(orderTotals([{ unitPrice: booking.unitPrice, quantity: booking.quantity }]).total)}</dd></div>
            <div><dt className="text-slate-500">Status</dt><dd className="mt-1"><StatusBadge status={booking.status} /></dd></div>
          </dl>
          <TicketQr value={booking.id} size={148} />
        </div>
      </article>
    </div>
  );
}
