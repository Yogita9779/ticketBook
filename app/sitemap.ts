import type { MetadataRoute } from "next";
import { events } from "@/data/events";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = [
    "",
    "/page/home",
    "/search",
    "/flights",
    "/bus",
    "/accommodation",
    "/vouchers",
    "/find-a-store",
    "/faq",
    "/contact",
    "/legal",
    "/cart",
  ];

  return [
    ...paths.map((path) => ({
      url: `${site.url}${path || "/"}`,
      lastModified: now,
    })),
    ...events.map((event) => ({
      url: `${site.url}/events/${event.slug}`,
      lastModified: now,
    })),
  ];
}
