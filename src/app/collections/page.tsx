import Image from "next/image";
import Link from "next/link";

const collections = [
  {
    id: "signature",
    name: "Signature Collection",
    desc: "The quintessential Zafraan experience. Timeless, elegant, and universally admired.",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "oud",
    name: "Royal Oud Collection",
    desc: "Deep, rich, and textured. Sourced from the finest aged agarwood for an authentic Arabic aroma.",
    image: "https://images.unsplash.com/photo-1523293115678-d2900f52f5d2?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "floral",
    name: "Floral & Fresh",
    desc: "Light, uplifting notes of jasmine, rose, and citrus designed for everyday wear.",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=1200",
  }
];

export default function CollectionsPage() {
  return (
    <div className="bg-[#FFFFFF] min-h-screen pt-20 pb-20">
      <div className="max-w-[1400px] mx-auto px-8">
        
        {/* Header & Breadcrumb */}
        <div className="mb-16 text-center">
          <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">
            <Link href="/" className="hover:text-[#791b29] transition-colors">Home</Link> &nbsp;/&nbsp; <span className="text-[#111111]">Collections</span>
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-[#111111] uppercase tracking-wide max-w-2xl mx-auto">
            Curated Collections
          </h1>
          <p className="mt-6 text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
            Discover our carefully crafted scent profiles. Each collection is designed to evoke a unique mood, setting, and memory.
          </p>
        </div>

        {/* Collections Stack */}
        <div className="flex flex-col gap-20">
          {collections.map((collection, index) => (
            <div key={collection.id} className={`flex flex-col md:flex-row gap-10 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Image Side */}
              <div className="w-full md:w-1/2">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm shadow-md group">
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    unoptimized
                  />
                </div>
              </div>

              {/* Text Side */}
              <div className="w-full md:w-1/2 flex flex-col justify-center px-4 lg:px-12">
                <h2 className="text-2xl md:text-3xl font-serif text-[#111111] uppercase mb-4">
                  {collection.name}
                </h2>
                <div className="w-12 h-[1px] bg-[#791b29] mb-6"></div>
                <p className="text-sm text-gray-600 leading-relaxed mb-8">
                  {collection.desc}
                </p>
                <Link 
                  href="/shop" 
                  className="self-start px-8 py-3 bg-white border border-[#111111] text-[#111111] text-[10px] font-bold uppercase tracking-widest hover:bg-[#111111] hover:text-white transition-colors rounded-sm"
                >
                  Explore Collection
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
