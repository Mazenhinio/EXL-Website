'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'

export default function B2BPodcastHero() {
  const bgRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const btnRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    // Initial states
    gsap.set(bgRef.current, { opacity: 0 })
    // Push the logo down so it starts dead center, slightly scaled up
    gsap.set(logoRef.current, { y: 120, scale: 1.05, opacity: 0 })
    gsap.set([textRef.current, btnRef.current], { y: 40, opacity: 0 })

    // Animation Sequence: The Hero Glide
    // 1. Logo fades in alone on black
    tl.to(logoRef.current, {
      opacity: 1,
      duration: 1.2,
      ease: 'power2.out'
    })
    // 2. Logo glides up to its resting place
    .to(logoRef.current, {
      y: 0,
      scale: 1,
      duration: 1.4,
      ease: 'power3.inOut'
    }, "+=0.3") // Short hold beat
    // 3. Background smoothly fades in as the logo moves
    .to(bgRef.current, {
      opacity: 1,
      duration: 2,
      ease: 'power2.out'
    }, "-=1.0")
    // 4. Text and button fade up smoothly
    .to([textRef.current, btnRef.current], {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power3.out'
    }, "-=1.0")

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section className="relative w-full min-h-[100svh] bg-black overflow-hidden flex items-end">
      {/* Background Image with Spotlight/Moody Effect */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <Image
          src="/b2b-hero-exec.png"
          alt="Best in B2B Podcast Executive"
          fill
          className="object-cover opacity-70"
          priority
        />
        {/* Dark overlay with crimson/amber gradient hint */}
        <div className="absolute inset-0 bg-gradient-to-t from-b2b-crimson/90 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-b2b-bright/20 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12 flex flex-col items-center justify-center min-h-[100svh] text-center pt-24 pb-12">
        <div className="flex flex-col items-center gap-8 max-w-4xl w-full">

          {/* Image Logo */}
          <div ref={logoRef} className="mb-6 flex justify-center w-full">
            <Image
              src="/assets/images/best-in-b2b-logo-black.webp"
              alt="Best in B2B Logo"
              width={500}
              height={200}
              className="w-[80%] max-w-[500px] h-auto invert brightness-0 drop-shadow-2xl"
              priority
            />
          </div>

          <p ref={textRef} className="font-mona-narrow text-white/95 text-2xl md:text-3xl max-w-3xl leading-relaxed mt-4 drop-shadow-lg">
            We produce B2B video podcasts end to end. Strategy, on-location cinematic production, post-production, and distribution. The whole engine, one team, one monthly engagement.
          </p>

          <div ref={btnRef} className="pt-8">
            <Link
              href="https://b2b.media/#request"
              className="inline-flex items-center justify-center font-mona-narrow font-bold uppercase text-sm md:text-base tracking-widest text-white px-10 py-5 rounded-full bg-b2b-bright hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(255,102,0,0.5)]"
            >
              Book a discovery call
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
