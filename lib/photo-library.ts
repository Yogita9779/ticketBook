import type { EventCategory } from "@/types";

const categoryPhotos: Record<EventCategory, string[]> = {
  Concerts: ["1506157786151-b8491531f063", "1516450360452-9312f5e86fc7"],
  Theatre: ["1503095396549-807759245b35", "1507676184212-d03ab07a01bf"],
  Comedy: ["1585699324551-f6c309eedeca", "1527224857830-43a7acc85260"],
  Sport: ["1521412644187-c49fa049e84d", "1461896836934-ffe607ba8211"],
  Festivals: ["1470229722913-7c0e2dbbafd3", "1533174072545-7a4b6ad7a6c3"],
  Family: ["1503454537195-1dcabb73ffb9", "1472162072942-cd5147eb3902"],
};

const voucherPhotos: Record<string, string> = {
  Retail: "1441986300917-64674bd600d8",
  Dining: "1414235077428-338989a2e8c0",
  Fashion: "1483985988355-763728e1935b",
  Entertainment: "1493711662062-fa541adb3fc8",
  Books: "1507842217343-583bb7270b66",
  Grocery: "1542838132-92c53300491e",
  Travel: "1500530855697-b586d89ba3ee",
  Beauty: "1522335789203-aabd1fc54bc9",
  Sport: "1461896836934-ffe607ba8211",
  Home: "1616486338812-3dadae4b4ace",
};

const categoryTilePhotos: Record<string, string> = {
  Concerts: categoryPhotos.Concerts[0],
  Theatre: categoryPhotos.Theatre[0],
  Comedy: categoryPhotos.Comedy[0],
  Sport: categoryPhotos.Sport[0],
  Festivals: categoryPhotos.Festivals[0],
  Family: categoryPhotos.Family[0],
  Travel: "1436491865332-7a61a109cc05",
  Vouchers: "1512909006721-3d6018887383",
};

export function photoUrl(photoId: string, width: number, height: number) {
  return `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=${width}&h=${height}&q=85`;
}

export function eventPhoto(category: EventCategory, index: number, width: number, height: number) {
  const photos = categoryPhotos[category];
  return photoUrl(photos[index % photos.length], width, height);
}

export function categoryPhoto(category: string, width: number, height: number) {
  return photoUrl(categoryTilePhotos[category] ?? categoryPhotos.Concerts[0], width, height);
}

export function voucherPhoto(category: string, width: number, height: number) {
  return photoUrl(voucherPhotos[category] ?? voucherPhotos.Retail, width, height);
}
