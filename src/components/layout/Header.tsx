"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Search, ShoppingBag, Menu, Heart, User, Home, Package, LogIn, LogOut, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useCartStore";
import { useUIStore } from "@/store/useUIStore";
import { useWatchlistStore } from "@/store/useWatchlistStore";
import { useAuthStore } from "@/store/useAuthStore";

export function Header() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());
  const watchlistCount = useWatchlistStore((state) => state.getWatchlistCount());
  const { toggleMobileMenu } = useUIStore();
  const { isLoggedIn, login, logout } = useAuthStore();

  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
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

          <div className="flex items-center justify-between w-full">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 shrink-0 md:static absolute left-1/2 -translate-x-1/2 md:translate-x-0"
            >
              <span className="font-heading font-bold text-lg sm:text-2xl leading-none text-foreground">
                Woxly
              </span>
            </Link>

            {/* Search + Cart */}
            <div className="flex items-center gap-2 sm:gap-4 ml-auto">
              {/* Desktop Search Bar */}
              <div className="relative hidden md:block w-[300px] md:w-[420px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                <input type="text" placeholder="Search" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
              </div>

              {/* Mobile Search Button */}
              <Button
                variant="ghost"
                size="icon"
                className={`md:hidden shrink-0 rounded-xl w-9 h-9 transition-all duration-300 ${isMobileSearchOpen ? 'bg-primary/20 text-primary' : ' hover:bg-primary/20'}`}
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              >
                <Search className="w-5 h-5" />
              </Button>

              {/* Mobile Cart Button */}
              <Button
                variant="ghost"
                size="icon"
                className={`sm:hidden relative shrink-0 rounded-full w-9 h-9 transition-all duration-300 ${isMounted && itemCount > 0
                  ? ''
                  : pathname === '/cart'
                    ? 'bg-primary/20 text-primary'
                    : 'text-muted-foreground hover:text-primary hover:bg-muted/50'
                  }`}
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
            </div>
          </div>



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
                  {isMounted && isLoggedIn ? (
                    <button
                      className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
                      onClick={() => {
                        logout();
                        setIsProfileDropdownOpen(false);
                      }}
                    >
                      <LogOut className="w-4 h-4 mr-2.5 text-gray-500" />
                      Logout
                    </button>
                  ) : (
                    <button
                      className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
                      onClick={() => {
                        login();
                        setIsProfileDropdownOpen(false);
                      }}
                    >
                      <LogIn className="w-4 h-4 mr-2.5 text-gray-500" />
                      Login
                    </button>
                  )}
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

        {/* Mobile Search Bar Dropdown */}
        {isMobileSearchOpen && (
          <div className="md:hidden w-full px-4 py-3 border-t border-border/50 bg-background flex items-center gap-3 animate-in slide-in-from-top-2 duration-200">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                autoFocus
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 w-9 h-9 text-muted-foreground hover:text-foreground"
              onClick={() => setIsMobileSearchOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        )}

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
