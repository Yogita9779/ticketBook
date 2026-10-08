import type { CategoryTile, HeroSlide, MegaColumn } from "@/types";
import { categoryPhoto } from "@/lib/photo-library";

export const heroSlides: HeroSlide[] = [
  {
    id: "hero-concerts",
    title: "Live music under the highveld sky",
    subtitle: "Concerts, festivals and late-night sessions across South Africa.",
    cta: "Browse concerts",
    href: "/search?type=events&category=Concerts",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=2000&q=85",
    imageAlt: "Crowd at an outdoor evening concert",
  },
  {
    id: "hero-flights",
    title: "Weekend escapes from R899",
    subtitle: "Compare flight deals between Johannesburg, Cape Town, Durban and beyond.",
    cta: "Search flights",
    href: "/flights",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=85",
    imageAlt: "Aircraft wing above a coastline at sunrise",
  },
  {
    id: "hero-theatre",
    title: "The new theatre season is open",
    subtitle: "Musicals, plays and comedy specials with seats you can book in minutes.",
    cta: "Explore theatre",
    href: "/search?type=events&category=Theatre",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=2000&q=85",
    imageAlt: "Theatre stage lit by warm spotlights",
  },
  {
    id: "hero-vouchers",
    title: "Digital vouchers for every occasion",
    subtitle: "Send a gift card instantly for dining, shopping, travel and more.",
    cta: "Shop vouchers",
    href: "/vouchers",
    image: "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=2000&q=85",
    imageAlt: "Wrapped gift boxes on a table",
  },
];

export const eventMegaMenu: MegaColumn[] = [
  {
    title: "Concerts",
    href: "/search?type=events&category=Concerts",
    links: [
      { label: "Pop & Rock", href: "/search?type=events&category=Concerts&q=pop" },
      { label: "Jazz & Soul", href: "/search?type=events&category=Concerts&q=jazz" },
      { label: "Hip Hop", href: "/search?type=events&category=Concerts&q=hip%20hop" },
      { label: "Afrobeats", href: "/search?type=events&category=Concerts&q=afro" },
      { label: "Classical", href: "/search?type=events&category=Concerts&q=philharmonic" },
    ],
  },
  {
    title: "Theatre & Comedy",
    href: "/search?type=events&category=Theatre",
    links: [
      { label: "Musicals", href: "/search?type=events&category=Theatre&q=musical" },
      { label: "Plays", href: "/search?type=events&category=Theatre&q=play" },
      { label: "Stand-up", href: "/search?type=events&category=Comedy" },
      { label: "Improv", href: "/search?type=events&category=Comedy&q=improv" },
      { label: "Drama", href: "/search?type=events&category=Theatre&q=drama" },
    ],
  },
  {
    title: "Sport",
    href: "/search?type=events&category=Sport",
    links: [
      { label: "Football", href: "/search?type=events&category=Sport&q=football" },
      { label: "Rugby", href: "/search?type=events&category=Sport&q=rugby" },
      { label: "Cricket", href: "/search?type=events&category=Sport&q=cricket" },
      { label: "Athletics", href: "/search?type=events&category=Sport&q=athletics" },
      { label: "Motorsport", href: "/search?type=events&category=Sport&q=motorsport" },
    ],
  },
  {
    title: "Festivals",
    href: "/search?type=events&category=Festivals",
    links: [
      { label: "Music Festivals", href: "/search?type=events&category=Festivals&q=music" },
      { label: "Food & Wine", href: "/search?type=events&category=Festivals&q=food" },
      { label: "Arts", href: "/search?type=events&category=Festivals&q=arts" },
      { label: "Cultural", href: "/search?type=events&category=Festivals&q=cultural" },
      { label: "Outdoor", href: "/search?type=events&category=Festivals&q=outdoor" },
    ],
  },
  {
    title: "Family",
    href: "/search?type=events&category=Family",
    links: [
      { label: "Kids Shows", href: "/search?type=events&category=Family&q=kids" },
      { label: "Theme Parks", href: "/search?type=events&category=Family&q=adventure" },
      { label: "Circus", href: "/search?type=events&category=Family&q=circus" },
      { label: "Ice Shows", href: "/search?type=events&category=Family&q=ice" },
      { label: "Workshops", href: "/search?type=events&category=Family&q=workshop" },
    ],
  },
];

export const travelLinks = [
  { label: "Flights", href: "/flights", description: "Domestic fares and weekend specials" },
  { label: "Bus", href: "/bus", description: "Intercity coaches with reserved seats" },
  { label: "Stay", href: "/accommodation", description: "Hotels, lodges and city stays" },
];

export const categoryTiles: CategoryTile[] = [
  { name: "Concerts", category: "Concerts", image: categoryPhoto("Concerts", 800, 600), icon: "Music" },
  { name: "Theatre", category: "Theatre", image: categoryPhoto("Theatre", 800, 600), icon: "Drama" },
  { name: "Comedy", category: "Comedy", image: categoryPhoto("Comedy", 800, 600), icon: "Mic2" },
  { name: "Sport", category: "Sport", image: categoryPhoto("Sport", 800, 600), icon: "Trophy" },
  { name: "Festivals", category: "Festivals", image: categoryPhoto("Festivals", 800, 600), icon: "PartyPopper" },
  { name: "Family", category: "Family", image: categoryPhoto("Family", 800, 600), icon: "Users" },
  { name: "Travel", category: "Travel", image: categoryPhoto("Travel", 800, 600), icon: "Plane" },
  { name: "Vouchers", category: "Vouchers", image: categoryPhoto("Vouchers", 800, 600), icon: "Gift" },
];

export const airports = [
  { city: "Johannesburg", code: "JNB" },
  { city: "Cape Town", code: "CPT" },
  { city: "Durban", code: "DUR" },
  { city: "Port Elizabeth", code: "PLZ" },
  { city: "Pretoria", code: "HLA" },
  { city: "East London", code: "ELS" },
  { city: "George", code: "GRJ" },
  { city: "Bloemfontein", code: "BFN" },
];

export const busCities = [
  "Johannesburg",
  "Pretoria",
  "Cape Town",
  "Durban",
  "Port Elizabeth",
  "Bloemfontein",
  "East London",
  "Polokwane",
  "Nelspruit",
  "Kimberley",
];

export const voucherAmounts = [100, 250, 500, 1000, 2000];
