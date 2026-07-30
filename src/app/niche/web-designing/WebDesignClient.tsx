'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

export default function WebDesignClient() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <motion.main 
      ref={containerRef}
      className="relative min-h-screen bg-[#050505] text-white overflow-hidden flex flex-col pt-24 pb-32"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background gradients similar to Video page */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#2563EB]/10 blur-[120px] rounded-full mix-blend-screen" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#ea77ff]/5 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      {/* 1. HERO SECTION */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-4 md:px-12 mt-10">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center w-full max-w-5xl"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-[1px] w-12 bg-white/30"></span>
            <span className="font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/50">Founder & Lead Architect</span>
            <span className="h-[1px] w-12 bg-white/30"></span>
          </div>
          
          <h1 className="text-6xl md:text-[8rem] flex flex-col items-center leading-[0.9] mb-8">
            <span className="font-sans font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40">7pixels</span>
            <span className="font-cormorant font-light italic tracking-widest text-[#2563EB]">Agency</span>
          </h1>
          
          <p className="font-sans text-lg md:text-2xl font-light max-w-2xl mx-auto text-white/70 leading-relaxed mb-10">
            We don't just build aesthetic interfaces. We engineer <span className="text-white">high-velocity, conversion-focused architecture</span> proven to obliterate industry standards.
          </p>

          <Link href="https://www.7pixels.xyz" target="_blank" className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-xl group">
             <span className="font-mono text-xs uppercase tracking-widest text-white/90">Visit Agency</span>
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </motion.div>
      </section>

      {/* 2. ENGINEERED METRICS */}
      <section className="relative z-10 w-full px-4 md:px-12 lg:px-24 py-20 mt-20">
         <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-20" />
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center md:items-start p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md">
               <span className="font-mono text-xs uppercase tracking-widest text-white/40 mb-6">Google Lighthouse</span>
               <div className="text-6xl md:text-7xl font-sans font-black tracking-tighter text-white mb-4">100<span className="text-3xl text-white/30 font-light">/100</span></div>
               <p className="text-white/50 text-sm font-light leading-relaxed">Perfect score across performance, accessibility, SEO, and best practices.</p>
            </div>

            <div className="flex flex-col items-center md:items-start p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md">
               <span className="font-mono text-xs uppercase tracking-widest text-white/40 mb-6">Average Load</span>
               <div className="text-6xl md:text-7xl font-sans font-black tracking-tighter text-[#2563EB] mb-4">0.8<span className="text-3xl text-[#2563EB]/40 font-light">s</span></div>
               <p className="text-white/50 text-sm font-light leading-relaxed">Lightning-fast DOM rendering explicitly optimized for premium experiences.</p>
            </div>

            <div className="flex flex-col items-center md:items-start p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md">
               <span className="font-mono text-xs uppercase tracking-widest text-white/40 mb-6">System Integrity</span>
               <div className="text-6xl md:text-7xl font-sans font-black tracking-tighter text-white mb-4">99.9<span className="text-3xl text-white/30 font-light">%</span></div>
               <p className="text-white/50 text-sm font-light leading-relaxed">Bulletproof hosting pipelines securely distributed across global edge networks.</p>
            </div>
         </div>
      </section>

      {/* 3. THE MUSEUM LIBRARY (PORTFOLIO BENTO) */}
      <section className="relative z-10 w-full px-4 md:px-12 lg:px-24 py-32">
         <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
            <div>
               <h2 className="text-5xl md:text-7xl font-cormorant italic text-white tracking-tight mb-4">The Museum Library</h2>
               <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">Curated architectural portfolios</p>
            </div>
            <Link href="https://www.7pixels.xyz/work" target="_blank" className="font-mono text-xs uppercase tracking-widest text-[#2563EB] hover:text-white transition-colors flex items-center gap-2 border-b border-[#2563EB]/30 pb-1">
               View Full Archive <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-[400px_300px_300px] gap-6">
            
            {/* Wing 01 */}
            <motion.div 
               className="md:col-span-2 md:row-span-1 rounded-[2rem] bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-10 flex flex-col justify-between overflow-hidden group relative cursor-pointer"
               whileHover={{ y: -5 }}
            >
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0"></div>
               <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
               
               <div className="relative z-10 flex justify-between items-start">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">Wing 01</span>
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md group-hover:bg-white group-hover:text-black transition-colors">
                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </div>
               </div>
               
               <div className="relative z-10">
                  <h3 className="font-cormorant italic text-5xl md:text-6xl mb-2 text-white">Interior Design</h3>
                  <p className="font-sans text-sm font-light text-white/60">Spatial aesthetics & geometric layouts</p>
               </div>
            </motion.div>

            {/* Wing 02 */}
            <motion.div 
               className="md:col-span-1 md:row-span-2 rounded-[2rem] bg-[#2563EB]/10 border border-[#2563EB]/30 p-10 flex flex-col justify-between overflow-hidden group relative cursor-pointer"
               whileHover={{ y: -5 }}
            >
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555529733-0e670560f7e1?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay group-hover:scale-105 transition-transform duration-1000"></div>
               <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>

               <div className="relative z-10 flex justify-between items-start">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#2563EB] bg-[#2563EB]/10 backdrop-blur-md px-3 py-1 rounded-full border border-[#2563EB]/20">Wing 02</span>
               </div>
               
               <div className="relative z-10 mt-32">
                  <h3 className="font-sans font-black uppercase text-4xl tracking-tighter mb-2 text-white">Clinical & Dental</h3>
                  <p className="font-sans text-sm font-light text-white/60">Trust-centric patient interfaces engineered for conversion.</p>
               </div>
            </motion.div>

            {/* Wing 03 */}
            <motion.div 
               className="md:col-span-1 md:row-span-1 rounded-[2rem] bg-white/[0.03] border border-white/5 p-8 flex flex-col justify-between overflow-hidden group relative cursor-pointer"
               whileHover={{ y: -5 }}
            >
               <div className="relative z-10 flex justify-between items-start">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">Wing 03</span>
               </div>
               <div className="relative z-10">
                  <h3 className="font-cormorant italic text-3xl mb-1 text-white">Tattoo Artists</h3>
                  <p className="font-sans text-xs font-light text-white/50">Dark-mode, high-contrast visual galleries</p>
               </div>
            </motion.div>

            {/* Wing 04 */}
            <motion.div 
               className="md:col-span-1 md:row-span-1 rounded-[2rem] bg-white/[0.03] border border-white/5 p-8 flex flex-col justify-between overflow-hidden group relative cursor-pointer"
               whileHover={{ y: -5 }}
            >
               <div className="relative z-10 flex justify-between items-start">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">Wing 04</span>
               </div>
               <div className="relative z-10">
                  <h3 className="font-sans font-bold uppercase text-2xl tracking-tighter mb-1 text-white">Digital Creators</h3>
                  <p className="font-sans text-xs font-light text-white/50">Personality-driven dynamic structures</p>
               </div>
            </motion.div>

            {/* Wing 05 */}
            <motion.div 
               className="md:col-span-2 md:row-span-1 rounded-[2rem] bg-gradient-to-r from-white/[0.08] to-transparent border border-white/10 p-10 flex items-center justify-between overflow-hidden group relative cursor-pointer"
               whileHover={{ y: -5 }}
            >
               <div className="relative z-10">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 block mb-4">Wing 05</span>
                  <h3 className="font-sans font-black uppercase text-5xl tracking-tighter mb-2 text-white">SaaS & Tech</h3>
                  <p className="font-sans text-sm font-light text-white/60">Strictly architectural conversion systems.</p>
               </div>
               
               <div className="relative z-10 hidden md:block">
                  <div className="w-32 h-32 rounded-full border border-white/10 flex items-center justify-center relative overflow-hidden group-hover:border-white/30 transition-colors">
                     <div className="absolute inset-0 bg-white/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500"></div>
                     <span className="font-mono text-xs uppercase tracking-widest text-white/70 relative z-10 group-hover:text-white">Explore</span>
                  </div>
               </div>
            </motion.div>
         </div>
      </section>

    </motion.main>
  );
}
