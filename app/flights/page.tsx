import type { Metadata } from "next";
import Image from "next/image";
import { CalendarDays, ChevronDown, FileText, Luggage, Plane } from "lucide-react";
import { FlightSearchWidget } from "@/components/home/FlightSearchWidget";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Flights",
  description: "Search domestic flight deals across South Africa.",
  alternates: { canonical: "/flights" },
};

const flightTips = [
  {
    title: "Best Time to Book Flights",
    subtitle: "Plan ahead and compare your options",
    detail: "Compare dates and routes before you book. Prices and availability can vary, so check the fare details for your chosen trip.",
    icon: CalendarDays,
  },
  {
    title: "Baggage Allowance Guide",
    subtitle: "Check what your fare includes",
    detail: "Baggage allowances differ by airline and fare type. Review the airline's baggage policy before travelling, especially for checked luggage.",
    icon: Luggage,
  },
  {
    title: "Airport Arrival Tips",
    subtitle: "Give yourself time before departure",
    detail: "Check your airline's recommended airport arrival time and allow extra time for check-in, security and busy travel periods.",
    icon: Plane,
  },
  {
    title: "Travel Documents",
    subtitle: "Have your documents ready",
    detail: "Confirm which identity documents are required for your itinerary and make sure names on your booking match your travel documents.",
    icon: FileText,
  },
];

export default function FlightsPage() {
  return (
    <main className="min-h-screen bg-[#f7f8fa] pb-14">
      <section className="relative h-[280px] overflow-hidden bg-slate-950 sm:h-[380px] md:h-[440px] lg:h-[500px]" aria-label="The World Awaits">
        <Image
          src="/flight-world.png"
          alt="Family at the airport, ready to explore — the world awaits"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </section>

      <div className="container-page relative z-10 -mt-10 sm:-mt-14">
        <section className="mx-auto w-full max-w-xl rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_14px_35px_rgba(15,23,42,0.12)] sm:p-7" aria-labelledby="flight-search-heading">
          <h1 id="flight-search-heading" className="mb-5 text-center text-xl font-bold text-ink sm:text-2xl">Find Your Perfect Flight</h1>
          <FlightSearchWidget stacked />
        </section>
      </div>

      <div className="container-page mt-16 space-y-16 sm:mt-20">
        <section className="mx-auto max-w-5xl" aria-labelledby="flight-tips-heading">
          <div className="mb-8 text-center">
            <h2 id="flight-tips-heading" className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Flight Booking Tips &amp; Guides</h2>
            <p className="mt-2 text-sm text-ink-muted sm:text-base">Everything you need to know for a smooth travel experience.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {flightTips.map(({ title, subtitle, detail, icon: Icon }) => (
              <details key={title} className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_4px_14px_rgba(15,23,42,0.05)]">
                <summary className="flex cursor-pointer list-none items-center gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-rose-600 text-white shadow-md"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold text-ink">{title}</span>
                    <span className="mt-1 block text-sm text-ink-muted">{subtitle}</span>
                  </span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="mt-4 border-t border-slate-100 pt-4 pl-16 text-sm leading-6 text-ink-muted">{detail}</p>
              </details>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
