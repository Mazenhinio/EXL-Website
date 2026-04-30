'use client'

import { useEffect, useRef } from 'react'

export default function HowWeWork() {
  const containerRef = useRef<HTMLDivElement>(null)

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

        if (isDesktop) {
          // DESKTOP: Assembly Scrub
          const tiles = gsap.utils.toArray('.blueprint-tile') as HTMLElement[]
          tiles.forEach((tile) => {
            const icon = tile.querySelector('.tile-icon')
            const content = tile.querySelector('.tile-content')
            const num = tile.querySelector('.tile-num')

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: tile,
                start: "top bottom",
                end: "center center",
                scrub: 1,
              }
            })

            tl.fromTo(icon, { y: -60, opacity: 0, scale: 0.8 }, { y: 0, opacity: 1, scale: 1, ease: "none" }, 0)
            tl.fromTo(num, { x: -40, opacity: 0 }, { x: 0, opacity: 1, ease: "none" }, 0.2)
            tl.fromTo(content, { y: 40, opacity: 0 }, { y: 0, opacity: 1, ease: "none" }, 0.3)
          })
        } else {
          // MOBILE: Vertical Path Reveal
          const tiles = gsap.utils.toArray('.blueprint-tile') as HTMLElement[]
          tiles.forEach((tile) => {
            gsap.fromTo(tile, 
              { opacity: 0, x: -20 },
              {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: tile,
                  start: "top 85%",
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

  const steps = [
    {
      num: '01',
      title: 'Discover.',
      desc: 'A surgical audit of your market, buyer, and brand. We find the friction points your team is too close to see.',
      icon: (
        <g stroke="currentColor" strokeWidth="1.2" fill="none">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </g>
      )
    },
    {
      num: '02',
      title: 'Strategize.',
      desc: 'A roadmap for positioning and distribution. We build the plan, you own the results.',
      icon: (
        <g stroke="currentColor" strokeWidth="1.2" fill="none">
          <path d="M4 4v10a2 2 0 002 2h14" />
          <path d="M16 12l4 4-4 4" />
        </g>
      )
    },
    {
      num: '03',
      title: 'Produce.',
      desc: 'In-house production for high-fidelity content. Filmed, edited, and designed by EXL partners.',
      icon: (
        <g stroke="currentColor" strokeWidth="1.2" fill="none">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M4 12h16M12 4v16" />
        </g>
      )
    },
    {
      num: '04',
      title: 'Distribute.',
      desc: 'Deploying across channels that matter. We measure success by pipeline, not impressions.',
      icon: (
        <g stroke="currentColor" strokeWidth="1.2" fill="none">
          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
        </g>
      )
    }
  ]

  return (
    <section
      ref={containerRef}
      id="how-we-work"
      style={{
        backgroundColor: 'var(--off-white)',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)`,
        backgroundSize: '50px 50px',
        padding: '80px 0',
        borderTop: '0.5px solid rgba(0,0,0,0.08)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 48px' }} className="how-we-work-container">
        {/* Header (Standard 3) */}
        <div style={{ marginBottom: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center' }} className="how-header text-center">
          <p className="section-label" style={{ 
            fontFamily: 'var(--font-tusker)', 
            fontSize: '11px', 
            fontWeight: 500, 
            textTransform: 'uppercase', 
            letterSpacing: '0.15em', 
            color: 'var(--taupe)', 
            marginBottom: '16px' 
          }}>
            How we work
          </p>
          <div style={{ width: '0.5px', height: '32px', backgroundColor: 'rgba(0,0,0,0.15)', marginBottom: '24px' }} />
          
          <h2 style={{
            fontFamily: 'var(--font-tusker)',
            fontSize: 'clamp(40px, 6vw, 100px)',
            lineHeight: 0.9,
            color: 'var(--black)',
            textTransform: 'uppercase',
            textAlign: 'center'
          }}>
            Methodology.<br />
            <span style={{ WebkitTextStroke: '1.5px var(--black)', color: 'transparent' }}>
              Built for speed.
            </span>
          </h2>
        </div>

        {/* Blueprint Grid */}
        <div className="blueprint-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1px',
          backgroundColor: 'rgba(0,0,0,0.1)',
          border: '0.5px solid rgba(0,0,0,0.1)',
        }}>
          {steps.map((step, i) => (
            <div
              key={i}
              className="blueprint-tile group"
              onMouseMove={(e) => {
                const tile = e.currentTarget;
                const rect = tile.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                import('gsap').then(({ gsap }) => {
                  gsap.to(tile.querySelector('.tile-icon'), { x: x * 0.12, y: y * 0.12, duration: 0.6, ease: 'power2.out' });
                  gsap.to(tile.querySelector('.tile-num'), { x: x * 0.06, y: y * 0.06, duration: 0.6, ease: 'power2.out' });
                  gsap.to(tile.querySelector('.tile-title'), { x: x * 0.03, y: y * 0.03, duration: 0.6, ease: 'power2.out' });
                  gsap.to(tile.querySelector('.tile-body'), { x: x * 0.015, y: y * 0.015, duration: 0.6, ease: 'power2.out' });
                });
              }}
              onMouseLeave={(e) => {
                const tile = e.currentTarget;
                import('gsap').then(({ gsap }) => {
                  gsap.to(tile.querySelectorAll('.tile-icon, .tile-num, .tile-title, .tile-body'), { 
                    x: 0, y: 0, duration: 1, ease: 'power3.out' 
                  });
                });
              }}
              style={{
                backgroundColor: 'var(--off-white)',
                padding: '60px 40px',
                display: 'grid',
                gridTemplateRows: '80px 80px 60px 1fr',
                height: '550px',
                position: 'relative',
              }}
            >
              <div className="tile-icon pointer-events-none" style={{ color: 'var(--black)' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" style={{ display: 'block' }}>
                  {step.icon}
                </svg>
              </div>
              <div className="tile-num pointer-events-none">
                <span style={{
                  fontFamily: 'var(--font-tusker)',
                  fontSize: '14px',
                  color: 'var(--chartreuse)',
                  display: 'block',
                  backgroundColor: 'var(--black)',
                  width: 'fit-content',
                  padding: '4px 10px',
                }}>
                  {step.num}
                </span>
              </div>
              <div className="tile-title pointer-events-none">
                <h3 style={{
                  fontFamily: 'var(--font-tusker)',
                  fontSize: '32px',
                  color: 'var(--black)',
                  textTransform: 'uppercase',
                  lineHeight: 1,
                  margin: 0,
                }}>
                  {step.title}
                </h3>
              </div>
              <div className="tile-body pointer-events-none">
                <p style={{
                  fontFamily: 'var(--font-cabinet)',
                  fontSize: '17px',
                  lineHeight: 1.6,
                  color: 'rgba(0,0,0,0.6)',
                  fontWeight: 300,
                  margin: 0,
                }}>
                  {step.desc}
                </p>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-500 bg-radial-[circle,var(--chartreuse)_0%,transparent_70%]" />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1023px) {
          .how-we-work-container { padding: 0 20px !important; }
          .how-header { margin-bottom: 60px !important; }
          .blueprint-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
            background-color: transparent !important;
            border: none !important;
          }
          .blueprint-tile { 
            height: auto !important; 
            min-height: auto !important;
            padding: 40px 30px !important;
            border: 0.5px solid rgba(0,0,0,0.1) !important;
            border-radius: 12px;
          }
          .tile-icon { margin-bottom: 30px !important; }
          .tile-content { margin-top: 24px !important; }
        }
      `}</style>
    </section>
  )
}
