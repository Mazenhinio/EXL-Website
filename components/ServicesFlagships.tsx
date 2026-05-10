'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const FLAGSHIPS = [
  {
    id: 'imm',
    title: 'Integrated Marketing Management',
    description: 'Your marketing department, on retainer. Strategy, online presence, PR coordination, social oversight, collateral, and vendor management, all run by one accountable team.',
    link: '/integrated-marketing-management',
    image: '/assets/images/flagship-imm.webp',
    label: 'STRATEGY & OPS'
  },
  {
    id: 'podcast',
    title: 'B2B Video Podcast Production',
    description: 'A flagship productized service. We produce B2B video podcasts end to end, from show concept and guest pipeline to on-location cinematic production and distribution.',
    link: '/podcast-production',
    image: '/assets/images/flagship-podcast.webp',
    label: 'CONTENT & MEDIA'
  }
]

export default function ServicesFlagships() {
  const containerRef = useRef<HTMLDivElement>(null)
  const leftCardRef = useRef<HTMLDivElement>(null)
  const rightCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=250%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      })

      // 1. Initial State: Cards are off-screen (Left and Right)
      gsap.set(leftCardRef.current, { x: '-100%', opacity: 0 })
      gsap.set(rightCardRef.current, { x: '100%', opacity: 0 })
      gsap.set('.section-header-fs', { opacity: 0, y: 30 })

      // 2. Step 1: Header fades in
      tl.to('.section-header-fs', { opacity: 1, y: 0, duration: 1 })

      // 3. Step 2: Cards slide in and meet in the middle
      tl.to(leftCardRef.current, { x: '0%', opacity: 1, duration: 2, ease: 'power2.out' }, 'reveal')
        .to(rightCardRef.current, { x: '0%', opacity: 1, duration: 2, ease: 'power2.out' }, 'reveal')

      // 4. Step 3: Hold for a beat
      tl.to({}, { duration: 1 })

      // 5. Step 4: Vertical Exit (Left goes UP, Right goes DOWN)
      tl.to(leftCardRef.current, { y: '-120%', opacity: 0, duration: 2, ease: 'power2.in' }, 'exit')
        .to(rightCardRef.current, { y: '120%', opacity: 0, duration: 2, ease: 'power2.in' }, 'exit')
        .to('.section-header-fs', { opacity: 0, y: -50, duration: 1 }, 'exit')

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden border-t border-white/5"
    >
      {/* ── SECTION HEADER ───────────────────────────────────────────── */}
      <div className="section-header-fs absolute top-12 lg:top-20 left-6 lg:left-12 z-30 max-w-xl">
        <span className="font-mono text-[10px] tracking-[0.3em] font-bold uppercase text-[var(--taupe)] mb-4 block">
          FLAGSHIP ENGAGEMENTS
        </span>
        <h2 className="font-[var(--font-tusker)] text-[clamp(32px,4vw,56px)] leading-[0.9] text-white uppercase">
          Two engagements we&apos;re known for.
        </h2>
      </div>

      {/* ── SYMMETRIC CARDS ──────────────────────────────────────────── */}
      <div className="relative w-full h-full flex flex-col lg:flex-row items-center justify-center lg:px-12 gap-0">
        
        {/* LEFT CARD: IMM */}
        <div 
          ref={leftCardRef}
          className="relative w-full lg:w-1/2 h-1/2 lg:h-[70vh] border-r border-white/10 overflow-hidden bg-neutral-900 group"
        >
          <div className="absolute inset-0 z-0">
            <Image src={FLAGSHIPS[0].image} alt={FLAGSHIPS[0].title} fill className="object-cover opacity-50 grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-70 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
          </div>
          
          <div className="relative z-10 h-full p-8 lg:p-16 flex flex-col justify-end">
            <div className="space-y-6 max-w-md">
              <span className="font-mono text-[10px] tracking-[0.3em] font-bold text-[var(--chartreuse)]">{FLAGSHIPS[0].label}</span>
              <h3 className="font-[var(--font-tusker)] text-[clamp(28px,3vw,48px)] leading-[0.95] text-white uppercase">{FLAGSHIPS[0].title}</h3>
              <p className="font-[var(--font-cabinet)] text-white/50 text-base lg:text-lg leading-relaxed font-light">{FLAGSHIPS[0].description}</p>
              <Link href={FLAGSHIPS[0].link} className="inline-flex items-center gap-3 text-[var(--chartreuse)] font-[var(--font-tusker)] text-sm tracking-widest uppercase group-hover:gap-5 transition-all">
                Explore flagship <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT CARD: PODCAST */}
        <div 
          ref={rightCardRef}
          className="relative w-full lg:w-1/2 h-1/2 lg:h-[70vh] overflow-hidden bg-neutral-800 group"
        >
          <div className="absolute inset-0 z-0">
            <Image src={FLAGSHIPS[1].image} alt={FLAGSHIPS[1].title} fill className="object-cover opacity-50 grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-70 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-transparent to-transparent" />
          </div>
          
          <div className="relative z-10 h-full p-8 lg:p-16 flex flex-col justify-end items-end text-right">
            <div className="space-y-6 max-w-md">
              <span className="font-mono text-[10px] tracking-[0.3em] font-bold text-[var(--chartreuse)]">{FLAGSHIPS[1].label}</span>
              <h3 className="font-[var(--font-tusker)] text-[clamp(28px,3vw,48px)] leading-[0.95] text-white uppercase">{FLAGSHIPS[1].title}</h3>
              <p className="font-[var(--font-cabinet)] text-white/50 text-base lg:text-lg leading-relaxed font-light">{FLAGSHIPS[1].description}</p>
              <Link href={FLAGSHIPS[1].link} className="inline-flex items-center gap-3 text-[var(--chartreuse)] font-[var(--font-tusker)] text-sm tracking-widest uppercase group-hover:gap-5 transition-all flex-row-reverse">
                Explore flagship <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* Subtle Noise/Grain Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10 mix-blend-soft-light bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </section>
  )
}
