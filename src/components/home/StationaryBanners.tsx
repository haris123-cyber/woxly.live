"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";

const slides = [
  {
    id: 1,
    title: "Stationery & Office",
    desc: "Essentials for work, study, and creativity.",

    image: "/images/banners/banner carosel 1.jpg.jpeg",
    image1: "/images/banners/b1.jpeg",
  },
  {
    id: 2,
    title: "Premium Pens",
    desc: "Discover our exclusive collection of fine writing instruments.",

    image: "/images/banners/banner carosel 2.jpg.jpeg",
    image1: "/images/banners/b2.jpeg",

  },
  {
    id: 3,
    title: "Desk Organizers",

    image: "/images/banners/banner carosel 3.jpg.jpeg",
    image1: "/images/banners/b3.jpeg",

  },

  {
    id: 4,
    title: "Desk Organizers",


    image: "/images/banners/banner carosel 4.jpg.jpeg",
    image1: "/images/banners/b4.jpeg",

  }
];




export function StationaryBanners() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", skipSnaps: false },
    [Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

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

  return (
    <section className="container mx-auto px-3 sm:px-6 mt-0 mb-0">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y flex-row -ml-4">
          {slides.map((slide) => (
            <div key={slide.id} className="flex-[0_0_92%] sm:flex-[0_0_100%] min-w-0 pl-4">
              <div className="flex justify-center items-center w-full">
                {slide.image && (
                  <>
                    {/* Mobile Banner */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="md:hidden w-auto h-auto max-w-full max-h-[200px] rounded-[12px] sm:rounded-xl shadow-sm object-contain"
                    />
                    {/* Desktop Banner */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={slide.image1}
                      alt={slide.title}
                      className="hidden md:block w-full h-auto rounded-[12px] sm:rounded-xl shadow-sm object-contain"
                    />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center items-center gap-1.5 mt-4 mb-2">
        {slides.map((_, idx) => (
          <button suppressHydrationWarning
            key={idx}
            onClick={() => emblaApi?.scrollTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 border-0 p-0 cursor-pointer ${idx === current ? "w-4 bg-zinc-800" : "w-1.5 bg-zinc-300"
              }`}
          />
        ))}
      </div>
    </section>
  );
}
