'use client';

import { useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import RepellingText from './RepellingText';
import ServiceCards from './ServiceCards';

function CinematicText({ text, isVisible, className = '' }: { text: React.ReactNode, isVisible: boolean, className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40, filter: 'blur(20px)', scale: 0.95 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : -40,
        filter: isVisible ? 'blur(0px)' : 'blur(20px)',
        scale: isVisible ? 1 : 1.05,
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {text}
    </motion.div>
  );
}

export default function HeroTextSequence() {
  const { scrollY } = useScroll();
  const [activeStep, setActiveStep] = useState(0);
  const [showImage, setShowImage] = useState(false);
  const [imageLanded, setImageLanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [vh, setVh] = useState(1000); // Default to a reasonable value for SSR

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setVh(window.innerHeight);
    };
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Delay the image reveal so the text fades in first
    if (activeStep === 0) {
      const timer = setTimeout(() => setShowImage(true), 1200);
      return () => clearTimeout(timer);
    } else {
      setShowImage(false);
      setImageLanded(false);
    }
  }, [activeStep]);

  useEffect(() => {
    const handleScroll = (y: number) => {
      // 0 to 0.5 vh
      if (y < vh * 0.5) {
        setActiveStep(0);
      } 
      // 0.5 to 1.5 vh
      else if (y >= vh * 0.5 && y < vh * 1.5) {
        setActiveStep(1);
      } 
      // past 1.5 vh
      else {
        setActiveStep(2);
      }
    };

    const unsubscribe = scrollY.on('change', handleScroll);
    return () => unsubscribe();
  }, [scrollY, vh]);

  const stepVariants = {
    centered: {
      top: "50%",
      left: "50%",
      x: "-50%",
      y: "-50%",
      scale: 1,
    },
    topLeft: {
      top: isMobile ? "18%" : "8%",
      left: isMobile ? "5%" : "4%",
      x: "0%",
      y: "0%",
      scale: isMobile ? 0.6 : 0.3, // Larger on mobile
    }
  };

  // The parent container is 250vh. 
  // By 1.5vh scrolled, the parent is almost ending. 
  // We want to slide it up starting at 1.8vh to clear the screen for Manifesto.
  // We'll use a state-based transform to avoid React render issues with useTransform directly inside render if vh changes.
  const [globalYRange, setGlobalYRange] = useState({ input: [1800, 2600], output: [0, -1200] });
  useEffect(() => {
    setGlobalYRange({
      input: [vh * 1.8, vh * 2.5],
      output: [0, -vh * 1.5]
    });
  }, [vh]);

  const globalY = useTransform(scrollY, globalYRange.input, globalYRange.output);

  return (
    <motion.div 
      className="fixed inset-0 pointer-events-none flex items-center justify-center z-40"
      style={{ y: globalY }}
    >
      <div className="relative w-full max-w-7xl h-full px-4 text-center">
        {/* Step 0: "This is Abhi" and the bouncing portrait */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {isMobile ? (
            <div className="relative flex flex-col items-center justify-center w-full mx-auto pointer-events-none gap-4">
              <motion.div 
                className="text-6xl font-bold font-sans text-white tracking-tight luxury-text-shadow drop-shadow-2xl z-50 pointer-events-auto"
                initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                animate={{ opacity: activeStep === 0 ? 1 : 0, y: activeStep === 0 ? 0 : -30, filter: activeStep === 0 ? 'blur(0px)' : 'blur(10px)', pointerEvents: activeStep === 0 ? 'auto' : 'none' }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                This is
              </motion.div>
              <motion.div 
                className="relative flex items-center justify-center w-max mx-auto pointer-events-none"
                initial={{ x: 0 }}
                animate={{ x: 0 }} 
              >
                <motion.div className="flex-shrink-0 z-50 pointer-events-auto">
                  <RepellingText 
                    text="Abhi" 
                    isVisible={activeStep === 0}
                    highlightWord="Abhi"
                    isPushed={showImage}
                    isMobile={isMobile}
                    className="text-8xl font-playfair font-bold text-white tracking-normal luxury-text-shadow drop-shadow-2xl whitespace-nowrap"
                  />
                </motion.div>

                <AnimatePresence>
                  {showImage && activeStep === 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: '40vw', rotate: 90 }}
                      animate={{ opacity: 1, x: showImage ? '-5vw' : 0, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }} 
                      onAnimationComplete={() => setImageLanded(true)} 

                      className="absolute top-1/2 -translate-y-1/2 -right-[10px] w-[90px] h-[90px] rounded-full overflow-hidden border-[4px] border-white/90 shadow-[0_30px_60px_rgba(0,0,0,0.4)] flex-shrink-0 pointer-events-auto cursor-none z-40"
                      data-cursor-type="drag"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      drag
                      dragConstraints={{ left: -30, right: 30, top: -30, bottom: 30 }}
                      dragElastic={0.4}
                    >
                      <img src="/abhi.jpg" alt="Abhi" className="w-full h-full object-cover pointer-events-none" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          ) : (
            <motion.div 
              className="relative flex items-center justify-center w-max mx-auto pointer-events-none"
              initial={{ x: 0 }}
              animate={{ x: 0 }} // We no longer shift the whole block; we compress it internally
            >
              
              <motion.div className="flex-shrink-0 z-50 pointer-events-auto">
                <RepellingText 
                  text="This is Abhi" 
                  isVisible={activeStep === 0}
                  highlightWord="Abhi"
                  isPushed={showImage}
                  isMobile={isMobile}
                  className="text-6xl sm:text-7xl md:text-8xl lg:text-[9vw] font-playfair font-bold md:font-medium text-white tracking-tight luxury-text-shadow drop-shadow-2xl whitespace-nowrap"
                />
              </motion.div>

              <AnimatePresence>
                {showImage && activeStep === 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: '40vw', rotate: 90 }}
                    animate={{ 
                      opacity: 1, 
                      x: showImage ? '-6vw' : 0, 
                      rotate: 0 
                    }}
                    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }} // Changed to spring so it bounces when it hits and pushes
                    onAnimationComplete={() => setImageLanded(true)} // Triggers the compression push

                    className="absolute top-1/2 -translate-y-1/2 -right-[120px] md:-right-[220px] w-[80px] h-[80px] md:w-[180px] md:h-[180px] rounded-full overflow-hidden border-[4px] border-white/90 shadow-[0_30px_60px_rgba(0,0,0,0.4)] flex-shrink-0 pointer-events-auto cursor-none z-40"
                    data-cursor-type="drag"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    drag
                    dragConstraints={{ left: -30, right: 30, top: -30, bottom: 30 }}
                    dragElastic={0.4}
                  >
                    <img src="/abhi.jpg" alt="Abhi" className="w-full h-full object-cover pointer-events-none" />
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          )}
        </div>
        
        {/* Jack of all trades text (Step 1 & 2) */}
        <motion.div 
          className="absolute z-50 pointer-events-none"
          variants={stepVariants}
          animate={activeStep >= 2 ? "topLeft" : "centered"}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} // Smooth, triggered keyframe animation
          style={{ transformOrigin: "top left" }}
        >
          <CinematicText 
            isVisible={activeStep === 1 || activeStep === 2}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-[8vw] leading-tight text-white luxury-text-shadow drop-shadow-2xl whitespace-nowrap flex items-center gap-[0.2em]"
            text={
              <>
                <span className="font-sans font-bold tracking-tighter uppercase text-white">JACK OF ALL</span>
                <span className="font-cormorant font-light italic tracking-wide lowercase text-[#FFD700]">trades</span>
              </>
            }
          />
        </motion.div>

        {/* Interactive Accordion Cards (Step 2) */}
        <div className="pointer-events-none absolute inset-0">
          <ServiceCards isVisible={activeStep >= 2} />
        </div>
      </div>
    </motion.div>
  );
}
