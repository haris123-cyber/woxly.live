"use client";

import { IconBrandWhatsapp } from "@tabler/icons-react";
import { usePathname } from "next/navigation";

export function WhatsAppWidget() {
  const pathname = usePathname();

  if (pathname === "/cart" || pathname?.startsWith("/products/")) {
    return null;
  }

  return (
    <button
      onClick={() => window.open("https://wa.me/1234567890", "_blank")}
      className="fixed bottom-[70px] sm:bottom-6 right-4 sm:right-6 z-50 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full px-3 py-3 sm:py-2.5 shadow-[0_4px_14px_rgba(37,211,102,0.4)] transition-transform hover:scale-105 active:scale-95"
      aria-label="Chat on WhatsApp"
    >
      <IconBrandWhatsapp className="w-6 h-6 sm:w-5 sm:h-5 stroke-[2]" />
      <span className="hidden sm:inline font-bold text-[15px] tracking-wide pr-1">
        WhatsApp
      </span>
    </button>
  );
}
