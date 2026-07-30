'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Lenis for buttery-smooth, inertia-based scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom cinematic ease
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      infinite: false,
    });

    // Tie Lenis into the browser's requestAnimationFrame loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup on unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
