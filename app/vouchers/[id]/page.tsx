import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VoucherProductDetail } from "@/components/vouchers/VoucherProductDetail";
import { getVouchers } from "@/lib/api";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const vouchers = await getVouchers();
  const voucher = vouchers.find((item) => item.id === params.id);
  if (!voucher) return { title: "Voucher not found" };
  return {
    title: `${voucher.brand} Voucher`,
    description: voucher.description,
    alternates: { canonical: `/vouchers/${voucher.id}` },
  };
}

export default async function VoucherDetailPage({ params }: { params: { id: string } }) {
  const vouchers = await getVouchers();
  const voucher = vouchers.find((item) => item.id === params.id);
  if (!voucher) notFound();
  return <VoucherProductDetail voucher={voucher} />;
}
