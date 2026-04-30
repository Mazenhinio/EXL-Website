'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const pillars = [
  {
    id: '01',
    title: 'SENIOR STRATEGY,',
    highlight: 'NOT JUNIOR EXECUTION.',
    body: 'Every engagement is led by a founder with international consulting experience across three continents. You get the senior thinking the big firms charge for, without the layers between you and the person actually solving your problem.',
    image: '/assets/images/senior-strategy.png'
  },
  {
    id: '02',
    title: 'AI-NATIVE, SO YOUR',
    highlight: "TIMELINE ISN'T A PROBLEM.",
    body: 'We built our production and content stack on AI from day one. A lean Dallas team ships in weeks what traditional agencies ship in quarters. You move at the pace of your market, not the pace of your agency.',
    image: '/assets/images/ai-native-pillar.png'
  },
  {
    id: '03',
    title: 'ENGINEERED FOR',
    highlight: 'IMPACT, TOP TO BOTTOM.',
    body: 'Every decision, from the strategy brief to the lens choice on the shoot, runs through one filter: will this move the number? We build marketing that\'s accountable from planning through delivery, and we own the outcome end to end.',
    image: '/assets/images/engineered-impact.png'
  }
]

export default function HowDifferent() {
  const [activePillar, setActivePillar] = useState<number | null>(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const loadGsap = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (sectionRef.current) {
        // Subtle entrance for the whole section
        gsap.fromTo(sectionRef.current, 
          { opacity: 0 }, 
          { 
            opacity: 1, 
            duration: 1, 
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            }
          }
        )
      }
    }
    loadGsap()
  }, [])

  return (
    <section 
      id="how-different" 
      ref={sectionRef}
      className="relative bg-[var(--eerie)] min-h-screen overflow-hidden py-24 px-6 lg:px-12 flex flex-col"
    >
      {/* Header */}
      <div className="mb-20 flex flex-col items-center">
        <p className="section-label mb-4">
          Why Clients Pick EXL
        </p>
        <div className="w-[0.5px] h-6 bg-white/15 mb-6" />
        <h2 
          style={{ fontFamily: 'var(--font-tusker)' }}
          className="text-[clamp(32px,6.5vw,68px)] leading-[1.05] text-white uppercase max-w-[900px] tracking-tight text-center"
        >
          Why clients pick EXL over the <span className="highlight-marker">alternatives.</span>
        </h2>
      </div>

      {/* The Cinematic Aperture Rail */}
      <div className="flex-grow flex flex-col lg:flex-row gap-4 lg:gap-0 h-full lg:h-[70vh] border-y border-white/10">
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
              ${activePillar === i ? 'scale-100 opacity-30 grayscale-0' : 'scale-110 opacity-10 grayscale'}`}>
              <Image 
                src={pillar.image} 
                alt={pillar.title} 
                fill 
                className="object-cover"
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
                  <p className="font-[var(--font-cabinet)] text-[clamp(14px,2.25vw,28px)] text-white/70 max-w-[450px] font-light leading-relaxed">
                    {i === 0 && <>Every engagement is led by a founder with international consulting experience across three continents. You get the senior thinking the big firms charge for, without the layers between you and the person actually solving your problem.</>}
                    {i === 1 && <>We built our production and content stack on AI from day one. A lean Dallas team ships in weeks what traditional agencies ship in quarters. You move at the pace of your market, not the pace of your agency.</>}
                    {i === 2 && <>Every decision, from the strategy brief to the lens choice on the shoot, runs through one filter: will this move the number? We build marketing that&apos;s accountable from planning through delivery, and we own the outcome end to end.</>}
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-[var(--font-tusker)] text-[30vw] text-white/[0.02] pointer-events-none select-none z-0">
        DIFFERENT
      </div>
    </section>
  )
}
