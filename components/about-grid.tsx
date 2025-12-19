"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/lib/language-context";

gsap.registerPlugin(ScrollTrigger);

export default function AboutGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();
  const [barWidths, setBarWidths] = useState<string[]>([]);

  const skills = {
    security: t.about.skills.security,
    development: t.about.skills.development,
    tools: t.about.skills.tools,
    learning: t.about.skills.learning,
  };

  useEffect(() => {
    // Generate random widths only on client side
    setBarWidths(
      Array.from({ length: 20 }, () => (Math.random() > 0.5 ? "2px" : "1px"))
    );
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-title", {
        y: 100,
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      gsap.from(".grid-col", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-grid",
          start: "top 80%",
        },
      });

      gsap.from(".bio-text", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".bio-text",
          start: "top 85%",
        },
      });

      gsap.from(".edu-item", {
        x: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".education-section",
          start: "top 85%",
        },
      });

      gsap.from(".achievement-item", {
        x: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".achievements-section",
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen relative py-12 md:py-20 px-4 md:px-8 border-b border-black"
      suppressHydrationWarning
    >
      {/* Section title - Using translations */}
      <div className="mb-8 md:mb-16 overflow-hidden">
        <h2 className="about-title font-serif text-[18vw] md:text-[15vw] text-black leading-none">
          {t.about.title}
        </h2>
      </div>

      {/* Skills Grid - Updated categories for security focus */}
      <div className="about-grid grid grid-cols-2 md:grid-cols-4 gap-px bg-black mb-8 md:mb-16">
        {Object.entries(skills).map(([category, items]) => (
          <div
            key={category}
            className="grid-col bg-brutal-red p-4 md:p-6 group hover:bg-black transition-colors duration-300"
          >
            <h3 className="font-sans text-[8px] md:text-[10px] tracking-widest text-black group-hover:text-brutal-lime uppercase mb-4 md:mb-6 border-b border-black group-hover:border-brutal-lime pb-2 transition-colors duration-300">
              {category}
            </h3>
            <ul className="space-y-1 md:space-y-2">
              {items.map((item) => (
                <li
                  key={item}
                  className="font-sans text-[10px] md:text-[11px] text-black group-hover:text-white transition-colors duration-300 transform group-hover:translate-x-1"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bio - Using translations */}
      <div className="bio-text max-w-2xl mb-12 md:mb-16">
        <p className="font-sans text-[11px] md:text-[12px] leading-relaxed text-black text-justify">
          {t.about.bio}
        </p>
        <div className="mt-6 md:mt-8 flex flex-wrap gap-4 md:gap-8">
          <a
            href="https://github.com/helloimabid"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[9px] md:text-[10px] tracking-widest text-black uppercase hover:text-brutal-lime transition-colors"
          >
            GitHub →
          </a>
          <a
            href="https://linkedin.com/in/helloimabid"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[9px] md:text-[10px] tracking-widest text-black uppercase hover:text-brutal-lime transition-colors"
          >
            LinkedIn →
          </a>
          <a
            href="mailto:hello@helloimabid.me"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[9px] md:text-[10px] tracking-widest text-black uppercase hover:text-brutal-lime transition-colors"
          >
            Email →
          </a>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        {/* Education - Using translations */}
        <div className="education-section">
          <h3 className="font-sans text-[10px] md:text-[11px] tracking-widest text-black uppercase mb-6 border-b border-black pb-2">
            {t.about.education}
          </h3>
          <div className="space-y-4">
            {t.about.educationItems.map((edu, index) => (
              <div
                key={index}
                className="edu-item border-l-2 border-black pl-4"
              >
                <p className="font-sans text-[11px] md:text-[12px] font-bold text-black">
                  {edu.degree}
                </p>
                <p className="font-sans text-[10px] md:text-[11px] text-black/70">
                  {edu.institution}
                </p>
                <p className="font-mono text-[9px] text-black/50 mt-1">
                  {edu.period}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements - Using translations */}
        <div className="achievements-section">
          <h3 className="font-sans text-[10px] md:text-[11px] tracking-widest text-black uppercase mb-6 border-b border-black pb-2">
            {t.about.achievements}
          </h3>
          <div className="space-y-3">
            {t.about.achievementItems.map((achievement, index) => (
              <div
                key={index}
                className="achievement-item flex items-start justify-between gap-4 border-l-2 border-brutal-lime pl-4"
              >
                <div>
                  <p className="font-sans text-[10px] md:text-[11px] font-bold text-black">
                    {achievement.title}
                  </p>
                  <p className="font-sans text-[9px] md:text-[10px] text-black/70">
                    {achievement.org}
                  </p>
                </div>
                <span className="font-mono text-[9px] text-black/50 shrink-0">
                  {achievement.year}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 hidden md:block">
        <div className="flex gap-[2px]">
          {barWidths.map((width, i) => (
            <div
              key={i}
              className="bg-black"
              style={{
                width: width,
                height: "30px",
              }}
            />
          ))}
        </div>
        <p className="font-mono text-[8px] text-black mt-1">SA-2025-PF</p>
      </div>
    </section>
  );
}
