import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EventDetail } from "@/components/events/EventDetail";
import { getEventBySlug, getRelatedEvents } from "@/lib/api";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const event = await getEventBySlug(params.slug);
  if (!event) return { title: "Event not found" };
  return {
    title: event.title,
    description: event.description,
    alternates: { canonical: `/events/${event.slug}` },
    openGraph: {
      title: event.title,
      description: event.description,
      images: [{ url: event.image, alt: event.title }],
    },
  };
}

export default async function EventPage({ params }: { params: { slug: string } }) {
  const [event, related] = await Promise.all([getEventBySlug(params.slug), getRelatedEvents(params.slug)]);
  if (!event) notFound();
  return <EventDetail event={event} related={related} />;
}
