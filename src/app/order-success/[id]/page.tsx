"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Check, Calendar, FileText, Package, Truck, Home, ChevronRight } from "lucide-react";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { motion } from "framer-motion";

export default function OrderSuccessPage() {
  const { id } = useParams();

  // Confetti particles
  const particles = [
    { color: 'bg-green-400', size: 'w-2 h-2', pos: '-top-4 left-4', shape: 'rounded-sm rotate-45' },
    { color: 'bg-blue-200', size: 'w-1.5 h-1.5', pos: 'top-2 -left-6', shape: 'rounded-full' },
    { color: 'bg-yellow-400', size: 'w-1.5 h-1.5', pos: 'top-8 -left-2', shape: 'rounded-full' },
    { color: 'bg-blue-400', size: 'w-1 h-1', pos: 'bottom-0 left-4', shape: 'rounded-full' },
    { color: 'bg-green-400', size: 'w-1 h-1', pos: '-top-6 right-6', shape: 'rounded-full' },
    { color: 'bg-yellow-200', size: 'w-1.5 h-1.5', pos: 'top-0 right-16', shape: 'rounded-full' },
    { color: 'bg-blue-200', size: 'w-1.5 h-1.5', pos: 'top-6 -right-4', shape: 'rounded-full' },
    { color: 'bg-yellow-400', size: 'w-2 h-2', pos: 'top-14 right-8', shape: 'rounded-sm -rotate-12' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        {/* Success Icon & Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="relative mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center relative z-10 shadow-sm border border-green-100"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-green-500 shadow-sm">
                <Check className="w-6 h-6 text-green-500 stroke-[3]" />
              </div>
            </motion.div>
            {/* Particles */}
            {particles.map((p, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.8 }}
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 15,
                  delay: 0.2 + (i * 0.05)
                }}
                className={`absolute ${p.pos} ${p.size} ${p.color} ${p.shape}`}
              />
            ))}
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">Thank you for your order!</h1>
          <p className="text-[15px] text-gray-500 max-w-sm leading-relaxed">
            Your order has been placed successfully. We&apos;ve sent a confirmation email to you with the order details.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[12px] text-gray-500 mb-0.5">Order Number</span>
                <span className="text-[14px] font-bold text-gray-900">{id || "WOXLY-590051"}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[12px] text-gray-500 mb-0.5">Date</span>
                <span className="text-[14px] font-bold text-gray-900">12/08/2026</span>
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-gray-50 mb-6" />

          <div className="flex gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[12px] text-gray-500 mb-0.5">Estimated Delivery</span>
              <span className="text-[14px] font-bold text-blue-600">Saturday, August 15</span>
            </div>
          </div>

          {/* Order Status Stepper */}
          <div>
            <h3 className="text-[15px] font-bold text-gray-900 mb-6">Order Status</h3>

            <div className="flex items-start justify-between relative px-2">
              {/* Connecting Lines */}
              <div className="absolute top-5 left-8 right-[50%] h-[2px] bg-green-600" />
              <div className="absolute top-5 left-[50%] right-8 h-[2px] bg-gray-100" />

              {/* Step 1 */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center z-10 border-4 border-white">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div className="text-center mt-1">
                  <span className="text-[12px] font-bold text-green-600 block mb-0.5">Placed</span>
                  <span className="text-[10px] text-gray-400 block">12/08/2026</span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center z-10 border-4 border-white shadow-sm">
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <div className="text-center mt-1">
                  <span className="text-[12px] font-bold text-blue-600 block mb-0.5">Confirmed</span>
                  <span className="text-[10px] text-gray-400 block">12/08/2026</span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center z-10 shadow-sm">
                  <Package className="w-4 h-4 text-gray-400" />
                </div>
                <div className="text-center mt-1">
                  <span className="text-[12px] font-medium text-gray-500 block mb-0.5">Shipped</span>
                  <span className="text-[10px] text-gray-400 block">Upcoming</span>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center z-10 shadow-sm">
                  <Home className="w-4 h-4 text-gray-400" />
                </div>
                <div className="text-center mt-1">
                  <span className="text-[12px] font-medium text-gray-500 block mb-0.5">Delivered</span>
                  <span className="text-[10px] text-gray-400 block">Upcoming</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Need Help WhatsApp Box */}
        <div className="bg-[#f0f9f3] rounded-2xl p-5 mb-8 flex items-center gap-4 relative overflow-hidden border border-green-50">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
            <IconBrandWhatsapp className="w-7 h-7 text-green-600" />
          </div>
          <div className="flex flex-col z-10">
            <h3 className="text-[14px] font-bold text-gray-900 mb-1">Need help with your order?</h3>
            <p className="text-[12px] text-gray-600 mb-2 leading-relaxed max-w-[200px]">
              Chat with us on WhatsApp for any questions or support.
            </p>
            <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="text-[12px] font-bold text-green-600 flex items-center gap-1 hover:underline">
              Chat on WhatsApp <ChevronRight className="w-3 h-3" />
            </a>
          </div>
          <div className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-md shadow-green-500/20 z-10">
            <IconBrandWhatsapp className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 max-w-[50%] mx-auto w-full">
          <Link
            href={`/track-order?id=${id}`}
            className="w-full bg-[#2563eb] hover:bg-blue-700 text-white font-bold h-14 rounded-xl flex items-center justify-center transition-colors"
          >
            Track Your Order
          </Link>
          <Link
            href="/shop"
            className="w-full bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-800 font-bold h-14 rounded-xl flex items-center justify-center transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
