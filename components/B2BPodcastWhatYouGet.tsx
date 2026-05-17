'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const deliverables = [
  {
    num: '01',
    title: 'GUEST PIPELINE',
    highlight: 'WEEKS IN ADVANCE.',
    desc: 'A fully managed guest sourcing and booking engine. We identify, qualify, outreach, and schedule high-level operators, delivering a confirmed calendar directly to your desk.'
  },
  {
    num: '02',
    title: 'ON-LOCATION PRODUCTION',
    highlight: 'FOR EVERY EPISODE.',
    desc: 'Cinematic multi-camera filming at your office, the guest’s office, or custom scouted locations. No webcams or dry studio boxes—just broadcast-grade lighting and sound.'
  },
  {
    num: '03',
    title: 'FINISHED EPISODES',
    highlight: 'PREDICTABLE SCHEDULE.',
    desc: 'Expert editing, professional color grading, sound design, and master delivery. Polished to media-grade standards and turned around on a reliable editorial timeline.'
  },
  {
    num: '04',
    title: 'REPURPOSING KIT',
    highlight: '10+ DOWNSTREAM ASSETS.',
    desc: 'Every single episode generates 10+ highly engaging assets: vertical clips, key quote graphics, comprehensive show notes, newsletter posts, and a guest share kit.'
  },
  {
    num: '05',
    title: 'DISTRIBUTION RUN',
    highlight: 'MAXIMUM EXPOSURE.',
    desc: 'A full-service distribution campaign deployed across your channels and ours. We handle upload, SEO optimization, copywriting, and posting across LinkedIn and YouTube.'
  },
  {
    num: '06',
    title: 'STRATEGIC REVIEW',
    highlight: 'CONTINUOUS GROWTH.',
    desc: 'A monthly high-level audit analyzing format performance, audience retention, relationship conversion, and distribution analytics to continuously optimize.'
  }
]

const bullets = [
  ['Full Outreach Management', 'Verified Guest Bio Sheets'],
  ['Broadcast-Grade Kit', 'On-Site Crew Management'],
  ['Premium Color Grading', 'Media Standards QC'],
  ['10+ Micro Assets', '48-Hour Assets SLA'],
  ['Multi-Platform Post', 'Metadata SEO Setup'],
  ['Funnel Optimization', 'Quarterly Format Audits']
]

// Visual 1: Calendar Grid representing Guest Pipeline with Floating Card (Giant)
const CalendarVisual = () => (
  <div className="relative w-full h-full min-h-[260px] md:min-h-[440px] bg-[#f8f8f8] rounded-3xl border border-black/5 overflow-hidden flex items-center justify-center p-8 transition-all duration-500 group-hover:bg-[#faf9f6] shadow-inner">
    <div className="relative w-full max-w-[360px]">
      <div className="grid grid-cols-7 gap-3.5">
        {[...Array(21)].map((_, i) => {
          const isBooked = i === 4 || i === 11 || i === 18
          return (
            <div 
              key={i} 
              className={`aspect-square rounded-2xl flex flex-col items-center justify-center text-[12px] md:text-[14px] font-bold transition-all duration-500 relative
                ${isBooked 
                  ? 'bg-b2b-vivid-orange text-white shadow-[0_6px_15px_rgba(255,102,0,0.35)] scale-110' 
                  : 'bg-white border border-black/5 text-black/30 hover:border-black/20'}`}
            >
              <span>{i + 1}</span>
            </div>
          )
        })}
      </div>
      
      {/* Floating Guest Detail Card */}
      <div className="absolute -bottom-6 right-[-20px] bg-white rounded-2xl p-4 md:p-5 border border-black/10 shadow-2xl max-w-[220px] translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-30">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full bg-b2b-vivid-orange/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-b2b-vivid-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <span className="text-[9px] font-black text-black tracking-widest uppercase">GUEST BOOKED</span>
        </div>
        <p className="text-[12px] md:text-[13px] font-bold text-black leading-tight">VP of Enterprise Sourcing</p>
        <p className="text-[10px] text-black/40">Fortune 500 Enterprise Guest</p>
      </div>
    </div>
  </div>
)

