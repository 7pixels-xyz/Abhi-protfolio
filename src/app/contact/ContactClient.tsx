'use client';

import { motion } from 'framer-motion';

export default function ContactClient() {
  return (
    <motion.main 
      className="relative min-h-screen bg-[#87CEEB] text-[#1a1a1a] overflow-hidden flex items-center justify-center pt-24 px-4 md:px-12"
      initial={{ opacity: 0, backgroundColor: '#ffffff' }}
      animate={{ opacity: 1, backgroundColor: '#87CEEB' }}
      transition={{ duration: 0.8 }}
    >
      
      {/* Background Floating Elements */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-white/20 rounded-full blur-[120px] pointer-events-none" 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-blue-400/20 rounded-full blur-[100px] pointer-events-none" 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
      />

      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
        
        {/* Left Side - Typography */}
        <div className="flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            <p className="font-sans font-bold tracking-[0.4em] text-[#1a1a1a]/60 text-xs uppercase mb-6">
              Let's build something
            </p>
            <h1 className="text-7xl md:text-[140px] flex flex-col leading-[0.85] drop-shadow-2xl text-white">
              <span className="font-sans font-black tracking-tighter uppercase">Start</span>
              <span className="font-cormorant font-light italic tracking-widest lowercase">a project</span>
            </h1>
          </motion.div>

          <motion.div 
            className="mt-12 md:mt-24 flex flex-col gap-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <p className="font-sans font-bold text-xs tracking-widest uppercase text-[#1a1a1a]/50 mb-2">Email</p>
              <a href="mailto:hello@abhi.design" className="font-sans font-black text-xl md:text-3xl hover:text-white transition-colors" data-cursor-text="Send">
                hello@abhi.design
              </a>
            </div>
            
            <div>
              <p className="font-sans font-bold text-xs tracking-widest uppercase text-[#1a1a1a]/50 mb-2">Socials</p>
              <div className="flex gap-6">
                {['Instagram', 'Twitter', 'LinkedIn', 'Behance'].map((social) => (
                  <a key={social} href="#" className="font-sans font-bold text-sm tracking-widest hover:text-white transition-colors" data-cursor-text="Open">
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Form */}
        <motion.div 
          className="w-full max-w-xl mx-auto lg:ml-auto premium-glass bg-white/10 border border-white/20 p-8 md:p-12 rounded-[2rem] shadow-2xl"
          initial={{ opacity: 0, scale: 0.95, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
            
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <label className="block font-sans font-bold text-xs tracking-widest uppercase text-[#1a1a1a]/60 mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full bg-transparent border-b border-[#1a1a1a]/20 pb-2 font-sans text-lg focus:outline-none focus:border-[#1a1a1a] transition-colors placeholder:text-[#1a1a1a]/30"
                  placeholder="John Doe"
                  data-cursor-text="Type"
                />
              </div>
              <div className="flex-1">
                <label className="block font-sans font-bold text-xs tracking-widest uppercase text-[#1a1a1a]/60 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-transparent border-b border-[#1a1a1a]/20 pb-2 font-sans text-lg focus:outline-none focus:border-[#1a1a1a] transition-colors placeholder:text-[#1a1a1a]/30"
                  placeholder="john@example.com"
                  data-cursor-text="Type"
                />
              </div>
            </div>

            <div>
              <label className="block font-sans font-bold text-xs tracking-widest uppercase text-[#1a1a1a]/60 mb-2">Service</label>
              <select 
                className="w-full bg-transparent border-b border-[#1a1a1a]/20 pb-2 font-sans text-lg focus:outline-none focus:border-[#1a1a1a] transition-colors appearance-none cursor-pointer"
                data-cursor-text="Select"
              >
                <option>Video Editing</option>
                <option>Web Designing</option>
                <option>Cinematography</option>
                <option>Content Creation</option>
              </select>
            </div>

            <div>
              <label className="block font-sans font-bold text-xs tracking-widest uppercase text-[#1a1a1a]/60 mb-2">Message</label>
              <textarea 
                className="w-full bg-transparent border-b border-[#1a1a1a]/20 pb-2 font-sans text-lg focus:outline-none focus:border-[#1a1a1a] transition-colors resize-none placeholder:text-[#1a1a1a]/30"
                rows={4}
                placeholder="Tell me about your project..."
                data-cursor-text="Type"
              />
            </div>

            <button 
              className="mt-4 w-full py-4 bg-[#1a1a1a] text-white rounded-full font-sans font-bold tracking-[0.2em] uppercase text-xs hover:bg-white hover:text-black transition-colors duration-500 border border-transparent hover:border-black"
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
