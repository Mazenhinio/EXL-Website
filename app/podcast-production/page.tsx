import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import B2BPodcastHero from '@/components/B2BPodcastHero'
import B2BPodcastProblem from '@/components/B2BPodcastProblem'

import B2BPodcastInside from '@/components/B2BPodcastInside'
import B2BPodcastDifferent from '@/components/B2BPodcastDifferent'
import B2BPodcastWhatYouGet from '@/components/B2BPodcastWhatYouGet'
import B2BPodcastHowWeWork from '@/components/B2BPodcastHowWeWork'
import B2BPodcastWhoItsFor from '@/components/B2BPodcastWhoItsFor'
import B2BPodcastFooterCTA from '@/components/B2BPodcastFooterCTA'

export const metadata = {
  title: 'B2B Video Podcast Production — EXL',
  description: 'A cinematic B2B video podcast that builds pipeline. Strategy, guests, production, distribution — one engine.',
}

export default function PodcastProduction() {
  return (
    <main className="bg-black text-white selection:bg-b2b-bright selection:text-white min-h-screen">
      <Nav />
      <B2BPodcastHero />
      <B2BPodcastProblem />
      <B2BPodcastInside />
      <B2BPodcastDifferent />
      <B2BPodcastWhatYouGet />
      <B2BPodcastHowWeWork />
      <B2BPodcastWhoItsFor />
      <B2BPodcastFooterCTA />
      <Footer variant="b2b-red" />
    </main>
  )
}
