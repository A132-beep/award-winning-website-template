import { useEffect, useRef } from 'react'
import { ScrollTrigger } from '../lib/gsap'

const SLIDES = [
  {
    phrase: 'Same\nSeed.',
    label:  'Our Promise',
    desc:   'The exact same seeds trusted by professional farmers for 30+ years — now packed for your home garden. No "home version." No compromise. Just the seed, as it should be.',
    stat:   '30+ years',
    statLabel: 'of expertise',
  },
  {
    phrase: 'Same\nQuality.',
    label:  'Proven Performance',
    desc:   "Every batch is tested for Indian soil, Indian climate and Indian kitchens. 98% germination rate — certified, not claimed. Because a seed that doesn't sprout is just dirt.",
    stat:   '98%',
    statLabel: 'germination rate',
  },
  {
    phrase: 'Same\nResult.',
    label:  'One Standard',
    desc:   'Whether your plot is a terrace in Mumbai or a thousand acres in Gujarat — the seed performs the same. That is the Nidhi promise. One seed. One standard. Every time.',
    stat:   '2,000+',
    statLabel: 'seed varieties',
  },
]

const FF = "'Plus Jakarta Sans', system-ui, sans-serif"

function eio(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t }
function remap(p, a, b) {
  if (p <= a) return 0
  if (p >= b) return 1
  return eio((p - a) / (b - a))
}

