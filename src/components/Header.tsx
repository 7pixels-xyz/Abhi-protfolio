'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { usePathname } from 'next/navigation';

const mainLinks = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'niche', label: 'Portfolio', href: '#' },
  { id: 'contact', label: 'Contact', href: '/contact' },
];

const nicheLinks = [
  { id: 'video', first: 'VIDEO', second: 'editing', href: '/niche/video-editing' },
  { id: 'web', first: 'WEB', second: 'designing', href: '/niche/web-designing' },
  { id: 'cinema', first: 'CINEMA', second: 'tography', href: '/niche/cinematography' },
  { id: 'content', first: 'CONTENT', second: 'creation', href: '/niche/content-creation' }
];

export default function Header() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isNicheOpen, setIsNicheOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const pathname = usePathname();
  
  const isVideoPage = pathname === '/niche/video-editing';
  const isNight = isVideoPage ? true : theme === 'night';

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsNicheOpen(false);
      }
    };

    if (isNicheOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isNicheOpen]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleLinkClick = (index: number, id: string, e: React.MouseEvent) => {
    setActiveIndex(index);
    if (id === 'niche') {
      e.preventDefault(); // Prevent jump to top
      setIsNicheOpen(!isNicheOpen);
    } else {
      setIsNicheOpen(false);
    }
  };

  const handleMouseEnterContainer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleMouseLeaveContainer = () => {
    if (isNicheOpen) {
      timeoutRef.current = setTimeout(() => {
        setIsNicheOpen(false);
      }, 2000);
    }
  };

  return (
    <motion.header 
      ref={headerRef}
      className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center pointer-events-auto"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 1 }}
      onMouseEnter={handleMouseEnterContainer}
      onMouseLeave={handleMouseLeaveContainer}
    >
      
      {/* 
        The Liquid Glass Cylinder
      */}
      <div className={`relative flex items-center gap-2 p-2 rounded-full premium-glass ${isNight ? 'bg-white/5 border-white/20' : 'bg-black/5 border-black/20'} shadow-[0_30px_60px_rgba(0,0,0,0.3)] backdrop-blur-2xl transition-colors duration-1000`}>
        
        {mainLinks.map((link, index) => {
          const isHovered = hoveredIndex === index;
          const isActive = activeIndex === index;

          const innerContent = (
            <div
              className="relative px-4 py-2 md:px-6 md:py-3 cursor-pointer rounded-full overflow-hidden block"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={(e) => handleLinkClick(index, link.id, e)}
            >
              {/* Liquid Hover Indicator */}
              {isHovered && (
                <motion.div
                  layoutId="liquid-hover"
                  className={`absolute inset-0 rounded-full ${isNight ? 'bg-white/10' : 'bg-black/10'}`}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}

              {/* Liquid Active Indicator */}
              {isActive && (
                <motion.div
                  layoutId="liquid-active"
                  className={`absolute inset-0 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.1)] ${isNight ? 'bg-white' : 'bg-black'}`}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}

              {/* Text Label */}
              <span 
                className={`relative z-10 font-sans text-xs tracking-[0.2em] uppercase font-bold transition-colors duration-300 flex items-center gap-2 ${
                  isActive 
                    ? (isNight ? 'text-black' : 'text-white') 
                    : (isNight ? 'text-white' : 'text-black')
                }`}
              >
                {link.label}
                {/* Chevron icon only for Niche */}
                {link.id === 'niche' && (
                  <motion.svg 
                    animate={{ rotate: isNicheOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-3 h-3" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                )}
              </span>
            </div>
          );

          if (link.id === 'niche') {
            return <div key={link.id}>{innerContent}</div>;
          }

          return (
            <Link key={link.id} href={link.href} passHref>
              {innerContent}
            </Link>
          );
        })}
      </div>

      {/* 
        The Niche Sub-Menu Evolution
      */}
      <AnimatePresence>
        {isNicheOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 16, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, scale: 0.95, filter: 'blur(10px)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className={`absolute top-full w-max p-3 rounded-[2rem] premium-glass ${isNight ? 'bg-white/5 border-white/20' : 'bg-black/5 border-black/20'} shadow-[0_30px_60px_rgba(0,0,0,0.5)] backdrop-blur-2xl flex flex-col gap-1 origin-top transition-colors duration-1000`}
          >
            {nicheLinks.map((niche, i) => (
              <Link href={niche.href} key={niche.id} passHref onClick={() => setIsNicheOpen(false)}>
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative px-4 py-3 md:px-8 md:py-4 cursor-pointer rounded-full overflow-hidden text-center block"
                >
                  {/* Sub-menu hover effect */}
                  <div className={`absolute inset-0 transition-colors duration-300 rounded-full ${isNight ? 'bg-white/0 group-hover:bg-white/10' : 'bg-black/0 group-hover:bg-black/10'}`} />
                  
                  <span className={`relative z-10 transition-colors duration-300 flex items-center justify-center gap-[0.2em] text-[11px] md:text-sm ${isNight ? 'text-white/60 group-hover:text-white' : 'text-black/60 group-hover:text-black'}`}>
                    <span className="font-sans font-black tracking-widest uppercase">{niche.first}</span>
                    <span className="font-cormorant font-light italic tracking-[0.15em] lowercase">{niche.second}</span>
                  </span>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

    </motion.header>
  );
}
