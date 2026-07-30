'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const projects = [
  {
    id: 1,
    title: 'Project Alpha',
    category: 'Brand Identity',
    image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: 'Project Beta',
    category: 'Digital Experience',
    image: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: 'Project Gamma',
    category: 'Creative Direction',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: 'Project Delta',
    category: 'Editorial Design',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
  }
];

export default function Projects() {
  return (
    <section className="relative z-10 w-full max-w-7xl mx-auto px-4 py-32 mt-[50vh]">
      <div className="mb-20 text-center max-w-3xl mx-auto">
        <h2 className="font-playfair text-5xl md:text-6xl text-[var(--text-main)] mb-6 luxury-text-shadow">
          Selected Works
        </h2>
        <p className="text-xl font-sans text-[var(--text-muted)] font-light leading-relaxed">
          A curated collection of premium digital experiences, brand identities, and creative directions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
        {projects.map((project, idx) => (
          <div key={project.id} className={idx % 2 === 1 ? 'md:mt-24' : ''}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: any }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group cursor-pointer w-full"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-2xl aspect-[4/5] shadow-2xl">
        {/* Main Image */}
        <motion.div 
          className="absolute inset-0 w-full h-full bg-slate-800"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            backgroundImage: `url('${project.image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Dark elegant overlay that fades on hover */}
        <motion.div 
          className="absolute inset-0 bg-black/40"
          animate={{ opacity: isHovered ? 0.2 : 0.4 }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Text content overlay */}
        <div className="absolute inset-0 p-10 flex flex-col justify-end">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="premium-glass p-6 rounded-xl"
          >
            <span className="text-sm font-sans tracking-widest text-[var(--text-muted)] uppercase mb-2 block">
              {project.category}
            </span>
            <h3 className="text-3xl font-playfair font-medium text-white">
              {project.title}
            </h3>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
