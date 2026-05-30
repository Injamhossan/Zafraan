"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import mainLogo from "@/assets/mainlogo.png";
import bkash from "@/assets/payment/bkash.png";
import nagod from "@/assets/payment/nagod.jpeg";
import rocket from "@/assets/payment/rocket.png";
import upay from "@/assets/payment/upay.png";

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="w-full relative z-20 mt-16 border-t border-black/5">

      {/* 1. Newsletter Subscribe Bar */}
      <div className="bg-[#5B112B]">
        <div className="max-w-[700px] mx-auto px-8 py-10 flex flex-col items-center text-center gap-5">
          <div>
            <h3 className="text-white text-sm font-bold tracking-[0.25em] uppercase mb-1.5">
              Be The First To Know
            </h3>
            <p className="text-white/60 text-xs tracking-wide">
              Exclusive offers, new arrivals & more.
            </p>
          </div>

          {/* Subscribe Form */}
          <div className="w-full flex items-stretch max-w-[420px]">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-white/10 border border-white/20 px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-white/50 transition-colors rounded-l-sm"
            />
            <button className="bg-white text-[#5B112B] hover:bg-[#FDFCF7] text-[10px] font-bold tracking-widest uppercase px-6 py-2.5 transition-colors rounded-r-sm whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Footer links/details */}
      <div className="bg-[#FDFCF7]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-16 border-b border-black/5">

            {/* Col 1: Brand description and social */}
            <div className="lg:col-span-2 flex flex-col pr-0 lg:pr-10">
              {/* Zafraan Logo and text */}
              <div className="mb-6">
                <Image src={mainLogo} alt="Zafraan Logo" className="h-10 w-auto object-contain" />
              </div>

              <p className="text-gray-500 text-xs leading-relaxed max-w-sm mb-8 font-medium">
                Luxury fragrances crafted with passion to define your presence. Experience seamless support and elegance in every detail.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4 text-gray-500">
                <Link href="#" className="hover:text-[#791b29] transition-colors">
                  <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" /></svg>
                </Link>
                <Link href="#" className="hover:text-[#791b29] transition-colors">
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                </Link>
                <Link href="#" className="hover:text-[#791b29] transition-colors">
                  <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.53.02C13.84 0 15 1.12 15 2.44V6.2c.56-.47 1.25-.79 2.02-.85.34-.03.68-.03 1.02.01v2.96c-.34-.02-.68-.02-1.02.03-1 .14-1.84.72-2.3 1.55v6.62c0 2.47-2.02 4.48-4.5 4.48S5.72 17.02 5.72 14.5s2.02-4.48 4.5-4.48v2.96c-.84 0-1.52.68-1.52 1.52s.68 1.52 1.52 1.52 1.52-.68 1.52-1.52V.02h.79z" /></svg>
                </Link>
                <Link href="#" className="hover:text-[#791b29] transition-colors">
                  <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.517 0-9.388.507a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                </Link>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div className="flex flex-col">
              <h4 className="text-[#111111] text-[11px] font-bold tracking-[0.15em] uppercase mb-5">
                QUICK LINKS
              </h4>
              <div className="flex flex-col gap-3.5 text-gray-500 text-xs font-semibold">
                <Link href="/shop" className="hover:text-[#791b29] transition-colors">Shop</Link>
                <Link href="/collections" className="hover:text-[#791b29] transition-colors">Collections</Link>
                <Link href="/about" className="hover:text-[#791b29] transition-colors">About Us</Link>
                <Link href="/contact" className="hover:text-[#791b29] transition-colors">Contact Us</Link>
              </div>
            </div>

            {/* Col 3: Customer Care */}
            <div className="flex flex-col">
              <h4 className="text-[#111111] text-[11px] font-bold tracking-[0.15em] uppercase mb-5">
                CUSTOMER CARE
              </h4>
              <div className="flex flex-col gap-3.5 text-gray-500 text-xs font-semibold">
                <Link href="/my-account" className="hover:text-[#791b29] transition-colors">My Account</Link>
                <Link href="/track-order" className="hover:text-[#791b29] transition-colors">Track Order</Link>
                <Link href="/refund-returns" className="hover:text-[#791b29] transition-colors">Refund & Returns</Link>
                <Link href="/faqs" className="hover:text-[#791b29] transition-colors">FAQs</Link>
              </div>
            </div>

            {/* Col 4: Info / Contact */}
            <div className="flex flex-col">
              <h4 className="text-[#111111] text-[11px] font-bold tracking-[0.15em] uppercase mb-5">
                CONTACT US
              </h4>
              <div className="flex flex-col gap-4 text-gray-500 text-xs font-semibold">
                {/* Phone */}
                <div className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-[#791b29] mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M2.25 6.622kM2.25 9c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.802-5.14-4.117-6.942-6.942l1.293-.97c.362-.272.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.122z" /></svg>
                  <span>+88014010051694</span>
                </div>
                {/* Email */}
                <div className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-[#791b29] mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                  <span className="break-all">zafraanbdofficial@gmail.com</span>
                </div>
                {/* Address */}
                <div className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-[#791b29] mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z" /></svg>
                  <span>Mirpur 1, Dhaka, Bangladesh</span>
                </div>
              </div>
            </div>

          </div>

          {/* 3. Bottom bar - Copyright & Payments */}
          <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-gray-400 text-[10.5px] font-semibold tracking-wider">
              &copy; 2026 ZAFRAAN. All rights reserved.
            </span>

            {/* Payment Gateways - Real Logos */}
            <div className="flex items-center gap-3">
              <div className="px-2 py-1 bg-white border border-black/5 rounded shadow-sm flex items-center justify-center h-8 w-14 overflow-hidden">
                <Image src={bkash} alt="bKash" className="h-5 w-auto object-contain" />
              </div>
              <div className="px-2 py-1 bg-white border border-black/5 rounded shadow-sm flex items-center justify-center h-8 w-14 overflow-hidden">
                <Image src={nagod} alt="Nagad" className="h-5 w-auto object-contain" />
              </div>
              <div className="px-2 py-1 bg-white border border-black/5 rounded shadow-sm flex items-center justify-center h-8 w-14 overflow-hidden">
                <Image src={rocket} alt="Rocket" className="h-5 w-auto object-contain" />
              </div>
              <div className="px-2 py-1 bg-white border border-black/5 rounded shadow-sm flex items-center justify-center h-8 w-14 overflow-hidden">
                <Image src={upay} alt="Upay" className="h-5 w-auto object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
