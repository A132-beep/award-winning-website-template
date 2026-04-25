import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'

export function StoryStrip() {
  const ref    = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    // Image reveal
    gsap.fromTo(ref.current.querySelector('.story-wrap'),
      { clipPath: 'inset(100% 0% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'power4.inOut',
        scrollTrigger: { trigger: ref.current, start: 'top 68%' } }
    )
    gsap.fromTo(imgRef.current,
      { scale: 1.2 },
      { scale: 1, duration: 1.6, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 68%' } }
    )
    // Parallax
    gsap.to(imgRef.current, {
      yPercent: 15, ease: 'none',
      scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
    })
    // Text lines
    gsap.fromTo(ref.current.querySelectorAll('.sl'),
      { opacity: 0, y: 36 },
      { opacity: 1, y: 0, stagger: 0.13, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current.querySelector('.story-text'), start: 'top 74%' } }
    )
  }, [])

  return (
    <section ref={ref} className="section-pad" style={{ background: 'var(--cream)' }}>
      <div className="container">
        <div style={{
          display: 'grid', gridTemplateColumns: '5fr 4fr',
          gap: 'clamp(40px, 6vw, 96px)', alignItems: 'center',
        }}>
          {/* Image */}
          <div className="story-wrap" style={{
            borderRadius: 20, overflow: 'hidden',
            aspectRatio: '3/4', position: 'relative',
          }}>
            <img ref={imgRef}
              src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&auto=format&q=88&fit=crop"
              alt="Seeds growing"
              style={{ width: '100%', height: '115%', objectFit: 'cover', display: 'block' }}
            />
          </div>

          {/* Text */}
          <div className="story-text" style={{ paddingLeft: 'clamp(0px, 2vw, 32px)' }}>
            <div className="sl">
              <p style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.22em',
                textTransform: 'uppercase', color: '#2D6A4F', marginBottom: 'clamp(20px, 3vw, 36px)',
              }}>Our Story</p>
            </div>

            <div className="sl" style={{ overflow: 'hidden' }}>
              <h2 style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: 'clamp(2rem, 4.2vw, 5rem)',
                fontWeight: 700, letterSpacing: '-0.035em',
                lineHeight: 1.05, color: '#141008', margin: 0,
              }}>A good seed<br />doesn't need much.</h2>
            </div>

            <div className="sl" style={{ marginTop: 'clamp(24px, 4vw, 48px)' }}>
              <p style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: 'clamp(1rem, 1.5vw, 1.15rem)', fontWeight: 300,
                color: 'rgba(20,16,8,0.6)', lineHeight: 1.8,
              }}>
                The right soil. A little water.<br />
                Someone who gives a damn about<br />
                what ends up on their plate.
              </p>
            </div>

            <div className="sl" style={{ marginTop: 'clamp(16px, 2.5vw, 28px)' }}>
              <p style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: 'clamp(1rem, 1.5vw, 1.15rem)', fontWeight: 300,
                color: 'rgba(20,16,8,0.38)', lineHeight: 1.8,
              }}>
                That's where you come in.<br />
                We've spent 30 years getting the seed part right.<br />
                The rest? Easier than you think.
              </p>
            </div>

            <div className="sl" style={{ marginTop: 'clamp(32px, 5vw, 56px)' }}>
              <a href="http://nidhiseed.com" target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 12,
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: '#141008', textDecoration: 'none',
                transition: 'gap 0.25s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.gap = '20px' }}
                onMouseLeave={e => { e.currentTarget.style.gap = '12px' }}
              >
                <span>Our Story</span>
                <span style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 36, height: 36, borderRadius: '50%',
                  border: '1.5px solid rgba(20,16,8,0.2)',
                }}>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M2 7h9M7.5 3l3.5 4-3.5 4" stroke="#141008" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
