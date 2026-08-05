"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Menu, Heart, User, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { useUIStore } from "@/store/useUIStore";
import { useWatchlistStore } from "@/store/useWatchlistStore";

export function Header() {
  const [isMounted, setIsMounted] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());
  const watchlistCount = useWatchlistStore((state) => state.getWatchlistCount());
  const { toggleMobileMenu } = useUIStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {/* Marquee Announcement Bar */}
      <div className="w-full bg-primary overflow-hidden whitespace-nowrap py-1.5 sm:py-2 flex items-center shrink-0">
        <div className="animate-marquee flex whitespace-nowrap w-max">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-white text-[10px] sm:text-[11px] tracking-wider px-4 font-medium inline-block">
              use <strong className="font-bold uppercase">WELOCOM10</strong> code to 10% off on every product
            </span>
          ))}
        </div>
      </div>

      <header className="w-full bg-background border-b border-border/50 sticky top-0 z-50 flex flex-col">
        {/* Main Header Row */}
      <div className="container mx-auto px-4 sm:px-6 py-3 md:py-4 flex items-center gap-1.5 sm:gap-4 max-w-full shrink-0">
        {/* Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden shrink-0 hover:bg-muted/50 rounded-full w-9 h-9 sm:w-10 sm:h-10"
          onClick={toggleMobileMenu}
        >
          <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
        </Button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="font-heading font-bold text-lg sm:text-2xl leading-none text-foreground">Woxly</span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 flex justify-center px-4">
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />

            <input
              type="text"
              placeholder="Search..."
              className="w-full h-11 pl-11 pr-4 rounded-full border border-border/80 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm placeholder:text-muted-foreground/60 shadow-sm"
            />
          </div>
        </div>


        {/* Right Actions - Hidden on mobile */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          {/* Watchlist */}
          <Button
            variant="ghost"
            size="icon"
            className="relative text-muted-foreground hover:text-primary w-10 h-10"
            asChild
          >
            <Link href="/watchlist">
              <Heart className="w-6 h-6" />
              {isMounted && watchlistCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#2563eb] text-[9px] font-bold text-white border border-background">
                  {watchlistCount > 9 ? "9+" : watchlistCount}
                </span>
              )}
            </Link>
          </Button>

          {/* Cart */}
          <Button
            variant="ghost"
            size="icon"
            className="relative w-10 h-10 text-muted-foreground hover:text-primary transition-colors"
            asChild
          >
            <Link href="/cart">
              <ShoppingBag className="w-6 h-6" />
              {isMounted && itemCount > 0 && (
                <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#2563eb] text-xs font-bold text-white border border-background">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>
          </Button>

          {/* Profile */}
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 text-muted-foreground hover:text-primary transition-colors"
            asChild
          >
            <Link href="/account" aria-label="Profile">
              <User className="w-6 h-6" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50 flex items-center justify-around h-14 px-2 pb-safe shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <Link href="/" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors py-1 px-3">
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        <Link href="/watchlist" className="relative flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors py-1 px-3">
          <Heart className="w-5 h-5" />
          <span className="text-[10px] font-medium">Wishlist</span>
          {isMounted && watchlistCount > 0 && (
            <span className="absolute top-0 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#2563eb] text-[9px] font-bold text-white border border-background shadow-sm">
              {watchlistCount > 9 ? "9+" : watchlistCount}
            </span>
          )}
        </Link>
        <Link href="/cart" className="relative flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors py-1 px-3">
          <ShoppingBag className="w-5 h-5" />
          <span className="text-[10px] font-medium">Cart</span>
          {isMounted && itemCount > 0 && (
            <span className="absolute top-0 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#2563eb] text-[9px] font-bold text-white border border-background shadow-sm">
              {itemCount > 99 ? "99+" : itemCount}
            </span>
          )}
        </Link>
        <Link href="/account" className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors py-1 px-3">
          <User className="w-5 h-5" />
          <span className="text-[10px] font-medium">Profile</span>
        </Link>
      </div>
      </header>
    </>
  );
}
