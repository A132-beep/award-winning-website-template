import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'

const CATS = [
  {
    name: 'Vegetables',
    sub: 'From balcony to bowl',
    img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&q=90&fit=crop',
    featured: false,
  },
  {
    name: 'Herbs',
    sub: 'Fresh flavour, always within reach',
    img: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=900&auto=format&q=90&fit=crop',
    featured: false,
  },
  {
    name: 'Flowers',
    sub: 'Colour, life and fresh air',
    img: 'https://images.unsplash.com/photo-1490750967868-88df5691cc59?w=900&auto=format&q=90&fit=crop',
    featured: true,   // the centred hero card
  },
  {
    name: 'Fruits',
    sub: 'Small spaces, big harvests',
    img: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=900&auto=format&q=90&fit=crop',
    featured: false,
  },
  {
    name: 'Starter Kits',
    sub: 'Everything in one box',
    img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&auto=format&q=90&fit=crop',
    featured: false,
  },
]

export function ShopCategories() {
  const sectionRef = useRef(null)
  const trackRef   = useRef(null)
  const panelRef   = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const track   = trackRef.current

    // heading lines entrance
    gsap.fromTo(section.querySelectorAll('.sc-enter'),
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 75%' } }
    )

    // Horizontal scroll — stop when last card reaches the right viewport edge
    gsap.to(track, {
      x: () => -(track.scrollWidth - window.innerWidth + panelRef.current.offsetWidth + 40),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=250%',
        pin: true,
        anticipatePin: 1,
        scrub: true,
        invalidateOnRefresh: true,
      },
    })

    // Subtle image zoom on the featured card on hover
    track.querySelectorAll('.cat-card img').forEach(img => {
      const card = img.closest('.cat-card')
      card.addEventListener('mouseenter', () => gsap.to(img, { scale: 1.06, duration: 0.6, ease: 'power2.out' }))
      card.addEventListener('mouseleave', () => gsap.to(img, { scale: 1,    duration: 0.5, ease: 'power2.out' }))
    })
  }, [])

  const FF = "'Plus Jakarta Sans', system-ui, sans-serif"

  return (
    <section
      ref={sectionRef}
      id="seeds"
      style={{
        position: 'relative',
        width: '100vw', height: '100dvh',
        background: '#141008',
        overflow: 'hidden',
        display: 'flex', alignItems: 'center',
      }}
    >
      {/* ── LEFT PANEL — fixed text ── */}
      <div ref={panelRef} style={{
        flexShrink: 0,
        width: 'clamp(260px, 30vw, 420px)',
        padding: 'clamp(32px, 5vw, 72px)',
        zIndex: 10, position: 'relative',
      }}>
        <p className="sc-enter" style={{
          fontFamily: FF, fontSize: '0.65rem', fontWeight: 600,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'rgba(134,196,156,0.7)', marginBottom: 20,
        }}>Shop by Category</p>

        <h2 className="sc-enter" style={{
          fontFamily: FF, fontWeight: 800,
          fontSize: 'clamp(2rem, 4vw, 5rem)',
          letterSpacing: '-0.04em', lineHeight: 0.95,
          color: '#F5EFE4', margin: '0 0 clamp(16px, 2.5vw, 32px)',
        }}>
          Grow<br />
          <span style={{ color: '#86C49C' }}>what you</span><br />
          actually eat.
        </h2>

        <p className="sc-enter" style={{
          fontFamily: FF, fontSize: 'clamp(0.82rem, 1.1vw, 0.95rem)',
          fontWeight: 300, color: 'rgba(245,239,228,0.4)',
          lineHeight: 1.7, marginBottom: 36,
        }}>
          2,000+ seed varieties.<br />
          Tested. Trusted. Grown.
        </p>

        <a className="sc-enter" href="http://nidhiseed.com" target="_blank" rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '11px 22px', borderRadius: 999,
            border: '1px solid rgba(245,239,228,0.18)',
            fontFamily: FF, fontSize: '0.72rem', fontWeight: 600,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: '#F5EFE4', textDecoration: 'none',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(245,239,228,0.08)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
        >
          View All →
        </a>

        {/* Scroll hint */}
        <div style={{ marginTop: 48, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 32, height: 1, background: 'rgba(245,239,228,0.15)' }} />
          <p style={{
            fontFamily: FF, fontSize: '0.58rem', fontWeight: 500,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(245,239,228,0.2)', margin: 0,
          }}>Scroll to explore</p>
        </div>
      </div>

      {/* ── HORIZONTAL TRACK ── */}
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          paddingRight: 80,
          flexShrink: 0,
        }}
      >
        {CATS.map((cat, i) => (
          <a
            key={i}
            href="http://nidhiseed.com"
            target="_blank"
            rel="noopener noreferrer"
            className="cat-card"
            style={{
              flexShrink: 0,
              position: 'relative',
              width: cat.featured ? 'clamp(260px, 28vw, 400px)' : 'clamp(200px, 22vw, 310px)',
              height: cat.featured ? '78vh' : '65vh',
              borderRadius: 16,
              overflow: 'hidden',
              textDecoration: 'none',
              display: 'block',
              /* featured card gets a dashed outline frame */
              outline: cat.featured ? '1px dashed rgba(245,239,228,0.25)' : 'none',
              outlineOffset: cat.featured ? 8 : 0,
              transition: 'outline-color 0.3s',
            }}
          >
            {/* Image */}
            <img
              src={cat.img}
              alt={cat.name}
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover', display: 'block',
                transition: 'transform 0.6s ease',
              }}
            />

            {/* Dark gradient */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(20,16,8,0.92) 0%, rgba(20,16,8,0.1) 50%, transparent 100%)',
            }} />

            {/* Featured label */}
            {cat.featured && (
              <div style={{
                position: 'absolute', top: 20, left: 20,
                padding: '5px 14px', borderRadius: 999,
                background: 'rgba(245,239,228,0.12)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(245,239,228,0.15)',
              }}>
                <span style={{
                  fontFamily: FF, fontSize: '0.6rem', fontWeight: 700,
                  letterSpacing: '0.16em', textTransform: 'uppercase',
                  color: '#F5EFE4',
                }}>Featured</span>
              </div>
            )}

            {/* Arrow */}
            <div style={{
              position: 'absolute', top: 20, right: 20,
              width: 34, height: 34, borderRadius: '50%',
              background: 'rgba(245,239,228,0.1)',
              backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="11" height="11" viewBox="0 0 13 13" fill="none">
                <path d="M2 7h9M7.5 3l3.5 4-3.5 4" stroke="#F5EFE4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Bottom text */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: 'clamp(18px, 2.5vw, 28px)',
            }}>
              <p style={{
                fontFamily: FF, fontSize: 'clamp(0.6rem, 0.8vw, 0.7rem)',
                fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'rgba(245,239,228,0.45)', margin: '0 0 8px',
              }}>{cat.sub}</p>
              <h3 style={{
                fontFamily: FF,
                fontSize: cat.featured ? 'clamp(1.4rem, 2.2vw, 2rem)' : 'clamp(1.1rem, 1.8vw, 1.6rem)',
                fontWeight: 800, letterSpacing: '-0.03em',
                color: '#F5EFE4', margin: 0, lineHeight: 1,
              }}>{cat.name}</h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
