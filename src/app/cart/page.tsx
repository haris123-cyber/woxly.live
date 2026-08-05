"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { Minus, Plus, ShoppingBag, Trash2, ChevronDown, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, getCartTotal } = useCartStore();
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const subtotal = getCartTotal();
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const shipping = 0;
  const total = subtotal - discount + shipping;

  // ── Empty state ──────────────────────────────
  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center py-16 px-4 bg-[#f9fafb]">
        <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center mb-6">
          <ShoppingBag className="w-11 h-11 text-blue-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Your cart is empty</h1>
        <p className="text-gray-500 text-base mb-8 max-w-sm">
          Looks like you haven&apos;t added anything yet. Browse our latest products!
        </p>
        <Button asChild size="lg" className="rounded-xl px-8 font-bold">
          <Link href="/shop">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-[#f9fafb] min-h-screen py-6 lg:py-10">
      <div className="lg:hidden px-4 mb-2">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm"
          aria-label="Back"
        >
          <ChevronLeft className="w-5 h-5 pr-0.5" />
        </button>
      </div>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">

          {/* ── Left: Items ────────────────────────────── */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Cart</h1>

            <div className="flex flex-col gap-8">
              {items.map((item, idx) => (
                <div key={item.cartItemId} className="flex gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-gray-200 last:border-b-0">
                  {/* Image */}
                  <div className="relative w-24 h-24 sm:w-40 sm:h-28 md:w-56 md:h-36 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
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

                    <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-4 truncate">{item.brand || "Premium Quality"}</p>

                    <div className="flex items-center justify-between mt-auto">
                      {/* Quantity */}
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

                      {/* Price */}
                      <div className="text-base sm:text-xl font-bold text-gray-900 ml-2 truncate">
                        ${((item.price || 0) * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Order Summary ──────────────────── */}
          <div className="w-full lg:w-[380px] shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Order Summary</h2>

              <div className="space-y-5 mb-8 text-[15px]">
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 font-medium">Subtotal</span>
                  <span className="font-bold text-gray-900">${subtotal.toLocaleString()}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-900 font-medium">Discount</span>
                  <span className="font-bold text-gray-900">
                    {couponApplied ? `-$${discount.toLocaleString()}` : "$0"}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-900 font-medium">Delivery</span>
                  <span className="font-bold text-gray-900">${shipping}</span>
                </div>
              </div>

              {/* Promo Code */}
              <div className="flex items-center gap-3 py-5 border-y border-gray-100 mb-8">
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
                    className="bg-[#e5e5e5] hover:bg-[#d4d4d4] text-gray-400 hover:text-gray-600 text-xs font-semibold px-4 py-2 transition-colors h-full"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mb-8">
                <span className="text-gray-900 font-bold text-lg">Total</span>
                <span className="text-2xl font-bold text-gray-900">${total.toLocaleString()}</span>
              </div>

              {/* Checkout buttons */}
              <div className="space-y-4">
                <Link href="/checkout" className="w-full bg-[#1c1c1c] hover:bg-black text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center">
                  Proceed to Checkout
                </Link>

               
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
