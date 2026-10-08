"use client";

import Image from "next/image";
import Link from "next/link";
import { UserRound } from "lucide-react";
import { usePathname } from "next/navigation";

const headerLinks = [
  { label: "Home", href: "/" },
  { label: "Buses", href: "/bus" },
  { label: "Flight", href: "/flights" },
  { label: "Voucher", href: "/vouchers" },
  { label: "Stay", href: "/accommodation" },
  { label: "Event", href: "/events" },
];

export function Header() {
  const pathname = usePathname();
  const dashboardOnly = pathname === "/dashboard";

  return (
    <header
      className="sticky top-0 z-40 border-b border-slate-200 bg-white text-ink shadow-elevated"
    >
      <div className="container-page relative flex min-h-16 flex-wrap items-center justify-between sm:h-20 sm:flex-nowrap">
        <Link href="/" className="relative isolate overflow-hidden rounded-xl text-lg font-bold tracking-tight text-white sm:absolute sm:left-0 sm:top-1/2 sm:-translate-y-1/2 sm:text-xl" aria-label="TicketHub home">
          <Image
            src="/tickethub-logo.png"
            alt="TicketHub"
            width={210}
            height={88}
            priority
            className="h-14 w-[260px] scale-125 object-contain object-center mix-blend-screen sm:h-16 sm:w-[300px]"
          />
        </Link>
        {!dashboardOnly ? <>
          <nav aria-label="Main navigation" className="order-3 -mx-4 flex w-full items-center justify-center gap-1 overflow-x-auto py-2 sm:order-none sm:mx-auto sm:w-auto sm:gap-2 sm:py-0">
            {headerLinks.map(({ label, href }) => {
              const active = pathname === href;
              return <Link key={href} href={href} aria-current={active ? "page" : undefined} className={`inline-flex h-10 shrink-0 items-center rounded-pill px-3 text-sm font-semibold transition sm:px-5 sm:text-base ${active ? "bg-brand text-white" : "text-ink-muted hover:bg-slate-100 hover:text-ink"}`}>{label}</Link>;
            })}
          </nav>
          <div className="flex items-center sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2">
            <Link href="/login" className="inline-flex h-10 items-center gap-2 rounded-pill bg-brand px-3 text-sm font-semibold text-white hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:px-4">
              <UserRound className="h-4 w-4 lg:hidden" aria-hidden="true" />
              <span className="hidden sm:inline">Sign In / Register</span><span className="sm:hidden">Sign in</span>
            </Link>
          </div>
        </> : null}
      </div>
    </header>
  );
}
