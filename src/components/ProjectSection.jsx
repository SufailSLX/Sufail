import { useRef, useEffect } from 'react'

const ProjectSection = () => {
    const sectionRef = useRef(null)
  return (
    <section
    ref={sectionRef}
    id="horizantol-section"
    className='realative py-20 bg-[#f6f6f6]'
    >

      {/* section title  */}
        <div className='container mx-auto px-4 mb-16
        relative z-10'>
             <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold text-black text-center mb-4'>
 
             </h2>
        </div>
    </section>
  )
}

export default ProjectSection