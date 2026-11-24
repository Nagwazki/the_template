import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef(null);
  const linksRef = useRef([]);

  useEffect(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 0.8,
        ease: 'power3.inOut'
      });
      
      gsap.fromTo(linksRef.current, 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6, 
          stagger: 0.1, 
          delay: 0.4,
          ease: 'power3.out' 
        }
      );
    } else {
      gsap.to(overlayRef.current, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        duration: 0.8,
        ease: 'power3.inOut'
      });
    }
  }, [isOpen]);

  const navLinks = [
    { num: '01', text: 'WORK' },
    { num: '02', text: 'ABOUT' },
    { num: '03', text: 'JOURNEY' },
    { num: '04', text: 'COACHING' },
    { num: '05', text: 'CONTACT' },
  ];

  return (
    <>
      {/* Floating Header */}
      <header className="fixed top-0 left-0 w-full p-6 md:p-10 z-[100] flex justify-between items-center mix-blend-difference text-white">
        <div className="font-bold text-xl tracking-tighter" data-cursor="VIEW">AR.</div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-sm font-medium tracking-widest uppercase overflow-hidden"
          data-cursor="OPEN"
        >
          <div className="relative h-[20px]">
            <span className={`block transition-transform duration-500 ${isOpen ? '-translate-y-full' : 'translate-y-0'}`}>MENU</span>
            <span className={`block transition-transform duration-500 absolute top-0 left-0 w-full text-right ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>CLOSE</span>
          </div>
        </button>
      </header>

      {/* Fullscreen Overlay */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 z-[90] bg-brand-bg text-brand-text flex items-center justify-center"
        style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }}
      >
        {/* Background Image Placeholder */}
        <div className="absolute inset-0 opacity-20 filter blur-sm">
          <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
            alt="Menu background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="absolute inset-0 bg-brand-bg/80 mix-blend-multiply"></div>

        <nav className="relative z-10 w-full max-w-5xl px-6 md:px-12">
          <ul className="flex flex-col gap-6 md:gap-10">
            {navLinks.map((link, index) => (
              <li 
                key={link.text}
                ref={el => linksRef.current[index] = el}
                className="overflow-hidden"
              >
                <a 
                  href={`#${link.text.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="group flex items-baseline gap-4 md:gap-8 w-fit"
                  data-cursor="VIEW"
                >
                  <span className="text-brand-muted text-sm md:text-xl font-mono">{link.num} —</span>
                  <span className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tighter uppercase transition-colors group-hover:text-transparent group-hover:text-outline">
                    {link.text}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
