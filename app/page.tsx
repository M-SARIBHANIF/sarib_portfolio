"use client";

import { useState, useEffect } from "react";
import { Boot } from "@/components/Boot";
import { Cursor } from "@/components/Cursor";
import { Rail } from "@/components/Rail";
import { BackgroundFX } from "@/components/BackgroundFX";
import { ParticleField } from "@/components/ParticleField";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Philosophy } from "@/components/Philosophy";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [bootComplete, setBootComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Skip boot on mobile for better UX
    if (window.innerWidth < 768) {
      setBootComplete(true);
    }

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <main className="relative min-h-screen">
      {/* Boot Sequence */}
      {!bootComplete && !isMobile && (
        <Boot onComplete={() => setBootComplete(true)} />
      )}

      {/* Custom Cursor */}
      {!isMobile && <Cursor />}

      {/* Background Effects */}
      <BackgroundFX />
      <ParticleField />

      {/* Left Rail Navigation */}
      <Rail />

      {/* Main Content */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Philosophy />
        <Education />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
