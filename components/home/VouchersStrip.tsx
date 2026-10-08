import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getVouchers } from "@/lib/api";
import { formatRand } from "@/lib/utils";

export default async function VouchersStrip() {
  const items = (await getVouchers()).slice(0, 8);

  return (
    <section className="bg-canvas py-20 sm:py-28" aria-labelledby="vouchers-heading">
      <div className="container-page">
        <div id="vouchers-heading">
          <SectionHeader title="Digital vouchers" href="/vouchers" action="View all" />
        </div>
        {items.length === 0 ? (
          <p className="text-sm text-ink-muted">Vouchers are being restocked.</p>
        ) : (
          <div className="overflow-hidden" role="region" aria-label="Digital voucher offers">
            <div className="flex w-max [animation:digital-vouchers-horizontal_34s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:[animation:none]">
              {[0, 1].map((group) => (
                <div key={group} className="flex shrink-0 gap-4 pr-4" aria-hidden={group === 1 ? true : undefined}>
                  {items.map((voucher) => (
                    <article key={`${voucher.id}-${group}`} className="w-72 shrink-0 overflow-hidden rounded-card bg-white shadow-card">
                      <Link href={`/vouchers/${voucher.id}`} tabIndex={group === 1 ? -1 : undefined} aria-label={`View ${voucher.brand} voucher details`} className="relative block aspect-[4/3]">
                        <Image src={voucher.image} alt={group === 1 ? "" : `${voucher.brand} gift voucher`} fill sizes="288px" className="object-cover" />
                      </Link>
                      <div className="p-4">
                        <h3 className="font-semibold text-ink"><Link href={`/vouchers/${voucher.id}`} tabIndex={group === 1 ? -1 : undefined} className="hover:text-accent">{voucher.brand}</Link></h3>
                        <p className="mt-1 text-sm text-ink-muted">
                          {formatRand(voucher.minAmount)} – {formatRand(voucher.maxAmount)}
                        </p>
                        <Link
                          href={`/search?type=vouchers&brand=${encodeURIComponent(voucher.brand)}`}
                          tabIndex={group === 1 ? -1 : undefined}
                          className="mt-3 inline-flex text-sm font-semibold text-accent hover:text-accent-hover"
                        >
                          Buy now
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
