'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function ProduceHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const viewfinderRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const textContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!containerRef.current || !viewfinderRef.current) return

    const ctx = gsap.context(() => {
      // 1. Initial Entry Animations
      gsap.fromTo('.zoom-fade-in',
        { opacity: 0, y: 30, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, stagger: 0.12, ease: 'power3.out' }
      )

      // 2. ScrollTrigger: Viewport Scaling and Text Pan-Up
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: true,
          pin: true,
          anticipatePin: 1
        }
      })

      // Expand Viewfinder to full-screen
      tl.to(viewfinderRef.current, {
        width: '100vw',
        height: '100vh',
        borderRadius: '0px',
        padding: '0px',
        duration: 1,
        ease: 'none'
      })

      // Darken and zoom the visual on expand to prioritize text readability
      tl.to(imageRef.current, {
        scale: 1,
        brightness: 0.45,
        duration: 1,
        ease: 'none'
      }, 0)

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      data-cursor-theme="dark"
      className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col justify-center items-center py-16 selection:bg-[var(--chartreuse)] selection:text-black"
    >
      {/* Background grain */}
      <div className="absolute inset-0 pointer-events-none dense-film-grain opacity-[0.03] z-10" />

      {/* ── CENTER SCALING VIEWPORT: Pure, minimal letterbox framing the visual ── */}
      <div className="w-full flex-grow flex items-center justify-center relative z-10 py-4">
        <div
          ref={viewfinderRef}
          className="relative w-[88vw] lg:w-[68vw] h-[48vh] lg:h-[58vh] rounded-[3rem] overflow-hidden border border-white/15 bg-white/[0.02]"
          style={{ willChange: 'width, height, border-radius' }}
        >
          <Image
            ref={imageRef}
            src="/assets/images/produce-hero-cinematography.png"
            alt="Cinematography camera visual inside Dallas studio"
            fill
            className="object-cover object-center scale-[1.1] brightness-[0.85] transition-all"
            style={{ willChange: 'scale, brightness' }}
            priority
          />
          {/* Subtle gradient overlay to naturally shade text background */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
        </div>
      </div>

      {/* ── LOWER TYPOGRAPHY BLOCK: Absolute positioning, independent of flow ── */}
      <div 
        ref={textContainerRef}
        className="absolute bottom-[12vh] left-1/2 -translate-x-1/2 w-full max-w-[1400px] px-6 lg:px-12 z-20 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8"
        style={{ 
          willChange: 'transform',
          textShadow: '0 4px 32px rgba(0,0,0,0.85)'
        }}
      >
        
        <div className="space-y-4 max-w-xl text-left">
          <h1
            style={{
              fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
              fontSize: 'clamp(36px, 4.5vw, 68px)',
              lineHeight: 1.05,
              color: '#FFFFFF',
              textTransform: 'uppercase'
            }}
            className="zoom-fade-in opacity-0 tracking-tight"
          >
            Content that <br />
            doesn&apos;t look like <br />
            <span className="text-[var(--chartreuse)]">B2B Content.</span>
          </h1>
          <p className="zoom-fade-in opacity-0 font-[var(--font-cabinet)] text-white/75 text-base md:text-lg leading-relaxed font-light max-w-md">
            EXL Produce is our in-house video, podcast, photography, and social production team. Based in Dallas, built for ambitious brands.
          </p>
        </div>

        <div className="zoom-fade-in opacity-0 shrink-0 mt-4 lg:mt-0">
          <Link
            href="#capabilities"
            className="group inline-flex items-center gap-6 px-8 py-4 bg-[var(--chartreuse)] hover:bg-white text-black font-[var(--font-tusker)] text-sm tracking-[0.15em] uppercase rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(222,255,0,0.15)]"
          >
            <span>See capabilities</span>
            <svg className="w-4 h-4 text-black transition-transform duration-300 group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-7 7-7-7" />
            </svg>
          </Link>
        </div>

      </div>

    </section>
  )
}
