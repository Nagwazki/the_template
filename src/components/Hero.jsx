import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const containerRef = useRef(null);
  const wordsRef = useRef([]);
  const nameRef = useRef(null);
  const subtitleRef = useRef(null);
  const imageRef = useRef(null);
  const indicatorRef = useRef(null);
  const titleWrapperRef = useRef(null);

  useEffect(() => {
    // Only run animation after loader completes
    // Set initial states
    gsap.set(wordsRef.current, {
      xPercent: -50,
      yPercent: -50,
      y: 20
    });

    const tl = gsap.timeline({ delay: 3 });

    // Initial words sequence
    tl.to(wordsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.5,
      ease: 'power2.out',
    })
    // Collapse them on top of each other
    .to(wordsRef.current, {
      marginTop: '0em',
      duration: 0.5,
      ease: 'back.inOut(1.5)',
    }, "+=0.3")
    // Fade out and scale up slightly
    .to(wordsRef.current, {
      opacity: 0,
      scale: 1.2,
      duration: 0.4,
      ease: 'power2.in',
    })
    
    // Name and Subtitle reveal
    .fromTo(titleWrapperRef.current,
      { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' },
      { 
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 1.5,
        ease: 'power4.inOut'
      }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
      "-=0.5"
    )

    // Image reveal
    .fromTo(imageRef.current,
      { clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)', scale: 1.1 },
      { 
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', 
        scale: 1,
        duration: 2, 
        ease: 'expo.inOut'
      },
      "-=1.2"
    )

    // Indicator
    .fromTo(indicatorRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
      "-=0.5"
    );

    // Parallax on scroll
    gsap.to(imageRef.current, {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden">
      
      {/* Intro words overlay */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {['CREATE.', 'INFLUENCE.', 'EVOLVE.'].map((word, index) => (
          <div 
            key={word}
            ref={el => wordsRef.current[index] = el}
            className="absolute top-1/2 left-1/2 text-4xl md:text-7xl font-bold tracking-tighter opacity-0"
            style={{
              marginTop: index === 0 ? '-1.2em' : index === 1 ? '0em' : '1.2em'
            }}
          >
            {word}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-[1400px] px-6 md:px-12 h-full flex flex-col justify-end pb-20 md:pb-32">
        <div className="relative z-20 mb-8 md:mb-16">
          <div ref={titleWrapperRef} className="overflow-hidden pb-4">
            <h1 
              ref={nameRef}
              className="text-[12vw] leading-[0.85] font-bold tracking-tighter uppercase"
            >
              ABDELRAHMAN
            </h1>
          </div>
          <p 
            ref={subtitleRef}
            className="text-brand-muted uppercase tracking-[0.2em] md:tracking-[0.4em] text-xs md:text-sm font-medium mt-4 ml-2"
          >
            CONTENT CREATOR <span className="mx-2 md:mx-4">·</span> MODEL <span className="mx-2 md:mx-4">·</span> LIFE COACH
          </p>
        </div>

        {/* Cinematic Image */}
        <div className="absolute inset-0 md:inset-y-0 md:right-12 md:left-auto md:w-[60vw] lg:w-[45vw] h-full flex items-center z-0">
          <div 
            ref={imageRef}
            className="w-full h-full md:h-[80vh] relative overflow-hidden clip-text"
            style={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
          >
            <div className="absolute inset-0 bg-brand-bg/40 z-10 md:hidden"></div>
            <img 
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2574&auto=format&fit=crop" 
              alt="Abdelrahman portrait" 
              className="w-full h-full object-cover grayscale opacity-80 mix-blend-lighten"
            />
            {/* Grain overlay inside image */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuODUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2VGaWx0ZXIpIi8+PC9zdmc+')] opacity-10 mix-blend-overlay pointer-events-none"></div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          ref={indicatorRef}
          className="absolute bottom-8 right-8 md:bottom-12 md:right-12 flex flex-col items-center gap-4 opacity-0"
        >
          <span className="writing-vertical text-xs tracking-widest text-brand-muted uppercase" style={{ writingMode: 'vertical-rl' }}>
            Scroll to enter
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-brand-muted to-transparent"></div>
        </div>
      </div>
    </section>
  );
}
