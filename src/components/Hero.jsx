import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { useImageSequence } from '../hooks/useImageSequence'

const TOTAL = 34
const FF    = "'Plus Jakarta Sans', system-ui, sans-serif"

export function Hero() {
  const sectionRef = useRef(null)
  const canvasRef  = useRef(null)
  const textRef    = useRef(null)
  const ctaRef     = useRef(null)
  const loaderRef  = useRef(null)
  const frameIdx   = useRef(0)
  const stRef      = useRef(null)

  const { drawFrame, loaded, ready } = useImageSequence({
    basePath: '/sequence/frame-',
    ext:      'png',
    total:    TOTAL,
    digits:   5,
  })

  // store drawFrame in ref so the scroll closure always gets the latest version
  const drawFrameRef = useRef(drawFrame)
  useEffect(() => { drawFrameRef.current = drawFrame }, [drawFrame])

  function sizeCanvas() {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w   = window.innerWidth
    const h   = window.innerHeight
    canvas.width  = w * dpr
    canvas.height = h * dpr
    canvas.style.width  = w + 'px'
    canvas.style.height = h + 'px'
    const ctx = canvas.getContext('2d')
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)   // reset scale correctly every time
  }

  function paintFrame(i) {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    drawFrameRef.current(ctx, i, window.innerWidth, window.innerHeight)
    frameIdx.current = i
  }

  /* ── ONE-TIME setup — scroll + entrance ── */
  useEffect(() => {
    const section = sectionRef.current

    sizeCanvas()
    paintFrame(0)

    // Entrance animation
    const lines = textRef.current?.querySelectorAll('.h-line') || []
    gsap.set(lines,          { yPercent: 110, opacity: 0 })
    gsap.set(ctaRef.current, { opacity: 0, y: 16 })
    const intro = gsap.timeline({ delay: 0.5 })
    intro
      .to(lines,          { yPercent: 0, opacity: 1, stagger: 0.1, duration: 1.1, ease: 'power4.out' })
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')

    // Scroll-scrubbed canvas
    stRef.current = ScrollTrigger.create({
      trigger: section,
      start:   'top top',
      end:     '+=300%',
      pin:     true,
      anticipatePin: 1,
      scrub:   true,
      onUpdate(self) {
        const p   = self.progress
        const idx = Math.min(Math.round(p * (TOTAL - 1)), TOTAL - 1)
        if (idx !== frameIdx.current) paintFrame(idx)

        const alpha = p < 0.20 ? 1 - p / 0.20 : 0
        if (textRef.current) textRef.current.style.opacity = alpha
        if (ctaRef.current)  ctaRef.current.style.opacity  = alpha
      },
    })

    const onResize = () => { sizeCanvas(); paintFrame(frameIdx.current) }
    window.addEventListener('resize', onResize)

    return () => {
      intro.kill()
      stRef.current?.kill()
      window.removeEventListener('resize', onResize)
    }
  }, [])  // run once — drawFrameRef keeps latest fn

  /* ── Hide loader when ready ── */
  useEffect(() => {
    if (!ready || !loaderRef.current) return
    sizeCanvas()
    paintFrame(frameIdx.current)
    gsap.to(loaderRef.current, {
      opacity: 0, duration: 0.5,
      onComplete: () => { if (loaderRef.current) loaderRef.current.style.display = 'none' },
    })
    stRef.current?.refresh()
  }, [ready])

  const pct = Math.round((loaded / TOTAL) * 100)

  return (
    <section ref={sectionRef} id="story" style={{
      position: 'relative', width: '100vw', height: '100dvh',
      overflow: 'hidden', background: '#F0E8D8',
    }}>

      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, display: 'block' }} />

      {/* Loading overlay */}
      <div ref={loaderRef} style={{
        position: 'absolute', inset: 0, zIndex: 50,
        background: 'var(--cream)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 24,
      }}>
        <img src="/logo.svg" alt="Nidhi Seeds" style={{ height: 56, opacity: 0.7 }} />
        <div style={{ width: 200, height: 1, background: 'rgba(20,16,8,0.1)' }}>
          <div style={{
            height: '100%', background: 'var(--green)',
            width: `${pct}%`, transition: 'width 0.15s linear',
          }} />
        </div>
        <p style={{
          fontFamily: FF, fontSize: '0.62rem', fontWeight: 500,
          letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'rgba(20,16,8,0.35)',
        }}>{pct}%</p>
      </div>

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
        background: 'linear-gradient(to top, rgba(20,16,8,0.65) 0%, rgba(20,16,8,0.1) 45%, transparent 70%)',
      }} />

      {/* Centred headline */}
      <div ref={textRef} style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10, textAlign: 'center', width: '90vw',
      }}>
        <h1 style={{ margin: 0 }}>
          {['Every Meal', 'Begins With', 'a Seed.'].map((line, i) => (
            <div key={i} style={{ overflow: 'hidden' }}>
              <span className="h-line" style={{
                display: 'block', fontFamily: FF,
                fontSize: 'clamp(3.2rem, 8.5vw, 11rem)',
                fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.95,
                color: i < 2 ? '#F5EFE4' : '#86C49C', willChange: 'transform',
              }}>{line}</span>
            </div>
          ))}
        </h1>
        <div style={{ marginTop: 'clamp(12px, 2vw, 24px)', display: 'flex', justifyContent: 'center' }}>
          <span style={{
            fontFamily: FF, fontSize: 'clamp(0.6rem, 0.85vw, 0.75rem)',
            fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase',
            color: 'rgba(245,239,228,0.55)',
          }}>Seed It.&nbsp;&nbsp;&nbsp;Grow It.&nbsp;&nbsp;&nbsp;Eat It.</span>
        </div>
      </div>

      {/* CTAs */}
      <div ref={ctaRef} style={{
        position: 'absolute', bottom: 'clamp(40px, 7vh, 80px)',
        left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: 12, zIndex: 10,
      }}>
        <a href="http://nidhiseed.com" target="_blank" rel="noopener noreferrer" style={{
          padding: '13px 30px', borderRadius: 999, background: '#2D6A4F',
          color: '#F5EFE4', fontFamily: FF, fontSize: '0.72rem', fontWeight: 700,
          letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none',
          transition: 'background 0.2s, transform 0.2s',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = '#1B4332'; e.currentTarget.style.transform = 'translateY(-2px)' }}
          onMouseLeave={e => { e.currentTarget.style.background = '#2D6A4F'; e.currentTarget.style.transform = 'none' }}
        >Start Growing →</a>
        <a href="#seeds" style={{
          padding: '13px 30px', borderRadius: 999,
          border: '1px solid rgba(245,239,228,0.25)',
          background: 'rgba(245,239,228,0.06)', backdropFilter: 'blur(12px)',
          color: 'rgba(245,239,228,0.8)', fontFamily: FF, fontSize: '0.72rem',
          fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase',
          textDecoration: 'none', transition: 'background 0.2s',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(245,239,228,0.14)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(245,239,228,0.06)' }}
        >Find What to Grow</a>
      </div>

      {/* Scroll nudge */}
      <div style={{
        position: 'absolute', bottom: 16, left: '50%',
        transform: 'translateX(-50%)', zIndex: 10,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: 0.45,
      }}>
        <p style={{
          fontFamily: FF, fontSize: '0.54rem', fontWeight: 500,
          letterSpacing: '0.26em', textTransform: 'uppercase',
          color: 'rgba(245,239,228,0.7)', margin: 0,
        }}>scroll</p>
        <div style={{ width: 1, height: 28, background: 'linear-gradient(to bottom, rgba(245,239,228,0.5), transparent)' }} />
      </div>
    </section>
  )
}
