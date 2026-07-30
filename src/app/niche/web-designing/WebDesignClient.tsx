'use client';

import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useRef, MouseEvent } from 'react';
import Link from 'next/link';

const MetricCard = ({ title, value, sub, desc, delay }: { title: string, value: string, sub: string, desc: string, delay: number }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div 
      className="relative flex flex-col items-center text-center md:items-start md:text-left p-8 md:p-10 rounded-[2rem] bg-black/[0.02] border border-black/5 overflow-hidden group hover:bg-white transition-colors duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)]"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(37, 99, 235, 0.15), transparent 40%)`,
        }}
      />
      <span className="relative z-20 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-black/40 mb-6 group-hover:text-black/70 transition-colors">{title}</span>
      <div className="relative z-20 text-6xl md:text-7xl font-sans font-black tracking-tighter text-black mb-4 group-hover:text-[#2563EB] transition-colors">{value}<span className="text-3xl text-black/30 font-light">{sub}</span></div>
      <p className="relative z-20 text-black/50 text-xs md:text-sm font-light leading-relaxed group-hover:text-black/80 transition-colors">{desc}</p>
    </motion.div>
  );
};

export default function WebDesignClient() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <motion.main 
      ref={containerRef}
      className="relative min-h-screen bg-[#FAFAFA] text-black overflow-hidden flex flex-col pt-24 pb-32 selection:bg-black selection:text-white"
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
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4 md:px-12 mt-10 md:mt-20">
        <motion.div 
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center w-full max-w-5xl flex flex-col items-center"
          style={{ y: y2 }}
        >
          <div className="flex items-center justify-center gap-4 mb-6 md:mb-10 overflow-hidden">
             <motion.span className="h-[1px] bg-black/10" initial={{ width: 0 }} animate={{ width: 48 }} transition={{ duration: 1, delay: 0.5 }} />
             <motion.span className="font-mono text-[9px] md:text-xs tracking-[0.4em] uppercase text-black/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}>Founder & Lead Architect</motion.span>
             <motion.span className="h-[1px] bg-black/10" initial={{ width: 0 }} animate={{ width: 48 }} transition={{ duration: 1, delay: 0.5 }} />
          </div>
          
          <h1 className="text-[5rem] leading-[0.8] sm:text-[7rem] md:text-[9rem] lg:text-[11rem] flex flex-col items-center md:leading-[0.8] mb-8 md:mb-12 relative">
            <span className="font-sans font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-br from-black via-[#222] to-black/60 drop-shadow-[0_10px_20px_rgba(0,0,0,0.1)]">7pixels</span>
            <motion.span 
              className="font-cormorant font-light italic tracking-widest text-[#2563EB] text-[3rem] sm:text-[4rem] md:text-[6rem] lg:text-[7rem] drop-shadow-[0_0_30px_rgba(37,99,235,0.4)]"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            >
              Agency
            </motion.span>
          </h1>
          
          <motion.p 
            className="font-sans text-base sm:text-lg md:text-2xl font-light max-w-2xl mx-auto text-black/60 leading-relaxed mb-10 md:mb-14 px-4 md:px-0"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }}
          >
            We don't just build aesthetic interfaces. We engineer <span className="text-black font-medium">high-velocity, conversion-focused architecture</span> proven to obliterate industry standards.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8 }}>
            <Link href="https://www.7pixels.xyz" target="_blank" className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-black/5 border border-black/10 hover:bg-white hover:border-[#2563EB]/30 transition-all duration-500 backdrop-blur-xl group hover:shadow-[0_10px_30px_rgba(37,99,235,0.15)]">
               <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-black/80">Visit Agency</span>
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#2563EB] transition-all"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. ENGINEERED METRICS */}
      <section className="relative z-10 w-full px-4 md:px-12 lg:px-24 py-16 md:py-32 mt-10 md:mt-20">
         <motion.div 
           className="w-full h-[1px] bg-gradient-to-r from-transparent via-black/10 to-transparent mb-16 md:mb-24"
           initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, ease: "easeInOut" }}
         />
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <MetricCard title="Google Lighthouse" value="100" sub="/100" desc="Perfect score across performance, accessibility, SEO, and best practices." delay={0.1} />
            <MetricCard title="Average Load" value="0.8" sub="s" desc="Lightning-fast DOM rendering explicitly optimized for premium experiences." delay={0.2} />
            <MetricCard title="System Integrity" value="99.9" sub="%" desc="Bulletproof hosting pipelines securely distributed across global edge networks." delay={0.3} />
         </div>
      </section>

      {/* 3. THE MUSEUM LIBRARY (PORTFOLIO BENTO) */}
      <section className="relative z-10 w-full px-4 md:px-12 lg:px-24 py-16 md:py-32">
         <motion.div 
           className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-20 gap-6 md:gap-8"
           initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1 }}
         >
            <div>
               <h2 className="text-5xl md:text-7xl lg:text-8xl font-cormorant italic text-black tracking-tight mb-2 md:mb-4">The Museum Library</h2>
               <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-black/40">Curated architectural portfolios</p>
            </div>
            <Link href="https://www.7pixels.xyz/work" target="_blank" className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-widest text-[#2563EB] hover:text-[#00d2ff] transition-colors flex items-center gap-2 border-b border-[#2563EB]/30 pb-1 group">
               View Full Archive <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
         </motion.div>

         <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-[400px_300px_300px] gap-4 md:gap-6">
            
            {/* Wing 01 */}
            <motion.div 
               className="h-[300px] md:h-auto md:col-span-2 md:row-span-1 rounded-[2rem] bg-gradient-to-br from-black/[0.03] to-transparent border border-black/5 p-6 md:p-10 flex flex-col justify-between overflow-hidden group relative cursor-pointer"
               whileHover={{ y: -5, transition: { duration: 0.3 } }}
               initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay: 0.1 }}
            >
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-0 group-hover:opacity-10 mix-blend-multiply group-hover:scale-110 transition-all duration-[1.5s] grayscale group-hover:grayscale-0"></div>
               <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] via-transparent to-transparent"></div>
               
               <div className="relative z-10 flex justify-between items-start">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] md:tracking-widest text-black/50 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-black/10 group-hover:bg-black group-hover:text-white transition-all shadow-sm">Wing 01</span>
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-black/10 flex items-center justify-center bg-white/50 backdrop-blur-md group-hover:bg-black group-hover:text-white transition-all shadow-sm">
                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </div>
               </div>
               
               <div className="relative z-10">
                  <h3 className="font-cormorant italic text-4xl md:text-5xl lg:text-6xl mb-2 text-black drop-shadow-sm">Interior Design</h3>
                  <p className="font-sans text-xs md:text-sm font-light text-black/50 tracking-wide uppercase">Spatial aesthetics & geometric layouts</p>
               </div>
            </motion.div>

            {/* Wing 02 */}
            <motion.div 
               className="h-[350px] md:h-auto md:col-span-1 md:row-span-2 rounded-[2rem] bg-[#2563EB]/5 border border-[#2563EB]/20 p-6 md:p-10 flex flex-col justify-between overflow-hidden group relative cursor-pointer"
               whileHover={{ y: -5, transition: { duration: 0.3 } }}
               initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay: 0.2 }}
            >
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555529733-0e670560f7e1?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-0 group-hover:opacity-10 mix-blend-multiply group-hover:scale-110 transition-all duration-[1.5s]"></div>
               <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFA] via-transparent to-transparent"></div>

               <div className="relative z-10 flex justify-between items-start">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] md:tracking-widest text-[#2563EB] bg-[#2563EB]/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#2563EB]/20 group-hover:bg-[#2563EB] group-hover:text-white transition-all">Wing 02</span>
               </div>
               
               <div className="relative z-10 md:mt-32">
                  <h3 className="font-sans font-black uppercase text-3xl md:text-5xl tracking-tighter mb-2 text-black drop-shadow-sm">Clinical<br/><span className="text-[#2563EB] font-cormorant italic font-light lowercase">& Dental</span></h3>
                  <p className="font-sans text-xs md:text-sm font-light text-black/50 leading-relaxed">Trust-centric patient interfaces engineered for premium conversion.</p>
               </div>
            </motion.div>

            {/* Wing 03 */}
            <motion.div 
               className="h-[250px] md:h-auto md:col-span-1 md:row-span-1 rounded-[2rem] bg-black/[0.02] border border-black/5 p-6 md:p-8 flex flex-col justify-between overflow-hidden group relative cursor-pointer hover:border-black/10 transition-colors"
               whileHover={{ y: -5, transition: { duration: 0.3 } }}
               initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay: 0.3 }}
            >
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-0 group-hover:opacity-10 transition-opacity duration-700 grayscale mix-blend-multiply"></div>
               <div className="relative z-10 flex justify-between items-start">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] md:tracking-widest text-black/40">Wing 03</span>
               </div>
               <div className="relative z-10">
                  <h3 className="font-cormorant italic text-3xl md:text-4xl mb-1 text-black">Tattoo Artists</h3>
                  <p className="font-sans text-xs font-light text-black/40 tracking-wider uppercase">Dark-mode visual galleries</p>
               </div>
            </motion.div>

            {/* Wing 04 */}
            <motion.div 
               className="h-[250px] md:h-auto md:col-span-1 md:row-span-1 rounded-[2rem] bg-black/[0.02] border border-black/5 p-6 md:p-8 flex flex-col justify-between overflow-hidden group relative cursor-pointer hover:border-black/10 transition-colors"
               whileHover={{ y: -5, transition: { duration: 0.3 } }}
               initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay: 0.4 }}
            >
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-0 group-hover:opacity-10 transition-opacity duration-700 grayscale mix-blend-multiply"></div>
               <div className="relative z-10 flex justify-between items-start">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] md:tracking-widest text-black/40">Wing 04</span>
               </div>
               <div className="relative z-10">
                  <h3 className="font-sans font-bold uppercase text-2xl md:text-3xl tracking-tighter mb-1 text-black">Digital Creators</h3>
                  <p className="font-sans text-[10px] md:text-xs font-light text-black/40 tracking-wider uppercase">Personality-driven dynamic structures</p>
               </div>
            </motion.div>

            {/* Wing 05 */}
            <motion.div 
               className="h-[300px] md:h-auto md:col-span-2 md:row-span-1 rounded-[2rem] bg-gradient-to-r from-black/[0.03] to-transparent border border-black/5 p-6 md:p-10 flex items-center justify-between overflow-hidden group relative cursor-pointer hover:from-black/[0.05] transition-colors"
               whileHover={{ y: -5, transition: { duration: 0.3 } }}
               initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay: 0.5 }}
            >
               <div className="relative z-10 w-full md:w-auto">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] md:tracking-widest text-black/40 block mb-4 group-hover:text-black/60 transition-colors">Wing 05</span>
                  <h3 className="font-sans font-black uppercase text-4xl md:text-6xl tracking-tighter mb-2 text-black drop-shadow-sm">SaaS & Tech</h3>
                  <p className="font-sans text-xs md:text-sm font-light text-black/50 tracking-wider uppercase">Strictly architectural conversion systems.</p>
               </div>
               
               <div className="relative z-10 hidden md:block">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-black/10 flex items-center justify-center relative overflow-hidden group-hover:border-black/20 transition-colors bg-white/50 shadow-sm group-hover:shadow-md">
                     <div className="absolute inset-0 bg-black/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]"></div>
                     <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-black/60 relative z-10 group-hover:text-black transition-colors">Explore</span>
                  </div>
               </div>
            </motion.div>
         </div>
      </section>

    </motion.main>
  );
}
