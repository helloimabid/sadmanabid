"use client";

import Link from "next/link";
import Image from "next/image";
import { personalInfo, projects, skills, services } from "@/data/portfolio-data";
import AnimatedText from "@/components/ui/animated-text";
import AnimatedSection from "@/components/ui/animated-section";
import SkillBadge from "@/components/ui/skill-badge";
import MotionButton from "@/components/ui/motion-button";
import ProjectCard from "@/components/ui/project-card";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

// Simple animated background component
function CyberpunkBackground() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10"></div>

      {/* Grid background */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%">
          <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#smallGrid)" />
        </svg>
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-0 left-0 w-full h-full">
        <motion.div
          className="absolute top-[10%] left-[20%] w-40 h-40 bg-primary/5 rounded-full filter blur-[50px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-[40%] right-[30%] w-60 h-60 bg-violet-500/5 rounded-full filter blur-[60px]"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute bottom-[20%] left-[40%] w-80 h-80 bg-indigo-500/5 rounded-full filter blur-[80px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 7, repeat: Infinity, delay: 2 }}
        />
      </div>

      {/* Animated lines */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          animate={{ scaleX: [0, 1], opacity: [0, 0.5, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-3/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/10 to-transparent"
          animate={{ scaleX: [0, 1], opacity: [0, 0.3, 0] }}
          transition={{ duration: 7, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute bottom-1/2 right-0 h-full w-[1px] bg-gradient-to-b from-transparent via-primary/20 to-transparent"
          animate={{ scaleY: [0, 1], opacity: [0, 0.5, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        />
      </div>
    </div>
  );
}

export default function Home() {
  // Only show featured projects on the homepage
  const featuredProjects = projects.filter(project => project.featured);

  // Only show a subset of skills for the homepage
  const highlightedSkills = skills.slice(0, 6);

  // Get theme for conditional styling
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="relative overflow-hidden">
      <CyberpunkBackground />

      {/* Hero Section */}
      <section className="relative pt-28 md:pt-36 pb-20">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2 space-y-6">
              <AnimatedSection
                direction="up"
                variant="slide"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-mono leading-tight">
                  <span className="flex items-center gap-2 mb-2 text-lg font-medium text-primary">
                    <motion.span
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      &gt;
                    </motion.span>
                    Hi there, I'm
                  </span>
                  <AnimatedText
                    text={personalInfo.name}
                    className="block mb-2"
                    tag="span"
                  />
                  <span className="text-primary block relative">
                    <AnimatedText
                      text={personalInfo.title}
                      tag="span"
                      typewriter
                      infinite
                      speed={0.1}
                    />
                    <motion.div
                      className="absolute -right-8 -bottom-1 w-6 h-6"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="h-full w-[1px] bg-primary absolute right-0"></div>
                    </motion.div>
                  </span>
                </h1>
              </AnimatedSection>

              <AnimatedSection
                direction="up"
                variant="slide"
                delay={0.1}
              >
                <div className="relative">
                  <p className="text-lg text-muted-foreground max-w-lg pl-4 border-l border-primary/30">
                    {personalInfo.bio}
                  </p>

                  {/* Code-like decorative elements */}
                  <div className="font-mono text-primary/60 text-sm mt-4">
                    <p>&#123; status: <span className="text-green-400">online</span> &#125;</p>
                    <p>&#123; location: <span className="text-foreground">"{personalInfo.location}"</span> &#125;</p>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection
                direction="up"
                variant="slide"
                delay={0.2}
                className="flex flex-wrap gap-4 pt-4"
              >
                <MotionButton
                  href="/contact"
                  withArrow
                  size="lg"
                  className="px-8 font-mono"
                  pulseEffect
                >
                  <span className="text-primary/80 mr-2">&gt;</span>
                  Get in touch
                </MotionButton>

                <MotionButton
                  href="/projects"
                  variant="outline"
                  size="lg"
                  className="px-8 font-mono"
                >
                  <span className="text-primary/80 mr-2">/</span>
                  View Projects
                </MotionButton>
              </AnimatedSection>

              {/* Tech stack badges */}
              <AnimatedSection
                direction="up"
                variant="fade"
                delay={0.4}
                className="pt-6"
              >
                <div className="flex flex-wrap gap-2">
                  {["React", "Next.js", "TypeScript", "Tailwind"].map((tech, i) => (
                    <motion.div
                      key={tech}
                      className="bg-muted/30 backdrop-blur-sm border border-border/30 px-2 py-1 rounded-md text-xs font-mono"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + (i * 0.1) }}
                    >
                      <span className="text-primary mr-1">#</span>
                      {tech}
                    </motion.div>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            <div className="md:w-1/2 flex justify-center">
              <AnimatedSection
                direction="right"
                variant="slide"
                className="relative w-72 h-72 md:w-96 md:h-96"
              >
                {/* Decorative elements */}
                <motion.div
                  className="absolute inset-0 border-2 border-dashed border-primary/20 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-4 border border-primary/30 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                />

                {/* Glowing orbs */}
                <motion.div
                  className="absolute top-1/4 -left-4 w-8 h-8 rounded-full bg-primary/20 backdrop-blur-sm"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-1/4 -right-4 w-6 h-6 rounded-full bg-violet-500/20 backdrop-blur-sm"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                />

                {/* Profile image with frame */}
                <div className="absolute inset-10 rounded-full overflow-hidden p-2">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 z-10" />
                    <Image
                      src="/images/sadman-profile.jpg"
                      alt={personalInfo.name}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>

                {/* Status indicator */}
                <div className="absolute -bottom-4 -right-4 bg-card/80 backdrop-blur-lg px-4 py-2 rounded-lg border border-primary/20 shadow-lg">
                  <p className="text-sm font-mono flex items-center gap-2">
                    <motion.span
                      className="inline-block w-2 h-2 rounded-full bg-green-500"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    system.active
                  </p>
                </div>

                {/* Decorative circles */}
                <motion.div
                  className="w-full h-full absolute rounded-full"
                  style={{ background: 'radial-gradient(circle, rgba(124, 58, 237, 0.05) 0%, rgba(0, 0, 0, 0) 70%)' }}
                />
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 bg-muted/5 border-y border-primary/10 relative overflow-hidden">
        <div className="container px-4 mx-auto">
          <AnimatedSection
            direction="up"
            variant="slide"
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono relative inline-block">
              <span className="text-primary">#</span> Featured Projects
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/0 via-primary to-primary/0"
                animate={{ scaleX: [0.3, 1, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </h2>
            <p className="text-muted-foreground mt-4">
              A selection of my recent work. Check out my complete portfolio for more.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                image={project.image}
                tags={project.tags}
                demoUrl={project.demoUrl}
                githubUrl={project.githubUrl}
                featured
              />
            ))}
          </div>

          <AnimatedSection
            direction="up"
            variant="fade"
            delay={0.4}
            className="mt-12 flex justify-center"
          >
            <MotionButton href="/projects" variant="outline" withArrow className="font-mono">
              <span className="text-primary mr-1">&gt;</span>
              View all projects
            </MotionButton>
          </AnimatedSection>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 relative">
        <div className="container px-4 mx-auto">
          <AnimatedSection
            direction="up"
            variant="slide"
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono relative inline-block">
              <span className="text-primary">#</span> Tech Stack
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/0 via-primary to-primary/0"
                animate={{ scaleX: [0.3, 1, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </h2>
            <p className="text-muted-foreground mt-4">
              I'm constantly expanding my toolkit to build better digital experiences.
            </p>
          </AnimatedSection>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {highlightedSkills.map((skill, index) => (
              <AnimatedSection
                key={skill.name}
                direction="up"
                variant="slide"
                delay={index * 0.07}
              >
                <SkillBadge
                  name={skill.name}
                  icon={skill.icon}
                  color={skill.color}
                  level={skill.level}
                  description={skill.description}
                  withHover
                />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection
            direction="up"
            variant="fade"
            delay={0.4}
            className="mt-12 flex justify-center"
          >
            <MotionButton href="/about#skills" variant="outline" withArrow className="font-mono">
              <span className="text-primary mr-1">&gt;</span>
              View all skills
            </MotionButton>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 relative overflow-hidden bg-muted/5 border-y border-primary/10">
        {/* Decorative futuristic elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary/20" />
          <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-primary/20" />
          <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-primary/20" />
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-primary/20" />
        </div>

        <div className="container px-4 mx-auto relative">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedSection
              direction="up"
              variant="slide"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">
                <span className="text-primary">&gt;</span> Let's Work Together
              </h2>
            </AnimatedSection>

            <AnimatedSection
              direction="up"
              variant="slide"
              delay={0.1}
            >
              <p className="text-muted-foreground mb-8 md:text-lg">
                Got a project in mind? I'm currently available for freelance work.
                Let's create something amazing together!
              </p>
            </AnimatedSection>

            <AnimatedSection
              direction="up"
              variant="slide"
              delay={0.2}
            >
              <div className="flex flex-wrap justify-center gap-4">
                <MotionButton
                  href="/contact"
                  size="lg"
                  className="px-8 font-mono"
                  pulseEffect
                  withArrow
                >
                  <span className="text-primary/80 mr-2">&gt;</span>
                  Get in touch
                </MotionButton>

                <MotionButton
                  href={personalInfo.resumeUrl}
                  variant="outline"
                  size="lg"
                  className="px-8 font-mono"
                  isExternal
                >
                  <span className="text-primary/80 mr-2">/</span>
                  Download CV
                </MotionButton>
              </div>
            </AnimatedSection>

            {/* Terminal-like element */}
            <AnimatedSection
              direction="up"
              variant="fade"
              delay={0.4}
              className="mt-12 max-w-md mx-auto"
            >
              <div className="bg-muted/20 backdrop-blur-sm rounded-lg border border-primary/20 p-4 font-mono text-sm text-left">
                <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                  <span className="ml-2">terminal</span>
                </div>
                <div className="space-y-2">
                  <div className="flex">
                    <span className="text-primary mr-2">$</span>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.2 }}
                    >
                      <span className="text-muted-foreground">node contact.js</span>
                    </motion.div>
                  </div>
                  <div className="flex">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2, duration: 0.2 }}
                    >
                      <span className="text-green-400">[SUCCESS]</span>{" "}
                      <span className="text-muted-foreground">Ready to collaborate!</span>
                    </motion.div>
                  </div>
                  <div className="flex">
                    <span className="text-primary mr-2">$</span>
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="inline-block w-2 h-4 bg-primary"
                    />
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
