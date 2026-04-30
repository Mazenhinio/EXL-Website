'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [cursorType, setCursorType] = useState<'default' | 'nav' | 'click'>('default')

  useEffect(() => {
    const loadGsap = async () => {
      const { gsap } = await import('gsap')
      
      const cursor = cursorRef.current
      if (!cursor) return

      const moveCursor = (e: MouseEvent) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: 'power2.out'
        })
      }

      const handleMouseEnter = (e: MouseEvent) => {
        const target = e.currentTarget as HTMLElement
        const isNav = !!target.closest('nav')
        setCursorType(isNav ? 'nav' : 'click')
      }
      const handleMouseLeave = () => setCursorType('default')

      window.addEventListener('mousemove', moveCursor)
      
      const refreshClickables = () => {
        const clickables = document.querySelectorAll('a, button, [role="button"], .blueprint-tile, .group')
        clickables.forEach(link => {
          link.addEventListener('mouseenter', handleMouseEnter as EventListener)
          link.addEventListener('mouseleave', handleMouseLeave as EventListener)
        })
      }

      refreshClickables()
      // Refresh periodically for dynamic content
      const interval = setInterval(refreshClickables, 2000)

      return () => {
        window.removeEventListener('mousemove', moveCursor)
        clearInterval(interval)
      }
    }
    loadGsap()
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: cursorType === 'nav' ? '120px' : cursorType === 'click' ? '80px' : '20px',
          height: cursorType === 'nav' ? '40px' : cursorType === 'click' ? '80px' : '20px',
          backgroundColor: 'var(--chartreuse)',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: cursorType === 'nav' ? 'multiply' : 'normal',
          borderRadius: cursorType === 'click' ? '50%' : '0px',
          transition: 'width 0.3s, height 0.3s, border-radius 0.3s, mix-blend-mode 0.3s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        {cursorType === 'click' && (
          <span style={{ 
            fontFamily: 'var(--font-tusker)', 
            fontSize: '14px', 
            fontWeight: 600, 
            color: 'black',
            letterSpacing: '0.05em'
          }}>
            CLICK
          </span>
        )}
      </div>
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        @media (max-width: 1023px) {
          * {
            cursor: auto !important;
          }
          div[style*="zIndex: 9999"] {
            display: none !important;
          }
        }
      `}</style>
    </>
  )
}
