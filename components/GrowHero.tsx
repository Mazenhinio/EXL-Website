'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function GrowHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const leftPanelRef = useRef<HTMLDivElement>(null)
  const rightPanelRef = useRef<HTMLDivElement>(null)
  const revealContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!containerRef.current || !stickyRef.current) return

    const ctx = gsap.context(() => {
      // 1. Scroll-Driven Vertical Split parting
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          anticipatePin: 1
        }
      })

      // A. Part the panels vertically
      scrollTl.to(leftPanelRef.current, {
        yPercent: 100,
        duration: 3,
        ease: 'power2.inOut'
      }, 0)

      scrollTl.to(rightPanelRef.current, {
        yPercent: -100,
        duration: 3,
        ease: 'power2.inOut'
      }, 0)

      // B. Slow zoom on background image to create depth
      scrollTl.fromTo('.reveal-bg-photo',
        { scale: 1.15 },
        { scale: 1.02, duration: 3, ease: 'power2.inOut' },
        0
      )

      // C. Fade in centered executive message & button
      scrollTl.fromTo(revealContentRef.current,
        { opacity: 0, y: 40, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out' },
        1.6
      )

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      data-cursor-theme="light"
      className="relative w-full h-[220vh] bg-black selection:bg-[var(--chartreuse)] selection:text-black"
    >
      {/* ── STICKY VIEWPORT CONTAINER ─────────────────────────────────── */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black z-10"
      >
        
        {/* ── BACKGROUND LAYER: STATIC WIDESCREEN PHOTO ──────────────────── */}
        <div className="reveal-bg-photo absolute inset-0 w-full h-full z-0 pointer-events-none transform origin-center">
          <Image
            src="/assets/images/services-hero-8k.png"
            alt="EXL Grow Distribution Studio Loft"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Stark dark overlay */}
          <div className="absolute inset-0 bg-black/65 z-10 pointer-events-none" />
        </div>

        {/* Film grain layer */}
        <div className="absolute inset-0 pointer-events-none z-30 dense-film-grain opacity-[0.02]" />

        {/* ── INTERACTIVE SLIDING SHUTTERS (50/50 SPLIT) ────────────────── */}
        <div className="absolute inset-0 w-full h-full flex z-10">
          
          {/* LEFT PANEL: SLIDES DOWN */}
          <div
            ref={leftPanelRef}
            className="w-[50%] h-full bg-[var(--off-white)] border-r border-black/5 flex items-center justify-end pr-4 md:pr-10 overflow-hidden relative"
            style={{ willChange: 'transform' }}
          >
            <h1
              style={{
                fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
                fontSize: 'clamp(32px, 6vw, 92px)',
                lineHeight: 0.95,
                color: '#1C2416',
                textTransform: 'uppercase',
                textAlign: 'right'
              }}
              className="tracking-tighter select-none"
            >
              GREAT CONTENT
            </h1>
          </div>

          {/* RIGHT PANEL: SLIDES UP */}
          <div
            ref={rightPanelRef}
            className="w-[50%] h-full bg-[var(--off-white)] flex items-center justify-start pl-4 md:pl-10 overflow-hidden relative"
            style={{ willChange: 'transform' }}
          >
            <h1
              style={{
                fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
                fontSize: 'clamp(32px, 6vw, 92px)',
                lineHeight: 0.95,
                color: 'transparent',
                WebkitTextStroke: '1.5px #1C2416',
                textTransform: 'uppercase',
                textAlign: 'left'
              }}
              className="tracking-tighter select-none"
            >
              IS A WRITE-OFF.
            </h1>
          </div>

        </div>

        {/* ── REVEAL COPY & CTA (Fades in over photo) ──────────────────── */}
        <div
          ref={revealContentRef}
          className="relative z-20 w-full max-w-[1200px] mx-auto px-6 text-center pointer-events-none opacity-0 flex flex-col items-center gap-10 mt-16 md:mt-0"
          style={{ willChange: 'transform, opacity' }}
        >
          
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-5 bg-white/5 border border-white/10 px-10 py-4 rounded-full backdrop-blur-md shrink-0 shadow-lg">
              <span className="inline-flex items-center translate-y-[-1px] md:translate-y-[-2px]">
                <Image
                  src="/assets/images/exl-logo-neon.webp"
                  alt="EXL"
                  width={105}
                  height={34}
                  className="h-5 md:h-6 lg:h-[34px] w-auto"
                  priority
                />
              </span>
              <span className="w-[1px] h-5 bg-white/20" />
              <span className="font-[var(--font-tusker)] text-sm md:text-base lg:text-lg tracking-[0.25em] text-[var(--chartreuse)] font-black uppercase">
                GROW SYSTEM
              </span>
            </div>
            <p className="font-[var(--font-cabinet)] text-white text-2xl md:text-[42px] lg:text-[48px] leading-[1.25] font-semibold text-center max-w-4xl tracking-tight">
              Grow is the distribution, paid media, and CRM layer that turns what we produce into pipeline you can measure.
            </p>
          </div>

          <div className="pointer-events-auto">
            <Link
              href="/contact"
              className="group relative px-12 py-5 bg-[var(--chartreuse)] text-black font-[var(--font-tusker)] text-base tracking-[0.18em] uppercase overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] text-center shadow-lg"
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Talk about your pipeline</span>
              <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  )
}
