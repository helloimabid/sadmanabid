"use client"

import { useEffect, useRef, useId } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface WavyTextProps {
  text: string
  className?: string
}

export default function WavyText({ text, className = "" }: WavyTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const pathId = useId().replace(/:/g, "")

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".wavy-text-path",
        { attr: { startOffset: "-50%" } },
        {
          attr: { startOffset: "0%" },
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      )
    }, container)

    return () => ctx.revert()
  }, [text])

  return (
    <div ref={containerRef} className={`wavy-text-container w-full overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 1400 200"
        className="w-[200%] md:w-[150%] h-auto"
        preserveAspectRatio="xMidYMid slice"
        style={{ marginLeft: "-25%" }}
      >
        <defs>
          <path
            id={pathId}
            d="M-400,100 C-200,30 -100,170 100,100 C300,30 400,170 600,100 C800,30 900,170 1100,100 C1300,30 1400,170 1600,100 C1800,30 1900,170 2100,100"
            fill="none"
          />
        </defs>
        <text className="fill-current font-serif" style={{ fontSize: "100px", fontWeight: 400, fontStyle: "italic" }}>
          <textPath href={`#${pathId}`} startOffset="-50%" className="wavy-text-path">
            {text} • {text} • {text} • {text} •
          </textPath>
        </text>
      </svg>
    </div>
  )
}
