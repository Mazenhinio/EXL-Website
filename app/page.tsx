import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import CredibilityLine from '@/components/CredibilityLine'
import WhatWeDo from '@/components/WhatWeDo'
import Advantage from '@/components/Advantage'
import Ticker from '@/components/Ticker'
import HowDifferent from '@/components/HowDifferent'
import FlagshipServices from '@/components/FlagshipServices'
import BestInB2B from '@/components/BestInB2B'
import HowWeWork from '@/components/HowWeWork'
import FooterCTA from '@/components/FooterCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <CredibilityLine />
      <WhatWeDo />
      <Advantage />
      <Ticker />
      <HowDifferent />
      <FlagshipServices />
      <BestInB2B />
      <HowWeWork />
      <FooterCTA />
      <Footer />
    </main>
  )
}
