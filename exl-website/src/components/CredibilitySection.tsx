'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TICKER_TEXT =
  'Trusted to run the marketing function for a flagship IHG resort property, and to produce Best in B2B, the only B2B podcast filmed on location across Dallas-Fort Worth.';

export default function CredibilitySection() {
  const bandRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bandRef.current || !trackRef.current) return;

    // Slide-in entry from right
    gsap.fromTo(
      bandRef.current,
      { x: '100%', opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: bandRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Autonomous marquee animation
    const track = trackRef.current;
    const totalWidth = track.scrollWidth / 3; // 3 clones

    const anim = gsap.to(track, {
      x: `-=${totalWidth}`,
      duration: 65,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x: number) => {
          return x % -totalWidth;
        }),
      },
    });

    // Pause on hover
    const pauseAnim = () => anim.pause();
    const resumeAnim = () => anim.play();
    bandRef.current.addEventListener('mouseenter', pauseAnim);
    bandRef.current.addEventListener('mouseleave', resumeAnim);

    return () => {
      anim.kill();
      bandRef.current?.removeEventListener('mouseenter', pauseAnim);
      bandRef.current?.removeEventListener('mouseleave', resumeAnim);
    };
  }, []);

  return (
    <section
      id="credibility"
      style={{
        backgroundColor: '#0A0A0A',
        overflow: 'hidden',
        height: '140px',
        display: 'flex',
        alignItems: 'center',
        borderTop: '1px solid rgba(200,241,53,0.12)',
        borderBottom: '1px solid rgba(200,241,53,0.12)',
      }}
    >
      <div
        ref={bandRef}
        style={{
          width: '100%',
          overflow: 'hidden',
          cursor: 'default',
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: '0',
            whiteSpace: 'nowrap',
            willChange: 'transform',
          }}
        >
          {[0, 1, 2].map((clone) => (
            <span
              key={clone}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2.5rem',
                paddingRight: '2.5rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-tusker)',
                  fontWeight: 600,
                  fontSize: 'clamp(1.8rem, 2.8vw, 2.8rem)',
                  textTransform: 'uppercase',
                  color: clone === 0 ? '#C8F135' : '#FFFFFF',
                  letterSpacing: '0.01em',
                  lineHeight: 1,
                }}
              >
                {TICKER_TEXT}
              </span>
              <span
                style={{
                  color: '#C8F135',
                  fontSize: '1.4rem',
                  opacity: 0.7,
                  flexShrink: 0,
                }}
              >
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
