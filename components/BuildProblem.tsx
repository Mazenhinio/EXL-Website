'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function BuildProblem() {
  const containerRef = useRef<HTMLDivElement>(null)
  const wheelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!containerRef.current || !wheelRef.current) return

    const ctx = gsap.context(() => {
      // 1. Set initial 3D properties on the turntable wheel (upright orientation)
      gsap.set(wheelRef.current, {
        transformPerspective: 1400,
        rotationX: 0, // Perfectly upright relative to the camera
        rotationY: 0
      })

      // 2. Timeline ScrollTrigger - pin the screen-height container and rotate the wheel
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=140%', // Snug scroll track length (140% of viewport height)
          scrub: 0.8, // tighter scrub for stiffer, highly controlled rotation tracking
          pin: true,
          anticipatePin: 1,
          snap: {
            snapTo: 1 / (5 - 1), // Snaps perfectly to 0, 0.25, 0.5, 0.75, 1.0
            duration: { min: 0.25, max: 0.55 },
            delay: 0.06,
            ease: 'power2.out'
          }
        }
      })

      // Spin the horizontal turntable
      tl.to(wheelRef.current, {
        rotationY: -288,
        ease: 'none',
        duration: 10
      }, 0)

      // 3. Staggered focus updates for cards (opacity) and right-side photos (opacity + scale zoom)
      const cardsCount = 5
      const stepDuration = 10 / (cardsCount - 1) // divide timeline duration across steps

      for (let i = 0; i < cardsCount; i++) {
        const startStep = i * stepDuration
        
        for (let j = 0; j < cardsCount; j++) {
          const isActive = j === i
          
          // Card opacity focus
          tl.to(`.carousel-card-${j}`, {
            opacity: isActive ? 1 : 0.12,
            duration: 1.5,
            ease: 'power2.inOut'
          }, Math.max(0, startStep - 1.2))

          // Synchronized photo crossfade and dramatic scale zoom
          tl.to(`.turntable-img-${j}`, {
            opacity: isActive ? 1 : 0,
            scale: isActive ? 1 : 1.1,
            duration: 1.5,
            ease: 'power2.inOut'
          }, Math.max(0, startStep - 1.2))
        }
      }

    }, containerRef)

    return () => ctx.revert()
  }, [])

  const cardsData = [
    {
      pillText: 'DAY 90: SIGN-OFF',
      pillColor: '#ADE3FF', // light blue
      pillTextColor: '#004C78',
      pillImage: '/assets/images/person-1.webp',
      image: '/assets/images/advise-walkaway-decision.png',
      richText: (
        <>
          The deck promised <span className="font-bold underline decoration-[var(--chartreuse)] decoration-2">90 days</span>. The strategy was perfect. The contract was signed. The <span className="font-bold text-black bg-black/5 px-2 py-0.5 rounded-md">clock started ticking</span> on what should have been a clean run.
        </>
      ),
      style: 'bg-white/85 text-black border-black/5 shadow-[0_20px_50px_rgba(0,0,0,0.06)]'
    },
    {
      pillText: 'DAY 120: CHOKEPOINT',
      pillColor: '#FFD8C2', // light peach/orange
      pillTextColor: '#8B3A00',
      pillImage: '/assets/images/person-2.webp',
      image: '/assets/images/pitfall-agency.png',
      richText: (
        <>
          The designer is <span className="font-semibold text-black bg-yellow-100/60 px-1.5 py-0.5 rounded">waiting on the developer</span>. The developer is waiting on copy. The copy is waiting on legal. The campaign hits a <span className="font-bold text-red-600 bg-red-50/50 px-1.5 py-0.5 rounded">quiet standstill</span>.
        </>
      ),
      style: 'bg-white/85 text-black border-black/5 shadow-[0_20px_50px_rgba(0,0,0,0.06)]'
    },
    {
      pillText: 'DAY 140: PM BURDEN',
      pillColor: '#FFCBE0', // light pink/red
      pillTextColor: '#90003C',
      pillImage: '/assets/images/person-3.webp',
      image: '/assets/images/build-problem-cost.png',
      richText: (
        <>
          Somewhere in the middle, your head of marketing has become a <span className="font-bold text-black border-b-2 border-red-500 pb-0.5">full-time project manager</span> for an agency they hired specifically so they wouldn&apos;t have to manage anything.
        </>
      ),
      style: 'bg-white/90 text-red-600 border-red-500/10 shadow-[0_20px_50px_rgba(239,68,68,0.05)]'
    },
    {
      pillText: 'EXL BUILD RESOLUTION',
      pillColor: '#000000', // stark black
      pillTextColor: 'var(--chartreuse)',
      pillImage: '/assets/images/person-4.webp',
      image: '/assets/images/services-hero-final-sharp.png',
      richText: (
        <>
          Build is the EXL capability that takes that <span className="font-bold bg-black text-[var(--chartreuse)] px-2.5 py-1 rounded-xl shadow-md">problem off your plate</span>.
        </>
      ),
      style: 'bg-[var(--chartreuse)] text-black border-black/5 shadow-[0_30px_60px_rgba(222,255,0,0.25)] font-semibold'
    },
    {
      pillText: 'THE DELIVERY GUARANTEE',
      pillColor: 'var(--chartreuse)', // neon green
      pillTextColor: '#000000',
      pillImage: '/assets/images/person-1.webp',
      image: '/assets/images/produce-section2-loft.png',
      richText: (
        <>
          We scope the project, staff it with our internal team, coordinate vendors, and deliver <span className="font-bold text-[var(--chartreuse)] underline decoration-2">on the date we committed to</span>. <span className="font-bold text-white bg-white/10 px-2 py-0.5 rounded-md">You stay in your job</span>.
        </>
      ),
      style: 'bg-black text-white border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.4)]'
    }
  ]

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[var(--off-white)] overflow-hidden border-b border-black/5 selection:bg-black selection:text-white"
    >
      {/* Background grain texture */}
      <div className="absolute inset-0 pointer-events-none z-0 dense-film-grain opacity-[0.02]" />

      {/* ── FULL-BLEED SPLIT VIEWPORT WRAPPER ─────────────────────────── */}
      <div className="w-full h-full flex flex-col lg:flex-row items-stretch overflow-hidden" style={{ perspective: '1500px' }}>
        
        {/* LEFT COLUMN: 3D TURNTABLE WHEEL (50% Width, Full Height) */}
        <div className="w-full lg:w-1/2 h-full flex flex-col justify-between py-12 md:py-16 bg-[var(--off-white)] relative overflow-hidden border-r border-black/5 z-10">
          
          {/* Section Title at top of Left Column */}
          <div className="w-full px-6 md:px-12 pointer-events-none z-20 shrink-0">
            <span className="font-[var(--font-mona-narrow)] text-[10px] tracking-[0.25em] text-black/45 uppercase font-bold mb-2 block">
              The problem we solve
            </span>
            <h2
              style={{
                fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
                fontSize: 'clamp(24px, 3.2vw, 42px)',
                lineHeight: 1.35,
                color: '#000000',
                textTransform: 'uppercase',
                letterSpacing: '-0.015em'
              }}
            >
              Campaign work has a <span className="text-black/35">hidden cost,</span> <br />
              and it&apos;s usually <span className="highlight-marker">paid by your team.</span>
            </h2>
          </div>

          {/* Turntable System in the Middle */}
          <div className="relative w-full flex-grow flex items-center justify-center z-10">
            
            {/* Floor Track Ring */}
            <div 
              className="absolute w-[440px] h-[440px] rounded-full border border-black/[0.04] pointer-events-none z-0"
              style={{
                transform: 'rotateX(82deg) translateZ(-60px)',
                boxShadow: 'inset 0 0 60px rgba(0,0,0,0.01)'
              }}
            />

            {/* THE TURNTABLE WHEEL */}
            <div
              ref={wheelRef}
              className="relative w-[300px] md:w-[440px] h-[340px] flex items-center justify-center"
              style={{
                transformStyle: 'preserve-3d',
                willChange: 'transform'
              }}
            >
              {cardsData.map((card, idx) => {
                const angle = idx * 72 // 360 degrees / 5 cards = 72 degrees spacing
                return (
                  <div
                    key={idx}
                    className={`carousel-card-${idx} delay-card absolute w-[290px] sm:w-[340px] md:w-[420px] lg:w-[480px] h-[280px] md:h-[320px] lg:h-[340px] border p-6 md:p-8 rounded-[2.5rem] flex flex-col justify-between backdrop-blur-md transition-all duration-300 pointer-events-auto ${card.style}`}
                    style={{
                      transform: `rotateY(${angle}deg) translateZ(clamp(230px, 17vw, 370px))`,
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden',
                      opacity: idx === 0 ? 1 : 0.12,
                      willChange: 'transform, opacity'
                    }}
                  >
                    <div className="flex flex-col h-full justify-between items-start">
                      
                      {/* Header Pill */}
                      <div 
                        className="flex items-center gap-2.5 pl-4 pr-1 py-1 rounded-full shadow-sm border border-black/5 shrink-0 mb-4"
                        style={{ backgroundColor: card.pillColor }}
                      >
                        <span 
                          className="font-[var(--font-tusker)] text-[10px] md:text-[12px] uppercase tracking-[0.02em] leading-none"
                          style={{ color: card.pillTextColor }}
                        >
                          {card.pillText}
                        </span>
                        <div className="w-6 h-6 md:w-7 md:h-7 rounded-full overflow-hidden relative bg-black/5 shrink-0">
                          <Image 
                            src={card.pillImage} 
                            alt="" 
                            fill 
                            className="object-cover" 
                          />
                        </div>
                      </div>

                      {/* Skim-friendly Highlighted Text */}
                      <p className="font-[var(--font-cabinet)] text-lg md:text-xl lg:text-[21px] leading-relaxed font-light m-0 text-left">
                        {card.richText}
                      </p>

                    </div>
                  </div>
                )
              })}
            </div>

          </div>

          {/* Scroll Progress indicator at bottom left */}
          <div className="w-full max-w-[200px] bg-black/10 h-[2px] rounded-full overflow-hidden mx-auto z-20 shrink-0 mb-4">
            <div 
              className="h-full bg-[var(--chartreuse)] rounded-full origin-left w-full animate-pulse"
              style={{
                transform: 'scaleX(0.2)',
                animation: 'scrollBarProgression linear'
              }}
            />
          </div>

        </div>

        {/* RIGHT COLUMN: FULL-BLEED DYNAMIC IMAGE VIEWPORT (50% Width, 100% Height) */}
        <div className="w-full lg:w-1/2 h-full relative overflow-hidden bg-black/5 z-0">
          {cardsData.map((card, idx) => (
            <div
              key={idx}
              className={`turntable-img-${idx} absolute inset-0 transition-transform duration-1000 ease-out`}
              style={{
                opacity: idx === 0 ? 1 : 0,
                transform: idx === 0 ? 'scale(1)' : 'scale(1.1)',
                willChange: 'opacity, transform'
              }}
            >
              <Image
                src={card.image}
                alt={card.pillText}
                fill
                className="object-cover"
                priority={idx === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 pointer-events-none" />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
