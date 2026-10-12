import type { City, EventCategory, EventItem, TicketTier } from "@/types";
import { eventPhoto } from "@/lib/photo-library";
import { addUtcDays, slugify, weekendOffsets } from "@/lib/utils";

type Seed = {
  title: string;
  category: EventCategory;
  venue: string;
  city: City;
  offset: number;
  hour: number;
  minute: number;
  price: number;
  description: string;
  featured?: boolean;
  trendingRank?: number;
};

const weekend = weekendOffsets();

const seeds: Seed[] = [
  {
    title: "Harare Family Discovery Day",
    category: "Family",
    venue: "Harare Gardens",
    city: "Harare",
    offset: 12,
    hour: 10,
    minute: 0,
    price: 80,
    description:
      "A relaxed day of outdoor games, nature activities and creative workshops for children and their families. Activities are drop-in, with shaded rest areas and food stalls on site.",
    featured: true,
    trendingRank: 10,
  },
  {
    title: "Bulawayo Junior Adventure Trail",
    category: "Family",
    venue: "Centenary Park",
    city: "Bulawayo",
    offset: 15,
    hour: 9,
    minute: 30,
    price: 65,
    description:
      "Families follow a child-friendly nature trail with simple discovery challenges, outdoor play and a picnic stop. Comfortable shoes and a refillable water bottle are recommended.",
    featured: true,
    trendingRank: 9,
  },
  {
    title: "Mutare Family Nature Weekend",
    category: "Family",
    venue: "Vumba Botanical Gardens",
    city: "Mutare",
    offset: 19,
    hour: 10,
    minute: 0,
    price: 110,
    description:
      "A weekend outdoors with guided garden walks, wildlife spotting and hands-on activities for young explorers. Children must stay with an accompanying adult during the walks.",
  },
  {
    title: "Gweru Kids Carnival",
    category: "Family",
    venue: "Midlands Showgrounds",
    city: "Gweru",
    offset: 22,
    hour: 11,
    minute: 0,
    price: 95,
    description:
      "A family carnival with games, music, face painting and activity zones for different age groups. Entry includes access to the outdoor play area; food and ride tokens are sold separately.",
  },
  {
    title: "Victoria Falls Family Adventure Day",
    category: "Family",
    venue: "Victoria Falls Recreation Park",
    city: "Victoria Falls",
    offset: 28,
    hour: 9,
    minute: 0,
    price: 130,
    description:
      "A guided outdoor day for families with easy walks, nature activities and picnic time. The route is designed for children, with breaks and a shorter option for younger visitors.",
    featured: true,
    trendingRank: 8,
  },
  {
    title: "Chitungwiza Play and Create Festival",
    category: "Family",
    venue: "Chitungwiza Community Grounds",
    city: "Chitungwiza",
    offset: 32,
    hour: 10,
    minute: 30,
    price: 75,
    description:
      "A community day for families with art tables, outdoor games, storytelling and live performances for children. All craft materials are included with entry.",
  },
  {
    title: "Harare Afrobeats Live",
    category: "Concerts",
    venue: "Harare International Conference Centre",
    city: "Harare",
    offset: 38,
    hour: 19,
    minute: 0,
    price: 180,
    description:
      "A live Afrobeats show featuring Zimbabwean vocalists, a full backing band and guest performers. Doors open one hour before the show.",
    featured: true,
    trendingRank: 1,
  },
  {
    title: "Bulawayo Sound Sessions",
    category: "Concerts",
    venue: "Hillside Dams Pavilion",
    city: "Bulawayo",
    offset: 42,
    hour: 18,
    minute: 30,
    price: 120,
    description:
      "An outdoor evening of local live music with food stalls and a relaxed seating area. Bring a light jacket for the late set.",
    featured: true,
    trendingRank: 2,
  },
  {
    title: "Harare Stories on Stage",
    category: "Theatre",
    venue: "Reps Theatre",
    city: "Harare",
    offset: 37,
    hour: 19,
    minute: 0,
    price: 100,
    description:
      "A contemporary ensemble play drawing on family stories and city life, performed in English and Shona. The production runs for 90 minutes.",
    featured: true,
    trendingRank: 3,
  },
  {
    title: "Bulawayo Stage Voices",
    category: "Theatre",
    venue: "Amakhosi Cultural Centre",
    city: "Bulawayo",
    offset: 40,
    hour: 18,
    minute: 30,
    price: 90,
    description:
      "Local performers bring a new drama about friendship and change to the stage. The show includes live percussion and a short post-performance discussion.",
  },
  {
    title: "Mutare Theatre in the Hills",
    category: "Theatre",
    venue: "Mutare Arts Centre",
    city: "Mutare",
    offset: 44,
    hour: 19,
    minute: 0,
    price: 85,
    description:
      "An intimate evening of short plays by Eastern Highlands writers, performed by a local cast. Suitable for audiences aged 12 and up.",
  },
  {
    title: "Gweru Community Players",
    category: "Theatre",
    venue: "Midlands Theatre Hall",
    city: "Gweru",
    offset: 48,
    hour: 18,
    minute: 0,
    price: 70,
    description:
      "A community theatre performance with new Zimbabwean stories, expressive costumes and live music. Doors open 30 minutes before curtain.",
  },
  {
    title: "Harare Laughs Live",
    category: "Comedy",
    venue: "Theatre in the Park",
    city: "Harare",
    offset: 36,
    hour: 20,
    minute: 0,
    price: 100,
    description:
      "Zimbabwean comics take turns with fresh stand-up sets about everyday life, family and city culture. Recommended for ages 16 and up.",
    featured: true,
    trendingRank: 4,
  },
  {
    title: "Bulawayo Comedy Night",
    category: "Comedy",
    venue: "Bulawayo Theatre",
    city: "Bulawayo",
    offset: 39,
    hour: 19,
    minute: 30,
    price: 90,
    description:
      "A lively stand-up bill featuring local comedians and a guest host. Seating is unreserved, so arrive early to sit with your group.",
  },
  {
    title: "Mutare Mic Drop",
    category: "Comedy",
    venue: "Christmas Pass Hotel Hall",
    city: "Mutare",
    offset: 43,
    hour: 19,
    minute: 0,
    price: 75,
    description:
      "An evening of live comedy featuring emerging performers from across the Eastern Highlands. Food and refreshments are available at the venue.",
  },
  {
    title: "Gweru Side-Splitting Sessions",
    category: "Comedy",
    venue: "Gweru Civic Centre",
    city: "Gweru",
    offset: 47,
    hour: 20,
    minute: 0,
    price: 80,
    description:
      "A rotating line-up of Zimbabwean comedians brings original stories and crowd work to a friendly local stage. This show is intended for adult audiences.",
  },
  {
    title: "Harare Rugby Sevens",
    category: "Sport",
    venue: "Harare Sports Club",
    city: "Harare",
    offset: 41,
    hour: 10,
    minute: 0,
    price: 100,
    description:
      "A full day of fast-paced sevens rugby featuring local clubs and youth fixtures. General admission includes access to the open spectator areas.",
    featured: true,
    trendingRank: 5,
  },
  {
    title: "Bulawayo Track and Field Open",
    category: "Sport",
    venue: "White City Stadium",
    city: "Bulawayo",
    offset: 46,
    hour: 9,
    minute: 0,
    price: 60,
    description:
      "Athletes compete in sprint, distance and field events throughout the day. Family seating is available near the finish line.",
  },
  {
    title: "Harare Culture and Arts Festival",
    category: "Festivals",
    venue: "Mukuvisi Woodlands",
    city: "Harare",
    offset: 45,
    hour: 10,
    minute: 0,
    price: 120,
    description:
      "A day of Zimbabwean music, dance, crafts and food with performances from artists across the country. The outdoor programme runs until sunset.",
    featured: true,
    trendingRank: 6,
  },
  {
    title: "Bulawayo Heritage Carnival",
    category: "Festivals",
    venue: "Centenary Park",
    city: "Bulawayo",
    offset: 49,
    hour: 11,
    minute: 0,
    price: 95,
    description:
      "A colourful community parade followed by live music, dance and local food stalls celebrating the region's cultural heritage.",
  },
  {
    title: "Mutare Highlands Music Gathering",
    category: "Festivals",
    venue: "Vumba Botanical Gardens",
    city: "Mutare",
    offset: 52,
    hour: 12,
    minute: 0,
    price: 140,
    description:
      "An open-air gathering of musicians, dancers and makers in a scenic garden setting. Entry includes the main stage programme and artisan market.",
    featured: true,
    trendingRank: 7,
  },
  {
    title: "Gweru Dance and Drum Festival",
    category: "Festivals",
    venue: "Midlands Showgrounds",
    city: "Gweru",
    offset: 55,
    hour: 10,
    minute: 30,
    price: 80,
    description:
      "Traditional and contemporary dance groups share the stage alongside local drummers and craft vendors. Children under six enter free with an adult.",
  },
];

