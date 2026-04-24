'use client';

import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax: video scrolls at 40% of page scroll speed
    const handleScroll = () => {
      if (videoRef.current) {
        const scrollY = window.scrollY;
        videoRef.current.style.transform = `translateY(${scrollY * 0.35}px) scale(1.12)`;
      }
      // Deepen overlay as user scrolls out of hero
      if (overlayRef.current && containerRef.current) {
        const heroHeight = containerRef.current.offsetHeight;
        const progress = Math.min(window.scrollY / (heroHeight * 0.6), 1);
        overlayRef.current.style.opacity = String(0.6 + progress * 0.4);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100dvh',
        minHeight: '600px',
        overflow: 'hidden',
        backgroundColor: '#0A0A0A',
      }}
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        src="/hero-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '115%',
          objectFit: 'cover',
          transform: 'scale(1.12)',
          transformOrigin: 'center top',
          zIndex: 0,
        }}
      />

      {/* Gradient overlay */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(160deg, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.65) 40%, rgba(10,10,10,0.92) 100%)',
          zIndex: 1,
        }}
      />

      {/* Subtle chartreuse glow top-right */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,241,53,0.06) 0%, transparent 70%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Hero Content */}
      <div
        style={{
          position: 'absolute',
          bottom: '9%',
          left: '5%',
          zIndex: 10,
          maxWidth: '820px',
          padding: '0 1rem 0 0',
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1.75rem',
            animation: 'fadeSlideUp 0.8s ease 0.1s both',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: '28px',
              height: '1px',
              backgroundColor: '#C8F135',
              flexShrink: 0,
            }}
          />
          <span
            className="label-text"
            style={{ color: '#C8F135', fontSize: '0.72rem', letterSpacing: '0.18em' }}
          >
            Dallas, Texas ✦ exl.agency
          </span>
        </div>

        {/* Main headline — CSS animation, no GSAP dependency */}
        <h1 style={{ marginBottom: '2rem' }}>
          <span
            style={{
              display: 'block',
              overflow: 'hidden',
              animation: 'revealLine 1s cubic-bezier(0.22,1,0.36,1) 0.15s both',
            }}
          >
            <span
              className="headline-hero"
              style={{ display: 'block', color: '#FFFFFF' }}
            >
              A B2B CONSULTANCY
            </span>
          </span>
          <span
            style={{
              display: 'block',
              overflow: 'hidden',
              animation: 'revealLine 1s cubic-bezier(0.22,1,0.36,1) 0.23s both',
            }}
          >
            <span
              className="headline-hero"
              style={{ display: 'block', color: '#FFFFFF' }}
            >
              WITH ITS OWN
            </span>
          </span>
          <span
            style={{
              display: 'block',
              overflow: 'hidden',
              animation: 'revealLine 1s cubic-bezier(0.22,1,0.36,1) 0.31s both',
            }}
          >
            <span
              className="headline-hero"
              style={{ display: 'block', color: '#C8F135' }}
            >
              PRODUCTION FLOOR.
            </span>
          </span>
        </h1>

        {/* Subhead */}
        <p
          className="body-text"
          style={{
            color: 'rgba(255,255,255,0.76)',
            maxWidth: '560px',
            marginBottom: '2.5rem',
            animation: 'fadeSlideUp 0.9s ease 0.55s both',
          }}
        >
          We advise, produce, build, and grow for ambitious B2B and luxury
          brands. Senior strategy, AI-native workflows, cinematic output. From
          Dallas, for clients across North America and the Middle East.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            animation: 'fadeSlideUp 0.9s ease 0.72s both',
          }}
        >
          <a
            href="#contact"
            id="hero-cta-book"
            className="btn-primary"
            style={{
              backgroundColor: '#C8F135',
              color: '#0A0A0A',
              padding: '0.9rem 2rem',
              borderRadius: '100px',
              fontFamily: 'var(--font-cabinet)',
              fontWeight: 700,
              fontSize: '0.875rem',
              letterSpacing: '0.06em',
              textDecoration: 'none',
              textTransform: 'uppercase',
              transition: 'all 0.25s ease',
              display: 'inline-block',
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

          <a
            href="#what-we-do"
            id="hero-cta-see"
            style={{
              backgroundColor: 'transparent',
              color: '#FFFFFF',
              padding: '0.9rem 2rem',
              borderRadius: '100px',
              border: '1.5px solid rgba(255,255,255,0.45)',
              fontFamily: 'var(--font-cabinet)',
              fontWeight: 700,
              fontSize: '0.875rem',
              letterSpacing: '0.06em',
              textDecoration: 'none',
              textTransform: 'uppercase',
              transition: 'all 0.25s ease',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = '#C8F135';
              (e.currentTarget as HTMLAnchorElement).style.color = '#C8F135';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.45)';
              (e.currentTarget as HTMLAnchorElement).style.color = '#FFFFFF';
            }}
          >
            See what we do ↓
          </a>
        </div>
      </div>

      {/* Scroll indicator — right edge */}
      <div
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          right: '4%',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          animation: 'fadeIn 1s ease 1.4s both',
        }}
      >
        <span
          className="label-text"
          style={{
            color: 'rgba(255,255,255,0.35)',
            fontSize: '0.62rem',
            writingMode: 'vertical-rl',
            letterSpacing: '0.22em',
          }}
        >
          SCROLL
        </span>
        <div
          style={{
            width: '1px',
            height: '52px',
            background: 'linear-gradient(to bottom, rgba(200,241,53,0.7), transparent)',
            animation: 'scrollPulse 2.4s ease-in-out infinite',
          }}
        />
      </div>

      <style jsx>{`
        @keyframes revealLine {
          from {
            transform: translateY(108%);
            opacity: 0;
          }
          to {
            transform: translateY(0%);
            opacity: 1;
          }
        }

        @keyframes fadeSlideUp {
          from {
            transform: translateY(22px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scrollPulse {
          0% { transform: scaleY(0); transform-origin: top; opacity: 1; }
          50% { transform: scaleY(1); transform-origin: top; opacity: 1; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
        }
      `}</style>
    </section>
  );
}
