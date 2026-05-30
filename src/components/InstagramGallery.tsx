import Image from "next/image";
import Link from "next/link";

const galleryItems = [
  "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1595425970377-c9703cc48a7e?auto=format&fit=crop&q=80&w=400",
  "https://images.unsplash.com/photo-1523293115678-d2900f52f5d2?auto=format&fit=crop&q=80&w=400",
];

export default function InstagramGallery() {
  return (
    <section className="py-12 md:py-16 px-8 max-w-[1400px] mx-auto relative z-20">
      
      <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
        {/* Header Section on Left */}
        <div className="lg:w-1/4 flex flex-col justify-center h-full pt-4">
          <h2 className="text-xl md:text-2xl font-serif text-[#111111] leading-tight uppercase mb-2">
            Follow Us On Instagram
          </h2>
          <a href="#" className="text-gray-500 text-sm font-medium hover:text-[#791b29] transition-colors">
            @zafraan.fragrances
          </a>
        </div>

        {/* Gallery Grid on Right */}
        <div className="lg:w-3/4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          
          {/* Images */}
          {galleryItems.map((img, index) => (
            <div
              key={index}
              className="group relative aspect-square w-full overflow-hidden rounded-md cursor-pointer shadow-sm border border-black/5"
            >
              <Image
                src={img}
                alt={`Zafraan Instagram feed item ${index + 1}`}
                fill
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </div>
            </div>
          ))}

          {/* CTA Box */}
          <Link
            href="#"
            className="group relative aspect-square w-full overflow-hidden rounded-md bg-[#5B112B] flex flex-col items-center justify-center p-4 text-center shadow-md transition-colors duration-300 hover:bg-[#3d0b1d] cursor-pointer"
          >
            <span className="text-white text-[10px] md:text-xs font-bold uppercase leading-relaxed mb-3">
              Join Our Fragrance Family
            </span>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white transition-transform duration-500 group-hover:scale-110">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}
