'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function BuildHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const photoImageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!containerRef.current || !stickyRef.current) return

    const ctx = gsap.context(() => {
      // 1. Entrance timeline
      const loadTl = gsap.timeline()
      loadTl.fromTo(ringRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.6, ease: 'back.out(1.2)' }
      )
      loadTl.fromTo('.eclipse-fade-in',
        { opacity: 0, y: 35, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, stagger: 0.1, ease: 'power4.out' },
        '-=1.0'
      )

      // Ring Pulse Animation
      gsap.to('.pulse-ring', {
        scale: 1.05,
        opacity: 0.7,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

      // 2. Scroll Trigger: Shutter expand, counter-scale image, drift text
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          anticipatePin: 1
        }
      })

      // A. Zoom circular aperture to fill screen
      scrollTl.to(ringRef.current, {
        scale: 16,
        duration: 3,
        ease: 'power2.inOut'
      }, 0)

      // B. Counter-scale image inside to resolve to perfect full-bleed view (from scale 2.8 zoom to 1.02)
      scrollTl.fromTo(photoImageRef.current,
        { scale: 2.8, filter: 'brightness(0.95)' },
        { scale: 1.02, filter: 'brightness(0.65)', duration: 3, ease: 'power2.inOut' },
        0
      )

      // C. Drift Top Typography Line off-screen (Up and Left)
      scrollTl.to('.drift-upper', {
        xPercent: -40,
        yPercent: -40,
        opacity: 0,
        filter: 'blur(8px)',
        duration: 2,
        ease: 'power1.inOut'
      }, 0)

      // D. Drift Bottom Typography Line off-screen (Down and Right)
      scrollTl.to('.drift-lower', {
        xPercent: 40,
        yPercent: 40,
        opacity: 0,
        filter: 'blur(8px)',
        duration: 2,
        ease: 'power1.inOut'
      }, 0)

      // E. Fade out lens reflection & inner border
      scrollTl.to('.lens-reflection', {
        opacity: 0,
        duration: 1
      }, 1)

      scrollTl.to(ringRef.current, {
        borderColor: 'rgba(0,0,0,0)',
        borderWidth: 0,
        boxShadow: 'none',
        duration: 1
      }, 2)

      // F. Reveal clean centered CTA on full expansion
      scrollTl.fromTo('.reveal-hero-cta',
        { opacity: 0, y: 50, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.4, ease: 'power3.out' },
        '-=1.2'
      )

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      data-cursor-theme="light"
      className="relative w-full h-[220vh] bg-[var(--off-white)] selection:bg-black selection:text-white"
    >
      {/* ── STICKY VIEWPORT SECTION ───────────────────────────────────── */}
      <div 
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[var(--off-white)] z-10"
      >
        {/* Stark layout gridlines in light mode */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.06]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="black" strokeWidth="0.5" />
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="black" strokeWidth="0.5" />
          </svg>
        </div>

        {/* Film grain layer */}
        <div className="absolute inset-0 pointer-events-none z-20 dense-film-grain opacity-[0.02]" />

        {/* ── THE DIGITAL ECLIPSE: LIGHT MODE APERTURE RING ─────────────── */}
        <div 
          ref={ringRef}
          className="absolute w-[190px] h-[190px] md:w-[280px] md:h-[280px] rounded-full border border-black/10 flex items-center justify-center z-10 shadow-[0_30px_70px_rgba(0,0,0,0.15)] bg-transparent overflow-hidden"
          style={{ willChange: 'transform' }}
        >
          {/* Central camera-lens halo */}
          <div className="pulse-ring absolute inset-0 rounded-full border border-black/20 pointer-events-none" />

          {/* Lens Glass Sheen overlay */}
          <div className="lens-reflection absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-white/10 z-20 pointer-events-none" />

          {/* PARALLAX SHUTTER MASK CONTAINER */}
          <div className="absolute inset-[1px] rounded-full overflow-hidden bg-black/5">
            <Image
              ref={photoImageRef}
              src="/assets/images/build-hero-grid.png"
              alt="Premium strategic design workshop in a Dallas loft"
              fill
              className="object-cover object-center"
              priority
              style={{ willChange: 'transform' }}
            />
          </div>
        </div>



        {/* ── STARK DARK TYPOGRAPHY LAYER: DRIFTING HEADLINE ────────────── */}
        <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col justify-between h-full py-28 md:py-36 pointer-events-none">
          
          {/* Top Line Drifts Upper Left */}
          <div className="drift-upper w-full text-left flex flex-col items-start gap-4">
            <h1
              style={{
                fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
                fontSize: 'clamp(40px, 7vw, 110px)',
                lineHeight: 0.95,
                color: '#1C2416',
                textTransform: 'uppercase'
              }}
              className="eclipse-fade-in tracking-tighter"
            >
              PROJECTS,
            </h1>
          </div>

          {/* Bottom Line Drifts Lower Right */}
          <div className="drift-lower w-full text-right flex flex-col items-end gap-3 mt-auto">
            <h1
              style={{
                fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
                fontSize: 'clamp(40px, 7vw, 110px)',
                lineHeight: 1.15,
                color: 'transparent',
                WebkitTextStroke: '1.5px #1c2416',
                textTransform: 'uppercase'
              }}
              className="eclipse-fade-in tracking-tighter"
            >
              <span className="text-[var(--chartreuse)]" style={{ color: 'var(--chartreuse)', WebkitTextStroke: '0px transparent', WebkitTextStrokeWidth: '0px' }}>LAUNCHES,</span>{' '}
              <span className="text-[var(--chartreuse)]" style={{ color: 'var(--chartreuse)', WebkitTextStroke: '0px transparent', WebkitTextStrokeWidth: '0px' }}>CAMPAIGNS</span> <br />
              <span className="text-[#1C2416]" style={{ WebkitTextStroke: '0px transparent', WebkitTextStrokeWidth: '0px' }}>
                THAT HAVE TO LAND.
              </span>
            </h1>
          </div>

        </div>

        {/* ── REVEAL LAYOUT: FADES IN ON FULL ZOOM ──────────────────────── */}
        <div className="reveal-hero-cta absolute inset-0 z-30 flex items-center justify-center pointer-events-none opacity-0 px-6 bg-black/50 backdrop-blur-[2px]">
          <div className="max-w-5xl text-center flex flex-col items-center gap-10 pointer-events-auto">
            
            <p className="font-[var(--font-cabinet)] text-white text-2xl md:text-4xl lg:text-[46px] leading-[1.25] font-semibold text-center max-w-4xl tracking-tight flex flex-wrap items-center justify-center gap-x-3.5 gap-y-2">
              <span className="inline-flex items-center shrink-0 translate-y-[-1px] md:translate-y-[-3px]">
                <Image
                  src="/assets/images/exl-logo-neon.webp"
                  alt="EXL"
                  width={130}
                  height={45}
                  className="h-7 md:h-10 lg:h-[45px] w-auto"
                  priority
                />
              </span>
              <span>Build is the capability for work with a beginning, a middle, and a measurable end. A brand identity. A product launch. A website tied to a moment. A 90-day campaign.</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
              <Link
                href="/contact"
                className="group relative px-14 py-6 bg-[var(--chartreuse)] text-black font-[var(--font-tusker)] text-lg tracking-[0.18em] uppercase overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] text-center shadow-lg"
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Start a project</span>
                <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