// Visual 2: Podcast Recording Set Layout (Giant)
const SetVisual = () => (
  <div className="relative w-full h-full min-h-[260px] md:min-h-[440px] bg-[#f8f8f8] rounded-3xl border border-black/5 overflow-hidden flex items-center justify-center transition-all duration-500 group-hover:bg-[#faf9f6] shadow-inner">
    <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:18px_18px]" />
    
    <div className="flex items-center gap-16 relative z-10 transition-transform duration-500 group-hover:scale-105">
      {/* Mic A Panel */}
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-[24px] bg-white border border-black/5 flex items-center justify-center shadow-md group-hover:border-b2b-vivid-orange/30 group-hover:shadow transition-all duration-500">
          <svg className="w-8 h-8 text-black/30 group-hover:text-b2b-vivid-orange transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <rect x="9" y="2" width="6" height="12" rx="3" />
            <path d="M5 10a7 7 0 0014 0M12 19v3M8 22h8" />
          </svg>
        </div>
        <span className="text-[10px] md:text-[11px] mt-2.5 text-black/40 font-bold uppercase tracking-wider">MIC A</span>
      </div>

      {/* Multi-mic dynamic waveform */}
      <div className="flex items-end gap-2 h-20 px-8 border-l border-r border-black/5">
        {[2, 5, 3, 7, 10, 5, 8, 3, 6, 2].map((h, i) => (
          <div 
            key={i} 
            style={{ height: `${h * 10}%` }}
            className="w-2 rounded-full bg-black/10 group-hover:bg-b2b-vivid-orange/60 transition-all duration-500"
          />
        ))}
      </div>

      {/* Camera B Panel */}
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-[24px] bg-white border border-black/5 flex items-center justify-center shadow-md group-hover:border-b2b-vivid-orange/30 group-hover:shadow transition-all duration-500">
          <svg className="w-8 h-8 text-black/30 group-hover:text-b2b-vivid-orange transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 10l4.55-2.27A1 1 0 0121 8.62v6.76a1 1 0 01-1.45.89L15 14M3 7h10a2 2 0 012 2v6a2 2 0 01-2 2H3a2 2 0 01-2-2V9a2 2 0 012-2z" />
          </svg>
        </div>
        <span className="text-[10px] md:text-[11px] mt-2.5 text-black/40 font-bold uppercase tracking-wider">CAMERA B</span>
      </div>
    </div>
  </div>
)

// Visual 3: YouTube Video Player/Thumbnail showing the natural workspace behind-the-scenes
const ThumbnailVisual = () => (
  <div className="relative w-full h-full min-h-[260px] md:min-h-[440px] bg-[#f8f8f8] rounded-3xl border border-black/5 overflow-hidden flex items-center justify-center p-6 shadow-inner transition-all duration-500 group-hover:bg-[#faf9f6]">
    <div className="relative w-full h-full min-h-[220px] md:min-h-[380px] rounded-3xl overflow-hidden shadow-2xl border border-black/5 bg-black">
      <img 
        src="/assets/images/bestin_b2b_bg.png" 
        alt="EXL Podcast Finished Episode Production Behind-the-Scenes" 
        className="w-full h-full absolute inset-0 object-cover opacity-85 transition-transform duration-[1200ms] ease-out group-hover:scale-105" 
      />
      {/* Dynamic luxury dark gold-to-charcoal gradient cover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-b2b-dark-red/70 via-black/40 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-40" />
      
      <div className="absolute inset-0 z-20 flex flex-col justify-between p-8 text-left">
        <div className="flex items-center justify-between w-full border-t border-white/10 pt-5 mt-auto">
          <span className="text-[9px] text-white/50 tracking-wider">RADWA GALAL & B2B DIRECTORS</span>
          <span className="text-[9px] text-[#FF6600] tracking-widest font-black uppercase">4K EDIT APPROVED</span>
        </div>
      </div>
      
      {/* Play Button Icon Overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-16 h-16 rounded-full bg-b2b-vivid-orange/90 group-hover:bg-b2b-bright-orange flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-lg shadow-b2b-vivid-orange/30 cursor-pointer">
        <svg className="w-7 h-7 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>

      {/* Progress timeline indicator */}
      <div className="absolute bottom-0 left-0 h-1 bg-b2b-vivid-orange z-30 w-0 group-hover:w-[100%] transition-all duration-[2000ms] ease-out" />
    </div>
  </div>
)

