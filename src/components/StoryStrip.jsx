import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

const FF = "'Plus Jakarta Sans', system-ui, sans-serif"

const CALLOUTS = [
  {
    label: 'SEED COAT',
    desc:  'Shields germination potential through heat, monsoon and cold.',
    top:   '30%',
  },
  {
    label: 'SEED CORE',
    desc:  'Delivers the precise genetics for 98% certified germination.',
    top:   '60%',
  },
]

export function StoryStrip() {
  const ref    = useRef(null)
  const bgRef  = useRef(null)

  useEffect(() => {
    gsap.fromTo(ref.current.querySelectorAll('.sl'),
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, stagger: 0.09, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 72%' } }
    )
    gsap.to(bgRef.current, {
      yPercent: 10, ease: 'none',
      scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
    })
  }, [])

  return (
    <section ref={ref} style={{
      background: 'var(--cream)',
      padding:    'clamp(14px, 2vw, 28px)',
    }}>
      <div style={{
        position:     'relative',
        borderRadius: 28,
        overflow:     'hidden',
        minHeight:    'clamp(480px, 84vh, 860px)',
        display:      'grid',
        gridTemplateColumns: '5fr 4fr',
        background:   '#0D1308',
      }}>

        {/* ── Background photo with parallax ── */}
        <img
          ref={bgRef}
          src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1800&auto=format&q=80&fit=crop"
          alt=""
          style={{
            position:   'absolute',
            top: '-12%', left: 0, right: 0,
            width:      '100%',
            height:     '124%',
            objectFit:  'cover',
            display:    'block',
            opacity:    0.22,
          }}
        />

        {/* ── Directional dark overlay ── */}
        <div style={{
          position:   'absolute',
          inset:      0,
          background: 'linear-gradient(108deg, rgba(13,19,8,0.97) 0%, rgba(13,19,8,0.80) 48%, rgba(13,19,8,0.42) 100%)',
        }} />

        {/* ════════ LEFT PANEL ════════ */}
        <div style={{
          position:       'relative',
          zIndex:         2,
          padding:        'clamp(40px, 5.5vw, 88px)',
          display:        'flex',
          flexDirection:  'column',
          justifyContent: 'space-between',
        }}>

          {/* Top content */}
          <div>
            {/* Label */}
            <p className="sl" style={{
              fontFamily:    FF,
              fontSize:      '0.62rem',
              fontWeight:    600,
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color:         'rgba(134,196,156,0.75)',
              display:       'flex',
              alignItems:    'center',
              gap:           8,
              margin:        '0 0 clamp(20px, 3vw, 40px)',
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%',
                background: '#86C49C', display: 'inline-block', flexShrink: 0,
              }} />
              Our Story
            </p>

            {/* Headline */}
            <div className="sl">
              <h2 style={{
                fontFamily:    FF,
                fontSize:      'clamp(2.6rem, 5.8vw, 7.5rem)',
                fontWeight:    800,
                letterSpacing: '-0.04em',
                lineHeight:    0.95,
                color:         '#F5EFE4',
                margin:        '0 0 clamp(28px, 4vw, 56px)',
              }}>
                A good seed<br />
                <span style={{ color: '#86C49C' }}>doesn't need</span><br />
                much.
              </h2>
            </div>

            {/* Glass stats card */}
            <div className="sl" style={{
              background:           'rgba(245,239,228,0.07)',
              backdropFilter:       'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border:               '1px solid rgba(245,239,228,0.10)',
              borderRadius:         18,
              padding:              'clamp(20px, 2.8vw, 32px) clamp(24px, 3.2vw, 40px)',
              display:              'inline-flex',
              gap:                  'clamp(24px, 3.5vw, 48px)',
              alignItems:           'center',
            }}>
              {/* Left stat — brand pill + label */}
              <div>
                <span style={{
                  display:       'inline-block',
                  background:    'rgba(134,196,156,0.14)',
                  border:        '1px solid rgba(134,196,156,0.28)',
                  borderRadius:  999,
                  padding:       '3px 14px',
                  fontFamily:    FF,
                  fontSize:      '0.6rem',
                  fontWeight:    600,
                  color:         '#86C49C',
                  letterSpacing: '0.08em',
                  marginBottom:  10,
                }}>Nidhi Seeds</span>
                <p style={{
                  fontFamily:  FF,
                  fontSize:    'clamp(0.82rem, 1.1vw, 0.95rem)',
                  fontWeight:  400,
                  color:       'rgba(245,239,228,0.65)',
                  margin:      0,
                  lineHeight:  1.55,
                }}>Farmer-grade seeds<br />for your home garden°</p>
              </div>

              {/* Divider */}
              <div style={{ width: 1, background: 'rgba(245,239,228,0.1)', alignSelf: 'stretch' }} />

              {/* Right stat — big number */}
              <div>
                <p style={{
                  fontFamily:    FF,
                  fontSize:      'clamp(2.6rem, 4.2vw, 5rem)',
                  fontWeight:    800,
                  letterSpacing: '-0.04em',
                  lineHeight:    1,
                  color:         '#86C49C',
                  margin:        '0 0 5px',
                }}>98%</p>
                <p style={{
                  fontFamily:    FF,
                  fontSize:      '0.63rem',
                  fontWeight:    500,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color:         'rgba(245,239,228,0.36)',
                  margin:        0,
                }}>Germination Rate</p>
              </div>
            </div>
          </div>

          {/* Bottom footnote */}
          <p className="sl" style={{
            fontFamily: FF,
            fontSize:   '0.58rem',
            color:      'rgba(245,239,228,0.22)',
            margin:     0,
          }}>°Tested across Indian soil types and climates</p>
        </div>

        {/* ════════ RIGHT PANEL — image + callouts ════════ */}
        <div style={{ position: 'relative', zIndex: 2 }}>

          {/* Right image */}
          <img
            src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&auto=format&q=90&fit=crop"
            alt="Seed variety"
            style={{
              width:      '100%',
              height:     '100%',
              objectFit:  'cover',
              display:    'block',
              opacity:    0.78,
            }}
          />

          {/* Left-edge blend into left panel */}
          <div style={{
            position:   'absolute',
            inset:      '0 auto 0 0',
            width:      '44%',
            background: 'linear-gradient(to right, #0D1308 0%, transparent 100%)',
          }} />

          {/* Bottom-edge dark fade */}
          <div style={{
            position:   'absolute',
            inset:      'auto 0 0 0',
            height:     '30%',
            background: 'linear-gradient(to top, rgba(13,19,8,0.9) 0%, transparent 100%)',
          }} />

          {/* Callout annotations */}
          {CALLOUTS.map((c, i) => (
            <div key={i} className="sl" style={{
              position:    'absolute',
              top:         c.top,
              left:        0,
              right:       'clamp(20px, 3vw, 40px)',
              display:     'flex',
              alignItems:  'center',
              justifyContent: 'flex-end',
              gap:         14,
              transform:   'translateY(-50%)',
            }}>
              <div style={{ textAlign: 'right' }}>
                <p style={{
                  fontFamily:    FF,
                  fontSize:      '0.6rem',
                  fontWeight:    700,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color:         'rgba(245,239,228,0.88)',
                  margin:        '0 0 5px',
                }}>{c.label}</p>
                <p style={{
                  fontFamily:  FF,
                  fontSize:    '0.73rem',
                  fontWeight:  300,
                  color:       'rgba(245,239,228,0.46)',
                  margin:      0,
                  maxWidth:    180,
                  lineHeight:  1.55,
                }}>{c.desc}</p>
              </div>
              {/* Dashed connector */}
              <div style={{
                width:           52,
                height:          1,
                flexShrink:      0,
                backgroundImage: 'repeating-linear-gradient(to right, rgba(245,239,228,0.32) 0, rgba(245,239,228,0.32) 5px, transparent 5px, transparent 10px)',
              }} />
            </div>
          ))}

          {/* CTA link bottom-left of right panel */}
          <div className="sl" style={{
            position: 'absolute',
            bottom:   'clamp(24px, 4vw, 48px)',
            left:     'clamp(20px, 3vw, 40px)',
          }}>
            <a href="http://nidhiseed.com" target="_blank" rel="noopener noreferrer" style={{
              display:        'inline-flex',
              alignItems:     'center',
              gap:            10,
              fontFamily:     FF,
              fontSize:       '0.72rem',
              fontWeight:     700,
              letterSpacing:  '0.1em',
              textTransform:  'uppercase',
              color:          '#F5EFE4',
              textDecoration: 'none',
              transition:     'gap 0.25s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.gap = '18px' }}
              onMouseLeave={e => { e.currentTarget.style.gap = '10px' }}
            >
              <span>Our Story</span>
              <span style={{
                display:         'flex',
                alignItems:      'center',
                justifyContent:  'center',
                width:           34,
                height:          34,
                borderRadius:    '50%',
                border:          '1.5px solid rgba(245,239,228,0.25)',
                flexShrink:      0,
              }}>
                <svg width="12" height="12" viewBox="0 0 13 13" fill="none">
                  <path d="M2 7h9M7.5 3l3.5 4-3.5 4" stroke="#F5EFE4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
