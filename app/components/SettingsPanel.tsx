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
                className={`settings-option-button ${theme.colorScheme === 'sepia' ? 'active' : ''}`}
                onClick={() => handleOptionClick('colorScheme', 'sepia')}
              >
                Sepia
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
