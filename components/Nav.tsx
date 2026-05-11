'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

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
          <Link href="/services" className="nav-link">Services</Link>
          <Link href="/#how-different" className="nav-link">Why EXL</Link>
          <Link href="/#best-in-b2b" className="nav-link">Best in B2B</Link>

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
          <Link href="/services" onClick={() => setMenuOpen(false)} className="mobile-nav-link">Services</Link>
          <Link href="/#how-different" onClick={() => setMenuOpen(false)} className="mobile-nav-link">Why EXL</Link>
          <Link href="/#best-in-b2b" onClick={() => setMenuOpen(false)} className="mobile-nav-link">Best in B2B</Link>

        </div>
      )}

      <style jsx>{`
        .nav-link {
          font-family: var(--font-cabinet);
          font-size: 14px;
          font-weight: 500;
          color: #1a1a1a;
          opacity: 0.8;
          transition: all 0.3s;
          cursor: pointer;
        }
        .nav-link:hover {
          opacity: 1;
          transform: translateY(-1px);
        }
        .dropdown-item {
          display: block;
          padding: 10px 16px;
          font-family: var(--font-cabinet);
          font-size: 13px;
          font-weight: 500;
          color: #1a1a1a;
          border-radius: 10px;
          transition: all 0.2s;
        }
        .dropdown-item:hover {
          background-color: #F2FFB8;
        }
        .mobile-nav-link {
          font-family: var(--font-cabinet);
          font-size: 18px;
          font-weight: 600;
          color: #1a1a1a;
        }
        .mobile-sub-link {
          font-family: var(--font-cabinet);
          font-size: 15px;
          font-weight: 500;
          color: #1a1a1a/70;
        }
      `}</style>
    </nav>
  )
}
