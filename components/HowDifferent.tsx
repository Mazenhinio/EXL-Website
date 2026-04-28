'use client'

import { useEffect, useRef } from 'react'

const pillars = [
  {
    title: 'Senior strategy, not junior execution.',
    body: 'Every engagement is led by a founder with international consulting experience across three continents. You get the senior thinking the big firms charge for, without the layers between you and the person actually solving your problem.',
  },
  {
    title: 'AI-native, so your timeline isn\'t a problem.',
    body: 'We built our production and content stack on AI from day one. A lean Dallas team ships in weeks what traditional agencies ship in quarters. You move at the pace of your market, not the pace of your agency.',
  },
  {
    title: 'Engineered for impact, top to bottom.',
    body: 'Every decision, from the strategy brief to the lens choice on the shoot, runs through one filter: will this move the number? We build marketing that\'s accountable from planning through delivery, and we own the outcome end to end.',
  },
]

export default function HowDifferent() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadGsap = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.querySelectorAll('.reveal-el'),
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: 'power2.out',
            stagger: 0.12,
            scrollTrigger: { trigger: headerRef.current, start: 'top 80%' },
          }
        )
      }

      if (sectionRef.current) {
        gsap.fromTo(
          sectionRef.current.querySelectorAll('.pillar-card'),
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: 'power2.out',
            stagger: 0.12,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          }
        )
      }
    }
    loadGsap()
  }, [])

  return (
    <section
      id="how-different"
      ref={sectionRef}
      style={{
        backgroundColor: 'var(--off-white)',
        borderTop: '0.5px solid rgba(0,0,0,0.08)',
      }}
    >
      {/* Header */}
      <div
        ref={headerRef}
        style={{
          padding: '64px 32px 48px',
          borderBottom: '0.5px solid rgba(0,0,0,0.08)',
        }}
      >
        <p className="section-label reveal-el" style={{ marginBottom: '16px' }}>
          Why clients pick EXL
        </p>
        <h2
          className="reveal-el"
          style={{
            fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
            fontWeight: 600,
            fontSize: 'clamp(24px, 4vw, 44px)',
            lineHeight: 1.25,
            color: 'var(--black)',
            maxWidth: '640px',
          }}
        >
          Why clients pick EXL{' '}
          <strong style={{ fontWeight: 600 }}>over the alternatives.</strong>
        </h2>
      </div>

      {/* Pillars */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          borderBottom: '0.5px solid rgba(0,0,0,0.08)',
        }}
        className="pillars-grid"
      >
        {pillars.map((p, i) => (
          <div
            key={i}
            className="pillar-card"
            style={{
              borderRight: i < 2 ? '0.5px solid rgba(0,0,0,0.08)' : 'none',
              opacity: 0,
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-cabinet), 'DM Sans', sans-serif",
                fontWeight: 700,
                fontSize: '20px',
                lineHeight: 1.35,
                color: 'var(--black)',
                marginBottom: '16px',
              }}
            >
              {p.title}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-cabinet), 'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: '18px',
                lineHeight: 1.7,
                color: 'rgba(0,0,0,0.65)',
              }}
            >
              {p.body}
            </p>
          </div>
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 767px) {
          section > div:first-child {
            padding: 48px 20px 36px !important;
          }
          .pillars-grid {
            grid-template-columns: 1fr !important;
          }
          .pillar-card {
            border-right: none !important;
            border-bottom: 0.5px solid rgba(0, 0, 0, 0.08);
          }
        }
      `}</style>
    </section>
  )
}
