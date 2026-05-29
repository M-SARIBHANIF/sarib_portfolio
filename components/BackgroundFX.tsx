"use client";

import { motion } from "framer-motion";

export function BackgroundFX() {
  return (
    <>
      {/* Blueprint Grid */}
      <div className="fixed inset-0 blueprint-grid pointer-events-none z-0" />

      {/* Floating Orbs */}
      <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
        {/* Blue Orb */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
            filter: "blur(80px)",
            top: "10%",
            left: "10%",
          }}
          animate={{
            x: [0, 100, 50, 0],
            y: [0, 50, 100, 0],
            scale: [1, 1.2, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Purple Orb */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full opacity-25"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
            filter: "blur(80px)",
            top: "40%",
            right: "10%",
          }}
          animate={{
            x: [0, -80, -40, 0],
            y: [0, 80, 40, 0],
            scale: [1, 1.1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Green Orb */}
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)",
            filter: "blur(80px)",
            bottom: "10%",
            left: "30%",
          }}
          animate={{
            x: [0, 60, -30, 0],
            y: [0, -60, -30, 0],
            scale: [1, 1.15, 1.05, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Scanlines */}
      <div
        className="fixed inset-0 pointer-events-none z-[2] opacity-[0.015]"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
        }}
      />

      {/* Noise Texture */}
      <svg className="fixed inset-0 w-full h-full pointer-events-none z-[2] opacity-[0.025]">
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </>
  );
}
