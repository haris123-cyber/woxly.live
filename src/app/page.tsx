import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/ProductCard";
import { HeroSlider } from "@/components/home/HeroSlider";
import { PRODUCTS } from "@/lib/mock-data";
import { ChevronRight, Truck, RefreshCcw, ShieldCheck, Headphones, ArrowRight, Lock, Banknote, Mail } from "lucide-react";

// Reusable Product Carousel Component
const ProductCarousel = ({ title, products, link, prependElement }: { title: string, products: typeof PRODUCTS, link: string, prependElement?: React.ReactNode }) => {
  return (
    <section className="container  mx-auto px-5 sm:px-6 py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-lg sm:text-2xl font-bold">{title}</h2>
        <Link href={link} className="text-foreground font-medium hover:text-foreground/80 text-xs sm:text-sm font-bold">
          View all
        </Link>
      </div>
      <div className="relative">
        <div className="flex overflow-x-auto gap-3 sm:gap-4 snap-x snap-mandatory hide-scrollbar pb-4 -mx-5 sm:-mx-6 px-5 sm:px-6 scroll-px-5 sm:scroll-px-6 items-stretch">
          {prependElement && (
            <div className="w-[200px] sm:w-[280px] shrink-0 snap-start flex flex-col gap-3 sm:gap-4">
              {prependElement}
            </div>
          )}
          {products.map((product) => (
            <div key={product.id} className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] shrink-0 snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const bestSellers = PRODUCTS.slice(0, 8);
  const fruitsProducts = PRODUCTS.filter(p => p.category === 'Fruits & Veg');
  const fashionProducts = PRODUCTS.filter(p => p.category === 'Fashion');
  const drinkProducts = PRODUCTS.filter(p => p.category === 'Beverages');

  const categoryImages = [
    { name: "Vegetables & Fruits", image: "/images/product_placeholder.png" },
    { name: "Grocery & Staples", image: "/images/product_placeholder.png" },
    { name: "Dairy & Eggs", image: "/images/product_placeholder.png" },
    { name: "Beverages", image: "/images/product_placeholder.png" },
    { name: "Snacks & Munchies", image: "/images/product_placeholder.png" },
    { name: "Food", image: "/images/product_placeholder.png" },
    { name: "Fashion", image: "/images/product_placeholder.png" },
    { name: "Bags & Luggage", image: "/images/product_placeholder.png" },
    { name: "Beauty & Personal Care", image: "/images/product_placeholder.png" },
    { name: "Electronics", image: "/images/product_placeholder.png" },
    { name: "Home & Kitchen", image: "/images/product_placeholder.png" },
    { name: "Liquor", image: "/images/product_placeholder.png" },
  ];

  const fruitsPromo = (
    <>

      <div className="flex-1 rounded-2xl bg-[#a7f3d0] p-6 relative overflow-hidden flex flex-col justify-center shadow-sm">
        <div className="relative z-10 w-2/3">
          <h3 className="font-bold text-xl leading-tight mb-2 text-[#064e3b]">GET UP TO 50% OFF</h3>
          <Button size="sm" className="bg-white text-black hover:bg-gray-100 rounded-full h-8 px-4 text-xs font-bold w-fit border-0 shadow-sm">
            Get Discount
          </Button>
        </div>
        <div className="absolute -right-4 -bottom-4 w-32 h-32 opacity-80">
          <Image src="/images/promo_veggies.png" alt="Promo" fill className="object-cover rounded-full" />
        </div>
      </div>


      <div className="flex-1 rounded-2xl bg-[#fde68a] p-6 relative overflow-hidden flex flex-col justify-center shadow-sm cursor-pointer hover:opacity-90 transition-opacity group">
        <div className="relative z-10 w-3/4">
          <h3 className="font-bold text-xl leading-tight mb-2 text-[#713f12]">Winter&apos;s weekend</h3>
          <p className="text-xs text-[#713f12]/80 font-bold leading-tight">keep it casual</p>
        </div>
        <div className="absolute right-4 top-4 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
          <ArrowRight className="w-3 h-3 text-black -rotate-45" />
        </div>
      </div>

    </>
  );

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <HeroSlider />

      {/* Shop by Category - Horizontal Carousel */}
      <section className="container mx-auto px-5 sm:px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-lg sm:text-2xl font-bold">Shop by Category</h2>
          <Link href="/shop" className="text-foreground font-bold hover:underline text-xs sm:text-sm">
            View all
          </Link>
        </div>

        <div className="relative">
          <div className="flex overflow-x-auto gap-3 snap-x snap-mandatory hide-scrollbar pb-4 -mx-5 sm:-mx-6 px-5 sm:px-6 scroll-px-5 sm:scroll-px-6">
            {categoryImages.map((cat, i) => (
              <Link key={i} href="/shop" className="group relative rounded-xl overflow-hidden border hover:border-primary transition-colors flex flex-col justify-end p-3 text-center w-28 sm:w-40 md:w-52 h-20 sm:h-32 md:h-36 shrink-0 snap-start">
                <Image src={cat.image} alt={cat.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <span className="relative z-10 font-bold text-[10px] sm:text-xs md:text-sm text-white leading-tight">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banners */}
      <section className="container mx-auto px-5 -mt-5 sm:px-6 py-4">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2">
          <div className="rounded-xl sm:rounded-2xl bg-[#dcedcd] text-[#1b4e2b] p-4 sm:p-6 relative overflow-hidden h-32 sm:h-44 flex flex-col justify-center">
            <div className="relative z-10 w-2/3">
              <h3 className="font-bold text-sm sm:text-xl leading-tight mb-1">Up to 30% OFF</h3>
              <p className="text-xs sm:text-sm mb-2 sm:mb-4 font-medium">on Fresh Vegetables</p>
              <Button asChild size="sm" variant="outline" className="bg-white border-0 text-black hover:bg-gray-100 rounded-full h-7 sm:h-8 px-3 sm:px-4 text-[10px] sm:text-xs font-bold group w-fit">
                <Link href="/shop">
                  Shop Now <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            <div className="absolute -right-4 -bottom-4 w-20 sm:w-32 h-20 sm:h-32">
              <Image src="/images/promo_veggies.png" alt="Veggies" fill className="object-cover rounded-full" />
            </div>
          </div>

          <div className="rounded-xl sm:rounded-2xl bg-[#fee4c6] text-[#8b4513] p-4 sm:p-6 relative overflow-hidden h-32 sm:h-44 flex flex-col justify-center">
            <div className="relative z-10 w-2/3">
              <h3 className="font-bold text-sm sm:text-xl leading-tight mb-1">Up to 20% OFF</h3>
              <p className="text-xs sm:text-sm mb-2 sm:mb-4 font-medium">on Beverages</p>
              <Button asChild size="sm" variant="outline" className="bg-white border-0 text-black hover:bg-gray-100 rounded-full h-7 sm:h-8 px-3 sm:px-4 text-[10px] sm:text-xs font-bold group w-fit">
                <Link href="/shop">
                  Shop Now <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            <div className="absolute -right-4 -bottom-4 w-20 sm:w-32 h-20 sm:h-32">
              <Image src="/images/promo_drinks.png" alt="Drinks" fill className="object-cover rounded-full" />
            </div>
          </div>

          <div className="rounded-xl sm:rounded-2xl bg-[#d8e0ff] text-[#1e3a8a] p-4 sm:p-6 relative overflow-hidden h-32 sm:h-44 flex flex-col justify-center">
            <div className="relative z-10 w-2/3">
              <h3 className="font-bold text-sm sm:text-xl leading-tight mb-1">Trendy Fashion</h3>
              <p className="text-xs sm:text-sm mb-2 sm:mb-4 font-medium">New Arrivals</p>
              <Button asChild size="sm" variant="outline" className="bg-white border-0 text-black hover:bg-gray-100 rounded-full h-7 sm:h-8 px-3 sm:px-4 text-[10px] sm:text-xs font-bold group w-fit">
                <Link href="/shop">
                  Shop Now <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            <div className="absolute -right-2 bottom-0 w-20 sm:w-32 h-20 sm:h-32">
              <Image src="/images/promo_fashion.png" alt="Fashion" fill className="object-cover rounded-full" />
            </div>
          </div>

          <div className="rounded-xl sm:rounded-2xl bg-[#ffe4e6] text-[#be123c] p-4 sm:p-6 relative overflow-hidden h-32 sm:h-44 flex flex-col justify-center">
            <div className="relative z-10 w-2/3">
              <h3 className="font-bold text-sm sm:text-xl leading-tight mb-1">Daily Essentials</h3>
              <p className="text-xs sm:text-sm mb-2 sm:mb-4 font-medium">Top picks for you</p>
              <Button asChild size="sm" variant="outline" className="bg-white border-0 text-black hover:bg-gray-100 rounded-full h-7 sm:h-8 px-3 sm:px-4 text-[10px] sm:text-xs font-bold group w-fit">
                <Link href="/shop">
                  Shop Now <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            <div className="absolute -right-4 -bottom-4 w-20 sm:w-32 h-20 sm:h-32">
              <Image src="/images/promo_electronics.png" alt="Electronics" fill className="object-cover rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <ProductCarousel title="Best Sellers" products={bestSellers} link="/shop" />

      {/* Specific Category Sections */}
      {fruitsProducts.length > 0 && (
        <ProductCarousel title="Fresh Fruits & Veg" products={fruitsProducts} link="/shop" prependElement={fruitsPromo} />
      )}

      {fashionProducts.length > 0 && (
        <>
          <section className="container mx-auto px-5 sm:px-6 mt-6">
            <div className="relative rounded-0 sm:rounded-sm overflow-hidden bg-zinc-900 h-44 -mt-10 sm:h-64 md:h-80 flex items-center shadow-lg group">
              <Image
                src="/images/hero_fashion.png"
                alt="Fashion Collection"
                fill
                className="object-cover opacity-80 "
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
              <div className="relative z-10 p-5 sm:p-8 md:p-16 max-w-2xl">
                <h2 className="font-heading text-xl sm:text-3xl md:text-5xl font-bold mb-2 sm:mb-3 text-white drop-shadow-md">
                  Trending Fashion
                </h2>
                <p className="text-white/90 text-xs sm:text-lg mb-3 sm:mb-6 drop-shadow-sm">
                  Step up your style game with our latest premium apparel collection.
                </p>
                <Button asChild style={{ background: "#2563eb", color: "#fff", borderRadius: "8px", fontWeight: 700, padding: "7px 14px" }} className="hover:opacity-90 transition-opacity border-0 text-xs sm:text-base h-8 sm:h-auto">
                  <Link href="/shop">
                    Explore Trends <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
          <ProductCarousel title="Fashion & Apparel" products={fashionProducts} link="/shop" />
        </>
      )}

      {drinkProducts.length > 0 && (
        <>
          <section className="container mx-auto px-5 sm:px-6 mt-6">
            <div className="relative rounded-0 sm:rounded-lg overflow-hidden bg-zinc-900 h-44 -mt-10 sm:h-64 md:h-80 flex items-center shadow-lg group">
              <Image
                src="/images/hero_liquor.png"
                alt="Premium Liquors"
                fill
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
              <div className="relative z-10 p-5 sm:p-8 md:p-16 max-w-2xl">
                <h2 className="font-heading text-xl sm:text-3xl md:text-5xl font-bold mb-2 sm:mb-3 text-white drop-shadow-md">
                  Premium Liquors
                </h2>
                <p className="text-white/90 text-xs sm:text-lg mb-3 sm:mb-6 drop-shadow-sm">
                  Discover the finest selection of beverages for your perfect evening.
                </p>
                <Button asChild style={{ background: "#2563eb", color: "#fff", borderRadius: "8px", fontWeight: 700, padding: "7px 14px" }} className="hover:opacity-90 transition-opacity border-0 text-xs sm:text-base h-8 sm:h-auto">
                  <Link href="/shop">
                    Explore Spirits <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
          <ProductCarousel title="Beverages & Drinks" products={drinkProducts} link="/shop" />

          {/* ── Stella-Style 3-Panel Banners ── */}
          <section className="container mx-auto px-5 sm:px-6 mt-4 mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:h-[500px]">

              {/* Left Large Banner — teal text | image split */}
              <div
                className="relative rounded-[20px] sm:rounded-[24px] overflow-hidden flex min-h-[280px] sm:min-h-[360px] lg:min-h-full group"
                style={{ background: "#2dd4bf" }}
              >
                <div className="relative z-10 flex flex-col justify-between w-[46%] sm:w-[42%] shrink-0 p-5 sm:p-8 lg:p-10">
                  <div>
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-sm flex items-center justify-center">
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#2dd4bf] rounded-[2px]" />
                      </div>
                      <span className="text-white font-bold text-base sm:text-xl tracking-tight">woxly</span>
                    </div>

                    <h2 className="text-xl sm:text-3xl lg:text-5xl font-bold text-white leading-[1.15] tracking-tight">
                      Your Style,<br />
                      Delivered.<br />
                      Exclusively<br />
                      Online.
                    </h2>
                  </div>

                  <Link href="/shop" className="text-white/90 text-xs sm:text-sm font-medium hover:text-white hover:underline transition-colors mt-4">
                    www.woxly.com
                  </Link>
                </div>

                <div className="relative flex-1 min-h-full">
                  <Image
                    src="/images/hero_fashion.png"
                    alt="Style Delivered"
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </div>


              {/* Right Stacked Banners */}
              <div className="flex flex-col gap-4 sm:gap-6 h-full">

                {/* Top Right Banner — image left, text right */}
                <div className="flex-1 relative rounded-[20px] sm:rounded-[24px] overflow-hidden bg-[#fafafa] flex items-center min-h-[180px] sm:min-h-[240px] group border border-zinc-100">
                  <div className="relative w-[42%] sm:w-[45%] h-full min-h-[180px] sm:min-h-[240px] shrink-0">
                    <Image
                      src="/images/promo_electronics.png"
                      alt="Accessories"
                      fill
                      className="object-contain p-3 sm:p-4 drop-shadow-xl"
                    />
                  </div>
                  <div className="relative z-10 flex-1 py-5 pr-5 pl-2 sm:p-8 sm:pl-4">
                    <p className="text-xs sm:text-sm font-semibold text-zinc-500 mb-1.5 sm:mb-2">Timeless elegance</p>
                    <h3 className="text-base sm:text-[1.75rem] font-bold text-zinc-900 leading-tight mb-3 sm:mb-6">
                      Discover our<br />accessories collection
                    </h3>
                    <Button asChild style={{ background: "#2563eb", color: "#fff", borderRadius: "8px", fontWeight: 700, padding: "0 16px" }} className="hover:opacity-90 transition-opacity border-0 h-8 sm:h-10 text-xs sm:text-sm">
                      <Link href="/shop?category=electronics">Shop Now</Link>
                    </Button>
                  </div>
                </div>

                {/* Bottom Right Banner — text left, image right */}
                <div className="flex-1 relative rounded-[20px] sm:rounded-[24px] overflow-hidden bg-[#fafafa] flex items-center min-h-[180px] sm:min-h-[240px] group border border-zinc-100">
                  <div className="relative z-10 flex-1 py-5 pl-5 pr-2 sm:p-8 sm:pr-4">
                    <p className="text-xs sm:text-sm font-semibold text-zinc-500 mb-1.5 sm:mb-2">Find your perfect pair</p>
                    <h3 className="text-base sm:text-[1.75rem] font-bold text-zinc-900 leading-tight mb-3 sm:mb-6">
                      Explore our shoes<br />collection
                    </h3>
                    <Button asChild style={{ background: "#2563eb", color: "#fff", borderRadius: "8px", fontWeight: 700, padding: "0 16px" }} className="hover:opacity-90 transition-opacity border-0 h-8 sm:h-10 text-xs sm:text-sm">
                      <Link href="/shop?category=fashion ">Shop Now</Link>
                    </Button>
                  </div>
                  <div className="relative w-[42%] sm:w-[45%] h-full min-h-[180px] sm:min-h-[240px] shrink-0">
                    <Image
                      src="/images/promo_fashion.png"
                      alt="Shoes"
                      fill
                      className="object-contain p-3 sm:p-4 drop-shadow-xl"
                    />
                  </div>
                </div>

              </div>
            </div>
          </section>
        </>
      )}

      {/* Features + Newsletter */}
      <section className="container mx-auto px-5 sm:px-6 mt-2 mb-5">
        {/* Service highlights */}
        <div className="grid grid-cols-4 sm:border sm:border-zinc-200 rounded-xl overflow-hidden mb-12 sm:mb-16 ">
          {[
            { icon: Truck, title: "Free Delivery", desc: "On orders above ₹499" },
            { icon: RefreshCcw, title: "Easy Returns", desc: "30-day hassle-free" },
            { icon: Lock, title: "Secure Payment", desc: "UPI, cards, net banking" },
            { icon: Banknote, title: "Cash on Delivery", desc: "Available on select pincodes" },
          ].map((item, i) => (
            <div
              key={item.title}
              className={`flex flex-col items-center text-center gap-2 p-3 sm:p-6 sm:flex-row sm:text-left sm:gap-4 ${i >= 1 ? "sm:border-l sm:border-zinc-200" : ""
                }`}
            >
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-zinc-100 flex items-center justify-center shrink-0">
                <item.icon className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-zinc-700" strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-[10px] sm:text-base text-foreground leading-tight">{item.title}</p>
                <p className="text-[9px] sm:text-sm text-muted-foreground mt-0.5 leading-snug hidden sm:block">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-12">
          <div className="max-w-md">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Stay in the loop
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Get updates on new products, promotions, and exclusive offers.
            </p>
          </div>

          <div className="w-full lg:max-w-lg">
            <form className="flex flex-col sm:flex-row gap-2.5" action="#">
              <input
                type="email"
                name="email"
                placeholder="email@example.com"
                className="flex-1 h-14 sm:h-12 px-4   rounded-lg bg-zinc-100 border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Button
                type="submit"
                className="h-11 sm:h-12 px-5 rounded-lg bg-zinc-500 hover:bg-zinc-600 text-white font-medium border-0 gap-2 shrink-0"
              >
                <Mail className="w-4 h-4" />
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-2.5">
              We respect your privacy. No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

