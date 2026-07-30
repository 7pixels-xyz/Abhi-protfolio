'use client';

import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue, AnimatePresence } from 'framer-motion';
import { useRef, MouseEvent, useState, useEffect } from 'react';

const VolumeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
);

const VolumeOnIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
);

const VideoModal = ({ videoUrl, onClose }: { videoUrl: string | null, onClose: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (videoUrl) {
      document.body.style.overflow = 'hidden';
      setIsPlaying(true);
      setProgress(0);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; }
  }, [videoUrl]);

  const handleMouseMove = () => {
    setShowControls(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShowControls(false), 2000);
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(isNaN(p) ? 0 : p);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const p = Math.max(0, Math.min(1, x / bounds.width));
    if (videoRef.current) {
      videoRef.current.currentTime = p * videoRef.current.duration;
    }
  };

  return (
    <AnimatePresence>
      {videoUrl && (
        <motion.div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl"
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(40px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={onClose}
          onMouseMove={handleMouseMove}
        >
          <motion.div 
            className="relative w-[95vw] h-[90vh] md:w-[85vw] md:h-[85vh] flex items-center justify-center"
            initial={{ scale: 0.9, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 40 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            onClick={(e) => e.stopPropagation()}
          >
             <video 
               ref={videoRef}
               src={videoUrl}
               autoPlay
               playsInline
               onTimeUpdate={handleTimeUpdate}
               onEnded={() => setIsPlaying(false)}
               onClick={togglePlay}
               className="max-w-full max-h-full object-contain rounded-2xl shadow-[0_0_100px_rgba(0,0,0,0.8)]"
             />

             {/* Close Button */}
             <button onClick={onClose} className="absolute -top-12 right-0 md:-right-12 text-white/50 hover:text-white transition-colors">
               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
             </button>

             {/* Controls Overlay */}
             <motion.div 
               className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col gap-4 shadow-2xl"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: showControls ? 1 : 0, y: showControls ? 0 : 20 }}
               transition={{ duration: 0.3 }}
             >
                {/* Progress Bar */}
                <div className="w-full h-2 bg-white/10 rounded-full cursor-pointer relative overflow-hidden group" onClick={handleSeek}>
                   <div className="absolute top-0 left-0 h-full bg-[#ea77ff] pointer-events-none group-hover:bg-[#00d2ff] transition-colors" style={{ width: `${progress}%` }} />
                </div>
                
                {/* Buttons */}
                <div className="flex items-center justify-between px-2">
                   <button onClick={togglePlay} className="text-white hover:text-[#00ff88] transition-colors">
                      {isPlaying ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                      ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-1"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                      )}
                   </button>

                   <button onClick={() => { if(videoRef.current) { videoRef.current.muted = !isMuted; setIsMuted(!isMuted); } }} className="text-white hover:text-[#ea77ff] transition-colors">
                      {isMuted ? <VolumeOffIcon /> : <VolumeOnIcon />}
                   </button>
                </div>
             </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ShortsVideoCard = ({ videoUrl, isCenter }: { videoUrl: string, isCenter: boolean }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const thumbnailUrl = videoUrl.replace('.mp4', '.jpg');

  useEffect(() => {
    if (isHovered && videoRef.current) {
      videoRef.current.play().catch(() => {});
    } else if (!isHovered && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isHovered]);

  return (
    <div 
      className="relative w-full h-full bg-[#050505] group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <img 
        src={thumbnailUrl} 
        alt="Thumbnail" 
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 
          ${isHovered ? 'opacity-0 scale-110' : 'opacity-100 scale-100'} 
          ${isCenter ? 'grayscale-0 brightness-100' : 'grayscale brightness-50 group-hover:grayscale-0'}`} 
      />
      <video 
        ref={videoRef}
        src={videoUrl}
        poster={thumbnailUrl}
        muted={isMuted}
        loop
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 
          ${isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}
      />

      <button 
        onClick={(e) => { 
          e.stopPropagation(); 
          setIsMuted(!isMuted); 
        }}
        className={`absolute bottom-6 right-6 w-12 h-12 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white z-20 transition-all duration-500 hover:scale-110 hover:bg-white/10
          ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      >
        {isMuted ? <VolumeOffIcon /> : <VolumeOnIcon />}
      </button>

      <div className={`absolute inset-0 z-20 flex items-center justify-center pointer-events-none transition-opacity duration-500 ${isCenter && !isHovered ? 'opacity-100' : 'opacity-0'}`}>
         <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 translate-x-[1px]"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
         </div>
      </div>
    </div>
  );
};

const ShortsCarousel = ({ videos, onPlay }: { videos: string[], onPlay: (url: string) => void }) => {
  const [activeIndex, setActiveIndex] = useState(Math.floor(videos.length / 2));

  const handleNext = () => {
    setActiveIndex((prev) => Math.min(videos.length - 1, prev + 1));
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(50);
  };
  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(0, prev - 1));
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(50);
  };

  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipe = offset.x;
    if (swipe < -50) {
      handleNext();
    } else if (swipe > 50) {
      handlePrev();
    }
  };

  return (
    <div className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center perspective-[1500px] mt-10 md:mt-0">
      <motion.div 
        className="absolute inset-0 z-40 touch-pan-y" 
        drag="x" 
        dragConstraints={{ left: 0, right: 0 }} 
        onDragEnd={handleDragEnd} 
      />
      {videos.map((url, i) => {
        const offset = i - activeIndex;
        const absOffset = Math.abs(offset);
        const isCenter = offset === 0;

        let x = 0;
        let rotateY = 0;
        let scale = 1;
        let zIndex = 50 - absOffset;
        let opacity = 1;
        let blur = 0;

        if (offset < 0) {
          x = typeof window !== 'undefined' && window.innerWidth < 768 ? -70 * absOffset : -140 * absOffset;
          rotateY = 25;
          scale = Math.max(0.6, 1 - absOffset * 0.15);
          opacity = Math.max(0, 1 - absOffset * 0.4);
          blur = absOffset * 3;
        } else if (offset > 0) {
          x = typeof window !== 'undefined' && window.innerWidth < 768 ? 70 * absOffset : 140 * absOffset;
          rotateY = -25;
          scale = Math.max(0.6, 1 - absOffset * 0.15);
          opacity = Math.max(0, 1 - absOffset * 0.4);
          blur = absOffset * 3;
        }

        return (
          <motion.div
            key={url}
            className="absolute top-0 w-[280px] md:w-[320px] aspect-[9/16] rounded-[2rem] overflow-hidden cursor-pointer shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/10"
            style={{ zIndex, filter: `blur(${blur}px)` }}
            animate={{ x, rotateY, scale, opacity }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => {
              if (isCenter) onPlay(url);
              else setActiveIndex(i);
            }}
          >
            <ShortsVideoCard videoUrl={url} isCenter={isCenter} />
          </motion.div>
        );
      })}

      {/* Controls */}
      <div className="absolute -bottom-24 flex items-center gap-6 z-50">
        <button 
          onClick={handlePrev} 
          disabled={activeIndex === 0}
          className={`w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-colors backdrop-blur-md bg-white/5 ${activeIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/10 hover:border-white/40'}`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button 
          onClick={handleNext} 
          disabled={activeIndex === videos.length - 1}
          className={`w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-colors backdrop-blur-md bg-white/5 ${activeIndex === videos.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/10 hover:border-white/40'}`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  );
};

const dummyLongform = ["", "", "", ""];
const commercialVideos = [
  "https://res.cloudinary.com/adwbvkcv/video/upload/v1785412928/tapiocha_bun_alglt1.mp4",
  "https://res.cloudinary.com/adwbvkcv/video/upload/v1785413148/Tapiocha_cbgqu4.mp4",
  "https://res.cloudinary.com/adwbvkcv/video/upload/v1785413202/1_lycgei.mp4",
  "https://res.cloudinary.com/adwbvkcv/video/upload/v1785413211/2_ibf5ll.mp4",
  "https://res.cloudinary.com/adwbvkcv/video/upload/v1785413214/3_fgihsd.mp4"
];
const dummyColor = ["", "", "", ""];

// --- 1. LONG-FORM: Cinematic Vertical Accordion ---
const LongformVideoCard = ({ videoUrl, isActive, index }: { videoUrl: string, isActive: boolean, index: number }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (isActive && videoUrl && videoRef.current) {
      videoRef.current.play().catch(() => {});
    } else if (!isActive && videoUrl && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isActive, videoUrl]);

  const isPlaceholder = !videoUrl;
  const url = isPlaceholder ? `https://picsum.photos/seed/longform${index}/1200/500` : videoUrl;
  const poster = isPlaceholder ? url : url.replace('.mp4', '.jpg');

  return (
    <div className="w-full h-full relative group bg-[#050505] overflow-hidden">
       <img src={poster} className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${isActive && !isPlaceholder ? 'opacity-0 scale-110' : 'opacity-100 scale-100'} ${!isActive ? 'grayscale opacity-50' : ''}`} />
       {!isPlaceholder && (
          <video ref={videoRef} src={url} poster={poster} muted={isMuted} loop playsInline className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`} />
       )}
       
       <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent flex flex-col justify-end p-6 md:p-10 transition-all duration-700 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4'}`}>
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent ml-1" />
             </div>
             <span className="font-cormorant italic text-2xl md:text-4xl text-white">Project_{index + 1}</span>
          </div>
       </div>

       {isActive && !isPlaceholder && (
          <button onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }} className="absolute bottom-6 md:bottom-10 right-6 md:right-10 w-12 h-12 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:scale-110 hover:bg-white/10 transition-all z-20">
             {isMuted ? <VolumeOffIcon /> : <VolumeOnIcon />}
          </button>
       )}
    </div>
  );
};

const LongformAccordion = ({ videos, onPlay }: { videos: string[], onPlay: (url: string) => void }) => {
  const [active, setActive] = useState(0);

  const handleSelect = (i: number) => {
    setActive(i);
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(40);
  };

  return (
    <div className="flex flex-col gap-2 w-full h-[600px] md:h-[800px] mt-10 md:mt-0">
      {videos.map((url, i) => {
        const isActive = active === i;
        return (
          <motion.div 
            key={i}
            className="relative w-full rounded-[2rem] overflow-hidden cursor-pointer border border-white/5 shadow-2xl"
            animate={{ height: isActive ? '70%' : '10%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => {
              if (isActive) onPlay(url);
              else handleSelect(i);
            }}
            onMouseEnter={() => handleSelect(i)}
          >
             <LongformVideoCard videoUrl={url} isActive={isActive} index={i} />
          </motion.div>
        );
      })}
    </div>
  );
};

// --- 2. COMMERCIAL: Dynamic Masonry (Perfect for Mixed Aspect Ratios) ---
const CommercialMasonryCard = ({ videoUrl, index, onPlay }: { videoUrl: string, index: number, onPlay: () => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  
  const thumbnailUrl = videoUrl.replace('.mp4', '.jpg');

  useEffect(() => {
    if (isHovered && videoRef.current) {
      videoRef.current.play().catch(() => {});
    } else if (!isHovered && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isHovered]);

  return (
    <motion.div 
      className="relative w-full rounded-[2rem] overflow-hidden bg-[#050505] border border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.8)] mb-4 md:mb-8 group cursor-pointer break-inside-avoid"
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
      onClick={onPlay}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
       {/* Base image defines the exact intrinsic height natively without forcing crops */}
       <img src={thumbnailUrl} className={`w-full h-auto object-contain transition-all duration-700 ${isHovered ? 'opacity-0 scale-105' : 'opacity-100 scale-100 grayscale opacity-60'}`} />
       
       <video 
         ref={videoRef} 
         src={videoUrl} 
         poster={thumbnailUrl} 
         muted={isMuted} 
         loop 
         playsInline 
         className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`} 
       />
       
       <div className={`absolute inset-0 flex flex-col justify-end p-6 md:p-8 transition-opacity duration-500 bg-gradient-to-t from-black/90 via-black/20 to-transparent ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex flex-col gap-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
             <span className="font-sans text-[10px] tracking-[0.2em] text-[#00ff88] uppercase">Commercial</span>
             <span className="font-cormorant italic text-2xl md:text-3xl text-white truncate">Campaign_{index + 1}</span>
          </div>
       </div>

       {isHovered && (
          <button onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:scale-110 hover:bg-white/10 transition-all z-20">
             {isMuted ? <VolumeOffIcon /> : <VolumeOnIcon />}
          </button>
       )}
    </motion.div>
  );
};

const CommercialMasonry = ({ videos, onPlay }: { videos: string[], onPlay: (url: string) => void }) => {
  return (
    <div className="w-full columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-8 mt-10 md:mt-0">
      {videos.map((url, i) => (
         <CommercialMasonryCard key={i} videoUrl={url} index={i} onPlay={() => onPlay(url)} />
      ))}
    </div>
  );
};

// --- 3. COLOR GRADING: 3D Horizontal Film Strip ---
const ColorGradingStrip = ({ videos, onPlay }: { videos: string[], onPlay: (url: string) => void }) => {
  return (
    <div className="flex gap-6 md:gap-10 w-full overflow-x-auto pb-16 pt-10 px-4 md:px-0 snap-x snap-mandatory no-scrollbar perspective-[1200px] mt-10 md:mt-0" style={{ scrollBehavior: 'smooth' }}>
      {videos.map((url, i) => (
        <motion.div 
          key={i} 
          className="min-w-[85%] md:min-w-[45%] aspect-[16/9] md:aspect-auto md:h-[400px] rounded-[2rem] overflow-hidden snap-center border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] cursor-pointer"
          whileHover={{ scale: 1.05, rotateY: -5, zIndex: 10 }}
          initial={{ rotateY: 10, scale: 0.95, opacity: 0.8 }}
          whileInView={{ rotateY: 0, scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 20 }}
          viewport={{ margin: "-100px" }}
        >
           <CommercialMasonryCard videoUrl={url} index={i} onPlay={() => onPlay(url)} />
        </motion.div>
      ))}
    </div>
  );
};

// Premium Magnetic Card (For generic sections if needed)
const ProjectCard = ({ aspect, type, index, videoUrl }: { aspect: string, type: string, index: number, videoUrl?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  function handleMouseEnter() {
    if (videoUrl && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }

  function handleMouseLeave() {
    if (videoUrl && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }

  const thumbnailUrl = videoUrl ? videoUrl.replace('.mp4', '.jpg') : `https://picsum.photos/seed/${type}${index}/800/800`;

  return (
    <motion.div
      ref={cardRef}
      className={`relative rounded-sm overflow-hidden bg-[#030303] border border-white/5 cursor-pointer group ${aspect}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      data-cursor-text="Play"
    >
      {/* Subtle Mouse Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-sm opacity-0 transition duration-500 group-hover:opacity-100 z-20"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.08),
              transparent 40%
            )
          `,
        }}
      />
      
      {/* Hover Overlay */}
      <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none flex flex-col justify-end p-6 md:p-8">
         <div className="flex items-center gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1]">
           <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
             <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent ml-1 relative z-10" />
           </div>
           <div className="flex flex-col">
             <span className="font-sans text-[10px] md:text-xs tracking-[0.2em] text-white/70 uppercase">Watch</span>
             <span className="font-cormorant italic text-lg md:text-xl text-white">Project_{index + 1}</span>
           </div>
         </div>
      </div>
      
      {videoUrl ? (
        <>
          <img src={thumbnailUrl} alt="Thumbnail" className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:opacity-0 transition-opacity duration-[1s] ease-[0.16,1,0.3,1]" />
          <video 
            ref={videoRef}
            src={videoUrl}
            poster={thumbnailUrl}
            muted
            loop
            playsInline
            className="w-full h-full object-cover grayscale opacity-0 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[1s] scale-100 group-hover:scale-105 ease-[0.16,1,0.3,1]"
          />
        </>
      ) : (
        <img src={thumbnailUrl} alt="Project" className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[1s] scale-100 group-hover:scale-105 ease-[0.16,1,0.3,1]" />
      )}
    </motion.div>
  );
};

const shortVideos = [
  "https://res.cloudinary.com/adwbvkcv/video/upload/v1785410242/7_psh7ao.mp4",
  "https://res.cloudinary.com/adwbvkcv/video/upload/v1785410240/4_rt5k1k.mp4",
  "https://res.cloudinary.com/adwbvkcv/video/upload/v1785410239/5_qiosck.mp4",
  "https://res.cloudinary.com/adwbvkcv/video/upload/v1785410239/2_kqjtwc.mp4",
  "https://res.cloudinary.com/adwbvkcv/video/upload/v1785410239/3_dz4ebo.mp4",
  "https://res.cloudinary.com/adwbvkcv/video/upload/v1785410235/6_phoaxf.mp4",
  "https://res.cloudinary.com/adwbvkcv/video/upload/v1785410234/1_pmibpx.mp4"
];

const Section = ({ script, main, tools, children }: { script: string, main: string, tools?: React.ReactNode, children: React.ReactNode }) => {
  return (
    <div className="flex flex-col xl:flex-row items-start justify-center gap-8 md:gap-16 xl:gap-32 w-full max-w-[90rem] mx-auto my-24 md:my-40 relative z-10 px-6 md:px-16">
      
      {/* Sticky Typography Column */}
      <div className="xl:w-1/3 flex flex-col items-start text-left w-full sticky top-0 md:top-40 z-30 pt-24 pb-8 md:pt-0 md:pb-0 bg-gradient-to-b from-[#030303] via-[#030303]/95 to-transparent md:bg-none -mt-24 md:mt-0">
        <motion.div 
          className="relative mb-6 md:mb-12 w-full"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 mb-2 md:mb-4 overflow-hidden">
             <motion.div className="h-px bg-white/30" initial={{ width: 0 }} whileInView={{ width: 40 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }} />
             <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/50">{script} Series</span>
          </div>
          
          <h2 className="flex flex-col text-[4rem] leading-[0.85] md:text-8xl font-sans font-black tracking-tighter text-white uppercase relative z-10 md:leading-[0.85]">
            <motion.span 
              className="font-cormorant italic text-4xl md:text-6xl font-light text-white/60 lowercase tracking-widest pl-1 md:pl-4 mb-1 md:mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {script}
            </motion.span>
            <div className="overflow-hidden">
               <motion.span 
                 className="block drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                 initial={{ y: "100%" }}
                 whileInView={{ y: "0%" }}
                 viewport={{ once: true }}
                 transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
               >
                 {main}
               </motion.span>
            </div>
          </h2>
        </motion.div>
        
        {tools && (
          <motion.div 
            className="font-sans text-xs tracking-[0.1em] text-white/60 uppercase hidden md:block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {tools}
          </motion.div>
        )}
      </div>

      {/* Grid Content Column */}
      <div className="xl:w-2/3 w-full relative z-20">
        {children}
      </div>
    </div>
  );
};

export default function VideoEditorClient() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const yParallax1 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const yParallax2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <motion.main 
      ref={containerRef}
      className="relative min-h-screen bg-[#030303] text-white overflow-hidden flex flex-col font-sans selection:bg-white selection:text-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
        {/* Premium Cinematic Background - High Performance (No CSS Blurs) */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-br from-[#070514] via-[#020205] to-[#040a14]">
        {/* Soft Cinematic Orbs using Radial Gradients instead of expensive CSS Blurs */}
        <motion.div 
          className="absolute top-0 right-0 w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] translate-x-1/4 -translate-y-1/4 opacity-60"
          style={{ background: 'radial-gradient(circle, rgba(76,29,149,0.15) 0%, rgba(76,29,149,0) 70%)', y: yParallax1 }}
        />
        <motion.div 
          className="absolute top-[30%] left-0 w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] -translate-x-1/4 opacity-40"
          style={{ background: 'radial-gradient(circle, rgba(0,210,255,0.1) 0%, rgba(0,210,255,0) 70%)', y: yParallax1 }}
        />
        <motion.div 
          className="absolute bottom-0 right-[20%] w-[70vw] h-[70vw] md:w-[50vw] md:h-[50vw] translate-y-1/4 opacity-50"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, rgba(16,185,129,0) 70%)', y: yParallax2 }}
        />
        
        {/* Subtle grid overlay for texture without heavy SVG noise */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Hero Scroll Indicator */}
      <motion.div 
        className="absolute bottom-16 left-8 md:left-16 flex flex-col items-start gap-4 z-50 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1.5 }}
      >
        <div className="w-px h-16 bg-white/10 relative overflow-hidden ml-2">
           <motion.div 
             className="w-full h-1/2 bg-[#00d2ff]"
             animate={{ y: ["-100%", "200%"] }}
             transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
           />
        </div>
        <span className="font-sans font-bold text-[8px] tracking-[0.4em] uppercase text-white/50 transform -rotate-90 origin-left translate-x-4">Scroll</span>
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 w-full pt-48 pb-48 flex flex-col items-center">

        {/* 1. Software SKILLS */}
        <Section 
          script="Software" 
          main="SKILLS" 
          tools={
            <div className="flex flex-col gap-8 w-full max-w-sm">
               <div className="flex items-center justify-between border-b border-white/5 pb-4 group hover:border-[#ea77ff]/30 transition-colors">
                  <div className="flex items-center gap-4">
                     <span className="text-white/30 font-mono text-xs">01</span>
                     <span className="text-sm font-medium tracking-widest text-white/80 group-hover:text-white transition-colors">Adobe Premiere Pro</span>
                  </div>
                  <div className="w-8 h-8 rounded bg-gradient-to-br from-[#1a0033] to-black border border-[#ea77ff]/20 flex items-center justify-center font-bold text-[#ea77ff] text-[10px] shadow-[0_0_10px_rgba(234,119,255,0.1)] group-hover:shadow-[0_0_15px_rgba(234,119,255,0.3)] transition-all">Pr</div>
               </div>
               <div className="flex items-center justify-between border-b border-white/5 pb-4 group hover:border-[#00ff88]/30 transition-colors">
                  <div className="flex items-center gap-4">
                     <span className="text-white/30 font-mono text-xs">02</span>
                     <span className="text-sm font-medium tracking-widest text-white/80 group-hover:text-white transition-colors">DaVinci Resolve</span>
                  </div>
                  <div className="w-8 h-8 rounded bg-black border border-[#00ff88]/20 flex items-center justify-center text-[10px] overflow-hidden p-1.5 shadow-[0_0_10px_rgba(0,255,136,0.1)] group-hover:shadow-[0_0_15px_rgba(0,255,136,0.3)] transition-all">
                     <img src="/images/davinci.png" alt="DaVinci" className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
                  </div>
               </div>
               <div className="flex items-center justify-between border-b border-white/5 pb-4 group hover:border-white/30 transition-colors">
                  <div className="flex items-center gap-4">
                     <span className="text-white/30 font-mono text-xs">03</span>
                     <span className="text-sm font-medium tracking-widest text-white/80 group-hover:text-white transition-colors">CapCut</span>
                  </div>
                  <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[10px] overflow-hidden p-1.5 shadow-[0_0_10px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all">
                     <img src="/images/capcut.png" alt="CapCut" className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity" />
                  </div>
               </div>
            </div>
          }
        >
          <motion.div 
            className="relative w-full aspect-[4/3] md:aspect-video flex items-center justify-center perspective-[1200px]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* 3D Floating Cinematic Workspace Illustration */}
            <motion.div 
              className="relative z-10 w-full h-full bg-[#050505]/80 backdrop-blur-xl rounded-sm border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden"
              whileHover={{ rotateY: -2, rotateX: 2 }}
              transition={{ type: 'spring', stiffness: 100, damping: 30 }}
            >
                 <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none" />
                 <div className="w-full h-10 bg-[#080808]/90 flex items-center px-6 gap-3 border-b border-white/5 relative z-10">
                    <div className="w-2 h-2 rounded-full bg-white/10"></div>
                    <div className="w-2 h-2 rounded-full bg-white/10"></div>
                    <div className="w-2 h-2 rounded-full bg-white/10"></div>
                    <div className="ml-auto flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
                       <span className="font-mono text-[8px] tracking-[0.2em] text-white/40 uppercase">Workspace Active</span>
                    </div>
                 </div>
                 <div className="flex-grow p-6 flex flex-col gap-6 relative z-10">
                    <div className="w-full h-1/2 bg-[#020202] rounded-sm flex items-center justify-center border border-white/5 relative overflow-hidden group">
                       <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1600&q=80" alt="Workspace" className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-1000" />
                       <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 relative z-10 scale-100 group-hover:scale-110 group-hover:bg-black/60 transition-all duration-500">
                          <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
                       </div>
                    </div>
                    <div className="flex gap-4 h-[20%]">
                      <div className="h-full w-1/3 bg-white/5 rounded-sm border border-white/5 relative overflow-hidden">
                         <motion.div className="w-px h-full bg-[#00d2ff]/40 absolute top-0 left-0 shadow-[0_0_10px_#00d2ff]" animate={{ x: [0, 300] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />
                      </div>
                      <div className="h-full w-2/3 bg-white/5 rounded-sm border border-white/5 relative overflow-hidden flex items-center px-4">
                         <div className="w-full h-1/3 bg-gradient-to-r from-transparent via-[#ea77ff]/20 to-transparent" />
                      </div>
                    </div>
                    <div className="flex gap-4 h-[20%]">
                      <div className="h-full w-1/2 bg-white/5 rounded-sm border border-white/5 overflow-hidden">
                         <div className="w-full h-full bg-gradient-to-b from-[#00ff88]/5 to-transparent" />
                      </div>
                      <div className="h-full w-1/4 bg-white/5 rounded-sm border border-white/5"></div>
                    </div>
                 </div>
            </motion.div>
          </motion.div>
        </Section>

        {/* 2. Short-form VIDEOS */}
        <Section 
          script="Short-form" 
          main="VIDEOS" 
          tools={
            <div className="flex flex-col gap-4">
              <p className="leading-loose tracking-[0.2em] text-xs text-white/50">Built For Engagement</p>
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden p-1.5"><img src="/images/capcut.png" className="opacity-70" /></div>
                 <div className="w-8 h-8 rounded bg-gradient-to-br from-[#1a0033] to-black border border-[#ea77ff]/20 flex items-center justify-center font-bold text-[#ea77ff] text-[10px]">Pr</div>
              </div>
            </div>
          }
        >
          <ShortsCarousel videos={shortVideos} onPlay={setActiveVideo} />
        </Section>

        {/* 3. Long-form VIDEOS */}
        <Section 
          script="Long-form" 
          main="VIDEOS" 
          tools={
            <div className="flex flex-col gap-4">
              <p className="leading-loose tracking-[0.2em] text-xs text-white/50">Narrative & Pacing</p>
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded bg-gradient-to-br from-[#1a0033] to-black border border-[#ea77ff]/20 flex items-center justify-center font-bold text-[#ea77ff] text-[10px]">Pr</div>
                 <div className="w-8 h-8 rounded bg-black border border-[#00ff88]/20 flex items-center justify-center overflow-hidden p-1.5"><img src="/images/davinci.png" className="opacity-70" /></div>
              </div>
            </div>
          }
        >
          <LongformAccordion videos={dummyLongform} onPlay={setActiveVideo} />
        </Section>

        {/* 4. Commercial VIDEOS */}
        <Section 
          script="Commercial" 
          main="VIDEOS" 
          tools={
            <div className="flex flex-col gap-4">
              <p className="leading-loose tracking-[0.2em] text-xs text-white/50">High-end Ads</p>
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded bg-black border border-[#00ff88]/20 flex items-center justify-center overflow-hidden p-1.5"><img src="/images/davinci.png" className="opacity-70" /></div>
                 <div className="w-8 h-8 rounded bg-gradient-to-br from-[#1a0033] to-black border border-[#ea77ff]/20 flex items-center justify-center font-bold text-[#ea77ff] text-[10px]">Pr</div>
              </div>
            </div>
          }
        >
          <CommercialMasonry videos={commercialVideos} onPlay={setActiveVideo} />
        </Section>

        {/* 5. Color GRADING */}
        <Section 
          script="Color" 
          main="GRADING" 
          tools={
            <div className="flex flex-col gap-4">
              <p className="leading-loose tracking-[0.2em] text-xs text-white/50">Cinematic Looks</p>
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded bg-black border border-[#00ff88]/20 flex items-center justify-center overflow-hidden p-1.5"><img src="/images/davinci.png" className="opacity-70" /></div>
              </div>
            </div>
          }
        >
          <ColorGradingStrip videos={dummyColor} onPlay={setActiveVideo} />
        </Section>

      </div>
      
      <VideoModal videoUrl={activeVideo} onClose={() => setActiveVideo(null)} />
    </motion.main>
  );
}
