"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export function Cursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [ringPos, setRingPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ringRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Check for hoverable elements
    const checkHover = () => {
      const hoveredEl = document.elementFromPoint(mousePos.x, mousePos.y);
      const isHoverable =
        hoveredEl?.matches("a, button, [role='button'], input, textarea, select, [data-hover]") ||
        hoveredEl?.closest("a, button, [role='button']");
      setIsHovering(!!isHoverable);
    };

    const interval = setInterval(checkHover, 50);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearInterval(interval);
    };
  }, [mousePos.x, mousePos.y]);

  // Lerp ring position
  useEffect(() => {
    const animate = () => {
      ringRef.current.x += (mousePos.x - ringRef.current.x) * 0.15;
      ringRef.current.y += (mousePos.y - ringRef.current.y) * 0.15;
      setRingPos({ x: ringRef.current.x, y: ringRef.current.y });
      requestAnimationFrame(animate);
    };
    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [mousePos]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: mousePos.x - 4,
          top: mousePos.y - 4,
          width: 8,
          height: 8,
          backgroundColor: "var(--blue)",
          borderRadius: "50%",
          mixBlendMode: "screen",
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.1 }}
      />

      {/* Ring */}
      <motion.div
        className="fixed pointer-events-none z-[9998]"
        style={{
          left: ringPos.x - 14,
          top: ringPos.y - 14,
          width: 28,
          height: 28,
          border: "1px solid var(--blue)",
          borderRadius: "50%",
        }}
        animate={{
          scale: isHovering ? 1.8 : 1,
          opacity: isVisible ? 0.5 : 0,
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
