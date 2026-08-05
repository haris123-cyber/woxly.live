"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Everything You Need,\nDelivered Fresh",
    subtitle: "Groceries, fresh produce, & daily essentials at best prices.",
    image: "/images/hero_grocery.png",
    link: "/shop",
  },
  {
    id: 2,
    title: "Modern Style,\nPremium Fashion",
    subtitle: "Discover the latest trends and upgrade your wardrobe.",
    image: "/images/hero_fashion.png",
    link: "/shop",
  },
  {
    id: 3,
    title: "Sleek Gadgets,\nSmart Home",
    subtitle: "Upgrade your life with the latest premium electronics.",
    image: "/images/hero_electronics.png",
    link: "/shop",
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section className="container mx-auto px-5 sm:px-6 pt-3 sm:pt-4 ">
      {/* ── PROMO BANNER STRIP ── */}
      <Link
        href="/shop"
        className="relative block w-full overflow-hidden rounded-lg sm:rounded-xl"
      >
        <Image
          src="/images/promo_card.png"
          alt="Promo"
          width={1280}
          height={120}
          className="w-full"
        />
      </Link>

      {/* ── MAIN SLIDER ── */}
      <div
        className="relative overflow-hidden bg-zinc-900 shadow-lg"
        style={{ minHeight: "clamp(260px, 55vw, 460px)", borderRadius: "6px" }}
      >
        {/* Image track — slides side by side, track moves via translateX */}
        <div
          style={{
            display: "flex",
            width: `${slides.length * 100}%`,
            height: "100%",
            position: "absolute",
            inset: 0,
            transform: `translateX(-${(current / slides.length) * 100}%)`,
            transition: "transform 0.8s cubic-bezier(0.77,0,0.175,1)",
          }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              style={{ width: `${100 / slides.length}%`, position: "relative", flexShrink: 0 }}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={slide.id === 1}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.45) 50%, transparent 100%)",
                }}
              />
            </div>
          ))}
        </div>

        {/* Content (stays fixed; text switches via opacity with inline style) */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            padding: "clamp(1.5rem, 6vw, 4rem)",
            minHeight: "clamp(260px, 55vw, 460px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            maxWidth: "650px",
          }}
        >
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              style={{
                position: "absolute",
                top: "50%",
                left: "clamp(1.5rem, 6vw, 4rem)",
                right: "1rem",
                transform: "translateY(-50%)",
                opacity: current === idx ? 1 : 0,
                transition: "opacity 0.6s ease",
                pointerEvents: current === idx ? "auto" : "none",
              }}
            >
              <h1
                style={{
                  fontWeight: 800,
                  fontSize: "clamp(1.4rem, 5vw, 3.5rem)",
                  lineHeight: 1.15,
                  color: "#fff",
                  marginBottom: "0.75rem",
                  whiteSpace: "pre-line",
                  textShadow: "0 2px 12px rgba(0,0,0,0.5)",
                }}
              >
                {slide.title}
              </h1>
              <p
                style={{
                  color: "rgba(255,255,255,0.88)",
                  fontSize: "clamp(0.8rem, 2.5vw, 1.15rem)",
                  marginBottom: "1.25rem",
                  maxWidth: "500px",
                }}
              >
                {slide.subtitle}
              </p>

              <Button asChild style={{ background: "#38bdf8", color: "#fff", borderRadius: "8px", fontWeight: 700, padding: "0 24px" }} className="hover:opacity-90 transition-opacity border-0">
                <Link href={slide.link}>
                  Shop Now <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>



        {/* Navigation Dots */}
        <div
          style={{
            position: "absolute",
            bottom: "1rem",
            left: "clamp(1.5rem, 6vw, 4rem)",
            display: "flex",
            gap: "8px",
            zIndex: 20,
          }}
        >
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              style={{
                height: "10px",
                width: idx === current ? "32px" : "10px",
                borderRadius: "9999px",
                background: idx === current ? "var(--primary, #22c55e)" : "rgba(255,255,255,0.45)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
