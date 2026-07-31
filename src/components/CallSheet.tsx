'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/components/ThemeProvider';

const WebDesignFooter = () => {
  const { theme } = useTheme();
  const isNight = theme === 'night';

  const bgColor = isNight ? 'bg-[#1b3f55]' : 'bg-[#fcfbfa]';
  const textColor = isNight ? 'text-[#f4ece3]' : 'text-[#1b3f55]';
  const mutedText = isNight ? 'text-[#f4ece3]/50' : 'text-[#1b3f55]/50';
  const borderLight = isNight ? 'border-[#f4ece3]/10' : 'border-[#1b3f55]/10';
  const borderMedium = isNight ? 'border-[#f4ece3]/20' : 'border-[#1b3f55]/20';
  const borderHeavy = isNight ? 'border-[#f4ece3]/30' : 'border-[#1b3f55]/30';
  const gridLine = isNight ? 'rgba(255,255,255,0.1)' : 'rgba(27,63,85,0.05)';

  return (
    <div className="w-full bg-transparent px-0 pt-12 md:pt-24 z-50 relative">
      <footer className={`w-full ${bgColor} transition-colors duration-700 rounded-t-[2rem] md:rounded-t-[3rem] ${textColor} flex flex-col items-center justify-between pt-16 md:pt-32 pb-8 px-6 md:px-12 relative overflow-hidden shadow-2xl`}>
        
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 opacity-[0.5] pointer-events-none transition-opacity duration-700" style={{ backgroundImage: `linear-gradient(${gridLine} 1px, transparent 1px), linear-gradient(90deg, ${gridLine} 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

        {/* Top Indicator */}
        <div className="relative z-10 flex flex-col items-center mb-16 md:mb-24">
          <div className={`w-px h-16 md:h-24 bg-gradient-to-b from-transparent ${isNight ? 'to-[#f4ece3]/30' : 'to-[#1b3f55]/30'} mb-6 transition-colors duration-700`} />
          <span className={`font-mono text-[9px] md:text-xs uppercase tracking-[0.4em] ${mutedText} transition-colors duration-700`}>
            // End of File
          </span>
        </div>

        {/* Huge INITIALIZE Text */}
        <div className="relative z-10 text-center mb-16 md:mb-24">
           <Link href="/contact" className="group">
             <h2 className={`font-cormorant text-6xl md:text-[8rem] lg:text-[10rem] uppercase tracking-tight leading-none ${textColor} group-hover:opacity-70 transition-opacity duration-500 drop-shadow-sm`}>
               Initialize
             </h2>
           </Link>
        </div>

        {/* The Squiggly Box Logo */}
        <div className="relative z-10 flex flex-col items-center justify-center mb-24 md:mb-32">
           <span className={`font-mono text-[8px] uppercase tracking-[0.3em] ${mutedText} mb-3 transition-colors duration-700`}>Brand_Asset_Primary.svg</span>
           <div className={`relative flex items-center justify-center px-12 py-8 border ${borderHeavy} rounded-sm transform rotate-1 group hover:${borderMedium} transition-colors cursor-pointer ${isNight ? 'bg-white/[0.01]' : 'bg-black/[0.01]'} backdrop-blur-sm`}>
              {/* Fake hand-drawn border effect */}
              <div className={`absolute inset-0 border ${borderMedium} rounded-md transform -rotate-2 scale-[1.02] pointer-events-none transition-transform group-hover:-rotate-1`} />
              <div className={`absolute inset-0 border ${borderLight} rounded-lg transform rotate-2 scale-[1.05] pointer-events-none transition-transform group-hover:rotate-1`} />
              
              <h3 className={`font-sans font-black text-4xl md:text-6xl tracking-tighter ${textColor} drop-shadow-md transition-colors duration-700`}>
                7pixels
              </h3>
              
              <div className={`absolute -right-8 md:-right-12 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 rounded-full border ${borderHeavy} flex items-center justify-center transition-colors duration-700`}>
                 <div className={`w-1 h-1 ${isNight ? 'bg-[#f4ece3]/50 group-hover:bg-[#f4ece3]' : 'bg-[#1b3f55]/50 group-hover:bg-[#1b3f55]'} rounded-full transition-colors`} />
              </div>
           </div>
        </div>

        {/* Footer Bottom Row */}
        <div className={`relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-8 pt-8 border-t ${borderLight} font-mono text-[8px] md:text-[9px] uppercase tracking-[0.2em] ${mutedText} transition-colors duration-700`}>
           
           {/* Left Terminal Box */}
           <div className={`border ${borderMedium} p-4 rounded-sm flex items-start gap-3 max-w-xs ${isNight ? 'bg-[#f4ece3]/[0.02]' : 'bg-[#1b3f55]/[0.02]'} w-full lg:w-auto relative transform -rotate-1 group hover:rotate-0 transition-transform cursor-crosshair`}>
             <div className={`absolute inset-0 border ${borderLight} transform rotate-2 rounded-sm pointer-events-none group-hover:rotate-0 transition-transform`} />
             <div className={`w-1.5 h-1.5 rounded-full ${isNight ? 'bg-[#f4ece3]/80' : 'bg-[#1b3f55]/80'} mt-1 animate-pulse flex-shrink-0 transition-colors duration-700`} />
             <p className="leading-relaxed">
               SYSTEM ERROR: <br />
               OFFSEQUENCE DETECTED... <br />
               AWAITING CLIENT DECISION_
             </p>
           </div>

           {/* Center Info */}
           <div className="flex flex-col md:flex-row items-center gap-6 md:gap-16 text-center">
             <span>Server Status: Active / {new Date().getFullYear()}</span>
             
             <div className="flex items-center gap-6">
                <Link href="#" className={`hover:${textColor} transition-colors`}>Instagram</Link>
                <Link href="#" className={`hover:${textColor} transition-colors`}>Twitter</Link>
                <Link href="#" className={`hover:${textColor} transition-colors`}>LinkedIn</Link>
             </div>
           </div>

           {/* Right Info */}
           <div className="flex items-center gap-4">
             <div className={`w-px h-8 ${borderMedium} hidden md:block transition-colors duration-700`} />
             <span className="text-center md:text-right">Compiled with<br className="md:hidden" /> absolute strictness.</span>
           </div>

        </div>
      </footer>
    </div>
  );
};

