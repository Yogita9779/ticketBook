import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHero } from "@/components/layout/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact TicketHub about bookings, refunds and store visits.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero title="Contact Us" description="Send a note and we will reply by email." current="Contact Us" />
      <div className="container-page grid gap-8 py-10 lg:grid-cols-[1.2fr_0.8fr]">
        <ContactForm />
        <aside className="h-fit rounded-card bg-canvas p-6">
          <h2 className="text-lg font-semibold">Talk to us</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="font-medium text-ink-muted">Phone</dt>
              <dd>
                <a href={site.phoneHref} className="font-semibold text-ink">
                  {site.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-medium text-ink-muted">Email</dt>
              <dd>
                <a href={`mailto:${site.email}`} className="font-semibold text-ink">
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-medium text-ink-muted">Office</dt>
              <dd>{site.address}</dd>
            </div>
          </dl>
          <a href={site.mapUrl} className="mt-4 inline-flex text-sm font-semibold text-accent hover:text-accent-hover">
            View on map
          </a>
        </aside>
      </div>
    </>
  );
}
