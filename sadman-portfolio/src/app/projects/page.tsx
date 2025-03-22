"use client";

import { useState, useMemo } from "react";
import { projects, personalInfo } from "@/data/portfolio-data";
import AnimatedSection from "@/components/ui/animated-section";
import ProjectCard from "@/components/ui/project-card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // Extract unique tags from all projects
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach(project => {
      project.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // Filter projects based on selected tag
  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter(project => project.tags.includes(activeFilter));
  }, [activeFilter]);

  return (
    <>
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <AnimatedSection
            direction="up"
            variant="slide"
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">My Projects</h1>
            <p className="text-lg text-muted-foreground">
              A collection of my recent work. Each project showcases different skills and technologies.
            </p>
          </AnimatedSection>

          <AnimatedSection
            direction="up"
            variant="slide"
            delay={0.1}
            className="mb-12"
          >
            <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
              <Button
                variant={activeFilter === "all" ? "default" : "outline"}
                onClick={() => setActiveFilter("all")}
                className="rounded-full"
              >
                All Projects
              </Button>
              {allTags.map((tag) => (
                <Button
                  key={tag}
                  variant={activeFilter === tag ? "default" : "outline"}
                  onClick={() => setActiveFilter(tag)}
                  className="rounded-full"
                >
                  {tag}
                </Button>
              ))}
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatedSection className="col-span-full">
              {filteredProjects.length === 0 ? (
                <div className="text-center py-16">
                  <h3 className="text-xl font-semibold mb-2">No projects found</h3>
                  <p className="text-muted-foreground">
                    Try selecting a different filter.
                  </p>
                </div>
              ) : (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  layout
                >
                  {filteredProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.4 }}
                    >
                      <ProjectCard
                        id={project.id}
                        title={project.title}
                        description={project.description}
                        image={project.image}
                        tags={project.tags}
                        demoUrl={project.demoUrl}
                        githubUrl={project.githubUrl}
                        featured={project.featured}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection
              direction="up"
              variant="slide"
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Want to See More?</h2>
              <p className="text-muted-foreground">
                These are just some of the projects I've worked on. I'm constantly building new things and exploring new technologies.
              </p>
            </AnimatedSection>

            <AnimatedSection
              direction="up"
              variant="slide"
              delay={0.1}
              className="bg-card/50 backdrop-blur-sm p-8 rounded-xl border border-border/30"
            >
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">Have a project in mind?</h3>
                  <p className="text-muted-foreground mb-6">
                    Let's discuss how I can help bring your ideas to life. I'm always interested in taking on new and exciting challenges.
                  </p>

                  <Button asChild size="lg">
                    <a href="/contact">Let's Talk</a>
                  </Button>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">Check my GitHub</h3>
                  <p className="text-muted-foreground mb-6">
                    Visit my GitHub profile to see my open-source contributions and personal projects I'm working on.
                  </p>

                  <Button asChild variant="outline" size="lg">
                    <a href={personalInfo.socialLinks.github} target="_blank" rel="noopener noreferrer">
                      View GitHub
                    </a>
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
