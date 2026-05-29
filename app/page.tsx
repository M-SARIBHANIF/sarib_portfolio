"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Philosophy } from "@/components/Philosophy";
import { Contact } from "@/components/Contact";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <main className="relative min-h-screen bg-[var(--bg)]">
      {/* Two-column layout: Sidebar + Content */}
      <div className="flex">
        {/* Fixed Sidebar */}
        {!isMobile && <Sidebar />}

        {/* Main Content Area */}
        <div className="flex-1 ml-0 md:ml-[320px]">
          <div className="relative z-10">
            <Hero />
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
