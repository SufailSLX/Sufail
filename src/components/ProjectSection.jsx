// import { useRef, useEffect } from 'react'
// import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import { SlShareAlt } from 'react-icons/sl'
// import Pimg from "../assets/chat-app-icon.webp"

// const ProjectSection = () => {
//     const sectionRef = useRef(null)
//     const titleRef = useRef(null)
//     const titleLineRef = useRef(null)
//     const triggerRef = useRef(null)
//     const horizontalRef = useRef(null)

//     const projectsImage = [
//       {
//         id:1,
//         title: "Chat App",
//         imageSrc: Pimg

//       },
//       {
//         id:2,
//         title: "Chat App",
//         imageSrc: Pimg

//       },
//       {
//         id:3,
//         title: "Chat App",
//         imageSrc: Pimg

//       }
//     ]
//     useEffect(()=>{
//       gsap.registerPlugin(ScrollTrigger)

//       // title 
//       gsap.fromTo(
//         titleRef.current,
//         {
//           y: 100,
//           opacity: 0,
//         },
//         {
//           y:0,
//           opacity: 1,
//           duration: 1.2,
//           ease: "power2.out",
//           ScrollTrigger: {
//             trigger: sectionRef.current,
//             start: "top 80%",
//             toggleActions: "play none none reverse"
//           }
//         }
//       )

//       // Title line animations
//       gsap.fromTo(
//         titleLineRef.current,
//         {
//           width: "0%",
//           opacity: 0,
//         },
//         {
//           width: "100%",
//           opacity: 1,
//           duration: 1.5,
//           ease: "power3.inOut",
//           delay: 0.3,
//           scrollTrigger: {
//             trigger: sectionRef.current,
//             start: "top 80%",
//             toggleActions: "play none none reverse",
//           }
//         }
//       )

//       //Section Effect
//       gsap.fromTo(
//         triggerRef.current,
//         {
//           y: 100,
//           rotationX: 20,
//           opacity: 0,
//         },
//         {
//           y: 0,
//           rotationX: 0,
//           opacity: 1,
//           duration: 1,
//           ease: "power2.out",
//           delay: 0.2,
//           scrollTrigger:{
//             trigger: sectionRef.current,
//             start: "top 70%",
//             toggleActions: "play none none reverse",
//           }
//         }
//       )

//       // PARALLEL EFFECT 
//       gsap.fromTo(
//         sectionRef.current,
//         {
//           backgroundPosition: "50% 0%"
//         },
//         {
//           backgroundPosition: "50% 100%",
//           ease: "none",
//           scrollTrigger: {
//             trigger: sectionRef.current,
//             start:"top bottom",
//             end: "bottom top",
//             scrub: true,
//           }
//         }
//       )

//       //HORIZONTAL SCROLL
//       const horizontalScroll = gsap.to(".panel", {
//         xPercent: -100 * (projectsImage.length - 1),
//         ease: 'none',
//         scrollTrigger: {
//           trigger: triggerRef.current,
//           start: "top top",
//           end: () => `+=${horizontalRef.current.offsetWidth}`,
//           pin: true,
//           scrub: 1,
//           snap: {
//             spanTo: 1 / (projectsImage.length - 1),
//             duration: { main: 0.2, max: 0.3},
//             delay: 0.1,
            
//           },
//           invalidOnRefresh: true,
//         }
//       })

//       // IMAGE ANIMATION 
//      const panels = gsap.utils.toArray(".panel")
//      panels.forEach((panel, i)=>{
//       const image = panel.querySelector(".project-image")
//       const imageTitle = panel.querySelector(".project-title")

//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: panel,
//           containerAnimation: horizontalScroll,
//           start: "left right",
//           end: "right left",
//           scrub: true,
//         }
//       })

//       // IMAGE SCALE 
//       tl.fromTo(image, { scale: 0, rotate: -20,}, { scale: 1, rotate: 1,
//         duration: 0.5, })

//         // TITLE ANIMATIONS 
//         if (imageTitle){
//           tl.fromTo(imageTitle, { y: 30, }, { y: -100, duration: 0.3, }, 0.2 )
//         }

//      })
//     }, [projectsImage.length])

//   return (
//     <section
//     ref={sectionRef}
//     id="horizantol-section"
//     className='realative py-20 bg-[#f6f6f6]'
//     >

//       {/* section title  */}
//         <div className='container mx-auto px-4 mb-16
//         relative z-10'>
//              <h2 ref={titleRef} className='text-4xl md:text-5xl lg:text-6xl font-bold text-black text-center mb-4 opacity-0'>
//              Featured Projects
//              </h2>

//              <div ref={titleLineRef} className='w-0 h-1 bg-gradient-to-r from-purple-500 *:to-pink-500 mx-auto opacity-0'>

//              </div>
//         </div>

