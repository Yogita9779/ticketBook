import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import { StaySearchWidget } from "@/components/home/StaySearchWidget";
import { getStayDeals } from "@/lib/api";
import { formatRand, toSearchString } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Stay",
  description: "Hotels, lodges and city stays across South Africa.",
  alternates: { canonical: "/accommodation" },
};

export default async function AccommodationPage() {
  const stays = await getStayDeals();
  const destinations = [...new Map(stays.map((stay) => [stay.city, stay])).values()];

  return (
    <main className="min-h-screen bg-[#f7f8fa] pb-16">
      <section className="relative h-[280px] overflow-hidden bg-slate-900 sm:h-[380px] md:h-[440px] lg:h-[500px]" aria-label="More Than Just a Stay">
        <Image src="/stay-hero.png" alt="Family arriving at a hotel for a memorable stay" fill priority sizes="100vw" className="object-cover object-[center_10%]" />
      </section>

      <div className="container-page relative z-10 -mt-16">
        <section className="mx-auto max-w-2xl rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.14)] sm:p-7" aria-labelledby="stay-search-heading">
          <h2 id="stay-search-heading" className="mb-5 text-center text-2xl font-extrabold text-slate-900">Find Your Perfect Stay</h2>
          <StaySearchWidget />
        </section>
      </div>

      <div className="container-page mt-14 space-y-16 sm:mt-20">
        <section aria-labelledby="destinations-heading">
          <SectionTitle id="destinations-heading" title="Popular Destinations" subtitle="Explore sought-after places to stay." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => (
              <Link key={destination.city} href={toSearchString({ type: "accommodation", destination: destination.city })} className="group relative isolate flex min-h-52 overflow-hidden rounded-2xl bg-slate-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500">
                <Image src={destination.image} alt={`Places to stay in ${destination.city}`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="-z-20 object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                <div className="mt-auto p-5 text-white"><span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-800"><MapPin className="h-3 w-3 text-rose-600" />{destination.city}</span><p className="mt-3 text-sm font-medium text-white/85">Stays from {formatRand(destination.pricePerNight)} per night</p></div>
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="properties-heading">
          <SectionTitle id="properties-heading" title="Featured Properties" subtitle="Hand-picked stays for your next adventure." />
          <div className="space-y-10">
            {destinations.map((destination) => {
              const cityStays = stays.filter((stay) => stay.city === destination.city);
              return (
                <section key={destination.city} aria-label={`Stays in ${destination.city}`}>
                  <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                    <div><h3 className="text-lg font-bold text-slate-900">{destination.city}</h3><p className="mt-1 text-sm text-slate-500">Comfortable stays, picked for you.</p></div>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {cityStays.map((stay) => <PropertyCard key={stay.id} stay={stay} />)}
                  </div>
                </section>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

function SectionTitle({ id, title, subtitle }: { id: string; title: string; subtitle: string }) {
  return <div className="mb-7 text-center"><h2 id={id} className="text-2xl font-extrabold tracking-tight text-rose-600 sm:text-3xl">{title}</h2><p className="mt-2 text-sm text-slate-500">{subtitle}</p></div>;
}

function PropertyCard({ stay }: { stay: Awaited<ReturnType<typeof getStayDeals>>[number] }) {
  return (
    <Link href={`/accommodation/${stay.id}`} className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_4px_18px_rgba(15,23,42,0.07)] transition hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(15,23,42,0.13)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100"><Image src={stay.image} alt={`${stay.name} in ${stay.area}, ${stay.city}`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.04]" /><span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-slate-950/65 px-2.5 py-1 text-xs font-semibold text-white"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />{stay.rating.toFixed(1)}</span><span className="absolute right-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-slate-800">From {formatRand(stay.pricePerNight)}</span></div>
      <div className="p-4"><h4 className="font-bold text-slate-900 group-hover:text-rose-700">{stay.name}</h4><p className="mt-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-slate-500"><MapPin className="h-3.5 w-3.5" />{stay.area}, {stay.city}</p><p className="mt-3 line-clamp-2 text-sm text-slate-600">{stay.type} · {stay.reviewCount.toLocaleString()} guest reviews</p><p className="mt-4 border-t border-slate-100 pt-3 text-sm font-bold text-slate-900">{formatRand(stay.pricePerNight)} <span className="font-normal text-slate-500">/ night</span></p></div>
    </Link>
  );
}
