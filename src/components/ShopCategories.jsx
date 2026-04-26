import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'

const CATS = [
  {
    name: 'Vegetables',
    sub:  'From balcony to bowl',
    img:  'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&q=90&fit=crop',
  },
  {
    name: 'Herbs',
    sub:  'Fresh flavour, always within reach',
    img:  'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=900&auto=format&q=90&fit=crop',
  },
  {
    name: 'Flowers',
    sub:  'Colour, life and fresh air',
    img:  'https://images.unsplash.com/photo-1490750967868-88df5691cc59?w=900&auto=format&q=90&fit=crop',
  },
  {
    name: 'Fruits',
    sub:  'Small spaces, big harvests',
    img:  'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=900&auto=format&q=90&fit=crop',
  },
  {
    name: 'Starter Kits',
    sub:  'Everything in one box',
    img:  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&auto=format&q=90&fit=crop',
  },
]

const FF  = "'Plus Jakarta Sans', system-ui, sans-serif"
const GAP = 18   // px between cards

export function ShopCategories() {
  const sectionRef = useRef(null)
  const trackRef   = useRef(null)
  const panelRef   = useRef(null)
  const frameRef   = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const track   = trackRef.current
    const panel   = panelRef.current
    const frame   = frameRef.current
    const cards   = Array.from(track.children)
    const N       = cards.length

    function layout() {
      return {
        cardW:  cards[0].offsetWidth,
        cardH:  cards[0].offsetHeight,
        panelW: panel.offsetWidth,
        viewW:  window.innerWidth,
        viewH:  section.offsetHeight,
        // horizontal center of right area (after left panel)
        cx: panel.offsetWidth + (window.innerWidth - panel.offsetWidth) / 2,
        cy: section.offsetHeight / 2,
      }
    }

    function positionFrame() {
      const { cardW, cardH, cx, cy } = layout()
      const fw = cardW + 26
      const fh = cardH + 26
      frame.style.left   = `${cx - fw / 2}px`
      frame.style.top    = `${cy - fh / 2}px`
      frame.style.width  = `${fw}px`
      frame.style.height = `${fh}px`
    }

    function updateTrack(p) {
      const { cardW, cardH, cx, cy } = layout()
      const activePos = p * (N - 1)       // 0 → N-1 (continuous)
      const x = cx - cardW / 2 - activePos * (cardW + GAP)
      const y = cy - cardH / 2
      track.style.transform = `translate(${x}px, ${y}px)`

      cards.forEach((card, i) => {
        const dist  = Math.abs(activePos - i)
        // Cards further from center shrink and fade
        const scale = 1 - Math.min(dist, 1.5) * 0.08
        const alpha = Math.max(0, 1 - Math.min(dist, 2.2) * 0.28)
        card.style.transform = `scale(${scale})`
        card.style.opacity   = String(alpha)
      })
    }

    positionFrame()
    updateTrack(0)

    // Left-panel entrance
    const enterAnim = gsap.fromTo(panel.querySelectorAll('.sc-enter'),
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 78%' } }
    )

    const pinST = ScrollTrigger.create({
      trigger:       section,
      start:         'top top',
      end:           '+=400%',
      pin:           true,
      anticipatePin: 1,
      scrub:         true,
      invalidateOnRefresh: true,
      onRefresh:     positionFrame,
      onUpdate:      ({ progress: p }) => updateTrack(p),
    })

    const onResize = () => { positionFrame(); updateTrack(0) }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      enterAnim.kill()
      pinST.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} id="seeds" style={{
      position:   'relative',
      width:      '100vw',
      height:     '100dvh',
      background: 'var(--cream)',
      overflow:   'hidden',
    }}>

      {/* ── Scrolling card track ── */}
      <div ref={trackRef} style={{
        position: 'absolute',
        top:  0,
        left: 0,
        display:  'flex',
        gap:      GAP + 'px',
        alignItems: 'flex-start',
      }}>
        {CATS.map((cat, i) => (
          <a
            key={i}
            href="http://nidhiseed.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flexShrink:      0,
              width:           'clamp(210px, 24vw, 340px)',
              height:          'clamp(320px, 56vh, 520px)',
              borderRadius:    18,
              overflow:        'hidden',
              display:         'block',
              position:        'relative',
              textDecoration:  'none',
              transformOrigin: 'center',
            }}
          >
            <img
              src={cat.img}
              alt={cat.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            {/* gradient */}
            <div style={{
              position:   'absolute',
              inset:      0,
              background: 'linear-gradient(to top, rgba(20,16,8,0.88) 0%, rgba(20,16,8,0.04) 55%, transparent 100%)',
            }} />
            {/* arrow */}
            <div style={{
              position: 'absolute', top: 16, right: 16,
              width: 32, height: 32, borderRadius: '50%',
              background: 'rgba(245,239,228,0.15)', backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="10" height="10" viewBox="0 0 13 13" fill="none">
                <path d="M2 7h9M7.5 3l3.5 4-3.5 4" stroke="#F5EFE4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            {/* label */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding:  'clamp(14px, 1.8vw, 22px)',
            }}>
              <p style={{
                fontFamily:    FF,
                fontSize:      '0.55rem',
                fontWeight:    600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color:         'rgba(245,239,228,0.45)',
                margin:        '0 0 5px',
              }}>{cat.sub}</p>
              <h3 style={{
                fontFamily:    FF,
                fontSize:      'clamp(1rem, 1.5vw, 1.45rem)',
                fontWeight:    800,
                letterSpacing: '-0.03em',
                color:         '#F5EFE4',
                margin:        0,
                lineHeight:    1,
              }}>{cat.name}</h3>
            </div>
          </a>
        ))}
      </div>

      {/* ── Dashed spotlight frame (fixed, centered in right area) ── */}
      <div ref={frameRef} style={{
        position:      'absolute',
        border:        '1px dashed rgba(20,16,8,0.2)',
        borderRadius:  22,
        pointerEvents: 'none',
        zIndex:        8,
      }} />

      {/* ── Left panel — cream bg covers passing cards ── */}
      <div ref={panelRef} style={{
        position:       'absolute',
        left: 0, top: 0, bottom: 0,
        width:          'clamp(200px, 22vw, 310px)',
        background:     'var(--cream)',
        zIndex:         10,
        display:        'flex',
        flexDirection:  'column',
        justifyContent: 'center',
        padding:        'clamp(28px, 4vw, 52px)',
      }}>
        <p className="sc-enter" style={{
          fontFamily:    FF,
          fontSize:      '0.6rem',
          fontWeight:    600,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color:         'var(--green)',
          marginBottom:  16,
        }}>Shop by Category</p>

        <h2 className="sc-enter" style={{
          fontFamily:    FF,
          fontWeight:    800,
          fontSize:      'clamp(1.8rem, 3.2vw, 4rem)',
          letterSpacing: '-0.04em',
          lineHeight:    0.96,
          color:         'var(--dark)',
          margin:        '0 0 clamp(12px, 2vw, 24px)',
        }}>
          Grow<br />
          <span style={{ color: 'var(--green)' }}>what you</span><br />
          actually eat.
        </h2>

        <p className="sc-enter" style={{
          fontFamily: FF,
          fontSize:   'clamp(0.74rem, 0.95vw, 0.86rem)',
          fontWeight: 300,
          color:      'rgba(20,16,8,0.42)',
          lineHeight: 1.72,
          marginBottom: 28,
        }}>
          2,000+ seed varieties.<br />
          Tested. Trusted. Grown.
        </p>

        <a className="sc-enter"
          href="http://nidhiseed.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display:        'inline-flex',
            alignItems:     'center',
            gap:            8,
            padding:        '10px 20px',
            borderRadius:   999,
            border:         '1px solid rgba(20,16,8,0.16)',
            fontFamily:     FF,
            fontSize:       '0.68rem',
            fontWeight:     600,
            letterSpacing:  '0.1em',
            textTransform:  'uppercase',
            color:          'var(--dark)',
            textDecoration: 'none',
            transition:     'background 0.2s',
            alignSelf:      'flex-start',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(20,16,8,0.06)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >View All →</a>

        <div className="sc-enter" style={{ marginTop: 36, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 24, height: 1, background: 'rgba(20,16,8,0.12)' }} />
          <p style={{
            fontFamily:    FF,
            fontSize:      '0.55rem',
            fontWeight:    500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color:         'rgba(20,16,8,0.22)',
            margin:        0,
          }}>Scroll to explore</p>
        </div>
      </div>

      {/* ── Right edge fade ── */}
      <div style={{
        position:      'absolute',
        top: 0, bottom: 0, right: 0,
        width:         'clamp(60px, 7vw, 100px)',
        background:    'linear-gradient(to left, var(--cream) 20%, transparent)',
        pointerEvents: 'none',
        zIndex:        9,
      }} />
    </section>
  )
}
