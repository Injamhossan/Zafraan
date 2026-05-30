export default function TrackOrderPage() {
  return (
    <div className="bg-[#FFFFFF] min-h-screen pt-20 pb-20">
      <div className="max-w-[600px] mx-auto px-8">

        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">
            Customer Support
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-[#111111] uppercase tracking-wide mb-4">
            Track Your Order
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            Enter your Order ID and email address below to get a real-time update on your shipment.
          </p>
        </div>

        {/* Tracking Form Card */}
        <div className="bg-[#FDFCF7] border border-black/5 rounded-md p-8 md:p-12 shadow-sm">
          <form className="flex flex-col gap-6">
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold tracking-widest text-gray-500 uppercase">
                Order ID *
              </label>
              <input
                type="text"
                placeholder="e.g. ZAF-20260001"
                className="border border-black/10 rounded-sm bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#791b29] transition-colors placeholder-gray-300"
                required
              />
              <p className="text-[10px] text-gray-400">
                You can find your Order ID in your confirmation email.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold tracking-widest text-gray-500 uppercase">
                Email Address *
              </label>
              <input
                type="email"
                placeholder="hello@example.com"
                className="border border-black/10 rounded-sm bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#791b29] transition-colors placeholder-gray-300"
                required
              />
            </div>

            <button
              type="button"
              className="mt-2 w-full bg-[#5B112B] hover:bg-[#3d0b1d] text-white text-[11px] font-bold tracking-widest uppercase py-4 rounded-sm transition-colors shadow-md"
            >
              Track Order
            </button>
          </form>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-black/5"></div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-[#791b29]/20 flex items-center justify-center text-[#791b29]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#111111] mb-1">Order Confirmed</h4>
              <p className="text-[10px] text-gray-500">We've received your order and are preparing it.</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-[#791b29]/20 flex items-center justify-center text-[#791b29]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#111111] mb-1">Packed & Shipped</h4>
              <p className="text-[10px] text-gray-500">Your order is sealed and on its way.</p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-[#791b29]/20 flex items-center justify-center text-[#791b29]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#111111] mb-1">Delivered</h4>
              <p className="text-[10px] text-gray-500">Enjoy your Zafraan fragrance.</p>
            </div>
          </div>
        </div>

        {/* Help Note */}
        <p className="text-center text-xs text-gray-400 mt-10">
          Need help?{" "}
          <a href="/contact" className="text-[#791b29] hover:underline font-semibold">
            Contact our support team
          </a>
        </p>

      </div>
    </div>
  );
}
