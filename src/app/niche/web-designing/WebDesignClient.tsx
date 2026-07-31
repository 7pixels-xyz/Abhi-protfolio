'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

export default function WebDesignClient() {
  
  return (
    <main className="w-full min-h-screen bg-wd-bg-main text-wd-text selection:bg-[#C10016] selection:text-white overflow-hidden font-sans transition-colors duration-1000">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-screen md:h-screen md:min-h-[800px] flex items-center justify-center pt-24 md:pt-20 px-6 md:px-12 border-b border-wd-border/5 overflow-hidden md:overflow-visible transition-colors duration-1000">
        
        {/* Premium Background Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(193,0,22,0.03),transparent_70%)] pointer-events-none z-0" />

        {/* Massive Background Typography */}
        <div 
          className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none z-0 w-full transition-all duration-1000"
          style={{ mixBlendMode: 'var(--theme-portfolio-blend)' as any }}
        >
          <motion.div 
            className="w-full flex justify-between overflow-visible"
          >
            {"PORTFOLIO".split("").map((char, i) => (
              <motion.span 
                key={i} 
                initial={{ opacity: 0, filter: 'blur(20px)', scaleY: 0.5, y: 50 }}
                animate={{ opacity: 1, filter: 'blur(0px)', scaleY: 2.2, y: 0 }}
                transition={{ duration: 2, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="text-[20vw] md:text-[18vw] font-black leading-[0.8] text-wd-portfolio uppercase tracking-tighter transform -translate-y-[15%] md:-translate-y-[8%] origin-bottom drop-shadow-[0_0_80px_rgba(193,0,22,0.2)] transition-colors duration-1000"
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Hero Grid Content */}
        <div className="relative z-10 w-full max-w-[90rem] h-full flex flex-col md:flex-row items-center justify-between gap-10">
          
          {/* Left: Intro */}
          <motion.div 
            initial={{ opacity: 0, x: -40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex flex-col items-center md:items-start text-center md:text-left pt-10 md:pt-40 z-30"
          >
            <h2 className="text-5xl md:text-[4rem] lg:text-[5rem] text-wd-text leading-[1.05] tracking-tight mb-4 mt-4 flex flex-col items-center md:items-start gap-1 md:gap-2 z-10 relative">
               <div className="whitespace-nowrap">
                 <span className="font-instrument italic font-light pr-3 md:pr-4 text-wd-text/90">Hello,</span>
                 <span className="font-sans font-medium tracking-tighter">I'm Abhi.</span>
               </div>
               <div className="whitespace-nowrap flex items-end">
                 <span className="font-sans font-black uppercase tracking-tighter text-[0.85em] pr-3 md:pr-4">I build</span>
                 <span className="font-instrument italic text-[#ff3333] text-[1.1em] lowercase leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,1)] relative z-10">websites.</span>
               </div>
            </h2>
            <div className="flex items-center gap-4 mb-10 md:mb-12 md:pl-1 z-10 relative">
               <div className="hidden md:block w-8 h-[1px] bg-[#C10016]/50" />
               <span className="text-wd-text/40 text-[10px] md:text-xs font-light tracking-[0.2em] uppercase transition-colors duration-1000">
                 (A vibe coder, by the way.)
               </span>
            </div>
            <div className="flex flex-col items-center md:items-start gap-4 max-w-sm">
              <span className="font-bold text-[#C10016] tracking-[0.2em] text-xs md:text-sm uppercase leading-relaxed text-center md:text-left">
                WEB DESIGNER &<br className="hidden md:block"/> UI/UX CREATOR
              </span>
              <p className="text-wd-text/60 text-xs md:text-sm leading-relaxed tracking-wider font-light transition-colors duration-1000">
                I design and build stylish, user-focused web experiences that combine creativity with strategy. Passionate about clean design, smooth interactions, and details that make a difference.
              </p>
              <div className="flex items-center gap-3 mt-4 text-[10px] text-wd-text/40 tracking-[0.2em] uppercase transition-colors duration-1000">
                <div className="w-4 h-4 rounded-full border border-wd-border/20 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#C10016] rounded-full" />
                </div>
                AVAILABLE WORLDWIDE
              </div>
            </div>
          </motion.div>

          {/* Center: Portrait Cutout */}
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 1.05, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex-[1.5] w-full h-[400px] md:h-[110%] flex items-end justify-center relative pointer-events-none z-20 md:mb-[-5px]"
          >
            <img 
              src="https://res.cloudinary.com/adwbvkcv/image/upload/v1785483778/IMG_20260731_131227_mgb6z9.png" 
              alt="Portrait" 
              className="h-full w-auto object-contain object-bottom drop-shadow-[0_0_60px_rgba(0,0,0,0.9)] filter contrast-110 saturate-110"
            />
          </motion.div>

          {/* Right: Stats */}
          <div className="flex-1 flex flex-col items-center md:items-end md:pt-40 gap-6 md:gap-16 z-20 relative pb-20 md:pb-0 w-full">
            <motion.div 
              initial={{ opacity: 0, x: 40, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.5, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center md:justify-start gap-4 text-center md:text-right w-full max-w-[280px] md:max-w-[200px] bg-wd-glass/40 backdrop-blur-md p-4 rounded-xl border border-wd-border/10 shadow-2xl transition-colors duration-1000"
            >
              <div className="w-8 h-8 shrink-0 rounded-full border border-wd-border/20 flex items-center justify-center">
                <div className="w-2 h-2 bg-[#ff3333] rotate-45" />
              </div>
              <p className="text-wd-text/70 text-[9px] tracking-widest leading-relaxed uppercase transition-colors duration-1000">
                Turning ideas into powerful digital experiences.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 40, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.5, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-6 text-center md:text-right px-8 md:px-0 md:pr-4 py-8 md:py-6 bg-wd-glass/40 backdrop-blur-md rounded-2xl border border-wd-border/10 shadow-2xl w-full max-w-[280px] md:max-w-none transition-colors duration-1000"
            >
              <div className="flex flex-col md:flex-row items-center md:items-end justify-center md:justify-end gap-2 md:gap-4 border-b border-wd-border/10 pb-4">
                <span className="font-black text-5xl text-wd-text leading-none tracking-tighter drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)] transition-colors duration-1000">5+</span>
                <span className="text-[10px] text-wd-text/70 tracking-[0.2em] uppercase leading-tight pb-1 text-center md:text-left w-auto md:w-24 transition-colors duration-1000">Years<br/>Experience</span>
              </div>
              <div className="flex flex-col md:flex-row items-center md:items-end justify-center md:justify-end gap-2 md:gap-4 border-b border-wd-border/10 pb-4">
                <span className="font-black text-5xl text-wd-text leading-none tracking-tighter drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)] transition-colors duration-1000">40+</span>
                <span className="text-[10px] text-wd-text/70 tracking-[0.2em] uppercase leading-tight pb-1 text-center md:text-left w-auto md:w-24 transition-colors duration-1000">Projects<br className="hidden md:block"/> Completed</span>
              </div>
              <div className="flex flex-col md:flex-row items-center md:items-end justify-center md:justify-end gap-2 md:gap-4">
                <span className="font-black text-5xl text-wd-text leading-none tracking-tighter drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)] transition-colors duration-1000">20+</span>
                <span className="text-[10px] text-wd-text/70 tracking-[0.2em] uppercase leading-tight pb-1 text-center md:text-left w-auto md:w-24 transition-colors duration-1000">Happy<br className="hidden md:block"/> Clients</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. SELECTED PROJECTS */}
      <section className="w-full py-20 px-6 md:px-12 border-b border-wd-border/5 max-w-[100rem] mx-auto transition-colors duration-1000">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
          <h3 className="font-bold text-xl tracking-[0.3em] uppercase text-wd-text transition-colors duration-1000">SELECTED PROJECTS</h3>
          <Link href="#" className="flex items-center gap-4 text-[10px] text-wd-text/50 hover:text-wd-text tracking-[0.2em] transition-colors uppercase duration-1000">
            View All Projects 
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Project 1 */}
          <motion.a 
            href="https://pankaj-sharma-canvas-space.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col group cursor-pointer"
          >
            <div className="w-full aspect-[4/3] bg-wd-bg-card overflow-hidden relative mb-6 rounded-lg shadow-[0_0_0_1px_rgba(0,0,0,0.05)] night:shadow-[0_0_0_1px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_30px_rgba(193,0,22,0.15)] transition-all duration-700">
              <div className="absolute inset-0 bg-gradient-to-t from-wd-glass via-wd-glass/40 to-transparent z-10 opacity-80 group-hover:opacity-0 transition-opacity duration-700" />
              <img src="/project1.png" alt="Canvas Space Interior" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] opacity-50 group-hover:opacity-100 filter grayscale group-hover:grayscale-0 object-top" />
            </div>
            <div className="flex flex-row justify-between items-start border-t border-wd-border/10 pt-5 mt-2 transition-colors duration-1000">
              <div className="flex items-start gap-6">
                <span className="font-black text-2xl text-[#C10016] leading-none drop-shadow-[0_0_15px_rgba(193,0,22,0.3)] group-hover:drop-shadow-[0_0_25px_rgba(193,0,22,0.8)] transition-all duration-700">01</span>
                <div className="flex flex-col">
                  <span className="font-bold text-sm tracking-widest text-wd-text uppercase mb-1 group-hover:text-[#C10016] transition-colors duration-500">Canvas Space</span>
                  <span className="text-[10px] text-wd-text/40 tracking-widest uppercase group-hover:text-wd-text/80 transition-colors duration-500">Pankaj Sharma Portfolio</span>
                </div>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-wd-text/30 group-hover:text-[#C10016] transition-all group-hover:translate-x-2 duration-500"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </div>
          </motion.a>

          {/* Project 2 */}
          <motion.a 
            href="https://mansi-magic-interiors.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col group cursor-pointer"
          >
            <div className="w-full aspect-[4/3] bg-wd-bg-card overflow-hidden relative mb-6 rounded-lg shadow-[0_0_0_1px_rgba(0,0,0,0.05)] night:shadow-[0_0_0_1px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_30px_rgba(193,0,22,0.15)] transition-all duration-700">
              <div className="absolute inset-0 bg-gradient-to-t from-wd-glass via-wd-glass/40 to-transparent z-10 opacity-80 group-hover:opacity-0 transition-opacity duration-700" />
              <img src="/project2.png" alt="Magic Interiors" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] opacity-50 group-hover:opacity-100 filter grayscale group-hover:grayscale-0 object-top" />
            </div>
            <div className="flex flex-row justify-between items-start border-t border-wd-border/10 pt-5 mt-2 transition-colors duration-1000">
              <div className="flex items-start gap-6">
                <span className="font-black text-2xl text-[#C10016] leading-none drop-shadow-[0_0_15px_rgba(193,0,22,0.3)] group-hover:drop-shadow-[0_0_25px_rgba(193,0,22,0.8)] transition-all duration-700">02</span>
                <div className="flex flex-col">
                  <span className="font-bold text-sm tracking-widest text-wd-text uppercase mb-1 group-hover:text-[#C10016] transition-colors duration-500">Magic Interiors</span>
                  <span className="text-[10px] text-wd-text/40 tracking-widest uppercase group-hover:text-wd-text/80 transition-colors duration-500">Mansi Interior Studio</span>
                </div>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-wd-text/30 group-hover:text-[#C10016] transition-all group-hover:translate-x-2 duration-500"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </div>
          </motion.a>

          {/* Project 3 */}
          <motion.a 
            href="https://interior-designer-2-rho.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col group cursor-pointer"
          >
            <div className="w-full aspect-[4/3] bg-[#0A0A0A] overflow-hidden relative mb-6 rounded-lg shadow-[0_0_0_1px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_30px_rgba(193,0,22,0.15)] transition-all duration-700">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 opacity-80 group-hover:opacity-0 transition-opacity duration-700" />
              <img src="/project3.png" alt="Rho Interiors" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] opacity-50 group-hover:opacity-100 filter grayscale group-hover:grayscale-0 object-top" />
            </div>
            <div className="flex flex-row justify-between items-start border-t border-white/10 pt-5 mt-2">
              <div className="flex items-start gap-6">
                <span className="font-black text-2xl text-[#C10016] leading-none drop-shadow-[0_0_15px_rgba(193,0,22,0.3)] group-hover:drop-shadow-[0_0_25px_rgba(193,0,22,0.8)] transition-all duration-700">03</span>
                <div className="flex flex-col">
                  <span className="font-bold text-sm tracking-widest text-white uppercase mb-1 group-hover:text-[#C10016] transition-colors duration-500">Rho Interiors</span>
                  <span className="text-[10px] text-white/40 tracking-widest uppercase group-hover:text-white/80 transition-colors duration-500">Luxury Living Spaces</span>
                </div>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/30 group-hover:text-[#C10016] transition-all group-hover:translate-x-2 duration-500"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </div>
          </motion.a>
        </div>
      </section>

      {/* 2.5 FOUNDER SECTION */}
      <section className="w-full py-24 md:py-36 px-6 md:px-12 border-b border-wd-border/5 relative overflow-hidden transition-colors duration-1000">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[800px] h-[500px] bg-[#C10016] opacity-[0.04] blur-[120px] pointer-events-none rounded-full transition-opacity duration-1000" />
        
        <div className="max-w-[100rem] mx-auto flex items-center justify-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(15px)', scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
            viewport={{ once: true, margin: "-150px" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row items-center gap-6 md:gap-12"
          >
            <span className="font-instrument italic font-light text-5xl md:text-7xl lg:text-[6rem] text-wd-text/90 tracking-tight leading-none transition-colors duration-1000">
              Founder of
            </span>
            <div className="relative group cursor-pointer overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-wd-text/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img 
                src="https://res.cloudinary.com/adwbvkcv/image/upload/v1785486472/5ert_iylxzv.png" 
                alt="7pixels Logo" 
                className="h-20 md:h-28 lg:h-36 w-auto object-contain px-4 py-2 group-hover:scale-105 transition-all duration-[1.5s] ease-[0.16,1,0.3,1]"
                style={{ 
                  filter: 'brightness(0) invert(var(--theme-logo-invert)) drop-shadow(0 0 30px rgba(128,128,128,0.2))'
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2.6 THE MASTERPIECE */}
      <section className="w-full py-24 md:py-32 px-6 md:px-12 border-b border-wd-border/5 relative bg-wd-bg-darker transition-colors duration-1000">
        <div className="max-w-[100rem] mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-2 mb-12 text-center"
          >
            <span className="font-bold text-xs tracking-[0.3em] uppercase text-[#C10016]">Our Agency</span>
            <h3 className="font-instrument italic font-light text-4xl md:text-6xl text-wd-text transition-colors duration-1000">The Masterpiece.</h3>
          </motion.div>

          <motion.a 
            href="https://www.7pixels.xyz/"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full group cursor-pointer relative rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.2)] border border-wd-border/10 block transition-colors duration-1000"
          >
            {/* The giant image container */}
            <div className="w-full aspect-[4/3] md:aspect-[21/9] bg-wd-bg-card relative overflow-hidden transition-colors duration-1000">
              <div className="absolute inset-0 bg-gradient-to-t from-wd-glass/80 via-transparent to-transparent z-10 opacity-80 group-hover:opacity-0 transition-opacity duration-1000" />
              <img 
                src="/project_masterpiece.png" 
                alt="7pixels Masterpiece" 
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-[2s] ease-[0.16,1,0.3,1] opacity-70 group-hover:opacity-100 filter brightness-90 group-hover:brightness-110" 
              />
            </div>
            {/* Hover overlay text */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-wd-glass/40 backdrop-blur-sm">
               <div className="px-8 py-4 bg-wd-text text-wd-bg-main rounded-full flex items-center gap-4 transform translate-y-8 group-hover:translate-y-0 transition-all duration-700 ease-[0.16,1,0.3,1]">
                 <span className="font-black text-sm tracking-widest uppercase">Experience 7pixels</span>
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
               </div>
            </div>
          </motion.a>
        </div>
      </section>

      {/* 3. EDUCATION, SKILLS & WORK PROCESS */}
      <section className="w-full py-20 px-6 md:px-12 border-b border-wd-border/5 max-w-[100rem] mx-auto transition-colors duration-1000">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_0.8fr] gap-16 md:gap-12">
          
          {/* Col 1: Education & Skills */}
          <div className="flex flex-col border-b md:border-b-0 md:border-r border-wd-border/5 pb-16 md:pb-0 pr-0 md:pr-12 transition-colors duration-1000">
            <motion.h3 
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="font-bold text-lg tracking-[0.2em] uppercase text-wd-text mb-12 transition-colors duration-1000"
            >
              EDUCATION & SKILLS
            </motion.h3>
            
            <motion.h4 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-bold text-[10px] tracking-widest uppercase text-[#C10016] mb-8">EDUCATION</motion.h4>
            <div className="flex flex-col gap-8 mb-16">
              {[
                { title: "Self-Taught & Field Experience", role: "Digital Craftsman", year: "2020 - Present" },
                { title: "Advanced UI/UX Certification", role: "Design Systems", year: "2023" }
              ].map((item, idx) => (
                <motion.div 
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="flex justify-between items-start gap-4"
                >
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-xs tracking-widest text-wd-text transition-colors duration-1000">{item.title}</span>
                    <span className="text-[10px] text-wd-text/50 tracking-widest transition-colors duration-1000">{item.role}</span>
                  </div>
                  <span className="text-[10px] text-[#C10016] font-bold tracking-widest whitespace-nowrap">{item.year}</span>
                </motion.div>
              ))}
            </div>

            <motion.h4 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-bold text-[10px] tracking-widest uppercase text-[#C10016] mb-8">SKILLS</motion.h4>
            <div className="flex flex-wrap gap-2">
              {['WEB DESIGN', 'UI/UX DESIGN', 'FIGMA', 'FRAMER', 'REACT', 'NEXT.JS', 'TAILWIND', 'CSS/HTML', 'GSAP ANIMATION'].map((skill, idx) => (
                <motion.div 
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8, filter: 'blur(5px)' }}
                  whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="px-4 py-2 border border-wd-border/10 rounded-sm text-[9px] text-wd-text/60 tracking-widest hover:border-wd-border/40 hover:text-wd-text hover:shadow-[0_0_15px_rgba(193,0,22,0.1)] night:hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all cursor-default"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Col 2: Work Process */}
          <div className="flex flex-col px-0 md:px-6 border-b md:border-b-0 border-wd-border/5 pb-16 md:pb-0 transition-colors duration-1000">
            <motion.h3 
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="font-bold text-lg tracking-[0.2em] uppercase text-wd-text mb-12 transition-colors duration-1000"
            >
              WORK PROCESS
            </motion.h3>
            
            <div className="flex flex-col gap-10 relative">
              {/* Animated vertical line connector */}
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: "calc(100% - 3.5rem)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute left-[39px] top-4 w-[1px] bg-gradient-to-b from-[#C10016] via-wd-border/20 to-transparent z-0 origin-top" 
              />
              
              {[
                { num: "01", title: "DISCOVER", desc: "Understanding goals, audience, and project requirements.", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C10016" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>, active: true },
                { num: "02", title: "IDEATE", desc: "Planning, wireframing, and creating the right concept.", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1.45.62 2.84 1.5 3.5.76.76 1.23 1.52 1.41 2.5"></path></svg>, active: false },
                { num: "03", title: "DESIGN", desc: "Crafting visual design with a focus on user experience.", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>, active: false },
                { num: "04", title: "DEVELOP", desc: "Building fast, responsive, and high-performing websites.", icon: <span className="text-[10px] font-mono font-bold">{"</>"}</span>, active: false },
                { num: "05", title: "DELIVER", desc: "Testing, optimizing, and launching with perfection.", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>, active: false },
              ].map((step, idx) => (
                <motion.div 
                  key={step.num}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: 0.2 + (idx * 0.2), ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-6 relative z-10 group"
                >
                  <span className={`font-black text-sm pt-2 w-4 transition-colors duration-500 ${step.active ? 'text-[#C10016]' : 'text-wd-text/30 group-hover:text-wd-text'}`}>{step.num}</span>
                  <div className={`w-10 h-10 rounded-full border bg-wd-bg-main flex items-center justify-center shrink-0 transition-colors duration-500 ${step.active ? 'border-[#C10016] shadow-[0_0_15px_rgba(193,0,22,0.3)]' : 'border-wd-border/20 text-wd-text group-hover:border-wd-border/50 group-hover:text-wd-text group-hover:shadow-[0_0_15px_rgba(0,0,0,0.1)] night:group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]'}`}>
                    {step.icon}
                  </div>
                  <div className="flex flex-col pt-1">
                    <span className={`font-bold text-xs tracking-widest uppercase mb-2 transition-colors duration-500 ${step.active ? 'text-[#C10016]' : 'text-wd-text group-hover:text-[#C10016]'}`}>{step.title}</span>
                    <p className="text-[10px] text-wd-text/50 tracking-wider leading-relaxed group-hover:text-wd-text/80 transition-colors duration-500">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Col 3: Quote Block */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateX: 15 }}
            whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: 1000 }}
            className="w-full h-full min-h-[400px]"
          >
            <div className="w-full h-full bg-gradient-to-br from-[#A50012] to-[#75000A] p-10 flex flex-col justify-between relative overflow-hidden group rounded-2xl shadow-[0_20px_40px_rgba(193,0,22,0.25)] border border-[#C10016]/40 hover:shadow-[0_30px_60px_rgba(193,0,22,0.4)] hover:-translate-y-2 transition-all duration-700 ease-out">
              {/* Inner glowing orb */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[60px] rounded-full pointer-events-none group-hover:scale-150 group-hover:bg-white/20 transition-all duration-1000 ease-out" />
              
              <motion.div 
                initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 1 }}
                className="relative z-10 text-white/40 mb-8"
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
              </motion.div>
              
              <div className="relative z-10 font-sans text-2xl md:text-3xl font-light text-white leading-relaxed mb-12 tracking-wide flex flex-wrap gap-x-2 gap-y-1">
                {"Good design is not just how it looks, but how it works.".split(" ").map((word, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: 0.6 + (idx * 0.1), ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
              
              <motion.div 
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.5, duration: 1 }}
                className="relative z-10 flex flex-col gap-6 border-t border-white/20 pt-6 mt-auto"
              >
                <span className="font-instrument italic text-5xl text-white font-black opacity-90 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.6)] transition-all duration-700">Abhi</span>
                <div className="flex items-center gap-4 text-[9px] text-white/90 tracking-widest uppercase font-bold">
                  <div className="w-2 h-2 rounded-full border border-white flex items-center justify-center shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                    <div className="w-1 h-1 bg-white rounded-full animate-ping" />
                  </div>
                  Let's create something great together.
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. FOOTER / CONTACT */}
      <footer className="w-full pt-20 px-6 md:px-12 max-w-[100rem] mx-auto relative flex flex-col md:flex-row justify-between items-stretch gap-16 md:gap-8 min-h-[400px] border-t border-wd-border/5 bg-wd-bg-main transition-colors duration-1000">
        
        {/* Left: Contact Info */}
        <div className="flex-1 flex flex-col gap-12 md:pb-20 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="flex items-start gap-2"
          >
            <h2 className="font-black text-4xl md:text-5xl tracking-tighter uppercase text-wd-text leading-tight drop-shadow-2xl transition-colors duration-1000">
              LET'S WORK<br/>TOGETHER
            </h2>
            <div className="w-2 h-2 bg-[#C10016] mt-3 rotate-45 shrink-0 shadow-[0_0_10px_rgba(193,0,22,0.8)] animate-pulse" />
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-wd-text/60 text-xs tracking-wider leading-relaxed max-w-sm transition-colors duration-1000"
          >
            I'm currently open for new projects and collaborations. Let's create something amazing that drives results.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center gap-4 border border-[#C10016]/50 px-6 py-3 rounded-full w-max mt-4 text-[#C10016] bg-[#C10016]/5 hover:bg-[#C10016]/20 hover:shadow-[0_0_20px_rgba(193,0,22,0.2)] transition-all cursor-default"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">AVAILABLE FOR FREELANCE</span>
          </motion.div>
        </div>

        {/* Middle: Contact Links */}
        <div className="flex-1 flex flex-col gap-8 w-full md:pb-20 relative z-10 pt-4 md:pt-0">
          {[
            { label: "hello@7pixels.xyz", icon: <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>, icon2: <polyline points="22,6 12,13 2,6"></polyline> },
            { label: "www.7pixels.xyz", icon: <><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></> },
            { label: "+91 123 456 7890", icon: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path> },
            { label: "New Delhi, India", icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></> }
          ].map((contact, idx) => (
            <motion.div 
              key={contact.label}
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 + (idx * 0.1) }}
              className="flex items-center gap-6 border-b border-wd-border/5 pb-6 group cursor-pointer transition-colors duration-1000"
            >
              <div className="w-10 h-10 rounded-full border border-wd-border/10 flex items-center justify-center text-wd-text/50 group-hover:border-[#C10016] group-hover:text-[#C10016] group-hover:shadow-[0_0_15px_rgba(193,0,22,0.2)] transition-all shrink-0 duration-1000">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  {contact.icon}
                  {contact.icon2 && contact.icon2}
                </svg>
              </div>
              <span className="text-xs text-wd-text/70 tracking-widest group-hover:text-wd-text transition-colors duration-1000">{contact.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Right: Abhi's Photo & Speech Bubble */}
        <div className="flex-1 flex justify-center md:justify-end items-end relative z-0 mt-12 md:mt-0 pt-20 md:pt-0">
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[320px] md:max-w-[350px]"
          >
            {/* Speech Bubble */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.5, y: 20, rotate: -15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0, rotate: -6 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 0.6, type: "spring", bounce: 0.6 }}
              className="absolute -top-10 -left-6 md:-left-12 bg-white text-black px-6 py-4 rounded-3xl rounded-br-none shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-20 flex flex-col items-center justify-center transform -rotate-6 group hover:rotate-0 hover:scale-110 transition-transform duration-300 cursor-pointer"
            >
              <span className="font-instrument italic font-bold text-3xl leading-none text-[#C10016]">Bye-bye!</span>
            </motion.div>
            
            {/* Image Container (Cylindrical Top, Flat Bottom) */}
            <div className="w-full aspect-[3/4] bg-wd-bg-card rounded-t-[200px] rounded-b-none border-t border-x border-wd-border/10 overflow-hidden relative group transition-colors duration-1000">
              <div className="absolute inset-0 bg-gradient-to-t from-wd-bg-main via-wd-bg-main/40 to-transparent z-10 opacity-80 group-hover:opacity-0 transition-opacity duration-1000" />
              <img 
                src="https://res.cloudinary.com/adwbvkcv/image/upload/v1785480967/IMG_20260731_122007_skpmya.png" 
                alt="Abhi"
                className="w-full h-full object-cover object-top filter grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-[1.5s] ease-out group-hover:scale-105"
              />
            </div>
          </motion.div>
        </div>

      </footer>

    </main>
  );
}
