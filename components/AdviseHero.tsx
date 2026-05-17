'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const STRATEGY_DECK = [
  {
    id: 0,
    num: '01',
    title: 'POSITIONING BRIEF',
    highlight: 'IN BUYER\'S LANGUAGE.',
    desc: 'Who you are, who you\'re for, and why any of it should matter to the buyer. We pressure-test your existing positioning, rebuild what isn\'t working, and deliver language your sales team will actually use.',
    metricLabel: 'Alignment Check',
    metricVal: '✓ 100% COMPLETE',
    accentColor: 'var(--chartreuse)',
    bullets: ['Buyer-centric positioning', 'Competitive pressure audits']
  },
  {
    id: 1,
    num: '02',
    title: '12-MONTH GTM PLAYBOOK',
    highlight: 'SEQUENCED FOR WEIGHT.',
    desc: 'For new products, new segments, or brands that have grown past their current plan. We map the channels, content, and the sequence of moves required to land in market with weight, not noise.',
    metricLabel: 'GTM Sequencing',
    metricVal: '✓ READY TO RUN',
    accentColor: '#FFFFFF',
    bullets: ['Milestone maps', 'Resource parameters']
  },
  {
    id: 2,
    num: '03',
    title: 'THE DECISION PLAYBOOK',
    highlight: 'DEFEND CHOICES INTERNALLY.',
    desc: 'Rigorous findings written to explain the "why" behind each strategic direction, giving your marketing department a solid framework to justify marketing expenditures to your CEO and board.',
    metricLabel: 'Boardroom Justification',
    metricVal: '✓ AUDITED DECISIONS',
    accentColor: 'var(--chartreuse)',
    bullets: ['CEO & board alignment decks', 'Pipeline justification briefs']
  }
]

