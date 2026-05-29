"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const bootLines = [
  { text: "> Booting sarib.dev...", delay: 200 },
  {
    text: "> Loading modules: React ✓ Node.js ✓ Docker ✓ FastAPI ✓",
    delay: 600,
  },
  { text: "> Connecting to database... ✓", delay: 1100 },
  { text: "> Running migrations... done", delay: 1500 },
  { text: "> Spinning up containers... 3/3 healthy", delay: 1900 },
  { text: "> Compiling portfolio... done", delay: 2300 },
  { text: "// All systems nominal. Launching UI...", delay: 2700 },
];

export function Boot({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    bootLines.forEach((line, index) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, index]);
        setProgress(((index + 1) / bootLines.length) * 100);
      }, line.delay);
    });

    setTimeout(() => {
      setIsExiting(true);
    }, 3200);

    setTimeout(() => {
      onComplete();
    }, 3600);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-black z-[10000] flex flex-col items-center justify-center font-mono"
      animate={{
        y: isExiting ? "-100%" : 0,
      }}
      transition={{
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      }}
    >
      <div className="w-full max-w-xl px-8">
        <div className="space-y-2 mb-8">
          {bootLines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: visibleLines.includes(index) ? 1 : 0,
                x: visibleLines.includes(index) ? 0 : -20,
              }}
              transition={{ duration: 0.2 }}
              className={`text-sm ${
                line.text.startsWith("//")
                  ? "text-green"
                  : line.text.includes("✓") || line.text.includes("done")
                    ? "text-blue"
                    : "text-[var(--text2)]"
              }`}
            >
              {line.text}
            </motion.div>
          ))}
        </div>

        <div className="w-full h-1 bg-[var(--bg3)] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blue"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="mt-4 text-xs text-[var(--text3)] text-center">
          {Math.round(progress)}% complete
        </div>
      </div>
    </motion.div>
  );
}
