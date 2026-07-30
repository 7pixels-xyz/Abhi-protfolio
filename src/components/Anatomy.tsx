'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const phases = [
  {
    id: '01',
    first: 'THE',
    second: 'discovery',
    description: 'We begin by completely immersing ourselves in your brand. Understanding the core identity, the audience, and the unspoken goals that drive the project forward.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: '02',
    first: 'THE',
    second: 'strategy',
    description: 'Data meets intuition. We architect a bespoke blueprint designed to not just look beautiful, but to dominate the digital landscape and convert at the highest level.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: '03',
    first: 'THE',
    second: 'execution',
    description: 'Where the magic happens. Pixels are pushed, code is sculpted, and light is captured. A relentless pursuit of perfection down to the very last frame.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: '04',
    first: 'THE',
    second: 'delivery',
    description: 'Deployment to the world. We ensure a flawless launch, optimizing every asset for maximum performance, impact, and longevity.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80',
  }
];

export default function Anatomy() {
  const [hoveredPhase, setHoveredPhase] = useState<string | null>(null);

  return (
    <section className="relative z-40 w-full min-h-screen bg-[#0a0a0a] text-white py-32 px-4 md:px-12">
      
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-20 text-center flex flex-col items-center">
        <p className="font-sans font-bold tracking-[0.4em] uppercase text-xs text-white/50 mb-4">
          Anatomy of a Project
        </p>
        <h2 className="text-4xl md:text-6xl flex items-center justify-center gap-[0.2em]">
          <span className="font-sans font-black tracking-tighter uppercase">OUR</span>
          <span className="font-cormorant font-light italic tracking-widest lowercase">process</span>
        </h2>
      </div>

      {/* Accordion Container */}
      <div className="max-w-7xl mx-auto flex flex-col w-full border-t border-white/10">
        {phases.map((phase) => {
          const isHovered = hoveredPhase === phase.id;

          return (
            <div 
              key={phase.id}
              className="relative w-full border-b border-white/10 group cursor-pointer"
              onMouseEnter={() => setHoveredPhase(phase.id)}
              onMouseLeave={() => setHoveredPhase(null)}
            >
              {/* The Header Strip */}
              <div className="w-full flex flex-col md:flex-row md:items-center justify-between py-8 md:py-12 px-4 transition-colors duration-500 group-hover:bg-white/5">
                
                {/* Number & Title */}
                <div className="flex items-center gap-8 md:gap-16">
                  <span className="font-sans font-black text-xl md:text-2xl tracking-tighter text-white/20 group-hover:text-[#f4e6b7] transition-colors duration-500">
                    {phase.id}
                  </span>
                  
                  <h3 className="text-3xl md:text-5xl flex items-center gap-[0.2em] transform origin-left transition-transform duration-500 group-hover:scale-105 group-hover:translate-x-4">
                    <span className="font-sans font-black tracking-tighter uppercase">{phase.first}</span>
                    <span className="font-cormorant font-light italic tracking-wide lowercase text-white/70 group-hover:text-white transition-colors duration-500">{phase.second}</span>
                  </h3>
                </div>

                {/* Arrow Icon */}
                <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-white/10 group-hover:border-[#f4e6b7] group-hover:bg-[#f4e6b7] transition-all duration-500">
                  <svg 
                    className="w-5 h-5 text-white/50 group-hover:text-[#0a0a0a] transform transition-transform duration-500 group-hover:rotate-45" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>

              {/* Expandable Content Body */}
              <motion.div 
                initial={false}
                animate={{ 
                  height: isHovered ? 'auto' : 0, 
                  opacity: isHovered ? 1 : 0 
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="w-full px-4 pb-12 pt-4 flex flex-col lg:flex-row gap-8 lg:gap-16 items-start lg:items-center justify-between">
                  
                  {/* Detailed Description */}
                  <div className="w-full lg:w-1/2">
                    <p className="font-sans text-sm md:text-base leading-relaxed text-white/60 font-medium tracking-wide max-w-lg">
                      {phase.description}
                    </p>
                    <button className="mt-8 font-sans font-bold text-[10px] tracking-[0.3em] uppercase text-[#f4e6b7] hover:text-white transition-colors duration-300 flex items-center gap-2">
                      Explore Phase <span className="text-lg leading-none">&rarr;</span>
                    </button>
                  </div>

                  {/* Cinematic Image Reveal */}
                  <div className="w-full lg:w-1/2 h-[300px] overflow-hidden rounded-xl">
                    <motion.div 
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${phase.image})` }}
                      animate={{ scale: isHovered ? 1 : 1.1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>

                </div>
              </motion.div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
