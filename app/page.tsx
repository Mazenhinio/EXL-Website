import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import WhatWeDo from '@/components/WhatWeDo'
import FlagshipServices from '@/components/FlagshipServices'
import HowDifferent from '@/components/HowDifferent'
import HowWeWork from '@/components/HowWeWork'
import BestInB2B from '@/components/BestInB2B'
import FooterCTA from '@/components/FooterCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <WhatWeDo />
      <FlagshipServices />
      <HowDifferent />
      <BestInB2B />
      <HowWeWork />
      <FooterCTA />
      <Footer />
    </main>
  )
}
