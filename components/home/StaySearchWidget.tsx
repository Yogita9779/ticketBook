"use client";

import { CalendarDays, ChevronDown, MapPin, Search, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { stayDeals } from "@/data/deals";
import { toSearchString } from "@/lib/utils";

const destinations = [...new Set(stayDeals.map((stay) => stay.city))];

export function StaySearchWidget() {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [radius, setRadius] = useState(10);
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState(0);
  const [guestPickerOpen, setGuestPickerOpen] = useState(false);
  const guests = Number(adults) + children;
  const today = new Date().toISOString().slice(0, 10);

  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push(toSearchString({ type: "accommodation", destination, checkIn, checkOut, guests: String(guests), rooms: "1" }));
  }

  return (
    <form onSubmit={search} className="space-y-4">
      <label className="block rounded-xl bg-[#f3f3f5] px-4 py-2.5">
        <span className="block text-xs text-slate-500">Where would you like to go?</span>
        <span className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0 text-rose-500" aria-hidden="true" />
          <input list="stay-destinations" value={destination} onChange={(event) => setDestination(event.target.value)} placeholder="Enter a destination" aria-label="Enter a destination" className="h-8 w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-500" />
          <datalist id="stay-destinations">{destinations.map((city) => <option key={city} value={city} />)}</datalist>
        </span>
      </label>

      <label className="block text-sm font-medium text-slate-700" htmlFor="stay-radius">Search Radius: {radius}km
        <input id="stay-radius" type="range" min="1" max="50" value={radius} onChange={(event) => setRadius(Number(event.target.value))} className="mt-2 block h-5 w-full cursor-pointer accent-rose-600" />
      </label>

      <div className="rounded-xl bg-[#f3f3f5] px-4 py-2.5">
        <span className="block text-xs text-slate-500">Check-in &amp; Check-out</span>
        <div className="flex items-center gap-3"><CalendarDays className="h-4 w-4 shrink-0 text-rose-500" aria-hidden="true" />
          <div className="grid min-w-0 flex-1 grid-cols-2 gap-3">
            <input aria-label="Check-in date" type="date" min={today} value={checkIn} onChange={(event) => setCheckIn(event.target.value)} className="h-8 min-w-0 bg-transparent text-sm text-slate-700 outline-none" />
            <input aria-label="Check-out date" type="date" min={checkIn || today} value={checkOut} onChange={(event) => setCheckOut(event.target.value)} className="h-8 min-w-0 border-l border-slate-300 bg-transparent pl-3 text-sm text-slate-700 outline-none" />
          </div>
        </div>
      </div>

      <Popover open={guestPickerOpen} onOpenChange={setGuestPickerOpen}>
        <PopoverTrigger asChild>
          <button type="button" aria-label={`Guests: ${guests} total`} className="flex min-h-14 w-full items-center gap-3 rounded-xl bg-[#f3f3f5] px-4 py-2 text-left transition hover:bg-slate-100">
            <Users className="h-4 w-4 shrink-0 text-rose-500" aria-hidden="true" />
            <span className="flex-1 text-center"><span className="block text-[11px] text-slate-400">Guests</span><span className="block text-sm text-slate-600">{adults} Adults{children ? `, ${children} Children` : ""} ({guests} total)</span></span>
            <ChevronDown className="h-4 w-4 text-slate-500" aria-hidden="true" />
          </button>
        </PopoverTrigger>
        <PopoverContent align="center" side="bottom" className="w-[min(24rem,calc(100vw-2rem))] rounded-2xl p-5">
          <h2 className="border-b border-slate-200 pb-3 text-lg font-semibold">Select Guests <span className="text-sm font-normal text-slate-500">(Max 9 total)</span></h2>
          <div className="flex items-center gap-3 border-b border-slate-100 py-3">
            <div className="min-w-0 flex-1"><p className="text-sm font-medium">Adults</p><p className="text-xs text-slate-500">Ages 13 or above</p></div>
            <Select value={adults} onValueChange={setAdults}>
              <SelectTrigger aria-label="Number of adults" className="h-10 w-32 rounded-lg border-0 bg-slate-100 shadow-none focus-visible:ring-1"><SelectValue /></SelectTrigger>
              <SelectContent>{Array.from({ length: 9 - children }, (_, index) => String(index + 1)).map((count) => <SelectItem key={count} value={count}>{count} {count === "1" ? "Adult" : "Adults"}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-3 py-3">
            <div className="min-w-0 flex-1"><p className="text-sm font-medium">Children</p><p className="text-xs text-slate-500">Ages 0–12</p></div>
            {children > 0 ? <button type="button" onClick={() => setChildren((count) => count - 1)} className="rounded-lg border border-rose-500 px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50">Remove child</button> : null}
            <button type="button" disabled={guests >= 9} onClick={() => setChildren((count) => count + 1)} className="rounded-lg border border-rose-500 px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-40">Add Child</button>
          </div>
          <p className="flex justify-between border-y border-slate-100 py-3 text-sm text-slate-600"><span>Total guests:</span><span className="font-semibold text-emerald-600">{guests} / 9</span></p>
          <Button type="button" className="mt-4 w-full rounded-lg bg-rose-600 hover:bg-rose-700" onClick={() => setGuestPickerOpen(false)}>Apply</Button>
        </PopoverContent>
      </Popover>

      <Button type="submit" className="h-12 w-full rounded-xl bg-rose-500 text-base font-semibold hover:bg-rose-600"><Search className="mr-2 h-4 w-4" aria-hidden="true" />Search Accommodations</Button>
    </form>
  );
}
