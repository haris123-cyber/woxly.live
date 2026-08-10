"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import {
  ShoppingBag,
  Truck,
  CreditCard,
  Wallet,
  Home,
  Building2,
  Check,
  Lock,
  Plus,
  MapPin,
  Smartphone,
  BadgePercent,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAddressStore } from "@/store/useAddressStore";

type Step = 1 | 2 | 3;



const DELIVERY_METHODS = [
  { id: "standard", name: "Standard Shipping", eta: "5–7 business days", price: 0 },
  { id: "express", name: "Express Shipping", eta: "2–3 business days", price: 9.99 },
  { id: "overnight", name: "Overnight Shipping", eta: "Next business day", price: 19.99 },
];

const PAYMENT_OPTIONS = [
  { id: "card", name: "Credit / Debit Card", desc: "Secure and encrypted", icon: "card" as const },
  { id: "partial-cod", name: "Partial COD (20% Advance)", desc: "Pay rest on delivery", icon: "wallet" as const },
  { id: "cod", name: "Cash on Delivery", desc: "Pay full amount on delivery", icon: "wallet" as const },
];

const SAVED_CARDS = [
  { id: "visa", brand: "Visa", last4: "4242", expiry: "12/26" },
  { id: "mc", brand: "Mastercard", last4: "8888", expiry: "08/27" },
];

