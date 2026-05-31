"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Cursor() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [ringPos, setRingPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const ringRef = useRef({ x: 0, y: 0 });
  const trailId = useRef(0);
  const rippleId = useRef(0);
  const mousePosRef = useRef({ x: 0, y: 0 });

  // Detect touch device after mount — safe, no SSR mismatch
  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      trailId.current += 1;
      const id = trailId.current;
      setTrail(prev => [...prev.slice(-8), { x: e.clientX, y: e.clientY, id }]);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicked(true);
      rippleId.current += 1;
      const id = rippleId.current;
      setRipples(prev => [...prev, { x: e.clientX, y: e.clientY, id }]);
    };

    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isTouchDevice]);

  // Hover detection — uses ref so doesn't need mousePos as dependency
  useEffect(() => {
    if (isTouchDevice) return;

    const interval = setInterval(() => {
      const { x, y } = mousePosRef.current;
      const hoveredEl = document.elementFromPoint(x, y);
      const isHoverable =
        hoveredEl?.matches("a, button, [role='button'], input, textarea, select, [data-hover]") ||
        !!hoveredEl?.closest("a, button, [role='button']");
      setIsHovering(isHoverable);
    }, 50);

    return () => clearInterval(interval);
  }, [isTouchDevice]);

  // Lerp ring position
  useEffect(() => {
    if (isTouchDevice) return;

    const animate = () => {
      ringRef.current.x += (mousePos.x - ringRef.current.x) * 0.12;
      ringRef.current.y += (mousePos.y - ringRef.current.y) * 0.12;
      setRingPos({ x: ringRef.current.x, y: ringRef.current.y });
      requestAnimationFrame(animate);
    };
    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [mousePos, isTouchDevice]);

  // Trail cleanup
  useEffect(() => {
    if (isTouchDevice) return;
    const cleanup = setInterval(() => {
      setTrail(prev => prev.slice(-6));
    }, 100);
    return () => clearInterval(cleanup);
  }, [isTouchDevice]);

  // Ripple cleanup
  useEffect(() => {
    if (ripples.length === 0) return;
    const timeout = setTimeout(() => {
      setRipples(prev => prev.slice(1));
    }, 600);
    return () => clearTimeout(timeout);
  }, [ripples]);

  // Render nothing on touch devices or until mounted
  if (isTouchDevice) return null;

  return (
    <>
      {/* Click Ripple Shockwaves */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={`ripple-${ripple.id}`}
            className="fixed pointer-events-none z-[9995]"
            style={{
              left: ripple.x - 20,
              top: ripple.y - 20,
              width: 40,
              height: 40,
              border: "2px solid var(--accent)",
              borderRadius: "50%",
            }}
            initial={{ scale: 0, opacity: 0.8, borderWidth: "4px" }}
            animate={{ scale: 3.5, opacity: 0, borderWidth: "0px" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* Trail */}
      {trail.map((point, i) => (
        <motion.div
          key={point.id}
          className="fixed pointer-events-none z-[9996]"
          style={{
            left: point.x - 2,
            top: point.y - 2,
            width: 4,
            height: 4,
            backgroundColor: "var(--accent)",
            borderRadius: "50%",
          }}
          initial={{ opacity: 0.4, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.4, delay: i * 0.02 }}
        />
      ))}

      {/* Inner dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: mousePos.x - 3,
          top: mousePos.y - 3,
          width: 6,
          height: 6,
          backgroundColor: "var(--accent)",
          borderRadius: "50%",
          boxShadow: "0 0 10px var(--accent-glow), 0 0 20px var(--accent-glow)",
        }}
        animate={{
          scale: isClicked ? 0.5 : isHovering ? 2 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Outer ring */}
      <motion.div
        className="fixed pointer-events-none z-[9998]"
        style={{
          left: ringPos.x - 16,
          top: ringPos.y - 16,
          width: 32,
          height: 32,
          border: "1.5px solid var(--accent)",
          borderRadius: "50%",
          backgroundColor: isHovering ? "var(--accent-dim)" : "transparent",
        }}
        animate={{
          scale: isClicked ? 0.8 : isHovering ? 1.5 : 1,
          opacity: isVisible ? 0.6 : 0,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Hover glow */}
      {isHovering && !isClicked && (
        <motion.div
          className="fixed pointer-events-none z-[9997]"
          style={{
            left: ringPos.x - 30,
            top: ringPos.y - 30,
            width: 60,
            height: 60,
            background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.5, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </>
  );
}