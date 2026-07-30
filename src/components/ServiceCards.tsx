'use client';

import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const services = [
  {
    id: 1,
    title: 'Video Editing',
    description: 'Precision cuts, seamless transitions, and narrative-driven pacing.',
    image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=800&q=80',
    href: '/niche/video-editing'
  },
  {
    id: 2,
    title: 'Web Designing',
    description: 'Ultra-fluid, highly interactive digital experiences built from scratch.',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51159128?auto=format&fit=crop&w=800&q=80',
    href: '/niche/web-designing'
  },
  {
    id: 3,
    title: 'Cinematography',
    description: 'Painting with light to capture breathtaking, cinematic visuals.',
    image: 'https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?auto=format&fit=crop&w=800&q=80',
    href: '/niche/cinematography'
  },
  {
    id: 4,
    title: 'Content Creation',
    description: 'Engaging, high-retention digital media crafted for the modern eye.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
    href: '/niche/content-creation'
  },
];

interface ServiceCardsProps {
  isVisible: boolean;
}

export default function ServiceCards({ isVisible }: ServiceCardsProps) {
  // Mouse tracking physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring config for a buttery smooth, premium delay effect
  const springConfig = { damping: 25, stiffness: 150, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const [activeService, setActiveService] = useState<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half the image width/height so it centers on the cursor
      mouseX.set(e.clientX - 150); 
      mouseY.set(e.clientY - 200);
    };

    if (isVisible) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isVisible, mouseX, mouseY]);

  return (
    <motion.div 
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center z-10"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        pointerEvents: isVisible ? 'auto' : 'none' 
      }}
      transition={{ duration: 0.8, delay: isVisible ? 0.4 : 0 }}
    >
      {/* 
        FLOATING GLASS CARD 
        Tracks the mouse cursor smoothly using Framer Motion springs.
        Currently empty as requested, ready for future content.
      */}
      <motion.div
        className="fixed top-0 left-0 w-[300px] h-[400px] pointer-events-none rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.3)] z-0 hidden md:block"
        style={{
          x: smoothX,
          y: smoothY,
        }}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ 
          scale: activeService !== null ? 1 : 0.5,
          opacity: activeService !== null ? 1 : 0,
          rotate: activeService !== null ? (activeService % 2 === 0 ? 4 : -4) : 0
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      >
        {/* Empty Glass Card Body */}
        <div className="absolute inset-0 premium-glass rounded-[2rem] border-[2px] border-white/20" />
      </motion.div>

      {/* 
        EDITORIAL MENU LIST 
        Massive typography that reacts to hover
      */}
      <div className="relative z-10 w-full flex flex-col md:items-center md:justify-center gap-12 md:gap-2 mt-16 md:mt-20 pointer-events-auto overflow-hidden px-4 md:px-0">
        {services.map((service, index) => {
          const isHovered = activeService === service.id;
          const isFaded = activeService !== null && activeService !== service.id;

          // Split title into Sans and Serif parts for the dual-font premium look
          const parts = service.title.split(' ');
          const firstPart = parts[0];
          const secondPart = parts.slice(1).join(' ') || (service.id === 3 ? 'tography' : ''); // Fallback for Cinematography
          
          const displayFirst = service.id === 3 ? 'CINEMA' : firstPart.toUpperCase();
          const displaySecond = secondPart.toLowerCase();

          // Alternating alignment for mobile
          const isLeft = index % 2 === 0;

          return (
            <Link key={service.id} href={service.href} passHref className="block w-full md:w-fit md:mx-auto">
              <motion.div 
                className={`relative cursor-pointer flex flex-col py-2 md:py-6 group pointer-events-auto w-full md:items-center ${isLeft ? 'items-start text-left' : 'items-end text-right'}`}
                onHoverStart={() => setActiveService(service.id)}
                onHoverEnd={() => setActiveService(null)}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Mobile Background Index Number */}
                <div className={`md:hidden absolute top-1/2 -translate-y-1/2 ${isLeft ? 'right-0' : 'left-0'} text-white/[0.03] font-sans font-black text-[8rem] tracking-tighter leading-none pointer-events-none z-0`}>
                  0{index + 1}
                </div>

                {/* Massive Dual-Font Title */}
                <motion.h2 
                  className="relative z-10 text-[3.8rem] leading-[0.85] sm:text-6xl md:text-7xl lg:text-[7vw] md:leading-normal text-white luxury-text-shadow drop-shadow-2xl flex flex-col md:flex-row md:items-center md:justify-center gap-0 md:gap-[0.2em] pointer-events-none w-full md:w-auto"
                  animate={{ 
                    opacity: isFaded ? 0.2 : 1,
                    scale: isHovered ? 1.05 : 1
                  }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  {/* Bold Sans-Serif Part */}
                  <motion.span 
                    className="font-sans font-black tracking-tighter text-white"
                    animate={{ letterSpacing: isHovered ? '0.02em' : '-0.02em' }}
                    transition={{ duration: 0.5 }}
                  >
                    {displayFirst}
                  </motion.span>

                  {/* Luxurious Italic Serif Part */}
                  {displaySecond && (
                    <motion.span 
                      className={`font-cormorant font-light italic tracking-wide text-[#FFD700] ${isLeft ? 'ml-12 md:ml-0' : 'mr-12 md:mr-0'}`}
                      animate={{ letterSpacing: isHovered ? '0.1em' : '0.02em' }}
                      transition={{ duration: 0.5 }}
                    >
                      {displaySecond}
                    </motion.span>
                  )}
                </motion.h2>

                {/* Dynamic Description Reveal */}
                <motion.div 
                  className="overflow-hidden pointer-events-none mt-4 md:mt-0 relative z-10 hidden md:block"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: isHovered ? 'auto' : 0,
                    opacity: isHovered ? 1 : 0,
                    marginTop: isHovered ? 8 : 0
                  }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <p className="font-sans text-[10px] md:text-xs tracking-[0.25em] uppercase text-white/80 font-semibold text-center max-w-[80%] mx-auto">
                    {service.description}
                  </p>
                </motion.div>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}
