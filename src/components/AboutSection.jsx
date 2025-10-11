import { useRef, useEffect} from 'react'
import {gsap} from 'gsap'
import { title } from 'framer-motion/client'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

function AboutSection() {

    const sectionRef = useRef(null)
    const titleRef = useRef(null)
    const introRef = useRef(null)
    const skillsRef = useRef(null)
    const starRef = useRef([])

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

        //INTRO ANIMATE
        gsap.fromTo(
          introRef.current,
          { y: 100, opacity: 0, filter: 'blur(10px)'},
          {
            y: -400,
            opacity: 1,
            filter:  "blur(0px)",
            duration: 1.5,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 40%",
              toggleActions: "play none none reverse",
            }
          }
        )

        //Star Animation with different
        starRef.current.forEach((star, index) => {
          const direction = index % 2 === 0 ? 1 : -1
          const speed = 0.5 + Math.random() * 0.5

          gsap.to(star, {
            x: `${ direction * (100 + index * 20)}`,
            y: `${ direction * -50 - index * 10}`,
            rotation: direction * 360,
            ease: 'none',
            scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: speed,

            }
          })
        })

        return () => {
          ScrollTrigger.getAll().forEach((trigger) => {
            if (trigger.vars.trigger === sectionRef.current){
              trigger.kill()
            }
          })
        }
    })
 
    const addToStars = (el) => {
      if(el && !starRef.current.includes(el)){
        starRef.current.push(el)
      }
    }

  return (
    <section ref={sectionRef} className='h-screen relative
    overflow-hidden bg-gradient-to-b from-black to-[#9a74cf50]'>

          <div className='absolute inset-0 overflow-hidden '>
            {/* STAR */}
            {[...Array(10)].map((_, i) => (
              <div 
                 ref={addToStars}
                 key={`star-${i}`}
                 className='absolute rounded-full'
                 style={{
                  width: `${10 + i * 3}px`,
                  height: `${10 + i * 3}px`,
                  backgroundColor: "white",
                  opacity: 0.2 + Math.random() * 0.4,
                  top: `${ Math.random() * 100}%`,
                  left: `${ Math.random() * 100}%`,
                    
                 }}
              />
            ))}
          </div>

            <div className='container mx-auto px-4 h-full flex flex-col items-center justify-center'>
                <h1 ref={titleRef} className='text-4xl md:text-6xl font-bold sm:mb-16 text-center text-white opacity-0
                '>About Me</h1>
            </div>

            <div ref={ introRef } className='absolute lg:bottom-[-20rem]
            md:botton-[-10rem] bottom-[-20rem] left-0 w-full flex md:flex-row flex-col justify-between
             lg:px-24 px-5 items-center opacity-0'>
                 <h3 className='text-sm md:text-2xl font-bold text-purple-200 z-50 lg:max-w-[45rem] max-w-[27rem] tracking-wider md:mt-20 sm:mt-[-40rem] mt-[-32rem]'>
                    Hi, I'm Sufail, a passionate Software Engineer with a strong drive to build intelligent, scalable, and future-ready digital solutions. With a growing expertise in AI integration, I specialize in merging traditional software development with cutting-edge artificial intelligence technologies to solve real-world problems.
                    Whether it's automating workflows, creating smart applications, or integrating machine learning models into modern software stacks — I thrive at the intersection of code and intelligence.
                 </h3>
                
                {/* <video 
                   class="lg:h-[40rem] md:h-[25rem] h-[40rem] mix-blend-lighten" 
                   src="/images/sidepic.mp4" 
                   autoplay 
                   muted 
                   loop 
                   playsinline
                >
               Your browser does not support the video tag.
                </video> */}

            </div>
    </section>
  )
}

export default AboutSection