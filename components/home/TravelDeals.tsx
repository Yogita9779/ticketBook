import { ChevronRight, Flame } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getTravelDeals } from "@/lib/api";
import { formatRand, toSearchString } from "@/lib/utils";

type TravelDealItem = {
  id: string;
  href: string;
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  details: string;
  price: number;
  priceSuffix?: string;
};

export default async function TravelDeals() {
  const { flights, buses, stays } = await getTravelDeals();

  const flightItems: TravelDealItem[] = flights.map((deal) => ({
    id: deal.id,
    href: toSearchString({ type: "flights", origin: deal.from, to: deal.to }),
    image: deal.image,
    imageAlt: `${deal.airline} flight from ${deal.from} to ${deal.to}`,
    eyebrow: deal.stops === "Direct" ? "Direct flight" : deal.stops,
    title: `${deal.fromCode} → ${deal.toCode}`,
    subtitle: `${deal.from} to ${deal.to}`,
    details: `${deal.airline} · ${deal.duration}`,
    price: deal.price,
  }));

  const busItems: TravelDealItem[] = buses.map((deal) => ({
    id: deal.id,
    href: toSearchString({ type: "bus", origin: deal.from, to: deal.to }),
    image: deal.image,
    imageAlt: `${deal.operator} coach from ${deal.from} to ${deal.to}`,
    eyebrow: "Popular route",
    title: `${deal.from} → ${deal.to}`,
    subtitle: deal.operator,
    details: `${deal.duration} · Departs ${deal.departs}`,
    price: deal.price,
  }));

  const stayItems: TravelDealItem[] = stays.map((deal) => ({
    id: deal.id,
    href: `/accommodation/${deal.id}`,
    image: deal.image,
    imageAlt: `${deal.name} in ${deal.area}, ${deal.city}`,
    eyebrow: `${deal.rating.toFixed(1)} ★ · ${deal.type}`,
    title: deal.name,
    subtitle: `${deal.area}, ${deal.city}`,
    details: `${deal.reviewCount.toLocaleString()} guest reviews`,
    price: deal.pricePerNight,
    priceSuffix: "/ night",
  }));

  return (
    <div className="space-y-14 py-12">
      <TravelFeatureSection
        title="Flight deals"
        subtitle="Bright ideas for your next getaway."
        href="/flights"
        label="Take off for less"
        items={flightItems}
        verticalSideDeals
      />
      <TravelFeatureSection
        title="Bus deals"
        href="/bus"
        label="The journey starts here"
        items={busItems}
        reverse
        verticalSideDeals
      />
      <TravelFeatureSection
        title="Stay deals"
        href="/accommodation"
        label="Find your happy place"
        items={stayItems}
        verticalSideDeals
      />
    </div>
  );
}

function TravelFeatureSection({
  title,
  subtitle,
  href,
  label,
  items,
  reverse = false,
  verticalSideDeals = false,
}: {
  title: string;
  subtitle?: string;
  href: string;
  label: string;
  items: TravelDealItem[];
  reverse?: boolean;
  verticalSideDeals?: boolean;
}) {
  const [featured, ...sideDeals] = items;

  return (
    <section className="container-page" aria-label={title}>
      <SectionHeader title={title} subtitle={subtitle} href={href} action="View all" />
      {!featured ? (
        <p className="rounded-2xl bg-canvas p-6 text-sm text-ink-muted">No deals are available right now.</p>
      ) : (
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <Link
            href={featured.href}
            className={`group relative isolate flex min-h-[25rem] overflow-hidden rounded-[1.75rem] bg-brand shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:min-h-[30rem] ${reverse ? "lg:order-2" : "lg:order-1"}`}
          >
            <Image
              src={featured.image}
              alt={featured.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="-z-20 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-slate-950/5" />
            <div className="flex w-full flex-col items-start justify-between p-6 sm:p-8">
              <span className="inline-flex items-center gap-1.5 rounded-pill border border-white/30 bg-white/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                <Flame className="h-3.5 w-3.5" aria-hidden="true" />
                {label}
              </span>
              <div className="max-w-xl text-white">
                <p className="text-sm font-semibold text-white/85">{featured.subtitle}</p>
                <h3 className="mt-2 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">{featured.title}</h3>
                <p className="mt-2 text-sm text-white/80">{featured.details}</p>
                <p className="mt-3 text-lg font-bold">From {formatRand(featured.price)}{featured.priceSuffix ? ` ${featured.priceSuffix}` : ""}</p>
                <span className="mt-5 inline-flex h-11 items-center gap-2 rounded-pill border border-white/60 bg-white/15 px-5 text-sm font-bold text-white backdrop-blur-sm transition group-hover:bg-white group-hover:text-ink">
                  Explore {title.toLowerCase()} <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </div>
          </Link>

          <div className={reverse ? "lg:order-1" : "lg:order-2"}>
            <TravelDealSideList items={sideDeals.slice(0, 3)} vertical={verticalSideDeals} />
          </div>
        </div>
      )}
    </section>
  );
}

function TravelDealSideList({ items, vertical }: { items: TravelDealItem[]; vertical: boolean }) {
  if (!vertical) {
    return (
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        {items.map((deal) => <TravelDealSideCard key={deal.id} deal={deal} />)}
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 lg:hidden">
        {items.map((deal) => <TravelDealSideCard key={`${deal.id}-mobile`} deal={deal} />)}
      </div>
      <div className="hidden h-[28.5rem] overflow-hidden lg:block">
        <div className="flex flex-col gap-3 [animation:travel-deals-vertical_34s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:[animation:none]">
          {[...items, ...items].map((deal, index) => (
            <TravelDealSideCard key={`${deal.id}-${index}`} deal={deal} fixedHeight />
          ))}
        </div>
      </div>
    </>
  );
}

function TravelDealSideCard({ deal, fixedHeight = false }: { deal: TravelDealItem; fixedHeight?: boolean }) {
  return (
    <Link
      href={deal.href}
      className={`group flex ${fixedHeight ? "h-36" : "min-h-[8.8rem]"} items-center gap-4 rounded-2xl border border-neutral-100 bg-white p-3 shadow-[0_6px_20px_rgba(17,24,39,0.06)] transition duration-200 hover:-translate-y-0.5 hover:border-fuchsia-100 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:p-4`}
    >
      <span className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-28">
        <Image
          src={deal.image}
          alt={deal.imageAlt}
          fill
          sizes="112px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[10px] font-bold uppercase tracking-[0.12em] text-fuchsia-800">{deal.eyebrow}</span>
        <span className="mt-1 block truncate text-base font-bold text-ink sm:text-lg">{deal.title}</span>
        <span className="mt-0.5 block truncate text-xs text-ink-muted sm:text-sm">{deal.subtitle}</span>
        <span className="mt-1 block truncate text-[11px] text-ink-muted">{deal.details}</span>
        <span className="mt-1 block text-sm font-bold text-ink">From {formatRand(deal.price)}{deal.priceSuffix ? ` ${deal.priceSuffix}` : ""}</span>
      </span>
      <ChevronRight className="h-5 w-5 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-fuchsia-700" aria-hidden="true" />
    </Link>
  );
}
