'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const projects = [
  {
    id: 1,
    first: 'NEON',
    second: 'nights',
    role: 'Cinematographer',
    description: 'A deep dive into the cyberpunk aesthetics of modern Tokyo.',
  },
  {
    id: 2,
    first: 'URBAN',
    second: 'echoes',
    role: 'Lead Web Designer',
    description: 'Minimalist brutalism meets high-end fashion e-commerce.',
  },
  {
    id: 3,
    first: 'SILENT',
    second: 'synthesis',
    role: 'Director of Photography',
    description: 'An experimental short film exploring the sound of silence.',
  },
  {
    id: 4,
    first: 'MIDNIGHT',
    second: 'mirage',
    role: 'VFX Supervisor',
    description: 'Pushing the boundaries of real-time rendering and composites.',
  }
];

export default function Archive() {
  const [activeProject, setActiveProject] = useState<number>(1);

  return (
    <section className="relative z-30 w-full h-screen bg-[#020617] overflow-hidden flex">
      
      {/* 
        HUD Overlay 
        Stays on top of everything
      */}
      <div className="absolute top-12 left-12 z-50 pointer-events-none mix-blend-difference text-white">
        <h3 className="font-sans font-bold tracking-[0.5em] uppercase text-xs opacity-70">
          ACT III // THE ARCHIVE
        </h3>
      </div>

      {/* Accordion Container */}
      <div className="flex w-full h-full">
        {projects.map((project) => {
          const isActive = activeProject === project.id;
          
          return (
            <motion.div
              key={project.id}
              className="relative h-full cursor-pointer overflow-hidden border-r border-white/10 last:border-none"
              animate={{
                width: isActive ? '70%' : '10%',
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setActiveProject(project.id)}
            >
              
              {/* Blank Background Placeholder (Instead of Image) */}
              <motion.div 
                className="absolute inset-0 origin-center bg-white/5 premium-glass"
                animate={{
                  scale: isActive ? 1 : 1.2,
                  opacity: isActive ? 1 : 0.3,
                }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Gradient Overlay for Text Readability */}
              <div 
                className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0'}`} 
              />
              <div 
                className={`absolute inset-0 bg-black/60 transition-opacity duration-700 ${isActive ? 'opacity-0' : 'opacity-100'}`} 
              />

              {/* Vertical Title (Visible when collapsed) */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center mix-blend-overlay"
                animate={{ opacity: isActive ? 0 : 1 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-white text-4xl md:text-6xl font-sans font-black tracking-tighter uppercase -rotate-90 whitespace-nowrap">
                  {project.first}
                </h3>
              </motion.div>

              {/* Expanded Content */}
              <AnimatePresence>
                {isActive && (
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row md:items-end justify-between gap-8"
                  >
                    
                    {/* Typography */}
                    <div className="flex flex-col">
                      <p className="font-sans font-semibold text-[#f4e6b7] tracking-[0.3em] uppercase text-xs mb-4">
                        {project.role}
                      </p>
                      <h2 className="text-5xl md:text-8xl text-white flex items-center gap-[0.2em] leading-none drop-shadow-2xl">
                        <span className="font-sans font-black tracking-tighter uppercase">{project.first}</span>
                        <span className="font-cormorant font-light italic tracking-widest lowercase">{project.second}</span>
                      </h2>
                    </div>

                    {/* Description & Button */}
                    <div className="flex flex-col items-start md:items-end md:text-right max-w-sm">
                      <p className="font-sans text-white/80 text-sm md:text-base leading-relaxed font-medium mb-6">
                        {project.description}
                      </p>
                      
                      {/* Interactive Premium Button */}
                      <button className="group relative px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                        <span className="relative z-10 font-sans font-bold text-xs tracking-[0.2em] uppercase text-white group-hover:text-black transition-colors duration-500">
                          View Case Study
                        </span>
                      </button>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          );
        })}
      </div>

    </section>
  );
}
