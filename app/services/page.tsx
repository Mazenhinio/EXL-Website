import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ServicesHero from '@/components/ServicesHero'
import ServicesIntro from '@/components/ServicesIntro'
import ServicesCapabilities from '@/components/ServicesCapabilities'
import ServicesFlagships from '@/components/ServicesFlagships'
import ServicesDifferentiators from '@/components/ServicesDifferentiators'
import ServicesProcess from '@/components/ServicesProcess'
import ServicesWhoItsFor from '@/components/ServicesWhoItsFor'

export const metadata = {
  title: 'Services | EXL Agency',
  description: 'Consulting-grade thinking. In-house execution. One team. Explore EXL capabilities in Advise, Produce, Build, and Grow.',
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-black">
      <Nav />
      <ServicesHero />
      <ServicesIntro />
      <ServicesCapabilities />
      <ServicesFlagships />
      <ServicesDifferentiators />
      <ServicesProcess />
      <ServicesWhoItsFor />
      {/* Other sections will be added here */}
      <Footer />
    </main>
  )
}
