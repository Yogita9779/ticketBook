import type { BusDeal, FlightDeal, StayDeal } from "@/types";
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
  { id: "fl-01", from: "Johannesburg", to: "Cape Town", fromCode: "JNB", toCode: "CPT", airline: "FlySouth", price: 899, duration: "2h 05m", stops: "Direct", image: dealPhoto("th-fl-01") },
  { id: "fl-02", from: "Cape Town", to: "Durban", fromCode: "CPT", toCode: "DUR", airline: "Mzansi Air", price: 1040, duration: "2h 15m", stops: "Direct", image: dealPhoto("th-fl-02") },
  { id: "fl-03", from: "Johannesburg", to: "Durban", fromCode: "JNB", toCode: "DUR", airline: "Indwe Air", price: 720, duration: "1h 10m", stops: "Direct", image: dealPhoto("th-fl-03") },
  { id: "fl-04", from: "Durban", to: "Johannesburg", fromCode: "DUR", toCode: "JNB", airline: "SkyReef", price: 690, duration: "1h 15m", stops: "Direct", image: dealPhoto("th-fl-04") },
  { id: "fl-05", from: "Johannesburg", to: "Port Elizabeth", fromCode: "JNB", toCode: "PLZ", airline: "Coastal Wings", price: 980, duration: "1h 40m", stops: "Direct", image: dealPhoto("th-fl-05") },
  { id: "fl-06", from: "Cape Town", to: "Johannesburg", fromCode: "CPT", toCode: "JNB", airline: "FlySouth", price: 940, duration: "2h 10m", stops: "Direct", image: dealPhoto("th-fl-06") },
  { id: "fl-07", from: "Port Elizabeth", to: "Cape Town", fromCode: "PLZ", toCode: "CPT", airline: "Mzansi Air", price: 860, duration: "1h 25m", stops: "Direct", image: dealPhoto("th-fl-07") },
  { id: "fl-08", from: "Johannesburg", to: "George", fromCode: "JNB", toCode: "GRJ", airline: "Indwe Air", price: 1120, duration: "2h 00m", stops: "Direct", image: dealPhoto("th-fl-08") },
  { id: "fl-09", from: "Cape Town", to: "East London", fromCode: "CPT", toCode: "ELS", airline: "SkyReef", price: 1180, duration: "1h 35m", stops: "Direct", image: dealPhoto("th-fl-09") },
  { id: "fl-10", from: "Durban", to: "Cape Town", fromCode: "DUR", toCode: "CPT", airline: "Coastal Wings", price: 1090, duration: "2h 20m", stops: "Direct", image: dealPhoto("th-fl-10") },
  { id: "fl-11", from: "Bloemfontein", to: "Cape Town", fromCode: "BFN", toCode: "CPT", airline: "FlySouth", price: 990, duration: "1h 50m", stops: "Direct", image: dealPhoto("th-fl-11") },
  { id: "fl-12", from: "Johannesburg", to: "Bloemfontein", fromCode: "JNB", toCode: "BFN", airline: "Mzansi Air", price: 640, duration: "1h 05m", stops: "Direct", image: dealPhoto("th-fl-12") },
];

export const busDeals: BusDeal[] = [
  { id: "bus-01", from: "Johannesburg", to: "Durban", operator: "InterCity Coach", price: 420, duration: "7h 30m", departs: "07:30", image: dealPhoto("th-bus-01") },
  { id: "bus-02", from: "Pretoria", to: "Cape Town", operator: "TransCape", price: 890, duration: "16h 10m", departs: "16:00", image: dealPhoto("th-bus-02") },
  { id: "bus-03", from: "Cape Town", to: "Port Elizabeth", operator: "Coastliner", price: 560, duration: "9h 40m", departs: "06:45", image: dealPhoto("th-bus-03") },
  { id: "bus-04", from: "Durban", to: "Johannesburg", operator: "GreyLine Express", price: 390, duration: "7h 15m", departs: "22:30", image: "/intercity-express.png" },
  { id: "bus-05", from: "Johannesburg", to: "Polokwane", operator: "Highveld Bus", price: 280, duration: "4h 20m", departs: "08:00", image: dealPhoto("th-bus-05") },
  { id: "bus-06", from: "Bloemfontein", to: "Cape Town", operator: "TransCape", price: 610, duration: "10h 05m", departs: "19:00", image: dealPhoto("th-bus-06") },
  { id: "bus-07", from: "Port Elizabeth", to: "East London", operator: "Coastliner", price: 240, duration: "3h 50m", departs: "09:15", image: dealPhoto("th-bus-07") },
  { id: "bus-08", from: "Johannesburg", to: "Nelspruit", operator: "Highveld Bus", price: 310, duration: "4h 45m", departs: "06:30", image: dealPhoto("th-bus-08") },
  { id: "bus-09", from: "Cape Town", to: "Johannesburg", operator: "InterCity Coach", price: 860, duration: "15h 40m", departs: "15:30", image: dealPhoto("th-bus-09") },
  { id: "bus-10", from: "Durban", to: "Bloemfontein", operator: "GreyLine Express", price: 470, duration: "8h 20m", departs: "21:00", image: dealPhoto("th-bus-10") },
  { id: "bus-11", from: "Pretoria", to: "Kimberley", operator: "Highveld Bus", price: 360, duration: "6h 10m", departs: "07:00", image: dealPhoto("th-bus-11") },
  { id: "bus-12", from: "East London", to: "Durban", operator: "Coastliner", price: 450, duration: "8h 55m", departs: "08:40", image: dealPhoto("th-bus-12") },
];

