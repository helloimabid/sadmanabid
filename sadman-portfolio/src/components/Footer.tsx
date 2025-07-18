"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { useTheme } from "@/context/ThemeContext";

const socialLinks = [
  
  {
    name: "FaceBook",
    icon: <FaFacebookSquare className="h-5 w-5" />,
    url: "https://facebook.com/helloimabid",
  },
  {
    name: "GitHub",
    icon: <FaGithub className="h-5 w-5" />,
    url: "https://github.com/helloimabid",
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedin className="h-5 w-5" />,
    url: "https://linkedin.com/in/helloimabid",
  },
  {
    name: "Twitter",
    icon: <FaTwitter className="h-5 w-5" />,
    url: "https://twitter.com/helloimabid",
  },
  {
    name: "Email",
    icon: <FaEnvelope className="h-5 w-5" />,
    url: "mailto:helloimabid@gmail.com",
  },
];

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <footer className="relative border-t border-border/30 overflow-hidden">
      {/* Animated circuit board background */}
      <div className="absolute inset-0 -z-10">
        <svg width="100%" height="100%" className="opacity-5">
          <pattern
            id="grid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-primary/40"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Random circuit paths */}
          <path
            d="M10,30 L50,30 L50,10 L90,10 L90,50 L130,50 L130,90"
            stroke={isDark ? "#a855f7" : "#7c3aed"}
            strokeWidth="0.5"
            fill="none"
            className="opacity-20"
          />
          <path
            d="M50,50 L90,50 L90,90 L130,90 L130,130"
            stroke={isDark ? "#8b5cf6" : "#a855f7"}
            strokeWidth="0.5"
            fill="none"
            className="opacity-20"
          />
          <path
            d="M10,90 L50,90 L50,130 L90,130 L90,170"
            stroke={isDark ? "#6366f1" : "#8b5cf6"}
            strokeWidth="0.5"
            fill="none"
            className="opacity-20"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Link href="/">
              <motion.div
                className="text-2xl font-bold inline-block relative font-mono"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-foreground">Sadman</span>
                <span className="text-primary">Abid</span>

                {/* Futuristic bracket decoration */}
                <motion.span
                  className="absolute -left-4 top-0 text-primary/60 font-light"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {`<`}
                </motion.span>
                <motion.span
                  className="absolute -right-4 top-0 text-primary/60 font-light"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  {`/>`}
                </motion.span>
              </motion.div>
            </Link>
            <p className="text-muted-foreground max-w-xs">
              A passionate Web Developer from Bangladesh, building user-friendly
              scalable websites for the best user experience.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold font-mono flex items-center gap-2">
              <span className="text-primary">#</span>Quick Links
            </h3>
            <div className="h-[1px] w-20 bg-gradient-to-r from-primary to-transparent"></div>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                <motion.span
                  className="text-primary/60"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  &gt;
                </motion.span>
                Home
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                <motion.span
                  className="text-primary/60"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                >
                  &gt;
                </motion.span>
                About
              </Link>
              <Link href="/projects" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                <motion.span
                  className="text-primary/60"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                >
                  &gt;
                </motion.span>
                Projects
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                <motion.span
                  className="text-primary/60"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                >
                  &gt;
                </motion.span>
                Contact
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold font-mono flex items-center gap-2">
              <span className="text-primary">#</span>Connect
            </h3>
            <div className="h-[1px] w-20 bg-gradient-to-r from-primary to-transparent"></div>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-secondary/30 backdrop-blur-sm rounded-md text-foreground hover:text-primary-foreground transition-colors border border-border/20 hover:border-primary/50 hover:bg-primary"
                  whileHover={{
                    y: -5,
                    boxShadow: [
                      `0 0 10px ${isDark ? '#a855f7' : '#7c3aed'}30`,
                      `0 0 20px ${isDark ? '#a855f7' : '#7c3aed'}20`
                    ]
                  }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.name}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>

            <div className="mt-4 px-4 py-3 rounded-md bg-muted/30 border border-border/20">
              <p className="text-sm font-mono flex items-center gap-2">
                <span className="text-primary">&gt;</span>
                <span className="text-muted-foreground typing-effect">Available for work</span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="inline-block w-2 h-4 bg-primary"
                />
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/30 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm text-muted-foreground font-mono">
            <span className="text-primary">&copy;</span> {new Date().getFullYear()} Sadman Abid <span className="text-primary">||</span> All rights reserved.
          </p>
          <motion.p
            className="text-sm text-muted-foreground flex items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.span
              className="inline-block"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ❤️
            </motion.span>
            <span className="font-mono">
              <span className="text-primary">[</span> Designed & Built with passion <span className="text-primary">]</span>
            </span>
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
