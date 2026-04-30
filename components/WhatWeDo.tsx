'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export default function WhatWeDo() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const [activeCap, setActiveCap] = useState<number | null>(0)

  const capabilities = [
    {
      id: '01',
      name: 'Advise.',
      img: '/assets/images/advise.png',
      body: 'Positioning, brand, and go-to-market strategy from a team that has built businesses across three continents.',
    },
    {
      id: '02',
      name: 'Produce.',
      img: '/assets/images/produce.png',
      body: 'Podcasts, video, and social content shot in-house from our Dallas studio. B2B that looks like media.',
    },
    {
      id: '03',
      name: 'Build.',
      img: '/assets/images/build.png',
      body: 'Projects, launches, and integrated campaigns executed end to end. We scope it, build it, ship it, measure it.',
    },
    {
      id: '04',
      name: 'Grow.',
      img: '/assets/images/grow.png',
      body: "Partnerships, channels, and distribution systems that turn content into pipeline.",
    },
  ]

  useEffect(() => {
    const loadGsap = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (sectionRef.current && headerRef.current) {
        // Reveal the header as we scroll in
        gsap.fromTo(headerRef.current, 
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            }
          }
        )
      }
    }
    loadGsap()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="what-we-do"
      className="relative bg-[var(--off-white)] border-t-[0.5px] border-black/10 py-24 flex flex-col"
    >
      {/* HEADER */}
      <div
        ref={headerRef}
        className="flex flex-col items-center px-12 mb-20 opacity-0"
      >
        <p className="section-label mb-4">What we do</p>
        <div className="w-[0.5px] h-6 bg-black/15 mb-6" />
        <h2 style={{
          fontFamily: 'var(--font-tusker)',
          fontSize: 'clamp(36px, 9vw, 90px)', 
          textAlign: 'center',
          lineHeight: 1.1,
          color: 'var(--black)',
          textTransform: 'uppercase',
          marginBottom: '24px'
        }}>
          One firm. <br />
          <span className="highlight-marker" style={{ marginTop: '8px' }}>Four capabilities.</span>
        </h2>
        <p className="font-[var(--font-cabinet)] text-[clamp(18px,4.5vw,45px)] text-[rgba(0,0,0,0.65)] text-center max-w-[850px] leading-relaxed">
          Most B2B brands juggle a <span className="font-medium text-black">strategy firm</span>, an <span className="font-medium text-black">agency</span>, a <span className="font-medium text-black">dev shop</span>, and a <span className="font-medium text-black">freelancer</span>. We built <span className="font-medium text-black">EXL</span> so you don&apos;t have to.
        </p>
      </div>

      {/* VERTICAL STACKED ITEMS */}
      <div className="w-full flex flex-col border-t border-black/10">
        {capabilities.map((cap, i) => (
          <div
            key={cap.id}
            onMouseEnter={() => setActiveCap(i)}
            className={`group relative w-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden cursor-pointer
              ${activeCap === i ? 'h-[45vh]' : 'h-[100px]'}
              border-b border-black/10 last:border-0`}
          >
            {/* Background Image (Reveals on Hover) */}
            <div className={`absolute inset-0 transition-all duration-1000 ease-out z-0
              ${activeCap === i ? 'opacity-30 scale-100 grayscale-0' : 'opacity-0 scale-110 grayscale'}`}>
              <Image 
                src={cap.img} 
                alt={cap.name} 
                fill 
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--off-white)] via-transparent to-transparent z-10" />
            </div>

            {/* Content Row */}
            <div className="relative z-20 h-full w-full flex items-center px-8 lg:px-20">
              {/* Index */}
              <div className={`font-[var(--font-tusker)] text-[11px] font-medium tracking-widest transition-colors duration-500 mr-12
                ${activeCap === i ? 'text-[var(--mystic-red)]' : 'text-black/30'}`}>
                {cap.id}
              </div>

              {/* Title & Body Wrapper */}
              <div className="flex flex-col lg:flex-row lg:items-center flex-grow">
                <h3 
                  style={{ fontFamily: 'var(--font-tusker)' }}
                  className={`uppercase transition-all duration-500 leading-none mr-12
                  ${activeCap === i ? 'text-[clamp(32px,5vw,72px)] text-[var(--black)]' : 'text-[clamp(24px,3vw,32px)] text-black/40'}`}
                >
                  {cap.name}
                </h3>

                {/* Body Text */}
                <div className={`transition-all duration-700 ease-out overflow-hidden
                  ${activeCap === i ? 'max-h-[200px] opacity-100 translate-x-0' : 'max-h-0 lg:max-h-none opacity-0 lg:-translate-x-4'}`}>
                  <p className="font-[var(--font-cabinet)] text-[clamp(16px,1.2vw,20px)] text-black/60 max-w-[600px] font-light leading-snug">
                    {cap.body}
                  </p>
                </div>
              </div>

              {/* Arrow Indicator */}
              <div className={`hidden lg:block transition-all duration-500
                ${activeCap === i ? 'translate-x-0 opacity-100 scale-125' : '-translate-x-4 opacity-0 scale-50'}`}>
                <div className="w-12 h-[1px] bg-black/20" />
              </div>
            </div>

            {/* Accent Line */}
            <div className={`absolute left-0 bottom-0 h-[2px] bg-[var(--chartreuse)] transition-all duration-700
              ${activeCap === i ? 'w-full' : 'w-0'}`} />
          </div>
        ))}
      </div>

      <style jsx>{`
        #what-we-do {
          min-height: auto;
        }
      `}</style>
    </section>
  )
}
