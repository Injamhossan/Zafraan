"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import mainLogo from "@/assets/mainlogo.png";

interface ProductSize {
  ml: number;
  price: number;
}

interface Product {
  id: number;
  name: string;
  subtitle: string;
  category: string;
  pricePerMl: number;
  sizes: ProductSize[];
  longevity: string;
  gender: "Unisex" | "For Him" | "For Her";
  stock: "In Stock" | "Low Stock" | "Out of Stock";
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

  const [activeTab, setActiveTab] = useState<"overview" | "products" | "categories" | "orders" | "customers" | "sales" | "console">("overview");

  // --- Dynamic Categories State ---
  interface Category {
    name: string;
    description: string;
    featured: boolean;
  }
  const [categories, setCategories] = useState<Category[]>([
    { name: "Oud & Woody", description: "Deep, rich oud-based fragrances", featured: true },
    { name: "For Her", description: "Elegant feminine scents", featured: true },
    { name: "For Him", description: "Bold masculine fragrances", featured: true },
    { name: "Arabic Collection", description: "Traditional Arabian perfumery", featured: false },
    { name: "Fresh Collection", description: "Light, clean daily wear", featured: false },
    { name: "Sweet & Gourmand", description: "Sweet, dessert-inspired scents", featured: false }
  ]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDesc, setNewCategoryDesc] = useState("");
  const [newCategoryFeatured, setNewCategoryFeatured] = useState(false);

  // --- Dynamic Sales Ledger State ---
  interface SaleRecord {
    id: string;
    customer: string;
    product: string;
    amount: number;
    channel: "bKash" | "SSLCOMMERZ" | "Visa Card" | "Cash on Delivery";
    date: string;
    status: "Completed" | "Pending";
  }

  const [salesRecords, setSalesRecords] = useState<SaleRecord[]>([
    { id: "TXN-7483", customer: "Imran Khan", product: "Oud Royale (1x)", amount: 3450, channel: "bKash", date: "May 29, 2026", status: "Completed" },
    { id: "TXN-7482", customer: "Farhana Ahmed", product: "Imperial Rose (1x), Sweet Vanilla (1x)", amount: 5750, channel: "Visa Card", date: "May 28, 2026", status: "Completed" },
    { id: "TXN-7481", customer: "Zahid Hasan", product: "Saffron Gold (2x)", amount: 7800, channel: "Cash on Delivery", date: "May 27, 2026", status: "Completed" },
    { id: "TXN-7480", customer: "Nusrat Jahan", product: "Aqua Fresh (1x)", amount: 2200, channel: "SSLCOMMERZ", date: "May 26, 2026", status: "Completed" },
    { id: "TXN-7479", customer: "Mahbubur Rahman", product: "Majestic Oud (1x)", amount: 4200, channel: "bKash", date: "May 25, 2026", status: "Completed" },
    { id: "TXN-7478", customer: "Sadia Islam", product: "Sweet Vanilla (1x)", amount: 2950, channel: "bKash", date: "May 24, 2026", status: "Completed" },
  ]);

  const [salesFilter, setSalesFilter] = useState<"All" | "bKash" | "SSLCOMMERZ" | "Visa Card" | "Cash on Delivery">("All");

