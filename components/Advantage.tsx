'use client'

import { useEffect, useRef } from 'react'

export default function Advantage() {
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadGsap = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (leftRef.current) {
        gsap.fromTo(
          leftRef.current.querySelectorAll('.reveal-el'),
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: 'power2.out',
            stagger: 0.12,
            scrollTrigger: { trigger: leftRef.current, start: 'top 80%' },
          }
        )
      }

      if (rightRef.current) {
        gsap.fromTo(
          rightRef.current.querySelectorAll('.stat-item'),
          { opacity: 0, x: 30, filter: 'blur(4px)' },
          {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.2,
            scrollTrigger: { 
              trigger: rightRef.current, 
              start: 'top 75%',
              toggleActions: 'play none none none' 
            },
          }
        )
      }
    }
    loadGsap()
  }, [])

  const bullets = [
    'Weeks, not quarters, from brief to first delivery.',
    'Senior judgment on every decision, with machines doing the lift underneath.',
    'Production and distribution systems that scale with your growth, not your headcount.',
  ]

  return (
    <section
      id="advantage"
      style={{
        backgroundColor: 'var(--eerie)',
        padding: '100px 32px',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '88px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
        className="advantage-grid"
      >
        {/* Left col */}
        <div ref={leftRef}>
          <p className="section-label reveal-el" style={{ color: 'var(--taupe)', marginBottom: '24px' }}>
            The EXL Advantage
          </p>
          <h2
            className="reveal-el"
            style={{
              fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
              fontWeight: 600,
              fontSize: 'clamp(24px, 4vw, 44px)',
              lineHeight: 1.25,
              color: '#ffffff',
              marginBottom: '28px',
            }}
          >
            A traditional consultancy with an{' '}
            <strong style={{ fontWeight: 600, color: 'var(--chartreuse)' }}>
              AI-native
            </strong>{' '}
            engine underneath.
          </h2>
          <p
            className="reveal-el"
            style={{
              fontFamily: "var(--font-cabinet), 'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: '18px',
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            Every EXL deliverable runs through an AI-accelerated workflow. Not
            to replace the work, to compress the timeline. We build and maintain
            internal automation systems that handle research, transcription,
            editing assistance, content repurposing, CRM sync, and distribution,
            so our senior team spends their hours on strategy and craft, not on
            tasks a machine can do better.
          </p>
        </div>

        {/* Right col */}
        <div
          ref={rightRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-cabinet), 'DM Sans', sans-serif",
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: '28px',
            }}
          >
            What this means for you:
          </p>
          {bullets.map((b, i) => (
            <div
              key={i}
              className="stat-item"
              style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start',
                marginBottom: '24px',
                opacity: 0,
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--chartreuse)',
                  flexShrink: 0,
                  marginTop: '7px',
                }}
              />
              <p
                style={{
                  fontFamily: "var(--font-cabinet), 'DM Sans', sans-serif",
                  fontWeight: 300,
                  fontSize: '18px',
                  lineHeight: 1.65,
                  color: 'rgba(255,255,255,0.75)',
                }}
              >
                {b}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 767px) {
          section {
            padding: 64px 20px !important;
          }
          .advantage-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  )
}
