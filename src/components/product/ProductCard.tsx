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

function OfferLabel({ discountPercentage }: { discountPercentage: number }) {
  const labelText = discountPercentage > 0 ? `${discountPercentage} OFF` : "OFFER";

  return (
    <div className="absolute bottom-0 left-1/2 z-10 w-[62%] sm:w-[58%] -translate-x-1/2 pointer-events-none transition-opacity duration-300 md:group-hover:opacity-0">
      <div className="relative w-full">
        <svg
          viewBox="0 0 140 24"
          preserveAspectRatio="none"
          className="block w-full h-[30px] sm:h-[44px]"
          aria-hidden
        >
          <path
            d="M14 2 Q14 0 17 0 H123 Q126 0 126 2 L140 24 H0 Z"
            fill="#e3000f"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center gap-1 text-white">
          <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <Percent className="w-2 h-2 sm:w-2.5 sm:h-2.5" strokeWidth={3} />
          </span>
          <span className="text-[10px] sm:text-[13px] font-extrabold uppercase tracking-wider leading-none">
            OFFER
          </span>
        </div>
      </div>
    </div>
  );
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
      className="group block min-w-0"
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

        {/* Left Edge Badges (Ribbons) */}
        <div className="absolute top-2 sm:top-4 left-0 z-10 flex flex-col gap-1.5 sm:gap-2 items-start pointer-events-none">

          {isHotSale && (
            <div
              className="bg-blue-600 text-white text-[8px] sm:text-[10px] font-bold pl-2 pr-4 sm:pl-3 sm:pr-5 py-1 sm:py-1.5 shadow-md uppercase tracking-wider whitespace-nowrap"

            >
              HOT SALE
            </div>
          )}
          {isNewArrived && (
            <div
              className="bg-blue-600 text-white text-[8px] sm:text-[10px] font-bold pl-2 pr-4 sm:pl-3 sm:pr-5 py-1 sm:py-1.5 shadow-md uppercase tracking-wider whitespace-nowrap"

            >
              NEW ARRIVED
            </div>
          )}
          {isLimited && (
            <div
              className="bg-green-600 text-white text-[8px] sm:text-[10px] font-bold pl-2 pr-4 sm:pl-3 sm:pr-5 py-1 sm:py-1.5 shadow-md uppercase tracking-wider whitespace-nowrap"

            >
              LIMITED
            </div>
          )}
        </div>
        {/* Offer tab */}
        {hasOffer && <OfferLabel discountPercentage={discountPercentage} />}

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
          className="hidden md:flex opacity-0 group-hover:opacity-100 z-20"
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
          className="truncate"
        >
          {product.name}
        </h3>

        <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-2">
          <span className="text-[15px] sm:text-[0.95rem] font-bold text-gray-900 tracking-tight">
            ₹{product.price.toFixed(2).replace(/\.00$/, '')}
          </span>
          {originalPrice && (
            <span className="text-[11px] sm:text-[0.8rem] text-gray-400 line-through tracking-tight">
              ₹{originalPrice.toFixed(2).replace(/\.00$/, '')}
            </span>
          )}
          {/* Green Discount Tag */}
          {discountPercentage > 0 && (
            <span
              className="bg-[#00a859] text-white text-[9px] font-bold pl-1.5 pr-2.5 py-0.5 whitespace-nowrap"
              style={{ clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 100%, 0 100%)" }}
            >
              {discountPercentage}% OFF
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="flex text-[#f97316]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating || 0) ? "fill-current" : "text-gray-300 fill-gray-300"}`} />
              ))}
            </div>
            <span className="text-[11px] text-gray-500 font-medium">({product.reviews || 0})</span>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`lg:hidden flex shrink-0 items-center justify-center w-8 h-8 rounded-full text-white shadow-sm transition-transform active:scale-95 ${product.inStock ? "bg-primary" : "bg-gray-400"}`}
            aria-label={product.inStock ? "Add to cart" : "Out of stock"}
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Link>
  );
}
