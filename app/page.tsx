"use client";

import React from "react";
import ReadingArea from "./components/ReadingArea";

export default function Home() {
  // Default to showing Paper 1
  const paperTitle = "Paper 1: The Universal Father";
  
  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-md z-50 h-14 flex items-center justify-between px-4">
        <h1 className="text-xl font-bold">UB Reader</h1>
      </header>

      <main className="pt-16 pb-8">
        <ReadingArea
          selectedPaper={paperTitle}
          selectedSection=""
        />
      </main>
    </div>
  );
}
