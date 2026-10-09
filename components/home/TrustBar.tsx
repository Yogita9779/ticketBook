import { Headphones, ShieldCheck, Ticket, Users } from "lucide-react";

const items = [
  { icon: ShieldCheck, title: "Secure payments", text: "Visa, Mastercard and Instant EFT", tone: "rose" },
  { icon: Ticket, title: "Instant e-tickets", text: "QR codes in your inbox", tone: "violet" },
  { icon: Headphones, title: "24/7 support", text: "Help before and after the show", tone: "sky" },
  { icon: Users, title: "Millions of happy customers", text: "Booked across South Africa", tone: "amber" },
];

export function TrustBar() {
  return (
    <section aria-label="Why Bookora" className="container-page py-8 sm:py-10">
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
        {items.map((item) => (
          <li
            key={item.title}
            className="group flex min-h-[5.5rem] items-center gap-3 rounded-2xl border border-slate-200 bg-[#e7e7ed] p-4 shadow-[0_4px_16px_rgba(15,23,42,0.05)] transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-[#e1e1e8] hover:shadow-[0_12px_26px_rgba(15,23,42,0.09)] sm:gap-4 sm:p-5"
          >
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 sm:h-12 sm:w-12 ${
              item.tone === "rose" ? "bg-rose-50 text-rose-600" :
              item.tone === "violet" ? "bg-violet-50 text-violet-600" :
              item.tone === "sky" ? "bg-sky-50 text-sky-600" :
              "bg-amber-50 text-amber-600"
            }`}>
              <item.icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-bold leading-snug text-ink">{item.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-ink-muted sm:text-sm">{item.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
