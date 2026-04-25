import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'

const LINKS = {
  Shop:    ['Vegetables', 'Fruits', 'Herbs', 'Flowers', 'Starter Kits'],
  Learn:   ['Growing Guides', 'Seed Calendar', 'Balcony Tips', 'FAQs'],
  Company: ['About Nidhi Seeds', 'Our Story', 'Contact Us', 'Wholesale'],
}

export function Footer() {
  const ref = useRef(null)
  const [email, setEmail] = useState('')
  const [sent, setSent]   = useState(false)

  useEffect(() => {
    gsap.fromTo(ref.current.querySelectorAll('.ft-row'),
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%' } }
    )
  }, [])

  return (
    <footer ref={ref} id="contact" style={{
      background: '#141008',
      padding: 'clamp(80px, 12vw, 160px) clamp(24px, 7vw, 108px) 0',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Big heading + newsletter */}
        <div className="ft-row" style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(40px, 6vw, 80px)', alignItems: 'end',
          paddingBottom: 'clamp(48px, 7vw, 80px)',
          borderBottom: '1px solid rgba(245,239,228,0.08)',
        }}>
          <div>
            <h3 style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontSize: 'clamp(2rem, 4.5vw, 5.5rem)',
              fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.0,
              color: '#F5EFE4', margin: '0 0 clamp(16px, 2vw, 24px)',
            }}>Know what to plant<br />before the season<br />changes.</h3>
            <p style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontSize: 'clamp(0.82rem, 1.1vw, 0.95rem)',
              color: 'rgba(245,239,228,0.35)', margin: 0,
            }}>Seasonal guides. No spam. Straight to your inbox.</p>
          </div>
          <div style={{ paddingBottom: 8 }}>
            {sent ? (
              <p style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: '1rem', color: '#86C49C', fontWeight: 600,
              }}>You're in. Watch for the first guide.</p>
            ) : (
              <form onSubmit={e => { e.preventDefault(); if (email) setSent(true) }}>
                <div style={{ display: 'flex', gap: 10 }}>
                  <input
                    type="email" placeholder="your@email.com" value={email}
                    onChange={e => setEmail(e.target.value)} required
                    style={{
                      flex: 1, padding: '13px 20px', borderRadius: 999,
                      border: '1.5px solid rgba(245,239,228,0.12)',
                      background: 'rgba(245,239,228,0.07)',
                      color: '#F5EFE4', fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                      fontSize: '0.85rem', outline: 'none',
                    }}
                  />
                  <button type="submit" style={{
                    padding: '13px 28px', borderRadius: 999,
                    background: 'var(--green)', color: '#F5EFE4', border: 'none',
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em',
                    textTransform: 'uppercase', cursor: 'pointer', whiteSpace: 'nowrap',
                    transition: 'background 0.2s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#1B4332' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'var(--green)' }}
                  >I'm In →</button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Links + brand */}
        <div className="ft-row" style={{
          display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: 32, padding: 'clamp(48px, 6vw, 72px) 0 clamp(32px, 4vw, 48px)',
        }}>
          <div>
            <img src="/logo.svg" alt="Nidhi Seeds" style={{ height: 52, marginBottom: 20, opacity: 0.85 }} />
            <p style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontSize: '0.85rem', color: 'rgba(245,239,228,0.38)',
              lineHeight: 1.7, maxWidth: 260, margin: '0 0 24px',
            }}>Premium kitchen garden seeds, tested for Indian homes. Seed it. Grow it. Eat it.</p>
            <a href="http://nidhiseed.com" target="_blank" rel="noopener noreferrer" style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontSize: '0.75rem', fontWeight: 600, color: '#86C49C',
              letterSpacing: '0.06em', textDecoration: 'none',
            }}>nidhiseed.com →</a>
          </div>
          {Object.entries(LINKS).map(([title, items]) => (
            <div key={title}>
              <p style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.2em',
                textTransform: 'uppercase', color: 'rgba(245,239,228,0.22)',
                marginBottom: 20,
              }}>{title}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {items.map(link => (
                  <li key={link}>
                    <a href="http://nidhiseed.com" target="_blank" rel="noopener noreferrer" style={{
                      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                      fontSize: '0.85rem', color: 'rgba(245,239,228,0.45)',
                      textDecoration: 'none', transition: 'color 0.18s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#F5EFE4' }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'rgba(245,239,228,0.45)' }}
                    >{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="ft-row" style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          borderTop: '1px solid rgba(245,239,228,0.07)', padding: '24px 0',
        }}>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            fontSize: '0.72rem', color: 'rgba(245,239,228,0.22)', margin: 0,
          }}>© 2026 Nidhi Seeds. All rights reserved.</p>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            fontSize: '0.72rem', color: 'rgba(245,239,228,0.22)', margin: 0,
          }}>Made with care in Gujarat, India.</p>
        </div>
      </div>
    </footer>
  )
}
