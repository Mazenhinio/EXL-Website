'use client'

import { useEffect, useRef } from 'react'

export default function CredibilityLine() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadGsap = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (!ref.current) return
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
          },
        }
      )
    }
    loadGsap()
  }, [])

  return (
    <div
      style={{
        backgroundColor: 'var(--eerie)',
        padding: '18px 32px',
        borderTop: '0.5px solid rgba(255,255,255,0.06)',
      }}
    >
      <p
        ref={ref}
        style={{
          fontFamily: "var(--font-cabinet), 'DM Sans', sans-serif",
          fontWeight: 300,
          fontSize: '18px',
          lineHeight: 1.65,
          color: 'rgba(255,255,255,0.5)',
          maxWidth: '720px',
          opacity: 0,
        }}
      >
        Trusted to run the marketing function for{' '}
        <span style={{ color: 'rgba(255,255,255,0.8)' }}>
          a flagship IHG resort property
        </span>
        , and to produce{' '}
        <span style={{ color: 'rgba(255,255,255,0.8)' }}>Best in B2B</span>, the
        only B2B podcast filmed on location across Dallas-Fort Worth.
      </p>

      <style jsx>{`
        @media (max-width: 767px) {
          div {
            padding: 18px 20px !important;
          }
        }
      `}</style>
    </div>
  )
}
