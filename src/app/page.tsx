import BottomActionSection from "@/components/BottomActionSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import PricingSection from "@/components/PricingSection";
import PublicHeader from "@/components/PublicHeader";
import TestimonialsSection from "@/components/TestimonialsSection";
import VisualDemoSection from "@/components/VisualDemoSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PublicHeader />

      <main>
        <HeroSection />
        <VisualDemoSection />
        <WhyChooseUsSection />
        <HowItWorksSection />
        <PricingSection />
        <TestimonialsSection />
        <FaqSection />
        <BottomActionSection />
      </main>

      <Footer />
    </div>
  );
}
