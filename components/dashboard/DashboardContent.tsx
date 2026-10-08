"use client";

import Link from "next/link";
import { CalendarDays, Heart, Ticket, UserRound } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { useWishlist } from "@/lib/use-wishlist";
import type { EventItem } from "@/types";

export function DashboardContent({ events }: { events: EventItem[] }) {
  const bookings = useCart((state) => state.items);
  const wishlist = useWishlist();
  const savedEvents = events.filter((event) => wishlist.has(event.id));

  return (
    <main className="min-h-screen bg-[#f7f8fa] py-10 sm:py-16">
      <div className="container-page">
        <section className="rounded-3xl bg-gradient-to-r from-rose-600 to-rose-900 p-7 text-white shadow-elevated sm:p-10">
          <div className="flex items-start justify-between gap-5"><div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-rose-100">Your TicketHub account</p><h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Welcome back!</h1><p className="mt-3 max-w-xl text-sm text-white/85 sm:text-base">Manage your bookings, discover new experiences and keep your travel plans together.</p></div><span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 sm:flex"><UserRound className="h-7 w-7" /></span></div>
        </section>
        <section className="mt-8 grid gap-5 md:grid-cols-3" aria-label="Dashboard shortcuts">
          <DashboardCard title="My bookings" icon={Ticket} count={bookings.length} text={bookings.length ? `${bookings.length} ticket booking${bookings.length === 1 ? "" : "s"} in your cart.` : "Your confirmed bookings will appear here."} href="/cart" />
          <DashboardCard title="Browse events" icon={CalendarDays} text="Find concerts, sports and live experiences." href="/events" />
          <DashboardCard title="Saved items" icon={Heart} count={savedEvents.length} text={savedEvents.length ? `${savedEvents.length} favourite event${savedEvents.length === 1 ? "" : "s"} saved.` : "Your favourite events will appear here."} href="#saved-items" />
        </section>
        <section id="saved-items" className="mt-10 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Saved items</h2>
          {savedEvents.length > 0 ? <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{savedEvents.map((event) => <Link key={event.id} href={`/events/${event.slug}`} className="rounded-xl bg-rose-50 p-4 font-semibold text-slate-900 hover:text-rose-600">{event.title}<span className="mt-1 block text-xs font-normal text-slate-500">{event.venue}, {event.city}</span></Link>)}</div> : <div className="mt-4 rounded-xl bg-slate-50 p-5 text-sm text-slate-600">No saved events yet. <Link href="/events" className="font-semibold text-rose-600 hover:underline">Browse events</Link> and tap the heart icon to save one.</div>}
        </section>
      </div>
    </main>
  );
}

function DashboardCard({ title, text, href, icon: Icon, count }: { title: string; text: string; href: string; icon: typeof Ticket; count?: number }) {
  return <Link href={href} className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-elevated"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-600"><Icon className="h-6 w-6" /></span><div className="mt-5 flex items-center justify-between gap-2"><h2 className="text-lg font-bold text-slate-900 group-hover:text-rose-600">{title}</h2>{typeof count === "number" ? <span className="rounded-full bg-rose-100 px-2.5 py-1 text-xs font-bold text-rose-700">{count}</span> : null}</div><p className="mt-2 text-sm leading-6 text-slate-500">{text}</p><span className="mt-4 inline-block text-sm font-semibold text-rose-600">Open →</span></Link>;
}
