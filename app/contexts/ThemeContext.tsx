'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Define theme option types
export type ColorScheme = 'light' | 'dark' | 'system';
export type FontFamily = 'sans' | 'serif';
export type FontSize = 'small' | 'medium' | 'large' | 'xlarge';
export type LineSpacing = 'compact' | 'normal' | 'relaxed';
export type MarginWidth = 'narrow' | 'medium' | 'wide';

export interface ThemeOption {
  colorScheme: ColorScheme;
  fontFamily: FontFamily;
  fontSize: FontSize;
  lineSpacing: LineSpacing;
  marginWidth: MarginWidth;
}

interface ThemeContextType {
  theme: ThemeOption;
  updateTheme: (newTheme: ThemeOption) => void;
  effectiveColorScheme: 'light' | 'dark';
}

// Define default theme settings
const defaultTheme: ThemeOption = {
  colorScheme: 'system',
  fontFamily: 'sans',
  fontSize: 'medium',
  lineSpacing: 'normal',
  marginWidth: 'medium',
};

// Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<ThemeOption>(() => {
    // Try to load from localStorage on client side
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('reader-theme');
      if (savedTheme) {
        try {
          return JSON.parse(savedTheme);
        } catch (e) {
          console.error('Failed to parse saved theme', e);
        }
      }
    }
    return defaultTheme;
  });

  // Detect system preference
  const [systemPrefersDark, setSystemPrefersDark] = useState<boolean | null>(null);

  // Set up listeners for system preference changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Check initial preference
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemPrefersDark(darkModeMediaQuery.matches);
    
    // Set up listener for changes
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemPrefersDark(e.matches);
    };
    
    darkModeMediaQuery.addEventListener('change', handleChange);
    
    return () => {
      darkModeMediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // Save theme changes to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('reader-theme', JSON.stringify(theme));
    }
  }, [theme]);

  const updateTheme = (newTheme: ThemeOption) => {
    setTheme(newTheme);
  };
  
  // Get actual color scheme based on system preference if set to 'system'
  const getEffectiveColorScheme = (): 'light' | 'dark' => {
    if (theme.colorScheme === 'system') {
      return systemPrefersDark ? 'dark' : 'light';
    }
    return theme.colorScheme;
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      updateTheme,
      effectiveColorScheme: getEffectiveColorScheme()
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
