'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const STEPS = [
  {
    id: '01',
    title: 'Brief',
    text: 'We turn your objective into a production brief. What needs to be said, who needs to say it, and what the finished piece needs to do.'
  },
  {
    id: '02',
    title: 'Pre-produce',
    text: 'Script, shot list, locations, talent, wardrobe, schedule. The unglamorous work that separates good productions from bad ones.'
  },
  {
    id: '03',
    title: 'Shoot',
    text: 'On-location in Dallas-Fort Worth, or wherever your shoot needs to happen. Multi-camera, cinematic, tightly run. We leave with everything we need.'
  },
  {
    id: '04',
    title: 'Edit and deliver',
    text: 'First cut, refined cut, final cut, and the full repurposing kit. Delivered on a schedule you can plan around.'
  }
]

export default function ProduceSection6() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progressLineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray('.produce-process-step') as HTMLElement[]
      
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
        const content = step.querySelector('.produce-step-content')
        const marker = step.querySelector('.produce-step-marker')

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
          src="/assets/images/produce-process-bg.png" 
          alt="Cinematic behind-the-scenes recording studio background layout" 
          fill 
          className="object-cover opacity-[0.22] grayscale"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Background film grain */}
      <div className="absolute inset-0 pointer-events-none z-10 dense-film-grain opacity-[0.03]" />

      {/* ── SECTION TITLE ───────────────────────────────────────────── */}
      <div className="absolute top-12 lg:top-20 left-0 w-full z-30 flex justify-center px-6">
        <div className="text-center space-y-3">
          <span className="font-[var(--font-mona-narrow)] text-[10px] tracking-[0.2em] text-[var(--chartreuse)] uppercase font-bold">The Produce process</span>
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
            How the work is made.
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
              className={`produce-process-step relative w-full flex items-center ${i % 2 === 0 ? 'lg:justify-start' : 'lg:justify-end'} justify-start pl-16 lg:pl-0`}
            >
              {/* Spine Connector Dot */}
              <div className="produce-step-marker absolute left-8 lg:left-1/2 lg:-translate-x-1/2 w-3.5 h-3.5 rounded-full z-20 border border-black" />

              {/* Step Content Card */}
              <div className={`produce-step-content w-[85%] lg:w-[42%] ${i % 2 === 0 ? 'lg:pr-12 lg:text-right' : 'lg:pl-12 lg:text-left'} space-y-1 lg:space-y-4`}>
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
