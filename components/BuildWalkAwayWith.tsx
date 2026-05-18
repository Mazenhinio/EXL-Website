'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const deliverables = [
  {
    num: '01',
    title: 'LAUNCHED PROJECT',
    highlight: 'ON COMMIT DATE.',
    desc: 'A launched project, on the date we committed to. Scoped against a hard timeline, staffed with senior builders, and shipped with all core objectives met.',
    bullets: ['Hard Commit Timelines', 'Accountable Shipping Plans']
  },
  {
    num: '02',
    title: 'ALL ASSETS & SOURCE FILES',
    highlight: 'ORGANIZED & YOURS.',
    desc: 'All creative design files, web templates, custom code repos, and raw media assets are beautifully organized, compiled, and turned over to you. You own everything.',
    bullets: ['Clean Source File Transfers', 'Zero Lock-in, 100% Owned']
  },
  {
    num: '03',
    title: 'POST-LAUNCH READ',
    highlight: 'WHAT WORKED.',
    desc: 'A post-launch measurement read of what worked and what didn\'t. Complete transparent reporting on actual pipeline performance, site speed, and conversion reads.',
    bullets: ['Metric Accountability Reads', 'Conversion Growth Logs']
  },
  {
    num: '04',
    title: 'FORWARD STRATEGY',
    highlight: 'WHAT TO BUILD NEXT.',
    desc: 'Recommendations for what to build next, based on what we learned in this one. A strategic blueprint detailing how to scale or optimize the shipped assets.',
    bullets: ['Scale & Refinement Blueprints', 'Future Phase Scoping Briefs']
  }
]

// Visual 1: Launched visual MacBook
const MacBookVisual = () => (
  <div className="relative w-full h-full min-h-[260px] md:min-h-[440px] bg-black/5 rounded-[2rem] overflow-hidden shadow-inner flex items-center justify-center p-0">
    <div className="absolute inset-0 w-full h-full">
      <Image 
        src="/assets/images/b2b_get_set.png" 
        alt="MacBook Pro presenting launched campaign assets" 
        fill
        className="object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:opacity-0" />
    </div>
  </div>
)

// Visual 2: Strategic Folder Mockup
const FolderVisual = () => (
  <div className="relative w-full h-full min-h-[260px] md:min-h-[440px] bg-black/5 rounded-[2rem] overflow-hidden shadow-inner flex items-center justify-center p-0">
    <div className="absolute inset-0 w-full h-full">
      <Image 
        src="/assets/images/advise-walkaway-archive.png" 
        alt="Clean strategic archive layout and asset repository" 
        fill
        className="object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:opacity-0" />
    </div>
  </div>
)

// Visual 3: Chart Metric Visual
const ChartVisual = () => (
  <div className="relative w-full h-full min-h-[260px] md:min-h-[440px] bg-black/5 rounded-[2rem] overflow-hidden shadow-inner flex items-center justify-center p-0">
    <div className="absolute inset-0 w-full h-full">
      <Image 
        src="/assets/images/advise-walkaway-decision.png" 
        alt="Post-launch measurement metrics analysis layout" 
        fill
        className="object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:opacity-0" />
    </div>
  </div>
)

// Visual 4: Playbook Document visual
const PlaybookVisual = () => (
  <div className="relative w-full h-full min-h-[260px] md:min-h-[440px] bg-black/5 rounded-[2rem] overflow-hidden shadow-inner flex items-center justify-center p-0">
    <div className="absolute inset-0 w-full h-full">
      <Image 
        src="/assets/images/advise-walkaway-execution.png" 
        alt="Forward strategy recommendation documentation" 
        fill
        className="object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:opacity-0" />
    </div>
  </div>
)

