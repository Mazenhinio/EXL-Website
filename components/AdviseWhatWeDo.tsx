'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const SERVICES = [
  {
    num: '01',
    label: 'POSITION',
    title: 'Positioning, messaging, & brand architecture.',
    subtitle: 'Who you are, who you\'re for, why it matters.',
    body: 'Who you are, who you\'re for, and why any of it should matter to the buyer. We pressure-test your existing positioning, rebuild what isn\'t working, and leave you with language your sales team will actually use on a call.',
    bullet: 'Buyer-Centric Positioning Brief'
  },
  {
    num: '02',
    label: 'GTM PLAY',
    title: 'Go-to-market strategy.',
    subtitle: 'Landing in market with weight, not noise.',
    body: 'For new products, new markets, new segments, or a brand that\'s grown past its current plan. We map the buyer, the channels, the content, and the sequence of moves required to land in market with weight, not noise.',
    bullet: '12-Month Sequenced GTM Playbook'
  },
  {
    num: '03',
    label: 'CONTENT',
    title: 'Content and media strategy.',
    subtitle: 'Designing systems that scale engagement.',
    body: 'An owned media build, a podcast launch, a point-of-view content plan, or a full content system across paid, earned, and owned. We design the strategy and scope the production. Our Produce team executes if you want us to.',
    bullet: 'Owned Media Technical Spec'
  },
  {
    num: '04',
    label: 'CMO ADVISE',
    title: 'Fractional CMO & advisory retainers.',
    subtitle: 'A senior second brain in the room.',
    body: 'For companies that need senior marketing leadership on a weekly or monthly cadence, without the cost or commitment of a full-time hire. A senior voice in your strategic meetings, your planning cycles, and your marketing decisions.',
    bullet: 'Fractional CMO SLA Cadence'
  },
  {
    num: '05',
    label: 'AUDITS',
    title: 'Brand and marketing audits.',
    subtitle: 'Rigorous reads of where you are now.',
    body: 'A structured, third-party read of where you are now. What\'s working, what isn\'t, what you\'re overspending on, and what you\'re ignoring. Delivered as a decision document, not a deck.',
    bullet: 'Marketing Decision Audit brief'
  }
]

