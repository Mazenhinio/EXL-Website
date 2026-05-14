'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function FlagshipServices() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)

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

        if (isDesktop && sectionRef.current && railRef.current) {
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

          // Start at 0% (Intro) and move to -50% (Cards)
          tl.fromTo(railRef.current, 
            { x: '0%' }, 
            { x: '-50%', ease: 'none', immediateRender: true }
          )

          const imgs = railRef.current.querySelectorAll('.flagship-img')
          imgs.forEach(img => {
            tl.fromTo(img, { scale: 1.12 }, { scale: 1, ease: 'power1.out' }, 0.4)
          })

          // Pill Explosion Animation
          const pills = railRef.current.querySelectorAll('.expert-pill')
          gsap.set(pills, { 
            top: '50%', 
            left: '50%', 
            xPercent: -50, 
            yPercent: -50, 
            scale: 1,
            opacity: 1,
            rotation: 0,
            zIndex: 4
          })

          gsap.to(pills, {
            x: (i) => i === 0 || i === 2 ? '-32vw' : '32vw', // Explode left or right
            y: (i) => i < 2 ? '-25vh' : '25vh',             // Explode up or down
            xPercent: -50,
            yPercent: -50,
            scale: 1,
            opacity: 1,
            rotation: (i) => [ -6, 8, 4, -5 ][i],
            zIndex: 12,
            duration: 1.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
              toggleActions: "play none none none",
              once: true
            }
          })
        } else {
          // MOBILE: Vertical Reveal
          const cards = gsap.utils.toArray('.flagship-card-mobile') as HTMLElement[]
          cards.forEach((card) => {
            gsap.fromTo(card, 
              { opacity: 0, y: 40 },
              {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
                }
              }
            )
          })
        }
      })

      return () => {
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
      id="flagship"
      className="flagship-section"
      style={{
        height: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--off-white)',
      }}
    >
      {/* DESKTOP RAIL */}
      <div
        ref={railRef}
        className="desktop-rail"
        style={{
          display: 'flex',
          width: '200%',
          height: '100vh',
          position: 'absolute',
          top: 0,
          left: 0,
          willChange: 'transform',
        }}
      >
        {/* PANEL 1: INTRO */}
        <div style={{
          width: '50%',
          height: '100vh',
          backgroundColor: 'var(--off-white)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 10%',
          position: 'relative'
        }}>
          {/* Expertise Pills */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block">
            {[
              { text: 'Senior', color: '#ade3ff', img: '/assets/images/person-1.webp', scale: 1.8 },
              { text: 'Native', color: '#ff5400', img: '/assets/images/person-2.webp', scale: 1.4 },
              { text: 'Cinematic', color: '#e8adff', img: '/assets/images/person-3.webp', scale: 1.1 },
              { text: 'Impact', color: '#deebc2', img: '/assets/images/person-4.webp', scale: 1.1 },
            ].map((pill) => (
              <div 
                key={pill.text}
                className="expert-pill absolute flex items-center gap-4 pl-8 pr-1.5 py-1.5 rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.12)] hover:scale-105"
                style={{
                  backgroundColor: pill.color,
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  opacity: 1,
                  zIndex: 4,
                  border: '1px solid rgba(255,255,255,0.1)',
                  whiteSpace: 'nowrap'
                }}
              >
                <span style={{ 
                  fontFamily: 'var(--font-tusker)', 
                  fontSize: '32px', 
                  color: pill.color === '#ff5400' ? '#fff' : '#000',
                  textTransform: 'uppercase',
                  lineHeight: 1,
                  letterSpacing: '0.01em'
                }}>
                  {pill.text}
                </span>
                <div className="w-14 h-14 rounded-full overflow-hidden relative flex-shrink-0 bg-black/5">
                  <Image 
                    src={pill.img} 
                    alt="" 
                    fill 
                    className="object-cover" 
                    style={{ transform: `scale(${pill.scale})` }}
                    priority 
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="section-label" style={{ marginBottom: '16px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--taupe)' }}>
            Flagship Services
          </p>
          <div style={{ width: '0.5px', height: '24px', backgroundColor: 'rgba(0,0,0,0.15)', marginBottom: '24px' }} />
          <h2 style={{ 
            fontFamily: 'var(--font-tusker)', 
            fontSize: 'clamp(36px, 8vw, 80px)', 
            textAlign: 'center', 
            lineHeight: 1.6, 
            color: 'var(--black)', 
            textTransform: 'uppercase', 
            marginBottom: '32px',
            overflowWrap: 'break-word',
            position: 'relative',
            zIndex: 5
          }}>
            Two engagements<br />
            <span className="highlight-marker">we&apos;re known for.</span>
          </h2>
          <p style={{ 
            fontFamily: 'var(--font-cabinet)', 
            fontSize: 'clamp(18px, 4vw, 38px)', 
            color: 'rgba(0,0,0,0.65)', 
            textAlign: 'center', 
            maxWidth: '900px', 
            lineHeight: 1.3, 
            fontWeight: 300,
            position: 'relative',
            zIndex: 5
          }}>
            Most EXL clients start with <span className="font-medium text-black">one of these two offers</span>. Both combine our <span className="font-medium text-black">four capabilities</span> into a <span className="font-medium text-black">single monthly engagement</span>, led by a <span className="font-medium text-black">senior partner</span>, delivered by our <span className="font-medium text-black">in-house team</span>.
          </p>
        </div>

        {/* PANEL 2: CARDS */}
        <div style={{ width: '50%', height: '100vh', display: 'flex' }}>
          <div className="flagship-card" style={{ width: '50%', height: '100%', position: 'relative', borderRight: '0.5px solid rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            <Image src="/assets/images/flagship-imm.webp" alt="IMM" fill style={{ objectFit: 'cover' }} className="flagship-img" priority />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 80%)', zIndex: 1 }} />
            <div style={{ position: 'absolute', bottom: '10%', left: '8%', right: '8%', zIndex: 5 }}>
              <p style={{ fontFamily: 'var(--font-tusker)', color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontWeight: 500, marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.12em' }}>01 — IMM</p>
              <h3 style={{ fontFamily: 'var(--font-tusker)', fontSize: 'clamp(32px, 4vw, 56px)', color: '#fff', lineHeight: 1.3, marginBottom: '20px' }}>Integrated Marketing Management.</h3>
              <p style={{ fontFamily: 'var(--font-cabinet)', color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(16px, 2vw, 28px)', lineHeight: 1.5, marginBottom: '32px', maxWidth: '480px' }}>Your marketing department, on retainer. Built for five-star hospitality, luxury brands, and B2B companies whose reputation is their asset.</p>
              <Link href="#footer-cta" style={{ fontFamily: 'var(--font-tusker)', backgroundColor: 'var(--chartreuse)', color: '#000', padding: '14px 32px', borderRadius: '100px', fontWeight: 600, fontSize: '12px', display: 'inline-block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Explore IMM</Link>
            </div>
          </div>
          <div className="flagship-card" style={{ width: '50%', height: '100%', position: 'relative', overflow: 'hidden' }}>
            <Image src="/assets/images/flagship-podcast.webp" alt="Podcast" fill style={{ objectFit: 'cover' }} className="flagship-img" priority />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, transparent 80%)', zIndex: 1 }} />
            <div style={{ position: 'absolute', bottom: '10%', left: '8%', right: '8%', zIndex: 5 }}>
              <p style={{ fontFamily: 'var(--font-tusker)', color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontWeight: 500, marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.12em' }}>02 — PRODUCTION</p>
              <h3 style={{ fontFamily: 'var(--font-tusker)', fontSize: 'clamp(32px, 4vw, 56px)', color: '#fff', lineHeight: 1.3, marginBottom: '20px' }}>B2B Video Podcast Production.</h3>
              <p style={{ fontFamily: 'var(--font-cabinet)', color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(16px, 2vw, 28px)', lineHeight: 1.5, marginBottom: '32px', maxWidth: '480px' }}>Your production floor, on retainer. A high-output content engine for CEOs and CMOs who need to dominate LinkedIn, YouTube, and the podcast charts.</p>
              <Link href="#footer-cta" style={{ fontFamily: 'var(--font-tusker)', border: '1px solid #fff', color: '#fff', padding: '14px 32px', borderRadius: '100px', fontWeight: 600, fontSize: '12px', display: 'inline-block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Explore Podcast Production</Link>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE CONTENT */}
      <div className="mobile-only" style={{ display: 'none', padding: '80px 20px' }}>
        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ 
            fontFamily: 'var(--font-tusker)', 
            fontSize: 'clamp(36px, 10vw, 56px)', // Unified scale
            lineHeight: 1.6, 
            color: 'var(--black)', 
            textTransform: 'uppercase', 
            marginBottom: '24px',
            overflowWrap: 'break-word'
          }}>
            Two engagements<br />
            <span className="highlight-marker">we&apos;re known for.</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-cabinet)', fontSize: '16px', color: 'rgba(0,0,0,0.6)', lineHeight: 1.6 }}>
            Most EXL clients start with one of these two offers. Led by a senior partner, delivered by our in-house team.
          </p>
        </div>

        <div className="flagship-card-mobile" style={{ marginBottom: '40px', position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '500px' }}>
          <Image src="/assets/images/flagship-imm.webp" alt="IMM" fill style={{ objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 70%)', zIndex: 1 }} />
          <div style={{ position: 'absolute', bottom: '30px', left: '20px', right: '20px', zIndex: 2 }}>
             <h3 style={{ fontFamily: 'var(--font-tusker)', fontSize: '32px', color: '#fff', marginBottom: '16px' }}>Integrated Marketing Management.</h3>
             <Link href="#footer-cta" style={{ backgroundColor: 'var(--chartreuse)', color: '#000', padding: '12px 24px', borderRadius: '100px', fontWeight: 700, fontSize: '11px', display: 'inline-block' }}>Explore IMM</Link>
          </div>
        </div>

        <div className="flagship-card-mobile" style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '500px' }}>
          <Image src="/assets/images/flagship-podcast.webp" alt="Podcast" fill style={{ objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 70%)', zIndex: 1 }} />
          <div style={{ position: 'absolute', bottom: '30px', left: '20px', right: '20px', zIndex: 2 }}>
             <h3 style={{ fontFamily: 'var(--font-tusker)', fontSize: '32px', color: '#fff', marginBottom: '16px' }}>B2B Video Podcast Production.</h3>
             <Link href="#footer-cta" style={{ border: '1px solid #fff', color: '#fff', padding: '12px 24px', borderRadius: '100px', fontWeight: 700, fontSize: '11px', display: 'inline-block' }}>Explore Production</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 1024px) {
          .flagship-section { height: 100vh; }
        }
        @media (max-width: 1023px) {
          .desktop-rail { display: none !important; }
          .mobile-only { display: block !important; }
          .flagship-section { height: auto !important; }
        }
      `}</style>
    </section>
  )
}
