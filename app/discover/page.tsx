import type { Metadata } from "next";
import Link from "next/link";
import { EventCard } from "@/components/ui/EventCard";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { eventScenes } from "@/data/event-scenes";
import { getEvents } from "@/lib/api";
import { photoUrl } from "@/lib/photo-library";

export const metadata: Metadata = {
  title: "Discover Events",
  description: "Discover live events and experiences picked for your scene.",
};

export default async function DiscoverPage({
  searchParams,
}: {
  searchParams: { scene?: string };
}) {
  const scene = eventScenes.find((item) => item.slug === searchParams.scene);
  const allEvents = await getEvents();
  const events = scene ? allEvents.filter((event) => event.category === scene.category) : allEvents;

  return (
    <>
      <PageHero
        title={scene ? `Discover ${scene.title}` : "Discover Events"}
        description={scene?.description ?? "Find your next unforgettable live experience."}
        current="Discover"
        backgroundImage={scene ? photoUrl(scene.imageId, 1800, 700) : undefined}
      />
      <main className="container-page space-y-10 py-10">
        <section>
          <SectionHeader title={scene ? `${scene.category} events` : "All events"} subtitle={`${events.length} experiences to explore`} href="/events" action="All scenes" />
          {events.length ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => <EventCard key={event.id} event={event} large />)}
            </div>
          ) : (
            <p className="rounded-2xl bg-white p-8 text-center text-ink-muted shadow-card">No events found in this scene right now.</p>
          )}
        </section>
        <nav aria-label="Discover another scene" className="flex flex-wrap gap-2">
          {eventScenes.filter((item) => item.slug !== scene?.slug).map((item) => (
            <Link key={item.slug} href={`/discover?scene=${item.slug}`} className="rounded-full bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100">{item.title}</Link>
          ))}
        </nav>
      </main>
    </>
  );
}
