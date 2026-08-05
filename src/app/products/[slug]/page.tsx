"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
  Check,
  ArrowLeft,
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
  const originalPrice = product.originalPrice || +(product.price * 1.25).toFixed(2);

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
      <div className="lg:hidden pb-24">
        {/* Header */}
        <div className="flex items-center px-4 py-3 border-b border-border">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 rounded-full hover:bg-muted"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="flex-1 text-center font-bold text-base pr-7">Product Details</h1>
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
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
              <span className="text-sm text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
              </span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {product.inStock ? "In stock" : "Out of stock"}
            </span>
          </div>

          {/* Description */}
          <div className="mb-5">
            <h3 className="font-bold text-foreground mb-2">Description</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {product.description ||
                "Premium quality product crafted for everyday use. Designed with care for durability, comfort, and style."}
            </p>
          </div>

          {/* Choose Colors */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-foreground">Choose Colors</h3>
              <div className="flex gap-2">
                {colors.map((c, i) => {
                  const isSelected = selectedColor === colorLabels[i];
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(colorLabels[i])}
                      className={`relative w-7 h-7 rounded-md border-2 flex items-center justify-center ${isSelected ? "border-foreground" : "border-transparent"
                        }`}
                      style={{ background: c }}
                      aria-label={colorLabels[i]}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 text-white drop-shadow" />}
                    </button>
                  );
                })}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{selectedColor}</p>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm font-medium text-foreground">Qty</span>
            <div className="flex items-center border border-border rounded-lg bg-background h-10">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-9 h-full flex items-center justify-center text-muted-foreground"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-9 h-full flex items-center justify-center text-muted-foreground"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Reviews horizontal */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-foreground">Reviews</h3>
              <button className="text-sm text-muted-foreground underline">View all</button>
            </div>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1 -mx-5 px-5">
              {reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="w-[240px] shrink-0 border border-border rounded-xl p-4 bg-background"
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
                    <span className="text-xs font-bold truncate">{review.name}</span>
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
                  <p className="text-xs text-muted-foreground line-clamp-3">{review.text}</p>
                </div>
              ))}
            </div>
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
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border px-4 py-3 flex gap-3 safe-area-pb">
          <Button
            onClick={handleAddToCart}
            variant="outline"
            className="flex-1 h-12 rounded-xl border-2 border-foreground text-foreground font-bold text-sm uppercase tracking-wide"
          >
            Add to Cart
          </Button>
          <Button
            onClick={handleBuyNow}
            className="flex-1 h-12 rounded-xl bg-primary hover:opacity-90 text-primary-foreground font-bold text-sm uppercase tracking-wide border-0"
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
              <button
                onClick={() => toggleItem(product)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-sm z-10"
              >
                <Heart
                  className={`w-5 h-5 ${inWatchlist ? "fill-red-500 text-red-500" : "text-gray-500"}`}
                />
              </button>
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

            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl font-bold text-foreground">${product.price.toFixed(2)}</span>
              <span className="text-lg text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
              </span>
              <span className="bg-primary/15 text-primary text-xs font-bold px-2 py-1 rounded-sm">
                Save 20%
              </span>
            </div>

            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              {product.description || "Premium quality product crafted for modern living."}
            </p>




            <div className="flex items-center border border-border rounded-md bg-background w-28 h-12">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-full flex items-center justify-center"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="flex-1 text-center font-medium text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-full flex items-center justify-center"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex items-center gap-3 mb-6 mt-5">
              <Button
                onClick={handleBuyNow}
                className="flex-2 h-12 bg-foreground hover:bg-foreground/90 text-background font-medium rounded-md"
              >
                Buy now
              </Button>
              <Button
                onClick={handleAddToCart}
                variant="outline"
                className="flex-1 h-12 font-medium rounded-md flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" /> Add to cart
              </Button>
            </div>
            <div className="flex- items-center  mb-5">Product details </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Truck className="w-5 h-5" />
              Delivery in 5 to 14 days
            </div>
          </div>
        </div>


        {/* Desktop reviews */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Comments by customers</h2>
            <button className="text-sm font-bold underline">View all</button>
          </div>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar">
            {reviews.map((review, idx) => (
              <div key={idx} className="border border-border rounded-xl p-5 w-[300px] shrink-0">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-muted relative overflow-hidden">
                    <Image
                      src="/images/product_placeholder.png"
                      alt={review.name}
                      fill
                      className="object-cover p-1"
                      sizes="36px"
                    />
                  </div>
                  <span className="font-bold text-sm">{review.name}</span>
                </div>
                <div className="flex gap-0.5 mb-2">
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
                <p className="text-xs text-muted-foreground">{review.text}</p>
              </div>
            ))}
          </div>
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
