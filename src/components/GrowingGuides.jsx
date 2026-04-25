import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

const GUIDES = [
  {
    num: '01', tag: 'Vegetables',
    title: 'How to Grow Tomatoes in an Ahmedabad Summer',
    read: '6 min read',
    img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=700&auto=format&q=88&fit=crop',
  },
  {
    num: '02', tag: 'Herbs',
    title: '5 Herbs Your Kitchen is Probably Missing Right Now',
    read: '4 min read',
    img: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=700&auto=format&q=88&fit=crop',
  },
  {
    num: '03', tag: 'Seasonal',
    title: 'What to Plant This Season — and What to Skip',
    read: '5 min read',
    img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=700&auto=format&q=88&fit=crop',
  },
]

export function GrowingGuides() {
  const ref = useRef(null)

  useEffect(() => {
    gsap.fromTo(ref.current.querySelectorAll('.gg-h'),
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%' } }
    )
    ref.current.querySelectorAll('.gg-card').forEach((card, i) => {
      gsap.fromTo(card,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'power4.inOut',
          scrollTrigger: { trigger: card, start: 'top 84%' }, delay: i * 0.08 }
      )
      const img = card.querySelector('img')
      gsap.fromTo(img,
        { scale: 1.2 },
        { scale: 1, duration: 1.4, ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 84%' }, delay: i * 0.08 }
      )
    })
  }, [])

  return (
    <section ref={ref} id="guides" className="section-pad" style={{ background: '#EDE6D8' }}>
      <div className="container">
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 24, alignItems: 'end', marginBottom: 'clamp(40px, 6vw, 64px)',
        }}>
          <div>
            <p className="gg-h label" style={{ color: 'var(--green)', marginBottom: 16 }}>Growing Guides</p>
            <h2 className="gg-h headline" style={{ color: 'var(--dark)', margin: 0 }}>
              The internet has a lot<br />of gardening advice.
            </h2>
          </div>
          <p className="gg-h body" style={{ color: 'rgba(20,16,8,0.5)', margin: 0, paddingBottom: 6 }}>
            Most of it isn't written for Indian balconies,<br />
            Indian summers or Indian kitchens. Ours is.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {GUIDES.map((g, i) => (
            <a key={i} href="http://nidhiseed.com" target="_blank" rel="noopener noreferrer"
              className="gg-card"
              style={{
                borderRadius: 18, overflow: 'hidden', textDecoration: 'none',
                background: '#fff', display: 'flex', flexDirection: 'column',
                clipPath: 'inset(100% 0% 0% 0%)',
                border: '1px solid rgba(20,16,8,0.05)',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 24px 64px rgba(20,16,8,0.12)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{ aspectRatio: '16/10', overflow: 'hidden' }}>
                <img src={g.img} alt={g.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: 'scale(1.2)' }}
                />
              </div>
              <div style={{ padding: 'clamp(20px, 2.5vw, 30px)', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    fontSize: '0.62rem', fontWeight: 700, color: 'var(--green)',
                    background: 'rgba(45,106,79,0.1)', padding: '3px 12px', borderRadius: 999,
                    letterSpacing: '0.06em',
                  }}>{g.tag}</span>
                  <span style={{
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    fontSize: '0.7rem', color: 'rgba(20,16,8,0.35)',
                  }}>{g.read}</span>
                </div>
                <h3 style={{
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', fontWeight: 700,
                  color: 'var(--dark)', lineHeight: 1.35, margin: 0, flex: 1,
                }}>{g.title}</h3>
                <span style={{
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  fontSize: '0.75rem', fontWeight: 700, color: 'var(--green)',
                  borderTop: '1px solid rgba(20,16,8,0.07)', paddingTop: 14,
                  display: 'block',
                }}>Read Guide →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
