import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const loaderRef = useRef(null);
  const progressLineRef = useRef(null);
  const textRef = useRef(null);
  const topHalfRef = useRef(null);
  const bottomHalfRef = useRef(null);

  useEffect(() => {
    // Simulate loading progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 5;
      if (currentProgress > 100) currentProgress = 100;
      setProgress(currentProgress);
      
      gsap.to(progressLineRef.current, {
        scaleX: currentProgress / 100,
        duration: 0.2,
        ease: 'power1.out'
      });

      if (currentProgress === 100) {
        clearInterval(interval);
        
        // Split animation
        const tl = gsap.timeline({
          onComplete: onComplete
        });

        tl.to(textRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.4,
          delay: 0.2,
          ease: 'power2.inOut'
        })
        .to(progressLineRef.current, {
          opacity: 0,
          duration: 0.2
        }, "<")
        .to([topHalfRef.current, bottomHalfRef.current], {
          yPercent: (i) => i === 0 ? -100 : 100,
          duration: 1.2,
          ease: 'expo.inOut',
          stagger: 0
        });
      }
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div 
      ref={loaderRef} 
      className="fixed inset-0 z-[10000] flex flex-col pointer-events-none"
    >
      {/* Top half */}
      <div 
        ref={topHalfRef}
        className="flex-1 bg-brand-bg w-full origin-top"
      />
      
      {/* Content wrapper */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <div ref={textRef} className="flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">AR</h1>
          <p className="text-xs tracking-[0.3em] text-brand-muted uppercase">Loading Experience {progress}%</p>
        </div>
        
        {/* Progress line at exact center */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-brand-surface -translate-y-1/2">
          <div 
            ref={progressLineRef}
            className="w-full h-full bg-brand-text origin-left scale-x-0"
          />
        </div>
      </div>

      {/* Bottom half */}
      <div 
        ref={bottomHalfRef}
        className="flex-1 bg-brand-bg w-full origin-bottom"
      />
    </div>
  );
}
