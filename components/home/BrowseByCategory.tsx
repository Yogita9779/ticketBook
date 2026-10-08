import { Drama, Gift, Mic2, Music, PartyPopper, Plane, Trophy, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getCategoryTiles } from "@/lib/api";
import type { CategoryTile } from "@/types";

const icons = { Music, Drama, Mic2, Trophy, PartyPopper, Users, Plane, Gift };

export default async function BrowseByCategory() {
  const tiles = await getCategoryTiles();

  return (
    <section className="bg-canvas py-12" aria-labelledby="categories-heading">
      <div className="container-page">
        <div id="categories-heading">
          <SectionHeader title="Browse by category" subtitle="From arena shows to weekend flights." />
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
          {tiles.map((tile) => (
            <li key={tile.name}>
              <CategoryLink tile={tile} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CategoryLink({ tile }: { tile: CategoryTile }) {
  const Icon = icons[tile.icon];
  return (
    <Link
      href={`/search?category=${encodeURIComponent(tile.category)}`}
      className="group relative block aspect-[4/3] overflow-hidden rounded-card shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <Image
        src={tile.image}
        alt=""
        fill
        sizes="(max-width: 640px) 50vw, 25vw"
        className="object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
      <span className="absolute bottom-3 left-3 right-3 flex items-center gap-2 text-white">
        <Icon className="h-5 w-5" aria-hidden="true" />
        <span className="text-base font-semibold sm:text-lg">{tile.name}</span>
      </span>
    </Link>
  );
}
