'use client';

import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface RepellingTextProps {
  text: string;
  className?: string;
  isVisible: boolean;
  highlightWord?: string;
  highlightColor?: string;
  isPushed?: boolean;
  isMobile?: boolean;
}

export default function RepellingText({ 
  text, 
  isVisible, 
  highlightWord = '', 
  highlightColor = '#FFD700',
  isPushed = false,
  className = '',
  isMobile = false
}: RepellingTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use MotionValues instead of state to prevent re-rendering the whole tree on mouse move
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const words = text.split(' ');

  return (
    <motion.div
      ref={containerRef}
      className={`flex flex-row flex-nowrap justify-center gap-[1.5ch] ${className}`}
      initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : -30,
        filter: isVisible ? 'blur(0px)' : 'blur(10px)',
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {words.map((word, wIdx) => {
        const isHighlighted = word === highlightWord;
        
        // Calculate the push offset for each word. Word 0 ("This") stays at 0.
        // Word 1 ("is") moves left. Word 2 ("Abhi") moves further left.
        // We push strictly LEFT (x axis) for both desktop and mobile.
        // On mobile, text="Abhi" is just one word (wIdx=0), but it still needs to be pushed by the image!
        const pushOffset = isPushed ? (isMobile ? -10 : -(wIdx * 3)) : 0;

        return (
          <motion.div 
            key={wIdx} 
            className={`flex ${isHighlighted ? 'font-bodoni italic' : ''}`} 
            style={{ color: isHighlighted ? highlightColor : undefined }}
            initial={{ x: 0, y: 0 }}
            animate={{ x: `${pushOffset}vw`, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            {word.split('').map((char, cIdx) => (
              <RepellingChar key={cIdx} char={char} mouseX={mouseX} mouseY={mouseY} />
            ))}
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function RepellingChar({ char, mouseX, mouseY }: { char: string; mouseX: any; mouseY: any }) {
  const charRef = useRef<HTMLSpanElement>(null);
  
  // Spring configurations for smooth magnetic repulsion
  const springConfig = { stiffness: 120, damping: 15, mass: 0.8 };
  
  const springX = useSpring(0, springConfig);
  const springY = useSpring(0, springConfig);

  useEffect(() => {
    // We must subscribe to the motion values manually inside an effect to avoid re-rendering
    const unsubscribeX = mouseX.on('change', (latestX: number) => {
      updateRepulsion(latestX, mouseY.get());
    });
    const unsubscribeY = mouseY.on('change', (latestY: number) => {
      updateRepulsion(mouseX.get(), latestY);
    });

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [mouseX, mouseY]);

  const updateRepulsion = (mx: number, my: number) => {
    if (!charRef.current) return;
    
    const rect = charRef.current.getBoundingClientRect();
    const charCenterX = rect.left + rect.width / 2;
    const charCenterY = rect.top + rect.height / 2;

    const dx = mx - charCenterX;
    const dy = my - charCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    const maxDistance = 180; // Radius of repulsion

    if (distance < maxDistance) {
      // Repel away from mouse
      const force = (maxDistance - distance) / maxDistance;
      const moveX = (dx / distance) * -force * 80; // Max push distance 80px
      const moveY = (dy / distance) * -force * 80;
      
      springX.set(moveX);
      springY.set(moveY);
    } else {
      // Spring back to original position
      springX.set(0);
      springY.set(0);
    }
  };

  return (
    <motion.span
      ref={charRef}
      className="inline-block relative origin-center"
      style={{
        x: springX,
        y: springY,
        willChange: 'transform',
      }}
    >
      {char}
    </motion.span>
  );
}
