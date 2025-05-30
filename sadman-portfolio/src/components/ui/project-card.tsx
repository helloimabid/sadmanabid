"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
      <Card
        className={cn(
          "overflow-hidden h-full transition-all duration-300 border-border/50",
          "flex flex-col",
          isHovered ? "shadow-lg border-primary/30" : "hover:border-primary/20"
        )}
      >
        <div className="relative h-48 overflow-hidden sm:h-56">
          <Image
            src={image}
            alt={title}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            fill
            sizes="100vw"
            priority={featured}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />

          {featured && (
            <div className="absolute top-3 left-3 px-3 py-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-md shadow-md">
              Featured Project
            </div>
          )}
        </div>

        <div className="flex flex-col flex-1">
          <CardHeader>
            <CardTitle
              className={cn("line-clamp-1", featured ? "text-2xl" : "text-xl")}
            >
              {title}
            </CardTitle>
            <CardDescription
              className={cn(featured ? "line-clamp-3 mt-2" : "line-clamp-2")}
            >
              {description}
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-1">
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <motion.span
                  key={tag}
                  className={cn(
                    "px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground",
                    featured && "px-2.5 py-1.5"
                  )}
                  whileHover={{ scale: 1.05, y: -1 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </CardContent>

          <CardFooter className="flex w-full gap-3 pb-4">
            <div className="grid w-full grid-cols-2 gap-3">
              {demoUrl && (
                <MotionButton
                  href={demoUrl}
                  variant="default"
                  size={featured ? "default" : "sm"}
                  isExternal
                  withArrow
                  className={cn("w-full", !githubUrl && "col-span-2")}
                >
                  <span className="flex items-center justify-center gap-1.5">
                    <FaExternalLinkAlt
                      className={cn(
                        "flex-shrink-0",
                        featured ? "h-4 w-4" : "h-3.5 w-3.5"
                      )}
                    />
                    <span className="truncate">Demo</span>
                  </span>
                </MotionButton>
              )}

              {githubUrl && (
                <MotionButton
                  href={githubUrl}
                  variant="outline"
                  size={featured ? "default" : "sm"}
                  isExternal
                  className={cn("w-full", !demoUrl && "col-span-2")}
                >
                  <span className="flex items-center justify-center gap-1.5">
                    <FaGithub
                      className={cn(
                        "flex-shrink-0",
                        featured ? "h-4 w-4" : "h-3.5 w-3.5"
                      )}
                    />
                    <span className="truncate">Code</span>
                  </span>
                </MotionButton>
              )}
            </div>
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  );
}
