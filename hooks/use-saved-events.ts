"use client";

import { toast } from "sonner";
import { useAccount } from "@/lib/account-store";
import { useWishlist } from "@/lib/use-wishlist";
import type { EventItem } from "@/types";

export function useSavedEvents() {
  const wishlist = useWishlist();
  const logActivity = useAccount((state) => state.logActivity);

  const toggle = (event: Pick<EventItem, "id" | "title">) => {
    const saved = wishlist.has(event.id);
    wishlist.toggle(event.id);
    toast.success(saved ? `Removed ${event.title} from saved items` : `Saved ${event.title}`);
    logActivity({
      title: saved ? "Removed a saved event" : "Saved an event",
      detail: event.title,
      tone: "rose",
    });
  };

  return {
    ready: wishlist.ready,
    has: wishlist.has,
    toggle,
  };
}
