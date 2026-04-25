import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

const PRODUCTS = [
  { name: 'Cherry Tomato',  tag: 'Best Seller', diff: 'Easy',   price: '₹59', img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&q=85&fit=crop' },
  { name: 'Coriander',      tag: 'Most Loved',  diff: 'Easy',   price: '₹39', img: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=500&auto=format&q=85&fit=crop' },
  { name: 'Chilli Hybrid',  tag: 'Hot Pick',    diff: 'Medium', price: '₹45', img: 'https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=500&auto=format&q=85&fit=crop' },
  { name: 'Spinach',        tag: 'Nutritious',  diff: 'Easy',   price: '₹42', img: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&auto=format&q=85&fit=crop' },
  { name: 'Brinjal',        tag: 'Versatile',   diff: 'Medium', price: '₹48', img: 'https://images.unsplash.com/photo-1613743983303-b3e89f8a2b80?w=500&auto=format&q=85&fit=crop' },
  { name: 'Okra / Bhindi',  tag: 'Fan Fav',     diff: 'Easy',   price: '₹42', img: 'https://images.unsplash.com/photo-1632200927009-6f85d40e4d3e?w=500&auto=format&q=85&fit=crop' },
  { name: 'Methi',          tag: 'Kitchen Must', diff: 'Easy',  price: '₹35', img: 'https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?w=500&auto=format&q=85&fit=crop' },
  { name: 'Cucumber',       tag: 'Refreshing',  diff: 'Medium', price: '₹55', img: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=500&auto=format&q=85&fit=crop' },
]

export function Bestsellers() {
  const ref      = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(ref.current.querySelectorAll('.bs-h'),
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%' } }
    )
    gsap.fromTo(ref.current.querySelectorAll('.bs-card'),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.06, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: trackRef.current, start: 'top 85%' } }
    )

    const track = trackRef.current
    let isDown = false, startX, scrollLeft
    const onDown = e => { isDown = true; track.style.cursor = 'grabbing'; startX = e.pageX - track.offsetLeft; scrollLeft = track.scrollLeft }
    const onUp = () => { isDown = false; track.style.cursor = 'grab' }
    const onMove = e => { if (!isDown) return; track.scrollLeft = scrollLeft - (e.pageX - track.offsetLeft - startX) }
    track.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    track.addEventListener('mousemove', onMove)
    return () => { track.removeEventListener('mousedown', onDown); window.removeEventListener('mouseup', onUp); track.removeEventListener('mousemove', onMove) }
  }, [])

  return (
    <section ref={ref} style={{ background: 'var(--cream)', padding: 'clamp(72px, 10vw, 140px) 0', overflow: 'hidden' }}>
      <div style={{ padding: '0 clamp(24px, 7vw, 108px)', marginBottom: 'clamp(32px, 5vw, 52px)' }}>
        <p className="bs-h label" style={{ color: 'var(--green)', marginBottom: 14 }}>Bestsellers</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <h2 className="bs-h headline" style={{ color: 'var(--dark)', margin: 0 }}>
            What people are<br />growing right now.
          </h2>
          <p className="bs-h body" style={{ color: 'rgba(20,16,8,0.38)', margin: 0, textAlign: 'right', maxWidth: 240 }}>
            Real orders. No curated lists.<br />No sponsored picks.
          </p>
        </div>
      </div>

      <div ref={trackRef} style={{
        display: 'flex', gap: 12,
        overflowX: 'auto', padding: '4px clamp(24px, 7vw, 108px) 28px',
        scrollbarWidth: 'none', cursor: 'grab',
      }}>
        {PRODUCTS.map((p, i) => (
          <a key={i} href="http://nidhiseed.com" target="_blank" rel="noopener noreferrer"
            className="bs-card" draggable={false}
            style={{
              flexShrink: 0, width: 'clamp(220px, 24vw, 280px)',
              background: '#fff', borderRadius: 18, overflow: 'hidden',
              textDecoration: 'none', display: 'flex', flexDirection: 'column',
              border: '1px solid rgba(20,16,8,0.06)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 28px 72px rgba(20,16,8,0.13)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
          >
            <div style={{ aspectRatio: '1', overflow: 'hidden', background: '#F5EFE4' }}>
              <img src={p.img} alt={p.name} draggable={false}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s ease' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
              />
            </div>
            <div style={{ padding: '18px 20px 22px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
              <div style={{ display: 'flex', gap: 6 }}>
                <span style={{
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  fontSize: '0.6rem', fontWeight: 700, color: 'var(--green)',
                  background: 'rgba(45,106,79,0.1)', padding: '3px 10px', borderRadius: 999,
                  letterSpacing: '0.06em',
                }}>{p.tag}</span>
                <span style={{
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  fontSize: '0.6rem', color: 'rgba(20,16,8,0.4)',
                  background: 'rgba(20,16,8,0.05)', padding: '3px 10px', borderRadius: 999,
                }}>{p.diff}</span>
              </div>
              <h3 style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)',
                fontWeight: 700, color: 'var(--dark)', margin: 0,
              }}>{p.name}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                <span style={{
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  fontSize: '1.15rem', fontWeight: 800, color: 'var(--dark)',
                }}>{p.price}</span>
                <span style={{
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  fontSize: '0.7rem', fontWeight: 700, color: 'var(--green)',
                  letterSpacing: '0.06em',
                }}>Add →</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
