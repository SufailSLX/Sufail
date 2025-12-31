// Components/Logo.jsx

import LogoLoop from './Animations/LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodemon, SiMongodb, SiAngular, SiFigma, SiShadcnui, SiExpress } from 'react-icons/si';

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiMongodb />, title: "Tailwind CSS", href: "https://tailwindcss.com"  },
  { node: <SiAngular />, title: "Tailwind CSS", href: "https://tailwindcss.com"  },
  { node: <SiFigma />, title: "Tailwind CSS", href: "https://tailwindcss.com"  },
  { node: <SiShadcnui />, title: "Tailwind CSS", href: "https://tailwindcss.com"  },
  { node: <SiExpress />, title: "Tailwind CSS", href: "https://tailwindcss.com"  },
];

export default function Logo() {
  return (
    <div style={{ height: '200px', position: 'relative', overflow: 'hidden' }}>
      
      {/* Horizontal scrolling logos */}
      <LogoLoop
        logos={techLogos}
        speed={120}
        direction="left"
        logoHeight={48}
        gap={40}
        hoverSpeed={0}
        scaleOnHover
        fadeOut
        fadeOutColor="#ffffff"
        ariaLabel="Tech stack"
      />

    </div>
  );
}
