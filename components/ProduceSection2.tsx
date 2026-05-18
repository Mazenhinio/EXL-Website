'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function ProduceSection2() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!containerRef.current || !cardRef.current || !imageRef.current) return

    const ctx = gsap.context(() => {
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

      // 1. Move the floating card upward over the dark background visual (lifted 20% higher)
      tl.fromTo(cardRef.current,
        { y: '15vh', opacity: 0.3 },
        { y: '-35vh', opacity: 1, duration: 1, ease: 'none' }
      )

      // 2. Parallax scale and subtle darken on the full-bleed background image
      tl.to(imageRef.current, {
        scale: 1.0,
        brightness: 0.28,
        duration: 1,
        ease: 'none'
      }, 0)

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      data-cursor-theme="light"
      className="relative w-full min-h-screen bg-black overflow-hidden flex items-center selection:bg-black selection:text-white"
    >
      {/* Background grain */}
      <div className="absolute inset-0 pointer-events-none dense-film-grain opacity-[0.03] z-20" />

      {/* ── FULL-BLEED BACKGROUND PAN: The cinematic Dallas studio photo ── */}
      <div className="absolute inset-0 w-full h-full z-10">
        <Image
          ref={imageRef}
          src="/assets/images/produce-section2-loft.png"
          alt="High-fidelity cinematic Dallas studio recording loft background"
          fill
          className="object-cover object-center scale-[1.08] brightness-[0.35]"
          style={{ willChange: 'transform, brightness' }}
          priority
        />
        {/* Shadow vignette for high-end feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/85 z-10 pointer-events-none" />
      </div>

      {/* ── FLOATING OVERLAPPING BRIEF SHEET: Glides vertically over visual (shifted 20% higher) ── */}
      <div
        ref={cardRef}
        className="absolute top-[15%] left-[6vw] lg:left-[10vw] w-[88vw] lg:w-[50vw] bg-[#EDE8DF] text-black rounded-[3rem] p-8 md:p-16 lg:p-20 shadow-[0_30px_90px_rgba(0,0,0,0.8)] z-20"
        style={{ willChange: 'transform, opacity' }}
      >
        <div className="max-w-xl text-left space-y-8">
          
          <h2
            style={{
              fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
              fontSize: 'clamp(38px, 4.8vw, 76px)',
              lineHeight: 1.0,
              color: '#000000',
              textTransform: 'uppercase'
            }}
            className="tracking-tight"
          >
            B2B content has a <br />
            visual ceiling. We <br />
            <span className="bg-black text-[var(--chartreuse)] px-3 py-1 inline-block rounded-sm mx-1 align-middle">
              don&apos;t
            </span> accept it.
          </h2>

          <div className="space-y-6 font-[var(--font-cabinet)] text-black/75 text-base md:text-lg leading-relaxed font-light">
            <p>
              Your buyers watch cinema-quality video all day. Then they hit your feed and see a low-res webcam. That visual dissonance is why B2B gets scrolled past in exactly two seconds.
            </p>
            <p className="font-semibold text-black text-lg md:text-xl leading-relaxed">
              We build content that looks, sounds, and moves like premium media. No ceilings. Just work designed to earn active attention.
            </p>
          </div>



        </div>
      </div>

    </section>
  )
}
