"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EmptyState } from "@/components/ui/Skeletons";
import { FieldError } from "@/components/ui/FieldError";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/lib/cart-store";
import { useAccount } from "@/lib/account-store";
import { checkoutSchema, type CheckoutValues } from "@/lib/schemas";
import { formatLongDate, formatRand, orderTotals } from "@/lib/utils";
import type { EventItem } from "@/types";

export function CartView() {
  const items = useCart((state) => state.items);
  const updateQuantity = useCart((state) => state.updateQuantity);
  const removeItem = useCart((state) => state.removeItem);
  const clear = useCart((state) => state.clear);
  const addBooking = useAccount((state) => state.addBooking);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [orderRef, setOrderRef] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [paidTotal, setPaidTotal] = useState(0);

  useEffect(() => {
    const finish = () => setReady(true);
    if (useCart.persist.hasHydrated()) finish();
    const unsub = useCart.persist.onFinishHydration(finish);
    return () => {
      unsub();
    };
  }, []);

  if (!ready) {
    return <div className="h-64 animate-pulse rounded-card bg-neutral-200" aria-label="Loading cart" />;
  }

  if (items.length === 0 && !orderRef) {
    return (
      <EmptyState
        title="Your cart is empty"
        message="Browse events and add tickets. They will stay on this device."
        action={
          <Button asChild>
            <Link href="/search?type=events">Browse events</Link>
          </Button>
        }
      />
    );
  }

  const totals = orderTotals(items);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.lineId} className="flex gap-4 rounded-card bg-white p-4 shadow-card">
            <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-md">
              <Image src={item.image} alt="" fill sizes="128px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-semibold text-ink">
                <Link href={`/events/${item.slug}`} className="hover:text-accent">
                  {item.title}
                </Link>
              </h2>
              <p className="text-sm text-ink-muted">
                {item.tierName} · {item.venue}, {item.city}
              </p>
              <p className="text-sm text-ink-muted">{formatLongDate(item.date)}</p>
              <div className="mt-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label={`Decrease quantity for ${item.title}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300"
                    onClick={() => updateQuantity(item.lineId, item.quantity - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                  <button
                    type="button"
                    aria-label={`Increase quantity for ${item.title}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300"
                    onClick={() => updateQuantity(item.lineId, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label={`Remove ${item.title}`}
                    className="ml-2 text-ink-muted hover:text-accent"
                    onClick={() => removeItem(item.lineId)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <p className="font-bold">{formatRand(item.unitPrice * item.quantity)}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <aside className="h-fit rounded-card bg-white p-6 shadow-card">
        <h2 className="text-lg font-semibold">Order summary</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-ink-muted">Subtotal</dt>
            <dd>{formatRand(totals.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-muted">Service fee (8%)</dt>
            <dd>{formatRand(totals.fee)}</dd>
          </div>
          <div className="flex justify-between border-t border-neutral-200 pt-2 text-base font-bold">
            <dt>Total</dt>
            <dd>{formatRand(totals.total)}</dd>
          </div>
        </dl>
        <Button type="button" className="mt-5 w-full" onClick={() => setOpen(true)} disabled={items.length === 0}>
          Checkout
        </Button>
      </aside>
      <CheckoutDialog
        open={open}
        total={orderRef ? paidTotal : totals.total}
        orderRef={orderRef}
        bookingEmail={bookingEmail}
        onOpenChange={setOpen}
        onSuccess={(reference, attendee) => {
          let firstBookingId = "";
          items.forEach((item) => {
            const event: Pick<EventItem, "id" | "slug" | "title" | "image" | "venue" | "city" | "date" | "category" | "priceFrom"> = {
              id: item.eventId,
              slug: item.slug,
              title: item.title,
              image: item.image,
              venue: item.venue,
              city: item.city,
              date: item.date,
              category: item.category ?? "Concerts",
              priceFrom: item.unitPrice,
            };
            const booking = addBooking({
              event,
              tierName: item.tierName,
              unitPrice: item.unitPrice,
              quantity: item.quantity,
              attendee: { ...attendee, phone: `+263${attendee.phone}` },
            });
            if (!firstBookingId) firstBookingId = booking.id;
          });
          setPaidTotal(totals.total);
          setBookingEmail(attendee.email);
          setOrderRef(firstBookingId || reference);
          clear();
        }}
      />
    </div>
  );
}

function CheckoutDialog({
  open,
  onOpenChange,
  total,
  orderRef,
  bookingEmail,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  total: number;
  orderRef: string;
  bookingEmail: string;
  onSuccess: (reference: string, attendee: Pick<CheckoutValues, "name" | "email" | "phone">) => void;
}) {
  const [pending, setPending] = useState(false);
  const signedInEmail = useAccount((state) => state.profile.email.trim().toLowerCase());
  const bookingEmailMatchesAccount = bookingEmail.trim().toLowerCase() === signedInEmail;
  const form = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { name: "", email: "", phone: "", cardNumber: "", expiry: "", cvc: "" },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        {orderRef ? (
          <div className="py-6 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" aria-hidden="true" />
            <DialogHeader className="mt-4 items-center">
              <DialogTitle>Booking confirmed</DialogTitle>
              <DialogDescription>
                Reference {orderRef}. Booking saved for {bookingEmail}. A mock confirmation was prepared for {formatRand(total)}.
              </DialogDescription>
            </DialogHeader>
            <Button asChild className="mt-6">
              <Link href={bookingEmailMatchesAccount ? "/dashboard/bookings" : "/login"}>
                {bookingEmailMatchesAccount ? "View my bookings" : "Sign in to view booking"}
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Checkout</DialogTitle>
              <DialogDescription>Pay {formatRand(total)}. This is a mock payment and no card is charged.</DialogDescription>
            </DialogHeader>
            <form
              className="grid gap-3"
              noValidate
              onSubmit={form.handleSubmit(async (values) => {
                setPending(true);
                await new Promise((resolve) => setTimeout(resolve, 600));
                const reference = `TH-${Date.now().toString().slice(-8)}`;
                setPending(false);
                form.reset();
                onSuccess(reference, { name: values.name, email: values.email, phone: values.phone });
              })}
            >
              <div>
                <Label htmlFor="co-name">Name</Label>
                <Input id="co-name" autoComplete="name" className="mt-1" {...form.register("name")} />
                <FieldError message={form.formState.errors.name?.message} />
              </div>
              <div>
                <Label htmlFor="co-email">Email</Label>
                <Input id="co-email" type="email" autoComplete="email" className="mt-1" {...form.register("email")} />
                <FieldError message={form.formState.errors.email?.message} />
              </div>
              <div>
                <Label htmlFor="co-phone">Phone</Label>
                <div className="relative mt-1">
                  <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm font-medium text-slate-600">+263</span>
                  <Input id="co-phone" type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={10} placeholder="771234567" className="pl-14" {...form.register("phone")} onChange={(event) => form.setValue("phone", event.target.value.replace(/\D/g, "").slice(0, 10), { shouldDirty: true, shouldValidate: true })} />
                </div>
                <FieldError message={form.formState.errors.phone?.message} />
              </div>
              <div>
                <Label htmlFor="co-card">Card number</Label>
                <Input id="co-card" inputMode="numeric" autoComplete="cc-number" maxLength={16} placeholder="4242424242424242" className="mt-1" {...form.register("cardNumber")} value={form.watch("cardNumber")} onChange={(event) => form.setValue("cardNumber", event.target.value.replace(/\D/g, "").slice(0, 16), { shouldDirty: true, shouldValidate: true })} />
                <FieldError message={form.formState.errors.cardNumber?.message} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="co-exp">Expiry</Label>
                  <Input id="co-exp" inputMode="numeric" autoComplete="cc-exp" maxLength={5} placeholder="MM/YY" className="mt-1" {...form.register("expiry")} value={form.watch("expiry")} onChange={(event) => {
                    let digits = event.target.value.replace(/\D/g, "").slice(0, 4);
                    if (digits.length === 1 && digits > "1") digits = "";
                    if (digits.length >= 2) {
                      const month = Number(digits.slice(0, 2));
                      if (month < 1 || month > 12) digits = digits.slice(0, 1);
                    }
                    const expiry = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
                    form.setValue("expiry", expiry, { shouldDirty: true, shouldValidate: true });
                  }} />
                  <FieldError message={form.formState.errors.expiry?.message} />
                </div>
                <div>
                  <Label htmlFor="co-cvc">CVC</Label>
                  <Input id="co-cvc" inputMode="numeric" autoComplete="cc-csc" maxLength={3} placeholder="123" className="mt-1" {...form.register("cvc")} value={form.watch("cvc")} onChange={(event) => form.setValue("cvc", event.target.value.replace(/\D/g, "").slice(0, 3), { shouldDirty: true, shouldValidate: true })} />
                  <FieldError message={form.formState.errors.cvc?.message} />
                </div>
              </div>
              <Button type="submit" disabled={pending}>
                {pending ? "Processing…" : `Pay ${formatRand(total)}`}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
