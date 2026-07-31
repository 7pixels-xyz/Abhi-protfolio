'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const tags = [
  // Top Orbit
  { id: 1, text: 'Designer', initialX: '15%', initialY: '18%', mobileX: '5%', mobileY: '12%', rotate: -3, cursorText: 'obsessed with aesthetics' },
  { id: 2, text: 'Creative', initialX: '65%', initialY: '15%', mobileX: '55%', mobileY: '18%', rotate: 5, cursorText: 'out of the box thinking' },
  { id: 4, text: 'Developer', initialX: '40%', initialY: '22%', mobileX: '20%', mobileY: '26%', rotate: 4, cursorText: 'i speak computer' },
  
  // Bottom Orbit
  { id: 6, text: 'Copywriter', initialX: '20%', initialY: '78%', mobileX: '10%', mobileY: '70%', rotate: 6, cursorText: 'words that sell' },
  { id: 3, text: 'Builder', initialX: '85%', initialY: '76%', mobileX: '60%', mobileY: '75%', rotate: -2, cursorText: 'from scratch, always' },
  { id: 5, text: 'Web Designer', initialX: '70%', initialY: '82%', mobileX: '25%', mobileY: '82%', rotate: -4, cursorText: 'pixel perfect execution' },
  { id: 7, text: 'Cinematographer', initialX: '45%', initialY: '88%', mobileX: '15%', mobileY: '90%', rotate: -3, cursorText: 'painting with light' },
];

export default function HeroTags() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-30 pointer-events-none">
      {tags.map((tag, idx) => (
        <motion.div
          key={tag.id}
          drag
          dragConstraints={containerRef}
          dragElastic={0.2}
          whileDrag={{ scale: 1.08 }}
          whileHover={{ scale: 1.05 }}
          initial={false}
          animate={{
            left: isMobile ? tag.mobileX : tag.initialX,
            top: isMobile ? tag.mobileY : tag.initialY,
            rotate: tag.rotate,
            y: [0, -8, 0],
          }}
          transition={{ 
            left: { type: 'spring', stiffness: 50, damping: 20 },
            top: { type: 'spring', stiffness: 50, damping: 20 },
            rotate: { type: 'spring', stiffness: 50, damping: 20 },
            y: { duration: 4 + (idx % 3), repeat: Infinity, ease: 'easeInOut', delay: idx * 0.4 }
          }}
          className="absolute pointer-events-auto draggable group"
          style={{ willChange: 'transform', opacity }}
          data-cursor-text={tag.cursorText || undefined}
        >
          <div 
            className="premium-glass px-5 py-2.5 rounded-full font-sans text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-white/90 uppercase select-none transition-all duration-500 hover:text-white border border-white/20 hover:border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgba(255,255,255,0.25)] flex items-center gap-2.5 backdrop-blur-md"
            style={{ cursor: 'none' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white/50 group-hover:bg-[#FFD700] transition-colors duration-300 shadow-[0_0_8px_rgba(255,215,0,0.8)]" />
            {tag.text}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
