// import { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// function ProgressBar() {
//   const progressFillRef = useRef(null);

//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger);

//     // Smooth progress animation
//     gsap.to(progressFillRef.current, {
//       width: "100%",
//       ease: "power3.out",
//       scrollTrigger: {
//         trigger: document.documentElement,
//         start: "top top",
//         end: "bottom bottom",
//         scrub: 0.5,
//         onUpdate: (self) => {
//           const p = self.progress;

//           // Smooth color transitions
//           gsap.to(progressFillRef.current, {
//             background:
//               p > 0.75
//                 ? "linear-gradient(90deg, #6b21a8, #9333ea)"
//                 : p > 0.5
//                 ? "linear-gradient(90deg, #9333ea, #c084fc)"
//                 : p > 0.25
//                 ? "linear-gradient(90deg, #c026d3, #e879f9)"
//                 : "linear-gradient(90deg, #db2777, #f472b6)",
//             duration: 0.4,
//             ease: "power1.out",
//           });
//         },
//       },
//     });

//     return () => ScrollTrigger.killAll();
//   }, []);

//   return (
//     <div className="fixed top-0 left-0 w-full h-[6px] bg-black/30 backdrop-blur-sm z-50">
//       <div
//         ref={progressFillRef}
//         className="h-full w-0 rounded-r-full"
//         style={{
//           background:
//             "linear-gradient(90deg, #db2777, #f472b6)",
//           transform: "translateZ(0)", // GPU acceleration
//         }}
//       />
//     </div>
//   );
// }

// export default ProgressBar;

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function ProgressBar() {
  const progressFillRef = useRef(null);
  const sparkRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Main fill animation
    gsap.to(progressFillRef.current, {
      width: "100%",
      ease: "power3.out",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.4,
        onUpdate: (self) => {
          const p = self.progress;

          // Smooth gradient + glow color transitions
          gsap.to(progressFillRef.current, {
            background:
              p > 0.75
                ? "linear-gradient(90deg, #8b5cf6, #a855f7)"
                : p > 0.5
                ? "linear-gradient(90deg, #d946ef, #c084fc)"
                : p > 0.25
                ? "linear-gradient(90deg, #ec4899, #f472b6)"
                : "linear-gradient(90deg, #e11d48, #fb7185)",
            boxShadow: `0 0 ${10 + p * 30}px ${
              p > 0.3 ? "#f472b680" : "#fb718580"
            }`,
            duration: 0.3,
            ease: "power1.out",
          });

          // Spark movement
          gsap.to(sparkRef.current, {
            left: `${p * 100}%`,
            opacity: p < 0.02 || p > 0.98 ? 0 : 1,
            duration: 0.2,
            ease: "power1.out",
          });
        },
      },
    });

    return () => ScrollTrigger.killAll();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[7px] bg-white/10 backdrop-blur-md shadow-lg border-b border-white/20 z-50">
      <div
        ref={progressFillRef}
        className="h-full w-0 rounded-r-full relative"
        style={{
          background: "linear-gradient(90deg, #e11d48, #fb7185)",
          transform: "translateZ(0)",
        }}
      >
        {/* SPARK EFFECT */}
        <div
          ref={sparkRef}
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
          style={{
            background: "white",
            filter: "blur(3px)",
            opacity: 0,
          }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;