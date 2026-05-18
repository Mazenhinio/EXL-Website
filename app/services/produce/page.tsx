import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ProduceHero from '@/components/ProduceHero'
import ProduceSection2 from '@/components/ProduceSection2'
import ProduceSection3 from '@/components/ProduceSection3'
import ProduceSection4 from '@/components/ProduceSection4'
import ProduceSection5 from '@/components/ProduceSection5'
import ProduceSection6 from '@/components/ProduceSection6'
import ProduceSection7 from '@/components/ProduceSection7'
import ProduceFooterCTA from '@/components/ProduceFooterCTA'

export const metadata = {
  title: 'Produce — Cinematic B2B Content & Video Production | EXL',
  description: 'In-house video, podcast, photography, and social content shot from our Dallas studio. B2B content that looks, sounds, and moves like high-fidelity media.',
}

export default function ProducePage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[var(--chartreuse)] selection:text-black">
      <Nav />
      
      {/* SECTION 1 — HERO */}
      <ProduceHero />

      {/* SECTION 2 — THE PROBLEM WE SOLVE */}
      <ProduceSection2 />

      {/* SECTION 3 — WHAT WE DO (THE CAPABILITIES MATRIX) */}
      <ProduceSection3 />

      {/* SECTION 4 — HOW PRODUCE IS DIFFERENT (DIFFERENTIATORS) */}
      <ProduceSection4 />

      {/* SECTION 5 — WHAT YOU WALK AWAY WITH (DELIVERABLES CAROUSEL) */}
      <ProduceSection5 />

      {/* SECTION 6 — HOW WE WORK (THE PRODUCTION PROCESS SPINE) */}
      <ProduceSection6 />

      {/* SECTION 7 — WHO PRODUCE IS FOR (LASER SHUTTER GATE) */}
      <ProduceSection7 />

      {/* SECTION 8 — FOOTER CTA (ZOOM-OUT EXL LOGO GATE) */}
      <ProduceFooterCTA />
      
      <Footer />
    </main>
  )
}
