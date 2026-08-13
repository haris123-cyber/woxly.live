"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const slides = [
  {
    id: 1,
    image: "/images/hero_grocery.png",
    link: "/shop",
  },
  {
    id: 2,
    image: "/images/hero_fashion.png",
    link: "/shop",
  },
  {
    id: 3,
    image: "/images/hero_electronics.png",
    link: "/shop",
  },
];

const promoSlides = [
  {
    id: 1,
    image: "/images/woxly.abnnouncement2.png",
    link: "/shop",
    alt: "Flat 15% off on all products",
  },
  {
    id: 2,
    image: "/images/woxly.abnnouncement3.png",
    link: "/shop",
    alt: "Fresh fruits and vegetables deals",
  },
  {
    id: 3,
    image: "/images/woxly.abnnouncement4.png",
    link: "/shop",
    alt: "Special offers and promotions",
  },
];

const AUTO_SCROLL_MS = 5000;
const PROMO_AUTO_SCROLL_MS = 4000;

export function HeroSlider() {
  const [promoCurrent, setPromoCurrent] = useState(0);
  const [promoPaused, setPromoPaused] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: AUTO_SCROLL_MS, stopOnInteraction: false, stopOnMouseEnter: true })
  ]);
  const [current, setCurrent] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrent(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const next = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const prev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const nextPromo = useCallback(() => {
    setPromoCurrent((prev) => (prev + 1) % promoSlides.length);
  }, []);

  useEffect(() => {
    if (promoPaused) return;

    const id = setInterval(nextPromo, PROMO_AUTO_SCROLL_MS);
    return () => clearInterval(id);
  }, [nextPromo, promoPaused, promoCurrent]);

  return (
    <section className="container mx-auto px-0 sm:px-6 pt-0 sm:pt-0 ">
      {/* ── PROMO BANNER CAROUSEL ── */}
      <div
        className="relative w-full overflow-hidden rounded-none sm:rounded-xl mb-0 sm:mb-1"
        onMouseEnter={() => setPromoPaused(true)}
        onMouseLeave={() => setPromoPaused(false)}
        onTouchStart={() => setPromoPaused(true)}
        onTouchEnd={() => setPromoPaused(false)}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            width: `${promoSlides.length * 100}%`,
            transform: `translateX(-${(promoCurrent / promoSlides.length) * 100}%)`,
          }}
        >
          {promoSlides.map((promo) => (
            <Link
              key={promo.id}
              href={promo.link}
              className="relative block shrink-0"
              style={{ width: `${100 / promoSlides.length}%` }}
            >
              <Image
                src={promo.image}
                alt={promo.alt}
                width={1280}
                height={120}
                className="w-full h-[40px] sm:h-auto object-fill sm:object-cover"
                priority={promo.id === 1}
              />
            </Link>
          ))}
        </div>


      </div>

      <div
        className="relative overflow-hidden bg-zinc-900 shadow-lg mt-0 sm:mt-0 rounded-none sm:rounded-[6px] group"
        style={{ height: "clamp(260px, 55vw, 460px)" }}
        ref={emblaRef}
      >
        {/* Image track */}
        <div className="flex h-full w-full cursor-grab active:cursor-grabbing">
          {slides.map((slide) => (
            <div key={slide.id} className="relative flex-[0_0_100%] min-w-0 h-full">
              <Link
                href={slide.link}
                className="block w-full h-full relative"
                draggable={false}
              >
                <Image
                  src={slide.image}
                  fill
                  className="object-cover"
                  priority={slide.id === 1}
                  alt="Hero banner"
                  sizes="100vw"
                  draggable={false}
                />
              </Link>
            </div>
          ))}
        </div>



        {/* Navigation dots */}
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 border-0 p-0 cursor-pointer ${idx === current ? "w-10 sm:w-14 bg-primary" : "w-2 sm:w-2 bg-white/50"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
