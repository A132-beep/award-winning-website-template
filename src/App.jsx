import { useEffect }       from 'react'
import { ScrollTrigger }   from './lib/gsap'
import { SmoothScroll }    from './components/SmoothScroll'
import { Cursor }          from './components/Cursor'
import { Navbar }          from './components/Navbar'
import { Hero }            from './components/Hero'
import { TrustBar }        from './components/TrustBar'
import { SeedUSP }         from './components/SeedUSP'
import { StoryStrip }      from './components/StoryStrip'
import { ShopCategories }  from './components/ShopCategories'
import { GrowTool }        from './components/GrowTool'
import { Bestsellers }     from './components/Bestsellers'
import { WhyUs }           from './components/WhyUs'
import { StarterKit }      from './components/StarterKit'
import { GrowingGuides }   from './components/GrowingGuides'
import { Reviews }         from './components/Reviews'
import { Footer }          from './components/Footer'

function App() {
  useEffect(() => {
    // Give all child effects time to register their ScrollTriggers, then recalculate spacers
    const id = setTimeout(() => ScrollTrigger.refresh(), 600)
    return () => clearTimeout(id)
  }, [])

  return (
    <SmoothScroll>
      <Cursor />
      <div className="grain">
        <Navbar />
        <Hero />
        <TrustBar />
        <SeedUSP />
        <StoryStrip />
        <ShopCategories />
        <GrowTool />
        <Bestsellers />
        <WhyUs />
        <StarterKit />
        <GrowingGuides />
        <Reviews />
        <Footer />
      </div>
    </SmoothScroll>
  )
}

export default App
