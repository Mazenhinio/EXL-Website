'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const deliverables = [
  {
    num: '01',
    title: 'POSITIONING BRIEF',
    highlight: 'IN BUYER\'S LANGUAGE.',
    desc: 'Who you are, who you\'re for, and why any of it should matter to the buyer. We pressure-test your existing positioning, rebuild what isn\'t working, and leave you with language your sales team will actually use on a call.',
    bullets: ['Buyer-Specific Language', 'Competitive Pressure Tests']
  },
  {
    num: '02',
    title: '12-MONTH GTM PLAYBOOK',
    highlight: 'SEQUENCED FOR WEIGHT.',
    desc: 'For new products, new markets, new segments, or a brand that\'s grown past its current plan. We map the buyer, the channels, the content, and the sequence of moves required to land in market with weight, not noise.',
    bullets: ['Milestone Sequencing', 'Channel Resource Matrix']
  },
  {
    num: '03',
    title: 'STRATEGIC ARCHIVE',
    highlight: 'FULL WORKSHOP LOGS.',
    desc: 'Every single strategic consult is fully recorded, transcribed, and structured into a searchable meeting database, giving your team permanent access to the core strategy debates and decisions.',
    bullets: ['High-Def Session Recordings', 'Interactive Summaries']
  },
  {
    num: '04',
    title: 'DECISION PLAYBOOK',
    highlight: 'DEFEND CHOICES INTERNALLY.',
    desc: 'Rigorous findings written to explain the "why" behind each strategic direction, giving your marketing department a solid framework to justify marketing expenditures to your CEO and board.',
    bullets: ['CEO & Board Decks', 'Justified Expenditure Briefs']
  },
  {
    num: '05',
    title: 'EXECUTION PATH',
    highlight: 'PRODUCE, BUILD, OR GROW.',
    desc: 'An optional, fully scoped development brief matching your strategy with the technical resources of the Produce, Build, and Grow floors to start shipping on date.',
    bullets: ['Production Budgeting', 'Launch Execution Schedules']
  }
]

// Visual 1: Document mockup displaying positioning sections
const DocVisual = () => (
  <div className="relative w-full h-full min-h-[260px] md:min-h-[440px] bg-black/5 rounded-[2rem] overflow-hidden shadow-inner flex items-center justify-center p-0">
    <div className="absolute inset-0 w-full h-full">
      <Image 
        src="/assets/images/advise-walkaway-positioning.png" 
        alt="Branding Positioning Brief deliverable mockup" 
        fill
        className="object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:opacity-0" />
    </div>
  </div>
)

// Visual 2: Roadmap visual showing calendar timeline
const RoadmapVisual = () => (
  <div className="relative w-full h-full min-h-[260px] md:min-h-[440px] bg-black/5 rounded-[2rem] overflow-hidden shadow-inner flex items-center justify-center p-0">
    <div className="absolute inset-0 w-full h-full">
      <Image 
        src="/assets/images/advise-walkaway-gtm.png" 
        alt="12-Month GTM Playbook sequenced roadmap mockup" 
        fill
        className="object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:opacity-0" />
    </div>
  </div>
)

// Visual 3: Strategic Archive showing video meeting player preview
const VideoVisual = () => (
  <div className="relative w-full h-full min-h-[260px] md:min-h-[440px] bg-black/5 rounded-[2rem] overflow-hidden shadow-inner flex items-center justify-center p-0">
    <div className="absolute inset-0 w-full h-full">
      <Image 
        src="/assets/images/advise-walkaway-archive.png" 
        alt="Strategic Consult high-def session recordings video archive mockup" 
        fill
        className="object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:opacity-0" />
    </div>
  </div>
)

// Visual 4: Decision Playbook displaying board/CEO pie charts or logic board
const DecisionVisual = () => (
  <div className="relative w-full h-full min-h-[260px] md:min-h-[440px] bg-black/5 rounded-[2rem] overflow-hidden shadow-inner flex items-center justify-center p-0">
    <div className="absolute inset-0 w-full h-full">
      <Image 
        src="/assets/images/advise-walkaway-decision.png" 
        alt="Decision Playbook budget and board document mockup" 
        fill
        className="object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:opacity-0" />
    </div>
  </div>
)

// Visual 5: Scoped path mockup showing dynamic linkages
const ExecutionVisual = () => (
  <div className="relative w-full h-full min-h-[260px] md:min-h-[440px] bg-black/5 rounded-[2rem] overflow-hidden shadow-inner flex items-center justify-center p-0">
    <div className="absolute inset-0 w-full h-full">
      <Image 
        src="/assets/images/advise-walkaway-execution.png" 
        alt="Execution Path software interface checklist mockup" 
        fill
        className="object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:opacity-0" />
    </div>
  </div>
)

