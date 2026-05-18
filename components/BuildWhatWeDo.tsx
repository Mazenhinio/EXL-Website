'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const CAPABILITIES = [
  {
    num: '01',
    label: 'BRAND IDENTITY',
    title: 'Brand identity design and rollout.',
    subtitle: 'Rebrands & refreshes.',
    body: 'A new brand, a brand refresh, or a full rebrand. Logo systems, typography, color, voice, and the rollout across every touchpoint. Delivered with a usable brand book, not a pretty PDF nobody opens.',
    bullet: 'Usable Brand Book & System'
  },
  {
    num: '02',
    label: 'WEB SYSTEMS',
    title: 'Website design, build, and launch.',
    subtitle: 'High-performance sites.',
    body: 'Corporate sites, product sites, and campaign landing pages. Designed for how your buyer actually moves, built to load fast, and launched on schedule. We keep engineering under our roof so handoff isn\'t a liability.',
    bullet: 'Fast-Load Marketing Engines'
  },
  {
    num: '03',
    label: 'PRODUCT LAUNCH',
    title: 'Product and service launches.',
    subtitle: 'Sequenced rollouts.',
    body: 'The integrated rollout of something new. Positioning, creative, site, content, launch campaign, and sales enablement, all sequenced against the date.',
    bullet: 'End-to-End Market Enlistment'
  },
  {
    num: '04',
    label: 'CAMPAIGNS',
    title: 'Integrated marketing campaigns.',
    subtitle: 'Quarterly & seasonal.',
    body: '90-day, quarterly, and seasonal campaigns with a clear objective and a deadline. Every channel, every asset, every calendar beat, coordinated from one place.',
    bullet: 'Coordinated Multichannel Beats'
  },
  {
    num: '05',
    label: 'EVENTS',
    title: 'Event activations and launch programs.',
    subtitle: 'Conferences & Private Dinners.',
    body: 'Conferences, private dinners, booth activations, sponsorships. Pre-event, on-site, and post-event, including the content capture that turns a one-day event into three months of material.',
    bullet: 'Pre & Post-Event Asset Kits'
  },
  {
    num: '06',
    label: 'VENDORS',
    title: 'Third-party vendor management.',
    subtitle: 'Coordinated execution.',
    body: 'Your existing agencies, contractors, production vendors, and dev partners, coordinated by us so you\'re not the one chasing deliverables and resolving handoff disputes. We play the intermediate role so you don\'t have to.',
    bullet: 'Intermediate Vendor Director'
  }
]

