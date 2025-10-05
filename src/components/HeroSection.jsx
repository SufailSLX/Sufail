import { motion } from 'framer-motion'
import Spline from '@splinetool/react-spline';


const HeroSection = () => {
  return (

    <section className='h-screen bg-gradient-to-b from-violet-900
     to-black flex xl:flex-row flex-col-reverse items-center justify-between
     lg:px-24 px-10 relative overflow-hidden'>

        {/* LEFT SIDE  */}

        <div className='z-40 xl;mb-0 mb-[20%]'>
            <motion.h1 
            initial={{ opacity: 0, y: 80}}
            animate={{ opacity:1, y: 0}}
            transition={{
                type: 'spring',
                stiffness: 40,
                damping: 25,
                delay: 1.3,
                duration: 1.5
            }}
            className='text-5xl md:text-7xl lg:text-8xl font-bold
            z-10 mb-6 '>
                Building Fast <br /> Reliable Results
            </motion.h1>

            <motion.p
            initial={{ opacity: 0, y: 80}}
            animate={{ opacity:1, y: 0}}
            transition={{
                type: 'spring',
                stiffness: 40,
                damping: 25,
                delay: 1.8,
                duration: 1.5
            }}
            className='text-xl md:text:1xl lg:text-2xl text-purple-200
            max-w-2xl'>
                Driven to create intelligent, user-centered web solutions at the intersection of AI and innovation, with a strong focus on building scalable products that empower startups and shape the future of technology.
            </motion.p>
        </div>

        {/* RIGHT SIDE  */}

        {/* <Spline scene="https://prod.spline.design/EtskZCF10O0zBMV2/scene.splinecode" /> */}

    </section>

)
}

export default HeroSection