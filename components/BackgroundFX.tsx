"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export function BackgroundFX() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });
  // Ref to hold active ripples so the animation loop can read and modify them
  const ripplesRef = useRef<Array<{ x: number; y: number; radius: number; opacity: number; id: number }>>([]);
  const rippleIdCounter = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = (e: MouseEvent) => {
      rippleIdCounter.current += 1;
      ripplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        opacity: 0.8,
        id: rippleIdCounter.current,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      pulse: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 25000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          // INCREASED SIZE: Base size is larger, max size is larger
          size: Math.random() * 1.5 + 0.8, 
          speedX: (Math.random() - 0.5) * 0.15,
          speedY: (Math.random() - 0.5) * 0.15,
          // INCREASED OPACITY: Particles are generally brighter now
          opacity: Math.random() * 0.4 + 0.2, 
          pulse: Math.random() * Math.PI * 2,
        });
      }
    };

    const drawGrid = () => {
      ctx.strokeStyle = "rgba(255, 255, 255, 0.015)";
      ctx.lineWidth = 1;

      const gridSize = 80;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle grid
      drawGrid();

      // Draw active ripples
      const currentRipples = ripplesRef.current;
      for (let i = currentRipples.length - 1; i >= 0; i--) {
        const ripple = currentRipples[i];
        
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        // Using the gold/amber theme color for the ripple
        ctx.strokeStyle = `rgba(212, 168, 85, ${ripple.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Expand radius and fade out
        ripple.radius += 4;
        ripple.opacity -= 0.015;

        // Remove dead ripples
        if (ripple.opacity <= 0) {
          currentRipples.splice(i, 1);
        }
      }

      // Draw particles
      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.pulse += 0.01;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Mouse interaction - particles drift slightly toward mouse
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Combine mouse drift with a gentle shockwave effect from ripples
        let isPushed = false;
        
        if (dist < 200) {
          particle.x += (dx / dist) * 0.1;
          particle.y += (dy / dist) * 0.1;
        }

        // Make particles scatter slightly when a ripple hits them
        for (const ripple of currentRipples) {
           const rDx = particle.x - ripple.x;
           const rDy = particle.y - ripple.y;
           const rDist = Math.sqrt(rDx * rDx + rDy * rDy);
           
           // If particle is roughly at the ripple boundary
           if (Math.abs(rDist - ripple.radius) < 15) {
             particle.x += (rDx / rDist) * 1.5;
             particle.y += (rDy / rDist) * 1.5;
             isPushed = true;
           }
        }

        // Momentarily brighten particles that get pushed by the shockwave
        const baseOpacity = particle.opacity * (0.6 + Math.sin(particle.pulse) * 0.4);
        const finalOpacity = isPushed ? Math.min(baseOpacity + 0.4, 1) : baseOpacity;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 168, 85, ${finalOpacity})`;
        ctx.fill();
      });

      // INCREASED LINE VISIBILITY: Lines are slightly thicker and more opaque
      ctx.strokeStyle = "rgba(212, 168, 85, 0.04)"; 
      ctx.lineWidth = 0.8;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            // Increased max alpha for connecting lines
            ctx.globalAlpha = (1 - distance / 100) * 0.35; 
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Canvas for particles and ripples */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ background: "transparent" }}
      />

      {/* Mouse follow glow */}
      <motion.div
        className="fixed pointer-events-none z-[1]"
        style={{
          width: 400,
          height: 400,
          background: "radial-gradient(circle, rgba(212, 168, 85, 0.03) 0%, transparent 60%)",
          borderRadius: "50%",
          filter: "blur(40px)",
          left: mousePos.x - 200,
          top: mousePos.y - 200,
        }}
        animate={{
          x: 0,
          y: 0,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      {/* Radial vignette */}
      <div
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.3) 60%, rgba(0, 0, 0, 0.7) 100%)",
        }}
      />

      {/* Corner accent orbs */}
      <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(212, 168, 85, 0.03) 0%, transparent 60%)",
            filter: "blur(80px)",
            top: "-15%",
            right: "-10%",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(107, 138, 253, 0.02) 0%, transparent 60%)",
            filter: "blur(80px)",
            bottom: "-10%",
            left: "-5%",
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Noise texture */}
      <svg className="fixed inset-0 w-full h-full pointer-events-none z-[2] opacity-[0.012]">
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