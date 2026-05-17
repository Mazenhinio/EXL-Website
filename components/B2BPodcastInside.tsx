'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const phases = [
  {
    phase: 'Phase 01',
    title: 'Strategy & Sourcing',
    bgColor: 'bg-[#fcfcfc]',
    tilt: -2,
    items: [
      {
        subtitle: 'Strategy and show concept',
        desc: "We work with you to define the show's positioning, format, audience, and commercial purpose. The podcast isn't a content project. It's a business asset."
      },
      {
        subtitle: 'Guest pipeline',
        desc: "We build and run the guest pipeline. Sourcing, qualifying, outreach, scheduling, and onboarding. You get a calendar of confirmed guests."
      }
    ]
  },
  {
    phase: 'Phase 02',
    title: 'The Production',
    bgColor: 'bg-[#f5f5f5]',
    tilt: 1.5,
    items: [
      {
        subtitle: 'On-location cinematic production',
        desc: "Every frame shot and lit the way a film crew would. Filmed on location, at your office, the guest's office, or a location we scout. No studios. No Zoom."
      },
      {
        subtitle: 'Post-production',
        desc: "Edit, color, sound, and delivery. Cut for attention, not for length. Turned around on a schedule your marketing calendar can plan against."
      }
    ]
  },
  {
    phase: 'Phase 03',
    title: 'Amplification',
    bgColor: 'bg-[#eeeeee]',
    tilt: -1,
    items: [
      {
        subtitle: 'The full repurposing kit',
        desc: "Every episode produces 10 or more downstream assets: short clips, vertical clips, quote graphics, show notes, a newsletter post, and a guest share kit."
      },
      {
        subtitle: 'Distribution playbook',
        desc: "A buyer-specific distribution plan for every episode, across LinkedIn, YouTube, email, and partner channels. We run the distribution."
      }
    ]
  }
]

export default function B2BPodcastInside() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.stack-card') as HTMLElement[]
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=250%',
          pin: true,
          scrub: 1,
        }
      })

      // Initial state
      gsap.set(cards[0], { y: 0, rotate: 0 })
      gsap.set(cards[1], { y: '120vh', rotate: 10 })
      gsap.set(cards[2], { y: '120vh', rotate: -10 })

      // Animate Card 2 up
      tl.to(cards[1], {
        y: 40,
        rotate: phases[1].tilt,
        duration: 1,
        ease: 'power2.out'
      })

      // Dim Card 1 slightly
      tl.to(cards[0], { scale: 0.98, opacity: 0.6, duration: 0.5 }, '<0.5')

      // Animate Card 3 up
      tl.to(cards[2], {
        y: 80,
        rotate: phases[2].tilt,
        duration: 1,
        ease: 'power2.out'
      })

      // Dim Card 2 slightly
      tl.to(cards[1], { scale: 0.98, opacity: 0.6, duration: 0.5 }, '<0.5')
      
      // Hold at end
      tl.to({}, { duration: 0.5 })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="w-full h-screen bg-[#111111] overflow-hidden flex flex-col justify-center items-center relative">
      
      {/* Combined Left Ambient Gradient Glow */}
      <div className="absolute left-0 top-0 w-1/2 h-full pointer-events-none z-0 select-none overflow-hidden">
        <img 
          src="/assets/images/gradient-left.png" 
          alt="" 
          className="w-full h-full object-cover opacity-65 mix-blend-screen"
        />
      </div>

      {/* Combined Right Ambient Gradient Glow */}
      <div className="absolute right-0 top-0 w-1/2 h-full pointer-events-none z-0 select-none overflow-hidden">
        <img 
          src="/assets/images/gradient-right.png" 
          alt="" 
          className="w-full h-full object-cover opacity-65 mix-blend-screen"
        />
      </div>

      {/* Background Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0" 
        style={{
          backgroundImage: 'repeating-linear-gradient(to right, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 60px)'
        }}
      ></div>

      <div className="absolute top-12 md:top-24 w-full px-6 text-center z-10">
        <span className="font-mona-narrow font-bold text-b2b-vivid-orange tracking-[0.2em] uppercase text-xs md:text-sm mb-4 block">
          {"What's Inside The Service"}
        </span>
        <h2 className="font-mona-narrow font-black text-3xl md:text-5xl lg:text-6xl text-white leading-[1.05] tracking-tight uppercase">
          Everything needed to run a flagship B2B show.
        </h2>
      </div>

      <div className="relative w-full max-w-4xl h-[60vh] mt-24 z-10">
        {phases.map((phase, idx) => (
          <div 
            key={idx}
            className={`stack-card absolute top-0 left-4 right-4 md:left-12 md:right-12 h-full rounded-[32px] p-8 md:p-12 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex flex-col justify-center border border-black/10 origin-bottom ${phase.bgColor}`}
            style={{ zIndex: idx }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex justify-between items-center mb-8 lg:mb-12 pb-6 lg:pb-8 border-b border-black/10">
                <span className="font-mona-narrow font-bold text-b2b-vivid-orange tracking-[0.15em] uppercase text-sm md:text-lg">
                  {phase.phase}
                </span>
                <h3 className="font-mona-narrow font-black text-4xl md:text-6xl lg:text-[72px] text-black uppercase tracking-tight leading-none">
                  {phase.title}
                </h3>
              </div>

              {/* Items */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 flex-grow items-start">
                {phase.items.map((item, i) => (
                  <div key={i} className="flex flex-col">
                    <h4 className="font-mona-narrow font-bold text-2xl md:text-3xl lg:text-4xl text-black mb-4">
                      {item.subtitle}.
                    </h4>
                    <p className="font-mona-narrow text-gray-700 text-xl md:text-2xl leading-[1.6] font-light">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
