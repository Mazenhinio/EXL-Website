'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const phrases = ['SENIOR-LED', 'AI-NATIVE', 'BUILT FOR IMPACT'];

const pillarCards = [
  {
    num: '01',
    bg: '#0A0A0A',
    headingColor: '#FFFFFF',
    bodyColor: 'rgba(255,255,255,0.7)',
    title: 'SENIOR STRATEGY, NOT JUNIOR EXECUTION',
    body: 'Every engagement is led by a founder with international consulting experience across three continents. You get the senior thinking the big firms charge for, without the layers between you and the person actually solving your problem.',
  },
  {
    num: '02',
    bg: '#C8F135',
    headingColor: '#0A0A0A',
    bodyColor: 'rgba(10,10,10,0.72)',
    title: 'AI-NATIVE, SO YOUR TIMELINE ISN\'T A PROBLEM',
    body: 'We built our production and content stack on AI from day one. A lean Dallas team ships in weeks what traditional agencies ship in quarters. You move at the pace of your market, not the pace of your agency.',
  },
  {
    num: '03',
    bg: '#0A0A0A',
    headingColor: '#FFFFFF',
    bodyColor: 'rgba(255,255,255,0.7)',
    title: 'ENGINEERED FOR IMPACT, TOP TO BOTTOM',
    body: 'Every decision, from the strategy brief to the lens choice on the shoot, runs through one filter: will this move the number? We build marketing that\'s accountable from planning through delivery, and we own the outcome end to end.',
  },
];

export default function EXLAdvantageSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const exlTextRef = useRef<SVGTextElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const typewriterRef = useRef<HTMLSpanElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const phrase = phrases[currentPhrase];

    if (!isDeleting) {
      if (displayed.length < phrase.length) {
        timeout = setTimeout(() => {
          setDisplayed(phrase.slice(0, displayed.length + 1));
        }, 70);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 1200);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, 45);
      } else {
        setIsDeleting(false);
        setCurrentPhrase((prev) => (prev + 1) % phrases.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, currentPhrase]);

  // SVG letterform zoom on scroll
  useEffect(() => {
    if (!sectionRef.current || !svgRef.current) return;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=60%',
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        // Zoom into the X — viewBox starts at "0 0 900 300", zooms into center
        const startVB = [0, 0, 900, 300];
        const endVB = [260, 60, 380, 180];
        const vb = startVB.map(
          (s, idx) => s + (endVB[idx] - s) * Math.min(progress * 2, 1)
        );
        if (svgRef.current) {
          svgRef.current.setAttribute(
            'viewBox',
            `${vb[0]} ${vb[1]} ${vb[2]} ${vb[3]}`
          );
          // Fade out as zoom completes
          svgRef.current.style.opacity = String(
            1 - Math.min((progress - 0.5) * 2, 1)
          );
        }
      },
    });

    // Angled card entries
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        {
          y: '60%',
          rotate: 5,
          opacity: 0,
        },
        {
          y: 0,
          rotate: 0,
          opacity: 1,
          ease: 'expo.out',
          duration: 1,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 35%',
            scrub: false,
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section ref={sectionRef} id="exl-advantage" style={{ backgroundColor: '#0A0A0A' }}>
      {/* Phase 1 — Full-viewport EXL letterform */}
      <div
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <svg
          ref={svgRef}
          viewBox="0 0 900 300"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            width: '100%',
            height: '100%',
            transition: 'opacity 0.1s linear',
          }}
          aria-hidden="true"
        >
          <text
            ref={exlTextRef}
            x="450"
            y="260"
            textAnchor="middle"
            fontFamily="'TuskerGrotesk', Impact, sans-serif"
            fontWeight={600}
            fontSize="280"
            fill="#FFFFFF"
            letterSpacing="-8"
          >
            EXL
          </text>
        </svg>
      </div>

      {/* Phase 2 — Typewriter headline */}
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '5rem 5%',
          textAlign: 'center',
          flexDirection: 'column',
          gap: '2rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ghost percent — massive background decoration */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '-5%',
            bottom: '-10%',
            width: 'clamp(200px, 30vw, 420px)',
            aspectRatio: '1 / 1',
            opacity: 0.05,
            pointerEvents: 'none',
            transform: 'rotate(-12deg)',
          }}
        >
          <Image src="/icon-percent.png" alt="" fill style={{ objectFit: 'contain' }} />
        </div>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '-8%',
            top: '10%',
            width: 'clamp(140px, 20vw, 280px)',
            aspectRatio: '1 / 1',
            opacity: 0.04,
            pointerEvents: 'none',
            transform: 'rotate(20deg)',
          }}
        >
          <Image src="/icon-percent.png" alt="" fill style={{ objectFit: 'contain' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
          <Image src="/icon-percent.png" alt="" width={14} height={14}
            style={{ objectFit: 'contain', opacity: 0.9 }}
          />
          <p className="label-text" style={{ color: '#C8F135' }}>
            The EXL Advantage
          </p>
          <Image src="/icon-percent.png" alt="" width={14} height={14}
            style={{ objectFit: 'contain', opacity: 0.9 }}
          />
        </div>

        <h2
          className="headline-section"
          style={{
            color: 'var(--white)',
            lineHeight: 1,
            maxWidth: '900px',
          }}
        >
          A TRADITIONAL CONSULTANCY
          <br />
          THAT IS
          <br />
          <span style={{ color: '#C8F135', display: 'inline-block', minWidth: '4ch' }}>
            <span ref={typewriterRef}>{displayed}</span>
            <span
              style={{
                display: 'inline-block',
                width: '3px',
                height: '0.85em',
                backgroundColor: '#C8F135',
                marginLeft: '3px',
                verticalAlign: 'middle',
                animation: 'blink 0.5s step-start infinite',
              }}
            />
          </span>
        </h2>

        <p
          className="body-text"
          style={{
            color: 'rgba(255,255,255,0.6)',
            maxWidth: '560px',
            textAlign: 'center',
          }}
        >
          Every EXL deliverable runs through an AI-accelerated workflow. Not to
          replace the work — to compress the timeline.
        </p>
      </div>

      {/* Phase 3 — Angled rising cards */}
      <div
        ref={cardContainerRef}
        style={{
          padding: '0 5% 8rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }}
      >
        {pillarCards.map((card, i) => (
          <div
            key={card.num}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            style={{
              backgroundColor: card.bg,
              borderRadius: '20px',
              padding: 'clamp(3rem, 5vw, 5rem)',
              display: 'grid',
              gridTemplateColumns: '60px 1fr',
              gap: '2rem',
              willChange: 'transform, opacity',
              border:
                card.bg === '#C8F135'
                  ? 'none'
                  : '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div>
              <span
                className="label-text"
                style={{ color: card.headingColor, opacity: 0.5 }}
              >
                {card.num}
              </span>
            </div>
            <div>
              <h3
                className="headline-card"
                style={{ color: card.headingColor, marginBottom: '1.5rem' }}
              >
                {card.title}
              </h3>
              <p
                className="body-text"
                style={{ color: card.bodyColor, maxWidth: '680px' }}
              >
                {card.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
