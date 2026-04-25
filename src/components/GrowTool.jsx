import { useState, useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

const SPACES  = ['Balcony', 'Terrace', 'Window', 'Garden']
const LEVELS  = ['First Timer', 'Grown Before']
const SEASONS = ['Summer', 'Monsoon', 'Winter']

const SEEDS = {
  Balcony:  { 'First Timer': ['Cherry Tomato', 'Coriander', 'Spinach', 'Methi'], 'Grown Before': ['Chilli', 'Brinjal', 'Okra', 'Basil'] },
  Terrace:  { 'First Timer': ['Tomato', 'Cucumber', 'Spinach', 'Mint'],          'Grown Before': ['Watermelon', 'Pumpkin', 'Okra', 'Chilli'] },
  Window:   { 'First Timer': ['Microgreens', 'Coriander', 'Methi', 'Mint'],      'Grown Before': ['Cherry Tomato', 'Herbs Mix', 'Chilli', 'Basil'] },
  Garden:   { 'First Timer': ['Tomato', 'Brinjal', 'Spinach', 'Okra'],           'Grown Before': ['Watermelon', 'Beans', 'Pumpkin', 'Chilli'] },
}

const DIFFICULTY = { 'Cherry Tomato': 'Easy', Coriander: 'Easy', Spinach: 'Easy', Methi: 'Easy', Mint: 'Easy', Microgreens: 'Easy', 'Herbs Mix': 'Easy', Basil: 'Easy', Tomato: 'Medium', Cucumber: 'Medium', Chilli: 'Medium', Brinjal: 'Medium', Okra: 'Medium', Beans: 'Medium', Pumpkin: 'Hard', Watermelon: 'Hard' }
const PRICE = { 'Cherry Tomato': '₹59', Coriander: '₹39', Spinach: '₹45', Methi: '₹35', Mint: '₹49', Microgreens: '₹55', 'Herbs Mix': '₹65', Basil: '₹52', Tomato: '₹49', Cucumber: '₹55', Chilli: '₹45', Brinjal: '₹48', Okra: '₹42', Beans: '₹52', Pumpkin: '₹58', Watermelon: '₹72' }

function Chip({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: '10px 22px', borderRadius: 999, border: 'none',
      background: active ? 'var(--green)' : 'rgba(20,16,8,0.07)',
      color: active ? '#F5EFE4' : 'rgba(20,16,8,0.55)',
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      fontSize: '0.82rem', fontWeight: active ? 600 : 400,
      cursor: 'pointer', transition: 'all 0.18s ease',
    }}>{label}</button>
  )
}

export function GrowTool() {
  const ref = useRef(null)
  const resultsRef = useRef(null)
  const [space,  setSpace]  = useState(null)
  const [level,  setLevel]  = useState(null)
  const [season, setSeason] = useState(null)
  const [shown,  setShown]  = useState(false)

  const ready = space && level && season
  const seeds = ready ? (SEEDS[space]?.[level] || []) : []

  useEffect(() => {
    gsap.fromTo(ref.current.querySelectorAll('.gt-row'),
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 78%' } }
    )
  }, [])

  function handleFind() {
    if (!ready) return
    setShown(true)
    setTimeout(() => {
      if (!resultsRef.current) return
      const cards = resultsRef.current.querySelectorAll('.gt-card')
      gsap.fromTo(cards,
        { opacity: 0, y: 28, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.07, duration: 0.5, ease: 'power2.out' }
      )
    }, 20)
  }

  return (
    <section ref={ref} id="find" className="section-pad" style={{ background: '#EDE6D8' }}>
      <div className="container">
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(40px, 7vw, 96px)', alignItems: 'start',
        }}>
          {/* Left — heading */}
          <div>
            <p className="gt-row label" style={{ color: 'var(--green)', marginBottom: 16 }}>Find Your Seeds</p>
            <h2 className="gt-row" style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontSize: 'clamp(2rem, 4.5vw, 5.5rem)',
              fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.0,
              color: 'var(--dark)', margin: '0 0 clamp(16px, 2vw, 24px)',
            }}>Your space.<br />Your food.</h2>
            <p className="gt-row body" style={{ color: 'rgba(20,16,8,0.5)', margin: 0 }}>
              Tell us where you're growing and what<br />you know. We'll tell you exactly what to plant.
            </p>
          </div>

          {/* Right — selectors */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(24px, 3.5vw, 40px)' }}>
            {[
              { label: 'Your Space',      opts: SPACES,  val: space,  set: setSpace  },
              { label: 'Your Experience', opts: LEVELS,  val: level,  set: setLevel  },
              { label: 'Current Season',  opts: SEASONS, val: season, set: setSeason },
            ].map(({ label, opts, val, set }) => (
              <div key={label} className="gt-row">
                <p style={{
                  fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                  fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: 'rgba(20,16,8,0.38)',
                  marginBottom: 12,
                }}>{label}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {opts.map(o => <Chip key={o} label={o} active={val === o} onClick={() => { set(o); setShown(false) }} />)}
                </div>
              </div>
            ))}

            <div className="gt-row">
              <button onClick={handleFind} disabled={!ready} style={{
                padding: '14px 36px', borderRadius: 999,
                background: ready ? 'var(--green)' : 'rgba(20,16,8,0.1)',
                color: ready ? '#F5EFE4' : 'rgba(20,16,8,0.28)',
                fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em',
                textTransform: 'uppercase', border: 'none',
                cursor: ready ? 'pointer' : 'default', transition: 'all 0.2s',
              }}
                onMouseEnter={e => ready && (e.currentTarget.style.background = '#1B4332')}
                onMouseLeave={e => ready && (e.currentTarget.style.background = 'var(--green)')}
              >Find My Seeds →</button>
            </div>
          </div>
        </div>

        {/* Results */}
        {shown && seeds.length > 0 && (
          <div ref={resultsRef} style={{ marginTop: 'clamp(48px, 8vw, 96px)' }}>
            <p style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'rgba(20,16,8,0.35)',
              marginBottom: 24,
            }}>Recommended for you</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
              {seeds.map(name => (
                <a key={name} className="gt-card" href="http://nidhiseed.com" target="_blank" rel="noopener noreferrer"
                  style={{
                    background: '#F5EFE4', borderRadius: 16, padding: '24px 22px',
                    display: 'flex', flexDirection: 'column', gap: 14,
                    textDecoration: 'none',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(20,16,8,0.1)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{
                      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                      fontSize: '1rem', fontWeight: 700, color: 'var(--dark)', margin: 0,
                    }}>{name}</h4>
                    <span style={{
                      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                      fontSize: '0.62rem', fontWeight: 600, color: 'var(--green)',
                      background: 'rgba(45,106,79,0.1)', padding: '3px 10px', borderRadius: 999,
                    }}>{DIFFICULTY[name] || 'Easy'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                      fontSize: '1.1rem', fontWeight: 800, color: 'var(--dark)',
                    }}>{PRICE[name] || '₹49'}</span>
                    <span style={{
                      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                      fontSize: '0.72rem', fontWeight: 600, color: 'var(--green)',
                    }}>Buy →</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
