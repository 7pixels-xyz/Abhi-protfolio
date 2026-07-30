'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function CloudTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll specifically for the transition space
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Clouds start below the screen (y: 100vh) and fly up to the center/top, scaling massively to cover the screen in white.
  const cloud1Y = useTransform(scrollYProgress, [0.2, 0.8], ['100vh', '-50vh']);
  const cloud1Scale = useTransform(scrollYProgress, [0.2, 0.8], [1, 5]);
  const cloud1Opacity = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);

  const cloud2Y = useTransform(scrollYProgress, [0.3, 0.9], ['100vh', '-30vh']);
  const cloud2Scale = useTransform(scrollYProgress, [0.3, 0.9], [1, 6]);
  
  const bgOpacity = useTransform(scrollYProgress, [0.5, 0.8], [0, 1]);

  return (
    <section ref={containerRef} className="relative w-full h-[150vh] flex items-center justify-center pointer-events-none z-40 overflow-hidden">
      
      {/* Massive blurry white overlay that fades in as clouds cover the screen */}
      <motion.div 
        className="absolute inset-0 bg-white/90 backdrop-blur-md"
        style={{ opacity: bgOpacity }}
      />

      {/* Cloud 1 */}
      <motion.div 
        className="absolute w-[800px] h-[500px] bg-white rounded-[50%] blur-[40px] opacity-90"
        style={{ y: cloud1Y, scale: cloud1Scale, opacity: cloud1Opacity }}
      />

      {/* Cloud 2 (Larger, slightly offset) */}
      <motion.div 
        className="absolute left-1/4 w-[1000px] h-[600px] bg-white rounded-[50%] blur-[60px] opacity-80"
        style={{ y: cloud2Y, scale: cloud2Scale, opacity: cloud1Opacity }}
      />
      
      {/* Cloud 3 (Right side) */}
      <motion.div 
        className="absolute right-1/4 w-[900px] h-[700px] bg-sky-50 rounded-[50%] blur-[50px] opacity-90"
        style={{ y: cloud1Y, scale: cloud2Scale, opacity: cloud1Opacity }}
      />

    </section>
  );
}
