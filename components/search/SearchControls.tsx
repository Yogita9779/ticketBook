"use client";

import { SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { CITIES, EVENT_CATEGORIES, type SearchQuery, type SortOption } from "@/types";
import { PRICE_MAX, PRICE_MIN, formatRand, toSearchString } from "@/lib/utils";

export function SearchControls({ query, total }: { query: SearchQuery; total: number }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const update = (partial: Partial<SearchQuery>) => {
    const next = { ...query, ...partial, page: partial.page ?? 1 };
    router.push(toSearchString(next));
  };

  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-ink-muted" aria-live="polite">
        {total} {total === 1 ? "result" : "results"}
      </p>
      <div className="flex items-center gap-2">
        <Button type="button" variant="outline" className="lg:hidden" onClick={() => setOpen(true)}>
          <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          Filters
        </Button>
        <div className="w-48">
          <Label htmlFor="sort" className="sr-only">
            Sort
          </Label>
          <Select value={query.sort} onValueChange={(sort) => update({ sort: sort as SortOption })}>
            <SelectTrigger id="sort" aria-label="Sort results">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="price-asc">Price low-high</SelectItem>
              <SelectItem value="price-desc">Price high-low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>Narrow the results, then apply.</SheetDescription>
          </SheetHeader>
          <div className="px-5 pb-6">
            <FilterFields query={query} onApply={(partial) => { update(partial); setOpen(false); }} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export function FilterFields({
  query,
  onApply,
}: {
  query: SearchQuery;
  onApply?: (partial: Partial<SearchQuery>) => void;
}) {
  const router = useRouter();
  const [category, setCategory] = useState(query.category || "all");
  const [city, setCity] = useState(query.city || "all");
  const [date, setDate] = useState(query.date);
  const [price, setPrice] = useState([query.minPrice, query.maxPrice]);

  const apply = (partial?: Partial<SearchQuery>) => {
    const next: Partial<SearchQuery> = {
      category: category === "all" ? "" : category,
      city: city === "all" ? "" : city,
      date,
      minPrice: price[0],
      maxPrice: price[1],
      ...partial,
    };
    if (onApply) onApply(next);
    else router.push(toSearchString({ ...query, ...next, page: 1 }));
  };

  return (
    <form
      className="space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        apply();
      }}
    >
      {query.type === "events" ? (
        <>
          <div>
            <Label htmlFor="filter-category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="filter-category" className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {EVENT_CATEGORIES.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="filter-city">City</Label>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger id="filter-city" className="mt-1">
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
          <div>
            <Label htmlFor="filter-date">Date</Label>
            <input
              id="filter-date"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="mt-1 h-11 w-full rounded-lg border border-neutral-300 px-3 text-sm"
            />
          </div>
        </>
      ) : null}
      <div>
        <Label>
          Price range ({formatRand(price[0] ?? PRICE_MIN)} – {formatRand(price[1] ?? PRICE_MAX)})
        </Label>
        <Slider
          className="mt-4"
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={50}
          value={price}
          onValueChange={setPrice}
          aria-label="Price range"
        />
      </div>
      <Button type="submit" className="w-full">
        Apply filters
      </Button>
    </form>
  );
}
