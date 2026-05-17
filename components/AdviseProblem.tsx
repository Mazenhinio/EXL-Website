'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function AdviseProblem() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const textContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        }
      })

      // 1. Reveal Left Image Panel
      tl.fromTo(imageContainerRef.current,
        { clipPath: 'inset(0 100% 0 0)', scale: 1.1 },
        { clipPath: 'inset(0 0% 0 0)', scale: 1, duration: 1.4, ease: 'power4.inOut' }
      )

      // 2. Reveal Right Content
      tl.fromTo('.reveal-problem-title',
        { y: 30, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, ease: 'power3.out' },
        '-=0.8'
      )

      tl.fromTo('.reveal-problem-text',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
        '-=0.6'
      )

      // Parallax zoom scroll on the left side image
      gsap.to('.problem-parallax-img', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full bg-[var(--off-white)] py-24 lg:py-40 overflow-hidden border-b border-black/5 flex items-center selection:bg-black selection:text-white"
    >
      {/* Background grain texture */}
      <div className="absolute inset-0 pointer-events-none z-0 dense-film-grain opacity-[0.02]" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          
          {/* ── LEFT SIDE: NATURAL AND MOODY HIGH-END IMAGE ────────────────── */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[45vh] lg:min-h-[70vh] rounded-[2.5rem] overflow-hidden bg-black/5 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-black/5">
            <div 
              ref={imageContainerRef} 
              className="absolute inset-0 w-full h-[120%] -top-[10%] overflow-hidden"
            >
              <Image 
                src="/assets/images/advise-pondering-strategist.png" 
                alt="A premium strategist in a deep natural pondering pose in front of a laptop in a warm, sunlit creative loft office setting" 
                fill
                className="problem-parallax-img object-cover object-center brightness-[0.95]"
              />
              {/* Subtle vignette/editorial styling overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent z-10" />
            </div>
            
            {/* Visual Quote Overlay */}
            <div className="absolute bottom-10 left-10 right-10 z-20 bg-black/10 backdrop-blur-md border border-white/10 p-8 rounded-2xl max-w-sm hidden md:block">
              <span className="font-[var(--font-tusker)] text-[12px] tracking-[0.2em] text-[var(--chartreuse)] block mb-3 uppercase">Founder Perspective</span>
              <p className="font-[var(--font-cabinet)] text-white/95 text-lg italic leading-relaxed font-light">
                &quot;We sit in the room before we pick up a camera.&quot;
              </p>
            </div>
          </div>

          {/* ── RIGHT SIDE: TEXT AND COPY ───────────────────────────────────── */}
          <div 
            ref={textContainerRef}
            className="lg:col-span-7 flex flex-col justify-center gap-10"
          >
            <div className="space-y-6">
              {/* Section Tagline */}
              <div className="reveal-problem-text opacity-0">
                <p className="section-label text-[var(--taupe)] text-[11px] font-semibold tracking-[0.2em] uppercase">The problem we solve</p>
              </div>

              {/* Core Bold Display Title */}
              <h2 
                style={{
                  fontFamily: "var(--font-tusker), 'Bebas Neue', sans-serif",
                  fontSize: 'clamp(32px, 4.5vw, 60px)',
                  lineHeight: 1.45,
                  color: '#000000',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.01em'
                }}
                className="reveal-problem-title opacity-0"
              >
                The gap between <span className="text-black/40">&ldquo;we need a strategy&rdquo;</span> <br className="hidden md:inline" />
                and <span className="highlight-marker">&ldquo;we have one we trust.&rdquo;</span>
              </h2>
            </div>

            {/* Split Paragraph Layout */}
            <div className="space-y-8 max-w-2xl">
              <p className="reveal-problem-text opacity-0 font-[var(--font-cabinet)] text-black/80 text-xl md:text-2xl leading-relaxed font-light">
                Most ambitious brands don&apos;t have a strategy problem. They have a <span className="text-black font-semibold">seniority problem</span>. The internal team is buried in execution. The external agency sells execution. The big consulting firms show up with a partner, disappear, and leave juniors running the account.
              </p>
              
              <div className="reveal-problem-text opacity-0 border-l-2 border-[var(--chartreuse)] pl-6 py-2">
                <p className="font-[var(--font-cabinet)] text-black/90 text-2xl font-medium leading-relaxed italic">
                  Nobody is actually in the room, at your level, thinking about your business.
                </p>
              </div>

              <p className="reveal-problem-text opacity-0 font-[var(--font-cabinet)] text-black/70 text-lg md:text-xl leading-relaxed font-light">
                Advise is built for the founders and marketing leaders who need a second brain at the senior level, fast, without hiring a $300K CMO or signing a six-figure McKinsey retainer.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
