import Link from "next/link";

export default function RefundReturnsPage() {
  return (
    <div className="bg-[#FFFFFF] min-h-screen pt-20 pb-20">
      <div className="max-w-[850px] mx-auto px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-16 text-center">
          <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">
            <Link href="/" className="hover:text-[#791b29] transition-colors">Home</Link> &nbsp;/&nbsp; <span className="text-[#111111]">Refund & Returns</span>
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-[#111111] uppercase tracking-wide">
            Refund & Returns
          </h1>
        </div>

        {/* Policy Content */}
        <div className="flex flex-col gap-12 text-[#111111]">
          
          {/* Quick Summary Callout */}
          <div className="bg-[#FDFCF7] border border-[#791b29]/10 border-l-4 border-l-[#791b29] p-6 rounded-r-sm">
            <p className="text-xs text-[#791b29] font-bold tracking-widest uppercase mb-2">Our Quality Commitment</p>
            <p className="text-xs text-gray-600 leading-relaxed font-medium">
              We want you to be absolutely delighted with your Zafraan fragrance. If you are not entirely satisfied with your purchase, we are here to help. We offer a <strong>7-day return and exchange policy</strong> for all unused and sealed products.
            </p>
          </div>

          {/* Section 1 */}
          <div>
            <h2 className="text-lg md:text-xl font-serif uppercase mb-4">1. Eligibility Criteria for Returns</h2>
            <div className="w-8 h-[1px] bg-[#791b29] mb-4"></div>
            <p className="text-xs text-gray-600 leading-relaxed mb-3 font-medium">
              To be eligible for a return or exchange, your item must meet the following conditions:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-2 text-xs text-gray-600 font-medium">
              <li>The product must be completely unused, unopened, and in the same brand-new condition as received.</li>
              <li>The plastic cellophane wrap and safety seals must be fully intact and undamaged.</li>
              <li>The item must be in its original packaging (including outer box, sleeves, and tags).</li>
              <li>You must provide the original purchase invoice or receipt.</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-lg md:text-xl font-serif uppercase mb-4">2. Non-Returnable Items</h2>
            <div className="w-8 h-[1px] bg-[#791b29] mb-4"></div>
            <p className="text-xs text-gray-600 leading-relaxed font-medium">
              Certain types of items cannot be returned or refunded due to hygiene and health protection guidelines. These include:
            </p>
            <ul className="list-disc pl-5 mt-3 flex flex-col gap-2 text-xs text-gray-600 font-medium">
              <li>Discovery sets, samples, or individual miniature vials.</li>
              <li>Items purchased during clearance sales, promotional events, or using special coupon discounts.</li>
              <li>Products with damaged or removed plastic wrapping and security seals.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-lg md:text-xl font-serif uppercase mb-4">3. The Return Process</h2>
            <div className="w-8 h-[1px] bg-[#791b29] mb-4"></div>
            <p className="text-xs text-gray-600 leading-relaxed mb-4 font-medium">
              If your purchase meets all criteria, you can initiate a return by following these steps:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 border border-black/5 bg-[#FDFCF7] rounded-sm">
                <span className="text-xs font-bold text-[#791b29] uppercase tracking-wider block mb-2">Step 1: Contact Us</span>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Email support at <a href="mailto:returns@zafraan.com" className="text-[#791b29] font-bold hover:underline">returns@zafraan.com</a> within 7 days of delivery, attaching photos of the sealed box and your invoice.
                </p>
              </div>
              <div className="p-5 border border-black/5 bg-[#FDFCF7] rounded-sm">
                <span className="text-xs font-bold text-[#791b29] uppercase tracking-wider block mb-2">Step 2: Ship Package</span>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Once your request is approved, package the item securely and ship it to our central hub or drop it off at our designated outlet.
                </p>
              </div>
              <div className="p-5 border border-black/5 bg-[#FDFCF7] rounded-sm">
                <span className="text-xs font-bold text-[#791b29] uppercase tracking-wider block mb-2">Step 3: Verification</span>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Our quality control team will inspect the item within 48 hours of receipt to ensure the seals are completely intact.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-lg md:text-xl font-serif uppercase mb-4">4. Refund Processing</h2>
            <div className="w-8 h-[1px] bg-[#791b29] mb-4"></div>
            <p className="text-xs text-gray-600 leading-relaxed font-medium">
              Upon approval of your returned product, your refund will be initiated:
            </p>
            <ul className="list-disc pl-5 mt-3 flex flex-col gap-2 text-xs text-gray-600 font-medium">
              <li><strong>Mobile Banking (bKash/Nagad):</strong> Processed within 3-5 business days.</li>
              <li><strong>Credit/Debit Cards:</strong> Processed within 7-10 banking days (depending on your issuing bank).</li>
              <li><strong>Delivery Charges:</strong> Please note that original delivery charges and return shipping fees are non-refundable unless the item is verified as faulty or damaged.</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-lg md:text-xl font-serif uppercase mb-4">5. Damaged, Faulty, or Incorrect Items</h2>
            <div className="w-8 h-[1px] bg-[#791b29] mb-4"></div>
            <p className="text-xs text-gray-600 leading-relaxed font-medium">
              If you receive an item that is damaged, leaks during transit, or is different from what you ordered, please contact us immediately (within 24 hours of receiving the parcel). We will arrange a free exchange or a full refund including shipping costs at no additional charge to you.
            </p>
          </div>

          {/* Contact Support */}
          <div className="border-t border-black/10 pt-10 text-center">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#111111] mb-2">Need immediate assistance with a return?</h3>
            <p className="text-xs text-gray-500 mb-6 font-semibold">
              Our dedicated customer support team is available from 10:00 AM to 8:00 PM every day to guide you through the process.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a href="tel:+8801234567890" className="bg-[#5B112B] hover:bg-[#3d0b1d] text-white text-[11px] font-bold tracking-widest uppercase px-8 py-3.5 rounded-sm transition-colors shadow-sm">
                Call +880 1234-567890
              </a>
              <Link href="/contact" className="border border-black/15 hover:border-[#791b29] text-gray-600 hover:text-[#791b29] text-[11px] font-bold tracking-widest uppercase px-8 py-3.5 rounded-sm transition-all">
                Contact Support Form
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
