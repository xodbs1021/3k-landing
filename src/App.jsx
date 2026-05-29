import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import EditingComparisonSection from './components/EditingComparisonSection'
import ProblemSection from './components/ProblemSection'
import FeaturesSection from './components/FeaturesSection'
import HowItWorksSection from './components/HowItWorksSection'
import ComparisonSection from './components/ComparisonSection'
import CTASection from './components/CTASection'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <main>
        <HeroSection />
        <EditingComparisonSection />
        <ProblemSection />
        <FeaturesSection />
        <HowItWorksSection />
        <ComparisonSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

export default App
