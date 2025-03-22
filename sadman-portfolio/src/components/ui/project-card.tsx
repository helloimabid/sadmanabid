"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import MotionButton from "@/components/ui/motion-button";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  className?: string;
}

export default function ProjectCard({
  id,
  title,
  description,
  image,
  tags,
  demoUrl,
  githubUrl,
  featured = false,
  className,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layoutId={`project-${id}`}
      className={cn("group h-full", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className={cn(
        "overflow-hidden h-full transition-all duration-300 border-border/50",
        "flex flex-col",
        featured ? "lg:flex-row" : "",
        isHovered ? "shadow-lg border-primary/30" : "hover:border-primary/20"
      )}>
        <div className={cn(
          "relative overflow-hidden",
          featured ? "lg:w-1/2" : "h-48 sm:h-56"
        )}>
          <Image
            src={image}
            alt={title}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            fill
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />

          {featured && (
            <div className="absolute top-2 right-2 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded">
              Featured
            </div>
          )}
        </div>

        <div className={cn(
          "flex flex-col flex-1",
          featured ? "lg:w-1/2" : ""
        )}>
          <CardHeader>
            <CardTitle className="text-xl line-clamp-1">{title}</CardTitle>
            <CardDescription className="line-clamp-2">{description}</CardDescription>
          </CardHeader>

          <CardContent className="flex-1">
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <motion.span
                  key={tag}
                  className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
                  whileHover={{ scale: 1.05, y: -1 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </CardContent>

          <CardFooter className="flex gap-3 pb-4">
            {demoUrl && (
              <MotionButton
                href={demoUrl}
                variant="default"
                size="sm"
                isExternal
                withArrow
                className="flex-1"
              >
                <span className="flex items-center gap-1.5">
                  <FaExternalLinkAlt className="h-3.5 w-3.5" />
                  <span>Demo</span>
                </span>
              </MotionButton>
            )}

            {githubUrl && (
              <MotionButton
                href={githubUrl}
                variant="outline"
                size="sm"
                isExternal
                className="flex-1"
              >
                <span className="flex items-center gap-1.5">
                  <FaGithub className="h-3.5 w-3.5" />
                  <span>Code</span>
                </span>
              </MotionButton>
            )}
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  );
}
