"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface LoadingScreenProps {
  onFinish: () => void;
}

export default function LoadingScreen({ onFinish }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [counter, setCounter] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const meta0Ref = useRef<HTMLSpanElement>(null);
  const meta1Ref = useRef<HTMLSpanElement>(null);
  const meta2Ref = useRef<HTMLSpanElement>(null);
  const meta3Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const metaRefs = [
      meta0Ref.current,
      meta1Ref.current,
      meta2Ref.current,
      meta3Ref.current,
    ];

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Flicker effect for metadata
      const flickerInterval = setInterval(() => {
        metaRefs.forEach((ref) => {
          if (ref) {
            gsap.to(ref, {
              opacity: 0.3 + Math.random() * 0.7,
              duration: 0.05,
            });
          }
        });
      }, 100);

      // Counter animation
      const counterObj = { value: 0 };
      tl.to(counterObj, {
        value: 100,
        duration: 2.5,
        ease: "power4.inOut",
        onUpdate: () => {
          setCounter(Math.floor(counterObj.value));
        },
        onComplete: () => {
          clearInterval(flickerInterval);

          // Exit animation
          const exitTl = gsap.timeline({
            onComplete: onFinish,
          });

          // Scale up and fade out the counter
          exitTl.to(counterRef.current, {
            scale: 5,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
          });

          // Wipe the background upwards
          exitTl.to(
            containerRef.current,
            {
              clipPath: "inset(0 0 100% 0)",
              duration: 0.8,
              ease: "power3.inOut",
            },
            "-=0.4"
          );
        },
      });

      return () => clearInterval(flickerInterval);
    }, containerRef);

    return () => ctx.revert();
  }, [isMounted, onFinish]);

  if (!isMounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-brutal-red flex items-center justify-center"
      style={{ clipPath: "inset(0 0 0 0)" }}
    >
      {/* Corner metadata */}
      <span
        ref={meta0Ref}
        className="absolute top-4 left-4 text-[10px] font-mono text-black/80"
      >
        LOADING ASSETS...
      </span>
      <span
        ref={meta1Ref}
        className="absolute top-4 right-4 text-[10px] font-mono text-black/80"
      >
        (2025.12.19)
      </span>
      <span
        ref={meta2Ref}
        className="absolute bottom-4 left-4 text-[10px] font-mono text-black/80"
      >
        COORD: 23.8103° N
      </span>
      <span
        ref={meta3Ref}
        className="absolute bottom-4 right-4 text-[10px] font-mono text-black/80"
      >
        v.1.0.4
      </span>

      {/* Central counter */}
      <span
        ref={counterRef}
        className="font-serif text-black text-[20vw] md:text-[15vw] font-black tracking-[-0.05em] leading-none"
      >
        {counter.toString().padStart(2, "0")}
      </span>
    </div>
  );
}