export default function AdviseWhatWeDo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // 1. Reveal Section Header
      gsap.fromTo('.reveal-whatwedo-hdr',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.reveal-whatwedo-hdr',
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
      className="relative w-full bg-black py-24 lg:py-36 overflow-visible border-b border-white/5 selection:bg-[var(--chartreuse)] selection:text-black"
    >
      {/* Symmetrical glowing ambient backlights for depth */}
      <div className="absolute top-[30%] left-[-15%] w-[45rem] h-[45rem] bg-[#DEFF00]/1 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute bottom-[30%] right-[-15%] w-[40rem] h-[40rem] bg-white/[0.01] rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute inset-0 pointer-events-none z-0 dense-film-grain opacity-[0.02]" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* ── SECTION HEADER ──────────────────────────────────────────────── */}
        <div className="reveal-whatwedo-hdr opacity-0 flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 lg:pb-16 border-b border-white/10 mb-16 lg:mb-20">
          <div className="space-y-4">
            <span className="font-[var(--font-tusker)] text-[12px] tracking-[0.25em] text-[var(--chartreuse)] uppercase block font-semibold">What we do inside advise</span>
            <h2 
              style={{
                fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
                fontSize: 'clamp(40px, 6vw, 84px)',
                lineHeight: 1.1,
                color: '#FFFFFF',
                textTransform: 'uppercase'
              }}
            >
              The work we do.
            </h2>
          </div>
          <div className="max-w-md">
            <p className="font-[var(--font-cabinet)] text-white/50 text-lg md:text-xl leading-relaxed font-light">
              We replace standard slides and generic retainers with core strategizing assets that build real enterprise value and direct revenue pipelines.
            </p>
          </div>
        </div>

        {/* ── FULL-WIDTH SPLIT LAYOUT ────────────────────────────────────── */}
        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ── LEFT COLUMN: PINNED EXL COLOR COMMAND DIAL CONSOLE ────────── */}
          <div className="lg:col-span-5 lg:h-screen lg:sticky lg:top-0 w-full flex flex-col justify-center items-center py-10 z-10">
            
            {/* The Holographic Timeline Compass Dial */}
            <div className="relative w-[300px] h-[300px] md:w-[410px] md:h-[410px] rounded-full border border-white/5 flex items-center justify-center bg-[#111111]/35 shadow-[inset_0_0_60px_rgba(255,255,255,0.02)] backdrop-blur-sm">
              
              {/* Outer Edges Static Pill: POSITION (0deg) */}
              <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 z-30">
                <span className={`font-[var(--font-tusker)] font-black text-sm md:text-base lg:text-[17px] tracking-[0.15em] transition-all duration-500 uppercase select-none rounded-full px-6 py-3 border backdrop-blur-md inline-block w-fit bg-black/90
                  ${activeIndex === 0 
                    ? 'text-[var(--chartreuse)] border-[var(--chartreuse)]/30 shadow-[0_0_20px_rgba(222,255,0,0.15)] scale-105' 
                    : 'text-white/60 border-white/5'}`}
                >
                  POSITION
                </span>
              </div>

              {/* Outer Edges Static Pill: GTM PLAY (72deg) */}
              <div className="absolute top-[34.5%] right-0 translate-x-1/2 -translate-y-1/2 z-30">
                <span className={`font-[var(--font-tusker)] font-black text-sm md:text-base lg:text-[17px] tracking-[0.15em] transition-all duration-500 uppercase select-none rounded-full px-6 py-3 border backdrop-blur-md inline-block w-fit bg-black/90
                  ${activeIndex === 1 
                    ? 'text-[var(--chartreuse)] border-[var(--chartreuse)]/30 shadow-[0_0_20px_rgba(222,255,0,0.15)] scale-105' 
                    : 'text-white/60 border-white/5'}`}
                >
                  GTM PLAY
                </span>
              </div>

              {/* Outer Edges Static Pill: CONTENT (144deg) */}
              <div className="absolute bottom-[9.5%] right-[20.5%] translate-x-1/2 translate-y-1/2 z-30">
                <span className={`font-[var(--font-tusker)] font-black text-sm md:text-base lg:text-[17px] tracking-[0.15em] transition-all duration-500 uppercase select-none rounded-full px-6 py-3 border backdrop-blur-md inline-block w-fit bg-black/90
                  ${activeIndex === 2 
                    ? 'text-[var(--chartreuse)] border-[var(--chartreuse)]/30 shadow-[0_0_20px_rgba(222,255,0,0.15)] scale-105' 
                    : 'text-white/60 border-white/5'}`}
                >
                  CONTENT
                </span>
              </div>

              {/* Outer Edges Static Pill: CMO ADVISE (216deg) */}
              <div className="absolute bottom-[9.5%] left-[20.5%] -translate-x-1/2 translate-y-1/2 z-30">
                <span className={`font-[var(--font-tusker)] font-black text-sm md:text-base lg:text-[17px] tracking-[0.15em] transition-all duration-500 uppercase select-none rounded-full px-6 py-3 border backdrop-blur-md inline-block w-fit bg-black/90
                  ${activeIndex === 3 
                    ? 'text-[var(--chartreuse)] border-[var(--chartreuse)]/30 shadow-[0_0_20px_rgba(222,255,0,0.15)] scale-105' 
                    : 'text-white/60 border-white/5'}`}
                >
                  CMO ADVISE
                </span>
              </div>

              {/* Outer Edges Static Pill: AUDITS (288deg) */}
              <div className="absolute top-[34.5%] left-0 -translate-x-1/2 -translate-y-1/2 z-30">
                <span className={`font-[var(--font-tusker)] font-black text-sm md:text-base lg:text-[17px] tracking-[0.15em] transition-all duration-500 uppercase select-none rounded-full px-6 py-3 border backdrop-blur-md inline-block w-fit bg-black/90
                  ${activeIndex === 4 
                    ? 'text-[var(--chartreuse)] border-[var(--chartreuse)]/30 shadow-[0_0_20px_rgba(222,255,0,0.15)] scale-105' 
                    : 'text-white/60 border-white/5'}`}
                >
                  AUDITS
                </span>
              </div>

              {/* Rotating Chevron Pointer Ring */}
              <div 
                className="absolute inset-0 rounded-full transition-transform duration-[1200ms] ease-out z-20 pointer-events-none"
                style={{ transform: `rotate(${activeIndex * 72}deg)` }}
              >
                {/* Chevron indicator pointing to active pill */}
                <div className="absolute top-3.5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
                  <svg className="w-4 h-4 text-[var(--chartreuse)] drop-shadow-[0_0_8px_rgba(222,255,0,0.4)]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 4l-8 8h16z" />
                  </svg>
                  <span className="w-1.5 h-1.5 bg-[var(--chartreuse)] rounded-full mt-1 animate-pulse shadow-[0_0_6px_rgba(222,255,0,0.5)]" />
                </div>
              </div>

              {/* Rotational ticks mapped to dial backdrop */}
              <div className="absolute inset-4 rounded-full border border-white/[0.03] z-10 pointer-events-none">
                {[...Array(30)].map((_, i) => (
                  <div 
                    key={i}
                    className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/[0.04] origin-center"
                    style={{ transform: `rotate(${i * 12}deg)` }}
                  />
                ))}
              </div>

              {/* Central Glow Core (EXL Black Glassmorphism style) */}
              <div className="relative w-36 h-36 md:w-48 md:h-48 rounded-full border border-white/10 bg-black/90 backdrop-blur-md flex items-center justify-center z-20 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(222,255,0,0.06)_0%,transparent_75%)] pointer-events-none" />
                
                {/* Massive active watermark index in EXL header font */}
                <span className="font-[var(--font-tusker)] font-black text-5xl md:text-7xl text-white tracking-tighter transition-all duration-500 select-none">
                  {SERVICES[activeIndex].num}
                </span>
              </div>

            </div>

            {/* Minimalist coordinate label */}
            <div className="mt-8 font-[var(--font-tusker)] text-[9px] text-white/30 uppercase tracking-[0.25em]">
              exl advise // command dial console
            </div>
          </div>

          {/* ── RIGHT COLUMN: SCROLLING COMMAND NARRATIVE CARDS ───────────── */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start py-6 lg:py-16 relative z-10 gap-24 lg:gap-32 w-full">
            {SERVICES.map((srv, idx) => {
              const isSelected = activeIndex === idx
              
              return (
                <div 
                  key={srv.num}
                  className="srv-scroll-section w-full min-h-[75vh] flex items-center justify-center lg:justify-start"
                >
                  <div 
                    className={`group relative w-full max-w-[620px] rounded-[36px] p-10 md:p-14 border border-white/5 transition-all duration-700 bg-[#111111]/70 backdrop-blur-md shadow-xl overflow-hidden
                      ${isSelected ? 'scale-[1.02] border-white/10 shadow-2xl opacity-100' : 'opacity-25 scale-95'}`}
                  >
                    {/* Dense overlay grain */}
                    <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.05] dense-film-grain" />

                    {/* Glowing bottom line indicator */}
                    <div className="absolute inset-x-0 bottom-0 h-[2.5px] bg-gradient-to-r from-[var(--chartreuse)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />

                    <div className="flex flex-col justify-between h-full gap-8 relative z-10">
                      
                      {/* Top row: Label & category */}
                      <div className="flex justify-between items-center border-b border-white/5 pb-5">
                        <span className="font-[var(--font-tusker)] font-bold text-white/30 tracking-[0.2em] uppercase text-xs md:text-sm">
                          exl advise // capability
                        </span>
                        <span className="font-[var(--font-tusker)] font-black text-2xl md:text-3xl text-white/60">
                          {srv.num}
                        </span>
                      </div>

                      {/* Middle row: Large heading and copy */}
                      <div className="space-y-6">
                        <h3 
                          style={{
                            fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
                            fontSize: 'clamp(26px, 4vw, 40px)',
                            lineHeight: 1.15,
                            color: '#FFFFFF',
                            textTransform: 'uppercase'
                          }}
                        >
                          {srv.title}
                        </h3>
                        <p className="font-[var(--font-cabinet)] text-[var(--chartreuse)] text-xs md:text-sm font-medium tracking-wide uppercase italic">
                          {srv.subtitle}
                        </p>
                        <p className="font-[var(--font-cabinet)] text-white/70 text-lg md:text-xl leading-relaxed font-light">
                          {srv.body}
                        </p>
                      </div>

                      {/* Bottom row: SLA bullet */}
                      <div className="border-t border-white/5 pt-5 flex items-center gap-3 mt-4">
                        <svg className="w-5 h-5 text-[var(--chartreuse)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-[var(--font-tusker)] font-bold text-xs md:text-sm text-white/40 group-hover:text-white/80 transition-colors duration-500 uppercase tracking-widest">
                          {srv.bullet}
                        </span>
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
