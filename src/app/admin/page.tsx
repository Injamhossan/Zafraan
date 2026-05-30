"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import mainLogo from "@/assets/mainlogo.png";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (email === "zafraanbdofficial@gmail.com" && password === "admin123") {
      setIsLoading(true);
      // Simulate verification latency
      setTimeout(() => {
        setIsLoading(false);
        router.push("/admin/dashboard");
      }, 1000);
    } else {
      setError("Invalid administrative credentials or security PIN.");
    }
  };

  const handleQuickLogin = () => {
    setEmail("zafraanbdofficial@gmail.com");
    setPassword("admin123");
  };

  return (
    <div className="bg-[#121212] min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 left-1/4 w-[350px] h-[350px] rounded-full bg-[#791b29]/10 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] rounded-full bg-[#D4AF37]/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-[420px] w-full z-10 flex flex-col items-center">
        
        {/* Brand Logo & Back to Shop */}
        <div className="mb-10 text-center flex flex-col items-center gap-4">
          <Link href="/" className="inline-block transition-transform hover:scale-95 duration-300">
            <Image src={mainLogo} alt="Zafraan Logo" className="h-10 w-auto object-contain invert brightness-0" />
          </Link>
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#D4AF37] uppercase">
            Administrative Portal
          </span>
        </div>

        {/* Login Form Box */}
        <div className="w-full bg-[#1A1A1A] border border-white/5 rounded-md p-8 md:p-10 shadow-2xl">
          <h2 className="text-xl font-serif text-white uppercase tracking-wide mb-2 text-center">System Access</h2>
          <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold text-center mb-8">Secure multi-factor portal</p>

          {error && (
            <div className="mb-6 p-4 bg-red-950/40 border border-red-500/20 text-red-400 text-xs font-semibold rounded-sm animate-fade-in text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                Admin Username / Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="zafraanbdofficial@gmail.com"
                className="border border-white/10 rounded-sm bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:bg-white/10 transition-all placeholder-gray-600"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                Security Access PIN
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••"
                className="border border-white/10 rounded-sm bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] focus:bg-white/10 transition-all placeholder-gray-600 tracking-[0.3em]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 w-full bg-[#5B112B] hover:bg-[#791b29] text-white text-[11px] font-bold tracking-widest uppercase py-4 rounded-sm transition-colors shadow-lg cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : null}
              Authenticate Access
            </button>
          </form>

          {/* Quick Predefined Tooltip / Credentials Fill */}
          <div className="mt-8 border-t border-white/5 pt-6 text-center">
            <p className="text-[10px] text-gray-500 font-semibold mb-3">TESTING CREDENTIALS</p>
            <button
              onClick={handleQuickLogin}
              className="inline-flex flex-col items-center gap-1.5 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 rounded text-[11px] text-[#D4AF37] font-semibold transition-all cursor-pointer shadow-sm w-full"
            >
              <span>Autofill Dev Admin Access</span>
              <span className="text-[9px] text-gray-500 font-medium">zafraanbdofficial@gmail.com / admin123</span>
            </button>
          </div>
        </div>

        {/* Back Link */}
        <Link href="/" className="mt-8 text-xs text-gray-500 hover:text-white transition-colors flex items-center gap-2 font-medium">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
          Return to Customer Storefront
        </Link>

      </div>
    </div>
  );
}
