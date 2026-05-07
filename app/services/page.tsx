import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ServicesHero from '@/components/ServicesHero'
import ServicesCapabilities from '@/components/ServicesCapabilities'

export const metadata = {
  title: 'Services | EXL Agency',
  description: 'Consulting-grade thinking. In-house execution. One team. Explore EXL capabilities in Advise, Produce, Build, and Grow.',
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-black">
      <Nav />
      <ServicesHero />
      <ServicesCapabilities />
      {/* Other sections will be added here */}
      <Footer />
    </main>
  )
}
