"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = progressRef.current;
    if (!element) return;

    // Wait for other ScrollTriggers (like pinning) to settle
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    const ctx = gsap.context(() => {
      gsap.to(element, {
        scaleX: 1,
        ease: "none",
        transformOrigin: "left",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 0,
          refreshPriority: -1, // Ensure this calculates AFTER pinning adds spacers
        },
      });
    });

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full h-1.5 z-[100] pointer-events-none mix-blend-difference"
      suppressHydrationWarning
    >
      <div
        ref={progressRef}
        className="w-full h-full bg-brutal-lime scale-x-0 origin-left"
        suppressHydrationWarning
      />
    </div>
  );
}
