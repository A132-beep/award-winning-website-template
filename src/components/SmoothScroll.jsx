import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../lib/gsap'

export function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out — silky deceleration
      smoothWheel: true,
      wheelMultiplier: 0.75,   // slightly slower so it feels weighty, not twitchy
      touchMultiplier: 2,
      infinite: false,
    })

    // Drive Lenis entirely through GSAP ticker — single RAF, no double loop
    const tick = time => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0) // never skip frames to "catch up" — keeps motion smooth

    // Keep ScrollTrigger in sync with Lenis virtual scroll position
    lenis.on('scroll', ScrollTrigger.update)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])

  return children
}