// Visual 4: Stack of Reels/Quotes/Content Cards (Giant & Fully Readable)
const RepurposingVisual = () => (
  <div className="relative w-full h-full min-h-[260px] md:min-h-[440px] bg-[#f8f8f8] rounded-3xl border border-black/5 overflow-hidden flex items-center justify-center transition-all duration-500 group-hover:bg-[#faf9f6] shadow-inner">
    <div className="relative w-full max-w-[420px] h-[240px] flex items-center justify-center">
      {/* Left Reels Mockup */}
      <div className="absolute left-2 w-[100px] h-[170px] rounded-2xl bg-white shadow-xl border border-black/5 rotate-[-12deg] z-10 transition-transform duration-500 group-hover:translate-x-[-25px] group-hover:rotate-[-16deg] flex flex-col justify-between p-4 flex-shrink-0 overflow-hidden">
        <div className="w-full h-1/2 bg-black/5 rounded-xl flex items-center justify-center">
          <span className="text-[8px] text-black/30 font-black tracking-widest uppercase">9:16 CLIP</span>
        </div>
        <div className="space-y-1.5">
          <div className="w-full h-1 bg-black/10 rounded" />
          <div className="w-4/5 h-1 bg-black/10 rounded" />
        </div>
      </div>
      
      {/* Center Luxury B2B Quote Card */}
      <div className="absolute w-[220px] h-[200px] rounded-[32px] bg-b2b-dark-red shadow-2xl border border-b2b-vivid-orange/30 z-20 transition-transform duration-500 group-hover:scale-105 flex flex-col justify-between p-6 text-left overflow-hidden">
        <div className="flex justify-between items-center">
          <span className="text-[8px] text-b2b-vivid-orange tracking-widest font-black uppercase">EXL BRAND QUOTE</span>
          <span className="text-[12px] text-white/20 font-bold">“</span>
        </div>
        <p className="text-[12px] text-white/95 leading-relaxed font-semibold tracking-tight">
          {"\"Consistency is key in the Content Flywheel. Build, Publish, Analyze, Repeat.\""}
        </p>
        <div className="flex items-center justify-between border-t border-white/5 pt-3">
          <span className="text-[7px] text-white/40 tracking-wider font-semibold">BEST IN B2B EP.04</span>
          <div className="w-5 h-5 rounded-full bg-b2b-vivid-orange/40 flex items-center justify-center">
            <span className="text-[8px] text-white font-bold">✓</span>
          </div>
        </div>
      </div>
      
      {/* Right Post Slide Mockup */}
      <div className="absolute right-2 w-[100px] h-[170px] rounded-2xl bg-white shadow-xl border border-black/5 rotate-[12deg] z-10 transition-transform duration-500 group-hover:translate-x-[20px] group-hover:rotate-[16deg] flex flex-col justify-between p-4 flex-shrink-0 overflow-hidden">
        <div className="w-full h-1/2 bg-black/5 rounded-xl flex items-center justify-center">
          <span className="text-[8px] text-black/30 font-black tracking-widest uppercase">SLIDES</span>
        </div>
        <div className="space-y-1.5">
          <div className="w-full h-1 bg-black/10 rounded" />
          <div className="w-4/5 h-1 bg-black/10 rounded" />
        </div>
      </div>
    </div>
  </div>
)

