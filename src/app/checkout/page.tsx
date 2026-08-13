"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";
import {
  IconShoppingBag as ShoppingBag,
  IconTruck as Truck,
  IconUser as User,
  IconMail as Mail,
  IconPhone as Phone,
  IconChevronDown as ChevronDown,
  IconHelpCircle as HelpCircle,
  IconCreditCard as CreditCard,
  IconLock as Lock,
  IconDeviceMobile as Smartphone,
  IconDiscount2 as BadgePercent,
  IconShieldCheck as ShieldCheck,
  IconMapPin as MapPin,
  IconBuilding as Building,
  IconClipboardText as ClipboardText
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAddressStore } from "@/store/useAddressStore";
import { useRewardStore } from "@/store/useRewardStore";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getCartTotal, clearCart, couponApplied } = useCartStore();
  const { addresses } = useAddressStore();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [stateValue, setStateValue] = useState("");
  const [pincode, setPincode] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [showSavedAddresses, setShowSavedAddresses] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [error, setError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = getCartTotal();
  const discount = couponApplied ? subtotal * 0.1 : 0; // 10% discount if coupon applied
  const onlineDiscount = 10;

  const checkoutBtnRef = useRef<HTMLButtonElement>(null);
  const [showStickyCTA, setShowStickyCTA] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyCTA(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (checkoutBtnRef.current) {
      observer.observe(checkoutBtnRef.current);
    }

    return () => observer.disconnect();
  }, [items.length]);

  useEffect(() => {
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      fetch(`https://api.postalpincode.in/pincode/${pincode}`)
        .then(res => res.json())
        .then(data => {
          if (data && data[0] && data[0].Status === "Success") {
            const postOffice = data[0].PostOffice[0];
            setCity(postOffice.District);
            setStateValue(postOffice.State);
          }
        })
        .catch(err => console.error("Error fetching pincode:", err));
    }
  }, [pincode]);

  const shipping = 53.36;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount - onlineDiscount + shipping + tax;

  const placeOrder = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError("");
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      clearCart();

      // Earn 1 Woxly Coin for every ₹10 spent
      const earnedCoins = Math.floor(total / 10);
      useRewardStore.getState().addCoins(earnedCoins);

      const orderId = `WOXLY-${Math.floor(100000 + Math.random() * 900000)}`;
      toast.success("Order placed successfully", {
        description: `Your order ${orderId} has been confirmed.`,
      });
      router.push(`/order-success/${orderId}`);
    }, 1200);
  };

  // ── Empty state ──────────────────────────────
  if (items.length === 0 && !isSubmitting) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center py-16 px-4 bg-[#f9fafb]">
        <div className="w-24 h-24 rounded-sm bg-[#f4eefc] flex items-center justify-center mb-6">
          <ShoppingBag className="w-11 h-11 text-primary" stroke={1.5} />
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
        <form id="checkout-form" onSubmit={placeOrder} className="flex flex-col lg:flex-row gap-8">

          {/* ── Left Column: Details & Payment ── */}
          <div className="flex-1 space-y-8">

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-50 text-red-600 px-4 py-3 rounded-[12px] text-[14px] font-bold border border-red-200 flex items-start gap-2.5 shadow-sm"
                >
                  <HelpCircle className="w-[18px] h-[18px] text-red-500 mt-0.5 shrink-0" stroke={2} />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Personal Details Section */}
            <div>
              <div className="flex items-center justify-between mb-5 px-1 ">
                <div className="flex items-center gap-2">
                  <User className="w-[22px] h-[22px] text-gray-600" stroke={1.5} />
                  <h2 className="text-[19px] font-bold text-gray-900">Personal Details</h2>
                </div>
                {addresses.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowSavedAddresses(!showSavedAddresses)}
                    className="text-primary text-[12px] font-bold hover:underline bg-primary/10 px-3 py-1.5  transition-colors"
                  >
                    {showSavedAddresses ? "Cancel" : "Use Saved"}
                  </button>
                )}
              </div>

              <AnimatePresence>
                {showSavedAddresses && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex gap-3 overflow-x-auto pb-4 mb-2 scrollbar-hide px-1">
                      {addresses.map(addr => (
                        <button
                          key={addr.id}
                          type="button"
                          onClick={() => {
                            setFullName(addr.name || "");
                            setEmail(addr.email || "");

                            // Sanitize phone to exactly 10 digits to pass validation (for legacy dummy data)
                            const sanitizedPhone = (addr.phone || "").replace(/\D/g, '').slice(-10);
                            setPhone(sanitizedPhone.padEnd(10, '0'));

                            setAddressLine(addr.addressLine || "");
                            setCity(addr.city || "");
                            setStateValue(addr.state || "");

                            const pcode = (addr.pinCode || "")
                              .replace(/\D/g, "")
                              .slice(0, 6);

                            setPincode(pcode);

                            setShowSavedAddresses(false);
                          }}
                          className="flex-shrink-0 px-4 py-3 rounded-[6px] border border-gray-200 text-left hover:border-primary hover:bg-primary/5 transition-all w-[240px]"
                        >
                          <p className="font-bold text-gray-900 text-[14px] mb-0.5">{addr.name}</p>
                          <p className="text-gray-500 text-[12px] truncate">{addr.addressLine}, {addr.city}</p>
                          <p className="text-gray-500 text-[12px] mt-1 font-medium">{addr.phone}</p>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-4">
                <div>
                  <label className="block  text-[13px] font-bold text-gray-900 mb-1.5 px-2">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="w-[22px] h-[22px] text-gray-400" stroke={1.5} />
                    </div>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full h-[56px] bg-white border border-gray-200 rounded-[6px] pl-12 pr-4 text-[15px] font-medium text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 transition-all shadow-sm"
                      placeholder=" (First & Last Name)"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-gray-900 mb-1.5 px-2">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="w-[22px] h-[22px] text-gray-400" stroke={1.5} />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-[56px] bg-white border border-gray-200 rounded-[6px] pl-12 pr-4 text-[15px] font-medium text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 transition-all shadow-sm"
                      placeholder="Enter your email for order updates"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-gray-900 mb-1.5 px-2">Phone Number</label>
                  <div className="flex bg-white border border-gray-200 rounded-[6px] h-[56px] overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all shadow-sm">
                    <div className="flex items-center gap-2 pl-4 pr-3 border-r border-gray-100 bg-gray-50/50">
                      <span className="text-xl">🇮🇳</span>
                      <ChevronDown className="w-[18px] h-[18px] text-gray-500" stroke={2} />
                    </div>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      title="Please enter a valid 10-digit mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="flex-1 bg-transparent border-none outline-none px-4 text-[15px] font-medium text-gray-900 placeholder:text-gray-400"
                      placeholder="Enter your 10-digit mobile number"
                    />
                    <div className="pr-4 flex items-center">
                      <HelpCircle className="w-[22px] h-[22px] text-gray-300" stroke={1.5} />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-gray-900 mb-1.5 px-2">Street Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <MapPin className="w-[22px] h-[22px] text-gray-400" stroke={1.5} />
                    </div>
                    <input
                      type="address"
                      required
                      value={addressLine}
                      onChange={(e) => setAddressLine(e.target.value)}
                      className="w-full h-[56px] bg-white border border-gray-200 rounded-[6px] pl-12 pr-4 text-[15px] font-medium text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 transition-all shadow-sm"
                      placeholder="House/Flat No., Building Name, Street Area"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] font-bold text-gray-900 mb-1.5 px-2">City</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Building className="w-[22px] h-[22px] text-gray-400" stroke={1.5} />
                      </div>
                      <input
                        type="text"
                        required
                        value={city}
                        readOnly
                        autoComplete="off"
                        className="w-full h-[56px] bg-white border border-gray-200 rounded-[6px] pl-12 pr-4 text-[15px] font-medium text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 transition-all shadow-sm"
                        placeholder="Enter your city/town"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-gray-900 mb-1.5 px-2">State</label>
                    <input
                      type="text"
                      required
                      value={stateValue}
                      readOnly
                      autoComplete="off"
                      className="w-full h-[56px] bg-white border border-gray-200 rounded-[6px] px-4 text-[15px] font-medium text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 transition-all shadow-sm"
                      placeholder="Enter your state"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-gray-900 mb-1.5 px-2">Pincode</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    required
                    pattern="[0-9]{6}"
                    title="Please enter a valid 6-digit postal code"
                    value={pincode}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                      setPincode(value);
                    }}
                    className="w-full h-[56px] bg-white border border-gray-200 rounded-[6px] px-4 text-[15px] font-medium text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 transition-all shadow-sm"
                    placeholder="Enter 6-digit postal code"
                  />
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-gray-900 mb-1.5 px-2">Order Notes (Optional)</label>
                  <div className="relative">
                    <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none">
                      <ClipboardText className="w-[22px] h-[22px] text-gray-400" stroke={1.5} />
                    </div>
                    <textarea
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      className="w-full min-h-[100px] bg-white border border-gray-200 rounded-[6px] pl-12 pr-4 py-4 text-[15px] font-medium text-gray-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 transition-all shadow-sm resize-y"
                      placeholder="Any special instructions for delivery? (e.g., Leave at the door)"
                    />
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Payment Method Section */}
            <div>
              <div className="flex items-center gap-2 mb-5 px-1">
                <CreditCard className="w-[22px] h-[22px] text-gray-600" stroke={1.5} />
                <h2 className="text-[19px] font-bold text-gray-900">Payment Method</h2>
              </div>

              <div className="relative rounded-[6px] border-2 border-primary p-5 bg-white shadow-sm mb-4 cursor-pointer overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary/10 text-primary text-[10px] font-extrabold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                  Recommended
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-[44px] h-[44px] rounded-[14px] bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Smartphone className="w-[24px] h-[24px]" stroke={1.5} />
                  </div>
                  <div className="flex-1 mt-0.5">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-gray-900 text-[16px]">Pay Online</span>
                      <div className="w-5 h-5 rounded-full border-4 border-primary bg-white"></div>
                    </div>
                    <p className="text-[13px] text-gray-500 mb-4 pr-6">UPI, Credit/Debit Cards, or Netbanking. Secure & instant.</p>

                    <div className="bg-emerald-50 border border-emerald-100 rounded-[14px] px-3 py-2.5 flex items-center gap-2">
                      <BadgePercent className="w-[18px] h-[18px] text-emerald-600" stroke={1.5} />
                      <span className="text-[12px] font-bold text-emerald-600">Extra ₹10 off — online payment only.</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-[13px] text-gray-500 px-2 leading-relaxed">
                Cash on delivery isn't available for your current pincode. Please pay online to place the order.
              </p>
            </div>
          </div>

          {/* ── Right Column: Order Summary & Place Order ── */}
          <div className="w-full lg:w-[420px] shrink-0">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-5">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-[17px] font-extrabold text-gray-900">{items.length} Total Items</h2>
                  <Link href="/cart" className="text-[#00a859] font-semibold text-sm hover:underline">Edit</Link>
                </div>

                <div className="flex overflow-x-auto gap-3 pb-4 mb-2 scrollbar-hide">
                  {items.map(item => (
                    <div key={item.id} className="w-[72px] h-[72px] rounded-[16px] border border-gray-100 overflow-hidden relative shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover p-1" />
                    </div>
                  ))}
                </div>

                {/* Order Summary Toggle */}
                <button
                  type="button"
                  onClick={() => setShowSummary(!showSummary)}
                  className="w-full py-3 mb-2 flex items-center justify-between text-[13px] font-bold text-primary hover:text-primary/80 transition-colors border-y border-gray-100"
                >
                  <span className="flex items-center gap-1.5">
                    {showSummary ? "Hide" : "Show"} order summary
                    <ChevronDown className={`w-4 h-4 transition-transform ${showSummary ? "rotate-180" : ""}`} />
                  </span>
                  <span className="font-extrabold text-gray-900">₹{total.toFixed(2).replace(/\.00$/, '')}</span>
                </button>

                <AnimatePresence>
                  {showSummary && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="py-2 space-y-3 text-[13px] border-b border-gray-100 mb-4">
                        <div className="flex justify-between text-gray-500">
                          <span>Subtotal</span>
                          <span className="font-semibold text-gray-900">₹{subtotal.toFixed(2).replace(/\.00$/, '')}</span>
                        </div>
                        {discount > 0 && (
                          <div className="flex justify-between text-[#00a859]">
                            <span>Discount</span>
                            <span className="font-semibold">-₹{discount.toFixed(2).replace(/\.00$/, '')}</span>
                          </div>
                        )}
                        {onlineDiscount > 0 && (
                          <div className="flex justify-between text-[#00a859]">
                            <span>Online Payment Discount</span>
                            <span className="font-semibold">-₹{onlineDiscount.toFixed(2).replace(/\.00$/, '')}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-gray-500">
                          <span>Delivery</span>
                          <span className="font-semibold text-gray-900">₹{shipping.toFixed(2).replace(/\.00$/, '')}</span>
                        </div>
                        <div className="flex justify-between text-gray-500">
                          <span>Tax</span>
                          <span className="font-semibold text-gray-900">₹{tax.toFixed(2).replace(/\.00$/, '')}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="pt-2 flex justify-between items-end">
                  <div>
                    {discount > 0 && (
                      <p className="text-[#00a859] text-[13px] font-bold mb-1">You saved ₹{discount.toFixed(2)}!</p>
                    )}
                    <div className="flex items-baseline gap-2">
                      <span className="text-[28px] font-extrabold text-gray-900 leading-none">
                        ₹{total.toFixed(2).replace(/\.00$/, '')}
                      </span>
                      {discount > 0 && (
                        <span className="text-gray-400 line-through text-[15px] font-medium">
                          ₹{(total + discount).toFixed(2).replace(/\.00$/, '')}
                        </span>
                      )}
                    </div>
                  </div>
                  {!couponApplied ? (
                    <button type="button" onClick={() => router.push('/cart')} className="h-9 px-4  border border-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-50 transition-colors shrink-0">
                      Coupon Available
                    </button>
                  ) : (
                    <div className="h-9 px-4 border border-primary/20 bg-primary/5 text-[#00a859] text-xs font-bold flex items-center justify-center shrink-0">
                      Coupon Applied
                    </div>
                  )}
                </div>
              </div>

              {/* Main Checkout Button (Moved below Order Summary) */}
              <div className="pb-8 lg:pb-0">
                <Button
                  ref={checkoutBtnRef}
                  type="submit"
                  form="checkout-form"
                  disabled={isSubmitting}
                  className="w-full h-[56px] bg-primary hover:bg-primary/90 text-white font-bold text-[16px] rounded-[20px] transition-all flex items-center justify-center shadow-md border-none"
                >
                  {isSubmitting ? (
                    "Processing..."
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      <Lock className="w-[18px] h-[18px]" stroke={2} /> Place Order
                    </span>
                  )}
                </Button>

                <div className="flex items-center justify-center gap-2 mt-5 text-[12px] text-gray-400 font-medium">
                  <ShieldCheck className="w-[16px] h-[16px]" stroke={1.5} />
                  <span>Secure checkout • 256-bit encryption</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Mobile Sticky Checkout Bar */}
      <AnimatePresence>
        {showStickyCTA && (
          <motion.div
            initial={{ y: "120%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "120%", opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom))] lg:hidden left-4 right-4 z-50 bg-white rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.12)] px-5 py-4 flex items-center justify-between border border-gray-100"
          >
            <div className="flex flex-col">
              <span className="text-[24px] font-extrabold text-gray-900 leading-none">
                ₹{total.toFixed(2).replace(/\.00$/, '')}
              </span>
              <span className="text-[13px] text-gray-500 font-semibold leading-none mt-1.5">
                Total Amount
              </span>
            </div>
            <Button
              type="submit"
              form="checkout-form"
              disabled={isSubmitting}
              className="h-[48px] rounded-[16px] bg-primary hover:bg-primary/90 text-white font-bold text-[15px] px-8 shadow-sm border-0"
            >
              {isSubmitting ? "Processing" : "Place Order"}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
