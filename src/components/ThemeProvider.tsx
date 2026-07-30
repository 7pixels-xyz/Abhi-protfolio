'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'day' | 'night';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('day');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'day' ? 'night' : 'day'));
  };

  useEffect(() => {
    // We can also apply global classes to body if needed, but we'll primarily 
    // handle background colors via layout.tsx framer-motion or CSS transitions.
    if (theme === 'night') {
      document.documentElement.classList.add('night-theme');
    } else {
      document.documentElement.classList.remove('night-theme');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
