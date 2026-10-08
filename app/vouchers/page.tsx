import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, Gift, Sparkles } from "lucide-react";
import { VoucherRowSkeleton } from "@/components/ui/Skeletons";
import { getVouchers } from "@/lib/api";
import { formatRand } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Vouchers",
  description: "Digital gift vouchers for dining, retail, travel and more.",
  alternates: { canonical: "/vouchers" },
};

export default function VouchersPage() {
  return (
    <main className="min-h-screen bg-[#f7f8fa] pb-16">
      <section className="relative overflow-hidden bg-gradient-to-r from-rose-700 via-rose-900 to-slate-950 text-white">
        <div aria-hidden="true" className="absolute -right-10 -top-12 text-white/[0.08]"><Gift className="h-64 w-64" strokeWidth={1.5} /></div>
        <div className="container-page relative py-12 sm:py-16">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-rose-100"><Sparkles className="h-3.5 w-3.5" /> Digital gifting, made easy</p>
          <h1 className="max-w-2xl text-3xl font-extrabold tracking-tight sm:text-5xl">Find a voucher for every kind of happy</h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">Choose from dining, fashion, entertainment, travel and more. Give someone the freedom to pick what they love.</p>
        </div>
      </section>

      <div className="container-page relative -mt-8">
        <section className="rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_16px_40px_rgba(15,23,42,0.12)] sm:p-7" aria-label="Available vouchers">
          <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-2 text-sm text-slate-400">
            <Link href="/" className="transition hover:text-rose-600">Home</Link><span aria-hidden="true">›</span><span className="font-medium text-slate-700">Vouchers</span>
          </nav>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-slate-100 pb-5">
            <div><h2 className="text-xl font-bold text-slate-900 sm:text-2xl">Explore all vouchers</h2><p className="mt-1 text-sm text-slate-500">Find a little something for everyone.</p></div>
            <span className="rounded-full bg-rose-50 px-3 py-1.5 text-sm font-semibold text-rose-700">Gift-ready picks</span>
          </div>
          <Suspense fallback={<VoucherRowSkeleton />}><VoucherGrid /></Suspense>
        </section>
      </div>
    </main>
  );
}

async function VoucherGrid() {
  const items = await getVouchers();
  if (items.length === 0) return <p className="py-12 text-center text-sm text-ink-muted">No vouchers are on sale right now.</p>;
  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((voucher) => (
        <li key={voucher.id} id={voucher.id} className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_4px_16px_rgba(15,23,42,0.07)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(15,23,42,0.12)]">
          <Link href={`/vouchers/${voucher.id}`} aria-label={`Open ${voucher.brand} voucher details`} className="relative block aspect-[16/10] overflow-hidden bg-slate-100">
            <Image src={voucher.image} alt={`${voucher.brand} voucher`} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw" className="object-cover transition duration-500 group-hover:scale-[1.03]" />
            <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-rose-700 shadow-sm">{voucher.category}</span>
          </Link>
          <div className="p-5">
            <h3 className="text-lg font-bold text-slate-900"><Link href={`/vouchers/${voucher.id}`} className="hover:text-rose-700">{voucher.brand}</Link></h3>
            <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">{voucher.description}</p>
            <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
              <div><p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Available value</p><p className="mt-0.5 text-sm font-bold text-slate-900">{formatRand(voucher.minAmount)} – {formatRand(voucher.maxAmount)}</p></div>
          <Link href={`/vouchers/${voucher.id}`} aria-label={`Open ${voucher.brand} voucher details`} className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-600 text-white transition hover:bg-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"><ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
