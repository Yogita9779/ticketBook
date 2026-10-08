import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { BusSearchWidget } from "@/components/home/BusSearchWidget";
import { DealCard } from "@/components/ui/DealCard";
import { DealGridSkeleton } from "@/components/ui/Skeletons";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getBusDeals } from "@/lib/api";
import { toSearchString } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Bus Tickets",
  description: "Book intercity bus tickets with reserved seats.",
  alternates: { canonical: "/bus" },
};

export default function BusPage() {
  return (
    <main className="min-h-screen bg-[#f7f8fa] pb-14">
      <section className="relative h-[280px] overflow-hidden bg-slate-950 sm:h-[380px] md:h-[440px] lg:h-[500px]" aria-label="Journeys Begin With Love">
        <Image
          src="/bus-journey.png"
          alt="A family sharing a warm goodbye at a bus station — journeys begin with love"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_38%]"
        />
      </section>

      <div className="container-page relative z-10 -mt-10 sm:-mt-14">
        <section className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_14px_35px_rgba(15,23,42,0.12)] sm:p-6" aria-labelledby="bus-search-heading">
          <h1 id="bus-search-heading" className="mb-4 text-center text-xl font-bold text-ink sm:text-2xl">Find Your Perfect Bus</h1>
          <BusSearchWidget />
        </section>
      </div>

      <section className="mx-auto mt-12 w-full max-w-[1600px] px-4 sm:mt-16 sm:px-6 lg:px-8" aria-labelledby="bus-carriers-heading">
        <div className="mb-8 text-center">
          <h2 id="bus-carriers-heading" className="text-2xl font-extrabold tracking-tight text-rose-600 sm:text-3xl">Bus Carrier Offerings</h2>
          <p className="mt-2 text-sm text-ink-muted">Explore popular routes and coach operators across South Africa.</p>
        </div>
        <Suspense fallback={<DealGridSkeleton />}>
          <BusGrid />
        </Suspense>
      </section>
    </main>
  );
}

async function BusGrid() {
  const deals = (await getBusDeals()).slice(0, 6);
  if (deals.length === 0) return <p className="text-sm text-ink-muted">No bus deals are loaded.</p>;
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {deals.map((deal) => (
        <DealCard
          key={deal.id}
          href={toSearchString({ type: "bus", origin: deal.from, to: deal.to })}
          image={deal.image}
          imageAlt={`${deal.operator} coach from ${deal.from} to ${deal.to}`}
          title={deal.operator}
          subtitle={`${deal.from} → ${deal.to}`}
          meta={`${deal.duration} · Departs ${deal.departs}`}
          price={deal.price}
          clickable={false}
        />
      ))}
    </div>
  );
}