function tiersFor(price: number): TicketTier[] {
  return [
    {
      id: "general",
      name: "General",
      price,
      description: "Standard seating with a clear view and instant e-ticket delivery.",
    },
    {
      id: "vip",
      name: "VIP",
      price: Math.round(price * 1.8),
      description: "Priority entry, a premium seat and a complimentary drink voucher.",
    },
    {
      id: "premium",
      name: "Premium",
      price: Math.round(price * 2.6),
      description: "Front-section seating, lounge access and a small merchandise voucher.",
    },
  ];
}

const categoryPhotoIndexes = new Map<EventCategory, number>();

export const events: EventItem[] = seeds.map((seed, index) => {
  const photoIndex = categoryPhotoIndexes.get(seed.category) ?? 0;
  categoryPhotoIndexes.set(seed.category, photoIndex + 1);
  return {
    id: `evt-${String(index + 1).padStart(2, "0")}`,
    slug: slugify(seed.title),
    title: seed.title,
    category: seed.category,
    venue: seed.venue,
    city: seed.city,
    date: addUtcDays(seed.offset, seed.hour, seed.minute),
    priceFrom: seed.price,
    image: eventPhoto(seed.category, photoIndex, 960, 600),
    description: seed.description,
    tiers: tiersFor(seed.price),
    featured: Boolean(seed.featured),
    trendingRank: seed.trendingRank ?? null,
  };
});
