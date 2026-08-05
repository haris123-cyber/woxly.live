"use client";

import Link from "next/link";
import { useUIStore } from "@/store/useUIStore";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  Home,
  ShoppingBag,
  FileText,
  Info,
  User,
  Heart,
  Package,
  Shield,
  Truck,
  RefreshCcw,
  HelpCircle,
  MessageSquare,
  Mail,
  X,
} from "lucide-react";

const navLinks = [

  { name: "Home", href: "/", icon: Home },
  { name: "Shop", href: "/shop", icon: ShoppingBag },
  { name: "WISHLIST", href: "/watchlist", icon: Heart },
  { name: "ORDERS", href: "/account", icon: Package },
  { name: "SIGN IN", href: "/login", icon: User },

];



const helpLinks = [
  { name: "PRIVACY POLICY", href: "/privacy", icon: Shield },
  { name: "TERMS OF SERVICE", href: "/terms", icon: FileText },
  { name: "SHIPPING POLICY", href: "/shipping", icon: Truck },
  { name: "RETURN POLICY", href: "/returns", icon: RefreshCcw },
  { name: "Blog", href: "/blog", icon: FileText },
  { name: "About", href: "/about", icon: Info },
  { name: "FAQS", href: "/faq", icon: HelpCircle },
  { name: "FEEDBACK", href: "/contact", icon: MessageSquare },
  { name: "CONTACT", href: "/contact", icon: Mail },
];

export function MobileMenu() {
  const { isMobileMenuOpen, closeMobileMenu } = useUIStore();

  return (
    <Sheet open={isMobileMenuOpen} onOpenChange={(open) => !open && closeMobileMenu()}>
      <SheetContent side="left" className="w-[85%] max-w-[280px] p-0 flex flex-col bg-[#f8f9fa] [&>button]:hidden border-0">
        {/* Blue Curved Header */}
        <div className="bg-[#2563eb] text-white rounded-br-[2.5rem] p-6 pb-8 shadow-sm relative z-10 shrink-0">
          <div className="flex justify-between items-center mb-6">
            <button onClick={closeMobileMenu} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
              <X className="w-7 h-7" strokeWidth={2.5} />
            </button>

          </div>
          <h2 className="text-[22px] font-bold mb-1 tracking-tight">Welcome to Woxly</h2>
          <p className="text-blue-100/90 text-sm font-medium">Discover premium quality products!</p>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto pt-6 px-6 pb-6">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="flex items-center gap-4 py-3.5 px-2 text-[15px] font-semibold text-gray-700 hover:text-[#2563eb] hover:bg-black/5 rounded-xl transition-all"
                >
                  <Icon className="w-[22px] h-[22px] text-gray-500" strokeWidth={2} />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="my-5 h-px bg-gray-200/80 mx-2" />


          <div>
            <h3 className="text-[11px] font-bold text-gray-400 tracking-wider mb-2 px-2">HELP & POLICIES</h3>
            <nav className="flex flex-col gap-1">
              {helpLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="flex items-center gap-4 py-3.5 px-2 text-[15px] font-semibold text-gray-700 hover:text-[#2563eb] hover:bg-black/5 rounded-xl transition-all"
                  >
                    <Icon className="w-[22px] h-[22px] text-gray-500" strokeWidth={2} />
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto p-6 pb-8 text-center shrink-0">

          <p className="text-[13px] font-medium text-gray-400">© 2026 Woxly Store</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
