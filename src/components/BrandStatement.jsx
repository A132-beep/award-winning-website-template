import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'

const WORDS = ['Same', 'Seed.', 'Same', 'Quality.', 'Same', 'Result.']

export function BrandStatement() {
  const ref = useRef(null)

  useEffect(() => {
    const words = ref.current.querySelectorAll('.bw')
    gsap.set(words, { yPercent: 110, opacity: 0 })
    gsap.to(words, {
      yPercent: 0, opacity: 1,
      stagger: 0.08, duration: 1, ease: 'power4.out',
      scrollTrigger: { trigger: ref.current, start: 'top 70%' },
    })

    // Subtle parallax on bg
    gsap.to(ref.current.querySelector('.bs-bg'), {
      yPercent: 12, ease: 'none',
      scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
    })
  }, [])

  return (
    <section ref={ref} style={{
      background: '#141008',
      position: 'relative',
      overflow: 'hidden',
      padding: 'clamp(100px, 16vw, 220px) clamp(24px, 7vw, 108px)',
    }}>
      {/* Subtle texture image */}
      <div className="bs-bg" style={{
        position: 'absolute', inset: '-20%',
        backgroundImage: 'url(https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1400&auto=format&q=40&fit=crop)',
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: 0.08,
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto' }}>
        {/* Label */}
        <p style={{
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.22em',
          textTransform: 'uppercase', color: '#86C49C',
          marginBottom: 'clamp(32px, 5vw, 64px)',
        }}>Why Nidhi Seeds</p>

        {/* Massive statement */}
        <div style={{ overflow: 'hidden' }}>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(3.2rem, 9.5vw, 12rem)',
            letterSpacing: '-0.045em',
            lineHeight: 0.92,
            color: '#F5EFE4',
            margin: 0,
          }}>
            {WORDS.map((w, i) => (
              <span key={i} style={{ overflow: 'hidden', display: 'inline-block', marginRight: '0.22em' }}>
                <span className="bw" style={{
                  display: 'inline-block',
                  color: i % 2 === 1 ? '#86C49C' : '#F5EFE4',
                }}>{w}</span>
              </span>
            ))}
          </p>
        </div>

        {/* Sub-copy */}
        <div style={{
          display: 'flex', justifyContent: 'flex-end',
          marginTop: 'clamp(40px, 7vw, 96px)',
        }}>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)',
            fontWeight: 300, color: 'rgba(245,239,228,0.45)',
            lineHeight: 1.75, maxWidth: 420,
          }}>
            The only difference is the size of your plot. We don't make a farmer version and a home version. One seed. One standard.
          </p>
        </div>
      </div>
    </section>
  )
}
