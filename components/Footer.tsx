'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Matter from 'matter-js'

const PILLS = [
  { text: 'STRATEGY', color: '#4C5F1B', textColor: '#DEFF00' },
  { text: 'PRODUCTION', color: '#B4B0A5', textColor: '#1a1a1a' },
  { text: 'SYSTEMS', color: '#B3E5FC', textColor: '#1a1a1a' },
  { text: 'PIPELINE', color: '#EF5411', textColor: '#ffffff' },
]

export default function Footer() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const engineRef = useRef<Matter.Engine | null>(null)
  const pillsRef = useRef<{ body: Matter.Body; element: HTMLDivElement }[]>([])

  useEffect(() => {
    if (!sceneRef.current) return

    const { Engine, Runner, Bodies, Composite, Mouse, MouseConstraint } = Matter

    const engine = Engine.create({
      gravity: { x: 0, y: 1, scale: 0.001 }
    })
    engineRef.current = engine

    const width = sceneRef.current.clientWidth || 1300
    const height = sceneRef.current.clientHeight || 350

    // Boundaries matching the rounded container - thick walls to prevent escaping
    const ground = Bodies.rectangle(width / 2, height + 500, width + 2000, 1000, { isStatic: true })
    const leftWall = Bodies.rectangle(-500, height / 2, 1000, height + 2000, { isStatic: true })
    const rightWall = Bodies.rectangle(width + 500, height / 2, 1000, height + 2000, { isStatic: true })
    const ceiling = Bodies.rectangle(width / 2, -500, width + 2000, 1000, { isStatic: true })

    Composite.add(engine.world, [ground, leftWall, rightWall, ceiling])

    // Create pill bodies in a Cross Formation
    const pillElements = sceneRef.current.querySelectorAll('.gravity-pill')
    const centerX = width / 2
    const centerY = height - 120

    pillElements.forEach((el, i) => {
      const element = el as HTMLDivElement
      const pWidth = element.offsetWidth || 150
      const pHeight = element.offsetHeight || 50
      
      let x = centerX
      let y = centerY

      if (i === 0) { // BASE
        x = centerX
        y = centerY
      } else if (i === 1) { // LEFT
        x = centerX - 180
        y = centerY - 60
      } else if (i === 2) { // RIGHT
        x = centerX + 180
        y = centerY - 60
      } else if (i === 3) { // TOP
        x = centerX
        y = centerY - 120
      }

      const body = Bodies.rectangle(x, y, pWidth, pHeight, {
        chamfer: { radius: pHeight / 2 },
        restitution: 0.5,
        friction: 0.1,
        density: 0.01,
        angle: 0
      })

      Composite.add(engine.world, body)
      pillsRef.current.push({ body, element })
    })

    const runner = Runner.create()
    Runner.run(runner, engine)

    const mouse = Mouse.create(sceneRef.current)
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.6,
        damping: 0.1,
        render: { visible: false }
      }
    })

    Composite.add(engine.world, mouseConstraint)

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
      const newWidth = sceneRef.current.clientWidth
      const newHeight = sceneRef.current.clientHeight
      Matter.Body.setPosition(ground, { x: newWidth / 2, y: newHeight + 40 })
      Matter.Body.setPosition(rightWall, { x: newWidth + 40, y: newHeight / 2 })
    }
    window.addEventListener('resize', handleResize)

    return () => {
      Engine.clear(engine)
      Runner.stop(runner)
      window.removeEventListener('resize', handleResize)
      pillsRef.current = []
    }
  }, [])

  return (
    <div className="bg-[#DEFF00] p-4 md:p-8 flex justify-center">
      <footer className="relative bg-[#000000] text-white pt-16 pb-8 rounded-[40px] overflow-hidden min-h-[700px] w-full max-w-[1100px] flex flex-col shadow-2xl border border-white/5">
        <div className="relative z-10 w-full px-10">
          {/* TOP CONTENT GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-8">
            
            {/* Left Column */}
            <div className="space-y-10">
              <div className="space-y-6">
                <h2 style={{ fontFamily: 'var(--font-tusker)' }} className="text-[clamp(44px,6vw,72px)] leading-[1.1] uppercase">
                  Let&apos;s build something<br />
                  <span className="text-[var(--chartreuse)]">worth watching.</span>
                </h2>
                <p className="font-[var(--font-cabinet)] text-white/70 text-lg max-w-md leading-relaxed">
                  Book a 20-minute call. No deck, no pitch. Just a conversation about what you&apos;re trying to ship.
                </p>
              </div>
            </div>

            {/* Right Column (Links + Address) */}
            <div className="space-y-12 pt-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                <div className="space-y-6">
                  <h4 className="font-[var(--font-cabinet)] text-white/30 text-[12px] tracking-widest uppercase">Services</h4>
                  <ul className="space-y-3 font-[var(--font-cabinet)] text-sm font-medium">
                    <li><Link href="/services" className="hover:text-[var(--chartreuse)] transition-colors">Services</Link></li>
                    <li><Link href="/integrated-marketing-management" className="hover:text-[var(--chartreuse)] transition-colors">Integrated Marketing Management</Link></li>
                    <li><Link href="/podcast-production" className="hover:text-[var(--chartreuse)] transition-colors">Podcast Production</Link></li>
                  </ul>
                </div>
                <div className="space-y-6">
                  <h4 className="font-[var(--font-cabinet)] text-white/30 text-[12px] tracking-widest uppercase">Company</h4>
                  <ul className="space-y-3 font-[var(--font-cabinet)] text-sm font-medium">
                    <li><Link href="#insights" className="hover:text-[var(--chartreuse)] transition-colors">Insights</Link></li>
                    <li><Link href="#about" className="hover:text-[var(--chartreuse)] transition-colors">About</Link></li>
                    <li><Link href="#contact" className="hover:text-[var(--chartreuse)] transition-colors">Contact</Link></li>
                    <li><Link href="#best-in-b2b" className="hover:text-[var(--chartreuse)] transition-colors">Best in B2B</Link></li>
                  </ul>
                </div>
                <div className="space-y-6">
                  <h4 className="font-[var(--font-cabinet)] text-white/30 text-[12px] tracking-widest uppercase">Social</h4>
                  <ul className="space-y-3 font-[var(--font-cabinet)] text-sm font-medium">
                    <li><Link href="#" className="hover:text-[var(--chartreuse)] transition-colors">LinkedIn</Link></li>
                    <li><Link href="#" className="hover:text-[var(--chartreuse)] transition-colors">YouTube</Link></li>
                    <li><Link href="#" className="hover:text-[var(--chartreuse)] transition-colors">Instagram</Link></li>
                  </ul>
                </div>
              </div>

              {/* COMPANY INFO + EMAIL */}
              <div className="pt-4 space-y-4 border-t border-white/5 mt-8">
                <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2">
                  <p className="font-[var(--font-cabinet)] font-bold text-sm">EXL Ventures LLC</p>
                  <a href="mailto:info@exl.agency" className="font-[var(--font-cabinet)] text-white/50 hover:text-[var(--chartreuse)] transition-colors text-sm">
                    info@exl.agency
                  </a>
                </div>
                <p className="font-[var(--font-cabinet)] text-white/40 text-sm leading-tight max-w-xs">
                  A B2B consultancy and media production studio.<br />
                  825 Watters Creek Blvd, Building M, Suite 250, Allen, TX 75013
                </p>
                <p className="text-[10px] font-[var(--font-tusker)] text-white/20 tracking-widest uppercase">
                  © 2026 EXL Ventures LLC. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* MASSIVE BACKGROUND NEON LOGO */}
        <div className="absolute left-0 right-0 bottom-0 z-10 px-10 pointer-events-none opacity-80">
          <div className="relative w-full h-[250px]">
            <Image 
              src="/assets/images/exl-logo-neon.png"
              alt="EXL Neon Watermark"
              fill
              className="object-contain object-bottom"
            />
          </div>
        </div>

        {/* FULL-AREA GRAVITY PILLS CONTAINER */}
        <div 
          ref={sceneRef}
          className="absolute inset-0 z-20 cursor-grab active:cursor-grabbing overflow-hidden rounded-[40px]"
          style={{ touchAction: 'none' }}
        >
          {PILLS.map((pill, i) => (
            <div
              key={i}
              className="gravity-pill absolute pointer-events-none px-8 py-5 rounded-[40px] select-none shadow-2xl border border-black/10"
              style={{
                backgroundColor: pill.color,
                color: pill.textColor,
                fontFamily: 'var(--font-tusker)',
                fontSize: 'clamp(24px, 4vw, 60px)',
                whiteSpace: 'nowrap',
                lineHeight: 0.8,
                willChange: 'transform',
                zIndex: 30
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
