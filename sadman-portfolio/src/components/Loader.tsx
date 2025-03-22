"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const simulateLoading = () => {
      setProgress(prevProgress => {
        // Simulate realistic loading with slowdown near completion
        if (prevProgress < 70) {
          return prevProgress + Math.random() * 15;
        } else if (prevProgress < 90) {
          return prevProgress + Math.random() * 5;
        } else if (prevProgress < 99) {
          return prevProgress + Math.random() * 2;
        }
        return 100;
      });
    };

    if (progress < 100) {
      timeoutId = setTimeout(simulateLoading, 200);
    } else {
      // When loading completes
      timeoutId = setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }

    return () => clearTimeout(timeoutId);
  }, [progress]);

  // Check for document existence for server-side rendering
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (isLoading) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }

    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
    };
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 bg-background dark:bg-zinc-900"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.5,
              delay: 0.2
            }
          }}
        >
          <div className="w-80 flex flex-col items-center">
            <div className="text-4xl font-bold mb-12 tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-400">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                SADMAN<span className="text-primary">ABID</span>
              </motion.span>
            </div>

            <div className="w-full h-2 bg-zinc-800 dark:bg-zinc-700 rounded-full overflow-hidden mb-4">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-violet-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="flex justify-between w-full">
              <div className="text-sm font-medium text-muted-foreground">
                <motion.div
                  initial={{ opacity: .4 }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  INITIALIZING SYSTEM
                </motion.div>
              </div>
              <div className="text-sm font-medium">
                <motion.span
                  key={Math.floor(progress)}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="inline-block"
                >
                  {Math.floor(progress)}%
                </motion.span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-2">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-1 w-12 bg-primary/60 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              ))}
            </div>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground opacity-60">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                © 2025 SADMAN ABID • SYSTEM v1.0
              </motion.span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
