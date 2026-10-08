import Link from "next/link";
import { BedDouble, BusFront, Gift, Plane, ShieldCheck, Store, Ticket, Zap } from "lucide-react";

const destinations = [
  { label: "Events", href: "/events", icon: Ticket },
  { label: "Flights", href: "/flights", icon: Plane },
  { label: "Buses", href: "/bus", icon: BusFront },
  { label: "Stay", href: "/accommodation", icon: BedDouble },
  { label: "Airtime & Vouchers", href: "/vouchers", icon: Gift },
];

export function SearchBar() {
  return (
    <section aria-labelledby="what-next-heading" className="container-page">
      <div className="rounded-[2rem] border border-slate-100 bg-white p-4 shadow-[0_18px_55px_rgba(35,25,45,0.12)] sm:p-6 lg:p-8">
        <h2 id="what-next-heading" className="mb-5 text-center text-lg font-bold text-ink sm:text-xl">
          What would you like to do?
        </h2>
        <nav aria-label="Explore TicketHub" className="grid grid-cols-2 gap-2 rounded-[1.5rem] bg-stone-100 p-2 sm:grid-cols-5 sm:gap-3">
          {destinations.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className="flex min-h-14 items-center justify-center gap-2 rounded-pill bg-white px-3 py-3 text-sm font-semibold text-ink shadow-sm transition hover:-translate-y-0.5 hover:bg-fuchsia-50 hover:text-fuchsia-800 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Icon className="h-4 w-4 shrink-0 text-fuchsia-800" aria-hidden="true" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-neutral-100 pt-4 text-xs font-medium text-ink-muted sm:text-sm">
          <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4" aria-hidden="true" />Easy, secure booking</span>
          <span className="inline-flex items-center gap-2"><Zap className="h-4 w-4" aria-hidden="true" />Instant e-ticket delivery</span>
          <span className="inline-flex items-center gap-2"><Store className="h-4 w-4" aria-hidden="true" />Find a store near you</span>
        </div>
      </div>
    </section>
  );
}
