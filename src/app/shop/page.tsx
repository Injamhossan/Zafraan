import Image from "next/image";
import Link from "next/link";

const products = [
  { id: "vampire-blood", name: "Vampire Blood", subtitle: "Bold & Mysterious", price: "$120.00", image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=600", badge: null },
  { id: "golden-oud", name: "Golden Oud", subtitle: "Rich & Textured Wood", price: "$145.00", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600", badge: null },
  { id: "zafraan-gold", name: "Zafraan Gold", subtitle: "Rich Arabic Oud", price: "$150.00", image: "https://images.unsplash.com/photo-1523293115678-d2900f52f5d2?auto=format&fit=crop&q=80&w=600", badge: "Best Seller" },
  { id: "rose-elixir", name: "Rose Elixir", subtitle: "Sweet Floral", price: "$110.00", image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600", badge: null },
  { id: "oud-intense", name: "Oud Intense", subtitle: "Deep Woody Oriental", price: "$135.00", image: "https://images.unsplash.com/photo-1595425970377-c9703cc48a7e?auto=format&fit=crop&q=80&w=600", badge: null },
  { id: "midnight-musk", name: "Midnight Musk", subtitle: "Sensual & Deep", price: "$125.00", image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600", badge: "New Arrival" },
  { id: "desert-rose", name: "Desert Rose", subtitle: "Warm Floral", price: "$115.00", image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=600", badge: null },
  { id: "sandalwood-bliss", name: "Sandalwood Bliss", subtitle: "Creamy Wood", price: "$130.00", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600", badge: null },
];

export default function ShopPage() {
  return (
    <div className="bg-[#FFFFFF] min-h-screen pt-20 pb-20">
      <div className="max-w-[1400px] mx-auto px-8">
        
        {/* Header & Breadcrumb */}
        <div className="mb-12">
          <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">
            <Link href="/" className="hover:text-[#791b29] transition-colors">Home</Link> &nbsp;/&nbsp; <span className="text-[#111111]">Shop</span>
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-[#111111] uppercase tracking-wide">
            Our Collection
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Filter */}
          <aside className="w-full lg:w-1/4">
            <div className="sticky top-24">
              <h3 className="text-sm font-bold tracking-widest text-[#111111] uppercase mb-6 border-b border-black/10 pb-3">Filters</h3>
              
              {/* Categories */}
              <div className="mb-8">
                <h4 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-4">Category</h4>
                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 accent-[#791b29]" />
                    <span className="text-sm text-gray-600 group-hover:text-[#111111] transition-colors">Oud & Woods</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 accent-[#791b29]" />
                    <span className="text-sm text-gray-600 group-hover:text-[#111111] transition-colors">Floral & Fresh</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 accent-[#791b29]" />
                    <span className="text-sm text-gray-600 group-hover:text-[#111111] transition-colors">Signature Blends</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 accent-[#791b29]" />
                    <span className="text-sm text-gray-600 group-hover:text-[#111111] transition-colors">Travel Size</span>
                  </label>
                </div>
              </div>

              {/* Price */}
              <div>
                <h4 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-4">Price Range</h4>
                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="price" className="w-4 h-4 accent-[#791b29]" />
                    <span className="text-sm text-gray-600 group-hover:text-[#111111] transition-colors">All Prices</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="price" className="w-4 h-4 accent-[#791b29]" />
                    <span className="text-sm text-gray-600 group-hover:text-[#111111] transition-colors">Under $100</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="price" className="w-4 h-4 accent-[#791b29]" />
                    <span className="text-sm text-gray-600 group-hover:text-[#111111] transition-colors">$100 - $150</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="price" className="w-4 h-4 accent-[#791b29]" />
                    <span className="text-sm text-gray-600 group-hover:text-[#111111] transition-colors">Over $150</span>
                  </label>
                </div>
              </div>

            </div>
          </aside>

          {/* Product Grid */}
          <div className="w-full lg:w-3/4">
            <div className="flex justify-between items-center mb-6 text-sm text-gray-500">
              <p>Showing 8 of 24 products</p>
              <select className="border border-black/10 rounded-sm px-3 py-1.5 focus:outline-none focus:border-[#791b29] text-xs">
                <option>Sort by: Featured</option>
                <option>Sort by: Price, low to high</option>
                <option>Sort by: Price, high to low</option>
              </select>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
              {products.map((product) => (
                <div key={product.id} className="group flex flex-col relative">
                  {product.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                      <span className="bg-[#791b29] text-white text-[8px] md:text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 shadow-md rounded-sm whitespace-nowrap">
                        {product.badge}
                      </span>
                    </div>
                  )}

                  <div className="relative aspect-[3/4.2] w-full bg-[#F5F4F0]/90 rounded-sm overflow-hidden p-6 flex flex-col justify-between items-center transition-all duration-500 group-hover:scale-[1.02] group-hover:bg-[#EFEBDF] group-hover:shadow-md border border-black/5">
                    <div className="relative w-[85%] h-[80%] my-auto">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain object-center drop-shadow-xl transition-transform duration-700 group-hover:scale-105"
                        unoptimized
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                      <button className="w-full py-2.5 bg-white text-[#111111] hover:bg-[#791b29] hover:text-white text-[10px] font-bold tracking-widest uppercase transition-colors shadow-md rounded-sm">
                        Quick Add
                      </button>
                    </div>
                  </div>

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

            {/* Pagination */}
            <div className="flex justify-center mt-12 gap-2">
              <button className="w-10 h-10 border border-black/10 rounded-sm flex items-center justify-center hover:bg-black/5 transition-colors text-sm">1</button>
              <button className="w-10 h-10 bg-[#111111] text-white rounded-sm flex items-center justify-center shadow-md text-sm">2</button>
              <button className="w-10 h-10 border border-black/10 rounded-sm flex items-center justify-center hover:bg-black/5 transition-colors text-sm">3</button>
              <span className="flex items-end px-2">...</span>
              <button className="w-10 h-10 border border-black/10 rounded-sm flex items-center justify-center hover:bg-black/5 transition-colors">
                <svg className="w-4 h-4 text-[#111111]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
