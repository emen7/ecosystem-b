'use client';

import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import type { ThemeOption, ColorScheme, FontFamily, FontSize, LineSpacing, MarginWidth } from '../contexts/ThemeContext';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen, onClose }) => {
  const { theme, updateTheme } = useTheme();

  const handleOptionClick = (
    category: keyof typeof theme,
    value: ColorScheme | FontFamily | FontSize | LineSpacing | MarginWidth
  ) => {
    updateTheme({
      ...theme,
      [category]: value,
    });
  };

  return (
    <>
      <div className={`settings-panel ${isOpen ? 'open' : ''}`}>
        <div className="settings-section">
          <h3 className="settings-title">Display Settings</h3>
          
          <div className="settings-option">
            <h4 className="settings-option-title">Color Scheme</h4>
            <div className="settings-option-list">
              <button 
                className={`settings-option-button ${theme.colorScheme === 'dark' ? 'active' : ''}`}
                onClick={() => handleOptionClick('colorScheme', 'dark')}
              >
                Dark
              </button>
              <button 
                className={`settings-option-button ${theme.colorScheme === 'light' ? 'active' : ''}`}
                onClick={() => handleOptionClick('colorScheme', 'light')}
              >
                Light
              </button>
              <button 
                className={`settings-option-button ${theme.colorScheme === 'system' ? 'active' : ''}`}
                onClick={() => handleOptionClick('colorScheme', 'system')}
              >
                System
                <span className="system-theme-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
          
          <div className="settings-option">
            <h4 className="settings-option-title">Font Family</h4>
            <div className="settings-option-list">
              <button 
                className={`settings-option-button ${theme.fontFamily === 'sans' ? 'active' : ''}`}
                onClick={() => handleOptionClick('fontFamily', 'sans')}
              >
                Sans-serif
              </button>
              <button 
                className={`settings-option-button ${theme.fontFamily === 'serif' ? 'active' : ''}`}
                onClick={() => handleOptionClick('fontFamily', 'serif')}
              >
                Serif
              </button>
            </div>
          </div>
          
          <div className="settings-option">
            <h4 className="settings-option-title">Font Size</h4>
            <div className="settings-option-list">
              <button 
                className={`settings-option-button ${theme.fontSize === 'small' ? 'active' : ''}`}
                onClick={() => handleOptionClick('fontSize', 'small')}
              >
                Small
              </button>
              <button 
                className={`settings-option-button ${theme.fontSize === 'medium' ? 'active' : ''}`}
                onClick={() => handleOptionClick('fontSize', 'medium')}
              >
                Medium
              </button>
              <button 
                className={`settings-option-button ${theme.fontSize === 'large' ? 'active' : ''}`}
                onClick={() => handleOptionClick('fontSize', 'large')}
              >
                Large
              </button>
              <button 
                className={`settings-option-button ${theme.fontSize === 'xlarge' ? 'active' : ''}`}
                onClick={() => handleOptionClick('fontSize', 'xlarge')}
              >
                X-Large
              </button>
            </div>
          </div>
        </div>
        
        <div className="settings-section">
          <h3 className="settings-title">Reading Settings</h3>
          
          <div className="settings-option">
            <h4 className="settings-option-title">Line Spacing</h4>
            <div className="settings-option-list">
              <button 
                className={`settings-option-button ${theme.lineSpacing === 'compact' ? 'active' : ''}`}
                onClick={() => handleOptionClick('lineSpacing', 'compact')}
              >
                Compact
              </button>
              <button 
                className={`settings-option-button ${theme.lineSpacing === 'normal' ? 'active' : ''}`}
                onClick={() => handleOptionClick('lineSpacing', 'normal')}
              >
                Normal
              </button>
              <button 
                className={`settings-option-button ${theme.lineSpacing === 'relaxed' ? 'active' : ''}`}
                onClick={() => handleOptionClick('lineSpacing', 'relaxed')}
              >
                Relaxed
              </button>
            </div>
          </div>
          
          <div className="settings-option">
            <h4 className="settings-option-title">Text Width</h4>
            <div className="settings-option-list">
              <button 
                className={`settings-option-button ${theme.marginWidth === 'narrow' ? 'active' : ''}`}
                onClick={() => handleOptionClick('marginWidth', 'narrow')}
              >
                Narrow
              </button>
              <button 
                className={`settings-option-button ${theme.marginWidth === 'medium' ? 'active' : ''}`}
                onClick={() => handleOptionClick('marginWidth', 'medium')}
              >
                Medium
              </button>
              <button 
                className={`settings-option-button ${theme.marginWidth === 'wide' ? 'active' : ''}`}
                onClick={() => handleOptionClick('marginWidth', 'wide')}
              >
                Wide
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Overlay for closing settings panel on mobile */}
      {isOpen && (
        <div className="overlay active" onClick={onClose}></div>
      )}
    </>
  );
};

export default SettingsPanel;
