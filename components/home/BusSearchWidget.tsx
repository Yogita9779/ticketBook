"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { BusFront, CalendarDays, ChevronDown, Minus, Plus, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/FieldError";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { busCities } from "@/data/categories";
import { toSearchString } from "@/lib/utils";

const schema = z
  .object({
    from: z.string().refine((value) => busCities.includes(value), "No data found"),
    to: z.string().refine((value) => busCities.includes(value), "No data found"),
    depart: z.string().min(1, "Choose a travel date"),
    ret: z.string().optional(),
    passengers: z.string().min(1),
    trip: z.enum(["oneway", "return"]),
  })
  .superRefine((value, ctx) => {
    if (value.from && value.to && value.from === value.to) {
      ctx.addIssue({ code: "custom", path: ["to"], message: "Destination must be different" });
    }
  });

type FormValues = z.infer<typeof schema>;
const passengerTypes = [
  { id: "adult", label: "Adult", description: "12 years and older" },
  { id: "senior", label: "Senior", description: "older than 60 years" },
  { id: "child", label: "Child", description: "younger than 12 years" },
  { id: "student", label: "Student", description: "valid student card is required" },
  { id: "sapsandf", label: "SAPSANDF", description: "SAPSANDF identification is required" },
] as const;
type PassengerType = (typeof passengerTypes)[number]["id"];
type PassengerCounts = Record<PassengerType, number>;
const initialPassengers: PassengerCounts = { adult: 1, senior: 0, child: 0, student: 0, sapsandf: 0 };

function countPassengers(counts: PassengerCounts) {
  return Object.values(counts).reduce((total, count) => total + count, 0);
}

