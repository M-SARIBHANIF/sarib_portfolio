"use client";

import { useState, useEffect } from "react";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Philosophy } from "@/components/Philosophy";
import { Contact } from "@/components/Contact";
import { ParallelHero } from "@/components/ParallelHero";

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
      {/* True Parallel Layout */}
      <div className="flex">
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
            <Projects />
            <Philosophy />
            <Contact />
          </div>
        </div>
      </div>
    </main>
  );
}
