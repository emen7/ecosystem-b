"use client";

import React, { useState } from "react";
import Header from "./components/Header";
import ReadingArea from "./components/ReadingArea";
import Sidebar from "./components/Sidebar";
import SettingsPanel from "./components/SettingsPanel";

export default function Home() {
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
  
  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header 
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)} 
        onSettingsToggle={() => setSettingsOpen(!settingsOpen)} 
      />

      {/* Sidebar - Always pass isOpen prop */}
      <Sidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onSelectPaper={handleSelectPaper}
        onSelectSection={handleSelectSection}
      />
      
      {/* Settings Panel - Always pass isOpen prop */}
      <SettingsPanel 
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)} 
      />

      {/* Main Content */}
      <main className="pt-14">
        <ReadingArea
          selectedPaper={selectedPaper}
          selectedSection={selectedSection}
        />
      </main>
    </div>
  );
}
