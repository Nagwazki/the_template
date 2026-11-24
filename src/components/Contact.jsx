import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Contact() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const wordsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(wordsRef.current,
      { yPercent: 100, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
        }
      }
    );
  }, []);

  return (
    <footer ref={containerRef} id="contact" className="relative w-full min-h-screen bg-brand-bg flex flex-col justify-between pt-32 pb-8 px-6 md:px-12 overflow-hidden">
      
      <div className="flex-1 flex flex-col justify-center">
        <div ref={textRef} className="flex flex-col mb-16">
          {['LET\'S', 'CREATE', 'SOMETHING', 'REAL.'].map((word, index) => (
            <div key={index} className="overflow-hidden p-2 -ml-2">
              <h2 
                ref={el => wordsRef.current[index] = el}
                className={`text-[12vw] md:text-[8vw] font-bold tracking-tighter leading-[0.85] ${index === 3 ? 'text-brand-muted italic' : 'text-brand-text'}`}
              >
                {word}
              </h2>
            </div>
          ))}
        </div>

        <a 
          href="mailto:contact@abdelrahman.com"
          className="group inline-flex items-center gap-4 text-xl md:text-3xl font-medium tracking-tight w-fit"
          data-cursor="LET'S TALK"
        >
          <span className="relative overflow-hidden pb-1">
            <span className="block transition-transform duration-500 group-hover:-translate-y-full">CONTACT ABDELRAHMAN</span>
            <span className="absolute top-0 left-0 block transition-transform duration-500 translate-y-full group-hover:translate-y-0 text-brand-muted">CONTACT ABDELRAHMAN</span>
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-text transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
          </span>
          <span className="transition-transform duration-500 group-hover:translate-x-2">→</span>
        </a>
      </div>

      <div className="mt-32 pt-8 border-t border-brand-surface flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-xs md:text-sm text-brand-muted tracking-widest uppercase">
          <span className="font-bold text-brand-text">ABDELRAHMAN</span>
          <span className="hidden md:inline">|</span>
          <span>CONTENT CREATOR · MODEL · LIFE COACH</span>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-xs text-brand-muted/60 uppercase tracking-widest">
          <span>
            Created by{' '}
            <a 
              href="https://nagwazki.github.io/portfolio-Nagwa/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-bold text-brand-text underline underline-offset-4 hover:text-brand-muted transition-colors"
            >
              Nagwa Zaki
            </a>
          </span>
          <span className="hidden sm:inline text-brand-muted/30">|</span>
          <span className="text-brand-muted/50">
            &copy; {new Date().getFullYear()} ALL RIGHTS RESERVED.
          </span>
        </div>
      </div>

    </footer>
  );
}
