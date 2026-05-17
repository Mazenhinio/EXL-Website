'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const pillars = [
  {
    id: '01',
    title: 'THE SENIOR IS THE ONE',
    highlight: 'DOING THE WORK.',
    body: 'You don\'t get a relationship manager. You get the person writing the strategy. The work is senior because it\'s done by someone senior, not because it was reviewed by one on a Friday.',
    image: '/assets/images/advise-diff-senior.png'
  },
  {
    id: '02',
    title: 'INTERNATIONAL PERSPECTIVE,',
    highlight: 'DALLAS DELIVERY.',
    body: 'The founder leading Advise has built brands and advised businesses across three continents. You get that perspective, from a Dallas base, with the hours and the focus of a local partner.',
    image: '/assets/images/advise-diff-global.png'
  },
  {
    id: '03',
    title: 'STRATEGY TIED',
    highlight: 'TO EXECUTION.',
    body: 'Strategies that live on a slide and die in a drawer are not strategies. Every Advise engagement is built knowing that if you want the work executed, the team that wrote it can build it. That changes how the strategy gets written.',
    image: '/assets/images/advise-diff-execution.png'
  }
]

export default function AdviseDifferent() {
  const [activePillar, setActivePillar] = useState<number | null>(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const loadGsap = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (sectionRef.current) {
        gsap.fromTo(sectionRef.current, 
          { opacity: 0 }, 
          { 
            opacity: 1, 
            duration: 1, 
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
            }
          }
        )
      }
    }
    loadGsap()
  }, [])

  return (
    <section 
      id="advise-different" 
      ref={sectionRef}
      className="relative bg-[var(--eerie)] min-h-screen overflow-hidden py-24 px-6 lg:px-12 flex flex-col selection:bg-[var(--chartreuse)] selection:text-black"
    >
      {/* Background grain texture */}
      <div className="absolute inset-0 pointer-events-none z-0 dense-film-grain opacity-[0.02]" />

      {/* Header */}
      <div className="mb-20 flex flex-col items-center relative z-10">
        <p className="section-label mb-4 text-[var(--taupe)]">
          Why EXL Advise
        </p>
        <div className="w-[0.5px] h-6 bg-white/15 mb-6" />
        <h2 
          style={{ fontFamily: 'var(--font-tusker)', lineHeight: 1.45 }}
          className="text-[clamp(32px,6.5vw,68px)] text-white uppercase max-w-[1000px] tracking-tight text-center"
        >
          What you get from us that you won&apos;t get <span className="highlight-marker">elsewhere.</span>
        </h2>
      </div>

      {/* The Cinematic Aperture Rail */}
      <div className="flex-grow flex flex-col lg:flex-row gap-4 lg:gap-0 h-full lg:h-[70vh] border-y border-white/10 relative z-10">
        {pillars.map((pillar, i) => (
          <div
            key={pillar.id}
            onMouseEnter={() => setActivePillar(i)}
            className={`group relative flex-grow transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden cursor-pointer
              ${activePillar === i ? 'lg:flex-[2.5]' : 'lg:flex-1'}
              border-b lg:border-b-0 lg:border-r border-white/10 last:border-0`}
          >
            {/* BG IMAGE (The Lens) */}
            <div className={`absolute inset-0 transition-all duration-1000 ease-out z-0
              ${activePillar === i ? 'scale-100 opacity-25 grayscale-0' : 'scale-110 opacity-5 grayscale'}`}>
              <Image 
                src={pillar.image} 
                alt={pillar.title} 
                fill 
                className="object-cover object-center"
                priority
              />
            </div>

            {/* CONTENT OVERLAY */}
            <div className="relative z-10 p-8 lg:p-12 h-full flex flex-col justify-between">
              {/* Pillar ID */}
              <div className="font-[var(--font-tusker)] text-[11px] font-medium text-[var(--chartreuse)] tracking-[0.15em] opacity-60">
                {pillar.id}
              </div>

              {/* Title Section */}
              <div className="mt-auto">
                <h3 
                  style={{ fontFamily: 'var(--font-tusker)' }}
                  className={`uppercase transition-all duration-700 leading-[1.05]
                  ${activePillar === i ? 'text-[clamp(28px,4.5vw,56px)] text-white' : 'text-[clamp(20px,2.5vw,28px)] text-white/40'}`}
                >
                  {pillar.title} <br/>
                  <span className={`${activePillar === i ? 'text-[var(--chartreuse)]' : 'text-white/20'}`}>
                    {pillar.highlight}
                  </span>
                </h3>

                {/* Body Text (Reveals on Active) */}
                <div className={`mt-8 transition-all duration-700 ease-out overflow-hidden
                  ${activePillar === i ? 'max-h-[500px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 translate-y-4'}`}>
                  <p className="font-[var(--font-cabinet)] text-[clamp(15px,2.2vw,22px)] text-white/70 max-w-[550px] font-light leading-relaxed">
                    {pillar.body}
                  </p>
                  
                  {/* Visual Indicator */}
                  <div className="mt-8 w-12 h-[1px] bg-[var(--chartreuse)]" />
                </div>
              </div>
            </div>

            {/* Interactive Corner Accent */}
            <div className={`absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 transition-all duration-700
              ${activePillar === i ? 'border-[var(--chartreuse)] rotate-0' : 'border-white/10 rotate-90'}`} />
          </div>
        ))}
      </div>

      {/* Background Micro-Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-[var(--font-tusker)] text-[30vw] text-white/[0.01] pointer-events-none select-none z-0">
        SENIOR
      </div>
    </section>
  )
}
