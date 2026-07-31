'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';

const projects = [
  { id: 1, title: 'NEON NIGHTS', role: 'DIR. OF PHOTOGRAPHY', year: '2025', img: 'https://images.unsplash.com/photo-1552083974-186346191183?auto=format&fit=crop&w=2000&q=80' },
  { id: 2, title: 'SILENT SYNTHESIS', role: 'CINEMATOGRAPHER', year: '2024', img: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=2000&q=80' },
  { id: 3, title: 'URBAN ECHOES', role: 'CAMERA OPERATOR', year: '2024', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=2000&q=80' },
  { id: 4, title: 'ETHEREAL DREAMS', role: 'DIR. OF PHOTOGRAPHY', year: '2023', img: 'https://images.unsplash.com/photo-1518131672697-613becd4fab5?auto=format&fit=crop&w=2000&q=80' },
];

export default function CinematographyClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Hero Parallax
  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <main 
      ref={containerRef} 
      className="relative w-full min-h-screen bg-[#050505] text-white selection:bg-[#C10016] selection:text-white"
    >
      {/* Global Film Grain Overlay */}
      <div 
        className="pointer-events-none fixed inset-0 z-50 opacity-[0.15] mix-blend-overlay"
        style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png")' }}
      />

      {/* 1. IMMERSIVE HERO SECTION */}
      <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Background Image with slow zoom */}
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=2000&q=80")' }}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
          />
          {/* Vignette & Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/40 to-[#050505] opacity-80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] opacity-80" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <span className="font-sans font-bold text-[10px] md:text-xs tracking-[0.5em] text-[#C10016] uppercase mb-6 md:mb-10 text-center">
              Director of Photography
            </span>
            <h1 className="flex flex-col items-center leading-[0.85] md:leading-[0.8] text-center mix-blend-difference">
              <span className="font-instrument italic font-light text-[15vw] md:text-[10vw] tracking-tight drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                Cinematic
              </span>
              <span className="font-sans font-black text-[12vw] md:text-[8vw] tracking-tighter uppercase ml-0 md:ml-[15vw]">
                Storytelling
              </span>
            </h1>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          style={{ opacity: heroOpacity }}
        >
          <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-white/50">Scroll to Explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </section>

      {/* 2. THE SHOWREEL SCREEN */}
      <section className="relative w-full py-24 md:py-40 bg-[#050505]">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-6"
          >
            <div>
              <span className="font-sans font-bold text-[#C10016] text-[10px] tracking-[0.3em] uppercase mb-4 block">Showreel 2025</span>
              <h2 className="font-instrument italic text-4xl md:text-6xl text-white">Visual Anthology.</h2>
            </div>
            <p className="font-sans text-xs md:text-sm text-white/50 tracking-wider max-w-sm leading-relaxed">
              A curated collection of moments, captured through light, shadow, and motion.
            </p>
          </motion.div>

          {/* Cinematic Letterbox Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full aspect-[4/3] md:aspect-[21/9] bg-[#0A0A0A] overflow-hidden group cursor-pointer shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5"
          >
            <div className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[2s] ease-[0.16,1,0.3,1] grayscale-[50%] group-hover:grayscale-0"
                 style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1578022761797-b8636ac1773c?auto=format&fit=crop&w=2000&q=80")' }} />
            
            {/* Letterbox Top */}
            <div className="absolute top-0 left-0 w-full h-[10%] md:h-[15%] bg-[#050505] transform origin-top group-hover:scale-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1] z-20" />
            
            {/* Letterbox Bottom */}
            <div className="absolute bottom-0 left-0 w-full h-[10%] md:h-[15%] bg-[#050505] transform origin-bottom group-hover:scale-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1] z-20" />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border border-white/20 backdrop-blur-md bg-black/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-white group-hover:border-white transition-all duration-500 ease-out">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white group-hover:text-black ml-2 md:w-8 md:h-8 transition-colors duration-500"><path d="M8 5v14l11-7z"/></svg>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. SELECTED WORKS (INTERACTIVE LIST) */}
      <section className="relative w-full py-24 md:py-40 bg-[#050505] min-h-[120vh] flex flex-col justify-center overflow-hidden">
        
        {/* Dynamic Background Images */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <AnimatePresence>
            {hoveredProject !== null && (
              <motion.div
                key={hoveredProject}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 0.4, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${projects.find(p => p.id === hoveredProject)?.img})` }}
              />
            )}
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-[#050505]" />
        </div>

        <div className="max-w-[100rem] mx-auto px-6 md:px-12 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="mb-16 md:mb-24"
          >
            <span className="font-sans font-bold text-[#C10016] text-[10px] tracking-[0.3em] uppercase block">Selected Works</span>
          </motion.div>

          <div className="flex flex-col w-full border-t border-white/10">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: project.id * 0.1 }}
                className="group relative flex flex-col md:flex-row items-start md:items-center justify-between py-10 md:py-16 border-b border-white/10 cursor-pointer"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Hover line indicator */}
                <div className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#C10016] group-hover:w-full transition-all duration-700 ease-[0.16,1,0.3,1]" />
                
                <div className="flex flex-col gap-2">
                  <h3 className="font-sans font-black text-3xl md:text-5xl lg:text-7xl tracking-tighter uppercase text-white/50 group-hover:text-white transition-colors duration-500 mix-blend-difference">
                    {project.title}
                  </h3>
                  <span className="font-cormorant italic text-lg md:text-2xl text-white/30 group-hover:text-[#C10016] transition-colors duration-500">
                    {project.role}
                  </span>
                </div>

                <div className="mt-4 md:mt-0 flex items-center gap-6">
                  <span className="font-sans font-bold text-xs tracking-widest text-white/20 group-hover:text-white/80 transition-colors duration-500">
                    {project.year}
                  </span>
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/30 group-hover:text-black group-hover:bg-white group-hover:border-white transition-all duration-500 -rotate-45 group-hover:rotate-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE DIRECTOR's VISION & GEAR */}
      <section className="relative w-full py-24 md:py-40 bg-[#020202] border-t border-white/5">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-32 items-center">
            
            {/* Left: Quote */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="#C10016" className="mb-8 opacity-50"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
              <h3 className="font-cormorant italic text-3xl md:text-5xl leading-tight text-white/90 mb-8">
                "It’s not just about capturing light. It’s about manipulating shadows to reveal the truth within the frame."
              </h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-[#C10016]" />
                <span className="font-sans font-bold text-[10px] tracking-widest uppercase text-white/60">The Philosophy</span>
              </div>
            </motion.div>

            {/* Right: Gear & Expertise */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="flex flex-col gap-12 border-l border-white/5 pl-0 md:pl-16 mt-8 md:mt-0"
            >
              <div>
                <span className="font-sans font-bold text-[#C10016] text-[10px] tracking-[0.3em] uppercase mb-8 block">Arsenal & Expertise</span>
                <div className="grid grid-cols-2 gap-y-10 gap-x-6">
                  {[
                    { title: "CAMERAS", items: ["ARRI Alexa Mini LF", "RED V-Raptor 8K", "Sony FX9"] },
                    { title: "LENSES", items: ["Atlas Orion Anamorphic", "Cooke S4/i Primes", "Zeiss Supreme"] },
                    { title: "LIGHTING", items: ["Aputure Ecosystem", "ARRI SkyPanels", "Astera Tubes"] },
                    { title: "POST", items: ["DaVinci Resolve Studio", "FilmConvert", "Dehancer Pro"] }
                  ].map((cat) => (
                    <div key={cat.title} className="flex flex-col gap-3">
                      <span className="font-sans font-black text-xs tracking-widest text-white/40">{cat.title}</span>
                      <ul className="flex flex-col gap-2">
                        {cat.items.map(item => (
                          <li key={item} className="font-sans text-[11px] md:text-xs text-white/80 tracking-wider flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-[#C10016]/50" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="w-full py-32 bg-[#050505] border-t border-white/10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center justify-center gap-8"
        >
          <h2 className="font-instrument italic text-5xl md:text-7xl text-white">Let's shoot something.</h2>
          <a href="/contact" className="mt-4 px-8 py-4 bg-white text-black font-sans font-black text-xs tracking-widest uppercase rounded-full hover:bg-[#C10016] hover:text-white transition-colors duration-300">
            Book Availability
          </a>
        </motion.div>
      </footer>
    </main>
  );
}
