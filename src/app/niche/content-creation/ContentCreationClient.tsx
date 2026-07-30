'use client';

import { motion } from 'framer-motion';

const reels = [
  { id: 1, title: 'Viral Hook 01', metrics: '1.2M Views' },
  { id: 2, title: 'Brand Story', metrics: '850K Views' },
  { id: 3, title: 'Product Teaser', metrics: '2.4M Views' },
  { id: 4, title: 'Lifestyle Vlog', metrics: '500K Views' },
];

export default function ContentCreationClient() {
  return (
    <motion.main 
      className="relative min-h-screen bg-[#ff4a3d] text-white overflow-hidden flex items-center justify-center"
      initial={{ opacity: 0, backgroundColor: '#ffffff' }}
      animate={{ opacity: 1, backgroundColor: '#ff4a3d' }}
      transition={{ duration: 0.8 }}
    >
      
      {/* Dynamic Background */}
      <motion.div 
        className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,_#ffffff_0%,_transparent_60%)]" 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      <div className="relative z-10 w-full max-w-7xl px-8 flex flex-col lg:flex-row items-center justify-between gap-16">
        
        {/* Text Side */}
        <motion.div 
          className="flex-1 text-left"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          <p className="font-sans font-bold tracking-[0.4em] text-white/70 text-xs uppercase mb-6">
            Specialized Niche
          </p>
          <h1 className="text-6xl md:text-8xl flex flex-col gap-2 leading-[0.9]">
            <span className="font-sans font-black tracking-tighter uppercase drop-shadow-xl">Content</span>
            <span className="font-cormorant font-light italic tracking-widest lowercase">creation</span>
          </h1>
          <p className="font-sans text-base md:text-lg font-medium max-w-md mt-8 opacity-90 leading-relaxed">
            High-retention, algorithm-hacking short form content. Stopping the scroll with visual hooks and fast-paced storytelling.
          </p>
          
          <div className="mt-12 flex gap-4">
            {['TikTok', 'Reels', 'Shorts'].map((platform, i) => (
              <motion.div 
                key={platform}
                className="px-6 py-3 rounded-full border border-white/30 backdrop-blur-sm font-sans text-xs font-bold tracking-widest uppercase"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + (i * 0.1) }}
              >
                {platform}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 3D Carousel / Stack Side */}
        <motion.div 
          className="flex-1 relative h-[600px] w-full flex items-center justify-center perspective-[1000px]"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        >
          {reels.map((reel, index) => (
            <motion.div
              key={reel.id}
              className="absolute w-[280px] h-[500px] bg-black rounded-3xl premium-glass border border-white/20 shadow-2xl flex flex-col justify-end p-6 overflow-hidden cursor-pointer"
              style={{
                zIndex: reels.length - index,
              }}
              initial={{ rotateY: 90, x: index * 60 + 100, scale: 0.5, opacity: 0 }}
              animate={{ rotateY: 15, x: index * 60, scale: 1 - index * 0.05, opacity: 1 - index * 0.2 }}
              whileHover={{ rotateY: 0, scale: 1.05, zIndex: 100, x: index * 60 - 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.8 + (index * 0.1) }}
              data-cursor-text="Play"
            >
              {/* Fake Video Background */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
              <div className="absolute inset-0 bg-white/5" />
              
              <div className="relative z-20">
                <h3 className="font-sans font-black text-2xl tracking-tighter uppercase">{reel.title}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                  <span className="font-sans font-bold text-[10px] tracking-widest uppercase opacity-80">{reel.metrics}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </motion.main>
  );
}
