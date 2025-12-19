"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/lib/language-context";

gsap.registerPlugin(ScrollTrigger);

export default function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-text", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Parallax effect for footer text
      gsap.to(".footer-parallax", {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-[70vh] md:min-h-screen relative py-12 md:py-20 px-4 md:px-8 md:pl-[80px] flex flex-col justify-center border-t border-black/20 overflow-hidden"
      suppressHydrationWarning
    >
      <div className="space-y-0 md:space-y-[-2vw] footer-parallax">
        <h2 className="footer-text font-sans font-bold text-[10vw] md:text-[8vw] leading-[0.9] tracking-tight hover:text-brutal-lime transition-colors duration-500 cursor-default">
          <span
            className="text-transparent"
            style={{ WebkitTextStroke: "1px rgba(0,0,0,0.3)" }}
          >
            {t.footer.endOfFile}
          </span>
        </h2>

        <p className="font-sans text-[10px] md:text-[12px] tracking-wider text-black/80 ml-[5vw] md:ml-[10vw] py-2">
          {t.footer.year} Sadman Abid{" "}
          <span className="bg-white text-black px-1">{t.footer.site}</span>
        </p>

        <h2 className="footer-text font-sans font-bold text-[10vw] md:text-[8vw] leading-[0.9] tracking-tight hover:tracking-wide transition-all duration-500 cursor-default">
          <span
            className="text-transparent"
            style={{ WebkitTextStroke: "1px rgba(0,0,0,0.4)" }}
          >
            End Of
          </span>
          <span className="text-black ml-2 md:ml-4">File</span>
        </h2>

        <h2 className="footer-text font-sans font-bold text-[10vw] md:text-[8vw] leading-[0.9] tracking-tight hover:text-brutal-lime transition-colors duration-500 cursor-default">
          <span
            className="text-transparent"
            style={{ WebkitTextStroke: "1px rgba(0,0,0,0.3)" }}
          >
            {t.footer.endOfFile}
          </span>
        </h2>
      </div>

      <div className="mt-8 md:mt-16 flex flex-col gap-6 md:flex-row md:justify-between md:items-end md:gap-8">
        <div>
          <p className="font-sans text-[8px] md:text-[10px] tracking-widest text-black uppercase mb-2">
            {t.footer.contact}
          </p>
          <a
            href="mailto:me@sadmanabid.me"
            className="font-sans text-[12px] md:text-[14px] text-black hover:text-brutal-lime transition-colors"
          >
            me@sadmanabid.me
          </a>
        </div>

        <div className="flex gap-6 md:gap-8">
          <a
            href="https://facebook.com/helloimabid"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[9px] md:text-[10px] tracking-widest text-black uppercase hover:text-brutal-lime transition-colors"
          >
            FB
          </a>
          <a
            href="https://instagram.com/helloimabid"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[9px] md:text-[10px] tracking-widest text-black uppercase hover:text-brutal-lime transition-colors"
          >
            IG
          </a>

          <a
            href="https://github.com/helloimabid"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[9px] md:text-[10px] tracking-widest text-black uppercase hover:text-brutal-lime transition-colors"
          >
            GH
          </a>
          <a
            href="https://linkedin.com/in/helloimabid"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[9px] md:text-[10px] tracking-widest text-black uppercase hover:text-brutal-lime transition-colors"
          >
            LI
          </a>
          <a
            href="https://x.com/helloimabid"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[9px] md:text-[10px] tracking-widest text-black uppercase hover:text-brutal-lime transition-colors"
          >
            X
          </a>
        </div>

        <div>
          <p className="font-sans text-[9px] md:text-[10px] text-black">
            © {t.footer.year} Sadman Abid
          </p>
          <p className="font-sans text-[9px] md:text-[10px] text-black/50">
            Dhaka, Bangladesh
          </p>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-black/10" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-black/10" />
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-black/10" />
      </div>
    </section>
  );
}
