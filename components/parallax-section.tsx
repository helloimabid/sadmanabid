"use client"

import { useRef, type ReactNode } from "react"

interface ParallaxSectionProps {
  children: ReactNode
  speed?: number
  className?: string
}

export default function ParallaxSection({ children, speed = 0.5, className = "" }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div ref={ref} data-speed={speed} className={`parallax-element ${className}`}>
      {children}
    </div>
  )
}
