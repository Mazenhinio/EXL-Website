'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function WhatWeDo() {
  const textRef = useRef<HTMLDivElement>(null)
  const brandRef = useRef<HTMLSpanElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadGsap = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      // Text panel reveal
      if (textRef.current) {
        gsap.fromTo(
          textRef.current.querySelectorAll('.reveal-el'),
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: 'power2.out',
            stagger: 0.12,
            scrollTrigger: { trigger: textRef.current, start: 'top 80%' },
          }
        )
      }

      // Brand wipe "No handoffs."
      if (brandRef.current) {
        gsap.fromTo(
          brandRef.current,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.0,
            ease: 'power4.out',
            scrollTrigger: { trigger: brandRef.current, start: 'top 25%' },
          }
        )
      }

      // Capability cards stagger
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.querySelectorAll('.cap-card'),
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: 'power2.out',
            stagger: 0.11,
            scrollTrigger: { trigger: cardsRef.current, start: 'top 10%' },
          }
        )
      }
    }
    loadGsap()
  }, [])

  const capabilities = [
    {
      id: '01',
      name: 'Advise.',
      bg: 'var(--nyanza)',
      href: '/services/advise',
      body: 'Positioning, brand, and go-to-market strategy from a team that has built businesses across three continents. We sit in the room before we pick up a camera.',
    },
    {
      id: '02',
      name: 'Produce.',
      bg: 'var(--sky)',
      href: '/services/produce',
      body: 'Podcasts, video, and social content shot in-house from our Dallas studio. Every frame shot and lit the way a film crew would. Every sound captured the way a record label would. B2B that looks like media.',
    },
    {
      id: '03',
      name: 'Build.',
      bg: 'var(--pale-silver)',
      href: '/services/build',
      body: 'Projects, launches, and integrated campaigns executed end to end. A new brand identity. A product launch. A website tied to a campaign moment. We scope it, build it, ship it, measure it.',
    },
    {
      id: '04',
      name: 'Grow.',
      bg: 'var(--chartreuse)',
      href: '/services/grow',
      body: "Partnerships, channels, and distribution systems that turn content into pipeline. Because strategy and production don't matter if no one sees the work.",
    },
  ]

  return (
    <>
      {/* 3a — Editorial Panel */}
      <section
        id="what-we-do"
        style={{
          backgroundColor: 'var(--off-white)',
          borderTop: '0.5px solid rgba(0,0,0,0.08)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '28% 57% 15%',
            minHeight: '560px',
          }}
          className="editorial-grid"
        >
          {/* Col 1 — Text */}
          <div
            ref={textRef}
            style={{
              padding: '64px 40px 64px 32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              borderRight: '0.5px solid rgba(0,0,0,0.08)',
            }}
          >
            <p className="section-label reveal-el" style={{ marginBottom: '24px' }}>
              What we do
            </p>
            <h2
              className="reveal-el"
              style={{
                fontFamily: "var(--font-cabinet), 'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: 'clamp(24px, 4vw, 40px)',
                lineHeight: 1.25,
                color: 'var(--black)',
                marginBottom: '20px',
              }}
            >
              One firm. Four capabilities.{' '}
              <strong style={{ fontWeight: 600 }}>No handoffs.</strong>
            </h2>
            <p
              className="reveal-el"
              style={{
                fontFamily: "var(--font-cabinet), 'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: '18px',
                lineHeight: 1.7,
                color: 'rgba(0,0,0,0.65)',
              }}
            >
              Most B2B brands juggle a strategy firm, an agency, a dev shop, and
              a freelancer. We built EXL so you don&apos;t have to.
            </p>
          </div>

          {/* Col 2 — Image */}
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <Image
              src="/assets/images/what-we-do.jpg"
              alt="EXL strategy and production"
              fill
              style={{ objectFit: 'cover' }}
              sizes="57vw"
            />
            {/* Bottom gradient */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '50%',
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)',
                zIndex: 1,
              }}
            />
            {/* Brand moment */}
            <span
              ref={brandRef}
              style={{
                position: 'absolute',
                bottom: '36px',
                left: '32px',
                fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
                fontWeight: 600,
                fontSize: 'clamp(32px, 9vw, 68px)',
                color: 'var(--chartreuse)',
                zIndex: 2,
                clipPath: 'inset(0 100% 0 0)',
                lineHeight: 1.4,
                padding: '10px 0',
              }}
            >
              No handoffs.
            </span>
          </div>

          {/* Col 3 — Section number */}
          <div
            className="section-col"
            style={{
              borderLeft: '0.5px solid rgba(0,0,0,0.08)',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'flex-end',
              padding: '24px 16px',
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-cabinet), 'DM Sans', sans-serif",
                fontSize: '9px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--taupe)',
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
              }}
            >
              02 — What we do
            </span>
          </div>
        </div>
      </section>

      {/* 3b — Capabilities Grid */}
      <section
        id="capabilities"
        style={{
          backgroundColor: 'var(--off-white)',
          borderTop: '0.5px solid rgba(0,0,0,0.08)',
        }}
      >
        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
          }}
          className="cap-grid"
        >
          {capabilities.map((cap) => (
            <div
              key={cap.id}
              className="cap-card"
              style={{
                backgroundColor: cap.bg,
                minHeight: '310px',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRight: '0.5px solid rgba(0,0,0,0.08)',
                opacity: 0,
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-cabinet), 'DM Sans', sans-serif",
                    fontSize: '9px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    color: 'rgba(0,0,0,0.45)',
                    marginBottom: '16px',
                  }}
                >
                  {cap.id}
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
                    fontWeight: 600,
                    fontSize: 'clamp(32px, 5vw, 56px)',
                    lineHeight: 1.25,
                    color: 'var(--black)',
                    marginBottom: '20px',
                  }}
                >
                  {cap.name}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-cabinet), 'DM Sans', sans-serif",
                    fontWeight: 300,
                    fontSize: '17px',
                    lineHeight: 1.65,
                    color: 'rgba(0,0,0,0.7)',
                  }}
                >
                  {cap.body}
                </p>
              </div>
              <Link
                href={cap.href}
                style={{
                  fontFamily: "var(--font-cabinet), 'DM Sans', sans-serif",
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--black)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginTop: '24px',
                }}
              >
                Explore →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 1023px) {
          .editorial-grid {
            grid-template-columns: 1fr !important;
          }
          .section-col {
            display: none !important;
          }
        }
        @media (max-width: 767px) {
          .cap-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </>
  )
}
