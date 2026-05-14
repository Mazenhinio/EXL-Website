'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const PITFALLS = [
  {
    id: '01',
    tag: 'OPTION 01',
    title: 'THE STRATEGY',
    highlight: 'FIRM.',
    body: 'Hire a strategy firm and you get a beautiful deck and no one to execute it. The partners sell the vision, the juniors build the slides, and you are left with a 100-page PDF that dies in a drawer.',
    image: '/assets/images/pitfall-firm.webp'
  },
  {
    id: '02',
    tag: 'OPTION 02',
    title: 'THE TRADITIONAL',
    highlight: 'AGENCY.',
    body: 'Hire an agency and you get execution without a clear strategy behind it. They ship assets, not outcomes. You get "content" that looks good but doesn’t move the needle because it wasn’t built on a foundation.',
    image: '/assets/images/pitfall-agency.webp'
  },
  {
    id: '03',
    tag: 'OPTION 03',
    title: 'THE FREELANCE',
    highlight: 'NETWORK.',
    body: 'Hire freelancers and you become the project manager by default. You spend 80% of your week coordinating handoffs between a writer, a designer, and a dev. You aren’t running marketing; you’re running a circus.',
    image: '/assets/images/pitfall-freelance.webp'
  }
]

export default function ServicesIntro() {
  const [activePitfall, setActivePitfall] = useState<number | null>(0)
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
      id="services-intro" 
      ref={sectionRef}
      className="relative bg-[#0A0A0A] min-h-screen overflow-hidden py-24 px-6 lg:px-12 flex flex-col"
    >
      {/* Header */}
      <div className="mb-20 flex flex-col items-center">
        <p className="section-label mb-4 text-[var(--taupe)]">
          The Problem
        </p>
        <div className="w-[0.5px] h-6 bg-white/15 mb-6" />
        <h2 
          style={{ fontFamily: 'var(--font-tusker)', lineHeight: 1.6 }}
          className="text-[clamp(32px,6.5vw,68px)] text-white uppercase max-w-[1000px] tracking-tight text-center"
        >
          Most brands are stuck between <br /> <span className="highlight-marker">bad options.</span>
        </h2>
      </div>

      {/* The Cinematic Aperture Rail */}
      <div className="flex-grow flex flex-col lg:flex-row gap-4 lg:gap-0 h-full lg:min-h-[70vh] border-y border-white/10">
        {PITFALLS.map((pitfall, i) => (
          <div
            key={pitfall.id}
            onMouseEnter={() => setActivePitfall(i)}
            className={`group relative flex-grow transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden cursor-pointer
              ${activePitfall === i ? 'lg:flex-[2.5]' : 'lg:flex-1'}
              border-b lg:border-b-0 lg:border-r border-white/10 last:border-0`}
          >
            {/* BG IMAGE */}
            <div className={`absolute inset-0 transition-all duration-1000 ease-out z-0
              ${activePitfall === i ? 'scale-100 opacity-40 grayscale-0' : 'scale-110 opacity-10 grayscale'}`}>
              <Image 
                src={pitfall.image} 
                alt={pitfall.title} 
                fill 
                className="object-cover"
                priority
              />
            </div>

            {/* CONTENT OVERLAY */}
            <div className="relative z-10 p-8 lg:p-12 h-full flex flex-col justify-between">
              {/* Option Tag */}
              <div className="font-[var(--font-tusker)] text-[11px] font-medium text-[var(--chartreuse)] tracking-[0.15em] opacity-60">
                {pitfall.tag}
              </div>

              {/* Title Section */}
              <div className="mt-auto">
                <h3 
                  style={{ fontFamily: 'var(--font-tusker)' }}
                  className={`uppercase transition-all duration-700 leading-[1.3]
                  ${activePitfall === i ? 'text-[clamp(28px,4.5vw,56px)] text-white' : 'text-[clamp(20px,2.5vw,28px)] text-white/40'}`}
                >
                  {pitfall.title} <br/>
                  <span className={`${activePitfall === i ? 'text-[var(--chartreuse)]' : 'text-white/20'}`}>
                    {pitfall.highlight}
                  </span>
                </h3>

                {/* Body Text */}
                <div className={`mt-8 transition-all duration-700 ease-out overflow-hidden
                  ${activePitfall === i ? 'max-h-[500px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 translate-y-4'}`}>
                  <p className="font-[var(--font-cabinet)] text-[clamp(16px,2vw,22px)] text-white max-w-[500px] font-light leading-relaxed">
                    {pitfall.body}
                  </p>
                  
                  {/* Indicator */}
                  <div className="mt-8 w-12 h-[1px] bg-[var(--chartreuse)]" />
                </div>
              </div>
            </div>

            {/* Interactive Corner Accent */}
            <div className={`absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 transition-all duration-700
              ${activePitfall === i ? 'border-[var(--chartreuse)] rotate-0' : 'border-white/10 rotate-90'}`} />
          </div>
        ))}
      </div>

      {/* Solution Reveal Link / Footer */}
      <div className="mt-16 mb-8 flex flex-col items-center text-center px-6">
        <h3 
          style={{ fontFamily: 'var(--font-tusker)' }}
          className="text-white text-[clamp(24px,4vw,40px)] uppercase tracking-tight leading-tight mb-8"
        >
          <span className="inline-block w-[clamp(90px,12vw,140px)] mr-4 align-middle -mt-1">
            <Image 
              src="/assets/images/exl-logo-neon.webp" 
              alt="EXL Logo" 
              width={250} 
              height={80} 
              className="object-contain"
            />
          </span>
          was built to end that <span className="inline-block bg-[var(--chartreuse)] text-black px-4 pt-1 pb-2 ml-2">tradeoff.</span>
        </h3>
        <div className="w-[0.5px] h-16 bg-white/15" />
      </div>

      {/* Background Micro-Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-[var(--font-tusker)] text-[25vw] text-white/[0.02] pointer-events-none select-none z-0">
        TRADEOFF
      </div>
    </section>
  )
}
