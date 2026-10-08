import dynamic from "next/dynamic";
import Image from "next/image";
import { Suspense } from "react";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { SearchBar } from "@/components/home/SearchBar";
import { TrustBar } from "@/components/home/TrustBar";
import {
  CategoryGridSkeleton,
  DealGridSkeleton,
  EventRowSkeleton,
  TrendingSkeleton,
  VoucherRowSkeleton,
} from "@/components/ui/Skeletons";

const FeaturedEvents = dynamic(() => import("@/components/home/FeaturedEvents"), {
  loading: () => (
    <div className="container-page py-10">
      <EventRowSkeleton />
    </div>
  ),
});

const BrowseByCategory = dynamic(() => import("@/components/home/BrowseByCategory"), {
  loading: () => (
    <div className="bg-canvas py-12">
      <div className="container-page">
        <CategoryGridSkeleton />
      </div>
    </div>
  ),
});

const TrendingNow = dynamic(() => import("@/components/home/TrendingNow"), {
  loading: () => (
    <div className="container-page py-12">
      <TrendingSkeleton />
    </div>
  ),
});

const TravelDeals = dynamic(() => import("@/components/home/TravelDeals"), {
  loading: () => (
    <div className="container-page space-y-8 py-12">
      <DealGridSkeleton />
      <DealGridSkeleton />
    </div>
  ),
});

const VouchersStrip = dynamic(() => import("@/components/home/VouchersStrip"), {
  loading: () => (
    <div className="bg-canvas py-12">
      <div className="container-page">
        <VoucherRowSkeleton />
      </div>
    </div>
  ),
});

export function HomePage() {
  return (
    <>
      <div className="relative">
        <div className="relative isolate flex min-h-[22rem] flex-col items-center justify-center overflow-hidden px-4 py-16 text-center sm:min-h-[27rem] sm:py-20">
          <Image
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2000&q=85"
            alt=""
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/50 via-slate-950/25 to-slate-950/10" />
          <h1 className="max-w-4xl text-balance text-4xl font-extrabold leading-tight tracking-tight text-white drop-shadow sm:text-6xl">
            Your Next Great Experience <span className="text-cyan-300">Starts Right Here</span>
          </h1>
        </div>
      </div>
      <div className="relative z-20 -mt-8 pb-8 sm:-mt-10 sm:pb-10">
        <SearchBar />
      </div>
      <TrustBar />
      <div className="relative">
        <HeroCarousel />
      </div>
      <Suspense fallback={<div className="container-page py-10"><EventRowSkeleton /></div>}>
        <FeaturedEvents />
      </Suspense>
      <Suspense fallback={<div className="bg-canvas py-12"><div className="container-page"><CategoryGridSkeleton /></div></div>}>
        <BrowseByCategory />
      </Suspense>
      <Suspense fallback={<div className="container-page py-12"><TrendingSkeleton /></div>}>
        <TrendingNow />
      </Suspense>
      <Suspense fallback={<div className="container-page py-12"><DealGridSkeleton /></div>}>
        <TravelDeals />
      </Suspense>
      <Suspense fallback={<div className="bg-canvas py-12"><div className="container-page"><VoucherRowSkeleton /></div></div>}>
        <VouchersStrip />
      </Suspense>
    </>
  );
}
