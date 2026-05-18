'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const CAPABILITIES = [
  {
    num: '01',
    label: 'BRAND FILMS',
    title: 'Brand films, product videos, & customer stories.',
    subtitle: 'The hero content.',
    body: "The anchor piece you'll use on the homepage, in the sales deck, at the top of the launch campaign. Shot and cut the way a documentary team would cut it.",
    bullet: 'Cinematic Documentary Briefs'
  },
  {
    num: '02',
    label: 'PODCASTS',
    title: 'Podcast production.',
    subtitle: 'Full-service video podcast production.',
    body: 'Full-service video podcast production, from show concept to finished episodes. On-location, multi-camera, cinematic. Our flagship service has its own page.',
    bullet: 'Turn-Key DFW Studio Podcast'
  },
  {
    num: '03',
    label: 'PHOTO',
    title: 'Photography and lifestyle shoots.',
    subtitle: 'Art-directed editorial assets.',
    body: 'Team portraits, office environments, product shots, campaign hero imagery. Art-directed, lit, and composed to a standard your brand deserves.',
    bullet: 'Premium Office & Brand Captures'
  },
  {
    num: '04',
    label: 'SOCIAL VIDEO',
    title: 'Social-first video.',
    subtitle: 'LinkedIn, reels, and shorts.',
    body: 'LinkedIn, reels, shorts, and vertical formats built for the feed, not cut down from longer pieces. Different craft, different intent.',
    bullet: 'Native Vertical Feed Formats'
  },
  {
    num: '05',
    label: 'CREATIVE DIR',
    title: 'Creative direction & art direction.',
    subtitle: 'The visual thinking layer.',
    body: 'The thinking layer that sits above production. Visual systems, campaign concepts, and the creative point of view that makes the work feel like it belongs to one brand, not twelve different vendors.',
    bullet: 'Visual Coherence Blueprint'
  }
]

