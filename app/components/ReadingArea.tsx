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
  const { theme, effectiveColorScheme } = useTheme();
  
  // State
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paragraphs, setParagraphs] = useState<Array<{id: string, number: number, text: string}>>([]);
  const [sections, setSections] = useState<Array<{id: string, number: string, title: string}>>([]);
  const [activePart, setActivePart] = useState("Part I: The Central and Superuniverses");
  const [activeSection, setActiveSection] = useState("");
  const [currentSectionTitle, setCurrentSectionTitle] = useState("");
  const [isSectionDropdownOpen, setIsSectionDropdownOpen] = useState(false);
  const [showCopyToast, setShowCopyToast] = useState(false);
  
  // Refs
  const readingAreaRef = useRef<HTMLDivElement>(null);
  const sectionDropdownRef = useRef<HTMLDivElement>(null);
  const stickySectionTitleRef = useRef<HTMLDivElement>(null);
  
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
        
        // Fetch the JSON data
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
          
          // Extract section titles including introduction (section 0)
          const allSections = data.filter((item: any) => 
            item.type === "section_title" || 
            (item.type === "section" && item.sectionId === "0")
          ).map((item: any) => {
            const sectionId = item.paperSectionId?.split('.')[1] || "0";
            return {
              id: `section-${sectionId}`,
              number: sectionId,
              title: item.sectionTitle || (sectionId === "0" ? "Introduction" : item.text || "")
            };
          });
          setSections(allSections);
          
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
          if (allSections.length > 0) {
            setActiveSection(allSections[0].title || "");
            setCurrentSectionTitle(allSections[0].title || "");
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
  
  // Section detection on scroll
  useEffect(() => {
    const readingArea = readingAreaRef.current;
    if (!readingArea) return;
    
    const handleScroll = () => {
      // Get the section headers visible in the viewport or just above it
      const sectionElements = readingArea.querySelectorAll('.section-title');
      if (sectionElements.length === 0) return;
      
      let newSectionTitle = '';
      let highestVisibleSection = null;
      let highestPosition = -Infinity;
      
      sectionElements.forEach(section => {
        const rect = section.getBoundingClientRect();
        // Only consider sections that are in the viewport or just above it (allowing some margin)
        // Use 150px as threshold to account for the sticky header height and some margin
        if (rect.top <= 150) {
          // Find the highest (closest to top but still above threshold) section
          if (rect.top > highestPosition) {
            highestPosition = rect.top;
            highestVisibleSection = section;
          }
        }
      });
      
      // If we found a visible section, use it
      if (highestVisibleSection) {
        newSectionTitle = highestVisibleSection.textContent || '';
      } else if (sectionElements.length > 0) {
        // Fallback to the first section if none are visible yet
        newSectionTitle = sectionElements[0].textContent || '';
      }
      
      // Only update if the section title has changed
      if (newSectionTitle && newSectionTitle !== currentSectionTitle) {
        setCurrentSectionTitle(newSectionTitle);
        setActiveSection(newSectionTitle);
        
        // Update the sticky section title text
        if (stickySectionTitleRef.current) {
          stickySectionTitleRef.current.textContent = newSectionTitle;
        }
      }
    };
    
    // Add scroll event listener to the reading area element
    readingArea.addEventListener('scroll', handleScroll);
    
    // Initial check
    setTimeout(handleScroll, 200);
    
    return () => {
      readingArea.removeEventListener('scroll', handleScroll);
    };
  }, [sections, currentSectionTitle]);
  
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
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
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
  
  // Jump to section
  const handleJumpToSection = (sectionId: string) => {
    setIsSectionDropdownOpen(false);
    
    const targetSection = sections.find(section => section.id === sectionId);
    if (!targetSection) return;
    
    const targetElement = document.getElementById(sectionId);
    if (!targetElement) return;
    
    // Calculate offset
    // 56px (main header) + 64px (sticky headers) + 40px (extra padding)
    const offset = 160;
    
    // Get the element's position relative to the top of the document
    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    
    // Scroll to the element with the offset adjustment
    window.scrollTo({
      top: elementPosition - offset,
      behavior: 'smooth'
    });
    
    // Update section titles
    setActiveSection(targetSection.title);
    setCurrentSectionTitle(targetSection.title);
    
    // Ensure we've actually reached the correct position after animation
    setTimeout(() => {
      // Double-check after animation if we need to adjust a bit more
      const finalRect = targetElement.getBoundingClientRect();
      if (finalRect.top < 100 || finalRect.top > 180) {
        window.scrollTo({
          top: window.scrollY + finalRect.top - (offset - 60),
          behavior: 'auto'
        });
      }
    }, 500);
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
            // Calculate offset - headers + extra space
            const offset = 160;
            
            // Use scrollTo for more control
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

  // Theme class - simplified approach
  const themeClass = effectiveColorScheme === 'light' ? 'light-theme' : 'dark-theme';

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
      {/* Content Container */}
      <div className="content-container">
        {/* Reading Area - attached scroll handler to this div */}
        <div className="reading-area" id="reading-area" ref={readingAreaRef}>
          <div className="content">
            {/* Sticky Headers */}
            <div className="sticky-header">
              <div className="sticky-part-title" id="sticky-part-title">
                {activePart}
              </div>
              <div className="sticky-paper-title" id="sticky-paper-title">
                {selectedPaper}
              </div>
            </div>

            {/* Sticky Section Title - Only show non-Introduction sections */}
            <div 
              className="sticky-section-title" 
              id="sticky-section-title"
              ref={stickySectionTitleRef}
            >
              {activeSection !== 'Introduction' ? activeSection : ''}
            </div>

            {/* Section Navigation - Positioned after sticky section title as in demo */}
            {sections.length > 1 && (
              <div className="section-navigation" ref={sectionDropdownRef}>
                <button 
                  className="section-dropdown-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsSectionDropdownOpen(!isSectionDropdownOpen);
                  }}
                >
                  <i className="fas fa-list"></i>
                  &nbsp;Jump to Section
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
                      {section.number === "0" ? "Introduction" : 
                        `${section.number}. ${section.title.replace(/^\d+\.\s*/i, '')}`}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Paper Title */}
            <h2 className="paper-title">
              {selectedPaper === "Foreword" ? "FOREWORD" : 
                `PAPER ${selectedPaper.match(/\d+/)?.[0] || ''}`}
              <br />
              {selectedPaper.replace(/^(Paper \d+:|Foreword)(\s*)/i, '')}
            </h2>

            {/* Sections and Paragraphs */}
            {sections.map((section) => {
              // Get paragraphs for this section
              const sectionParagraphs = paragraphs.filter(p => 
                p.id.includes(`-${section.number}-`)
              );
              
              return (
                <div key={section.id} id={section.id} className="section-content">
                  {/* Only render section title if it's not section 0 (introduction) */}
                  {section.number !== "0" && (
                    <h3 className="section-title" id={`section${section.number}`}>
                      {section.number}. {section.title.replace(/^\d+\.\s*/i, '')}
                    </h3>
                  )}
                  
                  {sectionParagraphs.map((paragraph) => (
                    <div key={paragraph.id} id={paragraph.id} className="paragraph">
                      <span className="paragraph-number">{paragraph.number}</span>
                      <div className="paragraph-text">{paragraph.text}</div>
                    </div>
                  ))}
                </div>
              );
            })}
            
            {/* If no sections but paragraphs exist (fallback) */}
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
      </div>
      
      {/* Copy Button */}
      <button 
        className="copy-button"
        onClick={handleCopyToClipboard}
        title="Copy selected text"
      >
        <i className="fas fa-copy"></i>
      </button>
      
      {/* Toast Notification */}
      <div className="toast" style={{ display: showCopyToast ? 'block' : 'none' }}>
        Text copied to clipboard!
      </div>
    </div>
  );
};

export default ReadingArea;
