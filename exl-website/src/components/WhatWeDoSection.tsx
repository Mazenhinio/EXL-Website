'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    id: 'advise',
    num: '01',
    title: 'ADVISE.',
    body: 'Positioning, brand, and go-to-market strategy from a team that has built businesses across three continents. We sit in the room before we pick up a camera.',
    bg: '#0A0A0A',
    textColor: '#FFFFFF',
    headingColor: '#C8F135',
    numColor: 'rgba(200,241,53,0.06)',
    img: '/advise-card.png',
  },
  {
    id: 'produce',
    num: '02',
    title: 'PRODUCE.',
    body: 'Podcasts, video, and social content shot in-house from our Dallas studio. Every frame shot and lit the way a film crew would. Every sound captured the way a record label would. B2B that looks like media.',
    bg: '#C8F135',
    textColor: '#0A0A0A',
    headingColor: '#0A0A0A',
    numColor: 'rgba(10,10,10,0.07)',
    img: '/produce-card.png',
  },
  {
    id: 'build',
    num: '03',
    title: 'BUILD.',
    body: 'Projects, launches, and integrated campaigns executed end to end. A new brand identity. A product launch. A website tied to a campaign moment. We scope it, build it, ship it, measure it.',
    bg: '#0A0A0A',
    textColor: '#FFFFFF',
    headingColor: '#C8F135',
    numColor: 'rgba(200,241,53,0.06)',
    img: '/build-card.png',
  },
  {
    id: 'grow',
    num: '04',
    title: 'GROW.',
    body: 'Partnerships, channels, and distribution systems that turn content into pipeline. Because strategy and production don\'t matter if no one sees the work.',
    bg: '#C8F135',
    textColor: '#0A0A0A',
    headingColor: '#0A0A0A',
    numColor: 'rgba(10,10,10,0.07)',
    img: '/grow-card.png',
  },
];

export default function WhatWeDoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

    // Each card gets a scroll-scrubbed scale+blur animation
    cards.forEach((card, i) => {
      if (i === cards.length - 1) return; // last card doesn't need to scale down

      ScrollTrigger.create({
        trigger: cards[i + 1],
        start: 'top bottom',
        end: 'top 10%',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const scaleVal = 1 - progress * 0.08;
          const blurVal = progress * 4;
          const yVal = -progress * 24;
          gsap.set(card, {
            scale: scaleVal,
            filter: `blur(${blurVal}px)`,
            y: yVal,
            transformOrigin: 'center center',
          });
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="what-we-do"
      style={{ backgroundColor: 'var(--black)', position: 'relative' }}
    >
      {/* Section intro */}
      <div
        style={{
          padding: '7rem 5% 4rem',
          maxWidth: '900px',
          position: 'relative',
        }}
      >
        {/* Exclamation icon — floating top-right of intro block */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '4rem',
            right: '0',
            width: 'clamp(48px, 6vw, 80px)',
            height: 'auto',
            aspectRatio: '1 / 2.5',
            opacity: 0.18,
            pointerEvents: 'none',
            transform: 'rotate(8deg)',
          }}
        >
          <Image src="/icon-exclamation.png" alt="" fill style={{ objectFit: 'contain' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <Image src="/icon-exclamation.png" alt="" width={10} height={24}
            style={{ objectFit: 'contain', opacity: 0.9 }}
          />
          <p className="label-text" style={{ color: '#C8F135' }}>
            What We Do
          </p>
        </div>

        <h2
          className="headline-section"
          style={{ color: 'var(--white)', marginBottom: '1.5rem' }}
        >
          ONE FIRM.
          <br />
          FOUR CAPABILITIES.
          <br />
          NO HANDOFFS.
        </h2>
        <p
          className="body-text"
          style={{
            color: 'rgba(255,255,255,0.65)',
            maxWidth: '520px',
            lineHeight: 1.7,
          }}
        >
          Most B2B brands juggle a strategy firm, an agency, a dev shop, and a
          freelancer. We built EXL so you don&apos;t have to.
        </p>
      </div>

      {/* Stacking cards */}
      <div
        style={{
          position: 'relative',
        }}
      >
        {capabilities.map((cap, i) => (
          <div
            key={cap.id}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            style={{
              position: 'sticky',
              top: `${i * 16}px`,
              backgroundColor: cap.bg,
              minHeight: '85vh',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              overflow: 'hidden',
              boxShadow: '0 -12px 60px rgba(0,0,0,0.5)',
              willChange: 'transform, filter',
              zIndex: 10 + i,
            }}
          >
            {/* Left: content */}
            <div
              style={{
                padding: 'clamp(3rem, 6vw, 6rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 2,
              }}
            >
              {/* Ghost numeral */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  right: '-0.5rem',
                  bottom: '-2rem',
                  fontFamily: 'var(--font-tusker)',
                  fontWeight: 600,
                  fontSize: 'clamp(12rem, 22vw, 22rem)',
                  lineHeight: 1,
                  color: cap.numColor,
                  userSelect: 'none',
                  pointerEvents: 'none',
                  letterSpacing: '-0.04em',
                }}
              >
                {cap.num}
              </div>

              <p
                className="label-text"
                style={{ color: cap.headingColor, marginBottom: '1.5rem', opacity: 0.6 }}
              >
                {cap.num} / 04
              </p>

              <h3
                className="headline-card"
                style={{
                  color: cap.headingColor,
                  marginBottom: '2rem',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                {cap.title}
              </h3>

              <p
                className="body-text"
                style={{
                  color: cap.id === 'produce' || cap.id === 'grow'
                    ? 'rgba(10,10,10,0.75)'
                    : 'rgba(255,255,255,0.72)',
                  maxWidth: '420px',
                  lineHeight: 1.7,
                  marginBottom: '3rem',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                {cap.body}
              </p>

              <a
                href={`#${cap.id}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'var(--font-cabinet)',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  color:
                    cap.id === 'produce' || cap.id === 'grow'
                      ? '#0A0A0A'
                      : '#C8F135',
                  textDecoration: 'none',
                  transition: 'gap 0.2s ease',
                  position: 'relative',
                  zIndex: 2,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.gap = '1rem';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.gap = '0.5rem';
                }}
              >
                Explore {cap.title.replace('.', '')} →
              </a>
            </div>

            {/* Right: image */}
            <div
              style={{
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Image
                src={cap.img}
                alt={cap.title}
                fill
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                  transition: 'transform 0.6s ease',
                }}
                sizes="50vw"
              />
              {/* Gradient overlay on image */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    cap.id === 'produce' || cap.id === 'grow'
                      ? 'linear-gradient(to right, rgba(200,241,53,0.3) 0%, transparent 50%)'
                      : 'linear-gradient(to right, rgba(10,10,10,0.4) 0%, transparent 50%)',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
