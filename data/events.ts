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
    title: "Amahle Keys Live",
    category: "Concerts",
    venue: "MetroVault Arena",
    city: "Johannesburg",
    offset: weekend.fri,
    hour: 20,
    minute: 0,
    price: 450,
    featured: true,
    trendingRank: 1,
    description:
      "Amahle Keys brings her piano-led pop show to MetroVault Arena, with the full band from her Highveld Sessions record. Expect a two-hour set, a string quartet on the ballads, and a closing encore written for Johannesburg.",
  },
  {
    title: "Midnight Republic",
    category: "Concerts",
    venue: "Atlantic Sound Hall",
    city: "Cape Town",
    offset: 9,
    hour: 21,
    minute: 0,
    price: 380,
    featured: true,
    description:
      "Indie quartet Midnight Republic play Atlantic Sound Hall on the last stop of their coastal tour. The room is standing downstairs and seated on the balcony, with doors opening an hour before showtime.",
  },
  {
    title: "Nomsa and the Tide",
    category: "Concerts",
    venue: "Umhlanga Music Hall",
    city: "Durban",
    offset: weekend.sat,
    hour: 19,
    minute: 30,
    price: 320,
    featured: true,
    description:
      "Jazz vocalist Nomsa Mthembu leads The Tide through original songs and Durban standards. The hall is seated, the bar opens at 18:00, and the first set starts promptly at half past seven.",
  },
  {
    title: "Lethabo Mokoena: Highveld Beats",
    category: "Concerts",
    venue: "Sandton Skyline Arena",
    city: "Johannesburg",
    offset: 16,
    hour: 20,
    minute: 0,
    price: 550,
    description:
      "Producer Lethabo Mokoena performs Highveld Beats with a live drummer, a four-piece horn line and guest vocalists. The show is seated on the floor and general admission on the terrace.",
  },
  {
    title: "Kwaito Rewind Reunion",
    category: "Concerts",
    venue: "Union Gardens Hall",
    city: "Pretoria",
    offset: 18,
    hour: 19,
    minute: 0,
    price: 295,
    description:
      "Three generations of kwaito artists share one stage for a retrospective that runs from the first radio hits to new collaborations. The hall has reserved seating and a standing circle at the back.",
  },
  {
    title: "Cape Town Philharmonic Spring Gala",
    category: "Concerts",
    venue: "The Golden Stage",
    city: "Cape Town",
    offset: weekend.sun,
    hour: 15,
    minute: 0,
    price: 280,
    featured: true,
    trendingRank: 6,
    description:
      "The Cape Town Philharmonic opens its spring gala with a programme of local premieres and film themes. Afternoon dress is welcome, and the concert runs for about two hours including interval.",
  },
  {
    title: "Bayfront Sessions",
    category: "Concerts",
    venue: "Bayview Open Air",
    city: "Port Elizabeth",
    offset: 21,
    hour: 18,
    minute: 0,
    price: 240,
    description:
      "An outdoor bill of Eastern Cape indie bands on the lawn above Kings Beach. Bring a low chair or a blanket. The site closes if wind speeds make the stage unsafe, and tickets stay valid for the rain date.",
  },
  {
    title: "AfroSoul Night with Zanele Dlamini",
    category: "Concerts",
    venue: "Ridge Park Dome",
    city: "Pretoria",
    offset: 27,
    hour: 20,
    minute: 0,
    price: 360,
    description:
      "Zanele Dlamini performs songs from her third album with a ten-piece band. The dome is fully seated, and a limited number of Premium tickets include a pre-show acoustic session.",
  },
  {
    title: "Salt and Sugar",
    category: "Theatre",
    venue: "Market Lane Playhouse",
    city: "Johannesburg",
    offset: weekend.fri,
    hour: 19,
    minute: 30,
    price: 220,
    featured: true,
    description:
      "A new play about two siblings reopening their grandmother's bakery in Fordsburg. The production runs 100 minutes without an interval, and the playhouse is an intimate 280-seat room.",
  },
  {
    title: "Ocean Letters",
    category: "Theatre",
    venue: "Waterfront Playhouse",
    city: "Cape Town",
    offset: 11,
    hour: 19,
    minute: 0,
    price: 260,
    description:
      "Ocean Letters follows a harbour clerk who starts answering letters addressed to ships that no longer dock. The set is built from reclaimed timber, and audio description is available on the Sunday matinee.",
  },
  {
    title: "Township Sun",
    category: "Theatre",
    venue: "Stable Theatre",
    city: "Durban",
    offset: weekend.sat,
    hour: 18,
    minute: 0,
    price: 190,
    description:
      "A music-theatre piece about a school choir preparing for a winter concert. The company performs in English and isiZulu, with surtitles projected above the stage.",
  },
  {
    title: "The Last Train to Park Station",
    category: "Theatre",
    venue: "Junction Theatre",
    city: "Johannesburg",
    offset: 23,
    hour: 19,
    minute: 30,
    price: 210,
    description:
      "Strangers share a delayed commuter carriage and the stories they usually keep to themselves. The play is staged in the round, so every seat is close to the action.",
  },
  {
    title: "Crown of Thorns",
    category: "Theatre",
    venue: "State Side Theatre",
    city: "Pretoria",
    offset: 30,
    hour: 19,
    minute: 0,
    price: 240,
    description:
      "A political drama set in a fictional capital newsroom during a single election night. Strong language and haze effects are used throughout. The running time is two hours plus interval.",
  },
  {
    title: "Waiting for the Tide",
    category: "Theatre",
    venue: "Bayview Theatre",
    city: "Port Elizabeth",
    offset: 14,
    hour: 19,
    minute: 0,
    price: 180,
    description:
      "A family returns to their childhood beach house and finds the rooms rearranged by someone else. The production is suitable for ages 12 and up.",
  },
  {
    title: "David Khumalo: No Filter",
    category: "Comedy",
    venue: "MetroVault Arena",
    city: "Johannesburg",
    offset: weekend.sat,
    hour: 20,
    minute: 0,
    price: 350,
    featured: true,
    trendingRank: 3,
    description:
      "David Khumalo's new stand-up hour covers family group chats, load-shedding recipes and the myth of a quiet weekend. The arena is seated, and latecomers are held at the door between bits.",
  },
  {
    title: "Laughs on Long Street",
    category: "Comedy",
    venue: "Long Street Laugh Loft",
    city: "Cape Town",
    offset: 8,
    hour: 20,
    minute: 30,
    price: 180,
    description:
      "Five Cape Town comedians share a late bill in a room above a bookshop. Seating is unreserved cabaret style, and the show includes a short improv closer.",
  },
  {
    title: "Roast of the Republic",
    category: "Comedy",
    venue: "Coastal Comedy Club",
    city: "Durban",
    offset: 19,
    hour: 20,
    minute: 0,
    price: 240,
    description:
      "A hosted roast of fictional public figures, written for a Durban crowd that knows the in-jokes. The club is 18+ and drinks are served at the table.",
  },
  {
    title: "Aunties and Uncles Comedy Night",
    category: "Comedy",
    venue: "Hatfield Laugh House",
    city: "Pretoria",
    offset: weekend.fri,
    hour: 19,
    minute: 0,
    price: 160,
    description:
      "A good-natured line-up about family politics, wedding seating plans and the uncle who brings a speaker to every braai. Doors open at 18:00 with a pre-show DJ.",
  },
  {
    title: "Stand-up by the Bay",
    category: "Comedy",
    venue: "Bayview Theatre",
    city: "Port Elizabeth",
    offset: 12,
    hour: 19,
    minute: 30,
    price: 150,
    description:
      "Local headliners and a visiting Johannesburg act share stories about harbour cities, family holidays and small-town radio. The theatre bar stays open through the interval.",
  },
  {
    title: "Late Night with Naledi",
    category: "Comedy",
    venue: "Rosebank Comedy Room",
    city: "Johannesburg",
    offset: 25,
    hour: 21,
    minute: 30,
    price: 200,
    description:
      "Naledi Pule hosts a tight 70-minute late show with two guests and a musical closer. The room is small, so Premium tickets are the front three rows only.",
  },
  {
    title: "Highveld Derby: Titans FC vs Coastal United",
    category: "Sport",
    venue: "Ridge Park Stadium",
    city: "Pretoria",
    offset: weekend.sat,
    hour: 15,
    minute: 0,
    price: 120,
    featured: true,
    trendingRank: 2,
    description:
      "The season's biggest league fixture kicks off at 15:00. Home supporters are in the north stand, away supporters in the south-east block, and bags larger than A4 are not allowed.",
  },
  {
    title: "Greenmile 10K and Expo",
    category: "Sport",
    venue: "Greenmile Athletics Park",
    city: "Cape Town",
    offset: weekend.sun,
    hour: 7,
    minute: 0,
    price: 180,
    description:
      "A timed 10 kilometre run along the Greenmile path, plus a Saturday expo for bib collection. Your ticket is your race entry and includes a finisher medal and a rail transfer back to the start.",
  },
  {
    title: "Harbour Rugby Sevens",
    category: "Sport",
    venue: "Harbour Rugby Ground",
    city: "Durban",
    offset: 15,
    hour: 12,
    minute: 0,
    price: 150,
    description:
      "Club sides from four provinces play a one-day sevens series beside the harbour. General admission is grass seating on the eastern bank, and VIP includes a shaded deck.",
  },
  {
    title: "Joburg Open Tennis Qualifiers",
    category: "Sport",
    venue: "Sandton Racquet Club",
    city: "Johannesburg",
    offset: 10,
    hour: 10,
    minute: 0,
    price: 90,
    description:
      "A day pass for the qualifying rounds on the outside courts. Play starts at 10:00 and the last match is scheduled before dusk. Centre-court seats are the Premium tier.",
  },
  {
    title: "National Swim Championships",
    category: "Sport",
    venue: "Newton Park Aquatic Centre",
    city: "Port Elizabeth",
    offset: 22,
    hour: 9,
    minute: 0,
    price: 80,
    description:
      "Heats and finals across two sessions, with junior relays in the morning and open finals at night. A day ticket covers both sessions and the results deck.",
  },
  {
    title: "Reef Grand Prix",
    category: "Sport",
    venue: "Highveld Raceway",
    city: "Johannesburg",
    offset: 33,
    hour: 13,
    minute: 0,
    price: 420,
    description:
      "Production cars race the short circuit east of the city. General admission includes the main grandstand, and Premium adds a paddock walk before noon. Ear protection is recommended.",
  },
  {
    title: "Lions vs Dolphins T20",
    category: "Sport",
    venue: "Union Oval",
    city: "Johannesburg",
    offset: 13,
    hour: 14,
    minute: 30,
    price: 110,
    description:
      "A Saturday T20 under lights if the match runs long. Grass embankments open two hours before the first ball, and outside food is welcome in General seats only.",
  },
  {
    title: "Dome Boxing: Main Event",
    category: "Sport",
    venue: "Summit Hall",
    city: "Pretoria",
    offset: 28,
    hour: 19,
    minute: 0,
    price: 300,
    description:
      "Four undercard bouts lead into a 12-round lightweight main event. The hall is seated ringside to the back row, and the broadcast delay means phones stay in pockets during rounds.",
  },
  {
    title: "Wild Coast Music Festival",
    category: "Festivals",
    venue: "Sunset Festival Grounds",
    city: "Port Elizabeth",
    offset: weekend.fri,
    hour: 14,
    minute: 0,
    price: 650,
    featured: true,
    trendingRank: 4,
    description:
      "A two-day music festival with three stages, a local food market and camping add-ons sold separately. Friday tickets also include Saturday entry. Re-entry is allowed with a wristband.",
  },
  {
    title: "Jozi Food and Wine Fair",
    category: "Festivals",
    venue: "Rosebank Gardens",
    city: "Johannesburg",
    offset: 17,
    hour: 11,
    minute: 0,
    price: 150,
    description:
      "Producers from Gauteng and the Cape pour tastings in the gardens behind the library. Your ticket includes a tasting glass and eight sample tokens. Extra tokens are sold on site.",
  },
  {
    title: "Cape Arts Week Opening",
    category: "Festivals",
    venue: "Vineyard Lawns",
    city: "Cape Town",
    offset: 20,
    hour: 16,
    minute: 0,
    price: 200,
    description:
      "The opening afternoon of Cape Arts Week gathers painters, choirs and a short film programme on the vineyard lawns. Blankets are provided for the sunset screening.",
  },
  {
    title: "Durban Cultural Carnival",
    category: "Festivals",
    venue: "Beachfront Festival Park",
    city: "Durban",
    offset: weekend.sun,
    hour: 11,
    minute: 0,
    price: 80,
    description:
      "A free-feeling beachfront carnival that is ticketed so the promenade stays comfortable. Parade groups, food stalls and a kids' craft tent run until 17:00.",
  },
  {
    title: "Pretoria Jacaranda Festival",
    category: "Festivals",
    venue: "Jacaranda Festival Grounds",
    city: "Pretoria",
    offset: 26,
    hour: 10,
    minute: 0,
    price: 100,
    description:
      "A spring street festival moved onto the grounds when the avenues are in bloom. Live stages, a plant market and a photography walk are included with entry.",
  },
  {
    title: "Highveld Electronic Picnic",
    category: "Festivals",
    venue: "Cradle Fields",
    city: "Johannesburg",
    offset: 35,
    hour: 13,
    minute: 0,
    price: 480,
    description:
      "Daytime electronic music on two outdoor stages west of the city. The picnic lawn allows low chairs. Stages close at 22:00 and return shuttles run until midnight.",
  },
  {
    title: "Circus Aurora",
    category: "Family",
    venue: "Sandton Skyline Arena",
    city: "Johannesburg",
    offset: weekend.sun,
    hour: 14,
    minute: 0,
    price: 195,
    featured: true,
    trendingRank: 5,
    description:
      "A contemporary circus with aerialists, a live band and no animal acts. The Sunday show is relaxed performance friendly, with a quiet room beside the foyer.",
  },
  {
    title: "The Little Baobab",
    category: "Family",
    venue: "Waterfront Playhouse",
    city: "Cape Town",
    offset: 7,
    hour: 11,
    minute: 0,
    price: 140,
    description:
      "A musical for ages four and up about a baobab that keeps the neighbourhood's stories. The running time is 55 minutes, and booster cushions are available at the door.",
  },
  {
    title: "Dinosaur Safari Experience",
    category: "Family",
    venue: "Aquarium Adventure Park",
    city: "Durban",
    offset: 24,
    hour: 10,
    minute: 0,
    price: 175,
    description:
      "A timed-entry walk through moving dinosaur scenes built inside the adventure park. Tickets include the reef tunnel. Last entry is 90 minutes before closing.",
  },
  {
    title: "Ice Kingdom on Tour",
    category: "Family",
    venue: "Summit Hall",
    city: "Pretoria",
    offset: 29,
    hour: 15,
    minute: 0,
    price: 230,
    description:
      "Skating champions perform a story about a travelling winter fair. The ice stays cold, so a light jacket is useful even in summer. Under-twos sit on a lap for free if a ticket is not required by the row.",
  },
  {
    title: "Harbour Puppet Picnic",
    category: "Family",
    venue: "King's Beach Events Lawn",
    city: "Port Elizabeth",
    offset: 6,
    hour: 10,
    minute: 30,
    price: 90,
    description:
      "Puppeteers perform three short shows on the lawn, with craft tables between sets. The ticket covers one child and one accompanying adult. Extra adults need their own pass.",
  },
  {
    title: "Weekend Makers Workshop",
    category: "Family",
    venue: "Brooklyn Arts Theatre",
    city: "Pretoria",
    offset: weekend.sun,
    hour: 9,
    minute: 30,
    price: 160,
    description:
      "A hands-on morning for ages 7 to 12 building a small shadow-puppet theatre to take home. Materials are included. Each child must be accompanied by an adult who does not need a separate ticket.",
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

export const events: EventItem[] = seeds.map((seed, index) => ({
  id: `evt-${String(index + 1).padStart(2, "0")}`,
  slug: slugify(seed.title),
  title: seed.title,
  category: seed.category,
  venue: seed.venue,
  city: seed.city,
  date: addUtcDays(seed.offset, seed.hour, seed.minute),
  priceFrom: seed.price,
  image: eventPhoto(seed.category, index, 960, 600),
  description: seed.description,
  tiers: tiersFor(seed.price),
  featured: Boolean(seed.featured),
  trendingRank: seed.trendingRank ?? null,
}));
