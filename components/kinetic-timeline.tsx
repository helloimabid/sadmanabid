"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/lib/language-context";

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
  { solid: "cyber", outline: "security" },
  { solid: "malware", outline: "analysis" },
  { solid: "reverse", outline: "engineering" },
  { solid: "exploit", outline: "dev" },
];

export default function KineticTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    const track = trackRef.current;
    if (!section || !container || !track) return;

    const ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Circle scale animation
      gsap.fromTo(
        circleRef.current,
        { scale: 0.3, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
          },
        }
      );

      // Skew effect on scroll
      const proxy = { skew: 0 };
      const skewSetter = gsap.quickSetter(".skill-item", "skewX", "deg");
      const clamp = gsap.utils.clamp(-20, 20);

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${totalWidth}`,
        onUpdate: (self) => {
          const skew = clamp(self.getVelocity() / -300);
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, {
              skew: 0,
              duration: 0.8,
              ease: "power3",
              overwrite: true,
              onUpdate: () => skewSetter(proxy.skew),
            });
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="h-screen relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      suppressHydrationWarning
    >
      <div
        ref={containerRef}
        className="h-full flex items-center overflow-hidden"
      >
        <div
          ref={circleRef}
          className="fixed pointer-events-none z-10 transition-opacity duration-300"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            transform: "translate(-50%, -50%)",
            opacity: isHovering ? 1 : 0,
          }}
        >
          <div className="w-[25vw] h-[25vw] md:w-[20vw] md:h-[20vw] rounded-full border border-black/30" />
        </div>

        {/* Static circle fallback */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[35vw] h-[35vw] md:w-[25vw] md:h-[25vw] rounded-full border border-black/20 pointer-events-none"
          style={{ opacity: isHovering ? 0 : 1, transition: "opacity 0.3s" }}
        />

        {/* Lime horizontal arrow line */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-20">
          <div className="flex-1 h-[2px] bg-brutal-lime" />
          <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[12px] border-l-brutal-lime" />
        </div>

        {/* About label on line */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-6 flex items-center gap-2 pointer-events-none z-20">
          <div className="w-2 h-2 rounded-full bg-brutal-lime" />
          <span className="font-sans text-xs text-black/60">
            ({t.skills.about} →)
          </span>
        </div>

        {/* Year indicator */}
        <div className="absolute top-4 md:top-8 right-4 md:right-8 z-20">
          <span className="font-sans text-sm md:text-base text-black/50">
            (2025)
          </span>
        </div>

        <div
          ref={trackRef}
          className="flex items-center whitespace-nowrap pl-[10vw]"
        >
          {skillsData.map((skill, index) => (
            <div
              key={index}
              className="skill-item flex items-baseline shrink-0 mr-8 md:mr-16"
            >
              <span className="font-serif italic text-[20vw] md:text-[18vw] text-black leading-none tracking-tight">
                {skill.solid}
              </span>
              <span
                className="font-sans font-bold text-[20vw] md:text-[18vw] text-transparent leading-none tracking-tight"
                style={{ WebkitTextStroke: "2px rgba(0,0,0,0.4)" }}
              >
                {skill.outline}
              </span>
              {index < skillsData.length - 1 && (
                <span className="text-black mx-4 md:mx-8 text-4xl md:text-6xl">
                  •
                </span>
              )}
            </div>
          ))}
          {/* End spacer */}
          <div className="w-[50vw] shrink-0" />
        </div>

        {/* Metadata bottom left */}
        <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 z-20">
          <p className="font-sans text-[9px] md:text-[11px] text-black tracking-wider leading-relaxed">
            {t.skills.roles.map((role, i) => (
              <span key={i}>
                {role}
                <br />
              </span>
            ))}
          </p>
        </div>

        {/* Metadata bottom right */}
        <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 text-right z-20">
          <p className="font-sans text-[9px] md:text-[11px] text-black/60 italic">
            {t.skills.welcome}{" "}
            <span className="text-black font-bold not-italic">2025</span>
          </p>
          <p className="font-sans text-[11px] md:text-[13px] text-black font-bold tracking-wide">
            {t.skills.portfolio}
          </p>
        </div>
      </div>
    </section>
  );
}
