"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "CompStudy",
    description: "Competitive study timer platform",
    subtitle: "Sadman Abid",
    year: "2025",
    image: "https://compstudy.tech/logo.png",
    demoUrl: "https://compstudy.tech",
  },
  {
    title: "OpenLearn",
    description: "AI-powered education platform",
    subtitle: "Sadman Abid",
    year: "2025",
    image: "https://i.ibb.co.com/tnw98Cd/IMG-0933.jpg",
    demoUrl: "https://openlearn.pages.dev",
  },
  {
    title: "Cyborg Marketplace",
    description: "Modern e-commerce platform",
    subtitle: "Sadman Abid",
    year: "2025",
    image: "https://i.ibb.co.com/pvFd7PJQ/cyborgss.png",
    demoUrl: "https://cyborg-marketplace-dimension.vercel.app/",
  },
  {
    title: "Portfolio V1",
    description: "Personal portfolio website",
    subtitle: "Sadman Abid",
    year: "2024",
    image: "https://i.ibb.co.com/Wpz5T6MZ/porfolio-SS.png",
    demoUrl: "https://helloimabid.me",
  },
  {
    title: "PrayerPro",
    description: "Prayer times utility app",
    subtitle: "Sadman Abid",
    year: "2024",
    image: "https://i.ibb.co.com/NgxMbcW7/image.png",
    demoUrl: "https://helloimabid.github.io/PrayerPro/",
  },
  {
    title: "Currency Converter",
    description: "Real-time currency converter",
    subtitle: "Sadman Abid",
    year: "2024",
    image: "https://i.ibb.co.com/P8nMrm0/image.png",
    demoUrl: "https://helloimabid.github.io/currency_converter/",
  },
  {
    title: "Bubble Game",
    description: "Interactive browser game",
    subtitle: "Sadman Abid",
    year: "2024",
    image: "https://i.ibb.co.com/8hwmsrK/image.png",
    demoUrl: "https://helloimabid.github.io/bubble_game/",
  },
];

export default function PortfolioList() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const { t } = useLanguage();
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const isTouchOrMobile = "ontouchstart" in window || window.innerWidth < 1024;
      setIsTouchDevice(isTouchOrMobile);
      setIsAutoPlaying(isTouchOrMobile);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Auto-play hover effects on mobile/tablet
  useEffect(() => {
    if (!isAutoPlaying) {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
      return;
    }

    let currentIndex = 0;
    
    autoPlayRef.current = setInterval(() => {
      setHoveredIndex(currentIndex);
      scrambleText(currentIndex);
      
      currentIndex = (currentIndex + 1) % projects.length;
    }, 2000); // Change every 2 seconds

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".project-item", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".projects-list",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrambleText = (index: number) => {
    const titleEl = titleRefs.current[index];
    if (!titleEl) return;

    const originalText = projects[index].title;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+";
    let iterations = 0;

    const interval = setInterval(() => {
      titleEl.innerText = originalText
        .split("")
        .map((letter, i) => {
          if (i < iterations) {
            return originalText[i];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      if (iterations >= originalText.length) {
        clearInterval(interval);
      }

      iterations += 1 / 3;
    }, 30);
  };

  const handleMouseMove = (
    e: React.MouseEvent<HTMLAnchorElement>,
    index: number
  ) => {
    const item = itemRefs.current[index];
    if (!item) return;

    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Magnetic effect
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const moveX = (x - centerX) * 0.1;
    const moveY = (y - centerY) * 0.1;

    gsap.to(item, {
      x: moveX,
      y: moveY,
      duration: 0.3,
      ease: "power2.out",
    });

    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = (index: number) => {
    setHoveredIndex(null);
    const item = itemRefs.current[index];
    if (item) {
      gsap.to(item, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen relative py-12 md:py-20 border-b border-black overflow-hidden"
      suppressHydrationWarning
    >
      <div className="mb-8 md:mb-16 px-4 md:px-8">
        <h2 className="font-sans text-[15vw] md:text-[12vw] font-black text-black leading-none tracking-tighter uppercase">
          {t.works.title}
        </h2>
      </div>

      {/* Projects list */}
      <div className="projects-list px-4 md:px-8" suppressHydrationWarning>
        {projects.map((project, index) => (
          <a
            key={index}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-item group block border-t-2 border-brutal-red last:border-b-2 cursor-pointer transition-colors duration-300 relative overflow-hidden"
            style={{
              backgroundColor:
                hoveredIndex === index ? "#CCFF00" : "transparent",
            }}
            onMouseEnter={() => {
              if (!isAutoPlaying) {
                setHoveredIndex(index);
                scrambleText(index);
              }
            }}
            onMouseLeave={() => {
              if (!isAutoPlaying) {
                handleMouseLeave(index);
              }
            }}
            onMouseMove={(e) => {
              if (!isAutoPlaying) {
                handleMouseMove(e, index);
              }
            }}
            onClick={() => {
              // Pause auto-play on click
              if (isAutoPlaying) {
                setIsAutoPlaying(false);
              }
            }}
            suppressHydrationWarning
          >
            {/* Cursor-following preview circle */}
            {!isTouchDevice && (
              <div
                className={`absolute pointer-events-none z-20 transition-opacity duration-200 ${
                  hoveredIndex === index ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  left: cursorPos.x,
                  top: cursorPos.y,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="w-28 h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 relative">
                  <svg
                    viewBox="0 0 100 100"
                    className="absolute inset-0 w-full h-full animate-spin-slow"
                  >
                    <defs>
                      <path
                        id={`floatingCirclePath-${index}`}
                        d="M 50, 50 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
                      />
                    </defs>
                    <circle
                      cx="50"
                      cy="50"
                      r="48"
                      fill="none"
                      stroke="#000"
                      strokeWidth="2"
                    />
                    <text className="fill-black text-[8px] font-sans uppercase tracking-[0.2em]">
                      <textPath href={`#floatingCirclePath-${index}`}>
                        CLICK HERE • CLICK HERE • CLICK HERE • CLICK HERE •
                      </textPath>
                    </text>
                  </svg>
                  <div className="absolute inset-4 md:inset-5 lg:inset-6 rounded-full overflow-hidden border-2 border-black bg-black">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            )}

            <div
              className="py-6 md:py-10 px-2 md:px-4 relative z-10"
              suppressHydrationWarning
            >
              {/* Top row with index */}
              <div
                className="flex items-start justify-between mb-4 md:mb-6"
                suppressHydrationWarning
              >
                <span className="font-sans text-xs text-black/60">
                  ({String(index + 1).padStart(2, "0")})
                </span>
              </div>

              {/* Main content row */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8">
                {/* Title */}
                <h3
                  ref={(el) => {
                    titleRefs.current[index] = el;
                  }}
                  className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase tracking-tight leading-none"
                  style={{ color: "#000" }}
                >
                  {project.title}
                </h3>

                {/* Right side */}
                <div className="flex items-center justify-between md:justify-end gap-6 md:gap-12 lg:gap-16">
                  <div className="md:text-right">
                    <p className="font-sans text-sm lg:text-base text-black">
                      {project.description}
                    </p>
                    <p className="font-sans text-xs text-black/60 mt-1">
                      {project.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="font-sans text-sm lg:text-base text-black hidden sm:inline">
                      {t.works.view}
                    </span>
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-black flex items-center justify-center group-hover:bg-black group-hover:text-brutal-lime transition-all duration-300">
                      <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
