'use client'

import { useEffect, useRef, useState } from 'react'

const phases = [
  {
    num: '01',
    label: 'DEFINE',
    title: 'Define show core.',
    desc: 'Show concept, format, target audience, and commercial purpose. We conduct two strategic working sessions. You leave with a show worth making, backed by solid positioning.',
    bullet: 'Show Concept Blueprint',
    gradient: 'from-[#290201] via-[#4A0404] to-black'
  },
  {
    num: '02',
    label: 'BUILD',
    title: 'Build the visual identity.',
    desc: 'Branding, show page setup, custom set design, multi-camera lighting blueprints, and the complete technical production workflow map before we roll cameras.',
    bullet: 'Set Design & Brand Guide',
    gradient: 'from-[#bc3111] via-[#4A0404] to-black'
  },
  {
    num: '03',
    label: 'PILOT',
    title: 'Pilot first episodes.',
    desc: 'We shoot, edit, and publish the initial episodes on a compressed turnaround cycle. This lets us gather fast audience signal and lock in host-to-guest rhythm.',
    bullet: 'Pilot Delivery SLA',
    gradient: 'from-[#FF6600] via-[#bc3111] to-black'
  },
  {
    num: '04',
    label: 'SCALE',
    title: 'Scale cadence & pipelines.',
    desc: 'With the production flywheel proven, we transition to a steady biweekly or weekly publishing schedule on a predictable calendar your sales team can rely on.',
    bullet: 'cadence scale SLA',
    gradient: 'from-[#4A0404] via-[#290201] to-black'
  }
]

