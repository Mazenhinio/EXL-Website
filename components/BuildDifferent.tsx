'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const pillars = [
  {
    id: '01',
    title: 'ONE ACCOUNTABLE TEAM,',
    highlight: 'END TO END.',
    body: 'Strategy, creative, production, web, and project management all sit inside EXL. There are no agency-to-agency handoffs to manage because there is no other agency.',
    image: '/assets/images/produce-pillar3-team.png'
  },
  {
    id: '02',
    title: 'WE MANAGE THE VENDORS',
    highlight: 'YOU ALREADY HAVE.',
    body: 'If you have a PR firm, a media buyer, or a developer you want to keep, we don\'t push them out. We fold them into the project and run the coordination.',
    image: '/assets/images/pitfall-agency.png'
  },
  {
    id: '03',
    title: 'DATES ARE THE',
    highlight: 'CORE DELIVERABLE.',
    body: 'A launch that ships two weeks late is not a launch, it\'s a missed quarter. We scope Build projects against hard dates, and our senior team is accountable for hitting them.',
    image: '/assets/images/diff-impact.png'
  }
]

export default function BuildDifferent() {
  const [activePillar, setActivePillar] = useState<number | null>(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Entrance staggered fade
      gsap.fromTo(sectionRef.current, 
        { opacity: 0 }, 
        { 
          opacity: 1, 
          duration: 1.2, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      id="build-differentiators" 
      ref={sectionRef}
      data-cursor-theme="dark"
      className="relative bg-[var(--eerie)] min-h-screen overflow-hidden py-24 px-6 lg:px-12 flex flex-col selection:bg-[var(--chartreuse)] selection:text-black"
    >
      <div className="absolute inset-0 pointer-events-none dense-film-grain opacity-[0.03] z-10" />

      {/* Header */}
      <div className="mb-20 flex flex-col items-center relative z-20">
        <span className="font-[var(--font-mona-narrow)] text-[10px] tracking-[0.2em] text-[var(--chartreuse)] uppercase block font-bold mb-4">
          Why Clients Choose Build
        </span>
        <div className="w-[0.5px] h-6 bg-white/15 mb-6" />
        <h2 
          style={{ fontFamily: 'var(--font-tusker)', lineHeight: 1.2 }}
          className="text-[clamp(32px,6.5vw,68px)] text-white uppercase max-w-[900px] tracking-tight text-center"
        >
          Three reasons brands choose <span className="text-[var(--chartreuse)]">Build.</span>
        </h2>
      </div>

      {/* The Cinematic Aperture Rail Accordion */}
      <div className="flex-grow flex flex-col lg:flex-row gap-4 lg:gap-0 h-full lg:h-[70vh] border-y border-white/10 relative z-20">
        {pillars.map((pillar, i) => (
          <div
            key={pillar.id}
            onMouseEnter={() => setActivePillar(i)}
            className={`group relative flex-grow transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden cursor-pointer
              ${activePillar === i ? 'lg:flex-[2.5]' : 'lg:flex-1'}
              border-b lg:border-b-0 lg:border-r border-white/10 last:border-0`}
          >
            {/* BG IMAGE (The Lens aperture) */}
            <div className={`absolute inset-0 transition-all duration-1000 ease-out z-0
              ${activePillar === i ? 'scale-100 opacity-25 grayscale-0' : 'scale-110 opacity-[0.08] grayscale'}`}>
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

                {/* Body Text (Reveals on Active hover) */}
                <div className={`mt-8 transition-all duration-700 ease-out overflow-hidden
                  ${activePillar === i ? 'max-h-[500px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 translate-y-4'}`}>
                  <p className="font-[var(--font-cabinet)] text-[clamp(14px,1.8vw,20px)] text-white/70 max-w-[480px] font-light leading-relaxed">
                    {pillar.body}
                  </p>
                  
                  {/* Indicator Line */}
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

      {/* Large Background Watermark Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-[var(--font-tusker)] text-[28vw] text-white/[0.015] pointer-events-none select-none z-0">
        BUILD
      </div>
    </section>
  )
}
