'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ReadingArea from '../../components/ReadingArea';

export default function PaperPage({ params }: { params: { paperNumber: string } }) {
  const [selectedPaper, setSelectedPaper] = useState('');
  
  // Set the paper based on the route parameter on initial load
  useEffect(() => {
    const paperNum = parseInt(params.paperNumber, 10);
    if (!isNaN(paperNum)) {
      setSelectedPaper(`Paper ${params.paperNumber}: ${getPaperTitle(paperNum)}`);
    } else {
      setSelectedPaper(`Paper ${params.paperNumber}`);
    }
  }, [params.paperNumber]);
  
  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-md z-50 h-14 flex items-center justify-between px-4">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold">
            UB Reader
          </Link>
        </div>
        <div className="text-sm">
          <span className="text-gray-500 dark:text-gray-400">
            {selectedPaper}
          </span>
        </div>
      </header>

      <main className="pt-16 pb-8">
        <ReadingArea
          selectedPaper={selectedPaper}
          selectedSection=""
        />
      </main>
    </div>
  );
}

// Helper function to get paper titles
function getPaperTitle(paperNumber: number): string {
  const titles: Record<number, string> = {
    1: "The Universal Father",
    2: "The Nature of God",
    3: "The Attributes of God",
    4: "God's Relation to the Universe",
    5: "God's Relation to the Individual",
    // Add more paper titles as needed
  };
  
  return titles[paperNumber] || "";
}
