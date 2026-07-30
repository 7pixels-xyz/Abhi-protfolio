'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Spring config for smooth following, a bit tighter for a Figma-like feel
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState('You');
  const [cursorType, setCursorType] = useState('default');

  useEffect(() => {
    let animationFrameId: number;
    let lastElement: Element | null = null;

    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Throttle DOM querying using requestAnimationFrame for performance
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        // Find the actual element currently directly under the mouse pointer
        const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
        if (!target) return;

        // Skip processing if we're hovering over the exact same element to save CPU
        if (target === lastElement) return;
        lastElement = target;

        const customCursorElement = target.closest('[data-cursor-text]') || target.closest('[data-cursor-type]');
        const hoverableElement = target.closest('button') || target.closest('a') || target.closest('.draggable');

        if (customCursorElement) {
          setIsHovering(true);
          const text = customCursorElement.getAttribute('data-cursor-text');
          const type = customCursorElement.getAttribute('data-cursor-type');
          setHoverText(text || '');
          setCursorType(type || 'text');
        } else if (
          hoverableElement || 
          (target && window.getComputedStyle(target).cursor === 'pointer')
        ) {
          setIsHovering(true);
          setCursorType('text');

          const el = hoverableElement as HTMLElement || target;
          const tagName = el.tagName?.toLowerCase() || '';
          const isBlank = (el as HTMLAnchorElement).target === '_blank';

          if (isBlank) {
            setHoverText('Open Tab');
          } else if (tagName === 'button' || el.closest('button')) {
            setHoverText('Press');
          } else if (tagName === 'a' || el.closest('a')) {
            setHoverText('Click');
          } else if (tagName === 'input' || tagName === 'textarea') {
            setHoverText('Type');
          } else {
            setHoverText('View');
          }
        } else {
          setIsHovering(false);
          setHoverText('You');
          setCursorType('default');
        }
      });
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      cancelAnimationFrame(animationFrameId);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
      style={{
        x: smoothX,
        y: smoothY,
      }}
      animate={{
        scale: isHovering ? 1.05 : 1,
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
    >
      {/* Figma style cursor SVG */}
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-md"
        style={{ transform: 'translate(-4px, -4px)' }} // Offset to align tip with actual mouse coordinate
      >
        <path d="M5.5 3.5L18.5 10.5L11.5 12.5L9.5 19.5L5.5 3.5Z" fill="var(--accent)" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
      
      {/* Name tag or Hand Icon */}
      <motion.div 
        className="absolute left-3 top-5 bg-[var(--accent)] text-white text-xs font-semibold rounded-full whitespace-nowrap shadow-sm font-sans flex items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        style={{
           padding: cursorType === 'drag' ? '6px' : '4px 8px'
        }}
      >
        {cursorType === 'drag' ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </svg>
        ) : (
          hoverText
        )}
      </motion.div>
    </motion.div>
  );
}
