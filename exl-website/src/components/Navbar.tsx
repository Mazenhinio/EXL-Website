'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '1rem 2.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease',
        background: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(200,241,53,0.1)' : 'none',
      }}
    >
      {/* Logo — EXL Icon */}
      <a
        href="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          textDecoration: 'none',
        }}
      >
        {/* Chartreuse rounded-square X icon */}
        <div
          style={{
            position: 'relative',
            width: '36px',
            height: '36px',
            flexShrink: 0,
            transition: 'transform 0.25s ease',
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLDivElement).style.transform = 'scale(1.08) rotate(-3deg)')
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLDivElement).style.transform = 'scale(1) rotate(0deg)')
          }
        >
          <Image
            src="/exl-icon.png"
            alt="EXL"
            fill
            sizes="36px"
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
        {/* Wordmark */}
        <Image
          src="/exl-logo-white.png"
          alt="EXL"
          width={52}
          height={20}
          style={{
            objectFit: 'contain',
            filter: 'brightness(0) invert(1)',
            opacity: 0.92,
          }}
          priority
        />
      </a>

      {/* Nav Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
        {['Services', 'About', 'Contact'].map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="label-text"
            style={{
              color: 'rgba(255,255,255,0.72)',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
              fontSize: '0.78rem',
              letterSpacing: '0.1em',
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLAnchorElement).style.color = '#C8F135')
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.72)')
            }
          >
            {link}
          </a>
        ))}

        <a
          href="#contact"
          id="nav-cta-book"
          style={{
            backgroundColor: '#C8F135',
            color: '#0A0A0A',
            padding: '0.55rem 1.35rem',
            borderRadius: '100px',
            fontFamily: 'var(--font-cabinet)',
            fontWeight: 700,
            fontSize: '0.78rem',
            letterSpacing: '0.06em',
            textDecoration: 'none',
            textTransform: 'uppercase',
            transition: 'background 0.2s ease, transform 0.2s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#d6ff40';
            (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.04)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#C8F135';
            (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)';
          }}
        >
          Book a call
        </a>
      </div>
    </nav>
  );
}
