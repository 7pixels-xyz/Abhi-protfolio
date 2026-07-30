'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function CallSheet() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Parallax the footer up as the user reaches the bottom
  const y = useTransform(scrollYProgress, [0, 1], [200, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative z-10 w-full min-h-screen bg-sky-200 overflow-hidden flex flex-col justify-end"
    >
      {/* Massive ambient clouds for the footer (bringing it full circle) */}
      <div className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-white rounded-[50%] blur-[120px] opacity-80 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-sky-100 rounded-[50%] blur-[100px] opacity-90 pointer-events-none" />

      <motion.div 
        className="w-full max-w-7xl px-4 md:px-12 mx-auto pb-12 md:pb-24 z-10"
        style={{ y }}
      >
        <div className="flex flex-col items-center text-center">
          
          <h3 className="font-sans font-bold text-sky-700/60 tracking-[0.4em] uppercase text-sm md:text-base mb-12">
            Act V // The Call Sheet
          </h3>
          
          {/* Massive CTA */}
          <h2 className="font-playfair text-6xl md:text-[8rem] lg:text-[10rem] text-[#0a192f] font-black uppercase tracking-tighter leading-[0.8] mb-8 md:mb-16">
            Let's Build <br />
            <span className="font-cormorant font-light italic text-sky-600 lowercase tracking-normal">something.</span>
          </h2>

          {/* Magnetic Links (We use hover scales for now to simulate the magnetic pull) */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12 mb-32">
            {['Email', 'Instagram', 'Vimeo', 'Twitter'].map((link) => (
              <motion.a 
                key={link}
                href={`#${link.toLowerCase()}`}
                className="relative font-sans text-xl md:text-3xl text-sky-900 font-light tracking-wide cursor-none group"
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                data-cursor-text="Connect"
              >
                {link}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-sky-600 transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          {/* Copyright/Footer Text */}
          <div className="w-full flex flex-col md:flex-row items-center justify-between pt-8 border-t border-sky-900/10 text-sky-900/60 font-sans text-xs md:text-sm tracking-widest uppercase">
            <p>© {new Date().getFullYear()} Abhi. All Rights Reserved.</p>
            <p className="mt-4 md:mt-0">Designed & Built in the Clouds.</p>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
