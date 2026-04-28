'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function WhatWeDo() {
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

  useEffect(() => {
    const loadGsap = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      // Any additional animations can go here if needed, but sticky handles the pinning.
    }
    loadGsap()
  }, [])

  return (
    <section
      id="what-we-do"
      style={{
        backgroundColor: 'var(--off-white)',
        borderTop: '0.5px solid rgba(0,0,0,0.08)',
        position: 'relative',
        margin: 0,
        padding: 0,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
        }}
        className="wwd-flex-container"
      >
        {/* Left Column — Sticky Text */}
        <div
          className="wwd-left-col"
          style={{
            position: 'sticky',
            top: 0,
            width: '40%',
            height: '100vh',
            padding: '40px 64px 40px 32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            borderRight: '0.5px solid rgba(0,0,0,0.08)',
            backgroundColor: 'var(--off-white)',
            zIndex: 10,
          }}
        >
          <div style={{ maxWidth: '440px' }}>
            <p
              className="section-label"
              style={{
                marginBottom: '24px',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--taupe)',
              }}
            >
              What we do
            </p>
            <h2
              style={{
                fontFamily: "var(--font-cabinet), 'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: 'clamp(28px, 4.5vw, 48px)',
                lineHeight: 1.1,
                color: 'var(--black)',
                marginBottom: '24px',
              }}
            >
              One firm. Four capabilities.<br />
              <strong style={{ fontWeight: 600 }}>No handoffs.</strong>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-cabinet), 'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: '18px',
                lineHeight: 1.65,
                color: 'rgba(0,0,0,0.6)',
              }}
            >
              Most B2B brands juggle a strategy firm, an agency, a dev shop, and
              a freelancer. We built EXL so you don&apos;t have to.
            </p>
          </div>
        </div>

        {/* Right Column — Scrolling Cards */}
        <div
          className="wwd-right-col"
          style={{
            width: '60%',
            position: 'relative',
          }}
        >
          {capabilities.map((cap) => (
            <div
              key={cap.id}
              style={{
                height: '80vh',
                backgroundColor: cap.bg,
                padding: '64px 64px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                borderBottom: '0.5px solid rgba(0,0,0,0.08)',
              }}
            >
              <div style={{ maxWidth: '520px' }}>
                <p
                  style={{
                    fontFamily: "var(--font-cabinet), 'DM Sans', sans-serif",
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'rgba(0,0,0,0.3)',
                    marginBottom: '16px',
                  }}
                >
                  {cap.id}
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
                    fontWeight: 600,
                    fontSize: 'clamp(40px, 8vw, 72px)',
                    lineHeight: 1.05,
                    color: 'var(--black)',
                    marginBottom: '24px',
                  }}
                >
                  {cap.name}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-cabinet), 'DM Sans', sans-serif",
                    fontWeight: 300,
                    fontSize: '20px',
                    lineHeight: 1.55,
                    color: 'rgba(0,0,0,0.7)',
                  }}
                >
                  {cap.body}
                </p>
                <Link
                  href={cap.href}
                  style={{
                    fontFamily: "var(--font-cabinet), 'DM Sans', sans-serif",
                    fontSize: '13px',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--black)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '40px',
                  }}
                >
                  Explore {cap.name} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1023px) {
          .wwd-flex-container {
            flex-direction: column !important;
          }
          .wwd-left-col {
            position: relative !important;
            width: 100% !important;
            height: auto !important;
            padding: 64px 24px !important;
            border-right: none !important;
            border-bottom: 0.5px solid rgba(0,0,0,0.08);
          }
          .wwd-right-col {
            width: 100% !important;
          }
          .wwd-right-col > div {
            height: auto !important;
            min-height: 400px;
            padding: 64px 24px !important;
          }
        }
      `}</style>
    </section>
  )
}
