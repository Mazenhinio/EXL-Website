import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import AdviseHero from '@/components/AdviseHero'
import AdviseProblem from '@/components/AdviseProblem'
import AdviseWhatWeDo from '@/components/AdviseWhatWeDo'
import AdviseDifferent from '@/components/AdviseDifferent'
import AdviseWalkAwayWith from '@/components/AdviseWalkAwayWith'
import AdviseProcess from '@/components/AdviseProcess'
import AdviseWhoItsFor from '@/components/AdviseWhoItsFor'
import FooterCTA from '@/components/FooterCTA'

export const metadata = {
  title: 'Advise — Senior Brand & Go-to-Market Strategy | EXL',
  description: 'Senior positioning, go-to-market execution briefs, fractional CMO advisors, and rigorous marketing audits led by founders with international consulting depth.',
}

export default function AdvisePage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[var(--chartreuse)] selection:text-black">
      <Nav />
      
      {/* SECTION 1 — HERO */}
      <AdviseHero />

      {/* SECTION 2 — THE PROBLEM WE SOLVE */}
      <AdviseProblem />

      {/* SECTION 3 — THE WORK WE DO INSIDE ADVISE */}
      <AdviseWhatWeDo />

      {/* SECTION 4 — HOW ADVISE IS DIFFERENT */}
      <AdviseDifferent />

      {/* SECTION 5 — WHAT YOU WALK AWAY WITH */}
      <AdviseWalkAwayWith />

      {/* SECTION 6 — HOW WE WORK */}
      <AdviseProcess />

      {/* SECTION 7 — WHO ADVISE IS FOR */}
      <AdviseWhoItsFor />

      {/* SECTION 8 — FOOTER CTA */}
      <FooterCTA />
      
      <Footer />
    </main>
  )
}
