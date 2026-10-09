import type { Metadata } from "next";
import { EventDetailView, EventMissing } from "@/components/dashboard/EventDetailView";
import { getEventBySlug } from "@/lib/api";

export const metadata: Metadata = {
  title: "Event",
  description: "Event details and ticket booking.",
};

export default async function DashboardEventPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { book?: string };
}) {
  const event = await getEventBySlug(params.slug);
  if (!event) return <EventMissing />;
  return <EventDetailView event={event} startBooking={searchParams.book === "1"} />;
}
