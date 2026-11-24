import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CreatorSection() {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: "01 / SOCIAL CONTENT",
      image: "https://images.unsplash.com/photo-1516575334481-bea1bb4701e6?q=80&w=2574&auto=format&fit=crop",
      orientation: "portrait",
      width: "w-[80vw] md:w-[35vw]"
    },
    {
      id: 2,
      title: "02 / BRAND CAMPAIGN",
      image: "https://images.unsplash.com/photo-1448376561459-dbe8868fa34c?q=80&w=2670&auto=format&fit=crop",
      orientation: "landscape",
      width: "w-[90vw] md:w-[50vw]"
    },
    {
      id: 3,
      title: "03 / SHORT FORM",
      image: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=2574&auto=format&fit=crop",
      orientation: "portrait",
      width: "w-[75vw] md:w-[30vw]"
    },
    {
      id: 4,
      title: "04 / PERSONAL PROJECT",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2670&auto=format&fit=crop",
      orientation: "landscape",
      width: "w-[85vw] md:w-[45vw]"
    }
  ];

  useEffect(() => {
    // Only apply horizontal scroll on desktop
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const slider = sliderRef.current;
      
      gsap.to(slider, {
        x: () => -(slider.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${slider.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} id="work" className="relative w-full md:h-screen bg-brand-surface py-20 md:py-0 overflow-hidden">
      
      <div className="absolute top-10 md:top-20 left-6 md:left-12 z-20">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase clip-text mix-blend-difference text-white">THE CREATOR</h2>
      </div>

      <div 
        ref={sliderRef}
        className="flex flex-col md:flex-row items-center h-full gap-10 md:gap-20 px-6 md:px-[20vw] pt-24 md:pt-0"
      >
        {projects.map((project, index) => (
          <div 
            key={project.id} 
            className={`relative flex-shrink-0 group ${project.width} ${project.orientation === 'portrait' ? 'h-[60vh] md:h-[70vh]' : 'h-[40vh] md:h-[60vh]'} ${index % 2 !== 0 ? 'md:mt-24' : 'md:-mt-24'}`}
            data-cursor="VIEW"
          >
            <div className="w-full h-full overflow-hidden relative">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover grayscale transition-transform duration-1000 group-hover:scale-105 group-hover:grayscale-0"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-brand-bg/20 transition-opacity duration-500 group-hover:opacity-0"></div>
            </div>
            
            <div className="absolute -bottom-8 md:bottom-auto md:top-1/2 left-0 md:-left-8 md:-translate-y-1/2 md:-rotate-90 origin-left opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none">
              <h3 className="text-sm md:text-xl font-bold tracking-widest whitespace-nowrap bg-brand-bg md:bg-transparent px-2 md:px-0">
                {project.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
