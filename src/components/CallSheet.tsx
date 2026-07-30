'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTheme } from '@/components/ThemeProvider';

export default function CallSheet() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isNight = theme === 'night';
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Parallax the footer up as the user reaches the bottom
  const y = useTransform(scrollYProgress, [0, 1], [200, 0]);

  return (
    <section 
      ref={containerRef}
      className={`relative z-10 w-full min-h-screen overflow-hidden flex flex-col justify-end transition-colors duration-1000 ${isNight ? 'bg-[#050505]' : 'bg-sky-200'}`}
    >
      {/* Massive ambient clouds for the footer (bringing it full circle) */}
      <div className={`absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-[50%] blur-[120px] pointer-events-none transition-colors duration-1000 ${isNight ? 'bg-[#1e1b4b] opacity-40' : 'bg-white opacity-80'}`} />
      <div className={`absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] rounded-[50%] blur-[100px] pointer-events-none transition-colors duration-1000 ${isNight ? 'bg-[#312e81] opacity-30' : 'bg-sky-100 opacity-90'}`} />

      <motion.div 
        className="w-full max-w-7xl px-4 md:px-12 mx-auto pb-12 md:pb-24 z-10"
        style={{ y }}
      >
        <div className="flex flex-col items-center text-center">
          
          <h3 className={`font-sans font-bold tracking-[0.4em] uppercase text-sm md:text-base mb-12 transition-colors duration-700 ${isNight ? 'text-white/40' : 'text-sky-700/60'}`}>
            Act V // The Call Sheet
          </h3>
          
          {/* Massive CTA */}
          <h2 className={`font-playfair text-6xl md:text-[8rem] lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] mb-8 md:mb-16 transition-colors duration-700 ${isNight ? 'text-white' : 'text-[#0a192f]'}`}>
            Let's Build <br />
            <span className={`font-cormorant font-light italic lowercase tracking-normal transition-colors duration-700 ${isNight ? 'text-[#FFD700]' : 'text-sky-600'}`}>something.</span>
          </h2>

          {/* Magnetic Links (We use hover scales for now to simulate the magnetic pull) */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12 mb-32">
            {['Email', 'Instagram', 'Vimeo', 'Twitter'].map((link) => (
              <motion.a 
                key={link}
                href={`#${link.toLowerCase()}`}
                className={`relative font-sans text-xl md:text-3xl font-light tracking-wide cursor-none group transition-colors duration-700 ${isNight ? 'text-white/80' : 'text-sky-900'}`}
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                data-cursor-text="Connect"
              >
                {link}
                <span className={`absolute -bottom-2 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full ${isNight ? 'bg-white' : 'bg-sky-600'}`} />
              </motion.a>
            ))}
          </div>

          {/* Copyright/Footer Text */}
          <div className={`w-full flex flex-col md:flex-row items-center justify-between pt-8 border-t font-sans text-xs md:text-sm tracking-widest uppercase transition-colors duration-700 ${isNight ? 'border-white/10 text-white/40' : 'border-sky-900/10 text-sky-900/60'}`}>
            <p>© {new Date().getFullYear()} Abhi. All Rights Reserved.</p>
            <p className="mt-4 md:mt-0">Designed & Built in the Clouds.</p>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
