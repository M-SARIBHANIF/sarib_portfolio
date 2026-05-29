"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface RevealWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function RevealWrapper({
  children,
  className = "",
  delay = 0,
}: RevealWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
