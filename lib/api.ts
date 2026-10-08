import { flightDeals, busDeals, stayDeals } from "@/data/deals";
import { events } from "@/data/events";
import { faqs } from "@/data/faq";
import { categoryTiles, heroSlides } from "@/data/categories";
import { stores } from "@/data/stores";
import { vouchers } from "@/data/vouchers";
import type {
  BusDeal,
  EventItem,
  FlightDeal,
  SearchQuery,
  StayDeal,
  Voucher,
} from "@/types";
import { isoDateOnly, paginate, weekendOffsets } from "@/lib/utils";
import { addUtcDays } from "@/lib/utils";

function wait(min = 400, max = 800) {
  const duration = min + Math.floor(Math.random() * (max - min + 1));
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export async function getHeroSlides() {
  return heroSlides;
}

export async function getCategoryTiles() {
  await wait();
  return categoryTiles;
}

export async function getEvents() {
  await wait();
  return events;
}

export async function getEventBySlug(slug: string) {
  await wait();
  return events.find((event) => event.slug === slug) ?? null;
}

export async function getFeaturedEvents() {
  await wait();
  return events.filter((event) => event.featured);
}

export async function getTrendingEvents() {
  await wait();
  return events
    .filter((event) => event.trendingRank !== null)
    .sort((a, b) => (a.trendingRank ?? 0) - (b.trendingRank ?? 0));
}

export async function getThisWeekend() {
  await wait();
  const offsets = weekendOffsets();
  const keys = {
    fri: isoDateOnly(addUtcDays(offsets.fri)),
    sat: isoDateOnly(addUtcDays(offsets.sat)),
    sun: isoDateOnly(addUtcDays(offsets.sun)),
  };
  const grouped = {
    fri: events.filter((event) => isoDateOnly(event.date) === keys.fri),
    sat: events.filter((event) => isoDateOnly(event.date) === keys.sat),
    sun: events.filter((event) => isoDateOnly(event.date) === keys.sun),
    labels: keys,
  };
  return grouped;
}

export async function getRelatedEvents(slug: string) {
  await wait(300, 500);
  const current = events.find((event) => event.slug === slug);
  if (!current) return [];
  const sameCategory = events.filter(
    (event) => event.category === current.category && event.slug !== slug,
  );
  const rest = events.filter(
    (event) => event.category !== current.category && event.slug !== slug,
  );
  return [...sameCategory, ...rest].slice(0, 4);
}

export async function suggestEvents(query: string) {
  await wait(200, 350);
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  return events
    .filter((event) =>
      [event.title, event.venue, event.city, event.category].join(" ").toLowerCase().includes(q),
    )
    .slice(0, 6);
}

function eventScore(event: EventItem, q: string) {
  if (!q) return 0;
  const title = event.title.toLowerCase();
  const haystack = `${event.venue} ${event.city} ${event.category}`.toLowerCase();
  const description = event.description.toLowerCase();
  if (title.startsWith(q)) return 5;
  if (title.includes(q)) return 4;
  if (haystack.includes(q)) return 3;
  if (description.includes(q)) return 1;
  return 0;
}

function sortEvents(list: EventItem[], query: SearchQuery) {
  const copy = [...list];
  if (query.sort === "price-asc") {
    copy.sort((a, b) => a.priceFrom - b.priceFrom);
  } else if (query.sort === "price-desc") {
    copy.sort((a, b) => b.priceFrom - a.priceFrom);
  } else if (query.sort === "date") {
    copy.sort((a, b) => a.date.localeCompare(b.date));
  } else {
    copy.sort((a, b) => {
      const score = eventScore(b, query.q.toLowerCase()) - eventScore(a, query.q.toLowerCase());
      if (score !== 0) return score;
      return a.date.localeCompare(b.date);
    });
  }
  return copy;
}

export async function searchEvents(query: SearchQuery) {
  await wait();
  const q = query.q.toLowerCase();
  let list = events.filter((event) => {
    const matchesQuery =
      !q ||
      [event.title, event.venue, event.city, event.category, event.description]
        .join(" ")
        .toLowerCase()
        .includes(q);
    const matchesCity = !query.city || event.city === query.city;
    const matchesCategory = !query.category || event.category === query.category;
    const matchesPrice = event.priceFrom >= query.minPrice && event.priceFrom <= query.maxPrice;
    const day = isoDateOnly(event.date);
    const matchesFrom = !query.from || day >= query.from;
    const matchesTo = !query.to || day <= query.to;
    const matchesDate = !query.date || day === query.date;
    return matchesQuery && matchesCity && matchesCategory && matchesPrice && matchesFrom && matchesTo && matchesDate;
  });
  list = sortEvents(list, query);
  return paginate(list, query.page);
}

function includesCity(value: string, query: string) {
  if (!query) return true;
  return value.toLowerCase().includes(query.toLowerCase());
}

export async function searchFlights(query: SearchQuery) {
  await wait();
  let list = flightDeals.filter((deal) => {
    const fromOk = !query.origin && !query.from ? true : includesCity(deal.from, query.origin || query.from);
    const toOk = !query.to || includesCity(deal.to, query.to);
    const text = `${deal.from} ${deal.to} ${deal.airline}`.toLowerCase();
    const qOk = !query.q || text.includes(query.q.toLowerCase());
    const priceOk = deal.price >= query.minPrice && deal.price <= query.maxPrice;
    return fromOk && toOk && qOk && priceOk;
  });
  list = sortByPrice(list, query.sort);
  return paginate(list, query.page);
}

export async function searchBuses(query: SearchQuery) {
  await wait();
  let list = busDeals.filter((deal) => {
    const fromOk = !query.origin && !query.from ? true : includesCity(deal.from, query.origin || query.from);
    const toOk = !query.to || includesCity(deal.to, query.to);
    const text = `${deal.from} ${deal.to} ${deal.operator}`.toLowerCase();
    const qOk = !query.q || text.includes(query.q.toLowerCase());
    const priceOk = deal.price >= query.minPrice && deal.price <= query.maxPrice;
    return fromOk && toOk && qOk && priceOk;
  });
  list = sortByPrice(list, query.sort);
  return paginate(list, query.page);
}

export async function searchStays(query: SearchQuery) {
  await wait();
  const place = query.destination || query.city || query.q;
  let list = stayDeals.filter((deal) => {
    const placeOk =
      !place ||
      `${deal.city} ${deal.area} ${deal.name}`.toLowerCase().includes(place.toLowerCase());
    const priceOk = deal.pricePerNight >= query.minPrice && deal.pricePerNight <= query.maxPrice;
    return placeOk && priceOk;
  });
  if (query.sort === "price-asc") list = [...list].sort((a, b) => a.pricePerNight - b.pricePerNight);
  else if (query.sort === "price-desc") list = [...list].sort((a, b) => b.pricePerNight - a.pricePerNight);
  else if (query.sort === "date") list = [...list].sort((a, b) => b.rating - a.rating);
  return paginate(list, query.page);
}

export async function searchVouchers(query: SearchQuery) {
  await wait();
  const amount = Number.parseInt(query.amount, 10);
  let list = vouchers.filter((voucher) => {
    const brandOk = !query.brand || voucher.brand === query.brand;
    const qOk =
      !query.q ||
      `${voucher.brand} ${voucher.category} ${voucher.description}`.toLowerCase().includes(query.q.toLowerCase());
    const amountOk =
      !query.amount ||
      (Number.isFinite(amount) && amount >= voucher.minAmount && amount <= voucher.maxAmount);
    return brandOk && qOk && amountOk;
  });
  if (query.sort === "price-asc") list = [...list].sort((a, b) => a.minAmount - b.minAmount);
  else if (query.sort === "price-desc") list = [...list].sort((a, b) => b.maxAmount - a.maxAmount);
  return paginate(list, query.page);
}

function sortByPrice<T extends { price: number }>(list: T[], sort: SearchQuery["sort"]) {
  if (sort === "price-asc") return [...list].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") return [...list].sort((a, b) => b.price - a.price);
  return list;
}

export async function getFlightDeals() {
  await wait();
  return flightDeals;
}

export async function getBusDeals() {
  await wait();
  return busDeals;
}

export async function getStayDeals() {
  await wait();
  return stayDeals;
}

export async function getTravelDeals() {
  await wait();
  return {
    flights: flightDeals.slice(0, 6),
    buses: busDeals.slice(0, 6),
    stays: stayDeals.slice(0, 6),
  };
}

export async function getVouchers() {
  await wait();
  return vouchers;
}

export async function getStores() {
  await wait();
  return stores;
}

export async function getFaqs() {
  await wait();
  return faqs;
}

export type FlightResults = Awaited<ReturnType<typeof searchFlights>>;
export type BusResults = Awaited<ReturnType<typeof searchBuses>>;
export type StayResults = Awaited<ReturnType<typeof searchStays>>;
export type VoucherResults = Awaited<ReturnType<typeof searchVouchers>>;
export type EventResults = Awaited<ReturnType<typeof searchEvents>>;

export type { FlightDeal, BusDeal, StayDeal, Voucher };
