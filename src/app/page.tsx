import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import BestsellersSection from "@/components/BestsellersSection";
import CategorySection from "@/components/CategorySection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#1A1A1A] font-sans selection:bg-[#D4AF37] selection:text-white">
      <Navbar />
      <HeroBanner />
      <BestsellersSection />
      <CategorySection />
    </div>
  );
}
