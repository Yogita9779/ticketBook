"use client";

import Image from "next/image";
import { MapPin, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { EventCard } from "@/components/ui/EventCard";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-store";
import { formatLongDate, formatRand, formatTime, formatWeekday } from "@/lib/utils";
import type { EventItem } from "@/types";

export function EventDetail({ event, related }: { event: EventItem; related: EventItem[] }) {
  const router = useRouter();
  const addItem = useCart((state) => state.addItem);
  const [tierId, setTierId] = useState(event.tiers[0]?.id ?? "general");
  const [quantity, setQuantity] = useState(1);
  const tier = event.tiers.find((item) => item.id === tierId) ?? event.tiers[0];
  const total = tier.price * quantity;

  const add = () => {
    addItem({
      eventId: event.id,
      slug: event.slug,
      title: event.title,
      image: event.image,
      venue: event.venue,
      city: event.city,
      date: event.date,
      tierName: tier.name,
      unitPrice: tier.price,
      quantity,
    });
    toast.success("Added to cart", {
      description: `${quantity} × ${tier.name} · ${event.title}`,
      action: { label: "View cart", onClick: () => router.push("/cart") },
    });
  };

  return (
    <article>
      <div className="relative h-64 sm:h-96">
        <Image
          src={event.image}
          alt={`${event.title} at ${event.venue}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
      </div>
      <div className="container-page -mt-16 grid gap-8 pb-28 lg:grid-cols-[1.4fr_0.8fr] lg:pb-16">
        <div className="rounded-card bg-white p-6 shadow-elevated">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">{event.category}</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{event.title}</h1>
          <p className="mt-3 flex items-start gap-2 text-ink-muted">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>
              {event.venue}, {event.city}
            </span>
          </p>
          <p className="mt-2 text-sm font-medium text-ink">
            {formatWeekday(event.date)}, {formatLongDate(event.date)} · {formatTime(event.date)}
          </p>
          <p className="mt-5 text-base leading-relaxed text-ink-muted">{event.description}</p>
        </div>
        <div className="h-fit rounded-card bg-white p-6 shadow-card lg:sticky lg:top-24">
          <h2 className="text-lg font-semibold">Choose tickets</h2>
          <fieldset className="mt-4 space-y-3">
            <legend className="sr-only">Ticket tier</legend>
            {event.tiers.map((item) => (
              <label
                key={item.id}
                className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3 ${tierId === item.id ? "border-accent bg-rose-50" : "border-neutral-200"}`}
              >
                <input
                  type="radio"
                  name="tier"
                  value={item.id}
                  checked={tierId === item.id}
                  onChange={() => setTierId(item.id)}
                  className="mt-1"
                />
                <span>
                  <span className="flex items-center justify-between gap-3">
                    <span className="font-semibold">{item.name}</span>
                    <span className="font-bold">{formatRand(item.price)}</span>
                  </span>
                  <span className="mt-1 block text-sm text-ink-muted">{item.description}</span>
                </span>
              </label>
            ))}
          </fieldset>
          <div className="mt-5 flex items-center justify-between">
            <span className="text-sm font-medium">Quantity</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Decrease quantity"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-6 text-center font-semibold" aria-live="polite">
                {quantity}
              </span>
              <button
                type="button"
                aria-label="Increase quantity"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300"
                onClick={() => setQuantity((value) => Math.min(10, value + 1))}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-neutral-200 pt-4">
            <span className="text-sm text-ink-muted">Total</span>
            <span className="text-xl font-bold">{formatRand(total)}</span>
          </div>
          <Button type="button" className="mt-4 hidden w-full lg:inline-flex" onClick={add}>
            Add to cart
          </Button>
        </div>
      </div>
      {related.length > 0 ? (
        <section className="container-page pb-16" aria-labelledby="related-heading">
          <h2 id="related-heading" className="mb-5 text-2xl font-bold">
            Related events
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <EventCard key={item.id} event={item} />
            ))}
          </div>
        </section>
      ) : null}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-neutral-200 bg-white p-4 shadow-elevated lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-ink-muted">{tier.name}</p>
            <p className="text-lg font-bold">{formatRand(total)}</p>
          </div>
          <Button type="button" onClick={add}>
            Add to cart
          </Button>
        </div>
      </div>
    </article>
  );
}
