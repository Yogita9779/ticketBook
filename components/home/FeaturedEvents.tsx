import { EventCard } from "@/components/ui/EventCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getFeaturedEvents } from "@/lib/api";

export default async function FeaturedEvents() {
  const events = (await getFeaturedEvents()).slice(0, 8);

  return (
    <section className="container-page py-6 sm:py-10" aria-labelledby="featured-heading">
      <div id="featured-heading">
        <SectionHeader title="Featured Events" href="/search?type=events" action="View all" />
      </div>
      {events.length === 0 ? (
        <p className="text-sm text-ink-muted">No featured events are on sale right now.</p>
      ) : (
        <div className="overflow-hidden" role="region" aria-label="Featured events">
          <div className="flex w-max [animation:featured-events-horizontal_38s_linear_infinite] hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:[animation:none]">
            {[0, 1].map((group) => (
              <div
                key={group}
                className="flex shrink-0 gap-4 pr-4"
                aria-hidden={group === 1 ? true : undefined}
              >
                {events.map((event) => (
                  <div key={`${event.id}-${group}`} className="w-[17.5rem] shrink-0 sm:w-[19rem]">
                    <EventCard event={event} inactive={group === 1} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
