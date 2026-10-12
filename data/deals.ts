import type { BusDeal, FlightDeal, StayDeal } from "@/types";
import { ZIMBABWE_URBAN_CENTRES } from "@/types";
import { photoUrl } from "@/lib/photo-library";

const travelPhotos = {
  fl: [
    "1436491865332-7a61a109cc05",
    "1542296332-2e4473faf563",
    "1538300984265-c1a65a392270",
    "1523815278426-dc88c0e8bb85",
    "1660081222307-0cb981510800",
    "1774244764311-8f50dd59eb75",
    "1790175483330-c24efd2717ae",
    "1668700431206-ea06f26d4f24",
    "1495611869653-166316536321",
    "1715262436672-1858920c0e2d",
    "1692264086612-02c791cd6d13",
    "1658970484712-03e2b79bacec",
  ],
  bus: [
    "1544620347-c4fd4a3d5957",
    "1570125909232-eb263c188f7e",
    "1601584115197-04ecc0da31d7",
    "1570118054363-ff4d296962f5",
    "1554460196-e6afa9dc66b4",
    "1695216330452-036e38f0033c",
    "1776855273007-494dc2121494",
    "1759882608768-168d4c3a91c2",
    "1624234595056-84d46b56ccc4",
    "1744909316221-c8fbbec4b162",
    "1752563247435-8b1ee6107121",
    "1525088052208-6cbaedf3981a",
  ],
  stay: [
    "1566073771259-6a8506099945",
    "1551882547-ff40c63fe5fa",
    "1582719478250-c89cae4dc85b",
    "1542314831-068cd1dbfeeb",
    "1571896349842-33c89424de2d",
  ],
};

function dealPhoto(seed: string) {
  const [, category, sequence] = seed.split("-");
  const photos = travelPhotos[category as keyof typeof travelPhotos];
  const index = (Number(sequence) - 1) % photos.length;
  return photoUrl(photos[index], 900, 560);
}

export const flightDeals: FlightDeal[] = [
  { id: "fl-01", from: "Harare", to: "Victoria Falls", fromCode: "HRE", toCode: "VFA", airline: "Fastjet Zimbabwe", price: 210, duration: "1h 05m", stops: "Direct", image: dealPhoto("th-fl-01") },
  { id: "fl-02", from: "Harare", to: "Bulawayo", fromCode: "HRE", toCode: "BUQ", airline: "Air Zimbabwe", price: 145, duration: "1h 00m", stops: "Direct", image: dealPhoto("th-fl-02") },
  { id: "fl-03", from: "Bulawayo", to: "Harare", fromCode: "BUQ", toCode: "HRE", airline: "Air Zimbabwe", price: 150, duration: "1h 00m", stops: "Direct", image: dealPhoto("th-fl-03") },
  { id: "fl-04", from: "Victoria Falls", to: "Harare", fromCode: "VFA", toCode: "HRE", airline: "Fastjet Zimbabwe", price: 225, duration: "1h 05m", stops: "Direct", image: dealPhoto("th-fl-04") },
  { id: "fl-05", from: "Bulawayo", to: "Victoria Falls", fromCode: "BUQ", toCode: "VFA", airline: "Air Zimbabwe", price: 175, duration: "1h 10m", stops: "Direct", image: dealPhoto("th-fl-05") },
  { id: "fl-06", from: "Victoria Falls", to: "Bulawayo", fromCode: "VFA", toCode: "BUQ", airline: "Fastjet Zimbabwe", price: 180, duration: "1h 10m", stops: "Direct", image: dealPhoto("th-fl-06") },
];

export const busDeals: BusDeal[] = [
  { id: "bus-01", from: "Harare", to: "Bulawayo", operator: "Zim Intercity Coach", price: 25, duration: "5h 30m", departs: "07:30", image: dealPhoto("th-bus-01") },
  { id: "bus-02", from: "Harare", to: "Mutare", operator: "Eastern Highlands Express", price: 18, duration: "4h 15m", departs: "08:00", image: dealPhoto("th-bus-02") },
  { id: "bus-03", from: "Harare", to: "Gweru", operator: "Zim Intercity Coach", price: 16, duration: "3h 45m", departs: "09:15", image: dealPhoto("th-bus-03") },
  { id: "bus-04", from: "Harare", to: "Masvingo", operator: "Great Zimbabwe Coaches", price: 20, duration: "4h 00m", departs: "06:45", image: "/intercity-express.png" },
  { id: "bus-05", from: "Harare", to: "Victoria Falls", operator: "Zambezi Express", price: 38, duration: "12h 00m", departs: "18:00", image: dealPhoto("th-bus-05") },
  { id: "bus-06", from: "Harare", to: "Chinhoyi", operator: "Mashonaland Coaches", price: 10, duration: "2h 15m", departs: "10:00", image: dealPhoto("th-bus-06") },
  { id: "bus-07", from: "Bulawayo", to: "Victoria Falls", operator: "Zambezi Express", price: 24, duration: "6h 00m", departs: "07:00", image: dealPhoto("th-bus-07") },
  { id: "bus-08", from: "Bulawayo", to: "Gweru", operator: "Midlands Link", price: 14, duration: "2h 45m", departs: "08:30", image: dealPhoto("th-bus-08") },
  { id: "bus-09", from: "Mutare", to: "Harare", operator: "Eastern Highlands Express", price: 18, duration: "4h 15m", departs: "15:30", image: dealPhoto("th-bus-09") },
  { id: "bus-10", from: "Masvingo", to: "Bulawayo", operator: "Great Zimbabwe Coaches", price: 22, duration: "4h 45m", departs: "09:00", image: dealPhoto("th-bus-10") },
  { id: "bus-11", from: "Gweru", to: "Kwekwe", operator: "Midlands Link", price: 8, duration: "1h 10m", departs: "11:00", image: dealPhoto("th-bus-11") },
  { id: "bus-12", from: "Harare", to: "Beitbridge", operator: "Southbound Zimbabwe Coaches", price: 35, duration: "9h 00m", departs: "20:30", image: dealPhoto("th-bus-12") },
];

