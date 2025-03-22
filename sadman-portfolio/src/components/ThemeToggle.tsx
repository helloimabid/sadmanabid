"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { MoonStar, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="relative p-2 overflow-hidden rounded-full border border-primary/20 bg-background hover:bg-accent transition-colors"
      whileTap={{ scale: 0.95 }}
      whileHover={{
        boxShadow: `0 0 20px ${isDark ? '#a855f7' : '#7c3aed'}30`
      }}
    >
      <motion.div
        className="grid place-items-center"
        animate={{
          rotate: isDark ? 0 : 180,
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{
          rotate: { type: "spring", stiffness: 100 },
          scale: { duration: 3, repeat: Infinity },
          opacity: { duration: 3, repeat: Infinity }
        }}
      >
        {isDark ? (
          <MoonStar className="w-5 h-5 text-violet-200" />
        ) : (
          <Sun className="w-5 h-5 text-amber-500" />
        )}
      </motion.div>

      {/* Visual effects */}
      <div className="absolute inset-0 pointer-events-none">
        {isDark ? (
          <>
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: ['0 0 0px #a855f7', '0 0 10px #a855f740', '0 0 0px #a855f7'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-violet-500/5 to-transparent" />
          </>
        ) : (
          <>
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: ['0 0 0px #f59e0b', '0 0 10px #f59e0b40', '0 0 0px #f59e0b'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-500/5 to-transparent" />
          </>
        )}
      </div>
    </motion.button>
  );
}
