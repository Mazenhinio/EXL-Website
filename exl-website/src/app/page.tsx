import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import WhatWeDoSection from '@/components/WhatWeDoSection';
import EXLAdvantageSection from '@/components/EXLAdvantageSection';
import CredibilitySection from '@/components/CredibilitySection';
import HowWereDifferentSection from '@/components/HowWereDifferentSection';
import FlagshipServicesSection from '@/components/FlagshipServicesSection';
import Footer from '@/components/Footer';
import SectionSeparator from '@/components/SectionSeparator';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />

        {/* Yellow arrow line — hero → what we do */}
        <SectionSeparator />

        <WhatWeDoSection />

        <EXLAdvantageSection />

        <CredibilitySection />

        <HowWereDifferentSection />

        {/* Yellow arrow line flipped — how different → flagship */}
        <SectionSeparator flip />

        <FlagshipServicesSection />
      </main>
      <Footer />
    </>
  );
}

