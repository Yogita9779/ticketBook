import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame, Heart, MapPin, Music, Sparkles, Trophy, Users } from "lucide-react";
import { EventSearch } from "@/components/events/EventSearch";
import { EventCard } from "@/components/ui/EventCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getEvents } from "@/lib/api";
import { eventScenes } from "@/data/event-scenes";
import { photoUrl } from "@/lib/photo-library";
import { EVENT_CATEGORIES } from "@/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Events",
  description: "Discover live music, sport, comedy, theatre and more across South Africa.",
  alternates: { canonical: "/events" },
};

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <main className="min-h-screen bg-[#f7f8fa] pb-14">
      <section className="relative h-[280px] overflow-hidden bg-slate-950 sm:h-[380px] md:h-[440px] lg:h-[500px]" aria-label="Live the Moment">
        <Image
          src="/live-the-moment.png"
          alt="Live the Moment — discover amazing live experiences happening near you"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </section>

      <div className="container-page relative z-10 -mt-10 sm:-mt-14">
        <section className="mx-auto w-full max-w-6xl rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_14px_35px_rgba(15,23,42,0.12)] sm:p-5" aria-labelledby="find-event-heading">
          <h1 id="find-event-heading" className="text-center text-xl font-bold text-ink sm:text-2xl">
            Find Your Perfect Event
          </h1>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link href="/search?type=events" className="flex min-h-14 items-center justify-between rounded-xl border border-rose-300 px-4 text-sm font-semibold text-rose-600 transition hover:bg-rose-50">
              <span>Browse All Events</span><ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/search?type=events" className="flex min-h-14 items-center justify-between rounded-xl border border-rose-300 px-4 text-sm font-semibold text-rose-600 transition hover:bg-rose-50">
              <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" aria-hidden="true" />Browse by Location</span><ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="my-3 flex items-center gap-3 text-xs font-medium uppercase tracking-wider text-slate-400"><span className="h-px flex-1 bg-slate-100" />Or explore a category<span className="h-px flex-1 bg-slate-100" /></div>
          <nav aria-label="Popular event categories" className="flex flex-wrap justify-center gap-2">
            {EVENT_CATEGORIES.map((category) => (
              <Link key={category} href={`/search?type=events&category=${encodeURIComponent(category)}`} className="rounded-full bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-100">
                {category}
              </Link>
            ))}
          </nav>
          <EventSearch events={events.map(({ title, slug, category, city, venue }) => ({ title, slug, category, city, venue }))} />
        </section>
      </div>

      <div className="mx-auto mt-12 w-full max-w-[1600px] space-y-12 px-4 sm:mt-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-rose-600 sm:text-3xl">Explore Exciting Events &amp; Experiences</h2>
          <p className="mt-2 text-sm text-ink-muted">Find something unforgettable happening near you.</p>
        </div>
        {EVENT_CATEGORIES.map((category) => {
          const categoryEvents = events.filter((event) => event.category === category).slice(0, 3);
          if (categoryEvents.length === 0) return null;

          return (
            <section key={category} aria-label={`${category} events`}>
              <SectionHeader title={category} href={`/search?type=events&category=${encodeURIComponent(category)}`} action={`More ${category}`} />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {categoryEvents.map((event) => <EventCard key={event.id} event={event} large />)}
              </div>
            </section>
          );
        })}

        <section aria-labelledby="scene-heading" className="pt-2">
          <div className="mb-8 text-center">
            <h2 id="scene-heading" className="text-3xl font-extrabold tracking-tight text-rose-600 sm:text-4xl">What&apos;s Your Scene?</h2>
            <p className="mt-2 text-base text-ink-muted">Explore events tailored to every vibe and community.</p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {eventScenes.map((scene, index) => {
              const icons = [Trophy, Users, Flame, Sparkles, Music, Heart];
              const Icon = icons[index];
              return (
                <Link key={scene.slug} href={`/discover?scene=${scene.slug}`} className="group relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-900 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                  <Image src={photoUrl(scene.imageId, 1200, 750)} alt={`${scene.title} events`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <div className="absolute inset-x-5 bottom-5 text-white sm:inset-x-6 sm:bottom-6">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-sm font-semibold text-slate-800"><Icon className="h-4 w-4 text-rose-600" aria-hidden="true" />{scene.title}</span>
                    <p className="mt-3 flex items-center gap-2 text-sm font-medium"><ArrowRight className="h-4 w-4 text-rose-400" aria-hidden="true" />{scene.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