export const stayDeals: StayDeal[] = [
  { id: "stay-01", name: "Avenues City Hotel", city: "Harare", area: "Avenues", rating: 4.6, reviewCount: 812, pricePerNight: 78, type: "Hotel", image: dealPhoto("th-stay-01"), isAvailable: true },
  { id: "stay-02", name: "Borrowdale Garden Suites", city: "Harare", area: "Borrowdale", rating: 4.8, reviewCount: 1260, pricePerNight: 115, type: "Suite", image: dealPhoto("th-stay-02"), isAvailable: true },
  { id: "stay-03", name: "Bulawayo Central Lodge", city: "Bulawayo", area: "City Centre", rating: 4.7, reviewCount: 980, pricePerNight: 82, type: "Hotel", image: dealPhoto("th-stay-03"), isAvailable: true },
  { id: "stay-04", name: "Hillside Guest House", city: "Bulawayo", area: "Hillside", rating: 4.5, reviewCount: 430, pricePerNight: 64, type: "Guesthouse", image: dealPhoto("th-stay-04"), isAvailable: true },
  { id: "stay-05", name: "Victoria Falls River Lodge", city: "Victoria Falls", area: "Victoria Falls Town Centre", rating: 4.9, reviewCount: 640, pricePerNight: 220, type: "Lodge", image: dealPhoto("th-stay-05"), isAvailable: true },
  { id: "stay-06", name: "Zambezi View Rooms", city: "Victoria Falls", area: "Chinotimba", rating: 4.6, reviewCount: 288, pricePerNight: 128, type: "Guesthouse", image: dealPhoto("th-stay-06"), isAvailable: false },
  { id: "stay-07", name: "Vumba Hills Retreat", city: "Mutare", area: "Vumba", rating: 4.7, reviewCount: 510, pricePerNight: 105, type: "Hotel", image: dealPhoto("th-stay-07"), isAvailable: true },
  { id: "stay-08", name: "Eastern Highlands Stay", city: "Mutare", area: "Greenside", rating: 4.4, reviewCount: 190, pricePerNight: 69, type: "Apart-hotel", image: dealPhoto("th-stay-08"), isAvailable: false },
  { id: "stay-09", name: "Great Zimbabwe Inn", city: "Masvingo", area: "Rhodene", rating: 4.6, reviewCount: 705, pricePerNight: 72, type: "Hotel", image: dealPhoto("th-stay-09"), isAvailable: true },
  { id: "stay-10", name: "Lake Kariba House", city: "Kariba", area: "Mahombekombe", rating: 4.4, reviewCount: 256, pricePerNight: 98, type: "Lodge", image: dealPhoto("th-stay-10"), isAvailable: true },
  { id: "stay-11", name: "Midlands Guest Rooms", city: "Gweru", area: "Ascot", rating: 4.5, reviewCount: 348, pricePerNight: 58, type: "Guesthouse", image: dealPhoto("th-stay-11"), isAvailable: true },
  { id: "stay-12", name: "Kwekwe Town Suites", city: "Kwekwe", area: "Newtown", rating: 4.3, reviewCount: 402, pricePerNight: 62, type: "Hotel", image: dealPhoto("th-stay-12"), isAvailable: true },
];

const citiesWithStayListings = new Set(stayDeals.map((stay) => stay.city));
const additionalZimbabweStays: StayDeal[] = ZIMBABWE_URBAN_CENTRES
  .filter((city) => !citiesWithStayListings.has(city))
  .map((city, index) => ({
    id: `stay-zimbabwe-${city.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    name: `${city} Central Guest House`,
    city,
    area: "Town Centre",
    rating: 4.2 + (index % 7) / 10,
    reviewCount: 85 + index * 17,
    pricePerNight: 42 + (index % 8) * 8,
    type: "Guesthouse",
    image: photoUrl(travelPhotos.stay[index % travelPhotos.stay.length], 900, 560),
    isAvailable: true,
  }));

stayDeals.push(...additionalZimbabweStays);
