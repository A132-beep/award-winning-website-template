import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

const PILLARS = [
  { num: '01', title: 'Farmer-Grade Seeds', body: 'The same varieties professional farmers across Gujarat trust — now packed for your home garden. No compromises on quality because your plot is smaller.' },
  { num: '02', title: 'Built for India', body: 'Selected to grow in Indian soil, Indian heat and Indian monsoons. Every variety tested here, not imported from European catalogs.' },
  { num: '03', title: 'Grow With Confidence', body: 'Clear sowing dates, spacing guides and expected harvest windows on every packet. Stop guessing, start growing.' },
]

export function WhyUs() {
  const ref = useRef(null)

  useEffect(() => {
    const heading = ref.current.querySelectorAll('.wu-line')
    gsap.set(heading, { yPercent: 110 })
    gsap.to(heading, {
      yPercent: 0, stagger: 0.07, duration: 1, ease: 'power4.out',
      scrollTrigger: { trigger: ref.current, start: 'top 72%' },
    })
    gsap.fromTo(ref.current.querySelectorAll('.wu-p'),
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current.querySelector('.wu-pillars'), start: 'top 80%' } }
    )
  }, [])

  return (
    <section ref={ref} id="why" className="section-pad" style={{ background: '#141008' }}>
      <div className="container">
        {/* Big heading */}
        <div style={{ marginBottom: 'clamp(56px, 9vw, 120px)', overflow: 'hidden' }}>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.22em',
            textTransform: 'uppercase', color: 'rgba(134,196,156,0.7)',
            marginBottom: 'clamp(20px, 3vw, 36px)',
          }}>Why Nidhi Seeds</p>
          {["We don’t make a farmer", 'version and a home version.'].map((line, i) => (
            <div key={i} style={{ overflow: 'hidden' }}>
              <span className="wu-line" style={{
                display: 'block',
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: 'clamp(2.4rem, 6vw, 7.5rem)',
                fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.0,
                color: i === 0 ? '#F5EFE4' : '#86C49C',
              }}>{line}</span>
            </div>
          ))}
        </div>

        {/* Three pillars */}
        <div className="wu-pillars" style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          borderTop: '1px solid rgba(245,239,228,0.1)',
        }}>
          {PILLARS.map((p, i) => (
            <div key={i} className="wu-p" style={{
              padding: 'clamp(32px, 4vw, 56px) clamp(24px, 3vw, 48px) clamp(32px, 4vw, 56px) 0',
              borderRight: i < 2 ? '1px solid rgba(245,239,228,0.08)' : 'none',
              paddingRight: i < 2 ? 'clamp(24px, 3vw, 48px)' : 0,
            }}>
              <span style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.2em',
                color: 'rgba(134,196,156,0.5)', display: 'block', marginBottom: 24,
              }}>{p.num}</span>
              <h3 style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)', fontWeight: 700,
                letterSpacing: '-0.02em', color: '#F5EFE4',
                margin: '0 0 16px',
              }}>{p.title}</h3>
              <p style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: 'clamp(0.82rem, 1.1vw, 0.95rem)', fontWeight: 300,
                color: 'rgba(245,239,228,0.45)', lineHeight: 1.75, margin: 0,
              }}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
