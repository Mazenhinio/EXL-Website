'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const PITFALLS = [
  {
    tag: 'OPTION 01',
    label: 'THE STRATEGY FIRM',
    text: 'Hire a strategy firm and you get a beautiful deck and no one to execute it. The partners sell the vision, the juniors build the slides, and you are left with a 100-page PDF that dies in a drawer.',
    image: '/assets/images/pitfall-firm.png'
  },
  {
    tag: 'OPTION 02',
    label: 'THE TRADITIONAL AGENCY',
    text: 'Hire an agency and you get execution without a clear strategy behind it. They ship assets, not outcomes. You get "content" that looks good but doesn’t move the needle because it wasn’t built on a foundation.',
    image: '/assets/images/pitfall-agency.png'
  },
  {
    tag: 'OPTION 03',
    label: 'THE FREELANCE NETWORK',
    text: 'Hire freelancers and you become the project manager by default. You spend 80% of your week coordinating handoffs between a writer, a designer, and a dev. You aren’t running marketing; you’re running a circus.',
    image: '/assets/images/pitfall-freelance.png'
  }
]

export default function ServicesIntro() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // 1. PIN the entire section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=300%', // Longer scroll to handle 3 cards + solution
          pin: true,
          scrub: 1,
        }
      })

      // 2. Card Stacking Animation
      const cards = gsap.utils.toArray('.pitfall-card') as HTMLElement[]
      
      cards.forEach((card, i) => {
        if (i === 0) return // First card is already visible

        tl.fromTo(card, 
          { y: '100%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 1, ease: 'none' },
          i * 1.5 // staggered start
        )
        
        // Slightly dim/scale previous card
        if (i > 0) {
          tl.to(cards[i-1], { 
            scale: 0.95, 
            opacity: 0.3, 
            duration: 1 
          }, '<')
        }
      })

      // 3. Solution Reveal
      tl.to('.comparison-grid', {
        opacity: 0,
        y: -50,
        filter: 'blur(20px)',
        duration: 1,
        delay: 1
      })

      tl.fromTo('.solution-full',
        { opacity: 0, y: 100, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: 'power3.out' },
        '>'
      )

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen bg-[#0A0A0A] overflow-hidden"
    >
      <div className="comparison-grid h-full w-full flex flex-col lg:flex-row px-6 lg:px-12 py-20 lg:py-32 gap-12 lg:gap-24">
        
        {/* LEFT COLUMN: STICKY HEADLINE */}
        <div className="lg:w-1/2 flex flex-col items-center lg:items-start justify-start pt-4">
          <h2 
            style={{
              fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
              fontSize: 'clamp(44px, 7vw, 90px)',
              lineHeight: 1.05,
              color: '#ffffff',
              textTransform: 'uppercase'
            }}
          >
            Most brands are stuck between<br />
            <span className="text-white/30">bad options.</span>
          </h2>
        </div>

        {/* RIGHT COLUMN: SCROLLING CARDS */}
        <div 
          ref={rightColRef}
          className="lg:w-1/2 relative h-[60vh] lg:h-full"
        >
          {PITFALLS.map((pitfall, i) => (
            <div 
              key={i}
              className="pitfall-card absolute inset-0 bg-neutral-900 overflow-hidden flex flex-col justify-between"
              style={{ zIndex: i + 1 }}
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 z-0">
                <Image 
                  src={pitfall.image} 
                  alt={pitfall.label} 
                  fill 
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              </div>

              <div className="relative z-10 p-8 lg:p-16 space-y-12">
                <div className="flex justify-between items-center border-b border-white/10 pb-6">
                  <span 
                    className="text-[10px] tracking-[0.3em] font-bold text-[var(--chartreuse)]"
                    style={{ fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif" }}
                  >
                    {pitfall.tag}
                  </span>
                  <div className="w-12 h-[1px] bg-white/20" />
                </div>
                
                <h3 
                  className="text-white text-[clamp(32px,4vw,56px)] uppercase leading-none"
                  style={{ fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif" }}
                >
                  {pitfall.label}
                </h3>
                
                <p className="font-[var(--font-cabinet)] text-white/70 text-[clamp(18px,1.8vw,24px)] leading-relaxed font-light">
                  {pitfall.text}
                </p>
              </div>

              <div 
                className="relative z-10 p-8 lg:p-16 pt-0 text-[10px] tracking-[0.3em] text-white/30 uppercase"
                style={{ fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif" }}
              >
                SCROLL TO CONTINUE —
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FULL WIDTH SOLUTION REVEAL */}
      <div className="solution-full absolute inset-0 bg-black flex flex-col items-center justify-center text-center px-6 pointer-events-none opacity-0">
        <div className="max-w-5xl space-y-12">
          <h3 
            style={{
              fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
              fontSize: 'clamp(44px, 8vw, 100px)',
              lineHeight: 1.05,
              color: '#ffffff',
              textTransform: 'uppercase'
            }}
          >
            EXL was built to<br />
            end that <span 
              className="text-black px-3 pt-0 pb-4 inline-block"
              style={{ 
                background: 'linear-gradient(to bottom, transparent 10%, var(--chartreuse) 10%)' 
              }}
            >
              tradeoff.
            </span>
          </h3>
          <p className="font-[var(--font-cabinet)] text-white text-[clamp(20px,2.5vw,36px)] leading-tight max-w-4xl mx-auto font-light">
            We advise, produce, build, and grow under one roof, with a senior team running each engagement end to end.
          </p>
        </div>
      </div>
    </section>
  )
}
