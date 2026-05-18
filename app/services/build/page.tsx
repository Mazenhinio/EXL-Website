import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import BuildHero from '@/components/BuildHero'
import BuildProblem from '@/components/BuildProblem'
import BuildWhatWeDo from '@/components/BuildWhatWeDo'
import BuildDifferent from '@/components/BuildDifferent'
import BuildWalkAwayWith from '@/components/BuildWalkAwayWith'
import BuildProcess from '@/components/BuildProcess'
import BuildWhoItsFor from '@/components/BuildWhoItsFor'
import BuildFooterCTA from '@/components/BuildFooterCTA'

export const metadata = {
  title: 'Build — Custom Web Apps, Brand Rollouts & Campaigns | EXL',
  description: 'Rigorous engineering and creative execution led by senior operators. Corporate sites, product launches, brand systems, and integrated 90-day campaigns.',
}

export default function BuildPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[var(--chartreuse)] selection:text-black">
      <Nav />
      
      {/* SECTION 1 — HERO */}
      <BuildHero />

      {/* SECTION 2 — THE PROBLEM WE SOLVE */}
      <BuildProblem />

      {/* SECTION 3 — THE WORK WE DO INSIDE BUILD */}
      <BuildWhatWeDo />

      {/* SECTION 4 — HOW BUILD IS DIFFERENT */}
      <BuildDifferent />

      {/* SECTION 5 — WHAT YOU WALK AWAY WITH */}
      <BuildWalkAwayWith />

      {/* SECTION 6 — HOW WE WORK */}
      <BuildProcess />

      {/* SECTION 7 — WHO BUILD IS FOR */}
      <BuildWhoItsFor />

      {/* SECTION 8 — FOOTER CTA */}
      <BuildFooterCTA />
      
      <Footer />
    </main>
  )
}
