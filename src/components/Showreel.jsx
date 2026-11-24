import { useRef } from 'react';
import gsap from 'gsap';

export default function Showreel() {
  const containerRef = useRef(null);
  const videoWrapperRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(videoWrapperRef.current, {
      scale: 1.02,
      duration: 0.6,
      ease: 'power3.out'
    });
  };

  const handleMouseLeave = () => {
    gsap.to(videoWrapperRef.current, {
      scale: 1,
      duration: 0.6,
      ease: 'power3.out'
    });
  };

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-brand-bg flex items-center justify-center py-20">
      
      <div className="absolute top-10 md:top-20 right-6 md:right-12 z-20">
        <h2 className="text-sm md:text-base font-medium tracking-[0.3em] uppercase text-brand-muted">SHOWREEL</h2>
      </div>

      <div className="w-full px-4 md:px-12 h-[70vh] md:h-[85vh]">
        <div 
          ref={videoWrapperRef}
          className="w-full h-full relative group cursor-pointer overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          data-cursor="PLAY"
        >
          {/* Placeholder for actual video - using a cinematic still for now */}
          <img 
            src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2671&auto=format&fit=crop" 
            alt="Showreel preview" 
            className="w-full h-full object-cover grayscale opacity-60 transition-opacity duration-700 group-hover:opacity-100"
          />
          
          <div className="absolute inset-0 bg-brand-bg/40 group-hover:bg-brand-bg/10 transition-colors duration-700"></div>
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex items-center gap-4 bg-brand-bg/80 backdrop-blur-md px-8 py-4 rounded-full border border-brand-text/10 transform transition-transform duration-500 group-hover:scale-110">
              <span className="text-sm tracking-widest font-bold uppercase">Play Reel</span>
              <span className="text-brand-muted">→</span>
            </div>
          </div>
          
          {/* Film Grain inside video container */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZUZpbHRlciI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuODUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2VGaWx0ZXIpIi8+PC9zdmc+')] opacity-10 mix-blend-overlay pointer-events-none"></div>
        </div>
      </div>

    </section>
  );
}