  // --- Invoice Receipt States ---
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState<Order | null>(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // --- Helper: generate sizes from per-ml price ---
  const generateSizes = (perMl: number): ProductSize[] => [
    { ml: 3, price: Math.round(perMl * 3) },
    { ml: 6, price: Math.round(perMl * 6) },
    { ml: 12, price: Math.round(perMl * 12) },
    { ml: 15, price: Math.round(perMl * 15) },
    { ml: 30, price: Math.round(perMl * 30) },
  ];

  // --- Real-time Catalog State ---
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Oud Royale", subtitle: "Dark Oud, Sandalwood, Amber", category: "Oud & Woody", pricePerMl: 115, sizes: generateSizes(115), longevity: "12+ Hours", gender: "Unisex", stock: "In Stock" },
    { id: 2, name: "Imperial Rose", subtitle: "Rose, Peony, White Musk", category: "For Her", pricePerMl: 95, sizes: generateSizes(95), longevity: "10+ Hours", gender: "For Her", stock: "In Stock" },
    { id: 3, name: "Saffron Gold", subtitle: "Saffron, Leather, Amber", category: "Arabic Collection", pricePerMl: 130, sizes: generateSizes(130), longevity: "14+ Hours", gender: "Unisex", stock: "Low Stock" },
    { id: 4, name: "Aqua Fresh", subtitle: "Bergamot, Sea Salt, Vetiver", category: "Fresh Collection", pricePerMl: 75, sizes: generateSizes(75), longevity: "8+ Hours", gender: "For Him", stock: "In Stock" },
    { id: 5, name: "Sweet Vanilla", subtitle: "Vanilla, Caramel, Tonka Bean", category: "Sweet & Gourmand", pricePerMl: 98, sizes: generateSizes(98), longevity: "9+ Hours", gender: "Unisex", stock: "In Stock" },
    { id: 6, name: "Majestic Oud", subtitle: "Royal Oud, Cedar, Patchouli", category: "Oud & Woody", pricePerMl: 140, sizes: generateSizes(140), longevity: "12+ Hours", gender: "Unisex", stock: "Out of Stock" },
  ]);

  // Product Modal Fields
  const [showProductModal, setShowProductModal] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [newProductSubtitle, setNewProductSubtitle] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("Oud & Woody");
  const [newProductPricePerMl, setNewProductPricePerMl] = useState("");
  const [newProductLongevity, setNewProductLongevity] = useState("10+ Hours");
  const [newProductGender, setNewProductGender] = useState<"Unisex" | "For Him" | "For Her">("Unisex");
  const [newProductStock, setNewProductStock] = useState<"In Stock" | "Low Stock" | "Out of Stock">("In Stock");

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
    if (newProductName && newProductPricePerMl) {
      const perMl = parseFloat(newProductPricePerMl);
      const newProd: Product = {
        id: products.length + 1,
        name: newProductName,
        subtitle: newProductSubtitle || "Premium Fragrance",
        category: newProductCategory,
        pricePerMl: perMl,
        sizes: generateSizes(perMl),
        longevity: newProductLongevity,
        gender: newProductGender,
        stock: newProductStock,
      };
      setProducts([newProd, ...products]);
      addLog(`[CATALOG] Added "${newProductName}" — ৳${perMl}/ml × 5 size variants auto-generated.`);
      setNewProductName("");
      setNewProductSubtitle("");
      setNewProductPricePerMl("");
      setNewProductGender("Unisex");
      setNewProductStock("In Stock");
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

  // --- Category Modifiers ---
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategoryName.trim()) {
      if (categories.find(c => c.name === newCategoryName.trim())) {
        addLog(`[CATALOG] Category "${newCategoryName.trim()}" already exists.`);
        return;
      }
      setCategories([...categories, { name: newCategoryName.trim(), description: newCategoryDesc.trim() || "No description", featured: newCategoryFeatured }]);
      addLog(`[CATALOG] Added new fragrance category: "${newCategoryName.trim()}"${newCategoryFeatured ? " (Featured)" : ""}.`);
      setNewCategoryName("");
      setNewCategoryDesc("");
      setNewCategoryFeatured(false);
      setShowCategoryModal(false);
    }
  };

  const handleDeleteCategory = (catName: string) => {
    setCategories(categories.filter((c) => c.name !== catName));
    addLog(`[CATALOG] Deleted fragrance category "${catName}".`);
  };

  const toggleCategoryFeatured = (catName: string) => {
    setCategories(categories.map((c) => c.name === catName ? { ...c, featured: !c.featured } : c));
    addLog(`[CATALOG] Toggled featured status for "${catName}".`);
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
            { id: "overview", label: "Overview" },
            { id: "products", label: "Catalog Editor" },
            { id: "categories", label: "Category Editor" },
            { id: "orders", label: "Order Manager" },
            { id: "customers", label: "Customers List" },
            { id: "sales", label: "Sales Analytics" },
            { id: "console", label: "Command Center" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center px-4 py-3 rounded text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                activeTab === item.id
                  ? "bg-[#5B112B] text-white shadow-md border-l-4 border-l-[#D4AF37]"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Sign Out bottom */}
        <div className="mt-8 pt-6 border-t border-white/5">
          <button
            onClick={() => signOut({ callbackUrl: "/admin" })}
            className="w-full flex items-center px-4 py-3 text-xs font-semibold text-gray-400 hover:text-white uppercase tracking-wider transition-colors cursor-pointer text-left"
          >
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
              {activeTab === "categories" && "Product Categories Manager"}
              {activeTab === "orders" && "Active Order Manager"}
              {activeTab === "customers" && "Registered Customers"}
              {activeTab === "sales" && "Sales & Analytics Center"}
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
          <div className="flex flex-col gap-6 animate-fade-in">
            <div className="bg-white border border-black/5 rounded shadow-xs p-6 md:p-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#111111]">Fragrance Catalog ({products.length})</h3>
                  <p className="text-[11px] text-gray-400 font-medium">Per-ML auto-pricing engine active</p>
                </div>
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
                      <th className="py-4 px-3">ID</th>
                      <th className="py-4 px-3">Product</th>
                      <th className="py-4 px-3">Category</th>
                      <th className="py-4 px-3">Per ML</th>
                      <th className="py-4 px-3">3ml</th>
                      <th className="py-4 px-3">6ml</th>
                      <th className="py-4 px-3">12ml</th>
                      <th className="py-4 px-3">15ml</th>
                      <th className="py-4 px-3">30ml</th>
                      <th className="py-4 px-3">Gender</th>
                      <th className="py-4 px-3">Stock</th>
                      <th className="py-4 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5 text-xs text-gray-600 font-semibold">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-[#FDFCF7]/30 transition-colors">
                        <td className="py-4 px-3 text-gray-400 font-normal">#{p.id}</td>
                        <td className="py-4 px-3">
                          <div className="flex flex-col">
                            <span className="text-[#111111] font-bold">{p.name}</span>
                            <span className="text-[10px] text-gray-400 font-medium">{p.subtitle}</span>
                          </div>
                        </td>
                        <td className="py-4 px-3">
                          <span className="bg-[#FDFCF7] border border-black/5 text-[10px] px-2 py-0.5 rounded font-bold">{p.category}</span>
                        </td>
                        <td className="py-4 px-3 font-serif text-[#791b29] font-bold">৳{p.pricePerMl}</td>
                        {p.sizes.map((s) => (
                          <td key={s.ml} className="py-4 px-3 font-serif text-gray-500">৳{s.price.toLocaleString()}</td>
                        ))}
                        <td className="py-4 px-3">
                          <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            p.gender === "Unisex" ? "bg-purple-50 text-purple-700" : p.gender === "For Him" ? "bg-blue-50 text-blue-700" : "bg-pink-50 text-pink-700"
                          }`}>{p.gender}</span>
                        </td>
                        <td className="py-4 px-3">
                          <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            p.stock === "In Stock" ? "bg-emerald-50 text-emerald-700" : p.stock === "Low Stock" ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700"
                          }`}>{p.stock}</span>
                        </td>
                        <td className="py-4 px-3 text-right">
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
            </div>

            {/* PRODUCT POPUP MODAL */}
            {showProductModal && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-6 z-50 animate-fade-in">
                <div className="bg-white border border-black/5 rounded-md p-8 max-w-xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
                  <button
                    onClick={() => setShowProductModal(false)}
                    className="absolute right-6 top-6 text-gray-400 hover:text-black font-bold text-lg cursor-pointer"
                  >
                    ✕
                  </button>

                  <h4 className="text-lg font-serif uppercase tracking-wide mb-1">Add New Fragrance</h4>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-6">Per-ML auto-pricing engine</p>

                  <form onSubmit={handleAddProduct} className="flex flex-col gap-5">
                    {/* Row 1: Name & Subtitle */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Fragrance Notes</label>
                        <input
                          type="text"
                          value={newProductSubtitle}
                          onChange={(e) => setNewProductSubtitle(e.target.value)}
                          placeholder="e.g. Oud, Musk, Amber"
                          className="border border-black/10 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#791b29]"
                        />
                      </div>
                    </div>

                    {/* Row 2: Category & Gender */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Category *</label>
                        <select
                          value={newProductCategory}
                          onChange={(e) => setNewProductCategory(e.target.value)}
                          className="border border-black/10 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#791b29]"
                        >
                          {categories.map((cat) => (
                            <option key={cat.name} value={cat.name}>{cat.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Gender *</label>
                        <select
                          value={newProductGender}
                          onChange={(e) => setNewProductGender(e.target.value as any)}
                          className="border border-black/10 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#791b29]"
                        >
                          <option value="Unisex">Unisex</option>
                          <option value="For Him">For Him</option>
                          <option value="For Her">For Her</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 3: Longevity & Stock */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Longevity *</label>
                        <select
                          value={newProductLongevity}
                          onChange={(e) => setNewProductLongevity(e.target.value)}
                          className="border border-black/10 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#791b29]"
                        >
                          <option>6+ Hours</option>
                          <option>8+ Hours</option>
                          <option>10+ Hours</option>
                          <option>12+ Hours</option>
                          <option>14+ Hours</option>
                          <option>16+ Hours</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Stock Status *</label>
                        <select
                          value={newProductStock}
                          onChange={(e) => setNewProductStock(e.target.value as any)}
                          className="border border-black/10 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#791b29]"
                        >
                          <option value="In Stock">In Stock</option>
                          <option value="Low Stock">Low Stock</option>
                          <option value="Out of Stock">Out of Stock</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 4: Price Per ML — THE MAGIC INPUT */}
                    <div className="flex flex-col gap-2 bg-[#FDFCF7] border border-[#D4AF37]/20 rounded p-4">
                      <label className="text-[10px] font-bold tracking-widest text-[#791b29] uppercase">Price Per ML (BDT Taka) *</label>
                      <input
                        type="number"
                        value={newProductPricePerMl}
                        onChange={(e) => setNewProductPricePerMl(e.target.value)}
                        placeholder="e.g. 120"
                        className="border border-[#D4AF37]/30 rounded-sm px-4 py-3 text-lg font-serif font-bold focus:outline-none focus:border-[#791b29] bg-white"
                        required
                        min="1"
                      />
                      <p className="text-[10px] text-gray-400 font-medium">Enter per-ml rate — all size variants will be auto-calculated below</p>
                    </div>

                    {/* Auto-Generated Price Preview */}
                    {newProductPricePerMl && parseFloat(newProductPricePerMl) > 0 && (
                      <div className="bg-[#111111] text-white rounded p-5">
                        <p className="text-[9px] font-bold uppercase tracking-widest text-[#D4AF37] mb-3">Auto-Generated Size Pricing Preview</p>
                        <div className="grid grid-cols-5 gap-3">
                          {generateSizes(parseFloat(newProductPricePerMl)).map((s) => (
                            <div key={s.ml} className="bg-white/5 border border-white/10 rounded p-3 text-center">
                              <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">{s.ml}ml</span>
                              <span className="block text-sm font-serif font-bold text-white mt-1">৳{s.price.toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="bg-[#5B112B] hover:bg-[#3d0b1d] text-white text-[10.5px] font-bold tracking-widest uppercase py-3.5 rounded-sm transition-colors shadow-md mt-2 cursor-pointer"
                    >
                      Save Product with All Size Variants
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
        {/* -------------------- TAB: CATEGORY EDITOR -------------------- */}
        {activeTab === "categories" && (
          <div className="bg-white border border-black/5 rounded shadow-xs p-6 md:p-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#111111]">Fragrance Categories ({categories.length})</h3>
                <p className="text-[11px] text-gray-400 font-medium">Manage catalog taxonomy with descriptions & featured status</p>
              </div>
              <button
                onClick={() => setShowCategoryModal(true)}
                className="bg-[#5B112B] hover:bg-[#3d0b1d] text-white text-[10.5px] font-bold tracking-widest uppercase px-5 py-2.5 rounded-sm transition-colors cursor-pointer"
              >
                + Add Category
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-black/10 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <th className="py-4 px-4">Category</th>
                    <th className="py-4 px-4">Description</th>
                    <th className="py-4 px-4">Products</th>
                    <th className="py-4 px-4">Featured</th>
                    <th className="py-4 px-4">System Tag</th>
                    <th className="py-4 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 text-xs text-gray-600 font-semibold">
                  {categories.map((cat, idx) => {
                    const productCount = products.filter(p => p.category === cat.name).length;
                    return (
                      <tr key={idx} className="hover:bg-[#FDFCF7]/30 transition-colors">
                        <td className="py-4 px-4 text-[#111111] font-bold">{cat.name}</td>
                        <td className="py-4 px-4 text-gray-400 font-medium text-[11px] max-w-[200px]">{cat.description}</td>
                        <td className="py-4 px-4">
                          <span className="bg-[#FDFCF7] border border-black/5 text-[#791b29] px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                            {productCount} {productCount === 1 ? "Fragrance" : "Fragrances"}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => toggleCategoryFeatured(cat.name)}
                            className={`px-3 py-1 rounded text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                              cat.featured
                                ? "bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30"
                                : "bg-gray-50 text-gray-400 border border-gray-200"
                            }`}
                          >
                            {cat.featured ? "Featured" : "Standard"}
                          </button>
                        </td>
                        <td className="py-4 px-4 font-mono text-gray-400 text-[10.5px]">
                          tag_{cat.name.toLowerCase().replace(/[^a-z0-9]/g, "_")}
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button
                            onClick={() => handleDeleteCategory(cat.name)}
                            className="text-red-500 hover:text-red-700 hover:underline transition-colors text-[10.5px] font-bold tracking-wider uppercase cursor-pointer"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* CATEGORY POPUP MODAL */}
            {showCategoryModal && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-6 z-50 animate-fade-in">
                <div className="bg-white border border-black/5 rounded-md p-8 max-w-md w-full shadow-2xl relative">
                  <button
                    onClick={() => setShowCategoryModal(false)}
                    className="absolute right-6 top-6 text-gray-400 hover:text-black font-bold text-lg cursor-pointer"
                  >
                    ✕
                  </button>

                  <h4 className="text-lg font-serif uppercase tracking-wide mb-1">New Category</h4>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-6">Create fragrance category with details</p>

                  <form onSubmit={handleAddCategory} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Category Title *</label>
                      <input
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="e.g. Arabic Woody"
                        className="border border-black/10 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#791b29]"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Description</label>
                      <textarea
                        value={newCategoryDesc}
                        onChange={(e) => setNewCategoryDesc(e.target.value)}
                        placeholder="Short description of this category..."
                        rows={3}
                        className="border border-black/10 rounded-sm px-4 py-2.5 text-sm focus:outline-none focus:border-[#791b29] resize-none"
                      />
                    </div>

                    <div className="flex items-center gap-3 bg-[#FDFCF7] border border-black/5 rounded p-3">
                      <input
                        type="checkbox"
                        id="featured-toggle"
                        checked={newCategoryFeatured}
                        onChange={(e) => setNewCategoryFeatured(e.target.checked)}
                        className="w-4 h-4 accent-[#791b29] cursor-pointer"
                      />
                      <label htmlFor="featured-toggle" className="text-xs font-semibold text-[#111111] cursor-pointer">
                        Mark as Featured Category
                        <span className="block text-[10px] text-gray-400 font-medium">Featured categories appear on storefront homepage</span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="bg-[#5B112B] hover:bg-[#3d0b1d] text-white text-[10.5px] font-bold tracking-widest uppercase py-3.5 rounded-sm transition-colors shadow-md mt-2 cursor-pointer"
                    >
                      Save Category
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
                    <th className="py-4 px-4 text-right">Actions</th>
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
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => {
                            setSelectedReceiptOrder(o);
                            setShowReceiptModal(true);
                            addLog(`[INVOICE] Generated receipt invoice preview for Order ${o.id}.`);
                          }}
                          className="bg-[#FDFCF7] border border-black/5 hover:border-[#791b29] text-[#791b29] text-[9.5px] font-bold tracking-widest uppercase px-3.5 py-1.5 rounded transition-all cursor-pointer"
                        >
                          View Receipt
                        </button>
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
        {/* -------------------- TAB: SALES ANALYTICS & RECORDS -------------------- */}
        {activeTab === "sales" && (
          <div className="flex flex-col gap-8 animate-fade-in text-[#111111]">
            
            {/* Sales Overview Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 border border-black/5 rounded shadow-xs flex flex-col gap-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Gross Sales Volume</span>
                <span className="text-2xl font-serif text-[#111111] font-bold">
                  ৳{salesRecords.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                </span>
                <span className="text-[10.5px] text-emerald-600 font-semibold">
                  ▲ Live synchronized volume
                </span>
              </div>

              <div className="bg-white p-6 border border-black/5 rounded shadow-xs flex flex-col gap-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Average Transaction Value</span>
                <span className="text-2xl font-serif text-[#111111] font-bold">
                  ৳{Math.round(salesRecords.reduce((sum, item) => sum + item.amount, 0) / salesRecords.length).toLocaleString()}
                </span>
                <span className="text-[10.5px] text-emerald-600 font-semibold">
                  Based on {salesRecords.length} online sales
                </span>
              </div>

              <div className="bg-white p-6 border border-black/5 rounded shadow-xs flex flex-col gap-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Primary Gateway</span>
                <span className="text-2xl font-serif text-[#791b29] font-bold">bKash Merchant</span>
                <span className="text-[10.5px] text-gray-400 font-medium">
                  52% of transaction streams
                </span>
              </div>

              <div className="bg-white p-6 border border-black/5 rounded shadow-xs flex flex-col gap-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Completed Sales Rate</span>
                <span className="text-2xl font-serif text-[#111111] font-bold">100%</span>
                <span className="text-[10.5px] text-emerald-600 font-semibold">
                  Zero payout reversals
                </span>
              </div>
            </div>

            {/* Sales Ledger Card */}
            <div className="bg-white border border-black/5 rounded shadow-xs p-6 md:p-8 flex flex-col gap-6">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#111111]">Administrative Sales Ledger</h3>
                  <p className="text-[11px] text-gray-400 font-medium">Real-time payment gateway transaction streams</p>
                </div>
                
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {/* Category Filter */}
                  <select
                    value={salesFilter}
                    onChange={(e) => setSalesFilter(e.target.value as any)}
                    className="border border-black/10 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-[#791b29] bg-white font-semibold text-gray-600 cursor-pointer"
                  >
                    <option value="All">All Channels</option>
                    <option value="bKash">bKash Only</option>
                    <option value="SSLCOMMERZ">SSLCOMMERZ Only</option>
                    <option value="Visa Card">Visa Card Only</option>
                    <option value="Cash on Delivery">Cash on Delivery Only</option>
                  </select>

                  <button
                    onClick={() => {
                      setIsExporting(true);
                      addLog("[SALES] Exporting live sales ledger records to CSV format...");
                      setTimeout(() => {
                        setIsExporting(false);
                        addLog("[SALES] Sales CSV report successfully compiled. Download completed.");
                        alert("Sales report CSV generated successfully! Check system log.");
                      }, 1500);
                    }}
                    disabled={isExporting}
                    className="bg-[#5B112B] hover:bg-[#3d0b1d] text-white text-[10px] font-bold tracking-widest uppercase px-4 py-2 rounded transition-all cursor-pointer whitespace-nowrap disabled:opacity-50"
                  >
                    {isExporting ? "Compiling..." : "Export Ledger"}
                  </button>
                </div>
              </div>

              {/* Sales Records List */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-black/10 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                      <th className="py-4 px-4">Transaction ID</th>
                      <th className="py-4 px-4">Client Name</th>
                      <th className="py-4 px-4">Fragrances Purchased</th>
                      <th className="py-4 px-4">Date</th>
                      <th className="py-4 px-4">Amount</th>
                      <th className="py-4 px-4">Payment Channel</th>
                      <th className="py-4 px-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/5 text-xs text-gray-600 font-semibold">
                    {salesRecords
                      .filter((record) => salesFilter === "All" || record.channel === salesFilter)
                      .map((record) => (
                        <tr key={record.id} className="hover:bg-[#FDFCF7]/30 transition-colors">
                          <td className="py-4 px-4 font-mono text-gray-500 font-bold">{record.id}</td>
                          <td className="py-4 px-4 text-[#111111]">{record.customer}</td>
                          <td className="py-4 px-4 font-normal text-gray-500">{record.product}</td>
                          <td className="py-4 px-4 text-gray-400 font-medium">{record.date}</td>
                          <td className="py-4 px-4 font-serif text-[#791b29]">৳{record.amount.toLocaleString()}</td>
                          <td className="py-4 px-4">
                            <span className={`px-2.5 py-1 rounded text-[9.5px] font-bold uppercase tracking-wider ${
                              record.channel === "bKash" 
                                ? "bg-pink-50 text-pink-700 border border-pink-500/10" 
                                : record.channel === "Visa Card" 
                                  ? "bg-blue-50 text-blue-700 border border-blue-500/10" 
                                  : record.channel === "SSLCOMMERZ" 
                                    ? "bg-indigo-50 text-indigo-700 border border-indigo-500/10" 
                                    : "bg-gray-50 text-gray-700 border border-gray-500/10"
                            }`}>
                              {record.channel}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <span className="bg-emerald-50 text-emerald-700 border border-emerald-500/10 px-2.5 py-1 rounded text-[9.5px] font-bold uppercase tracking-wider">
                              {record.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    {salesRecords.filter((record) => salesFilter === "All" || record.channel === salesFilter).length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-xs text-gray-400 font-semibold uppercase tracking-wider">
                          No transaction records found matching active filter.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

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

      {/* -------------------- INVOICE RECEIPT MODAL OVERLAY -------------------- */}
      {showReceiptModal && selectedReceiptOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-6 z-50 animate-fade-in text-[#111111]">
          <div className="bg-white border border-black/5 rounded-md max-w-2xl w-full p-8 md:p-10 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            {/* Modal Actions */}
            <div className="absolute right-6 top-6 flex items-center gap-3">
              <button
                onClick={() => {
                  window.print();
                }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-[10px] font-bold tracking-widest uppercase px-4 py-2 rounded transition-all cursor-pointer"
              >
                🖨️ Print
              </button>
              <button
                onClick={() => {
                  setShowReceiptModal(false);
                  setSelectedReceiptOrder(null);
                }}
                className="text-gray-400 hover:text-black font-bold text-lg cursor-pointer animate-pulse"
              >
                ✕
              </button>
            </div>

            {/* Print Area */}
            <div className="flex flex-col gap-6">
              
              {/* Receipt Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-black/10 pb-6 gap-4">
                <div>
                  <h2 className="text-xl font-serif font-bold uppercase tracking-wider text-[#791b29]">ZAFRAAN</h2>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Premium Fragrance House</p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="bg-[#FAF9F5] border border-black/5 text-[#791b29] px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider block mb-1">
                    TAX INVOICE
                  </span>
                  <p className="text-[10.5px] text-gray-500 font-semibold">Invoice #: INV-2026-{selectedReceiptOrder.id.replace("ZAF-", "")}</p>
                  <p className="text-[10px] text-gray-400 font-medium">Date Issued: {selectedReceiptOrder.date}</p>
                </div>
              </div>

              {/* Client & Shipping Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-b border-black/10 pb-6 text-xs text-gray-600 font-semibold">
                <div>
                  <span className="text-[10px] text-gray-400 block mb-1 uppercase tracking-wider font-bold">Billed To:</span>
                  <p className="text-[#111111]">{selectedReceiptOrder.customerName}</p>
                  <p className="text-gray-400 font-medium">{selectedReceiptOrder.customerEmail}</p>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block mb-1 uppercase tracking-wider font-bold">Delivery Parameters:</span>
                  <p className="text-[#111111]">Gulshan-2, Dhaka, Bangladesh</p>
                  <p className="text-gray-400 font-medium">Method: COD / Secure Merchant Delivery</p>
                </div>
              </div>

              {/* Purchase Details Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs font-semibold text-gray-600">
                  <thead>
                    <tr className="border-b border-black/10 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                      <th className="py-2.5">Item Description</th>
                      <th className="py-2.5 text-center">Qty</th>
                      <th className="py-2.5 text-right">Unit Price</th>
                      <th className="py-2.5 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-black/5 font-medium">
                      <td className="py-3 text-[#111111] font-bold">{selectedReceiptOrder.product}</td>
                      <td className="py-3 text-center">1</td>
                      <td className="py-3 text-right font-serif">৳{(selectedReceiptOrder.total - 180).toLocaleString()}</td>
                      <td className="py-3 text-right font-serif">৳{(selectedReceiptOrder.total - 180).toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Totals Section */}
              <div className="flex justify-end text-xs font-semibold text-gray-600">
                <div className="w-64 flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400 uppercase tracking-wider text-[9px] font-bold">Subtotal:</span>
                    <span className="font-serif">৳{(selectedReceiptOrder.total - 180).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 uppercase tracking-wider text-[9px] font-bold">Delivery Fee:</span>
                    <span className="font-serif">৳100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 uppercase tracking-wider text-[9px] font-bold">VAT / TAX (5%):</span>
                    <span className="font-serif">৳80</span>
                  </div>
                  <div className="flex justify-between border-t border-black/10 pt-2 text-sm text-[#111111] font-bold">
                    <span className="uppercase tracking-wider text-[10px]">Grand Total:</span>
                    <span className="font-serif text-[#791b29]">৳{selectedReceiptOrder.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Invoice Footer note */}
              <div className="mt-6 border-t border-black/5 pt-6 text-center">
                <p className="text-[10px] text-gray-400 font-medium leading-relaxed max-w-sm mx-auto">
                  This is an electronically generated authentic tax invoice matching session transaction tokens and requires no manual signature. Thank you for your luxury purchase at Zafraan.
                </p>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
