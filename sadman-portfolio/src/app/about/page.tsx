import Image from "next/image";
import {
  personalInfo,
  skills,
  
  education,
  achievements,
} from "@/data/portfolio-data";
import AnimatedSection from "@/components/ui/animated-section";
import AnimatedText from "@/components/ui/animated-text";
import SkillBadge from "@/components/ui/skill-badge";
import MotionButton from "@/components/ui/motion-button";
import { FaGraduationCap, FaBriefcase, FaAward, FaDownload } from "react-icons/fa";

export default function AboutPage() {
  return (
    <>
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <AnimatedSection
            direction="up"
            variant="slide"
            className="max-w-3xl mx-auto mb-16 text-center"
          >
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">About Me</h1>
            <p className="text-lg text-muted-foreground">
              Get to know more about my background, skills, and experience.
            </p>
          </AnimatedSection>

          <div className="grid items-start grid-cols-1 gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <AnimatedSection
                direction="left"
                variant="slide"
                className="sticky top-24"
              >
                <div className="relative w-full max-w-md mx-auto mb-6 overflow-hidden aspect-square rounded-xl">
                  <Image
                    src="/images/sadman-profile.jpg"
                    alt={personalInfo.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                <div className="p-6 border bg-card/50 backdrop-blur-sm rounded-xl border-border/30">
                  <h2 className="mb-4 text-2xl font-bold">Sadman Abid</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <span className="font-medium text-foreground">Location:</span> {personalInfo.location}
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-medium text-foreground">Email:</span> {personalInfo.email}
                    </p>
                  </div>

                  <div className="mt-6">
                    <MotionButton
                      href={personalInfo.resumeUrl}
                      variant="outline"
                      className="w-full"
                      isExternal
                    >
                      <FaDownload className="mr-2" />
                      Download Resume
                    </MotionButton>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            <div className="space-y-16 lg:col-span-3">
              <AnimatedSection
                direction="right"
                variant="slide"
              >
                <h3 className="pb-2 mb-6 text-2xl font-bold border-b border-border/50">Biography</h3>
                <div className="prose prose-lg dark:prose-invert">
                  {personalInfo.longBio.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-muted-foreground">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection
                direction="up"
                variant="slide"
                id="skills"
              >
                <h3 className="pb-2 mb-6 text-2xl font-bold border-b border-border/50">Skills</h3>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, index) => (
                    <AnimatedSection
                      key={skill.name}
                      direction="up"
                      variant="slide"
                      delay={index * 0.05}
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
              </AnimatedSection>

{/*               <AnimatedSection
                direction="up"
                variant="slide"
              >
                <h3 className="flex items-center gap-2 pb-2 mb-6 text-2xl font-bold border-b border-border/50">
                  <FaBriefcase className="text-primary" />
                  Work Experience
                </h3>
                <div className="space-y-8">
                  {experiences.map((experience, index) => (
                    <AnimatedSection
                      key={experience.company}
                      direction="up"
                      variant="slide"
                      delay={index * 0.1}
                      className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-border"
                    >
                      <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-primary -translate-x-[7px]" />
                      <div className="mb-1">
                        <h4 className="text-xl font-bold">{experience.title}</h4>
                        <p className="font-medium text-primary">{experience.company} | {experience.location}</p>
                        <p className="mb-3 text-sm text-muted-foreground">{experience.period}</p>
                      </div>
                      <p className="text-muted-foreground">{experience.description}</p>
                    </AnimatedSection>
                  ))}
                </div>
              </AnimatedSection> */}

              <AnimatedSection
                direction="up"
                variant="slide"
              >
                <h3 className="flex items-center gap-2 pb-2 mb-6 text-2xl font-bold border-b border-border/50">
                  <FaGraduationCap className="text-primary" />
                  Education
                </h3>
                <div className="space-y-8">
                  {education.map((edu, index) => (
                    <AnimatedSection
                      key={edu.institution + edu.period}
                      direction="up"
                      variant="slide"
                      delay={index * 0.1}
                      className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-border"
                    >
                      <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-primary -translate-x-[7px]" />
                      <div className="mb-1">
                        <h4 className="text-xl font-bold">{edu.degree}</h4>
                        <p className="font-medium text-primary">{edu.institution} | {edu.location}</p>
                        <p className="mb-3 text-sm text-muted-foreground">{edu.period}</p>
                      </div>
                      <p className="text-muted-foreground">{edu.description}</p>
                    </AnimatedSection>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection
                direction="up"
                variant="slide"
              >
                <h3 className="flex items-center gap-2 pb-2 mb-6 text-2xl font-bold border-b border-border/50">
                  <FaAward className="text-primary" />
                  Achievements
                </h3>
                <div className="space-y-6">
                  {achievements.map((achievement, index) => (
                    <AnimatedSection
                      key={achievement.title}
                      direction="up"
                      variant="slide"
                      delay={index * 0.1}
                      className="p-5 border rounded-lg bg-card/30 backdrop-blur-sm border-border/30"
                    >
                      <div className="mb-2">
                        <h4 className="text-lg font-bold">{achievement.title}</h4>
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-primary">{achievement.organization}</p>
                          <p className="text-sm text-muted-foreground">{achievement.date}</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{achievement.description}</p>
                    </AnimatedSection>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container px-4 mx-auto text-center">
          <AnimatedSection
            direction="up"
            variant="slide"
            className="max-w-3xl mx-auto"
          >
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Interested in Working Together?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
            </p>
            <MotionButton
              href="/contact"
              size="lg"
              pulseEffect
              withArrow
            >
              Get in Touch
            </MotionButton>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
