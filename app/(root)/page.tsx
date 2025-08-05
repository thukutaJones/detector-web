"use client"

import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import HowItWorks from '@/components/home/HowItWorks';
import CTASection from '@/components/home/CTASection';
import Footer from '@/components/home/Footer';

const DetectorHomepage = () => {
  return (
    <div className="bg-white h-[calc(100vh-70px)] overflow-auto scroll-container">
      <HeroSection />
      {/* <StatsSection /> */}
      <FeaturesSection />
      <HowItWorks />
      <CTASection />
      <Footer />
    </div>
  );
};

export default DetectorHomepage;