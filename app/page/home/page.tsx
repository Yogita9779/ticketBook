import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";
import { JsonLd } from "@/components/seo/JsonLd";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  title: "Buy Tickets Online – Events, Travel, Flights & More",
};

export default function HomeAliasPage() {
  return (
    <>
      <JsonLd />
      <HomePage />
    </>
  );
}
