'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/Q3X0YRPH9MDWP4FrzG2J/webhook-trigger/364703e8-bc3e-405d-b988-6c147b47d16b'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const formRef = useRef<HTMLFormElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.from('.animate-fade-up', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out'
      })
    })
    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setStatus('success')
        formRef.current?.reset()
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.error('Submission error:', error)
      setStatus('error')
    }
  }

  return (
    <section className="relative px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* Left Side: Content */}
        <div ref={headerRef} className="space-y-12">
          <div className="animate-fade-up">
            <h1 
              style={{ fontFamily: 'var(--font-tusker)' }}
              className="text-[clamp(32px,4.5vw,64px)] leading-[1.1] text-white uppercase mb-8"
            >
              B2B that looks like media.<br />
              <span className="text-[var(--chartreuse)]">Pipeline that feels like growth.</span>
            </h1>
            <p className="font-[var(--font-cabinet)] text-white/60 text-[clamp(18px,2vw,24px)] leading-relaxed max-w-xl">
              Tell us what you&apos;re trying to ship. We&apos;ll review your brief and be in touch within 24 hours to schedule a conversation. No deck, no pitch.
            </p>
          </div>


        </div>

        {/* Right Side: Form */}
        <div className="animate-fade-up">
          {status === 'success' ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 bg-white/5 rounded-[32px] p-12 border border-white/10">
              <div className="w-20 h-20 bg-[var(--chartreuse)] rounded-full flex items-center justify-center text-black">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <h2 style={{ fontFamily: 'var(--font-tusker)' }} className="text-4xl text-white uppercase">Message Sent</h2>
              <p className="font-[var(--font-cabinet)] text-white/60">We&apos;ll get back to you within 24 hours.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="text-[var(--chartreuse)] font-bold uppercase tracking-widest text-sm border-b border-[var(--chartreuse)]"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form 
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-[var(--font-cabinet)] text-white/40 text-xs uppercase tracking-widest">Full Name</label>
                  <input 
                    required
                    name="name"
                    type="text" 
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white font-[var(--font-cabinet)] focus:outline-none focus:border-[var(--chartreuse)] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-[var(--font-cabinet)] text-white/40 text-xs uppercase tracking-widest">Email Address</label>
                  <input 
                    required
                    name="email"
                    type="email" 
                    placeholder="john@company.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white font-[var(--font-cabinet)] focus:outline-none focus:border-[var(--chartreuse)] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-[var(--font-cabinet)] text-white/40 text-xs uppercase tracking-widest">Phone Number</label>
                  <input 
                    required
                    name="phone"
                    type="tel" 
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white font-[var(--font-cabinet)] focus:outline-none focus:border-[var(--chartreuse)] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-[var(--font-cabinet)] text-white/40 text-xs uppercase tracking-widest">Service of Interest</label>
                  <div className="relative">
                    <select 
                      name="service"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white font-[var(--font-cabinet)] focus:outline-none focus:border-[var(--chartreuse)] transition-colors appearance-none cursor-pointer"
                    >
                      <option value="advise" className="bg-[#1a1a1a] text-white">Advise</option>
                      <option value="produce" className="bg-[#1a1a1a] text-white">Produce</option>
                      <option value="build" className="bg-[#1a1a1a] text-white">Build</option>
                      <option value="grow" className="bg-[#1a1a1a] text-white">Grow</option>
                      <option value="imm" className="bg-[#1a1a1a] text-white">Integrated Marketing Management</option>
                      <option value="podcast" className="bg-[#1a1a1a] text-white">Podcast Production</option>
                      <option value="other" className="bg-[#1a1a1a] text-white">Other</option>
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-[var(--font-cabinet)] text-white/40 text-xs uppercase tracking-widest">Company</label>
                <input 
                  required
                  name="company"
                  type="text" 
                  placeholder="Acme Corp"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white font-[var(--font-cabinet)] focus:outline-none focus:border-[var(--chartreuse)] transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="font-[var(--font-cabinet)] text-white/40 text-xs uppercase tracking-widest">Your Message</label>
                <textarea 
                  required
                  name="message"
                  rows={5}
                  placeholder="Tell us about what you're trying to ship..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white font-[var(--font-cabinet)] focus:outline-none focus:border-[var(--chartreuse)] transition-colors resize-none"
                />
              </div>

              <button 
                type="submit"
                disabled={status === 'submitting'}
                className="w-full group relative flex items-center justify-center gap-4 bg-[var(--chartreuse)] text-black font-[var(--font-tusker)] text-2xl tracking-widest uppercase py-6 rounded-xl overflow-hidden transition-transform active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
              >
                <span className="relative z-10">
                  {status === 'submitting' ? 'Sending...' : 'Book a call'}
                </span>
                {status !== 'submitting' && (
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white transition-transform group-hover:rotate-45">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </div>
                )}
              </button>

              {status === 'error' && (
                <p className="text-red-500 font-[var(--font-cabinet)] text-center text-sm">
                  Something went wrong. Please try again or email us directly.
                </p>
              )}
            </form>
          )}
        </div>

      </div>
    </section>
  )
}