export function BusSearchWidget() {
  const router = useRouter();
  const today = new Date().toISOString().slice(0, 10);
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { from: "", to: "", depart: "", ret: "", passengers: "1", trip: "oneway" },
  });
  const [passengers, setPassengers] = useState<PassengerCounts>(initialPassengers);
  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");
  const [fromSuggestionsOpen, setFromSuggestionsOpen] = useState(false);
  const [toSuggestionsOpen, setToSuggestionsOpen] = useState(false);
  const [draftPassengers, setDraftPassengers] = useState<PassengerCounts>(initialPassengers);
  const [passengerPickerOpen, setPassengerPickerOpen] = useState(false);
  const trip = form.watch("trip");
  const passengerTotal = countPassengers(passengers);
  const draftPassengerTotal = countPassengers(draftPassengers);
  const fromSuggestions = busCities.filter((city) => city.toLowerCase().includes(fromQuery.trim().toLowerCase()));
  const toSuggestions = busCities.filter((city) => city.toLowerCase().includes(toQuery.trim().toLowerCase()));

  return (
    <form
      className="space-y-4"
      noValidate
      onSubmit={form.handleSubmit((values) => {
        router.push(
          toSearchString({
            type: "bus",
            origin: values.from,
            to: values.to,
            depart: values.depart,
            ret: values.trip === "return" ? values.ret : "",
            trip: values.trip,
            passengers: String(passengerTotal),
          }),
        );
      })}
    >
      <fieldset className="flex w-fit gap-1 rounded-full bg-[#f2f2f4] p-1">
        <legend className="sr-only">Trip type</legend>
        <button type="button" aria-pressed={trip === "oneway"} onClick={() => form.setValue("trip", "oneway")} className={`inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium transition ${trip === "oneway" ? "bg-white text-ink shadow-sm" : "text-slate-500 hover:text-ink"}`}>
          <BusFront className="h-4 w-4" aria-hidden="true" />One Way
        </button>
        <button type="button" aria-pressed={trip === "return"} onClick={() => form.setValue("trip", "return")} className={`inline-flex h-10 items-center gap-2 rounded-full px-4 text-sm font-medium transition ${trip === "return" ? "bg-white text-ink shadow-sm" : "text-slate-500 hover:text-ink"}`}>
          <BusFront className="h-4 w-4" aria-hidden="true" />Return
        </button>
      </fieldset>

      <div className="space-y-3">
        <div className="rounded-xl bg-[#f3f3f5] px-4 py-2">
          <Label htmlFor="bus-from" className="text-xs font-normal text-slate-500">Departing From</Label>
          <div className="relative flex items-center gap-2">
            <BusFront className="h-4 w-4 shrink-0 text-rose-500" aria-hidden="true" />
            <input
              id="bus-from"
              value={fromQuery}
              onFocus={() => setFromSuggestionsOpen(true)}
              onBlur={() => setFromSuggestionsOpen(false)}
              onChange={(event) => {
                const text = event.target.value;
                const city = busCities.find((item) => item.toLowerCase() === text.trim().toLowerCase());
                setFromQuery(city ?? text);
                form.setValue("from", city ?? "");
                form.clearErrors("from");
                setFromSuggestionsOpen(true);
              }}
              placeholder="Enter city or bus stop"
              autoComplete="off"
              aria-label="Departing from city or bus stop"
              aria-expanded={fromSuggestionsOpen}
              aria-controls="bus-from-suggestions"
              className="h-8 min-w-0 w-full bg-transparent text-sm text-ink outline-none"
            />
            {fromSuggestionsOpen ? (
              <div id="bus-from-suggestions" role="listbox" aria-label="Departure cities" className="absolute left-0 right-0 top-full z-30 mt-2 max-h-56 overflow-auto rounded-xl border border-slate-200 bg-white p-1 shadow-xl">
                {fromSuggestions.length ? fromSuggestions.map((city) => (
                  <button key={city} type="button" role="option" aria-selected={form.getValues("from") === city} onMouseDown={(event) => event.preventDefault()} onClick={() => { setFromQuery(city); form.setValue("from", city, { shouldValidate: true }); form.clearErrors("from"); setFromSuggestionsOpen(false); }} className="block w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-rose-50 hover:text-rose-700">{city}</button>
                )) : <p className="px-3 py-2 text-sm text-slate-500">No data found</p>}
              </div>
            ) : null}
          </div>
          <FieldError message={form.formState.errors.from?.message} />
        </div>

        <div className="rounded-xl bg-[#f3f3f5] px-4 py-2">
          <Label htmlFor="bus-to" className="text-xs font-normal text-slate-500">Traveling To</Label>
          <div className="relative flex items-center gap-2">
            <BusFront className="h-4 w-4 shrink-0 text-rose-500" aria-hidden="true" />
            <input
              id="bus-to"
              value={toQuery}
              onFocus={() => setToSuggestionsOpen(true)}
              onBlur={() => setToSuggestionsOpen(false)}
              onChange={(event) => {
                const text = event.target.value;
                const city = busCities.find((item) => item.toLowerCase() === text.trim().toLowerCase());
                setToQuery(city ?? text);
                form.setValue("to", city ?? "");
                form.clearErrors("to");
                setToSuggestionsOpen(true);
              }}
              placeholder="Enter city or bus stop"
              autoComplete="off"
              aria-label="Traveling to city or bus stop"
              aria-expanded={toSuggestionsOpen}
              aria-controls="bus-to-suggestions"
              className="h-8 min-w-0 w-full bg-transparent text-sm text-ink outline-none"
            />
            {toSuggestionsOpen ? (
              <div id="bus-to-suggestions" role="listbox" aria-label="Destination cities" className="absolute left-0 right-0 top-full z-30 mt-2 max-h-56 overflow-auto rounded-xl border border-slate-200 bg-white p-1 shadow-xl">
                {toSuggestions.length ? toSuggestions.map((city) => (
                  <button key={city} type="button" role="option" aria-selected={form.getValues("to") === city} onMouseDown={(event) => event.preventDefault()} onClick={() => { setToQuery(city); form.setValue("to", city, { shouldValidate: true }); form.clearErrors("to"); setToSuggestionsOpen(false); }} className="block w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-rose-50 hover:text-rose-700">{city}</button>
                )) : <p className="px-3 py-2 text-sm text-slate-500">No data found</p>}
              </div>
            ) : null}
          </div>
          <FieldError message={form.formState.errors.to?.message} />
        </div>

        <div className="rounded-xl bg-[#f3f3f5] px-4 py-2">
          <Label htmlFor="bus-date" className="text-xs font-normal text-slate-500">Departure Date</Label>
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 shrink-0 text-rose-500" aria-hidden="true" />
            <input id="bus-date" type="date" min={today} className="h-7 w-full bg-transparent text-sm text-ink outline-none" {...form.register("depart")} />
          </div>
          <FieldError message={form.formState.errors.depart?.message} />
        </div>

        <Popover open={passengerPickerOpen} onOpenChange={(open) => {
          if (open) setDraftPassengers(passengers);
          setPassengerPickerOpen(open);
        }}>
          <PopoverTrigger asChild>
            <button type="button" aria-label={`Passengers: ${passengerTotal}`} className="flex min-h-14 w-full items-center gap-3 rounded-xl bg-[#f3f3f5] px-4 py-2 text-left transition hover:bg-slate-100">
              <Users className="h-4 w-4 shrink-0 text-rose-500" aria-hidden="true" />
              <span className="flex-1 text-center"><span className="block text-[11px] text-slate-400">Passengers</span><span className="block text-sm text-slate-600">{passengerTotal} {passengerTotal === 1 ? "Adult" : "Passengers"}</span></span>
              <ChevronDown className="h-4 w-4 text-slate-500" aria-hidden="true" />
            </button>
          </PopoverTrigger>
          <PopoverContent align="center" side="bottom" className="w-[min(22rem,calc(100vw-2rem))] rounded-2xl p-5">
            <h2 className="border-b border-slate-200 pb-3 text-lg font-semibold">Select Passengers</h2>
            <div className="divide-y divide-slate-100">
              {passengerTypes.map(({ id, label, description }) => (
                <div key={id} className="flex items-center gap-3 py-3">
                  <div className="min-w-0 flex-1"><p className="text-sm font-medium">{label}</p><p className="text-xs text-slate-500">{description}</p></div>
                  <button type="button" aria-label={`Remove one ${label}`} disabled={draftPassengers[id] === 0 || (id === "adult" && draftPassengerTotal <= 1)} onClick={() => setDraftPassengers((current) => ({ ...current, [id]: Math.max(0, current[id] - 1) }))} className="flex h-8 w-8 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 disabled:opacity-35"><Minus className="h-4 w-4" aria-hidden="true" /></button>
                  <span className="w-5 text-center text-sm">{draftPassengers[id]}</span>
                  <button type="button" aria-label={`Add one ${label}`} onClick={() => setDraftPassengers((current) => ({ ...current, [id]: current[id] + 1 }))} className="flex h-8 w-8 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100"><Plus className="h-4 w-4" aria-hidden="true" /></button>
                </div>
              ))}
            </div>
            <Button type="button" className="mt-3 w-full rounded-lg bg-rose-600 hover:bg-rose-700" onClick={() => {
              setPassengers(draftPassengers);
              form.setValue("passengers", String(draftPassengerTotal));
              setPassengerPickerOpen(false);
            }}>Apply</Button>
          </PopoverContent>
        </Popover>
      </div>

      <Button type="submit" className="h-12 w-full rounded-xl bg-rose-500 text-base font-semibold hover:bg-rose-600">Search Bus Tickets</Button>
    </form>
  );
}
