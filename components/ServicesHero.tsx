'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function ServicesHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const shapesRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // 1. Image Zoom Entrance
      tl.fromTo(imageRef.current,
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 0.3, duration: 2, ease: 'power2.out' }
      )

      // 2. Headline Snap
      tl.fromTo('.snap-text',
        { 
          x: (i) => i % 2 === 0 ? -100 : 100, 
          filter: 'blur(20px)',
          opacity: 0,
          scaleX: 1.5
        },
        { 
          x: 0, 
          filter: 'blur(0px)',
          opacity: 1,
          scaleX: 1,
          duration: 1.2, 
          stagger: 0.1,
          ease: 'power4.out' 
        },
        '-=1.5'
      )

      // 2. Subhead & CTA Fade
      tl.fromTo('.hero-subhead',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.6'
      )

      // 3. Background Shapes Parallax
      const shapes = gsap.utils.toArray('.bg-shape') as HTMLElement[]
      shapes.forEach((shape, i) => {
        gsap.to(shape, {
          y: (i + 1) * 100,
          rotation: (i + 1) * 45,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        })
      })

      // 4. Subtle mouse movement for the container
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e
        const xPos = (clientX / window.innerWidth - 0.5) * 20
        const yPos = (clientY / window.innerHeight - 0.5) * 20
        
        gsap.to('.bg-shape', {
          x: xPos,
          y: yPos,
          duration: 1,
          ease: 'power2.out',
          overwrite: 'auto'
        })
      }
      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden"
    >
      {/* ── BACKGROUND IMAGE ───────────────────────────────────────────── */}
      <div ref={imageRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="/assets/images/services-hero.webp"
          alt="EXL Studio Space"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-white/60" /> {/* Subtle overlay for text clarity */}
      </div>

      {/* ── BACKGROUND GEOMETRIC SHAPES ────────────────────────────────── */}
      <div ref={shapesRef} className="absolute inset-0 pointer-events-none z-0">
        <div className="bg-shape absolute top-[10%] left-[15%] w-64 h-64 bg-[#DEFF00]/10 rounded-full blur-[80px]" />
        <div className="bg-shape absolute bottom-[20%] right-[10%] w-96 h-96 bg-black/[0.03] rounded-full blur-[100px]" />
        <div className="bg-shape absolute top-[40%] right-[30%] w-48 h-48 bg-[#DEFF00]/05 rotate-45 blur-[60px]" />
      </div>

      {/* ── HEADLINE SECTION (TOP HALF) ────────────────────────────────── */}
      <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center px-6 lg:px-12 pt-20">
        <div className="relative">
          <h1 
            ref={headlineRef}
            className="font-[var(--font-tusker)] text-[clamp(44px,10vw,120px)] leading-[0.95] text-center uppercase text-black tracking-tight"
          >
            <span className="snap-text block">Consulting-grade thinking.</span>
            <span className="snap-text block">In-house execution.</span>
            <span className="snap-text block text-[var(--chartreuse)]" style={{ WebkitTextStroke: '1px black' }}>One team.</span>
          </h1>
        </div>
      </div>

      {/* ── SUBHEAD & CTA SECTION ───────────────────── */}
      <div className="relative z-10 w-full py-20 lg:py-24 px-6 lg:px-12 flex flex-col items-center">
        <div className="hero-subhead max-w-4xl text-center space-y-12 opacity-0">
          <p className="font-[var(--font-cabinet)] text-black text-[clamp(18px,2.2vw,26px)] leading-relaxed font-light">
            EXL works with ambitious B2B and luxury brands that want <span className="text-black font-semibold italic">senior strategy</span> and the team to actually ship it. Four capabilities, two flagship engagements, one roof, no handoffs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-4">
            <button className="group relative px-12 py-5 bg-[var(--chartreuse)] text-black font-[var(--font-tusker)] text-2xl tracking-widest uppercase overflow-hidden transition-transform active:scale-95 shadow-[0_10px_30px_rgba(222,255,0,0.15)]">
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Book a call</span>
              <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            
            <a href="#capabilities" className="font-[var(--font-cabinet)] text-black hover:opacity-70 transition-opacity text-sm uppercase tracking-widest flex items-center gap-3 group font-medium">
              View Our Process
              <div className="w-8 h-[1px] bg-black group-hover:w-12 transition-all duration-300" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
