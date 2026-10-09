import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { StoreFinder } from "@/components/stores/StoreFinder";
import { EventGridSkeleton } from "@/components/ui/Skeletons";
import { getStores } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Find a Store",
  description: "Find a Bookora store for ticket collection and in-person bookings.",
  alternates: { canonical: "/find-a-store" },
};

export default function FindAStorePage() {
  return (
    <>
      <PageHero
        title="Find a Store"
        description="Twelve branches for collection, changes and walk-in bookings."
        current="Find a Store"
      />
      <div className="container-page py-10">
        <Suspense fallback={<EventGridSkeleton count={4} />}>
          <StoreResults />
        </Suspense>
      </div>
    </>
  );
}

async function StoreResults() {
  const stores = await getStores();
  return <StoreFinder stores={stores} />;
}
