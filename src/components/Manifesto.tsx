'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import { useRef } from 'react';

export default function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isNight = theme === 'night';
  
  // Track scroll progress within this 150vh section (much faster scroll)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // --- CLOUD FORMATION ANIMATIONS ---
  // Clouds rise up quickly (0 to 0.3)
  const cloudRiseY = useTransform(scrollYProgress, [0.1, 0.3], ['100vh', '0vh']);
  const cloudScale = useTransform(scrollYProgress, [0.1, 0.4], [1, 2.5]);
  const cloudOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  
  // The solid white "core" of the clouds fades in to make text readable (0.2 to 0.3)
  // It stays solid until the very end so there is no empty gap!
  const bgOpacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);

  // Clouds dissipate at the bottom (0.7 to 1.0)
  // Instead of flying away and disappearing early, they just gently scale up and blur out
  const cloudExitY = useTransform(scrollYProgress, [0.7, 1.0], ['0vh', '20vh']);
  const cloudExitOpacity = useTransform(scrollYProgress, [0.8, 1.0], [1, 0.3]);


  // --- EDITORIAL TYPOGRAPHY ANIMATIONS ---
  // Text slides up and fades in right after clouds form (0.25 to 0.35)
  const textY = useTransform(scrollYProgress, [0.25, 0.35], [150, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.25, 0.35], [0, 1]);

  // Sub-paragraphs stagger in (0.3 to 0.4)
  const p1Y = useTransform(scrollYProgress, [0.3, 0.4], [50, 0]);
  const p2Y = useTransform(scrollYProgress, [0.32, 0.42], [50, 0]);
  const pOpacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);

  // Decorative element (0.2 to 0.3)
  const lineScaleX = useTransform(scrollYProgress, [0.25, 0.4], [0, 1]);

  // Subtle parallax while scrolling through the section (0.35 to 0.7)
  const parallaxMain = useTransform(scrollYProgress, [0.35, 0.7], [0, -150]);
  const parallaxSub = useTransform(scrollYProgress, [0.35, 0.7], [0, -250]);

  return (
    <section 
      ref={containerRef}
      className="relative z-30 w-full h-[150vh] bg-transparent pointer-events-none"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center pointer-events-auto">
        
        {/* --- CLOUD BACKGROUND LAYER --- */}
        {/* The solid white core that holds the content, fading in/out */}
        <motion.div 
          className={`absolute inset-0 transition-colors duration-1000 ${isNight ? 'bg-[#0B1120]' : 'bg-white'}`}
          style={{ opacity: bgOpacity }}
        />

        {/* Entering Clouds (Top Edge) */}
        <motion.div 
          className="absolute inset-0 flex justify-center items-center pointer-events-none"
          style={{ y: cloudRiseY, opacity: cloudOpacity }}
        >
          <motion.div className={`absolute w-[80vw] h-[60vh] rounded-[50%] blur-[60px] transition-colors duration-1000 ${isNight ? 'bg-[#0B1120]' : 'bg-white'}`} style={{ scale: cloudScale, top: '-20vh', left: '-10vw' }} />
          <motion.div className={`absolute w-[90vw] h-[70vh] rounded-[50%] blur-[80px] transition-colors duration-1000 ${isNight ? 'bg-slate-900/80' : 'bg-sky-50/80'}`} style={{ scale: cloudScale, top: '-10vh', right: '-15vw' }} />
          <motion.div className={`absolute w-[100vw] h-[50vh] rounded-[50%] blur-[50px] transition-colors duration-1000 ${isNight ? 'bg-[#0B1120]' : 'bg-white'}`} style={{ scale: cloudScale, top: '-30vh' }} />
        </motion.div>

        {/* Exiting Clouds (Bottom Edge) */}
        <motion.div 
          className="absolute inset-0 flex justify-center items-center pointer-events-none"
          style={{ y: cloudExitY, opacity: cloudExitOpacity }}
        >
          <div className={`absolute w-[80vw] h-[60vh] rounded-[50%] blur-[60px] transition-colors duration-1000 ${isNight ? 'bg-[#0B1120]' : 'bg-white'}`} style={{ bottom: '-20vh', right: '-10vw' }} />
          <div className={`absolute w-[90vw] h-[70vh] rounded-[50%] blur-[80px] transition-colors duration-1000 ${isNight ? 'bg-slate-900/80' : 'bg-sky-50/80'}`} style={{ bottom: '-10vh', left: '-15vw' }} />
          <div className={`absolute w-[100vw] h-[50vh] rounded-[50%] blur-[50px] transition-colors duration-1000 ${isNight ? 'bg-[#0B1120]' : 'bg-white'}`} style={{ bottom: '-30vh' }} />
        </motion.div>


        {/* --- EDITORIAL CONTENT LAYER --- */}
        <div className="relative z-10 w-full max-w-7xl px-4 md:px-12 flex flex-col lg:flex-row items-start justify-between h-full pt-[20vh] pb-[10vh]">
          
          {/* Left Side: Massive Staggered Headline */}
          <motion.div 
            className="flex flex-col w-full lg:w-[60%] space-y-4"
            style={{ y: parallaxMain }}
          >
            {/* Decorative Chapter Number */}
            <motion.div 
              className={`font-sans font-bold text-lg tracking-[0.4em] mb-4 transition-colors duration-1000 ${isNight ? 'text-sky-100/30' : 'text-sky-900/30'}`}
              style={{ opacity: textOpacity, y: textY }}
            >
              CHAPTER // 02
            </motion.div>

            {/* Headline */}
            <motion.div 
              className={`font-playfair text-6xl md:text-8xl lg:text-[7rem] leading-[0.9] font-black uppercase tracking-tighter transition-colors duration-1000 ${isNight ? 'text-white' : 'text-[#0a192f]'}`}
              style={{ opacity: textOpacity, y: textY }}
            >
              Vision is
            </motion.div>
            <motion.div 
              className={`font-playfair text-6xl md:text-8xl lg:text-[7rem] leading-[0.9] font-black uppercase tracking-tighter pl-0 md:pl-12 transition-colors duration-1000 ${isNight ? 'text-white' : 'text-[#0a192f]'}`}
              style={{ opacity: textOpacity, y: textY }}
            >
              Nothing
            </motion.div>
            <motion.div 
              className={`font-cormorant text-5xl md:text-7xl lg:text-[6rem] leading-none font-light italic lowercase tracking-normal pl-0 md:pl-24 pt-4 transition-colors duration-1000 ${isNight ? 'text-sky-300' : 'text-sky-800'}`}
              style={{ opacity: textOpacity, y: textY }}
            >
              without execution.
            </motion.div>
          </motion.div>

          {/* Right Side: Editorial Paragraphs */}
          <motion.div 
            className="flex flex-col w-full lg:w-[35%] mt-20 lg:mt-32 space-y-8"
            style={{ y: parallaxSub }}
          >
            {/* Elegant Line Divider */}
            <motion.div 
              className={`w-full h-[1px] origin-left transition-colors duration-1000 ${isNight ? 'bg-white/50' : 'bg-[#0a192f]'}`}
              style={{ scaleX: lineScaleX }}
            />

            <motion.p 
              className={`font-sans text-lg md:text-xl font-light leading-relaxed tracking-wide text-justify transition-colors duration-1000 ${isNight ? 'text-slate-300' : 'text-slate-700'}`}
              style={{ opacity: pOpacity, y: p1Y }}
            >
              As a filmmaker, I paint with light. As a developer, I build with logic. I bridge the gap between cinematic storytelling and bleeding-edge digital design.
            </motion.p>

            <motion.p 
              className={`font-playfair text-xl md:text-2xl font-medium leading-relaxed italic transition-colors duration-1000 ${isNight ? 'text-white' : 'text-[#0a192f]'}`}
              style={{ opacity: pOpacity, y: p2Y }}
            >
              "Every cut, every pixel, every line of code serves one purpose: to make them feel something."
            </motion.p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
