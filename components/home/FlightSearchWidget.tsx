"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, ChevronDown, Minus, Plane, Plus, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/FieldError";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { airports } from "@/data/categories";
import { toSearchString } from "@/lib/utils";

const schema = z
  .object({
    from: z.string().min(1, "Choose a departure city"),
    to: z.string().min(1, "Choose a destination"),
    depart: z.string().min(1, "Choose a departure date"),
    ret: z.string().optional(),
    passengers: z.string().min(1),
    trip: z.enum(["return", "oneway"]),
    cabin: z.string(),
    stops: z.string(),
  })
  .superRefine((value, ctx) => {
    if (value.from && value.to && value.from === value.to) {
      ctx.addIssue({ code: "custom", path: ["to"], message: "Destination must be different" });
    }
    if (value.trip === "return" && !value.ret) {
      ctx.addIssue({ code: "custom", path: ["ret"], message: "Choose a return date" });
    }
    if (value.depart && value.ret && value.ret < value.depart) {
      ctx.addIssue({ code: "custom", path: ["ret"], message: "Return must be on or after departure" });
    }
  });

type FormValues = z.infer<typeof schema>;

export function FlightSearchWidget({ stacked = false }: { stacked?: boolean }) {
  const router = useRouter();
  const today = new Date().toISOString().slice(0, 10);
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { from: "", to: "", depart: "", ret: "", passengers: "1", trip: "oneway", cabin: "Economy", stops: "Any number of stops" },
  });
  const [passengers, setPassengers] = useState({ adult: 1, child: 0, infant: 0 });
  const [draftPassengers, setDraftPassengers] = useState(passengers);
  const [passengerPickerOpen, setPassengerPickerOpen] = useState(false);
  const passengerTotal = passengers.adult + passengers.child + passengers.infant;
  const draftPassengerTotal = draftPassengers.adult + draftPassengers.child + draftPassengers.infant;
  const trip = form.watch("trip");
  const fromValue = form.watch("from");
  const toValue = form.watch("to");

  return (
    <form
      className={`grid gap-3 ${stacked ? "grid-cols-1" : "md:grid-cols-2 xl:grid-cols-6"}`}
      noValidate
      onSubmit={form.handleSubmit((values) => {
        const origin = airports.find((airport) => airport.code === values.from)?.city ?? values.from;
        const destination = airports.find((airport) => airport.code === values.to)?.city ?? values.to;
        router.push(
          toSearchString({
            type: "flights",
            origin,
            to: destination,
            depart: values.depart,
            ret: values.trip === "return" ? values.ret : "",
            passengers: values.passengers,
            trip: values.trip,
            cabin: values.cabin,
            stops: values.stops,
          }),
        );
      })}
    >
      <fieldset className={`flex gap-2 ${stacked ? "w-fit rounded-full bg-[#f2f2f4] p-1" : "md:col-span-2 xl:col-span-6"}`}>
        <legend className="sr-only">Trip type</legend>
        <button
          type="button"
          aria-pressed={trip === "oneway"}
          className={`rounded-pill px-4 py-2 text-sm font-semibold transition ${trip === "oneway" ? (stacked ? "bg-white text-ink shadow-sm" : "bg-brand text-white") : (stacked ? "text-slate-500 hover:text-ink" : "bg-canvas text-ink")}`}
          onClick={() => form.setValue("trip", "oneway")}
        >
          {stacked ? <><Plane className="mr-2 inline h-4 w-4" aria-hidden="true" />One Way</> : "One-way"}
        </button>
        <button
          type="button"
          aria-pressed={trip === "return"}
          className={`rounded-pill px-4 py-2 text-sm font-semibold transition ${trip === "return" ? (stacked ? "bg-white text-ink shadow-sm" : "bg-brand text-white") : (stacked ? "text-slate-500 hover:text-ink" : "bg-canvas text-ink")}`}
          onClick={() => form.setValue("trip", "return")}
        >
          {stacked ? <><Plane className="mr-2 inline h-4 w-4" aria-hidden="true" />Return</> : "Return"}
        </button>
      </fieldset>
      <div className={stacked ? "rounded-xl bg-[#f3f3f5] px-4 py-2.5" : ""}>
        <Label htmlFor="flight-from" className={stacked ? "text-xs font-normal text-slate-500" : undefined}>{stacked ? "Departing From" : "From"}</Label>
        <Select value={fromValue || undefined} onValueChange={(value) => form.setValue("from", value, { shouldValidate: true })}>
          <SelectTrigger id="flight-from" className={stacked ? "h-8 justify-start gap-2 border-0 bg-transparent px-0 py-0 shadow-none focus-visible:ring-0 [&>svg:last-child]:hidden" : "mt-1"} aria-label="Departure city">
            {stacked ? <><Plane className="h-4 w-4 shrink-0 text-rose-500" aria-hidden="true" /><SelectValue placeholder="Enter city or airport" /></> : <SelectValue placeholder="Departure" />}
          </SelectTrigger>
          <SelectContent>
            {airports.map((airport) => (
              <SelectItem key={airport.code} value={airport.code}>
                {airport.city} ({airport.code})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldError message={form.formState.errors.from?.message} />
      </div>
      <div className={stacked ? "rounded-xl bg-[#f3f3f5] px-4 py-2.5" : ""}>
        <Label htmlFor="flight-to" className={stacked ? "text-xs font-normal text-slate-500" : undefined}>{stacked ? "Traveling To" : "To"}</Label>
        <Select value={toValue || undefined} onValueChange={(value) => form.setValue("to", value, { shouldValidate: true })}>
          <SelectTrigger id="flight-to" className={stacked ? "h-8 justify-start gap-2 border-0 bg-transparent px-0 py-0 shadow-none focus-visible:ring-0 [&>svg:last-child]:hidden" : "mt-1"} aria-label="Destination city">
            {stacked ? <><Plane className="h-4 w-4 shrink-0 text-rose-500" aria-hidden="true" /><SelectValue placeholder="Enter city or airport" /></> : <SelectValue placeholder="Destination" />}
          </SelectTrigger>
          <SelectContent>
            {airports.map((airport) => (
              <SelectItem key={airport.code} value={airport.code}>
                {airport.city} ({airport.code})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldError message={form.formState.errors.to?.message} />
      </div>
      <div className={stacked ? "rounded-xl bg-[#f3f3f5] px-4 py-2.5" : ""}>
        <Label htmlFor="flight-depart" className={stacked ? "text-xs font-normal text-slate-500" : undefined}>{stacked ? "Departure Date" : "Depart"}</Label>
        <div className={stacked ? "flex items-center gap-2" : ""}>
          {stacked ? <CalendarDays className="h-4 w-4 shrink-0 text-rose-500" aria-hidden="true" /> : null}
          <input id="flight-depart" type="date" min={today} className={stacked ? "h-7 w-full bg-transparent text-sm text-ink outline-none" : "mt-1 h-11 w-full rounded-lg border border-neutral-300 px-3 text-sm"} {...form.register("depart")} />
        </div>
        <FieldError message={form.formState.errors.depart?.message} />
      </div>
      {trip === "return" ? (
        <div className={stacked ? "rounded-xl bg-[#f3f3f5] px-4 py-2.5" : ""}>
          <Label htmlFor="flight-return" className={stacked ? "text-xs font-normal text-slate-500" : undefined}>{stacked ? "Return Date" : "Return"}</Label>
          <div className={stacked ? "flex items-center gap-2" : ""}>
            {stacked ? <CalendarDays className="h-4 w-4 shrink-0 text-rose-500" aria-hidden="true" /> : null}
            <input id="flight-return" type="date" min={form.watch("depart") || today} className={stacked ? "h-7 w-full bg-transparent text-sm text-ink outline-none" : "mt-1 h-11 w-full rounded-lg border border-neutral-300 px-3 text-sm"} {...form.register("ret")} />
          </div>
          <FieldError message={form.formState.errors.ret?.message} />
        </div>
      ) : !stacked ? <div className="hidden xl:block" /> : null}
      {stacked ? (
        <>
          <Popover open={passengerPickerOpen} onOpenChange={(open) => {
            if (open) setDraftPassengers(passengers);
            setPassengerPickerOpen(open);
          }}>
            <PopoverTrigger asChild>
              <button type="button" aria-label={`Passengers: ${passengerTotal}`} className="flex min-h-14 w-full items-center gap-3 rounded-xl bg-[#f3f3f5] px-4 py-2 text-left transition hover:bg-slate-100">
                <Users className="h-4 w-4 shrink-0 text-rose-500" aria-hidden="true" />
                <span className="flex-1 text-center"><span className="block text-[11px] text-slate-400">Passengers</span><span className="block text-sm text-slate-600">{passengerTotal} {passengerTotal === 1 ? "Passenger" : "Passengers"}</span></span>
                <ChevronDown className="h-4 w-4 text-slate-500" aria-hidden="true" />
              </button>
            </PopoverTrigger>
            <PopoverContent align="center" side="bottom" className="w-[min(24rem,calc(100vw-2rem))] rounded-2xl p-5">
              <h2 className="border-b border-slate-200 pb-3 text-lg font-semibold">Select Passengers</h2>
              <div className="divide-y divide-slate-100">
                {([ ["adult", "Adult", "Age 12+"], ["child", "Child", "Age 2–11"], ["infant", "Infant", "Under 2 (on lap)"] ] as const).map(([key, title, description]) => (
                  <div key={key} className="flex items-center gap-3 py-3">
                    <div className="min-w-0 flex-1"><p className="text-sm font-medium">{title}</p><p className="text-xs text-slate-500">{description}</p></div>
                    <button type="button" aria-label={`Remove one ${title}`} disabled={draftPassengers[key] === 0 || (key === "adult" && draftPassengers.adult <= 1)} onClick={() => setDraftPassengers((current) => ({ ...current, [key]: Math.max(key === "adult" ? 1 : 0, current[key] - 1) }))} className="flex h-8 w-8 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 disabled:opacity-35"><Minus className="h-4 w-4" aria-hidden="true" /></button>
                    <span className="w-5 text-center text-sm">{draftPassengers[key]}</span>
                    <button type="button" aria-label={`Add one ${title}`} disabled={draftPassengerTotal >= 8} onClick={() => setDraftPassengers((current) => ({ ...current, [key]: current[key] + 1 }))} className="flex h-8 w-8 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 disabled:opacity-35"><Plus className="h-4 w-4" aria-hidden="true" /></button>
                  </div>
                ))}
              </div>
              <p className="border-t border-slate-100 pt-3 text-xs text-slate-500">Maximum 8 passengers per booking. Each infant must travel with an adult.</p>
              <Button type="button" className="mt-4 w-full rounded-lg bg-rose-600 hover:bg-rose-700" onClick={() => {
                setPassengers(draftPassengers);
                form.setValue("passengers", String(draftPassengerTotal));
                setPassengerPickerOpen(false);
              }}>Apply</Button>
            </PopoverContent>
          </Popover>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex min-h-14 items-center gap-3 rounded-xl bg-[#f3f3f5] px-4 py-2">
              <Plane className="h-4 w-4 shrink-0 text-rose-500" aria-hidden="true" />
              <div className="min-w-0 flex-1"><Label htmlFor="flight-cabin" className="text-[11px] font-normal text-slate-400">Cabin Class</Label>
                <Select value={form.watch("cabin")} onValueChange={(value) => form.setValue("cabin", value)}><SelectTrigger id="flight-cabin" className="h-6 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"><SelectValue /></SelectTrigger><SelectContent>{["Economy", "Premium Economy", "Business", "First Class"].map((value) => <SelectItem key={value} value={value}>{value}</SelectItem>)}</SelectContent></Select>
              </div>
            </div>
            <div className="flex min-h-14 items-center gap-3 rounded-xl bg-[#f3f3f5] px-4 py-2">
              <Plane className="h-4 w-4 shrink-0 text-rose-500" aria-hidden="true" />
              <div className="min-w-0 flex-1"><Label htmlFor="flight-stops" className="text-[11px] font-normal text-slate-400">Stops</Label>
                <Select value={form.watch("stops")} onValueChange={(value) => form.setValue("stops", value)}><SelectTrigger id="flight-stops" className="h-6 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"><SelectValue /></SelectTrigger><SelectContent>{["Any number of stops", "1 stop max", "Nonstop only"].map((value) => <SelectItem key={value} value={value}>{value}</SelectItem>)}</SelectContent></Select>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>
          <Label htmlFor="flight-pax">Passengers</Label>
          <Select value={form.watch("passengers")} onValueChange={(value) => form.setValue("passengers", value)}>
            <SelectTrigger id="flight-pax" className="mt-1"><SelectValue /></SelectTrigger>
            <SelectContent>{["1", "2", "3", "4", "5", "6"].map((count) => <SelectItem key={count} value={count}>{count} {count === "1" ? "passenger" : "passengers"}</SelectItem>)}</SelectContent>
          </Select>
        </div>
      )}
      <div className="flex items-end">
        <Button type="submit" className={stacked ? "h-12 w-full rounded-xl bg-rose-500 text-base font-semibold hover:bg-rose-600" : "w-full"}>
          {stacked ? "Search Flight Tickets" : "Search Flights"}
        </Button>
      </div>
    </form>
  );
}
