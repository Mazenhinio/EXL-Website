'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Matter from 'matter-js'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const PILLS = [
  { text: 'STRATEGY', color: '#4C5F1B', textColor: '#DEFF00' },
  { text: 'PRODUCTION', color: '#B4B0A5', textColor: '#1a1a1a' },
  { text: 'SYSTEMS', color: '#B3E5FC', textColor: '#1a1a1a' },
  { text: 'PIPELINE', color: '#EF5411', textColor: '#ffffff' },
]

interface FooterProps {
  variant?: 'default' | 'dark' | 'b2b-red'
}

export default function Footer({ variant = 'default' }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const engineRef = useRef<Matter.Engine | null>(null)
  const pillsRef = useRef<{ body: Matter.Body; element: HTMLDivElement }[]>([])

  const isDark = variant === 'dark'
  const isB2BRed = variant === 'b2b-red'

  useEffect(() => {
    if (!sceneRef.current || !footerRef.current) return

    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger)

    const { Engine, Runner, Bodies, Composite, Mouse, MouseConstraint } = Matter

    const engine = Engine.create({
      gravity: { x: 0, y: 1, scale: 0.001 }
    })
    engineRef.current = engine

    // Get actual dimensions
    const width = sceneRef.current.offsetWidth
    const height = sceneRef.current.offsetHeight

    // Boundaries matching the footer exactly
    const ground = Bodies.rectangle(width / 2, height + 50, width + 1000, 100, { isStatic: true })
    const leftWall = Bodies.rectangle(-50, height / 2, 100, height + 1000, { isStatic: true })
    const rightWall = Bodies.rectangle(width + 50, height / 2, 100, height + 1000, { isStatic: true })
    const ceiling = Bodies.rectangle(width / 2, -50, width + 1000, 100, { isStatic: true })

    Composite.add(engine.world, [ground, leftWall, rightWall, ceiling])

    // Arrange pills in a DIAMOND formation
    const pillElements = sceneRef.current.querySelectorAll('.gravity-pill')
    const centerX = width / 2
    const centerY = height * 0.65

    pillElements.forEach((el, i) => {
      const element = el as HTMLDivElement
      const pWidth = element.offsetWidth || 180
      const pHeight = element.offsetHeight || 60
      
      let x = centerX
      let y = centerY

      // Precise Diamond Arrangement
      if (i === 0) { // TOP: STRATEGY
        x = centerX
        y = centerY - 110
      } else if (i === 1) { // LEFT: PRODUCTION
        x = centerX - 130
        y = centerY
      } else if (i === 2) { // RIGHT: SYSTEMS
        x = centerX + 130
        y = centerY
      } else if (i === 3) { // BOTTOM: PIPELINE
        x = centerX
        y = centerY + 110
      }

      const body = Bodies.rectangle(x, y, pWidth, pHeight, {
        chamfer: { radius: pHeight / 2 },
        restitution: 0.2,
        friction: 0.9,
        frictionStatic: 1.0,
        frictionAir: 0.05,
        density: 0.015,
      })

      Composite.add(engine.world, body)
      pillsRef.current.push({ body, element })
    })

    const runner = Runner.create()
    const mouse = Mouse.create(sceneRef.current)
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        damping: 0.1,
        render: { visible: false }
      }
    })

    Composite.add(engine.world, mouseConstraint)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mouse.element.removeEventListener("mousewheel", (mouse as any).mousewheel);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mouse.element.removeEventListener("DOMMouseScroll", (mouse as any).mousewheel);

    const st = ScrollTrigger.create({
      trigger: footerRef.current,
      start: 'top 85%',
      onEnter: () => {
        Runner.run(runner, engine)
      },
      once: true
    })

    const update = () => {
      pillsRef.current.forEach(({ body, element }) => {
        const { x, y } = body.position
        const angle = body.angle
        element.style.transform = `translate(${x - element.offsetWidth / 2}px, ${y - element.offsetHeight / 2}px) rotate(${angle}rad)`
      })
      requestAnimationFrame(update)
    }
    update()

    const handleResize = () => {
      if (!sceneRef.current) return
      const newWidth = sceneRef.current.offsetWidth
      const newHeight = sceneRef.current.offsetHeight
      
      Matter.Body.setPosition(ground, { x: newWidth / 2, y: newHeight + 50 })
      Matter.Body.setPosition(rightWall, { x: newWidth + 50, y: newHeight / 2 })
      Matter.Body.setPosition(leftWall, { x: -50, y: newHeight / 2 })
      Matter.Body.setPosition(ceiling, { x: newWidth / 2, y: -50 })
    }
    
    window.addEventListener('resize', handleResize)

    return () => {
      Engine.clear(engine)
      Runner.stop(runner)
      st.kill()
      window.removeEventListener('resize', handleResize)
      pillsRef.current = []
    }
  }, [])

  return (
    <div className={`${isDark ? 'bg-black' : isB2BRed ? 'bg-[#ff5500]' : 'bg-[#DEFF00]'} p-4 md:p-8 flex justify-center ${isDark ? '' : 'rounded-t-[3rem] lg:rounded-t-[5rem]'} -mt-16 md:-mt-20 relative z-30`}>
      <footer 
        ref={footerRef}
        className={`relative ${isDark ? 'bg-[#CEC5B7]' : 'bg-[#000000]'} ${isDark ? 'text-black' : 'text-white'} pt-16 pb-8 rounded-[40px] overflow-hidden min-h-[700px] w-full max-w-[1400px] flex flex-col shadow-2xl border ${isDark ? 'border-black/5' : 'border-white/5'}`}
      >
        <div className="relative z-[60] w-full px-10 pointer-events-none">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-8">
            <div className="space-y-10">
              <div className="space-y-6">
                <h2 style={{ fontFamily: 'var(--font-tusker)' }} className="text-[clamp(44px,6vw,72px)] leading-[1.1] uppercase">
                  Let&apos;s build something<br />
                  <span className={isDark ? 'text-black' : isB2BRed ? 'text-[#ff5500]' : 'text-[var(--chartreuse)]'}>worth watching.</span>
                </h2>
              </div>
            </div>

            <div className="space-y-12 pt-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                <div className="space-y-6">
                  <h4 className={`font-[var(--font-cabinet)] ${isDark ? 'text-black/30' : 'text-white/30'} text-[12px] tracking-widest uppercase`}>Services</h4>
                  <ul className="space-y-3 font-[var(--font-cabinet)] text-sm font-medium pointer-events-auto">
                    <li><Link href="/services" className={`transition-colors ${isDark ? 'hover:text-black/60' : isB2BRed ? 'hover:text-[#ff5500]' : 'hover:text-[var(--chartreuse)]'}`}>Services</Link></li>
                    <li><Link href="/integrated-marketing-management" className={`transition-colors ${isDark ? 'hover:text-black/60' : isB2BRed ? 'hover:text-[#ff5500]' : 'hover:text-[var(--chartreuse)]'}`}>Integrated Marketing Management</Link></li>
                    <li><Link href="/podcast-production" className={`transition-colors ${isDark ? 'hover:text-black/60' : isB2BRed ? 'hover:text-[#ff5500]' : 'hover:text-[var(--chartreuse)]'}`}>Podcast Production</Link></li>
                  </ul>
                </div>
                <div className="space-y-6">
                  <h4 className={`font-[var(--font-cabinet)] ${isDark ? 'text-black/30' : 'text-white/30'} text-[12px] tracking-widest uppercase`}>Company</h4>
                  <ul className="space-y-3 font-[var(--font-cabinet)] text-sm font-medium pointer-events-auto">
                    <li><Link href="/contact" className={`transition-colors ${isDark ? 'hover:text-black/60' : isB2BRed ? 'hover:text-[#ff5500]' : 'hover:text-[var(--chartreuse)]'}`}>Contact</Link></li>
                    <li><Link href="#best-in-b2b" className={`transition-colors ${isDark ? 'hover:text-black/60' : isB2BRed ? 'hover:text-[#ff5500]' : 'hover:text-[var(--chartreuse)]'}`}>Best in B2B</Link></li>
                  </ul>
                </div>
              </div>

              <div className={`pt-4 space-y-4 border-t ${isDark ? 'border-black/5' : 'border-white/5'} mt-8`}>
                <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2">
                  <p className="font-[var(--font-cabinet)] font-bold text-sm">EXL Ventures LLC</p>
                  <a href="mailto:info@exl.agency" className={`font-[var(--font-cabinet)] ${isDark ? 'text-black/50 hover:text-black' : isB2BRed ? 'text-white/50 hover:text-[#ff5500]' : 'text-white/50 hover:text-[var(--chartreuse)]'} transition-colors text-sm pointer-events-auto`}>
                    info@exl.agency
                  </a>
                </div>
                <p className={`font-[var(--font-cabinet)] ${isDark ? 'text-black/40' : 'text-white/40'} text-sm leading-tight max-w-xs`}>
                  A B2B consultancy and media production agency.<br />
                  825 Watters Creek Blvd, Building M, Suite 250, Allen, TX 75013
                </p>
                <p className={`text-[10px] font-[var(--font-tusker)] ${isDark ? 'text-black/20' : 'text-white/20'} tracking-widest uppercase`}>
                  © 2026 EXL Ventures LLC. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={`absolute left-0 right-0 bottom-0 z-0 px-10 pointer-events-none ${isDark ? 'opacity-20 grayscale brightness-0' : 'opacity-80'}`}>
          <div className="relative w-full h-[250px]">
            <Image 
              src="/assets/images/exl-logo-neon.webp"
              alt="EXL Neon Watermark"
              fill
              className="object-contain object-bottom"
            />
          </div>
        </div>

        <div 
          ref={sceneRef}
          className="absolute inset-0 z-50 cursor-grab active:cursor-grabbing overflow-hidden rounded-[40px]"
          style={{ touchAction: 'none' }}
        >
          {PILLS.map((pill, i) => (
            <div
              key={i}
              className="gravity-pill absolute pointer-events-none px-8 py-5 rounded-[40px] select-none shadow-2xl border border-black/10"
              style={{
                backgroundColor: pill.color,
                color: isDark && pill.textColor === '#ffffff' ? '#1a1a1a' : pill.textColor,
                fontFamily: 'var(--font-tusker)',
                fontSize: 'clamp(24px, 4vw, 50px)',
                whiteSpace: 'nowrap',
                lineHeight: 0.8,
                willChange: 'transform',
                zIndex: 60
              }}
            >
              {pill.text}
            </div>
          ))}
        </div>

      </footer>
    </div>
  )
}
