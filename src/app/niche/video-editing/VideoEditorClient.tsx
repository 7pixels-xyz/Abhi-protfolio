'use client';

import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue, AnimatePresence } from 'framer-motion';
import { useRef, MouseEvent, useState, useEffect } from 'react';

const VolumeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
);

const VolumeOnIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
);

const MobileScrollPortrait = ({ src, className, ...props }: { src: string, className?: string, [key: string]: any }) => {
  const ref = useRef<HTMLImageElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 100%", "end 0%"]
  });
  
  const filter = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    [
      "grayscale(100%) brightness(50%)",
      "grayscale(0%) brightness(100%)",
      "grayscale(0%) brightness(100%)",
      "grayscale(100%) brightness(50%)"
    ]
  );

  return (
    <motion.img 
      ref={ref}
      src={src}
      className={className}
      style={{ filter }}
      {...props}
    />
  );
};

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

const ShortsVideoCard = ({ 
  videoUrl, 
  isCenter, 
  globalActiveAudioUrl, 
  setGlobalActiveAudioUrl 
}: { 
  videoUrl: string, 
  isCenter: boolean,
  globalActiveAudioUrl: string | null,
  setGlobalActiveAudioUrl: (url: string | null) => void
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const thumbnailUrl = videoUrl.replace('.mp4', '.jpg');
  const isMuted = globalActiveAudioUrl !== videoUrl;

  useEffect(() => {
    if (isCenter && videoRef.current) {
      videoRef.current.play().catch(() => {});
    } else if (!isCenter && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isCenter]);

  // Handle muting directly via ref for reliability
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <div className="relative w-full h-full bg-[#050505] group">
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <img 
        src={thumbnailUrl} 
        alt="Thumbnail" 
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 
          ${isCenter ? 'opacity-0 scale-110' : 'opacity-100 scale-100 grayscale brightness-50 group-hover:grayscale-0'}`} 
      />
      <video 
        ref={videoRef}
        src={videoUrl}
        poster={thumbnailUrl}
        muted={isMuted}
        loop
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 
          ${isCenter ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}
      />

      {isCenter && (
        <button 
          onClick={(e) => { 
            e.stopPropagation(); 
            setGlobalActiveAudioUrl(isMuted ? videoUrl : null); 
          }}
          className={`absolute bottom-6 right-6 w-12 h-12 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white z-20 transition-all duration-500 hover:scale-110 hover:bg-white/10 opacity-100 translate-y-0`}
        >
          {isMuted ? <VolumeOffIcon /> : <VolumeOnIcon />}
        </button>
      )}

      <div className={`absolute inset-0 z-20 flex items-center justify-center pointer-events-none transition-opacity duration-500 ${!isCenter ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
         <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 translate-x-[1px]"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
         </div>
      </div>
    </div>
  );
};

const ShortsCarousel = ({ videos, onPlay, globalActiveAudioUrl, setGlobalActiveAudioUrl }: { videos: string[], onPlay: (url: string) => void, globalActiveAudioUrl: string | null, setGlobalActiveAudioUrl: (url: string | null) => void }) => {
  const [activeIndex, setActiveIndex] = useState(Math.floor(videos.length / 2));

  // If the carousel is unmuted, transfer the audio to the newly centered video when swiping
  useEffect(() => {
    if (globalActiveAudioUrl && videos.includes(globalActiveAudioUrl)) {
      setGlobalActiveAudioUrl(videos[activeIndex]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  // Swipe gesture support
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) handleNext();
    else if (diff < -50) handlePrev();
    setTouchStart(null);
  };

  const handleNext = () => setActiveIndex((prev) => Math.min(videos.length - 1, prev + 1));
  const handlePrev = () => setActiveIndex((prev) => Math.max(0, prev - 1));

  return (
    <div 
      className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center perspective-[1500px] mt-10 md:mt-0"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
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
            <ShortsVideoCard 
              videoUrl={url} 
              isCenter={isCenter} 
              globalActiveAudioUrl={globalActiveAudioUrl} 
              setGlobalActiveAudioUrl={setGlobalActiveAudioUrl} 
            />
          </motion.div>
        );
      })}

      {/* Controls */}
      <div className="absolute -bottom-8 md:-bottom-24 flex items-center gap-6 z-50 pointer-events-auto">
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
const CommercialMasonryCard = ({ videoUrl, index, onPlay, globalActiveAudioUrl, setGlobalActiveAudioUrl }: { videoUrl: string, index: number, onPlay: () => void, globalActiveAudioUrl?: string | null, setGlobalActiveAudioUrl?: (url: string | null) => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  
  const thumbnailUrl = videoUrl.replace('.mp4', '.jpg');
  const isMuted = globalActiveAudioUrl ? globalActiveAudioUrl !== videoUrl : true;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAutoPlaying(entry.isIntersecting);
      },
      { threshold: 0.6 } // Play when at least 60% visible
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const shouldPlay = isHovered || isAutoPlaying;

  useEffect(() => {
    if (shouldPlay && videoRef.current) {
      videoRef.current.play().catch(() => {});
    } else if (!shouldPlay && videoRef.current) {
      videoRef.current.pause();
    }
  }, [shouldPlay]);

  return (
    <motion.div 
      ref={containerRef as any}
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
       <img src={thumbnailUrl} className={`w-full h-auto object-contain transition-all duration-700 ${shouldPlay ? 'opacity-0 scale-105' : 'opacity-100 scale-100 grayscale opacity-60'}`} />
       
       <video 
         ref={videoRef} 
         src={videoUrl} 
         poster={thumbnailUrl} 
         muted={isMuted} 
         loop 
         playsInline 
         className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${shouldPlay ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`} 
       />
       
       <div className={`absolute inset-0 flex flex-col justify-end p-6 md:p-8 transition-opacity duration-500 bg-gradient-to-t from-black/90 via-black/20 to-transparent ${shouldPlay ? 'opacity-100' : 'opacity-0'}`}>
          <div className={`flex flex-col gap-2 transition-transform duration-500 ${shouldPlay ? 'translate-y-0' : 'translate-y-4'}`}>
             <span className="font-sans text-[10px] tracking-[0.2em] text-[#00ff88] uppercase">Commercial</span>
             <span className="font-cormorant italic text-2xl md:text-3xl text-white truncate">Campaign_{index + 1}</span>
          </div>
       </div>

       {shouldPlay && setGlobalActiveAudioUrl && (
          <button onClick={(e) => { e.stopPropagation(); setGlobalActiveAudioUrl(isMuted ? videoUrl : null); }} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:scale-110 hover:bg-white/10 transition-all z-20 pointer-events-auto">
             {isMuted ? <VolumeOffIcon /> : <VolumeOnIcon />}
          </button>
       )}
    </motion.div>
  );
};

const CommercialMasonry = ({ videos, onPlay, globalActiveAudioUrl, setGlobalActiveAudioUrl }: { videos: string[], onPlay: (url: string) => void, globalActiveAudioUrl: string | null, setGlobalActiveAudioUrl: (url: string | null) => void }) => {
  return (
    <div className="w-full columns-1 md:columns-2 lg:columns-3 gap-4 md:gap-8 mt-10 md:mt-0">
      {videos.map((url, i) => (
         <CommercialMasonryCard key={i} videoUrl={url} index={i} onPlay={() => onPlay(url)} globalActiveAudioUrl={globalActiveAudioUrl} setGlobalActiveAudioUrl={setGlobalActiveAudioUrl} />
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

export default function VideoEditorClient() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [globalActiveAudioUrl, setGlobalActiveAudioUrl] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  return (
    <motion.main 
      ref={containerRef}
      className="relative w-full bg-[#01060e] text-white overflow-x-hidden flex flex-col font-sans selection:bg-[#7A0C16] selection:text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
       {/* Global Navigation Pill (Sticky) */}
       <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 md:gap-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full p-1.5 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
         <a href="#profile" className="px-6 py-2 rounded-full bg-[#8fb3d9] text-[#010B19] font-bold text-[10px] tracking-widest uppercase transition-colors">Profil</a>
         <a href="#projects" className="px-6 py-2 rounded-full text-white/50 hover:text-white font-bold text-[10px] tracking-widest uppercase transition-colors">Project</a>
         <a href="#contact" className="px-6 py-2 rounded-full text-white/50 hover:text-white font-bold text-[10px] tracking-widest uppercase transition-colors">Contact</a>
       </div>

       {/* HERO SECTION */}
       <section className="h-screen w-full relative flex items-center justify-center px-6">
          {/* Ambient Glow */}
          <div className="absolute top-[-10%] right-[-10%] w-[40rem] md:w-[60rem] h-[40rem] md:h-[60rem] bg-[#0c2f52]/40 rounded-full blur-[150px] pointer-events-none z-0" />
          
          {/* --- DESKTOP HERO --- */}
          <motion.div 
            initial={{ x: "-50%", opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-[30vw] h-[70vh] bg-[#7A0C16] rounded-r-[200px] overflow-hidden shadow-[0_0_80px_rgba(122,12,22,0.4)] z-10 group cursor-pointer"
          >
             <img src="https://res.cloudinary.com/adwbvkcv/image/upload/v1785480960/IMG_20260731_121950_ruabnv.png" className="absolute inset-0 w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 scale-110 translate-x-4 object-top" />
          </motion.div>

          <div className="hidden md:flex w-full h-full flex-col items-center justify-center relative z-20 pl-[15vw] pointer-events-none">
             <motion.div 
               initial={{ opacity: 0, y: 40 }} 
               animate={{ opacity: 1, y: 0 }} 
               transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
               className="flex items-end justify-center gap-6 mb-20 pointer-events-auto"
             >
                <h1 className="flex flex-col text-right font-sans font-black text-[8rem] lg:text-[9rem] leading-[0.8] tracking-tighter uppercase text-white drop-shadow-2xl">
                   <span>VIDEO</span>
                   <span>EDITING</span>
                </h1>
                <span className="font-instrument italic font-normal text-6xl lg:text-7xl text-white/80 pb-4">Showreel</span>
             </motion.div>
             
             <div className="flex items-center gap-4 mb-32 pointer-events-auto">
                <div className="w-3 h-3 bg-white" />
                <span className="font-sans text-sm tracking-[0.4em] uppercase text-white font-bold">Content Creator</span>
             </div>

             <div className="flex flex-col gap-6 text-center font-sans text-xs tracking-[0.4em] uppercase text-white/50 pointer-events-auto">
                <a href="#profile" className="hover:text-white transition-colors cursor-pointer">Start</a>
                <a href="#projects" className="hover:text-white transition-colors cursor-pointer">Options</a>
                <a href="/" className="hover:text-white transition-colors cursor-pointer">Exit</a>
             </div>
          </div>

          {/* --- MOBILE HERO --- */}
          <div className="flex md:hidden w-full h-full flex-col items-center justify-center relative z-20 pt-16">
             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }} 
               animate={{ scale: 1, opacity: 1 }} 
               transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
               className="w-56 h-64 bg-[#7A0C16] rounded-t-full rounded-b-3xl overflow-hidden shadow-[0_0_50px_rgba(122,12,22,0.4)] mb-8 relative"
             >
                <MobileScrollPortrait src="https://res.cloudinary.com/adwbvkcv/image/upload/v1785480960/IMG_20260731_121950_ruabnv.png" className="absolute inset-0 w-full h-full object-cover scale-110 object-top" />
             </motion.div>
             
             <motion.div 
               initial={{ opacity: 0, y: 30 }} 
               animate={{ opacity: 1, y: 0 }} 
               transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
               className="flex flex-col items-center gap-2 mb-10 w-full"
             >
                <h1 className="flex flex-col text-center font-sans font-black text-[4.5rem] leading-[0.85] tracking-tighter uppercase text-white drop-shadow-2xl">
                   <span>VIDEO</span>
                   <span>EDITING</span>
                </h1>
                <span className="font-instrument italic font-normal text-4xl text-white/80 mt-2">Showreel</span>
             </motion.div>
             
             <div className="flex items-center gap-3 mb-10">
                <div className="w-1.5 h-1.5 bg-white" />
                <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-white font-bold">Content Creator</span>
             </div>

             <div className="flex flex-col gap-5 text-center font-sans text-[10px] tracking-[0.4em] uppercase text-white/50">
                <a href="#profile" className="hover:text-white transition-colors cursor-pointer">Start</a>
                <a href="#projects" className="hover:text-white transition-colors cursor-pointer">Options</a>
             </div>
          </div>
       </section>

       {/* PROFILE SECTION */}
       <section id="profile" className="min-h-screen w-full relative flex items-center justify-center pt-32 pb-16 px-6 md:px-16 z-10 overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-[20%] -translate-y-1/2 w-[40rem] h-[40rem] md:w-[60rem] md:h-[60rem] bg-[#0B3A60]/80 rounded-full blur-[150px] pointer-events-none" />
          
          <div className="w-full max-w-[100rem] h-full flex flex-col lg:flex-row items-stretch gap-16 relative z-10">
             
             {/* --- DESKTOP PORTRAIT --- */}
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
               className="hidden lg:flex w-1/2 flex-col items-center justify-center relative min-h-[80vh] group"
             >
                <div className="absolute top-0 left-10 flex flex-col items-start z-30 pointer-events-none">
                   <span className="font-sans text-xs tracking-[0.3em] text-white/60 uppercase mb-2">Hello, I am</span>
                   <span className="font-sans font-black text-5xl tracking-tighter uppercase text-white drop-shadow-lg">Abhi</span>
                </div>
                
                <img src="https://res.cloudinary.com/adwbvkcv/image/upload/v1785480961/file_00000000dbbc81f6a341229d8c64ab29_ynhfck.png" className="absolute bottom-0 w-[95%] max-w-[500px] h-[95%] object-cover object-bottom grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 drop-shadow-[0_0_50px_rgba(0,0,0,0.5)] z-20 [mask-image:linear-gradient(to_top,rgba(0,0,0,1)_80%,rgba(0,0,0,0)_100%)]" />
                
                {/* Fire sparks overlay */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                   <div className="absolute top-[30%] left-[20%] w-2 h-4 bg-[#ff6600] rounded-full blur-[2px] opacity-80 rotate-45" />
                   <div className="absolute top-[50%] left-[40%] w-1 h-3 bg-[#ffcc00] rounded-full blur-[1px] opacity-90 rotate-12" />
                   <div className="absolute top-[70%] left-[10%] w-3 h-3 bg-[#ff3300] rounded-full blur-[3px] opacity-60 -rotate-12" />
                   <div className="absolute top-[20%] right-[30%] w-2 h-5 bg-[#ff9900] rounded-full blur-[2px] opacity-70 rotate-45" />
                   <div className="absolute top-[60%] right-[20%] w-1 h-2 bg-[#ffcc00] rounded-full blur-[1px] opacity-90 -rotate-45" />
                </div>
             </motion.div>

             {/* --- MOBILE PORTRAIT --- */}
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
               className="flex lg:hidden w-full flex-col items-center justify-center relative h-[60vh] mt-8"
             >
                <div className="absolute top-0 flex flex-col items-center text-center z-30 pointer-events-none">
                   <span className="font-sans text-[10px] tracking-[0.3em] text-white/60 uppercase mb-1">Hello, I am</span>
                   <span className="font-sans font-black text-4xl tracking-tighter uppercase text-white drop-shadow-lg">Abhi</span>
                </div>
                
                <MobileScrollPortrait src="https://res.cloudinary.com/adwbvkcv/image/upload/v1785480961/file_00000000dbbc81f6a341229d8c64ab29_ynhfck.png" className="absolute bottom-0 w-[90%] max-w-[350px] h-[85%] object-cover object-top drop-shadow-[0_0_50px_rgba(0,0,0,0.5)] z-20 [mask-image:linear-gradient(to_top,rgba(0,0,0,1)_70%,rgba(0,0,0,0)_100%)]" />
                
                <div className="absolute inset-0 z-20 pointer-events-none">
                   <div className="absolute top-[40%] left-[15%] w-1.5 h-3 bg-[#ff6600] rounded-full blur-[2px] opacity-80 rotate-45" />
                   <div className="absolute top-[60%] right-[15%] w-2 h-2 bg-[#ffcc00] rounded-full blur-[1px] opacity-90 -rotate-45" />
                </div>
             </motion.div>
             
             {/* Right Content */}
             <motion.div 
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
               className="w-full lg:w-1/2 flex flex-col justify-center py-10 lg:py-20 gap-12 lg:gap-20 relative z-30"
             >
                <div className="w-full max-w-2xl text-center lg:text-left px-4 lg:px-0">
                   <h2 className="font-sans font-black text-4xl lg:text-6xl tracking-tighter uppercase text-white mb-6">About Me</h2>
                   <p className="font-sans text-[10px] lg:text-sm text-white/70 leading-relaxed uppercase tracking-widest">
                      My journey in video editing began 5 years ago with a gaming YouTube channel, sparking a relentless passion for visual storytelling. Since that moment, I've never stopped editing. Over the years, I've transitioned into extensive freelance work, collaborating directly with dynamic content creators, high-profile brands, and upscale restaurants. I specialize in transforming raw footage into highly engaging, cinematic experiences that capture attention and drive the narrative.
                   </p>
                </div>
                
                <div className="w-full max-w-2xl flex flex-col items-center lg:items-start">
                   <h3 className="font-sans font-bold text-lg lg:text-2xl uppercase tracking-[0.2em] text-white mb-6 lg:mb-8">Software Skills</h3>
                   <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 lg:gap-6">
                      <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-gradient-to-br from-[#1a0033] to-black border border-[#ea77ff]/30 flex items-center justify-center font-bold text-[#ea77ff] text-base lg:text-xl shadow-[0_0_20px_rgba(234,119,255,0.15)]">Pr</div>
                      <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-[#000033] border border-[#3399ff]/30 flex items-center justify-center font-bold text-[#3399ff] text-base lg:text-xl shadow-[0_0_20px_rgba(51,153,255,0.15)]">Ps</div>
                      <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-[#001133] border border-[#66ccff]/30 flex items-center justify-center font-bold text-[#66ccff] text-base lg:text-xl shadow-[0_0_20px_rgba(102,204,255,0.15)]">Lr</div>
                      <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-white border border-white/20 flex items-center justify-center p-2.5 shadow-[0_0_20px_rgba(255,255,255,0.1)]"><img src="/images/capcut.png" className="w-full h-full object-contain filter invert" /></div>
                      <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-[#111] border border-white/20 flex items-center justify-center p-2.5 shadow-[0_0_20px_rgba(255,255,255,0.1)]"><img src="/images/davinci.png" className="w-full h-full object-contain" /></div>
                   </div>
                </div>

                <div className="w-full max-w-2xl px-4 lg:px-0">
                   <div className="flex-1 flex flex-col gap-6">
                      <h3 className="font-sans font-bold text-lg tracking-[0.2em] uppercase text-white border-b border-white/10 pb-4">Experience Highlights</h3>
                      
                      <div className="flex flex-col gap-8">
                         <div className="flex flex-col gap-2">
                            <span className="font-sans font-bold text-sm tracking-widest uppercase text-white">Brands & Commercial</span>
                            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#8fb3d9]">High-End Collaborations</span>
                            <p className="font-sans text-[10px] tracking-widest text-white/50 uppercase mt-2 leading-relaxed max-w-md text-left">
                               Expanding beyond creator content to deliver premium visual identities and commercial edits for brands, restaurants, and high-profile collaborations.
                            </p>
                         </div>

                         <div className="flex flex-col gap-2">
                            <span className="font-sans font-bold text-sm tracking-widest uppercase text-white">Freelance & Creators</span>
                            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#8fb3d9]">Professional Era</span>
                            <p className="font-sans text-[10px] tracking-widest text-white/50 uppercase mt-2 leading-relaxed max-w-md text-left">
                               Transitioned into full-time freelancing, partnering directly with content creators to craft high-retention, highly engaging visual narratives.
                            </p>
                         </div>
                         
                         <div className="flex flex-col gap-2">
                            <span className="font-sans font-bold text-sm tracking-widest uppercase text-white">Instagram Content Creation</span>
                            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#8fb3d9]">Upskilling & Discovery</span>
                            <p className="font-sans text-[10px] tracking-widest text-white/50 uppercase mt-2 leading-relaxed max-w-md text-left">
                               Launched personal content on Instagram, using the platform as a crucible to rapidly upskill advanced editing techniques and forge a unique visual style.
                            </p>
                         </div>

                         <div className="flex flex-col gap-2">
                            <span className="font-sans font-bold text-sm tracking-widest uppercase text-white">The Origins</span>
                            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#8fb3d9]">Gaming YouTube Channel</span>
                            <p className="font-sans text-[10px] tracking-widest text-white/50 uppercase mt-2 leading-relaxed max-w-md text-left">
                               Where it all began. Started by making edits for myself and friends, sparking an absolute obsession with visual storytelling that hasn't stopped since.
                            </p>
                         </div>
                      </div>
                   </div>
                </div>
             </motion.div>
          </div>
       </section>

       {/* PROJECTS SECTION */}
       <section id="projects" className="min-h-screen relative flex flex-col items-center px-6 py-32 z-20">
          {/* Ambient Glow */}
          <div className="absolute top-[20%] left-[-10%] w-[30rem] md:w-[50rem] h-[30rem] md:h-[50rem] bg-[#0B3A60]/30 rounded-full blur-[150px] pointer-events-none z-0" />
          <div className="absolute bottom-[10%] right-[-10%] w-[30rem] md:w-[50rem] h-[30rem] md:h-[50rem] bg-[#1a0b2e]/40 rounded-full blur-[150px] pointer-events-none z-0" />

          <div className="w-full max-w-[90rem] flex flex-col items-center relative z-10">
             <motion.h2 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
               className="font-sans font-black text-5xl md:text-7xl tracking-tighter uppercase text-white mb-4 text-center"
             >
                Recap Project <span className="font-instrument italic font-light text-white/70">Archive</span>
             </motion.h2>
             <motion.span 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
               className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/50 mb-20 text-center"
             >
                No AI / Pure Craft
             </motion.span>

             {/* Shorts 3D Coverflow */}
             <div className="w-full mb-32 flex flex-col items-center">
                <div className="flex items-center gap-4 mb-10 w-full max-w-7xl">
                   <div className="w-2 h-2 bg-white" />
                   <h3 className="font-sans font-bold text-xl tracking-widest text-white uppercase">Short-Form</h3>
                </div>
                <ShortsCarousel videos={shortVideos} onPlay={setActiveVideo} globalActiveAudioUrl={globalActiveAudioUrl} setGlobalActiveAudioUrl={setGlobalActiveAudioUrl} />
             </div>

             {/* Commercial Masonry */}
             <div className="w-full mb-10 flex flex-col items-center">
                <div className="flex items-center gap-4 mb-10 w-full max-w-7xl">
                   <div className="w-2 h-2 bg-white" />
                   <h3 className="font-sans font-bold text-xl tracking-widest text-white uppercase">Commercial / Ads</h3>
                </div>
                <div className="w-full max-w-7xl">
                   <CommercialMasonry videos={commercialVideos} onPlay={setActiveVideo} globalActiveAudioUrl={globalActiveAudioUrl} setGlobalActiveAudioUrl={setGlobalActiveAudioUrl} />
                </div>
             </div>
          </div>
       </section>

       {/* CONTACT SECTION */}
       <section id="contact" className="min-h-screen w-full relative flex items-center justify-center px-6 py-20 z-10 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] md:w-[60rem] md:h-[60rem] bg-[#0B3A60]/30 rounded-full blur-[150px] pointer-events-none" />
          
          {/* Abstract Hand & Film Strip Mockup */}
          <div className="absolute -bottom-10 right-[-10%] w-[60vw] h-[60vh] opacity-60 mix-blend-screen pointer-events-none z-10">
             {/* Creating an abstract mockup that feels similar to a hand/filmstrip layout visually */}
             <div className="absolute bottom-20 right-[30%] w-[300px] h-[300px] rounded-full border-b-[20px] border-l-[20px] border-dashed border-white/20 rotate-45" />
             <div className="absolute bottom-40 right-[20%] w-[200px] h-[40px] bg-white/20 rounded-full rotate-[-20deg] blur-[2px]" />
          </div>

          {/* --- DESKTOP CONTACT --- */}
          <div className="hidden lg:flex w-full max-w-[90rem] flex-row items-center justify-between gap-16 relative z-30 pt-20">
             <div className="flex flex-row items-start gap-16">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center relative group cursor-pointer"
                >
                   <span className="absolute -top-16 font-sans font-bold text-2xl tracking-[0.3em] uppercase text-white whitespace-nowrap">Contact Me</span>
                   
                   <div className="w-80 h-80 rounded-full border-4 border-white/5 overflow-hidden relative shadow-[0_0_60px_rgba(0,0,0,0.8)] z-20">
                      <img src="https://res.cloudinary.com/adwbvkcv/image/upload/v1785480957/IMG_20260731_122249_skt8t3.png" className="absolute inset-0 w-full h-full object-cover scale-110 grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000" />
                   </div>
                   
                   <div className="mt-8 text-center font-sans font-bold text-sm tracking-widest text-white uppercase">
                      Abhi<br/><span className="text-white/50 text-[10px]">21</span>
                   </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-8 mt-20"
                >
                   <div className="flex items-center gap-4 hover:text-white cursor-pointer transition-colors text-white/70 font-sans text-xs tracking-widest uppercase">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">Ig</div>
                      @7pixels.xyz
                   </div>
                   <div className="flex items-center gap-4 hover:text-white cursor-pointer transition-colors text-white/70 font-sans text-xs tracking-widest uppercase">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">Tk</div>
                      @7pixels_edit
                   </div>
                   <div className="flex items-center gap-4 hover:text-white cursor-pointer transition-colors text-white/70 font-sans text-xs tracking-widest uppercase">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">Yt</div>
                      Abhi Creates
                   </div>
                   <div className="flex items-center gap-4 hover:text-white cursor-pointer transition-colors text-white/70 font-sans text-xs tracking-widest uppercase">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">Pt</div>
                      Abhi
                   </div>
                </motion.div>
             </div>

             <motion.div 
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
               className="flex flex-col items-end text-right"
             >
                <h2 className="font-sans font-black text-[11rem] leading-[0.8] tracking-tighter uppercase text-white drop-shadow-2xl">
                   THANK<br/>YOU
                </h2>
                <span className="font-instrument italic font-black text-[5rem] text-white/80 pr-4 mt-2">For Watching</span>
             </motion.div>
          </div>

          <div className="hidden lg:flex absolute bottom-16 left-16 gap-6 z-40">
             <div className="w-48 h-32 bg-[#010a17] border border-white/10 rounded-xl shadow-2xl p-5 flex flex-col justify-between hover:scale-105 transition-transform cursor-pointer">
                <span className="font-sans font-bold text-xs text-white tracking-widest">PORTFOLIO.</span>
                <span className="font-sans text-[10px] text-white/50 text-right">2024</span>
             </div>
             <div className="w-48 h-32 bg-gradient-to-br from-[#111] to-black border border-white/10 rounded-xl shadow-2xl p-5 flex flex-col justify-between hover:scale-105 transition-transform cursor-pointer relative overflow-hidden">
                <div className="absolute right-[-10px] bottom-[-10px] w-20 h-20 bg-yellow-600/20 rounded-full blur-xl" />
                <span className="font-sans font-bold text-xs text-white tracking-widest">DESIGN<br/>PORTFOLIO</span>
                <span className="font-sans text-[10px] text-white/50 text-right">2024</span>
             </div>
          </div>

          {/* --- MOBILE CONTACT --- */}
          <div className="flex lg:hidden w-full flex-col items-center justify-center gap-16 relative z-30 pt-10">
             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
               className="flex flex-col items-center text-center"
             >
                <h2 className="font-sans font-black text-[6rem] leading-[0.8] tracking-tighter uppercase text-white drop-shadow-2xl">
                   THANK<br/>YOU
                </h2>
                <span className="font-instrument italic font-black text-4xl text-white/80 mt-2">For Watching</span>
             </motion.div>

             <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 1.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
               className="flex flex-col items-center relative mt-6"
             >
                <span className="absolute -top-10 font-sans font-bold text-lg tracking-[0.3em] uppercase text-white whitespace-nowrap">Contact Me</span>
                <div className="w-56 h-56 rounded-full border-2 border-white/5 overflow-hidden relative shadow-[0_0_40px_rgba(0,0,0,0.8)] z-20">
                   <MobileScrollPortrait src="https://res.cloudinary.com/adwbvkcv/image/upload/v1785480957/IMG_20260731_122249_skt8t3.png" className="absolute inset-0 w-full h-full object-cover scale-110" />
                </div>
                <div className="mt-6 text-center font-sans font-bold text-xs tracking-widest text-white uppercase">
                   Abhi<br/><span className="text-white/50 text-[9px]">21</span>
                </div>
             </motion.div>

             <div className="flex flex-wrap justify-center gap-6 w-full max-w-sm">
                <div className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors text-white/70 font-sans text-[9px] tracking-widest uppercase">
                   <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">Ig</div>
                </div>
                <div className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors text-white/70 font-sans text-[9px] tracking-widest uppercase">
                   <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">Tk</div>
                </div>
                <div className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors text-white/70 font-sans text-[9px] tracking-widest uppercase">
                   <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">Yt</div>
                </div>
                <div className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors text-white/70 font-sans text-[9px] tracking-widest uppercase">
                   <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">Pt</div>
                </div>
             </div>

             <div className="flex gap-4 z-40 mt-4">
                <div className="w-36 h-24 bg-[#010a17] border border-white/10 rounded-xl shadow-2xl p-4 flex flex-col justify-between">
                   <span className="font-sans font-bold text-[10px] text-white tracking-widest">PORTFOLIO.</span>
                   <span className="font-sans text-[8px] text-white/50 text-right">2024</span>
                </div>
                <div className="w-36 h-24 bg-gradient-to-br from-[#111] to-black border border-white/10 rounded-xl shadow-2xl p-4 flex flex-col justify-between relative overflow-hidden">
                   <div className="absolute right-[-10px] bottom-[-10px] w-16 h-16 bg-yellow-600/20 rounded-full blur-xl" />
                   <span className="font-sans font-bold text-[10px] text-white tracking-widest">DESIGN<br/>PORTFOLIO</span>
                   <span className="font-sans text-[8px] text-white/50 text-right">2024</span>
                </div>
             </div>
          </div>
       </section>

      <VideoModal videoUrl={activeVideo} onClose={() => setActiveVideo(null)} />
    </motion.main>
  );
}
