'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

export default function B2BPodcastFooterCTA() {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoContainerRef = useRef<HTMLDivElement>(null)
  const logoImageRef = useRef<HTMLImageElement>(null)
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

        // Initial state: Dark slate background, massive inverted logo
        gsap.set(containerRef.current, { backgroundColor: '#0a0807' })
        gsap.set(logoContainerRef.current, { scale: 30, opacity: 0 })
        gsap.set(contentRef.current, { opacity: 0, y: 100 })

        // 1. ZOOM OUT LOGO & BACKGROUND FLIP TO CHARTREUSE
        tl.to(logoContainerRef.current, {
          scale: 1,
          opacity: 1,
          duration: 25,
          ease: 'power1.inOut'
        })

        tl.to(containerRef.current, {
          backgroundColor: '#ff5500',
          duration: 15,
          ease: 'power2.inOut'
        }, '-=15')

        // 2. CONTENT FADES IN & TRANSITIONS UP
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
      className="relative w-full h-[220vh] bg-[#0a0807] z-20"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6">
        
        {/* Uniform film grain overlay */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.045] dense-film-grain" />

        {/* Dynamic Zooming Best in B2B Logo */}
        <div 
          ref={logoContainerRef}
          className="relative w-64 h-24 md:w-96 md:h-32 mb-8 md:mb-12 z-10"
        >
          <img 
            ref={logoImageRef}
            src="/assets/images/best-in-b2b-logo-black.webp"
            alt="Best in B2B Logo"
            className="w-full h-full object-contain"
            style={{ filter: 'invert(1) brightness(2)', WebkitFilter: 'invert(1) brightness(2)' }}
          />
        </div>

        {/* Dynamic Content Pane */}
        <div 
          ref={contentRef}
          className="flex flex-col items-center text-center z-10"
        >
          <h2 
            style={{ 
              fontFamily: 'var(--font-mona-narrow)',
              lineHeight: 1.05
            }}
            className="text-white font-black text-[clamp(38px,10vw,100px)] uppercase mb-6 max-w-[1200px]"
          >
            READY TO LAUNCH<br />YOUR SHOW?
          </h2>

          {/* Objection / Pitch text box */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 max-w-2xl mx-auto mb-10 text-white/90 font-medium text-base md:text-lg font-[var(--font-cabinet)]">
            {"20 minutes. No pitch. If there's a fit, we'll scope it. If there isn't, we'll tell you."}
          </div>

          <Link 
            href="/contact" 
            className="group relative flex items-center gap-4 bg-black text-[#ff5500] pl-8 pr-2 py-2 rounded-full transition-all duration-300 hover:scale-105 shadow-2xl"
          >
            <span className="font-[var(--font-cabinet)] font-bold text-lg md:text-xl">Book your discovery call</span>
            <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center text-black transition-all duration-300 group-hover:rotate-45">
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
        </div>

      </div>
    </section>
  )
}
