import { useEffect } from 'react'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import AboutSection from './components/AboutSection'
import CustomCursor from './components/CustomCursor'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import ProjectSection from './components/ProjectSection'


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
    <>
    <Header />
    <HeroSection />
    <CustomCursor />
    <AboutSection />
    <ProjectSection />
    </>
    
  )
}

export default App