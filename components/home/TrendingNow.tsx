import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getTrendingEvents } from "@/lib/api";
import { formatLongDate, formatRand } from "@/lib/utils";

export default async function TrendingNow() {
  const events = await getTrendingEvents();

  return (
    <section className="container-page py-12" aria-labelledby="trending-heading">
      <div id="trending-heading">
        <SectionHeader title="Trending Now" href="/search?type=events&sort=relevance" />
      </div>
      {events.length === 0 ? (
        <p className="text-sm text-ink-muted">Nothing is trending yet. Check back after the next on-sale.</p>
      ) : (
        <ol className="grid gap-3 lg:grid-cols-2">
          {events.map((event) => (
            <li key={event.id}>
              <Link
                href={`/events/${event.slug}`}
                className="flex items-center gap-4 rounded-card bg-white p-3 shadow-card transition-shadow hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span className="w-8 text-center text-2xl font-bold text-accent" aria-hidden="true">
                  {event.trendingRank}
                </span>
                <span className="relative h-16 w-24 shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={event.image}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold text-ink">{event.title}</span>
                  <span className="block truncate text-sm text-ink-muted">{event.venue}</span>
                  <span className="block text-sm text-ink-muted">{formatLongDate(event.date)}</span>
                </span>
                <span className="hidden text-right text-sm font-bold text-ink sm:block">
                  From {formatRand(event.priceFrom)}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
