'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

const capabilities = [
  {
    id: '01',
    name: 'ADVISE.',
    title: 'Senior strategy, not junior execution.',
    body: 'Positioning, brand, and go-to-market strategy from a team that has built businesses across three continents.',
    img: '/assets/images/cap-advise.webp',
  },
  {
    id: '02',
    name: 'PRODUCE.',
    title: "Content that doesn't look like B2B.",
    body: 'Podcasts, video, and social content shot in-house from our Dallas agency. B2B that looks like media.',
    img: '/assets/images/produce.webp',
  },
  {
    id: '03',
    name: 'BUILD.',
    title: 'Projects that land on the date.',
    body: 'Projects, launches, and integrated campaigns executed end to end. We scope it, build it, ship it, measure it.',
    img: '/assets/images/build.webp',
  },
  {
    id: '04',
    name: 'GROW.',
    title: 'Distribution that turns into pipeline.',
    body: 'Partnerships, channels, and distribution systems that turn content into pipeline. We measure success by revenue.',
    img: '/assets/images/grow.webp',
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

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: railRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,
            refreshPriority: -1,
            invalidateOnRefresh: true,
          }
        })

        gsap.set([xRef.current, headlineRef.current, cardsContainerRef.current], {
          opacity: 0,
          visibility: 'visible'
        })
        gsap.set([railRef.current, stickyRef.current], { backgroundColor: '#1C2416' })
        gsap.set(headlineRef.current, { color: '#FFFFFF' })
        gsap.set('.capability-card-dsktp', { opacity: 0, y: '120vh' })

        // 1. Initial Wait
        tl.to({}, { duration: 30 })

        // 2. X Entry
        tl.fromTo(xRef.current,
          { y: '95vh', scale: 0.85, opacity: 0 },
          { y: '0vh', scale: 1, opacity: 1, duration: 40, ease: 'power2.out', immediateRender: false }
        )

        // 3. Headline Fades in
        tl.fromTo(headlineRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 25, immediateRender: false },
          '-=15'
        )

        // 4. Headline Hold
        tl.to({}, { duration: 40 })

        // 5. X zoom & Color Flip
        tl.to(xRef.current, {
          scale: 45,
          duration: 180,
          ease: 'power2.inOut'
        })

        tl.fromTo([railRef.current, stickyRef.current],
          { backgroundColor: '#1C2416' },
          { backgroundColor: '#DEFF00', duration: 60, ease: 'power2.inOut', immediateRender: false },
          '<'
        )


        tl.fromTo(headlineRef.current,
          { color: '#FFFFFF' },
          {
            color: '#000000',
            opacity: 0,
            scale: 1.2,
            filter: 'blur(10px)',
            duration: 60,
            immediateRender: false
          },
          '<'
        )

        // 6. Cards Entrance
        const cards = gsap.utils.toArray('.capability-card-dsktp') as HTMLElement[]
        tl.set(cardsContainerRef.current, { opacity: 1 }, '<')

        cards.forEach((card, i) => {
          tl.fromTo(card,
            { y: '120vh', rotateX: 20, scale: 0.95, opacity: 0 },
            {
              y: `${i * 20}px`,
              rotateX: 0,
              scale: 1,
              opacity: 1,
              duration: 100,
              ease: 'power2.out'
            },
            i === 0 ? '>-120' : '>-60'
          )

          if (i < cards.length - 1) {
            tl.to({}, { duration: 40 })
          }

          if (i > 0) {
            tl.to(cards.slice(0, i), {
              scale: 0.94,
              opacity: 0.4,
              y: '-=20',
              duration: i === cards.length - 1 ? 0 : 60,
              ease: 'power2.out'
            }, '<')
          }
        })

        // 7. Final Hold
        tl.to({}, { duration: 60 })
      })

      // Multi-stage refresh to catch all layout shifts
      ScrollTrigger.refresh()
      const timer = setTimeout(() => ScrollTrigger.refresh(), 500)
      window.addEventListener('load', () => ScrollTrigger.refresh())
      
      return () => {
        ctx.revert()
        clearTimeout(timer)
        window.removeEventListener('load', () => ScrollTrigger.refresh())
      }
    }

    loadGsap()
  }, [])

  return (
    <section
      ref={railRef}
      className="relative w-full h-[500vh]"
      style={{ backgroundColor: '#1C2416' }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ backgroundColor: '#1C2416' }}
      >
        <div ref={xRef} className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-full h-full">
            <Image src="/assets/images/X.webp" alt="EXL X" fill className="object-contain" priority />
          </div>
        </div>

        <div ref={headlineRef} className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 pointer-events-none">
          <p className="section-label mb-6 text-[var(--taupe)] text-[11px] font-semibold uppercase tracking-[0.15em]">What we do</p>
          <h2
            style={{
              fontFamily: 'var(--font-tusker)',
              fontSize: 'clamp(44px, 10vw, 80px)',
              textAlign: 'center',
              lineHeight: 1.6,
              color: 'var(--black)',
              textTransform: 'uppercase'
            }}
          >
            One firm.<br />
            <span className="highlight-marker">Four capabilities.</span>
          </h2>
        </div>

        <div ref={cardsContainerRef} className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div className="relative w-full max-w-[1200px] h-[80vh] flex items-center justify-center px-6">
            {capabilities.map((cap, i) => (
              <div
                key={cap.id}
                className="capability-card-dsktp absolute w-full max-w-[800px] bg-[#1a1a1a] rounded-[40px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.3)] pointer-events-auto"
                style={{ zIndex: i + 1 }}
              >
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
                    <h3 style={{ fontFamily: 'var(--font-tusker)' }} className="text-white text-[clamp(32px,5vw,48px)] leading-[1.1] uppercase">
                      {cap.title}
                    </h3>
                    <p className="font-[var(--font-cabinet)] text-white/50 text-[18px] font-light max-w-[650px] leading-[1.5]">
                      {cap.body}
                    </p>
                  </div>

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

      if (!railRef.current || !stickyRef.current) return

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: railRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
            refreshPriority: -1,
            invalidateOnRefresh: true,
          }
        })

        gsap.set(headlineRef.current, { color: '#FFFFFF', opacity: 0 })
        gsap.set(cardsContainerRef.current, { opacity: 0 })
        gsap.set('.capability-card-mbl', { opacity: 0, y: '100vh' })

        // 1. Initial Wait
        tl.to({}, { duration: 25 })

        // 2. X entry
        tl.fromTo(xRef.current,
          { y: '20vh', scale: 0.85, opacity: 0 },
          { y: '0vh', scale: 1, opacity: 1, duration: 40, ease: 'power2.out', immediateRender: false }
        )

        // 3. Headline fades in
        tl.to(headlineRef.current, { opacity: 1, duration: 25 }, '-=20')

        // 4. Headline Hold
        tl.to({}, { duration: 35 })

        // 5. X zoom & Background Flip
        tl.to(xRef.current, { scale: 35, duration: 120, ease: 'power2.inOut' })

        tl.fromTo(stickyRef.current, 
          { backgroundColor: '#1C2416' },
          { backgroundColor: '#DEFF00', duration: 40, ease: 'power2.inOut', immediateRender: false }, 
          '>-30'
        )

        tl.set(cardsContainerRef.current, { opacity: 1 })

        // 6. Headline blurs out
        tl.to(headlineRef.current, {
          color: '#000000',
          opacity: 0,
          scale: 1.1,
          filter: 'blur(10px)',
          duration: 40,
          immediateRender: false
        }, '<')

        // 7. Cards Entrance
        const cards = gsap.utils.toArray('.capability-card-mbl') as HTMLElement[]

        cards.forEach((card, i) => {
          tl.fromTo(card,
            { y: '100vh', rotateX: 10, opacity: 0 },
            {
              y: `${i * 10}px`,
              rotateX: 0,
              opacity: 1,
              duration: 80,
              ease: 'power2.out'
            },
            i === 0 ? '>-20' : '>-50'
          )

          if (i < cards.length - 1) {
            tl.to({}, { duration: 30 })
          }

          if (i > 0) {
            tl.to(cards.slice(0, i), {
              scale: 0.95,
              opacity: 0.3,
              y: '-=10',
              duration: 50,
              ease: 'power2.out'
            }, '<')
          }
        })

        // 8. Final Hold
        tl.to({}, { duration: 40 })
      })

      // Multi-stage refresh
      ScrollTrigger.refresh()
      const timer = setTimeout(() => ScrollTrigger.refresh(), 500)
      window.addEventListener('load', () => ScrollTrigger.refresh())

      return () => {
        ctx.revert()
        clearTimeout(timer)
        window.removeEventListener('load', () => ScrollTrigger.refresh())
      }
    }

    loadGsap()
  }, [])

  return (
    <section
      ref={railRef}
      className="relative w-full h-[400vh]"
      style={{ backgroundColor: '#1C2416' }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ backgroundColor: '#1C2416' }}
      >
        <div ref={xRef} className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-full h-full">
            <Image src="/assets/images/X.webp" alt="EXL X" fill className="object-contain" priority />
          </div>
        </div>

        <div ref={headlineRef} className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 pointer-events-none">
          <p className="section-label mb-4 text-[var(--taupe)] text-[12px]">What we do</p>
          <h2
            style={{
              fontFamily: 'var(--font-tusker)',
              fontSize: 'clamp(44px, 12vw, 56px)',
              textAlign: 'center',
              lineHeight: 1.6,
              color: 'var(--black)',
              textTransform: 'uppercase'
            }}
          >
            One firm.<br />
            <span className="highlight-marker">Four capabilities.</span>
          </h2>
        </div>

        <div ref={cardsContainerRef} className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div className="relative w-full h-full flex items-center justify-center px-4">
            {capabilities.map((cap, i) => (
              <div
                key={cap.id}
                className="capability-card-mbl absolute w-[92%] bg-[#1a1a1a] rounded-[24px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.3)] pointer-events-auto"
                style={{ zIndex: i + 1, bottom: '8vh', maxHeight: '72vh' }}
              >
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
                    <h3 style={{ fontFamily: 'var(--font-tusker)' }} className="text-white text-[28px] leading-[1.1] uppercase">
                      {cap.title}
                    </h3>
                    <p className="font-[var(--font-cabinet)] text-white/50 text-[18px] font-light leading-[1.5]">
                      {cap.body}
                    </p>
                  </div>

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
