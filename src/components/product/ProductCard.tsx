"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star, Percent } from "lucide-react";
import { type Product } from "@/store/useCartStore";
import { useCartStore } from "@/store/useCartStore";
import { useWatchlistStore } from "@/store/useWatchlistStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  layout?: "grid" | "list";
}

function OfferLabel({ discountPercentage, originalPrice, price }: { discountPercentage: number, originalPrice?: number, price: number }) {
  if (discountPercentage <= 0) return null;
  const saveAmount = originalPrice ? Math.round(originalPrice - price) : 0;

  return (
    <div className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden shadow-[0_-2px_10px_rgba(0,0,0,0.1)] transition-opacity duration-300 md:group-hover:opacity-0 pointer-events-none">
      <div className="flex w-full h-[40px] sm:h-[48px] bg-[#ffcc00] relative">
        {/* Slanted red background using clip-path */}
        <div className="absolute inset-0 right-[40px] sm:right-[50px] bg-gradient-to-r from-[#e3000f] to-[#ff5100]" style={{ clipPath: "polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%)" }} />

        {/* Content wrapper */}
        <div className="relative flex w-full h-full">
          {/* Left Side Content */}
          <div className="flex-1 flex items-center pl-1.5 sm:pl-3 pr-1 min-w-0">
            <svg className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-300 shrink-0 mr-1 sm:mr-1.5 drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <div className="flex flex-col text-white pt-0.5 overflow-hidden">
              <span className="text-[6px] sm:text-[8px] font-bold uppercase leading-none tracking-wider text-white/90 mb-0.5 whitespace-nowrap truncate">Limited Offer</span>
              <span className="text-[12px] sm:text-[18px] font-extrabold italic leading-none tracking-tight whitespace-nowrap truncate">{discountPercentage}% OFF</span>
            </div>
          </div>

          {/* Right Side Content */}
          <div className="w-[40px] sm:w-[50px] flex flex-col items-center justify-center shrink-0 pr-0.5 sm:pr-1">
            <span className="text-[7px] sm:text-[9px] font-bold text-[#b33a00] leading-none mb-0.5">Save</span>
            <span className="text-[10px] sm:text-[13px] font-extrabold text-[#b33a00] leading-none truncate w-full text-center">₹{saveAmount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductCard({ product, layout = "grid" }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const router = useRouter();
  const { toggleItem, isInWatchlist } = useWatchlistStore();
  const inWatchlist = isInWatchlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    const defaultColor = product.colors?.[0];
    const defaultSize = product.sizes?.[0];
    addItem(product, 1, defaultColor, defaultSize);
    toast.success("Added to cart", {
      description: "Product added successfully.",
    });
    // router.push("/cart"); // Usually good to just show toast rather than redirecting immediately on a product card
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
      className={`group ${layout === 'list' ? 'flex flex-row gap-3 sm:gap-4 bg-white rounded-2xl mb-4 border-0' : 'block min-w-0'}`}
      style={{ textDecoration: "none" }}
    >
      <div
        className={`${layout === 'list' ? 'w-[150px] sm:w-[190px] shrink-0 aspect-square' : ''}`}
        style={layout === 'grid' ? {
          position: "relative",
          width: "100%",
          paddingBottom: "130%",
          borderRadius: "16px",
          overflow: "hidden",
          background: "#f5f5f5",
          marginBottom: "12px",
        } : {
          position: "relative",
          borderRadius: "12px",
          overflow: "hidden",
          background: "#f5f5f5",
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
        <div className="absolute top-3 sm:top-4 left-0 z-10 flex flex-col gap-2 items-start pointer-events-none">
          {isHotSale && (
            <div className="bg-gradient-to-r from-[#d91d1d] to-[#f46820] text-white text-[9px] sm:text-[10px] font-extrabold pl-3 pr-4 py-1 sm:py-1.5 shadow-sm uppercase tracking-wide whitespace-nowrap  rounded-tl-lg rounded-br-lg">
              HOT SELLER
            </div>
          )}
          {isNewArrived && (
            <div className="bg-[#024430] text-white text-[9px] sm:text-[10px] font-extrabold pl-3 pr-4 py-1 sm:py-1.5 shadow-sm uppercase tracking-wide whitespace-nowrap   rounded-tl-lg rounded-br-lg">
              BESTSELLER
            </div>
          )}
          {isLimited && (
            <div className="bg-green-600 text-white text-[9px] sm:text-[10px] font-extrabold pl-3 pr-4 py-1 sm:py-1.5 shadow-sm uppercase tracking-wide whitespace-nowrap   rounded-tl-lg rounded-br-lg">
              LIMITED
            </div>
          )}
        </div>
        {/* Offer tab */}
        {hasOffer && <OfferLabel discountPercentage={discountPercentage} originalPrice={originalPrice} price={product.price} />}

        <button
          onClick={(e) => {
            e.preventDefault();
            toggleItem(product);
            if (!inWatchlist) {
              toast.success("Added to wishlist", {
                description: "Product added successfully.",
              });
            } else {
              toast.success("Removed from wishlist", {
                description: "Product removed successfully.",
              });
            }
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

      <div className={layout === 'list' ? 'flex-1 min-w-0 flex flex-col justify-center py-2 pr-2 sm:pr-4' : ''}>
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
            <span className="text-[11px] text-gray-500 font-medium">{product.reviews ? `(${product.reviews})` : 'No reviews yet'}</span>
          </div>

          {layout === 'grid' && (
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`lg:hidden flex shrink-0 items-center justify-center w-8 h-8 rounded-full text-white shadow-sm transition-transform active:scale-95 ${product.inStock ? "bg-primary" : "bg-gray-400"}`}
              aria-label={product.inStock ? "Add to cart" : "Out of stock"}
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          )}
        </div>

        {layout === 'list' && (
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`mt-2 sm:mt-3 w-full py-2 sm:py-2 rounded-xl text-white font-bold text-[13px] sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 transition-opacity hover:opacity-90 ${product.inStock ? "bg-primary" : "bg-primary/80"}`}
          >
            <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="truncate">{product.inStock ? "Add to cart" : "Out of stock"}</span>
          </button>
        )}
      </div>
    </Link>
  );
}
