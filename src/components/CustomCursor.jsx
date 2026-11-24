import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const textRef = useRef(null);
  const [cursorText, setCursorText] = useState('');
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Hide default cursor on desktop
    document.body.style.cursor = 'none';
    
    // Set up mouse movement tracking
    const onMouseMove = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    // Set up global hover listeners using event delegation
    const onMouseOver = (e) => {
      const target = e.target;
      
      // Look for data-cursor attributes in the element or its parents
      const cursorElement = target.closest('[data-cursor]');
      
      if (cursorElement) {
        const text = cursorElement.getAttribute('data-cursor');
        setCursorText(text);
        setIsHovering(true);
      } else if (target.closest('a') || target.closest('button')) {
        setCursorText('');
        setIsHovering(true);
      } else {
        setCursorText('');
        setIsHovering(false);
      }
    };

    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.body.style.cursor = 'auto';
    };
  }, []);

  useEffect(() => {
    if (isHovering) {
      gsap.to(cursorRef.current, {
        width: cursorText ? 80 : 40,
        height: cursorText ? 80 : 40,
        backgroundColor: cursorText ? 'var(--color-brand-text)' : 'transparent',
        border: '1px solid var(--color-brand-text)',
        mixBlendMode: cursorText ? 'normal' : 'difference',
        duration: 0.3,
        ease: 'power3.out'
      });
      gsap.to(textRef.current, {
        opacity: cursorText ? 1 : 0,
        scale: cursorText ? 1 : 0.5,
        duration: 0.3
      });
    } else {
      gsap.to(cursorRef.current, {
        width: 12,
        height: 12,
        backgroundColor: 'var(--color-brand-text)',
        border: 'none',
        mixBlendMode: 'difference',
        duration: 0.3,
        ease: 'power3.out'
      });
      gsap.to(textRef.current, {
        opacity: 0,
        scale: 0.5,
        duration: 0.3
      });
    }
  }, [isHovering, cursorText]);

  // Disable custom cursor on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 origin-center"
      style={{
        width: 12,
        height: 12,
        backgroundColor: 'var(--color-brand-text)',
        mixBlendMode: 'difference'
      }}
    >
      <span
        ref={textRef}
        className="text-brand-bg font-bold text-[10px] tracking-widest opacity-0 select-none whitespace-nowrap"
      >
        {cursorText}
      </span>
    </div>
  );
}
