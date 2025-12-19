"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroller({ children }: { children: ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile =
      window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;

    if (isMobile) {
      return;
    }

    document.documentElement.style.scrollBehavior = "smooth";

    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      document.documentElement.style.scrollBehavior = "";
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div ref={contentRef} suppressHydrationWarning>
      {children}
    </div>
  );
}
