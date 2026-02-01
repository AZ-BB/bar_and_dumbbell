import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhySection from "@/components/WhySection";
import FacilitiesSection from "@/components/FacilitiesSection";
import PricingSection, { type PlansData } from "@/components/PricingSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import ContactFormSection from "@/components/ContactFormSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getPlans } from "@/lib/cms";

export default async function Home() {
  const plans = (await getPlans()) as PlansData;

  return (
    <main>
      <Navbar />
      <HeroSection />
      <WhySection />
      <FacilitiesSection />
      <PricingSection plans={plans} />
      <GallerySection />
      <ContactSection />
      <ContactFormSection />
      <FinalCTA />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
