"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star, Percent } from "lucide-react";
import { type Product } from "@/store/useCartStore";
import { useCartStore } from "@/store/useCartStore";
import { useWatchlistStore } from "@/store/useWatchlistStore";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const router = useRouter();
  const { toggleItem, isInWatchlist } = useWatchlistStore();
  const inWatchlist = isInWatchlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    const defaultColor = product.colors?.[0];
    const defaultSize = product.sizes?.[0];
    addItem(product, 1, defaultColor, defaultSize);
    router.push("/cart");
  };

  const originalPrice = product.originalPrice;
  const discountPercentage = originalPrice ? Math.round(((originalPrice - product.price) / originalPrice) * 100) : 0;
  const brand = product.brand || product.name.split(" ")[0];

  // Use the actual properties from the product rather than randomly generating them
  const isSale = product.isSale || false;
  const isHotSale = product.isHotSale || false;
  const isNewArrived = product.isNewArrived || false;
  const isLimited = product.isLimited || false;
  const hasOffer = product.hasOffer || false;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block"
      style={{ textDecoration: "none" }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: "130%",
          borderRadius: "16px",
          overflow: "hidden",
          background: "#f5f5f5",
          marginBottom: "12px",
        }}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
          className="group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Top Right Tags */}
        <div className="absolute top-10 right-0 z-10 flex flex-col gap-1 sm:gap-1.5 items-end pointer-events-none">
          {isSale && (
            <span className="bg-[#1e1b4b] text-white text-[7px] sm:text-[9px] font-bold px-1.5 py-1 sm:px-2 sm:py-1.5 rounded-l-sm uppercase tracking-wider shadow-sm">SALE</span>
          )}
          {isNewArrived && (
            <span className="bg-[#1e1b4b] text-white text-[7px] sm:text-[9px] font-bold px-1.5 py-1 sm:px-2 sm:py-1.5 rounded-l-sm uppercase tracking-wider shadow-sm">NEW ARRIVED</span>
          )}
          {isLimited && (
            <span className="bg-[#1e1b4b] text-white text-[7px] sm:text-[9px] font-bold px-1.5 py-1 sm:px-2 sm:py-1.5 rounded-l-sm uppercase tracking-wider shadow-sm">LIMITED</span>
          )}
        </div>

        {/* Left Edge Badges (Hot Sale & Offer) */}
        <div className="absolute top-2 sm:top-10 left-0 z-10 flex flex-col gap-1 sm:gap-2 items-start pointer-events-none">
          {isHotSale && (
            <div className="bg-primary text-white text-[8px] sm:text-[10px] font-bold px-1.5 py-1 sm:px-2.5 sm:py-2 shadow-md uppercase tracking-wider rounded-r-md whitespace-nowrap">
              HOT SALE
            </div>
          )}
          {hasOffer && (
            <div className="bg-destructive text-white text-[8px] sm:text-[10px] font-bold px-1.5 py-1 sm:px-2.5 sm:py-2 shadow-md uppercase tracking-wider rounded-r-md flex items-center gap-0.5 sm:gap-1 whitespace-nowrap">
              <Percent className="w-2 h-2 sm:w-3 sm:h-3" /> {discountPercentage}% OFFER
            </div>
          )}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            toggleItem(product);
          }}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 10,
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "#fff",
            border: "none",
            boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: inWatchlist ? "#ef4444" : "#9ca3af",
            transition: "color 0.2s",
          }}
        >
          <Heart style={{ width: "15px", height: "15px", fill: inWatchlist ? "currentColor" : "none" }} />
        </button>

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(214, 214, 214, 0.27)",
            alignItems: "flex-end",
            justifyContent: "center",
            padding: "16px",
            transition: "opacity 0.3s ease",
            borderRadius: "16px",
          }}
          className="hidden md:flex opacity-0 group-hover:opacity-100"
        >
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            style={{
              width: "100%",
              background: product.inStock ? "#2563eb" : "#9ca3af",
              color: "#fff",
              border: "none",
              borderRadius: "9999px",
              padding: "10px 0",
              fontWeight: 700,
              fontSize: "0.85rem",
              cursor: product.inStock ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <ShoppingCart style={{ width: "15px", height: "15px" }} />
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>

      <div>
        <p style={{ fontSize: "0.7rem", color: "#9ca3af", fontWeight: 600, marginBottom: "2px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
          {brand}
        </p>
        <h3
          style={{ fontSize: "0.85rem", fontWeight: 500, color: "#374151", lineHeight: 1.35, marginBottom: "6px" }}
          title={product.name}
          className="line-clamp-2"
        >
          {product.name}
        </h3>

        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex text-[#f97316]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating || 0) ? "fill-current" : "text-gray-300 fill-gray-300"}`} />
            ))}
          </div>
          <span className="text-[11px] text-gray-500 font-medium">({product.reviews || 0})</span>
        </div>

        <div className="flex items-center justify-between">
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#111827" }}>
              ${product.price.toFixed(2)}
            </span>
            {originalPrice && (
              <span style={{ fontSize: "0.8rem", color: "#9ca3af", textDecoration: "line-through" }}>
                ${originalPrice.toFixed(2)}
              </span>
            )}
            {/* Green Discount Tag */}
            {discountPercentage > 0 && (
              <span className="bg-[#16a34a] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm ml-0.5 whitespace-nowrap">
                {discountPercentage}% OFF
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`md:hidden flex items-center justify-center w-8 h-8 rounded-full text-white shadow-sm transition-transform active:scale-95 ${product.inStock ? "bg-primary" : "bg-gray-400"}`}
            aria-label={product.inStock ? "Add to cart" : "Out of stock"}
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Link>
  );
}
