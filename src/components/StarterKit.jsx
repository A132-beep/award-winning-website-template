import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

export function StarterKit() {
  const ref    = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    const lines = ref.current.querySelectorAll('.sk-line')
    gsap.set(lines, { yPercent: 110 })
    gsap.to(lines, {
      yPercent: 0, stagger: 0.09, duration: 1.1, ease: 'power4.out',
      scrollTrigger: { trigger: ref.current, start: 'top 74%' },
    })
    gsap.fromTo(ref.current.querySelector('.sk-body'),
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 70%' }, delay: 0.4 }
    )
    gsap.to(imgRef.current, {
      yPercent: 18, ease: 'none',
      scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
    })
  }, [])

  return (
    <section ref={ref} className="section-pad" style={{ background: 'var(--cream)' }}>
      <div className="container">
        <div style={{
          position: 'relative', borderRadius: 24, overflow: 'hidden',
          minHeight: 'clamp(420px, 55vw, 640px)',
          display: 'flex', alignItems: 'flex-end',
        }}>
          <img ref={imgRef}
            src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1400&auto=format&q=88&fit=crop"
            alt="Seeds and soil"
            style={{
              position: 'absolute', inset: 0, width: '100%',
              height: '120%', objectFit: 'cover', top: '-10%',
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(20,16,8,0.92) 0%, rgba(20,16,8,0.55) 45%, rgba(20,16,8,0.1) 100%)',
          }} />

          <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(40px, 6vw, 72px)', width: '100%' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'flex-end' }}>
              <div>
                <p style={{
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.22em',
                  textTransform: 'uppercase', color: '#86C49C', marginBottom: 'clamp(16px, 2.5vw, 28px)',
                }}>Starter Kits</p>
                {["Haven't grown", "anything before?"].map((line, i) => (
                  <div key={i} style={{ overflow: 'hidden' }}>
                    <span className="sk-line" style={{
                      display: 'block',
                      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                      fontSize: 'clamp(2.2rem, 5.5vw, 6.5rem)',
                      fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.0,
                      color: '#F5EFE4',
                    }}>{line}</span>
                  </div>
                ))}
              </div>

              <div className="sk-body" style={{ paddingBottom: 8 }}>
                <p style={{
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)', fontWeight: 300,
                  color: 'rgba(245,239,228,0.65)', lineHeight: 1.75,
                  margin: '0 0 clamp(24px, 3.5vw, 40px)',
                }}>
                  Good. Everyone starts somewhere.<br />
                  Seeds, soil, bags, instructions — all in one box.<br />
                  You just need a corner and some curiosity.
                </p>
                <a href="http://nidhiseed.com" target="_blank" rel="noopener noreferrer" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  padding: '14px 32px', borderRadius: 999,
                  background: '#F5EFE4', color: '#1B4332',
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em',
                  textTransform: 'uppercase', textDecoration: 'none',
                  transition: 'background 0.2s, transform 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#E8EDE4'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#F5EFE4'; e.currentTarget.style.transform = 'none' }}
                >Shop Starter Kits →</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
