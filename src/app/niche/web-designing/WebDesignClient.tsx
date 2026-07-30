'use client';

import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue, AnimatePresence } from 'framer-motion';
import { useRef, MouseEvent, useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/components/ThemeProvider';

const MetricCard = ({ title, value, sub, desc, delay, isNight }: { title: string, value: string, sub: string, desc: string, delay: number, isNight: boolean }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const cardBg = isNight ? 'bg-white/[0.03] hover:bg-white/[0.08] border-white/5' : 'bg-black/[0.02] hover:bg-white border-black/5';
  const textColor = isNight ? 'text-[#fcfbfa]' : 'text-[#1b3f55]';
  const mutedText = isNight ? 'text-[#fcfbfa]/50' : 'text-[#1b3f55]/50';

  return (
    <motion.div 
      className={`relative flex flex-col items-center text-center md:items-start md:text-left p-6 md:p-10 rounded-2xl md:rounded-[2rem] border overflow-hidden group transition-colors duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] ${cardBg}`}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${isNight ? 'rgba(255, 255, 255, 0.05)' : 'rgba(37, 99, 235, 0.15)'}, transparent 40%)`,
        }}
      />
      <span className={`relative z-20 font-mono text-[9px] md:text-xs uppercase tracking-[0.2em] mb-2 md:mb-6 transition-colors ${mutedText} group-hover:${textColor}`}>{title}</span>
      <div className={`relative z-20 text-4xl md:text-7xl font-sans font-black tracking-tighter mb-2 md:mb-4 transition-colors ${textColor}`}>{value}<span className={`text-xl md:text-3xl font-light ${mutedText}`}>{sub}</span></div>
      <p className={`relative z-20 text-[10px] md:text-sm font-light leading-relaxed transition-colors ${mutedText}`}>{desc}</p>
    </motion.div>
  );
};

const PortfolioModal = ({ activeWing, onClose, isNight }: { activeWing: string, onClose: () => void, isNight: boolean }) => {
  const portfolioData: Record<string, { title: string, websites: string[] }> = {
    'Interior Design': {
      title: 'Interior Design Architecture',
      websites: ['https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80']
    },
    'Clinical & Dental': {
      title: 'Clinical & Dental Interfaces',
      websites: ['https://images.unsplash.com/photo-1555529733-0e670560f7e1?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80']
    },
    'Tattoo Artists': {
      title: 'Tattoo Artists Galleries',
      websites: ['https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1560707854-bebc1cb6d22d?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1598371691232-a5e2fce12d21?auto=format&fit=crop&q=80']
    },
    'Digital Creators': {
      title: 'Digital Creators Platforms',
      websites: ['https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80']
    },
    'SaaS & Tech': {
      title: 'SaaS & Tech Systems',
      websites: ['https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80']
    }
  };

  const data = portfolioData[activeWing];
  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-start pt-24 px-4 overflow-y-auto backdrop-blur-3xl ${isNight ? 'bg-[#1c2226]/95' : 'bg-[#fcfbfa]/95'}`}
    >
       <button onClick={onClose} className={`absolute top-6 right-6 md:top-8 md:right-8 p-3 md:p-4 rounded-full ${isNight ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-black/10 text-black hover:bg-black/20'} transition-all hover:rotate-90`}>
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
       </button>
       
       <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className={`font-mono text-xs uppercase tracking-[0.3em] mb-4 ${isNight ? 'text-white/50' : 'text-black/50'}`}>Live Archive</motion.span>
       <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className={`font-cormorant italic text-4xl md:text-6xl lg:text-7xl mb-12 md:mb-20 text-center ${isNight ? 'text-white' : 'text-[#1b3f55]'}`}>{data.title}</motion.h2>
       
       <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pb-32">
          {data.websites.map((url, i) => (
             <motion.div 
               key={i} 
               initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
               className={`w-full aspect-[4/3] rounded-2xl md:rounded-[2rem] overflow-hidden border ${isNight ? 'border-white/10' : 'border-black/10'} group relative cursor-pointer shadow-2xl`}
             >
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] group-hover:scale-110" style={{ backgroundImage: `url(${url})` }} />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                   <span className="text-white font-mono uppercase tracking-widest text-[10px] md:text-xs border border-white/30 px-6 py-2 rounded-full backdrop-blur-md bg-white/10 group-hover:scale-105 transition-transform">Visit Interface</span>
                </div>
             </motion.div>
          ))}
       </div>
    </motion.div>
  );
}

