"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useLanguage } from "@/lib/language-context";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    ctxRef.current = gsap.context(() => {}, menuRef);
    return () => ctxRef.current?.revert();
  }, []);

  useEffect(() => {
    ctxRef.current?.add(() => {
      if (isOpen) {
        gsap.to(overlayRef.current, {
          clipPath: "circle(150% at top left)",
          duration: 0.8,
          ease: "power4.inOut",
        });

        gsap.fromTo(
          ".menu-link",
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            delay: 0.3,
            ease: "power3.out",
            overwrite: true,
          }
        );
      } else {
        gsap.to(overlayRef.current, {
          clipPath: "circle(0% at top left)",
          duration: 0.6,
          ease: "power4.inOut",
          overwrite: true,
        });
      }
    });
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={menuRef} className="md:hidden" suppressHydrationWarning>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 left-4 z-[60] w-12 h-12 bg-black rounded-full flex flex-col items-center justify-center gap-1.5 mix-blend-difference"
      >
        <span
          className={`w-6 h-0.5 bg-brutal-lime transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`w-6 h-0.5 bg-brutal-lime transition-all duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`w-6 h-0.5 bg-brutal-lime transition-all duration-300 ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Menu Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 bg-black flex items-center justify-center"
        style={{ clipPath: "circle(0% at top left)" }}
        suppressHydrationWarning
      >
        <div
          ref={linksRef}
          className="flex flex-col gap-8 text-center"
          suppressHydrationWarning
        >
          <button
            onClick={() => scrollToSection("hero")}
            className="menu-link font-serif text-5xl text-brutal-red hover:text-brutal-lime transition-colors"
          >
            {t.hero.start}
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="menu-link font-serif text-5xl text-brutal-red hover:text-brutal-lime transition-colors"
          >
            {t.about.title}
          </button>
          <button
            onClick={() => scrollToSection("works")}
            className="menu-link font-serif text-5xl text-brutal-red hover:text-brutal-lime transition-colors"
          >
            {t.works.title}
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="menu-link font-serif text-5xl text-brutal-red hover:text-brutal-lime transition-colors"
          >
            {t.contact.title}
          </button>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-8 left-8 text-brutal-lime font-mono text-xs">
          COORD: 23.8103° N
        </div>
        <div className="absolute bottom-8 right-8 text-brutal-lime font-mono text-xs">
          (2025)
        </div>
      </div>
    </div>
  );
}
