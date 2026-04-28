'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function FlagshipServices() {
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadGsap = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      // Header reveal
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

      // Cards brand wipe and image settle
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.flagship-card')
        
        cards.forEach((card) => {
          const img = card.querySelector('.flagship-img')
          const brandText = card.querySelector('.brand-text')
          
          if (img) {
            gsap.fromTo(
              img,
              { scale: 1.04 },
              {
                scale: 1,
                duration: 1.3,
                ease: 'power2.out',
                scrollTrigger: { trigger: card, start: 'top 70%' },
              }
            )
          }
          
          if (brandText) {
            gsap.fromTo(
              brandText,
              { clipPath: 'inset(0 100% 0 0)' },
              {
                clipPath: 'inset(0 0% 0 0)',
                duration: 1.0,
                ease: 'power4.out',
                scrollTrigger: { trigger: card, start: 'top 50%' },
              }
            )
          }
        })
      }
    }
    loadGsap()
  }, [])

  return (
    <section
      id="flagship"
      style={{
        backgroundColor: 'var(--off-white)',
        borderTop: '0.5px solid rgba(0,0,0,0.08)',
      }}
    >
      {/* Header */}
      <div
        ref={headerRef}
        style={{
          padding: '64px 32px',
          maxWidth: '800px',
        }}
      >
        <p className="section-label reveal-el" style={{ marginBottom: '16px' }}>
          Featured Engagements
        </p>
        <h2
          className="reveal-el"
          style={{
            fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
            fontWeight: 600,
            fontSize: 'clamp(24px, 4vw, 44px)',
            lineHeight: 1.25,
            color: 'var(--black)',
            marginBottom: '24px',
          }}
        >
          Two engagements we&apos;re <strong style={{ fontWeight: 600 }}>known for.</strong>
        </h2>
        <p
          className="reveal-el"
          style={{
            fontFamily: "var(--font-cabinet), 'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: '18px',
            lineHeight: 1.7,
            color: 'rgba(0,0,0,0.65)',
            maxWidth: '640px',
          }}
        >
          Most EXL clients start with one of these two offers. Both combine our
          four capabilities into a single monthly engagement, led by a senior
          partner, delivered by our in-house team.
        </p>
      </div>

      {/* Cards Grid */}
      <div
        ref={cardsRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
        }}
        className="flagship-grid"
      >
        {/* Card 1 — IMM */}
        <div
          className="flagship-card"
          style={{
            position: 'relative',
            minHeight: '560px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '48px 40px',
            overflow: 'hidden',
          }}
        >
          {/* Background Image */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <Image
              src="/assets/images/flagship-imm.jpg"
              alt="Five-star luxury hotel lobby"
              fill
              style={{ objectFit: 'cover' }}
              className="flagship-img"
              sizes="50vw"
            />
          </div>
          
          {/* Overlays */}
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.35)', zIndex: 1 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 80%)', zIndex: 1 }} />

          {/* Brand Text */}
          <div
            className="brand-text"
            style={{
              position: 'absolute',
              top: '40px',
              left: '40px',
              fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
              fontWeight: 600,
              fontSize: 'clamp(40px, 6vw, 80px)',
              color: 'rgba(222,255,0,0.12)',
              zIndex: 2,
              clipPath: 'inset(0 100% 0 0)',
              lineHeight: 1,
              maxWidth: '80%',
            }}
          >
            YOUR MARKETING DEPT.
          </div>

          {/* Content Panel */}
          <div style={{ position: 'relative', zIndex: 3 }}>
            <p
              style={{
                fontFamily: "var(--font-cabinet), 'DM Sans', sans-serif",
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.6)',
                marginBottom: '16px',
              }}
            >
              Flagship Service — 01
            </p>
            <h3
              style={{
                fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
                fontWeight: 600,
                fontSize: 'clamp(32px, 4vw, 48px)',
                lineHeight: 1,
                color: '#ffffff',
                marginBottom: '20px',
              }}
            >
              Integrated Marketing Management.
            </h3>
            <p
              style={{
                fontFamily: "var(--font-cabinet), 'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: '18px',
                lineHeight: 1.65,
                color: 'rgba(255,255,255,0.8)',
                marginBottom: '32px',
                maxWidth: '520px',
              }}
            >
              Your marketing department, on retainer. Strategy, online presence, 
              PR coordination, social oversight, collateral, influencer programs, 
              and vendor management, all run by one accountable team. Built for 
              five-star hospitality, luxury brands, and B2B companies whose 
              reputation is their asset.
            </p>
            <Link
              href="/integrated-marketing-management"
              style={{
                fontFamily: "var(--font-cabinet), 'DM Sans', sans-serif",
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                backgroundColor: 'var(--chartreuse)',
                color: 'var(--black)',
                padding: '12px 24px',
                borderRadius: '100px',
                display: 'inline-block',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.9')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
            >
              Explore Integrated Marketing Management
            </Link>
          </div>
        </div>

        {/* Card 2 — Podcast */}
        <div
          className="flagship-card"
          style={{
            position: 'relative',
            minHeight: '560px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '48px 40px',
            overflow: 'hidden',
          }}
        >
          {/* Background Image */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <Image
              src="/assets/images/flagship-podcast.jpg"
              alt="Cinematic podcast studio"
              fill
              style={{ objectFit: 'cover' }}
              className="flagship-img"
              sizes="50vw"
            />
          </div>
          
          {/* Overlays */}
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.35)', zIndex: 1 }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 80%)', zIndex: 1 }} />

          {/* Brand Text */}
          <div
            className="brand-text"
            style={{
              position: 'absolute',
              top: '40px',
              left: '40px',
              fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
              fontWeight: 600,
              fontSize: 'clamp(40px, 6vw, 80px)',
              color: 'rgba(222,255,0,0.12)',
              zIndex: 2,
              clipPath: 'inset(0 100% 0 0)',
              lineHeight: 1,
              maxWidth: '80%',
            }}
          >
            A SHOW WORTH WATCHING.
          </div>

          {/* Content Panel */}
          <div style={{ position: 'relative', zIndex: 3 }}>
            <p
              style={{
                fontFamily: "var(--font-cabinet), 'DM Sans', sans-serif",
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.6)',
                marginBottom: '16px',
              }}
            >
              Flagship Service — 02
            </p>
            <h3
              style={{
                fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
                fontWeight: 600,
                fontSize: 'clamp(32px, 4vw, 48px)',
                lineHeight: 1,
                color: '#ffffff',
                marginBottom: '20px',
              }}
            >
              B2B Video Podcast Production.
            </h3>
            <p
              style={{
                fontFamily: "var(--font-cabinet), 'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: '18px',
                lineHeight: 1.65,
                color: 'rgba(255,255,255,0.8)',
                marginBottom: '32px',
                maxWidth: '520px',
              }}
            >
              A cinematic B2B video podcast that builds pipeline, not just 
              downloads. We run the show end to end: strategy, guest pipeline, 
              on-location production, post-production, and distribution. The 
              same engine we use to produce Best in B2B.
            </p>
            <Link
              href="/podcast-production"
              style={{
                fontFamily: "var(--font-cabinet), 'DM Sans', sans-serif",
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                backgroundColor: 'transparent',
                color: '#ffffff',
                border: '1px solid #ffffff',
                padding: '12px 24px',
                borderRadius: '100px',
                display: 'inline-block',
                transition: 'background-color 0.2s, color 0.2s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.backgroundColor = '#ffffff'
                el.style.color = 'var(--black)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.backgroundColor = 'transparent'
                el.style.color = '#ffffff'
              }}
            >
              Explore Podcast Production
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1023px) {
          .flagship-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 767px) {
          section > div:first-child {
            padding: 48px 20px 36px !important;
          }
          .flagship-card {
            padding: 40px 24px !important;
          }
          .brand-text {
            top: 24px !important;
            left: 24px !important;
          }
        }
      `}</style>
    </section>
  )
}
