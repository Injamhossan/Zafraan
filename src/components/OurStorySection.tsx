import Image from "next/image";

export default function OurStorySection() {
  return (
    <section className="py-12 px-8 max-w-[1400px] mx-auto relative z-20">
      <div className="w-full bg-[#13110E] border border-white/5 rounded-[20px] overflow-hidden shadow-2xl flex flex-col lg:flex-row items-stretch">
        
        {/* Left Text Content */}
        <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <p className="text-[#D4AF37] text-[11px] font-bold tracking-[0.25em] uppercase mb-4">
            Our Story
          </p>
          
          <h2 className="text-3xl md:text-[38px] font-serif text-white leading-[1.25] tracking-wide mb-6 uppercase">
            Crafting Emotions, <br />
            Delivering Memories.
          </h2>
          
          <div className="w-12 h-[1px] bg-white/25 mb-6"></div>
          
          <p className="text-gray-400 text-sm md:text-[14.5px] leading-relaxed max-w-[480px] mb-10 font-medium">
            ZAFRAAN was born from a passion to redefine luxury fragrances in Bangladesh. 
            We use premium imported oils, blended with perfection and delivered with a promise 
            that stays with you.
          </p>
          
          <div>
            <button className="px-8 py-3.5 bg-transparent border border-white/20 text-white text-xs font-bold tracking-widest uppercase hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300 rounded-sm">
              Discover Our Journey
            </button>
          </div>
        </div>

        {/* Right Image Container */}
        <div className="flex-1 min-h-[350px] lg:min-h-auto relative overflow-hidden">
          <Image
            src="/our-story.png"
            alt="Zafraan Premium Perfume Bottles"
            fill
            className="object-cover object-center transition-transform duration-700 hover:scale-102"
            priority
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}
