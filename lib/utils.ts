import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { SearchQuery, SearchType, SortOption } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function dateParts(iso: string) {
  const [year, month, day] = iso.slice(0, 10).split("-").map(Number);
  return { year, month, day };
}

export function formatLongDate(iso: string) {
  const { year, month, day } = dateParts(iso);
  return `${day} ${MONTHS[month - 1]} ${year}`;
}

export function formatDayBadge(iso: string) {
  const { month, day } = dateParts(iso);
  return { day: String(day), month: MONTHS[month - 1].toUpperCase() };
}

export function formatWeekday(iso: string) {
  const { year, month, day } = dateParts(iso);
  const utc = new Date(Date.UTC(year, month - 1, day));
  return WEEKDAYS[utc.getUTCDay()];
}

export function formatTime(iso: string) {
  const time = iso.slice(11, 16);
  const [hourStr, minute] = time.split(":");
  let hour = Number(hourStr);
  const suffix = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${suffix}`;
}

export function formatRand(value: number) {
  // Avoid locale-dependent grouping characters (including NBSP) so server and
  // browser render identical text during hydration.
  const amount = String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `R${amount}`;
}

export const SERVICE_FEE_RATE = 0.08;

export function orderTotals(lines: { unitPrice: number; quantity: number }[]) {
  const subtotal = lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);
  const fee = Math.round(subtotal * SERVICE_FEE_RATE);
  return { subtotal, fee, total: subtotal + fee };
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function addUtcDays(days: number, hour = 19, minute = 0) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + days);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hh = String(hour).padStart(2, "0");
  const mm = String(minute).padStart(2, "0");
  return `${year}-${month}-${day}T${hh}:${mm}:00.000Z`;
}

export function weekendOffsets() {
  const today = new Date();
  const day = today.getUTCDay();
  let friday = 5 - day;
  if (day === 6) friday = -1;
  if (day === 0) friday = -2;
  if (day === 5) friday = 0;
  return { fri: friday, sat: friday + 1, sun: friday + 2 };
}

export function isoDateOnly(iso: string) {
  return iso.slice(0, 10);
}

export const PRICE_MIN = 0;
export const PRICE_MAX = 5000;
export const PAGE_SIZE = 12;

const SEARCH_TYPES: SearchType[] = ["events", "flights", "bus", "accommodation", "vouchers"];
const SORTS: SortOption[] = ["relevance", "date", "price-asc", "price-desc"];

function first(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export function parseSearchQuery(
  raw: Record<string, string | string[] | undefined>,
): SearchQuery {
  const category = first(raw.category);
  let type = first(raw.type) as SearchType;
  if (!SEARCH_TYPES.includes(type)) {
    if (category === "Travel") type = "flights";
    else if (category === "Vouchers") type = "vouchers";
    else type = "events";
  }
  const sort = first(raw.sort) as SortOption;
  const page = Number.parseInt(first(raw.page) || "1", 10);
  const minPrice = Number.parseInt(first(raw.minPrice) || String(PRICE_MIN), 10);
  const maxPrice = Number.parseInt(first(raw.maxPrice) || String(PRICE_MAX), 10);

  return {
    type,
    q: first(raw.q).trim(),
    city: first(raw.city),
    category: category === "Travel" || category === "Vouchers" ? "" : category,
    from: first(raw.from),
    to: first(raw.to),
    depart: first(raw.depart),
    ret: first(raw.return),
    passengers: first(raw.passengers),
    trip: first(raw.trip),
    cabin: first(raw.cabin),
    stops: first(raw.stops),
    destination: first(raw.destination),
    checkIn: first(raw.checkIn),
    checkOut: first(raw.checkOut),
    guests: first(raw.guests),
    rooms: first(raw.rooms),
    brand: first(raw.brand),
    amount: first(raw.amount),
    origin: first(raw.origin),
    minPrice: Number.isFinite(minPrice) ? minPrice : PRICE_MIN,
    maxPrice: Number.isFinite(maxPrice) ? maxPrice : PRICE_MAX,
    date: first(raw.date),
    sort: SORTS.includes(sort) ? sort : "relevance",
    page: Number.isFinite(page) && page > 0 ? page : 1,
  };
}

export function toSearchString(query: Partial<SearchQuery> & { type?: SearchType }) {
  const params = new URLSearchParams();
  const entries: [string, string | number | undefined][] = [
    ["type", query.type],
    ["q", query.q],
    ["city", query.city],
    ["category", query.category],
    ["from", query.from],
    ["to", query.to],
    ["depart", query.depart],
    ["return", query.ret],
    ["passengers", query.passengers],
    ["trip", query.trip],
    ["cabin", query.cabin],
    ["stops", query.stops],
    ["destination", query.destination],
    ["checkIn", query.checkIn],
    ["checkOut", query.checkOut],
    ["guests", query.guests],
    ["rooms", query.rooms],
    ["brand", query.brand],
    ["amount", query.amount],
    ["origin", query.origin],
    ["minPrice", query.minPrice && query.minPrice > PRICE_MIN ? query.minPrice : ""],
    ["maxPrice", query.maxPrice && query.maxPrice < PRICE_MAX ? query.maxPrice : ""],
    ["date", query.date],
    ["sort", query.sort && query.sort !== "relevance" ? query.sort : ""],
    ["page", query.page && query.page > 1 ? query.page : ""],
  ];
  entries.forEach(([key, value]) => {
    if (value !== undefined && value !== null && String(value).length > 0) {
      params.set(key, String(value));
    }
  });
  const qs = params.toString();
  return qs ? `/search?${qs}` : "/search";
}

export function paginate<T>(items: T[], page: number, size = PAGE_SIZE) {
  const total = items.length;
  const pages = Math.max(1, Math.ceil(total / size));
  const current = Math.min(page, pages);
  const start = (current - 1) * size;
  return {
    items: items.slice(start, start + size),
    total,
    pages,
    page: current,
  };
}
