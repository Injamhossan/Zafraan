"use client";

import { useState } from "react";
import Link from "next/link";

interface FAQItem {
  question: string;
  answer: string;
  category: "shipping" | "fragrance" | "orders";
}

export default function FAQsPage() {
  const [activeCategory, setActiveCategory] = useState<"all" | "shipping" | "fragrance" | "orders">("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const faqs: FAQItem[] = [
    {
      category: "shipping",
      question: "Do you deliver all over Bangladesh?",
      answer: "Yes, we deliver nationwide to all districts in Bangladesh. We partner with leading courier services to ensure your luxury fragrance is delivered safely and swiftly directly to your doorstep."
    },
    {
      category: "shipping",
      question: "What are the delivery charges and timescales?",
      answer: "Inside Dhaka: Delivery is ৳80 and takes 1-2 business days. Outside Dhaka: Delivery is ৳150 and takes 3-4 business days. Express next-day delivery options are also available for selected zones upon request."
    },
    {
      category: "shipping",
      question: "How can I track my order status?",
      answer: "Once your order is dispatched, you will receive an SMS containing a tracking link and a unique courier ID. Alternatively, you can head over to our 'Track Order' page directly and insert your Order ID and email address to see real-time progress."
    },
    {
      category: "orders",
      question: "What payment methods do you accept?",
      answer: "We support Cash on Delivery (COD) across the country. Additionally, we accept secure payments via major mobile banking operators (bKash, Nagad, Rocket, Upay) as well as local Visa, Mastercard, and American Express cards."
    },
    {
      category: "orders",
      question: "Can I modify or cancel my order after placing it?",
      answer: "Orders are processed swiftly to ensure fast delivery. You can modify or cancel your order within 2 hours of placing it by contacting our helpline directly at +880 1234-567890. Once packaged or dispatched, changes cannot be made."
    },
    {
      category: "fragrance",
      question: "How long do Zafraan fragrances last?",
      answer: "Zafraan fragrances are blended as highly concentrated Extrait de Parfum and Eau de Parfum. Depending on the scent family (e.g. fresh vs. oriental oud), skin type, and environmental factors, our perfumes last anywhere from 8 to 14+ hours on skin and even longer on fabrics."
    },
    {
      category: "fragrance",
      question: "Are your ingredients ethically sourced?",
      answer: "Absolutely. Zafraan is committed to sustainability and absolute purity. We source our rare oud oils, roses, and resins directly from ethical farming communities worldwide, ensuring premium quality while respecting the environment and fair-trade practices."
    },
    {
      category: "fragrance",
      question: "How should I store my Zafraan perfumes?",
      answer: "To preserve the delicate notes and long-term stability of the fragrance oil, keep your bottles in a cool, dry place away from direct sunlight, humidity, and extreme temperature fluctuations. A drawer or a vanity shelf is highly ideal."
    },
    {
      category: "orders",
      question: "What should I do if my perfume arrives damaged?",
      answer: "Please contact our customer support team immediately within 24 hours of delivery. Send clear photos or a short video of the damaged box or leaking bottle to hello@zafraan.com or call us. We will dispatch a brand-new replacement immediately at no extra cost to you."
    }
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen pt-20 pb-20">
      <div className="max-w-[800px] mx-auto px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-16 text-center">
          <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">
            <Link href="/" className="hover:text-[#791b29] transition-colors">Home</Link> &nbsp;/&nbsp; <span className="text-[#111111]">FAQs</span>
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-[#111111] uppercase tracking-wide mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            Find answers to common questions about our delivery, payments, returns, and premium scents.
          </p>
        </div>

        {/* Search Input */}
        <div className="mb-10 max-w-md mx-auto relative">
          <input
            type="text"
            placeholder="Search FAQs (e.g. 'oud', 'delivery', 'bKash')..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setOpenIndex(null);
            }}
            className="w-full border border-black/10 rounded-sm bg-white px-5 py-3 text-sm focus:outline-none focus:border-[#791b29] transition-colors placeholder-gray-300 shadow-sm"
          />
          <svg className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {[
            { id: "all", label: "All Questions" },
            { id: "shipping", label: "Shipping & Delivery" },
            { id: "orders", label: "Orders & Payments" },
            { id: "fragrance", label: "Fragrances & Longevity" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveCategory(tab.id as any);
                setOpenIndex(null);
              }}
              className={`px-5 py-2.5 text-[10.5px] font-bold tracking-wider uppercase rounded-sm border transition-all cursor-pointer ${
                activeCategory === tab.id
                  ? "bg-[#5B112B] border-[#5B112B] text-white shadow-sm"
                  : "bg-white border-black/5 hover:border-[#791b29] text-gray-500 hover:text-[#791b29]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Accordions */}
        {filteredFaqs.length > 0 ? (
          <div className="flex flex-col border border-black/5 rounded-md divide-y divide-black/5 overflow-hidden shadow-sm">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="bg-white hover:bg-[#FDFCF7]/30 transition-colors">
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                  >
                    <span className="text-xs md:text-sm font-bold text-[#111111] pr-4">
                      {faq.question}
                    </span>
                    <span className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full border border-black/5 text-[#791b29]">
                      {isOpen ? (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </span>
                  </button>
                  
                  {/* Collapsible Answer */}
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-[300px] border-t border-black/5" : "max-h-0"
                    }`}
                  >
                    <div className="px-6 py-5 bg-[#FDFCF7]/60 text-xs md:text-xs text-gray-500 leading-relaxed font-semibold">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed border-black/10 rounded-sm bg-[#FDFCF7]/30">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">No matching questions found.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="mt-4 text-xs font-bold text-[#791b29] hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Still Have Questions? */}
        <div className="mt-16 text-center bg-[#FDFCF7] border border-black/5 rounded-md p-8 shadow-sm">
          <h3 className="text-sm font-serif uppercase tracking-widest text-[#111111] mb-2">Still have questions?</h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto mb-6 leading-relaxed font-medium">
            If you didn't find the answers you were looking for, please don't hesitate to reach out to our team.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#5B112B] hover:bg-[#3d0b1d] text-white text-[10.5px] font-bold tracking-widest uppercase px-8 py-3.5 rounded-sm transition-colors shadow-sm"
          >
            Contact Customer Support
          </Link>
        </div>

      </div>
    </div>
  );
}
