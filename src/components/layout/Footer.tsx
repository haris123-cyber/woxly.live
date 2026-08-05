import Link from "next/link";
import { Globe, Mail, MessageCircle, Share2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white pt-10 md:pt-16 pb-28 md:pb-12 border-t border-zinc-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-12 mb-2 md:mb-2">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 ">
            <Link href="/" className="font-heading font-bold text-2xl tracking-tight uppercase mb-4 inline-block text-black">
              WOXLY
            </Link>
            <p className="text-foreground text-sm leading-relaxed mb-6 max-w-sm">
              Premium quality products crafted for your lifestyle. We bring you the best designs with uncompromising quality.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-foreground hover:text-foreground/80 transition-colors bg-zinc-100 p-2 rounded-full">
                <Globe className="w-4 h-4" />
                <span className="sr-only">Website</span>
              </a>
              <a href="#" className="text-foreground hover:text-foreground/80 transition-colors bg-zinc-100 p-2 rounded-full">
                <MessageCircle className="w-4 h-4" />
                <span className="sr-only">Community</span>
              </a>
              <a href="#" className="text-foreground hover:text-foreground/80 transition-colors bg-zinc-100 p-2 rounded-full">
                <Share2 className="w-4 h-4" />
                <span className="sr-only">Social</span>
              </a>
              <a href="#" className="text-foreground hover:text-foreground/80 transition-colors bg-zinc-100 p-2 rounded-full">
                <Mail className="w-4 h-4" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>

          {/* Links — 3 columns inline on mobile */}
          <div className="grid grid-cols-3 col-span-1 md:col-span-2 lg:col-span-3 gap-4 md:gap-8 lg:gap-12">
            <div>
              <h3 className="font-bold mb-3 md:mb-4 text-black text-sm md:text-base">Shop</h3>
              <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-foreground">
                <li><Link href="/shop" className="hover:text-foreground/80 transition-colors">All Products</Link></li>
                <li><Link href="/shop?category=sneakers" className="hover:text-foreground/80 transition-colors">Sneakers</Link></li>
                <li><Link href="/shop?category=clothing" className="hover:text-foreground/80 transition-colors">Clothing</Link></li>
                <li><Link href="/shop?category=accessories" className="hover:text-foreground/80 transition-colors">Accessories</Link></li>
                <li><Link href="/shop?category=watches" className="hover:text-foreground/80 transition-colors">Watches</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-3 md:mb-4 text-black text-sm md:text-base">Company</h3>
              <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-foreground">
                <li><Link href="/about" className="hover:text-foreground/80 transition-colors ">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-foreground/80 transition-colors">Contact Us</Link></li>
                <li><Link href="/blog" className="hover:text-foreground/80 transition-colors">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-foreground/80 transition-colors">Careers</Link></li>
                <li><Link href="/press" className="hover:text-foreground/80 transition-colors">Press</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-3 md:mb-4 text-black text-sm md:text-base">Help</h3>
              <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-foreground">
                <li><Link href="/faq" className="hover:text-foreground/80 transition-colors">FAQ</Link></li>
                <li><Link href="/shipping" className="hover:text-foreground/80 transition-colors">Shipping</Link></li>
                <li><Link href="/returns" className="hover:text-foreground/80 transition-colors">Returns</Link></li>
                <li><Link href="/track-order" className="hover:text-foreground/80 transition-colors">Track Order</Link></li>
                <li><Link href="/size-guide" className="hover:text-foreground/80 transition-colors">Size Guide</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-6 md:pt-8 border-t border-zinc-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs md:text-sm text-foreground">
          <p>© {new Date().getFullYear()} Woxly. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-foreground/80 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground/80 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
