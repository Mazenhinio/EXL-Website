'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

export default function BuildWhoItsFor() {
  const containerRef = useRef<HTMLDivElement>(null)
  const leftShutterRef = useRef<HTMLDivElement>(null)
  const rightShutterRef = useRef<HTMLDivElement>(null)

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
            end: '+=140%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          }
        })

        // Initial States
        gsap.set(leftShutterRef.current, { xPercent: -100 })
        gsap.set(rightShutterRef.current, { xPercent: 100 })
        gsap.set('.build-laser-line', { scaleY: 0, transformOrigin: 'top center' })
        gsap.set('.build-left-content', { opacity: 0, x: -60 })
        gsap.set('.build-right-content', { opacity: 0, x: 60 })

        // 1. Draw the central Chartreuse laser line
        tl.to('.build-laser-line', { scaleY: 1, duration: 2, ease: 'power2.inOut' })

        // 2. Shutters slide horizontally to meet in the middle
        tl.to(leftShutterRef.current, { xPercent: 0, duration: 3, ease: 'power2.inOut' }, '+=0.1')
          .to(rightShutterRef.current, { xPercent: 0, duration: 3, ease: 'power2.inOut' }, '<')

        // 3. Contents fade and slide in
        tl.to('.build-left-content', { opacity: 1, x: 0, duration: 1.5, ease: 'power2.out' }, '-=1.2')
          .to('.build-right-content', { opacity: 1, x: 0, duration: 1.5, ease: 'power2.out' }, '<')

        // 4. Hold
        tl.to({}, { duration: 3.5 })

      }, containerRef)

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
      className="relative w-full h-screen bg-black overflow-hidden border-t border-white/5 z-20 selection:bg-[var(--chartreuse)] selection:text-black"
    >
      {/* ── CENTRAL GLOWING CHARTREUSE LASER LINE ───────────────────────── */}
      <div 
        className="build-laser-line absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-[var(--chartreuse)] shadow-[0_0_15px_#DEFF00] z-30 pointer-events-none" 
      />

      {/* ── LEFT SHUTTER: THE FIT (Dark Olive tone) ────────────────────── */}
      <div 
        ref={leftShutterRef}
        className="absolute top-0 left-0 w-[50%] h-full bg-[#171d13] flex flex-col justify-center overflow-hidden z-10 border-r border-white/5"
      >
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/images/produce-who-fit.png" 
            alt="Collaborative meeting and active design coordination" 
            fill 
            className="object-cover opacity-[0.2] contrast-[1.1] saturate-[0.8]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#171d13] via-[#171d13]/75 to-transparent z-10" />
        </div>

        {/* Ambient Chartreuse Backlight */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[70%] h-[80%] rounded-full bg-[#DEFF00]/12 blur-[140px] pointer-events-none z-10" />

        <div className="build-left-content relative z-20 w-full max-w-2xl ml-auto mr-0 px-8 lg:px-14 flex flex-col justify-center">
          <span className="font-[var(--font-mona-narrow)] text-[11px] font-bold text-[var(--chartreuse)] tracking-[0.3em] uppercase mb-4 block">
            THE ALIGNMENT
          </span>
          <h2 
            style={{ fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif" }}
            className="font-black text-5xl md:text-7xl lg:text-[84px] text-white uppercase tracking-[0.05em] leading-[1.0] mb-8"
          >
            THE FIT.
          </h2>
          
          <div className="flex flex-col gap-5">
            {[
              'Marketing leaders with a date on the calendar and no internal capacity to run the project.',
              'Founders planning a launch who need a partner who will own it end to end.',
              'Teams who have already tried the multi-vendor route, learned what it costs, and want a single accountable partner this time.'
            ].map((text, idx) => (
              <div key={idx} className="bg-black/50 border border-white/10 p-5 rounded-2xl flex gap-4 items-start shadow-xl">
                <div className="w-6 h-6 rounded-full bg-[var(--chartreuse)]/20 border border-[var(--chartreuse)]/40 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3.5 h-3.5 text-[var(--chartreuse)]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="font-[var(--font-cabinet)] text-white text-base md:text-lg leading-relaxed m-0 font-normal">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT SHUTTER: THE NON-FIT (Sleek Slate tone) ────────────────── */}
      <div 
        ref={rightShutterRef}
        className="absolute top-0 right-0 w-[50%] h-full bg-[#111111] flex flex-col justify-center overflow-hidden z-10 border-l border-white/5"
      >
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/images/produce-who-nonfit.png" 
            alt="Bloated meeting with artificial fluorescent light" 
            fill 
            className="object-cover opacity-[0.15] contrast-[1.1] grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#111111] via-[#111111]/75 to-transparent z-10" />
        </div>

        {/* Ambient Dark Glow */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[70%] h-[80%] rounded-full bg-white/[0.02] blur-[140px] pointer-events-none z-10" />

        <div className="build-right-content relative z-25 w-full max-w-2xl mr-auto ml-0 px-8 lg:px-14 flex flex-col justify-center">
          <span className="font-[var(--font-mona-narrow)] text-[11px] font-bold text-white/40 tracking-[0.3em] uppercase mb-4 block">
            THE BOUNDARY
          </span>
          <h3 
            style={{ 
              fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
              WebkitTextStroke: '1.5px rgba(255,255,255,0.4)' 
            }}
            className="font-black text-5xl md:text-7xl lg:text-[84px] text-transparent uppercase tracking-[0.05em] leading-[1.0] mb-8"
          >
            NOT A FIT.
          </h3>
          
          <div className="flex flex-col gap-5">
            {[
              'A company looking for a hands-off advisory report rather than active design and launch delivery.',
              'Projects where dates are treated as general suggestions rather than hard, commercial obligations.',
              'Retainers where you prefer managing multiple, disconnected external contractors yourself.'
            ].map((text, idx) => (
              <div key={idx} className="bg-white/[0.03] border border-white/5 p-5 rounded-2xl flex gap-4 items-start shadow-xl">
                <div className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-white/50" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
                <p className="font-[var(--font-cabinet)] text-white/80 text-base md:text-lg leading-relaxed m-0 font-light">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
