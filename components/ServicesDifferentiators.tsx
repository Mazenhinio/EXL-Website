'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const DIFFERENTIATORS = [
  {
    isCover: true,
    title: "HOW WE'RE DIFFERENT",
    description: "The senior thinking of a global firm. The speed of an AI-native studio.",
    image: null
  },
  {
    label: 'PILLAR 01',
    title: 'Senior strategy, not junior execution.',
    description: 'Every engagement is led by a founder with international consulting experience across three continents. The senior thinking the big firms charge for, without the layers between you and the person actually solving your problem.',
    image: '/assets/images/diff-senior.png'
  },
  {
    label: 'PILLAR 02',
    title: "AI-native, so your timeline isn't a problem.",
    description: "Our production, content, and distribution stack was built on AI from day one. A lean Dallas team ships in weeks what traditional agencies ship in quarters. You move at the pace of your market.",
    image: '/assets/images/diff-ai.png'
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
          end: `+=${slides.length * 65}%`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
        }
      })

      slides.forEach((slide, i) => {
        const content = slide.querySelector('.diff-content')
        const bgLabel = slide.querySelector('.diff-bg-label')
        const bgImage = slide.querySelector('.diff-bg-image')

        if (i === 0) {
          // COVER SLIDE: Start visible and zoom OUT
          gsap.set(content, { scale: 1, opacity: 1 })
          
          tl.to(content, {
            scale: 5,
            opacity: 0,
            filter: 'blur(20px)',
            duration: 0.4,
            ease: 'power2.in'
          }, 0)
        } else {
          // PILLAR SLIDES: Zoom IN from void
          gsap.set(content, { scale: 0.01, opacity: 0, filter: 'blur(10px)' })
          gsap.set(bgLabel, { opacity: 0, scale: 0.5 })
          if (bgImage) gsap.set(bgImage, { scale: 1.2, opacity: 0 })

          // Manual timing for balance
          // i=1 (Pillar 1) starts at 0.4 (perfect transition from cover)
          // i=2 (Pillar 2) starts at 1.5 (more breathing room)
          const startTime = i === 1 ? 0.4 : 1.5

          tl.to(content, {
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.5,
            ease: 'power2.inOut'
          }, startTime)

          tl.to(bgLabel, {
            opacity: 0.05,
            scale: 1,
            duration: 0.5,
            ease: 'power2.inOut'
          }, startTime)

          if (bgImage) {
            tl.to(bgImage, {
              opacity: 0.4,
              scale: 1,
              duration: 0.5,
              ease: 'power2.inOut'
            }, startTime)
          }

          // Hold to let them read
          tl.to({}, { duration: 0.5 })

          // Exit (if not the last one)
          if (i < slides.length - 1) {
            tl.to(content, {
              scale: 5,
              opacity: 0,
              filter: 'blur(20px)',
              duration: 0.5,
              ease: 'power2.in'
            })
            tl.to(bgLabel, {
              scale: 2,
              opacity: 0,
              duration: 0.5,
              ease: 'power2.in'
            }, '<')
            if (bgImage) {
              tl.to(bgImage, {
                scale: 0.8,
                opacity: 0,
                duration: 0.5,
                ease: 'power2.in'
              }, '<')
            }
          }
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
      <div className="relative w-full h-full">
        {DIFFERENTIATORS.map((diff, i) => (
          <div 
            key={i}
            className="diff-slide absolute inset-0 flex items-center justify-center p-6 lg:p-12"
          >
            {/* Background Image Layer (only for pillars) */}
            {diff.image && (
              <div className="diff-bg-image absolute inset-0 z-0">
                <Image 
                  src={diff.image} 
                  alt={diff.title} 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/60" />
              </div>
            )}

            {/* Massive Ghost Label (only for pillars) */}
            {!diff.isCover && (
              <div className="diff-bg-label absolute inset-0 flex items-center justify-center pointer-events-none select-none z-1">
                <span className="font-[var(--font-tusker)] text-[40vw] text-white opacity-0 whitespace-nowrap">
                  {diff.label}
                </span>
              </div>
            )}

            {/* Content Box */}
            <div className={`diff-content relative z-10 max-w-5xl text-center space-y-12 ${diff.isCover ? 'scale-100' : ''}`}>
              <h3 
                style={{
                  fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
                  lineHeight: 1.05
                }}
                className={`text-white uppercase ${diff.isCover ? 'text-[clamp(60px,12vw,180px)]' : 'text-[clamp(44px,8vw,120px)]'}`}>
                {diff.title}
              </h3>
              <p className={`font-[var(--font-cabinet)] text-white/80 leading-tight max-w-4xl mx-auto font-light ${diff.isCover ? 'text-[clamp(24px,3vw,44px)]' : 'text-[clamp(20px,2.5vw,36px)]'}`}>
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
