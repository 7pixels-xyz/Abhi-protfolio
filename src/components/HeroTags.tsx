'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';

const tags = [
  // Orbiting tightly around the center text
  { id: 1, text: 'Designer', initialX: '25%', initialY: '30%', rotate: -3, cursorText: 'obsessed with aesthetics' },
  { id: 6, text: 'Copywriter', initialX: '20%', initialY: '65%', rotate: 6, cursorText: 'words that sell' },
  { id: 2, text: 'Creative', initialX: '65%', initialY: '25%', rotate: 5, cursorText: 'out of the box thinking' },
  { id: 5, text: 'Web Designer', initialX: '70%', initialY: '68%', rotate: -4, cursorText: 'pixel perfect execution' },
  { id: 4, text: 'Developer', initialX: '10%', initialY: '48%', rotate: 4, cursorText: 'i speak computer' },
  { id: 3, text: 'Builder', initialX: '85%', initialY: '42%', rotate: -2, cursorText: 'from scratch, always' },
  { id: 7, text: 'Cinematographer', initialX: '45%', initialY: '80%', rotate: -3, cursorText: 'painting with light' },
];

export default function HeroTags() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="absolute inset-0 z-30 pointer-events-none">
      {tags.map((tag) => (
        <motion.div
          key={tag.id}
          drag
          dragConstraints={containerRef}
          dragElastic={0.2}
          whileDrag={{ scale: 1.05 }}
          whileHover={{ scale: 1.02 }}
          initial={{
            left: tag.initialX,
            top: tag.initialY,
            rotate: tag.rotate,
          }}
          className="absolute pointer-events-auto draggable"
          style={{ willChange: 'transform' }}
          data-cursor-text={tag.cursorText || undefined}
        >
          <div className="premium-glass px-6 py-3 rounded-full font-sans text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-white/90 uppercase select-none transition-colors duration-300 hover:text-white"
               style={{ cursor: 'none' }}>
            {tag.text}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
