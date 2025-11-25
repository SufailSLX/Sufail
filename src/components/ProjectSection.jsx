import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { SlShareAlt } from "react-icons/sl";
import Pimg from "../assets/chat-app-icon.webp";

gsap.registerPlugin(ScrollTrigger)

const ProjectSection = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const titleLineRef = useRef(null)
  const triggerRef = useRef(null)
  const horizontalRef = useRef(null)
  const panelsRef = useRef([])
  const lenisRef = useRef(null)

  // cursor refs
  const cursorDot = useRef(null)
  const cursorHalo = useRef(null)

  const projects = [
    { id: 1, title: "Chat App", imageSrc: Pimg },
    { id: 2, title: "Chat App", imageSrc: Pimg },
    { id: 3, title: "Chat App", imageSrc: Pimg }
  ]

  useEffect(() => {
    // ---------- LENIS ----------
    const lenis = new Lenis({
      duration: 1.1,
      smooth: true,
      lerp: 0.08,
      wheelMultiplier: 1.2
    })
    lenisRef.current = lenis

    // RAF loop for Lenis
    let rafId = 0
    const raf = (t) => {
      lenis.raf(t)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    // sync with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update)
    gsap.ticker.add((time) => {
      // extra safety: lenis tick inside gsap ticker for smoother sync
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    // ---------- HEADER ANIMS ----------
    gsap.fromTo(
      titleRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%"
        }
      }
    )

    gsap.fromTo(
      titleLineRef.current,
      { width: "0%", opacity: 0 },
      {
        width: "56%",
        opacity: 1,
        duration: 1.1,
        ease: "power3.out",
        delay: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%"
        }
      }
    )

    // ---------- HORIZONTAL PINNED SCROLL ----------
    const horizontalScroll = gsap.to(".panel", {
      xPercent: -100 * (projects.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: () => `+=${horizontalRef.current.offsetWidth}`,
        pin: true,
        scrub: 1
      }
    })

    // ---------- PANEL TIMELINES ----------
    const panels = gsap.utils.toArray(".panel")
    panelsRef.current = panels

    panels.forEach((panel, idx) => {
      const bg = panel.querySelector(".project-bg")
      const title = panel.querySelector(".project-title")
      const shareWrap = panel.querySelector(".share-wrap")

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          containerAnimation: horizontalScroll,
          start: "left right",
          end: "right left",
          scrub: 0.8
        }
      })

      // subtle image parallax / scale
      tl.fromTo(
        bg,
        { scale: 1.06, filter: "brightness(0.86) contrast(1.02) saturate(0.98)" },
        { scale: 1, filter: "brightness(1) contrast(1) saturate(1)", duration: 0.9, ease: "power3.out" }
      )

      // title float
      tl.fromTo(
        title,
        { y: 42, opacity: 0 },
        { y: -8, opacity: 1, duration: 0.6, ease: "power3.out" },
        0.18
      )

      // share icon pop
      tl.fromTo(
        shareWrap,
        { y: 14, scale: 0.7, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.45, ease: "back.out(1.3)" },
        0.45
      )
    })

    // ---------- SOFT BREATHING (depth) ----------
    panels.forEach((panel, i) => {
      gsap.to(panel, {
        y: "+=16",
        duration: 4 + i,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: i * 0.22
      })
    })

    // ---------- PARALLAX TILT (only when pointer near the card) ----------
    // We'll update tilt via gsap.ticker to avoid event flood
    const pointer = { x: 0, y: 0 }
    const updatePointer = (e) => {
      pointer.x = e.clientX
      pointer.y = e.clientY
    }
    window.addEventListener("mousemove", updatePointer)

    const applyTilt = () => {
      panelsRef.current.forEach((card) => {
        const rect = card.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const distX = pointer.x - cx
        const distY = pointer.y - cy
        const dist = Math.hypot(distX, distY)

        // only tilt when pointer is reasonably close to center (avoid overwhelming)
        const maxActiveDist = Math.max(rect.width, rect.height) * 0.9
        if (dist < maxActiveDist) {
          const nx = (pointer.x - cx) / rect.width
          const ny = (pointer.y - cy) / rect.height
          const rotateY = nx * 7 // degrees
          const rotateX = -ny * 7

          gsap.to(card, {
            rotateX,
            rotateY,
            transformPerspective: 1200,
            transformOrigin: "center",
            duration: 0.45,
            ease: "power3.out"
          })
        } else {
          // slowly reset if pointer far
          gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.7, ease: "power3.out" })
        }
      })
    }
    gsap.ticker.add(applyTilt)

    // ---------- MAGNETIC SHARE ICON ----------
    const magneticEls = document.querySelectorAll(".magnetic")
    magneticEls.forEach((el) => {
      const onMove = (e) => {
        const r = el.getBoundingClientRect()
        const offsetX = e.clientX - (r.left + r.width / 2)
        const offsetY = e.clientY - (r.top + r.height / 2)
        gsap.to(el, { x: offsetX / 5, y: offsetY / 5, duration: 0.28, ease: "power3.out" })
      }
      const onLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.45)" })
      }
      el.addEventListener("mousemove", onMove)
      el.addEventListener("mouseleave", onLeave)
      // store handlers for cleanup
      el._onMove = onMove
      el._onLeave = onLeave
    })

    // ---------- CUSTOM CURSOR (dot + halo) + CLICK RIPPLE ----------
    const dot = cursorDot.current
    const halo = cursorHalo.current
    // position instantly so no visual jump
    gsap.set([dot, halo], { x: window.innerWidth / 2, y: window.innerHeight / 2 })

    const moveCursor = (e) => {
      // dot follows tightly, halo lags
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.09, ease: "power1.out" })
      gsap.to(halo, { x: e.clientX, y: e.clientY, duration: 0.22, ease: "power2.out" })
    }
    const clickRipple = (e) => {
      const ripple = document.createElement("div")
      ripple.className = "ps-ripple"
      document.body.appendChild(ripple)
      gsap.set(ripple, { x: e.clientX, y: e.clientY, scale: 0, opacity: 0.6 })
      gsap.to(ripple, {
        scale: 16,
        opacity: 0,
        duration: 0.75,
        ease: "power2.out",
        onComplete: () => ripple.remove()
      })
    }
    window.addEventListener("mousemove", moveCursor)
    window.addEventListener("click", clickRipple)

    // ---------- CLEANUP ----------
    const cleanup = () => {
      // remove event listeners
      window.removeEventListener("mousemove", updatePointer)
      window.removeEventListener("mousemove", moveCursor)
      window.removeEventListener("click", clickRipple)
      // magnetic handlers
      document.querySelectorAll(".magnetic").forEach((el) => {
        if (el._onMove) el.removeEventListener("mousemove", el._onMove)
        if (el._onLeave) el.removeEventListener("mouseleave", el._onLeave)
      })

      // stop tickers / raf
      gsap.ticker.remove(applyTilt)
      cancelAnimationFrame(rafId)

      // kill ScrollTrigger
      ScrollTrigger.getAll().forEach((st) => st.kill())
      // kill tweens
      gsap.killTweensOf(panels)
      // kill horizontal
      try {
        horizontalScroll.kill()
      } catch (e) {}

      // destroy lenis
      try {
        if (lenis && lenis.destroy) lenis.destroy()
      } catch (e) {}

      lenisRef.current = null
    }

    return cleanup
  }, [])

  return (
    <section
      ref={sectionRef}
      id="horizontal-section"
      className="relative py-8 bg-gradient-to-b from-slate-50/30 to-transparent overflow-hidden"
      aria-label="Featured projects"
    >
      {/* inline styles for cursor, ripple and glass enhancements */}
      <style>{`
        /* cursor */
        .ps-dot {
          position: fixed;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: white;
          box-shadow: 0 6px 18px rgba(2,6,23,0.28);
          pointer-events: none;
          transform: translate(-50%, -50%);
          z-index: 9999;
          mix-blend-mode: normal;
        }
        .ps-halo {
          position: fixed;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.14) 0%, rgba(124,58,237,0.06) 50%, rgba(236,72,153,0.03) 100%);
          pointer-events: none;
          transform: translate(-50%, -50%);
          z-index: 9998;
          filter: blur(8px);
        }
        .ps-ripple {
          position: fixed;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: rgba(255,255,255,0.12);
          pointer-events: none;
          transform: translate(-50%, -50%);
          z-index: 9997;
          backdrop-filter: blur(2px);
        }
        /* glass card helper */
        .glass-card {
          background: linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%);
          backdrop-filter: blur(10px) saturate(120%);
          -webkit-backdrop-filter: blur(10px) saturate(120%);
          border: 1px solid rgba(255,255,255,0.06);
          box-shadow: 0 18px 50px rgba(2,6,23,0.28);
          will-change: transform;
        }
        /* subtle performance hint */
        .panel { will-change: transform; }
        .project-bg { will-change: transform, filter; transform-origin: center; }
      `}</style>

      {/* custom cursor elements */}
      <div ref={cursorHalo} className="ps-halo" aria-hidden="true" />
      <div ref={cursorDot} className="ps-dot" aria-hidden="true" />

      {/* Header */}
      <div className="container mx-auto px-6 mb-12">
        <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 text-center leading-tight">
          Featured Projects
        </h2>

        <div
          ref={titleLineRef}
          className="mx-auto mt-4 h-1 w-0 rounded-full"
          style={{ background: "linear-gradient(90deg,#7c3aed,#ec4899)" }}
        />
      </div>

      {/* Horizontal pinned area */}
      <div ref={triggerRef} className="overflow-hidden">
        <div ref={horizontalRef} className="flex items-center" style={{ height: "90vh", width: `${projects.length * 100}vw` }}>
          {projects.map((project, i) => (
            <div key={project.id} className="panel w-screen flex items-center justify-center px-6">
              <div className="w-[92%] md:w-[78%] h-[86vh] rounded-3xl overflow-hidden relative glass-card">
                {/* BG image layer */}
                <div
                  className="project-bg absolute inset-0"
                  style={{
                    backgroundImage: `url(${project.imageSrc})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    zIndex: 1,
                    transform: "scale(1.03)"
                  }}
                />

                {/* cinematic vignette */}
                <div className="absolute inset-0 z-2" style={{
                  background: "linear-gradient(180deg, rgba(2,6,23,0.06) 0%, rgba(2,6,23,0.24) 65%, rgba(2,6,23,0.66) 100%)",
                  zIndex: 2
                }} />

                {/* volumetric light blobs */}
                <div style={{
                  position: "absolute",
                  left: "-6%",
                  top: "-8%",
                  width: 220,
                  height: 220,
                  borderRadius: "50%",
                  filter: "blur(44px)",
                  background: "radial-gradient(circle, rgba(124,58,237,0.18), rgba(124,58,237,0.00))",
                  zIndex: 3,
                  pointerEvents: "none"
                }} />

                <div style={{
                  position: "absolute",
                  right: "-10%",
                  bottom: "10%",
                  width: 300,
                  height: 300,
                  borderRadius: "50%",
                  filter: "blur(56px)",
                  background: "radial-gradient(circle, rgba(236,72,153,0.12), rgba(236,72,153,0.00))",
                  zIndex: 3,
                  pointerEvents: "none"
                }} />

                {/* bottom content */}
                <div className="absolute left-6 right-6 bottom-8 z-30 text-white flex items-end justify-between">
                  <div className="max-w-2xl">
                    <h3 className="project-title text-3xl md:text-4xl lg:text-5xl font-bold leading-tight opacity-95">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-sm md:text-base text-slate-200/80 max-w-xl">
                      Immersive Apple-style preview — glassmorphic card with subtle parallax, soft volumetric glow and refined motion.
                    </p>
                  </div>

                  <div className="share-wrap magnetic w-14 h-14 rounded-xl flex items-center justify-center bg-white/6 border border-white/8 backdrop-blur-md cursor-pointer" title="Share">
                    <SlShareAlt className="text-white/90 magnetic" />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    
  )
}

export default ProjectSection
