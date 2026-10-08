"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/Badge";
import { PriceTag } from "@/components/ui/PriceTag";
import { useWishlist } from "@/lib/use-wishlist";
import { formatDayBadge } from "@/lib/utils";
import type { EventItem } from "@/types";

export function EventCard({ event, inactive = false, large = false }: { event: EventItem; inactive?: boolean; large?: boolean }) {
  const wishlist = useWishlist();
  const saved = wishlist.ready && wishlist.has(event.id);
  const badge = formatDayBadge(event.date);

  return (
    <article className="group relative h-full overflow-hidden rounded-card bg-white shadow-card transition-shadow duration-200 hover:shadow-elevated">
      <Link href={`/events/${event.slug}`} tabIndex={inactive ? -1 : undefined} className="flex h-full flex-col focus-visible:outline-none">
        <div className={`relative overflow-hidden ${large ? "aspect-[16/9]" : "aspect-[16/10]"}`}>
          <Image
            src={event.image}
            alt={`${event.title} at ${event.venue}, ${event.city}`}
            fill
            sizes={large ? "(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 48vw" : "(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 25vw"}
            className="object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
          />
          <div className="absolute left-3 top-3 flex h-14 w-12 flex-col items-center justify-center rounded-lg bg-white text-ink shadow-card">
            <span className="text-lg font-bold leading-none">{badge.day}</span>
            <span className="mt-1 text-[10px] font-semibold tracking-wide">{badge.month}</span>
          </div>
          <Badge className="absolute bottom-3 left-3">{event.category}</Badge>
        </div>
        <div className={large ? "flex flex-1 flex-col p-5 sm:p-6" : "flex flex-1 flex-col p-4"}>
          <h3 className={`line-clamp-2 min-h-[3rem] font-semibold text-ink ${large ? "text-lg sm:text-xl" : "text-base"}`}>{event.title}</h3>
          <p className="mt-2 flex items-start gap-1.5 text-sm text-ink-muted">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>
              {event.venue}, {event.city}
            </span>
          </p>
          <div className="mt-auto pt-3">
            <PriceTag amount={event.priceFrom} />
          </div>
          <span className="mt-3 inline-flex h-10 items-center justify-center rounded-pill bg-accent text-sm font-semibold text-white opacity-100 transition-opacity lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100">
            Book now
          </span>
        </div>
      </Link>
      <button
        type="button"
        tabIndex={inactive ? -1 : undefined}
        aria-pressed={saved}
        aria-label={saved ? `Remove ${event.title} from wishlist` : `Save ${event.title} to wishlist`}
        onClick={() => {
          wishlist.toggle(event.id);
          toast.success(saved ? "Removed from wishlist" : "Saved to wishlist");
        }}
        className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-ink shadow-card hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <Heart className={saved ? "h-5 w-5 fill-accent text-accent" : "h-5 w-5"} aria-hidden="true" />
      </button>
    </article>
  );
}
