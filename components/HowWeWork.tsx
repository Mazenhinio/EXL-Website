'use client'

import { useEffect, useRef } from 'react'

export default function HowWeWork() {
  const headerRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

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

      if (stepsRef.current) {
        gsap.fromTo(
          stepsRef.current.querySelectorAll('.step-card'),
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: 'power2.out',
            stagger: 0.12,
            scrollTrigger: { trigger: stepsRef.current, start: 'top 80%' },
          }
        )
      }
    }
    loadGsap()
  }, [])

  const steps = [
    {
      num: '1',
      title: 'Step 1 — Discover.',
      desc: 'We dig into your market, your buyer, and your brand. Not a workshop. A real audit.',
    },
    {
      num: '2',
      title: 'Step 2 — Strategize.',
      desc: 'We ship a positioning, content, and distribution plan you can actually execute.',
    },
    {
      num: '3',
      title: 'Step 3 — Produce and manage.',
      desc: 'Our Dallas team films, edits, writes, designs, and builds in-house. For anything we don\'t do under our roof, we manage the vendors, the timelines, and the quality so you don\'t have to.',
    },
    {
      num: '4',
      title: 'Step 4 — Distribute.',
      desc: 'We deploy across paid, earned, and owned channels, then measure what moved pipeline.',
    },
  ]

  return (
    <section
      id="how-we-work"
      style={{
        backgroundColor: 'var(--pale-silver)',
        borderTop: '0.5px solid rgba(0,0,0,0.08)',
      }}
    >
      <div
        ref={headerRef}
        style={{
          padding: '64px 32px 48px',
          borderBottom: '0.5px solid rgba(0,0,0,0.08)',
        }}
      >
        <p className="section-label reveal-el" style={{ marginBottom: '16px' }}>
          How we work
        </p>
        <h2
          className="reveal-el"
          style={{
            fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
            fontWeight: 600,
            fontSize: 'clamp(24px, 4vw, 44px)',
            lineHeight: 1.25,
            color: 'var(--black)',
          }}
        >
          Four steps. <strong style={{ fontWeight: 600 }}>No theater.</strong>
        </h2>
      </div>

      <div
        ref={stepsRef}
        className="steps-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
        }}
      >
        {steps.map((step, i) => (
          <div
            key={i}
            className="step-card"
            style={{
              padding: '40px 32px',
              borderRight: i < 3 ? '0.5px solid rgba(0,0,0,0.08)' : 'none',
              opacity: 0,
              position: 'relative',
              minHeight: '280px',
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
                fontSize: '64px',
                color: 'rgba(0,0,0,0.10)',
                lineHeight: 1,
                position: 'absolute',
                top: '32px',
                right: '32px',
              }}
            >
              {step.num}
            </span>
            <div style={{ position: 'relative', zIndex: 1, marginTop: '24px' }}>
              <h3
                style={{
                  fontFamily: "var(--font-cabinet), 'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: '20px',
                  color: 'var(--black)',
                  marginBottom: '16px',
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-cabinet), 'DM Sans', sans-serif",
                  fontWeight: 300,
                  fontSize: '18px',
                  lineHeight: 1.65,
                  color: 'rgba(0,0,0,0.7)',
                }}
              >
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 1023px) {
          .steps-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .step-card {
            border-bottom: 0.5px solid rgba(0,0,0,0.08);
          }
          .step-card:nth-child(even) {
            border-right: none !important;
          }
        }
        @media (max-width: 767px) {
          section > div:first-child {
            padding: 48px 20px 36px !important;
          }
          .step-card {
            padding: 32px 20px !important;
          }
        }
      `}</style>
    </section>
  )
}
