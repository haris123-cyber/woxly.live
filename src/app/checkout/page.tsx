"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Check,
  CreditCard,
  Wallet,
  Shield,
  Home,
  Building2,
  Plus,
  Lock,
  Pencil,
} from "lucide-react";
import { useRouter } from "next/navigation";

type Step = 1 | 2 | 3 | 4;

const SAVED_ADDRESSES = [
  {
    id: "home",
    label: "Home",
    icon: "home" as const,
    lines: ["123 Main Street, Apt 4B", "New York, NY 10001", "United States"],
    phone: "+1 (555) 123-4567",
  },
  {
    id: "office",
    label: "Office",
    icon: "office" as const,
    lines: ["456 Business Ave, Floor 12", "New York, NY 10018", "United States"],
    phone: "+1 (555) 987-6543",
  },
];

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
  { n: 1, label: "Cart" },
  { n: 2, label: "Address" },
  { n: 3, label: "Payment" },
  { n: 4, label: "Review" },
] as const;

export default function CheckoutPage() {
  const { items, getCartTotal, clearCart } = useCartStore();
  const router = useRouter();

  const [step, setStep] = useState<Step>(1);
  const [selectedAddress, setSelectedAddress] = useState(SAVED_ADDRESSES[0].id);
  const [deliveryMethod, setDeliveryMethod] = useState(DELIVERY_METHODS[0].id);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [selectedCard, setSelectedCard] = useState(SAVED_CARDS[0].id);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = getCartTotal();
  const delivery = DELIVERY_METHODS.find((d) => d.id === deliveryMethod);
  const shipping = delivery?.price ?? (subtotal > 99 ? 0 : 15);
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  const advanceAmount = total * 0.2;
  const codAmount = total - advanceAmount;

  const address = SAVED_ADDRESSES.find((a) => a.id === selectedAddress)!;
  const payment = PAYMENT_OPTIONS.find((p) => p.id === paymentMethod)!;

  const placeOrder = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      clearCart();
      const orderId = `WOXLY-${Math.floor(100000 + Math.random() * 900000)}`;
      router.push(`/order-success/${orderId}`);
    }, 1200);
  };

  if (items.length === 0 && !isSubmitting) {
    return (
      <div className="container mx-auto px-5 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Button asChild>
          <Link href="/shop">Go to Shop</Link>
        </Button>
      </div>
    );
  }

  const stepTitles: Record<Step, string> = {
    1: "Continue to Address",
    2: "Continue to Payment",
    3: "Continue to Review",
    4: "Place Order",
  };

  const goNext = () => {
    if (step < 4) setStep((s) => (s + 1) as Step);
    else placeOrder();
  };

  const goBack = () => {
    if (step > 1) setStep((s) => (s - 1) as Step);
    else router.push("/cart");
  };

  const TotalsBlock = ({ highlightTotal = false }: { highlightTotal?: boolean }) => (
    <div className="space-y-2.5 text-sm">
      <div className="flex justify-between">
        <span className="text-muted-foreground">Subtotal</span>
        <span className="font-medium">${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Shipping</span>
        <span className={`font-medium ${shipping === 0 ? "text-emerald-600" : ""}`}>
          {shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Tax</span>
        <span className="font-medium">${tax.toFixed(2)}</span>
      </div>
      <div className="flex justify-between items-center pt-2 border-t border-border">
        <span className="font-bold text-base">Total</span>
        <span className={`font-bold text-lg ${highlightTotal ? "text-primary" : "text-foreground"}`}>
          ${total.toFixed(2)}
        </span>
      </div>
    </div>
  );

  const Stepper = () => (
    <div className="px-5 py-4">
      <div className="flex items-start justify-between relative">
        <div className="absolute top-4 left-[12%] right-[12%] h-0.5 bg-border" />
        {STEPS.map((s) => {
          const active = step === s.n;
          const done = step > s.n;
          return (
            <button
              key={s.n}
              type="button"
              onClick={() => done && setStep(s.n as Step)}
              className="relative z-10 flex flex-col items-center gap-1.5 flex-1"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${active || done
                  ? "bg-primary border-primary text-primary-foreground"
                  : "bg-background border-border text-muted-foreground"
                  }`}
              >
                {done ? <Check className="w-4 h-4" /> : s.n}
              </div>
              <span
                className={`text-[11px] font-medium ${active ? "text-foreground font-bold" : "text-muted-foreground"
                  }`}
              >
                {s.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="bg-background min-h-screen overflow-x-hidden">
      {/* ── MOBILE CHECKOUT ── */}
      <div className="lg:hidden pb-8">
        {/* Header */}
        <div className="flex items-center px-4 py-3 border-b border-border sticky top-0 bg-background z-30">
          <button onClick={goBack} className="p-2 -ml-2 rounded-full hover:bg-muted" aria-label="Back">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="flex-1 text-center font-bold text-base">Checkout</h1>
          <div className="p-2 -mr-2">
            <Shield className="w-5 h-5 text-primary" />
          </div>
        </div>

        <Stepper />

        <div className="px-5 space-y-5">
          {/* STEP 1 — Cart / Shopping Summary */}
          {step === 1 && (
            <>
              <div className="flex items-start gap-2.5 rounded-xl bg-primary/10 border border-primary/20 px-3.5 py-3">
                <Lock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <p className="text-xs text-foreground leading-relaxed">
                  <span className="font-bold">Secure Checkout:</span> Your data is protected with 256-bit encryption.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-bold text-foreground">Shopping Summary</h2>
                  <Link href="/cart" className="text-sm text-primary font-medium">
                    Edit
                  </Link>
                </div>
                <div className="rounded-xl border border-border divide-y divide-border overflow-hidden">
                  {items.map((item) => (
                    <div key={item.cartItemId} className="flex gap-3 p-3.5">
                      <div className="relative w-14 h-14 rounded-lg bg-muted overflow-hidden shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-foreground line-clamp-1">{item.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {[item.selectedColor, item.selectedSize].filter(Boolean).join(" • ") || item.brand}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-semibold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-border p-4">
                <TotalsBlock highlightTotal />
              </div>
            </>
          )}

          {/* STEP 2 — Address selection (no fill form) */}
          {step === 2 && (
            <>
              <div>
                <h2 className="font-bold text-foreground mb-3">Shipping Address</h2>
                <div className="space-y-3">
                  {SAVED_ADDRESSES.map((addr) => {
                    const selected = selectedAddress === addr.id;
                    return (
                      <button
                        key={addr.id}
                        type="button"
                        onClick={() => setSelectedAddress(addr.id)}
                        className={`w-full text-left rounded-xl border-2 p-4 transition-colors ${selected ? "border-primary bg-primary/5" : "border-border bg-background"
                          }`}
                      >
                        <div className="flex gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${selected ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                              }`}
                          >
                            {addr.icon === "home" ? (
                              <Home className="w-5 h-5" />
                            ) : (
                              <Building2 className="w-5 h-5" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-sm text-foreground">{addr.label}</span>
                              {selected ? (
                                <Check className="w-5 h-5 text-primary" />
                              ) : (
                                <span className="w-5 h-5 rounded-full border-2 border-border" />
                              )}
                            </div>
                            {addr.lines.map((line) => (
                              <p key={line} className="text-xs text-muted-foreground leading-relaxed">
                                {line}
                              </p>
                            ))}
                            <p className="text-xs text-muted-foreground mt-1">{addr.phone}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <button
                  type="button"
                  className="mt-3 flex items-center gap-1.5 text-sm font-medium text-primary"
                >
                  <Plus className="w-4 h-4" /> Add New Address
                </button>
              </div>

              <div>
                <h2 className="font-bold text-foreground mb-3">Delivery Method</h2>
                <div className="rounded-xl border border-border divide-y divide-border overflow-hidden">
                  {DELIVERY_METHODS.map((method) => {
                    const selected = deliveryMethod === method.id;
                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setDeliveryMethod(method.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors ${selected ? "bg-primary/5" : "bg-background"
                          }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${selected ? "border-primary" : "border-border"
                            }`}
                        >
                          {selected && <span className="w-2.5 h-2.5 rounded-full bg-primary" />}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-foreground">{method.name}</p>
                          <p className="text-xs text-muted-foreground">{method.eta}</p>
                        </div>
                        <span className={`text-sm font-semibold shrink-0 ${method.price === 0 ? "text-emerald-600" : ""}`}>
                          {method.price === 0 ? "Free" : `₹${method.price.toFixed(2)}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {/* STEP 3 — Payment */}
          {step === 3 && (
            <>
              <div>
                <h2 className="font-bold text-foreground mb-3">Payment Method</h2>
                <div className="rounded-xl border border-border divide-y divide-border overflow-hidden">
                  {PAYMENT_OPTIONS.map((opt) => {
                    const selected = paymentMethod === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setPaymentMethod(opt.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3.5 text-left ${selected ? "bg-primary/5" : ""
                          }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${selected ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                            }`}
                        >
                          {opt.icon === "card" ? (
                            <CreditCard className="w-5 h-5" />
                          ) : (
                            <Wallet className="w-5 h-5" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm">{opt.name}</p>
                          <p className="text-xs text-muted-foreground">{opt.desc}</p>
                        </div>
                        <span
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${selected ? "border-primary" : "border-border"
                            }`}
                        >
                          {selected && <span className="w-2.5 h-2.5 rounded-full bg-primary" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {paymentMethod === "card" && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-bold text-foreground">Saved Cards</h2>
                    <button type="button" className="text-sm text-primary font-medium">
                      Add New
                    </button>
                  </div>
                  <div className="space-y-2.5">
                    {SAVED_CARDS.map((card) => {
                      const selected = selectedCard === card.id;
                      return (
                        <button
                          key={card.id}
                          type="button"
                          onClick={() => setSelectedCard(card.id)}
                          className={`w-full flex items-center gap-3 rounded-xl border-2 px-4 py-3.5 text-left ${selected ? "border-primary bg-primary/5" : "border-border"
                            }`}
                        >
                          <div className="w-10 h-7 rounded bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground shrink-0">
                            {card.brand === "Visa" ? "VISA" : "MC"}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm">•••• {card.last4}</p>
                            <p className="text-xs text-muted-foreground">Expires {card.expiry}</p>
                          </div>
                          {selected && <Check className="w-5 h-5 text-primary" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {paymentMethod === "partial-cod" && (
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm">
                  <p className="mb-1">
                    Pay <span className="font-bold">${advanceAmount.toFixed(2)}</span> now (20%).
                  </p>
                  <p className="text-muted-foreground">
                    Remaining <span className="font-semibold text-foreground">${codAmount.toFixed(2)}</span> due on
                    delivery.
                  </p>
                </div>
              )}
            </>
          )}

          {/* STEP 4 — Review */}
          {step === 4 && (
            <>
              <div className="rounded-xl border border-border p-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-bold text-foreground text-sm">Shipping Address</h2>
                  <button type="button" onClick={() => setStep(2)} className="text-sm text-primary font-medium flex items-center gap-1">
                    <Pencil className="w-3 h-3" /> Edit
                  </button>
                </div>
                <p className="font-semibold text-sm mb-0.5">{address.label}</p>
                {address.lines.map((line) => (
                  <p key={line} className="text-xs text-muted-foreground">
                    {line}
                  </p>
                ))}
                <p className="text-xs text-muted-foreground mt-1">{delivery?.name} · {shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</p>
              </div>

              <div className="rounded-xl border border-border p-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-bold text-foreground text-sm">Payment Method</h2>
                  <button type="button" onClick={() => setStep(3)} className="text-sm text-primary font-medium flex items-center gap-1">
                    <Pencil className="w-3 h-3" /> Edit
                  </button>
                </div>
                <p className="text-sm font-semibold">{payment.name}</p>
                {paymentMethod === "card" && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {SAVED_CARDS.find((c) => c.id === selectedCard)?.brand} ••••{" "}
                    {SAVED_CARDS.find((c) => c.id === selectedCard)?.last4}
                  </p>
                )}
              </div>

              <div className="rounded-xl border border-border p-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-bold text-foreground text-sm">Order Items</h2>
                  <button type="button" onClick={() => setStep(1)} className="text-sm text-primary font-medium flex items-center gap-1">
                    <Pencil className="w-3 h-3" /> Edit
                  </button>
                </div>
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.cartItemId} className="flex gap-3">
                      <div className="relative w-12 h-12 rounded-lg bg-muted overflow-hidden shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold shrink-0">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <TotalsBlock highlightTotal />
              </div>

              <p className="text-center text-xs text-muted-foreground">
                By placing your order you agree to our{" "}
                <Link href="/terms" className="underline">
                  Terms
                </Link>{" "}
                &{" "}
                <Link href="/privacy" className="underline">
                  Privacy Policy
                </Link>
              </p>
            </>
          )}
        </div>

        {/* CTA */}
        <div className="mt-6 px-5 pb-8">
          <Button
            onClick={goNext}
            disabled={isSubmitting}
            className="w-full h-12 rounded-xl font-bold text-sm bg-primary hover:opacity-90 text-primary-foreground border-0"
          >
            {isSubmitting ? (
              "Processing..."
            ) : step === 4 ? (
              <span className="inline-flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Place Order · ₹
                {paymentMethod === "partial-cod"
                  ? advanceAmount.toFixed(2)
                  : paymentMethod === "cod"
                    ? "0.00"
                    : total.toFixed(2)}
              </span>
            ) : (
              stepTitles[step]
            )}
          </Button>
        </div>
      </div>

      {/* ── DESKTOP: same structure, wider layout ── */}
      <div className="hidden lg:block bg-muted/30 min-h-screen py-10">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="flex items-center mb-6">
            <button onClick={goBack} className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </button>
            <h1 className="flex-1 text-center text-2xl font-bold">Checkout</h1>
            <Shield className="w-5 h-5 text-primary" />
          </div>

          <div className="bg-background rounded-2xl border border-border shadow-sm overflow-hidden">
            <Stepper />
            <div className="px-8 pb-8 space-y-6">
              {step === 1 && (
                <>
                  <div className="flex items-start gap-2.5 rounded-xl bg-primary/10 border border-primary/20 px-4 py-3">
                    <Lock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm">
                      <span className="font-bold">Secure Checkout:</span> Your data is protected with 256-bit encryption.
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <h2 className="font-bold text-lg">Shopping Summary</h2>
                    <Link href="/cart" className="text-sm text-primary font-medium">
                      Edit
                    </Link>
                  </div>
                  <div className="rounded-xl border border-border divide-y">
                    {items.map((item) => (
                      <div key={item.cartItemId} className="flex gap-4 p-4">
                        <div className="relative w-16 h-16 rounded-lg bg-muted overflow-hidden shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {[item.selectedColor, item.selectedSize].filter(Boolean).join(" • ") || item.brand}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl border border-border p-5">
                    <TotalsBlock highlightTotal />
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="font-bold text-lg">Shipping Address</h2>
                  <div className="grid gap-3">
                    {SAVED_ADDRESSES.map((addr) => {
                      const selected = selectedAddress === addr.id;
                      return (
                        <button
                          key={addr.id}
                          type="button"
                          onClick={() => setSelectedAddress(addr.id)}
                          className={`w-full text-left rounded-xl border-2 p-5 ${selected ? "border-primary bg-primary/5" : "border-border"
                            }`}
                        >
                          <div className="flex gap-4">
                            <div
                              className={`w-11 h-11 rounded-xl flex items-center justify-center ${selected ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                                }`}
                            >
                              {addr.icon === "home" ? <Home className="w-5 h-5" /> : <Building2 className="w-5 h-5" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between mb-1">
                                <span className="font-bold">{addr.label}</span>
                                {selected ? <Check className="w-5 h-5 text-primary" /> : <span className="w-5 h-5 rounded-full border-2 border-border" />}
                              </div>
                              {addr.lines.map((line) => (
                                <p key={line} className="text-sm text-muted-foreground">
                                  {line}
                                </p>
                              ))}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <button type="button" className="flex items-center gap-1.5 text-sm font-medium text-primary">
                    <Plus className="w-4 h-4" /> Add New Address
                  </button>

                  <h2 className="font-bold text-lg pt-2">Delivery Method</h2>
                  <div className="rounded-xl border border-border divide-y">
                    {DELIVERY_METHODS.map((method) => {
                      const selected = deliveryMethod === method.id;
                      return (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setDeliveryMethod(method.id)}
                          className={`w-full flex items-center gap-3 px-5 py-4 text-left ${selected ? "bg-primary/5" : ""}`}
                        >
                          <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selected ? "border-primary" : "border-border"}`}>
                            {selected && <span className="w-2.5 h-2.5 rounded-full bg-primary" />}
                          </span>
                          <div className="flex-1">
                            <p className="font-semibold">{method.name}</p>
                            <p className="text-sm text-muted-foreground">{method.eta}</p>
                          </div>
                          <span className={`font-semibold ${method.price === 0 ? "text-emerald-600" : ""}`}>
                            {method.price === 0 ? "Free" : `₹${method.price.toFixed(2)}`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <h2 className="font-bold text-lg">Payment Method</h2>
                  <div className="rounded-xl border border-border divide-y">
                    {PAYMENT_OPTIONS.map((opt) => {
                      const selected = paymentMethod === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setPaymentMethod(opt.id)}
                          className={`w-full flex items-center gap-4 px-5 py-4 text-left ${selected ? "bg-primary/5" : ""}`}
                        >
                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${selected ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`}>
                            {opt.icon === "card" ? <CreditCard className="w-5 h-5" /> : <Wallet className="w-5 h-5" />}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold">{opt.name}</p>
                            <p className="text-sm text-muted-foreground">{opt.desc}</p>
                          </div>
                          <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selected ? "border-primary" : "border-border"}`}>
                            {selected && <span className="w-2.5 h-2.5 rounded-full bg-primary" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {paymentMethod === "card" && (
                    <div>
                      <div className="flex justify-between mb-3">
                        <h3 className="font-bold">Saved Cards</h3>
                        <button type="button" className="text-sm text-primary font-medium">
                          Add New
                        </button>
                      </div>
                      <div className="grid gap-2">
                        {SAVED_CARDS.map((card) => {
                          const selected = selectedCard === card.id;
                          return (
                            <button
                              key={card.id}
                              type="button"
                              onClick={() => setSelectedCard(card.id)}
                              className={`flex items-center gap-4 rounded-xl border-2 px-5 py-4 text-left ${selected ? "border-primary bg-primary/5" : "border-border"}`}
                            >
                              <div className="w-12 h-8 rounded bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground">
                                {card.brand === "Visa" ? "VISA" : "MC"}
                              </div>
                              <div className="flex-1">
                                <p className="font-semibold">•••• {card.last4}</p>
                                <p className="text-sm text-muted-foreground">Expires {card.expiry}</p>
                              </div>
                              {selected && <Check className="w-5 h-5 text-primary" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              )}

              {step === 4 && (
                <>
                  <div className="rounded-xl border border-border p-5">
                    <div className="flex justify-between mb-2">
                      <h2 className="font-bold">Shipping Address</h2>
                      <button type="button" onClick={() => setStep(2)} className="text-sm text-primary font-medium">
                        Edit
                      </button>
                    </div>
                    <p className="font-semibold">{address.label}</p>
                    {address.lines.map((line) => (
                      <p key={line} className="text-sm text-muted-foreground">
                        {line}
                      </p>
                    ))}
                  </div>
                  <div className="rounded-xl border border-border p-5">
                    <div className="flex justify-between mb-2">
                      <h2 className="font-bold">Payment Method</h2>
                      <button type="button" onClick={() => setStep(3)} className="text-sm text-primary font-medium">
                        Edit
                      </button>
                    </div>
                    <p className="font-semibold">{payment.name}</p>
                  </div>
                  <div className="rounded-xl border border-border p-5">
                    <div className="flex justify-between mb-4">
                      <h2 className="font-bold">Order Items</h2>
                      <button type="button" onClick={() => setStep(1)} className="text-sm text-primary font-medium">
                        Edit
                      </button>
                    </div>
                    <div className="space-y-3 mb-4">
                      {items.map((item) => (
                        <div key={item.cartItemId} className="flex gap-3">
                          <div className="relative w-12 h-12 rounded-lg bg-muted overflow-hidden shrink-0">
                            <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-semibold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                    <TotalsBlock highlightTotal />
                  </div>
                </>
              )}

              <Button
                onClick={goNext}
                disabled={isSubmitting}
                className="w-full h-12 rounded-xl font-bold bg-primary hover:opacity-90 text-primary-foreground border-0"
              >
                {isSubmitting ? "Processing..." : step === 4 ? (
                  <span className="inline-flex items-center gap-2">
                    <Lock className="w-4 h-4" /> Place Order
                  </span>
                ) : (
                  stepTitles[step]
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
