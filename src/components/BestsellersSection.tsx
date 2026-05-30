import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: "vampire-blood",
    name: "Vampire Blood",
    subtitle: "Bold & Mysterious",
    price: "$120.00",
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=600",
    badge: null,
  },
  {
    id: "golden-oud",
    name: "Golden Oud",
    subtitle: "Rich & Textured Wood",
    price: "$145.00",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600",
    badge: null,
  },
  {
    id: "zafraan-gold",
    name: "Zafraan Gold",
    subtitle: "Rich Arabic Oud",
    price: "$150.00",
    image: "https://images.unsplash.com/photo-1523293115678-d2900f52f5d2?auto=format&fit=crop&q=80&w=600",
    badge: "Best Seller",
  },
  {
    id: "rose-elixir",
    name: "Rose Elixir",
    subtitle: "Sweet Floral",
    price: "$110.00",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600",
    badge: null,
  },
  {
    id: "oud-intense",
    name: "Oud Intense",
    subtitle: "Deep Woody Oriental",
    price: "$135.00",
    image: "https://images.unsplash.com/photo-1595425970377-c9703cc48a7e?auto=format&fit=crop&q=80&w=600",
    badge: null,
  },
];

export default function BestsellersSection() {
  return (
    <section className="pt-24 pb-20 px-8 max-w-[1400px] mx-auto relative">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <p className="text-[11px] font-bold tracking-[0.2em] text-gray-500 uppercase mb-2">
            OUR BESTSELLERS
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-[#111111] tracking-wide">
            MOST LOVED <span className="text-[#791b29]">FRAGRANCES</span>
          </h2>
        </div>
        
        <Link 
          href="#" 
          className="group flex items-center gap-2 text-xs font-bold tracking-widest text-[#791b29] uppercase hover:text-[#5B112B] transition-colors pb-1 border-b border-transparent hover:border-[#791b29]"
        >
          View All 
          <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
        </Link>
      </div>

      {/* Products Row with Navigation Arrows */}
      <div className="relative w-full px-4 md:px-8">
        {/* Left Navigation Arrow */}
        <button className="absolute -left-2 md:left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#5B112B] hover:bg-[#3d0b1d] text-white flex items-center justify-center transition-colors shadow-lg">
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Navigation Arrow */}
        <button className="absolute -right-2 md:right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#5B112B] hover:bg-[#3d0b1d] text-white flex items-center justify-center transition-colors shadow-lg">
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Product Cards Grid - 5 Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group flex flex-col relative">
              {/* "Best Seller" Badge positioned above the card */}
              {product.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                  <span className="bg-[#791b29] text-white text-[8px] md:text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 shadow-md rounded-sm whitespace-nowrap">
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Light-grey/cream Product Container */}
              <div className="relative aspect-[3/4.2] w-full bg-[#F5F4F0]/90 rounded-sm overflow-hidden p-6 flex flex-col justify-between items-center transition-all duration-500 group-hover:scale-[1.02] group-hover:bg-[#EFEBDF] group-hover:shadow-md border border-black/5">
                {/* Centered perfume bottle image */}
                <div className="relative w-[85%] h-[80%] my-auto">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain object-center drop-shadow-xl transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                  />
                </div>

                {/* Quick Add Overlay on Hover */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                  <button className="w-full py-2.5 bg-white text-[#111111] hover:bg-[#791b29] hover:text-white text-[10px] font-bold tracking-widest uppercase transition-colors shadow-md rounded-sm">
                    Quick Add
                  </button>
                </div>
              </div>

              {/* Info - Clean, minimalist styling */}
              <div className="flex flex-col mt-4 text-center">
                <h3 className="text-sm font-serif text-[#111111] mb-1 group-hover:text-[#791b29] transition-colors">
                  {product.name}
                </h3>
                <span className="text-xs font-bold text-[#791b29]">
                  {product.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
