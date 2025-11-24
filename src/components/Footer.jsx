// import { FiGithub, FiTwitter, FiLinkedin } from "react-icons/fi"

// function Footer() {
//   return (
//     <footer className="bg-black text-white py-16 px-6
//     mt-40">
//         <div className="max-w-6xl mx-auto">
//             <div className="flex justify-between items-center">

//                     {/* / LOGO  */}
//                     <h2 className="text-3xl font-bold bg-gradient-to-t from-purple-400 to-purple-200
//                     bg-clip-text text-transparent">
//                        Sufail
//                     </h2>

//                     {/* scroll links.  */}
//                     <div>
//                         <h3 className="text-xl font-semibold mb-4 text-purple-200">
//                             Connect
//                         </h3>
//                         <div className="flex space-x-4 ">
//                             <a className="text-gray-700 hover:text-violet-400 transition-colors" href="#">
//                                 <FiGithub className="w-5 h-5"/>
//                             </a>
                            
//                             <a className="text-gray-700 hover:text-violet-400 transition-colors" href="#">
//                                 <FiLinkedin className="w-5 h-5"/>
//                             </a>

//                             <a className="text-gray-700 hover:text-violet-400 transition-colors" href="#">
//                                 <FiTwitter className="w-5 h-5"/>
//                             </a>
//                         </div>

//                     </div>
//             </div>

//             <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col
//             md:flex-row justify-between items-center">

//                 <p className="text-gray-500 text-sm">
//                    Sufail. All rights reserved. 
//                 </p>

//                 <div className="flex space-x-6 mt-4 md:mt-0">
//                     <a className="text-gray-500 hover:text-white text-sm transition-colors" href="">
//                         Privacy Policy
//                     </a>

//                      <a className="text-gray-500 hover:text-white text-sm transition-colors" href="">
//                         Terms of Service
//                     </a>

//                      <a className="text-gray-500 hover:text-white text-sm transition-colors" href="">
//                         Cookie Policy
//                     </a>

//                 </div>

//             </div>
//         </div>
//     </footer>
//   )
// }

// export default Footer

import { useEffect, useRef } from "react"
import { FiGithub, FiTwitter, FiLinkedin } from "react-icons/fi"
import gsap from "gsap"

function Footer() {
  const footerRef = useRef(null)
  const magneticRefs = useRef([])

  // Custom cursor refs
  const cursorRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current

    // ---------------------------
    // CUSTOM CURSOR FOLLOW
    // ---------------------------
    window.addEventListener("mousemove", (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power3.out",
      })
    })

    // ---------------------------
    // MAGNETIC BUTTON EFFECT
    // ---------------------------
    magneticRefs.current.forEach((el) => {
      const magnetStrength = 30

      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect()
        const x = e.clientX - (rect.left + rect.width / 2)
        const y = e.clientY - (rect.top + rect.height / 2)

        gsap.to(el, {
          x: x / 3,
          y: y / 3,
          duration: 0.3,
          ease: "power3.out",
        })
      })

      el.addEventListener("mouseleave", () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: "power3.out",
        })
      })
    })

    // ---------------------------
    // RIPPLE EFFECT
    // ---------------------------
    window.addEventListener("click", (e) => {
      const ripple = document.createElement("div")
      ripple.className = "cursor-ripple"
      document.body.appendChild(ripple)

      gsap.fromTo(
        ripple,
        { x: e.clientX, y: e.clientY, scale: 0, opacity: 1 },
        {
          scale: 10,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => ripple.remove(),
        }
      )
    })
  }, [])

  return (
    <>
      {/* CUSTOM CURSOR */}
      <div ref={cursorRef} className="custom-cursor"></div>

      <footer
        ref={footerRef}
        className="bg-black text-white py-16 px-6 mt-40 relative overflow-hidden"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center">

            {/* LOGO */}
            <h2 className="text-3xl font-bold bg-gradient-to-t from-purple-400 to-purple-200 bg-clip-text text-transparent">
              Sufail
            </h2>

            {/* SOCIAL ICONS */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-purple-200">
                Connect
              </h3>

              <div className="flex space-x-6">
                {[
                  <FiGithub />,
                  <FiLinkedin />,
                  <FiTwitter />,
                ].map((Icon, i) => (
                  <div
                    key={i}
                    ref={(el) => (magneticRefs.current[i] = el)}
                    className="p-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <Icon.type className="w-6 h-6 text-gray-300 hover:text-white transition" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* BOTTOM ROW */}
          <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              Sufail. All rights reserved.
            </p>

            <div className="flex space-x-6 mt-4 md:mt-0">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, i) => (
                <span
                  key={i}
                  className="text-gray-500 hover:text-white text-sm transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer