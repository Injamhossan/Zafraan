import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-[#FFFFFF] min-h-screen pt-20 pb-20">
      <div className="max-w-[1000px] mx-auto px-8">
        
        {/* Header & Breadcrumb */}
        <div className="mb-16 text-center">
          <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">
            <Link href="/" className="hover:text-[#791b29] transition-colors">Home</Link> &nbsp;/&nbsp; <span className="text-[#111111]">About Us</span>
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-[#111111] uppercase tracking-wide">
            Our Story
          </h1>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-16">
          
          {/* Top Banner Image */}
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-sm shadow-md">
            <Image
              src="https://images.unsplash.com/photo-1608528577891-eb0559d1ba98?auto=format&fit=crop&q=80&w=1600"
              alt="Zafraan Perfume Making"
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-serif text-[#111111] uppercase mb-4">A Legacy of Scent</h2>
              <div className="w-10 h-[1px] bg-[#791b29] mb-6"></div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                At Zafraan, we believe that a fragrance is more than just a scent—it is a signature, an invisible garment that dresses the soul. Born from a passion for authentic perfumery, our brand bridges the gap between ancient Middle Eastern traditions and modern luxury.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                We source only the finest raw materials from around the globe: pure oud from Assam, delicate rose from Taif, and rich spices that evoke memories of distant lands. Every bottle is a testament to our dedication to craftsmanship and quality.
              </p>
            </div>
            <div className="bg-[#FDFCF7] border border-black/5 p-10 text-center rounded-sm">
              <svg className="w-8 h-8 text-[#D4AF37] mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
              <h3 className="text-lg font-serif text-[#111111] uppercase mb-3">Our Mission</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                To create olfactory masterpieces that empower, inspire, and linger long after you leave the room. We don't just sell perfumes; we craft memories.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="pt-10 border-t border-black/10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div>
                <h4 className="text-[#111111] text-xs font-bold tracking-widest uppercase mb-2">Cruelty Free</h4>
                <p className="text-xs text-gray-500">Never tested on animals. Ethically sourced ingredients.</p>
              </div>
              <div>
                <h4 className="text-[#111111] text-xs font-bold tracking-widest uppercase mb-2">Premium Quality</h4>
                <p className="text-xs text-gray-500">Long-lasting formulations with high oil concentration.</p>
              </div>
              <div>
                <h4 className="text-[#111111] text-xs font-bold tracking-widest uppercase mb-2">Artisan Crafted</h4>
                <p className="text-xs text-gray-500">Blended and packaged with meticulous attention to detail.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