export default function B2BPodcastHowWeWork() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activePhase, setActivePhase] = useState(0)

  useEffect(() => {
    const loadGsap = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      
      gsap.registerPlugin(ScrollTrigger)

      const sections = gsap.utils.toArray('.phase-section') as HTMLElement[]
      
      // Track active section to rotate dial
      sections.forEach((section, idx) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => setActivePhase(idx),
          onEnterBack: () => setActivePhase(idx)
        })
      })
    }

    const timer = setTimeout(() => {
      loadGsap()
    }, 150)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative bg-[#7c6a58] w-full overflow-visible border-t border-black/10"
    >

      {/* Symmetrical glowing ambient backlights for depth */}
      <div className="absolute top-1/3 left-[-10%] w-[50%] h-[50%] rounded-full bg-b2b-vivid-orange/5 blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-1/3 right-[-10%] w-[50%] h-[50%] rounded-full bg-b2b-crimson/5 blur-[150px] pointer-events-none z-0" />

      {/* Main Full-Width Split Layout */}
      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2">
        
        {/* Left Column: Pinned Holographic Command Dial Console */}
        <div className="lg:h-screen lg:sticky lg:top-0 w-full flex flex-col justify-center items-center p-8 md:p-12 lg:p-24 bg-white/5 border-b lg:border-b-0 lg:border-r border-black/10 z-20">
          <div className="text-left w-full max-w-[460px] mb-12 lg:mb-16">
            <span className="font-mona-narrow font-bold text-b2b-vivid-orange tracking-[0.25em] uppercase text-xs md:text-sm mb-4 block">
              Launching Your Show
            </span>
            <h2 className="font-mona-narrow font-black text-4xl md:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-[1.05] m-0">
              HOW WE WORK.
            </h2>
            <p className="font-mona-narrow text-white/70 text-2xl md:text-3xl lg:text-[32px] mt-6 leading-tight font-light m-0 max-w-[440px]">
              Four steps from concept brief to market dominance.
            </p>
          </div>

          {/* The Holographic Timeline Compass Dial */}
          <div className="relative w-[320px] h-[320px] md:w-[420px] md:h-[420px] rounded-full border border-black/10 flex items-center justify-center bg-white/20 shadow-[inset_0_0_50px_rgba(255,255,255,0.1)] backdrop-blur-sm">
            
            {/* Outer Edges Static Pill: DEFINE */}
            <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 z-30">
              <span className={`font-mona-narrow font-black text-lg md:text-xl lg:text-[22px] tracking-[0.18em] transition-all duration-700 uppercase select-none rounded-full px-8 py-4 border backdrop-blur-md inline-block w-fit bg-black
                ${activePhase === 0 
                  ? 'text-b2b-vivid-orange border-b2b-vivid-orange/40 shadow-[0_0_25px_rgba(255,102,0,0.25)] scale-105' 
                  : 'text-white border-white/10 opacity-90'}`}
              >
                DEFINE
              </span>
            </div>

            {/* Outer Edges Static Pill: BUILD */}
            <div className="absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 z-30">
              <span className={`font-mona-narrow font-black text-lg md:text-xl lg:text-[22px] tracking-[0.18em] transition-all duration-700 uppercase select-none rounded-full px-8 py-4 border backdrop-blur-md inline-block w-fit bg-black
                ${activePhase === 1 
                  ? 'text-b2b-vivid-orange border-b2b-vivid-orange/40 shadow-[0_0_25px_rgba(255,102,0,0.25)] scale-105' 
                  : 'text-white border-white/10 opacity-90'}`}
              >
                BUILD
              </span>
            </div>

            {/* Outer Edges Static Pill: PILOT */}
            <div className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 z-30">
              <span className={`font-mona-narrow font-black text-lg md:text-xl lg:text-[22px] tracking-[0.18em] transition-all duration-700 uppercase select-none rounded-full px-8 py-4 border backdrop-blur-md inline-block w-fit bg-black
                ${activePhase === 2 
                  ? 'text-b2b-vivid-orange border-b2b-vivid-orange/40 shadow-[0_0_25px_rgba(255,102,0,0.25)] scale-105' 
                  : 'text-white border-white/10 opacity-90'}`}
              >
                PILOT
              </span>
            </div>

            {/* Outer Edges Static Pill: SCALE */}
            <div className="absolute left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 z-30">
              <span className={`font-mona-narrow font-black text-lg md:text-xl lg:text-[22px] tracking-[0.18em] transition-all duration-700 uppercase select-none rounded-full px-8 py-4 border backdrop-blur-md inline-block w-fit bg-black
                ${activePhase === 3 
                  ? 'text-b2b-vivid-orange border-b2b-vivid-orange/40 shadow-[0_0_25px_rgba(255,102,0,0.25)] scale-105' 
                  : 'text-white border-white/10 opacity-90'}`}
              >
                SCALE
              </span>
            </div>

            {/* Rotating Chevron Pointer Ring */}
            <div 
              className="absolute inset-0 rounded-full transition-transform duration-700 ease-out z-20 pointer-events-none"
              style={{ transform: `rotate(${activePhase * 90}deg)` }}
            >
              {/* Chevron indicator pointing to active pill */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
                <svg className="w-5 h-5 text-b2b-vivid-orange drop-shadow-[0_0_12px_#ff6600]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4l-8 8h16z" />
                </svg>
                <span className="w-1.5 h-1.5 bg-b2b-vivid-orange rounded-full mt-1.5 animate-pulse shadow-[0_0_8px_#ff6600]" />
              </div>
            </div>

            {/* Rotational ticks mapped to dial backdrop */}
            <div className="absolute inset-4 rounded-full border border-black/5 z-10 pointer-events-none">
              {[...Array(24)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-black/10 origin-center"
                  style={{ transform: `rotate(${i * 15}deg)` }}
                />
              ))}
            </div>

            {/* Central Glow Core */}
            <div className="relative w-36 h-36 md:w-48 md:h-48 rounded-full border border-white/10 bg-black/85 backdrop-blur-md flex items-center justify-center z-20 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-radial-gradient(circle, rgba(255,102,0,0.05) 0%, transparent 70%) pointer-events-none" />
              
              {/* Massive active watermark index in standard Monospace/Narrow font */}
              <span className="font-mona-narrow font-black text-5xl md:text-7xl text-white tracking-tighter transition-all duration-500 select-none">
                {phases[activePhase].num}
              </span>
            </div>

          </div>
        </div>

        {/* Right Column: Natural Scrolling Widescreen Powdered cards */}
        <div className="w-full flex flex-col items-center lg:items-start lg:pl-16 py-12 lg:py-24 px-6 md:px-12 relative z-10 gap-24 lg:gap-36">
          {phases.map((phase, idx) => {
            const isSelected = activePhase === idx
            const isEven = idx % 2 === 0
            
            // Layout styling classes
            const bulletColorClass = isEven ? 'text-b2b-vivid-orange' : 'text-b2b-crimson'
            const borderGlowClass = isEven 
              ? 'hover:border-b2b-vivid-orange/30 hover:shadow-[0_0_50px_rgba(255,102,0,0.08)]' 
              : 'hover:border-b2b-crimson/30 hover:shadow-[0_0_50px_rgba(188,49,17,0.08)]'
            const lineGradClass = isEven ? 'from-b2b-vivid-orange to-transparent' : 'from-b2b-crimson to-transparent'

            return (
              <div 
                key={phase.num}
                className="phase-section w-full min-h-[80vh] flex items-center justify-center"
              >
                <div 
                  className={`group relative w-full max-w-[640px] lg:max-w-[700px] rounded-[48px] p-12 md:p-16 lg:p-20 border border-white/5 transition-all duration-700 bg-gradient-to-br ${phase.gradient} ${borderGlowClass}
                    ${isSelected ? 'scale-[1.02] border-white/10 shadow-2xl' : 'opacity-35 scale-95'} overflow-hidden`}
                >
                  {/* Dense, uniform film grain textured overlay applied ON TOP of the gradients */}
                  <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.14] dense-film-grain" />

                  {/* Subtle glowing accent line on card bottom */}
                  <div className={`absolute inset-x-0 bottom-0 h-[2.5px] bg-gradient-to-r ${lineGradClass} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10`} />

                  <div className="flex flex-col justify-between h-full gap-10 relative z-10">
                    
                    {/* Top row: Label & category */}
                    <div className="flex justify-between items-center border-b border-white/10 pb-6">
                      <span className="font-mona-narrow font-bold text-white/30 tracking-[0.2em] uppercase text-xs md:text-sm">
                        EXL PROCESS // {phase.label}
                      </span>
                      <span className="font-mona-narrow font-black text-2xl md:text-3xl text-white/60">
                        {phase.num}
                      </span>
                    </div>

                    {/* Middle row: Large heading and copy */}
                    <div className="space-y-6">
                      <h3 className="font-mona-narrow font-black text-4xl md:text-5xl lg:text-[52px] text-white uppercase tracking-tight leading-[1.05] m-0">
                        {phase.title}
                      </h3>
                      <p className="font-mona-narrow text-white/70 text-lg md:text-xl lg:text-2xl leading-relaxed font-light m-0">
                        {phase.desc}
                      </p>
                    </div>

                    {/* Bottom row: SLA checkmarks */}
                    <div className="border-t border-white/10 pt-6 flex items-center gap-3 mt-4">
                      <svg className={`w-5 h-5 ${bulletColorClass} flex-shrink-0`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-mona-narrow font-bold text-xs md:text-sm text-white/40 group-hover:text-white/80 transition-colors duration-500 uppercase tracking-widest">
                        {phase.bullet}
                      </span>
                    </div>

                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
