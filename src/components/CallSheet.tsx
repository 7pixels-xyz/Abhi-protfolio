'use client';

import Link from 'next/link';

export default function CallSheet() {
  return (
    <div className="w-full bg-transparent px-2 md:px-4 pb-2 md:pb-4 pt-12 md:pt-24 z-50 relative">
      <footer className="w-full bg-[#1b3f55] rounded-[2rem] md:rounded-[3rem] text-[#f4ece3] flex flex-col items-center justify-between pt-16 md:pt-32 pb-8 px-6 md:px-12 relative overflow-hidden shadow-2xl">
        
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        {/* Top Indicator */}
        <div className="relative z-10 flex flex-col items-center mb-16 md:mb-24">
          <div className="w-px h-16 md:h-24 bg-gradient-to-b from-transparent to-[#f4ece3]/30 mb-6" />
          <span className="font-mono text-[9px] md:text-xs uppercase tracking-[0.4em] text-[#f4ece3]/50">
            // End of File
          </span>
        </div>

        {/* Huge INITIALIZE Text */}
        <div className="relative z-10 text-center mb-16 md:mb-24">
           <Link href="/contact" className="group">
             <h2 className="font-cormorant text-6xl md:text-[8rem] lg:text-[10rem] uppercase tracking-tight leading-none text-[#f4ece3] hover:text-white transition-colors duration-500 drop-shadow-sm">
               Initialize
             </h2>
           </Link>
        </div>

        {/* The Squiggly Box Logo */}
        <div className="relative z-10 flex flex-col items-center justify-center mb-24 md:mb-32">
           <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-[#f4ece3]/40 mb-3">Brand_Asset_Primary.svg</span>
           <div className="relative flex items-center justify-center px-12 py-8 border border-[#f4ece3]/30 rounded-sm transform rotate-1 group hover:border-[#f4ece3]/60 transition-colors cursor-pointer bg-white/[0.01] backdrop-blur-sm">
              {/* Fake hand-drawn border effect */}
              <div className="absolute inset-0 border border-[#f4ece3]/20 rounded-md transform -rotate-2 scale-[1.02] pointer-events-none transition-transform group-hover:-rotate-1" />
              <div className="absolute inset-0 border border-[#f4ece3]/10 rounded-lg transform rotate-2 scale-[1.05] pointer-events-none transition-transform group-hover:rotate-1" />
              
              <h3 className="font-sans font-black text-4xl md:text-6xl tracking-tighter text-[#f4ece3] drop-shadow-md">
                7pixels
              </h3>
              
              <div className="absolute -right-8 md:-right-12 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 rounded-full border border-[#f4ece3]/30 flex items-center justify-center">
                 <div className="w-1 h-1 bg-[#f4ece3]/50 rounded-full group-hover:bg-[#f4ece3] transition-colors" />
              </div>
           </div>
        </div>

        {/* Footer Bottom Row */}
        <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-8 pt-8 border-t border-[#f4ece3]/10 font-mono text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-[#f4ece3]/60">
           
           {/* Left Terminal Box */}
           <div className="border border-[#f4ece3]/20 p-4 rounded-sm flex items-start gap-3 max-w-xs bg-[#f4ece3]/[0.02] w-full lg:w-auto relative transform -rotate-1 group hover:rotate-0 transition-transform cursor-crosshair">
             <div className="absolute inset-0 border border-[#f4ece3]/10 transform rotate-2 rounded-sm pointer-events-none group-hover:rotate-0 transition-transform" />
             <div className="w-1.5 h-1.5 rounded-full bg-[#f4ece3]/80 mt-1 animate-pulse flex-shrink-0" />
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
                <Link href="#" className="hover:text-[#f4ece3] transition-colors">Instagram</Link>
                <Link href="#" className="hover:text-[#f4ece3] transition-colors">Twitter</Link>
                <Link href="#" className="hover:text-[#f4ece3] transition-colors">LinkedIn</Link>
             </div>
           </div>

           {/* Right Info */}
           <div className="flex items-center gap-4">
             <div className="w-px h-8 bg-[#f4ece3]/20 hidden md:block" />
             <span className="text-center md:text-right">Compiled with<br className="md:hidden" /> absolute strictness.</span>
           </div>

        </div>
      </footer>
    </div>
  );
}
