import type { Metadata } from "next";
import Link from "next/link";
import { DealCard } from "@/components/ui/DealCard";
import { EventCard } from "@/components/ui/EventCard";
import { PageHero } from "@/components/layout/PageHero";
import { FilterFields, SearchControls } from "@/components/search/SearchControls";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/Skeletons";
import { searchBuses, searchEvents, searchFlights, searchStays, searchVouchers } from "@/lib/api";
import { formatRand, parseSearchQuery, toSearchString } from "@/lib/utils";
import type { SearchQuery } from "@/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Search",
  description: "Search TicketHub for events, flights, buses, stays and vouchers.",
  alternates: { canonical: "/search" },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const query = parseSearchQuery(searchParams);
  const results = await loadResults(query);
  const heading = headingFor(query);

  return (
    <>
      <PageHero
        title={heading}
        description="Filter by city, date and price, then sort the list."
        current="Search"
        backgroundImage={query.type === "events" ? "/live-the-moment.png" : undefined}
      />
      <div className="container-page grid gap-8 py-8 lg:grid-cols-[16rem_1fr]">
        <aside className="hidden lg:block" aria-label="Filters">
          <div className="sticky top-24 rounded-card bg-white p-4 shadow-card">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-ink-muted">Filters</h2>
            <FilterFields
              key={`${query.type}-${query.category}-${query.city}-${query.date}-${query.minPrice}-${query.maxPrice}`}
              query={query}
            />
          </div>
        </aside>
        <div>
          <SearchControls query={query} total={results.total} />
          {results.total === 0 ? (
            <EmptyState
              title="No matches"
              message="Nothing fits those filters. Clear a city or widen the price range."
              action={
                <Button asChild>
                  <Link href={`/search?type=${query.type}`}>Clear filters</Link>
                </Button>
              }
            />
          ) : (
            <ResultGrid query={query} results={results} />
          )}
          <Pagination query={query} page={results.page} pages={results.pages} />
        </div>
      </div>
    </>
  );
}

async function loadResults(query: SearchQuery) {
  if (query.type === "flights") return searchFlights(query);
  if (query.type === "bus") return searchBuses(query);
  if (query.type === "accommodation") return searchStays(query);
  if (query.type === "vouchers") return searchVouchers(query);
  return searchEvents(query);
}

function headingFor(query: SearchQuery) {
  if (query.q) return `Results for “${query.q}”`;
  if (query.type === "flights") return "Flights";
  if (query.type === "bus") return "Buses";
  if (query.type === "accommodation") return "Stay";
  if (query.type === "vouchers") return "Vouchers";
  if (query.category) return query.category;
  return "Events";
}

function ResultGrid({
  query,
  results,
}: {
  query: SearchQuery;
  results: Awaited<ReturnType<typeof loadResults>>;
}) {
  if (query.type === "events") {
    const data = results as Awaited<ReturnType<typeof searchEvents>>;
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {data.items.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    );
  }
  if (query.type === "flights") {
    const data = results as Awaited<ReturnType<typeof searchFlights>>;
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {data.items.map((deal) => (
          <DealCard
            key={deal.id}
            href={toSearchString({ type: "flights", origin: deal.from, to: deal.to })}
            image={deal.image}
            imageAlt={`${deal.airline} from ${deal.from} to ${deal.to}`}
            title={`${deal.from} to ${deal.to}`}
            subtitle={deal.airline}
            meta={`${deal.duration} · ${deal.stops}`}
            price={deal.price}
          />
        ))}
      </div>
    );
  }
  if (query.type === "bus") {
    const data = results as Awaited<ReturnType<typeof searchBuses>>;
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {data.items.map((deal) => (
          <DealCard
            key={deal.id}
            href={toSearchString({ type: "bus", origin: deal.from, to: deal.to })}
            image={deal.image}
            imageAlt={`${deal.operator} from ${deal.from} to ${deal.to}`}
            title={`${deal.from} to ${deal.to}`}
            subtitle={deal.operator}
            meta={`Departs ${deal.departs} · ${deal.duration}`}
            price={deal.price}
          />
        ))}
      </div>
    );
  }
  if (query.type === "accommodation") {
    const data = results as Awaited<ReturnType<typeof searchStays>>;
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {data.items.map((deal) => (
          <DealCard
            key={deal.id}
            href={`/accommodation/${deal.id}`}
            image={deal.image}
            imageAlt={`${deal.name} in ${deal.city}`}
            title={deal.name}
            subtitle={`${deal.area}, ${deal.city}`}
            meta={deal.type}
            price={deal.pricePerNight}
            priceSuffix="/ night"
            rating={deal.rating}
            reviewCount={deal.reviewCount}
          />
        ))}
      </div>
    );
  }
  const data = results as Awaited<ReturnType<typeof searchVouchers>>;
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {data.items.map((voucher) => (
        <DealCard
          key={voucher.id}
          href={`/vouchers#${voucher.id}`}
          image={voucher.image}
          imageAlt={`${voucher.brand} voucher`}
          title={voucher.brand}
          subtitle={voucher.description}
          meta={`${formatRand(voucher.minAmount)} – ${formatRand(voucher.maxAmount)}`}
          price={voucher.minAmount}
          pricePrefix="From"
        />
      ))}
    </div>
  );
}

function Pagination({ query, page, pages }: { query: SearchQuery; page: number; pages: number }) {
  if (pages <= 1) return null;
  return (
    <nav aria-label="Pagination" className="mt-8 flex flex-wrap justify-center gap-2">
      {Array.from({ length: pages }, (_, index) => {
        const number = index + 1;
        const current = number === page;
        return (
          <Link
            key={number}
            href={toSearchString({ ...query, page: number })}
            aria-current={current ? "page" : undefined}
            className={`flex h-10 min-w-10 items-center justify-center rounded-pill px-3 text-sm font-semibold ${current ? "bg-accent text-white" : "bg-white text-ink shadow-card"}`}
          >
            {number}
          </Link>
        );
      })}
    </nav>
  );
}
