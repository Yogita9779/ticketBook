export const CITIES = [
  "Johannesburg",
  "Cape Town",
  "Durban",
  "Pretoria",
  "Port Elizabeth",
] as const;

export type City = (typeof CITIES)[number];

export const EVENT_CATEGORIES = [
  "Concerts",
  "Theatre",
  "Comedy",
  "Sport",
  "Festivals",
  "Family",
] as const;

export type EventCategory = (typeof EVENT_CATEGORIES)[number];

export type TicketTierName = "General" | "VIP" | "Premium";

export interface TicketTier {
  id: string;
  name: TicketTierName;
  price: number;
  description: string;
}

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  category: EventCategory;
  venue: string;
  city: City;
  date: string;
  priceFrom: number;
  image: string;
  description: string;
  tiers: TicketTier[];
  featured: boolean;
  trendingRank: number | null;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  image: string;
  imageAlt: string;
}

export interface MegaColumn {
  title: string;
  href: string;
  links: { label: string; href: string }[];
}

export interface CategoryTile {
  name: string;
  category: string;
  image: string;
  icon: "Music" | "Drama" | "Mic2" | "Trophy" | "PartyPopper" | "Users" | "Plane" | "Gift";
}

export interface FlightDeal {
  id: string;
  from: string;
  to: string;
  fromCode: string;
  toCode: string;
  airline: string;
  price: number;
  duration: string;
  stops: string;
  image: string;
}

export interface BusDeal {
  id: string;
  from: string;
  to: string;
  operator: string;
  price: number;
  duration: string;
  departs: string;
  image: string;
}

export interface StayDeal {
  id: string;
  name: string;
  city: string;
  area: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  type: string;
  image: string;
}

export interface Voucher {
  id: string;
  brand: string;
  category: string;
  minAmount: number;
  maxAmount: number;
  description: string;
  image: string;
}

export interface Store {
  id: string;
  name: string;
  city: City;
  address: string;
  hours: string;
  phone: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  topic: string;
}

export type SearchType = "events" | "flights" | "bus" | "accommodation" | "vouchers";

export type SortOption = "relevance" | "date" | "price-asc" | "price-desc";

export interface SearchQuery {
  type: SearchType;
  q: string;
  city: string;
  category: string;
  from: string;
  to: string;
  depart: string;
  ret: string;
  passengers: string;
  trip: string;
  cabin: string;
  stops: string;
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  rooms: string;
  brand: string;
  amount: string;
  origin: string;
  minPrice: number;
  maxPrice: number;
  date: string;
  sort: SortOption;
  page: number;
}

export interface CartLine {
  lineId: string;
  eventId: string;
  slug: string;
  title: string;
  image: string;
  venue: string;
  city: string;
  date: string;
  tierName: TicketTierName;
  unitPrice: number;
  quantity: number;
}

export type BookingStatus = "confirmed" | "pending" | "cancelled";

export interface Attendee {
  name: string;
  email: string;
  phone: string;
}

export interface Booking {
  id: string;
  eventId: string;
  slug: string;
  title: string;
  image: string;
  venue: string;
  city: string;
  date: string;
  category: EventCategory;
  tierName: TicketTierName;
  unitPrice: number;
  quantity: number;
  attendee: Attendee;
  status: BookingStatus;
  createdAt: string;
}

export interface AccountProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  detail: string;
  at: string;
  tone: "rose" | "emerald" | "amber" | "slate";
}

export interface AccountNotice {
  id: string;
  title: string;
  body: string;
  href: string;
  at: string;
  read: boolean;
}
