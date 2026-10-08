import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";
import { PageHero } from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review tickets, service fees and mock checkout.",
  alternates: { canonical: "/cart" },
};

export default function CartPage() {
  return (
    <>
      <PageHero title="Cart" description="Update quantities, then check out with a mock card payment." current="Cart" />
      <div className="container-page py-10">
        <CartView />
      </div>
    </>
  );
}
