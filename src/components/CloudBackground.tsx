'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';

interface Cloud {
  x: number;
  y: number;
  speed: number;
  scale: number;
  opacity: number;
}

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number;
}

export default function CloudBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isNight = theme === 'night';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    canvas.width = width;
    canvas.height = height;

    const clouds: Cloud[] = [];
    const numClouds = 25;
    
    const stars: Star[] = [];
    const numStars = 150;

    // Initialize clouds
    for (let i = 0; i < numClouds; i++) {
      clouds.push({
        x: Math.random() * canvas.width,
        y: Math.random() * (canvas.height * 0.6),
        speed: (0.1 + Math.random() * 0.3) * 0.95,
        scale: 0.3 + Math.random() * 0.6,
        opacity: 0.15 + Math.random() * 0.4,
      });
    }

    // Initialize stars
    for (let i = 0; i < numStars; i++) {
       stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          opacity: Math.random(),
          twinkleSpeed: 0.005 + Math.random() * 0.015
       });
    }

    const drawCloud = (ctx: CanvasRenderingContext2D, cloud: Cloud, isNightTheme: boolean) => {
      ctx.save();
      ctx.translate(cloud.x, cloud.y);
      ctx.scale(cloud.scale, cloud.scale);
      
      // In night mode, clouds are much darker and more transparent
      ctx.globalAlpha = isNightTheme ? cloud.opacity * 0.3 : cloud.opacity;
      
      ctx.fillStyle = isNightTheme ? '#1A1A2E' : '#FFFFFF';
      ctx.shadowColor = isNightTheme ? '#1A1A2E' : '#FFFFFF';
      ctx.shadowBlur = 60; 
      
      ctx.beginPath();
      ctx.arc(0, 0, 40, Math.PI * 0.5, Math.PI * 1.5);
      ctx.arc(50, -30, 50, Math.PI * 1, Math.PI * 1.8);
      ctx.arc(120, -20, 40, Math.PI * 1.2, Math.PI * 2);
      ctx.arc(160, 10, 30, Math.PI * 1.5, Math.PI * 0.5);
      ctx.moveTo(0, 40);
      ctx.lineTo(160, 40);
      ctx.fill();
      
      ctx.restore();
    };

    const drawStars = (ctx: CanvasRenderingContext2D, timestamp: number) => {
       ctx.save();
       stars.forEach(star => {
          // Twinkle effect
          const currentOpacity = star.opacity + Math.sin(timestamp * star.twinkleSpeed) * 0.3;
          ctx.globalAlpha = Math.max(0, Math.min(1, currentOpacity));
          
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.fill();
       });
       ctx.restore();
    };

    const drawMoon = (ctx: CanvasRenderingContext2D) => {
       ctx.save();
       // Moon in top right (offset from center)
       const moonX = canvas.width * 0.8;
       const moonY = canvas.height * 0.2;
       
       // Glow
       ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
       ctx.shadowBlur = 50;
       
       // Main body
       ctx.beginPath();
       ctx.arc(moonX, moonY, 40, 0, Math.PI * 2);
       ctx.fillStyle = '#f4f6f0';
       ctx.fill();
       
       // Crescent cutout (shadow)
       ctx.globalCompositeOperation = 'destination-out';
       ctx.beginPath();
       ctx.arc(moonX - 15, moonY - 10, 35, 0, Math.PI * 2);
       ctx.fillStyle = '#000000';
       ctx.fill();
       
       ctx.restore();
    }

    let animationFrameId: number;

    const render = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isNight) {
         drawStars(ctx, timestamp);
         drawMoon(ctx);
      }

      // Update and draw clouds
      clouds.forEach((cloud) => {
        cloud.x += cloud.speed;
        
        if (cloud.x > canvas.width + 100) {
          cloud.x = -250;
          cloud.y = Math.random() * (canvas.height * 0.6);
        }

        drawCloud(ctx, cloud, isNight);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isNight]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none transition-opacity duration-1000"
      style={{ 
        filter: isNight ? 'none' : 'blur(8px)',
        transition: 'filter 1.5s ease-in-out'
      }}
    />
  );
}
