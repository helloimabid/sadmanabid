"use client";

import { useState } from "react";
import { useTheme, type Theme } from "@/lib/theme-context";
import { Palette } from "lucide-react";

const themes: {
  value: Theme;
  label: string;
  colors: { bg: string; accent: string };
}[] = [
  {
    value: "red",
    label: "Brutal Red",
    colors: { bg: "#ff2019", accent: "#ccff00" },
  },
  {
    value: "blue",
    label: "Electric Blue",
    colors: { bg: "#0066ff", accent: "#ffff00" },
  },
  {
    value: "green",
    label: "Toxic Green",
    colors: { bg: "#00ff41", accent: "#ff00ff" },
  },
  {
    value: "purple",
    label: "Cyber Purple",
    colors: { bg: "#8b00ff", accent: "#00ffff" },
  },
  {
    value: "orange",
    label: "Neon Orange",
    colors: { bg: "#ff6600", accent: "#00ff00" },
  },
  {
    value: "pink",
    label: "Hot Pink",
    colors: { bg: "#ff0080", accent: "#ffff00" },
  },
  {
    value: "black",
    label: "Pure Black",
    colors: { bg: "#000000", accent: "#ffffff" },
  },
  {
    value: "white",
    label: "Pure White",
    colors: { bg: "#ffffff", accent: "#000000" },
  },
];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const isDarkBg =
    theme === "black" ||
    theme === "red" ||
    theme === "blue" ||
    theme === "purple" ||
    theme === "pink" ||
    theme === "orange";

  return (
    <div className="fixed bottom-4 right-4 z-[60]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border-2 hover:scale-110 transition-all duration-200 shadow-brutal ${
          isDarkBg ? "bg-black border-brutal-lime" : "bg-white border-black"
        }`}
        aria-label="Toggle theme"
      >
        <Palette
          className={`w-5 h-5 md:w-6 md:h-6 ${
            isDarkBg ? "text-brutal-lime" : "text-black"
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-black border-2 border-brutal-lime p-4 rounded-lg shadow-brutal min-w-[200px]">
          <p className="font-sans text-[10px] tracking-widest text-brutal-lime uppercase mb-3">
            Select Theme
          </p>
          <div className="space-y-2">
            {themes.map((t) => (
              <button
                key={t.value}
                onClick={() => {
                  setTheme(t.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 p-2 rounded transition-colors ${
                  theme === t.value
                    ? "bg-brutal-lime"
                    : "hover:bg-white/10"
                }`}
              >
                <div className="flex gap-1 flex-shrink-0">
                  <div
                    className={`w-4 h-4 rounded-sm border ${
                      theme === t.value ? "border-black" : "border-brutal-lime"
                    }`}
                    style={{ backgroundColor: t.colors.bg }}
                  />
                  <div
                    className={`w-4 h-4 rounded-sm border ${
                      theme === t.value ? "border-black" : "border-brutal-lime"
                    }`}
                    style={{ backgroundColor: t.colors.accent }}
                  />
                </div>
                <span 
                  className={`font-sans text-xs whitespace-nowrap ${
                    theme === t.value ? "text-black font-bold" : "text-white"
                  }`}
                >
                  {t.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
