"use client";

import Link from "next/link";
import { useUIStore } from "@/store/useUIStore";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Categories", href: "/shop" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
];

export function MobileMenu() {
  const { isMobileMenuOpen, closeMobileMenu } = useUIStore();

  return (
    <Sheet open={isMobileMenuOpen} onOpenChange={(open) => !open && closeMobileMenu()}>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0 flex flex-col">
        <div className="p-6 border-b">
          <Link href="/" className="font-heading font-bold text-2xl tracking-tight uppercase" onClick={closeMobileMenu}>
            WOXLY
          </Link>
        </div>
        
        <div className="p-6">
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10"
            />
          </div>
          
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeMobileMenu}
                className="text-lg font-medium hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="mt-auto p-6 border-t bg-muted/30">
          <div className="flex flex-col gap-4">
            <Link href="/login" onClick={closeMobileMenu} className="font-medium hover:text-primary transition-colors">
              Log In
            </Link>
            <Link href="/signup" onClick={closeMobileMenu} className="font-medium hover:text-primary transition-colors">
              Sign Up
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