export function SeedUSP() {
  const sectionRef = useRef(null)
  const videoRef   = useRef(null)
  const leftRefs   = useRef([null, null, null])
  const rightRefs  = useRef([null, null, null])
  const lineRef    = useRef(null)
  const dotRefs    = useRef([null, null, null])

  useEffect(() => {
    const video = videoRef.current

    const onReady = () => { video.pause(); video.currentTime = 0 }
    video.addEventListener('canplay', onReady, { once: true })

    // Slide 0 starts visible; slides 1–2 start hidden
    leftRefs.current.forEach((el, i) => {
      if (!el) return
      el.style.opacity   = i === 0 ? '1' : '0'
      el.style.transform = i === 0 ? 'translateY(0px)' : 'translateY(32px)'
    })
    rightRefs.current.forEach((el, i) => {
      if (!el) return
      el.style.opacity   = i === 0 ? '1' : '0'
      el.style.transform = i === 0 ? 'translateY(0px)' : 'translateY(24px)'
    })

    ScrollTrigger.create({
      trigger:       sectionRef.current,
      start:         'top top',
      end:           '+=400%',
      pin:           true,
      anticipatePin: 1,
      scrub:         true,

      onUpdate({ progress: p }) {
        /* ── Video seek ── */
        if (video.readyState >= 2 && isFinite(video.duration)) {
          const t = p * video.duration
          if (Math.abs(video.currentTime - t) > 0.016) video.currentTime = t
        }

        if (lineRef.current) lineRef.current.style.opacity = String(0.12 + p * 0.08)

        SLIDES.forEach((_, i) => {
          const slotSize = 1 / SLIDES.length
          const ra       = i * slotSize
          const rb       = ra + slotSize
          const inEnd    = ra + slotSize * 0.28
          const outStart = rb - slotSize * 0.22

          const entering = i === 0 ? 1 : remap(p, ra, inEnd)
          const leaving  = remap(p, outStart, rb)
          const alpha    = entering * (1 - leaving)

          const yL = (1 - entering) * 32 + leaving * -24
          const yR = (1 - entering) * 24 + leaving * -18

          const lEl = leftRefs.current[i]
          const rEl = rightRefs.current[i]
          if (lEl) { lEl.style.opacity = String(alpha); lEl.style.transform = `translateY(${yL}px)` }
          if (rEl) { rEl.style.opacity = String(alpha); rEl.style.transform = `translateY(${yR}px)` }

          const dot = dotRefs.current[i]
          if (dot) {
            dot.style.width      = alpha > 0.5 ? '20px' : '6px'
            dot.style.background = alpha > 0.5 ? 'rgba(20,16,8,0.55)' : 'rgba(20,16,8,0.18)'
          }
        })
      },
    })

    return () => video.removeEventListener('canplay', onReady)
  }, [])

  return (
    <section ref={sectionRef} style={{
      position:   'relative',
      width:      '100vw',
      height:     '100dvh',
      background: 'var(--cream)',
      overflow:   'hidden',
    }}>

      {/* ── Full-screen seed video ── */}
      {/* objectFit:contain → portrait video fills full height, cream sides match page */}
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        style={{
          position:  'absolute',
          inset:     0,
          width:     '100%',
          height:    '100%',
          objectFit: 'contain',
          display:   'block',
        }}
      >
        <source src="/videos/seed.mp4" type="video/mp4" />
      </video>

      {/* ── LEFT panel — absolutely centred on left side ── */}
      <div style={{
        position: 'absolute',
        left: 0, top: 0, bottom: 0,
        width: 'clamp(240px, 28vw, 400px)',
        zIndex: 5,
      }}>
        {SLIDES.map(({ phrase, label }, i) => (
          <div
            key={i}
            ref={el => leftRefs.current[i] = el}
            style={{
              position:       'absolute',
              inset:          0,
              display:        'flex',
              flexDirection:  'column',
              justifyContent: 'center',
              padding:        'clamp(28px, 4vw, 60px)',
              opacity:        i === 0 ? 1 : 0,
              transform:      i === 0 ? 'translateY(0px)' : 'translateY(32px)',
            }}
          >
            <p style={{
              fontFamily:    FF,
              fontSize:      '0.6rem',
              fontWeight:    600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color:         'var(--green)',
              margin:        '0 0 clamp(12px, 1.8vw, 20px)',
            }}>{label}</p>
            <h2 style={{
              fontFamily:    FF,
              fontWeight:    800,
              fontSize:      'clamp(3rem, 6vw, 8rem)',
              letterSpacing: '-0.045em',
              lineHeight:    0.92,
              color:         'var(--dark)',
              margin:        0,
              whiteSpace:    'pre-line',
            }}>
              {phrase.split('\n').map((word, wi) => (
                <span key={wi} style={{
                  display: 'block',
                  color:   wi === 1 ? 'var(--green)' : 'var(--dark)',
                }}>{word}</span>
              ))}
            </h2>
          </div>
        ))}
      </div>

      {/* ── RIGHT panel — absolutely centred on right side ── */}
      <div style={{
        position: 'absolute',
        right: 0, top: 0, bottom: 0,
        width: 'clamp(240px, 28vw, 400px)',
        zIndex: 5,
      }}>
        {SLIDES.map(({ desc, stat, statLabel }, i) => (
          <div
            key={i}
            ref={el => rightRefs.current[i] = el}
            style={{
              position:       'absolute',
              inset:          0,
              display:        'flex',
              flexDirection:  'column',
              justifyContent: 'center',
              padding:        'clamp(28px, 4vw, 60px)',
              opacity:        i === 0 ? 1 : 0,
              transform:      i === 0 ? 'translateY(0px)' : 'translateY(24px)',
            }}
          >
            {/* Stat number */}
            <div style={{ marginBottom: 'clamp(16px, 2.5vw, 28px)' }}>
              <p style={{
                fontFamily:    FF,
                fontSize:      'clamp(2rem, 4vw, 5rem)',
                fontWeight:    800,
                letterSpacing: '-0.04em',
                lineHeight:    1,
                color:         'var(--dark)',
                margin:        '0 0 4px',
              }}>{stat}</p>
              <p style={{
                fontFamily:    FF,
                fontSize:      '0.68rem',
                fontWeight:    500,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color:         'rgba(20,16,8,0.38)',
                margin:        0,
              }}>{statLabel}</p>
            </div>

            {/* Divider */}
            <div ref={i === 0 ? lineRef : null} style={{
              width:        44,
              height:       1,
              background:   'var(--dark)',
              opacity:      0.12,
              marginBottom: 'clamp(16px, 2.5vw, 28px)',
            }} />

            {/* Description */}
            <p style={{
              fontFamily: FF,
              fontSize:   'clamp(0.85rem, 1.2vw, 1rem)',
              fontWeight: 300,
              lineHeight: 1.8,
              color:      'rgba(20,16,8,0.58)',
              margin:     '0 0 clamp(24px, 3.5vw, 40px)',
              maxWidth:   340,
            }}>{desc}</p>

            {/* Link */}
            <a href="http://nidhiseed.com" target="_blank" rel="noopener noreferrer"
              style={{
                display:        'inline-flex',
                alignItems:     'center',
                gap:            10,
                fontFamily:     FF,
                fontSize:       '0.7rem',
                fontWeight:     700,
                letterSpacing:  '0.1em',
                textTransform:  'uppercase',
                color:          'var(--dark)',
                textDecoration: 'none',
                transition:     'gap 0.2s',
                alignSelf:      'flex-start',
              }}
              onMouseEnter={e => e.currentTarget.style.gap = '18px'}
              onMouseLeave={e => e.currentTarget.style.gap = '10px'}
            >
              <span>Learn More</span>
              <span style={{
                width: 30, height: 30, borderRadius: '50%',
                border: '1.5px solid rgba(20,16,8,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <svg width="10" height="10" viewBox="0 0 13 13" fill="none">
                  <path d="M2 7h9M7.5 3l3.5 4-3.5 4" stroke="#141008" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>
          </div>
        ))}
      </div>

      {/* Progress dots */}
      <div style={{
        position:  'absolute',
        bottom:    'clamp(24px, 4vh, 40px)',
        left:      '50%',
        transform: 'translateX(-50%)',
        display:   'flex',
        gap:       8,
        zIndex:    20,
      }}>
        {SLIDES.map((_, i) => (
          <div key={i} ref={el => dotRefs.current[i] = el} style={{
            width:      i === 0 ? 20 : 6,
            height:     6,
            borderRadius: 999,
            background: i === 0 ? 'rgba(20,16,8,0.55)' : 'rgba(20,16,8,0.18)',
            transition: 'width 0.35s ease, background 0.35s ease',
          }} />
        ))}
      </div>
    </section>
  )
}
