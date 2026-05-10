'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const CAPABILITIES = [
  {
    number: '01',
    title: 'ADVISE',
    subheadline: 'Strategy and consulting for brands that need senior thinking, not a junior team learning on your budget.',
    description: "Every Advise engagement is led by a founder with international consulting experience across three continents. You're working with the person actually solving your problem, not a slide deck passed down from a partner you met once.",
    services: [
      'Positioning & Brand Architecture',
      'Go-to-Market Strategy',
      'Content & Media Strategy',
      'Fractional CMO & Advisory',
      'Marketing Audits'
    ],
    link: '/services/advise',
    image: '/assets/images/cap-advise.webp'
  },
  {
    number: '02',
    title: 'PRODUCE',
    subheadline: 'In-house video, podcast, and content production from our Dallas studio.',
    description: 'Every frame shot and lit the way a film crew would. Every sound captured the way a record label would. Built inside an AI-accelerated workflow so production speed matches your calendar, not the pace of an agency.',
    services: [
      'Brand Films & Customer Stories',
      'Podcast Production',
      'Photography & Lifestyle',
      'Social-First Video',
      'Creative Direction'
    ],
    link: '/services/produce',
    image: '/assets/images/cap-produce.webp'
  },
  {
    number: '03',
    title: 'BUILD',
    subheadline: 'Projects, launches, and integrated campaigns executed end to end.',
    description: 'The capability for work that has a beginning, a middle, and a measurable end. Brand identity. A product launch. A website tied to a campaign. You don’t become the project manager. We do.',
    services: [
      'Brand Identity Rollout',
      'Website Design & Build',
      'Product & Service Launches',
      'Integrated Marketing Campaigns',
      'Third-Party Vendor Management'
    ],
    link: '/services/build',
    image: '/assets/images/cap-build.png'
  },
  {
    number: '04',
    title: 'GROW',
    subheadline: 'Distribution, channels, and partnerships that turn content into pipeline.',
    description: 'Grow is the engine that makes sure everything we produce actually lands in front of the right buyers, through the right channels, at the right time. This is the engine that converts attention into revenue.',
    services: [
      'Paid Media (LinkedIn, Meta, Google)',
      'Content Repurposing Systems',
      'Email & CRM Automation',
      'Partnership & Channel Programs',
      'Marketing Ops & Pipeline Reporting'
    ],
    link: '/services/grow',
    image: '/assets/images/cap-grow-v3.png'
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
      className="relative bg-[#F5F5F5] py-32 lg:py-48 px-6 lg:px-12 overflow-hidden"
      id="capabilities"
    >
      <div className="max-w-[1300px] mx-auto">
        
        {/* ── SECTION HEADER ───────────────────────────────────────────── */}
        <div className="mb-40 lg:mb-64 flex flex-col items-center text-center">
          <h2 
            style={{
              fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
              fontSize: 'clamp(48px, 10vw, 120px)',
              lineHeight: 1.05,
              color: '#000000',
              textTransform: 'uppercase'
            }}
            className="mb-10"
          >
            Four capabilities.<br />
            One goal.
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
                <div 
                  className="absolute top-8 left-8 lg:top-12 lg:left-12 text-white/20 text-8xl lg:text-[12rem] leading-none select-none"
                  style={{ fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif" }}
                >
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
                      <span className="block font-[var(--font-tusker)] text-black text-[10px] tracking-[0.3em] font-bold uppercase py-1 px-3 border border-black/10 inline-block">
                        SECTION_P0{cap.number}
                      </span>
                      <h3 
                        style={{
                          fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
                          fontSize: 'clamp(44px, 5vw, 70px)',
                          lineHeight: 1.05,
                          color: '#000000',
                          textTransform: 'uppercase'
                        }}
                      >
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

                    {/* CTA Link */}
                    <div className="pt-4">
                      <Link 
                        href={cap.link}
                        className="inline-flex items-center gap-4 text-black font-[var(--font-tusker)] text-lg tracking-[0.1em] uppercase group/link transition-all"
                      >
                        <span className="relative">
                          Explore {cap.title}
                          <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover/link:w-full" />
                        </span>
                        <svg 
                          width="20" height="20" viewBox="0 0 24 24" fill="none" 
                          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                          className="transition-transform duration-300 group-hover/link:translate-x-2"
                        >
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </Link>
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
