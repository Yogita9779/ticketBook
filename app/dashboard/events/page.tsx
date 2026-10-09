import type { Metadata } from "next";
import { Suspense } from "react";
import { EventBrowser } from "@/components/dashboard/EventBrowser";
import { HomeSkeleton } from "@/components/dashboard/ui";
import { getEvents } from "@/lib/api";

export const metadata: Metadata = {
  title: "Browse events",
  description: "Search concerts, sport, comedy and festivals on Bookora.",
};

export default function DashboardEventsPage() {
  return (
    <Suspense fallback={<HomeSkeleton />}>
      <EventsLoader />
    </Suspense>
  );
}

async function EventsLoader() {
  const events = await getEvents();
  return <EventBrowser events={events} />;
}
