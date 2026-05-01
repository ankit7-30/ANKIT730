"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowyWavesProps {
  className?: string;
  color?: string;
}

export const GlowyWavesHero: React.FC<GlowyWavesProps> = ({ 
  className,
  color = "#f59e0b" // Amber
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let w: number;
    let h: number;
    let lines: any[] = [];
    const lineCount = 15;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      initLines();
    };

    const initLines = () => {
      lines = [];
      for (let i = 0; i < lineCount; i++) {
        lines.push({
          y: h * 0.5 + (i - lineCount / 2) * 20,
          amplitude: 40 + i * 5,
          speed: 0.01 + i * 0.002,
          offset: i * 0.5,
          color: color,
          opacity: 0.1 + (i / lineCount) * 0.2
        });
      }
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      
      // Background Glow
      const grad = ctx.createRadialGradient(
        mouse.current.x, mouse.current.y, 0,
        mouse.current.x, mouse.current.y, w * 0.5
      );
      grad.addColorStop(0, `${color}15`);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      ctx.lineWidth = 1.5;
      
      lines.forEach((line) => {
        ctx.beginPath();
        ctx.strokeStyle = `${line.color}${Math.floor(line.opacity * 255).toString(16).padStart(2, '0')}`;
        
        for (let x = 0; x < w; x += 5) {
          const dx = (x - mouse.current.x) / w;
          const dy = (line.y - mouse.current.y) / h;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const push = Math.exp(-dist * 10) * 50;

          const y = line.y + Math.sin(x * 0.005 + t * line.speed + line.offset) * line.amplitude + push;
          
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    });

    resize();
    draw(0);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color]);

  return (
    <div className={cn("relative w-full h-[80vh] overflow-hidden bg-brand-bg", className)}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-60"
      />
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {/* Slot for Content */}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-bg/20 to-brand-bg pointer-events-none" />
    </div>
  );
};
