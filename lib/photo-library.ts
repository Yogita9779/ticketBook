import type { EventCategory } from "@/types";

const categoryPhotos: Record<EventCategory, string[]> = {
  Concerts: [
    "1612295673708-6faf3b14f0eb",
    "1778011390422-a4d4bd8936a7",
    "1570489679487-936e2897d793",
    "1772581405425-405555d91f58",
    "1773041174622-8a4bc5bd9f36",
    "1527618794482-fed8d38ea10b",
    "1767755255170-c79c863f1849",
    "1562046030-101e60ae2c75",
    "https://images.pexels.com/photos/26384154/pexels-photo-26384154.jpeg",
    "https://images.pexels.com/photos/33878445/pexels-photo-33878445.jpeg",
  ],
  Theatre: [
    "1630510590330-758f9428eb7c",
    "1630510590499-fdd4ff8cb295",
    "1630510590325-c6489cca766c",
    "1630510590435-8c0dc8d7c7ee",
    "1775138622438-f9568c3e279d",
    "1783857336516-801d28c477d2",
    "https://images.pexels.com/photos/33137418/pexels-photo-33137418.jpeg",
    "https://images.pexels.com/photos/31658135/pexels-photo-31658135.jpeg",
    "https://images.pexels.com/photos/31951742/pexels-photo-31951742.jpeg",
    "https://images.pexels.com/photos/8957967/pexels-photo-8957967.jpeg",
  ],
  Comedy: [
    "https://images.pexels.com/photos/14604184/pexels-photo-14604184.jpeg",
    "https://images.pexels.com/photos/8040854/pexels-photo-8040854.jpeg",
    "https://images.pexels.com/photos/8043898/pexels-photo-8043898.jpeg",
    "https://images.pexels.com/photos/8043844/pexels-photo-8043844.jpeg",
    "https://images.pexels.com/photos/9008769/pexels-photo-9008769.jpeg",
    "https://images.pexels.com/photos/9009500/pexels-photo-9009500.jpeg",
    "https://images.pexels.com/photos/10063045/pexels-photo-10063045.jpeg",
    "https://images.pexels.com/photos/18652040/pexels-photo-18652040.jpeg",
    "https://images.pexels.com/photos/10035603/pexels-photo-10035603.jpeg",
    "https://images.pexels.com/photos/10078868/pexels-photo-10078868.jpeg",
  ],
  Sport: [
    "https://images.pexels.com/photos/12742526/pexels-photo-12742526.jpeg",
    "https://images.pexels.com/photos/3886271/pexels-photo-3886271.jpeg",
    "https://images.pexels.com/photos/12742521/pexels-photo-12742521.jpeg",
    "https://images.pexels.com/photos/5896926/pexels-photo-5896926.jpeg",
    "https://images.pexels.com/photos/10313669/pexels-photo-10313669.jpeg",
    "https://images.pexels.com/photos/12742582/pexels-photo-12742582.jpeg",
    "https://images.pexels.com/photos/3886240/pexels-photo-3886240.jpeg",
    "https://images.pexels.com/photos/8454926/pexels-photo-8454926.jpeg",
    "https://images.pexels.com/photos/12742567/pexels-photo-12742567.jpeg",
    "https://images.pexels.com/photos/7869518/pexels-photo-7869518.jpeg",
  ],
  Festivals: [
    "https://images.pexels.com/photos/37118614/pexels-photo-37118614.jpeg",
    "https://images.pexels.com/photos/36331026/pexels-photo-36331026.jpeg",
    "https://images.pexels.com/photos/31644428/pexels-photo-31644428.jpeg",
    "https://images.pexels.com/photos/36547013/pexels-photo-36547013.jpeg",
    "https://images.pexels.com/photos/24275069/pexels-photo-24275069.jpeg",
    "https://images.pexels.com/photos/34228166/pexels-photo-34228166.jpeg",
    "https://images.pexels.com/photos/32447544/pexels-photo-32447544.jpeg",
    "https://images.pexels.com/photos/36955357/pexels-photo-36955357.jpeg",
    "https://images.pexels.com/photos/13228189/pexels-photo-13228189.jpeg",
    "https://images.pexels.com/photos/31644439/pexels-photo-31644439.jpeg",
  ],
  Family: [
    "https://images.pexels.com/photos/12887055/pexels-photo-12887055.jpeg",
    "https://images.pexels.com/photos/12981035/pexels-photo-12981035.jpeg",
    "https://images.pexels.com/photos/30219174/pexels-photo-30219174.jpeg",
    "https://images.pexels.com/photos/35811601/pexels-photo-35811601.jpeg",
    "https://images.pexels.com/photos/35532066/pexels-photo-35532066.jpeg",
    "https://images.pexels.com/photos/15538204/pexels-photo-15538204.jpeg",
    "https://images.pexels.com/photos/20407103/pexels-photo-20407103.jpeg",
    "https://images.pexels.com/photos/32757388/pexels-photo-32757388.jpeg",
    "https://images.pexels.com/photos/33959049/pexels-photo-33959049.jpeg",
    "https://images.pexels.com/photos/11273728/pexels-photo-11273728.jpeg",
    "https://images.pexels.com/photos/12981107/pexels-photo-12981107.jpeg",
    "https://images.pexels.com/photos/31709502/pexels-photo-31709502.jpeg",
  ],
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
  if (photoId.startsWith("https://")) {
    return `${photoId}?auto=compress&cs=tinysrgb&w=${width}&h=${height}&fit=crop`;
  }
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
