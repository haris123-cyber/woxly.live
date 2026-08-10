"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/ProductCard";
import { PRODUCTS } from "@/lib/mock-data";

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, getCartTotal } = useCartStore();

  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const subtotal = getCartTotal();
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const shipping = 0; // Usually calculated at checkout
  const total = subtotal - discount + shipping;

  const FREE_SHIPPING_THRESHOLD = 1500;
  const amountNeeded = FREE_SHIPPING_THRESHOLD - subtotal;
  const progressPercent = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  // ── Empty state ──────────────────────────────
  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center py-16 px-4 bg-[#f9fafb]">
        <div className="w-24 h-24 rounded-full bg-[#f4eefc] flex items-center justify-center mb-6">
          <ShoppingBag className="w-11 h-11 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Your cart is empty</h1>
        <p className="text-gray-500 text-base mb-8 max-w-sm">
          Looks like you haven&apos;t added anything yet. Browse our latest products!
        </p>
        <Button asChild size="lg" className="rounded-xl px-8 font-bold bg-primary hover:bg-primary/80">
          <Link href="/shop">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-[#f9fafb] min-h-screen py-6 lg:py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">

          {/* ── Left: Items ────────────────────────────── */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">My Cart</h1>

            {/* Free Shipping Progress Box */}
            <div className="bg-[#f0fdf4] border border-[#dcfce7] rounded-2xl p-4 mb-6">
              <p className="text-[#166534] font-medium text-sm mb-2">
                {amountNeeded > 0
                  ? `Add ₹${amountNeeded.toLocaleString()} more · Add more for free shipping`
                  : "Congratulations! You get free shipping!"}
              </p>
              <div className="h-2 w-full bg-[#dcfce7] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#16a34a] rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              {items.map((item) => (
                <div key={item.cartItemId} className="flex gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-gray-200 last:border-b-0">
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>

                  <div className="flex flex-col flex-1 min-w-0 relative">
                    <button
                      onClick={() => removeItem(item.cartItemId)}
                      className="absolute right-0 top-0 p-1 text-gray-400 hover:text-red-500 transition-colors z-10"
                    >
                      <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>

                    <Link href={`/products/${item.slug}`} className="text-base sm:text-lg font-semibold text-gray-900 hover:underline pr-7 sm:pr-8 mb-1 truncate block">
                      {item.name}
                    </Link>
                    <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-4 truncate">
                      {[item.selectedColor, item.selectedSize].filter(Boolean).join(" • ") || item.brand}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden h-8 sm:h-9 shrink-0">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-8 sm:w-9 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 sm:w-8 text-center text-xs sm:text-sm font-semibold text-gray-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="w-8 sm:w-9 h-full flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="text-base sm:text-xl font-bold text-gray-900 ml-2 truncate">
                        ₹{((item.price || 0) * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Suggested Products */}
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Add more to earn Reward Coins</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {PRODUCTS.slice(0, 2).map((prod) => (

                  <ProductCard product={prod} />

                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Order Summary ──────────────────── */}
          <div className="w-full lg:w-[380px] shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 lg:sticky lg:top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 text-[15px]">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Subtotal</span>
                  <span className="font-semibold text-gray-900">₹{subtotal.toLocaleString()}</span>
                </div>

                {couponApplied && (
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-600 font-medium">Discount (10%)</span>
                    <span className="font-semibold text-emerald-600">-₹{discount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Shipping</span>
                  <span className="font-semibold text-gray-500 text-sm">Calculated at checkout</span>
                </div>
              </div>

              <div className="flex items-center gap-3 py-5 border-y border-gray-100 mb-6">
                <span className="text-gray-900 font-medium whitespace-nowrap mr-2 text-[15px]">Promo code</span>
                <div className="flex items-center flex-1 border border-gray-200 rounded-lg overflow-hidden bg-[#fafafa]">
                  <input
                    type="text"
                    placeholder="Type here..."
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="w-full bg-transparent border-none outline-none px-3 py-2 text-sm text-gray-700 placeholder:text-gray-300"
                  />
                  <button
                    onClick={() => { if (coupon.trim()) setCouponApplied(true); }}
                    className="bg-[#e5e5e5] hover:bg-[#d4d4d4] text-gray-600 hover:text-gray-900 text-xs font-semibold px-4 py-2 transition-colors h-full"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-900 font-bold text-lg">Estimated Total</span>
                <span className="text-2xl font-bold text-primary">₹{total.toLocaleString()}</span>
              </div>

              {/* Checkout button */}
              <Button
                onClick={() => router.push("/checkout")}
                className="w-full h-14 bg-primary hover:bg-primary/80 text-white font-bold text-[15px] rounded-xl transition-colors flex items-center justify-center shadow-sm"
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
