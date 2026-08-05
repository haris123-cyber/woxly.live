"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { PRODUCTS } from "@/lib/mock-data";
import { useCartStore } from "@/store/useCartStore";
import { useWatchlistStore } from "@/store/useWatchlistStore";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/ProductCard";
import {
  Star,
  Truck,
  Minus,
  Plus,
  Heart,
  ShoppingBag,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  Percent,
  BadgePercent,
  ShieldCheck,
  ShieldAlert,
} from "lucide-react";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const product = PRODUCTS.find((p) => p.slug === slug);
  const addItem = useCartStore((state) => state.addItem);
  const { toggleItem, isInWatchlist } = useWatchlistStore();
  const router = useRouter();

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product?.colors?.[0] || "Brown"
  );
  const [imageIndex, setImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");
  const [isWarrantyOpen, setIsWarrantyOpen] = useState(false);
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);

  if (!product) {
    return (
      <div className="container mx-auto px-5 py-32 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The product you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/shop">Back to Shop</Link>
        </Button>
      </div>
    );
  }

  const inWatchlist = isInWatchlist(product.id);
  const colorMap: Record<string, string> = {
    Black: "#1f2937",
    Silver: "#c0c0c0",
    Brown: "#8B5E3C",
    "Light Brown": "#C4A484",
    White: "#f5f5f5",
    Blue: "#3b82f6",
    Red: "#ef4444",
  };
  const colorLabels = product.colors || ["Brown", "Light Brown", "Black"];
  const colors = colorLabels.map((c) => colorMap[c] || "#8B5E3C");
  const gallery = [product.image, product.image, product.image];
  const originalPrice = product.originalPrice;
  const discountPercentage = originalPrice ? Math.round(((originalPrice - product.price) / originalPrice) * 100) : 0;

  const handleAddToCart = () => {
    addItem(product, quantity, selectedColor, product.sizes?.[0]);
    router.push("/cart");
  };

  const handleBuyNow = () => {
    addItem(product, quantity, selectedColor, product.sizes?.[0]);
    router.push("/checkout");
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 8);

  const reviews = [
    {
      name: "Cameron Williamson",
      text: "I recently bought this and I'm thrilled with my purchase!",
    },
    {
      name: "Brooklyn Simmons",
      text: "Great quality and arrived on time. Highly recommend!",
    },
    {
      name: "Dianne Russell",
      rating: 4,
      text: "Good product overall. Delivery was a day late.",
    },
  ];

  return (
    <div className="bg-background min-h-screen overflow-x-hidden">
      {/* ── MOBILE LAYOUT ── */}
      <div className="lg:hidden pb-6">
        {/* Header */}
        <div className="px-4 py-4">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm"
            aria-label="Back"
          >
            <ChevronLeft className="w-5 h-5 pr-0.5" />
          </button>
        </div>

        <div className="px-5 pt-4">
          {/* Title first (structure like reference) */}
          <h2 className="text-2xl font-bold text-foreground leading-tight mb-1">
            {product.name}
          </h2>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {product.description || "Premium quality product crafted for modern living."}
          </p>

          {/* Horizontal image carousel */}
          <div className="relative mb-4 -mx-5">
            <div className="flex gap-3 overflow-x-auto hide-scrollbar snap-x snap-mandatory px-5 pb-1">
              {gallery.map((img, i) => (
                <div
                  key={i}
                  className="relative w-[78%] shrink-0 aspect-square rounded-2xl overflow-hidden bg-muted snap-center"
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${i + 1}`}
                    fill
                    className="object-contain p-6"
                    priority={i === 0}
                    sizes="78vw"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={() => toggleItem(product)}
              className="absolute top-3 right-8 w-10 h-10 bg-background rounded-full flex items-center justify-center shadow-md z-10"
              aria-label="Wishlist"
            >
              <Heart
                className={`w-5 h-5 ${inWatchlist ? "fill-red-500 text-red-500" : "text-muted-foreground"}`}
              />
            </button>
          </div>



          {/* Price + stock row */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-2xl font-bold text-primary">₹{product.price.toFixed(2)}</span>
              {originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ₹{originalPrice.toFixed(2)}
                </span>
              )}
              {discountPercentage > 0 && (
                <span
                  className="bg-[#00a859] text-white text-[10px] font-bold pl-2 pr-3 py-0.5 ml-1 whitespace-nowrap"
                  style={{ clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 100%, 0 100%)" }}
                >
                  {discountPercentage}% OFF
                </span>
              )}
            </div>
            <span className="text-sm font-medium text-foreground">
              {product.inStock ? "In stock" : "Out of stock"}
            </span>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-3 mt-4 mb-4">
            <span className="text-sm font-medium text-foreground">Qty</span>
            <div className="flex items-center border border-border rounded-lg bg-background h-10">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-9 h-full flex items-center justify-center text-muted-foreground"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <motion.span
                key={quantity}
                initial={{ opacity: 0, scale: 0.8, filter: "blur(2px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.15 }}
                className="w-8 text-center text-sm font-semibold inline-block"
              >
                {quantity}
              </motion.span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-9 h-full flex items-center justify-center text-muted-foreground"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Offers & Discounts */}
          <div className="mb-6 mt-6">
            <h3 className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] mb-4 font-semibold">
              Offers & Discounts
            </h3>

            <div className="relative overflow-hidden bg-[#f4faf5] rounded-xl flex items-stretch py-2 mb-5 w-full border border-[#dcfce7]">
              {/* Icon */}
              <div className="shrink-0 flex items-center justify-center pl-3 pr-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#55a630] rounded-[14px] flex items-center justify-center text-white relative shadow-sm rotate-45">
                  <div className="-rotate-45 flex items-center justify-center relative w-full h-full">
                    <BadgePercent className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
                    <Star className="w-2 h-2 fill-yellow-300 text-yellow-300 absolute top-0.5 left-0.5" />
                    <Star className="w-1.5 h-1.5 fill-yellow-300 text-yellow-300 absolute bottom-1 right-0.5" />
                  </div>
                </div>
              </div>

              {/* Dashed line */}
              <div className="w-px border-l-2 border-dashed border-[#bbf7d0] my-1.5"></div>

              {/* Main text */}
              <div className="px-3 flex flex-col justify-center flex-1 sm:flex-none">
                <span className="text-[#064e3b] font-extrabold text-[15px] sm:text-[17px] leading-none mb-1 whitespace-nowrap">Save ₹50</span>
                <span className="text-[#111827] font-bold text-[11px] sm:text-[12px] leading-none whitespace-nowrap">with online payment</span>
              </div>

              {/* Dashed line */}
              <div className="hidden sm:block w-px border-l-2 border-dashed border-[#bbf7d0] my-1.5"></div>

              {/* Sub text */}
              <div className="hidden sm:flex px-3 flex-col justify-center flex-1">
                <span className="text-gray-800 text-[10px] sm:text-[11px] leading-tight font-medium">Pay online</span>
                <span className="text-gray-800 text-[10px] sm:text-[11px] leading-tight font-medium">& get extra discount</span>
              </div>

              {/* Decorative elements */}
              <div className="absolute right-0 top-0 bottom-0 w-12 overflow-hidden pointer-events-none">
                <div className="w-1.5 h-1.5 bg-[#84cc16] transform rotate-45 absolute top-2 right-4"></div>
                <div className="w-1 h-1 bg-[#65a30d] transform rotate-45 absolute top-5 right-8"></div>
                <div className="w-2 h-2 bg-[#a3e635] transform rotate-45 absolute bottom-2 right-6"></div>
                <div className="w-1.5 h-1.5 bg-[#84cc16] transform rotate-45 absolute bottom-4 right-2"></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pb-6 mb-2">
              <div className="flex flex-col items-center justify-center text-center gap-2">
                <Truck className="w-6 h-6 text-[#1e1b4b]" />
                <span className="text-[11px] font-bold text-[#1e1b4b]">No Return</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center gap-2">
                <ShieldCheck className="w-6 h-6 text-[#1e1b4b]" />
                <span className="text-[11px] font-bold text-[#1e1b4b]">High Quality material</span>
              </div>
            </div>

            <div >
              <div className="flex flex-col ">
                <button
                  onClick={() => setIsWarrantyOpen(!isWarrantyOpen)}
                  className="flex items-center justify-between py-4 w-full hover:opacity-80 transition-opacity"
                >
                  <div className="flex items-center gap-3">
                    <ShieldAlert className="w-4 h-4 text-foreground" />
                    <span className="text-[12px] font-bold tracking-wider uppercase">WARRANTY</span>
                  </div>
                  {isWarrantyOpen ? (
                    <Minus className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Plus className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
                {isWarrantyOpen && (
                  <div className="pb-4 text-sm text-muted-foreground leading-relaxed">
                    All products come with a standard 1-year warranty covering manufacturing defects. Extended warranty options are available at checkout.
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <button
                  onClick={() => setIsDeliveryOpen(!isDeliveryOpen)}
                  className="flex items-center justify-between py-4 w-full hover:opacity-80 transition-opacity"
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-4 h-4 text-foreground" />
                    <span className="text-[12px] font-bold tracking-wider uppercase">DELIVERY</span>
                  </div>
                  {isDeliveryOpen ? (
                    <Minus className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Plus className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
                {isDeliveryOpen && (
                  <div className="pb-4 text-sm text-muted-foreground leading-relaxed">
                    Free standard delivery on orders over ₹50. Next day delivery available for orders placed before 2 PM. Tracking information will be provided once dispatched.
                  </div>
                )}
              </div>
            </div>
          </div>



          {/* Tabs: Description / Reviews */}
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4 border-b border-border">
              <button
                onClick={() => setActiveTab("description")}
                className={`text-[11px] font-bold tracking-wider uppercase pb-2 ${activeTab === "description"
                  ? "border-b-2 border-[#1e1b4b] text-[#1e1b4b]"
                  : "text-muted-foreground"
                  }`}
              >
                DESCRIPTION
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`text-[11px] font-bold tracking-wider uppercase pb-2 ${activeTab === "reviews"
                  ? "border-b-2 border-[#1e1b4b] text-[#1e1b4b]"
                  : "text-muted-foreground"
                  }`}
              >
                REVIEWS ({reviews.length})
              </button>
            </div>

            {activeTab === "description" && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {product.description ||
                  "Coorg blend. 75% chicory-free. Strong, South Indian style. Add up to 3 extra input fields for customers (e.g. gift note, review text). Maximum 3 custom fields allowed."}
              </p>
            )}

            {activeTab === "reviews" && (
              <div className="flex flex-col gap-4">
                {reviews.map((review, idx) => (
                  <div
                    key={idx}
                    className="border border-border p-4 bg-background rounded-lg"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-muted relative overflow-hidden shrink-0">
                        <Image
                          src="/images/product_placeholder.png"
                          alt={review.name}
                          fill
                          className="object-cover p-0.5"
                          sizes="32px"
                        />
                      </div>
                      <span className="text-xs font-bold">{review.name}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-1.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < (review.rating || 5)
                            ? "fill-[#facc15] text-[#facc15]"
                            : "fill-gray-200 text-gray-200"
                            }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Related — horizontal */}
          {relatedProducts.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-foreground">Related items</h3>
                <Link href="/shop" className="text-sm text-muted-foreground underline">
                  View all
                </Link>
              </div>
              <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1 -mx-5 px-5">
                {relatedProducts.map((p) => (
                  <div key={p.id} className="w-[140px] shrink-0">
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sticky bottom CTAs — side by side */}
        <div className="fixed bottom-[calc(3.5rem+env(safe-area-inset-bottom))] left-0 right-0 z-40 bg-transparent  px-4 py-3 flex gap-3 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
          <Button
            onClick={handleAddToCart}
            variant="outline"
            className="flex-1 h-12 rounded-xl bg-white  text-foreground  font-bold text-sm uppercase tracking-wide"
          >
            Add to Cart
          </Button>
          <Button
            onClick={handleBuyNow}
            className="flex-1 h-12 rounded-md bg-primary  hover:opacity-90 text-primary-foreground font-bold text-sm uppercase tracking-wide border-0"
          >
            Buy Now
          </Button>
        </div>
      </div>

      {/* ── DESKTOP LAYOUT ── */}
      <div className="hidden lg:block container mx-auto px-6 py-8 max-w-7xl">
        <div className="flex flex-row gap-12 mb-10">
          <div className="w-[60%] flex gap-4 h-[560px] min-w-0">
            <div className="w-20 flex flex-col gap-3 h-full overflow-y-auto pr-1 shrink-0">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImageIndex(i)}
                  className={`relative w-full aspect-square rounded-lg overflow-hidden bg-muted shrink-0 ${imageIndex === i ? "border border-foreground opacity-100" : "opacity-60"
                    }`}
                >
                  <Image src={img} alt="" fill className="object-cover p-2" sizes="80px" />
                </button>
              ))}
            </div>
            <div className="relative flex-1 min-w-0 bg-muted rounded-xl overflow-hidden">
              <Image
                src={gallery[imageIndex]}
                alt={product.name}
                fill
                className="object-contain p-12"
                priority
                sizes="50vw"
              />
            </div>
          </div>

          <div className="w-[40%] flex flex-col min-w-0 pt-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">{product.name}</h1>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-medium text-muted-foreground underline">
                {product.rating} ({product.reviews})
              </span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating || 0)
                      ? "fill-[#facc15] text-[#facc15]"
                      : "fill-gray-200 text-gray-200"
                      }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span className="text-2xl font-bold text-foreground">₹{product.price.toFixed(2)}</span>
              {originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ₹{originalPrice.toFixed(2)}
                </span>
              )}
              {/* Green Discount Tag */}
              {discountPercentage > 0 && (
                <span
                  className="bg-[#00a859] text-white text-[12px] font-bold pl-3.5 pr-4.5 py-1 whitespace-nowrap"
                  style={{ clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 100%, 0 100%)" }}
                >
                  {discountPercentage}% OFF
                </span>
              )}
            </div>

            <div className="flex flex-col gap-4 mb-10">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-border bg-background h-12 min-w-[120px]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-full flex items-center justify-center text-muted-foreground hover:bg-muted"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <motion.span
                    key={quantity}
                    initial={{ opacity: 0, scale: 0.8, filter: "blur(2px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.15 }}
                    className="flex-1 text-center font-bold text-base inline-block"
                  >
                    {quantity}
                  </motion.span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-full flex items-center justify-center text-muted-foreground hover:bg-muted"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  className="flex-1 h-12 font-medium text-[15px] border-border text-foreground hover:bg-muted"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" /> Add to cart — ₹{product.price.toFixed(2)}
                </Button>

                <Button
                  onClick={() => toggleItem(product)}
                  variant="outline"
                  className="w-12 h-12 p-0 border-border flex items-center justify-center shrink-0 hover:bg-muted"
                >
                  <Heart className={`w-5 h-5 ${inWatchlist ? "fill-red-500 text-red-500" : "text-foreground"}`} />
                </Button>
              </div>

              <Button
                onClick={handleBuyNow}
                className="w-full h-14 bg-primary rounded-lg hover:bg-primary/90 text-white font-bold text-[15px] uppercase tracking-wide"
              >
                Buy Now
              </Button>
            </div>

            {/* Offers & Discounts Desktop */}
            <div className="mb-6 mt-6">
              <h3 className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] mb-4 font-semibold">
                Offers & Discounts
              </h3>

              <div className="relative overflow-hidden bg-[#f4faf5] rounded-xl flex items-stretch py-2 mb-5 w-full border border-[#dcfce7]">
                {/* Icon */}
                <div className="shrink-0 flex items-center justify-center pl-3 pr-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#55a630] rounded-[14px] flex items-center justify-center text-white relative shadow-sm rotate-45">
                    <div className="-rotate-45 flex items-center justify-center relative w-full h-full">
                      <BadgePercent className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
                      <Star className="w-2 h-2 fill-yellow-300 text-yellow-300 absolute top-0.5 left-0.5" />
                      <Star className="w-1.5 h-1.5 fill-yellow-300 text-yellow-300 absolute bottom-1 right-0.5" />
                    </div>
                  </div>
                </div>

                {/* Dashed line */}
                <div className="w-px border-l-2 border-dashed border-[#bbf7d0] my-1.5"></div>

                {/* Main text */}
                <div className="px-3 flex flex-col justify-center flex-1 sm:flex-none">
                  <span className="text-[#064e3b] font-extrabold text-[15px] sm:text-[17px] leading-none mb-1 whitespace-nowrap">Save ₹50</span>
                  <span className="text-[#111827] font-bold text-[11px] sm:text-[12px] leading-none whitespace-nowrap">with online payment</span>
                </div>

                {/* Dashed line */}
                <div className="hidden sm:block w-px border-l-2 border-dashed border-[#bbf7d0] my-1.5"></div>

                {/* Sub text */}
                <div className="hidden sm:flex px-3 flex-col justify-center flex-1">
                  <span className="text-gray-800 text-[10px] sm:text-[11px] leading-tight font-medium">Pay online</span>
                  <span className="text-gray-800 text-[10px] sm:text-[11px] leading-tight font-medium">& get extra discount</span>
                </div>

                {/* Decorative elements */}
                <div className="absolute right-0 top-0 bottom-0 w-12 overflow-hidden pointer-events-none">
                  <div className="w-1.5 h-1.5 bg-[#84cc16] transform rotate-45 absolute top-2 right-4"></div>
                  <div className="w-1 h-1 bg-[#65a30d] transform rotate-45 absolute top-5 right-8"></div>
                  <div className="w-2 h-2 bg-[#a3e635] transform rotate-45 absolute bottom-2 right-6"></div>
                  <div className="w-1.5 h-1.5 bg-[#84cc16] transform rotate-45 absolute bottom-4 right-2"></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pb-6 mb-2">
                <div className="flex flex-col items-center justify-center text-center gap-2">
                  <Truck className="w-6 h-6 text-[#1e1b4b]" />
                  <span className="text-[11px] font-bold text-[#1e1b4b]">No Return</span>
                </div>
                <div className="flex flex-col items-center justify-center text-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-[#1e1b4b]" />
                  <span className="text-[11px] font-bold text-[#1e1b4b]">High Quality material</span>
                </div>
              </div>

              <div className="border-t border-b border-border">
                <div className="flex flex-col border-b border-border">
                  <button
                    onClick={() => setIsWarrantyOpen(!isWarrantyOpen)}
                    className="flex items-center justify-between py-4 w-full hover:opacity-80 transition-opacity"
                  >
                    <div className="flex items-center gap-3">
                      <ShieldAlert className="w-4 h-4 text-foreground" />
                      <span className="text-[12px] font-bold tracking-wider uppercase">WARRANTY</span>
                    </div>
                    {isWarrantyOpen ? (
                      <Minus className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Plus className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                  {isWarrantyOpen && (
                    <div className="pb-4 text-sm text-muted-foreground leading-relaxed">
                      All products come with a standard 1-year warranty covering manufacturing defects. Extended warranty options are available at checkout.
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <button
                    onClick={() => setIsDeliveryOpen(!isDeliveryOpen)}
                    className="flex items-center justify-between py-4 w-full hover:opacity-80 transition-opacity"
                  >
                    <div className="flex items-center gap-3">
                      <Truck className="w-4 h-4 text-foreground" />
                      <span className="text-[12px] font-bold tracking-wider uppercase">DELIVERY</span>
                    </div>
                    {isDeliveryOpen ? (
                      <Minus className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Plus className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                  {isDeliveryOpen && (
                    <div className="pb-4 text-sm text-muted-foreground leading-relaxed">
                      Free standard delivery on orders over ₹50. Next day delivery available for orders placed before 2 PM. Tracking information will be provided once dispatched.
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Tabs: Description / Reviews (Full Width on Desktop) */}
        <div className="mb-10 w-[70%]">
          <div className="flex items-center gap-4 mb-4 border-b border-border">
            <button
              onClick={() => setActiveTab("description")}
              className={`text-[12px] font-bold tracking-wider uppercase pb-2 ${activeTab === "description"
                ? "border-b-2 border-[#1e1b4b] text-[#1e1b4b]"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              DESCRIPTION
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`text-[12px] font-bold tracking-wider uppercase pb-2 ${activeTab === "reviews"
                ? "border-b-2 border-[#1e1b4b] text-[#1e1b4b]"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              REVIEWS ({reviews.length})
            </button>
          </div>

          {activeTab === "description" && (
            <div className="pt-2">
              <p className="text-sm text-foreground mb-4 font-medium">
                {product.description ||
                  "Coorg blend. 75% chicory-free. Strong, South Indian style."}
              </p>
              <p className="text-sm text-foreground">
                Add up to 3 extra input fields for customers (e.g. gift note, review text). Maximum 3 custom fields allowed.
              </p>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="flex flex-col gap-4 mt-4">
              {reviews.map((review, idx) => (
                <div key={idx} className="border border-border p-5 bg-background rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-muted relative overflow-hidden shrink-0">
                      <Image
                        src="/images/product_placeholder.png"
                        alt={review.name}
                        fill
                        className="object-cover p-1"
                        sizes="40px"
                      />
                    </div>
                    <span className="text-sm font-bold">{review.name}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < (review.rating || 5)
                          ? "fill-[#facc15] text-[#facc15]"
                          : "fill-gray-200 text-gray-200"
                          }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {review.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <section className="py-8 border-t border-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Related items</h2>
            <Link href="/shop" className="text-sm font-medium underline">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
