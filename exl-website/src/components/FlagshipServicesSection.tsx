'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 'imm',
    img: '/imm-card.png',
    label: 'FLAGSHIP SERVICE',
    title: 'INTEGRATED MARKETING MANAGEMENT.',
    desc: 'Your marketing department, on retainer. Strategy, online presence, PR coordination, social oversight, collateral, influencer programs, and vendor management — all run by one accountable team.',
    cta: 'Explore Integrated Marketing Management',
    href: '/integrated-marketing-management',
    bg: '#0A0A0A',
    textColor: '#FFFFFF',
    labelColor: 'rgba(255,255,255,0.45)',
    ctaColor: '#C8F135',
    animateFrom: 'left',
  },
  {
    id: 'podcast',
    img: '/podcast-card.png',
    label: 'FLAGSHIP SERVICE',
    title: 'B2B VIDEO PODCAST PRODUCTION.',
    desc: 'A cinematic B2B video podcast that builds pipeline, not just downloads. We run the show end to end: strategy, guest pipeline, on-location production, post-production, and distribution.',
    cta: 'Explore Podcast Production',
    href: '/podcast-production',
    bg: '#C8F135',
    textColor: '#0A0A0A',
    labelColor: 'rgba(10,10,10,0.5)',
    ctaColor: '#0A0A0A',
    animateFrom: 'right',
  },
];

export default function FlagshipServicesSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cardRefs = [card1Ref, card2Ref];

    // Headline scroll+fade reveal
    if (headlineRef.current) {
      gsap.fromTo(
        headlineRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 85%',
            end: 'top 40%',
            scrub: 1,
          },
        }
      );
    }

    // Card — iPhone app-open expand animation
    cardRefs.forEach((ref, i) => {
      if (!ref.current) return;
      const fromX =
        services[i].animateFrom === 'left' ? '-30%' : '30%';

      gsap.fromTo(
        ref.current,
        {
          scale: 0.06,
          opacity: 0,
          x: fromX,
        },
        {
          scale: 1,
          opacity: 1,
          x: 0,
          ease: 'back.out(1.2)',
          duration: 1.2,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
            end: 'top 30%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      id="flagship-services"
      style={{
        backgroundColor: '#0A0A0A',
        padding: 'clamp(5rem, 8vw, 10rem) 5%',
      }}
    >
      {/* Section headline */}
      <div style={{ marginBottom: 'clamp(4rem, 7vw, 8rem)', textAlign: 'center', position: 'relative' }}>
        {/* Ghost star floater */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '5%',
            top: '-1rem',
            width: 'clamp(60px, 8vw, 120px)',
            aspectRatio: '1 / 1',
            opacity: 0.08,
            pointerEvents: 'none',
            transform: 'rotate(15deg)',
            animation: 'spinSlow 20s linear infinite',
          }}
        >
          <Image src="/icon-star.png" alt="" fill style={{ objectFit: 'contain' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
          <Image src="/icon-star.png" alt="" width={18} height={18}
            style={{ objectFit: 'contain', opacity: 0.9 }}
          />
          <p className="label-text" style={{ color: '#C8F135' }}>
            Flagship Services
          </p>
          <Image src="/icon-star.png" alt="" width={18} height={18}
            style={{ objectFit: 'contain', opacity: 0.9 }}
          />
        </div>

        <h2
          ref={headlineRef}
          className="headline-section"
          style={{
            color: 'var(--white)',
            fontSize: 'clamp(2.5rem, 7vw, 7rem)',
          }}
        >
          TWO ENGAGEMENTS
          <br />
          WE&apos;RE KNOWN FOR.
        </h2>
        <p
          className="body-text"
          style={{
            color: 'rgba(255,255,255,0.55)',
            maxWidth: '520px',
            margin: '2rem auto 0',
          }}
        >
          Most EXL clients start with one of these two offers. Both combine our
          four capabilities into a single monthly engagement, led by a senior
          partner, delivered by our in-house team.
        </p>
      </div>

      <style jsx>{`
        @keyframes spinSlow {
          from { transform: rotate(15deg); }
          to { transform: rotate(375deg); }
        }
      `}</style>

      {/* Two staggered cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          alignItems: 'start',
        }}
      >
        <div
          ref={card1Ref}
          style={{
            backgroundColor: services[0].bg,
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.08)',
            willChange: 'transform, opacity',
            transformOrigin: 'center center',
          }}
        >
          <CardContent service={services[0]} />
        </div>

        <div
          ref={card2Ref}
          style={{
            marginTop: 'clamp(3rem, 5vw, 6rem)',
            backgroundColor: services[1].bg,
            borderRadius: '20px',
            overflow: 'hidden',
            willChange: 'transform, opacity',
            transformOrigin: 'center center',
          }}
        >
          <CardContent service={services[1]} />
        </div>
      </div>
    </section>
  );
}

function CardContent({ service }: { service: (typeof services)[0] }) {
  return (
    <>
      {/* Image */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/9',
          overflow: 'hidden',
        }}
      >
        <Image
          src={service.img}
          alt={service.title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="45vw"
        />
      </div>

      {/* Content */}
      <div style={{ padding: 'clamp(1.75rem, 3vw, 2.5rem)' }}>
        <p
          className="label-text"
          style={{
            color: service.labelColor,
            marginBottom: '0.75rem',
            fontSize: '0.7rem',
          }}
        >
          {service.label}
        </p>
        <h3
          className="headline-card"
          style={{
            color: service.textColor,
            marginBottom: '1rem',
            fontSize: 'clamp(1.4rem, 2.5vw, 2.5rem)',
          }}
        >
          {service.title}
        </h3>
        <p
          className="body-text"
          style={{
            color:
              service.id === 'podcast'
                ? 'rgba(10,10,10,0.72)'
                : 'rgba(255,255,255,0.65)',
            marginBottom: '1.75rem',
            fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)',
          }}
        >
          {service.desc}
        </p>
        <a
          href={service.href}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: 'var(--font-cabinet)',
            fontWeight: 700,
            fontSize: '0.875rem',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: service.ctaColor,
            textDecoration: 'none',
            transition: 'gap 0.2s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.gap = '1rem';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.gap = '0.5rem';
          }}
        >
          {service.cta} →
        </a>
      </div>
    </>
  );
}
