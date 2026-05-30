"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchIcon, BagIcon, UserIcon } from "./icons";
import mainLogo from "@/assets/mainlogo.png";

export default function Navbar() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) return null;

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "SHOP", href: "/shop" },
    { name: "COLLECTIONS", href: "/collections" },
    { name: "ABOUT US", href: "/about" },
    { name: "CONTACT", href: "/contact" },
    { name: "TRACK ORDER", href: "/track-order" },
  ];

  return (
    <div className="w-full bg-[#FFFFFF] border-b border-gray-100 relative z-50">
      <nav className="max-w-[1400px] mx-auto w-full px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image src={mainLogo} alt="Zafraan Logo" className="h-9 w-auto object-contain" />
          </Link>

          {/* Center Links */}
          <div className="hidden lg:flex items-center gap-10 text-[12px] font-bold tracking-widest text-gray-800">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`${
                    isActive 
                      ? "text-[#791b29] border-[#791b29]" 
                      : "hover:text-[#791b29] border-transparent"
                  } border-b-2 pb-1 transition-colors`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            <button className="text-gray-800 hover:text-[#791b29] transition-colors cursor-pointer">
              <SearchIcon />
            </button>
            <Link href="/my-account" className="text-gray-800 hover:text-[#791b29] transition-colors cursor-pointer">
              <UserIcon />
            </Link>
            <Link href="/shop" className="text-gray-800 hover:text-[#791b29] transition-colors relative cursor-pointer">
              <BagIcon />
              <span className="absolute -top-1.5 -right-2 bg-[#791b29] text-white text-[9px] font-bold w-[16px] h-[16px] flex items-center justify-center rounded-full">0</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
