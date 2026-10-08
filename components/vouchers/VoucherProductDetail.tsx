"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, ChevronDown, Gift, ShieldCheck, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { Voucher } from "@/types";
import { formatRand } from "@/lib/utils";

export function VoucherProductDetail({ voucher }: { voucher: Voucher }) {
  const router = useRouter();
  const [amountValue, setAmountValue] = useState(String(voucher.minAmount));
  const amount = Number(amountValue);
  const validAmount = Number.isInteger(amount) && amount >= voucher.minAmount && amount <= voucher.maxAmount;
  const quickAmounts = useMemo(() => {
    const choices = [voucher.minAmount, Math.max(voucher.minAmount, 50), Math.max(voucher.minAmount, 100), Math.max(voucher.minAmount, 250)]
      .filter((value) => value <= voucher.maxAmount);
    return [...new Set(choices)].slice(0, 3);
  }, [voucher.maxAmount, voucher.minAmount]);

  return (
    <main className="min-h-screen bg-[#f6f7f9] pb-16">
      <div className="container-page py-6 sm:py-9">
        <Link href="/vouchers" className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-rose-700"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> All vouchers</Link>
        <div className="grid items-start gap-5 lg:grid-cols-[1.45fr_0.9fr]">
          <article className="overflow-hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-6">
            <div className="relative aspect-[16/7] overflow-hidden rounded-xl bg-slate-100 sm:aspect-[16/6]">
              <Image src={voucher.image} alt={`${voucher.brand} voucher`} fill priority sizes="(max-width: 1024px) 100vw, 65vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-rose-700">{voucher.category}</span>
            </div>
            <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">{voucher.brand}</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">{voucher.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800"><Zap className="h-4 w-4" />Instant delivery</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700"><ShieldCheck className="h-4 w-4" />Secure payment</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-800"><Gift className="h-4 w-4" />Ready to gift</span>
            </div>
            <div className="mt-7 grid gap-3 border-t border-slate-100 pt-5 sm:grid-cols-3">
              <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Choose a value</p><p className="mt-1 font-bold text-slate-800">{formatRand(voucher.minAmount)} – {formatRand(voucher.maxAmount)}</p></div>
              <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Delivery</p><p className="mt-1 font-bold text-slate-800">Digital voucher</p></div>
              <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Category</p><p className="mt-1 font-bold text-slate-800">{voucher.category}</p></div>
            </div>
            <div className="mt-6 space-y-3">
              <details className="group rounded-xl border border-slate-200 p-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold text-slate-800">How it works<ChevronDown className="h-4 w-4 text-slate-400 transition group-open:rotate-180" /></summary>
                <ol className="mt-3 space-y-2 text-sm leading-6 text-slate-600"><li>1. Choose the voucher value.</li><li>2. Continue to see the available voucher offer.</li><li>3. Follow the checkout instructions to complete your order.</li></ol>
              </details>
              <details className="group rounded-xl border border-slate-200 p-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold text-slate-800">Gift to someone<ChevronDown className="h-4 w-4 text-slate-400 transition group-open:rotate-180" /></summary>
                <p className="mt-3 text-sm leading-6 text-slate-600">This digital voucher makes an easy gift. Check the voucher terms and delivery details before completing your order.</p>
              </details>
            </div>
          </article>

          <aside className="space-y-4 lg:sticky lg:top-24">
            <details className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-sm" open>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold text-slate-800">How it works<span className="inline-flex items-center gap-2 text-xs font-medium text-slate-500">Show steps<ChevronDown className="h-4 w-4 text-rose-600 transition group-open:rotate-180" /></span></summary>
              <div className="mt-4 grid gap-3 border-t border-slate-100 pt-4 text-sm text-slate-600">
                <p className="flex items-start gap-2"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-50 text-xs font-bold text-rose-700">1</span>Pick an amount within the available range.</p>
                <p className="flex items-start gap-2"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-50 text-xs font-bold text-rose-700">2</span>Continue to view this brand's voucher offer.</p>
                <p className="flex items-start gap-2"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-50 text-xs font-bold text-rose-700">3</span>Complete your order using the checkout options.</p>
              </div>
            </details>

            <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="voucher-select-heading">
              <div className="mb-4 flex items-center justify-between gap-3"><h2 id="voucher-select-heading" className="text-lg font-bold text-slate-900">Select amount</h2><span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700"><Check className="h-4 w-4" />Available</span></div>
              <div className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-center justify-between gap-3"><div><p className="font-semibold text-slate-900">{voucher.brand} digital voucher</p><p className="mt-1 text-xs text-slate-500">Choose your voucher value</p></div><span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">{formatRand(voucher.minAmount)}–{formatRand(voucher.maxAmount)}</span></div>
                <label htmlFor="voucher-amount" className="mt-5 block text-sm font-semibold text-slate-700">Enter amount</label>
                <div className="mt-2 flex h-14 items-center rounded-xl bg-slate-100 px-4 focus-within:ring-2 focus-within:ring-rose-300"><span className="text-lg font-bold text-rose-600">R</span><input id="voucher-amount" type="number" inputMode="numeric" min={voucher.minAmount} max={voucher.maxAmount} step="1" value={amountValue} onChange={(event) => setAmountValue(event.target.value)} className="h-full min-w-0 flex-1 bg-transparent px-3 text-center text-base font-semibold text-slate-800 outline-none" aria-describedby="voucher-range" /></div>
                <p id="voucher-range" className="mt-2 text-xs text-slate-500">Choose from {formatRand(voucher.minAmount)} to {formatRand(voucher.maxAmount)}.</p>
                <div className="mt-4"><p className="mb-2 text-xs font-semibold text-slate-500">Quick select</p><div className="grid grid-cols-3 gap-2">{quickAmounts.map((choice) => <button key={choice} type="button" onClick={() => setAmountValue(String(choice))} className={`rounded-lg border px-2 py-2 text-sm font-semibold transition ${amount === choice ? "border-rose-500 bg-rose-50 text-rose-700" : "border-slate-200 text-slate-700 hover:border-rose-300"}`}>{formatRand(choice)}</button>)}</div></div>
                <Button type="button" disabled={!validAmount} className="mt-5 h-12 w-full bg-rose-600 text-base font-semibold hover:bg-rose-700 disabled:bg-rose-300" onClick={() => router.push(`/search?type=vouchers&brand=${encodeURIComponent(voucher.brand)}&amount=${amount}`)}>Continue with {formatRand(validAmount ? amount : voucher.minAmount)}</Button>
              </div>
              <p className="mt-4 text-center text-xs leading-5 text-slate-500">You can review the voucher offer before completing your order.</p>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
