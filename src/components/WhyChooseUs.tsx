export default function WhyChooseUs() {
  const benefits = [
    {
      title: "PREMIUM QUALITY",
      desc: "Imported Oils",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
        </svg>
      ),
    },
    {
      title: "LONG LASTING",
      desc: "8-12 Hours",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "ALCOHOL FREE",
      desc: "Skin Friendly",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "HANDCRAFTED",
      desc: "With Care",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75c-4.5 0-8.25-3.75-8.25-8.25S7.5 5.25 12 5.25s8.25 3.75 8.25 8.25-3.75 8.25-8.25 8.25z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5.25V2.25m0 0H9m3 0h3" />
        </svg>
      ),
    },
    {
      title: "SECURE PACKAGING",
      desc: "Luxury Unboxing",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      title: "FAST DELIVERY",
      desc: "All Over BD",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM15.75 18.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.116 60.116 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-12 md:py-16 px-8 max-w-[1400px] mx-auto relative z-20">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-xl md:text-2xl font-serif text-[#111111] mb-8 md:mb-12 text-center uppercase tracking-wider">
          Why Choose Zafraan?
        </h2>
        
        <div className="flex flex-wrap justify-center items-start w-full divide-x divide-black/10">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="flex flex-col items-center text-center px-4 md:px-8 mb-6 sm:mb-0 group">
              <div className="text-[#791b29] mb-4 transition-transform duration-300 group-hover:scale-110">
                {benefit.icon}
              </div>
              <h3 className="text-[#111111] text-[10px] md:text-xs font-bold tracking-widest uppercase mb-1">
                {benefit.title}
              </h3>
              <p className="text-gray-500 text-[10px] md:text-xs tracking-wider">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