export default function WebDesignClient() {
  const { theme } = useTheme();
  const isNight = theme === 'night';
  const [activeWing, setActiveWing] = useState<string | null>(null);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const bgColor = isNight ? 'bg-[#1c2226]' : 'bg-[#fcfbfa]';
  const textColor = isNight ? 'text-[#fcfbfa]' : 'text-[#1b3f55]';
  const mutedText = isNight ? 'text-[#fcfbfa]/50' : 'text-[#1b3f55]/50';
  const borderColor = isNight ? 'border-[#fcfbfa]/20' : 'border-[#1b3f55]/20';
  const accentText = isNight ? 'text-[#f4ece3]' : 'text-[#2563EB]';
  const gradientTitle = isNight 
    ? 'from-[#fcfbfa] via-[#e2e2e2] to-white/40 drop-shadow-[0_10px_20px_rgba(255,255,255,0.05)]' 
    : 'from-[#1b3f55] via-[#112a38] to-[#1b3f55]/60 drop-shadow-[0_10px_20px_rgba(27,63,85,0.1)]';

  return (
    <motion.main 
      ref={containerRef}
      className={`relative min-h-screen ${bgColor} ${textColor} overflow-hidden flex flex-col pt-24 pb-32 transition-colors duration-1000 selection:bg-[#2563EB]/30`}
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
             <motion.span className={`h-[1px] ${isNight ? 'bg-white/20' : 'bg-black/10'}`} initial={{ width: 0 }} animate={{ width: 48 }} transition={{ duration: 1, delay: 0.5 }} />
             <motion.span className={`font-mono text-[9px] md:text-xs tracking-[0.4em] uppercase ${mutedText}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}>Founder & Lead Architect</motion.span>
             <motion.span className={`h-[1px] ${isNight ? 'bg-white/20' : 'bg-black/10'}`} initial={{ width: 0 }} animate={{ width: 48 }} transition={{ duration: 1, delay: 0.5 }} />
          </div>
          
          <h1 className="text-[5rem] leading-[0.8] sm:text-[7rem] md:text-[9rem] lg:text-[11rem] flex flex-col items-center md:leading-[0.8] mb-8 md:mb-12 relative">
            <span className={`font-sans font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-br ${gradientTitle}`}>7pixels</span>
            <motion.span 
              className={`font-cormorant font-light italic tracking-widest ${accentText} text-[3rem] sm:text-[4rem] md:text-[6rem] lg:text-[7rem] ${isNight ? 'drop-shadow-[0_0_30px_rgba(244,236,227,0.2)]' : 'drop-shadow-[0_0_30px_rgba(37,99,235,0.4)]'}`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            >
              Agency
            </motion.span>
          </h1>
          
          <motion.p 
            className={`font-sans text-base sm:text-lg md:text-2xl font-light max-w-2xl mx-auto ${mutedText} leading-relaxed mb-10 md:mb-14 px-4 md:px-0`}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }}
          >
            We don't just build aesthetic interfaces. We engineer <span className={`font-medium ${textColor}`}>high-velocity, conversion-focused architecture</span> proven to obliterate industry standards.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8 }}>
            <Link href="https://www.7pixels.xyz" target="_blank" className={`inline-flex items-center gap-4 px-8 py-4 rounded-full ${isNight ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-black/5 border-black/10 hover:bg-white hover:border-[#2563EB]/30'} transition-all duration-500 backdrop-blur-xl group hover:shadow-[0_10px_30px_rgba(37,99,235,0.15)]`}>
               <span className={`font-mono text-[10px] md:text-xs uppercase tracking-widest ${isNight ? 'text-white' : 'text-black/80'}`}>Visit Agency</span>
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`group-hover:translate-x-1 group-hover:-translate-y-1 ${isNight ? 'group-hover:text-[#f4ece3]' : 'group-hover:text-[#2563EB]'} transition-all`}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. THE MUSEUM LIBRARY (PORTFOLIO BENTO) */}
      <section className="relative z-10 w-full px-4 md:px-12 lg:px-24 py-16 md:py-32 mt-10 md:mt-20">
         <motion.div 
           className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-20 gap-6 md:gap-8"
           initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1 }}
         >
            <div>
               <h2 className={`text-5xl md:text-7xl lg:text-8xl font-cormorant italic tracking-tight mb-2 md:mb-4 ${textColor}`}>The Museum Library</h2>
               <p className={`font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] ${mutedText}`}>Curated architectural portfolios</p>
            </div>
            <Link href="https://www.7pixels.xyz/work" target="_blank" className={`font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-widest ${accentText} hover:text-[#00d2ff] transition-colors flex items-center gap-2 border-b border-current pb-1 group`}>
               View Full Archive <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
         </motion.div>

         <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-[400px_300px_300px] gap-4 md:gap-6">
            
            {/* Wing 01 */}
            <motion.div 
               onClick={() => setActiveWing('Interior Design')}
               className={`h-[300px] md:h-auto md:col-span-2 md:row-span-1 rounded-[2rem] bg-gradient-to-br ${isNight ? 'from-white/[0.05]' : 'from-black/[0.03]'} to-transparent border ${borderColor} p-6 md:p-10 flex flex-col justify-between overflow-hidden group relative cursor-pointer`}
               whileHover={{ y: -5, transition: { duration: 0.3 } }}
               initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay: 0.1 }}
            >
               <div className={`absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-0 ${isNight ? 'group-hover:opacity-30 mix-blend-screen' : 'group-hover:opacity-10 mix-blend-multiply'} group-hover:scale-110 transition-all duration-[1.5s] grayscale group-hover:grayscale-0`}></div>
               <div className={`absolute inset-0 bg-gradient-to-t ${isNight ? 'from-[#1c2226]' : 'from-[#fcfbfa]'} via-transparent to-transparent`}></div>
               
               <div className="relative z-10 flex justify-between items-start">
                  <span className={`font-mono text-[10px] uppercase tracking-[0.2em] md:tracking-widest ${isNight ? 'text-[#1c2226] bg-white/90 group-hover:bg-[#f4ece3]' : 'text-black/50 bg-white/80 group-hover:bg-black group-hover:text-white'} backdrop-blur-md px-4 py-1.5 rounded-full border border-black/10 transition-all shadow-sm`}>Wing 01</span>
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full border border-black/10 flex items-center justify-center ${isNight ? 'bg-white/90 text-[#1c2226] group-hover:bg-[#f4ece3]' : 'bg-white/50 group-hover:bg-black group-hover:text-white'} backdrop-blur-md transition-all shadow-sm`}>
                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </div>
               </div>
               
               <div className="relative z-10">
                  <h3 className={`font-cormorant italic text-4xl md:text-5xl lg:text-6xl mb-2 ${textColor} drop-shadow-sm`}>Interior Design</h3>
                  <p className={`font-sans text-xs md:text-sm font-light ${mutedText} tracking-wide uppercase`}>Spatial aesthetics & geometric layouts</p>
               </div>
            </motion.div>

            {/* Wing 02 */}
            <motion.div 
               onClick={() => setActiveWing('Clinical & Dental')}
               className={`h-[350px] md:h-auto md:col-span-1 md:row-span-2 rounded-[2rem] ${isNight ? 'bg-[#f4ece3]/5 border-[#f4ece3]/20' : 'bg-[#2563EB]/5 border-[#2563EB]/20'} p-6 md:p-10 flex flex-col justify-between overflow-hidden group relative cursor-pointer`}
               whileHover={{ y: -5, transition: { duration: 0.3 } }}
               initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay: 0.2 }}
            >
               <div className={`absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555529733-0e670560f7e1?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-0 ${isNight ? 'group-hover:opacity-20 mix-blend-screen' : 'group-hover:opacity-10 mix-blend-multiply'} group-hover:scale-110 transition-all duration-[1.5s]`}></div>
               <div className={`absolute inset-0 bg-gradient-to-t ${isNight ? 'from-[#1c2226]' : 'from-[#fcfbfa]'} via-transparent to-transparent`}></div>

               <div className="relative z-10 flex justify-between items-start">
                  <span className={`font-mono text-[10px] uppercase tracking-[0.2em] md:tracking-widest ${isNight ? 'text-[#f4ece3] bg-[#f4ece3]/10 border-[#f4ece3]/20 group-hover:bg-[#f4ece3] group-hover:text-[#1c2226]' : 'text-[#2563EB] bg-[#2563EB]/10 border-[#2563EB]/20 group-hover:bg-[#2563EB] group-hover:text-white'} backdrop-blur-md px-4 py-1.5 rounded-full border transition-all`}>Wing 02</span>
               </div>
               
               <div className="relative z-10 md:mt-32">
                  <h3 className={`font-sans font-black uppercase text-3xl md:text-5xl tracking-tighter mb-2 ${textColor} drop-shadow-sm`}>Clinical<br/><span className={`${accentText} font-cormorant italic font-light lowercase`}>& Dental</span></h3>
                  <p className={`font-sans text-xs md:text-sm font-light ${mutedText} leading-relaxed`}>Trust-centric patient interfaces engineered for premium conversion.</p>
               </div>
            </motion.div>

            {/* Wing 03 */}
            <motion.div 
               onClick={() => setActiveWing('Tattoo Artists')}
               className={`h-[250px] md:h-auto md:col-span-1 md:row-span-1 rounded-[2rem] ${isNight ? 'bg-white/5 border-white/5 hover:border-white/20' : 'bg-black/[0.02] border-black/5 hover:border-black/10'} p-6 md:p-8 flex flex-col justify-between overflow-hidden group relative cursor-pointer transition-colors`}
               whileHover={{ y: -5, transition: { duration: 0.3 } }}
               initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay: 0.3 }}
            >
               <div className={`absolute inset-0 bg-[url('https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-0 group-hover:opacity-10 transition-opacity duration-700 grayscale ${isNight ? 'mix-blend-screen group-hover:opacity-30' : 'mix-blend-multiply'}`}></div>
               <div className="relative z-10 flex justify-between items-start">
                  <span className={`font-mono text-[10px] uppercase tracking-[0.2em] md:tracking-widest ${mutedText}`}>Wing 03</span>
               </div>
               <div className="relative z-10">
                  <h3 className={`font-cormorant italic text-3xl md:text-4xl mb-1 ${textColor}`}>Tattoo Artists</h3>
                  <p className={`font-sans text-xs font-light ${mutedText} tracking-wider uppercase`}>Dark-mode visual galleries</p>
               </div>
            </motion.div>

            {/* Wing 04 */}
            <motion.div 
               onClick={() => setActiveWing('Digital Creators')}
               className={`h-[250px] md:h-auto md:col-span-1 md:row-span-1 rounded-[2rem] ${isNight ? 'bg-white/5 border-white/5 hover:border-white/20' : 'bg-black/[0.02] border-black/5 hover:border-black/10'} p-6 md:p-8 flex flex-col justify-between overflow-hidden group relative cursor-pointer transition-colors`}
               whileHover={{ y: -5, transition: { duration: 0.3 } }}
               initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay: 0.4 }}
            >
               <div className={`absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-0 group-hover:opacity-10 transition-opacity duration-700 grayscale ${isNight ? 'mix-blend-screen group-hover:opacity-30' : 'mix-blend-multiply'}`}></div>
               <div className="relative z-10 flex justify-between items-start">
                  <span className={`font-mono text-[10px] uppercase tracking-[0.2em] md:tracking-widest ${mutedText}`}>Wing 04</span>
               </div>
               <div className="relative z-10">
                  <h3 className={`font-sans font-bold uppercase text-2xl md:text-3xl tracking-tighter mb-1 ${textColor}`}>Digital Creators</h3>
                  <p className={`font-sans text-[10px] md:text-xs font-light ${mutedText} tracking-wider uppercase`}>Personality-driven dynamic structures</p>
               </div>
            </motion.div>

            {/* Wing 05 */}
            <motion.div 
               onClick={() => setActiveWing('SaaS & Tech')}
               className={`h-[300px] md:h-auto md:col-span-2 md:row-span-1 rounded-[2rem] bg-gradient-to-r ${isNight ? 'from-white/[0.05] hover:from-white/10' : 'from-black/[0.03] hover:from-black/[0.05]'} to-transparent border ${borderColor} p-6 md:p-10 flex items-center justify-between overflow-hidden group relative cursor-pointer transition-colors`}
               whileHover={{ y: -5, transition: { duration: 0.3 } }}
               initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay: 0.5 }}
            >
               <div className="relative z-10 w-full md:w-auto">
                  <span className={`font-mono text-[10px] uppercase tracking-[0.2em] md:tracking-widest ${mutedText} block mb-4 group-hover:${textColor} transition-colors`}>Wing 05</span>
                  <h3 className={`font-sans font-black uppercase text-4xl md:text-6xl tracking-tighter mb-2 ${textColor} drop-shadow-sm`}>SaaS & Tech</h3>
                  <p className={`font-sans text-xs md:text-sm font-light ${mutedText} tracking-wider uppercase`}>Strictly architectural conversion systems.</p>
               </div>
               
               <div className="relative z-10 hidden md:block">
                  <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full border ${borderColor} flex items-center justify-center relative overflow-hidden group-hover:border-white/20 transition-colors ${isNight ? 'bg-white/10' : 'bg-white/50'} shadow-sm group-hover:shadow-md`}>
                     <div className={`absolute inset-0 ${isNight ? 'bg-white/20' : 'bg-black/5'} translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]`}></div>
                     <span className={`font-mono text-[10px] md:text-xs uppercase tracking-widest ${mutedText} relative z-10 group-hover:${textColor} transition-colors`}>Explore</span>
                  </div>
               </div>
            </motion.div>
         </div>
      </section>

      {/* 3. ENGINEERED METRICS (Moved to bottom and optimized for mobile) */}
      <section className="relative z-10 w-full px-4 md:px-12 lg:px-24 py-8 md:py-32">
         <motion.div 
           className={`w-full h-[1px] bg-gradient-to-r from-transparent ${isNight ? 'via-white/20' : 'via-black/10'} to-transparent mb-12 md:mb-24`}
           initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, ease: "easeInOut" }}
         />
         
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            <MetricCard title="Google Lighthouse" value="100" sub="/100" desc="Perfect score across performance, accessibility, SEO, and best practices." delay={0.1} isNight={isNight} />
            <MetricCard title="Average Load" value="0.8" sub="s" desc="Lightning-fast DOM rendering explicitly optimized for premium experiences." delay={0.2} isNight={isNight} />
            <MetricCard title="System Integrity" value="99.9" sub="%" desc="Bulletproof hosting pipelines securely distributed across global edge networks." delay={0.3} isNight={isNight} />
         </div>
      </section>

      <AnimatePresence>
        {activeWing && (
          <PortfolioModal activeWing={activeWing} onClose={() => setActiveWing(null)} isNight={isNight} />
        )}
      </AnimatePresence>

    </motion.main>
  );
}
