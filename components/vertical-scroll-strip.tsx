"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/lib/language-context";

gsap.registerPlugin(ScrollTrigger);

export default function VerticalScrollStrip() {
  const stripRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !stripRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      const content = contentRef.current!;
      const strip = stripRef.current!;

      // Calculate the distance to scroll
      const scrollDistance = Math.max(
        0,
        content.scrollHeight - strip.clientHeight
      );

      if (scrollDistance > 0) {
        gsap.to(content, {
          y: -scrollDistance,
          ease: "none",
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });
      }
    });

    // Refresh ScrollTrigger when window resizes or after any scroll
    const handleRefresh = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleRefresh);

    // Set up a timeout to refresh after initial load
    const timer = setTimeout(handleRefresh, 100);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", handleRefresh);
      clearTimeout(timer);
    };
  }, [isMounted]);

  const items =
    lang === "EN"
      ? [
          { text: "PORTFOLIO", type: "text" },
          { text: "2025", type: "year" },
          { text: "SADMAN", type: "name" },
          { text: "ABID", type: "name" },
          { text: "+", type: "symbol" },
          { text: "SECURITY", type: "text" },
          { text: "2025", type: "year" },
          { text: "CYBER", type: "text" },
          { text: "MALWARE", type: "text" },
          { text: "ANALYST", type: "text" },
          { text: "2025", type: "year" },
          { text: "SADMAN", type: "name" },
          { text: "ABID", type: "name" },
          { text: "CODE", type: "text" },
          { text: "+", type: "symbol" },
        ]
      : [
          { text: "পোর্টফোলিও", type: "text" },
          { text: "২০২৫", type: "year" },
          { text: "সাদমান", type: "name" },
          { text: "আবিদ", type: "name" },
          { text: "+", type: "symbol" },
          { text: "সিকিউরিটি", type: "text" },
          { text: "২০২৫", type: "year" },
          { text: "সাইবার", type: "text" },
          { text: "ম্যালওয়্যার", type: "text" },
          { text: "অ্যানালিস্ট", type: "text" },
          { text: "২০২৫", type: "year" },
          { text: "সাদমান", type: "name" },
          { text: "আবিদ", type: "name" },
          { text: "কোড", type: "text" },
          { text: "+", type: "symbol" },
        ];

  const repeatedItems = [...items, ...items, ...items];

  if (!isMounted) return null;

  return (
    <div
      ref={stripRef}
      className="fixed left-0 top-0 bottom-0 w-[40px] md:w-[60px] bg-brutal-red border-r border-black/20 z-40 overflow-hidden hidden md:block"
    >
      <div className="absolute left-2 top-0 bottom-0 w-[2px] bg-brutal-lime" />

      <div ref={contentRef} className="py-8">
        {repeatedItems.map((item, i) => (
          <div
            key={i}
            className={`
              py-4 px-2 text-center
              ${
                item.type === "year"
                  ? "text-brutal-lime font-mono text-[10px] tracking-widest"
                  : ""
              }
              ${
                item.type === "text"
                  ? "text-black/60 font-sans text-[9px] tracking-[0.3em] uppercase"
                  : ""
              }
              ${
                item.type === "name"
                  ? "text-black/80 font-sans text-[11px] tracking-[0.2em] font-bold"
                  : ""
              }
              ${item.type === "symbol" ? "text-black/40 text-[20px]" : ""}
            `}
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}
