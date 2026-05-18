'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const PITFALLS = [
  {
    num: '01',
    label: 'THE SILOED AGENCY',
    title: 'Paid media operates in a total vacuum.',
    desc: 'The paid media buyer doesn\'t know which leads are junk, and the CRM team doesn\'t know which ads are bringing in actual buyers. You are paying to optimize for click-counts, not cash flow.',
    image: '/assets/images/siloed_agency_diagnostic.png',
    metricLabel: 'FRICTION INDEX',
    targetPercent: 84
  },
  {
    num: '02',
    label: 'THE VANITY TRAP',
    title: 'Reporting looks amazing. The sales floor is empty.',
    desc: 'Impressions are up, clicks are up, and Cost-Per-Lead is down. But none of it translates into revenue. You are building an audience of window-shoppers while key buyers ignore you.',
    image: '/assets/images/vanity_leak_dashboard.png',
    metricLabel: 'VANITY LEAKAGE',
    targetPercent: 92
  },
  {
    num: '03',
    label: 'THE LEAKY BUCKET',
    title: 'Spending ads cash, lead follow-up is broken.',
    desc: 'Inbound leads sit in your CRM for days without behavioral lifecycle sequences. High-intent pipeline cools off entirely before a sales rep ever makes initial contact.',
    image: '/assets/images/leaky_bucket_nurture.png',
    metricLabel: 'LEAD DROP RATE',
    targetPercent: 78
  },
  {
    num: '04',
    label: 'THE REBUILD LOOP',
    title: 'Plumbing that breaks the moment you try to scale.',
    desc: 'Campaigns are set up on fragile, custom pipelines that break under volume. You spend more time fixing broken integrations and building clean lists than actually running plays.',
    image: '/assets/images/rebuild_loop_schematic.png',
    metricLabel: 'INFRASTRUCTURE RISK',
    targetPercent: 65
  },
  {
    num: '05',
    label: 'THE CEO BLIND SPOT',
    title: 'Attribution dashboards that tell the CEO nothing.',
    desc: 'Your dashboards show absolute marketing busywork, but the CEO has zero visibility into actual revenue. If you cannot defend the source of your pipeline, your budget is always at risk.',
    image: '/assets/images/ceo_attribution_dashboard.png',
    metricLabel: 'ATTRIBUTION FAILURE',
    targetPercent: 88
  }
]

