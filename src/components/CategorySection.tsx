import Link from "next/link";

const categories = [
  {
    id: "male",
    title: "FOR HIM",
    subtitle: "Bold & Distinctive",
    image: "https://images.unsplash.com/photo-1594035987173-16c8280f5855?auto=format&fit=crop&q=80&w=800",
    href: "#",
  },
  {
    id: "female",
    title: "FOR HER",
    subtitle: "Elegant & Graceful",
    image: "https://images.unsplash.com/photo-1595425970377-c9703cc48a7e?auto=format&fit=crop&q=80&w=800",
    href: "#",
  },
  {
    id: "fresh",
    title: "FRESH",
    subtitle: "Light & Invigorating",
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=800",
    href: "#",
  },
];

export default function CategorySection() {
  return (
    <section className="py-24 px-8 max-w-[1600px] mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-light tracking-[0.15em] text-[#791b29] mb-4">
          SHOP BY CATEGORY
        </h2>
        <div className="w-24 h-[2px] bg-[#D4AF37] mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={category.href}
            className="group relative h-[500px] overflow-hidden flex items-end justify-center pb-12 cursor-pointer"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('${category.image}')` }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-500" />
            
            {/* Content */}
            <div className="relative z-10 text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-white text-2xl font-light tracking-[0.2em] mb-2">
                {category.title}
              </h3>
              <p className="text-white/80 text-sm tracking-wider font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                {category.subtitle}
              </p>
              <div className="mt-6 mx-auto w-12 h-[1px] bg-white/50 group-hover:bg-white group-hover:w-24 transition-all duration-500"></div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
