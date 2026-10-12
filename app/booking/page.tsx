import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { ArrowLeft, BusFront, CalendarDays, Clock3, Plane } from "lucide-react";
import { getBusDeals, getFlightDeals } from "@/lib/api";
import { formatRand, toSearchString } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Review your trip",
  description: "Review your selected flight or bus trip.",
};

type BookingSearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function TravelBookingPage({ searchParams }: { searchParams: BookingSearchParams }) {
  const type = first(searchParams.type);
  const id = first(searchParams.id);
  const passengers = Math.max(1, Number.parseInt(first(searchParams.passengers), 10) || 1);
  const depart = first(searchParams.depart);
  const trip = first(searchParams.trip);
  const ret = first(searchParams.return) || first(searchParams.ret);
  const cabin = first(searchParams.cabin);

  if (type === "flights") {
    const deal = (await getFlightDeals()).find((item) => item.id === id);
    if (!deal) notFound();
    const backHref = toSearchString({ type: "flights", origin: deal.from, to: deal.to, depart, trip, ret, passengers: String(passengers), cabin });
    return (
      <main className="min-h-screen bg-[#f7f8fa] pb-16">
        <div className="container-page py-6 sm:py-10">
          <Link href={backHref} className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-rose-700"><ArrowLeft className="h-4 w-4" />Back to flights</Link>
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(300px,0.75fr)]">
            <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm" aria-labelledby="flight-booking-title">
              <div className="relative aspect-[16/8] bg-slate-200"><Image src={deal.image} alt={`${deal.airline} flight from ${deal.from} to ${deal.to}`} fill priority sizes="(max-width: 1024px) 100vw, 65vw" className="object-cover" /></div>
              <div className="p-5 sm:p-7">
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-rose-700"><Plane className="h-4 w-4" />Flight booking</p>
                <h1 id="flight-booking-title" className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">{deal.from} to {deal.to}</h1>
                <p className="mt-2 text-slate-600">{deal.airline} · {deal.fromCode} → {deal.toCode}</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <TripInfo icon={<CalendarDays className="h-4 w-4" />} label="Departure" value={formatDate(depart)} />
                  <TripInfo icon={<Clock3 className="h-4 w-4" />} label="Flight time" value={`${deal.duration} · ${deal.stops}`} />
                  <TripInfo label="Trip type" value={trip === "return" ? "Return" : "One way"} />
                  <TripInfo label="Cabin class" value={cabin || "Economy"} />
                </div>
              </div>
            </section>
            <TripPriceSummary price={deal.price} passengers={passengers} label="Flight price" />
          </div>
        </div>
      </main>
    );
  }

  if (type === "bus") {
    const deal = (await getBusDeals()).find((item) => item.id === id);
    if (!deal) notFound();
    const backHref = toSearchString({ type: "bus", origin: deal.from, to: deal.to, depart, trip, ret, passengers: String(passengers) });
    return (
      <main className="min-h-screen bg-[#f7f8fa] pb-16">
        <div className="container-page py-6 sm:py-10">
          <Link href={backHref} className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-rose-700"><ArrowLeft className="h-4 w-4" />Back to buses</Link>
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(300px,0.75fr)]">
            <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm" aria-labelledby="bus-booking-title">
              <div className="relative aspect-[16/8] bg-slate-200"><Image src={deal.image} alt={`${deal.operator} coach from ${deal.from} to ${deal.to}`} fill priority sizes="(max-width: 1024px) 100vw, 65vw" className="object-cover" /></div>
              <div className="p-5 sm:p-7">
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-rose-700"><BusFront className="h-4 w-4" />Bus booking</p>
                <h1 id="bus-booking-title" className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">{deal.from} to {deal.to}</h1>
                <p className="mt-2 text-slate-600">{deal.operator}</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <TripInfo icon={<CalendarDays className="h-4 w-4" />} label="Departure" value={formatDate(depart)} />
                  <TripInfo icon={<Clock3 className="h-4 w-4" />} label="Journey time" value={`${deal.duration} · Departs ${deal.departs}`} />
                  <TripInfo label="Trip type" value={trip === "return" ? "Return" : "One way"} />
                  <TripInfo label="Passengers" value={`${passengers} ${passengers === 1 ? "passenger" : "passengers"}`} />
                </div>
              </div>
            </section>
            <TripPriceSummary price={deal.price} passengers={passengers} label="Bus fare" />
          </div>
        </div>
      </main>
    );
  }

  notFound();
}

function formatDate(date: string) {
  if (!date) return "Not selected";
  const parsed = new Date(`${date}T12:00:00`);
  return Number.isNaN(parsed.getTime()) ? date : new Intl.DateTimeFormat("en-ZA", { dateStyle: "medium" }).format(parsed);
}

function TripInfo({ icon, label, value }: { icon?: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{icon}{label}</p>
      <p className="mt-1 font-bold text-slate-800">{value}</p>
    </div>
  );
}

function TripPriceSummary({ price, passengers, label }: { price: number; passengers: number; label: string }) {
  return (
    <aside className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
      <p className="text-sm font-semibold text-rose-700">Booking summary</p>
      <h2 className="mt-1 text-xl font-bold text-slate-900">Your trip</h2>
      <div className="mt-5 rounded-xl bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label} per passenger</p>
        <p className="mt-1 text-3xl font-extrabold text-slate-900">{formatRand(price)}</p>
        <p className="mt-2 text-sm text-slate-500">{passengers} {passengers === 1 ? "passenger" : "passengers"}</p>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
        <span className="font-semibold text-slate-600">Estimated total</span>
        <span className="font-extrabold text-slate-900">{formatRand(price * passengers)}</span>
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-500">Review this trip before continuing with your booking.</p>
    </aside>
  );
}
