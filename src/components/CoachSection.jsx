import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CoachSection() {
  const containerRef = useRef(null);
  const sentenceRef = useRef(null);
  const wordsRef = useRef([]);
  const buttonRef = useRef(null);
  const buttonTextRef = useRef(null);

  useEffect(() => {
    // Word reveal on scroll
    gsap.fromTo(wordsRef.current,
      { opacity: 0.1, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sentenceRef.current,
          start: 'top 80%',
          end: 'bottom 40%',
          scrub: 1,
        }
      }
    );

    // Magnetic button effect
    const btn = buttonRef.current;
    if (btn) {
      const handleMouseMove = (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(btn, {
          x: x * 0.4,
          y: y * 0.4,
          duration: 0.6,
          ease: 'power3.out'
        });
        
        gsap.to(buttonTextRef.current, {
          x: x * 0.2,
          y: y * 0.2,
          duration: 0.6,
          ease: 'power3.out'
        });
      };

      const handleMouseLeave = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 1,
          ease: 'elastic.out(1, 0.3)'
        });
        
        gsap.to(buttonTextRef.current, {
          x: 0,
          y: 0,
          duration: 1,
          ease: 'elastic.out(1, 0.3)'
        });
      };

      btn.addEventListener('mousemove', handleMouseMove);
      btn.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        btn.removeEventListener('mousemove', handleMouseMove);
        btn.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  const sentence = "BECOME THE PERSON YOU KNOW YOU CAN BE.";
  const words = sentence.split(' ');

  return (
    <section ref={containerRef} id="coaching" className="relative w-full min-h-screen bg-brand-surface flex items-center justify-center py-32 px-6">
      
      <div className="absolute top-10 md:top-20 left-6 md:left-12 z-20">
        <h2 className="text-sm md:text-base font-medium tracking-[0.3em] uppercase text-brand-muted">THE COACH</h2>
      </div>

      <div className="max-w-4xl w-full flex flex-col items-center text-center">
        
        <div ref={sentenceRef} className="flex flex-wrap justify-center gap-x-3 md:gap-x-6 gap-y-2 mb-16">
          {words.map((word, i) => (
            <span 
              key={i} 
              ref={el => wordsRef.current[i] = el}
              className="text-4xl md:text-7xl font-bold tracking-tighter"
            >
              {word}
            </span>
          ))}
        </div>

        <p className="text-brand-muted md:text-lg max-w-2xl leading-relaxed mb-24">
          Real growth happens at the intersection of discipline and awareness. My coaching philosophy is built on stripping away the noise, identifying your core truth, and relentlessly executing against it. It's not about motivation; it's about alignment.
        </p>

        {/* Magnetic Button */}
        <div className="p-8">
          <button 
            ref={buttonRef}
            className="group relative flex items-center justify-center w-40 h-40 md:w-48 md:h-48 rounded-full border border-brand-muted/30 hover:border-brand-text transition-colors duration-500 overflow-hidden"
            data-cursor="LET'S TALK"
          >
            <div className="absolute inset-0 bg-brand-text translate-y-[100%] rounded-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"></div>
            
            <div ref={buttonTextRef} className="relative z-10 flex flex-col items-center">
              <span className="text-xs tracking-widest font-bold uppercase group-hover:text-brand-bg transition-colors duration-500 delay-100">
                Start a
              </span>
              <span className="text-xs tracking-widest font-bold uppercase group-hover:text-brand-bg transition-colors duration-500 delay-100">
                Conversation
              </span>
              <span className="mt-2 text-brand-muted group-hover:text-brand-bg transition-colors duration-500">→</span>
            </div>
          </button>
        </div>

      </div>
    </section>
  );
}
