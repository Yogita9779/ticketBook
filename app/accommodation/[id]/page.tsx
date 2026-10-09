import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Star } from "lucide-react";
import { StayAvailabilityCheck } from "@/components/accommodation/StayAvailabilityCheck";
import { getStayDeals } from "@/lib/api";
import { formatRand } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const stays = await getStayDeals();
  const stay = stays.find((item) => item.id === params.id);
  if (!stay) return { title: "Stay not found" };
  return { title: stay.name, description: `${stay.type} in ${stay.area}, ${stay.city}.`, alternates: { canonical: `/accommodation/${stay.id}` } };
}

export default async function StayDetailPage({ params }: { params: { id: string } }) {
  const stays = await getStayDeals();
  const stay = stays.find((item) => item.id === params.id);
  if (!stay) notFound();
  const similar = stays.filter((item) => item.city === stay.city && item.id !== stay.id).slice(0, 3);

  return (
    <main className="min-h-screen bg-[#f7f8fa] pb-16">
      <div className="container-page py-6 sm:py-9">
        <Link href="/accommodation" className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-rose-700"><ArrowLeft className="h-4 w-4" />All stays</Link>
        <div className="grid items-start gap-5 lg:grid-cols-[1.45fr_0.8fr]">
          <article className="overflow-hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-6">
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-slate-100"><Image src={stay.image} alt={`${stay.name}, ${stay.area}, ${stay.city}`} fill priority sizes="(max-width: 1024px) 100vw, 65vw" className="object-cover" /><span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-slate-800">{stay.type}</span></div>
            <div className="mt-5 flex flex-wrap items-start justify-between gap-4"><div><h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">{stay.name}</h1><p className="mt-2 flex items-center gap-2 text-sm text-slate-600"><MapPin className="h-4 w-4 text-rose-600" />{stay.area}, {stay.city}</p></div><span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1.5 text-sm font-bold text-slate-800"><Star className="h-4 w-4 fill-amber-400 text-amber-400" />{stay.rating.toFixed(1)} <span className="font-normal text-slate-500">({stay.reviewCount.toLocaleString()} reviews)</span></span></div>
            <p className="mt-5 text-sm leading-7 text-slate-600">Enjoy a comfortable {stay.type.toLowerCase()} stay in {stay.area}, {stay.city}. Explore nearby sights, relax in welcoming surroundings and make this your base for the trip.</p>
            <div className="mt-6 grid gap-3 border-t border-slate-100 pt-5 sm:grid-cols-3"><Info label="Property type" value={stay.type} /><Info label="Location" value={stay.city} /><Info label="Guest rating" value={`${stay.rating.toFixed(1)} / 5`} /></div>
          </article>
          <aside className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm lg:sticky lg:top-24 sm:p-6">
            <p className="text-sm font-semibold text-rose-700">Featured stay</p><h2 className="mt-1 text-xl font-bold text-slate-900">Plan your visit</h2>
            <div className="mt-5 rounded-xl bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Starting from</p><p className="mt-1 text-3xl font-extrabold text-slate-900">{formatRand(stay.pricePerNight)}<span className="ml-1 text-sm font-medium text-slate-500">/ night</span></p><p className="mt-2 text-sm text-slate-500">Rates may vary based on dates and availability.</p></div>
            <StayAvailabilityCheck isAvailable={stay.isAvailable} />
          </aside>
        </div>
        {similar.length > 0 ? <section className="mt-12" aria-labelledby="similar-stays-heading"><h2 id="similar-stays-heading" className="mb-5 text-xl font-bold text-slate-900">More stays in {stay.city}</h2><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{similar.map((item) => <Link key={item.id} href={`/accommodation/${item.id}`} className="group overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"><div className="relative aspect-[16/9]"><Image src={item.image} alt={item.name} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition group-hover:scale-[1.03]" /></div><div className="p-4"><h3 className="font-bold text-slate-900 group-hover:text-rose-700">{item.name}</h3><p className="mt-1 text-sm text-slate-500">{item.area} · {formatRand(item.pricePerNight)} / night</p></div></Link>)}</div></section> : null}
      </div>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p><p className="mt-1 font-bold text-slate-800">{value}</p></div>;
}
