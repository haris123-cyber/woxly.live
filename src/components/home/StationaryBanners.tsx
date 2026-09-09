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
    buttonText: "Explore",
    bgColor: "bg-zinc-900",
    gradient: "from-black/90 via-black/60 to-transparent",
    buttonBg: "bg-[#8b5cf6] hover:bg-[#7c3aed] text-white",
    image: "/images/product_placeholder.png",
  },
  {
    id: 2,
    title: "Premium Pens",
    desc: "Discover our exclusive collection of fine writing instruments.",
    buttonText: "Shop Now",
    bgColor: "bg-[#1e3a8a]",
    gradient: "from-[#1e3a8a] via-[#1e40af] to-[#2563eb]",
    buttonBg: "bg-white text-[#1e3a8a] hover:bg-gray-100",
    image: null,
  },
  {
    id: 3,
    title: "Desk Organizers",
    desc: "Keep your workspace clean and productive.",
    buttonText: "Explore",
    bgColor: "bg-[#064e3b]",
    gradient: "from-[#064e3b] via-[#065f46] to-[#059669]",
    buttonBg: "bg-[#8b5cf6] hover:bg-[#7c3aed] text-white",
    image: null,
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
              <div className={`relative rounded-[12px] sm:rounded-xl overflow-hidden ${slide.bgColor} h-[180px] sm:h-64 md:h-80 flex items-center shadow-sm w-full`}>
                {slide.image && (
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover opacity-80"
                  />
                )}
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center items-center gap-1.5 mt-4 mb-2">
        {slides.map((_, idx) => (
          <button
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
