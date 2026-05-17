'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const pillars = [
  {
    id: '01',
    title: 'CINEMATIC STANDARD',
    highlight: 'ON EVERY EPISODE.',
    body: "This is not a podcast shoot. It's a production. The visuals and sound are built to a media-grade standard from day one. Your show looks like it belongs on a streaming platform, not a vendor intranet.",
    image: '/assets/images/b2b_diff_cinematic.png'
  },
  {
    id: '02',
    title: 'A FLYWHEEL,',
    highlight: "NOT A FEED.",
    body: "Every episode is built to generate weeks of downstream content and, more importantly, new inbound relationships. Guests don't just appear, they become part of your network, your pipeline, and often your buyers.",
    image: '/assets/images/b2b_diff_flywheel.png'
  },
  {
    id: '03',
    title: 'WE USE THIS',
    highlight: 'OURSELVES.',
    body: "Our own show, Best in B2B, is produced on the same engine. We don't sell you a service we don't run. We sell you the one we use.",
    image: '/assets/images/b2b_diff_ourselves.png'
  }
]

export default function B2BPodcastDifferent() {
  const [activePillar, setActivePillar] = useState<number | null>(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (sectionRef.current) {
      gsap.fromTo(sectionRef.current, 
        { opacity: 0 }, 
        { 
          opacity: 1, 
          duration: 1, 
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      )
    }
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative bg-black min-h-screen overflow-hidden py-24 px-6 lg:px-12 flex flex-col"
    >
      {/* Header */}
      <div className="mb-20 flex flex-col items-center z-10 relative">
        <p className="font-mona-narrow font-bold text-b2b-vivid-orange tracking-[0.2em] uppercase text-sm mb-4">
          How This Service Is Different
        </p>
        <div className="w-[0.5px] h-6 bg-white/15 mb-6" />
        <h2 className="font-mona-narrow font-black text-4xl md:text-6xl lg:text-[72px] text-white uppercase max-w-[1000px] tracking-tight leading-[1.05] text-center">
          What separates this from <span className="text-white/40">every other</span> podcast offer on the market.
        </h2>
      </div>

      {/* The Cinematic Aperture Rail */}
      <div className="flex-grow flex flex-col lg:flex-row gap-4 lg:gap-0 h-full lg:h-[70vh] border-y border-white/10 relative z-10">
        {pillars.map((pillar, i) => (
          <div
            key={pillar.id}
            onMouseEnter={() => setActivePillar(i)}
            className={`group relative flex-grow transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden cursor-pointer
              ${activePillar === i ? 'lg:flex-[2.5]' : 'lg:flex-1'}
              border-b lg:border-b-0 lg:border-r border-white/10 last:border-0`}
          >
            {/* BG IMAGE */}
            <div className={`absolute inset-0 transition-all duration-1000 ease-out z-0
              ${activePillar === i ? 'scale-100 opacity-60 grayscale-0' : 'scale-110 opacity-20 grayscale'}`}>
              <Image 
                src={pillar.image} 
                alt={pillar.title} 
                fill 
                className="object-cover"
                priority
              />
            </div>
            
            <div className={`absolute inset-0 bg-black/50 transition-opacity duration-700 ${activePillar === i ? 'opacity-0' : 'opacity-100'}`}></div>

            {/* CONTENT OVERLAY */}
            <div className="relative z-10 p-8 lg:p-12 h-full flex flex-col justify-between">
              {/* Pillar ID */}
              <div className="font-mona-narrow font-black text-xl text-b2b-vivid-orange tracking-[0.15em] opacity-80">
                {pillar.id}
              </div>

              {/* Title Section */}
              <div className="mt-auto pb-4">
                <h3 
                  className={`font-mona-narrow font-black uppercase transition-all duration-700 leading-[1.05] tracking-tight
                  ${activePillar === i ? 'text-4xl md:text-5xl lg:text-6xl text-white' : 'text-2xl md:text-3xl text-white/40'}`}
                >
                  {pillar.title} <br/>
                  <span className={`${activePillar === i ? 'text-b2b-vivid-orange' : 'text-white/20'}`}>
                    {pillar.highlight}
                  </span>
                </h3>

                {/* Body Text (Reveals on Active) */}
                <div className={`mt-8 transition-all duration-700 ease-out overflow-hidden
                  ${activePillar === i ? 'max-h-[500px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 translate-y-4'}`}>
                  <p className="font-mona-narrow text-xl md:text-2xl text-white/80 max-w-[500px] font-light leading-relaxed">
                    {pillar.body}
                  </p>
                  
                  {/* Visual Indicator */}
                  <div className="mt-8 w-12 h-[2px] bg-b2b-vivid-orange" />
                </div>
              </div>
            </div>

            {/* Interactive Corner Accent */}
            <div className={`absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 transition-all duration-700
              ${activePillar === i ? 'border-b2b-vivid-orange rotate-0' : 'border-white/20 rotate-90'}`} />
          </div>
        ))}
      </div>
    </section>
  )
}
