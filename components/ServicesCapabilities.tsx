'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const CAPABILITIES = [
  {
    number: '01',
    title: 'ADVISE',
    subheadline: 'Consulting-grade strategy and AI-native thinking.',
    description: 'We solve for growth by aligning high-level strategy with the technical ability to actually ship the work.',
    services: ['GTM Strategy', 'AI Implementation', 'Commercial Ops'],
    image: '/assets/images/cap-advise.webp'
  },
  {
    number: '02',
    title: 'PRODUCE',
    subheadline: 'Cinematic storytelling for brands that refuse to blend in.',
    description: 'Technical production and high-end creative execution that bridges the gap between vision and reality.',
    services: ['Film & Video', 'Podcast Production', 'Design & 3D'],
    image: '/assets/images/cap-produce.webp'
  },
  {
    number: '03',
    title: 'BUILD',
    subheadline: 'Architecting high-performance digital products.',
    description: 'Developing digital infrastructure and creative assets that aren’t just beautiful—they convert.',
    services: ['Web & Product', 'Content Engines', 'Tech Integration'],
    image: '/assets/images/cap-build.webp'
  },
  {
    number: '04',
    title: 'GROW',
    subheadline: 'Scaling results through integrated marketing management.',
    description: 'Precision media and growth operations designed to maximize impact across every touchpoint.',
    services: ['Media Management', 'Growth Ops', 'IMM'],
    image: '/assets/images/cap-grow.webp'
  }
]

export default function ServicesCapabilities() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray('.cap-row') as HTMLElement[]
      rows.forEach((row) => {
        // Horizontal Blade Reveal
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 75%',
          }
        })

        // 1. Image Entrance
        tl.fromTo(row.querySelector('.perspective-el-img'),
          { opacity: 0, x: -30, scale: 1.05 },
          { opacity: 1, x: 0, scale: 1, duration: 1.2, ease: 'power3.out' }
        )

        // 2. The Blade Sweep (The chartreuse scanner line)
        tl.fromTo(row.querySelector('.blade-scanner'),
          { left: '-10%', opacity: 0 },
          { left: '110%', opacity: 1, duration: 1, ease: 'power2.inOut' },
          '-=0.8'
        )

        // 3. The Content Reveal (Synchronized with blade)
        tl.fromTo(row.querySelector('.parallax-layer'),
          { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
          { clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 1, ease: 'power2.inOut' },
          '<'
        )
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={containerRef}
      className="bg-[#F5F5F5] py-32 lg:py-48 px-6 lg:px-12 overflow-hidden"
      id="capabilities"
    >
      <div className="max-w-[1300px] mx-auto">
        
        {/* ── SECTION HEADER ───────────────────────────────────────────── */}
        <div className="mb-40 lg:mb-64 flex flex-col items-center text-center">
          <h2 className="font-[var(--font-tusker)] text-[clamp(48px,10vw,120px)] leading-[0.9] text-black uppercase mb-10">
            Four capabilities.<br />
            <span className="text-[var(--chartreuse)]" style={{ WebkitTextStroke: '2.5px black' }}>One goal.</span>
          </h2>
          <p className="font-[var(--font-cabinet)] text-black text-[clamp(20px,2.5vw,32px)] max-w-3xl leading-tight font-light">
            We solve for growth by aligning high-level strategy with the technical ability to actually ship the work.
          </p>
        </div>

        {/* ── CAPABILITIES COLLAGE ─────────────────────────────────────────── */}
        <div className="space-y-64 lg:space-y-[35vh]">
          {CAPABILITIES.map((cap, i) => (
            <div 
              key={cap.title} 
              className={`cap-row relative flex flex-col items-center ${i % 2 !== 0 ? 'lg:items-end' : 'lg:items-start'}`}
            >
              {/* 1. Main Image Layer */}
              <div className="perspective-el-img relative w-full lg:w-[75%] aspect-[16/10] bg-black/5 shadow-2xl overflow-hidden">
                <Image
                  src={cap.image}
                  alt={cap.title}
                  fill
                  className="object-cover grayscale"
                />
                <div className="absolute inset-0 bg-black/5" />
                
                {/* Floating Number Tag */}
                <div className="absolute top-8 left-8 lg:top-12 lg:left-12 font-[var(--font-tusker)] text-white/20 text-8xl lg:text-[12rem] leading-none select-none">
                  {cap.number}
                </div>
              </div>

              {/* 2. Overlapping Content Box (Parallax/Reveal Layer) */}
              <div className="relative z-10 w-[90%] lg:w-[45%] -mt-20 lg:-mt-32 lg:mx-20 overflow-visible">
                {/* The Blade Scanner Line */}
                <div className="blade-scanner absolute inset-y-0 w-[2px] bg-[var(--chartreuse)] shadow-[0_0_15px_var(--chartreuse)] z-30 pointer-events-none" />

                <div className="parallax-layer bg-white p-8 lg:p-16 shadow-[30px_30px_80px_rgba(0,0,0,0.08)]">
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <span className="block font-mono text-black text-[10px] tracking-[0.3em] font-bold uppercase py-1 px-3 border border-black/10 inline-block">
                        SECTION_P0{cap.number}
                      </span>
                      <h3 className="font-[var(--font-tusker)] text-[clamp(44px,5vw,70px)] leading-none text-black uppercase">
                        {cap.title}
                      </h3>
                      <p className="font-[var(--font-cabinet)] text-black text-xl lg:text-2xl font-medium leading-tight italic">
                        &quot;{cap.subheadline}&quot;
                      </p>
                    </div>

                    <p className="font-[var(--font-cabinet)] text-black/70 text-lg leading-relaxed">
                      {cap.description}
                    </p>

                    {/* Services List */}
                    <div className="pt-8 flex flex-wrap gap-x-10 gap-y-5 border-t border-black/5">
                      {cap.services.map((service) => (
                        <div key={service} className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[var(--chartreuse)]" />
                          <span className="font-[var(--font-tusker)] text-xs tracking-[0.15em] uppercase text-black/60">
                            {service}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
