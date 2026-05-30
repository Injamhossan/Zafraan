"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
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
  const { data: session, status } = useSession();

  const [activeTab, setActiveTab] = useState<"overview" | "products" | "orders" | "customers" | "console">("overview");

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

  // --- Systems Command Console States ---
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    "[SYS] Zafraan OS v2.0 initialized.",
    "[SYS] Secure JWT Authorization Session loaded.",
    "[SYS] Supabase Database Connection pooled."
  ]);
  const [backupProgress, setBackupProgress] = useState<number | null>(null);
  const [isMaintenance, setIsMaintenance] = useState(false);

  const addLog = (log: string) => {
    setConsoleLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${log}`, ...prev]);
  };

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
      addLog(`[CATALOG] Added "${newProductName}" to active fragrances list.`);
      setNewProductName("");
      setNewProductPrice("");
      setShowProductModal(false);
    }
  };

  const handleDeleteProduct = (id: number) => {
    const prod = products.find((p) => p.id === id);
    setProducts(products.filter((p) => p.id !== id));
    if (prod) {
      addLog(`[CATALOG] Deleted fragrance "${prod.name}" (ID #${id}) from catalog.`);
    }
  };

  // --- Order Modifiers ---
  const updatePaymentStatus = (id: string, currentStatus: "Paid" | "Unpaid") => {
    const nextStatus = currentStatus === "Paid" ? "Unpaid" : "Paid";
    setOrders(
      orders.map((o) => (o.id === id ? { ...o, paymentStatus: nextStatus } : o))
    );
    addLog(`[ORDERS] Updated Payment Status of ${id} to "${nextStatus}".`);
  };

  const updateDeliveryStatus = (id: string, nextStatus: "Pending" | "Shipped" | "Delivered") => {
    setOrders(
      orders.map((o) => (o.id === id ? { ...o, deliveryStatus: nextStatus } : o))
    );
    addLog(`[ORDERS] Shipped package ${id} | Delivery status set to "${nextStatus}".`);
  };

  // --- Super Admin Controls ---
  const triggerBackup = () => {
    if (backupProgress !== null) return;
    addLog("[BACKUP] Starting secure system backup sequence...");
    setBackupProgress(0);

    const interval = setInterval(() => {
      setBackupProgress((prev) => {
        if (prev === null) return null;
        if (prev >= 100) {
          clearInterval(interval);
          addLog("[BACKUP] SQL dump created successfully. Uploaded to secure Supabase vault.");
          setTimeout(() => setBackupProgress(null), 1000);
          return 100;
        }
        return prev + 20;
      });
    }, 300);
  };

  const resetDatabase = () => {
    setProducts([
      { id: 1, name: "Oud Royale", category: "Oud & Woody", price: 3450, longevity: "12+ Hours" },
      { id: 2, name: "Imperial Rose", category: "For Her", price: 2800, longevity: "10+ Hours" },
      { id: 3, name: "Saffron Gold", category: "Arabic Collection", price: 3900, longevity: "14+ Hours" },
      { id: 4, name: "Aqua Fresh", category: "Fresh Collection", price: 2200, longevity: "8+ Hours" },
      { id: 5, name: "Sweet Vanilla", category: "Sweet & Gourmand", price: 2950, longevity: "9+ Hours" },
      { id: 6, name: "Majestic Oud", category: "Oud & Woody", price: 4200, longevity: "12+ Hours" },
    ]);
    addLog("[DATABASE] Catalog database wiped and reset to default production seed.");
  };

  const toggleMaintenance = () => {
    setIsMaintenance(!isMaintenance);
    addLog(`[MAINTENANCE] Storefront maintenance status changed to: ${!isMaintenance ? "ACTIVE" : "INACTIVE"}`);
  };

  // --- 1. SESSION LOAD GATES ---
  if (status === "loading") {
    return (
      <div className="bg-[#FAF9F5] min-h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-black/10 border-t-[#791b29] rounded-full animate-spin"></div>
          <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Authorizing Admin Session</span>
        </div>
      </div>
    );
  }

  // --- 2. ACCESS DENIED BLOCK (JWT CHECK) ---
  if (status === "unauthenticated" || (session && (session as any).user?.role !== "admin")) {
    return (
      <div className="bg-[#121212] min-h-screen flex flex-col items-center justify-center p-6 text-white relative">
        <div className="absolute top-0 left-1/4 w-[350px] h-[350px] rounded-full bg-[#791b29]/5 blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-[440px] w-full bg-[#1A1A1A] border border-white/5 p-8 rounded-md shadow-2xl text-center z-10">
          <div className="w-16 h-16 rounded-full bg-red-950/50 border border-red-500/20 text-red-500 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          </div>
          <h2 className="text-xl font-serif uppercase tracking-wide text-white mb-2">403 Access Denied</h2>
          <p className="text-[10.5px] text-gray-500 font-bold uppercase tracking-wider mb-6">Insufficient JWT Role Privileges</p>
          <p className="text-xs text-gray-400 leading-relaxed mb-8">
            You do not have administrative authorization to access the console database. Only authenticated Super Administrators may request back-end credentials.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/admin"
              className="bg-[#5B112B] hover:bg-[#791b29] text-white text-[11px] font-bold tracking-widest uppercase py-3.5 rounded-sm transition-all"
            >
              Sign In with Admin Access
            </Link>
            <Link
              href="/"
              className="border border-white/10 hover:border-white/20 text-gray-400 hover:text-white text-[11px] font-bold tracking-widest uppercase py-3.5 rounded-sm transition-all"
            >
              Return to Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- 3. DYNAMIC SUPER ADMIN DASHBOARD ---
  return (
    <div className="bg-[#FAF9F5] min-h-screen flex flex-col lg:flex-row text-[#111111]">
      
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-[#111111] lg:min-h-screen text-white flex flex-col p-6 shrink-0 relative z-10">
        
        {/* Dashboard Logo */}
        <div className="mb-10 flex flex-col items-center lg:items-start gap-2.5">
          <Image src={mainLogo} alt="Zafraan Logo" className="h-8 w-auto object-contain invert brightness-0" />
          <span className="text-[9px] font-bold tracking-[0.25em] text-[#D4AF37] uppercase">Super Admin Panel</span>
        </div>

        {/* Navigation list */}
        <nav className="flex flex-col gap-1.5 flex-1">
          {[
            { id: "overview", label: "Overview", icon: "📊" },
            { id: "products", label: "Catalog Editor", icon: "🧴" },
            { id: "orders", label: "Order Manager", icon: "📦" },
            { id: "customers", label: "Customers List", icon: "👥" },
            { id: "console", label: "Command Center", icon: "💻" }
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

        {/* Sign Out bottom */}
        <div className="mt-8 pt-6 border-t border-white/5">
          <button
            onClick={() => signOut({ callbackUrl: "/admin" })}
            className="w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold text-gray-400 hover:text-white uppercase tracking-wider transition-colors cursor-pointer text-left"
          >
            <span>🚪</span>
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 lg:p-12 overflow-x-hidden">
        
        {/* Header bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-black/5">
          <div>
            <h1 className="text-2xl font-serif uppercase tracking-wide">
              {activeTab === "overview" && "Dashboard Overview"}
              {activeTab === "products" && "Product Catalog Editor"}
              {activeTab === "orders" && "Active Order Manager"}
              {activeTab === "customers" && "Registered Customers"}
              {activeTab === "console" && "Super Admin Command Center"}
            </h1>
            <p className="text-xs text-gray-400 font-medium">Logged in as Super Admin | zafraanbdofficial@gmail.com</p>
          </div>
          
          <div className="text-xs font-bold bg-white px-4 py-2 rounded border border-black/5 shadow-xs flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Prisma & Supabase Live
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
              <div className="bg-white p-6 border border-black/5 rounded shadow-xs lg:col-span-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#111111] mb-6">Sales Growth Trend (2026)</h3>
                
                {/* SVG Graph Graphic */}
                <div className="w-full h-64 bg-gray-50/50 rounded border border-dashed border-black/10 flex items-center justify-center p-4 relative">
                  <svg className="w-full h-full" viewBox="0 0 600 200" fill="none">
                    <line x1="0" y1="50" x2="600" y2="50" stroke="#f0f0f0" strokeWidth="1" />
                    <line x1="0" y1="100" x2="600" y2="100" stroke="#f0f0f0" strokeWidth="1" />
                    <line x1="0" y1="150" x2="600" y2="150" stroke="#f0f0f0" strokeWidth="1" />
                    
                    <path
                      d="M 20 180 L 120 150 L 220 160 L 320 100 L 420 70 L 520 40 L 520 200 L 20 200 Z"
                      fill="url(#gradient-maroon)"
                      opacity="0.08"
                    />

                    <path
                      d="M 20 180 L 120 150 L 220 160 L 320 100 L 420 70 L 520 40"
                      stroke="#5B112B"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <circle cx="20" cy="180" r="4.5" fill="#D4AF37" stroke="#5B112B" strokeWidth="2" />
                    <circle cx="120" cy="150" r="4.5" fill="#D4AF37" stroke="#5B112B" strokeWidth="2" />
                    <circle cx="220" cy="160" r="4.5" fill="#D4AF37" stroke="#5B112B" strokeWidth="2" />
                    <circle cx="320" cy="100" r="4.5" fill="#D4AF37" stroke="#5B112B" strokeWidth="2" />
                    <circle cx="420" cy="70" r="4.5" fill="#D4AF37" stroke="#5B112B" strokeWidth="2" />
                    <circle cx="520" cy="40" r="4.5" fill="#D4AF37" stroke="#5B112B" strokeWidth="2" />

                    <defs>
                      <linearGradient id="gradient-maroon" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#5B112B" />
                        <stop offset="100%" stopColor="#FFFFFF" />
                      </linearGradient>
                    </defs>
                  </svg>

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

              {/* Console Logs Preview */}
              <div className="bg-white p-6 border border-black/5 rounded shadow-xs flex flex-col">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#111111] mb-6">Recent Operations</h3>
                <div className="flex flex-col gap-3.5 flex-grow font-mono text-[10px] text-gray-500">
                  {consoleLogs.slice(0, 5).map((log, idx) => (
                    <div key={idx} className="break-all border-b border-black/5 pb-2 last:border-0 last:pb-0">
                      {log}
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

        {/* -------------------- TAB: COMMAND CENTER (ALL POWER) -------------------- */}
        {activeTab === "console" && (
          <div className="flex flex-col gap-8 animate-fade-in text-[#111111]">
            
            {/* Core Console Controls Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1: System Backup */}
              <div className="bg-white p-6 border border-black/5 rounded shadow-xs flex flex-col justify-between min-h-[180px]">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Back-end Data Archival</h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed font-semibold">
                    Generate an instant encrypted SQL backup of all Supabase schemas and upload to secure offsite vault.
                  </p>
                </div>
                
                <div className="mt-4">
                  {backupProgress !== null ? (
                    <div className="w-full bg-gray-100 h-2 rounded overflow-hidden mb-3">
                      <div
                        className="bg-[#5B112B] h-full transition-all duration-300"
                        style={{ width: `${backupProgress}%` }}
                      ></div>
                    </div>
                  ) : null}
                  <button
                    onClick={triggerBackup}
                    disabled={backupProgress !== null}
                    className="w-full bg-[#5B112B] hover:bg-[#3d0b1d] text-white text-[10px] font-bold tracking-widest uppercase py-2.5 rounded-sm transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {backupProgress !== null ? "Backing Up..." : "Trigger System Backup"}
                  </button>
                </div>
              </div>

              {/* Card 2: Database Catalog Reset */}
              <div className="bg-white p-6 border border-black/5 rounded shadow-xs flex flex-col justify-between min-h-[180px]">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Supabase Database Reset</h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed font-semibold">
                    Flush active product catalogs and re-seed Supabase tables with initial brand defaults.
                  </p>
                </div>
                <button
                  onClick={resetDatabase}
                  className="mt-4 w-full bg-[#FFFFFF] hover:bg-[#5B112B] hover:text-white text-[#5B112B] border border-[#5B112B] text-[10px] font-bold tracking-widest uppercase py-2.5 rounded-sm transition-all cursor-pointer"
                >
                  Reset & Re-Seed Catalog
                </button>
              </div>

              {/* Card 3: Maintenance Mode Toggle */}
              <div className="bg-white p-6 border border-black/5 rounded shadow-xs flex flex-col justify-between min-h-[180px]">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Storefront Accessibility</h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed font-semibold">
                    Toggle administrative maintenance block. When active, storefront customers will see a high-end maintenance screen.
                  </p>
                </div>
                
                <div className="mt-4 flex items-center justify-between gap-4 border-t border-black/5 pt-4">
                  <span className="text-[10px] font-bold text-[#111111] uppercase tracking-wider">
                    Maintenance: {isMaintenance ? "ACTIVE" : "OFF"}
                  </span>
                  <button
                    onClick={toggleMaintenance}
                    className={`px-6 py-2 rounded text-[9.5px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      isMaintenance
                        ? "bg-[#5B112B] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Toggle Mode
                  </button>
                </div>
              </div>

            </div>

            {/* Interactive System Output Console */}
            <div className="bg-[#111111] text-white p-6 rounded border border-white/5 shadow-2xl flex flex-col">
              <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#791b29] animate-pulse"></span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">Active Command Output Console</span>
                </div>
                <button
                  onClick={() => setConsoleLogs(["[SYS] Console cleared."])}
                  className="text-[9px] text-gray-400 hover:text-white uppercase font-bold tracking-wider hover:underline"
                >
                  Clear Console
                </button>
              </div>

              <div className="h-64 overflow-y-auto font-mono text-xs text-gray-300 leading-relaxed flex flex-col gap-2.5 pr-2">
                {consoleLogs.map((log, idx) => (
                  <div key={idx} className="break-all border-b border-white/5 pb-2 last:border-0">
                    <span className="text-gray-500 mr-2">zafraan-os:~$</span>
                    {log}
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </main>

    </div>
  );
}
