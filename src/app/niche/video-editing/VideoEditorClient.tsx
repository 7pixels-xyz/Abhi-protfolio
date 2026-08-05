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

const dummyLongform: string[] = [];
const commercialVideos = [
  "https://res.cloudinary.com/adwbvkcv/video/upload/v1785412928/tapiocha_bun_alglt1.mp4",
  "https://res.cloudinary.com/adwbvkcv/video/upload/v1785413148/Tapiocha_cbgqu4.mp4",
  "https://res.cloudinary.com/adwbvkcv/video/upload/v1785413202/1_lycgei.mp4",
  "https://res.cloudinary.com/adwbvkcv/video/upload/v1785413211/2_ibf5ll.mp4",
  "https://res.cloudinary.com/adwbvkcv/video/upload/v1785413214/3_fgihsd.mp4"
];
const commercialVideoMeta: { title: string; client: string }[] = [
  { title: "Taste of Tapiocha", client: "Tapiocha Buns Â· Food Brand" },
  { title: "The Perfect Bite", client: "Tapiocha Buns Â· Product Ad" },
  { title: "Urban Vibes", client: "Brand Campaign Â· 2024" },
  { title: "Studio Sessions", client: "Creator Content Â· 2024" },
  { title: "Golden Hour", client: "Lifestyle Brand Â· 2024" },
];
const dummyColor: string[] = [];

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
          <div className={`flex flex-col gap-1 transition-transform duration-500 ${shouldPlay ? 'translate-y-0' : 'translate-y-4'}`}>
             <span className="font-sans text-[10px] tracking-[0.2em] text-[#00ff88] uppercase">{commercialVideoMeta[index]?.client ?? 'Commercial Â· 2024'}</span>
             <span className="font-cormorant italic text-2xl md:text-3xl text-white truncate">{commercialVideoMeta[index]?.title ?? 'Brand Edit'}</span>
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
         <a href="#profile" className="px-6 py-2 rounded-full bg-[#8fb3d9] text-[#010B19] font-bold text-[10px] tracking-widest uppercase transition-colors">Who I Am</a>
         <a href="#projects" className="px-6 py-2 rounded-full text-white/50 hover:text-white font-bold text-[10px] tracking-widest uppercase transition-colors">My Work</a>
         <a href="#contact" className="px-6 py-2 rounded-full text-white/50 hover:text-white font-bold text-[10px] tracking-widest uppercase transition-colors">Hire Me</a>
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
               className="flex flex-col items-center md:items-end justify-center gap-4 mb-16 pointer-events-auto"
             >
                <h1 className="flex flex-col text-center md:text-right font-sans font-black text-[5.5rem] lg:text-[7rem] leading-[0.85] tracking-tighter uppercase text-white drop-shadow-2xl">
                   <span>VIDEO</span>
                   <span>EDITOR</span>
                </h1>
                <span className="font-instrument italic font-normal text-3xl lg:text-4xl text-white/70 text-center md:text-right leading-snug max-w-xs md:max-w-sm">for Brands &amp; Content Creators</span>
             </motion.div>

             {/* Stats Row */}
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
               className="flex items-center gap-8 mb-10 pointer-events-auto"
             >
               <div className="flex flex-col gap-1">
                 <span className="font-sans font-black text-2xl text-white">600K+</span>
                 <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-white/50">Views Generated</span>
               </div>
               <div className="w-[1px] h-10 bg-white/20" />
               <div className="flex flex-col gap-1">
                 <span className="font-sans font-black text-2xl text-white">4.8Ã—</span>
                 <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-white/50">Avg. Engagement Rate</span>
               </div>
               <div className="w-[1px] h-10 bg-white/20" />
               <div className="flex flex-col gap-1">
                 <span className="font-sans font-black text-2xl text-white">5+</span>
                 <span className="font-sans text-[9px] tracking-[0.2em] uppercase text-white/50">Years of Experience</span>
               </div>
             </motion.div>

             <div className="flex items-center gap-4 mb-28 pointer-events-auto">
                <div className="w-2.5 h-2.5 bg-[#00ff88] rounded-full animate-pulse" />
                <span className="font-sans text-sm tracking-[0.4em] uppercase text-[#00ff88] font-bold">Available for Hire</span>
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
               className="flex flex-col items-center gap-3 mb-6 w-full"
             >
                <h1 className="flex flex-col text-center font-sans font-black text-[4.5rem] leading-[0.85] tracking-tighter uppercase text-white drop-shadow-2xl">
                   <span>VIDEO</span>
                   <span>EDITOR</span>
                </h1>
                <span className="font-instrument italic font-normal text-2xl text-white/70 mt-1 text-center px-4">for Brands &amp; Content Creators</span>
             </motion.div>

             {/* Mobile Stats */}
             <div className="flex items-center gap-5 mb-6">
               <div className="flex flex-col items-center gap-0.5">
                 <span className="font-sans font-black text-xl text-white">600K+</span>
                 <span className="font-sans text-[8px] tracking-widest uppercase text-white/50">Views</span>
               </div>
               <div className="w-[1px] h-8 bg-white/20" />
               <div className="flex flex-col items-center gap-0.5">
                 <span className="font-sans font-black text-xl text-white">4.8Ã—</span>
                 <span className="font-sans text-[8px] tracking-widest uppercase text-white/50">Engagement</span>
               </div>
               <div className="w-[1px] h-8 bg-white/20" />
               <div className="flex flex-col items-center gap-0.5">
                 <span className="font-sans font-black text-xl text-white">5+</span>
                 <span className="font-sans text-[8px] tracking-widest uppercase text-white/50">Years</span>
               </div>
             </div>

             <div className="flex items-center gap-2 mb-8">
                <div className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse" />
                <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-[#00ff88] font-bold">Available for Hire</span>
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
                
                {/* Ambient glow behind photo */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#7A0C16]/30 rounded-full blur-[80px] z-10 pointer-events-none" />
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
                
                {/* Ambient glow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#7A0C16]/20 rounded-full blur-[60px] z-10 pointer-events-none" />
             </motion.div>
             
             {/* Right Content */}
             <motion.div 
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-10%" }}
               transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
               className="w-full lg:w-1/2 flex flex-col justify-center py-10 lg:py-20 gap-10 lg:gap-14 relative z-30"
             >
                {/* WHO AM I */}
                <div className="w-full max-w-2xl text-center lg:text-left px-4 lg:px-0">
                   <span className="font-sans text-[10px] tracking-[0.3em] text-[#8fb3d9] uppercase mb-3 block">Who Am I</span>
                   <h2 className="font-sans font-black text-4xl lg:text-5xl tracking-tighter uppercase text-white mb-4">Abhi.<br/><span className="font-instrument italic font-light text-white/60 text-3xl lg:text-4xl">Creative Director</span></h2>
                   <p className="font-sans text-sm text-white/60 leading-relaxed">
                     I started editing for a gaming channel 5 years ago and never stopped. Today, I craft videos for brands and creators that are designed to stop the scroll, hold attention, and drive results â€” 600K+ views and counting.
                   </p>
                </div>

                {/* EXPERIENCE */}
                <div className="w-full max-w-2xl px-4 lg:px-0">
                   <span className="font-sans text-[10px] tracking-[0.3em] text-[#8fb3d9] uppercase mb-5 block">Experience</span>
                   <div className="flex flex-col gap-0 border-l-2 border-[#7A0C16]/40 pl-6">
                     {[
                       { year: "2024 â€” Now", role: "Creative Director & Lead Editor", desc: "Brands, Restaurants & Commercial Campaigns" },
                       { year: "2022 â€” 2024", role: "Freelance Video Editor", desc: "Content Creators & Influencers (100K+)" },
                       { year: "2021 â€” 2022", role: "Social Media Editor", desc: "Instagram Reels & YouTube Shorts" },
                       { year: "2019 â€” 2021", role: "Self-Taught Origins", desc: "Gaming YouTube â€” Where it all began." },
                     ].map((item, i) => (
                       <motion.div 
                         key={i}
                         initial={{ opacity: 0, x: -10 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         viewport={{ once: true }}
                         transition={{ duration: 0.6, delay: i * 0.1 }}
                         className="flex flex-col gap-0.5 py-4 border-b border-white/5 last:border-b-0 group"
                       >
                         <span className="font-sans text-[10px] text-[#8fb3d9] tracking-widest">{item.year}</span>
                         <span className="font-sans font-bold text-sm text-white group-hover:text-[#8fb3d9] transition-colors">{item.role}</span>
                         <span className="font-sans text-xs text-white/40">{item.desc}</span>
                       </motion.div>
                     ))}
                   </div>
                </div>

                {/* SPECIALTY */}
                <div className="w-full max-w-2xl px-4 lg:px-0">
                   <span className="font-sans text-[10px] tracking-[0.3em] text-[#8fb3d9] uppercase mb-5 block">Specialty</span>
                   <div className="grid grid-cols-3 gap-3">
                     {[
                       { icon: "âš¡", label: "Short-Form", sub: "Reels & TikTok" },
                       { icon: "ðŸŽ¬", label: "Commercial", sub: "Brand Ads" },
                       { icon: "ðŸŽž", label: "Cinematic", sub: "Long-Form" },
                       { icon: "ðŸŽ¨", label: "Motion", sub: "Graphics" },
                       { icon: "ðŸŽ™", label: "Podcasts", sub: "Video Editing" },
                       { icon: "ðŸ½", label: "Restaurant", sub: "Content" },
                     ].map((s, i) => (
                       <div key={i} className="flex flex-col gap-1 p-3 border border-white/10 rounded-xl hover:border-[#8fb3d9]/40 hover:bg-white/5 transition-all cursor-default">
                         <span className="text-lg">{s.icon}</span>
                         <span className="font-sans font-bold text-[10px] text-white tracking-widest uppercase">{s.label}</span>
                         <span className="font-sans text-[9px] text-white/40">{s.sub}</span>
                       </div>
                     ))}
                   </div>
                </div>

                {/* SOFTWARE SKILLS */}
                <div className="w-full max-w-2xl flex flex-col items-center lg:items-start px-4 lg:px-0">
                   <span className="font-sans text-[10px] tracking-[0.3em] text-[#8fb3d9] uppercase mb-5 block">Tools</span>
                   <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 lg:gap-4">
                      <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl bg-gradient-to-br from-[#1a0033] to-black border border-[#ea77ff]/30 flex items-center justify-center font-bold text-[#ea77ff] text-base shadow-[0_0_20px_rgba(234,119,255,0.15)]">Pr</div>
                      <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl bg-[#000033] border border-[#3399ff]/30 flex items-center justify-center font-bold text-[#3399ff] text-base shadow-[0_0_20px_rgba(51,153,255,0.15)]">Ps</div>
                      <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl bg-[#001133] border border-[#66ccff]/30 flex items-center justify-center font-bold text-[#66ccff] text-base shadow-[0_0_20px_rgba(102,204,255,0.15)]">Lr</div>
                      <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl bg-white border border-white/20 flex items-center justify-center p-2.5 shadow-[0_0_20px_rgba(255,255,255,0.1)]"><img src="/images/capcut.png" className="w-full h-full object-contain filter invert" /></div>
                      <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl bg-[#111] border border-white/20 flex items-center justify-center p-2.5 shadow-[0_0_20px_rgba(255,255,255,0.1)]"><img src="/images/davinci.png" className="w-full h-full object-contain" /></div>
                   </div>
                </div>

                {/* CLIENTS */}
                <div className="w-full max-w-2xl px-4 lg:px-0">
                   <span className="font-sans text-[10px] tracking-[0.3em] text-[#8fb3d9] uppercase mb-5 block">Clients &amp; Brands</span>
                   <div className="flex flex-wrap gap-3">
                     {["Tapiocha Buns", "Restaurant Chains", "Content Creators", "Fashion Brands", "Fitness Influencers", "Digital Agencies"].map((c) => (
                       <span key={c} className="px-4 py-2 border border-white/10 rounded-full font-sans text-[10px] text-white/60 tracking-widest hover:border-[#8fb3d9]/50 hover:text-white transition-all cursor-default">{c}</span>
                     ))}
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

       {/* TESTIMONIALS SECTION */}
       <section className="w-full relative py-32 px-6 md:px-12 z-10 bg-[#010610] border-t border-white/5 overflow-hidden">
          <div className="absolute top-0 left-[30%] w-[40rem] h-[40rem] bg-[#0B3A60]/20 rounded-full blur-[150px] pointer-events-none" />
          
          <div className="max-w-[90rem] mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2 }}
              className="mb-16 md:mb-20 text-center"
            >
              <span className="font-sans text-[10px] tracking-[0.4em] text-[#8fb3d9] uppercase block mb-4">What Clients Say</span>
              <h2 className="font-sans font-black text-5xl md:text-7xl tracking-tighter uppercase text-white">
                Client <span className="font-instrument italic font-light text-white/60">Reviews</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Riya Sharma",
                  role: "Lifestyle Creator Â· 180K followers",
                  quote: "Hands down the best editor I've ever worked with. Abhi doesn't just cut clips â€” he tells a story. My reel views tripled after we started working together.",
                  rating: 5,
                  initials: "RS",
                  color: "#7A0C16"
                },
                {
                  name: "Manav Kapoor",
                  role: "Fitness Brand Founder",
                  quote: "The commercial Abhi edited for our product launch got us a 4.9x engagement rate. Our team was absolutely blown away. Will 100% work with him again.",
                  rating: 5,
                  initials: "MK",
                  color: "#0B3A60"
                },
                {
                  name: "Sneha Patel",
                  role: "Food & Restaurant Creator Â· 95K",
                  quote: "Abhi's edits for our restaurant content felt cinematic â€” like a movie. Our Instagram reach went up by 60% in just two months of collaboration.",
                  rating: 5,
                  initials: "SP",
                  color: "#1a4a1a"
                },
                {
                  name: "Arjun Mehta",
                  role: "Fashion Influencer Â· 220K followers",
                  quote: "Every single video he delivers is premium quality. The pacing, the cuts, the color â€” everything is dialed in perfectly. He understands the algorithm.",
                  rating: 5,
                  initials: "AM",
                  color: "#3a1a4a"
                },
                {
                  name: "Priya Nair",
                  role: "Digital Marketing Agency",
                  quote: "We hired Abhi for a full campaign series and he delivered all 6 videos ahead of schedule, with zero revisions needed. That never happens. Truly talented.",
                  rating: 5,
                  initials: "PN",
                  color: "#4a2a0a"
                },
                {
                  name: "Kunal Singh",
                  role: "YouTube Creator Â· 500K subscribers",
                  quote: "The retention on my long-form videos went from 38% to 61% after Abhi started editing. That's the real metric. If you want results, he's your guy.",
                  rating: 5,
                  initials: "KS",
                  color: "#0a2a4a"
                }
              ].map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex flex-col gap-5 p-7 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-white/20 hover:bg-white/[0.06] transition-all duration-500 group"
                >
                  {/* Quote mark */}
                  <div className="text-5xl font-serif text-white/10 leading-none -mb-2">"</div>
                  
                  {/* Stars */}
                  <div className="flex gap-1">
                    {Array(t.rating).fill(0).map((_, si) => (
                      <svg key={si} width="14" height="14" viewBox="0 0 24 24" fill="#FFD700" className="drop-shadow-[0_0_4px_rgba(255,215,0,0.5)]"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="font-sans text-sm text-white/75 leading-relaxed flex-1">"{t.quote}"</p>
                  
                  {/* Client */}
                  <div className="flex items-center gap-4 pt-4 border-t border-white/8">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-sans font-black text-xs text-white" style={{ backgroundColor: t.color }}>
                      {t.initials}
                    </div>
                    <div>
                      <span className="font-sans font-bold text-sm text-white block">{t.name}</span>
                      <span className="font-sans text-[10px] text-[#8fb3d9] tracking-wider">{t.role}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
       </section>

       {/* CONTACT SECTION */}
       <section id="contact" className="w-full relative py-32 px-6 md:px-12 z-10 bg-[#010409] border-t border-white/5 overflow-hidden">
          <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] md:w-[60rem] md:h-[60rem] bg-[#0B3A60]/20 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute top-0 left-0 w-[30rem] h-[30rem] bg-[#7A0C16]/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-[90rem] mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              
              {/* Left: CTA */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-8"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 bg-[#00ff88] rounded-full animate-pulse" />
                  <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-[#00ff88] font-bold">Available for Hire</span>
                </div>
                <h2 className="font-sans font-black text-6xl md:text-8xl tracking-tighter uppercase text-white leading-[0.85]">
                  Let's<br/>
                  <span className="font-instrument italic font-light text-white/60">create</span><br/>
                  something.
                </h2>
                <p className="font-sans text-sm text-white/50 leading-relaxed max-w-sm">
                  I'm open to freelance projects, long-term brand collaborations, and full-time opportunities. Let's talk.
                </p>

                {/* Contact Details */}
                <div className="flex flex-col gap-4 mt-2">
                  <a href="tel:+917087143455" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#7A0C16] group-hover:border-[#7A0C16] transition-all duration-300">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/60 group-hover:text-white transition-colors"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.63 4.87a2 2 0 0 1 1.99-2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.72-.72a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </div>
                    <div>
                      <span className="font-sans text-[9px] text-white/30 tracking-widest uppercase block">Phone</span>
                      <span className="font-sans font-bold text-white group-hover:text-[#8fb3d9] transition-colors">+91 7087143455</span>
                    </div>
                  </a>
                  
                  <a href="mailto:agnt.abhi@gmail.com" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#7A0C16] group-hover:border-[#7A0C16] transition-all duration-300">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/60 group-hover:text-white transition-colors"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    </div>
                    <div>
                      <span className="font-sans text-[9px] text-white/30 tracking-widest uppercase block">Email</span>
                      <span className="font-sans font-bold text-white group-hover:text-[#8fb3d9] transition-colors">agnt.abhi@gmail.com</span>
                    </div>
                  </a>
                </div>

                {/* Direct CTA Button */}
                <a href="mailto:agnt.abhi@gmail.com" className="mt-2 inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-sans font-black text-sm tracking-widest uppercase rounded-full hover:bg-[#7A0C16] hover:text-white transition-all duration-300 w-fit group">
                  Send Me a Message
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </a>
              </motion.div>

              {/* Right: Photo + Socials */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="flex flex-col items-center lg:items-end gap-10"
              >
                {/* Profile Photo */}
                <div className="relative group">
                  <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.8)]">
                    <img 
                      src="https://res.cloudinary.com/adwbvkcv/image/upload/v1785480957/IMG_20260731_122249_skt8t3.png" 
                      className="w-full h-full object-cover scale-110 grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000"
                    />
                  </div>
                  <div className="mt-5 text-center lg:text-right">
                    <span className="font-sans font-black text-xl tracking-widest uppercase text-white block">Abhi</span>
                    <span className="font-instrument italic text-lg text-white/50">Creative Director Â· Video Editor</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex flex-col gap-4 w-full max-w-xs">
                  <a href="https://www.instagram.com/7pixels.xyz" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-4 px-5 py-4 border border-white/10 rounded-xl hover:border-[#8fb3d9]/40 hover:bg-white/5 transition-all group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#f09433] to-[#bc1888] flex items-center justify-center text-white font-bold text-xs">Ig</div>
                      <span className="font-sans text-xs text-white/70 group-hover:text-white transition-colors tracking-widest">@7pixels.xyz</span>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/30 group-hover:text-white transition-colors -rotate-45"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </a>
                  <a href="https://www.tiktok.com/@7pixels_edit" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-4 px-5 py-4 border border-white/10 rounded-xl hover:border-[#8fb3d9]/40 hover:bg-white/5 transition-all group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-black border border-white/20 flex items-center justify-center text-white font-bold text-xs">Tk</div>
                      <span className="font-sans text-xs text-white/70 group-hover:text-white transition-colors tracking-widest">@7pixels_edit</span>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/30 group-hover:text-white transition-colors -rotate-45"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </a>
                  <a href="https://www.youtube.com/@AbhiCreates" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-4 px-5 py-4 border border-white/10 rounded-xl hover:border-[#8fb3d9]/40 hover:bg-white/5 transition-all group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#FF0000] flex items-center justify-center text-white font-bold text-xs">Yt</div>
                      <span className="font-sans text-xs text-white/70 group-hover:text-white transition-colors tracking-widest">Abhi Creates</span>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/30 group-hover:text-white transition-colors -rotate-45"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Footer Bottom */}
            <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
              <span className="font-sans text-[10px] text-white/20 tracking-widest uppercase">Â© 2025 Abhi Â· Creative Director</span>
              <span className="font-sans text-[10px] text-white/20 tracking-widest uppercase">Built with passion Â· No AI edits.</span>
            </div>
          </div>
       </section>

      <VideoModal videoUrl={activeVideo} onClose={() => setActiveVideo(null)} />
    </motion.main>
  );
}


