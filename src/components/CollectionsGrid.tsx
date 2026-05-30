import Link from "next/link";

const collections = [
  {
    id: "sweet",
    title: "SWEET",
    subtitle: "COLLECTION",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=600",
    href: "#",
  },
  {
    id: "fresh",
    title: "FRESH",
    subtitle: "COLLECTION",
    image: "https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&q=80&w=600",
    href: "#",
  },
  {
    id: "woody",
    title: "WOODY",
    subtitle: "COLLECTION",
    image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&q=80&w=600",
    href: "#",
  },
  {
    id: "oud",
    title: "OUD",
    subtitle: "COLLECTION",
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=600",
    href: "#",
  },
  {
    id: "floral",
    title: "FLORAL",
    subtitle: "COLLECTION",
    image: "https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&q=80&w=600",
    href: "#",
  },
];

export default function CollectionsGrid() {
  return (
    <section className="py-16 px-8 max-w-[1400px] mx-auto relative z-20">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {collections.map((collection) => (
          <Link
            key={collection.id}
            href={collection.href}
            className="group relative aspect-square w-full overflow-hidden rounded-2xl cursor-pointer shadow-md border border-black/5"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ backgroundImage: `url('${collection.image}')` }}
            />
            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 group-hover:from-black/90 group-hover:via-black/50 transition-colors duration-500" />
            
            {/* Content Container */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <h3 className="text-white text-xl font-serif tracking-[0.1em] mb-0.5">
                  {collection.title}
                </h3>
                <p className="text-white/60 text-[10px] tracking-[0.2em] font-semibold mb-6">
                  {collection.subtitle}
                </p>
                <div className="flex items-center gap-1.5 text-white/95 text-[10px] font-bold tracking-widest uppercase transition-all duration-300 group-hover:text-[#D4AF37]">
                  <span>Shop Now</span>
                  <span className="transform translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300">&rarr;</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
