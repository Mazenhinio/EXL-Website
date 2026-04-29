'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function FooterCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)
  const cutoutRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const loadGsap = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      // Cutout figure animation
      if (cutoutRef.current && sectionRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 88%',
          onEnter: () => {
            if (cutoutRef.current) {
              cutoutRef.current.classList.add('visible')
            }
          },
        })
      }

      // Headline stagger
      if (headerRef.current) {
        const words = headerRef.current.querySelectorAll('.word')
        gsap.fromTo(
          words,
          { opacity: 0, y: '55%' },
          {
            opacity: 1,
            y: '0%',
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.075,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          }
        )
      }

      // Sub text and CTAs
      if (subRef.current && ctasRef.current) {
        gsap.fromTo(
          [subRef.current, ctasRef.current],
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.15,
            delay: 0.4,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          }
        )
      }
    }
    loadGsap()
  }, [])

  return (
    <section
      id="footer-cta"
      ref={sectionRef}
      style={{
        position: 'relative',
        backgroundColor: 'var(--chartreuse)',
        padding: '80px 48px',
        overflow: 'hidden',
        borderTop: '0.5px solid rgba(0,0,0,0.1)',
      }}
    >
      <div
        className="cta-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Left col */}
        <div style={{ maxWidth: '90%' }}>
          <h2
            ref={headerRef}
            style={{
              fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
              fontWeight: 600,
              fontSize: 'clamp(54px, 14vw, 110px)',
              lineHeight: 1.15,
              color: 'var(--black)',
            }}
          >
            {/* Split text for stagger */}
            {"Let's build something "
              .split(' ')
              .map((word, i) => (
                <span
                  key={i}
                  className="word"
                  style={{ display: 'inline-block', opacity: 0, marginRight: '0.25em' }}
                >
                  {word}
                </span>
              ))}
            <span 
              className="word" 
              style={{ 
                display: 'inline-block', 
                opacity: 0, 
                backgroundColor: 'var(--black)', 
                color: 'var(--chartreuse)', 
                padding: '0 12px 6px',
                lineHeight: 1
              }}
            >
              worth watching.
            </span>
          </h2>
        </div>

        {/* Right col */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            maxWidth: '420px',
            paddingBottom: '16px',
          }}
        >
          <p
            ref={subRef}
            style={{
              fontFamily: "var(--font-cabinet), 'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: '21px',
              lineHeight: 1.6,
              color: 'rgba(0,0,0,0.7)',
              marginBottom: '32px',
              opacity: 0,
            }}
          >
            Book a 20-minute call. No deck, no pitch. Just a conversation about
            what you&apos;re trying to ship.
          </p>

          <div
            ref={ctasRef}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              flexWrap: 'wrap',
              opacity: 0,
            }}
          >
            <Link
              href="/contact"
              style={{
                fontFamily: "var(--font-tusker), sans-serif",
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                backgroundColor: 'var(--black)',
                color: 'var(--chartreuse)',
                padding: '14px 28px',
                display: 'inline-block',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
            >
              Book a call
            </Link>
            <a
              href="mailto:info@exl.agency"
              style={{
                fontFamily: "var(--font-tusker), sans-serif",
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.05em',
                color: 'var(--black)',
                textDecoration: 'underline',
                textUnderlineOffset: '4px',
                textTransform: 'uppercase'
              }}
            >
              info@exl.agency
            </a>
          </div>
        </div>
      </div>

      {/* Cutout Figure */}
      <div className="footer-cutout-container" style={{ position: 'absolute', bottom: 0, right: '5%', width: '400px', height: '500px', pointerEvents: 'none' }}>
        <Image
          ref={cutoutRef}
          src="/assets/images/cutout_model.png"
          alt="EXL brand team member"
          fill
          style={{ objectFit: 'contain', objectPosition: 'bottom' }}
          className="footer-cutout"
        />
      </div>

      <style jsx>{`
        @media (max-width: 1023px) {
          .cta-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
        @media (max-width: 767px) {
          section {
            padding: 80px 20px 320px !important;
          }
          .cta-grid > div {
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  )
}
