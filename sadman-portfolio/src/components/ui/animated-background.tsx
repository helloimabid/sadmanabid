"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Circle {
  x: number;
  y: number;
  radius: number;
  originalX: number;
  originalY: number;
  vx: number;
  vy: number;
}

interface ParticleProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  refresh?: boolean;
  color?: string;
  vignette?: boolean;
}

export default function AnimatedBackground({
  className,
  quantity = 30,
  staticity = 50,
  ease = 50,
  refresh = false,
  color = "#7c3aed",
  vignette = true,
}: ParticleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<Circle[]>([]);
  const mousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;

  const initCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      circles.current = [];
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;
      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.scale(dpr, dpr);

      // Create particles
      for (let i = 0; i < quantity; i++) {
        const x = Math.random() * canvasSize.current.w - canvasSize.current.w / 2;
        const y = Math.random() * canvasSize.current.h - canvasSize.current.h / 2;
        const radius = Math.random() * 2 + 0.5;
        circles.current.push({ x, y, radius, originalX: x, originalY: y, vx: 0, vy: 0 });
      }
    }
  };

  const animate = () => {
    if (context.current && canvasRef.current) {
      context.current.clearRect(
        0,
        0,
        canvasSize.current.w,
        canvasSize.current.h
      );

      if (vignette) {
        // Add a vignette effect to the canvas
        const gradient = context.current.createRadialGradient(
          canvasSize.current.w / 2,
          canvasSize.current.h / 2,
          0,
          canvasSize.current.w / 2,
          canvasSize.current.h / 2,
          canvasSize.current.w / 2
        );
        gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0.1)");
        context.current.fillStyle = gradient;
        context.current.fillRect(0, 0, canvasSize.current.w, canvasSize.current.h);
      }

      // Move particles
      context.current.translate(canvasSize.current.w / 2, canvasSize.current.h / 2);

      // Update particle positions
      for (let i = 0; i < circles.current.length; i++) {
        const circle = circles.current[i];
        const { x, y, radius, originalX, originalY } = circle;

        // Factor in the mouse position
        const distX = mouse.current.x - x;
        const distY = mouse.current.y - y;
        const distance = Math.sqrt(distX ** 2 + distY ** 2);

        // The interactivity factor is inversely proportional to the distance
        // but has an upper limit of 1
        const interactivityFactor = Math.min(1, 20 / distance);

        // Combine the "returning to original position" force with
        // the mouse-based force, using a staticity value
        const forceX = (originalX - x) / staticity + distX * interactivityFactor / ease;
        const forceY = (originalY - y) / staticity + distY * interactivityFactor / ease;

        // Update velocity using the force, with some damping
        circle.vx = circle.vx * 0.95 + forceX;
        circle.vy = circle.vy * 0.95 + forceY;

        // Update position
        circle.x += circle.vx;
        circle.y += circle.vy;

        // Draw the circle
        context.current.beginPath();
        context.current.arc(circle.x, circle.y, radius, 0, Math.PI * 2);
        context.current.fillStyle = color;
        context.current.fill();
      }

      context.current.translate(-canvasSize.current.w / 2, -canvasSize.current.h / 2);
      window.requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }
    initCanvas();
    const animationId = window.requestAnimationFrame(animate);
    window.addEventListener("resize", initCanvas);

    return () => {
      window.removeEventListener("resize", initCanvas);
      window.cancelAnimationFrame(animationId);
    };
  }, [refresh]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (canvasContainerRef.current) {
        const rect = canvasContainerRef.current.getBoundingClientRect();
        const { w, h } = canvasSize.current;
        const x = e.clientX - rect.left - w / 2;
        const y = e.clientY - rect.top - h / 2;
        const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
        if (inside) {
          mouse.current.x = x;
          mouse.current.y = y;
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={canvasContainerRef}
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
