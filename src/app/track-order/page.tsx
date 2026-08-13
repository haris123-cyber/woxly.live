"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Truck, MapPin, Search, Clock,
  ArrowLeft, MessageCircle, ChevronRight, Check, HeadphonesIcon, Home, Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

// Mock tracking data
const getMockTracking = (orderId: string) => ({
  id: orderId || "#WX12890",
  status: "In Transit",
  estimatedDelivery: "May 20, 2025 • By 7:00 PM",
  placedOn: "May 20, 2025 • 10:30 AM",
  address: {
    name: "Jenny Wilson",
    street: "123 Main Street, Apt 4B, New York, NY 10001",
    phone: "+1 (555) 123-4567"
  },
  items: [
    { title: "Fresh Bananas 1kg", qty: 1, price: "₹99", image: "/images/product_placeholder.png" },
    { title: "India Gate Rice 1kg", qty: 1, price: "₹249", image: "/images/product_placeholder.png" }
  ],
  totals: {
    subtotal: "₹348",
    delivery: "Free",
    total: "₹348"
  },
  steps: [
    { label: "Order Confirmed", date: "May 20, 2025 • 10:30 AM", desc: "Your order has been placed successfully.", completed: true, icon: Check },
    { label: "Packed", date: "May 20, 2025 • 11:15 AM", desc: "Your items are being packed.", completed: true, icon: Check },
    { label: "In Transit", date: "May 20, 2025 • 12:40 PM", desc: "Your order is on the way.", completed: true, icon: Truck, isCurrent: true },
    { label: "Out for Delivery", date: "", desc: "Your order is out for delivery.", completed: false, icon: null },
    { label: "Delivered", date: "", desc: "Your order will be delivered soon.", completed: false, icon: null },
  ]
});

