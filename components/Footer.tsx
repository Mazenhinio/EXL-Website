'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--black)',
        color: '#ffffff',
        padding: '80px 32px 40px',
      }}
    >
      <div
        className="footer-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '40% 30% 30%',
          maxWidth: '1200px',
          margin: '0 auto',
          marginBottom: '80px',
        }}
      >
        {/* Col 1 */}
        <div style={{ paddingRight: '40px' }}>
          <Image
            src="/assets/images/Exl_Logo_Black.png"
            alt="EXL"
            width={80}
            height={24}
            style={{
              height: '24px',
              width: 'auto',
              filter: 'brightness(0) invert(1)',
              marginBottom: '24px',
            }}
          />
          <p
            style={{
              fontFamily: "var(--font-cabinet), 'DM Sans', sans-serif",
              fontWeight: 400,
              fontSize: '18px',
              color: 'rgba(255,255,255,0.8)',
              marginBottom: '24px',
            }}
          >
            A B2B consultancy and media production studio.
          </p>
          <p
            style={{
              fontFamily: "var(--font-cabinet), 'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: '13px',
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.6,
            }}
          >
            825 Watters Creek Blvd.
            <br />
            Building M, Suite 250
            <br />
            Allen, Texas 75013
            <br />
            <br />
            <a
              href="mailto:info@exl.agency"
              style={{ color: 'rgba(255,255,255,0.8)' }}
            >
              info@exl.agency
            </a>
          </p>
        </div>

        {/* Col 2 */}
        <div className="footer-links-col">
          <p
            style={{
              fontFamily: "var(--font-tusker), sans-serif",
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: '24px',
            }}
          >
            Services
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'Advise', href: '/services/advise' },
              { label: 'Produce', href: '/services/produce' },
              { label: 'Build', href: '/services/build' },
              { label: 'Grow', href: '/services/grow' },
              { label: 'Integrated Marketing Management', href: '/integrated-marketing-management' },
              { label: 'Podcast Production', href: '/podcast-production' },
            ].map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  style={{
                    fontFamily: "var(--font-tusker), sans-serif",
                    fontWeight: 500,
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.7)',
                    transition: 'color 0.2s',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#ffffff')}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.7)')}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 */}
        <div className="footer-links-col">
          <p
            style={{
              fontFamily: "var(--font-tusker), sans-serif",
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: '24px',
            }}
          >
            Company
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'About', href: '#' },
              { label: 'Best in B2B', href: '#best-in-b2b' },
              { label: 'Insights', href: '#' },
              { label: 'Contact', href: '/contact' },
              { label: 'LinkedIn', href: '#' },
              { label: 'YouTube', href: '#' },
              { label: 'Instagram', href: '#' },
            ].map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  style={{
                    fontFamily: "var(--font-tusker), sans-serif",
                    fontWeight: 500,
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.7)',
                    transition: 'color 0.2s',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#ffffff')}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.7)')}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          borderTop: '0.5px solid rgba(255,255,255,0.1)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-tusker), sans-serif",
            fontWeight: 400,
            fontSize: '10px',
            color: 'rgba(255,255,255,0.4)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}
        >
          © 2026 EXL Ventures LLC. All rights reserved.
        </p>
        <p
          style={{
            fontFamily: "var(--font-tusker), sans-serif",
            fontWeight: 500,
            fontSize: '10px',
            color: 'rgba(255,255,255,0.6)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}
        >
          exl.agency
        </p>
      </div>

      <style jsx>{`
        @media (max-width: 767px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </footer>
  )
}
