"use client";

import { useMemo, useState } from "react";
import { EmptyState } from "@/components/ui/Skeletons";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CITIES, type Store } from "@/types";

export function StoreFinder({ stores }: { stores: Store[] }) {
  const [city, setCity] = useState("all");
  const filtered = useMemo(
    () => (city === "all" ? stores : stores.filter((store) => store.city === city)),
    [city, stores],
  );

  return (
    <div>
      <div className="max-w-xs">
        <Label htmlFor="store-city">City</Label>
        <Select value={city} onValueChange={setCity}>
          <SelectTrigger id="store-city" className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All cities</SelectItem>
            {CITIES.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {filtered.length === 0 ? (
        <div className="mt-6">
          <EmptyState title="No stores in that city" message="Choose another city to see Bookora branches." />
        </div>
      ) : (
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {filtered.map((store) => {
            const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.address)}`;
            return (
              <li key={store.id} className="rounded-card bg-white p-5 shadow-card">
                <h2 className="text-lg font-semibold text-ink">{store.name}</h2>
                <p className="mt-2 text-sm text-ink-muted">{store.address}</p>
                <p className="mt-2 text-sm text-ink">{store.hours}</p>
                <p className="mt-1 text-sm">
                  <a href={`tel:${store.phone.replace(/\s+/g, "")}`} className="font-medium text-accent">
                    {store.phone}
                  </a>
                </p>
                <a href={maps} className="mt-3 inline-flex text-sm font-semibold text-accent hover:text-accent-hover">
                  Get directions
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
