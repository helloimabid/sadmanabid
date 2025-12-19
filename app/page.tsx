"use client";

import { useState } from "react";
import HeroSection from "@/components/hero-section";
import KineticTimeline from "@/components/kinetic-timeline";
import AboutGrid from "@/components/about-grid";
import PortfolioList from "@/components/portfolio-list";
import ContactForm from "@/components/contact-form";
import FooterSection from "@/components/footer-section";
import LanguageToggle from "@/components/language-toggle";
import SmoothScroller from "@/components/smooth-scroller";
import LoadingScreen from "@/components/loading-screen";
import CustomCursor from "@/components/custom-cursor";
import VerticalScrollStrip from "@/components/vertical-scroll-strip";
import MobileMenu from "@/components/mobile-menu";
import ScrollProgress from "@/components/scroll-progress";
import ThemeToggle from "@/components/theme-toggle";
import { LanguageProvider } from "@/lib/language-context";
import { ThemeProvider } from "@/lib/theme-context";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ThemeProvider>
      <LanguageProvider>
        {isLoading && <LoadingScreen onFinish={() => setIsLoading(false)} />}
        <CustomCursor />
        <MobileMenu />
        <ScrollProgress />
        <ThemeToggle />
        <VerticalScrollStrip />
        <SmoothScroller>
          <main className="bg-brutal-red min-h-screen relative overflow-x-hidden md:pl-[60px]">
            <LanguageToggle />
            <div id="hero">
              <HeroSection />
            </div>
            <KineticTimeline />
            <div id="about">
              <AboutGrid />
            </div>
            <div id="works">
              <PortfolioList />
            </div>
            <div id="contact">
              <ContactForm />
            </div>
            <FooterSection />
          </main>
        </SmoothScroller>
      </LanguageProvider>
    </ThemeProvider>
  );
}
