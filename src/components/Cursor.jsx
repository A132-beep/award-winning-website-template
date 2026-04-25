import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

export function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const pos     = useRef({ x: -100, y: -100, rx: -100, ry: -100 })
  const hovered = useRef(false)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current

    const onMove = e => {
      pos.current.x = e.clientX
      pos.current.y = e.clientY
      gsap.set(dot, { x: e.clientX, y: e.clientY })
    }

    const onEnter = () => {
      hovered.current = true
      gsap.to(ring, { scale: 2.4, opacity: 0.5, duration: 0.35, ease: 'power2.out' })
      gsap.to(dot,  { scale: 0.4, duration: 0.25, ease: 'power2.out' })
    }
    const onLeave = () => {
      hovered.current = false
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out' })
      gsap.to(dot,  { scale: 1, duration: 0.3, ease: 'power2.out' })
    }

    window.addEventListener('mousemove', onMove)

    // Magnetic elements
    const targets = document.querySelectorAll('a, button, [data-cursor]')
    targets.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    // Lag ring behind cursor
    const tick = () => {
      pos.current.rx += (pos.current.x - pos.current.rx) * 0.12
      pos.current.ry += (pos.current.y - pos.current.ry) * 0.12
      gsap.set(ring, { x: pos.current.rx, y: pos.current.ry })
    }
    gsap.ticker.add(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      targets.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
      gsap.ticker.remove(tick)
    }
  }, [])

  return (
    <>
      {/* Outer ring — lags behind */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 36, height: 36,
          borderRadius: '50%',
          border: '1.5px solid rgba(45,106,79,0.6)',
          pointerEvents: 'none',
          zIndex: 99999,
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'multiply',
          willChange: 'transform',
        }}
      />
      {/* Dot — instant */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 6, height: 6,
          borderRadius: '50%',
          background: '#2D6A4F',
          pointerEvents: 'none',
          zIndex: 99999,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      />
    </>
  )
}