// Visual 5: Connected Channel Icons representing Distribution (Giant)
const DistributionVisual = () => (
  <div className="relative w-full h-full min-h-[260px] md:min-h-[440px] bg-[#f8f8f8] rounded-3xl border border-black/5 overflow-hidden flex items-center justify-center transition-all duration-500 group-hover:bg-[#faf9f6] shadow-inner">
    <div className="relative w-[340px] h-[200px] flex items-center justify-center">
      {/* Central Hub Node */}
      <div className="w-20 h-20 rounded-full bg-b2b-vivid-orange text-white flex flex-col items-center justify-center font-bold text-[11px] z-20 shadow-[0_8px_25px_rgba(255,102,0,0.35)] transition-transform duration-500 group-hover:scale-115">
        <span className="text-[8px] opacity-75 uppercase tracking-widest mb-0.5">LAUNCH</span>
        <span className="font-tusker text-lg">EXL</span>
      </div>
      
      {/* Connecting paths */}
      <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 340 200">
        <line x1="170" y1="100" x2="60" y2="40" stroke="rgba(255,102,0,0.15)" strokeWidth="2.5" className="channel-line-carousel transition-colors duration-500" />
        <line x1="170" y1="100" x2="280" y2="40" stroke="rgba(255,102,0,0.15)" strokeWidth="2.5" className="channel-line-carousel transition-colors duration-500" />
        <line x1="170" y1="100" x2="170" y2="160" stroke="rgba(255,102,0,0.15)" strokeWidth="2.5" className="channel-line-carousel transition-colors duration-500" />
      </svg>

      <style>{`
        .deliverable-card:hover .channel-line-carousel {
          stroke: #bc3111;
        }
      `}</style>

      {/* Floating Channel Node Panels */}
      <div className="absolute top-4 left-2 px-4 py-2.5 rounded-2xl bg-white shadow-lg border border-black/5 z-20 transition-transform duration-500 group-hover:-translate-y-1.5 flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-[#0077b5]" />
        <span className="text-[11px] font-bold text-[#0077b5]">LinkedIn Live</span>
      </div>
      
      <div className="absolute top-4 right-2 px-4 py-2.5 rounded-2xl bg-white shadow-lg border border-black/5 z-20 transition-transform duration-500 group-hover:-translate-y-1.5 flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-[#ff0000]" />
        <span className="text-[11px] font-bold text-[#ff0000]">YouTube Hub</span>
      </div>
      
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-2xl bg-white shadow-lg border border-black/5 z-20 transition-transform duration-500 group-hover:translate-y-1.5 flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-b2b-vivid-orange" />
        <span className="text-[11px] font-bold text-black/75 font-semibold">Partner Channels</span>
      </div>
    </div>
  </div>
)

// Visual 6: Live interactive SVG Analytics Chart (Giant) - Dot animations removed
const AnalyticsVisual = () => (
  <div className="relative w-full h-full min-h-[260px] md:min-h-[440px] bg-[#f8f8f8] rounded-3xl border border-black/5 overflow-hidden flex items-center justify-center transition-all duration-500 group-hover:bg-[#faf9f6] p-8 shadow-inner">
    <div className="relative w-full h-full flex flex-col justify-between">
      <div className="flex justify-between items-center border-b border-black/5 pb-3">
        <span className="text-[10px] font-black text-black/50 tracking-wider uppercase">RETENTION FUNNEL GROWTH</span>
        <span className="text-[10px] font-black text-[#bc3111] animate-pulse bg-[#bc3111]/5 px-3 py-1 rounded-full">
          +312% MOM GROWTH
        </span>
      </div>
      
      {/* SVG Vector Chart */}
      <div className="w-full h-[160px] relative overflow-hidden rounded-2xl">
        <svg className="w-full h-full overflow-hidden" viewBox="0 0 280 160">
          <defs>
            <linearGradient id="chartGradCarousel" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#bc3111" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#bc3111" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="0" y1="40" x2="280" y2="40" stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
          <line x1="0" y1="80" x2="280" y2="80" stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
          <line x1="0" y1="120" x2="280" y2="120" stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
          
          <path d="M 0 135 Q 60 115 120 80 T 220 50 T 280 20 L 280 160 L 0 160 Z" fill="url(#chartGradCarousel)" />
          
          <path 
            d="M 0 135 Q 60 115 120 80 T 220 50 T 280 20" 
            fill="none" 
            stroke="#bc3111" 
            strokeWidth="3.5" 
            className="chart-path-carousel"
          />
        </svg>

        <style>{`
          .chart-path-carousel {
            stroke-dasharray: 340;
            stroke-dashoffset: 340;
            transition: stroke-dashoffset 2s cubic-bezier(0.2, 0.8, 0.2, 1);
          }
          .deliverable-card:hover .chart-path-carousel {
            stroke-dashoffset: 0;
          }
        `}</style>
      </div>

      <div className="flex justify-between text-[9px] text-black/40 font-bold border-t border-black/5 pt-3">
        <span>WK 1: OUTREACH</span>
        <span>WK 2: CAMPAIGN</span>
        <span>WK 3: ASSETS</span>
        <span>WK 4: SCALE</span>
      </div>
    </div>
  </div>
)

