import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Identity() {
  const containerRef = useRef(null);
  const createRef = useRef(null);
  const inspireRef = useRef(null);
  const becomeRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        pin: true,
      }
    });

    tl.to(createRef.current, {
      yPercent: -150,
      opacity: 0,
      filter: 'blur(10px)',
      duration: 1
    })
    .fromTo(inspireRef.current, 
      { yPercent: 150, opacity: 0, filter: 'blur(10px)' },
      { yPercent: 0, opacity: 1, filter: 'blur(0px)', duration: 1 },
      "<"
    )
    .to(inspireRef.current, {
      yPercent: -150,
      opacity: 0,
      filter: 'blur(10px)',
      duration: 1,
      delay: 0.5
    })
    .fromTo(becomeRef.current,
      { yPercent: 150, opacity: 0, filter: 'blur(10px)' },
      { yPercent: 0, opacity: 1, filter: 'blur(0px)', duration: 1 },
      "<"
    )
    
    // Subtitle reveal
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1 },
      "-=0.5"
    );

  }, []);

  return (
    <section ref={containerRef} id="about" className="relative w-full h-screen bg-brand-bg flex items-center justify-center overflow-hidden">
      
      <div className="text-center relative z-10 w-full px-4">
        
        <p className="text-xl md:text-3xl font-medium tracking-tight mb-8">
          I <span className="inline-block w-[150px] md:w-[350px] relative h-[40px] md:h-[80px] overflow-visible align-bottom">
            <span ref={createRef} className="absolute left-1/2 -translate-x-1/2 bottom-0 font-bold italic text-brand-text text-outline text-5xl md:text-8xl">CREATE</span>
            <span ref={inspireRef} className="absolute left-1/2 -translate-x-1/2 bottom-0 font-bold italic text-brand-text text-5xl md:text-8xl opacity-0">INSPIRE</span>
            <span ref={becomeRef} className="absolute left-1/2 -translate-x-1/2 bottom-0 font-bold italic text-brand-text text-outline text-5xl md:text-8xl opacity-0">BECOME</span>
          </span> TO MOVE PEOPLE.
        </p>
        
        <div ref={subtitleRef} className="mt-16 opacity-0">
          <p className="text-brand-muted uppercase tracking-[0.2em] md:tracking-[0.3em] text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Content. Presence. Perspective.
          </p>
        </div>
      </div>

    </section>
  );
}
