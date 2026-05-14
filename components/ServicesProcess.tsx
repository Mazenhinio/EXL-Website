'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const STEPS = [
  {
    id: '01',
    title: 'Discover',
    text: 'A real audit of your market, your buyer, and your current state. Not a templated workshop. A structured conversation that produces findings, not a feel-good recap.'
  },
  {
    id: '02',
    title: 'Strategize',
    text: 'A positioning, content, and distribution plan you can actually execute. Written to be used, not filed.'
  },
  {
    id: '03',
    title: 'Produce and manage',
    text: 'Our Dallas team films, writes, designs, and builds in-house. For anything we don’t do under our roof, we manage the vendors, the timelines, and the quality, so you don’t have to.'
  },
  {
    id: '04',
    title: 'Distribute and measure',
    text: 'We deploy across paid, earned, and owned channels, then measure what moved pipeline. Reporting that shows you what’s working, not just what we did.'
  }
]

export default function ServicesProcess() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progressLineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray('.process-step') as HTMLElement[]
      
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

      // 1. Animate the central progress line filling
      tl.to(progressLineRef.current, {
        height: '100%',
        ease: 'none',
        duration: steps.length * 2
      }, 0)

      // 2. Animate each step branching out
      steps.forEach((step, i) => {
        const isEven = i % 2 === 0
        const content = step.querySelector('.step-content')
        const marker = step.querySelector('.step-marker')

        // Initial State
        gsap.set(content, { 
          x: isEven ? -50 : 50, 
          opacity: 0, 
          filter: 'blur(10px)' 
        })
        gsap.set(marker, { scale: 0, backgroundColor: '#333' })

        // Entrance
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

        // Exit (fade out previous step as next one arrives)
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
      className="relative w-full h-screen bg-black overflow-hidden border-t border-white/5"
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/assets/images/services-process-flow.png" 
          alt="Strategic Flow" 
          fill 
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* ── SECTION TITLE ───────────────────────────────────────────── */}
      <div className="absolute top-12 lg:top-20 left-0 w-full z-30 flex justify-center">
        <h2 
          style={{
            fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
            fontSize: 'clamp(32px, 4vw, 56px)',
            lineHeight: 1.3,
            color: '#ffffff',
            textTransform: 'uppercase',
            textAlign: 'center'
          }}
        >
          How we work with you.
        </h2>
      </div>
      <div className="relative z-10 w-full h-full max-w-[1400px] mx-auto flex items-center justify-center">
        
        {/* ── CENTRAL SPINE ───────────────────────────────────────────── */}
        <div className="absolute left-8 lg:left-1/2 top-[25%] bottom-[15%] w-[1px] bg-white/10 lg:-translate-x-1/2">
          <div 
            ref={progressLineRef}
            className="absolute top-0 left-0 w-full h-0 bg-[var(--chartreuse)] shadow-[0_0_15px_var(--chartreuse)]"
          />
        </div>

        {/* ── STEPS ───────────────────────────────────────────────────── */}
        <div className="relative w-full h-[60%] flex flex-col justify-between py-10">
          {STEPS.map((step, i) => (
            <div 
              key={step.id}
              className={`process-step relative w-full flex items-center ${i % 2 === 0 ? 'lg:justify-start' : 'lg:justify-end'} justify-start pl-16 lg:pl-0`}
            >
              {/* The Marker (on the spine) */}
              <div className="step-marker absolute left-8 lg:left-1/2 lg:-translate-x-1/2 w-3 h-3 rounded-full z-20 border border-black" />

              {/* The Content */}
              <div className={`step-content w-[85%] lg:w-[42%] ${i % 2 === 0 ? 'lg:pr-12 lg:text-right' : 'lg:pl-12 lg:text-left'} space-y-1 lg:space-y-4`}>
                <div className={`flex items-center gap-4 ${i % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'} justify-start`}>
                  <span 
                    className="text-[10px] lg:text-xs font-bold text-[var(--chartreuse)] tracking-[0.2em]"
                    style={{ fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif" }}
                  >
                    {step.id}
                  </span>
                  <h3 
                    style={{
                      fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
                      fontSize: 'clamp(20px, 3.5vw, 38px)',
                      lineHeight: 1.3,
                      color: '#ffffff',
                      textTransform: 'uppercase'
                    }}
                  >
                    {step.title}
                  </h3>
                </div>
                <p className="font-[var(--font-cabinet)] text-white/50 text-sm lg:text-lg leading-snug lg:leading-relaxed font-light">
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10 mix-blend-soft-light bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </section>
  )
}
