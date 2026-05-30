// Navbar component
import Image from "next/image";
import { SearchIcon, BagIcon, UserIcon } from "./icons";
import mainLogo from "@/assets/mainlogo.png";

export default function Navbar() {
  return (
    <div className="w-full bg-[#FFFFFF] border-b border-gray-100 relative z-50">


      <nav className="max-w-[1400px] mx-auto w-full px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left Logo */}
          <div className="flex items-center gap-3">
            <Image src={mainLogo} alt="Zafraan Logo" className="h-9 w-auto object-contain" />
          </div>

          {/* Center Links */}
          <div className="hidden lg:flex items-center gap-10 text-[12px] font-bold tracking-widest text-gray-800">
            <a href="#" className="text-[#791b29] border-b-2 border-[#791b29] pb-1 transition-colors">HOME</a>
            <a href="#" className="hover:text-[#791b29] pb-1 border-b-2 border-transparent transition-colors">SHOP</a>
            <a href="#" className="hover:text-[#791b29] pb-1 border-b-2 border-transparent transition-colors">COLLECTIONS</a>
            <a href="#" className="hover:text-[#791b29] pb-1 border-b-2 border-transparent transition-colors">ABOUT US</a>
            <a href="#" className="hover:text-[#791b29] pb-1 border-b-2 border-transparent transition-colors">CONTACT</a>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            <button className="text-gray-800 hover:text-[#791b29] transition-colors">
              <SearchIcon />
            </button>
            <button className="text-gray-800 hover:text-[#791b29] transition-colors">
              <UserIcon />
            </button>
            <button className="text-gray-800 hover:text-[#791b29] transition-colors relative">
              <BagIcon />
              <span className="absolute -top-1.5 -right-2 bg-[#791b29] text-white text-[9px] font-bold w-[16px] h-[16px] flex items-center justify-center rounded-full">0</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
