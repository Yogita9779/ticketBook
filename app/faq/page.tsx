import type { Metadata } from "next";
import { Suspense } from "react";
import { FaqList } from "@/components/faq/FaqList";
import { PageHero } from "@/components/layout/PageHero";
import { getFaqs } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Answers about e-tickets, payments, refunds, travel and store collection.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <PageHero title="FAQs" description="Search the questions we hear most often." current="FAQs" />
      <div className="container-page max-w-3xl py-10">
        <Suspense fallback={<div className="h-64 animate-pulse rounded-card bg-neutral-200" aria-label="Loading FAQs" />}>
          <FaqResults />
        </Suspense>
      </div>
    </>
  );
}

async function FaqResults() {
  const faqs = await getFaqs();
  return <FaqList faqs={faqs} />;
}
