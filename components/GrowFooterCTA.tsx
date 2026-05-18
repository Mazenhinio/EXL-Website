'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function GrowFooterCTA() {
  const containerRef = useRef<HTMLDivElement>(null)
  const xRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadGsap = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (!containerRef.current) return

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5,
          }
        })

        // Initial state: Black background, massive X
        gsap.set(containerRef.current, { backgroundColor: '#1a1a1a' })
        gsap.set(xRef.current, { scale: 50, opacity: 0 })
        gsap.set(contentRef.current, { opacity: 0, y: 100 })

        // 1. ZOOM OUT & BACKGROUND COLOR SHIFT FLIP
        tl.to(xRef.current, {
          scale: 1,
          opacity: 1,
          duration: 25,
          ease: 'power1.inOut'
        })

        tl.to(containerRef.current, {
          backgroundColor: '#DEFF00',
          duration: 15,
          ease: 'power2.inOut'
        }, '-=15')

        // 2. BUILD COPY FADES IN
        tl.to(contentRef.current, {
          opacity: 1,
          y: 0,
          duration: 10,
          ease: 'power2.out'
        }, '-=5')
      })

      return () => ctx.revert()
    }

    const timer = setTimeout(() => {
      loadGsap()
    }, 150)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[320vh] bg-[#1a1a1a] z-20 selection:bg-black selection:text-white"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6">
        
        {/* VIBRATING EXL LOGO GATE */}
        <div 
          ref={xRef}
          className="relative w-32 h-32 md:w-48 md:h-48 mb-6 md:mb-8"
        >
          <Image 
            src="/assets/images/x-vibration.webp"
            alt="EXL X Vibration"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* BUILD CTAs & MAILTO */}
        <div 
          ref={contentRef}
          className="flex flex-col items-center text-center max-w-[1200px]"
        >
          <span className="font-[var(--font-mona-narrow)] text-[10px] tracking-[0.25em] text-black/60 uppercase font-semibold mb-3">
            Grow Pipeline Audit
          </span>
          
          <h2 
            style={{ 
              fontFamily: 'var(--font-tusker)',
              lineHeight: 1.05
            }}
            className="text-[#1a1a1a] text-[clamp(36px,10vw,96px)] uppercase mb-6"
          >
            LET&apos;S TALK ABOUT PIPELINE.
          </h2>

          <p className="font-[var(--font-cabinet)] text-black/85 text-lg md:text-2xl font-light mb-12 max-w-2xl leading-relaxed">
            A 20-minute conversation about your current program, what&apos;s working, and what might unlock the next level.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Link 
              href="/contact" 
              className="group relative flex items-center gap-4 bg-[#1a1a1a] text-[#DEFF00] pl-8 pr-2 py-2 rounded-full transition-all duration-300 hover:scale-105 shadow-2xl"
            >
              <span className="font-[var(--font-cabinet)] font-bold text-lg">Book a call</span>
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black transition-all duration-300 group-hover:rotate-45">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </div>
            </Link>

            <a 
              href="mailto:info@exl.agency"
              className="font-[var(--font-mona-narrow)] font-bold text-black border-b-2 border-black/25 hover:border-black transition-all text-lg md:text-xl py-1 px-2"
            >
              info@exl.agency
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