export default function ProduceSection3() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // 1. Reveal Section Header
      gsap.fromTo('.reveal-produce-sec3-hdr',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.reveal-produce-sec3-hdr',
            start: 'top 85%'
          }
        }
      )

      // 2. Track active section to rotate dial (scroll-pinned snapping trigger)
      const sections = gsap.utils.toArray('.srv-scroll-section') as HTMLElement[]
      sections.forEach((section, idx) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => setActiveIndex(idx),
          onEnterBack: () => setActiveIndex(idx)
        })
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-[#EDE8DF] py-24 lg:py-36 overflow-visible border-b border-black/5 selection:bg-black selection:text-white"
    >
      {/* Symmetrical glowing ambient backlights for depth */}
      <div className="absolute top-[30%] left-[-15%] w-[45rem] h-[45rem] bg-black/[0.015] rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute bottom-[30%] right-[-15%] w-[40rem] h-[40rem] bg-black/[0.01] rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute inset-0 pointer-events-none z-0 dense-film-grain opacity-[0.02]" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* ── SECTION HEADER ──────────────────────────────────────────────── */}
        <div className="reveal-produce-sec3-hdr opacity-0 flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 lg:pb-16 border-b border-black/10 mb-16 lg:mb-20">
          <div className="space-y-4">
            <h2 
              style={{
                fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
                fontSize: 'clamp(40px, 6vw, 84px)',
                lineHeight: 1.1,
                color: '#000000',
                textTransform: 'uppercase'
              }}
            >
              The work we make.
            </h2>
          </div>
          <div className="max-w-md">
            <p className="font-[var(--font-cabinet)] text-black/60 text-lg md:text-xl leading-relaxed font-light">
              We handle production end-to-end, blending premium film craft with AI-accelerated editing workflows.
            </p>
          </div>
        </div>

        {/* ── FULL-WIDTH SPLIT LAYOUT ────────────────────────────────────── */}
        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ── LEFT COLUMN: PINNED EXL COLOR COMMAND DIAL CONSOLE ────────── */}
          <div className="lg:col-span-5 lg:h-screen lg:sticky lg:top-0 w-full flex flex-col justify-center items-center py-10 z-10">
            
            {/* The Holographic Timeline Compass Dial (Light Mode) */}
            <div className="relative w-[300px] h-[300px] md:w-[410px] md:h-[410px] rounded-full border border-black/10 flex items-center justify-center bg-white/40 shadow-[inset_0_0_60px_rgba(0,0,0,0.02)] backdrop-blur-sm">
              
              {/* Outer Edges Static Pill: BRAND FILMS (0deg) */}
              <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 z-30">
                <span className={`font-[var(--font-tusker)] font-black text-xs md:text-sm lg:text-[15px] tracking-[0.15em] transition-all duration-500 uppercase select-none rounded-full px-5 py-2.5 border backdrop-blur-md inline-block w-fit
                  ${activeIndex === 0 
                    ? 'text-white bg-black border-black shadow-[0_10px_25px_rgba(0,0,0,0.15)] scale-105' 
                    : 'text-black/50 border-black/10 bg-white/80'}`}
                >
                  BRAND FILMS
                </span>
              </div>

              {/* Outer Edges Static Pill: PODCASTS (72deg) */}
              <div className="absolute top-[34.5%] right-0 translate-x-1/2 -translate-y-1/2 z-30">
                <span className={`font-[var(--font-tusker)] font-black text-xs md:text-sm lg:text-[15px] tracking-[0.15em] transition-all duration-500 uppercase select-none rounded-full px-5 py-2.5 border backdrop-blur-md inline-block w-fit
                  ${activeIndex === 1 
                    ? 'text-white bg-black border-black shadow-[0_10px_25px_rgba(0,0,0,0.15)] scale-105' 
                    : 'text-black/50 border-black/10 bg-white/80'}`}
                >
                  PODCASTS
                </span>
              </div>

              {/* Outer Edges Static Pill: PHOTO (144deg) */}
              <div className="absolute bottom-[9.5%] right-[20.5%] translate-x-1/2 translate-y-1/2 z-30">
                <span className={`font-[var(--font-tusker)] font-black text-xs md:text-sm lg:text-[15px] tracking-[0.15em] transition-all duration-500 uppercase select-none rounded-full px-5 py-2.5 border backdrop-blur-md inline-block w-fit
                  ${activeIndex === 2 
                    ? 'text-white bg-black border-black shadow-[0_10px_25px_rgba(0,0,0,0.15)] scale-105' 
                    : 'text-black/50 border-black/10 bg-white/80'}`}
                >
                  PHOTO
                </span>
              </div>

              {/* Outer Edges Static Pill: SOCIAL VIDEO (216deg) */}
              <div className="absolute bottom-[9.5%] left-[20.5%] -translate-x-1/2 translate-y-1/2 z-30">
                <span className={`font-[var(--font-tusker)] font-black text-xs md:text-sm lg:text-[15px] tracking-[0.15em] transition-all duration-500 uppercase select-none rounded-full px-5 py-2.5 border backdrop-blur-md inline-block w-fit
                  ${activeIndex === 3 
                    ? 'text-white bg-black border-black shadow-[0_10px_25px_rgba(0,0,0,0.15)] scale-105' 
                    : 'text-black/50 border-black/10 bg-white/80'}`}
                >
                  SOCIAL VIDEO
                </span>
              </div>

              {/* Outer Edges Static Pill: CREATIVE DIR (288deg) */}
              <div className="absolute top-[34.5%] left-0 -translate-x-1/2 -translate-y-1/2 z-30">
                <span className={`font-[var(--font-tusker)] font-black text-xs md:text-sm lg:text-[15px] tracking-[0.15em] transition-all duration-500 uppercase select-none rounded-full px-5 py-2.5 border backdrop-blur-md inline-block w-fit
                  ${activeIndex === 4 
                    ? 'text-white bg-black border-black shadow-[0_10px_25px_rgba(0,0,0,0.15)] scale-105' 
                    : 'text-black/50 border-black/10 bg-white/80'}`}
                >
                  CREATIVE DIR
                </span>
              </div>

              {/* Rotating Chevron Pointer Ring */}
              <div 
                className="absolute inset-0 rounded-full transition-transform duration-[1200ms] ease-out z-20 pointer-events-none"
                style={{ transform: `rotate(${activeIndex * 72}deg)` }}
              >
                {/* Chevron indicator pointing to active pill */}
                <div className="absolute top-3.5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
                  <svg className="w-4 h-4 text-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 4l-8 8h16z" />
                  </svg>
                  <span className="w-1.5 h-1.5 bg-black rounded-full mt-1 animate-pulse shadow-[0_0_6px_rgba(0,0,0,0.2)]" />
                </div>
              </div>

              {/* Rotational ticks mapped to dial backdrop */}
              <div className="absolute inset-4 rounded-full border border-black/5 z-10 pointer-events-none">
                {[...Array(30)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-black/[0.06] origin-center"
                    style={{ transform: `rotate(${i * 12}deg)` }}
                  />
                ))}
              </div>

              {/* Central Glow Core (EXL Black Glassmorphism style adapted to Light Mode) */}
              <div className="relative w-36 h-36 md:w-48 md:h-48 rounded-full border border-black/10 bg-white/90 backdrop-blur-md flex items-center justify-center z-20 shadow-xl overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.02)_0%,transparent_75%)] pointer-events-none" />
                
                {/* Massive active watermark index in EXL header font */}
                <span className="font-[var(--font-tusker)] font-black text-5xl md:text-7xl text-black tracking-tighter transition-all duration-500 select-none">
                  {CAPABILITIES[activeIndex].num}
                </span>
              </div>

            </div>
          </div>

          {/* ── RIGHT COLUMN: SCROLLING COMMAND NARRATIVE CARDS ───────────── */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start py-6 lg:py-16 relative z-10 gap-24 lg:gap-32 w-full">
            {CAPABILITIES.map((cap, idx) => {
              const isSelected = activeIndex === idx
              
              return (
                <div 
                  key={cap.num}
                  className="srv-scroll-section w-full min-h-[75vh] flex items-center justify-center lg:justify-start"
                >
                  <div 
                    className={`group relative w-full max-w-[620px] rounded-[36px] p-10 md:p-14 border border-black/5 transition-all duration-700 bg-white/70 backdrop-blur-md shadow-lg overflow-hidden
                      ${isSelected ? 'scale-[1.02] border-black/10 shadow-2xl opacity-100' : 'opacity-25 scale-95'}`}
                  >
                    {/* Dense overlay grain */}
                    <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03] dense-film-grain" />

                    <div className="relative z-10 space-y-6">
                      
                      {/* Metric & Label Row */}
                      <div className="flex items-center justify-between">
                        <span className="font-[var(--font-tusker)] text-[11px] tracking-[0.2em] text-black/40 uppercase">
                          CAPABILITY AREA // {cap.num}
                        </span>
                        <span className="w-2 h-2 rounded-full bg-black/10 group-hover:bg-black transition-colors duration-500" />
                      </div>

                      {/* Header Typography */}
                      <div className="space-y-2">
                        <span className="font-[var(--font-tusker)] text-[12px] tracking-[0.2em] text-black/50 uppercase block font-semibold">
                          {cap.subtitle}
                        </span>
                        <h3 
                          style={{
                            fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
                            fontSize: 'clamp(28px, 4vw, 48px)',
                            lineHeight: 1.1,
                            color: '#000000',
                            textTransform: 'uppercase'
                          }}
                          className="tracking-tight"
                        >
                          {cap.title}
                        </h3>
                      </div>

                      {/* Description Body */}
                      <p className="font-[var(--font-cabinet)] text-black/75 text-base md:text-lg leading-relaxed font-light">
                        {cap.body}
                      </p>

                      {/* Dynamic Deliverable Highlight */}
                      <div className="pt-6 border-t border-black/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase tracking-widest text-black/40 font-bold block">Featured Deliverable</span>
                          <span className="font-[var(--font-cabinet)] font-semibold text-black text-sm md:text-base">
                            {cap.bullet}
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              )
            })}
          </div>

        </div>

      </div>
    </section>
  )
}
