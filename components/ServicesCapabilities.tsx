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
    subheadline: 'Strategy and consulting for brands that need senior thinking.',
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
    image: '/assets/images/cap-build.webp'
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
    image: '/assets/images/cap-grow-v3.webp'
  }
]

export default function ServicesCapabilities() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('.cap-section') as HTMLElement[]

      sections.forEach((section, sectionIdx) => {
        const leftSide = section.querySelector('.cap-left')
        const rightSide = section.querySelector('.cap-right')
        const image = section.querySelector('.cap-image-inner')
        const card = section.querySelector('.cap-content-wrap') as HTMLElement
        const pills = section.querySelectorAll('.magnetic-pill') as NodeListOf<HTMLElement>
        const content = section.querySelector('.cap-content-wrap')
        const number = section.querySelector('.cap-number')

        const isEven = sectionIdx % 2 === 0

        // ── ENTRANCE REVEAL ──
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        })

        if (isEven) {
          tl.fromTo(leftSide, 
            { clipPath: 'inset(0 0 0 100%)' },
            { clipPath: 'inset(0 0% 0 0%)', duration: 1.2, ease: 'power4.inOut' }
          )
          .fromTo(rightSide,
            { clipPath: 'inset(0 100% 0 0%)' },
            { clipPath: 'inset(0 0% 0 0%)', duration: 1.2, ease: 'power4.inOut' },
            '<'
          )
        } else {
          tl.fromTo(rightSide, 
            { clipPath: 'inset(0 100% 0 0%)' },
            { clipPath: 'inset(0 0% 0 0%)', duration: 1.2, ease: 'power4.inOut' }
          )
          .fromTo(leftSide,
            { clipPath: 'inset(0 0 0 100%)' },
            { clipPath: 'inset(0 0% 0 0%)', duration: 1.2, ease: 'power4.inOut' },
            '<'
          )
        }

        tl.fromTo([content, number],
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out' },
          '-=0.8'
        )

        // ── MAGNETIC SCHOOL INTERACTION ──
        if (card) {
          card.addEventListener('mousemove', (e: MouseEvent) => {
            const rect = card.getBoundingClientRect()
            const mouseX = e.clientX - rect.left
            const mouseY = e.clientY - rect.top

            pills.forEach((pill) => {
              const pillRect = pill.getBoundingClientRect()
              const pillCenterX = pillRect.left - rect.left + pillRect.width / 2
              const pillCenterY = pillRect.top - rect.top + pillRect.height / 2

              const dx = mouseX - pillCenterX
              const dy = mouseY - pillCenterY
              const distance = Math.sqrt(dx * dx + dy * dy)
              
              // Max drift distance
              const driftX = (dx / distance) * 15
              const driftY = (dy / distance) * 15

              gsap.to(pill, {
                x: driftX,
                y: driftY,
                duration: 0.6,
                ease: 'power2.out'
              })
            })
          })

          card.addEventListener('mouseleave', () => {
            pills.forEach((pill) => {
              gsap.to(pill, {
                x: 0,
                y: 0,
                duration: 0.8,
                ease: 'elastic.out(1, 0.5)'
              })
            })
          })
        }

        // Parallax
        gsap.to(image, {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative bg-neutral-50 overflow-hidden"
      id="capabilities"
    >
      {/* ── SECTION HEADER ───────────────────────────────────────────── */}
      <div className="py-32 lg:py-48 px-6 lg:px-12 flex flex-col items-center text-center bg-white border-b border-black/5">
        <div className="max-w-[1300px] mx-auto flex flex-col items-center">
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
            <span className="text-[#ff5500]">Four</span> capabilities.<br />
            <span className="text-[var(--chartreuse)]">One</span> goal.
          </h2>
          <p className="font-[var(--font-cabinet)] text-black text-[clamp(20px,2.5vw,32px)] max-w-3xl leading-tight font-light text-center">
            We solve for growth by aligning high-level strategy with the technical ability to actually ship the work.
          </p>
        </div>
      </div>

      {/* ── FULL WIDTH CAPABILITIES ───────────────────────────────────── */}
      <div className="w-full space-y-12 lg:space-y-0">
        {CAPABILITIES.map((cap, i) => (
          <div 
            key={cap.title} 
            className={`cap-section relative flex flex-col lg:flex-row w-full min-h-[80vh] ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''} py-12 lg:py-0`}
          >
            {/* Left/Image Side */}
            <div className="cap-left relative w-full lg:w-1/2 min-h-[50vh] lg:min-h-0 lg:h-auto overflow-hidden">
              <div className="cap-image-inner absolute inset-0 -top-[10%] h-[120%]">
                <Image
                  src={cap.image}
                  alt={cap.title}
                  fill
                  className="object-cover transition-all duration-1000 opacity-80"
                />
              </div>
              <div className="absolute top-12 left-12 lg:top-20 lg:left-20 pointer-events-none">
                <span 
                  className="cap-number block text-white/30 text-8xl lg:text-[15rem] leading-none select-none"
                  style={{ fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif" }}
                >
                  {cap.number}
                </span>
              </div>
            </div>

            {/* Right/Content Side (The Card) */}
            <div className="cap-right w-full lg:w-1/2 flex flex-col justify-center p-6 lg:p-8 xl:p-10">
              <div className="cap-content-wrap bg-white rounded-[2.5rem] p-8 lg:p-16 xl:p-20 shadow-[0_30px_100px_rgba(0,0,0,0.06)] border border-black/5 w-full lg:w-[96%] mx-auto lg:mx-0">
                <div className="space-y-12">
                  <div className="space-y-6">
                    <span className="inline-block font-[var(--font-tusker)] text-black text-[12px] tracking-[0.4em] font-bold uppercase py-2 px-4 border border-black/10 rounded-full">
                      Capability 0{cap.number}
                    </span>
                    <h3 
                      style={{
                        fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
                        fontSize: 'clamp(44px, 5vw, 80px)',
                        lineHeight: 1,
                        color: '#000000',
                        textTransform: 'uppercase'
                      }}
                    >
                      {cap.title}
                    </h3>
                    <p className="font-[var(--font-cabinet)] text-black text-2xl lg:text-3xl font-medium leading-tight italic">
                      &quot;{cap.subheadline}&quot;
                    </p>
                  </div>

                  <p className="font-[var(--font-cabinet)] text-black/70 text-lg lg:text-xl leading-relaxed">
                    {cap.description}
                  </p>

                  {/* Services List (Magnetic School) */}
                  <div className="flex flex-wrap gap-3 pt-12 border-t border-black/5">
                    {cap.services.map((service) => (
                      <div 
                        key={service} 
                        className="magnetic-pill group relative cursor-default"
                      >
                        <div className="px-5 py-2.5 rounded-full border border-black/10 bg-neutral-50 text-black/80 font-[var(--font-tusker)] text-[12px] tracking-[0.15em] uppercase transition-all duration-300 group-hover:bg-[var(--chartreuse)] group-hover:text-black group-hover:border-[var(--chartreuse)] group-hover:scale-110 group-hover:shadow-xl group-hover:z-10">
                          {service}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA Link */}
                  <div className="pt-8">
                    <Link 
                      href={cap.link}
                      className="inline-flex items-center gap-6 bg-black text-white px-10 py-5 rounded-full font-[var(--font-tusker)] text-lg tracking-[0.2em] uppercase hover:bg-[var(--chartreuse)] hover:text-black transition-all duration-300"
                    >
                      Explore {cap.title}
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
    </section>
  )
}
