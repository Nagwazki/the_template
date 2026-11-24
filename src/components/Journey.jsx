import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Journey() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  const steps = [
    { label: "START", desc: "The foundation of vision." },
    { label: "CREATE", desc: "Building the aesthetic." },
    { label: "BUILD", desc: "Forging the discipline." },
    { label: "INFLUENCE", desc: "Moving the culture." },
    { label: "EVOLVE", desc: "Becoming the next version." }
  ];

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const track = trackRef.current;
      
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "center center",
          end: () => `+=${track.scrollWidth}`,
          invalidateOnRefresh: true,
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} id="journey" className="relative w-full min-h-screen md:h-screen bg-brand-surface md:overflow-hidden flex items-center py-32 md:py-0">
      
      <div className="absolute top-10 md:top-20 left-6 md:left-12 z-20">
        <h2 className="text-sm md:text-base font-medium tracking-[0.3em] uppercase text-brand-muted">THE JOURNEY</h2>
      </div>

      {/* Horizontal Track (Desktop) / Vertical List (Mobile) */}
      <div 
        ref={trackRef}
        className="flex flex-col md:flex-row items-start md:items-center w-full px-6 md:px-[20vw] gap-16 md:gap-40 h-auto md:h-full pt-12 md:pt-0"
      >
        {steps.map((step, index) => (
          <div key={index} className="flex-shrink-0 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-20 w-full md:w-auto">
            
            <div className="flex flex-col">
              <span className="text-sm text-brand-muted font-mono mb-4">0{index + 1} —</span>
              <h3 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase text-outline text-transparent transition-colors hover:text-brand-text cursor-default">
                {step.label}
              </h3>
              <p className="mt-4 md:mt-6 text-brand-muted tracking-widest uppercase text-xs">
                {step.desc}
              </p>
            </div>

            {index !== steps.length - 1 && (
              <div className="hidden md:block w-32 h-[1px] bg-brand-muted/30 relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-text"></div>
              </div>
            )}
            {index !== steps.length - 1 && (
              <div className="md:hidden h-12 w-[1px] bg-brand-muted/30 ml-4 relative mt-2 mb-2">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-brand-text"></div>
              </div>
            )}
          </div>
        ))}
      </div>

    </section>
  );
}
