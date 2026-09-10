import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/ProductCard";
import { HeroSlider } from "@/components/home/HeroSlider";
import { StationaryBanners } from "@/components/home/StationaryBanners";
import { PRODUCTS } from "@/lib/mock-data";
import { ChevronRight, ShieldCheck, Headphones, ArrowRight, Mail, Bell } from "lucide-react";
import { IconTruck, IconRefresh, IconLock, IconCash } from "@tabler/icons-react";

// Reusable Product Carousel Component
const ProductCarousel = ({
  title,
  description,
  products,
  link,
  prependElement,
}: {
  title: string;
  description?: string;
  products: typeof PRODUCTS;
  link: string;
  prependElement?: React.ReactNode;
}) => {
  return (
    <section className="container  mx-auto px-5 sm:px-6 py-6 mb-1">
      <h2 className="font-heading text-lg sm:text-2xl font-bold mb-1">{title}</h2>
      <div className="flex items-center justify-between gap-0 sm:gap-0 mb-1">
        {description ? (
          <p className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-[0.12em] font-medium line-clamp-2 sm:truncate min-w-0 flex-1">
            {description}
          </p>
        ) : (
          <span className="flex-1" />
        )}
        <Link
          href={link}
          className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.12em] text-primary hover:text-primary/80 shrink-0 inline-flex items-center gap-1 text-muted-foreground"
        >
          See all
          <ArrowRight className="w-3.5 h-3.5 " strokeWidth={2} />
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
            <div key={product.id} className="w-[180px] sm:w-[200px] md:w-[240px] lg:w-[280px] shrink-0 snap-start">
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
  const stationaryProducts = PRODUCTS.filter(p => p.category === 'Stationery');
  const meatProducts = PRODUCTS.filter(p => p.category === 'Meat & Seafood');

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
        <h2 className="font-heading text-lg sm:text-2xl font-bold mb-0">Shop by Category</h2>
        <div className="flex items-center justify-between gap-3 sm:gap-4 mb-4">
          <p className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-[0.12em] font-medium line-clamp-2 sm:truncate min-w-0 flex-1">
            Clean categories. Faster discovery.
          </p>
          <Link
            href="/shop"
            className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.12em] text-primary hover:text-primary/80 shrink-0 inline-flex items-center gap-1 text-muted-foreground"
          >
            See all
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
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



      {/* Specific Category Sections */}
      {fruitsProducts.length > 0 && (
        <>
          <section className="container mx-auto px-5 sm:px-6 mt-2 mb-0">
            <div className="relative rounded-md overflow-hidden bg-zinc-900 h-[110px] sm:h-64 md:h-80 flex items-center shadow-xl group">
              <Image
                src="/images/banners/Fruits_arranged_on_dark_background_20260910170343.jpeg"
                alt="Dairy & Beverages"
                fill
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
              <div className="relative z-10 p-5 sm:p-8 md:p-12 w-[70%] sm:max-w-md flex flex-col items-start">
                <h2 className="font-heading text-16 sm:text-3xl md:text-5xl font-extrabold mb-1 sm:mb-3 text-white drop-shadow-md leading-tight tracking-tight">
                  Fruits & Vegetables                </h2>
                <p className="text-white/90 text-[10px] sm:text-base mb-3 sm:mb-6 drop-shadow-sm font-medium leading-snug">
                  Picked fresh. Delivered to your door.                </p>
                <Button asChild className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white rounded-xl font-bold border-0 text-[10px] sm:text-sm h-7 sm:h-10 px-4 sm:px-6 transition-colors shadow-none">
                  <Link href="/shop">
                    Explore <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
          <ProductCarousel
            title="Fruits & Vegetables"
            description="Picked fresh. Delivered to your door."
            products={fruitsProducts}
            link="/shop"
            prependElement={fruitsPromo}
          />
        </>
      )}

      {fashionProducts.length > 0 && (
        <>
          <section className="container mx-auto px-5 sm:px-6 mt-0 mb-0">
            <div className="relative rounded-md overflow-hidden bg-zinc-900 h-[110px] sm:h-64 md:h-80 flex items-center shadow-xl group">
              <Image
                src="/images/hero_fashion.png"
                alt="Trending Fashion"
                fill
                className="object-cover opacity-80 "
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
              <div className="relative z-10 p-5 sm:p-8 md:p-12 w-[70%] sm:max-w-md flex flex-col items-start">
                <h2 className="font-heading text-16 sm:text-3xl md:text-5xl font-extrabold mb-1 sm:mb-3 text-white drop-shadow-md leading-tight tracking-tight">
                  Fashion & Clothing
                </h2>
                <p className="text-white/90 text-[10px] sm:text-base mb-3 sm:mb-6 drop-shadow-sm font-medium leading-snug">
                  Everyday wear. Every size. Every style.                </p>
                <Button asChild className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white rounded-xl font-bold border-0 text-[10px] sm:text-sm h-7 sm:h-10 px-4 sm:px-6 transition-colors shadow-none">
                  <Link href="/shop">
                    Explore <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
          <ProductCarousel
            title="Fashion & Clothing"
            description="Everyday wear. Every size. Every style."
            products={fashionProducts}
            link="/shop"
          />
        </>
      )}

      {drinkProducts.length > 0 && (
        <>
          <section className="container mx-auto px-5 sm:px-6 mt-0 mb-0">
            <div className="relative rounded-md overflow-hidden bg-zinc-900 h-[110px] sm:h-64 md:h-80 flex items-center shadow-lg group">
              <Image
                src="/images/hero_liquor.png"
                alt="Premium Liquors"
                fill
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
              <div className="relative z-10 p-5 sm:p-8 md:p-12 w-[70%] sm:max-w-md flex flex-col items-start">
                <h2 className="font-heading text-16 sm:text-3xl md:text-5xl font-extrabold mb-1 sm:mb-3 text-white drop-shadow-md leading-tight tracking-tight">
                  Dairy & Beverages
                </h2>
                <p className="text-white/90 text-[10px] sm:text-base mb-3 sm:mb-6 drop-shadow-sm font-medium leading-snug">
                  Cold, fresh, and ready to pour.
                </p>
                <Button asChild className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white rounded-xl font-bold border-0 text-[10px] sm:text-sm h-7 sm:h-10 px-4 sm:px-6 transition-colors shadow-none">
                  <Link href="/shop">
                    Explore <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
          <ProductCarousel
            title="Dairy & Beverages"
            description="Cold, fresh, and ready to pour."
            products={drinkProducts}
            link="/shop"
          />


        </>
      )}

      {stationaryProducts.length > 0 && (
        <>
          <StationaryBanners />
          <ProductCarousel
            title="Stationery & Office Supplies"
            description="Pens, notebooks, and desk essentials."
            products={stationaryProducts}
            link="/shop"
          />
        </>
      )}

      {meatProducts.length > 0 && (
        <>
          <section className="container mx-auto px-5 sm:px-6 mt-0 mb-0">
            <div className="relative rounded-md overflow-hidden bg-zinc-900 h-[110px] sm:h-64 md:h-80 flex items-center shadow-lg group">
              <Image
                src="/images/banners/Meat_and_seafood_arrangement_20260910171526.jpeg"
                alt="Fresh Meat & Seafood"
                fill
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
              <div className="relative z-10 p-5 sm:p-8 md:p-12 w-[70%] sm:max-w-md flex flex-col items-start">
                <h2 className="font-heading text-16 sm:text-3xl md:text-5xl font-extrabold mb-1 sm:mb-3 text-white drop-shadow-md leading-tight tracking-tight">
                  Fresh Meat & Seafood
                </h2>
                <p className="text-white/90 text-[10px] sm:text-base mb-3 sm:mb-6 drop-shadow-sm font-medium leading-snug">
                  Premium cuts and fresh catches delivered.
                </p>
                <Button asChild className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white rounded-xl font-bold border-0 text-[10px] sm:text-sm h-7 sm:h-10 px-4 sm:px-6 transition-colors shadow-none">
                  <Link href="/shop">
                    Explore <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
          <ProductCarousel
            title="Fresh Meat & Seafood"
            description="Premium cuts and fresh catches delivered."
            products={meatProducts}
            link="/shop"
          />
        </>
      )}



      <section className="container mx-auto px-5 sm:px-6 mt-0 mb-2">
        <div className="relative rounded-xl overflow-hidden bg-zinc-900 h-[200px] sm:h-64 md:h-80 flex items-center shadow-lg group">
          <Image
            src="/images/banners/Mobile_phones_displayed_diagonally_20260910171528.jpeg"
            alt="Premium Liquors"
            fill
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />

        </div>
      </section>
      {/* Features + Newsletter */}
      <section className="container mx-auto px-5 sm:px-6 mt-2 mb-5">
        {/* Service highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border border-gray-100 sm:border-zinc-200 rounded-xl sm:rounded-xl bg-white mb-6 sm:mb-16 shadow-sm">
          {[
            { icon: IconTruck, title: "Free Delivery", desc: "Doorstep in your delivery area" },
            { icon: IconRefresh, title: "Easy Returns", desc: "Hassle-free return policy" },
            { icon: IconLock, title: "Secure Payment", desc: "Checkout with confidence" },
            { icon: IconLock, title: "Cash on Delivery", desc: "Pay when you receive" },
          ].map((item, i) => (
            <div
              key={item.title}
              className={`flex flex-row items-center gap-3 py-4 px-3 sm:p-6 
                ${i < 2 ? "border-b border-gray-100 sm:border-b-0" : ""}
                ${i % 2 === 1 ? "border-l border-gray-100" : ""}
                ${i >= 1 ? "sm:border-l sm:border-zinc-200" : ""}
              `}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-0 bg-[#f5f3ff] flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 sm:w-5 sm:h-5 text-primary stroke-[1.5]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-[13px] sm:text-base text-gray-900 leading-tight pr-1">{item.title}</p>
                <p className="hidden sm:block text-[13px] sm:text-sm text-gray-500 sm:text-muted-foreground leading-snug mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>


        {/* Newsletter */}
        <div className="mt-6 mb-2">
          <div className="bg-[#14452f] rounded-[10px] sm:rounded-[20px] p-6 sm:p-8 lg:px-10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between">
            {/* Background Pattern */}
            <div className="absolute -bottom-10 -right-10 opacity-30 pointer-events-none">
              <svg width="250" height="250" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 0C150 0 200 50 200 100C200 150 150 200 100 200C50 200 0 150 0 100C0 50 50 0 100 0Z" fill="#2d6a4f" />
                <path d="M50 50C100 50 150 100 150 150C100 150 50 100 50 50Z" fill="#1b4332" />
                <path d="M150 50C100 50 50 100 50 150C100 150 150 100 150 50Z" fill="#40916c" />
              </svg>
            </div>

            <div className="relative z-10 max-w-lg w-full">
              <h2 className="font-heading text-[22px] sm:text-[26px] font-bold text-white mb-1.5">
                Stay in the loop
              </h2>
              <p className="text-[12px] sm:text-[13px] text-green-50/90 mb-5 leading-snug">
                Get updates on new products,<br className="hidden sm:block" />promotions, and exclusive offers.
              </p>

              <form className="flex w-full bg-white p-1 rounded-full items-center mb-3 flex-row shadow-lg border border-white" action="#">
                <input suppressHydrationWarning
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="flex-1 w-full h-10 px-4 bg-transparent border-none text-[13px] sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-0"
                  required
                />
                <Button
                  type="submit"
                  className="h-9 sm:h-10 px-5 sm:px-6 rounded-full bg-[#1b5e20] hover:bg-[#14452f] text-white text-[12px] sm:text-[13px] font-medium border-0 gap-1.5 shrink-0 transition-colors"
                >
                  Subscribe <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </Button>
              </form>
              <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-green-100/90 ml-1">
                <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>No spam. Unsubscribe anytime.</span>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="relative z-10 hidden md:flex items-center justify-center shrink-0 w-48 h-32 mr-4 lg:mr-10">
              <div className="relative w-36 h-24">
                {/* Back of envelope */}
                <div className="absolute inset-0 bg-[#2d6a4f] rounded-lg shadow-md" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}></div>
                {/* Letter inside */}
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-[85%] h-[110%] bg-[#f8f9fa] rounded shadow-sm border border-gray-100 flex flex-col p-3.5 gap-2.5">
                  <div className="w-1/3 h-1.5 bg-gray-200 rounded-full"></div>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full"></div>
                  <div className="w-5/6 h-1.5 bg-gray-200 rounded-full"></div>
                  <div className="w-2/3 h-1.5 bg-gray-200 rounded-full"></div>
                </div>
                {/* Front flaps */}
                <div className="absolute inset-0 bg-[#40916c] rounded-lg shadow-[0_-2px_10px_rgba(0,0,0,0.15)]" style={{ clipPath: 'polygon(0 0, 50% 50%, 100% 0, 100% 100%, 0 100%)' }}></div>
                <div className="absolute inset-0 bg-[#1b4332] rounded-lg opacity-30" style={{ clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)' }}></div>

                {/* Notification Bell */}
                <div className="absolute -top-3 -right-3 w-9 h-9 bg-[#f59e0b] rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                  <Bell className="w-4 h-4 text-white fill-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

