import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { PriceTag } from "@/components/ui/PriceTag";
import { Rating } from "@/components/ui/Rating";

export function DealCard({
  href,
  image,
  imageAlt,
  title,
  subtitle,
  meta,
  price,
  pricePrefix = "From",
  priceSuffix,
  rating,
  reviewCount,
  clickable = true,
}: {
  href: string;
  image: string;
  imageAlt: string;
  title: string;
  subtitle: string;
  meta?: string;
  price: number;
  pricePrefix?: string;
  priceSuffix?: string;
  rating?: number;
  reviewCount?: number;
  clickable?: boolean;
}) {
  const content = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover ${clickable ? "transition-transform duration-300 motion-safe:group-hover:scale-105" : ""}`}
        />
        <Badge className="absolute left-3 top-3 bg-accent text-white">Deal</Badge>
      </div>
      <div className="space-y-2 p-4">
        <h3 className="line-clamp-2 text-base font-semibold text-ink">{title}</h3>
        <p className="text-sm text-ink-muted">{subtitle}</p>
        {meta ? <p className="text-xs font-medium uppercase tracking-wide text-ink-muted">{meta}</p> : null}
        {typeof rating === "number" ? <Rating value={rating} count={reviewCount} /> : null}
        <PriceTag amount={price} prefix={pricePrefix} suffix={priceSuffix} />
      </div>
    </>
  );

  return (
    <article className={`overflow-hidden rounded-card bg-white shadow-card ${clickable ? "group transition-shadow duration-200 hover:shadow-elevated" : ""}`}>
      {clickable ? <Link href={href} className="block h-full focus-visible:outline-none">{content}</Link> : <div className="h-full">{content}</div>}
    </article>
  );
}