const numColors = [
  'text-b2b-crimson',
  'text-b2b-dark-red',
  'text-b2b-gray-brown',
  'text-b2b-crimson',
  'text-b2b-dark-red',
  'text-b2b-gray-brown'
]

export default function B2BPodcastWhatYouGet() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  
  const [scrollProgress, setScrollProgress] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.fromTo('.carousel-wrapper', 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  // Smooth button click scroll function
  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const container = scrollRef.current
    
    // Calculate card width dynamically + spacing gap
    const cardWidth = container.firstElementChild?.getBoundingClientRect().width || 900
    const gap = 48 // 48px matching grid gaps
    const scrollAmount = cardWidth + gap
    
    const targetScrollLeft = direction === 'left' 
      ? container.scrollLeft - scrollAmount 
      : container.scrollLeft + scrollAmount

    container.scrollTo({
      left: targetScrollLeft,
      behavior: 'smooth'
    })
  }

  const handleScroll = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    
    // Update progress tracker
    const progress = scrollLeft / (scrollWidth - clientWidth)
    setScrollProgress(isNaN(progress) ? 0 : progress)

    // Update active arrow states
    setCanScrollLeft(scrollLeft > 15)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15)
  }

  const renderVisual = (idx: number) => {
    switch (idx) {
      case 0: return <CalendarVisual />
      case 1: return <SetVisual />
      case 2: return <ThumbnailVisual />
      case 3: return <RepurposingVisual />
      case 4: return <DistributionVisual />
      case 5: return <AnalyticsVisual />
      default: return null
    }
  }

  return (
    <section 
      ref={containerRef}
      className="relative bg-[#f7f7f7] py-24 lg:py-36 px-0 w-full overflow-hidden"
    >
      {/* Subtle organic background grid */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none z-0" 
        style={{
          backgroundImage: 'repeating-linear-gradient(to right, #000000 0px, #000000 1px, transparent 1px, transparent 80px), repeating-linear-gradient(to bottom, #000000 0px, #000000 1px, transparent 1px, transparent 80px)'
        }}
      />
      
      {/* Core CSS to override and force hide native browser scrollbars globally */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none !important;
        }
        .no-scrollbar {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
        .deliverable-card:hover .channel-line-carousel {
          stroke: #bc3111;
        }
      `}</style>
      
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-start px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-start">
          <span className="font-mona-narrow font-bold text-b2b-vivid-orange tracking-[0.2em] uppercase text-xs md:text-sm mb-4 block">
            What You Get
          </span>
          <div className="w-12 h-[1px] bg-black/10 mb-6" />
          <h2 className="font-mona-narrow font-black text-4xl md:text-6xl lg:text-[72px] text-black uppercase tracking-tight leading-[1.05]">
            Deliverables, <span className="text-black/40">every month.</span>
          </h2>
        </div>
      </div>

      {/* Widescreen Cinematic Carousel Track Container */}
      <div className="carousel-wrapper relative z-10 w-full animate-fadeIn">
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto no-scrollbar scroll-smooth py-8 gap-8 md:gap-12 px-6 lg:px-12 touch-pan-x"
        >
          {deliverables.map((item, idx) => {
            const isEven = idx % 2 === 0
            const accentTextClass = isEven ? 'text-b2b-vivid-orange' : 'text-b2b-crimson'
            const hoverTextClass = isEven ? 'group-hover:text-b2b-bright' : 'group-hover:text-b2b-crimson/80'
            const bulletColorClass = isEven ? 'text-b2b-vivid-orange' : 'text-b2b-crimson'

            return (
              <div 
                key={item.num}
                className="deliverable-card group relative bg-white hover:bg-[#fafafa] rounded-[48px] p-10 md:p-16 border border-black/5 hover:border-b2b-vivid-orange/30 transition-all duration-500 flex flex-col justify-between w-[92vw] md:w-[1180px] h-auto min-h-[580px] flex-shrink-0 shadow-sm hover:shadow-2xl"
              >
                {/* Dynamic warm hover halo effect */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,102,0,0.02),_transparent_65%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* 2-Column Split-Grid inside Carousel Card */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 w-full h-full items-stretch">
                  
                  {/* Left Column: Spacious Text Content */}
                  <div className="flex flex-col justify-between py-2">
                    <div>
                      {/* Category Label and Number */}
                      <div className="flex items-center gap-6 mb-6">
                        <span className={`font-tusker text-7xl lg:text-8xl leading-none select-none transition-all duration-500 opacity-30 group-hover:opacity-75 ${numColors[idx]}`}>
                          {item.num}
                        </span>
                        <div className="flex flex-col items-start gap-1">
                          <span className="font-mona-narrow font-bold text-black/40 text-sm tracking-wider uppercase">
                            {deliverables[idx].title}
                          </span>
                        </div>
                      </div>

                      <h3 className="font-mona-narrow font-black text-4xl md:text-6xl text-black uppercase tracking-tight leading-[1.05] mb-5">
                        {item.title} <br />
                        <span className={`${accentTextClass} ${hoverTextClass} transition-colors duration-500`}>
                          {item.highlight}
                        </span>
                      </h3>
                      
                      <p className="font-mona-narrow text-gray-600 group-hover:text-gray-800 transition-colors duration-500 text-lg md:text-xl leading-relaxed font-light mb-8">
                        {item.desc}
                      </p>
                    </div>

                    {/* Bullets checklist */}
                    <div className="border-t border-black/5 pt-6 flex flex-col sm:flex-row gap-4 sm:gap-8 mt-auto">
                      {bullets[idx].map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-3">
                          <svg className={`w-5 h-5 ${bulletColorClass} flex-shrink-0`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="font-mona-narrow font-bold text-sm md:text-base text-black/50 group-hover:text-black/75 transition-colors duration-500 uppercase tracking-tight">
                            {bullet}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Giant Visual Stage */}
                  <div className="w-full flex items-center justify-center min-h-[300px] md:min-h-[440px]">
                    {renderVisual(idx)}
                  </div>

                </div>
              </div>
            )
          })}
        </div>

        {/* Control Center Station (Progress Bar + Circular Navigation Arrows) */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-12 flex flex-col sm:flex-row items-center justify-between gap-8">
          
          {/* Left: Symmetrical Percent Explored Tracker */}
          <div className="flex items-center gap-4">
            <span className="font-mona-narrow font-bold text-black/30 uppercase text-[10px] tracking-widest">
              {Math.round(scrollProgress * 100)}% EXPLORED
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-black/10" />
            <span className="font-mona-narrow font-bold text-black/30 uppercase text-[10px] tracking-widest hidden sm:inline">
              Swipe on mobile / use arrows on desktop
            </span>
          </div>

          {/* Middle: Sleek Progress Bar Track */}
          <div className="flex-grow max-w-[400px] w-full h-[2px] bg-black/10 rounded-full relative overflow-hidden">
            <div 
              className="absolute left-0 top-0 bottom-0 bg-b2b-vivid-orange transition-all duration-300 ease-out rounded-full"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
          
          {/* Right: Premium Circular Navigation Arrow Buttons */}
          <div className="flex items-center gap-3">
            {/* Left Circular Arrow */}
            <button 
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll Carousel Left"
              className="w-14 h-14 rounded-full border border-black/10 bg-white text-black hover:bg-black hover:text-white hover:border-black transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center shadow-sm cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Circular Arrow */}
            <button 
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Scroll Carousel Right"
              className="w-14 h-14 rounded-full border border-black/10 bg-white text-black hover:bg-black hover:text-white hover:border-black transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center shadow-sm cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}
