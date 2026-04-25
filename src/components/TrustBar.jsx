import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

const ITEMS = [
  '30+ Years of Seed Expertise',
  'Tested Germination Rates',
  'Built for Indian Homes',
  'Delivered to Your Door',
  'Farmer-Grade Quality',
  '100% Natural Seeds',
  'Grown Across Gujarat',
  'Same Day Dispatch',
]

const SEP = (
  <span style={{
    display: 'inline-block', width: 4, height: 4, borderRadius: '50%',
    background: '#2D6A4F', margin: '0 32px', verticalAlign: 'middle', flexShrink: 0,
  }} />
)

export function TrustBar() {
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    // Clone the track for seamless loop
    const clone = track.cloneNode(true)
    track.parentNode.appendChild(clone)

    const totalW = track.scrollWidth
    const tl = gsap.to([track, clone], {
      x: `-=${totalW}`,
      duration: 28,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % totalW),
      },
    })

    return () => tl.kill()
  }, [])

  return (
    <div style={{
      background: '#F4EEE3',
      borderTop: '1px solid rgba(42,31,20,0.07)',
      borderBottom: '1px solid rgba(42,31,20,0.07)',
      overflow: 'hidden',
      padding: '18px 0',
      position: 'relative',
    }}>
      {/* Edge fades */}
      <div style={{
        position: 'absolute', inset: '0 auto 0 0', width: 80, zIndex: 2,
        background: 'linear-gradient(to right, #F4EEE3, transparent)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: '0 0 0 auto', width: 80, zIndex: 2,
        background: 'linear-gradient(to left, #F4EEE3, transparent)',
        pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', whiteSpace: 'nowrap', position: 'relative' }}>
        <div ref={trackRef} style={{ display: 'inline-flex', alignItems: 'center', gap: 0 }}>
          {ITEMS.map((item, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
              <span style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: '0.78rem', fontWeight: 500,
                color: '#2A1F14', letterSpacing: '0.04em',
                paddingRight: 32,
              }}>{item}</span>
              {SEP}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
