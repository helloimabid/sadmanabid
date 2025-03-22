"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface SkillBadgeProps {
  name: string;
  icon: ReactNode;
  color?: string;
  level?: number; // 1-5
  description?: string;
  className?: string;
  withHover?: boolean;
}

export default function SkillBadge({
  name,
  icon,
  color = "#7c3aed",
  level = 3,
  description,
  className,
  withHover = true,
}: SkillBadgeProps) {
  const badgeContent = (
    <motion.div
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-full",
        "border border-border/40 bg-secondary/30 backdrop-blur-sm",
        className
      )}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      style={{
        boxShadow: `0 0 12px ${color}10`,
      }}
    >
      <span className="text-lg" style={{ color }}>
        {icon}
      </span>
      <span className="text-sm font-medium">{name}</span>
    </motion.div>
  );

  if (!withHover || !description) {
    return badgeContent;
  }

  return (
    <HoverCard>
      <HoverCardTrigger asChild>{badgeContent}</HoverCardTrigger>
      <HoverCardContent className="w-72">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold flex items-center gap-2">
              <span style={{ color }}>{icon}</span> {name}
            </h4>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        <div className="mt-2">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                className="h-1.5 rounded-full bg-muted"
                style={{
                  width: i === 0 ? 12 : i === 1 ? 16 : i === 2 ? 20 : i === 3 ? 24 : 28,
                  backgroundColor: i < level ? color : undefined,
                }}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
              />
            ))}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
