import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import SophiaCore from './components/SophiaCore'
import SophiaElya from './components/SophiaElya'
import Integrations from './components/Integrations'
import CTASection from './components/CTASection'
import Footer from './components/Footer'

const App = () => {
  return (
         <div className="bg-neutral-950 text-white font-sans">
      <Header />
      <Hero />
      <About />
      <SophiaCore />
      <SophiaElya />
      <Integrations />
      <CTASection />
      <Footer />
    </div>
  )
}

export default App