"use client";

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ReadingArea from "./components/ReadingArea";
import Sidebar from "./components/Sidebar";
import SettingsPanel from "./components/SettingsPanel";
import { useTheme } from "./contexts/ThemeContext";

export default function Home() {
  const { theme, effectiveColorScheme } = useTheme();
  const [selectedPaper, setSelectedPaper] = useState("Paper 1: The Universal Father");
  const [selectedSection, setSelectedSection] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  const handleSelectPaper = (paper: string) => {
    setSelectedPaper(paper);
  };
  
  const handleSelectSection = (section: string) => {
    setSelectedSection(section);
  };
  
  // Apply theme class to body
  useEffect(() => {
    document.body.classList.remove("dark-theme", "light-theme");
    
    const themeClass = effectiveColorScheme === 'light' ? 'light-theme' : 'dark-theme';
    document.body.classList.add(themeClass);
    
    // Add custom CSS variables to body for font and spacing settings
    document.body.style.setProperty('--font-family', theme.fontFamily === 'serif' ? 
      "'Georgia', 'Times New Roman', serif" : 
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif");
      
    document.body.style.setProperty('--font-size', 
      theme.fontSize === 'small' ? '0.9rem' : 
      theme.fontSize === 'large' ? '1.1rem' : 
      theme.fontSize === 'xlarge' ? '1.25rem' : '1rem');
      
    document.body.style.setProperty('--line-height', 
      theme.lineSpacing === 'compact' ? '1.4' :
      theme.lineSpacing === 'relaxed' ? '1.8' : '1.6');
      
  }, [theme, effectiveColorScheme]);
  
  return (
    <div className="app-container">
      {/* Header */}
      <Header 
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)} 
        onSettingsToggle={() => setSettingsOpen(!settingsOpen)} 
      />

      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onSelectPaper={handleSelectPaper}
        onSelectSection={handleSelectSection}
      />
      
      {/* Settings Panel */}
      <SettingsPanel 
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)} 
      />

      {/* Main Content Container */}
      <div className="content-container">
        <ReadingArea
          selectedPaper={selectedPaper}
          selectedSection={selectedSection}
        />
      </div>
    </div>
  );
}
