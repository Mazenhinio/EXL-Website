'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
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
          end: '+=120%',
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
        className="absolute top-0 left-0 w-full bg-[var(--chartreuse)] flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/images/fit-yes.webp" 
            alt="Ideal Fit" 
            fill 
            className="object-cover opacity-20 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--chartreuse)] via-[var(--chartreuse)]/80 to-transparent" />
        </div>

        <div className="fit-content relative z-10 w-full max-w-6xl px-6 lg:px-12 py-4 text-center">
          <div className="py-2 px-8 inline-block w-full">
            <span 
              className="text-base tracking-[0.4em] font-bold text-black uppercase mb-4 block"
              style={{ fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif" }}
            >
              THE IDEAL FIT
            </span>
            <h2 
              style={{
                fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
                fontSize: 'clamp(32px, 6vw, 80px)',
                lineHeight: 1.3,
                color: '#000000',
                textTransform: 'uppercase'
              }}
              className="mb-6"
            >
              Ambitious B2B &<br />Luxury Brands.
            </h2>
            <p className="font-[var(--font-cabinet)] text-black text-[clamp(16px,1.8vw,22px)] leading-tight max-w-4xl mx-auto font-medium italic">
              &quot;Senior marketing thinking without the overhead of a traditional agency. 
              Particularly strong for B2B SaaS, Professional Services, CRE, Private Equity, and Five-Star Hospitality.&quot;
            </p>
          </div>
        </div>
        
        {/* The Divider Line */}
        <div className="w-full h-[1px] bg-black/10 relative z-10" />
      </div>

      {/* ── BOTTOM HALF: THE NO-FIT ────────────────────────────────────── */}
      <div 
        ref={bottomHalfRef}
        className="absolute bottom-0 left-0 w-full bg-black flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/images/fit-no.webp" 
            alt="Not a Fit" 
            fill 
            className="object-cover opacity-60 grayscale"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>

        {/* The Divider Line */}
        <div className="w-full h-[1px] bg-white/10 relative z-10" />

        <div className="no-fit-content relative z-10 w-full max-w-6xl px-6 lg:px-12 py-4 text-center">
          <div className="bg-black/20 backdrop-blur-xl py-6 px-8 rounded-3xl border border-white/5 inline-block w-full">
            <span 
              className="text-base tracking-[0.4em] font-bold text-white/40 uppercase mb-4 block"
              style={{ fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif" }}
            >
              NOT THE RIGHT FIT
            </span>
            <h3 
              style={{
                fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
                fontSize: 'clamp(30px, 5vw, 60px)',
                lineHeight: 1.3,
                color: '#ffffff',
                textTransform: 'uppercase'
              }}
              className="mb-6"
            >
              High-Volume Social or<br />
              <span className="text-white/60">Pure Performance Ads.</span>
            </h3>
            <p className="font-[var(--font-cabinet)] text-white/80 text-[clamp(14px,1.6vw,20px)] leading-relaxed max-w-3xl mx-auto font-light">
              We are not for brands looking for 50 posts a week or spray-and-pray ads 
              without a strategic layer. {"We build deeper, and that's what we charge for."}
            </p>
          </div>
        </div>
      </div>

    </section>
  )
}
