import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="bg-[#FFFFFF] min-h-screen pt-20 pb-20">
      <div className="max-w-[1200px] mx-auto px-8">
        
        {/* Header & Breadcrumb */}
        <div className="mb-16 text-center">
          <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">
            <Link href="/" className="hover:text-[#791b29] transition-colors">Home</Link> &nbsp;/&nbsp; <span className="text-[#111111]">Contact</span>
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-[#111111] uppercase tracking-wide">
            Get In Touch
          </h1>
          <p className="mt-4 text-sm text-gray-500 max-w-md mx-auto">
            Have a question about an order, a specific fragrance, or just want to say hello? We'd love to hear from you.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Contact Form */}
          <div className="w-full lg:w-3/5">
            <div className="bg-[#FDFCF7] border border-black/5 p-8 md:p-12 rounded-sm shadow-sm">
              <h2 className="text-xl font-serif text-[#111111] uppercase mb-8">Send a Message</h2>
              <form className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold tracking-widest text-gray-500 uppercase">First Name *</label>
                    <input type="text" className="border-b border-black/10 bg-transparent py-2 text-sm focus:outline-none focus:border-[#791b29] transition-colors" required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold tracking-widest text-gray-500 uppercase">Last Name *</label>
                    <input type="text" className="border-b border-black/10 bg-transparent py-2 text-sm focus:outline-none focus:border-[#791b29] transition-colors" required />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold tracking-widest text-gray-500 uppercase">Email Address *</label>
                  <input type="email" className="border-b border-black/10 bg-transparent py-2 text-sm focus:outline-none focus:border-[#791b29] transition-colors" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold tracking-widest text-gray-500 uppercase">Subject</label>
                  <input type="text" className="border-b border-black/10 bg-transparent py-2 text-sm focus:outline-none focus:border-[#791b29] transition-colors" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold tracking-widest text-gray-500 uppercase">Message *</label>
                  <textarea rows={4} className="border-b border-black/10 bg-transparent py-2 text-sm focus:outline-none focus:border-[#791b29] transition-colors resize-none" required></textarea>
                </div>
                <button type="button" className="mt-4 bg-[#111111] text-white text-[10px] font-bold tracking-widest uppercase px-8 py-4 transition-colors hover:bg-[#791b29] self-start rounded-sm shadow-md">
                  Submit Inquiry
                </button>
              </form>
            </div>
          </div>

          {/* Contact Details Side */}
          <div className="w-full lg:w-2/5 flex flex-col gap-10 justify-center">
            
            <div>
              <h3 className="text-sm font-bold tracking-widest text-[#111111] uppercase mb-4 border-b border-black/10 pb-2 inline-block">Contact Details</h3>
              <ul className="flex flex-col gap-6 mt-4">
                <li className="flex gap-4 items-start">
                  <svg className="w-5 h-5 text-[#791b29] mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M2.25 6.622kM2.25 9c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.802-5.14-4.117-6.942-6.942l1.293-.97c.362-.272.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.122z" /></svg>
                  <div>
                    <strong className="block text-xs uppercase tracking-wider text-[#111111] mb-1">Phone</strong>
                    <span className="text-sm text-gray-500">+880 1234-567890</span>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <svg className="w-5 h-5 text-[#791b29] mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                  <div>
                    <strong className="block text-xs uppercase tracking-wider text-[#111111] mb-1">Email</strong>
                    <span className="text-sm text-gray-500">hello@zafraan.com</span>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <svg className="w-5 h-5 text-[#791b29] mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z" /></svg>
                  <div>
                    <strong className="block text-xs uppercase tracking-wider text-[#111111] mb-1">Location</strong>
                    <span className="text-sm text-gray-500 leading-relaxed">Shop 07, Bashundhara City,<br/>Dhaka, Bangladesh</span>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold tracking-widest text-[#111111] uppercase mb-4 border-b border-black/10 pb-2 inline-block">Business Hours</h3>
              <ul className="flex flex-col gap-2 mt-4 text-sm text-gray-500">
                <li className="flex justify-between">
                  <span>Monday - Saturday:</span>
                  <span>10:00 AM - 8:00 PM</span>
                </li>
                <li className="flex justify-between text-[#791b29]">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
