import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

const REVIEWS = [
  { name: 'Priya M.',  city: 'Mumbai',    stars: 5, text: 'My balcony looks unrecognisable. Started with the tomato kit — now I can\'t stop. Third order this year.', tag: 'Tomato Kit' },
  { name: 'Rakesh T.', city: 'Ahmedabad', stars: 5, text: 'Germination rate is genuinely impressive. Used to buy from local nursery, won\'t go back.', tag: 'Vegetable Mix' },
  { name: 'Ananya S.', city: 'Bengaluru', stars: 5, text: 'The growing guide that came with it made all the difference. Everything sprouted within a week.', tag: 'Herb Collection' },
  { name: 'Deepak V.', city: 'Pune',      stars: 5, text: 'Bought for my mother\'s terrace garden. She called to thank me. That\'s high praise.', tag: 'Starter Kit' },
  { name: 'Meera K.',  city: 'Chennai',   stars: 5, text: 'Chilli plants are thriving in Chennai heat. Exactly what the label promised. Will recommend.', tag: 'Chilli Hybrid' },
]

function Stars({ n }) {
  return (
    <span style={{ display: 'flex', gap: 3 }}>
      {Array.from({ length: n }, (_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#2D6A4F">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </span>
  )
}

export function Reviews() {
  const ref = useRef(null)

  useEffect(() => {
    gsap.fromTo(ref.current.querySelectorAll('.rv-h'),
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%' } }
    )
    gsap.fromTo(ref.current.querySelectorAll('.rv-card'),
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, stagger: 0.09, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current.querySelector('.rv-grid'), start: 'top 82%' } }
    )
  }, [])

  return (
    <section ref={ref} className="section-pad" style={{ background: 'var(--cream)' }}>
      <div className="container">
        <div style={{ marginBottom: 'clamp(40px, 6vw, 64px)' }}>
          <p className="rv-h label" style={{ color: 'var(--green)', marginBottom: 14 }}>Reviews</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <h2 className="rv-h headline" style={{ color: 'var(--dark)', margin: 0 }}>
              Don't take our<br />word for it.
            </h2>
            <p className="rv-h body" style={{ color: 'rgba(20,16,8,0.38)', margin: 0, textAlign: 'right' }}>
              Real people. Real balconies.<br />Real harvests.
            </p>
          </div>
        </div>

        <div className="rv-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 12 }}>
          {REVIEWS.map((r, i) => (
            <div key={i} className="rv-card" style={{
              gridColumn: i === 0 || i === 4 ? 'span 5' : 'span 4',
              background: '#fff', borderRadius: 18,
              padding: 'clamp(24px, 3vw, 36px)',
              display: 'flex', flexDirection: 'column', gap: 16,
              border: '1px solid rgba(20,16,8,0.06)',
            }}>
              <Stars n={r.stars} />
              <p style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)', fontWeight: 400,
                color: 'var(--dark)', lineHeight: 1.65, margin: 0, flex: 1,
              }}>"{r.text}"</p>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                borderTop: '1px solid rgba(20,16,8,0.07)', paddingTop: 16,
              }}>
                <div>
                  <p style={{
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    fontSize: '0.85rem', fontWeight: 700, color: 'var(--dark)', margin: '0 0 2px',
                  }}>{r.name}</p>
                  <p style={{
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    fontSize: '0.72rem', color: 'rgba(20,16,8,0.4)', margin: 0,
                  }}>{r.city}</p>
                </div>
                <span style={{
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  fontSize: '0.62rem', fontWeight: 700, color: 'var(--green)',
                  background: 'rgba(45,106,79,0.1)', padding: '4px 12px', borderRadius: 999,
                  letterSpacing: '0.04em',
                }}>{r.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
