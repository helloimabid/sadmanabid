"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/context/ThemeContext";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "py-2 backdrop-blur-lg" : "py-4 bg-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Glowing border effect */}
      <motion.div
        className={cn(
          "absolute bottom-0 left-0 right-0 h-[1px]",
          isScrolled
            ? "bg-gradient-to-r from-transparent via-primary/30 to-transparent"
            : "bg-transparent"
        )}
        layoutId="navbar-border"
      />

      <div className="relative px-6 mx-auto max-w-7xl md:px-12">
        <div className="flex items-center justify-between">
          <Link href="/">
            <motion.div
              className="relative flex items-center text-2xl font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="font-mono text-foreground">Sadman</span>
              <span className="font-mono text-primary">Abid</span>

              {/* Futuristic bracket decoration */}
              <motion.span
                className="absolute top-0 font-light -left-4 text-primary/60"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {`<`}
              </motion.span>
              <motion.span
                className="absolute top-0 font-light -right-5 text-primary/60"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                {`/>`}
              </motion.span>

              {/* Underline effect */}
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/0 via-primary to-primary/0"
                animate={{
                  scaleX: [0.3, 1, 0.3],
                  x: ["-20%", "0%", "20%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="items-center hidden gap-6 md:flex">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <motion.div
                  className={cn(
                    "relative font-medium py-2 px-1",
                    pathname === item.path
                      ? "text-primary font-semibold"
                      : "text-foreground/80 hover:text-primary"
                  )}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                  {pathname === item.path && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/40 via-primary to-primary/40"
                      layoutId="navbar-indicator"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}

            <div className="ml-4">
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile Navigation */}
          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Menu className="w-5 h-5" />
                  <motion.span
                    className="absolute inset-0 rounded-md"
                    animate={{
                      boxShadow: isDark
                        ? [
                            "0 0 0px #a855f7",
                            "0 0 10px #a855f740",
                            "0 0 0px #a855f7",
                          ]
                        : [
                            "0 0 0px #7c3aed",
                            "0 0 10px #7c3aed40",
                            "0 0 0px #7c3aed",
                          ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>{" "}
              <SheetContent
                side="right"
                className="w-[80%] sm:w-[350px] p-0 border-l-primary/20 bg-background/95 backdrop-blur-xl"
              >
                <div className="flex flex-col h-full px-6 py-12">
                  {/* <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="absolute top-4 right-4"
                  >
                    <X className="w-5 h-5" />
                    <span className="sr-only">Close menu</span>
                  </Button> */}

                  <SheetHeader className="p-0 mb-8 text-left">
                    <SheetTitle className="flex items-center gap-2 font-mono text-2xl font-bold">
                      <span className="text-primary">~/</span>menu
                    </SheetTitle>
                    <SheetDescription className="sr-only">
                      Navigation menu for mobile devices
                    </SheetDescription>
                    <div className="mt-2 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                  </SheetHeader>

                  <nav className="flex flex-col gap-4 mt-4">
                    <AnimatePresence>
                      {navItems.map((item, index) => (
                        <motion.div
                          key={item.path}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                        >
                          <Link
                            href={item.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                              "text-xl font-medium py-3 px-4 block rounded-md transition-colors",
                              pathname === item.path
                                ? "bg-primary/10 text-primary font-semibold border-l-2 border-primary"
                                : "text-foreground/80 hover:bg-primary/5"
                            )}
                          >
                            <div className="flex items-center">
                              <span className="mr-3 font-mono text-sm text-primary/60">
                                0{index + 1}
                              </span>
                              {item.name}
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </nav>

                  <div className="mt-auto">
                    <div className="px-4 py-2 border rounded-md bg-muted/30 border-border/20">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          <span className="font-mono text-primary">sys</span> /
                          theme
                        </p>
                        <ThemeToggle />
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
