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

useEffect(() => {
  const cursor = cursorRef.current
  const cursorBorder = cursorBorderRef.current

  if (!cursor || !cursorBorder) return

  gsap.set([cursor, cursorBorder], {
    xPercent: -50,
    yPercent: -50
  })

  const xTo = gsap.quickSetter(cursor, "x", {
    duration: 0.1, ease: 'power2.out'
  })
  const yTo = gsap.quickSetter(cursor, "y", {
    duration: 0.1, ease: 'power2.out'
  })

  const xToBorder = gsap.quickTo(cursorBorder, 'x', {
    duration: 0.3, ease: 'power2.out'
  })
  const yToBorder = gsap.quickTo(cursorBorder, 'y', {
    duration: 0.3, ease: 'power2.out'
  })

  const handleMouseMove = (e) => {
    xTo(e.clientX)
    yTo(e.clientY)
    xToBorder(e.clientX)
    yToBorder(e.clientY)
  }

  window.addEventListener("mousemove", handleMouseMove)

  const handleMouseDown = () => {
    gsap.to([cursor, cursorBorder], {
      scale: 0.6,
      duration: 0.2,
    })
  }

  const handleMouseUp = () => {
    gsap.to([cursor, cursorBorder], {
      scale: 1,
      duration: 0.2,
    })
  }

  document.addEventListener("mousedown", handleMouseDown)
  document.addEventListener("mouseup", handleMouseUp)

  // ✅ Cleanup function
  return () => {
    window.removeEventListener("mousemove", handleMouseMove)
    document.removeEventListener("mousedown", handleMouseDown)
    document.removeEventListener("mouseup", handleMouseUp)
  }
}, [])



  return (
    <>
    {/* MAIN  */}
    <div 
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