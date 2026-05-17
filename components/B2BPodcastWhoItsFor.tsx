'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

export default function B2BPodcastWhoItsFor() {
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
        gsap.set('.laser-line', { scaleY: 0, transformOrigin: 'top center' })
        gsap.set('.left-content', { opacity: 0, x: -60 })
        gsap.set('.right-content', { opacity: 0, x: 60 })

        // 1. Draw the laser line down the middle
        tl.to('.laser-line', { scaleY: 1, duration: 2, ease: 'power2.inOut' })

        // 2. Shutters slide horizontally from sides to meet in the middle
        tl.to(leftShutterRef.current, { xPercent: 0, duration: 3, ease: 'power2.inOut' }, '+=0.1')
          .to(rightShutterRef.current, { xPercent: 0, duration: 3, ease: 'power2.inOut' }, '<')

        // 3. Contents fade and slide into center position
        tl.to('.left-content', { opacity: 1, x: 0, duration: 1.5, ease: 'power2.out' }, '-=1.2')
          .to('.right-content', { opacity: 1, x: 0, duration: 1.5, ease: 'power2.out' }, '<')

        // 4. Hold for reading
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
      className="relative w-full h-screen bg-black overflow-hidden border-t border-white/5 z-20"
    >
      {/* ── CENTRAL GLOWING LASER LINE ───────────────────────────────── */}
      <div 
        className="laser-line absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-[#ff5500] shadow-[0_0_15px_#ff5500] z-30 pointer-events-none" 
      />

      {/* ── LEFT SHUTTER: THE FIT (Bright Clay Brown) ────────── */}
      <div 
        ref={leftShutterRef}
        className="absolute top-0 left-0 w-[50%] h-full bg-[#382b24] flex flex-col justify-center overflow-hidden z-10 border-r border-white/5"
      >
        {/* Natural Background Image showing professional luxury office workspace */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/images/b2b_fit_office.jpg" 
            alt="Premium Office Workspace Alignment" 
            fill 
            className="object-cover opacity-[0.22] contrast-[1.15] saturate-[1.1]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#382b24] via-[#382b24]/75 to-transparent z-10" />
        </div>

        {/* Ambient Orange Backlight - Layered on top of image for rich wash */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[70%] h-[80%] rounded-full bg-[#ff5500]/22 blur-[140px] pointer-events-none z-10" />

        <div className="left-content relative z-20 w-full max-w-2xl ml-auto mr-0 px-8 lg:px-14 flex flex-col justify-center">
          <span className="font-mona-narrow font-bold text-[#ff5500] tracking-[0.3em] uppercase text-sm md:text-base mb-4 block">
            THE ALIGNMENT
          </span>
          <h2 className="font-mona-narrow font-black text-5xl md:text-7xl lg:text-[84px] xl:text-[96px] text-white uppercase tracking-[0.05em] leading-[1.0] mb-8">
            THE FIT.
          </h2>
          
          <div className="flex flex-col gap-6">
            <div className="bg-black/45 border border-white/10 p-6 rounded-2xl flex gap-4 items-start shadow-2xl">
              <div className="w-8 h-8 rounded-full bg-[#ff5500]/20 border border-[#ff5500]/40 flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-[#ff5500]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="font-[var(--font-cabinet)] text-white text-lg md:text-xl lg:text-[22px] leading-relaxed m-0 font-semibold">
                B2B brands that want a video podcast to be a <strong className="text-[#ff5500] font-black">commercial asset</strong>, not a side project.
              </p>
            </div>

            <div className="bg-black/45 border border-white/10 p-6 rounded-2xl flex gap-4 items-start shadow-2xl">
              <div className="w-8 h-8 rounded-full bg-[#ff5500]/20 border border-[#ff5500]/40 flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-[#ff5500]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="font-[var(--font-cabinet)] text-white text-lg md:text-xl lg:text-[22px] leading-relaxed m-0 font-semibold">
                Companies that understand the audience is the real product and want commercial leverage.
              </p>
            </div>

            <div className="bg-black/45 border border-white/10 p-6 rounded-2xl flex gap-4 items-start shadow-2xl">
              <div className="w-8 h-8 rounded-full bg-[#ff5500]/20 border border-[#ff5500]/40 flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-[#ff5500]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="font-[var(--font-cabinet)] text-white text-lg md:text-xl lg:text-[22px] leading-relaxed m-0 font-semibold">
                Marketing leaders who refuse to stitch together four different video, booking, and editing vendors.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT SHUTTER: THE NON-FIT (Bright Warm Charcoal) ───────────── */}
      <div 
        ref={rightShutterRef}
        className="absolute top-0 right-0 w-[50%] h-full bg-[#1c1917] flex flex-col justify-center overflow-hidden z-10 border-l border-white/5"
      >
        {/* Natural Background Image showing casual hobby creator bedroom studio */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/images/b2b_nonfit_hobby.jpg" 
            alt="Casual Hobby Bedroom Studio" 
            fill 
            className="object-cover opacity-[0.22] contrast-[1.1] grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#1c1917] via-[#1c1917]/75 to-transparent z-10" />
        </div>

        {/* Ambient Bright White Glow - Layered on top for rich wash */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[70%] h-[80%] rounded-full bg-white/[0.04] blur-[140px] pointer-events-none z-10" />

        <div className="right-content relative z-25 w-full max-w-2xl mr-auto ml-0 px-8 lg:px-14 flex flex-col justify-center">
          <span className="font-mona-narrow font-bold text-white/40 tracking-[0.3em] uppercase text-sm md:text-base mb-4 block">
            THE BOUNDARY
          </span>
          <h3 
            style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.4)' }}
            className="font-mona-narrow font-black text-5xl md:text-7xl lg:text-[84px] xl:text-[96px] text-transparent uppercase tracking-[0.05em] leading-[1.0] mb-8"
          >
            NOT A FIT.
          </h3>
          
          <div className="flex flex-col gap-6">
            <div className="bg-white/[0.04] border border-white/10 p-6 rounded-2xl flex gap-4 items-start shadow-2xl">
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <p className="font-[var(--font-cabinet)] text-white/85 text-lg md:text-xl lg:text-[22px] leading-relaxed m-0 font-normal">
                A founder looking to start a podcast as a <strong className="text-white font-semibold">personal hobby</strong> without strategic customer acquisition goals.
              </p>
            </div>

            <div className="bg-white/[0.04] border border-white/10 p-6 rounded-2xl flex gap-4 items-start shadow-2xl">
              <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <p className="font-[var(--font-cabinet)] text-white/85 text-lg md:text-xl lg:text-[22px] leading-relaxed m-0 font-normal">
                Teams unwilling to invest in the cinematic production standard that makes the distribution engine convert.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
