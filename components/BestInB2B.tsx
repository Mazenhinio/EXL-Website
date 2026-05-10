'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function BestInB2B() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const shutterLeftRef = useRef<HTMLDivElement>(null)
  const shutterRightRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const ghostTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadGsap = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            refreshPriority: -1,
            invalidateOnRefresh: true,
          }
        })

        // 1. Initial State
        gsap.set('.b2b-reveal-el', { opacity: 0, y: 30 })
        gsap.set(imageRef.current, { scale: 1.2, filter: 'blur(10px)' })

        // 2. Shutter Opening
        tl.to(shutterLeftRef.current, { x: '-100%', duration: 100, ease: 'power2.inOut' }, 0)
        tl.to(shutterRightRef.current, { x: '100%', duration: 100, ease: 'power2.inOut' }, 0)
        
        // 3. Headline Movement
        tl.to('.main-headline', { 
          scale: 0.8, 
          opacity: 0, 
          y: -150, 
          duration: 100, 
          ease: 'power2.inOut' 
        }, 0)

        // 4. Image Settling
        tl.to(imageRef.current, { 
          scale: 1, 
          filter: 'blur(0px)', 
          duration: 120, 
          ease: 'power2.out' 
        }, 20)

        // 5. Ghost Text Drift
        tl.fromTo(ghostTextRef.current, 
          { x: '10%' }, 
          { x: '-10%', duration: 200, ease: 'none' }, 
          0
        )

        // 6. Content Reveal
        tl.to('.b2b-reveal-el', {
          opacity: 1,
          y: 0,
          duration: 60,
          stagger: 15,
          ease: 'power2.out'
        }, 80)

        // 7. Final Hold
        tl.to({}, { duration: 50 })
      })

      ScrollTrigger.refresh()
      const timer = setTimeout(() => ScrollTrigger.refresh(), 500)
      
      return () => {
        ctx.revert()
        clearTimeout(timer)
      }
    }
    loadGsap()
  }, [])

  return (
    <section 
      ref={containerRef} 
      id="best-in-b2b" 
      className="relative w-full h-[300vh] bg-[#5d4c39]"
    >
      <div 
        ref={stickyRef} 
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center"
      >
        {/* Ghost Branding Layer */}
        <div 
          ref={ghostTextRef}
          className="absolute inset-0 z-0 flex items-center justify-center whitespace-nowrap pointer-events-none"
        >
          <span 
            style={{ fontFamily: 'var(--font-tusker)' }}
            className="text-[35vw] leading-none text-white/[0.03] uppercase select-none"
          >
            B2B.MEDIA
          </span>
        </div>

        {/* The revealed image */}
        <div ref={imageRef} className="absolute inset-0 z-10">
          <Image
            src="/assets/images/best-in-b2b.webp"
            alt="Dallas on-location production setup"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
        </div>

        {/* The Shutters */}
        <div 
          ref={shutterLeftRef} 
          className="absolute left-0 top-0 bottom-0 w-1/2 bg-[#5d4c39] z-40 border-r border-white/5" 
        />
        <div 
          ref={shutterRightRef} 
          className="absolute right-0 top-0 bottom-0 w-1/2 bg-[#5d4c39] z-40 border-l border-white/5" 
        />

        <div className="main-headline absolute inset-0 z-50 flex items-center justify-center pointer-events-none px-6">
          <div className="relative w-full max-w-[800px] aspect-[15/10] invert brightness-200">
            <Image
              src="/assets/images/best-in-b2b-logo-black.webp"
              alt="Best in B2B Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Foreground Content (Revealed) */}
        <div ref={contentRef} className="relative z-30 w-full max-w-4xl px-6 flex flex-col items-center text-center">
          <p className="b2b-reveal-el section-label mb-8 text-[var(--chartreuse)] font-semibold uppercase tracking-[0.15em] text-[11px]">
            Owned Media
          </p>
          <h3 
            style={{ fontFamily: 'var(--font-tusker)' }}
            className="b2b-reveal-el text-white text-[clamp(32px,6vw,56px)] leading-[1.05] uppercase mb-8"
          >
            Our most visible build:<br />
            <span className="text-[var(--chartreuse)]">Best in B2B.</span>
          </h3>
          <div className="b2b-reveal-el bg-black/80 backdrop-blur-md rounded-2xl p-8 lg:p-10 border border-white/5 shadow-2xl mb-12 max-w-3xl mx-auto">
            <p 
              className="font-[var(--font-cabinet)] text-white/90 text-[clamp(16px,2vw,19px)] font-light leading-relaxed"
            >
              Best in B2B is our own video podcast, filmed on location across
              Dallas-Fort Worth. Framework-driven conversations with the operators
              shaping the market. Everything we build for our clients, we built
              here first.
            </p>
          </div>
          <div className="b2b-reveal-el">
            <Link
              href="https://b2b.media"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 bg-[var(--chartreuse)] text-black px-10 py-5 rounded-full font-[var(--font-tusker)] text-[14px] tracking-widest uppercase transition-transform hover:scale-105"
            >
              Visit b2b.media
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE FALLBACK */}
      <div className="lg:hidden relative z-[100] bg-[#5d4c39] px-6 py-24 space-y-16">
        <div className="text-center">
          <p className="section-label mb-4 text-white/50 font-semibold uppercase tracking-[0.15em] text-[11px]">
            Owned Media
          </p>
          <div className="relative w-full max-w-[300px] aspect-[15/10] mx-auto mb-8 invert brightness-200">
            <Image
              src="/assets/images/best-in-b2b-logo-black.webp"
              alt="Best in B2B Logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-8 shadow-xl">
            <Image
              src="/assets/images/best-in-b2b.webp"
              alt="Dallas production"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/10 mb-10 text-left">
            <p className="font-[var(--font-cabinet)] text-white text-lg font-medium leading-relaxed">
              Best in B2B is our own video podcast, filmed on location across DFW. Framework-driven conversations with market operators.
            </p>
          </div>
          <Link
            href="https://b2b.media"
            target="_blank"
            className="inline-flex bg-black text-[var(--chartreuse)] px-8 py-4 rounded-full font-[var(--font-tusker)] text-[12px] tracking-widest uppercase"
          >
            Visit b2b.media
          </Link>
        </div>
      </div>

      <style jsx>{`
        .text-outline-black {
          -webkit-text-stroke: 1.5px black;
        }
        @media (max-width: 1023px) {
          #best-in-b2b { height: auto !important; }
          .sticky { display: none !important; }
        }
      `}</style>
    </section>
  )
}
