'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <nav
      id="nav"
      className="absolute top-6 left-1/2 -translate-x-1/2 z-[1000] w-[95%] max-w-[1200px]"
    >
      <div 
        className="flex items-center justify-between px-6 py-2.5 rounded-full transition-all duration-500 border border-black/5 bg-[#F2FFB8] shadow-sm"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center pl-2">
          <Image
            src="/assets/images/Exl_Logo_Black.webp"
            alt="EXL"
            width={70}
            height={24}
            className="h-6 w-auto"
            priority
          />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-8">
          {/* Services Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button 
              className="nav-link flex items-center gap-1.5 focus:outline-none"
              style={{ color: '#1a1a1a', background: 'none', border: 'none', padding: 0 }}
            >
              <span>Services</span>
              <svg 
                className={`w-3.5 h-3.5 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu Panel */}
            {dropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 border border-black/5 shadow-2xl min-w-[210px] flex flex-col gap-0.5 z-[1010] animate-in fade-in slide-in-from-top-2 duration-200 before:absolute before:-top-4 before:h-4 before:left-0 before:right-0 before:content-['']">
                <Link href="/services" className="dropdown-item">Services Overview</Link>
                <div className="h-[1px] bg-black/5 my-1" />
                <Link href="/services/advise" className="dropdown-item flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#1C2416] shrink-0" />
                  <span>Advise</span>
                </Link>
                <Link href="/services/produce" className="dropdown-item flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-neutral-300 shrink-0" />
                  <span>Produce</span>
                </Link>
                <Link href="/services/build" className="dropdown-item flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-neutral-300 shrink-0" />
                  <span>Build</span>
                </Link>
                <Link href="/services/grow" className="dropdown-item flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-neutral-300 shrink-0" />
                  <span>Grow</span>
                </Link>
              </div>
            )}
          </div>

          <Link href="/#how-different" className="nav-link" style={{ color: '#1a1a1a' }}>Why EXL</Link>
          <Link href="/podcast-production" className="nav-link" style={{ color: '#1a1a1a' }}>Best in B2B</Link>
        </div>

        {/* Desktop Right (CTA) */}
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="group flex items-center gap-4 bg-[#1C2416] text-white pl-6 pr-1.5 py-1.5 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="font-[var(--font-cabinet)] font-bold text-sm tracking-tight">Contact Us</span>
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black transition-all duration-300 group-hover:rotate-45">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </div>
          </Link>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-[1.5px] bg-black transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-[1.5px] bg-black transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-[1.5px] bg-black transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 mt-4 bg-white rounded-3xl shadow-2xl border border-black/5 p-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-2">
            <span className="mobile-nav-link">Services</span>
            <div className="pl-4 flex flex-col gap-2 border-l border-black/10">
              <Link href="/services" onClick={() => setMenuOpen(false)} className="mobile-sub-link">Overview</Link>
              <Link href="/services/advise" onClick={() => setMenuOpen(false)} className="mobile-sub-link flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1C2416]" />
                <span>Advise</span>
              </Link>
              <Link href="/services/produce" onClick={() => setMenuOpen(false)} className="mobile-sub-link flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                <span>Produce</span>
              </Link>
              <Link href="/services/build" onClick={() => setMenuOpen(false)} className="mobile-sub-link flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                <span>Build</span>
              </Link>
              <Link href="/services/grow" onClick={() => setMenuOpen(false)} className="mobile-sub-link flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                <span>Grow</span>
              </Link>
            </div>
          </div>
          <Link href="/#how-different" onClick={() => setMenuOpen(false)} className="mobile-nav-link">Why EXL</Link>
          <Link href="/podcast-production" onClick={() => setMenuOpen(false)} className="mobile-nav-link">Best in B2B</Link>
        </div>
      )}

      <style jsx>{`
        :global(.nav-link) {
          font-family: var(--font-cabinet);
          font-size: 18px;
          font-weight: 600;
          color: #1a1a1a !important;
          opacity: 0.85;
          transition: all 0.3s;
          cursor: pointer;
        }
        :global(.nav-link:hover) {
          opacity: 1;
          transform: translateY(-1px);
          color: #1a1a1a !important;
        }
        :global(.dropdown-item) {
          display: block;
          padding: 10px 16px;
          font-family: var(--font-cabinet);
          font-size: 15px;
          font-weight: 600;
          color: #1a1a1a !important;
          border-radius: 10px;
          transition: all 0.2s;
        }
        :global(.dropdown-item:hover) {
          background-color: #F2FFB8;
        }
        :global(.mobile-nav-link) {
          font-family: var(--font-cabinet);
          font-size: 22px;
          font-weight: 700;
          color: #1a1a1a !important;
        }
        :global(.mobile-sub-link) {
          font-family: var(--font-cabinet);
          font-size: 18px;
          font-weight: 600;
          color: #1a1a1a !important;
        }
      `}</style>
    </nav>
  )
}
