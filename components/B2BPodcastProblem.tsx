'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const problems = [
  {
    title: 'Production Quality',
    description: 'A Zoom call with two heads in small boxes cannot compete with anything else your buyer watches in a day.',
    img: '/assets/images/b2b_prob_production.png'
  },
  {
    title: 'Format',
    description: 'Most B2B podcasts are built around the host, not the guest, which kills the reason a CMO would agree to appear in the first place.',
    img: '/assets/images/b2b_prob_format.png'
  },
  {
    title: 'Distribution',
    description: "Publishing an episode is not distribution, it's a file upload. Without a system that gets every episode in front of the right buyers, the show stays invisible.",
    img: '/assets/images/b2b_prob_distribution.png'
  }
]

export default function B2BPodcastProblem() {
  const containerRef = useRef<HTMLDivElement>(null)
  const pinSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.problem-item') as HTMLElement[]
      const images = gsap.utils.toArray('.problem-image') as HTMLElement[]

      // --- PINNED SCROLL INTERACTION ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinSectionRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 1,
        }
      })

      // Initial state
      gsap.set(items, { opacity: 0.2 })
      gsap.set(items[0], { opacity: 1 })
      gsap.set(images, { opacity: 0, scale: 1.05 })
      gsap.set(images[0], { opacity: 1, scale: 1 })

      // Animate from 1 to 2
      tl.to(items[0], { opacity: 0.2, duration: 1 }, 1)
      tl.to(images[0], { opacity: 0, scale: 1.05, duration: 1 }, 1)
      tl.to(items[1], { opacity: 1, duration: 1 }, 1)
      tl.to(images[1], { opacity: 1, scale: 1, duration: 1 }, 1)

      // Hold briefly
      tl.to({}, { duration: 0.5 })

      // Animate from 2 to 3
      tl.to(items[1], { opacity: 0.2, duration: 1 }, 3)
      tl.to(images[1], { opacity: 0, scale: 1.05, duration: 1 }, 3)
      tl.to(items[2], { opacity: 1, duration: 1 }, 3)
      tl.to(images[2], { opacity: 1, scale: 1, duration: 1 }, 3)
      
      // Hold at end before unpinning
      tl.to({}, { duration: 1 })


      // --- CONCLUSION TEXT SCRUB INTERACTION ---
      const words = gsap.utils.toArray('.conclusion-word') as HTMLElement[]
      
      gsap.fromTo(words, 
        { color: '#e5e5e5' }, // Very light gray starting color
        {
          color: (i, target) => target.dataset.highlight === 'true' ? '#bc3111' : '#000000',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.conclusion-section',
            start: 'top 85%',
            end: 'bottom 60%',
            scrub: true,
          }
        }
      )

    }, containerRef)
    return () => ctx.revert()
  }, [])

  const conclusionText = "We built our service to fix all three. Cinematic production, a guest-first format, and a distribution engine that turns every episode into weeks of content in the feeds of the buyers who matter."
  const orangeWords = ["Cinematic", "production,", "a", "guest-first", "format,", "and", "distribution", "engine"]

  return (
    <div ref={containerRef} className="w-full bg-white">
      {/* --- PINNED SECTION --- */}
      <section ref={pinSectionRef} className="w-full h-[100svh] bg-white overflow-hidden flex items-center relative">
        {/* Subtle Vertical Line Texture */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
          style={{
            backgroundImage: 'repeating-linear-gradient(to right, #000000 0px, #000000 1px, transparent 1px, transparent 60px)'
          }}
        ></div>
        
        <div className="relative z-10 w-full flex flex-col lg:flex-row items-center h-full">
          
          {/* Left: Images (Full Height, Half Width) */}
          <div className="w-full lg:w-1/2 h-[35vh] lg:h-full relative overflow-hidden shadow-[20px_0_50px_rgba(0,0,0,0.05)] z-20">
             {problems.map((prob, i) => (
               <div key={i} className="problem-image absolute inset-0 w-full h-full">
                 <Image src={prob.img} alt={prob.title} fill className="object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent"></div>
               </div>
             ))}
          </div>

          {/* Right: Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center h-[65vh] lg:h-full px-8 lg:px-24 xl:px-32">
            <span className="font-mona-narrow font-bold text-b2b-vivid-orange tracking-[0.2em] uppercase text-xs md:text-sm mb-4 block">
              The Problem We Solve
            </span>
            <h2 className="font-mona-narrow font-black text-3xl md:text-5xl lg:text-[64px] text-black leading-[1.05] tracking-tight uppercase mb-8 lg:mb-12">
              Most B2B podcasts fail for the same three reasons.
            </h2>

            <div className="flex flex-col gap-6 lg:gap-8">
              {problems.map((prob, idx) => (
                <div key={idx} className="problem-item flex flex-col">
                  <div className="flex items-start gap-4">
                    <span className="font-mona-narrow font-black text-2xl md:text-4xl text-black/10 mt-1 select-none">
                      0{idx + 1}
                    </span>
                    <div>
                      <h3 className="font-mona-narrow font-bold text-3xl md:text-4xl lg:text-5xl text-black mb-4">
                        {prob.title}.
                      </h3>
                      <p className="font-mona-narrow text-gray-600 text-xl md:text-2xl lg:text-3xl leading-relaxed font-light">
                        {prob.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- CONCLUSION BANNER --- */}
      <section className="conclusion-section w-full bg-white py-24 lg:py-40 relative z-20">
        <div className="w-full px-6 lg:px-12 flex justify-center">
          <div className="w-full max-w-6xl text-center">
            <p className="font-mona-narrow text-2xl md:text-4xl lg:text-[48px] leading-[1.3] font-medium flex flex-wrap justify-center gap-x-[0.25em] gap-y-2">
              {conclusionText.split(" ").map((word, i) => (
                <span 
                  key={i} 
                  className="conclusion-word text-[#e5e5e5] transition-colors duration-100"
                  data-highlight={orangeWords.includes(word)}
                >
                  {word}
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