//         {/* HORIZONTAL SCROLL  */}
//         <div ref={triggerRef} className='overflow-hidden '>
//           <div ref={horizontalRef} className='horizontal-section flex md:w-[400%] w-[420%]'>
            
//             {projectsImage.map((project)=>(
//             <div Loading key={project} className='panel relative flex item-center justify-center'>
//                <div className='relative w-full h-full
//                flex flex-col items-center justify-center 
//                p-4 sm:p-8 md:p-12'>
//                 <img 
//                 className='project-image max-w-full max-h-full rounded-2xl object-cover'
//                  src={project.imageSrc} 
//                  alt='Project img'
//                 />

//                 <h2 className='project-title flex *:items-center gap-3 
//                 md:text-3xl text-sm md:font-bold text-balck mt-6 z-50 text-nowrap hover:text-gray-400 
//                 transition-colors duration-300 cursor-pointer 
//                 '>
//                   {project.title} <SlShareAlt />
//                 </h2>

//                </div>
//                </div>
//             ))}
//           </div>

//         </div>
//     </section>
//   )
// }

// export default ProjectSection

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"
import { SlShareAlt } from "react-icons/sl"
import Pimg from "../assets/chat-app-icon.webp"

gsap.registerPlugin(ScrollTrigger)

const ProjectSection = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const titleLineRef = useRef(null)
  const triggerRef = useRef(null)
  const horizontalRef = useRef(null)

  const projectsImage = [
    { id: 1, title: "Chat App", imageSrc: Pimg },
    { id: 2, title: "Chat App", imageSrc: Pimg },
    { id: 3, title: "Chat App", imageSrc: Pimg }
  ]

  useEffect(() => {
    // ---------------------------------
    // 🔥 LENIS SMOOTH SCROLL
    // ---------------------------------
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      lerp: 0.08,
      wheelMultiplier: 1.2
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Sync Lenis with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    // ---------------------------------
    // 🔥 TITLE ANIMATION
    // ---------------------------------
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%"
        }
      }
    )

    gsap.fromTo(
      titleLineRef.current,
      { width: "0%", opacity: 0 },
      {
        width: "100%",
        opacity: 1,
        duration: 1.4,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%"
        }
      }
    )

    // ---------------------------------
    // 🔥 HORIZONTAL SCROLL WITH LENIS
    // ---------------------------------
    const horizontalScroll = gsap.to(".panel", {
      xPercent: -100 * (projectsImage.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: () => "+=" + horizontalRef.current.offsetWidth,
        pin: true,
        scrub: 1
      }
    })

    // ---------------------------------
    // 🔥 PANEL ANIMATIONS (image, text, icon)
    // ---------------------------------
    const panels = gsap.utils.toArray(".panel")

    panels.forEach((panel) => {
      const image = panel.querySelector(".project-image")
      const title = panel.querySelector(".project-title")
      const icon = panel.querySelector(".share-icon")

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          containerAnimation: horizontalScroll,
          start: "left right",
          end: "right left",
          scrub: 1
        }
      })

      // IMAGE
      tl.fromTo(
        image,
        { scale: 0.8, opacity: 0, rotate: -10 },
        { scale: 1, opacity: 1, rotate: 0, duration: 0.6, ease: "power3.out" }
      )

      // TITLE
      tl.fromTo(
        title,
        { y: 40, opacity: 0 },
        { y: -10, opacity: 1, duration: 0.4 },
        0.2
      )

      // ⭐ SHARE ICON (Lenis-smooth animation)
      tl.fromTo(
        icon,
        {
          opacity: 0,
          scale: 0.3,
          rotate: -30,
          y: 20,
          filter: "drop-shadow(0px 0px 0px rgba(255,0,150,0))"
        },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          y: -5,
          duration: 0.6,
          ease: "power3.out",
          filter: "drop-shadow(0px 0px 8px rgba(255,0,150,0.6))"
        },
        0.45
      )
    })
  }, [])

  return (
    <section
      ref={sectionRef}
      id="horizontal-section"
      className="relative py-20 bg-[#f6f6f6]"
    >
      {/* TITLE */}
      <div className="container mx-auto px-4 mb-16">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-black text-center opacity-0"
        >
          Featured Projects
        </h2>

        <div
          ref={titleLineRef}
          className="h-1 w-0 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto opacity-0"
        />
      </div>

      {/* HORIZONTAL SCROLLER */}
      <div ref={triggerRef} className="overflow-hidden">
        <div ref={horizontalRef} className="flex md:w-[400%] w-[420%]">
          {projectsImage.map((project) => (
            <div key={project.id} className="panel flex items-center justify-center">
              <div className="flex flex-col items-center p-6">
                <img
                  src={project.imageSrc}
                  alt="Project"
                  className="project-image rounded-2xl object-cover max-h-[60vh]"
                />

                <h2 className="project-title flex items-center gap-3 text-2xl font-semibold mt-6">
                  {project.title}
                  <SlShareAlt className="share-icon text-xl" />
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectSection
