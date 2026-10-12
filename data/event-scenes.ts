import type { EventCategory } from "@/types";

export const eventScenes: Array<{
  slug: string;
  title: string;
  description: string;
  category: EventCategory;
  imageId: string;
}> = [
  { slug: "soccer-fan", title: "Soccer Fan", description: "Supporting your team", category: "Sport", imageId: "1722978687695-212eecfa4cbe" },
  { slug: "family-fun", title: "Family Fun", description: "Making memories together", category: "Family", imageId: "1503454537195-1dcabb73ffb9" },
  { slug: "gospel-faith", title: "Gospel & Faith", description: "Uplifting music and spiritual connections", category: "Concerts", imageId: "1506157786151-b8491531f063" },
  { slug: "lifestyle-wellness", title: "Lifestyle & Wellness", description: "Events that elevate your everyday", category: "Festivals", imageId: "1470229722913-7c0e2dbbafd3" },
  { slug: "live-music", title: "Live Music", description: "Feel the beat, live the moment", category: "Concerts", imageId: "1533174072545-7a4b6ad7a6c3" },
  { slug: "womens-events", title: "Women's Events", description: "Celebrating sisterhood and empowerment", category: "Theatre", imageId: "1507676184212-d03ab07a01bf" },
];
