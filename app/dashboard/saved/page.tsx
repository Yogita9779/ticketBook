import type { Metadata } from "next";
import { Suspense } from "react";
import { SavedView } from "@/components/dashboard/SavedView";
import { HomeSkeleton } from "@/components/dashboard/ui";
import { getEvents } from "@/lib/api";

export const metadata: Metadata = {
  title: "Saved items",
  description: "Events you saved on Bookora.",
};

export default function SavedPage() {
  return (
    <Suspense fallback={<HomeSkeleton />}>
      <SavedLoader />
    </Suspense>
  );
}

async function SavedLoader() {
  const events = await getEvents();
  return <SavedView events={events} />;
}
