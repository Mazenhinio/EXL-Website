'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function FooterCTA() {
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
            scrub: 0.5,
          }
        })

        // Initial state: Black background, massive X
        gsap.set(containerRef.current, { backgroundColor: '#1a1a1a' })
        gsap.set(xRef.current, { scale: 50, opacity: 0 })
        gsap.set(contentRef.current, { opacity: 0, y: 100 })

        // 1. ZOOM OUT & BACKGROUND FLIP
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

        // 2. CONTENT FADES IN & COLOR ADJUSTS
        tl.to(contentRef.current, {
          opacity: 1,
          y: 0,
          duration: 10,
          ease: 'power2.out'
        }, '-=5')
      })

      return () => ctx.revert()
    }
    loadGsap()
  }, [])

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[220vh] bg-[#1a1a1a]"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6">
        
        {/* VIBRATING X - Positioned above the text after zoom out */}
        <div 
          ref={xRef}
          className="relative w-32 h-32 md:w-48 md:h-48 mb-8 md:mb-12"
        >
          <Image 
            src="/assets/images/x-vibration.webp"
            alt="X Vibration"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* CONTENT */}
        <div 
          ref={contentRef}
          className="flex flex-col items-center text-center"
        >
          <h2 
            style={{ 
              fontFamily: 'var(--font-tusker)',
              lineHeight: 1.1
            }}
            className="text-[#1a1a1a] text-[clamp(44px,12vw,120px)] uppercase mb-12 max-w-[1200px]"
          >
            READY TO DOMINATE<br />YOUR MARKET?
          </h2>

          <Link href="/contact" className="group relative flex items-center gap-4 bg-[#1a1a1a] text-[#DEFF00] pl-8 pr-2 py-2 rounded-full transition-all duration-300 hover:scale-105 shadow-2xl">
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
