import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const ProjectSection = () => {
    const sectionRef = useRef(null)
    const titleRef = useRef(null)
    const titleLineRef = useRef(null)

    useEffect(()=>{
      gsap.registerPlugin(ScrollTrigger)

      // title 
      gsap.fromTo(
        titleRef.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          y:0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          ScrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // Title line action 
      gsap.fromTo(
        titleLineRef.current,
        {
          width: "0%",
          opacity: 0,
        },
        {
          width: "100%",
          opacity: 1,
          duration: 1.5,
          ease: "power3.inOut",
          delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        }
      )
    })

  return (
    <section
    ref={sectionRef}
    id="horizantol-section"
    className='realative py-20 bg-[#f6f6f6]'
    >

      {/* section title  */}
        <div className='container mx-auto px-4 mb-16
        relative z-10'>
             <h2 ref={titleRef} className='text-4xl md:text-5xl lg:text-6xl font-bold text-black text-center mb-4 opacity-0'>
             Featured Projects
             </h2>

             <div ref={titleLineRef} className='w-0 h-1 bg-gradient-to-r from-purple-500 *:to-pink-500 mx-auto opacity-0'>

             </div>
        </div>
    </section>
  )
}

export default ProjectSection