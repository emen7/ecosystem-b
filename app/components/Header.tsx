'use client';

import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  onMenuToggle: () => void;
  onSettingsToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, onSettingsToggle }) => {
  const { theme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-30 shadow-md border-b h-14 header">
      <div className="flex justify-between items-center h-full px-4">
        {/* Menu Button (Left) */}
        <button
          onClick={onMenuToggle}
          className="header-button p-2 rounded-md transition-colors duration-200"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Title (Center) */}
        <h1 className="text-xl font-semibold absolute left-1/2 transform -translate-x-1/2">
          Urantia Book
        </h1>

        {/* Settings Button (Right) */}
        <button
          onClick={onSettingsToggle}
          className="header-button p-2 rounded-md transition-colors duration-200"
          aria-label="Toggle settings"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