export default function AdviseWalkAwayWith() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  
  const [scrollProgress, setScrollProgress] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.fromTo('.advise-carousel-wrapper', 
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

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const container = scrollRef.current
    const cardWidth = container.firstElementChild?.getBoundingClientRect().width || 800
    const gap = 40
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
    const progress = scrollLeft / (scrollWidth - clientWidth)
    setScrollProgress(isNaN(progress) ? 0 : progress)
    setCanScrollLeft(scrollLeft > 15)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15)
  }

  const renderVisual = (idx: number) => {
    switch (idx) {
      case 0: return <DocVisual />
      case 1: return <RoadmapVisual />
      case 2: return <VideoVisual />
      case 3: return <DecisionVisual />
      case 4: return <ExecutionVisual />
      default: return null
    }
  }

  return (
    <section 
      ref={containerRef}
      className="relative bg-[var(--off-white)] py-24 lg:py-36 px-0 w-full overflow-hidden border-b border-black/5 selection:bg-black selection:text-white"
    >
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none z-0" 
        style={{
          backgroundImage: 'repeating-linear-gradient(to right, #000 0px, #000 1px, transparent 1px, transparent 80px), repeating-linear-gradient(to bottom, #000 0px, #000 1px, transparent 1px, transparent 80px)'
        }}
      />

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none !important;
        }
        .no-scrollbar {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
      `}</style>
      
      <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col items-start px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-start">
          <span className="font-[var(--font-tusker)] text-[12px] tracking-[0.25em] text-[var(--taupe)] uppercase block font-semibold mb-4">
            Strategic Outcomes
          </span>
          <div className="w-12 h-[1px] bg-black/10 mb-6" />
          <h2 
            style={{
              fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
              fontSize: 'clamp(40px, 6vw, 76px)',
              lineHeight: 1.05,
              color: '#000000',
              textTransform: 'uppercase'
            }}
          >
            Deliverables, <span className="text-black/40">you actually use.</span>
          </h2>
        </div>
      </div>

      {/* Horizontal Carousel Track Container */}
      <div className="advise-carousel-wrapper relative z-10 w-full opacity-0">
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto no-scrollbar scroll-smooth py-4 gap-8 md:gap-10 px-6 lg:px-12 touch-pan-x"
        >
          {deliverables.map((item, idx) => (
            <div 
              key={item.num}
              className="deliverable-card group relative bg-white rounded-[40px] p-8 md:p-14 border border-black/5 hover:border-[var(--chartreuse)]/40 transition-all duration-500 flex flex-col justify-between w-[92vw] md:w-[1000px] h-auto min-h-[500px] flex-shrink-0 shadow-sm hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(222,255,0,0.01),_transparent_65%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 w-full h-full items-stretch">
                
                {/* Left: Text Info */}
                <div className="flex flex-col justify-between py-2 text-left">
                  <div>
                    <div className="flex items-center gap-6 mb-6">
                      <span 
                        style={{ fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif" }}
                        className="text-black/10 group-hover:text-[var(--chartreuse)] text-6xl md:text-7xl leading-none transition-colors duration-300"
                      >
                        {item.num}
                      </span>
                      <span className="font-[var(--font-tusker)] font-bold text-black/40 text-xs tracking-wider uppercase">
                        {item.title}
                      </span>
                    </div>

                    <h3 
                      style={{
                        fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
                        fontSize: 'clamp(28px, 4vw, 44px)',
                        lineHeight: 1.45,
                        color: '#000000',
                        textTransform: 'uppercase'
                      }}
                      className="mb-5"
                    >
                      {item.title.split(' ')[0]} <br />
                      <span className="text-[var(--chartreuse)] bg-black px-3 inline-block">
                        {item.highlight}
                      </span>
                    </h3>
                    
                    <p className="font-[var(--font-cabinet)] text-black/65 group-hover:text-black/90 transition-colors duration-500 text-[clamp(17px,2vw,21px)] leading-relaxed font-light mb-8">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bullet checklist tags */}
                  <div className="border-t border-black/5 pt-6 flex flex-col sm:flex-row gap-4 sm:gap-6 mt-auto">
                    {item.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-black flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-[var(--font-tusker)] font-bold text-[11px] text-black/50 group-hover:text-black uppercase tracking-wider">
                          {bullet}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Custom visual card */}
                <div className="w-full flex items-center justify-center min-h-[260px] md:min-h-[360px]">
                  {renderVisual(idx)}
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Carousel controls bar */}
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mt-10 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <span className="font-[var(--font-tusker)] font-bold text-black/30 uppercase text-[10px] tracking-widest">
              {Math.round(scrollProgress * 100)}% EXPLORED
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-black/10" />
            <span className="font-[var(--font-tusker)] font-bold text-black/30 uppercase text-[10px] tracking-widest hidden sm:inline">
              Swipe on mobile / use arrows on desktop
            </span>
          </div>

          <div className="flex-grow max-w-[300px] w-full h-[2px] bg-black/10 rounded-full relative overflow-hidden">
            <div 
              className="absolute left-0 top-0 bottom-0 bg-black transition-all duration-300 ease-out rounded-full"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="w-12 h-12 rounded-full border border-black/10 bg-white text-black hover:bg-black hover:text-white hover:border-black transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center shadow-sm cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button 
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="w-12 h-12 rounded-full border border-black/10 bg-white text-black hover:bg-black hover:text-white hover:border-black transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center shadow-sm cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
