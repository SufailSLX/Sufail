import { useEffect, useRef } from 'react'
import { gsap } from "gsap"

const CustomCursor = () => {

//REFS for cursor
const cursorRef = useRef(null)
const cursorBorderRef = useRef(null)


// HIDE CURSOR 

const isMobile = typeof window !== "undefined" && window.matchMedia('(max-width: 768px)').matches

if(isMobile){
    return null
}

useEffect(()=>{
    const cursor = cursorRef.current
    const cursorBorder = cursorBorderRef.current


    gsap.set([cursor, cursorBorder], {
        xPercent: -50,
        yPercent: -50
    })

    const xTo = gsap.quickSetter(cursor, "x", {
        duration: 02, ease: 'power3.out'
    })
    const yTo = gsap.quickSetter(cursor, "x", {
        duration: 02, ease: 'power3.out'
    })

    const xToBordeer = gsap.quickTo(cursorBorder, 'y',
        {duration: 0.5, ease: 'power3.out'}
    )

    const yToBordeer = gsap.quickTo(cursorBorder, 'y',{
        duration: 0.5, ease: 'power3.out'}
    )
})



  return (
    <>
    {/* MAIN  */}
    <dev 
        ref={cursorRef}
        className='fixed top-0 left-0 w-[20px] h-[20px]
        rounded-full bg-white pointer-events-none z-[999] mix-blend-difference'
    />
        
        <div 
        ref={cursorBorderRef}
        className='fixed top-0 left-0 w-[40px] h-[40px] border rounded-full border-white pointer-events-none z-[999] mix-blend-difference opacity-50 '
        />
       
    </>
  )
}

export default CustomCursor