"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface ReadingAreaProps {
  selectedPaper: string;
  selectedSection: string;
  paragraphNumber?: string;
}

const ReadingArea: React.FC<ReadingAreaProps> = ({ 
  selectedPaper, 
  selectedSection,
  paragraphNumber 
}) => {
  const { theme } = useTheme();
  
  // State
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paragraphs, setParagraphs] = useState<Array<{id: string, number: number, text: string}>>([]);
  const [sections, setSections] = useState<Array<{id: string, number: string, title: string}>>([]);
  const [activePart, setActivePart] = useState("Part I: The Central and Superuniverses");
  const [activeSection, setActiveSection] = useState("");
  const [isSectionDropdownOpen, setIsSectionDropdownOpen] = useState(false);
  const [showCopyToast, setShowCopyToast] = useState(false);
  
  // Refs
  const readingAreaRef = useRef<HTMLDivElement>(null);
  const sectionDropdownRef = useRef<HTMLDivElement>(null);
  
  // Determine current part based on paper number
  useEffect(() => {
    if (!selectedPaper) return;
    
    const paperMatch = selectedPaper.match(/\d+/);
    if (!paperMatch) return;
    
    const paperNum = parseInt(paperMatch[0], 10);
    
    if (paperNum <= 31) {
      setActivePart("Part I: The Central and Superuniverses");
    } else if (paperNum <= 56) {
      setActivePart("Part II: The Local Universe");
    } else if (paperNum <= 119) {
      setActivePart("Part III: The History of Urantia");
    } else {
      setActivePart("Part IV: The Life and Teachings of Jesus");
    }
  }, [selectedPaper]);
  
  // Fetch content
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Handle case where selectedPaper is empty or undefined
        if (!selectedPaper) {
          setContent('Please select a paper.');
          setParagraphs([]);
          setSections([]);
          setLoading(false);
          return;
        }
        
        // Handle the Foreword specifically
        let paperNumber;
        if (selectedPaper === "Foreword") {
          paperNumber = "000";
        } else {
          // Extract the paper number and pad it with zeros
          const paperMatch = selectedPaper.match(/\d+/);
          paperNumber = paperMatch ? paperMatch[0].padStart(3, '0') : null;
          
          if (!paperNumber) {
            setContent('Invalid paper selection.');
            setParagraphs([]);
            setSections([]);
            setLoading(false);
            return;
          }
        }
        
        console.log(`Fetching paper: ${paperNumber}`);
        
        // Use the path to the JSON files, relative to the public directory
        const response = await fetch(`/json/${paperNumber}.json`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Extract section information
        const sectionItems = data.filter((item: any) => 
          item.type === "section_title"
        );
        
        setSections(
          sectionItems.map((item: any) => {
            const sectionId = item.paperSectionId.split(".")[1];
            return {
              id: `section-${sectionId}`,
              number: sectionId,
              title: item.text
            };
          })
        );
        
        if (selectedSection) {
          const sectionMatch = selectedSection.match(/\d+/);
          const sectionNumber = sectionMatch ? sectionMatch[0] : null;
          
          if (sectionNumber) {
            // Set active section
            setActiveSection(selectedSection);
            
            // Process paragraphs for the section
            const paragraphItems = data.filter((item: any) => 
              item.type === "paragraph" && 
              item.paperSectionId === `${paperNumber}.${sectionNumber}`
            );
            
            setParagraphs(paragraphItems.map((item: any, index: number) => ({
              id: `p-${paperNumber}-${sectionNumber}-${index + 1}`,
              number: index + 1,
              text: item.text
            })));
            
            // If no paragraphs found, display message
            if (paragraphItems.length === 0) {
              setContent('No content found for this section.');
            } else {
              setContent('');
            }
          } else {
            setContent('Invalid section selection.');
            setParagraphs([]);
          }
        } else {
          // If no section is selected, show all paragraphs
          const paragraphItems = data.filter((item: any) => item.type === "paragraph");
          
          // Group paragraphs by section
          const groupedParagraphs: Record<string, any[]> = {};
          
          paragraphItems.forEach((item: any) => {
            const sectionId = item.paperSectionId?.split('.')[1] || '0';
            if (!groupedParagraphs[sectionId]) {
              groupedParagraphs[sectionId] = [];
            }
            groupedParagraphs[sectionId].push(item);
          });
          
          // Flatten and add paragraph numbers
          const allParagraphs: {id: string, number: number, text: string}[] = [];
          
          Object.entries(groupedParagraphs).forEach(([sectionId, sectionParagraphs]) => {
            sectionParagraphs.forEach((item, index) => {
              allParagraphs.push({
                id: `p-${paperNumber}-${sectionId}-${index + 1}`,
                number: index + 1,
                text: item.text
              });
            });
          });
          
          setParagraphs(allParagraphs);
          
          // Use first section as active if available
          if (sections.length > 0) {
            setActiveSection(sections[0].title);
          }
          
          // If no paragraphs found, display message
          if (paragraphItems.length === 0) {
            setContent('No content found for this paper.');
          } else {
            setContent('');
          }
        }
      } catch (error) {
        console.error('Error fetching content:', error);
        setError(`Error loading content: ${error instanceof Error ? error.message : String(error)}`);
        setContent('');
        setParagraphs([]);
        setSections([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [selectedPaper, selectedSection]);
  
  // Click away listener for section dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sectionDropdownRef.current && 
        !sectionDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSectionDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Copy to clipboard functionality
  const handleCopyToClipboard = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      navigator.clipboard.writeText(selection.toString())
        .then(() => {
          setShowCopyToast(true);
          setTimeout(() => setShowCopyToast(false), 2000);
        })
        .catch(err => {
          console.error('Failed to copy text:', err);
        });
    }
  };
  
  // Effect to scroll to the specified paragraph when it's available
  useEffect(() => {
    if (paragraphNumber && paragraphs.length > 0) {
      const paragraphIndex = parseInt(paragraphNumber, 10) - 1;
      if (paragraphIndex >= 0 && paragraphIndex < paragraphs.length) {
        const paragraphId = paragraphs[paragraphIndex].id;
        const paragraphElement = document.getElementById(paragraphId);
        
        if (paragraphElement) {
          // Add a small delay to ensure the DOM is fully rendered
          setTimeout(() => {
            // Get header height to calculate proper offset
            const header = document.querySelector('header');
            const headerHeight = header ? header.offsetHeight : 60; // Default if header not found
            
            // Account for sticky headers (about 100px total)
            const offset = headerHeight + 100; 
            
            // Use scrollTo instead of scrollIntoView for more control
            window.scrollTo({
              top: paragraphElement.offsetTop - offset,
              behavior: 'smooth'
            });
            
            // Highlight the paragraph temporarily
            paragraphElement.classList.add('bg-yellow-100', 'dark:bg-yellow-900');
            setTimeout(() => {
              paragraphElement.classList.remove('bg-yellow-100', 'dark:bg-yellow-900');
            }, 2000);
          }, 300);
        }
      }
    }
  }, [paragraphNumber, paragraphs]);
  
  // Jump to section
  const handleJumpToSection = (sectionId: string) => {
    setIsSectionDropdownOpen(false);
    
    const targetSection = sections.find(section => section.id === sectionId);
    if (!targetSection) return;
    
    const targetElement = document.getElementById(sectionId);
    if (!targetElement) return;
    
    // Calculate offset for sticky headers
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 60;
    const offset = headerHeight + 100; // Additional space for sticky headers
    
    // Scroll to the section
    window.scrollTo({
      top: targetElement.offsetTop - offset,
      behavior: 'smooth'
    });
    
    // Update active section
    setActiveSection(targetSection.title);
  };

  // Get font classes based on theme
  const getFontFamilyClass = () => {
    return theme.fontFamily === 'serif' ? 'font-serif' : 'font-sans';
  };

  const getFontSizeClass = () => {
    switch (theme.fontSize) {
      case 'small': return 'text-sm';
      case 'large': return 'text-lg';
      case 'xlarge': return 'text-xl';
      default: return 'text-base'; // medium
    }
  };

  const getLineSpacingClass = () => {
    switch (theme.lineSpacing) {
      case 'compact': return 'leading-snug';
      case 'relaxed': return 'leading-relaxed';
      default: return 'leading-normal'; // normal
    }
  };

  const getMarginWidthClass = () => {
    switch (theme.marginWidth) {
      case 'narrow': return 'mx-2 md:mx-4';
      case 'wide': return 'mx-8 md:mx-16';
      default: return 'mx-4 md:mx-8'; // medium
    }
  };

  // Determine theme class
  let themeClass = 'dark-theme';
  if (theme.colorScheme === 'light') {
    themeClass = 'light-theme';
  } else if (theme.colorScheme === 'sepia') {
    themeClass = 'sepia-theme';
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-600 dark:text-red-400">{error}</div>;
  }

  return (
    <div className={`app-container ${themeClass}`}>
      <div className="reading-area" ref={readingAreaRef}>
        <div className="content">
          {/* Sticky Headers */}
          <div className="sticky-header">
            <div className="sticky-part-title">{activePart}</div>
            <div className="sticky-paper-title">{selectedPaper}</div>
          </div>

          {/* Sticky Section Title and Jump Menu */}
          <div className="sticky-section-title">
            {activeSection || (sections[0]?.title ?? 'Introduction')}
          </div>
          
          {sections.length > 1 && (
            <div className="section-navigation" ref={sectionDropdownRef}>
              <button 
                className="section-dropdown-button"
                onClick={() => setIsSectionDropdownOpen(!isSectionDropdownOpen)}
              >
                Jump to Section
              </button>
              <div className={`section-dropdown-content ${isSectionDropdownOpen ? 'show' : ''}`}>
                {sections.map(section => (
                  <a 
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleJumpToSection(section.id);
                    }}
                  >
                    {section.number}. {section.title.replace(/^\d+\.\s*/i, '')}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Paper Title */}
          <h2 className="paper-title">
            PAPER {selectedPaper.match(/\d+/)?.[0] || ''}<br />
            {selectedPaper.replace(/^Paper \d+:\s*/i, '')}
          </h2>

          {/* Sections and Paragraphs */}
          {sections.map((section) => {
            // Get paragraphs for this section
            const sectionParagraphs = paragraphs.filter(p => 
              p.id.includes(`-${section.number}-`)
            );
            
            return (
              <div key={section.id} id={section.id} className="section-content">
                <h3 className="section-title">
                  {section.number}. {section.title.replace(/^\d+\.\s*/i, '')}
                </h3>
                
                {sectionParagraphs.map((paragraph) => (
                  <div key={paragraph.id} id={paragraph.id} className="paragraph">
                    <span className="paragraph-number">{paragraph.number}</span>
                    <div className="paragraph-text">{paragraph.text}</div>
                  </div>
                ))}
              </div>
            );
          })}
          
          {/* If no sections but paragraphs exist (for introduction) */}
          {sections.length === 0 && paragraphs.length > 0 && (
            <div className="section-content">
              {paragraphs.map((paragraph) => (
                <div key={paragraph.id} id={paragraph.id} className="paragraph">
                  <span className="paragraph-number">{paragraph.number}</span>
                  <div className="paragraph-text">{paragraph.text}</div>
                </div>
              ))}
            </div>
          )}
          
          {/* Show content if no paragraphs */}
          {paragraphs.length === 0 && content && (
            <div className="mt-4">{content}</div>
          )}
        </div>
      </div>
      
      {/* Copy Button */}
      <button 
        className="copy-button"
        onClick={handleCopyToClipboard}
        title="Copy selected text"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      </button>
      
      {/* Toast Notification */}
      <div className="toast" style={{ display: showCopyToast ? 'block' : 'none' }}>
        Text copied to clipboard!
      </div>
    </div>
  );
};

export default ReadingArea;
