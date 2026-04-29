'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

const GRAIN_URL = '/cinematic_grainy_texture_1777465783570.png'

export default function Advantage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)

  const steps = [
    {
      left: 'WEEKS',
      right: 'NOT QUARTERS',
      body: 'From brief to first delivery.',
    },
    {
      left: 'SENIOR JUDGMENT',
      right: 'MACHINE LIFT',
      body: 'On every decision, with machines doing the lift underneath.',
    },
    {
      left: 'SCALABLE SYSTEMS',
      right: 'NOT HEADCOUNT',
      body: 'Production and distribution systems that scale with your growth.',
    }
  ]

  useEffect(() => {
    let ctx: any;
    
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        if (!containerRef.current) return

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          }
        })

        // 1. Initial Intro Hold & Exit
        tl.to({}, { duration: 25 }) 
        tl.to('.adv-intro', {
          opacity: 0,
          y: -150,
          duration: 15,
          ease: 'none'
        })

        // 2. Sequential Clashes
        steps.forEach((step, i) => {
          const stepLabel = `step-${i}`
          const panelSelector = `.clash-panel-${i}`
          
          tl.to(panelSelector, { opacity: 1, duration: 4 }, stepLabel)

          tl.fromTo(`${panelSelector} .word-left`, 
            { x: '-180vw' }, 
            { x: '-8%', duration: 15, ease: 'none', immediateRender: true },
            stepLabel
          )
          tl.fromTo(`${panelSelector} .word-right`, 
            { x: '180vw' }, 
            { x: '8%', duration: 15, ease: 'none', immediateRender: true },
            stepLabel
          )

          tl.fromTo(`${panelSelector} .grain-bg`, 
            { opacity: 0, scale: 1.1 },
            { opacity: 0.35, scale: 1, duration: 8, ease: 'none', immediateRender: true },
            `${stepLabel}+=8`
          )

          tl.fromTo(`${panelSelector} .body-text`, 
            { opacity: 0, y: 80 },
            { opacity: 1, y: 0, duration: 6, ease: 'none', immediateRender: true },
            `${stepLabel}+=12`
          )

          tl.to({}, { duration: 20 }) // EXTENDED HOLD

          if (i < steps.length - 1) {
            tl.to(panelSelector, { opacity: 0, y: -100, duration: 8, ease: 'none' })
          }
        })

        // Final hold at the very end of the rail
        tl.to({}, { duration: 15 })

      }, containerRef)
    }

    init()
    return () => ctx && ctx.revert()
  }, [])

  return (
    <section 
      ref={containerRef} 
      id="advantage" 
      className="relative bg-[var(--eerie)]"
      style={{ height: '1500vh' }}
    >
      <div 
        ref={stickyRef}
        className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          {/* INTRO PANEL */}
          <div className="adv-intro absolute inset-0 z-50 flex flex-col items-center justify-center px-6 text-center bg-[var(--eerie)]">
            <div className="section-label mb-12 text-[var(--taupe)] font-semibold uppercase tracking-[0.15em] text-[11px]">
              The EXL Advantage
            </div>
            <h2 className="font-[var(--font-tusker)] text-[clamp(36px,7vw,90px)] leading-[0.9] uppercase text-white max-w-[1100px] mb-8">
              A traditional consultancy with an <br/>
              <span className="text-[var(--chartreuse)]">AI-native engine</span> underneath.
            </h2>
            <p className="font-[var(--font-cabinet)] text-[clamp(16px,1.4vw,20px)] text-white/60 max-w-[850px] font-light leading-relaxed">
              Every EXL deliverable runs through an AI-accelerated workflow. Not to replace the work, to compress the timeline. We build and maintain internal automation systems that handle research, transcription, editing assistance, content repurposing, CRM sync, and distribution, so our senior team spends their hours on strategy and craft, not on tasks a machine can do better.
            </p>
          </div>

          {/* CLASH PANELS */}
          {steps.map((step, i) => (
            <div 
              key={i} 
              className={`clash-panel-${i} absolute inset-0 opacity-0 pointer-events-none flex flex-col items-center justify-center`}
            >
              {/* Grainy Cinematic Background */}
              <div className="grain-bg absolute inset-0 pointer-events-none z-0">
                <Image 
                  src={GRAIN_URL} 
                  alt="Grain Texture" 
                  fill 
                  className="object-cover opacity-60 mix-blend-overlay"
                  priority
                />
                <div className="absolute inset-0 bg-radial-[circle,transparent_20%,var(--eerie)_100%]" />
              </div>

              <div className="relative z-10 w-full flex flex-col items-center">
                {/* TYPOGRAPHY CLASH */}
                <div className="relative flex items-center justify-center w-full h-[50vh]">
                  <h3 className="word-left font-[var(--font-tusker)] text-[clamp(40px,14vw,200px)] text-[var(--chartreuse)] uppercase whitespace-nowrap absolute mix-blend-difference z-20 -translate-y-1/3">
                    {step.left}
                  </h3>
                  <h3 className="word-right font-[var(--font-tusker)] text-[clamp(40px,14vw,200px)] text-white uppercase whitespace-nowrap absolute mix-blend-difference z-10 translate-y-1/3">
                    {step.right}
                  </h3>
                </div>

                {/* BODY TEXT */}
                <div className="body-text max-w-[750px] text-center mt-8 px-10">
                  <p className="font-[var(--font-cabinet)] text-[clamp(18px,2.5vw,28px)] font-light leading-snug text-white/90">
                    {step.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE FALLBACK */}
      <div className="lg:hidden relative z-[100] bg-[var(--eerie)] px-6 py-24 space-y-20 border-t border-white/10">
        <div className="text-center">
          <div className="section-label mb-8 text-[var(--taupe)]">The EXL Advantage</div>
          <h2 className="font-[var(--font-tusker)] text-5xl leading-none uppercase text-white">
            AI-native engine
          </h2>
        </div>
        
        {steps.map((step, i) => (
          <div key={i} className="space-y-6">
            <h3 className="font-[var(--font-tusker)] text-4xl text-[var(--chartreuse)] leading-tight uppercase">
              {step.left} <br />
              <span className="text-white">{step.right}</span>
            </h3>
            <p className="font-[var(--font-cabinet)] text-lg text-white/70 leading-relaxed font-light">
              {step.body}
            </p>
          </div>
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 1023px) {
          #advantage { height: auto !important; }
          .sticky { position: relative !important; height: auto !important; display: none !important; }
        }
      `}</style>
    </section>
  )
}
