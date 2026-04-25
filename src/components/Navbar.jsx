import { useState, useRef, useEffect } from 'react'
import { gsap } from '../lib/gsap'

function Hamburger({ open, onClick }) {
  const lineStyle = {
    display: 'block',
    width: '100%',
    height: 1.2,
    borderRadius: 999,
    background: '#2A1F14',
    transition: 'transform 0.3s ease, opacity 0.3s ease',
  }
  return (
    <button
      onClick={onClick}
      aria-label={open ? 'Close menu' : 'Open menu'}
      style={{
        width: 36, height: 36,
        display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 6,
        background: 'none', border: 'none', cursor: 'pointer', padding: 2, flexShrink: 0,
      }}
    >
      <span style={{ ...lineStyle, transformOrigin: 'center', transform: open ? 'translateY(7.2px) rotate(45deg)' : 'none' }} />
      <span style={{ ...lineStyle, width: '65%', opacity: open ? 0 : 1 }} />
      <span style={{ ...lineStyle, transformOrigin: 'center', transform: open ? 'translateY(-7.2px) rotate(-45deg)' : 'none' }} />
    </button>
  )
}

const MENU_ITEMS = [
  { label: 'Story',   href: '#story'   },
  { label: 'Seeds',   href: '#seeds'   },
  { label: 'Why Us',  href: '#why'     },
  { label: 'Guides',  href: '#guides'  },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [open,     setOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const drawerRef = useRef(null)
  const itemsRef  = useRef([])

  /* Go cream only after the hero pin fully ends (+=400% scroll) */
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > window.innerHeight * 4.2)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Animate drawer */
  useEffect(() => {
    const drawer = drawerRef.current
    if (!drawer) return
    if (open) {
      gsap.to(drawer, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' })
      gsap.fromTo(
        itemsRef.current.filter(Boolean),
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, stagger: 0.06, delay: 0.12, duration: 0.4, ease: 'power2.out' },
      )
    } else {
      gsap.to(drawer, { y: -12, opacity: 0, duration: 0.3, ease: 'power2.in' })
    }
  }, [open])

  return (
    <>
      {/* ── Bar ── */}
      <header
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          height: 96,
          background: scrolled || open ? '#F4EEE3' : 'transparent',
          borderBottom: scrolled || open ? '1px solid rgba(42,31,20,0.07)' : 'none',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          padding: '0 clamp(20px, 4vw, 52px)',
          transition: 'background 0.4s ease, border-color 0.4s ease',
        }}
      >
        {/* Left — hamburger */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <Hamburger open={open} onClick={() => setOpen(v => !v)} />
        </div>

        {/* Centre — logo */}
        <a
          href="/"
          style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', lineHeight: 0 }}
        >
          <img
            src="/logo.svg"
            alt="Nidhi Seeds"
            draggable={false}
            style={{ height: 78, width: 'auto', display: 'block' }}
          />
        </a>

        {/* Right — Contact Us */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <a
            href="#contact"
            style={{
              padding: '10px 22px',
              borderRadius: 999,
              border: '1px solid rgba(42,31,20,0.28)',
              color: '#2A1F14',
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontSize: '0.72rem',
              fontWeight: 500,
              letterSpacing: '0.07em',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(42,31,20,0.07)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
          >
            Contact Us
          </a>
        </div>
      </header>

      {/* ── Drawer ── */}
      <div
        ref={drawerRef}
        style={{
          position: 'fixed',
          top: 96, left: 0, right: 0,
          background: '#F4EEE3',
          borderBottom: '1px solid rgba(42,31,20,0.07)',
          padding: '28px clamp(20px, 4vw, 52px) 36px',
          zIndex: 99,
          opacity: 0,
          transform: 'translateY(-12px)',
          pointerEvents: open ? 'auto' : 'none',
        }}
      >
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {MENU_ITEMS.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              ref={el => (itemsRef.current[i] = el)}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 600,
                letterSpacing: '-0.025em',
                color: '#2A1F14',
                textDecoration: 'none',
                lineHeight: 1.15,
                display: 'block',
                padding: '6px 0',
                borderBottom: '1px solid rgba(42,31,20,0.06)',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#2D6A4F' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#2A1F14' }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 98 }}
          aria-hidden
        />
      )}
    </>
  )
}
