'use client';

import Image from 'next/image';

export default function Footer() {
  return (
    <>
      {/* Footer CTA */}
      <section
        id="contact"
        style={{
          backgroundColor: '#C8F135',
          padding: 'clamp(5rem, 9vw, 10rem) 5%',
          textAlign: 'center',
        }}
      >
        <p
          className="label-text"
          style={{ color: 'rgba(10,10,10,0.5)', marginBottom: '1.5rem' }}
        >
          Let&apos;s Work Together
        </p>
        <h2
          className="headline-section"
          style={{ color: '#0A0A0A', marginBottom: '1.5rem' }}
        >
          LET&apos;S BUILD SOMETHING
          <br />
          WORTH WATCHING.
        </h2>
        <p
          className="body-text"
          style={{
            color: 'rgba(10,10,10,0.65)',
            maxWidth: '480px',
            margin: '0 auto 3rem',
          }}
        >
          Book a 20-minute call. No deck, no pitch. Just a conversation about
          what you&apos;re trying to ship.
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <a
            href="mailto:info@exl.agency"
            id="footer-cta-book"
            style={{
              backgroundColor: '#0A0A0A',
              color: '#FFFFFF',
              padding: '1rem 2.25rem',
              borderRadius: '100px',
              fontFamily: 'var(--font-cabinet)',
              fontWeight: 700,
              fontSize: '0.9rem',
              letterSpacing: '0.05em',
              textDecoration: 'none',
              textTransform: 'uppercase',
              transition: 'all 0.25s ease',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform =
                'scale(1.04)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform =
                'scale(1)';
            }}
          >
            Book a call
          </a>
          <a
            href="mailto:info@exl.agency"
            id="footer-cta-email"
            style={{
              backgroundColor: 'transparent',
              color: '#0A0A0A',
              padding: '1rem 2.25rem',
              borderRadius: '100px',
              border: '1.5px solid rgba(10,10,10,0.4)',
              fontFamily: 'var(--font-cabinet)',
              fontWeight: 700,
              fontSize: '0.9rem',
              letterSpacing: '0.05em',
              textDecoration: 'none',
              textTransform: 'uppercase',
              transition: 'all 0.25s ease',
              display: 'inline-block',
            }}
          >
            info@exl.agency
          </a>
        </div>
      </section>

      {/* Site Footer */}
      <footer
        style={{
          backgroundColor: '#0A0A0A',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          padding: 'clamp(3rem, 5vw, 5rem) 5%',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '3rem',
            marginBottom: '3rem',
          }}
        >
          {/* Brand column */}
          <div>
            <Image
              src="/exl-logo-white.png"
              alt="EXL"
              width={80}
              height={28}
              style={{
                objectFit: 'contain',
                filter: 'brightness(0) invert(1)',
                marginBottom: '1.25rem',
              }}
            />
            <p
              className="body-text"
              style={{
                color: 'rgba(255,255,255,0.45)',
                fontSize: '0.875rem',
                lineHeight: 1.6,
                maxWidth: '240px',
              }}
            >
              EXL Ventures LLC
              <br />
              A B2B consultancy and media production studio.
              <br />
              825 Watters Creek Blvd.
              <br />
              Building M, Suite 250
              <br />
              Allen, Texas 75013
            </p>
          </div>

          {/* Links column */}
          <div>
            <p
              className="label-text"
              style={{ color: '#C8F135', marginBottom: '1.25rem' }}
            >
              Navigate
            </p>
            {[
              'Services',
              'Integrated Marketing Management',
              'Podcast Production',
              'About',
              'Contact',
            ].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-cabinet)',
                  fontSize: '0.9rem',
                  color: 'rgba(255,255,255,0.5)',
                  textDecoration: 'none',
                  marginBottom: '0.6rem',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLAnchorElement).style.color = '#FFFFFF')
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLAnchorElement).style.color =
                    'rgba(255,255,255,0.5)')
                }
              >
                {link}
              </a>
            ))}
          </div>

          {/* Social column */}
          <div>
            <p
              className="label-text"
              style={{ color: '#C8F135', marginBottom: '1.25rem' }}
            >
              Follow
            </p>
            {['LinkedIn', 'YouTube', 'Instagram'].map((social) => (
              <a
                key={social}
                href="#"
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-cabinet)',
                  fontSize: '0.9rem',
                  color: 'rgba(255,255,255,0.5)',
                  textDecoration: 'none',
                  marginBottom: '0.6rem',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLAnchorElement).style.color = '#C8F135')
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLAnchorElement).style.color =
                    'rgba(255,255,255,0.5)')
                }
              >
                {social} ↗
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.07)',
            paddingTop: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <p
            className="label-text"
            style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.7rem' }}
          >
            © 2026 EXL Ventures LLC. All rights reserved.
          </p>
          <a
            href="mailto:info@exl.agency"
            style={{
              fontFamily: 'var(--font-cabinet)',
              fontSize: '0.85rem',
              color: 'rgba(255,255,255,0.3)',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLAnchorElement).style.color = '#C8F135')
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLAnchorElement).style.color =
                'rgba(255,255,255,0.3)')
            }
          >
            info@exl.agency
          </a>
        </div>
      </footer>
    </>
  );
}
