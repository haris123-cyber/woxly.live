"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Search, ShoppingBag, Menu, Heart, User, Home, Package, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { useUIStore } from "@/store/useUIStore";
import { useWatchlistStore } from "@/store/useWatchlistStore";

export function Header() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());
  const watchlistCount = useWatchlistStore((state) => state.getWatchlistCount());
  const { toggleMobileMenu } = useUIStore();

  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (pathname === '/login' || pathname === '/signup') return null;

  return (
    <>
      {/* Marquee Announcement Bar */}
      <div className="w-full bg-primary overflow-hidden whitespace-nowrap py-2.5 sm:py-3 flex items-center shrink-0">
        <div className="animate-marquee flex whitespace-nowrap w-max">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-white text-[12px] sm:text-[14px] tracking-wider px-4 font-medium inline-block">
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
          <div className="flex-1 flex justify-center px-2 sm:px-4">
            <div className="relative w-full max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground pointer-events-none" />

              <input
                suppressHydrationWarning
                type="text"
                placeholder="Search..."
                className="w-full h-10 sm:h-11 pl-10 sm:pl-11 pr-4 rounded-full border border-border/80 bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[16px] sm:text-sm placeholder:text-muted-foreground/60 shadow-sm"
              />
            </div>
          </div>

          {/* Mobile Cart Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`sm:hidden relative shrink-0 rounded-full w-9 h-9 transition-all duration-300 ${isMounted && itemCount > 0 ? '' : pathname === '/cart' ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-primary hover:bg-muted/50'}`}
            asChild
          >
            <Link href="/cart">
              <ShoppingBag className="w-8 h-8" />
              {isMounted && itemCount > 0 && (
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#2563eb] text-[10px] font-bold text-white border border-background">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>
          </Button>

          {/* Right Actions - Hidden on mobile */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            {/* Watchlist */}
            <Button
              variant="ghost"
              size="icon"
              className={`relative w-10 h-10 rounded-full transition-colors ${pathname === '/watchlist' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-primary hover:bg-muted/50'}`}
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
              className={`relative w-10 h-10 transition-all duration-300 rounded-full ${pathname === '/cart' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-primary hover:bg-muted/50'}`}
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

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <Button
                variant="ghost"
                size="icon"
                className={`w-10 h-10 rounded-full transition-colors ${isProfileDropdownOpen ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-primary hover:bg-muted/50'}`}
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                aria-label="Profile"
              >
                <User className="w-6 h-6" />
              </Button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-1.5 z-50 animate-in fade-in zoom-in duration-200">
                  <Link
                    href="/login"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    <LogIn className="w-4 h-4 mr-2.5 text-gray-500" />
                    Login
                  </Link>
                  <Link
                    href="/account"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    <User className="w-4 h-4 mr-2.5 text-gray-500" />
                    Profile
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation Bar */}
        <Suspense fallback={
          <div className="sm:hidden fixed bottom-2 left-2 right-2 z-50 flex items-center justify-between px-4 h-[66px] bg-white rounded-[33px] shadow-[0_8px_30px_rgba(0,0,0,0.25)]" />
        }>
          <MobileBottomNav />
        </Suspense>
      </header>
    </>
  );
}

function MobileBottomNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const watchlistCount = useWatchlistStore((state) => state.getWatchlistCount());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="sm:hidden fixed bottom-[1] left-2 right-2 z-50 flex items-center justify-between px-4 h-[62px] pb-0 bg-white rounded-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
      <Link href="/" className="relative flex items-center justify-center w-12 h-12 rounded-full transition-all">
        <div className={`flex items-center justify-center w-11 h-11 rounded-full transition-colors ${pathname === '/' ? 'bg-primary text-white' : 'text-primary'}`}>
          <Home className="w-[22px] h-[22px]" />
        </div>
        <span className="sr-only">Home</span>
      </Link>

      <Link href="/watchlist" className="relative flex items-center justify-center w-12 h-12 rounded-full transition-all">
        <div className={`flex items-center justify-center w-11 h-11 rounded-full transition-colors ${pathname === '/watchlist' ? 'bg-primary text-white' : 'text-primary'}`}>
          <Heart className="w-[22px] h-[22px]" />
        </div>
        <span className="sr-only">Wishlist</span>
        {isMounted && watchlistCount > 0 && (
          <span className="absolute top-1 right-0 flex h-[18px] min-w-[18px] px-1 items-center justify-center rounded-full bg-white text-[9px] font-bold text-black border-1 border-[#003135]">
            {watchlistCount > 9 ? "9+" : watchlistCount}
          </span>
        )}
      </Link>

      <Link href="/account?tab=orders" className="relative flex items-center justify-center w-12 h-12 rounded-full transition-all">
        <div className={`flex items-center justify-center w-11 h-11 rounded-full transition-colors ${pathname === '/account' && tabParam === 'orders' ? 'bg-primary text-white' : 'text-primary'}`}>
          <Package className="w-[22px] h-[22px]" />
        </div>
        <span className="sr-only">Orders</span>
      </Link>

      <Link href="/account" className="relative flex items-center justify-center w-12 h-12 rounded-full transition-all">
        <div className={`flex items-center justify-center w-11 h-11 rounded-full transition-colors ${pathname === '/account' && (!tabParam || tabParam === 'details') ? 'bg-primary text-white' : 'text-primary'}`}>
          <User className="w-[22px] h-[22px]" />
        </div>
        <span className="sr-only">Account</span>
      </Link>
    </div>
  );
}
