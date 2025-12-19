"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLanguage } from "@/lib/language-context";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.3,
      });

      gsap.from(galleryRef.current, {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.5,
      });

      gsap.from(".hero-meta", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.7,
      });

      // Background lines animation
      gsap.from(".bg-line", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.5,
        stagger: 0.2,
        ease: "power4.out",
      });

      // Scroll indicator animation
      gsap.to(".scroll-line", {
        height: "40px",
        y: 10,
        opacity: 0.5,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // Parallax effect on mouse move
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 20;
        const yPos = (clientY / window.innerHeight - 0.5) * 20;

        gsap.to(".parallax-bg", {
          x: xPos,
          y: yPos,
          duration: 1,
          ease: "power2.out",
        });

        gsap.to(titleRef.current, {
          x: xPos * 2,
          y: yPos * 2,
          duration: 1,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen relative flex items-center justify-center border-b border-black px-4 overflow-hidden"
      suppressHydrationWarning
    >
      <div
        ref={galleryRef}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:block parallax-bg"
      >
        {/* <span
          className="font-sans text-[10px] tracking-[0.3em] text-black writing-vertical-lr uppercase"
          style={{ writingMode: "vertical-lr" }}
        >
          GALLERY
        </span> */}
      </div>

      <div className="absolute inset-0 pointer-events-none hidden md:block parallax-bg">
        <div className="bg-line absolute left-[20%] top-0 bottom-0 w-px bg-black/20" />
        <div className="bg-line absolute left-[40%] top-0 bottom-0 w-px bg-black/20" />
        <div className="bg-line absolute left-[60%] top-0 bottom-0 w-px bg-black/20" />
        <div className="bg-line absolute left-[80%] top-0 bottom-0 w-px bg-black/20" />
      </div>

      {/* Main content */}
      <div className="text-center relative z-10">
        <p className="hero-meta font-sans text-[8px] md:text-[10px] tracking-widest text-black mb-4 uppercase">
          {t.hero.subtitle}
        </p>
        <h1
          ref={titleRef}
          className="font-serif text-[25vw] md:text-[20vw] leading-[0.85] text-black font-normal tracking-tight hover:scale-105 transition-transform duration-700 ease-out cursor-default"
          onMouseEnter={() => {
            gsap.to(titleRef.current, {
              skewX: -5,
              duration: 0.5,
              ease: "power2.out",
            });
          }}
          onMouseLeave={() => {
            gsap.to(titleRef.current, {
              skewX: 0,
              duration: 0.5,
              ease: "elastic.out(1, 0.3)",
            });
          }}
        >
          {t.hero.start}
        </h1>
        <p className="hero-meta font-sans text-[8px] md:text-[10px] tracking-widest text-black mt-4">
          (2025)
        </p>
      </div>

      {/* Scroll prompt */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hero-meta">
        <span className="font-sans text-[8px] md:text-[10px] tracking-widest text-black uppercase">
          {t.hero.scrollDown}
        </span>
        <div className="scroll-line w-px h-6 md:h-8 bg-black" />
      </div>

      <div className="absolute top-4 md:top-8 right-4 md:right-8 text-right hero-meta">
        <p className="font-sans text-[8px] md:text-[10px] text-black">
          {t.hero.location}
        </p>
        <p className="font-sans text-[8px] md:text-[10px] text-black">
          23.8103° N
        </p>
      </div>
    </section>
  );
}