const STEPS = [
  { n: 1, label: "CART", icon: ShoppingBag },
  { n: 2, label: "SHIPPING", icon: Truck },
  { n: 3, label: "PAY", icon: CreditCard },
] as const;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getCartTotal, clearCart } = useCartStore();
  const { addresses } = useAddressStore();

  const [step, setStep] = useState<Step>(2); // Start at Shipping
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]?.id || "");
  const [deliveryMethod, setDeliveryMethod] = useState(DELIVERY_METHODS[0].id);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [selectedCard, setSelectedCard] = useState(SAVED_CARDS[0].id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderNotes, setOrderNotes] = useState("");

  const subtotal = getCartTotal();
  const onlineDiscount = step === 3 ? 10 : 0;
  const discount = 0; // Handled in cart, usually pass via state or store in real app

  const shipping = step === 3 ? 53.36 : 0; // Using the exact shipping price from the image on the pay step

  const tax = (subtotal - discount) * 0.08;
  const total = step === 3
    ? (subtotal - onlineDiscount + shipping + tax)
    : (subtotal - discount + shipping + tax);
  const advanceAmount = total * 0.2;
  const codAmount = total - advanceAmount;

  const stepTitles: Record<Step, string> = {
    1: "Cart",
    2: "Continue to Payment",
    3: "Place Order",
  };

  const goNext = () => {
    if (step < 3) setStep((s) => (s + 1) as Step);
    else placeOrder();
  };

  const placeOrder = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      clearCart();
      const orderId = `WOXLY-${Math.floor(100000 + Math.random() * 900000)}`;
      router.push(`/order-success/${orderId}`);
    }, 1200);
  };

  // ── Empty state ──────────────────────────────
  if (items.length === 0 && !isSubmitting) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center py-16 px-4 bg-[#f9fafb]">
        <div className="w-24 h-24 rounded-full bg-[#f4eefc] flex items-center justify-center mb-6">
          <ShoppingBag className="w-11 h-11 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Your cart is empty</h1>
        <p className="text-gray-500 text-base mb-8 max-w-sm">
          Return to cart to add items.
        </p>
        <Button asChild size="lg" className="rounded-xl px-8 font-bold bg-primary hover:bg-[#7c3aed]">
          <Link href="/cart">Back to Cart</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-[#f9fafb] min-h-screen py-6 lg:py-10">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Stepper (Desktop & Mobile) */}
        <div className="max-w-xl mx-auto mb-10 px-4">
          <div className="flex items-start justify-between relative">
            <div className="absolute top-5 left-[15%] right-[15%] h-[1px] bg-gray-200" />
            {STEPS.map((s) => {
              const active = step === s.n;
              const done = step > s.n;
              const Icon = s.icon;
              return (
                <button
                  key={s.n}
                  type="button"
                  onClick={() => {
                    if (s.n === 1) {
                      router.push("/cart");
                    } else if (done) {
                      setStep(s.n as Step);
                    }
                  }}
                  className="relative z-10 flex flex-col items-center gap-2 flex-1"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${active || done || s.n === 1
                      ? "bg-primary text-white"
                      : "bg-white border border-gray-200 text-gray-400"
                      }`}
                  >
                    <Icon className="w-[18px] h-[18px]" />
                  </div>
                  <span
                    className={`text-[10px] font-bold tracking-wider ${active || s.n === 1 ? "text-gray-900" : "text-gray-400"
                      }`}
                  >
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* ── Left: Main Content based on Step ────────────────────────────── */}
          <div className="flex-1">
            {step === 2 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Shipping Address</h2>
                  <div className="grid gap-3">
                    {addresses.map((addr) => {
                      const selected = selectedAddress === addr.id;
                      return (
                        <button
                          key={addr.id}
                          type="button"
                          onClick={() => setSelectedAddress(addr.id)}
                          className={`w-full text-left rounded-xl border-2 p-5 ${selected ? "border-primary bg-primary/5" : "border-gray-200 bg-white"}`}
                        >
                          <div className="flex gap-4">
                            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${selected ? "bg-primary/15 text-primary" : "bg-gray-100 text-gray-500"}`}>
                              {addr.icon === "home" ? <Home className="w-5 h-5" /> : <Building2 className="w-5 h-5" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between mb-1">
                                <span className="font-bold text-gray-900">{addr.label || "Address"}</span>
                                {selected ? <Check className="w-5 h-5 text-primary" /> : <span className="w-5 h-5 rounded-full border-2 border-gray-200" />}
                              </div>
                              {addr.name && <p className="text-sm text-gray-700 font-medium mb-1">{addr.name}</p>}
                              <p className="text-sm text-gray-500">{addr.addressLine}</p>
                              <p className="text-sm text-gray-500">{addr.city}, {addr.state} {addr.pinCode}</p>
                              <p className="text-sm text-gray-500 mt-1">{addr.phone}</p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <button type="button" onClick={() => router.push("/account#address")} className="mt-3 flex items-center gap-1.5 text-sm font-medium text-primary">
                    <Plus className="w-4 h-4" /> Add New Address
                  </button>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Order Notes (Optional)</h2>
                  <textarea
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="Any special instructions for your delivery..."
                    className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all resize-none"
                    rows={3}
                  ></textarea>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 pb-12 w-full">
                {/* Selected Address Summary */}
                <div className="rounded-xl border border-gray-200 bg-white p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-gray-900 text-sm mb-1">{addresses.find(a => a.id === selectedAddress)?.name || "User Name"}</p>
                        <p className="text-gray-600 text-[13px]">{addresses.find(a => a.id === selectedAddress)?.addressLine}</p>
                        <p className="text-gray-500 text-[13px]">{addresses.find(a => a.id === selectedAddress)?.city}, {addresses.find(a => a.id === selectedAddress)?.state}, {addresses.find(a => a.id === selectedAddress)?.pinCode}, India • {addresses.find(a => a.id === selectedAddress)?.phone}</p>
                      </div>
                    </div>
                    <button onClick={() => setStep(2)} className="text-primary text-xs font-semibold hover:underline shrink-0">Change</button>
                  </div>
                </div>

                {/* Order notes */}
                {orderNotes && (
                  <div className="rounded-xl border border-gray-200 bg-white p-4">
                    <h3 className="font-bold text-gray-900 text-sm mb-2">Order notes</h3>
                    <p className="text-gray-500 text-sm">{orderNotes}</p>
                  </div>
                )}

                {/* Order items */}
                <div className="rounded-xl border border-gray-200 bg-white">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900 text-sm">Order items</h3>
                  </div>
                  <div className="p-4 space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg relative overflow-hidden shrink-0 border border-gray-200">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 text-[13px]">{item.name}</p>
                          <p className="text-xs text-gray-500">₹{item.price.toFixed(2).replace(/\.00$/, '')} × {item.quantity}</p>
                        </div>
                        <span className="font-bold text-sm text-gray-900">₹{(item.price * item.quantity).toFixed(2).replace(/\.00$/, '')}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment method */}
                <div className="rounded-xl border border-gray-200 bg-white">
                  <div className="p-4 border-b border-gray-100 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    <h3 className="font-bold text-gray-900 text-sm">Payment method</h3>
                  </div>
                  <div className="p-4 pb-6">
                    <div className="relative rounded-xl border border-primary p-4 bg-white shadow-sm mb-3 cursor-pointer">
                      <div className="absolute -top-2.5 left-4 bg-[#009b4d] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        SAVE 10
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0">
                          <Smartphone className="w-5 h-5" />
                        </div>
                        <div className="flex-1 mt-0.5">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-gray-900 text-[15px]">Pay Online</span>
                            <div className="w-4 h-4 rounded-full bg-primary"></div>
                          </div>
                          <p className="text-[13px] text-gray-500 mb-3">Pay with UPI, cards, or net banking. Secure and instant.</p>

                          <div className="bg-green-50 border border-green-200/60 rounded-xl px-3 py-2 flex items-center gap-2">
                            <BadgePercent className="w-4 h-4 text-[#009b4d]" />
                            <span className="text-[12px] font-medium text-[#009b4d]">Extra ₹10 off — online payment only.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-[13px] text-gray-500 px-1 leading-relaxed">
                      Cash on delivery isn't available for this pincode with the available couriers. Please pay online to continue.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Right: Order Summary ──────────────────── */}
          <div className="w-full lg:w-[380px] shrink-0 lg:sticky lg:top-24 lg:self-start">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h2 className="text-[17px] font-bold text-gray-900">Order Summary</h2>
              </div>

              <div className="p-5">
                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-[13px] text-gray-600">
                      <span className="truncate pr-4">{item.name}</span>
                      <span className="font-semibold whitespace-nowrap text-gray-900">×{item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-5 space-y-3 text-[14px]">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-semibold text-gray-900">₹{subtotal.toFixed(0)}</span>
                  </div>

                  {step === 3 && (
                    <div className="flex justify-between items-center text-[#009b4d]">
                      <span className="font-medium">Pay online discount</span>
                      <span className="font-semibold">-₹10</span>
                    </div>
                  )}

                  <div className="flex justify-between items-start">
                    <span className="text-gray-500">Delivery</span>
                    <div className="text-right">
                      <span className={`font-semibold ${shipping === 0 ? "text-emerald-600" : "text-gray-900"}`}>
                        {shipping === 0 ? "Free" : `₹${shipping.toFixed(2).replace(/\.00$/, '')}`}
                      </span>
                    </div>
                  </div>
                  {step === 3 && (
                    <div className="flex items-center gap-1.5 justify-end text-[11px] text-gray-500 mt-0.5">
                      <Truck className="w-3.5 h-3.5" />
                      <span>Ekart Logistics Surface • Estimated Aug 13, 2026</span>
                    </div>
                  )}

                  {tax > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Tax (8%)</span>
                      <span className="font-semibold text-gray-900">₹{tax.toFixed(2).replace(/\.00$/, '')}</span>
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-100 mt-5 pt-5 flex justify-between items-center">
                  <span className="text-[17px] font-bold text-gray-900">Total</span>
                  <span className="text-[17px] font-bold text-gray-900">₹{total.toFixed(2).replace(/\.00$/, '')}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 p-4 border-t border-gray-100 text-[11px] text-gray-500">
                <div className="flex items-center gap-1.5 mb-1 text-gray-600">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span className="font-medium">Secure checkout • encrypted connection</span>
                </div>
                <p className="ml-5">Online payments powered by Razorpay.</p>
              </div>
            </div>

            {/* Checkout buttons */}
            <div className="space-y-3 mt-6">
              <Button
                onClick={goNext}
                disabled={isSubmitting}
                className="w-full h-14 bg-primary hover:bg-primary/80 text-white font-bold text-[15px] rounded-xl transition-colors flex items-center justify-center shadow-sm border-none"
              >
                {isSubmitting ? (
                  "Processing..."
                ) : step === 3 ? (
                  <span className="inline-flex items-center gap-2">
                    <Lock className="w-4 h-4" /> Place Order
                  </span>
                ) : (
                  stepTitles[step]
                )}
              </Button>

              {step !== 1 && (
                <Button
                  variant="outline"
                  onClick={() => {
                    if (step === 2) router.push("/cart");
                    else setStep((s) => (s - 1) as Step);
                  }}
                  className="w-full h-12 text-gray-500 hover:text-gray-900 rounded-xl border-gray-200"
                >
                  {step === 2 ? "Back to Cart" : "Back to Shipping"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
