'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/components/ThemeProvider';
import CloudBackground from '@/components/CloudBackground';

export default function ContactClient() {
  const { theme } = useTheme();
  const isNight = theme === 'night';

  const bgColor = isNight ? '#050505' : '#87CEEB';
  const textColor = isNight ? 'text-white' : 'text-[#1a1a1a]';
  const mutedText = isNight ? 'text-white/60' : 'text-[#1a1a1a]/60';
  const formBg = isNight ? 'bg-white/5 border-white/10' : 'bg-white/20 border-white/30';
  const inputBorder = isNight ? 'border-white/20 focus:border-white' : 'border-[#1a1a1a]/20 focus:border-[#1a1a1a]';
  const buttonBg = isNight ? 'bg-white text-black hover:bg-white/80' : 'bg-[#1a1a1a] text-white hover:bg-[#1a1a1a]/80';

  return (
    <motion.main 
      className={`relative min-h-screen ${textColor} overflow-hidden flex items-center justify-center pt-24 pb-12 px-4 md:px-12 transition-colors duration-1000`}
      initial={{ opacity: 0, backgroundColor: '#ffffff' }}
      animate={{ opacity: 1, backgroundColor: bgColor }}
      transition={{ duration: 0.8 }}
    >
      
      <CloudBackground />

      {/* Background Floating Elements */}
      <motion.div 
        className={`absolute top-1/4 left-1/4 w-[80vw] md:w-[50vw] h-[80vw] md:h-[50vw] rounded-full blur-[100px] md:blur-[120px] pointer-events-none transition-colors duration-1000 ${isNight ? 'bg-indigo-900/20' : 'bg-white/20'}`} 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      <motion.div 
        className={`absolute bottom-1/4 right-1/4 w-[60vw] md:w-[40vw] h-[60vw] md:h-[40vw] rounded-full blur-[80px] md:blur-[100px] pointer-events-none transition-colors duration-1000 ${isNight ? 'bg-purple-900/20' : 'bg-blue-400/20'}`} 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
      />

      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center mt-8 md:mt-0">
        
        {/* Left Side - Typography */}
        <div className="flex flex-col text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            <p className={`font-sans font-bold tracking-[0.4em] ${mutedText} text-[10px] md:text-xs uppercase mb-4 md:mb-6`}>
              Let's build something
            </p>
            <h1 className="text-6xl sm:text-7xl md:text-[120px] lg:text-[140px] flex flex-col leading-[0.9] drop-shadow-2xl">
              <span className="font-sans font-black tracking-tighter uppercase">Start</span>
              <span className="font-cormorant font-light italic tracking-widest lowercase">a project</span>
            </h1>
          </motion.div>

          <motion.div 
            className="mt-12 md:mt-24 flex flex-col gap-8 items-center lg:items-start"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <p className={`font-sans font-bold text-[10px] md:text-xs tracking-widest uppercase ${mutedText} mb-2`}>Email</p>
              <a href="mailto:hello@abhi.design" className="font-sans font-black text-xl md:text-3xl hover:opacity-70 transition-opacity" data-cursor-text="Send">
                hello@abhi.design
              </a>
            </div>
            
            <div>
              <p className={`font-sans font-bold text-[10px] md:text-xs tracking-widest uppercase ${mutedText} mb-2`}>Socials</p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6">
                {['Instagram', 'Twitter', 'LinkedIn', 'Behance'].map((social) => (
                  <a key={social} href="#" className="font-sans font-bold text-xs md:text-sm tracking-widest hover:opacity-70 transition-opacity" data-cursor-text="Open">
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Form */}
        <motion.div 
          className={`w-full max-w-xl mx-auto lg:ml-auto premium-glass ${formBg} border p-6 md:p-12 rounded-[2rem] shadow-2xl transition-colors duration-1000 backdrop-blur-xl`}
          initial={{ opacity: 0, scale: 0.95, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <form className="flex flex-col gap-6 md:gap-8" onSubmit={(e) => e.preventDefault()}>
            
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              <div className="flex-1">
                <label className={`block font-sans font-bold text-[10px] md:text-xs tracking-widest uppercase ${mutedText} mb-2`}>Name</label>
                <input 
                  type="text" 
                  className={`w-full bg-transparent border-b ${inputBorder} pb-2 font-sans text-base md:text-lg focus:outline-none transition-colors placeholder:opacity-30`}
                  placeholder="John Doe"
                  data-cursor-text="Type"
                />
              </div>
              <div className="flex-1">
                <label className={`block font-sans font-bold text-[10px] md:text-xs tracking-widest uppercase ${mutedText} mb-2`}>Email</label>
                <input 
                  type="email" 
                  className={`w-full bg-transparent border-b ${inputBorder} pb-2 font-sans text-base md:text-lg focus:outline-none transition-colors placeholder:opacity-30`}
                  placeholder="john@example.com"
                  data-cursor-text="Type"
                />
              </div>
            </div>

            <div>
              <label className={`block font-sans font-bold text-[10px] md:text-xs tracking-widest uppercase ${mutedText} mb-2`}>Service</label>
              <select 
                className={`w-full bg-transparent border-b ${inputBorder} pb-2 font-sans text-base md:text-lg focus:outline-none transition-colors appearance-none cursor-pointer ${isNight ? 'text-white [&>option]:text-black' : 'text-[#1a1a1a] [&>option]:text-[#1a1a1a]'}`}
                data-cursor-text="Select"
              >
                <option>Video Editing</option>
                <option>Web Designing</option>
                <option>Cinematography</option>
                <option>Content Creation</option>
              </select>
            </div>

            <div>
              <label className={`block font-sans font-bold text-[10px] md:text-xs tracking-widest uppercase ${mutedText} mb-2`}>Message</label>
              <textarea 
                className={`w-full bg-transparent border-b ${inputBorder} pb-2 font-sans text-base md:text-lg focus:outline-none transition-colors resize-none placeholder:opacity-30`}
                rows={3}
                placeholder="Tell me about your project..."
                data-cursor-text="Type"
              />
            </div>

            <button 
              className={`mt-2 md:mt-4 w-full py-4 rounded-full font-sans font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs transition-colors duration-500 border border-transparent ${buttonBg}`}
              data-cursor-text="Submit"
            >
              Send Inquiry
            </button>

          </form>
        </motion.div>

      </div>
    </motion.main>
  );
}