export default function GrowProblem() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  // Real-time ticking percentage state for each card
  const [percentages, setPercentages] = useState<number[]>([0, 0, 0, 0, 0])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // 1. Pinned Timeline (140% of viewport height scroll track)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1
        }
      })

      const cardsCount = PITFALLS.length
      const stepDuration = 10 / (cardsCount - 1)

      // 2. Loop through steps to sync horizontal gauge lines, numbers, cards, and photos
      for (let i = 0; i < cardsCount; i++) {
        const startStep = i * stepDuration
        const targetPercent = PITFALLS[i].targetPercent

        // Create a ticking value object for this specific step
        const tickerObj = { value: 0 }

        // A. Card transitions (Active card fades in and sits in place, others fade out entirely)
        tl.to(`.grow-diagnostic-card-${i}`, {
          opacity: 1,
          scale: 1,
          pointerEvents: 'auto',
          duration: 1.5,
          ease: 'power2.inOut',
          onStart: () => setActiveIndex(i)
        }, Math.max(0, startStep - 1.2))

        if (i > 0) {
          // Fade previous card out
          tl.to(`.grow-diagnostic-card-${i - 1}`, {
            opacity: 0,
            scale: 0.95,
            pointerEvents: 'none',
            duration: 1.2,
            ease: 'power2.inOut'
          }, Math.max(0, startStep - 1.2))
        }

        // B. Animate needle horizontal slide
        tl.to(`.grow-needle-${i}`, {
          left: `${targetPercent}%`,
          duration: 2.0,
          ease: 'power1.inOut'
        }, Math.max(0, startStep - 0.8))

        // C. Animate digital percentage ticking up dynamically
        tl.to(tickerObj, {
          value: targetPercent,
          duration: 2.0,
          ease: 'power1.inOut',
          onUpdate: () => {
            setPercentages(prev => {
              const next = [...prev]
              next[i] = Math.round(tickerObj.value)
              return next
            })
          }
        }, Math.max(0, startStep - 0.8))

        // D. Right column photo crossfade
        tl.to(`.grow-viewfinder-img-${i}`, {
          opacity: 1,
          scale: 1.02,
          duration: 1.5,
          ease: 'power2.inOut'
        }, Math.max(0, startStep - 1.2))

        if (i > 0) {
          // Fade previous photo out
          tl.to(`.grow-viewfinder-img-${i - 1}`, {
            opacity: 0,
            scale: 1.1,
            duration: 1.2,
            ease: 'power2.inOut'
          }, Math.max(0, startStep - 1.2))
        }
      }

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[var(--off-white)] overflow-hidden border-b border-black/5 selection:bg-black selection:text-white z-10"
    >
      <div className="absolute inset-0 pointer-events-none z-0 dense-film-grain opacity-[0.02]" />

      {/* ── FULL-BLEED 50/50 SPLIT PORTAL VIEWPORT ──────────────────────── */}
      <div className="w-full h-full flex flex-col lg:flex-row items-stretch overflow-hidden">
        
        {/* LEFT COLUMN: ACTIVE DIAGNOSTIC DETAILS (50% Width, Full Height) */}
        <div className="w-full lg:w-1/2 h-full flex flex-col justify-between py-12 md:py-16 bg-[var(--off-white)] relative overflow-hidden border-r border-black/5 z-10">
          
          {/* Header Title */}
          <div className="w-full px-6 md:px-12 pointer-events-none z-20 shrink-0">
            <span className="font-[var(--font-mona-narrow)] text-[10px] tracking-[0.25em] text-black/45 uppercase block font-bold mb-2">
              The Reality
            </span>
            <h2
              style={{
                fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
                fontSize: 'clamp(24px, 3.2vw, 42px)',
                lineHeight: 1.25,
                color: '#1C2416',
                textTransform: 'uppercase'
              }}
            >
              Why Grow Programs Leak.
            </h2>
          </div>

          {/* Centered Ticker Card stack in the middle */}
          <div className="relative w-full flex-grow flex items-center justify-center z-10 px-6">
            {PITFALLS.map((item, idx) => {
              const displayPercent = percentages[idx]

              return (
                <div
                  key={item.num}
                  className={`grow-diagnostic-card-${idx} absolute w-full max-w-[480px] md:max-w-[520px] rounded-[2.5rem] p-8 md:p-10 border border-black/5 bg-white/90 shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-300 pointer-events-none origin-center`}
                  style={{
                    opacity: idx === 0 ? 1 : 0,
                    scale: idx === 0 ? 1 : 0.95,
                    willChange: 'opacity, transform'
                  }}
                >
                  <div className="flex flex-col h-full justify-between">
                    
                    {/* Card Header metadata */}
                    <div className="flex items-center justify-between pb-4 border-b border-black/5 mb-4 shrink-0">
                      <span className="font-[var(--font-mona-narrow)] text-[9px] tracking-[0.2em] text-black/50 uppercase block font-bold">
                        GROW DIAGNOSTIC SYSTEM // PITFALL {item.num}
                      </span>
                      
                      <div className="text-right">
                        <span className="text-[8px] uppercase tracking-widest text-black/35 block font-bold">
                          {item.metricLabel}
                        </span>
                        <span className="font-[var(--font-tusker)] font-black text-base text-[#1C2416]">
                          {displayPercent}%
                        </span>
                      </div>
                    </div>

                    {/* Problem Body */}
                    <div className="space-y-4">
                      <span className="font-[var(--font-tusker)] font-medium text-[10px] text-black/40 block tracking-widest uppercase text-left">
                        {item.label}
                      </span>
                      
                      <h3
                        style={{
                          fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
                          fontSize: 'clamp(20px, 2.5vw, 30px)',
                          lineHeight: 1.15,
                          color: '#1C2416',
                          textTransform: 'uppercase',
                          textAlign: 'left'
                        }}
                        className="tracking-tight"
                      >
                        {item.title}
                      </h3>

                      <p className="font-[var(--font-cabinet)] text-black/60 text-sm md:text-base leading-relaxed font-light text-left">
                        {item.desc}
                      </p>
                    </div>

                    {/* The Measuring Scale */}
                    <div className="pt-5 mt-5 border-t border-black/5 space-y-2.5 shrink-0">
                      <span className="text-[8px] uppercase tracking-widest text-black/35 block font-bold text-left">
                        Pipeline Diagnostic Scale
                      </span>
                      
                      {/* Scale Track */}
                      <div className="relative w-full h-[2px] bg-black/10 rounded-full">
                        {/* Slide Needle */}
                        <div 
                          className={`grow-needle-${idx} absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[var(--chartreuse)] border-2 border-black shadow-[0_0_10px_rgba(222,255,0,0.35)] z-20`}
                          style={{ left: '0%', willChange: 'left' }}
                        />
                        {/* Color fill trail */}
                        <div 
                          className="absolute top-0 bottom-0 left-0 bg-[var(--chartreuse)]/30 rounded-full"
                          style={{ width: `${displayPercent}%` }}
                        />
                      </div>

                      {/* Scale Numbers */}
                      <div className="flex justify-between font-[var(--font-mona-narrow)] text-[7px] text-black/35 font-bold tracking-widest uppercase pt-0.5 select-none">
                        <span>0%</span>
                        <span>25%</span>
                        <span>50%</span>
                        <span>75%</span>
                        <span>100%</span>
                      </div>
                    </div>

                  </div>
                </div>
              )
            })}
          </div>

          {/* Simple scroll counter helper */}
          <div className="w-full max-w-[200px] bg-black/10 h-[2px] rounded-full overflow-hidden mx-auto z-20 shrink-0 mb-4">
            <div 
              className="h-full bg-black rounded-full origin-left w-full transition-transform duration-500 ease-out"
              style={{
                transform: `scaleX(${(activeIndex + 1) / PITFALLS.length})`
              }}
            />
          </div>

        </div>

        {/* RIGHT COLUMN: FULL-BLEED VIEWPORT VISUALIZATION (50% Width, Full Height) */}
        <div className="w-full lg:w-1/2 h-full relative overflow-hidden bg-black/5 z-0">
          
          {/* Diagnostic Viewfinder Images */}
          {PITFALLS.map((item, idx) => (
            <div
              key={item.num}
              className={`grow-viewfinder-img-${idx} absolute inset-0 transition-all duration-1000 ease-out`}
              style={{
                opacity: idx === 0 ? 0.92 : 0,
                transform: idx === 0 ? 'scale(1.02)' : 'scale(1.1)',
                willChange: 'opacity, transform'
              }}
            >
              <Image
                src={item.image}
                alt={item.label}
                fill
                className="object-cover"
                priority={idx === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/35 via-transparent to-transparent z-10 pointer-events-none" />
            </div>
          ))}

          {/* Camera Viewfinder geometric slate-black mask overlay */}
          <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.4]">
            <div className="absolute top-8 left-8 w-4 h-4 border-t border-l border-black" />
            <div className="absolute top-8 right-8 w-4 h-4 border-t border-r border-black" />
            <div className="absolute bottom-8 left-8 w-4 h-4 border-b border-l border-black" />
            <div className="absolute bottom-8 right-8 w-4 h-4 border-b border-r border-black" />
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 border border-black rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-black rounded-full" />
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
