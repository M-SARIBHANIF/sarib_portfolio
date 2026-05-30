"use client";

import { useState, useEffect } from "react";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Education } from "@/components/Education";
import { Projects } from "@/components/Projects";
import { Philosophy } from "@/components/Philosophy";
import { BeyondTerminal } from "@/components/BeyondTerminal";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ParallelHero } from "@/components/ParallelHero";
import { BackgroundFX } from "@/components/BackgroundFX"; // Added import

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <main className="relative min-h-screen bg-[var(--bg)]">
      {/* Inject the interactive background here. 
        It uses fixed positioning so it will cover the screen behind your content. 
      */}
      <BackgroundFX />

      {/* True Parallel Layout - Added relative z-10 to ensure it sits above the background FX */}
      <div className="flex relative z-10">
        {/* Left Column: Sticky Hero Info */}
        {!isMobile && (
          <div className="fixed left-0 top-0 w-1/2 h-screen overflow-y-auto">
            <ParallelHero />
          </div>
        )}

        {/* Right Column: Scrollable Content */}
        <div className={`w-full ${!isMobile ? 'ml-[50%]' : ''}`}>
          <div className="relative z-10">
            <About />
            <Skills />
            <Experience />
            <Education />
            <Projects />
            <Philosophy />
            <BeyondTerminal />
            <Contact />
            <Footer />
          </div>
        </div>
      </div>
    </main>
  );
}