export default function AdviseHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  
  const [activeIndex, setActiveIndex] = useState(0)
  const [shuffling, setShuffling] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // 1. Initial load fades
      const tl = gsap.timeline()
      tl.fromTo('.advise-hero-fade',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.1, ease: 'power4.out' }
      )
      
      tl.fromTo('.advise-deck-fade',
        { opacity: 0, scale: 0.9, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 1.4, ease: 'power3.out' },
        '-=0.8'
      )

      // 2. Slow zoom-in on load for background strategy image
      gsap.fromTo(imageRef.current,
        { scale: 1.15, filter: 'blur(8px)' },
        { scale: 1.02, filter: 'blur(0px)', duration: 2.2, ease: 'power3.out' }
      )

      // 3. Parallax Scroll offset on Background Photo
      gsap.to(imageRef.current, {
        yPercent: 12,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      })

      // 4. Interactive 3D Depth Mouse Drift (Subtle & Premium)
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e
        const xPos = (clientX / window.innerWidth - 0.5)
        const yPos = (clientY / window.innerHeight - 0.5)
        
        // Background photo shifts in opposite direction
        gsap.to('.hero-bg-parallax', {
          x: xPos * -20,
          y: yPos * -20,
          duration: 1.5,
          ease: 'power2.out',
          overwrite: 'auto'
        })

        // Front text and cards stack drift slightly towards cursor
        gsap.to('.hero-text-parallax', {
          x: xPos * 15,
          y: yPos * 15,
          duration: 1.2,
          ease: 'power2.out',
          overwrite: 'auto'
        })
      }
      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)

    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Drag start handler (Pointer events support both touch & mouse)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, cardId: number) => {
    if (cardId !== activeIndex || shuffling) return
    const card = e.currentTarget
    card.setPointerCapture(e.pointerId)
    setDragStart({ x: e.clientX, y: e.clientY })
    setIsDragging(true)
  }

  // Active dragging handler
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>, cardId: number) => {
    if (!isDragging || cardId !== activeIndex) return
    const card = e.currentTarget
    const deltaX = e.clientX - dragStart.x
    const deltaY = e.clientY - dragStart.y
    const rot = deltaX * 0.08 // Tilt card based on drag displacement

    gsap.set(card, {
      x: deltaX,
      y: deltaY,
      rotation: rot,
      overwrite: 'auto'
    })
  }

  // Drag release throw physics handler
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>, cardId: number) => {
    if (!isDragging || cardId !== activeIndex) return
    setIsDragging(false)
    const card = e.currentTarget
    card.releasePointerCapture(e.pointerId)

    const deltaX = e.clientX - dragStart.x
    const deltaY = e.clientY - dragStart.y

    // Swipe out threshold: 130px horizontal drag
    if (Math.abs(deltaX) > 130) {
      setShuffling(true)
      const throwRight = deltaX > 0
      const targetX = throwRight ? window.innerWidth * 0.75 : -window.innerWidth * 0.75
      const targetRot = throwRight ? 45 : -45

      // Slide card fully offscreen
      gsap.to(card, {
        x: targetX,
        y: deltaY * 1.5,
        rotation: targetRot,
        opacity: 0,
        duration: 0.45,
        ease: 'power2.out',
        onComplete: () => {
          // Shuffle index sequentially
          setActiveIndex((prev) => (prev + 1) % STRATEGY_DECK.length)
          
          // Clear GSAP hardcoded parameters so React inline CSS maps perfectly
          gsap.set(card, {
            clearProps: 'transform,opacity'
          })
          setShuffling(false)
        }
      })
    } else {
      // Gentle spring back to active resting position
      gsap.to(card, {
        x: 0,
        y: 0,
        rotation: -1.5,
        duration: 0.5,
        ease: 'back.out(1.5)',
        overwrite: 'auto'
      })
    }
  }

  // Click handler to shuffle background card directly to front
  const selectCard = (index: number) => {
    if (index === activeIndex || shuffling) return
    setShuffling(true)

    const targetCard = `.strategy-card-${index}`
    
    const tl = gsap.timeline({
      onComplete: () => {
        setActiveIndex(index)
        setShuffling(false)
      }
    })

    // Slide card out to side
    tl.to(targetCard, {
      xPercent: 110,
      rotation: 12,
      scale: 1.02,
      duration: 0.45,
      ease: 'power2.in'
    })

    // Elevate stack depth
    tl.add(() => {
      gsap.set(targetCard, { zIndex: 40 })
    })

    // Slide card back in front
    tl.to(targetCard, {
      xPercent: 0,
      rotation: 0,
      scale: 1,
      duration: 0.65,
      ease: 'back.out(1.2)'
    })
  }

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen bg-black pt-32 pb-24 lg:py-36 overflow-hidden flex items-center justify-center selection:bg-[var(--chartreuse)] selection:text-black touch-none"
    >
      
      {/* ── FULL-BLEED DALLAS BOARDROOM BACKDROP PHOTO ─────────────────── */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black hero-bg-parallax">
        <Image 
          ref={imageRef}
          src="/assets/images/advise-hero-strategy.png" 
          alt="Focused and authentic strategy consult in a beautifully sunlit modern corporate workspace" 
          fill
          className="object-cover object-center brightness-[0.55]"
          priority
        />
        {/* Soft atmospheric gradients & vignetting overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent z-10" />
        <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 35%, black 100%) z-10 opacity-75" />
      </div>

      {/* Background Graphic Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none z-10" 
        style={{
          backgroundImage: 'repeating-linear-gradient(to right, #FFF 0px, #FFF 1px, transparent 1px, transparent 80px), repeating-linear-gradient(to bottom, #FFF 0px, #FFF 1px, transparent 1px, transparent 80px)'
        }}
      />
      
      {/* Ambient background glows */}
      <div className="absolute top-[20%] right-[-10%] w-[35rem] h-[35rem] bg-[#DEFF00]/2 rounded-full blur-[140px] pointer-events-none z-10" />
      <div className="absolute bottom-[10%] left-[-10%] w-[30rem] h-[30rem] bg-white/[0.015] rounded-full blur-[120px] pointer-events-none z-10" />
      
      {/* Analog oscillating film grain */}
      <div className="absolute inset-0 pointer-events-none z-20 dense-film-grain opacity-[0.035]" />

      <div className="relative z-20 max-w-[1400px] w-full mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center hero-text-parallax">
        
        {/* ── LEFT COLUMN: MINIMALIST DESCRIPTION & BRAND PANEL ───────── */}
        <div className="lg:col-span-5 text-left flex flex-col items-start gap-8 z-20">
          <div className="space-y-4 advise-hero-fade opacity-0">
            <h1 
              style={{
                fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
                fontSize: 'clamp(44px, 5.5vw, 84px)',
                lineHeight: 1.05,
                color: '#FFFFFF',
                textTransform: 'uppercase'
              }}
            >
              Senior thinking. <br />
              <span className="text-[var(--chartreuse)]" style={{ color: 'var(--chartreuse)' }}>Delivered.</span>
            </h1>
            <p className="font-[var(--font-cabinet)] text-white/80 text-lg md:text-xl leading-relaxed font-light max-w-md">
              EXL Advise pressure-tests your positioning, sequences your channels, and builds boardroom-ready strategy playbooks to justify marketing decisions to your CEO.
            </p>
          </div>

          {/* Core Qualifiers checklist */}
          <div className="advise-hero-fade opacity-0 border-t border-white/10 pt-8 w-full space-y-5">
            <div className="flex items-center gap-4">
              <span className="w-3.5 h-[2px] bg-[var(--chartreuse)] shrink-0" />
              <span className="font-[var(--font-tusker)] text-[clamp(15px,1.8vw,19px)] font-bold uppercase tracking-[0.08em] text-white">
                For Founders, CEOs & PE CMOs
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-3.5 h-[2px] bg-[var(--chartreuse)] shrink-0" />
              <span className="font-[var(--font-tusker)] text-[clamp(15px,1.8vw,19px)] font-bold uppercase tracking-[0.08em] text-white">
                Fully Scoped Custom Deliverables
              </span>
            </div>
          </div>

          <div className="advise-hero-fade opacity-0 w-full pt-6">
            <Link 
              href="/contact"
              className="group w-full sm:w-auto inline-block relative px-14 py-6 bg-[var(--chartreuse)] text-black font-[var(--font-tusker)] text-xl tracking-[0.18em] uppercase overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] text-center shadow-[0_12px_35px_rgba(222,255,0,0.2)] hover:shadow-[0_15px_40px_rgba(222,255,0,0.3)]"
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Book strategic audit</span>
              <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        {/* ── RIGHT COLUMN: TACTILE STRATEGY DECK ────────────────────────── */}
        <div className="lg:col-span-7 advise-deck-fade opacity-0 relative flex flex-col items-center justify-center min-h-[480px] md:min-h-[580px] z-10">

          {/* Overlapping Cards Wrapper */}
          <div className="relative w-full max-w-[540px] h-[480px] md:h-[530px]">
            {STRATEGY_DECK.map((card, idx) => {
              const isActive = idx === activeIndex
              
              // Calculate offset styles for overlapping visual look based on active card
              let offsetStyle: React.CSSProperties = {}
              let stackZIndex = 10
              let stackRotate = 0
              let stackTranslateX = 0
              let stackTranslateY = 0

              if (isActive) {
                stackZIndex = 30
                stackRotate = -1.5
                stackTranslateX = 0
                stackTranslateY = 0
              } else {
                // Background cards layout
                const relativeIdx = (idx - activeIndex + 3) % 3
                if (relativeIdx === 1) {
                  stackZIndex = 20
                  stackRotate = 2.5
                  stackTranslateX = 15
                  stackTranslateY = -12
                } else {
                  stackZIndex = 10
                  stackRotate = 5
                  stackTranslateX = 28
                  stackTranslateY = -24
                }
              }

              offsetStyle = {
                zIndex: stackZIndex,
                transform: `rotate(${stackRotate}deg) translate(${stackTranslateX}px, ${stackTranslateY}px)`,
                cursor: isActive ? (isDragging ? 'grabbing' : 'grab') : 'pointer',
                touchAction: 'none'
              }

              return (
                <div
                  key={card.id}
                  onPointerDown={(e) => handlePointerDown(e, idx)}
                  onPointerMove={(e) => handlePointerMove(e, idx)}
                  onPointerUp={(e) => handlePointerUp(e, idx)}
                  onClick={!isActive ? () => selectCard(idx) : undefined}
                  style={offsetStyle}
                  className={`strategy-card-${idx} absolute inset-0 w-full h-full rounded-[36px] bg-[#111111]/80 backdrop-blur-lg border border-white/10 hover:border-white/20 p-8 md:p-10 flex flex-col justify-between overflow-hidden shadow-2xl transition-shadow duration-500 group select-none`}
                >
                  
                  {/* Highlighter glow gradient */}
                  <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/[0.02] group-hover:bg-white/[0.04] rounded-full blur-3xl z-0 pointer-events-none" />

                  {/* Header info */}
                  <div className="relative z-10 flex items-center justify-between border-b border-white/5 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="font-[var(--font-tusker)] text-2xl font-bold text-white/25 group-hover:text-white/45 transition-colors">
                        {card.num}
                      </span>
                      <span className="font-[var(--font-tusker)] text-[10px] font-bold text-white/50 tracking-wider uppercase">
                        {card.title}
                      </span>
                    </div>
                    
                    <span 
                      style={{ color: card.accentColor }}
                      className="font-[var(--font-tusker)] text-[9px] font-bold tracking-widest uppercase border border-white/10 rounded-full px-3 py-1 bg-white/[0.02]"
                    >
                      {card.metricVal}
                    </span>
                  </div>

                  {/* Core copy */}
                  <div className="relative z-10 my-auto text-left py-4 space-y-4">
                    <h3 
                      style={{ fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif" }}
                      className="text-white text-3xl md:text-4xl leading-tight uppercase font-black"
                    >
                      {card.title.split(' ')[0]} <br />
                      <span 
                        className="px-2 py-0.5 inline-block text-black text-2xl md:text-3xl font-black rounded-sm"
                        style={{ backgroundColor: card.accentColor }}
                      >
                        {card.highlight}
                      </span>
                    </h3>
                    
                    <p className="font-[var(--font-cabinet)] text-white/65 group-hover:text-white/85 transition-colors text-base md:text-lg leading-relaxed font-light">
                      {card.desc}
                    </p>
                  </div>

                  {/* Tactical bullets footer */}
                  <div className="relative z-10 border-t border-white/5 pt-4 flex items-center justify-between">
                    <div className="flex gap-4">
                      {card.bullets.map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--chartreuse)]" />
                          <span className="font-[var(--font-tusker)] text-[8px] md:text-[9px] font-bold text-white/40 group-hover:text-white/60 uppercase tracking-widest">
                            {bullet}
                          </span>
                        </div>
                      ))}
                    </div>

                    {isActive ? (
                      <span className="font-[var(--font-tusker)] text-[9px] text-[var(--chartreuse)] font-black uppercase tracking-wider hidden md:inline animate-pulse">
                        SWIPE TO THROW ➔
                      </span>
                    ) : (
                      <span className="font-[var(--font-tusker)] text-[9px] text-white/30 font-black uppercase tracking-wider">
                        TAP TO CHOOSE
                      </span>
                    )}
                  </div>

                </div>
              )
            })}
          </div>

          {/* Shuffle indicators on mobile */}
          <div className="mt-8 flex gap-2.5 z-20 lg:hidden">
            {STRATEGY_DECK.map((_, idx) => (
              <button
                key={idx}
                onClick={() => selectCard(idx)}
                className={`w-3.5 h-3.5 rounded-full border transition-all duration-300 ${idx === activeIndex ? 'bg-[var(--chartreuse)] border-[var(--chartreuse)] scale-110' : 'bg-transparent border-white/20'}`}
                aria-label={`Shuffle to card ${idx + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}
