"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { useParams, useRouter } from "next/navigation";
import { PRODUCTS } from "@/lib/mock-data";
import { toast } from "sonner";
import { useCartStore } from "@/store/useCartStore";
import { useWatchlistStore } from "@/store/useWatchlistStore";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product/ProductCard";
import { IconTruckReturn, IconShieldCheck, IconTruckDelivery } from "@tabler/icons-react";
import {
  Star,
  Truck,
  Minus,
  Plus,
  Heart,
  ShoppingBag,
  ShoppingCart,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  ArrowRight,
  Percent,
  BadgePercent,
  ShieldCheck,
  ShieldAlert,
  BadgeCheck,
  CheckCircle2,
  Flame,
  Share2,
  ZoomIn,
  Package,
  MapPin,
  Zap,
  Paperclip,
} from "lucide-react";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    className={className}
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a5.29 5.29 0 0 0-.571-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.052 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

export default function ProductDetailPage() {
  const { slug } = useParams();
  const product = PRODUCTS.find((p) => p.slug === slug);
  const addItem = useCartStore((state) => state.addItem);
  const { toggleItem, isInWatchlist } = useWatchlistStore();
  const router = useRouter();

  const [showStickyCTAs, setShowStickyCTAs] = useState(false);
  const inPageCTARef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky CTAs when the in-page CTA is NOT visible
        setShowStickyCTAs(!entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0,
      }
    );

    const currentRef = inPageCTARef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product?.colors?.[0] || "Brown"
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    "S"
  );
  const [imageIndex, setImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");
  const [isWarrantyOpen, setIsWarrantyOpen] = useState(false);
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenReviewImage, setFullscreenReviewImage] = useState<string | null>(null);

  const [emblaRefMobile, emblaApiMobile] = useEmblaCarousel({ loop: true });
  const [emblaRefDesktop, emblaApiDesktop] = useEmblaCarousel({ loop: true });

  const onSelectMobile = useCallback(() => {
    if (!emblaApiMobile) return;
    setImageIndex(emblaApiMobile.selectedScrollSnap());
  }, [emblaApiMobile]);

  const onSelectDesktop = useCallback(() => {
    if (!emblaApiDesktop) return;
    setImageIndex(emblaApiDesktop.selectedScrollSnap());
  }, [emblaApiDesktop]);

  useEffect(() => {
    if (!emblaApiMobile) return;
    emblaApiMobile.on("select", onSelectMobile);
  }, [emblaApiMobile, onSelectMobile]);

  useEffect(() => {
    if (!emblaApiDesktop) return;
    emblaApiDesktop.on("select", onSelectDesktop);
  }, [emblaApiDesktop, onSelectDesktop]);

  useEffect(() => {
    if (emblaApiMobile && emblaApiMobile.selectedScrollSnap() !== imageIndex) {
      emblaApiMobile.scrollTo(imageIndex);
    }
    if (emblaApiDesktop && emblaApiDesktop.selectedScrollSnap() !== imageIndex) {
      emblaApiDesktop.scrollTo(imageIndex);
    }
  }, [imageIndex, emblaApiMobile, emblaApiDesktop]);

  const [pincode, setPincode] = useState("");
  const [checkedPincode, setCheckedPincode] = useState<string | null>(null);
  const [pinLocation, setPinLocation] = useState<string>("");
  const [isCheckingPin, setIsCheckingPin] = useState(false);

  const handleCheckPincode = async () => {
    if (pincode.length !== 6) {
      toast.error("Please enter a valid 6-digit PIN");
      return;
    }
    setIsCheckingPin(true);
    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await res.json();
      if (data && data[0] && data[0].Status === "Success") {
        setPinLocation(data[0].PostOffice[0].District);
      } else {
        setPinLocation("Unknown Location");
      }
    } catch (e) {
      setPinLocation("Unknown Location");
    }
    setCheckedPincode(pincode);
    setIsCheckingPin(false);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name,
          text: product?.description,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied", {
        description: "Product link copied to clipboard.",
      });
    }
  };

  if (!product) {
    return (
      <div className="container mx-auto px-5 py-32 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The product you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/shop">Back to Shop</Link>
        </Button>
      </div>
    );
  }

  const inWatchlist = isInWatchlist(product.id);
  const colorMap: Record<string, string> = {
    Black: "#1f2937",
    Silver: "#c0c0c0",
    Brown: "#8B5E3C",
    "Light Brown": "#C4A484",
    White: "#f5f5f5",
    Blue: "#3b82f6",
    Red: "#ef4444",
  };
  const colorLabels = product?.colors || ["Brown", "Light Brown", "Black"];
  const colors = colorLabels.map((c) => colorMap[c] || "#8B5E3C");
  const sizeLabels = ["S", "M", "L", "XL", "XXL"];
  const gallery = [
    product.image,
    "/images/product_placeholder.png",
    "/images/product_placeholder.png",
    "/images/product_placeholder.png",
    "/images/product_placeholder.png",
    "/images/product_placeholder.png",
  ];
  const originalPrice = product.originalPrice;
  const discountPercentage = originalPrice ? Math.round(((originalPrice - product.price) / originalPrice) * 100) : 0;

  const handleAddToCart = () => {
    // If quantity was missing (though state defaults to 1)
    if (!quantity || quantity < 1) {
      toast.error("Please select a quantity");
      return;
    }
    addItem(product, quantity, selectedColor, product.sizes?.[0]);
    toast.success("Added to cart", {
      description: "Product added successfully.",
    });
  };

  const handleBuyNow = () => {
    if (!quantity || quantity < 1) {
      toast.error("Please select a quantity");
      return;
    }
    addItem(product, quantity, selectedColor, product.sizes?.[0]);
    router.push("/cart");
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 8);

  const reviews = [
    {
      name: "Sinsar Dg",
      date: "Apr, 2026",
      rating: 5,
      title: "Best and Fresh",
      text: "Very fresh Atlantic salmon, no fishy smell at all. The cut was generous and cooked beautifully. Highly recommend.",
      verified: false,
      images: ["/images/product_placeholder.png"]
    },
    {
      name: "Sunitha KV",
      date: "Apr, 2026",
      rating: 5,
      title: "Best salmon I have ordered online",
      text: "",
      verified: true
    },
    {
      name: "Rahul",
      date: "Apr, 2026",
      rating: 4,
      title: "Good quality fish",
      text: "Nice thick fillet, good colour. Cooked it the same day and it was delicious. Delivery was quick too.",
      verified: false,
      images: ["/images/product_placeholder.png", "/images/product_placeholder.png"]
    },
    {
      name: "Priya Nair",
      date: "Apr, 2026",
      rating: 5,
      title: "Fresh and perfectly cut",
      text: "The salmon arrived very fresh. Cooked it pan-seared with lemon and it was restaurant quality. Will definitely order again.",
      verified: true
    }
  ];

  const renderReviewsTab = () => (
    <div className="flex flex-col mt-2">
      <h3 className="font-bold text-lg mb-6">Customer reviews</h3>

      {/* Rating Overview */}
      <div className="flex flex-row items-center gap-4 sm:gap-10 py-6 border-y border-gray-100 mb-6">
        <div className="flex flex-col items-center w-24 sm:w-32 shrink-0">
          <span className="text-4xl font-bold text-gray-900 mb-1">{product.rating || "0"}</span>
          <div className="flex items-center gap-0.5 sm:gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${i < Math.floor(product.rating || 0)
                  ? "fill-[#f89820] text-[#f89820]"
                  : "fill-gray-200 text-gray-200"
                  }`}
              />
            ))}
          </div>
          <span className="text-xs sm:text-[13px] text-gray-400">{product.reviews || 0} reviews</span>
        </div>

        {/* Vertical Divider */}
        <div className="w-[1px] h-20 bg-gray-100 shrink-0"></div>

        <div className="flex-1 w-full max-w-[280px] space-y-2 pl-2 sm:pl-0">
          {[
            { stars: 5, percent: 75, count: 3 },
            { stars: 4, percent: 25, count: 1 },
            { stars: 3, percent: 0, count: 0 },
            { stars: 2, percent: 0, count: 0 },
            { stars: 1, percent: 0, count: 0 },
          ].map((bar) => (
            <div key={bar.stars} className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1 w-6 sm:w-8 shrink-0 justify-end">
                <span className="text-xs font-medium text-gray-700">{bar.stars}</span>
                <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-[#f89820] text-[#f89820]" />
              </div>
              <div className="flex-1 h-1.5 sm:h-2 rounded-full bg-[#f4eefc] overflow-hidden">
                <div
                  className="h-full bg-[#f89820] rounded-full"
                  style={{ width: `${bar.percent}%` }}
                />
              </div>
              <span className="text-[10px] sm:text-xs text-gray-400 w-3 sm:w-4 text-right">{bar.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="flex flex-col">
        {reviews.map((review, idx) => (
          <div key={idx} className="flex gap-4 p-5 mb-4 bg-white rounded-2xl border border-gray-100">
            <div className="w-10 h-10 rounded-full bg-[#f3edff] text-[#8b5cf6] flex items-center justify-center text-xs font-bold shrink-0 uppercase">
              {review.name.split(" ").map(n => n[0]).join("").substring(0, 2)}
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 mb-2">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-gray-900">{review.name}</span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {review.verified && (
                      <span className="flex items-center gap-1 text-[#00a859] text-[11px] font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 fill-[#00a859] text-white" />
                        Verified buyer
                      </span>
                    )}
                    {review.verified && <span className="text-gray-300 text-[10px]">•</span>}
                    <span className="text-[11px] text-gray-500">{review.date}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < (review.rating || 5)
                      ? "fill-[#f89820] text-[#f89820]"
                      : "fill-gray-200 text-gray-200"
                      }`}
                  />
                ))}
              </div>
              {review.title && (
                <h4 className="text-[13px] font-bold text-gray-900 mb-1.5">{review.title}</h4>
              )}
              {review.text && (
                <p className="text-[13px] text-gray-600 leading-relaxed mb-3">
                  {review.text}
                </p>
              )}
              {review.images && review.images.length > 0 && (
                <div className="flex gap-2 overflow-x-auto hide-scrollbar mt-2">
                  {review.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setFullscreenReviewImage(img)}
                      className="relative w-16 h-16 rounded-md overflow-hidden shrink-0 border border-gray-200 cursor-zoom-in hover:opacity-90 transition-opacity"
                    >
                      <Image src={img} alt={`Review image ${i + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 text-[13px] text-gray-500">
        <Link href="/login" className="text-[#8b5cf6] underline hover:text-[#7c3aed] transition-colors">Sign in</Link> to leave a review.
      </div>
    </div>
  );

  const renderDeliveryDetails = () => (
    <div className="mb-6 rounded-sm border border-[#e5e7eb] shadow-sm bg-white overflow-hidden">
      <div className="px-4 py-2 border-b border-[#f3f4f6]">
        <h3 className="font-semibold text-[15px] text-gray-900">Delivery details</h3>
        <p className="text-[10px] text-gray-700 font-small">Enter pincode to check delivery availability</p>
      </div>

      {!checkedPincode ? (
        <div className="p-4">
          <p className="text-[13px] text-gray-900 font-medium mb-1">Enter pincode</p>
          <div className="flex gap-2">
            <input
              type="text"
              maxLength={6}
              placeholder="6-digit PIN"
              value={pincode}
              onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
              className="flex-1 h-[42px] px-3 border border-[#e5e7eb] rounded-lg text-[14px] focus:outline-none focus:border-[#a78bfa] focus:ring-1 focus:ring-[#a78bfa] transition-all"
            />
            <button
              onClick={handleCheckPincode}
              disabled={isCheckingPin || pincode.length !== 6}
              className="h-[42px] px-6 bg-primary hover:bg-primary/90 text-white rounded-lg text-[14px] font-bold transition-colors "
            >
              {isCheckingPin ? "..." : "Check"}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="p-4 bg-[#faf5ff] flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[#8b5cf6] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[14px] text-gray-900 leading-tight">{pinLocation}, {checkedPincode}</p>
              <button
                onClick={() => setCheckedPincode(null)}
                className="text-[13px] text-[#8b5cf6] hover:underline font-medium mt-1 flex items-center gap-1"
              >
                Change delivery location <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
          <div className="p-4 border-t border-[#f3f4f6] flex items-start gap-3">
            <Truck className="w-5 h-5 text-gray-800 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-bold text-[14px] text-gray-900 leading-tight">Delivery by Aug 14, 2026</p>
              <p className="text-[13px] text-gray-500 mt-1">₹53.36 delivery · Ekart Logistics Surface</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderOfferTickets = () => {
    const tickets = [
      { id: 1, title: "Online payment offer", discount: "10% OFF", subtitle: "On all products", color: "bg-[#dc2626]" },
      { id: 2, title: "First order offer", discount: "15% OFF", subtitle: "For new users", color: "bg-[#dc2626]" },
      { id: 3, title: "Special weekend sale", discount: "20% OFF", subtitle: "On select items", color: "bg-[#dc2626]" },
    ];

    return (
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 pl-5 ml-1 mr-1 sm:mx-0 sm:px-0 mt-2 mb-2 after:content-[''] after:w-1 sm:after:w-0 after:shrink-0">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="flex items-stretch w-[300px] sm:w-[320px] shrink-0 h-[62px] sm:h-[68px] snap-start">
            {/* LEFT TICKET TAB */}
            <div className={`relative w-[48px] sm:w-[56px] shrink-0 ${ticket.color} rounded-l-lg flex flex-col items-center justify-center overflow-hidden`}>
              <div className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full" />
              <span className="text-white text-[7px] font-bold tracking-widest mt-1" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
                DISCOUNT %
              </span>
            </div>

            {/* DASHED SEPARATOR */}
            <div className={`relative w-0 border-l-[2px] border-dashed border-white ${ticket.color} z-10`} />

            {/* CENTER SECTION */}
            <div className={`relative flex-1 ${ticket.color} flex items-center px-3 sm:px-5 py-2 overflow-hidden`}>
              <div className="flex items-center gap-2 sm:gap-3 w-full">
                <BadgePercent className="w-8 h-8 sm:w-9 sm:h-9 text-white shrink-0" strokeWidth={2.5} />
                <div className="flex flex-col ml-1 sm:ml-2 min-w-0">
                  <span className="text-white font-light italic text-[10px] sm:text-[11px] leading-none mb-1 truncate">
                    {ticket.title}
                  </span>
                  <span className="text-white font-bold text-[18px] sm:text-[22px] leading-none mb-1 whitespace-nowrap">
                    {ticket.discount}
                  </span>
                  <span className="text-white font-light italic text-[10px] sm:text-[11px] leading-none mb-1 truncate">
                    {ticket.subtitle}
                  </span>
                </div>
              </div>
            </div>

            {/* DASHED SEPARATOR */}
            <div className={`relative w-0 border-l-[2px] border-dashed border-white ${ticket.color} z-10`} />

            {/* RIGHT TICKET TAB */}
            <div className={`relative w-[48px] sm:w-[56px] shrink-0 ${ticket.color} rounded-r-lg flex items-center justify-center overflow-hidden`}>
              <div className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full" />
              <span className="text-white text-[8px] font-bold tracking-widest" style={{ writingMode: "vertical-rl" }}>
                SAVE
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };


  return (
    <div className=" min-h-screen overflow-x-hidden">
      {/* ── MOBILE LAYOUT ── */}
      <div className="lg:hidden pb-6 ">
        {/* Main Image Section */}
        <div className="relative w-full aspect-[4/5] overflow-hidden" ref={emblaRefMobile}>
          <div className="flex h-full w-full cursor-grab active:cursor-grabbing">
            {gallery.map((img, idx) => (
              <div key={idx} className="relative flex-[0_0_100%] min-w-0 h-full">
                <Image
                  src={img}
                  alt={`${product.name} ${idx + 1}`}
                  fill
                  className="object-cover pointer-events-none"
                  priority={idx === 0}
                  sizes="100vw"
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {/* Right Floating Actions */}
          <div className="absolute top-6 right-4 flex flex-col gap-3">
            <button
              onClick={handleShare}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm"
            >
              <Share2 className="w-4 h-4 text-gray-700" />
            </button>
            <button
              onClick={() => toggleItem(product)}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm"
            >
              <Heart className={`w-4 h-4 ${inWatchlist ? "fill-red-500 text-red-500" : "text-gray-700"}`} />
            </button>
            <button
              onClick={() => setIsFullscreen(true)}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm"
            >
              <ZoomIn className="w-4 h-4 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Product Info Card (White Background) */}
        <div className="bg-white rounded-t-3xl px-5 pt-6 pb-4 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
          {/* Thumbnails */}
          <div className="flex gap-3 mb-6 overflow-x-auto hide-scrollbar pb-1">
            {gallery.slice(0, 5).map((img, i) => {
              const isLast = i === 4;
              const hasMore = gallery.length > 5;

              return (
                <button
                  key={i}
                  onClick={() => setImageIndex(i)}
                  className={`relative w-14 h-14 rounded-xl overflow-hidden bg-white shrink-0 ${imageIndex === i ? "border-2 border-primary" : "border border-gray-200"} shadow-sm`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                  {isLast && hasMore && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-medium text-sm">
                      +{gallery.length - 4}
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          {/* Title */}
          <h1 className="text-[22px] font-extrabold text-gray-900 leading-tight mb-2">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-bold text-gray-900">{product.rating || "0"}</span>
            <span className="text-sm text-blue-600 font-medium ml-1">
              ({product.reviews || 0} reviews)
            </span>
          </div>

          {/* Description */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <p className="text-sm text-black leading-relaxed">
              {product.description || "Healthy and nutritious oats to kickstart your day with energy."}
            </p>
            <div className="flex items-center gap-1.5 shrink-0 px-2 py-0.5 mt-0.5">

              <span className="text-xs font-bold text-blue-600">In Stock</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-end gap-3 mb-5">
            <span className="text-[28px] font-extrabold text-gray-900 leading-none">
              ₹{product.price.toFixed(0)}
            </span>
            {originalPrice && (
              <span className="text-base text-gray-400 line-through font-medium mb-1">
                ₹{originalPrice.toFixed(0)}
              </span>
            )}
            {/* Green Discount Tag */}
            {discountPercentage > 0 && (
              <span
                className="bg-[#00a859] text-white text-[12px] font-bold pl-3.5 pr-4.5 py-1 whitespace-nowrap"
                style={{ clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 100%, 0 100%)" }}
              >
                {discountPercentage}% OFF
              </span>
            )}

          </div>

          {/* Options: Color & Size */}
          {product.category === 'Fashion' && (
            <div className="flex flex-col gap-6 mb-6">
              {/* Color */}
              <div className="flex flex-col gap-2">
                <span className="text-[13px] font-semibold text-gray-900">Color: <span className="font-bold">{selectedColor}</span></span>
                <div className="flex flex-wrap gap-2">
                  {colorLabels.map((colorName, i) => (
                    <button
                      key={colorName}
                      onClick={() => setSelectedColor(colorName)}
                      className={`relative w-10 h-8 rounded-md border-2 overflow-hidden ${selectedColor === colorName ? "border-primary" : "border-transparent"}`}
                    >
                      <div className="absolute inset-0 m-[2px] rounded-sm border border-gray-200" style={{ backgroundColor: colors[i] }} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div className="flex flex-col gap-2 border-b border-gray-100 pb-6">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-semibold text-gray-900">Size: <span className="font-bold">{selectedSize}</span></span>
                  <button className="flex items-center gap-1.5 text-[11px] font-medium text-blue-600 hover:text-blue-700 transition-colors">
                    View size chart
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizeLabels.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-9 min-w-[3.25rem] px-3 rounded-md text-[13px] font-bold border transition-colors ${selectedSize === size ? "bg-gray-100 border-primary border-2 text-gray-900" : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Action CTAs */}
          <div ref={inPageCTARef} className="flex flex-col gap-3 mt-4 mb-6">
            {product.isLimited && (
              <div className="flex items-center">
                <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#ef4444] bg-[#fee2e2] px-2.5 py-1 rounded-md border border-[#fca5a5] shadow-sm animate-pulse">
                  <Flame className="w-3.5 h-3.5" /> Hurry, only 9 left in stock!
                </span>
              </div>
            )}
            <div className="flex items-center gap-3 h-12">
              <div className="flex items-center border-1 border-black rounded-xl bg-background h-full shrink-0 px-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-full flex items-center justify-center text-muted-foreground"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <motion.span
                  key={quantity}
                  initial={{ opacity: 0, scale: 0.8, filter: "blur(2px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.15 }}
                  className="w-8 text-center text-sm font-semibold inline-block"
                >
                  {quantity}
                </motion.span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-full flex items-center justify-center text-muted-foreground"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <Button
                onClick={handleAddToCart}
                variant="outline"
                className="flex-1 h-full rounded-xl border-2 border-black text-foreground font-bold text-[13px] sm:text-sm bg-background hover:bg-muted"
              >
                <ShoppingBag className="w-4 h-4 mr-1.5" /> Add to cart — ₹{(product.price * quantity).toFixed(2).replace(/\.00$/, '')}
              </Button>
            </div>

            <button
              onClick={handleBuyNow}
              className="relative w-full h-[64px] rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white font-bold border-0 flex flex-col items-center justify-center transition-all active:scale-[0.98] hover:shadow-lg"
            >
              <div className="flex items-center gap-2">

                <span className="text-[16px]">Buy Now</span>
              </div>
              <span className="text-[11px] font-medium text-white/80 mt-0.5">Get it faster</span>
              <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white" />
            </button>

            <button
              onClick={() => window.open("https://wa.me/1234567890", "_blank")}
              className="relative w-full h-[64px] rounded-xl bg-[#e8f5e9] text-[#166534] font-bold border-0 flex flex-col items-center justify-center transition-transform active:scale-[0.98]"
            >
              <div className="flex items-center gap-2">
                <WhatsAppIcon className="w-5 h-5 fill-[#22c55e]" />
                <span className="text-[16px]">Enquire on WhatsApp</span>
              </div>
              <span className="text-[11px] font-medium text-[#166534]/80 mt-0.5">Chat with us for more details</span>
              <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#166534]" />
            </button>
          </div>

          {/* Delivery Details Section */}
          {renderDeliveryDetails()}

          {/* Offers & Discounts */}
          <div className="mb-6 mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-semibold">
                Offers & Discounts
              </h3>
              <Link
                href="#"
                className="text-[9px] sm:text-xs font-bold uppercase tracking-[0.12em] text-black-600 hover:text-black-700 shrink-0 inline-flex items-center gap-1 text-muted-foreground"
              >
                See all
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
              </Link>
            </div>

            {renderOfferTickets()}

            <div className="grid grid-cols-3 border border-gray-100 rounded-sm py-3 divide-x divide-gray-100 mb-6 mt-4">
              <div className="flex items-center justify-center gap-1.5 px-1">
                <div className="w-8 h-8 rounded-full bg-[#f4f4f9] flex items-center justify-center shrink-0">
                  <IconTruckDelivery stroke={1.5} className="w-4 h-4 text-[#1e1b4b]" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] sm:text-[12px] font-bold text-[#1e1b4b] leading-tight">Free Delivery</span>
                  <span className="text-[10px] sm:text-[11px] text-gray-500 leading-tight">On all orders</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-1.5 px-1">
                <div className="w-8 h-8 rounded-full bg-[#f4f4f9] flex items-center justify-center shrink-0">
                  <IconTruckReturn stroke={1.5} className="w-4 h-4 text-[#1e1b4b]" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] sm:text-[12px] font-bold text-[#1e1b4b] leading-tight">No Return</span>
                  <span className="text-[10px] sm:text-[11px] text-gray-500 leading-tight">Check policy</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-1.5 px-1">
                <div className="w-8 h-8 rounded-full bg-[#f4f4f9] flex items-center justify-center shrink-0">
                  <IconShieldCheck stroke={1.5} className="w-4 h-4 text-[#1e1b4b]" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] sm:text-[12px] font-bold text-[#1e1b4b] leading-tight">High Quality</span>
                  <span className="text-[10px] sm:text-[11px] text-gray-500 leading-tight">Premium material</span>
                </div>
              </div>
            </div>


            <div >
              <div className="flex flex-col border-t border-gray-100">
                <button
                  onClick={() => setIsWarrantyOpen(!isWarrantyOpen)}
                  className="flex items-center justify-between py-4 w-full hover:opacity-80 transition-opacity"
                >
                  <div className="flex items-center gap-3">
                    <ShieldAlert className="w-4 h-4 text-foreground" />
                    <span className="text-[12px] font-bold tracking-wider uppercase">WARRANTY</span>
                  </div>
                  {isWarrantyOpen ? (
                    <Minus className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Plus className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
                {isWarrantyOpen && (
                  <div className="pb-4 text-sm text-black/70 leading-relaxed">
                    All products come with a standard 1-year warranty covering manufacturing defects. Extended warranty options are available at checkout.
                  </div>
                )}
              </div>
              <div className="flex flex-col  border-t border-gray-100 border-b">
                <button
                  onClick={() => setIsDeliveryOpen(!isDeliveryOpen)}
                  className="flex items-center justify-between py-4 w-full hover:opacity-80 transition-opacity"
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-4 h-4 text-foreground" />
                    <span className="text-[12px] font-bold tracking-wider uppercase">DELIVERY</span>
                  </div>
                  {isDeliveryOpen ? (
                    <Minus className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Plus className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
                {isDeliveryOpen && (
                  <div className="pb-4 text-sm text-black/70 leading-relaxed">
                    Free standard delivery on orders over ₹50. Next day delivery available for orders placed before 2 PM. Tracking information will be provided once dispatched.
                  </div>
                )}
              </div>
            </div>
          </div>



          {/* Tabs: Description / Reviews */}
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4 border-b border-border">
              <button
                onClick={() => setActiveTab("description")}
                className={`text-[11px] font-bold tracking-wider uppercase pb-2 ${activeTab === "description"
                  ? "border-b-2 border-[#1e1b4b] text-[#1e1b4b]"
                  : "text-muted-foreground"
                  }`}
              >
                DESCRIPTION
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`text-[11px] font-bold tracking-wider uppercase pb-2 ${activeTab === "reviews"
                  ? "border-b-2 border-[#1e1b4b] text-[#1e1b4b]"
                  : "text-muted-foreground"
                  }`}
              >
                REVIEWS ({product.reviews || 0})
              </button>
            </div>

            {activeTab === "description" && (
              <p className="text-sm text-foreground leading-relaxed">
                {product.description ||
                  "Coorg blend. 75% chicory-free. Strong, South Indian style. Add up to 3 extra input fields for customers (e.g. gift note, review text). Maximum 3 custom fields allowed."}
              </p>
            )}

            {activeTab === "reviews" && renderReviewsTab()}
          </div>

          {/* Related — horizontal */}
          {relatedProducts.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-foreground">Related items</h3>
                <Link href="/shop" className="text-sm text-muted-foreground underline">
                  View all
                </Link>
              </div>
              <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1 -mx-5 px-5">
                {relatedProducts.map((p) => (
                  <div key={p.id} className="w-[140px] shrink-0">
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sticky bottom CTAs — floating card */}
        <AnimatePresence>
          {showStickyCTAs && (
            <motion.div
              initial={{ y: "120%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "120%", opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] lg:hidden left-4 right-4 z-50 bg-white rounded-[16px] shadow-[0_4px_24px_rgba(0,0,0,0.12)] px-4 py-3 flex items-center justify-between border border-gray-100"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-[22px] font-extrabold text-gray-900 leading-none">
                    ₹{(product.price * quantity).toFixed(0)}
                  </span>
                  {discountPercentage > 0 && (
                    <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-1.5 py-0.5 rounded">
                      {discountPercentage}% OFF
                    </span>
                  )}
                </div>
                {originalPrice && (
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[13px] text-gray-400 line-through font-medium leading-none">
                      ₹{(originalPrice * quantity).toFixed(0)}
                    </span>
                    <span className="text-[12px] text-[#00a859] font-bold leading-none">
                      You save ₹{((originalPrice - product.price) * quantity).toFixed(0)}
                    </span>
                  </div>
                )}
              </div>
              <Button
                onClick={handleAddToCart}
                className="h-11 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-[14px] px-6 shadow-sm border-0"
              >
                Add to Cart
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── DESKTOP LAYOUT ── */}
      <div className="hidden lg:block container mx-auto px-6 py-8 max-w-7xl">
        <div className="flex flex-row gap-12 mb-10">
          <div className="w-[60%] flex gap-4 h-[560px] min-w-0">
            <div className="w-20 flex flex-col gap-3 h-full overflow-y-auto pr-1 shrink-0">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImageIndex(i)}
                  className={`relative w-full aspect-square rounded-lg overflow-hidden bg-[#f4f4f9] shrink-0 ${imageIndex === i ? "border-2 border-primary opacity-100" : "opacity-60"
                    }`}
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
            <div className="relative flex-1 min-w-0 bg-[#f4f4f9] rounded-xl overflow-hidden" ref={emblaRefDesktop}>
              <div className="flex h-full w-full cursor-grab active:cursor-grabbing">
                {gallery.map((img, idx) => (
                  <div key={idx} className="relative flex-[0_0_100%] min-w-0 h-full">
                    <Image
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      fill
                      className="object-cover pointer-events-none"
                      priority={idx === 0}
                      sizes="50vw"
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-[40%] flex flex-col min-w-0 pt-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">{product.name}</h1>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-medium text-muted-foreground underline">
                {product.rating || "0"} ({product.reviews || 0} reviews)
              </span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating || 0)
                      ? "fill-[#facc15] text-[#facc15]"
                      : "fill-gray-200 text-gray-200"
                      }`}
                  />
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {product.description || "Healthy and nutritious oats to kickstart your day with energy."}
              </p>
              <div className="flex items-center gap-1.5 shrink-0 px-2 py-0.5 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-bold text-primary">In Stock</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span className="text-2xl font-bold text-foreground">₹{product.price.toFixed(2).replace(/\.00$/, '')}</span>
              {originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ₹{originalPrice.toFixed(2).replace(/\.00$/, '')}
                </span>
              )}
              {/* Green Discount Tag */}
              {discountPercentage > 0 && (
                <span
                  className="bg-[#00a859] text-white text-[12px] font-bold pl-3.5 pr-4.5 py-1 whitespace-nowrap"
                  style={{ clipPath: "polygon(0 0, calc(100% - 6px) 0, 100% 100%, 0 100%)" }}
                >
                  {discountPercentage}% OFF
                </span>
              )}
            </div>

            {/* Options: Color & Size */}
            {product.category === 'Fashion' && (
              <div className="flex flex-col gap-6 mb-8">
                {/* Color */}
                <div className="flex flex-col gap-2">
                  <span className="text-[14px] font-semibold text-gray-900">Color: <span className="font-bold">{selectedColor}</span></span>
                  <div className="flex flex-wrap gap-2">
                    {colorLabels.map((colorName, i) => (
                      <button
                        key={colorName}
                        onClick={() => setSelectedColor(colorName)}
                        className={`relative w-11 h-8 rounded-md border-2 overflow-hidden ${selectedColor === colorName ? "border-gray-900" : "border-transparent"}`}
                      >
                        <div className="absolute inset-0 m-[2px] rounded-sm border border-gray-200" style={{ backgroundColor: colors[i] }} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size */}
                <div className="flex flex-col gap-2 border-b border-gray-100 pb-8">
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-semibold text-gray-900">Size: <span className="font-bold">{selectedSize}</span></span>
                    <button className="text-[12px] font-medium text-gray-500 underline hover:text-gray-900">View Size Chart</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {sizeLabels.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`h-10 min-w-[3.5rem] px-3 rounded-md text-[14px] font-bold border transition-colors ${selectedSize === size ? "bg-gray-100 border-gray-900 text-gray-900" : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-4 mb-10">
              {product.isLimited && (
                <div className="flex items-center">
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#ef4444] bg-[#fee2e2] px-3 py-1.5 rounded-md border border-[#fca5a5] shadow-sm animate-pulse">
                    <Flame className="w-4 h-4" /> Hurry, only 9 left in stock!
                  </span>
                </div>
              )}
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-sm  border-1 border-black bg-background h-12 min-w-[120px]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-full flex items-center justify-center text-muted-foreground hover:bg-muted"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <motion.span
                    key={quantity}
                    initial={{ opacity: 0, scale: 0.8, filter: "blur(2px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.15 }}
                    className="flex-1 text-center font-bold text-base inline-block"
                  >
                    {quantity}
                  </motion.span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-full flex items-center justify-center text-muted-foreground hover:bg-muted"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  className="flex-1 h-12 font-medium text-[15px] border-2 border-black text-foreground hover:bg-muted"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" /> Add to cart — ₹{product.price.toFixed(2).replace(/\.00$/, '')}
                </Button>

                <Button
                  onClick={() => toggleItem(product)}
                  variant="outline"
                  className="w-12 h-12 p-0 border-border flex items-center justify-center shrink-0 hover:bg-muted"
                >
                  <Heart className={`w-5 h-5 ${inWatchlist ? "fill-red-500 text-red-500" : "text-foreground"}`} />
                </Button>
              </div>

              <button
                onClick={handleBuyNow}
                className="relative w-full h-[64px] rounded-2xl bg-gradient-to-r from-[#2563eb] to-[#4f46e5] text-white font-bold border-0 flex flex-col items-center justify-center transition-all active:scale-[0.98] hover:shadow-lg"
              >
                <div className="flex items-center gap-2">

                  <span className="text-[17px]">Buy Now</span>
                </div>
                <span className="text-[12px] font-medium text-white/80 mt-0.5">Get it faster</span>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white" />
              </button>

              <button
                onClick={() => window.open("https://wa.me/1234567890", "_blank")}
                className="relative w-full h-[64px] rounded-2xl bg-[#e8f5e9] text-[#166534] font-bold border-0 flex flex-col items-center justify-center transition-transform active:scale-[0.98]"
              >
                <div className="flex items-center gap-2">
                  <WhatsAppIcon className="w-5 h-5 fill-[#22c55e]" />
                  <span className="text-[17px]">Enquire on WhatsApp</span>
                </div>
                <span className="text-[12px] font-medium text-[#166534]/80 mt-0.5">Chat with us for more details</span>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#166534]" />
              </button>
            </div>

            {/* Delivery Details Section (Desktop) */}
            {renderDeliveryDetails()}

            {/* Offers & Discounts Desktop */}
            <div className="mb-6 mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-semibold">
                  Offers & Discounts
                </h3>
                <Link
                  href="#"
                  className="text-[10px] sm:text-md font-bold uppercase tracking-[0.12em] text-black-600 hover:text-black-700 shrink-0 inline-flex items-center gap-1 text-muted-foreground"
                >
                  See all
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                </Link>
              </div>






              {renderOfferTickets()}

              <div className="grid grid-cols-3 border border-gray-100 rounded-sm py-3 divide-x divide-gray-100 mb-6 mt-4 ">
                <div className="flex items-center justify-center gap-2 px-1">
                  <div className="w-8 h-8 rounded-full bg-[#f4f4f9] flex items-center justify-center shrink-0">
                    <IconTruckDelivery stroke={1.5} className="w-4 h-4 text-[#1e1b4b]" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] sm:text-[11px] font-bold text-[#1e1b4b] leading-tight">Free Delivery</span>
                    <span className="text-[9px] sm:text-[10px] text-gray-500 leading-tight">On all orders</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 px-1">
                  <div className="w-8 h-8 rounded-full bg-[#f4f4f9] flex items-center justify-center shrink-0">
                    <IconTruckReturn stroke={1.5} className="w-4 h-4 text-[#1e1b4b]" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] sm:text-[11px] font-bold text-[#1e1b4b] leading-tight">No Return</span>
                    <span className="text-[9px] sm:text-[10px] text-gray-500 leading-tight">Check policy</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 px-1">
                  <div className="w-8 h-8 rounded-full bg-[#f4f4f9] flex items-center justify-center shrink-0">
                    <IconShieldCheck stroke={1.5} className="w-4 h-4 text-[#1e1b4b]" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] sm:text-[11px] font-bold text-[#1e1b4b] leading-tight">High Quality</span>
                    <span className="text-[9px] sm:text-[10px] text-gray-500 leading-tight">Premium material</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-b border-border">
                <div className="flex flex-col border-b border-border">
                  <button
                    onClick={() => setIsWarrantyOpen(!isWarrantyOpen)}
                    className="flex items-center justify-between py-4 w-full hover:opacity-80 transition-opacity"
                  >
                    <div className="flex items-center gap-3">
                      <ShieldAlert className="w-4 h-4 text-foreground" />
                      <span className="text-[12px] font-bold tracking-wider uppercase">WARRANTY</span>
                    </div>
                    {isWarrantyOpen ? (
                      <Minus className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Plus className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                  {isWarrantyOpen && (
                    <div className="pb-4 text-sm text-black leading-relaxed">
                      All products come with a standard 1-year warranty covering manufacturing defects. Extended warranty options are available at checkout.
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <button
                    onClick={() => setIsDeliveryOpen(!isDeliveryOpen)}
                    className="flex items-center justify-between py-4 w-full hover:opacity-80 transition-opacity"
                  >
                    <div className="flex items-center gap-3">
                      <Truck className="w-4 h-4 text-foreground" />
                      <span className="text-[12px] font-bold tracking-wider uppercase">DELIVERY</span>
                    </div>
                    {isDeliveryOpen ? (
                      <Minus className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Plus className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                  {isDeliveryOpen && (
                    <div className="pb-4 text-sm text-black/70 leading-relaxed">
                      Free standard delivery on orders over ₹50. Next day delivery available for orders placed before 2 PM. Tracking information will be provided once dispatched.
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Tabs: Description / Reviews (Full Width on Desktop) */}
        <div className="mb-10 w-[70%]">
          <div className="flex items-center gap-4 mb-4 border-b border-border">
            <button
              onClick={() => setActiveTab("description")}
              className={`text-[12px] font-bold tracking-wider uppercase pb-2 ${activeTab === "description"
                ? "border-b-2 border-[#1e1b4b] text-[#1e1b4b]"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              DESCRIPTION
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`text-[12px] font-bold tracking-wider uppercase pb-2 ${activeTab === "reviews"
                ? "border-b-2 border-[#1e1b4b] text-[#1e1b4b]"
                : "text-muted-foreground hover:text-foreground"
                }`}
            >
              REVIEWS ({reviews.length})
            </button>
          </div>

          {activeTab === "description" && (
            <div className="pt-2">
              <p className="text-sm text-foreground mb-4 font-medium">
                {product.description ||
                  "Coorg blend. 75% chicory-free. Strong, South Indian style."}
              </p>
              <p className="text-sm text-foreground">
                Add up to 3 extra input fields for customers (e.g. gift note, review text). Maximum 3 custom fields allowed.
              </p>
            </div>
          )}

          {activeTab === "reviews" && renderReviewsTab()}
        </div>

        <section className="py-8 border-t border-border">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Related items</h2>
            <Link href="/shop" className="text-sm font-medium underline">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>

      {/* ── MANUFACTURER BANNERS ── */}
      <div className=" py-10 lg:py-12 border-t  border-gray-200">
        <div className="container mx-auto px-1 lg:px-6 max-w-7xl">

          <div className="flex flex-col gap-3">
            {/* Banner 1 */}
            <div className="w-full aspect-[16/9] lg:aspect-[21/9] relative bg-[#f4f4f5]  overflow-hidden shadow-sm cursor-pointer group">
              <Image
                src="/images/product_placeholder.png"
                alt="Manufacturer Banner 1"
                fill
                className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-transparent transition-colors">
                <span className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-bold text-gray-600 tracking-widest uppercase">Banner 1</span>
              </div>
            </div>
            {/* Banner 2 */}
            <div className="w-full aspect-[16/9] lg:aspect-[21/9] relative bg-[#f4f4f5]  overflow-hidden shadow-sm cursor-pointer group">
              <Image
                src="/images/product_placeholder.png"
                alt="Manufacturer Banner 2"
                fill
                className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-transparent transition-colors">
                <span className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-bold text-gray-600 tracking-widest uppercase">Banner 2</span>
              </div>
            </div>
            {/* Banner 3 */}
            <div className="w-full aspect-[16/9] lg:aspect-[21/9] relative bg-[#f4f4f5]  overflow-hidden shadow-sm cursor-pointer group">
              <Image
                src="/images/product_placeholder.png"
                alt="Manufacturer Banner 3"
                fill
                className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-transparent transition-colors">
                <span className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-bold text-gray-600 tracking-widest uppercase">Banner 3</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Image Lightbox */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
          >
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-6 right-6 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <Plus className="w-6 h-6 rotate-45" />
            </button>

            <div className="relative w-full max-w-4xl aspect-square sm:aspect-video mx-4">
              <Image
                src={gallery[imageIndex]}
                alt={product.name}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {/* Gallery Navigation in Lightbox */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 overflow-x-auto hide-scrollbar px-4">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImageIndex(i)}
                  className={`relative w-16 h-16 rounded-xl overflow-hidden shrink-0 ${imageIndex === i ? "border-2 border-white opacity-100" : "opacity-50 hover:opacity-80"} transition-opacity`}
                >
                  <Image src={img} alt="" fill className="object-cover bg-white" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Review Image Lightbox */}
      <AnimatePresence>
        {fullscreenReviewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
            onClick={() => setFullscreenReviewImage(null)}
          >
            <button
              onClick={() => setFullscreenReviewImage(null)}
              className="absolute top-6 right-6 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <Plus className="w-6 h-6 rotate-45" />
            </button>

            <div className="relative w-full max-w-4xl aspect-square sm:aspect-video mx-4" onClick={(e) => e.stopPropagation()}>
              <Image
                src={fullscreenReviewImage}
                alt="Review image"
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
