'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function BestInB2B() {
  const textRef = useRef<HTMLDivElement>(null)
  const brandRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const loadGsap = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

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
    }
    loadGsap()
  }, [])

  return (
    <section id="best-in-b2b" style={{ borderTop: '0.5px solid rgba(0,0,0,0.08)' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '28% 57% 15%',
          minHeight: '600px',
        }}
        className="editorial-grid"
      >
        {/* Col 1 — Text */}
        <div
          ref={textRef}
          className="text-panel"
          style={{
            backgroundColor: 'var(--lavender)',
            padding: '64px 40px 64px 32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            borderRight: '0.5px solid rgba(0,0,0,0.08)',
          }}
        >
          <p className="section-label reveal-el" style={{ marginBottom: '24px' }}>
            Owned Media
          </p>
          <h2
            className="reveal-el"
            style={{
              fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
              fontWeight: 600,
              fontSize: 'clamp(24px, 4vw, 40px)',
              lineHeight: 1.25,
              color: 'var(--black)',
              marginBottom: '20px',
            }}
          >
            Our most visible build:{' '}
            <strong style={{ fontWeight: 600 }}>Best in B2B.</strong>
          </h2>
          <p
            className="reveal-el"
            style={{
              fontFamily: "var(--font-cabinet), 'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: '18px',
              lineHeight: 1.7,
              color: 'rgba(0,0,0,0.65)',
              marginBottom: '32px',
            }}
          >
            Best in B2B is our own video podcast, filmed on location across
            Dallas-Fort Worth. Framework-driven conversations with the operators
            shaping the market. Everything we build for our clients, we built
            here first.
          </p>
          <div className="reveal-el">
            <Link
              href="https://b2b.media"
              target="_blank"
              rel="noopener noreferrer"
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
              }}
            >
              Visit b2b.media →
            </Link>
          </div>
        </div>

        {/* Col 2 — Image */}
        <div className="image-panel" style={{ position: 'relative', overflow: 'hidden' }}>
          <Image
            src="/assets/images/best-in-b2b.jpg"
            alt="Dallas on-location production setup"
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
              lineHeight: 1,
            }}
          >
            Best in B2B.
          </span>
        </div>

        {/* Col 3 — Section number */}
        <div
          className="section-col"
          style={{
            backgroundColor: 'var(--lavender)',
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
            03 — Owned Media
          </span>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1023px) {
          .editorial-grid {
            grid-template-columns: 1fr !important;
            display: flex !important;
            flex-direction: column !important;
          }
          .section-col {
            display: none !important;
          }
          .text-panel {
            order: 1;
            border-right: none !important;
            padding: 48px 20px !important;
          }
          .image-panel {
            order: 2;
            min-height: 60vw;
          }
        }
      `}</style>
    </section>
  )
}
