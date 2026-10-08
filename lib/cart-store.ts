"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLine, TicketTierName } from "@/types";

interface CartState {
  items: CartLine[];
  addItem: (item: Omit<CartLine, "lineId" | "quantity"> & { quantity?: number }) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  removeItem: (lineId: string) => void;
  clear: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const lineId = `${item.eventId}-${item.tierName}`;
          const existing = state.items.find((line) => line.lineId === lineId);
          if (existing) {
            return {
              items: state.items.map((line) =>
                line.lineId === lineId
                  ? { ...line, quantity: Math.min(10, line.quantity + (item.quantity ?? 1)) }
                  : line,
              ),
            };
          }
          return {
            items: [
              ...state.items,
              { ...item, lineId, quantity: Math.min(10, item.quantity ?? 1) },
            ],
          };
        }),
      updateQuantity: (lineId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((line) => line.lineId !== lineId)
              : state.items.map((line) =>
                  line.lineId === lineId ? { ...line, quantity: Math.min(10, quantity) } : line,
                ),
        })),
      removeItem: (lineId) =>
        set((state) => ({ items: state.items.filter((line) => line.lineId !== lineId) })),
      clear: () => set({ items: [] }),
    }),
    { name: "tickethub-cart" },
  ),
);

export function useCartCount() {
  return useCart((state) => state.items.reduce((sum, line) => sum + line.quantity, 0));
}

export type { TicketTierName };
