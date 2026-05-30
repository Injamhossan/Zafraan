import Image from "next/image";

const testimonials = [
  {
    name: "Mehedi Hasan",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    rating: 5,
    text: "Amazing long lasting perfume. Highly recommended!",
  },
  {
    name: "Sadia Afrin",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    rating: 5,
    text: "Loved the packaging and the scent is just perfect.",
  },
  {
    name: "Rafid Islam",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
    rating: 5,
    text: "Authentic fragrance and great projection.",
  },
  {
    name: "Nusrat Jahan",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
    rating: 5,
    text: "Best perfume I've ever used. Will order again!",
  },
];

export default function Testimonials() {
  return (
    <section className="py-12 md:py-16 px-8 max-w-[1400px] mx-auto relative z-20">
      
      {/* Header Block */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <h2 className="text-xl md:text-2xl font-serif text-[#111111] mb-2 uppercase tracking-wider">
            What Our Customers Say
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-[#111111]">4.9</span>
            <div className="flex items-center text-[#D4AF37]">
              {"★★★★★".split("").map((star, i) => (
                <span key={i} className="text-sm">{star}</span>
              ))}
            </div>
            <span className="text-gray-500 text-xs font-medium">
              (2.3k+ Reviews)
            </span>
          </div>
        </div>
        
        {/* Navigation Arrows */}
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 border border-black/10 rounded flex items-center justify-center hover:bg-black/5 transition-colors">
            <svg className="w-5 h-5 text-[#111111]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="w-10 h-10 border border-black/10 rounded flex items-center justify-center hover:bg-black/5 transition-colors">
            <svg className="w-5 h-5 text-[#111111]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Grid List of Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((test, index) => (
          <div 
            key={index}
            className="bg-white border border-black/5 rounded-md p-6 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            {/* User Profile */}
            <div className="flex items-center gap-3 mb-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-black/5">
                <Image
                  src={test.avatar}
                  alt={test.name}
                  fill
                  className="object-cover object-center"
                  unoptimized
                />
              </div>
              <div className="flex flex-col">
                <h4 className="text-[#111111] text-xs font-bold uppercase">
                  {test.name}
                </h4>
                <span className="text-gray-500 text-[10px] font-medium">
                  Verified Buyer
                </span>
              </div>
            </div>
            
            {/* Rating Stars */}
            <div className="flex items-center text-[#D4AF37] mb-4">
              {Array.from({ length: test.rating }).map((_, i) => (
                <span key={i} className="text-sm">★</span>
              ))}
            </div>
            
            {/* Quote text */}
            <p className="text-gray-600 text-xs leading-relaxed font-medium min-h-[40px]">
              "{test.text}"
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
