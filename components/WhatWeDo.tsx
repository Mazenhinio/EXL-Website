'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function WhatWeDo() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  const capabilities = [
    {
      id: '01',
      name: 'Advise.',
      img: '/assets/images/advise.png',
      href: '/services/advise',
      body: 'Positioning, brand, and go-to-market strategy from a team that has built businesses across three continents.',
    },
    {
      id: '02',
      name: 'Produce.',
      img: '/assets/images/produce.png',
      href: '/services/produce',
      body: 'Podcasts, video, and social content shot in-house from our Dallas studio. B2B that looks like media.',
    },
    {
      id: '03',
      name: 'Build.',
      img: '/assets/images/build.png',
      href: '/services/build',
      body: 'Projects, launches, and integrated campaigns executed end to end. We scope it, build it, ship it, measure it.',
    },
    {
      id: '04',
      name: 'Grow.',
      img: '/assets/images/grow.png',
      href: '/services/grow',
      body: "Partnerships, channels, and distribution systems that turn content into pipeline.",
    },
  ]

  useEffect(() => {
    const loadGsap = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const mm = gsap.matchMedia()

      mm.add({
        isDesktop: "(min-width: 1024px)",
        isMobile: "(max-width: 1023px)"
      }, (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean }

        if (isDesktop && sectionRef.current && gridRef.current && headerRef.current) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=150%",
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            }
          })

          // Header settles at top
          tl.fromTo(headerRef.current, 
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, ease: 'none', duration: 0.5, immediateRender: true },
            0
          )

          // Grid rises to settled position with a balanced gap
          tl.fromTo(gridRef.current, 
            { y: '100vh', opacity: 0 },
            { y: '0%', opacity: 1, ease: 'none', immediateRender: true },
            0
          )

          // Images settle
          const imgs = gridRef.current.querySelectorAll('.cap-bg-img')
          imgs.forEach(img => {
            tl.fromTo(img, { scale: 1.15 }, { scale: 1, ease: 'none' }, 0.2)
          })
        } else {
          // MOBILE: Standard Reveal
          const mobileCards = gsap.utils.toArray('.cap-card-mobile') as HTMLElement[]
          mobileCards.forEach((card) => {
            gsap.fromTo(card, 
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                  trigger: card,
                  start: "top 90%",
                }
              }
            )
          })
        }
      })

      return () => {
        ScrollTrigger.getAll().forEach(t => t.kill())
        mm.revert()
      }
    }
    
    const timer = setTimeout(() => {
      loadGsap()
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="what-we-do"
      style={{
        height: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--off-white)',
        borderTop: '0.5px solid rgba(0,0,0,0.1)',
      }}
    >
      {/* HEADER AT TOP */}
      <div 
        ref={headerRef}
        style={{
          position: 'absolute',
          top: '80px',
          left: 0,
          right: 0,
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0 48px',
          opacity: 0,
        }}
      >
        <p className="section-label" style={{ marginBottom: '16px', fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--taupe)' }}>
          What we do
        </p>
        <div style={{ width: '0.5px', height: '24px', backgroundColor: 'rgba(0,0,0,0.15)', marginBottom: '24px' }} />
        <h2 style={{ 
          fontFamily: 'var(--font-tusker)', 
          fontSize: 'clamp(32px, 6vw, 68px)', 
          textAlign: 'center', 
          lineHeight: 1.05, 
          color: 'var(--black)', 
          textTransform: 'uppercase'
        }}>
          One firm. Four capabilities.<br />
          <span className="highlight-marker" style={{ marginTop: '8px' }}>No handoffs.</span>
        </h2>
      </div>

      {/* RISING 2X2 GRID: BALANCED GAP */}
      <div
        ref={gridRef}
        style={{
          position: 'absolute',
          top: '420px', // Increased gap to headline
          left: '50%',
          transform: 'translateX(-50%)',
          width: '92%',
          maxWidth: '1300px',
          height: 'calc(100vh - 480px)', // Balanced height
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: '24px',
          zIndex: 5,
          opacity: 0,
        }}
      >
        {capabilities.map((cap) => (
          <div 
            key={cap.id}
            className="cap-card"
            style={{ 
              position: 'relative', 
              overflow: 'hidden', 
              borderRadius: '4px',
              backgroundColor: '#000'
            }}
          >
            <Image src={cap.img} alt={cap.name} fill style={{ objectFit: 'cover' }} className="cap-bg-img" priority />
            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 1 }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 80%)', zIndex: 2 }} />
            
            <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', zIndex: 5 }}>
              <p style={{ fontFamily: 'var(--font-tusker)', color: 'rgba(255,255,255,0.45)', fontSize: '10px', fontWeight: 500, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{cap.id}</p>
              <h3 style={{ fontFamily: 'var(--font-tusker)', fontSize: 'clamp(24px, 3vw, 36px)', color: '#fff', lineHeight: 1, marginBottom: '12px' }}>{cap.name}</h3>
              <p style={{ fontFamily: 'var(--font-cabinet)', color: 'rgba(255,255,255,0.7)', fontSize: '13px', lineHeight: 1.4, marginBottom: '16px', maxWidth: '85%' }}>{cap.body}</p>
              <Link href={cap.href} style={{ 
                fontFamily: 'var(--font-tusker)',
                color: 'var(--chartreuse)',
                fontSize: '11px', 
                fontWeight: 600, 
                textTransform: 'uppercase', 
                textDecoration: 'none',
                display: 'inline-block',
                letterSpacing: '0.08em'
              }}>Explore →</Link>
            </div>
          </div>
        ))}
      </div>

      {/* MOBILE CONTENT */}
      <div className="mobile-only" style={{ display: 'none', padding: '64px 20px' }}>
        <h2 style={{ fontFamily: 'var(--font-tusker)', fontSize: '48px', lineHeight: 0.9, color: 'var(--black)', textTransform: 'uppercase', marginBottom: '32px' }}>
          One firm. Four capabilities.<br /><span style={{ color: 'var(--taupe)', WebkitTextStroke: '1px var(--black)', WebkitTextFillColor: 'transparent' }}>No handoffs.</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
          {capabilities.map(cap => (
            <div key={cap.id} className="cap-card-mobile" style={{ position: 'relative', borderRadius: '4px', overflow: 'hidden', height: '350px' }}>
              <Image src={cap.img} alt={cap.name} fill style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 70%)', zIndex: 1 }} />
              <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', zIndex: 2 }}>
                 <h3 style={{ fontFamily: 'var(--font-tusker)', fontSize: '28px', color: '#fff', marginBottom: '8px' }}>{cap.name}</h3>
                 <Link href={cap.href} style={{ color: 'var(--chartreuse)', fontWeight: 700, fontSize: '10px', textTransform: 'uppercase', textDecoration: 'none' }}>Explore →</Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1023px) {
          .mobile-only { display: block !important; }
          #what-we-do { height: auto !important; overflow: visible !important; }
          div[ref="gridRef"], div[ref="headerRef"] { display: none !important; }
        }
        
        .cap-card:hover .cap-bg-img {
          transform: scale(1.04);
        }
        
        :global(.cap-bg-img) {
          transition: transform 0.8s ease-out !important;
        }
      `}</style>
    </section>
  )
}
