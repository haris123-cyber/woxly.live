"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
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

  const originalPrice = product.originalPrice || +(product.price * 1.15).toFixed(2);
  const brand = product.brand || product.name.split(" ")[0];

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
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            padding: "16px",
            transition: "opacity 0.3s ease",
            borderRadius: "16px",
          }}
          className="opacity-0 group-hover:opacity-100"
        >
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            style={{
              width: "100%",
              background: product.inStock ? "#3bc4f5" : "#9ca3af",
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

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#111827" }}>
            ${product.price.toFixed(2)}
          </span>
          <span style={{ fontSize: "0.8rem", color: "#9ca3af", textDecoration: "line-through" }}>
            ${originalPrice.toFixed(2)}
          </span>
        </div>
      </div>
    </Link>
  );
}
