'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function FlagshipServices() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const bigTextRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadGsap = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const mm = gsap.matchMedia()

      mm.add("(min-width: 1024px)", () => {
        if (sectionRef.current) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=200%",
              pin: true,
              scrub: 1,
            }
          })

          // Step 1: Big Text wipes out to left, Cards slide in from right
          tl.to(bigTextRef.current, {
            xPercent: -150,
            ease: "power2.inOut"
          }, 0)

          tl.fromTo(cardsRef.current, 
            { xPercent: 100 },
            { xPercent: 0, ease: "power2.inOut" },
            0
          )

          // Step 2: Image settle once cards are in place
          const images = cardsRef.current?.querySelectorAll('.flagship-img')
          images?.forEach(img => {
            tl.fromTo(img, { scale: 1.1 }, { scale: 1, ease: "none" }, 0.5)
          })

          // Step 3: Titles wipe
          const titles = cardsRef.current?.querySelectorAll('h3')
          titles?.forEach(title => {
            tl.fromTo(title, 
              { clipPath: 'inset(0 100% 0 0)' }, 
              { clipPath: 'inset(0 0% 0 0)', duration: 0.5 }, 
              0.8
            )
          })
        }
      })
    }
    loadGsap()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="flagship"
      style={{
        backgroundColor: 'var(--off-white)',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '0.5px solid rgba(0,0,0,0.08)',
      }}
    >
      {/* Layer 1: Massive Wipe Text */}
      <div
        ref={bigTextRef}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 20,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
            fontSize: 'clamp(100px, 20vw, 320px)',
            fontWeight: 600,
            lineHeight: 0.8,
            color: 'transparent',
            WebkitTextStroke: '1px var(--black)',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
          }}
        >
          Two Flagships
        </h2>
      </div>

      {/* Layer 2: The Cards Grid */}
      <div
        ref={cardsRef}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          zIndex: 10,
        }}
        className="flagship-grid"
      >
        {/* Card 1 — IMM */}
        <div
          className="flagship-card"
          style={{
            position: 'relative',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '64px 48px',
            overflow: 'hidden',
            borderRight: '0.5px solid rgba(255,255,255,0.1)',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <Image
              src="/assets/images/flagship-imm.jpg"
              alt="IMM"
              fill
              style={{ objectFit: 'cover' }}
              className="flagship-img"
            />
          </div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 70%)', zIndex: 1 }} />
          
          <div style={{ position: 'relative', zIndex: 2 }}>
            <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', marginBottom: '16px', letterSpacing: '0.1em' }}>SERVICE 01</p>
            <h3 style={{ fontFamily: 'var(--font-tusker)', fontSize: 'clamp(32px, 5vw, 64px)', color: '#fff', marginBottom: '24px', lineHeight: 1.1, paddingBottom: '10px' }}>
              Integrated Marketing Management.
            </h3>
            <Link href="/integrated-marketing-management" style={{ backgroundColor: 'var(--chartreuse)', color: '#000', padding: '14px 28px', borderRadius: '100px', fontSize: '12px', fontWeight: 700, display: 'inline-block' }}>
              Explore IMM
            </Link>
          </div>
        </div>

        {/* Card 2 — Podcast */}
        <div
          className="flagship-card"
          style={{
            position: 'relative',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '64px 48px',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <Image
              src="/assets/images/flagship-podcast.jpg"
              alt="Podcast"
              fill
              style={{ objectFit: 'cover' }}
              className="flagship-img"
            />
          </div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 70%)', zIndex: 1 }} />
          
          <div style={{ position: 'relative', zIndex: 2 }}>
            <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', marginBottom: '16px', letterSpacing: '0.1em' }}>SERVICE 02</p>
            <h3 style={{ fontFamily: 'var(--font-tusker)', fontSize: 'clamp(32px, 5vw, 64px)', color: '#fff', marginBottom: '24px', lineHeight: 1.1, paddingBottom: '10px' }}>
              B2B Video Podcast Production.
            </h3>
            <Link href="/podcast-production" style={{ border: '1px solid #fff', color: '#fff', padding: '14px 28px', borderRadius: '100px', fontSize: '12px', fontWeight: 700, display: 'inline-block' }}>
              Explore Podcast
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1023px) {
          section { height: auto !important; }
          .flagship-grid { position: relative !important; grid-template-columns: 1fr !important; }
          .flagship-card { height: 600px !important; }
          h2 { display: none; }
        }
      `}</style>
    </section>
  )
}
