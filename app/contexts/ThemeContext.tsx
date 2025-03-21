'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Define theme option types
export type ColorScheme = 'light' | 'dark' | 'sepia';
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
  updateTheme: (newTheme: Partial<ThemeOption>) => void;
}

// Define default theme settings
const defaultTheme: ThemeOption = {
  colorScheme: 'light',
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
  // Initialize with default theme
  const [theme, setTheme] = useState<ThemeOption>(defaultTheme);

  // Load theme from localStorage on client-side only
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('ub-reader-theme');
      if (savedTheme) {
        setTheme(JSON.parse(savedTheme));
      }
    } catch (error) {
      console.error('Failed to load theme from localStorage:', error);
    }
  }, []);

  // Update theme and save to localStorage
  const updateTheme = (newThemeOptions: Partial<ThemeOption>) => {
    setTheme(prevTheme => {
      const updatedTheme = { ...prevTheme, ...newThemeOptions };
      
      // Save to localStorage
      try {
        localStorage.setItem('ub-reader-theme', JSON.stringify(updatedTheme));
      } catch (error) {
        console.error('Failed to save theme to localStorage:', error);
      }
      
      return updatedTheme;
    });
  };

  // Apply theme to document body
  useEffect(() => {
    const body = document.body;
    
    // Remove all previous theme classes
    body.classList.remove('light-theme', 'dark-theme', 'sepia-theme');
    
    // Add current theme class
    body.classList.add(`${theme.colorScheme}-theme`);
    
    // Apply theme CSS variables if needed
    if (theme.colorScheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme.colorScheme]);

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
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
