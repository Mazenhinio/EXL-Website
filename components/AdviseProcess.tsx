'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const STEPS = [
  {
    id: '01',
    title: 'Discover',
    text: 'An intensive strategic discovery session. We audit what you\'ve done, pressure-test your assumptions, and outline where the real gaps are. No boilerplate workshops—just senior operators reviewing the business.'
  },
  {
    id: '02',
    title: 'Frame',
    text: 'We map the findings into positioning options and a go-to-market architecture. You see exactly how the market looks, where the white space is, and how we propose to win it.'
  },
  {
    id: '03',
    title: 'Recommend',
    text: 'The decision playbook. A structured written brief detail by detail. We make explicit, senior recommendations for positioning, messaging, and channels—explaining why each choice was made.'
  },
  {
    id: '04',
    title: 'Walk the work in',
    text: 'Strategy is useless if your team doesn\'t buy it or doesn\'t know how to run it. We host dedicated alignment workshops and handoff briefs to ensure the plan runs, or connect with our Produce, Build, or Grow floors to execute.'
  }
]

export default function AdviseProcess() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progressLineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray('.advise-process-step') as HTMLElement[]
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${steps.length * 150}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      })

      // 1. Fill central neon spine progress line
      tl.to(progressLineRef.current, {
        height: '100%',
        ease: 'none',
        duration: steps.length * 2
      }, 0)

      // 2. Animate steps branching from spine
      steps.forEach((step, i) => {
        const isEven = i % 2 === 0
        const content = step.querySelector('.advise-step-content')
        const marker = step.querySelector('.advise-step-marker')

        // Initial States
        gsap.set(content, { 
          x: isEven ? -60 : 60, 
          opacity: 0, 
          filter: 'blur(12px)' 
        })
        gsap.set(marker, { scale: 0, backgroundColor: '#222' })

        // Entrance animation timings
        tl.to(marker, {
          scale: 1,
          backgroundColor: '#DEFF00',
          duration: 0.5,
          ease: 'back.out(2)'
        }, i * 2 + 0.5)

        tl.to(content, {
          x: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power2.out'
        }, i * 2 + 0.7)

        // Exit fading
        if (i < steps.length - 1) {
          tl.to(content, {
            opacity: 0.1,
            filter: 'blur(4px)',
            duration: 1,
            ease: 'power2.in'
          }, (i + 1) * 2)
        }
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden border-t border-white/5 selection:bg-[var(--chartreuse)] selection:text-black"
    >
      {/* Background Graphic flow image layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image 
          src="/assets/images/advise-process-journey.png" 
          alt="Cinematic open highway journey background layout" 
          fill 
          className="object-cover opacity-25 grayscale"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Background film grain */}
      <div className="absolute inset-0 pointer-events-none z-10 dense-film-grain opacity-[0.03]" />

      {/* ── SECTION TITLE ───────────────────────────────────────────── */}
      <div className="absolute top-12 lg:top-20 left-0 w-full z-30 flex justify-center px-6">
        <div className="text-center space-y-3">
          <span className="font-[var(--font-tusker)] text-[12px] tracking-[0.25em] text-[var(--chartreuse)] uppercase font-semibold">The Advise process</span>
          <h2 
            style={{
              fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
              fontSize: 'clamp(32px, 4vw, 56px)',
              lineHeight: 1.2,
              color: '#ffffff',
              textTransform: 'uppercase',
              textAlign: 'center'
            }}
          >
            How we walk the work in.
          </h2>
        </div>
      </div>

      <div className="relative z-20 w-full h-full max-w-[1400px] mx-auto flex items-center justify-center">
        
        {/* ── CENTRAL SPINE ───────────────────────────────────────────── */}
        <div className="absolute left-8 lg:left-1/2 top-[25%] bottom-[15%] w-[1px] bg-white/10 lg:-translate-x-1/2">
          <div 
            ref={progressLineRef}
            className="absolute top-0 left-0 w-full h-0 bg-[var(--chartreuse)] shadow-[0_0_15px_rgba(222,255,0,0.8)]"
          />
        </div>

        {/* ── STEPS ───────────────────────────────────────────────────── */}
        <div className="relative w-full h-[60%] flex flex-col justify-between py-10">
          {STEPS.map((step, i) => (
            <div 
              key={step.id}
              className={`advise-process-step relative w-full flex items-center ${i % 2 === 0 ? 'lg:justify-start' : 'lg:justify-end'} justify-start pl-16 lg:pl-0`}
            >
              {/* Spine Connector Dot */}
              <div className="advise-step-marker absolute left-8 lg:left-1/2 lg:-translate-x-1/2 w-3.5 h-3.5 rounded-full z-20 border border-black" />

              {/* Step Content Card */}
              <div className={`advise-step-content w-[85%] lg:w-[42%] ${i % 2 === 0 ? 'lg:pr-12 lg:text-right' : 'lg:pl-12 lg:text-left'} space-y-1 lg:space-y-4`}>
                <div className={`flex items-center gap-4 ${i % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'} justify-start`}>
                  <span 
                    style={{ fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif" }}
                    className="text-[10px] lg:text-xs font-bold text-[var(--chartreuse)] tracking-[0.2em] uppercase"
                  >
                    STEP {step.id}
                  </span>
                  <h3 
                    style={{
                      fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
                      fontSize: 'clamp(20px, 3.5vw, 36px)',
                      lineHeight: 1.2,
                      color: '#ffffff',
                      textTransform: 'uppercase'
                    }}
                  >
                    {step.title}
                  </h3>
                </div>
                <p className="font-[var(--font-cabinet)] text-white/60 text-sm lg:text-lg leading-relaxed font-light">
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