export default function BuildWalkAwayWith() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  
  const [scrollProgress, setScrollProgress] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.fromTo('.build-carousel-wrapper', 
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
    const offset = direction === 'left' ? -480 : 480
    scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' })
  }

  const handleScroll = () => {
    if (!scrollRef.current) return
    const el = scrollRef.current
    const total = el.scrollWidth - el.clientWidth
    const progress = total > 0 ? el.scrollLeft / total : 0
    setScrollProgress(progress)
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(total - el.scrollLeft > 10)
  }

  const renderVisual = (idx: number) => {
    switch(idx) {
      case 0: return <MacBookVisual />
      case 1: return <FolderVisual />
      case 2: return <ChartVisual />
      case 3: return <PlaybookVisual />
      default: return null
    }
  }

  return (
    <section 
      ref={containerRef}
      className="relative bg-[var(--off-white)] py-24 lg:py-36 px-0 w-full overflow-hidden border-b border-black/5 selection:bg-black selection:text-white"
    >
      <div className="absolute inset-0 pointer-events-none z-0 dense-film-grain opacity-[0.02]" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 lg:pb-16 border-b border-black/10 mb-16 lg:mb-20">
          <div className="space-y-4">
            <span className="font-[var(--font-mona-narrow)] text-[10px] tracking-[0.2em] text-[var(--taupe)] uppercase block font-bold">
              What you walk away with
            </span>
            <h2 
              style={{
                fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
                fontSize: 'clamp(40px, 6vw, 84px)',
                lineHeight: 1.1,
                color: '#000000',
                textTransform: 'uppercase'
              }}
            >
              What shipping looks like.
            </h2>
          </div>

          {/* Navigation controls */}
          <div className="flex items-center gap-6">
            <div className="relative w-48 h-[2px] bg-black/10 hidden md:block">
              <div 
                className="absolute top-0 left-0 h-full bg-black transition-all duration-300"
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`w-14 h-14 rounded-full border border-black/10 flex items-center justify-center transition-all duration-300
                  ${canScrollLeft ? 'bg-black text-white border-black scale-100 hover:scale-105 active:scale-95' : 'bg-transparent text-black/25 opacity-50 cursor-not-allowed'}`}
                aria-label="Scroll left"
              >
                ➔
              </button>
              <button 
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`w-14 h-14 rounded-full border border-black/10 flex items-center justify-center transition-all duration-300
                  ${canScrollRight ? 'bg-black text-white border-black scale-100 hover:scale-105 active:scale-95' : 'bg-transparent text-black/25 opacity-50 cursor-not-allowed'}`}
                aria-label="Scroll right"
              >
                ➔
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Rail Container */}
        <div className="build-carousel-wrapper opacity-0">
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-8 select-none"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {deliverables.map((item, idx) => (
              <div 
                key={item.num}
                className="snap-start shrink-0 w-[88vw] md:w-[68vw] lg:w-[48vw] max-w-[660px] rounded-[3rem] bg-white border border-black/5 p-8 md:p-12 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-between group"
              >
                <div className="space-y-8">
                  {/* Metric header */}
                  <div className="flex justify-between items-center pb-6 border-b border-black/10">
                    <div className="flex items-center gap-3">
                      <span className="font-[var(--font-tusker)] text-2xl font-bold text-black/25 group-hover:text-black/45 transition-colors">
                        {item.num}
                      </span>
                      <span className="font-[var(--font-mona-narrow)] text-[10px] font-bold text-black/50 tracking-widest uppercase">
                        {item.title}
                      </span>
                    </div>
                    <span className="w-1.5 h-1.5 rounded-full bg-black/15 group-hover:bg-black transition-colors" />
                  </div>

                  {/* Core description block */}
                  <div className="space-y-4 text-left">
                    <h3 
                      style={{ fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif" }}
                      className="text-black text-3xl leading-tight uppercase font-black"
                    >
                      {item.title.split(' ')[0]} <br />
                      <span className="px-2 py-0.5 inline-block text-black text-xl md:text-2xl font-black rounded-sm bg-[var(--chartreuse)]">
                        {item.highlight}
                      </span>
                    </h3>
                    
                    <p className="font-[var(--font-cabinet)] text-black/70 group-hover:text-black/85 transition-colors text-base md:text-lg leading-relaxed font-light min-h-[100px]">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Styled Visual Asset container */}
                <div className="my-8">
                  {renderVisual(idx)}
                </div>

                {/* Card footer details */}
                <div className="border-t border-black/10 pt-6 flex items-center justify-between">
                  <div className="flex gap-4">
                    {item.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--chartreuse)] shrink-0" />
                        <span className="font-[var(--font-tusker)] text-[9px] font-bold text-black/40 group-hover:text-black/60 uppercase tracking-widest">
                          {bullet}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
