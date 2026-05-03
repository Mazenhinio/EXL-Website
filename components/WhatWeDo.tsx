'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

const capabilities = [
  {
    id: '01',
    name: 'ADVISE.',
    title: 'Senior strategy, not junior execution.',
    body: 'Positioning, brand, and go-to-market strategy from a team that has built businesses across three continents.',
    img: '/assets/images/advise.png',
  },
  {
    id: '02',
    name: 'PRODUCE.',
    title: 'Content that doesn’t look like B2B.',
    body: 'Podcasts, video, and social content shot in-house from our Dallas studio. B2B that looks like media.',
    img: '/assets/images/produce.png',
  },
  {
    id: '03',
    name: 'BUILD.',
    title: 'Projects that land on the date.',
    body: 'Projects, launches, and integrated campaigns executed end to end. We scope it, build it, ship it, measure it.',
    img: '/assets/images/build.png',
  },
  {
    id: '04',
    name: 'GROW.',
    title: 'Distribution that turns into pipeline.',
    body: 'Partnerships, channels, and distribution systems that turn content into pipeline. We measure success by revenue.',
    img: '/assets/images/grow.png',
  },
]

/* ── DESKTOP VERSION ────────────────────────────────────────────────── */
function WhatWeDoDesktop() {
  const railRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const xRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadGsap = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (!railRef.current || !stickyRef.current) return

      let ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: railRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,
            invalidateOnRefresh: true,
          }
        })

        gsap.set([xRef.current, headlineRef.current, cardsContainerRef.current], {
          opacity: 0,
          visibility: 'visible'
        })
        gsap.set([railRef.current, stickyRef.current], { backgroundColor: '#1C2416' })
        gsap.set(headlineRef.current, { color: '#FFFFFF' })


        tl.fromTo(xRef.current,
          { y: '95vh', scale: 0.85, opacity: 0 },
          { y: '0vh', scale: 1, opacity: 1, duration: 15, ease: 'power2.out', immediateRender: true }
        )

        tl.fromTo(headlineRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 10, immediateRender: true },
          '-=8'
        )

        // SIGNIFICANT HOLD - Allow the user to see the full X and read the headline
        tl.to({}, { duration: 45 })

        // 3. THE GREAT ZOOM & COLOR TRANSITION
        tl.to(xRef.current, {
          scale: 70,
          duration: 45,
          ease: 'power2.inOut'
        })

        tl.fromTo([railRef.current, stickyRef.current],
          { backgroundColor: '#1C2416' },
          { backgroundColor: '#DEFF00', duration: 35, ease: 'power2.inOut', immediateRender: true },
          '<'
        )
        tl.set(stickyRef.current, { attr: { 'data-cursor-theme': 'light' } }, '<')

        tl.fromTo(headlineRef.current,
          { color: '#FFFFFF' },
          {
            color: '#000000',
            opacity: 0,
            scale: 1.2,
            filter: 'blur(10px)',
            duration: 20,
            immediateRender: true
          },
          '<'
        )

        const cards = gsap.utils.toArray('.capability-card-dsktp') as HTMLElement[]
        tl.set(cardsContainerRef.current, { opacity: 1 }, '>-5')

        cards.forEach((card, i) => {
          tl.fromTo(card,
            { y: '120vh', rotateX: 20, scale: 0.95, opacity: 0 },
            {
              y: `${i * 20}px`,
              rotateX: 0,
              scale: 1,
              opacity: 1,
              duration: 25,
              ease: 'power2.out',
              immediateRender: true
            },
            `>-${i === 0 ? 10 : 20}`
          )

          if (i < cards.length - 1) {
            tl.to({}, { duration: 15 })
          }

          if (i > 0) {
            tl.to(cards.slice(0, i), {
              scale: 0.94,
              opacity: 0.4,
              y: '-=20',
              duration: 20,
              ease: 'power2.out'
            }, '<')
          }
        })

        tl.to({}, { duration: 0 })
      })

      return () => ctx.revert()
    }
    loadGsap()
  }, [])

  return (
    <section ref={railRef} className="relative w-full h-[500vh]" style={{ backgroundColor: '#1C2416' }} data-cursor-theme="dark">
      <div ref={stickyRef} className="sticky top-0 h-screen w-full overflow-hidden" style={{ backgroundColor: '#1C2416' }} data-cursor-theme="dark">
        <div ref={xRef} className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-full h-full">
            <Image 
              src="/assets/images/X.png" 
              alt="EXL X" 
              fill 
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div ref={headlineRef} className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 pointer-events-none">
          <p className="section-label mb-6 text-[var(--taupe)]">What we do</p>
          <h2 style={{ fontFamily: 'var(--font-tusker)', fontSize: 'clamp(44px, 11vw, 120px)', textAlign: 'center', lineHeight: 0.9, color: 'var(--black)', textTransform: 'uppercase' }}>
            One firm.<br />
            <span className="highlight-marker" style={{ marginTop: '12px' }}>Four capabilities.</span>
          </h2>
        </div>

        <div ref={cardsContainerRef} className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div className="relative w-full max-w-[1200px] h-[80vh] flex items-center justify-center px-6">
            {capabilities.map((cap, i) => (
              <div key={cap.id} className="capability-card-dsktp absolute w-full max-w-[800px] bg-[#1a1a1a] rounded-[40px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.3)] pointer-events-auto" style={{ zIndex: i + 1 }}>
                <div className="relative aspect-[16/9] w-full bg-neutral-900">
                  <Image src={cap.img} alt={cap.name} fill className="object-cover opacity-80" />
                </div>
                <div className="p-8 flex justify-between items-end bg-[#1a1f14]">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <span className="font-[var(--font-tusker)] text-[var(--chartreuse)] text-[20px] tracking-widest">{cap.id}</span>
                      <div className="h-[1px] w-8 bg-white/20" />
                      <span className="font-[var(--font-tusker)] text-white/40 text-[20px] tracking-widest">{cap.name}</span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-tusker)' }} className="text-white text-[clamp(36px,6vw,64px)] leading-[1.1] uppercase">{cap.title}</h3>
                    <p className="font-[var(--font-cabinet)] text-white/50 text-[24px] font-light max-w-[750px] leading-[1.6]">{cap.body}</p>
                  </div>
                  <button className="w-24 h-24 bg-[var(--chartreuse)] text-black rounded-full flex items-center justify-center group/btn transition-all duration-300 hover:scale-110 shadow-lg">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── MOBILE VERSION ─────────────────────────────────────────────────── */
function WhatWeDoMobile() {
  const railRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const xRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadGsap = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      let ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: railRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
          }
        })

        // Initial States
        gsap.set(headlineRef.current, { color: '#FFFFFF', opacity: 0 })
        gsap.set(cardsContainerRef.current, { opacity: 0 })
        
        // 1. BRANDING ENTRY
        tl.fromTo(xRef.current,
          { y: '20vh', scale: 0.85, opacity: 0 },
          { y: '0vh', scale: 1, opacity: 1, duration: 20, ease: 'power2.out' }
        )

        tl.to(headlineRef.current, { opacity: 1, duration: 15 }, '-=10')
        tl.to({}, { duration: 10 }) // Short hold to read

        // 2. THE BIG ZOOM
        tl.to(xRef.current, { scale: 50, duration: 45, ease: 'power2.inOut' })
        
        // SWITCH BACKGROUND & SHOW CARDS AT THE END OF ZOOM
        tl.to(stickyRef.current, { backgroundColor: '#DEFF00', duration: 10 }, '>-10')
        tl.set(stickyRef.current, { attr: { 'data-cursor-theme': 'light' } }, '<')
        tl.set(cardsContainerRef.current, { opacity: 1 })
        
        tl.to(headlineRef.current, { 
          color: '#000000', 
          opacity: 0, 
          scale: 1.1, 
          filter: 'blur(10px)', 
          duration: 25 
        }, '<')

        // 3. CARDS ENTRY
        const cards = gsap.utils.toArray('.capability-card-mbl') as HTMLElement[]
        
        cards.forEach((card, i) => {
          tl.fromTo(card,
            { y: '100vh', rotateX: 10, opacity: 0 },
            {
              y: `${i * 10}px`,
              rotateX: 0,
              opacity: 1,
              duration: 35,
              ease: 'power2.out'
            },
            i === 0 ? '>-15' : '>-25'
          )

          if (i < cards.length - 1) {
            tl.to({}, { duration: 25 })
          }

          if (i > 0) {
            tl.to(cards.slice(0, i), {
              scale: 0.95,
              opacity: 0.3,
              y: '-=10',
              duration: 25
            }, '<')
          }
        })
      })

      return () => ctx.revert()
    }
    loadGsap()
  }, [])

  return (
    <section ref={railRef} className="relative w-full h-[450vh]" style={{ backgroundColor: '#1C2416' }} data-cursor-theme="dark">
      <div ref={stickyRef} className="sticky top-0 h-screen w-full overflow-hidden" style={{ backgroundColor: '#1C2416' }} data-cursor-theme="dark">
        <div ref={xRef} className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-full h-full">
            <Image 
              src="/assets/images/X.png" 
              alt="EXL X" 
              fill 
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div ref={headlineRef} className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 pointer-events-none">
          <p className="section-label mb-4 text-[var(--taupe)] text-[12px]">What we do</p>
          <h2 style={{ fontFamily: 'var(--font-tusker)', fontSize: 'clamp(44px, 12vw, 56px)', textAlign: 'center', lineHeight: 0.9, color: 'var(--black)', textTransform: 'uppercase' }}>
            One firm.<br />
            <span className="highlight-marker" style={{ marginTop: '8px' }}>Four capabilities.</span>
          </h2>
        </div>

        <div ref={cardsContainerRef} className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div className="relative w-full h-full flex items-center justify-center px-4">
            {capabilities.map((cap, i) => (
              <div key={cap.id} className="capability-card-mbl absolute w-[92%] bg-[#1a1a1a] rounded-[24px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.3)] pointer-events-auto" style={{ zIndex: i + 1, bottom: '8vh', maxHeight: '72vh' }}>
                <div className="relative aspect-video w-full bg-neutral-900">
                  <Image src={cap.img} alt={cap.name} fill className="object-cover opacity-80" />
                </div>
                <div className="p-6 flex flex-col justify-between items-start bg-[#1a1f14]">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="font-[var(--font-tusker)] text-[var(--chartreuse)] text-[16px] tracking-widest">{cap.id}</span>
                      <div className="h-[1px] w-6 bg-white/20" />
                      <span className="font-[var(--font-tusker)] text-white/40 text-[16px] tracking-widest">{cap.name}</span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-tusker)' }} className="text-white text-[28px] leading-[1.1] uppercase">{cap.title}</h3>
                    <p className="font-[var(--font-cabinet)] text-white/50 text-[18px] font-light leading-[1.5]">{cap.body}</p>
                  </div>
                  <button className="mt-6 w-14 h-14 bg-[var(--chartreuse)] text-black rounded-full flex items-center justify-center shadow-lg">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function WhatWeDo() {
  return (
    <>
      <div className="hidden lg:block">
        <WhatWeDoDesktop />
      </div>
      <div className="block lg:hidden">
        <WhatWeDoMobile />
      </div>
    </>
  )
}
