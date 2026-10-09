"use client";

import { Facebook, Instagram } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NewsletterForm } from "@/components/home/Newsletter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { site } from "@/lib/site";

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14.7 10.3 22.4 1.5h-1.8l-6.7 7.6L8.4 1.5H1.6l8.1 11.8L1.6 22.5h1.8l7.1-8.1 5.7 8.1h6.8l-8.3-12.2Zm-2.5 2.9-.8-1.2-6.6-9.4h2.8l5.3 7.6.8 1.2 6.9 9.9h-2.8l-5.6-8.1Z"
      />
    </svg>
  );
}

function BrandBlock() {
  return (
    <div>
      <p className="text-xl font-bold">Bookora</p>
      <p className="mt-3 max-w-xs text-sm text-white/75">
        Tickets, flights, buses, stays and vouchers. One checkout for a South African night out or a weekend away.
      </p>
      <ul className="mt-4 flex gap-2">
        {site.socials.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              aria-label={item.label}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {item.label === "Facebook" ? <Facebook className="h-4 w-4" aria-hidden="true" /> : null}
              {item.label === "X" ? <XIcon /> : null}
              {item.label === "Instagram" ? <Instagram className="h-4 w-4" aria-hidden="true" /> : null}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function QuickLinks() {
  const links = [
    { href: "/legal", label: "Legal Terms" },
    { href: "/faq", label: "FAQs" },
    { href: "/contact", label: "Contact Us" },
    { href: "/find-a-store", label: "Find A Store" },
  ];
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-white/80">Quick links</h2>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-white/80 hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactBlock() {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-white/80">Contact Us</h2>
      <ul className="mt-3 space-y-2 text-sm text-white/80">
        <li>
          <a href={site.phoneHref} className="hover:text-white">
            {site.phone}
          </a>
        </li>
        <li>
          <a href={`mailto:${site.email}`} className="hover:text-white">
            {site.email}
          </a>
        </li>
        <li>
          {site.addressLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          <a href={site.mapUrl} className="mt-1 inline-block font-semibold text-white underline-offset-2 hover:underline">
            View on map
          </a>
        </li>
      </ul>
    </div>
  );
}

function NewsBlock() {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-white/80">Newsletter</h2>
      <p className="mt-3 text-sm text-white/75">Offers and new onsales, straight to your inbox.</p>
      <div className="mt-3">
        <NewsletterForm variant="footer" />
      </div>
    </div>
  );
}

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/dashboard")) return null;

  return (
    <footer className="bg-brand text-white">
      <div className="container-page hidden gap-10 py-12 lg:grid lg:grid-cols-4">
        <BrandBlock />
        <QuickLinks />
        <ContactBlock />
        <NewsBlock />
      </div>
      <div className="container-page px-5 pt-6 pb-12 sm:px-6 lg:hidden">
        <Accordion type="single" collapsible>
          <AccordionItem value="brand" className="border-white/15">
            <AccordionTrigger className="text-white">Bookora</AccordionTrigger>
            <AccordionContent>
              <BrandBlock />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="links" className="border-white/15">
            <AccordionTrigger className="text-white">Quick links</AccordionTrigger>
            <AccordionContent>
              <QuickLinks />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="contact" className="border-white/15">
            <AccordionTrigger className="text-white">Contact Us</AccordionTrigger>
            <AccordionContent>
              <ContactBlock />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="news" className="border-white/15">
            <AccordionTrigger className="text-white">Newsletter</AccordionTrigger>
            <AccordionContent>
              <NewsBlock />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="border-t border-white/15">
        <div className="container-page flex flex-col items-start justify-between gap-4 py-4 sm:flex-row sm:items-center">
          <p className="text-xs text-white/75">© Bookora (Pty) Ltd - 2026. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
