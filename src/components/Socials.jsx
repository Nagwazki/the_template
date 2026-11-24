import { useRef } from 'react';
import gsap from 'gsap';

export default function Socials() {
  const links = [
    { name: "INSTAGRAM", url: "#", img: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=2574&auto=format&fit=crop" },
    { name: "TIKTOK", url: "#", img: "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=2574&auto=format&fit=crop" },
    { name: "YOUTUBE", url: "#", img: "https://images.unsplash.com/photo-1611162618828-0bea0c764c07?q=80&w=2574&auto=format&fit=crop" },
    { name: "LINKEDIN", url: "#", img: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?q=80&w=2574&auto=format&fit=crop" }
  ];

  const hoverImageRef = useRef(null);

  const handleMouseEnter = (imgSrc) => {
    if (hoverImageRef.current) {
      hoverImageRef.current.src = imgSrc;
      gsap.to(hoverImageRef.current, {
        opacity: 0.15,
        scale: 1.05,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  };

  const handleMouseLeave = () => {
    if (hoverImageRef.current) {
      gsap.to(hoverImageRef.current, {
        opacity: 0,
        scale: 1,
        duration: 0.5,
        ease: "power2.in"
      });
    }
  };

  return (
    <section className="relative w-full py-32 bg-brand-bg overflow-hidden flex flex-col justify-center min-h-[80vh]">
      
      {/* Background Hover Image */}
      <img 
        ref={hoverImageRef}
        src=""
        alt="Social preview"
        className="absolute inset-0 w-full h-full object-cover grayscale mix-blend-screen opacity-0 pointer-events-none transition-opacity duration-300"
      />

      <div className="relative z-10 w-full px-6 md:px-20 max-w-7xl mx-auto flex flex-col gap-6 md:gap-10">
        
        <div className="mb-10">
          <h2 className="text-sm md:text-base font-medium tracking-[0.3em] uppercase text-brand-muted">INDEX</h2>
        </div>

        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            className="group flex items-center justify-between border-b border-brand-surface pb-6 md:pb-10 w-full"
            onMouseEnter={() => handleMouseEnter(link.img)}
            onMouseLeave={handleMouseLeave}
            data-cursor="OPEN"
          >
            <div className="flex items-end gap-6 overflow-hidden">
              <span className="text-brand-muted font-mono text-sm mb-2 md:mb-4">0{index + 1}</span>
              <h3 className="text-5xl md:text-8xl font-bold tracking-tighter transition-transform duration-500 group-hover:translate-x-4">
                {link.name}
              </h3>
            </div>
            
            <div className="overflow-hidden">
              <span className="block text-2xl md:text-5xl text-brand-muted transition-transform duration-500 group-hover:-translate-y-full group-hover:translate-x-full">↗</span>
              <span className="block absolute text-2xl md:text-5xl text-brand-text -translate-x-full translate-y-full transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-[-100%]">↗</span>
            </div>
          </a>
        ))}

      </div>
    </section>
  );
}
