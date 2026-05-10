'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const DIFFERENTIATORS = [
  {
    label: 'PILLAR 01',
    title: 'Senior strategy, not junior execution.',
    description: 'Every engagement is led by a founder with international consulting experience across three continents. The senior thinking the big firms charge for, without the layers between you and the person actually solving your problem.'
  },
  {
    label: 'PILLAR 02',
    title: "AI-native, so your timeline isn&apos;t a problem.",
    description: 'Our production, content, and distribution stack was built on AI from day one. A lean Dallas team ships in weeks what traditional agencies ship in quarters. You move at the pace of your market.'
  },
  {
    label: 'PILLAR 03',
    title: 'Engineered for impact, top to bottom.',
    description: 'Every decision, from the strategy brief to the lens choice on the shoot, runs through one filter: will this move the number? We build marketing that&apos;s accountable, and we own the outcome end to end.'
  }
]

export default function ServicesDifferentiators() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray('.diff-slide') as HTMLElement[]
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${slides.length * 200}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      })

      slides.forEach((slide, i) => {
        const content = slide.querySelector('.diff-content')
        const bgLabel = slide.querySelector('.diff-bg-label')

        // Initial State: Tiny and faded
        gsap.set(content, { scale: 0.01, opacity: 0, filter: 'blur(10px)' })
        gsap.set(bgLabel, { opacity: 0, scale: 0.5 })

        // 1. Entrance: Zoom IN from void
        tl.to(content, {
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 2,
          ease: 'power2.inOut'
        }, i * 3)

        tl.to(bgLabel, {
          opacity: 0.05,
          scale: 1,
          duration: 2,
          ease: 'power2.inOut'
        }, i * 3)

        // 2. Hold: Short pause at full scale
        tl.to({}, { duration: 1 })

        // 3. Exit: Zoom OUT (if not the last one)
        if (i < slides.length - 1) {
          tl.to(content, {
            scale: 5,
            opacity: 0,
            filter: 'blur(20px)',
            duration: 2,
            ease: 'power2.in'
          })
          tl.to(bgLabel, {
            scale: 2,
            opacity: 0,
            duration: 2,
            ease: 'power2.in'
          }, '<')
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden"
    >
      {/* Background Label (Fixed) */}
      <div className="absolute top-12 lg:top-20 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <span className="font-mono text-[10px] tracking-[0.4em] font-bold text-[var(--taupe)] uppercase opacity-40">
          HOW WE&apos;RE DIFFERENT
        </span>
      </div>

      <div className="relative w-full h-full">
        {DIFFERENTIATORS.map((diff, i) => (
          <div 
            key={i}
            className="diff-slide absolute inset-0 flex items-center justify-center p-6 lg:p-12"
          >
            {/* Massive Ghost Label */}
            <div className="diff-bg-label absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <span className="font-[var(--font-tusker)] text-[40vw] text-white opacity-0 whitespace-nowrap">
                {diff.label}
              </span>
            </div>

            {/* Content Box */}
            <div className="diff-content relative z-10 max-w-5xl text-center space-y-12">
              <h3 className="font-[var(--font-tusker)] text-[clamp(44px,8vw,120px)] leading-[0.85] text-white uppercase">
                {diff.title}
              </h3>
              <p className="font-[var(--font-cabinet)] text-[var(--chartreuse)] text-[clamp(20px,2.5vw,36px)] leading-tight max-w-4xl mx-auto font-light">
                {diff.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Subtle Scan Lines Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
    </section>
  )
}
