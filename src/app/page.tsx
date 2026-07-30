'use client';

import CloudBackground from '@/components/CloudBackground';
import HeroTags from '@/components/HeroTags';
import HeroTextSequence from '@/components/HeroTextSequence';
import AboutMeSection from '@/components/AboutMeSection';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Home() {
  const { scrollY } = useScroll();
  
  // Image scroll vanish effect
  const imageOpacity = useTransform(scrollY, [400, 800], [1, 0]);
  const imageBlur = useTransform(scrollY, [400, 800], ['blur(0px)', 'blur(30px)']);
  const imageScale = useTransform(scrollY, [400, 800], [1, 1.05]);

  return (
    <main className="relative w-full min-h-screen bg-[var(--bg-sky)]">
      {/* Z-0: Moving Clouds Background */}
      <CloudBackground />

      {/* Hero Section Container (Increased height so it stays on screen for 2-3 scrolls) */}
      <div className="relative w-full h-[250vh]">
        
        {/* Z-10: Scroll Text Sequence */}
        <HeroTextSequence />

        {/* Z-20: User Image */}
        <motion.div 
          className="fixed bottom-0 right-0 z-20 pointer-events-none origin-bottom-right"
          style={{
            opacity: imageOpacity,
            filter: imageBlur,
            scale: imageScale,
            width: '45vw',
            maxWidth: '600px',
            minWidth: '350px',
            height: '85vh',
          }}
        >
          {/* User cutout image */}
          <div 
            className="w-full h-full bg-contain bg-no-repeat bg-bottom drop-shadow-2xl"
            style={{ 
              backgroundImage: `url('/cutout.png')`,
            }}
          />
        </motion.div>

        {/* Z-30: Floating Draggable Tags */}
        <div className="absolute top-0 left-0 w-full h-[100vh]">
          <HeroTags />
        </div>
      </div>

      <AboutMeSection />

    </main>
  );
}