function TrackOrderInner() {
  const searchParams = useSearchParams();
  const initialOrderId = searchParams.get("id") || "";

  const [orderId, setOrderId] = useState(initialOrderId);
  const [isTracking, setIsTracking] = useState(!!initialOrderId);
  const [loading, setLoading] = useState(false);
  const [trackingData, setTrackingData] = useState<any>(initialOrderId ? getMockTracking(initialOrderId) : null);

  const handleTrack = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!orderId.trim()) return;

    setLoading(true);
    setTimeout(() => {
      setTrackingData(getMockTracking(orderId.toUpperCase()));
      setIsTracking(true);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] pb-24">
      {/* Search Header for cases where we are not tracking yet */}
      {!isTracking && (
        <div className="pt-12 px-4 max-w-lg mx-auto">
          <Link href="/account" className="inline-flex items-center gap-2 text-sm text-[#16a34a] hover:underline mb-8 font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Menu
          </Link>
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">Track Order</h1>
            <p className="text-gray-500">Track your order in real-time</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <form onSubmit={handleTrack} className="flex flex-col gap-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="Order ID (e.g., #WX12890)"
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#16a34a]/20 focus:border-[#16a34a] transition-all font-medium text-gray-900"
                />
              </div>
              <Button
                type="submit"
                className="h-12 w-full rounded-xl bg-[#16a34a] hover:bg-[#15803d] text-white font-bold tracking-wide shadow-sm"
                disabled={loading}
              >
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Track Now"}
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Tracking View */}
      <AnimatePresence mode="wait">
        {isTracking && trackingData && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-[1200px] mx-auto px-4 lg:px-8 pt-6 lg:pt-10"
          >
            {/* Top Navigation & Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 lg:mb-10 gap-6">
              <div>
                <Link href="/account" className="inline-flex items-center gap-2 text-[14px] text-green-700 hover:underline mb-4 font-medium">
                  <ArrowLeft className="w-4 h-4" /> Back to Menu
                </Link>
                <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
                  Track Order
                </h1>
                <p className="text-gray-500 text-[14px] mt-2">Track your order in real-time</p>
              </div>


            </div>

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              {/* LEFT COLUMN */}
              <div className="flex-1 space-y-6">

                {/* Order ID & Delivery Strip */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 lg:p-6 flex flex-wrap gap-5 items-center justify-between">
                  <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                    <div>
                      <p className="text-[12px] text-gray-500 mb-0.5">Order ID</p>
                      <h2 className="text-[16px] font-bold text-gray-900">{trackingData.id}</h2>
                    </div>
                    <div>
                      <p className="text-[12px] text-gray-500 mb-0.5">Placed on</p>
                      <p className="text-[14px] font-medium text-gray-900">{trackingData.placedOn}</p>
                    </div>
                    <div className="hidden md:block w-px h-10 bg-gray-100"></div>
                    <div>
                      <p className="text-[12px] text-gray-500 mb-0.5 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" /> Estimated Delivery
                      </p>
                      <p className="text-[14px] font-bold text-[#15803d]">{trackingData.estimatedDelivery}</p>
                    </div>
                  </div>
                  <div className="bg-[#f0fdf4] text-[#15803d] px-4 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2">
                    <Truck className="w-4 h-4" /> {trackingData.status}
                  </div>
                </div>

                {/* Tracking Timeline */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
                  <h3 className="text-xl font-extrabold text-gray-900 mb-8">Order Tracking</h3>
                  <div className="relative">
                    {/* Continuous Vertical Line */}
                    <div className="absolute left-[23px] top-2 bottom-8 w-[2px] bg-gray-200"></div>

                    <div className="space-y-0 relative z-10">
                      {trackingData.steps.map((step: any, index: number) => {
                        const isCompleted = step.completed;
                        const isCurrent = step.isCurrent;
                        const Icon = step.icon;

                        return (
                          <div key={index} className="relative">
                            {/* Highlight row background for current step */}
                            {isCurrent && (
                              <div className="absolute -inset-x-4 inset-y-0 bg-[#f0fdf4] rounded-xl -z-10" />
                            )}

                            <div className="flex gap-5 py-4 px-2">
                              {/* Active Line Overlap Fill */}
                              {isCompleted && index < trackingData.steps.length - 1 && (
                                <div className="absolute left-[22px] top-8 w-[4px] h-[calc(100%-8px)] bg-[#16a34a] -z-10" />
                              )}

                              {/* Circle */}
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors mt-0.5 ${isCurrent ? 'bg-[#16a34a] text-white shadow-md shadow-green-600/20 ring-4 ring-[#f0fdf4]' :
                                isCompleted ? 'bg-[#16a34a] text-white' :
                                  'bg-white border-2 border-gray-300 text-transparent'
                                }`}>
                                {Icon && <Icon className={`w-4 h-4 ${isCurrent ? 'animate-pulse' : ''}`} strokeWidth={3} />}
                              </div>

                              <div className="pb-2 flex-1">
                                <h4 className={`text-[16px] font-bold ${isCurrent ? 'text-[#15803d]' : isCompleted ? 'text-gray-900' : 'text-gray-900'}`}>
                                  {step.label}
                                </h4>
                                <p className="text-[14px] text-gray-500 mt-1 leading-relaxed">{step.desc}</p>
                                {step.date && (
                                  <p className="text-[13px] text-gray-400 font-medium mt-1.5">{step.date}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Address Block */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#f0fdf4] rounded-xl flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-[#16a34a]" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-[16px] mb-1">Delivery Address</p>
                      <h4 className="font-bold text-gray-700 text-[14px]">{trackingData.address.name}</h4>
                      <p className="text-[14px] text-gray-500 mt-0.5 leading-snug">{trackingData.address.street}</p>
                      <p className="text-[14px] text-gray-500 mt-1">{trackingData.address.phone}</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 border border-[#16a34a] text-[#16a34a] bg-white hover:bg-[#f0fdf4] rounded-lg text-sm font-bold transition-colors shadow-sm whitespace-nowrap self-start sm:self-center">
                    Change Address
                  </button>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="w-full lg:w-[380px] shrink-0 space-y-6">

                {/* Order Summary */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-extrabold text-gray-900">Order Summary</h3>
                  </div>

                  <div className="space-y-5">
                    {trackingData.items.map((item: any, index: number) => (
                      <div key={index} className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 bg-[#f8f9fa] rounded-xl p-2 shrink-0 relative border border-gray-100">
                            <Image src={item.image} alt={item.title} fill className="object-contain p-1.5" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 text-[14px] leading-tight mb-1">{item.title}</p>
                            <p className="text-[13px] text-gray-500">Qty: {item.qty}</p>
                          </div>
                        </div>
                        <div className="font-bold text-gray-900 whitespace-nowrap">{item.price}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-5 border-t border-gray-100 space-y-3">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Subtotal</span>
                      <span className="text-gray-900 font-bold">{trackingData.totals.subtotal}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Delivery</span>
                      <span className="text-gray-900 font-bold">{trackingData.totals.delivery}</span>
                    </div>
                    <div className="flex justify-between items-center pt-3 mt-1">
                      <span className="text-base font-extrabold text-gray-900">Total</span>
                      <span className="text-lg font-extrabold text-[#16a34a]">{trackingData.totals.total}</span>
                    </div>
                  </div>
                </div>

                {/* Need Help */}
                <div className="bg-[#f0fdf4] rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 bg-[#dcfce7] rounded-full flex items-center justify-center mx-auto mb-3">
                    <HeadphonesIcon className="w-6 h-6 text-[#15803d]" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-[16px] mb-2">Need Help?</h4>
                  <p className="text-[13px] text-gray-600 mb-6">Our support team is here to help you.</p>

                  <button className="w-full py-2.5 bg-white border border-[#16a34a] text-[#15803d] rounded-xl text-sm font-bold hover:bg-[#f0fdf4] transition-colors flex items-center justify-center gap-2 shadow-sm">
                    <MessageCircle className="w-4 h-4" />
                    <Link href="/contact">
                      Contact Support</Link>
                  </button>
                </div>

              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f8fafc]"></div>}>
      <TrackOrderInner />
    </Suspense>
  );
}