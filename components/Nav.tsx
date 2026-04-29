'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      id="nav"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: 'var(--off-white)',
        borderBottom: scrolled
          ? '0.5px solid rgba(0,0,0,0.18)'
          : '0.5px solid rgba(0,0,0,0.08)',
        transition: 'border-color 0.3s ease',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 32px',
        justifyContent: 'space-between',
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
        <Image
          src="/assets/images/Exl_Logo_Black.png"
          alt="EXL"
          width={80}
          height={28}
          style={{ height: '28px', width: 'auto' }}
          priority
        />
      </Link>

      {/* Desktop Nav Links */}
      <div
        className="desktop-nav"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        {[
          { label: 'Services', href: '#' },
          { label: 'IMM', href: '/integrated-marketing-management' },
          { label: 'Podcast Production', href: '/podcast-production' },
          { label: 'Best in B2B', href: '#best-in-b2b' },
          { label: 'About', href: '#' },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            style={{
              fontFamily: "var(--font-tusker), sans-serif",
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--black)',
              opacity: 0.7,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = '1')}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = '0.7')}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Desktop Right */}
      <div
        className="desktop-right"
        style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
      >
        <span
          style={{
            fontFamily: "var(--font-tusker), sans-serif",
            fontSize: '13px',
            fontWeight: 500,
            color: 'var(--black)',
            opacity: 0.5,
            textTransform: 'uppercase',
            letterSpacing: '0.08em'
          }}
        >
          Call us
        </span>
        <Link
          href="/contact"
          id="nav-book-cta"
          style={{
            fontFamily: "var(--font-tusker), sans-serif",
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--black)',
            backgroundColor: 'var(--chartreuse)',
            padding: '8px 16px',
            display: 'inline-block',
          }}
        >
          Book a call
        </Link>

        {/* Mobile Hamburger */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
            padding: '4px',
          }}
        >
          <span style={{ display: 'block', width: '22px', height: '1px', background: 'var(--black)' }} />
          <span style={{ display: 'block', width: '22px', height: '1px', background: 'var(--black)' }} />
          <span style={{ display: 'block', width: '22px', height: '1px', background: 'var(--black)' }} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '56px',
            left: 0,
            right: 0,
            backgroundColor: 'var(--off-white)',
            borderBottom: '0.5px solid rgba(0,0,0,0.08)',
            padding: '24px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {[
            { label: 'Services', href: '#' },
            { label: 'IMM', href: '/integrated-marketing-management' },
            { label: 'Podcast Production', href: '/podcast-production' },
            { label: 'Best in B2B', href: '#best-in-b2b' },
            { label: 'About', href: '#' },
            { label: 'Book a call', href: '/contact' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "var(--font-cabinet), 'DM Sans', sans-serif",
                fontSize: '18px',
                fontWeight: 500,
                color: 'var(--black)',
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}

      <style jsx>{`
        @media (max-width: 767px) {
          nav {
            height: 52px !important;
            padding: 0 20px !important;
          }
        }
        @media (max-width: 1023px) {
          .desktop-nav {
            display: none !important;
          }
          .desktop-right span {
            display: none;
          }
          .hamburger {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  )
}
