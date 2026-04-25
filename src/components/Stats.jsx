import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'

const STATS = [
  { value: 30,   suffix: '+',  label: 'Years of expertise' },
  { value: 2000, suffix: '+',  label: 'Seed varieties' },
  { value: 98,   suffix: '%',  label: 'Germination rate' },
  { value: 50,   suffix: 'K+', label: 'Happy growers' },
]

export function Stats() {
  const ref = useRef(null)

  useEffect(() => {
    ref.current.querySelectorAll('.sn').forEach((el, i) => {
      const obj = { val: 0 }
      gsap.to(obj, {
        val: STATS[i].value, duration: 2, ease: 'power2.out',
        onUpdate() { el.textContent = Math.round(obj.val).toLocaleString() },
        scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true },
      })
    })

    gsap.fromTo(ref.current.querySelectorAll('.si'),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' } }
    )

    // Line reveal
    gsap.fromTo(ref.current.querySelector('.stats-line'),
      { scaleX: 0 },
      { scaleX: 1, duration: 1.2, ease: 'power3.inOut', transformOrigin: 'left',
        scrollTrigger: { trigger: ref.current, start: 'top 82%' } }
    )
  }, [])

  return (
    <section ref={ref} className="section-pad-sm" style={{ background: 'var(--cream)', overflow: 'hidden' }}>
      <div className="container">
        <div className="stats-line" style={{
          height: 1, background: 'rgba(20,16,8,0.1)',
          marginBottom: 'clamp(40px, 6vw, 72px)',
        }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
          {STATS.map((s, i) => (
            <div key={i} className="si" style={{
              padding: 'clamp(24px, 3vw, 40px) clamp(16px, 2.5vw, 32px)',
              borderRight: i < 3 ? '1px solid rgba(20,16,8,0.08)' : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 0 }}>
                <span className="sn" style={{
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  fontSize: 'clamp(3.5rem, 7vw, 8rem)',
                  fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1,
                  color: '#141008',
                }}>0</span>
                <span style={{
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  fontSize: 'clamp(1.5rem, 3vw, 3.5rem)',
                  fontWeight: 800, letterSpacing: '-0.03em',
                  color: '#2D6A4F',
                }}>{s.suffix}</span>
              </div>
              <p style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: 'clamp(0.72rem, 1vw, 0.85rem)',
                color: 'rgba(20,16,8,0.4)', marginTop: 8, fontWeight: 400,
              }}>{s.label}</p>
            </div>
          ))}
        </div>
        <div className="stats-line" style={{
          height: 1, background: 'rgba(20,16,8,0.1)',
          marginTop: 'clamp(40px, 6vw, 72px)',
        }} />
      </div>
    </section>
  )
}
