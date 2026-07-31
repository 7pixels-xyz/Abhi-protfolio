'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTheme } from './ThemeProvider';

export default function AboutMeSection() {
  const containerRef = useRef(null);
  const portraitRef = useRef(null);
  const { theme } = useTheme();
  const isNight = theme === 'night';

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: portraitScrollY } = useScroll({
    target: portraitRef,
    offset: ["start end", "end start"]
  });
  const mobileGrayscale = useTransform(portraitScrollY, [0.1, 0.4, 0.6, 0.9], ["100%", "0%", "0%", "100%"]);

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Theme responsive styling
  const bgColor = isNight ? 'bg-[#050505]' : 'bg-[#FFCC00]';
  const textColor = isNight ? 'text-white' : 'text-[#0a0a0a]';
  const mutedText = isNight ? 'text-white/50' : 'text-[#0a0a0a]/70';
  const borderColor = isNight ? 'border-white/10' : 'border-[#0a0a0a]/10';
  const yellowAccent = '#FFD700'; // For night mode highlights

  // Dynamic values for elements that change completely between themes
  const highlightClass = isNight ? '' : 'text-white drop-shadow-md';
  const highlightStyle = isNight ? { color: yellowAccent } : {};
  const paragraphWeight = isNight ? 'font-light text-white/80' : `font-medium ${textColor} opacity-90`;
  const orb1Color = isNight ? yellowAccent : 'rgba(255,255,255,0.8)';
  const orb2Color = isNight ? yellowAccent : 'rgba(255,255,255,0.6)';
  const orbOpacity1 = isNight ? 'opacity-20' : 'opacity-40';
  const orbOpacity2 = isNight ? 'opacity-10' : 'opacity-30';
  const floatingAccentStyle = isNight ? { backgroundColor: yellowAccent } : { backgroundColor: '#0a0a0a' };
  const floatingAccentBorder = isNight ? 'border-white/20' : 'border-[#0a0a0a]/30';

  return (
    <section 
      ref={containerRef}
      className={`relative w-full min-h-screen ${bgColor} flex items-center py-32 px-6 md:px-12 lg:px-24 overflow-hidden z-20 transition-colors duration-700`}
    >
      {/* Subtle Glowing Accents */}
      <motion.div 
        className={`absolute top-0 right-[-50%] md:right-0 w-[150vw] h-[150vw] md:w-[50vw] md:h-[50vw] rounded-full blur-[80px] md:blur-[150px] ${orbOpacity1} pointer-events-none transition-all duration-700`}
        style={{ background: `radial-gradient(circle, ${orb1Color}, transparent)` }}
      />
      <motion.div 
        className={`absolute bottom-0 left-[-50%] md:left-0 w-[150vw] h-[150vw] md:w-[40vw] md:h-[40vw] rounded-full blur-[80px] md:blur-[120px] ${orbOpacity2} pointer-events-none transition-all duration-700`}
        style={{ background: `radial-gradient(circle, ${orb2Color}, transparent)` }}
      />

      <div className="w-full max-w-7xl mx-auto flex flex-col-reverse lg:flex-row-reverse items-center lg:items-start gap-16 lg:gap-24 relative z-10">
        
        {/* Left Side: 60% Typography */}
        <div className="w-full lg:w-[60%] flex flex-col">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className={`w-2 h-2 rounded-full ${isNight ? 'bg-[#FFD700] shadow-[0_0_10px_#FFD700]' : 'bg-[#0a0a0a]'} animate-pulse`} />
              <span className={`font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] ${mutedText} transition-colors duration-700`}>
                // 01 — PHILOSOPHY & VISION
              </span>
            </div>
            
            <h2 className={`font-sans font-black text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-16 ${textColor} transition-colors duration-700`}>
              My standard <span className={`font-instrument italic font-normal ${highlightClass} transition-colors duration-700`} style={highlightStyle}>never changes.</span> Whether a project is free or worth a million dollars, I approach it with the same level of dedication, precision, and care. 
              <br/><br/>
              If my name is on something, it has to be something I'm proud of. <span className={`${highlightClass} transition-colors duration-700`} style={highlightStyle}>I don't create average work because I simply can't settle for it.</span>
            </h2>
          </motion.div>

          <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 border-t ${borderColor} pt-12 transition-colors duration-700`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className={`p-6 rounded-2xl border ${borderColor} ${isNight ? 'bg-white/[0.02] hover:bg-white/[0.05]' : 'bg-black/[0.03] hover:bg-black/[0.06]'} transition-all duration-500 backdrop-blur-sm group`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`font-mono text-[10px] uppercase tracking-[0.3em] ${mutedText} ${isNight ? '' : 'font-semibold'} transition-colors duration-700`}>
                  Origin // 01
                </span>
                <span className={`w-1.5 h-1.5 rounded-full ${isNight ? 'bg-white/30 group-hover:bg-[#FFD700]' : 'bg-black/30 group-hover:bg-black'} transition-colors`} />
              </div>
              <p className={`font-sans text-sm md:text-base ${paragraphWeight} leading-relaxed transition-colors duration-700`}>
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
              className={`p-6 rounded-2xl border ${borderColor} ${isNight ? 'bg-white/[0.02] hover:bg-white/[0.05]' : 'bg-black/[0.03] hover:bg-black/[0.06]'} transition-all duration-500 backdrop-blur-sm group`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`font-mono text-[10px] uppercase tracking-[0.3em] ${mutedText} ${isNight ? '' : 'font-semibold'} transition-colors duration-700`}>
                  Human Element // 02
                </span>
                <span className={`w-1.5 h-1.5 rounded-full ${isNight ? 'bg-white/30 group-hover:bg-[#FFD700]' : 'bg-black/30 group-hover:bg-black'} transition-colors`} />
              </div>
              <p className={`font-sans text-sm md:text-base ${paragraphWeight} leading-relaxed transition-colors duration-700`}>
                Outside of work, I'm fascinated by how people think. I spend a lot of time studying psychology, business strategy, and storytelling.
                <br/><br/>
                Why? Because understanding people is what makes great design and content truly effective.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Right Side: 30% Portrait / Visual */}
        <motion.div 
          ref={portraitRef}
          className="w-full lg:w-[35%] relative"
          style={{ y: y1, "--mobile-grayscale": mobileGrayscale } as any}
        >
          {/* Portrait Container */}
          <div className={`w-full aspect-[3/4] relative rounded-3xl overflow-hidden group shadow-2xl transition-colors duration-700`}>
            {/* Dark background base for portrait to contrast with yellow */}
            <div className={`absolute inset-0 ${isNight ? 'bg-[#0f0f0f]' : 'bg-[#050505]'} rounded-3xl transition-colors duration-700`} />
            
            {/* The Cutout Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 group-hover:scale-105 max-lg:[filter:grayscale(var(--mobile-grayscale,100%))_contrast(1.1)_brightness(1.1)] lg:[filter:grayscale(100%)_contrast(1.1)_brightness(1.1)] lg:group-hover:[filter:grayscale(0%)_contrast(1.1)_brightness(1.1)] lg:transition-[filter] lg:duration-700"
              style={{ backgroundImage: `url('https://res.cloudinary.com/adwbvkcv/image/upload/v1785476725/portrate_ku2xv0.png')` }}
            />
            
            {/* Overlay Gradient for integration */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-70" />
            
            {/* Decorative Corner Borders */}
            <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-white/20" />
            <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-white/20" />
          </div>

          {/* Floating Accents */}
          <motion.div 
            className={`absolute -right-12 top-20 w-32 h-32 rounded-full border border-dashed ${floatingAccentBorder} flex items-center justify-center transition-colors duration-700 ${isNight ? 'opacity-50' : 'opacity-100'}`}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-2 h-2 rounded-full transition-colors duration-700" style={floatingAccentStyle} />
          </motion.div>
        </motion.div>
        
      </div>
    </section>
  );
}
