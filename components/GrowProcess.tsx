'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const STEPS = [
  {
    id: '01',
    title: 'AUDIT',
    text: 'We start with a read of what you\'re running now. What\'s working, what isn\'t, and where the pipeline leaks are.'
  },
  {
    id: '02',
    title: 'PLAN',
    text: 'A 90-day execution plan with clear channels, budgets, targets, and owners. Signed off before a single dollar is spent.'
  },
  {
    id: '03',
    title: 'EXECUTE',
    text: 'Our team runs the programs day-to-day. You get weekly operational status reports and a deep monthly strategic review.'
  },
  {
    id: '04',
    title: 'ITERATE',
    text: 'Quarterly, we step back and rebuild the plan and automation rules around what the numbers actually say.'
  }
]

export default function GrowProcess() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progressLineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray('.grow-process-step') as HTMLElement[]
      
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

      // 1. Fill central spine neon timeline
      tl.to(progressLineRef.current, {
        height: '100%',
        ease: 'none',
        duration: steps.length * 2
      }, 0)

      // 2. Animate step cards branching off the spine
      steps.forEach((step, i) => {
        const isEven = i % 2 === 0
        const content = step.querySelector('.grow-step-content')
        const marker = step.querySelector('.grow-step-marker')

        // Initial States
        gsap.set(content, { 
          x: isEven ? -60 : 60, 
          opacity: 0, 
          filter: 'blur(12px)' 
        })
        gsap.set(marker, { scale: 0, backgroundColor: '#222' })

        // Timing animations
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

        // Exit timeline fade
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
      {/* Background Graphic highway layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image 
          src="/assets/images/produce-process-bg.png" 
          alt="Cinematic execution roadmap background visual" 
          fill 
          className="object-cover opacity-20 grayscale"
        />
        <div className="absolute inset-0 bg-black/75" />
      </div>

      {/* Film grain overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 dense-film-grain opacity-[0.03]" />

      {/* ── SECTION TITLE ───────────────────────────────────────────── */}
      <div className="absolute top-12 lg:top-20 left-0 w-full z-30 flex justify-center px-6">
        <div className="text-center space-y-3">
          <span className="font-[var(--font-mona-narrow)] text-[10px] tracking-[0.25em] text-[var(--chartreuse)] uppercase block font-semibold">
            The Grow Process
          </span>
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
            How We Execute.
          </h2>
        </div>
      </div>

      <div className="relative z-20 w-full h-full max-w-[1400px] mx-auto flex items-center justify-center">
        
        {/* ── CENTRAL Spine Line ───────────────────────────────────────────── */}
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
              className={`grow-process-step relative w-full flex items-center ${i % 2 === 0 ? 'lg:justify-start' : 'lg:justify-end'} justify-start pl-16 lg:pl-0`}
            >
              {/* Central Spine Node */}
              <div className="grow-step-marker absolute left-8 lg:left-1/2 lg:-translate-x-1/2 w-3.5 h-3.5 rounded-full z-20 border border-black" />

              {/* Step Card Content */}
              <div className={`grow-step-content w-[85%] lg:w-[42%] ${i % 2 === 0 ? 'lg:pr-12 lg:text-right' : 'lg:pl-12 lg:text-left'} space-y-1 lg:space-y-4`}>
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
