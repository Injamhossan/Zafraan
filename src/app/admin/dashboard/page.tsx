"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import mainLogo from "@/assets/mainlogo.png";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  longevity: string;
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  product: string;
  date: string;
  total: number;
  paymentStatus: "Paid" | "Unpaid";
  deliveryStatus: "Pending" | "Shipped" | "Delivered";
}

interface Customer {
  id: number;
  name: string;
  email: string;
  totalSpent: number;
  joinDate: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "products" | "orders" | "customers">("overview");

  // --- Real-time Catalog State ---
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Oud Royale", category: "Oud & Woody", price: 3450, longevity: "12+ Hours" },
    { id: 2, name: "Imperial Rose", category: "For Her", price: 2800, longevity: "10+ Hours" },
    { id: 3, name: "Saffron Gold", category: "Arabic Collection", price: 3900, longevity: "14+ Hours" },
    { id: 4, name: "Aqua Fresh", category: "Fresh Collection", price: 2200, longevity: "8+ Hours" },
    { id: 5, name: "Sweet Vanilla", category: "Sweet & Gourmand", price: 2950, longevity: "9+ Hours" },
    { id: 6, name: "Majestic Oud", category: "Oud & Woody", price: 4200, longevity: "12+ Hours" },
  ]);

  // Product Modal Fields
  const [showProductModal, setShowProductModal] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("Oud & Woody");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductLongevity, setNewProductLongevity] = useState("10+ Hours");

  // --- Real-time Orders State ---
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ZAF-9942",
      customerName: "Imran Khan",
      customerEmail: "imran@gmail.com",
      product: "Oud Royale (1x)",
      date: "May 29, 2026",
      total: 3450,
      paymentStatus: "Paid",
      deliveryStatus: "Pending",
    },
    {
      id: "ZAF-9941",
      customerName: "Farhana Ahmed",
      customerEmail: "farhana.ahmed@yahoo.com",
      product: "Imperial Rose (1x), Sweet Vanilla (1x)",
      date: "May 28, 2026",
      total: 5750,
      paymentStatus: "Paid",
      deliveryStatus: "Shipped",
    },
    {
      id: "ZAF-9940",
      customerName: "Zahid Hasan",
      customerEmail: "zahid.hasan@hotmail.com",
      product: "Saffron Gold (2x)",
      date: "May 27, 2026",
      total: 7800,
      paymentStatus: "Unpaid",
      deliveryStatus: "Pending",
    },
    {
      id: "ZAF-9939",
      customerName: "Nusrat Jahan",
      customerEmail: "nusrat.jahan@live.com",
      product: "Aqua Fresh (1x)",
      date: "May 26, 2026",
      total: 2200,
      paymentStatus: "Paid",
      deliveryStatus: "Delivered",
    },
    {
      id: "ZAF-9938",
      customerName: "Mahbubur Rahman",
      customerEmail: "mahbub@outlook.com",
      product: "Majestic Oud (1x)",
      date: "May 25, 2026",
      total: 4200,
      paymentStatus: "Paid",
      deliveryStatus: "Delivered",
    },
  ]);

  // --- Customers Listing ---
  const customers: Customer[] = [
    { id: 1, name: "Imran Khan", email: "imran@gmail.com", totalSpent: 12450, joinDate: "Jan 12, 2026" },
    { id: 2, name: "Farhana Ahmed", email: "farhana.ahmed@yahoo.com", totalSpent: 9800, joinDate: "Feb 05, 2026" },
    { id: 3, name: "Zahid Hasan", email: "zahid.hasan@hotmail.com", totalSpent: 15600, joinDate: "Mar 19, 2026" },
    { id: 4, name: "Nusrat Jahan", email: "nusrat.jahan@live.com", totalSpent: 4400, joinDate: "Apr 22, 2026" },
    { id: 5, name: "Mahbubur Rahman", email: "mahbub@outlook.com", totalSpent: 8400, joinDate: "May 01, 2026" },
  ];

  // --- Product Modifiers ---
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProductName && newProductPrice) {
      const newProd: Product = {
        id: products.length + 1,
        name: newProductName,
        category: newProductCategory,
        price: parseFloat(newProductPrice),
        longevity: newProductLongevity,
      };
      setProducts([newProd, ...products]);
      setNewProductName("");
      setNewProductPrice("");
      setShowProductModal(false);
    }
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  // --- Order Modifiers ---
  const updatePaymentStatus = (id: string, currentStatus: "Paid" | "Unpaid") => {
    const nextStatus = currentStatus === "Paid" ? "Unpaid" : "Paid";
    setOrders(
      orders.map((o) => (o.id === id ? { ...o, paymentStatus: nextStatus } : o))
    );
  };

  const updateDeliveryStatus = (id: string, nextStatus: "Pending" | "Shipped" | "Delivered") => {
    setOrders(
      orders.map((o) => (o.id === id ? { ...o, deliveryStatus: nextStatus } : o))
    );
  };

  return (
    <div className="bg-[#FAF9F5] min-h-screen flex flex-col lg:flex-row text-[#111111]">
      
      {/* 1. Left Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-[#111111] lg:min-h-screen text-white flex flex-col p-6 shrink-0 relative z-10">
        
        {/* Dashboard Logo */}
        <div className="mb-10 flex flex-col items-center lg:items-start gap-2.5">
          <Image src={mainLogo} alt="Zafraan Logo" className="h-8 w-auto object-contain invert brightness-0" />
          <span className="text-[9px] font-bold tracking-[0.25em] text-[#D4AF37] uppercase">Admin Control</span>
        </div>

        {/* Navigation list */}
        <nav className="flex flex-col gap-1.5 flex-1">
          {[
            { id: "overview", label: "Overview", icon: "📊" },
            { id: "products", label: "Catalog Editor", icon: "🧴" },
            { id: "orders", label: "Order Manager", icon: "📦" },
            { id: "customers", label: "Customers List", icon: "👥" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                activeTab === item.id
                  ? "bg-[#5B112B] text-white shadow-md border-l-4 border-l-[#D4AF37]"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Back Link bottom */}
        <div className="mt-8 pt-6 border-t border-white/5">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-4 py-3 text-xs font-semibold text-gray-400 hover:text-white uppercase tracking-wider transition-colors"
          >
            <span>🚪</span>
            Log Out
          </Link>
        </div>
      </aside>

      {/* 2. Main Dashboard Area */}
      <main className="flex-1 p-8 lg:p-12 overflow-x-hidden">
        
        {/* Header bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-black/5">
          <div>
            <h1 className="text-2xl font-serif uppercase tracking-wide">
              {activeTab === "overview" && "Dashboard Overview"}
              {activeTab === "products" && "Product Catalog Editor"}
              {activeTab === "orders" && "Active Order Manager"}
              {activeTab === "customers" && "Registered Customers"}
            </h1>
            <p className="text-xs text-gray-400 font-medium">Welcome back, Administrator | Zafraan Executive Portal</p>
          </div>
          
          <div className="text-xs font-bold bg-white px-4 py-2 rounded border border-black/5 shadow-xs flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            System Live
          </div>
        </div>

        {/* -------------------- TAB: OVERVIEW -------------------- */}
        {activeTab === "overview" && (
          <div className="flex flex-col gap-8 animate-fade-in">
            
            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-white p-6 border border-black/5 rounded shadow-xs flex flex-col gap-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Sales Revenue</span>
                <span className="text-2xl font-serif text-[#111111] font-bold">৳2,485,300</span>
                <span className="text-[10.5px] text-emerald-600 font-semibold flex items-center gap-1">
                  ▲ +14% <span className="text-gray-400 font-normal">from last month</span>
                </span>
              </div>

              <div className="bg-white p-6 border border-black/5 rounded shadow-xs flex flex-col gap-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Orders</span>
                <span className="text-2xl font-serif text-[#111111] font-bold">1,284</span>
                <span className="text-[10.5px] text-emerald-600 font-semibold flex items-center gap-1">
                  ▲ +8% <span className="text-gray-400 font-normal">this week</span>
                </span>
              </div>

              <div className="bg-white p-6 border border-black/5 rounded shadow-xs flex flex-col gap-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Customers</span>
                <span className="text-2xl font-serif text-[#111111] font-bold">942</span>
                <span className="text-[10.5px] text-emerald-600 font-semibold flex items-center gap-1">
                  ▲ +22% <span className="text-gray-400 font-normal">growth</span>
                </span>
              </div>

              <div className="bg-white p-6 border border-black/5 rounded shadow-xs flex flex-col gap-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Catalog Items</span>
                <span className="text-2xl font-serif text-[#111111] font-bold">{products.length} Fragrances</span>
                <span className="text-[10.5px] text-gray-400 font-normal">Fully active on store</span>
              </div>

            </div>

            {/* Sales Chart & Activity Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Sales Chart Box */}
              <div className="bg-white p-6 border border-black/5 rounded shadow-xs lg:col-span-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#111111] mb-6">Sales Growth Trend (2026)</h3>
                
                {/* SVG Graph Graphic */}
                <div className="w-full h-64 bg-gray-50/50 rounded border border-dashed border-black/10 flex items-center justify-center p-4 relative">
                  <svg className="w-full h-full" viewBox="0 0 600 200" fill="none">
                    {/* Gridlines */}
                    <line x1="0" y1="50" x2="600" y2="50" stroke="#f0f0f0" strokeWidth="1" />
                    <line x1="0" y1="100" x2="600" y2="100" stroke="#f0f0f0" strokeWidth="1" />
                    <line x1="0" y1="150" x2="600" y2="150" stroke="#f0f0f0" strokeWidth="1" />
                    
                    {/* Shadow Area under Line */}
                    <path
                      d="M 20 180 L 120 150 L 220 160 L 320 100 L 420 70 L 520 40 L 520 200 L 20 200 Z"
                      fill="url(#gradient-maroon)"
                      opacity="0.08"
                    />

                    {/* Chart Line */}
                    <path
                      d="M 20 180 L 120 150 L 220 160 L 320 100 L 420 70 L 520 40"
                      stroke="#5B112B"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Data Points */}
                    <circle cx="20" cy="180" r="4.5" fill="#D4AF37" stroke="#5B112B" strokeWidth="2" />
                    <circle cx="120" cy="150" r="4.5" fill="#D4AF37" stroke="#5B112B" strokeWidth="2" />
                    <circle cx="220" cy="160" r="4.5" fill="#D4AF37" stroke="#5B112B" strokeWidth="2" />
                    <circle cx="320" cy="100" r="4.5" fill="#D4AF37" stroke="#5B112B" strokeWidth="2" />
                    <circle cx="420" cy="70" r="4.5" fill="#D4AF37" stroke="#5B112B" strokeWidth="2" />
                    <circle cx="520" cy="40" r="4.5" fill="#D4AF37" stroke="#5B112B" strokeWidth="2" />

                    {/* Gradients Definitions */}
                    <defs>
                      <linearGradient id="gradient-maroon" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#5B112B" />
                        <stop offset="100%" stopColor="#FFFFFF" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Labels overlay */}
                  <div className="absolute bottom-2 left-6 right-6 flex justify-between text-[9px] font-bold text-gray-400 uppercase">
                    <span>Jan (৳320k)</span>
                    <span>Feb (৳410k)</span>
                    <span>Mar (৳390k)</span>
                    <span>Apr (৳650k)</span>
                    <span>May (৳820k)</span>
                    <span>Jun (৳1.2M)</span>
                  </div>
                </div>
              </div>

              {/* Administrative logs Feed */}
              <div className="bg-white p-6 border border-black/5 rounded shadow-xs">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#111111] mb-6">Recent Operations</h3>
                <div className="flex flex-col gap-4">
                  {[
                    { text: "Order ZAF-9942 pending verification", time: "2 mins ago", color: "bg-[#791b29]" },
                    { text: "Order ZAF-9939 changed to Shipped", time: "1 hr ago", color: "bg-blue-500" },
                    { text: "Autofilled dashboard test parameters", time: "3 hrs ago", color: "bg-[#D4AF37]" },
                    { text: "Administrative Login from IP 192.168.1.1", time: "1 day ago", color: "bg-emerald-500" }
                  ].map((log, idx) => (
                    <div key={idx} className="flex items-start gap-3 border-b border-black/5 pb-3 last:border-0 last:pb-0">
                      <span className={`w-2.5 h-2.5 rounded-full shrink-0 mt-1 ${log.color}`}></span>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-600 font-semibold">{log.text}</span>
                        <span className="text-[9.5px] text-gray-400 font-semibold mt-0.5">{log.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* -------------------- TAB: PRODUCTS CATALOG -------------------- */}
        {activeTab === "products" && (
          <div className="bg-white border border-black/5 rounded shadow-xs p-6 md:p-8 animate-fade-in">
            
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#111111]">Fragrance List ({products.length})</h3>
              <button
                onClick={() => setShowProductModal(true)}
                className="bg-[#5B112B] hover:bg-[#3d0b1d] text-white text-[10.5px] font-bold tracking-widest uppercase px-5 py-2.5 rounded-sm transition-colors cursor-pointer"
              >
                + Add Product
              </button>
            </div>

            {/* Catalog Data Grid */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-black/10 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <th className="py-4 px-4">ID</th>
                    <th className="py-4 px-4">Name</th>
                    <th className="py-4 px-4">Category</th>
                    <th className="py-4 px-4">Price (BDT)</th>
                    <th className="py-4 px-4">Longevity</th>
                    <th className="py-4 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 text-xs text-gray-600 font-semibold">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-[#FDFCF7]/30 transition-colors">
                      <td className="py-4 px-4 text-gray-400 font-normal">#{p.id}</td>
                      <td className="py-4 px-4 text-[#111111]">{p.name}</td>
                      <td className="py-4 px-4">{p.category}</td>
                      <td className="py-4 px-4 font-serif">৳{p.price}</td>
                      <td className="py-4 px-4">{p.longevity}</td>
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="text-red-500 hover:text-red-700 hover:underline transition-colors text-[10.5px] font-bold tracking-wider uppercase cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* PRODUCT POPUP MODAL */}
            {showProductModal && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-6 z-50 animate-fade-in">
                <div className="bg-white border border-black/5 rounded-md p-8 max-w-md w-full shadow-2xl relative">
                  <button
                    onClick={() => setShowProductModal(false)}
                    className="absolute right-6 top-6 text-gray-400 hover:text-black font-bold text-lg"
                  >
                    ✕
                  </button>

                  <h4 className="text-lg font-serif uppercase tracking-wide mb-6">Add New Fragrance</h4>

                  <form onSubmit={handleAddProduct} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Product Name *</label>
                      <input
                        type="text"
                        value={newProductName}
                        onChange={(e) => setNewProductName(e.target.value)}
                        placeholder="e.g. Royal Musk"
                        className="border border-black/10 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#791b29]"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Category *</label>
                      <select
                        value={newProductCategory}
                        onChange={(e) => setNewProductCategory(e.target.value)}
                        className="border border-black/10 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#791b29]"
                      >
                        <option>Oud & Woody</option>
                        <option>For Her</option>
                        <option>For Him</option>
                        <option>Arabic Collection</option>
                        <option>Fresh Collection</option>
                        <option>Sweet & Gourmand</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Price (BDT Taka) *</label>
                      <input
                        type="number"
                        value={newProductPrice}
                        onChange={(e) => setNewProductPrice(e.target.value)}
                        placeholder="e.g. 3200"
                        className="border border-black/10 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#791b29]"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Longevity *</label>
                      <select
                        value={newProductLongevity}
                        onChange={(e) => setNewProductLongevity(e.target.value)}
                        className="border border-black/10 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#791b29]"
                      >
                        <option>8+ Hours</option>
                        <option>10+ Hours</option>
                        <option>12+ Hours</option>
                        <option>14+ Hours</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="bg-[#5B112B] hover:bg-[#3d0b1d] text-white text-[10.5px] font-bold tracking-widest uppercase py-3.5 rounded-sm transition-colors shadow-md mt-2 cursor-pointer"
                    >
                      Save Product
                    </button>
                  </form>
                </div>
              </div>
            )}

          </div>
        )}

        {/* -------------------- TAB: ORDERS MANAGER -------------------- */}
        {activeTab === "orders" && (
          <div className="bg-white border border-black/5 rounded shadow-xs p-6 md:p-8 animate-fade-in">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#111111] mb-6">Recent Customer Orders</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-black/10 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <th className="py-4 px-4">Order ID</th>
                    <th className="py-4 px-4">Customer</th>
                    <th className="py-4 px-4">Items Ordered</th>
                    <th className="py-4 px-4">Date</th>
                    <th className="py-4 px-4">Total</th>
                    <th className="py-4 px-4">Payment</th>
                    <th className="py-4 px-4">Delivery Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 text-xs text-gray-600 font-semibold">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-[#FDFCF7]/30 transition-colors">
                      <td className="py-4 px-4 text-[#791b29] font-bold">{o.id}</td>
                      <td className="py-4 px-4">
                        <div className="flex flex-col">
                          <span>{o.customerName}</span>
                          <span className="text-[10px] text-gray-400 font-medium">{o.customerEmail}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-500">{o.product}</td>
                      <td className="py-4 px-4 font-medium">{o.date}</td>
                      <td className="py-4 px-4 font-serif">৳{o.total}</td>
                      <td className="py-4 px-4">
                        {/* Interactive toggle button */}
                        <button
                          onClick={() => updatePaymentStatus(o.id, o.paymentStatus)}
                          className={`px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                            o.paymentStatus === "Paid"
                              ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                              : "bg-red-50 text-red-700 hover:bg-red-100"
                          }`}
                        >
                          {o.paymentStatus}
                        </button>
                      </td>
                      <td className="py-4 px-4">
                        {/* Status update selectors */}
                        <select
                          value={o.deliveryStatus}
                          onChange={(e) => updateDeliveryStatus(o.id, e.target.value as any)}
                          className={`px-2.5 py-1.5 rounded text-[9.5px] font-bold uppercase tracking-wider focus:outline-none ${
                            o.deliveryStatus === "Delivered"
                              ? "bg-emerald-50 text-emerald-700"
                              : o.deliveryStatus === "Shipped"
                                ? "bg-blue-50 text-blue-700"
                                : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* -------------------- TAB: CUSTOMERS -------------------- */}
        {activeTab === "customers" && (
          <div className="bg-white border border-black/5 rounded shadow-xs p-6 md:p-8 animate-fade-in">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#111111] mb-6">Active Customers Ledger</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-black/10 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <th className="py-4 px-4">ID</th>
                    <th className="py-4 px-4">Name</th>
                    <th className="py-4 px-4">Email</th>
                    <th className="py-4 px-4">Total Purchases</th>
                    <th className="py-4 px-4">Registered Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 text-xs text-gray-600 font-semibold">
                  {customers.map((c) => (
                    <tr key={c.id} className="hover:bg-[#FDFCF7]/30 transition-colors">
                      <td className="py-4 px-4 text-gray-400 font-normal">#{c.id}</td>
                      <td className="py-4 px-4 text-[#111111]">{c.name}</td>
                      <td className="py-4 px-4 font-medium">{c.email}</td>
                      <td className="py-4 px-4 font-serif text-[#791b29]">৳{c.totalSpent}</td>
                      <td className="py-4 px-4 text-gray-400 font-medium">{c.joinDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

      </main>

    </div>
  );
}
