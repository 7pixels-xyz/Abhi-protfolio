'use client';

import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function LightbulbToggle() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const y = useMotionValue(0);
  const [showToast, setShowToast] = useState(false);
  
  const isVideoPage = pathname === '/niche/video-editing';
  const isNight = isVideoPage ? true : theme === 'night';
  
  // When pulled down sufficiently, the string glows slightly
  const stringColor = useTransform(y, [0, 80], ['#555555', '#FFD700']);
  
  const handleAttemptToggle = () => {
    if (isVideoPage) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } else {
      toggleTheme();
    }
  };

  const handleDragEnd = (event: any, info: any) => {
    // If pulled down more than 40px, toggle theme
    if (info.offset.y > 40) {
      handleAttemptToggle();
    }
  };

  return (
    <div className="fixed top-0 right-4 md:right-12 z-[100] flex flex-col items-center origin-top-right scale-75 md:scale-100 pb-20">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute top-24 right-full mr-2 md:mr-6 whitespace-nowrap bg-black/80 backdrop-blur-md text-white/90 text-[10px] md:text-xs font-mono tracking-widest px-4 py-2 rounded-full border border-white/10 pointer-events-none"
          >
            There is no switch on this page.
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Wire connecting to ceiling */}
      <motion.div 
         className="w-1 bg-[#222] shadow-[inset_1px_0_2px_rgba(255,255,255,0.2)] origin-top" 
         style={{ height: 80, scaleY: useTransform(y, [0, 80], [1, 2.5]) }}
      />

      {/* The Bulb (Clickable and Draggable) */}
      <motion.div 
        className="relative cursor-grab active:cursor-grabbing origin-top z-30 flex flex-col items-center"
        onClick={handleAttemptToggle}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.6}
        onDragEnd={handleDragEnd}
        style={{ y }}
        whileHover={{ scale: 1.05 }}
      >
        {/* Bulb Base / Screw */}
        <div className="w-6 h-8 bg-gradient-to-b from-[#444] to-[#222] rounded-t-sm rounded-b-xl mx-auto z-20 relative shadow-[0_5px_10px_rgba(0,0,0,0.5)] border-b-4 border-[#111] flex flex-col justify-evenly">
           <div className="w-full h-[1px] bg-white/20" />
           <div className="w-full h-[1px] bg-white/20" />
           <div className="w-full h-[1px] bg-white/20" />
        </div>
        
        {/* The Glass Bulb */}
        <motion.div 
          className="w-14 h-14 rounded-full relative -mt-3 z-10 flex items-center justify-center border-[1.5px] backdrop-blur-[2px]"
          animate={{
            backgroundColor: isNight ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 245, 200, 0.95)',
            borderColor: isNight ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.9)',
            boxShadow: isNight 
              ? '0 0 15px rgba(255,255,255,0.0), inset 0 0 10px rgba(255,255,255,0.05)' 
              : '0 0 60px rgba(255,220,100,0.8), inset 0 0 30px rgba(255,255,255,0.8)',
          }}
          transition={{ duration: 0.3 }}
        >
           {/* Filament */}
           <motion.div 
             className="w-3 h-5 border-[1.5px] border-t-0 rounded-b-full"
             animate={{
               borderColor: isNight ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,1)',
               boxShadow: isNight ? 'none' : '0 0 10px rgba(255,255,255,0.8)'
             }}
           />
           {/* Glare/Reflection */}
           <div className="absolute top-2 right-2 w-3 h-5 bg-white/40 rounded-full blur-[1px] transform rotate-45" />
        </motion.div>
      </motion.div>
    </div>
  );
}
