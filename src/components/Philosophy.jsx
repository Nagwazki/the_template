import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const words = [
  { text: "DISCIPLINE", speedX: 50, speedY: -100, x: '10%', y: '20%', rotate: -5, size: 'text-6xl md:text-8xl' },
  { text: "MINDSET", speedX: -80, speedY: 60, x: '60%', y: '15%', rotate: 2, size: 'text-5xl md:text-7xl' },
  { text: "ACTION", speedX: 100, speedY: 40, x: '20%', y: '60%', rotate: 8, size: 'text-7xl md:text-9xl' },
  { text: "GROWTH", speedX: -40, speedY: -120, x: '70%', y: '50%', rotate: -3, size: 'text-6xl md:text-8xl' },
  { text: "CONSISTENCY", speedX: 60, speedY: 80, x: '15%', y: '85%', rotate: 0, size: 'text-4xl md:text-6xl' },
  { text: "CONFIDENCE", speedX: -90, speedY: -50, x: '55%', y: '80%', rotate: -8, size: 'text-5xl md:text-7xl' },
];

export default function Philosophy() {
  const containerRef = useRef(null);
  const wordsRef = useRef([]);

  useEffect(() => {
    words.forEach((word, index) => {
      const el = wordsRef.current[index];
      
      gsap.to(el, {
        x: () => word.speedX,
        y: () => word.speedY,
        rotation: () => word.rotate * 1.5,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });
    });
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-brand-bg overflow-hidden flex items-center justify-center">
      
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,20,20,1)_0%,rgba(8,8,8,1)_100%)]"></div>
      
      <div className="relative w-full h-full max-w-7xl mx-auto pointer-events-none">
        {words.map((word, index) => (
          <div
            key={index}
            ref={el => wordsRef.current[index] = el}
            className={`absolute font-bold tracking-tighter mix-blend-difference ${word.size} ${index % 2 === 0 ? 'text-brand-text' : 'text-outline text-transparent'}`}
            style={{ 
              left: word.x, 
              top: word.y,
              transform: `rotate(${word.rotate}deg)`
            }}
          >
            {word.text}
          </div>
        ))}
      </div>

    </section>
  );
}
