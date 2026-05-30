import Image from "next/image";
import bannerBg from "@/assets/banner 1.png";

const categoryItems = [
  {
    title: "FOR HIM",
    subtitle: "Bold & Confident",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2h4v3h-4z" /><path d="M7 5h10v2H7z" /><rect x="5" y="7" width="14" height="15" rx="3" /></svg>
  },
  {
    title: "FOR HER",
    subtitle: "Elegant & Timeless",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2h4v3h-4z" /><path d="M8 5h8v2H8z" /><circle cx="12" cy="14" r="8" /></svg>
  },
  {
    title: "ARABIC COLLECTION",
    subtitle: "Rich & Exotic",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2h4v3h-4z" /><path d="M12 5c-4 5-7 8-7 12a7 7 0 0 0 14 0c0-4-3-7-7-12z" /></svg>
  },
  {
    title: "FRESH COLLECTION",
    subtitle: "Light & Refreshing",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2h4v3h-4z" /><path d="M12 5l7 8-7 9-7-9 7-8z" /></svg>
  },
  {
    title: "SWEET & GOURMAND",
    subtitle: "Indulgent & Warm",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2h4v3h-4z" /><rect x="3" y="5" width="18" height="15" rx="4" /></svg>
  },
  {
    title: "OUD & WOODY",
    subtitle: "Deep & Intense",
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2h4v3h-4z" /><rect x="7" y="5" width="10" height="17" rx="2" /></svg>
  },
];

export default function HeroBanner() {
  return (
    <main className="relative w-full min-h-[500px] lg:min-h-[620px] isolate">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={bannerBg}
          alt="Hero Background"
          fill
          className="object-cover object-center lg:object-right"
          priority
        />
      </div>

      {/* Top Section with Content and Image */}
      <div className="max-w-[1400px] mx-auto w-full px-8 lg:px-16 pt-24 pb-16 lg:pt-36 lg:pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">

        {/* Left Pagination (Absolute positioning on large screens) */}
        <div className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 flex-col items-center gap-6 text-xs font-semibold text-gray-500">
          <span>01</span>
          <div className="w-[1px] h-12 bg-gray-400"></div>
          <span>03</span>
        </div>

        {/* Left Text Content */}
        <div className="flex flex-col z-10 pl-0 lg:pl-16">
          <p className="text-[11px] font-bold tracking-[0.2em] text-gray-600 uppercase mb-5">
            NOT JUST FRAGRANCE
          </p>

          <h1 className="text-5xl lg:text-[68px] font-serif text-[#111111] leading-[1.1] mb-6">
            A SIGNATURE <br />
            THAT DEFINES <span className="text-[#791b29]">YOU</span>
          </h1>

          <div className="w-16 h-[1px] bg-gray-400 mb-6"></div>

          <p className="text-gray-600 max-w-md text-[15px] leading-relaxed mb-10 font-medium">
            Premium perfumes crafted with rare ingredients to leave a lasting impression.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-3.5 bg-[#5B112B] text-white text-xs font-bold tracking-widest uppercase hover:bg-[#3d0b1d] transition-colors rounded-sm">
              Explore Collection
            </button>
            <button className="px-8 py-3.5 border border-[#5B112B] text-[#5B112B] text-xs font-bold tracking-widest uppercase hover:bg-[#5B112B]/5 transition-colors rounded-sm">
              Shop Bestsellers
            </button>
          </div>
        </div>

        {/* Right Space left empty to show the background image's product/graphic */}
        <div className="hidden lg:block w-full h-[250px] lg:h-[400px] pointer-events-none"></div>
      </div>

      {/* Floating Categories Bar */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full max-w-[1400px] px-8 z-30">
        <div className="bg-[#181818] rounded-xl py-10 px-4 md:px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-10 divide-x-0 lg:divide-x lg:divide-white/10 shadow-2xl">
          {categoryItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center px-4">
              <div className="mb-4 text-[#D4AF37]">
                {item.icon}
              </div>
              <h3 className="text-white text-[11px] font-bold tracking-widest uppercase mb-1.5">
                {item.title}
              </h3>
              <p className="text-gray-400 text-[10px] tracking-wide">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
