"use client";

import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BedDouble, BusFront, Gift, Plane, Ticket } from "lucide-react";

const tabs = [
  { id: "events", label: "Events", icon: Ticket },
  { id: "flights", label: "Flights", icon: Plane },
  { id: "bus", label: "Buses", icon: BusFront },
  { id: "accommodation", label: "Stay", icon: BedDouble },
  { id: "vouchers", label: "Airtime & Vouchers", icon: Gift },
];

export function CategoryTabs() {
  return (
    <TabsList aria-label="What are you looking for" className="grid h-auto w-full grid-cols-5 gap-1 rounded-pill bg-stone-100 p-1 sm:gap-2">
      {tabs.map((tab) => (
        <TabsTrigger
          key={tab.id}
          value={tab.id}
          className="flex min-h-11 min-w-0 items-center justify-center gap-1.5 rounded-pill px-1.5 py-2 text-[11px] font-semibold text-ink-muted shadow-none data-[state=active]:bg-white data-[state=active]:text-ink data-[state=active]:shadow-card sm:gap-2 sm:px-3 sm:text-sm"
        >
          <tab.icon className="h-4 w-4 shrink-0 text-ink-muted" aria-hidden="true" />
          <span className="truncate">{tab.label}</span>
        </TabsTrigger>
      ))}
    </TabsList>
  );
}