const GlobalFooter = () => {
  const { theme } = useTheme();
  const isNight = theme === 'night';
  
  const bgColor = isNight ? 'bg-[#050505]' : 'bg-[#fcfbfa]';
  const textColor = isNight ? 'text-white/90' : 'text-[#0a0a0a]';
  const textHover = isNight ? 'group-hover:text-white' : 'group-hover:text-[#000000]';
  const mutedText = isNight ? 'text-white/50' : 'text-[#0a0a0a]/50';
  const mutedTextMedium = isNight ? 'text-white/60' : 'text-[#0a0a0a]/60';
  const borderColor = isNight ? 'border-white/10' : 'border-[#0a0a0a]/10';
  const borderHover = isNight ? 'hover:border-white/50' : 'hover:border-[#0a0a0a]/50';
  const underlineColor = isNight ? 'bg-white' : 'bg-[#0a0a0a]';
  const orbColor = isNight ? 'bg-white/5' : 'bg-[#0a0a0a]/5';
  const hoverBg = isNight ? 'bg-white/10' : 'bg-[#0a0a0a]/10';
  const indicatorLine = isNight ? 'to-white/30' : 'to-[#0a0a0a]/30';

  return (
    <div className="w-full bg-transparent px-0 pt-12 md:pt-24 z-50 relative">
      <footer className={`w-full ${bgColor} transition-colors duration-700 rounded-t-[2rem] md:rounded-t-[3rem] ${textColor} flex flex-col items-center justify-between pt-16 md:pt-32 pb-8 px-6 md:px-12 relative overflow-hidden shadow-2xl`}>
        
        {/* Subtle glowing orb in background */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] ${orbColor} rounded-full blur-[120px] pointer-events-none transition-colors duration-700`} />

        {/* Top Indicator */}
        <div className="relative z-10 flex flex-col items-center mb-12 md:mb-20">
          <div className={`w-px h-16 md:h-24 bg-gradient-to-b from-transparent ${indicatorLine} mb-6 transition-colors duration-700`} />
          <span className={`font-mono text-[9px] md:text-xs uppercase tracking-[0.4em] ${mutedText} transition-colors duration-700`}>
            Next Chapter
          </span>
        </div>

        {/* Huge CTA Text */}
        <div className="relative z-10 text-center mb-16 md:mb-24 w-full flex flex-col items-center">
           <Link href="/contact" className="group relative block w-max mx-auto">
             <h2 className={`font-sans font-black text-[12vw] leading-none uppercase tracking-tighter ${textColor} ${textHover} transition-colors duration-500`}>
               Let's Talk
             </h2>
             {/* Animated Underline */}
             <span className={`absolute -bottom-4 left-0 w-0 h-[2px] ${underlineColor} transition-all duration-700 group-hover:w-full`} />
           </Link>
           <p className={`mt-8 font-cormorant italic text-2xl md:text-4xl ${mutedTextMedium} tracking-wide transition-colors duration-700`}>
             Available for new projects.
           </p>
        </div>

        {/* Brand Asset */}
        <div className="relative z-10 flex flex-col items-center justify-center mb-20 md:mb-32">
           <div className={`w-16 h-16 md:w-24 md:h-24 border ${borderColor} rounded-full flex items-center justify-center relative group overflow-hidden cursor-pointer ${borderHover} transition-colors duration-700`}>
              <span className={`font-sans font-black text-xl md:text-3xl tracking-tighter uppercase relative z-10 group-hover:scale-110 transition-transform duration-500`}>
                A.
              </span>
              <div className={`absolute inset-0 ${hoverBg} translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]`} />
           </div>
        </div>

        {/* Footer Bottom Row */}
        <div className={`relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-8 pt-8 border-t ${borderColor} font-mono text-[8px] md:text-[9px] uppercase tracking-[0.2em] ${mutedText} transition-colors duration-700`}>
           
           <div className="flex items-center gap-3">
             <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
             <p>Systems Online / {new Date().getFullYear()}</p>
           </div>

           <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
              <Link href="#" className={`${textHover} transition-colors`}>Instagram</Link>
              <Link href="#" className={`${textHover} transition-colors`}>Twitter</Link>
              <Link href="#" className={`${textHover} transition-colors`}>LinkedIn</Link>
              <Link href="#" className={`${textHover} transition-colors`}>Vimeo</Link>
           </div>

           <div className="text-center md:text-right">
             <p>© Abhi Portfolio. Crafted with precision.</p>
           </div>

        </div>
      </footer>
    </div>
  );
};

export default function CallSheet() {
  const pathname = usePathname();
  
  // The video editing and web designing pages have their own customized built-in footers
  if (pathname === '/niche/video-editing' || pathname === '/niche/web-designing') {
    return null;
  }
  
  return <GlobalFooter />;
}
