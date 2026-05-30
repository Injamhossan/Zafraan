import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: "vampire-blood",
    name: "VAMPIRE BLOOD",
    subtitle: "Dark Cherry, Vanilla, Musk",
    duration: "8-12H",
    gender: "Unisex",
    rating: 4.5,
    reviews: 250,
    price: "1,150",
    image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=600",
    badge: null,
  },
  {
    id: "khaamrah",
    name: "KHAAMRAH",
    subtitle: "Cinnamon, Praline, Vanilla",
    duration: "10-12H",
    gender: "Unisex",
    rating: 4.5,
    reviews: 150,
    price: "1,250",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600",
    badge: null,
  },
  {
    id: "oud-touch",
    name: "OUD TOUCH",
    subtitle: "Oud, Leather, Musk",
    duration: "10-14H",
    gender: "Unisex",
    rating: 5,
    reviews: 180,
    price: "1,250",
    image: "https://images.unsplash.com/photo-1523293115678-d2900f52f5d2?auto=format&fit=crop&q=80&w=600",
    badge: "BEST SELLER",
  },
  {
    id: "hawas-fire",
    name: "HAWAS FIRE",
    subtitle: "Pineapple, Amber, Woody",
    duration: "8-10H",
    gender: "Men",
    rating: 4.5,
    reviews: 90,
    price: "1,050",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600",
    badge: null,
  },
  {
    id: "bin-sheikh",
    name: "BIN SHEIKH",
    subtitle: "Woody, Spicy, Amber",
    duration: "8-15H",
    gender: "Men",
    rating: 4.5,
    reviews: 75,
    price: "1,050",
    image: "https://images.unsplash.com/photo-1595425970377-c9703cc48a7e?auto=format&fit=crop&q=80&w=600",
    badge: null,
  },
];

export default function BestsellersSection() {
  return (
    <section className="pt-32 pb-20 px-8 max-w-[1400px] mx-auto relative">
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
          href="/shop" 
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
            <div key={product.id} className="group relative bg-[#FDFBF7] rounded-xl flex flex-col shadow-sm border border-black/5 hover:shadow-md transition-shadow overflow-hidden">
              
              {/* Badge positioned above the card */}
              {product.badge && (
                <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20">
                  <span className="bg-[#5B112B] text-white text-[9px] font-bold tracking-widest uppercase px-4 py-1.5 shadow-md rounded-md whitespace-nowrap">
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Image Container - full bleed */}
              <div className="relative w-full aspect-[4/5] overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              </div>

              {/* Info Section */}
              <div className="flex flex-col text-left flex-1 p-4">
                <h3 className="text-[13px] font-bold text-[#111111] uppercase tracking-wide mb-1">
                  {product.name}
                </h3>
                <p className="text-[10px] text-gray-600 mb-3 line-clamp-1">{product.subtitle}</p>
                
                {/* Specs Row */}
                <div className="flex items-center gap-3 text-[9px] text-gray-500 font-medium mb-2">
                  <div className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{product.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>{product.gender}</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4 border-b border-black/5 pb-3">
                  <div className="flex text-[#D4AF37]">
                    {"★★★★★".split("").map((star, i) => (
                      <span key={i} className={`text-[10px] ${i < Math.floor(product.rating) ? 'opacity-100' : 'opacity-30'}`}>{star}</span>
                    ))}
                  </div>
                  <span className="text-[9px] text-gray-500 ml-1">({product.reviews})</span>
                </div>

                {/* Bottom: Price Box & Button */}
                <div className="mt-auto">
                  <div className="bg-white rounded px-3 py-2.5 mb-2 border border-black/5 flex items-center shadow-sm">
                    <span className="text-[#111111] text-xs font-bold font-sans">
                      ৳ {product.price}
                    </span>
                  </div>
                  <Link href={`/shop`} className="block w-full bg-[#5B112B] hover:bg-[#3d0b1d] text-white text-[10px] font-bold tracking-widest uppercase py-2.5 rounded text-center transition-colors shadow-sm">
                    Shop Now
                  </Link>
                </div>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
