import HeroBanner from "@/components/HeroBanner";
import BestsellersSection from "@/components/BestsellersSection";
import CollectionsGrid from "@/components/CollectionsGrid";
import OurStorySection from "@/components/OurStorySection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import InstagramGallery from "@/components/InstagramGallery";

export default function Home() {
  return (
    <div className="pb-16">
      <HeroBanner />
      <BestsellersSection />
      <CollectionsGrid />
      <OurStorySection />
      <WhyChooseUs />
      <Testimonials />
      <InstagramGallery />
    </div>
  );
}
