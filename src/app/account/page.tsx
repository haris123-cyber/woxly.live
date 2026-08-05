"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard, Package, User, MapPin, Star, MessageSquare, LogOut,
  CreditCard, ShoppingBag, TrendingUp, Gift
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
  { label: "Order History", icon: Package, id: "orders" },
  { label: "Account Details", icon: User, id: "details" },
  { label: "Address", icon: MapPin, id: "address" },
  { label: "To Review", icon: MessageSquare, id: "reviews" },
];

const mockOrders = [
  { id: "WOXLY-10244", date: "12 Jul 2023", status: "Delivered", total: "$149.99", items: 3 },
  { id: "WOXLY-10198", date: "03 Jun 2023", status: "Processing", total: "$89.00", items: 1 },
  { id: "WOXLY-10101", date: "15 Apr 2023", status: "Delivered", total: "$220.50", items: 5 },
];

const mockReviews = [
  {
    id: 1,
    product: "Apple Watch Series 8 GPS 45mm Silver Aluminum Case Sport Band.",
    image: "/images/product_placeholder.png",
    purchasedOn: "12 Jul 2023",
    rating: 4,
    reviewText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore adipiscing elit, sed do eiusmod",
    photos: ["/images/product_placeholder.png", "/images/product_placeholder.png", "/images/product_placeholder.png"],
  },
  {
    id: 2,
    product: "Apple Watch Series 8 GPS 45mm Silver Aluminum Case Sport Band.",
    image: "/images/product_placeholder.png",
    purchasedOn: "12 Jul 2023",
    rating: 4,
    reviewText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore adipiscing elit, sed do eiusmod",
    photos: ["/images/product_placeholder.png", "/images/product_placeholder.png", "/images/product_placeholder.png"],
  },
  {
    id: 3,
    product: "Apple Watch Series 8 GPS 45mm Silver Aluminum Case Sport Band.",
    image: "/images/product_placeholder.png",
    purchasedOn: "12 Jul 2023",
    rating: 4,
    reviewText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore adipiscing elit, sed do eiusmod",
    photos: ["/images/product_placeholder.png", "/images/product_placeholder.png", "/images/product_placeholder.png"],
  },
];

const PRIMARY = "#2563eb";
const PRIMARY_LIGHT = "#e0f2fe";
const card: React.CSSProperties = {
  background: "#fff",
  borderRadius: "16px",
  border: "1px solid #e5e7eb",
  boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
  overflow: "hidden",
};

function StarRating({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} style={{ width: "16px", height: "16px", fill: s <= count ? "#f59e0b" : "#e5e7eb", color: s <= count ? "#f59e0b" : "#e5e7eb" }} />
      ))}
    </div>
  );
}

