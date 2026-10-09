"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heart, MapPin, Minus, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FieldError } from "@/components/ui/FieldError";
import { dashCard, EmptyState, StatusBadge, TicketQr } from "@/components/dashboard/ui";
import { useAccountReady } from "@/hooks/use-hydrated";
import { useSavedEvents } from "@/hooks/use-saved-events";
import { useAccount } from "@/lib/account-store";
import { attendeeSchema, paymentSchema, type AttendeeValues, type PaymentValues } from "@/lib/schemas";
import { formatLongDate, formatRand, formatTime, orderTotals } from "@/lib/utils";
import type { Booking, EventItem, TicketTierName } from "@/types";

const steps = ["Tickets", "Attendee", "Payment", "Confirmation"];

export function EventDetailView({ event, startBooking = false }: { event: EventItem; startBooking?: boolean }) {
  const saved = useSavedEvents();
  const profile = useAccount((state) => state.profile);
  const addBooking = useAccount((state) => state.addBooking);
  const active = saved.ready && saved.has(event.id);
  const [step, setStep] = useState(startBooking ? 0 : -1);
  const [tierName, setTierName] = useState<TicketTierName>(event.tiers[0]?.name ?? "General");
  const [quantity, setQuantity] = useState(1);
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState("");
  const [booking, setBooking] = useState<Booking | null>(null);
  const tier = event.tiers.find((item) => item.name === tierName) ?? event.tiers[0];
  const totals = useMemo(() => orderTotals([{ unitPrice: tier?.price ?? event.priceFrom, quantity }]), [event.priceFrom, quantity, tier?.price]);

  const attendeeForm = useForm<AttendeeValues>({
    resolver: zodResolver(attendeeSchema),
    defaultValues: { name: profile.name, email: profile.email, phone: profile.phone },
  });
  const paymentForm = useForm<PaymentValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: { cardName: profile.name, cardNumber: "", expiry: "", cvc: "" },
  });
  const ready = useAccountReady();

  useEffect(() => {
    if (!ready) return;
    const current = useAccount.getState().profile;
    attendeeForm.reset({ name: current.name, email: current.email, phone: current.phone });
    paymentForm.reset({ cardName: current.name, cardNumber: "", expiry: "", cvc: "" });
  }, [attendeeForm, paymentForm, ready]);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
      <article className={dashCard + " overflow-hidden"}>
        <div className="relative aspect-[16/8] bg-slate-100">
          <Image src={event.image} alt={`${event.title} at ${event.venue}, ${event.city}`} fill priority sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
        </div>
        <div className="p-5 sm:p-7">
          <p className="text-sm font-bold uppercase tracking-wide text-rose-600">{event.category}</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight">{event.title}</h1>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{formatLongDate(event.date)} · {formatTime(event.date)}</p>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400"><MapPin className="h-4 w-4" aria-hidden="true" />{event.venue}, {event.city}</p>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">{event.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={() => setStep(0)} className="inline-flex h-12 items-center rounded-2xl bg-rose-600 px-5 text-sm font-bold text-white hover:bg-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600">Book now</button>
            <button type="button" aria-pressed={active} onClick={() => saved.toggle(event)} className="inline-flex h-12 items-center gap-2 rounded-2xl border border-slate-200 px-5 text-sm font-bold hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 dark:border-white/10 dark:hover:bg-white/5">
              <Heart className={active ? "h-4 w-4 fill-rose-600 text-rose-600" : "h-4 w-4"} aria-hidden="true" />
              {active ? "Saved" : "Add to saved"}
            </button>
          </div>
        </div>
      </article>

      <aside className={dashCard + " h-fit p-5 sm:p-6"} aria-label="Booking">
        {step < 0 ? (
          <div>
            <h2 className="text-lg font-bold">Tickets from {formatRand(event.priceFrom)}</h2>
            <ul className="mt-4 space-y-3">
              {event.tiers.map((item) => (
                <li key={item.id} className="rounded-2xl border border-slate-200 p-3 dark:border-white/10">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold">{item.name}</p>
                    <p className="font-bold">{formatRand(item.price)}</p>
                  </div>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {step >= 0 && step < 3 ? (
          <ol aria-label="Booking progress" className="mb-5 grid grid-cols-4 gap-2">
            {steps.map((label, index) => (
              <li key={label} className="text-center">
                <span className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${index <= step ? "bg-rose-600 text-white" : "bg-slate-100 text-slate-500 dark:bg-white/10"}`}>{index + 1}</span>
                <span className="mt-1 block text-[11px] font-semibold">{label}</span>
              </li>
            ))}
          </ol>
        ) : null}

        {step === 0 ? (
          <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
            <fieldset>
              <legend className="text-sm font-bold">Ticket type</legend>
              <div className="mt-2 space-y-2">
                {event.tiers.map((item) => (
                  <label key={item.id} className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-3 ${tierName === item.name ? "border-rose-500 bg-rose-50 dark:bg-rose-500/10" : "border-slate-200 dark:border-white/10"}`}>
                    <input type="radio" name="tier" checked={tierName === item.name} onChange={() => setTierName(item.name)} className="mt-1 accent-rose-600" />
                    <span>
                      <span className="block text-sm font-semibold">{item.name} · {formatRand(item.price)}</span>
                      <span className="block text-xs text-slate-500">{item.description}</span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div>
              <p className="text-sm font-bold">Quantity</p>
              <div className="mt-2 inline-flex items-center rounded-2xl border border-slate-200 dark:border-white/10">
                <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="inline-flex h-11 w-11 items-center justify-center"><Minus className="h-4 w-4" /></button>
                <span className="w-8 text-center text-sm font-bold" aria-live="polite">{quantity}</span>
                <button type="button" aria-label="Increase quantity" onClick={() => setQuantity((value) => Math.min(8, value + 1))} className="inline-flex h-11 w-11 items-center justify-center"><Plus className="h-4 w-4" /></button>
              </div>
            </div>
            <p className="text-sm text-slate-500">Total {formatRand(totals.total)} including an 8% service fee.</p>
            <button type="button" onClick={() => setStep(1)} className="h-12 w-full rounded-2xl bg-rose-600 text-sm font-bold text-white hover:bg-rose-700">Continue</button>
          </form>
        ) : null}

        {step === 1 ? (
          <form className="space-y-3" noValidate onSubmit={attendeeForm.handleSubmit(() => setStep(2))}>
            <Field label="Full name" error={attendeeForm.formState.errors.name?.message}>
              <input className={fieldClass} autoComplete="name" {...attendeeForm.register("name")} />
            </Field>
            <Field label="Email" error={attendeeForm.formState.errors.email?.message}>
              <input type="email" className={fieldClass} autoComplete="email" {...attendeeForm.register("email")} />
            </Field>
            <Field label="Phone" error={attendeeForm.formState.errors.phone?.message}>
              <input className={fieldClass} autoComplete="tel" placeholder="+27 82 555 0142" {...attendeeForm.register("phone")} />
            </Field>
            <div className="flex gap-2 pt-2">
              <button type="button" onClick={() => setStep(0)} className="h-12 flex-1 rounded-2xl border border-slate-200 text-sm font-bold dark:border-white/10">Back</button>
              <button type="submit" className="h-12 flex-1 rounded-2xl bg-rose-600 text-sm font-bold text-white">Continue</button>
            </div>
          </form>
        ) : null}

        {step === 2 ? (
          <form
            className="space-y-3"
            noValidate
            onSubmit={paymentForm.handleSubmit(async (values) => {
              setPayError("");
              const digits = values.cardNumber.replace(/\s+/g, "");
              if (digits === "4000000000000002") {
                setPayError("Payment was declined. Try another card.");
                toast.error("Payment was declined");
                return;
              }
              setPaying(true);
              await new Promise((resolve) => setTimeout(resolve, 700));
              const created = addBooking({
                event,
                tierName,
                unitPrice: tier?.price ?? event.priceFrom,
                quantity,
                attendee: attendeeForm.getValues(),
              });
              setBooking(created);
              setPaying(false);
              setStep(3);
              toast.success(`Booking ${created.id} confirmed`);
            })}
          >
            <Field label="Name on card" error={paymentForm.formState.errors.cardName?.message}>
              <input className={fieldClass} autoComplete="cc-name" {...paymentForm.register("cardName")} />
            </Field>
            <Field label="Card number" error={paymentForm.formState.errors.cardNumber?.message}>
              <input inputMode="numeric" autoComplete="cc-number" placeholder="4242 4242 4242 4242" className={fieldClass} {...paymentForm.register("cardNumber")} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Expiry" error={paymentForm.formState.errors.expiry?.message}>
                <input placeholder="MM/YY" autoComplete="cc-exp" className={fieldClass} {...paymentForm.register("expiry")} />
              </Field>
              <Field label="CVC" error={paymentForm.formState.errors.cvc?.message}>
                <input inputMode="numeric" autoComplete="cc-csc" placeholder="123" className={fieldClass} {...paymentForm.register("cvc")} />
              </Field>
            </div>
            {payError ? <p role="alert" className="text-sm font-medium text-rose-600">{payError}</p> : null}
            <p className="text-xs text-slate-500">This is a mock payment. Card 4000 0000 0000 0002 is declined. Nothing is charged or stored.</p>
            <div className="flex gap-2">
              <button type="button" onClick={() => setStep(1)} className="h-12 flex-1 rounded-2xl border border-slate-200 text-sm font-bold dark:border-white/10">Back</button>
              <button type="submit" disabled={paying} className="h-12 flex-1 rounded-2xl bg-rose-600 text-sm font-bold text-white disabled:opacity-60">{paying ? "Processing…" : `Pay ${formatRand(totals.total)}`}</button>
            </div>
          </form>
        ) : null}

        {step === 3 && booking ? (
          <div className="text-center">
            <StatusBadge status={booking.status} />
            <h2 className="mt-3 text-2xl font-extrabold">You’re booked</h2>
            <p className="mt-2 text-sm text-slate-500">Reference {booking.id}</p>
            <div className="mx-auto mt-4 w-fit rounded-2xl bg-white p-3 shadow-sm">
              <TicketQr value={booking.id} size={140} />
            </div>
            <p className="mt-4 text-sm">{quantity} × {tierName} · {event.title}</p>
            <Link href={`/dashboard/bookings/${booking.id}`} className="mt-5 inline-flex h-12 items-center rounded-2xl bg-rose-600 px-5 text-sm font-bold text-white">View ticket</Link>
          </div>
        ) : null}
      </aside>
    </div>
  );
}

const fieldClass = "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 dark:border-white/10 dark:bg-[#0c0e14]";

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block text-sm font-semibold">
      {label}
      <div className="mt-1 font-normal">{children}</div>
      <FieldError message={error} />
    </label>
  );
}

export function EventMissing() {
  return (
    <div className={dashCard}>
      <EmptyState
        title="Event unavailable"
        text="We could not find that event. It may have been removed from the catalogue."
        action={<Link href="/dashboard/events" className="inline-flex h-11 items-center rounded-xl bg-rose-600 px-4 text-sm font-semibold text-white">Browse events</Link>}
      />
    </div>
  );
}