export const stayDeals: StayDeal[] = [
  { id: "stay-01", name: "Rosebank Lane Hotel", city: "Johannesburg", area: "Rosebank", rating: 4.6, reviewCount: 812, pricePerNight: 1450, type: "Hotel", image: dealPhoto("th-stay-01"), isAvailable: true },
  { id: "stay-02", name: "Skyline Suites Sandton", city: "Johannesburg", area: "Sandton", rating: 4.8, reviewCount: 1260, pricePerNight: 1890, type: "Suite", image: dealPhoto("th-stay-02"), isAvailable: true },
  { id: "stay-03", name: "Harbour Quay Rooms", city: "Cape Town", area: "V&A Waterfront", rating: 4.7, reviewCount: 980, pricePerNight: 2100, type: "Hotel", image: dealPhoto("th-stay-03"), isAvailable: true },
  { id: "stay-04", name: "Signal Cottage", city: "Cape Town", area: "Green Point", rating: 4.5, reviewCount: 430, pricePerNight: 1320, type: "Guesthouse", image: dealPhoto("th-stay-04"), isAvailable: true },
  { id: "stay-05", name: "Umhlanga Palm Lodge", city: "Durban", area: "Umhlanga", rating: 4.4, reviewCount: 640, pricePerNight: 1180, type: "Lodge", image: dealPhoto("th-stay-05"), isAvailable: true },
  { id: "stay-06", name: "Florida Road House", city: "Durban", area: "Morningside", rating: 4.3, reviewCount: 288, pricePerNight: 890, type: "Guesthouse", image: dealPhoto("th-stay-06"), isAvailable: false },
  { id: "stay-07", name: "Jacaranda Court", city: "Pretoria", area: "Brooklyn", rating: 4.5, reviewCount: 510, pricePerNight: 980, type: "Hotel", image: dealPhoto("th-stay-07"), isAvailable: true },
  { id: "stay-08", name: "Embassy Gardens Stay", city: "Pretoria", area: "Arcadia", rating: 4.2, reviewCount: 190, pricePerNight: 760, type: "Apart-hotel", image: dealPhoto("th-stay-08"), isAvailable: false },
  { id: "stay-09", name: "Algoa Bay Hotel", city: "Port Elizabeth", area: "Summerstrand", rating: 4.6, reviewCount: 705, pricePerNight: 1240, type: "Hotel", image: dealPhoto("th-stay-09"), isAvailable: true },
  { id: "stay-10", name: "Richmond Hill Lofts", city: "Port Elizabeth", area: "Richmond Hill", rating: 4.4, reviewCount: 256, pricePerNight: 820, type: "Loft", image: dealPhoto("th-stay-10"), isAvailable: true },
  { id: "stay-11", name: "Stellenbosch Vine Rooms", city: "Cape Town", area: "Stellenbosch", rating: 4.9, reviewCount: 348, pricePerNight: 1680, type: "Lodge", image: dealPhoto("th-stay-11"), isAvailable: true },
  { id: "stay-12", name: "Melville Porch Hotel", city: "Johannesburg", area: "Melville", rating: 4.3, reviewCount: 402, pricePerNight: 990, type: "Hotel", image: dealPhoto("th-stay-12"), isAvailable: true },
];
