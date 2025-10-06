import { useRef, useEffect} from 'react'
import {gsap} from 'gsap'
import { title } from 'framer-motion/client'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

function AboutSection() {

    const sectionRef = useRef(null)
    const titleRef = useRef(null)

    useEffect(() =>{
        gsap.registerPlugin(ScrollTrigger)

        gsap.fromTo(
          titleRef.current,
          { y: 100, opacity: 0},
          
          {
            y: -300,
            opacity: 1,
            duration: 0.8,
            scrollTrigger:{
              trigger: sectionRef.current,
               start: "top 40%",
               toggleActions: "play none none reverse",
            }
          }
        )

    }, [])


  return (
    <section ref={sectionRef} className='h-screen relative
    overflow-auto bg-gradient-to-b from-black to-[#9a74cf50]'>
            <div className='container mx-auto px-4 h-full flex flex-col items-center justify-center'>
                <h1 ref={titleRef} className='text-4xl md:text-6xl font-bold sm:mb-16 text-center text-white opacity-0
                '>About Me</h1>
            </div>

            <div>
                 <h3 className='text-sm md:text-2xl font-bold text-pink-200 z-50 lg:max-w-[45rem] max-w-[27rem] tracking-wider md:mt-20 sm:mt-[-40rem] mt-[-32rem]'>
                    Hi, I'm Sufail, a passionate Software Engineer with a strong drive to build intelligent, scalable, and future-ready digital solutions. With a growing expertise in AI integration, I specialize in merging traditional software development with cutting-edge artificial intelligence technologies to solve real-world problems.

                    Whether it's automating workflows, creating smart applications, or integrating machine learning models into modern software stacks — I thrive at the intersection of code and intelligence.
                 </h3>
                 <img src="" alt="" />
            </div>
    </section>
  )
}

export default AboutSection