// ─── Panel components ────────────────────────────────────
function DashboardPanel() {
  return (
    <div>
      <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#111827", marginBottom: "1.25rem" }}>My Dashboard</h2>
      <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-8">
        {[
          { icon: ShoppingBag, label: "Total Orders", value: "12" },
          { icon: CreditCard, label: "Saved Address", value: "2" },

        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="  p-3 sm:p-5 flex flex-col gap-2 shadow-sm items-center sm:items-start text-center sm:text-left">
              <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-blue-50 flex items-center justify-center">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <p className="text-lg sm:text-2xl font-extrabold text-gray-900 mt-1 sm:mt-0">{stat.value}</p>
              <p className="text-[10px] sm:text-xs text-gray-500 leading-tight">{stat.label}</p>
            </div>
          );
        })}
      </div>
      <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#111", marginBottom: "1rem" }}>Recent Orders</h3>
      <div className="border overflow-hidden w-full">
        {mockOrders.map((order, idx) => (
          <div key={order.id} className={`grid grid-cols-[1.5fr_1fr_1.2fr_1fr_auto] sm:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-1 sm:gap-4 items-center p-2 sm:p-4 ${idx < mockOrders.length - 1 ? "border-b border-gray-100" : ""}`}>
            <span className="font-bold text-[10px] sm:text-[0.85rem] text-gray-900 truncate pr-1">{order.id}</span>
            <span className="text-[9px] sm:text-[0.8rem] text-gray-500 truncate">{order.date}</span>
            <span className={`text-[9px] sm:text-[0.75rem] font-semibold px-1 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-center truncate ${order.status === "Delivered" ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-700"}`}>
              {order.status}
            </span>
            <span className="font-bold text-[10px] sm:text-[0.85rem] text-right sm:text-left pr-1">{order.total}</span>
            <button className="px-2 py-1 sm:px-3 sm:py-1 border border-primary text-primary font-semibold text-[9px] sm:text-[0.75rem] rounded-md hover:bg-primary/5 whitespace-nowrap">
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrdersPanel() {
  return (
    <div>
      <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#111827", marginBottom: "1.25rem" }}>Order History</h2>
      <div className="border border-gray-200 rounded-xl overflow-hidden w-full">
        <div className="grid grid-cols-[1.5fr_1fr_1.2fr_1fr_auto] sm:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-1 sm:gap-4 p-2 sm:px-5 sm:py-3 bg-gray-50 border-b border-gray-200 w-full">
          {["Order ID", "Date", "Status", "Total", ""].map((h) => (
            <span key={h} className="text-[8px] sm:text-[0.7rem] font-bold text-gray-400 uppercase tracking-wider truncate">{h}</span>
          ))}
        </div>
        {mockOrders.map((order, idx) => (
          <div key={order.id} className={`grid grid-cols-[1.5fr_1fr_1.2fr_1fr_auto] sm:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-1 sm:gap-4 items-center p-2 sm:px-5 sm:py-4 ${idx < mockOrders.length - 1 ? "border-b border-gray-100" : ""}`}>
            <span className="font-bold text-[10px] sm:text-[0.85rem] text-gray-900 truncate pr-1">{order.id}</span>
            <span className="text-[9px] sm:text-[0.8rem] text-gray-500 truncate">{order.date}</span>
            <span className={`text-[9px] sm:text-[0.75rem] font-semibold px-1 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-center truncate ${order.status === "Delivered" ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-700"}`}>
              {order.status}
            </span>
            <span className="font-bold text-[10px] sm:text-[0.85rem] text-right sm:text-left pr-1">{order.total}</span>
            <button className="px-2 py-1 sm:px-3 sm:py-1 border border-primary text-primary font-semibold text-[9px] sm:text-[0.75rem] rounded-md hover:bg-primary/5 whitespace-nowrap">
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function DetailsPanel() {
  return (
    <div>
      <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#111827", marginBottom: "1.5rem" }}>Account Details</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { label: "First Name", value: "Jenny" },
          { label: "Last Name", value: "Wilson" },
          { label: "Email Address", value: "jenny.wilson@email.com" },
          { label: "Phone Number", value: "+1 234 567 8900" },
        ].map((field) => (
          <div key={field.label}>
            <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#6b7280", display: "block", marginBottom: "6px" }}>{field.label}</label>
            <input
              defaultValue={field.value}
              style={{ width: "100%", padding: "0.65rem 0.9rem", border: "1px solid #e5e7eb", borderRadius: "10px", fontSize: "0.875rem", outline: "none", boxSizing: "border-box" }}
            />
          </div>
        ))}
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#6b7280", display: "block", marginBottom: "6px" }}>New Password (leave blank to keep current)</label>
          <input
            type="password"
            placeholder="••••••••"
            style={{ width: "100%", padding: "0.65rem 0.9rem", border: "1px solid #e5e7eb", borderRadius: "10px", fontSize: "0.875rem", outline: "none", boxSizing: "border-box" }}
          />
        </div>
      </div>
      <button style={{ marginTop: "1.5rem", background: PRIMARY, color: "#fff", border: "none", borderRadius: "10px", padding: "0.65rem 1.75rem", fontWeight: 700, fontSize: "0.875rem", cursor: "pointer" }}>
        Save Changes
      </button>
    </div>
  );
}

function AddressPanel() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#111827" }}>My Addresses</h2>
        <button style={{ background: PRIMARY, color: "#fff", border: "none", borderRadius: "10px", padding: "0.5rem 1.25rem", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer" }}>+ Add Address</button>
      </div>
      <div style={{ border: "1px solid #e5e7eb", borderRadius: "12px", padding: "1.25rem", marginBottom: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
          <span style={{ fontWeight: 700, fontSize: "0.875rem" }}>Home</span>
          <div style={{ display: "flex", gap: "8px" }}>
            <button style={{ fontSize: "0.75rem", color: PRIMARY, background: "transparent", border: "none", cursor: "pointer", fontWeight: 600 }}>Edit</button>
            <button style={{ fontSize: "0.75rem", color: "#ef4444", background: "transparent", border: "none", cursor: "pointer", fontWeight: 600 }}>Delete</button>
          </div>
        </div>
        <p style={{ fontSize: "0.82rem", color: "#6b7280", lineHeight: 1.6 }}>123 Main Street, Apt 4B<br />New York, NY 10001<br />United States</p>
      </div>
      <div style={{ border: "1px solid #e5e7eb", borderRadius: "12px", padding: "1.25rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
          <span style={{ fontWeight: 700, fontSize: "0.875rem" }}>Office</span>
          <div style={{ display: "flex", gap: "8px" }}>
            <button style={{ fontSize: "0.75rem", color: PRIMARY, background: "transparent", border: "none", cursor: "pointer", fontWeight: 600 }}>Edit</button>
            <button style={{ fontSize: "0.75rem", color: "#ef4444", background: "transparent", border: "none", cursor: "pointer", fontWeight: 600 }}>Delete</button>
          </div>
        </div>
        <p style={{ fontSize: "0.82rem", color: "#6b7280", lineHeight: 1.6 }}>450 Park Avenue, Floor 12<br />New York, NY 10022<br />United States</p>
      </div>
    </div>
  );
}



function ReviewsPanel() {
  const [activeTab, setActiveTab] = useState<"to-review" | "history">("history");
  return (
    <div>
      {/* Tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "1.25rem" }}>
        {(["to-review", "history"] as const).map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{ padding: "0.4rem 1.1rem", border: isActive ? "none" : "1px solid #e5e7eb", borderRadius: "8px", background: isActive ? PRIMARY : "#fff", color: isActive ? "#fff" : "#6b7280", fontWeight: 600, fontSize: "0.83rem", cursor: "pointer", transition: "all 0.15s ease" }}
            >
              {tab === "to-review" ? "To Review" : "Review History"}
            </button>
          );
        })}
      </div>

      {/* Review list */}
      <div style={{ border: "1px solid #e5e7eb", borderRadius: "12px", overflow: "hidden" }}>
        {mockReviews.map((review, idx) => (
          <div key={review.id} style={{ padding: "1.25rem", borderBottom: idx < mockReviews.length - 1 ? "1px solid #f3f4f6" : "none" }}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
              <div className="flex items-center gap-3 flex-1">
                <div style={{ position: "relative", width: "44px", height: "44px", borderRadius: "8px", overflow: "hidden", background: "#f5f5f5", flexShrink: 0, border: "1px solid #e5e7eb" }}>
                  <Image src={review.image} alt={review.product} fill style={{ objectFit: "contain", padding: "4px" }} />
                </div>
                <p style={{ fontWeight: 600, fontSize: "0.875rem", color: "#111827", lineHeight: 1.4 }}>{review.product}</p>
              </div>
              <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto shrink-0 border-t sm:border-0 pt-3 sm:pt-0 border-gray-100">
                <div className="text-left sm:text-right">
                  <p style={{ fontSize: "0.65rem", color: "#9ca3af", marginBottom: "1px" }}>Purchased on</p>
                  <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "#374151", marginBottom: "0px" }} className="sm:mb-2">{review.purchasedOn}</p>
                </div>
                <button style={{ background: PRIMARY, color: "#fff", border: "none", borderRadius: "8px", padding: "5px 14px", fontWeight: 600, fontSize: "0.75rem", cursor: "pointer" }}>
                  Edit Review
                </button>
              </div>
            </div>
            <div style={{ marginBottom: "0.6rem" }}><StarRating count={review.rating} /></div>
            <p style={{ fontSize: "0.8rem", color: "#6b7280", lineHeight: 1.65, marginBottom: "0.85rem" }}>{review.reviewText}</p>
            <div style={{ display: "flex", gap: "8px" }}>
              {review.photos.map((photo, i) => (
                <div key={i} style={{ position: "relative", width: "72px", height: "60px", borderRadius: "8px", overflow: "hidden", background: "#1a1a2e" }}>
                  <Image src={photo} alt="Review photo" fill style={{ objectFit: "cover", opacity: 0.85 }} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────
export default function AccountPage() {
  const [activeNav, setActiveNav] = useState("reviews");

  const panelMap: Record<string, React.ReactNode> = {
    dashboard: <DashboardPanel />,
    orders: <OrdersPanel />,
    details: <DetailsPanel />,
    address: <AddressPanel />,

    reviews: <ReviewsPanel />,
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", paddingBottom: "3rem" }}>
      <div className="max-w-[1100px] mx-auto pt-8 px-5 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 items-start">

        {/* ── Sidebar ── */}
        <div style={{ ...card }}>
          {/* Avatar */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "1.75rem 1rem 1.25rem", borderBottom: "1px solid #f3f4f6" }}>
            <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "#e5e7eb", overflow: "hidden", marginBottom: "0.75rem", position: "relative", border: "3px solid #fff", boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}>
              <Image src="/images/product_placeholder.png" alt="Avatar" fill style={{ objectFit: "cover" }} />
            </div>
            <p style={{ fontSize: "0.7rem", color: "#9ca3af", marginBottom: "2px" }}>Hello,</p>
            <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "#111827" }}>Jenny Wilson</p>
          </div>

          {/* Nav */}
          <nav style={{ padding: "0.5rem 0 0.75rem" }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px", padding: "0.65rem 1.25rem", border: "none", borderLeft: isActive ? `3px solid ${PRIMARY}` : "3px solid transparent", background: isActive ? PRIMARY_LIGHT : "transparent", color: isActive ? PRIMARY : "#6b7280", fontWeight: isActive ? 700 : 400, fontSize: "0.875rem", cursor: "pointer", textAlign: "left", transition: "all 0.15s ease" }}
                >
                  <Icon style={{ width: "16px", height: "16px", flexShrink: 0 }} />
                  {item.label}
                </button>
              );
            })}
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "0.65rem 1.25rem", borderLeft: "3px solid transparent", color: "#ef4444", fontWeight: 400, fontSize: "0.875rem", textDecoration: "none" }}>
              <LogOut style={{ width: "16px", height: "16px" }} />
              Logout
            </Link>
          </nav>
        </div>

        {/* ── Main Content panel ── */}
        <div style={{ ...card, padding: "1.5rem" }}>
          {panelMap[activeNav]}
        </div>
      </div>
    </div>
  );
}
