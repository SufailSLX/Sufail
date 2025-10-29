import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import AboutSection from './components/AboutSection'
import CustomCursor from './components/CustomCursor'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import ProjectSection from './components/ProjectSection'
import ContactSection from './components/ContactSection';
import NotFound from './components/NotFound';
import Footer from './components/Footer';
import ProgressBar from './components/ProgressBar';

const App = () => {

  useEffect(()=>{

    gsap.registerPlugin(ScrollTrigger)

    //Refresh scroll

    ScrollTrigger.refresh()

    // clean up scroll
    return () => {
      ScrollTrigger.getAll().forEach((trigger)=> trigger.kill ())
    }
  },[])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <HeroSection />
            <CustomCursor />
            <AboutSection />
            <ProjectSection />
            <ContactSection />
            <Footer />
            <ProgressBar />
          </>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App