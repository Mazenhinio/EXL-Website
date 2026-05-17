'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

export default function AdviseFooterCTA() {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoContainerRef = useRef<HTMLDivElement>(null)
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
            scrub: 0.5,
          }
        })

        // Initial states: Black background, huge scaled-up X logo
        gsap.set(containerRef.current, { backgroundColor: '#000000' })
        gsap.set(logoContainerRef.current, { scale: 25, opacity: 0 })
        gsap.set(contentRef.current, { opacity: 0, y: 100 })

        // 1. ZOOM OUT LOGO & BACKGROUND FLIP TO CHARTREUSE
        tl.to(logoContainerRef.current, {
          scale: 1,
          opacity: 0.85,
          duration: 25,
          ease: 'power1.inOut'
        })

        tl.to(containerRef.current, {
          backgroundColor: '#DEFF00',
          duration: 15,
          ease: 'power2.inOut'
        }, '-=15')

        // 2. CONTENT FADES & TRANSITIONS UP
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
      className="relative w-full h-[220vh] bg-black z-20 selection:bg-black selection:text-white"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6">
        
        {/* Symmetrical film grain overlay */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.035] dense-film-grain" />

        {/* Dynamic Zooming X Letterform */}
        <div 
          ref={logoContainerRef}
          className="relative w-64 h-64 md:w-96 md:h-96 mb-6 md:mb-10 z-10 opacity-0"
        >
          <img 
            src="/assets/images/X.webp"
            alt="EXL Logo Mark"
            className="w-full h-full object-contain invert brightness-0 transition-all duration-300 group-hover:rotate-6"
          />
        </div>

        {/* Dynamic Content Pane */}
        <div 
          ref={contentRef}
          className="flex flex-col items-center text-center z-10 max-w-4xl"
        >
          <h2 
            style={{ 
              fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
              lineHeight: 1.05
            }}
            className="text-black font-black text-[clamp(38px,8vw,90px)] uppercase mb-8 max-w-[1200px]"
          >
            START WITH<br />THE THINKING.
          </h2>

          {/* Value objection box */}
          <div className="bg-black/5 backdrop-blur-md rounded-[2rem] p-8 border border-black/10 max-w-2xl mx-auto mb-10 text-black/90 font-medium text-lg md:text-xl font-[var(--font-cabinet)] leading-relaxed shadow-lg">
            Book a strategy call. We&apos;ll spend 20 minutes on your situation. If there&apos;s a fit, we&apos;ll scope the work. If there isn&apos;t, we&apos;ll tell you.
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="/contact" 
              className="group relative flex items-center gap-4 bg-black text-[var(--chartreuse)] pl-8 pr-2 py-2 rounded-full transition-all duration-300 hover:scale-105 shadow-2xl"
            >
              <span className="font-[var(--font-cabinet)] font-bold text-lg md:text-xl">Book a strategy call</span>
              <div className="w-12 h-12 md:w-14 md:h-14 bg-[var(--chartreuse)] rounded-full flex items-center justify-center text-black transition-all duration-300 group-hover:rotate-45">
                <svg 
                  width="28" 
                  height="28" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </div>
            </Link>

            <a 
              href="mailto:info@exl.agency" 
              className="font-[var(--font-tusker)] text-black hover:opacity-75 transition-opacity text-sm uppercase tracking-[0.3em] font-medium border-b border-black/20 pb-1"
            >
              info@exl.agency
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
