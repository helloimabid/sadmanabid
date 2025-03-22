"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string | string[];
  className?: string;
  once?: boolean;
  speed?: number;
  delay?: number;
  tag?: keyof JSX.IntrinsicElements;
  typewriter?: boolean;
  infinite?: boolean;
}

const defaultAnimations = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function AnimatedText({
  text,
  className,
  once = true,
  speed = 0.05,
  delay = 0,
  tag = "div",
  typewriter = false,
  infinite = false,
}: AnimatedTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const textArray = Array.isArray(text) ? text : [text];

  useEffect(() => {
    if (!typewriter) return;

    const currentText = textArray[currentTextIndex];

    if (isTyping) {
      if (currentIndex < currentText.length) {
        const timeout = setTimeout(() => {
          setDisplayText((prev) => prev + currentText[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        }, speed * 1000);
        return () => clearTimeout(timeout);
      } else {
        if (!infinite) return;

        setIsTyping(false);
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (currentIndex > 0) {
        const timeout = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1));
          setCurrentIndex((prev) => prev - 1);
        }, speed * 500);
        return () => clearTimeout(timeout);
      } else {
        setIsTyping(true);
        setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
      }
    }
  }, [currentIndex, currentTextIndex, isTyping, speed, text, textArray, typewriter, infinite]);

  if (typewriter) {
    const Tag = tag;
    return <Tag className={className}>{displayText}<motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}>|</motion.span></Tag>;
  }

  const words = Array.isArray(text) ? text[0].split(" ") : text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: speed, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const Tag = tag;

  return (
    <Tag className={className}>
      <motion.div
        style={{ display: "inline-block", whiteSpace: "nowrap" }}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            className="inline-block"
            variants={child}
          >
            {word}{" "}
          </motion.span>
        ))}
      </motion.div>
    </Tag>
  );
}
