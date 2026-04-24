'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    id: 'senior-strategy',
    label: 'SENIOR STRATEGY,\nNOT JUNIOR EXECUTION',
    title: 'SENIOR STRATEGY, NOT JUNIOR EXECUTION',
    body: 'Every engagement is led by a founder with international consulting experience across three continents. You get the senior thinking the big firms charge for, without the layers between you and the person actually solving your problem.',
  },
  {
    id: 'ai-native',
    label: 'AI-NATIVE, SO YOUR\nTIMELINE ISN\'T A PROBLEM',
    title: "AI-NATIVE, SO YOUR TIMELINE ISN'T A PROBLEM",
    body: 'We built our production and content stack on AI from day one. A lean Dallas team ships in weeks what traditional agencies ship in quarters. You move at the pace of your market, not the pace of your agency.',
  },
  {
    id: 'engineered',
    label: 'ENGINEERED FOR IMPACT,\nTOP TO BOTTOM',
    title: 'ENGINEERED FOR IMPACT, TOP TO BOTTOM',
    body: "Every decision, from the strategy brief to the lens choice on the shoot, runs through one filter: will this move the number? We build marketing that's accountable from planning through delivery, and we own the outcome end to end.",
  },
];

export default function HowWereDifferentSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activePillar, setActivePillar] = useState(0);
  // Ref so GSAP callback always reads the latest value (avoids stale closure)
  const activePillarRef = useRef(0);

  useEffect(() => {
    if (!sectionRef.current || !pinnedRef.current) return;

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=250%',
      pin: pinnedRef.current,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        // Update progress bar fill
        if (barFillRef.current) {
          barFillRef.current.style.width = `${progress * 100}%`;
        }

        // Determine which pillar is active — use ref to avoid stale closure
        const newPillar = Math.min(Math.floor(progress * 3), 2);
        if (newPillar !== activePillarRef.current) {
          activePillarRef.current = newPillar;
          setActivePillar(newPillar);
        }
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-were-different"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      <div
        ref={pinnedRef}
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          padding: 'clamp(3rem, 6vw, 6rem) 5%',
          justifyContent: 'space-between',
          backgroundColor: '#0A0A0A',
        }}
      >
        {/* Section headline */}
        <div style={{ position: 'relative' }}>
          {/* Ghost question mark — decorative right side */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              right: '0',
              top: '-2rem',
              width: 'clamp(80px, 10vw, 140px)',
              aspectRatio: '1 / 1.5',
              opacity: 0.07,
              pointerEvents: 'none',
              transform: 'rotate(-6deg)',
            }}
          >
            <Image src="/icon-question.png" alt="" fill style={{ objectFit: 'contain' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <Image src="/icon-question.png" alt="" width={14} height={22}
              style={{ objectFit: 'contain', opacity: 0.9 }}
            />
            <p className="label-text" style={{ color: '#C8F135' }}>
              How We&apos;re Different
            </p>
          </div>

          <h2
            className="headline-section"
            style={{
              color: 'var(--white)',
              maxWidth: '700px',
              lineHeight: 0.95,
            }}
          >
            WHY CLIENTS PICK EXL OVER THE ALTERNATIVES.
          </h2>
        </div>

        {/* Tab labels above progress bar */}
        <div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '1px',
              marginBottom: '0.75rem',
            }}
          >
            {pillars.map((p, i) => (
              <div
                key={p.id}
                style={{
                  paddingRight: '2rem',
                  transition: 'opacity 0.3s ease',
                  opacity: activePillar === i ? 1 : 0.3,
                }}
              >
                <p
                  className="label-text"
                  style={{
                    color: activePillar === i ? '#C8F135' : 'var(--white)',
                    fontSize: '0.7rem',
                    whiteSpace: 'pre-line',
                    lineHeight: 1.4,
                  }}
                >
                  {p.label}
                </p>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div
            style={{
              width: '100%',
              height: '3px',
              backgroundColor: 'rgba(255,255,255,0.12)',
              borderRadius: '2px',
              overflow: 'hidden',
              marginBottom: '4rem',
            }}
          >
            <div
              ref={barFillRef}
              style={{
                height: '100%',
                width: '0%',
                backgroundColor: '#C8F135',
                borderRadius: '2px',
                transition: 'width 0.05s linear',
              }}
            />
          </div>

          {/* Pillar content — fade swap */}
          <div style={{ position: 'relative', minHeight: '220px' }}>
            {pillars.map((p, i) => (
              <div
                key={p.id}
                ref={(el) => {
                  contentRefs.current[i] = el;
                }}
                style={{
                  position: i === 0 ? 'relative' : 'absolute',
                  top: 0,
                  left: 0,
                  transition:
                    'opacity 0.3s ease, transform 0.3s ease',
                  opacity: activePillar === i ? 1 : 0,
                  transform:
                    activePillar === i
                      ? 'translateY(0)'
                      : 'translateY(8px)',
                  pointerEvents: activePillar === i ? 'auto' : 'none',
                }}
              >
                <h3
                  className="headline-card"
                  style={{
                    color: 'var(--white)',
                    marginBottom: '1.5rem',
                    maxWidth: '700px',
                  }}
                >
                  {p.title}
                </h3>
                <p
                  className="body-text"
                  style={{
                    color: 'rgba(255,255,255,0.65)',
                    maxWidth: '580px',
                  }}
                >
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