export default function BuildWhatWeDo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // 1. Reveal Section Header
      gsap.fromTo('.reveal-build-sec3-hdr',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.reveal-build-sec3-hdr',
            start: 'top 85%'
          }
        }
      )

      // 2. Track scroll boundaries to rotate dial (scroll-pinned snapping trigger)
      const sections = gsap.utils.toArray('.build-srv-scroll-section') as HTMLElement[]
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
      {/* Symmetrical glows for aesthetic premium tone */}
      <div className="absolute top-[30%] left-[-15%] w-[45rem] h-[45rem] bg-[var(--chartreuse)]/[0.01] rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute bottom-[30%] right-[-15%] w-[40rem] h-[40rem] bg-white/[0.005] rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute inset-0 pointer-events-none z-0 dense-film-grain opacity-[0.03]" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* ── SECTION HEADER ──────────────────────────────────────────────── */}
        <div className="reveal-build-sec3-hdr opacity-0 flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 lg:pb-16 border-b border-white/10 mb-16 lg:mb-20">
          <div className="space-y-4">
            <span className="font-[var(--font-mona-narrow)] text-[10px] tracking-[0.2em] text-[var(--chartreuse)] uppercase block font-bold">
              Capabilities
            </span>
            <h2
              style={{
                fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
                fontSize: 'clamp(40px, 6vw, 84px)',
                lineHeight: 1.1,
                color: '#FFFFFF',
                textTransform: 'uppercase'
              }}
            >
              The work we ship.
            </h2>
          </div>
          <div className="max-w-md">
            <p className="font-[var(--font-cabinet)] text-white/60 text-lg md:text-xl leading-relaxed font-light">
              Single-point coordination, in-house developers, and senior execution. We take the project management burden fully off your shoulders.
            </p>
          </div>
        </div>

        {/* ── FULL-WIDTH SPLIT LAYOUT ────────────────────────────────────── */}
        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ── LEFT COLUMN: PINNED EXL COLOR COMMAND DIAL CONSOLE ────────── */}
          <div className="lg:col-span-5 lg:h-screen lg:sticky lg:top-0 w-full flex flex-col justify-center items-center py-10 z-10">
            
            {/* The Holographic Timeline Compass Dial (6-Point Grid) */}
            <div className="relative w-[300px] h-[300px] md:w-[410px] md:h-[410px] rounded-full border border-white/10 flex items-center justify-center bg-white/[0.01] shadow-[inset_0_0_60px_rgba(255,255,255,0.01)] backdrop-blur-sm">
              
              {/* Outer Edges Static Pills (Mathematical Placement for 6 items - 60deg intervals) */}
              
              {/* 0 deg: BRAND IDENTITY */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                <span className={`font-[var(--font-tusker)] font-black text-[10px] md:text-xs tracking-[0.15em] transition-all duration-500 uppercase select-none rounded-full px-4 py-2 border backdrop-blur-md inline-block w-fit
                  ${activeIndex === 0 
                    ? 'text-black bg-[var(--chartreuse)] border-[var(--chartreuse)] shadow-[0_10px_25px_rgba(222,255,0,0.15)] scale-105' 
                    : 'text-white/40 border-white/10 bg-[#111111]/80'}`}
                >
                  BRAND
                </span>
              </div>

              {/* 60 deg: WEBSITES */}
              <div className="absolute top-[25%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 z-30">
                <span className={`font-[var(--font-tusker)] font-black text-[10px] md:text-xs tracking-[0.15em] transition-all duration-500 uppercase select-none rounded-full px-4 py-2 border backdrop-blur-md inline-block w-fit
                  ${activeIndex === 1 
                    ? 'text-black bg-[var(--chartreuse)] border-[var(--chartreuse)] shadow-[0_10px_25px_rgba(222,255,0,0.15)] scale-105' 
                    : 'text-white/40 border-white/10 bg-[#111111]/80'}`}
                >
                  WEBSITES
                </span>
              </div>

              {/* 120 deg: PRODUCT LAUNCH */}
              <div className="absolute top-[75%] left-[93.3%] -translate-x-1/2 -translate-y-1/2 z-30">
                <span className={`font-[var(--font-tusker)] font-black text-[10px] md:text-xs tracking-[0.15em] transition-all duration-500 uppercase select-none rounded-full px-4 py-2 border backdrop-blur-md inline-block w-fit
                  ${activeIndex === 2 
                    ? 'text-black bg-[var(--chartreuse)] border-[var(--chartreuse)] shadow-[0_10px_25px_rgba(222,255,0,0.15)] scale-105' 
                    : 'text-white/40 border-white/10 bg-[#111111]/80'}`}
                >
                  LAUNCH
                </span>
              </div>

              {/* 180 deg: CAMPAIGNS */}
              <div className="absolute top-[100%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                <span className={`font-[var(--font-tusker)] font-black text-[10px] md:text-xs tracking-[0.15em] transition-all duration-500 uppercase select-none rounded-full px-4 py-2 border backdrop-blur-md inline-block w-fit
                  ${activeIndex === 3 
                    ? 'text-black bg-[var(--chartreuse)] border-[var(--chartreuse)] shadow-[0_10px_25px_rgba(222,255,0,0.15)] scale-105' 
                    : 'text-white/40 border-white/10 bg-[#111111]/80'}`}
                >
                  CAMPAIGNS
                </span>
              </div>

              {/* 240 deg: EVENTS */}
              <div className="absolute top-[75%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 z-30">
                <span className={`font-[var(--font-tusker)] font-black text-[10px] md:text-xs tracking-[0.15em] transition-all duration-500 uppercase select-none rounded-full px-4 py-2 border backdrop-blur-md inline-block w-fit
                  ${activeIndex === 4 
                    ? 'text-black bg-[var(--chartreuse)] border-[var(--chartreuse)] shadow-[0_10px_25px_rgba(222,255,0,0.15)] scale-105' 
                    : 'text-white/40 border-white/10 bg-[#111111]/80'}`}
                >
                  EVENTS
                </span>
              </div>

              {/* 300 deg: VENDORS */}
              <div className="absolute top-[25%] left-[6.7%] -translate-x-1/2 -translate-y-1/2 z-30">
                <span className={`font-[var(--font-tusker)] font-black text-[10px] md:text-xs tracking-[0.15em] transition-all duration-500 uppercase select-none rounded-full px-4 py-2 border backdrop-blur-md inline-block w-fit
                  ${activeIndex === 5 
                    ? 'text-black bg-[var(--chartreuse)] border-[var(--chartreuse)] shadow-[0_10px_25px_rgba(222,255,0,0.15)] scale-105' 
                    : 'text-white/40 border-white/10 bg-[#111111]/80'}`}
                >
                  VENDORS
                </span>
              </div>

              {/* Rotating Pointer Compass Line */}
              <div 
                className="absolute inset-0 rounded-full transition-transform duration-[1000ms] ease-out z-20 pointer-events-none"
                style={{ transform: `rotate(${activeIndex * 60}deg)` }}
              >
                <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
                  <svg className="w-3.5 h-3.5 text-[var(--chartreuse)] drop-shadow-[0_0_8px_rgba(222,255,0,0.6)]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 4l-8 8h16z" />
                  </svg>
                  <span className="w-1.5 h-1.5 bg-[var(--chartreuse)] rounded-full mt-1 animate-ping" />
                </div>
              </div>

              {/* Central Glow Core */}
              <div className="relative w-36 h-36 md:w-48 md:h-48 rounded-full border border-white/10 bg-[#111111]/80 backdrop-blur-md flex items-center justify-center z-20 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(222,255,0,0.05)_0%,transparent_70%)] pointer-events-none" />
                
                {/* Active index watermarks */}
                <span className="font-[var(--font-tusker)] font-black text-5xl md:text-7xl text-white tracking-tighter transition-all duration-500 select-none">
                  {CAPABILITIES[activeIndex].num}
                </span>
              </div>

            </div>
          </div>

          {/* ── RIGHT COLUMN: SCROLLING CAPABILITY DETAIL CARDS ───────────── */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start py-6 lg:py-16 relative z-10 gap-24 lg:gap-32 w-full">
            {CAPABILITIES.map((cap, idx) => {
              const isSelected = activeIndex === idx
              
              return (
                <div 
                  key={cap.num}
                  className="build-srv-scroll-section w-full min-h-[75vh] flex items-center justify-center lg:justify-start"
                >
                  <div 
                    className={`group relative w-full max-w-[620px] rounded-[36px] p-10 md:p-14 border border-white/5 transition-all duration-700 bg-white/[0.02] backdrop-blur-md shadow-2xl overflow-hidden
                      ${isSelected ? 'scale-[1.02] border-white/15 shadow-[0_30px_70px_rgba(0,0,0,0.8)] opacity-100' : 'opacity-20 scale-95'}`}
                  >
                    <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03] dense-film-grain" />

                    <div className="relative z-10 space-y-6">
                      
                      <div className="flex items-center justify-between">
                        <span className="font-[var(--font-mona-narrow)] text-[9px] tracking-[0.2em] text-[var(--chartreuse)] uppercase block font-semibold">
                          BUILD PATHWAY // AREA {cap.num}
                        </span>
                        <span className={`w-2 h-2 rounded-full transition-colors duration-500 ${isSelected ? 'bg-[var(--chartreuse)] shadow-[0_0_8px_rgba(222,255,0,0.8)]' : 'bg-white/10'}`} />
                      </div>

                      <div className="space-y-2">
                        <span className="font-[var(--font-cabinet)] text-[13px] tracking-wider text-white/50 block font-light">
                          {cap.subtitle}
                        </span>
                        <h3 
                          style={{
                            fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
                            fontSize: 'clamp(28px, 4vw, 44px)',
                            lineHeight: 1.1,
                            color: '#FFFFFF',
                            textTransform: 'uppercase'
                          }}
                          className="tracking-tight"
                        >
                          {cap.title}
                        </h3>
                      </div>

                      <p className="font-[var(--font-cabinet)] text-white/70 text-base md:text-lg leading-relaxed font-light">
                        {cap.body}
                      </p>

                      <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1 text-left">
                          <span className="text-[9px] uppercase tracking-widest text-white/40 block font-bold">Scope Output Focus</span>
                          <span className="font-[var(--font-mona-narrow)] font-bold text-[var(--chartreuse)] text-sm">
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
