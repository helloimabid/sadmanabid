"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

interface VertexPoint {
  x: number;
  y: number;
  color: string;
  size: number;
  connectionRadius: number;
  speed: { x: number; y: number };
}

export default function FuturisticBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Set colors based on theme
  const primaryColor = isDark ? "#a855f7" : "#7c3aed";
  const secondaryColor = isDark ? "#8b5cf6" : "#a855f7";
  const tertiaryColor = isDark ? "#6366f1" : "#8b5cf6";
  const bgColor = isDark ? "#09090b" : "#f8fafc";

  useEffect(() => {
    // Initialize dimensions
    const updateDimensions = () => {
      if (typeof window !== "undefined") {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight * 2, // Make it taller for scrolling
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Number of vertices based on screen size
    const vertexCount = Math.max(20, Math.floor(dimensions.width * dimensions.height / 15000));

    // Create random vertices
    const vertices: VertexPoint[] = [];
    for (let i = 0; i < vertexCount; i++) {
      const connectionRadius = Math.random() * 150 + 50;
      vertices.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        color: [primaryColor, secondaryColor, tertiaryColor][Math.floor(Math.random() * 3)],
        size: Math.random() * 4 + 1,
        connectionRadius,
        speed: {
          x: (Math.random() - 0.5) * 0.2,
          y: (Math.random() - 0.5) * 0.2,
        },
      });
    }

    // Draw grid lines
    const drawGrid = () => {
      if (!ctx) return;

      const gridSize = 40;

      ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)';
      ctx.lineWidth = 1;

      // Horizontal lines
      for (let y = 0; y < dimensions.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(dimensions.width, y);
        ctx.stroke();
      }

      // Vertical lines
      for (let x = 0; x < dimensions.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, dimensions.height);
        ctx.stroke();
      }
    };

    // Add some circuits/paths
    const drawCircuits = () => {
      if (!ctx) return;

      const circuitPaths = 8;

      for (let i = 0; i < circuitPaths; i++) {
        const path: { x: number; y: number }[] = [];

        // Random start point
        let x = Math.random() * dimensions.width;
        let y = Math.random() * dimensions.height;

        // Generate path points with 90-degree turns
        path.push({ x, y });

        // Circuit complexity
        const segments = Math.floor(Math.random() * 10) + 5;

        for (let j = 0; j < segments; j++) {
          const direction = Math.floor(Math.random() * 4); // 0: right, 1: down, 2: left, 3: up
          const distance = Math.random() * 200 + 50;

          if (direction === 0) x += distance;
          if (direction === 1) y += distance;
          if (direction === 2) x -= distance;
          if (direction === 3) y -= distance;

          path.push({ x, y });
        }

        // Draw the circuit path
        ctx.beginPath();
        ctx.moveTo(path[0].x, path[0].y);

        for (let j = 1; j < path.length; j++) {
          ctx.lineTo(path[j].x, path[j].y);
        }

        ctx.strokeStyle = isDark
          ? `rgba(${100 + Math.random() * 155}, ${Math.random() * 100}, ${Math.random() * 255}, 0.1)`
          : `rgba(${Math.random() * 100}, ${Math.random() * 100}, ${100 + Math.random() * 155}, 0.1)`;
        ctx.lineWidth = Math.random() * 3 + 0.5;
        ctx.stroke();
      }
    };

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Draw background elements
      drawGrid();
      drawCircuits();

      // Draw vertices and connections
      vertices.forEach((vertex, i) => {
        // Update vertex position
        vertex.x += vertex.speed.x;
        vertex.y += vertex.speed.y;

        // Bounce off edges
        if (vertex.x < 0 || vertex.x > dimensions.width) {
          vertex.speed.x *= -1;
        }

        if (vertex.y < 0 || vertex.y > dimensions.height) {
          vertex.speed.y *= -1;
        }

        // Draw connections to nearby vertices
        vertices.forEach((v2, j) => {
          if (i === j) return;

          const dx = vertex.x - v2.x;
          const dy = vertex.y - v2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < vertex.connectionRadius) {
            const opacity = 1 - (distance / vertex.connectionRadius);
            ctx.strokeStyle = vertex.color + Math.floor(opacity * 40).toString(16);
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(vertex.x, vertex.y);
            ctx.lineTo(v2.x, v2.y);
            ctx.stroke();
          }
        });

        // Draw vertex
        ctx.fillStyle = vertex.color;
        ctx.beginPath();
        ctx.arc(vertex.x, vertex.y, vertex.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw glow
        const glow = ctx.createRadialGradient(
          vertex.x, vertex.y, 0,
          vertex.x, vertex.y, vertex.size * 10
        );
        glow.addColorStop(0, vertex.color + "40");
        glow.addColorStop(1, vertex.color + "00");

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(vertex.x, vertex.y, vertex.size * 10, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [dimensions, isDark, primaryColor, secondaryColor, tertiaryColor, bgColor]);

  return (
    <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
      {dimensions.width > 0 && (
        <motion.canvas
          ref={canvasRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
          style={{
            background: bgColor,
          }}
        />
      )}

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      {/* Additional decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[10%] left-[20%] w-40 h-40 bg-primary/5 rounded-full filter blur-[50px]" />
        <div className="absolute top-[40%] right-[30%] w-60 h-60 bg-violet-500/5 rounded-full filter blur-[60px]" />
        <div className="absolute bottom-[20%] left-[40%] w-80 h-80 bg-indigo-500/5 rounded-full filter blur-[80px]" />
      </div>
    </div>
  );
}
