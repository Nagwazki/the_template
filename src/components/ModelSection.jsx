import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ModelSection() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const wordsRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=150%',
        pin: true,
        scrub: 1,
      }
    });

    // Slow zoom on image
    tl.to(imageRef.current, {
      scale: 1.2,
      ease: 'none',
    }, 0);

    // Text reveal and movement
    tl.fromTo(wordsRef.current, 
      { yPercent: 100, opacity: 0 },
      { 
        yPercent: 0, 
        opacity: 1, 
        stagger: 0.2, 
        duration: 1,
        ease: 'power2.out'
      }, 
      0
    )
    .to(wordsRef.current, {
      yPercent: -50,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: 'power2.in'
    }, 1);

    // Background darken
    tl.to(containerRef.current, {
      backgroundColor: '#000',
      duration: 1
    }, 1);

  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-brand-bg">
      
      {/* Title overlay */}
      <div className="absolute top-10 md:top-20 right-6 md:right-12 z-20">
        <h2 className="text-sm md:text-base font-medium tracking-[0.3em] uppercase text-brand-muted">THE MODEL</h2>
      </div>

      {/* Fullscreen Image */}
      <div className="absolute inset-0 z-0">
        <div ref={imageRef} className="w-full h-full relative origin-center">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2676&auto=format&fit=crop" 
            alt="Abdelrahman modeling" 
            className="w-full h-full object-cover grayscale mix-blend-screen"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/20 via-transparent to-brand-bg"></div>
        </div>
      </div>

      {/* Dramatic Text Reveal */}
      <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none">
        <div ref={textRef} className="flex flex-col items-center">
          {['PRESENCE', 'IS', 'EVERYTHING.'].map((word, index) => (
            <div key={word} className="overflow-hidden p-2">
              <h3 
                ref={el => wordsRef.current[index] = el}
                className={`text-6xl md:text-[10vw] font-bold tracking-tighter leading-[0.85] ${index === 1 ? 'text-outline text-transparent italic' : 'text-brand-text'}`}
              >
                {word}
              </h3>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
