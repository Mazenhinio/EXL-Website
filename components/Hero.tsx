'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)
  const ghostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadGsap = async () => {
      const { gsap } = await import('gsap')

      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

      tl.fromTo(
        ghostRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 2.5, ease: 'power1.out', delay: 0.1 },
        0
      )
        .fromTo(
          h1Ref.current,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.9, delay: 0.45, ease: 'power2.out' },
          0
        )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.6, delay: 0.85 },
          0
        )
        .fromTo(
          ctasRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.6, delay: 1.05 },
          0
        )
    }

    loadGsap()
  }, [])

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100svh',
        backgroundColor: 'var(--eerie)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '80px',
        paddingBottom: '64px',
        paddingLeft: '32px',
        paddingRight: '32px',
        textAlign: 'center',
      }}
    >
      {/* Split background images */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', zIndex: 0 }}>
        <div style={{ position: 'relative', width: '50%', height: '100%', borderRight: '0.5px solid rgba(255,255,255,0.05)' }}>
          <Image
            src="/assets/images/hero-2.webp"
            alt="Hero Left"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
            sizes="50vw"
          />
        </div>
        <div style={{ position: 'relative', width: '50%', height: '100%' }}>
          <Image
            src="/assets/images/hero-1.webp"
            alt="Hero Right"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
            sizes="50vw"
          />
        </div>
      </div>

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
          zIndex: 1,
        }}
      />

      {/* Ghost EXL letterform */}
      <div
        ref={ghostRef}
        style={{
          position: 'absolute',
          bottom: '-10px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
          fontWeight: 600,
          fontSize: '95vw',
          lineHeight: 0.85,
          color: 'rgba(222,255,0,0.04)',
          zIndex: 2,
          pointerEvents: 'none',
          userSelect: 'none',
          whiteSpace: 'nowrap',
          opacity: 0,
        }}
      >
        EXL
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 3, maxWidth: '1100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1
          ref={h1Ref}
          style={{
            fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
            fontSize: 'clamp(25px, 7vw, 90px)',
            lineHeight: 1.6,
            color: '#ffffff',
            marginBottom: '28px',
            opacity: 0,
            textTransform: 'uppercase',
            overflowWrap: 'break-word',
          }}
        >
          A B2B consultancy with its own{' '}
          <span className="highlight-marker">production</span> floor.
        </h1>

        <p
          ref={subRef}
          style={{
            fontFamily: "var(--font-cabinet), 'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: 'clamp(13px, 3.5vw, 30px)',
            lineHeight: 1.2,
            color: '#ffffff',
            maxWidth: '1000px',
            marginBottom: '48px',
            opacity: 0,
          }}
        >
          We advise, produce, build, and grow for ambitious B2B and luxury brands. Senior strategy, AI-native workflows, cinematic output. From
          Dallas, for clients across North America and the Middle East.
        </p>

        <div
          ref={ctasRef}
          style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            opacity: 0,
          }}
        >
          <Link
            href="/contact"
            id="hero-book-cta"
            style={{
              fontFamily: "var(--font-tusker), sans-serif",
              fontSize: '18px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              backgroundColor: 'var(--chartreuse)',
              color: 'var(--black)',
              padding: '32px 64px',
              display: 'inline-block',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
          >
            Book a call
          </Link>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 767px) {
          section {
            padding-left: 20px !important;
            padding-right: 20px !important;
            padding-bottom: 48px !important;
          }
        }
      `}</style>
    </section>
  )
}
