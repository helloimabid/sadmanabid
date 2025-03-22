"use client";

import React, { ReactNode } from "react";
import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

type AnimationDirection = "up" | "down" | "left" | "right";
type AnimationVariant = "fade" | "slide" | "scale" | "rotate";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  direction?: AnimationDirection;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
  id?: string;
}

export default function AnimatedSection({
  children,
  className,
  direction = "up",
  variant = "fade",
  delay = 0,
  duration = 0.5,
  once = true,
  threshold = 0.1,
  id,
}: AnimatedSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold,
  });

  const getVariants = (): Variants => {
    const directionOffset = 50;

    const variants: Record<AnimationVariant, Variants> = {
      fade: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      },
      slide: {
        hidden: {
          opacity: 0,
          x: direction === "left" ? directionOffset : direction === "right" ? -directionOffset : 0,
          y: direction === "up" ? directionOffset : direction === "down" ? -directionOffset : 0,
        },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
        },
      },
      scale: {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 },
      },
      rotate: {
        hidden: { opacity: 0, rotate: direction === "left" ? -5 : 5, scale: 0.9 },
        visible: { opacity: 1, rotate: 0, scale: 1 },
      },
    };

    return variants[variant];
  };

  return (
    <motion.div
      ref={ref}
      id={id}
      className={cn(className)}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={getVariants()}
      transition={{
        duration,
        delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
}
