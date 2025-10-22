import { useRef, useEffect} from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const ContactSection= () => {

  
  return (
    <section className='flex items-center justify-center bg-black relative '
    style={{ overscrollBehavior: "none"}}>

      {/* minal circle  */}
       <div ref={circleRef}
       className='w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 rounded-full
       flex items-center justify-center relative transition-shadow duration-1000 shadow-violet-300/50 shadow-lg
       bg-gradient-to-r from-violet-400 to-pink-100'>

       </div>
    </section>
  )
}

export default ContactSection