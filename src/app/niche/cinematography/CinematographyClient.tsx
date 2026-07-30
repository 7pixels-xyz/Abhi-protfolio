'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const frames = [
  { id: 1, title: 'NEON NIGHTS', aspect: 'aspect-[2.35/1]', img: 'https://images.unsplash.com/photo-1552083974-186346191183?auto=format&fit=crop&w=1600&q=80' },
  { id: 2, title: 'SILENT SYNTHESIS', aspect: 'aspect-[2.35/1]', img: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1600&q=80' },
  { id: 3, title: 'URBAN ECHOES', aspect: 'aspect-[2.35/1]', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80' },
];

export default function CinematographyClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);

  return (
    <motion.main 
      ref={containerRef} 
      className="relative w-full h-auto md:h-[300vh] bg-[#020202] text-white overflow-hidden md:overflow-visible"
      initial={{ opacity: 0, backgroundColor: '#000000' }}
      animate={{ opacity: 1, backgroundColor: '#020202' }}
      transition={{ duration: 1.2 }}
    >
      <div className="w-full md:sticky md:top-0 md:h-screen flex flex-col justify-center pt-32 pb-24 md:pt-0 md:pb-0">
        
        {/* Header */}
        <motion.div 
          className="md:absolute md:top-32 md:left-12 z-50 pointer-events-none mix-blend-difference px-6 md:px-0 mb-12 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          <p className="font-sans font-bold tracking-[0.4em] text-white/50 text-xs uppercase mb-2">
            Specialized Niche
          </p>
          <h1 className="text-4xl md:text-6xl flex items-center gap-[0.2em] leading-none">
            <span className="font-sans font-black tracking-tighter uppercase">Cinema</span>
            <span className="font-cormorant font-light italic tracking-widest lowercase">tography</span>
          </h1>
        </motion.div>

        {/* Film Strip Gallery */}
        <div className="w-full overflow-x-auto md:overflow-hidden snap-x snap-mandatory no-scrollbar pb-8 md:pb-0 relative z-40">
          <motion.div 
            className="flex items-center gap-6 md:gap-24 px-6 md:px-0 md:pl-[10vw] md:pr-[20vw] w-max max-md:!transform-none"
            style={{ x }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          >
            {frames.map((frame, index) => (
              <div key={frame.id} className="relative group w-[85vw] md:w-[70vw] max-w-[1200px] snap-center">
                
                <div 
                  className={`w-full overflow-hidden relative bg-black/20 aspect-[16/9] md:${frame.aspect}`}
                  data-cursor-text="Play Film"
                >
                  <motion.div 
                    className="absolute inset-[-15%] w-[130%] h-[130%] bg-cover bg-center origin-center max-md:!transform-none"
                  style={{ 
                    backgroundImage: `url(${frame.img})`,
                    x: useTransform(scrollYProgress, [0, 1], ["-15%", "15%"])
                  }}
                  transition={{ type: "tween", ease: "linear" }}
                />
                
                  {/* Cinematic Letterbox Lines (Top/Bottom) */}
                  <div className="absolute top-0 left-0 right-0 h-4 md:h-8 bg-black md:group-hover:h-0 transition-all duration-700 ease-out" />
                  <div className="absolute bottom-0 left-0 right-0 h-4 md:h-8 bg-black md:group-hover:h-0 transition-all duration-700 ease-out" />
                  
                </div>

                <div className="mt-4 md:mt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-1 md:gap-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700">
                  <h3 className="font-sans font-black text-lg md:text-2xl tracking-[0.2em] uppercase text-white/80">{frame.title}</h3>
                  <span className="font-sans font-bold text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/40">Red V-Raptor 8K</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Cinematic Grain Overlay */}
        <motion.div 
          className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-30" 
          style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png")' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2 }}
        />
      </div>
    </motion.main>
  );
}
