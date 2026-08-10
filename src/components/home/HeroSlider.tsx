"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const [current, setCurrent] = useState(0);
  const [promoCurrent, setPromoCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [promoPaused, setPromoPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const nextPromo = useCallback(() => {
    setPromoCurrent((prev) => (prev + 1) % promoSlides.length);
  }, []);

  useEffect(() => {
    if (paused) return;

    const id = setInterval(next, AUTO_SCROLL_MS);
    return () => clearInterval(id);
  }, [next, paused, current]);

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
                className="w-full h-auto object-cover"
                priority={promo.id === 1}
              />
            </Link>
          ))}
        </div>

      
      </div>

      {/* ── MAIN SLIDER ── */}
      <div
        className="relative overflow-hidden bg-zinc-900 shadow-lg mt-0 sm:mt-0 rounded-none sm:rounded-[6px] group"
        style={{ minHeight: "clamp(260px, 55vw, 460px)" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        {/* Image track */}
        <div
          style={{
            display: "flex",
            width: `${slides.length * 100}%`,
            height: "100%",
            position: "absolute",
            inset: 0,
            transform: `translateX(-${(current / slides.length) * 100}%)`,
            transition: "transform 0.5s cubic-bezier(0.77,0,0.175,1)",
          }}
        >
          {slides.map((slide) => (
            <Link
              key={slide.id}
              href={slide.link}
              style={{ width: `${100 / slides.length}%`, position: "relative", flexShrink: 0, display: "block" }}
            >
              <Image
                src={slide.image}
                fill
                className="object-cover"
                priority={slide.id === 1}
                alt="Hero banner"
                sizes="100vw"
              />
            </Link>
          ))}
        </div>

        {/* Prev / Next buttons */}
        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-5 h-5 sm:w-11 sm:h-11 rounded-full bg-white/70 hover:bg-white text-zinc-800 shadow-md flex items-center justify-center transition-all opacity-90 hover:opacity-100"
        >
          <ChevronLeft className="w-3 h-3 sm:w-5 sm:h-5" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-5 h-5 sm:w-11 sm:h-11 rounded-full bg-white/70 hover:bg-white text-zinc-800 shadow-md flex items-center justify-center transition-all opacity-90 hover:opacity-100"
        >
          <ChevronRight className="w-3 h-3 sm:w-5 sm:h-5" />
        </button>

        {/* Navigation dots */}
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className="h-1.5 rounded-full transition-all duration-300 border-0 p-0 cursor-pointer"
              style={{
                width: idx === current ? "18px" : "6px",
                background: idx === current ? "var(--primary, #3bc4f5)" : "rgba(255,255,255,0.5)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
