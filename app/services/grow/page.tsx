import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import GrowHero from '@/components/GrowHero'
import GrowProblem from '@/components/GrowProblem'
import GrowWhatWeDo from '@/components/GrowWhatWeDo'
import GrowDifferent from '@/components/GrowDifferent'
import GrowWalkAwayWith from '@/components/GrowWalkAwayWith'
import GrowProcess from '@/components/GrowProcess'
import GrowWhoItsFor from '@/components/GrowWhoItsFor'
import GrowFooterCTA from '@/components/GrowFooterCTA'

export const metadata = {
  title: 'Grow — Paid Media, Organic Distribution & Pipeline Ops | EXL',
  description: 'Converting raw attention into measurable pipeline. B2B paid media execution, organic content repurposing swarms, email marketing, CRM automations, and operational dashboards.',
}

export default function GrowPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[var(--chartreuse)] selection:text-black">
      <Nav />
      
      {/* SECTION 1 — HERO */}
      <GrowHero />

      {/* SECTION 2 — THE PROBLEM WE SOLVE */}
      <GrowProblem />

      {/* SECTION 3 — THE WORK WE DO INSIDE GROW */}
      <GrowWhatWeDo />

      {/* SECTION 4 — HOW GROW IS DIFFERENT */}
      <GrowIndependentWrapper>
        <GrowDifferent />
      </GrowIndependentWrapper>

      {/* SECTION 5 — WHAT YOU WALK AWAY WITH */}
      <GrowWalkAwayWith />

      {/* SECTION 6 — HOW WE WORK */}
      <GrowProcess />

      {/* SECTION 7 — WHO GROW IS FOR */}
      <GrowWhoItsFor />

      {/* SECTION 8 — FOOTER CTA */}
      <GrowFooterCTA />
      
      <Footer />
    </main>
  )
}

// Client container boundary to ensure independent styling contexts if needed
function GrowIndependentWrapper({ children }: { children: React.ReactNode }) {
  return <div className="relative w-full z-10">{children}</div>
}
