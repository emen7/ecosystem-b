"use client";

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ReadingArea from "./components/ReadingArea";
import Sidebar from "./components/Sidebar";
import SettingsPanel from "./components/SettingsPanel";
import { useTheme } from "./contexts/ThemeContext";

export default function Home() {
  const { theme } = useTheme();
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
    document.body.classList.remove("dark-theme", "light-theme", "sepia-theme");
    
    let themeClass = "dark-theme"; 
    if (theme.colorScheme === "light") {
      themeClass = "light-theme";
    } else if (theme.colorScheme === "sepia") {
      themeClass = "sepia-theme";
    }
    
    document.body.classList.add(themeClass);
  }, [theme.colorScheme]);
  
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
