import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Legal Terms",
  description: "TicketHub terms of use, privacy notes and refund rules for this prototype.",
  alternates: { canonical: "/legal" },
};

const sections = [
  {
    title: "Terms of use",
    body: "TicketHub is a demonstration storefront. Listings, prices and availability are mock data generated for the prototype. By browsing you agree that orders placed here are simulated and do not create a contract with a venue, airline or hotel.",
  },
  {
    title: "Tickets",
    body: "An e-ticket in this prototype is a confirmation shown on screen after checkout. It is not valid for entry at a real venue. Organisers in the mock catalogue set their own tier names: General, VIP and Premium. A service fee of 8% is added at checkout and shown before you pay.",
  },
  {
    title: "Travel",
    body: "Flight, bus and stay results are sample fares. They do not reserve a seat or a room. Baggage, changes and hotel cancellation rules would come from the provider in a production integration.",
  },
  {
    title: "Privacy",
    body: "Forms keep what you type in the browser only long enough to validate it. The cart and wishlist are stored in localStorage on your device. This prototype does not send personal information to a server. Do not enter a real card number.",
  },
  {
    title: "Refunds",
    body: "Because no payment is captured, there is nothing to refund. The FAQ describes how a live TicketHub service would handle cancellations, postponements and name changes so the interface can be reviewed end to end.",
  },
];

export default function LegalPage() {
  return (
    <>
      <PageHero title="Legal Terms" description="How this prototype treats bookings, privacy and refunds." current="Legal Terms" />
      <div className="container-page max-w-3xl space-y-8 py-10">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-xl font-semibold text-ink">{section.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted sm:text-base">{section.body}</p>
          </section>
        ))}
      </div>
    </>
  );
}
