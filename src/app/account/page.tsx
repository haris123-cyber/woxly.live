"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard, Package, User, MapPin, Star, MessageSquare, LogOut,
  CreditCard, ShoppingBag, TrendingUp, Gift, RefreshCcw, ChevronDown, ChevronUp,
  Camera, Crown, ChevronRight, ArrowLeft, ShieldCheck
} from "lucide-react";
import { useAddressStore, Address } from "@/store/useAddressStore";

const navItems = [
  { label: "Order History", icon: Package, id: "orders", desc: "View and track all your orders", iconColor: "text-primary", iconBg: "bg-primary/10" },
  { label: "Returns", icon: RefreshCcw, id: "returns", desc: "View your return requests and status", iconColor: "text-green-600", iconBg: "bg-green-50" },
  { label: "Account Details", icon: User, id: "details", desc: "Manage your personal information", iconColor: "text-purple-600", iconBg: "bg-purple-50" },
  { label: "Addresses", icon: MapPin, id: "address", desc: "Manage your saved addresses", iconColor: "text-orange-500", iconBg: "bg-orange-50" },
  { label: "Reward Coins", icon: Gift, id: "rewards", desc: "View your rewards and offers", iconColor: "text-yellow-600", iconBg: "bg-yellow-50" },
];

const mockOrders = [
  { id: "WOXLY-10244", date: "12 Jul 2023", status: "Delivered", total: "₹149.99", items: 3 },
  { id: "WOXLY-10198", date: "03 Jun 2023", status: "Processing", total: "₹89.00", items: 1 },
  { id: "WOXLY-10101", date: "15 Apr 2023", status: "Delivered", total: "₹220.50", items: 5 },
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



type OrderItem = {
  id: string;
  title: string;
  color: string;
  size: string;
  price: string;
  image: string;
  status: string;
  statusColor: string;
  statusDesc: string;
  refundBox?: boolean;
  refundTitle?: string;
  refundId?: string;
  refundDesc?: string;
  reviewAction?: boolean;
  cancelAction?: boolean;
  returnAction?: boolean;
};

const initialOrders: OrderItem[] = [
  {
    id: "WOXLY-10250",
    title: "Fresh Bananas 1kg",
    color: "",
    size: "1kg",
    price: "₹99",
    image: "/images/product_placeholder.png",
    status: "Processing",
    statusColor: "yellow",
    statusDesc: "Your order is being processed and packed.",
    cancelAction: true,
  },
  {
    id: "WOXLY-10249",
    title: "India Gate Rice 1kg",
    color: "",
    size: "1kg",
    price: "₹249",
    image: "/images/product_placeholder.png",
    status: "Delivered on Jul 17, 2025",
    statusColor: "green",
    statusDesc: "Your item has been delivered",
    reviewAction: true,
    returnAction: true,
  },
  {
    id: "WOXLY-10248",
    title: "Quaker Oats 1kg",
    color: "",
    size: "1kg",
    price: "₹229",
    image: "/images/product_placeholder.png",
    status: "Refund completed",
    statusColor: "red",
    statusDesc: "",
    refundBox: true,
    refundTitle: "Refund Completed",
    refundId: "(Refund ID: CR25103010590619819232002)",
    refundDesc: "Refund was added to your UPI linked bank account on Oct 31 2025, 10:59 AM. If you can't see the refund in your bank statement, contact your bank and share refund reference number 852409773035 to track it.",
  },
  {
    id: "WOXLY-10251",
    title: "Extra Virgin Olive Oil 500ml",
    color: "",
    size: "500ml",
    price: "₹509",
    image: "/images/product_placeholder.png",
    status: "Cancelled on Mar 19, 2025",
    statusColor: "red",
    statusDesc: "Your order was cancelled as per your request.",
  }
];

function OrderCard({ order, showCancelBtn = false, showRefundBox = true, onCancel, onReturn }: {
  order: OrderItem;
  showCancelBtn?: boolean;
  showRefundBox?: boolean;
  onCancel?: (id: string) => void;
  onReturn?: (id: string) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-gray-200  p-4 bg-white">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left: Product Info */}
        <div className="flex gap-4 md:w-5/12">
          <div className="w-16 h-16 shrink-0 relative overflow-hidden">
            <Image src={order.image} alt={order.title} fill className="object-contain" />
          </div>
          <div>
            <h3 className="text-[13px] text-gray-800 line-clamp-1 mb-1.5">{order.title}</h3>
            <p className="text-[11px] text-gray-500">
              {order.color && <span>Color: {order.color}</span>}
              {order.size && <span className="ml-2">Size: {order.size}</span>}
            </p>
          </div>
        </div>

        {/* Middle: Price */}
        <div className="md:w-2/12 flex items-start mt-2 md:mt-0">
          <span className="text-[13px] text-gray-900">{order.price}</span>
        </div>

        {/* Right: Status and Actions */}
        <div className="md:w-5/12 flex flex-col sm:flex-row items-start justify-between mt-2 md:mt-0 gap-4">
          <div className="flex flex-col w-full">
            <div
              className="flex items-center justify-between cursor-pointer md:cursor-default w-full"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`w-2 h-2 rounded-full shrink-0 ${order.statusColor === 'red' ? 'bg-[#ff6161]' :
                  order.statusColor === 'yellow' ? 'bg-[#f59e0b]' :
                    'bg-[#26a541]'
                  }`}></span>
                <span className="text-[13px] font-bold text-gray-900">{order.status}</span>
              </div>
              <button className="text-gray-400 md:hidden p-1 -mr-1">
                {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
            </div>

            <div className={`mt-2 ${isExpanded ? 'block' : 'hidden md:block'}`}>
              {order.statusDesc && (
                <p className="text-[12px] text-gray-800 mb-2">{order.statusDesc}</p>
              )}
              {order.reviewAction && (
                <div className="mt-1">
                  <button className="flex items-center gap-1.5 text-[#2874f0] font-semibold text-[13px] hover:underline w-fit">
                    <Star className="w-4 h-4 fill-[#2874f0]" /> Rate & Review Product
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className={`flex flex-row sm:flex-col items-start sm:items-end shrink-0 gap-2 w-full sm:w-auto ${isExpanded ? 'flex' : 'hidden md:flex'}`}>
            {showCancelBtn && order.cancelAction && (
              <button
                onClick={() => onCancel?.(order.id)}
                className="px-4 py-1.5 border border-red-500 text-red-600 rounded text-[12px] font-semibold hover:bg-red-50 transition-colors shadow-sm w-full sm:w-auto"
              >
                Cancel Order
              </button>
            )}
            {order.returnAction && (
              <button
                onClick={() => onReturn?.(order.id)}
                className="px-4 py-1.5 border border-[#2874f0] text-[#2874f0] rounded text-[12px] font-semibold hover:bg-blue-50 transition-colors shadow-sm w-full sm:w-auto"
              >
                Return Item
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Refund Box */}
      {showRefundBox && order.refundBox && (
        <div className={`mt-5 border border-gray-100 rounded-sm p-4 bg-[#fafafa] ${isExpanded ? 'block' : 'hidden md:block'}`}>
          <p className="text-[13px] mb-2">
            <span className="font-semibold text-[#26a541]">{order.refundTitle}</span>
            <span className="text-gray-500 ml-1">{order.refundId}</span>
          </p>
          <ul className="list-disc pl-4 text-[12px] text-gray-800 space-y-2">
            <li>{order.refundDesc}</li>
          </ul>
          <p className="text-[11px] text-gray-500 mt-2">
            If you can't see the refund in your bank statement(bank app/passbook), contact your bank and share refund reference number 852409773035 to track it.
          </p>
        </div>
      )}
    </div>
  );
}

function OrdersPanel({ orders, onCancel, onReturn }: { orders: OrderItem[], onCancel: (id: string) => void, onReturn: (id: string) => void }) {
  return (
    <div>
      <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#111827", marginBottom: "1.25rem" }}>Order History</h2>
      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} showCancelBtn={true} onCancel={onCancel} onReturn={onReturn} />
        ))}
        <div className="flex justify-center mt-4">
          <button className="px-6 py-2 border border-gray-200 text-[#2874f0] font-semibold text-[13px] bg-white shadow-sm hover:bg-gray-50">
            No More Results To Display
          </button>
        </div>
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
  const { addresses, addAddress, updateAddress, deleteAddress } = useAddressStore();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Address>>({});

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({
      name: "",
      phone: "+91 ",
      email: "",
      addressLine: "",
      pinCode: "",
      city: "",
      state: "Kerala",
      label: "Home"
    });
    setShowForm(true);
  };

  const handleEdit = (addr: Address) => {
    setEditingId(addr.id);
    setFormData(addr);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!formData.addressLine || !formData.pinCode || !formData.phone) return;

    if (editingId) {
      updateAddress(editingId, formData as Address);
    } else {
      addAddress({
        ...formData,
        id: `addr-${Date.now()}`,
        icon: formData.label?.toLowerCase() === "office" ? "office" : "home"
      } as Address);
    }
    setShowForm(false);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#111827" }}>My Addresses</h2>
        <button
          onClick={() => {
            if (showForm) {
              setShowForm(false);
            } else {
              handleAddNew();
            }
          }}
          style={{ background: PRIMARY, color: "#fff", border: "none", borderRadius: "10px", padding: "0.5rem 1.25rem", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer" }}
        >
          {showForm ? "Cancel" : "+ Add Address"}
        </button>
      </div>

      {addresses.map((addr) => (
        <div key={addr.id} style={{ border: "1px solid #e5e7eb", borderRadius: "12px", padding: "1.25rem", marginBottom: "12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <span style={{ fontWeight: 700, fontSize: "0.875rem" }}>{addr.label || "Address"}</span>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => handleEdit(addr)} style={{ fontSize: "0.75rem", color: PRIMARY, background: "transparent", border: "none", cursor: "pointer", fontWeight: 600 }}>Edit</button>
              <button onClick={() => deleteAddress(addr.id)} style={{ fontSize: "0.75rem", color: "#ef4444", background: "transparent", border: "none", cursor: "pointer", fontWeight: 600 }}>Delete</button>
            </div>
          </div>
          <p style={{ fontSize: "0.82rem", color: "#6b7280", lineHeight: 1.6 }}>
            {addr.name && <>{addr.name}<br /></>}
            {addr.addressLine}<br />
            {addr.city}, {addr.state} {addr.pinCode}<br />
            {addr.phone}
          </p>
        </div>
      ))}

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mt-6">
          <p className="text-gray-500 mb-6 text-sm">
            {editingId ? "Update your address details." : "Add a new address for faster checkout."}
          </p>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1.5">Label <span className="text-gray-400 font-normal">(e.g. Home, Office)</span></label>
              <input type="text" placeholder="Home" value={formData.label || ""} onChange={(e) => setFormData({ ...formData, label: e.target.value })} className="w-full rounded-lg border-2 border-gray-200 focus:border-[#8b5cf6] px-4 py-2.5 focus:outline-none focus:ring-4 focus:ring-[#8b5cf6]/20 transition-all" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1.5">Full name <span className="text-gray-400 font-normal">(Optional)</span></label>
              <input type="text" placeholder="Your name" value={formData.name || ""} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full rounded-lg border-2 border-gray-200 focus:border-[#8b5cf6] px-4 py-2.5 focus:outline-none focus:ring-4 focus:ring-[#8b5cf6]/20 transition-all" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1.5">Mobile number <span className="text-red-500">*</span></label>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden focus-within:border-[#8b5cf6] focus-within:ring-4 focus-within:ring-[#8b5cf6]/20 transition-all">
                <button type="button" className="flex items-center gap-2 px-3 bg-gray-50 border-r border-gray-300">
                  <span className="text-lg leading-none">🇮🇳</span>
                  <span className="text-xs text-gray-600 font-medium">↕</span>
                </button>
                <input type="tel" value={formData.phone || ""} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="flex-1 px-4 py-2.5 focus:outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1.5">Email address <span className="text-gray-400 font-normal">(Optional)</span></label>
              <input type="email" value={formData.email || ""} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Email" className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:border-[#8b5cf6] focus:ring-4 focus:ring-[#8b5cf6]/20 transition-all" />
              <p className="text-xs text-gray-500 mt-1.5">Optional. Used for order updates and receipts.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1.5">Address <span className="text-red-500">*</span></label>
              <textarea rows={3} value={formData.addressLine || ""} onChange={(e) => setFormData({ ...formData, addressLine: e.target.value })} className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:border-[#8b5cf6] focus:ring-4 focus:ring-[#8b5cf6]/20 transition-all resize-none"></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1.5">Pin code <span className="text-red-500">*</span></label>
              <input type="text" value={formData.pinCode || ""} onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:border-[#8b5cf6] focus:ring-4 focus:ring-[#8b5cf6]/20 transition-all" />
              {formData.pinCode && formData.pinCode.length > 5 && (
                <div className="mt-2 space-y-1">
                  <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">✓ Location found • {formData.city || "Kozhikode"}, {formData.state || "Kerala"}</p>
                  <p className="text-xs text-emerald-600">Delivery via Ekart Logistics Surface</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1.5">City <span className="text-red-500">*</span></label>
                <input type="text" value={formData.city || ""} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:border-[#8b5cf6]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1.5">State <span className="text-gray-400 font-normal">(Optional)</span></label>
                <div className="relative">
                  <select value={formData.state || ""} onChange={(e) => setFormData({ ...formData, state: e.target.value })} className="w-full appearance-none rounded-lg border border-gray-300 px-4 py-2.5 text-gray-500 bg-gray-50 focus:outline-none">
                    <option value="Kerala">Kerala</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> Auto-filled from PIN
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button onClick={handleSave} type="button" className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white px-6 py-2.5 rounded-lg font-bold text-sm">
                Save Address
              </button>
              <button onClick={() => setShowForm(false)} type="button" className="text-gray-500 hover:text-gray-900 font-medium text-sm">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



function RewardPanel() {
  return (
    <div>
      <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#111827", marginBottom: "1.25rem" }}>My Reward Coins</h2>

      <div className="bg-gradient-to-r from-[#f0fdf4] to-[#dcfce7] rounded-sm p-6 sm:p-8 border border-[#bbf7d0] flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 mb-8 shadow-sm">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
            <Gift className="w-8 h-8 text-[#16a34a]" />
          </div>
          <div>
            <p className="text-[#166534] text-sm font-semibold mb-1 uppercase tracking-wider">Available Balance</p>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-black text-[#14532d] leading-none">450</span>
              <span className="text-[#15803d] font-bold text-lg mb-0.5">Coins</span>
            </div>
          </div>
        </div>

        <button className="w-full sm:w-auto bg-[#16a34a] hover:bg-[#15803d] text-white font-bold py-3 px-8 rounded-sm transition-colors shadow-sm">
          Redeem Now
        </button>
      </div>

      <h3 className="font-bold text-gray-900 text-lg mb-4">How it works</h3>
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mb-3">
            <ShoppingBag className="w-5 h-5 text-blue-600" />
          </div>
          <h4 className="font-bold text-gray-900 mb-2">Shop</h4>
          <p className="text-xs text-gray-500 leading-relaxed">Earn 1 Woxly Coin for every $10 spent on our store.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center mb-3">
            <Star className="w-5 h-5 text-purple-600" />
          </div>
          <h4 className="font-bold text-gray-900 mb-2">Review</h4>
          <p className="text-xs text-gray-500 leading-relaxed">Earn 50 coins for every photo review you leave on products.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center mb-3">
            <Gift className="w-5 h-5 text-green-600" />
          </div>
          <h4 className="font-bold text-gray-900 mb-2">Redeem</h4>
          <p className="text-xs text-gray-500 leading-relaxed">Use your coins for discounts! 100 coins = $5 off your order.</p>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────
export default function AccountPage() {
  const [activeNav, setActiveNav] = useState("orders");
  const [showMobileMenu, setShowMobileMenu] = useState(true);
  const [orders, setOrders] = useState<OrderItem[]>(initialOrders);

  const cancelOrder = (id: string) => {
    const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? {
            ...o,
            status: `Cancelled on ${today}`,
            statusColor: "red",
            statusDesc: "Your order was cancelled as per your request.",
            cancelAction: false,
            refundBox: true,
            refundTitle: "Refund Initiated",
            refundId: `(Refund ID: REF${Date.now()})`,
            refundDesc: `A refund of ${o.price} will be credited to your original payment method within 5-7 business days.`,
          }
          : o
      )
    );
  };

  const returnOrder = (id: string) => {
    const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? {
            ...o,
            status: `Return requested on ${today}`,
            statusColor: "yellow",
            statusDesc: "Your return request is being processed. A pickup will be scheduled soon.",
            returnAction: false,
            reviewAction: false,
            refundBox: true,
            refundTitle: "Return Requested",
            refundId: `(Return ID: RET${Date.now()})`,
            refundDesc: `Once the item is picked up and verified, a refund of ${o.price} will be credited to your original payment method.`,
          }
          : o
      )
    );
  };

  const panelMap: Record<string, React.ReactNode> = {
    orders: <OrdersPanel orders={orders} onCancel={cancelOrder} onReturn={returnOrder} />,
    returns: <OrdersPanel orders={orders.filter(o => o.status.includes('Return'))} onCancel={cancelOrder} onReturn={returnOrder} />,
    details: <DetailsPanel />,
    address: <AddressPanel />,
    rewards: <RewardPanel />,
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-24 lg:pb-12">
      <div className="max-w-[1100px] mx-auto pt-4 lg:pt-8 px-4 flex flex-col lg:flex-row gap-6 lg:gap-10">

        {/* ── Navigation / Menu (Visible on Desktop always, Visible on Mobile if showMobileMenu is true) ── */}
        <div className={`w-full lg:w-[340px] shrink-0 ${!showMobileMenu ? 'hidden lg:block' : 'block'}`}>

          {/* Header Mobile Style */}
          <div className="flex items-center justify-between mb-6 lg:mb-8">
            <div>
              <p className="text-[13px] text-gray-500 mb-0.5">Hello,</p>
              <h1 className="font-bold text-gray-900 text-[22px] leading-tight mb-1">Jenny Wilson</h1>
              <p className="text-[13px] text-gray-600">Welcome back! </p>
            </div>
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-white border border-gray-200 overflow-hidden shadow-sm">
                <Image src="/images/product_placeholder.png" alt="Jenny Wilson" fill className="object-cover p-2" />
              </div>
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-white rounded-full border border-gray-200 shadow-sm flex items-center justify-center">
                <Camera className="w-3.5 h-3.5 text-gray-600" />
              </div>
            </div>
          </div>

          {/* Member Card */}
          <button onClick={() => { setActiveNav('rewards'); setShowMobileMenu(false); }} className="w-full bg-primary/5 border border-primary/10 rounded-[16px] p-4 flex items-center justify-between mb-8 transition-all hover:bg-primary/10 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Crown className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-[15px]">Woxly Member</p>
                <p className="text-[12px] text-gray-500">You have 120 Reward Coins</p>
              </div>
            </div>
            <span className="text-[12px] font-bold text-primary flex items-center">
              View Rewards <ChevronRight className="w-3 h-3 ml-1" />
            </span>
          </button>

          <h2 className="font-bold text-gray-900 text-[17px] mb-4">My Account</h2>

          <div className="bg-white border border-gray-100 rounded-[16px] shadow-sm overflow-hidden mb-6">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => { setActiveNav(item.id); setShowMobileMenu(false); }}
                  className={`w-full flex items-center justify-between p-4 text-left transition-colors ${index !== navItems.length - 1 ? 'border-b border-gray-50' : ''} ${activeNav === item.id ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.iconBg}`}>
                      <Icon className={`w-5 h-5 ${item.iconColor}`} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-[14px]">{item.label}</p>
                      <p className="text-[11px] text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300" />
                </button>
              );
            })}

            {/* Logout */}
            <Link href="/" className="w-full flex items-center justify-between p-4 text-left transition-colors hover:bg-red-50 border-t border-gray-50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                  <LogOut className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p className="font-bold text-red-600 text-[14px]">Logout</p>
                  <p className="text-[11px] text-red-400">Sign out from your account</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-red-300" />
            </Link>
          </div>

          {/* Secure Shopping */}
          <div className="bg-[#f4eefc] rounded-[16px] p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-[13px]">Secure Shopping</p>
              <p className="text-[11px] text-gray-500">Your data is 100% safe and secure with us.</p>
            </div>
          </div>
        </div>

        {/* ── Main Content panel (Visible on Desktop always, Visible on Mobile if showMobileMenu is false) ── */}
        <div className={`flex-1 ${showMobileMenu ? 'hidden lg:block' : 'block'}`}>
          <div className="lg:hidden mb-4">
            <button onClick={() => setShowMobileMenu(true)} className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Menu
            </button>
          </div>
          <div className="bg-white border border-gray-100 rounded-[16px] shadow-sm overflow-hidden p-6 min-h-[600px]">
            {panelMap[activeNav]}
          </div>
        </div>
      </div>
    </div>
  );
}
