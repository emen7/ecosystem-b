'use client';

import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  onMenuToggle: () => void;
  onSettingsToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, onSettingsToggle }) => {
  const { effectiveColorScheme } = useTheme();

  return (
    <header className="header">
      <button 
        id="toggle-nav" 
        className="header-button"
        onClick={onMenuToggle}
        aria-label="Toggle menu"
      >
        <i className="fas fa-bars"></i>
      </button>
      
      <h1 className="header-title">Urantia Book</h1>
      
      <button 
        id="toggle-settings" 
        className="header-button"
        onClick={onSettingsToggle}
        aria-label="Toggle settings"
      >
        <i className="fas fa-cog"></i>
      </button>
    </header>
  );
};

export default Header;
