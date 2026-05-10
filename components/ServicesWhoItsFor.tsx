'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function ServicesWhoItsFor() {
  const containerRef = useRef<HTMLDivElement>(null)
  const topHalfRef = useRef<HTMLDivElement>(null)
  const bottomHalfRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      })

      // Initial State: Halves are slightly separated or overlapping
      gsap.set(topHalfRef.current, { height: '100vh', y: '-50%' })
      gsap.set(bottomHalfRef.current, { height: '100vh', y: '50%' })
      gsap.set('.fit-content', { opacity: 0, y: -50 })
      gsap.set('.no-fit-content', { opacity: 0, y: 50 })

      // 1. Entrance: The two halves slide together to meet at the center line
      tl.to(topHalfRef.current, { y: '0%', height: '50vh', duration: 2, ease: 'power2.inOut' }, 0)
        .to(bottomHalfRef.current, { y: '0%', height: '50vh', duration: 2, ease: 'power2.inOut' }, 0)

      // 2. Content Fades In
      tl.to('.fit-content', { opacity: 1, y: 0, duration: 1 }, 1)
        .to('.no-fit-content', { opacity: 1, y: 0, duration: 1 }, 1)

      // 3. Hold for reading
      tl.to({}, { duration: 2 })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden border-t border-white/5"
    >
      {/* ── TOP HALF: THE FIT ─────────────────────────────────────────── */}
      <div 
        ref={topHalfRef}
        className="absolute top-0 left-0 w-full bg-[var(--chartreuse)] flex flex-col items-center justify-end overflow-hidden"
      >
        <div className="fit-content w-full max-w-6xl px-6 lg:px-12 pb-12 lg:pb-20 text-center">
          <span className="font-mono text-[10px] tracking-[0.4em] font-bold text-black/40 uppercase mb-8 block">
            THE IDEAL FIT
          </span>
          <h2 className="font-[var(--font-tusker)] text-[clamp(40px,7vw,100px)] leading-[0.85] text-black uppercase mb-10">
            Ambitious B2B &<br />Luxury Brands.
          </h2>
          <p className="font-[var(--font-cabinet)] text-black text-[clamp(18px,2vw,28px)] leading-tight max-w-4xl mx-auto font-medium italic">
            &quot;Senior marketing thinking without the overhead of a traditional agency. 
            Particularly strong for B2B SaaS, Professional Services, CRE, Private Equity, and Five-Star Hospitality.&quot;
          </p>
        </div>
        
        {/* The Divider Line */}
        <div className="w-full h-[1px] bg-black/10" />
      </div>

      {/* ── BOTTOM HALF: THE NO-FIT ────────────────────────────────────── */}
      <div 
        ref={bottomHalfRef}
        className="absolute bottom-0 left-0 w-full bg-black flex flex-col items-center justify-start overflow-hidden"
      >
        {/* The Divider Line */}
        <div className="w-full h-[1px] bg-white/10" />

        <div className="no-fit-content w-full max-w-6xl px-6 lg:px-12 pt-12 lg:pt-20 text-center">
          <span className="font-mono text-[10px] tracking-[0.4em] font-bold text-white/20 uppercase mb-8 block">
            NOT THE RIGHT FIT
          </span>
          <h3 className="font-[var(--font-tusker)] text-[clamp(32px,5vw,72px)] leading-[0.85] text-white/40 uppercase mb-8">
            High-Volume Social or<br />Pure Performance Ads.
          </h3>
          <p className="font-[var(--font-cabinet)] text-white/30 text-[clamp(16px,1.8vw,24px)] leading-relaxed max-w-3xl mx-auto font-light">
            We are not for brands looking for 50 posts a week or spray-and-pray ads 
            without a strategic layer. We build deeper, and that&apos;s what we charge for.
          </p>
        </div>
      </div>

      {/* Background Label (Sticky) */}
      <div className="absolute top-1/2 left-6 lg:left-12 -translate-y-1/2 z-30 pointer-events-none origin-left -rotate-90">
        <span className="font-mono text-[10px] tracking-[0.5em] font-bold text-white mix-blend-difference uppercase">
          QUALIFICATION FILTER
        </span>
      </div>
    </section>
  )
}
