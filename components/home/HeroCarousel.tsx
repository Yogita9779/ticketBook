"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { heroSlides } from "@/data/categories";

export function HeroCarousel() {
  const autoplay = useRef(
    Autoplay({ delay: 5000, stopOnMouseEnter: true, stopOnInteraction: false }),
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay.current]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const plugin = autoplay.current;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (media.matches) plugin.stop();
      else plugin.play();
    };
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [emblaApi]);

  return (
    <section aria-roledescription="carousel" aria-label="Featured campaigns" className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {heroSlides.map((slide, slideIndex) => (
            <div key={slide.id} className="relative min-w-0 flex-[0_0_100%]" aria-roledescription="slide" aria-label={`${slideIndex + 1} of ${heroSlides.length}`}>
              <div className="relative min-h-[28rem] sm:min-h-[34rem] lg:min-h-[38rem]">
                <Image
                  src={slide.image}
                  alt={slide.imageAlt}
                  fill
                  priority={slideIndex === 0}
                  sizes="100vw"
                  className="object-cover brightness-110 saturate-125"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-slate-950/30 to-slate-950/10" />
                <div className="container-page relative z-10 flex min-h-[28rem] flex-col justify-center pb-28 pt-10 sm:min-h-[34rem] lg:min-h-[38rem] lg:pb-36">
                  <div className="max-w-xl text-white">
                    {slideIndex === index ? (
                      <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-5xl">{slide.title}</h1>
                    ) : (
                      <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-5xl">{slide.title}</h2>
                    )}
                    <p className="mt-3 text-sm text-white/85 sm:text-lg">{slide.subtitle}</p>
                    <Button asChild className="mt-6">
                      <Link href={slide.href}>{slide.cta}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 hidden -translate-y-16 justify-between px-4 sm:flex">
        <button
          type="button"
          aria-label="Previous slide"
          className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-ink shadow-card hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          onClick={() => emblaApi?.scrollPrev()}
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-ink shadow-card hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          onClick={() => emblaApi?.scrollNext()}
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="absolute bottom-28 left-0 right-0 z-10 flex justify-center gap-2 sm:bottom-32">
        {heroSlides.map((slide, slideIndex) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Go to slide ${slideIndex + 1}`}
            aria-current={index === slideIndex}
            className={`h-2.5 rounded-pill transition-all ${index === slideIndex ? "w-6 bg-white" : "w-2.5 bg-white/60"}`}
            onClick={() => emblaApi?.scrollTo(slideIndex)}
          />
        ))}
      </div>
    </section>
  );
}
