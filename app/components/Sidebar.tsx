"use client";

import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPaper: (paper: string) => void;
  onSelectSection: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onSelectPaper, onSelectSection }) => {
  const { theme } = useTheme();
  const [expandedPart, setExpandedPart] = useState<string>('part1'); // Part I expanded by default
  
// Parts data
const parts = [
  { 
    id: 'part1', 
    title: 'PART I. THE CENTRAL AND SUPERUNIVERSES',
    papers: [
      { id: 0, title: 'Foreword' }, // Changed from "Paper 0: Foreword" to just "Foreword"
      ...Array.from({ length: 31 }, (_, i) => ({ 
        id: i + 1, 
        title: `Paper ${i + 1}${i === 0 ? ': The Universal Father' : ''}` 
      }))
    ]
  },
    { 
      id: 'part2', 
      title: 'PART II. THE LOCAL UNIVERSE',
      papers: Array.from({ length: 25 }, (_, i) => ({ 
        id: i + 32, 
        title: `Paper ${i + 32}` 
      }))
    },
    { 
      id: 'part3', 
      title: 'PART III. THE HISTORY OF URANTIA',
      papers: Array.from({ length: 63 }, (_, i) => ({ 
        id: i + 57, 
        title: `Paper ${i + 57}` 
      }))
    },
    { 
      id: 'part4', 
      title: 'PART IV. THE LIFE AND TEACHINGS OF JESUS',
      papers: Array.from({ length: 77 }, (_, i) => ({ 
        id: i + 120, 
        title: `Paper ${i + 120}` 
      }))
    }
  ];
  
  // Active paper
  const [activePaper, setActivePaper] = useState<number>(1);

  const handlePartToggle = (partId: string) => {
    if (expandedPart === partId) {
      // If clicking the already expanded part, do nothing
      return;
    }
    setExpandedPart(partId);
  };

  const handlePaperClick = (paperId: number, paperTitle: string) => {
    setActivePaper(paperId);
    
    // Special handling for the Foreword (Paper 0)
    if (paperId === 0) {
      onSelectPaper("Foreword");
    } else {
      onSelectPaper(paperTitle);
    }
    
    onSelectSection('');
    
    // Close sidebar on mobile
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <nav className={`navigation-menu ${isOpen ? 'open' : ''}`}>
      {/* Fixed top container for active part */}
      <div className="nav-fixed-top" id="active-parts-container">
        {parts.map(part => {
          const isActive = expandedPart === part.id;
          
          if (isActive) {
            return (
              <React.Fragment key={part.id}>
                <button 
                  className={`part-toggle active expanded`} 
                  data-part={part.id}
                  onClick={() => handlePartToggle(part.id)}
                >
                  {part.title}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`part-content expanded`} id={`${part.id}-content`}>
                  <ul className="nav-list">
                    {part.papers.map(paper => (
                      <li key={paper.id}>
                        <a 
                          href="#" 
                          className={activePaper === paper.id ? 'active' : ''}
                          onClick={(e) => {
                            e.preventDefault();
                            handlePaperClick(paper.id, paper.title);
                          }}
                        >
                          {paper.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </React.Fragment>
            );
          }
          return null;
        })}
      </div>

      {/* Scrollable middle section */}
      <div className="nav-scrollable" id="papers-container">
        {/* Papers are shown in the active part section above */}
      </div>

      {/* Fixed bottom container for inactive parts */}
      <div className="nav-fixed-bottom" id="inactive-parts-container">
        {parts.map(part => {
          const isInactive = expandedPart !== part.id;
          
          if (isInactive) {
            return (
              <React.Fragment key={part.id}>
                <button 
                  className="part-toggle" 
                  data-part={part.id}
                  onClick={() => handlePartToggle(part.id)}
                >
                  {part.title}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="part-content" id={`${part.id}-content`}>
                  <ul className="nav-list">
                    {part.papers.map(paper => (
                      <li key={paper.id}>
                        <a 
                          href="#" 
                          className={activePaper === paper.id ? 'active' : ''}
                          onClick={(e) => {
                            e.preventDefault();
                            handlePaperClick(paper.id, paper.title);
                          }}
                        >
                          {paper.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </React.Fragment>
            );
          }
          return null;
        })}
      </div>
      
      {/* Overlay for mobile - add it outside the navigation menu */}
      {isOpen && (
        <div className="overlay active" onClick={onClose}></div>
      )}
    </nav>
  );
};

export default Sidebar;
