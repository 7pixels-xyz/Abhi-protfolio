'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTheme } from './ThemeProvider';

export default function AboutMeSection() {
  const containerRef = useRef(null);
  const { theme } = useTheme();
  const isNight = theme === 'night';

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Solid yellow background as requested. Dark typography.
  const bgColor = isNight ? 'bg-[#EAB308]' : 'bg-[#FFCC00]';
  const textColor = 'text-[#0a0a0a]';
  const mutedText = 'text-[#0a0a0a]/70';
  const borderColor = 'border-[#0a0a0a]/10';

  return (
    <section 
      ref={containerRef}
      className={`relative w-full min-h-screen ${bgColor} flex items-center py-32 px-6 md:px-12 lg:px-24 overflow-hidden z-20 transition-colors duration-700`}
    >
      {/* Subtle Glowing Accents */}
      <motion.div 
        className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full blur-[150px] opacity-40 pointer-events-none"
        style={{ background: `radial-gradient(circle, rgba(255,255,255,0.8), transparent)` }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-[40vw] h-[40vw] rounded-full blur-[120px] opacity-30 pointer-events-none"
        style={{ background: `radial-gradient(circle, rgba(255,255,255,0.6), transparent)` }}
      />

      <div className="w-full max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center lg:items-start gap-16 lg:gap-24 relative z-10">
        
        {/* Left Side: 60% Typography */}
        <div className="w-full lg:w-[60%] flex flex-col">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={`font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] ${mutedText} mb-8 block`}>
              // Philosophy
            </span>
            <h2 className={`font-sans font-black text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-16 ${textColor}`}>
              My standard <span className="font-cormorant italic font-light text-white drop-shadow-md">never changes.</span> Whether a project is free or worth a million dollars, I approach it with the same level of dedication, precision, and care. 
              <br/><br/>
              If my name is on something, it has to be something I'm proud of. <span className="text-white drop-shadow-md">I don't create average work because I simply can't settle for it.</span>
            </h2>
          </motion.div>

          <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 mt-8 border-t ${borderColor} pt-16`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={`font-mono text-[10px] uppercase tracking-[0.3em] ${mutedText} mb-4 block font-semibold`}>Origin</span>
              <p className={`font-sans text-sm md:text-base font-medium ${textColor} leading-relaxed opacity-90`}>
                Based in Punjab, India, I've spent the past five years developing my skills across video editing, web design, cinematography, and content creation. 
                <br/><br/>
                My journey began with a gaming YouTube channel, where I first learned the craft of editing. Over time, that curiosity evolved into mastering multiple creative disciplines that now come together to build compelling digital experiences.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={`font-mono text-[10px] uppercase tracking-[0.3em] ${mutedText} mb-4 block font-semibold`}>The Human Element</span>
              <p className={`font-sans text-sm md:text-base font-medium ${textColor} leading-relaxed opacity-90`}>
                Outside of work, I'm fascinated by how people think. I spend a lot of time studying psychology, business strategy, and storytelling.
                <br/><br/>
                Why? Because understanding people is what makes great design and content truly effective.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Right Side: 30% Portrait / Visual */}
        <motion.div 
          className="w-full lg:w-[35%] relative"
          style={{ y: y1 }}
        >
          {/* Portrait Container */}
          <div className="w-full aspect-[3/4] relative rounded-3xl overflow-hidden group shadow-2xl">
            {/* Dark background base for portrait to contrast with yellow */}
            <div className="absolute inset-0 bg-[#050505] rounded-3xl" />
            
            {/* The Cutout Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 group-hover:scale-105"
              style={{ backgroundImage: `url('/cutout.png')`, filter: 'grayscale(100%) contrast(1.1) brightness(1.1)' }}
            />
            
            {/* Overlay Gradient for integration */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-70" />
            
            {/* Decorative Corner Borders */}
            <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-white/20" />
            <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-white/20" />
          </div>

          {/* Floating Accents */}
          <motion.div 
            className="absolute -right-12 top-20 w-32 h-32 rounded-full border border-dashed border-[#0a0a0a]/30 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-2 h-2 rounded-full bg-[#0a0a0a]" />
          </motion.div>
        </motion.div>
        
      </div>
    </section>
  );
}
