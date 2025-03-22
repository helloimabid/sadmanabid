"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

interface MotionButtonProps extends ButtonProps {
  children: ReactNode;
  href?: string;
  className?: string;
  isExternal?: boolean;
  pulseEffect?: boolean;
  withArrow?: boolean;
}

export default function MotionButton({
  children,
  href,
  className,
  isExternal = false,
  pulseEffect = false,
  withArrow = false,
  ...props
}: MotionButtonProps) {
  const buttonContent = (
    <>
      <span className="relative z-10">{children}</span>
      {withArrow && (
        <motion.span
          className="relative z-10 ml-2"
          initial={{ x: 0 }}
          animate={{ x: [0, 5, 0] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 1.5,
            ease: "easeInOut",
          }}
        >
          →
        </motion.span>
      )}
      {pulseEffect && (
        <motion.span
          className="absolute inset-0 rounded-md bg-primary/20"
          initial={{ scale: 0.85, opacity: 1 }}
          animate={{ scale: 1.2, opacity: 0 }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 2,
            ease: "easeInOut",
          }}
        />
      )}
    </>
  );

  const buttonClasses = cn(
    "relative overflow-hidden",
    className
  );

  const motionProps = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 15,
    },
  };

  if (href) {
    const linkProps = isExternal
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

    return (
      <Link href={href} {...linkProps} className="inline-block">
        <motion.div {...motionProps}>
          <Button className={buttonClasses} {...props}>
            {buttonContent}
          </Button>
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.div {...motionProps}>
      <Button className={buttonClasses} {...props}>
        {buttonContent}
      </Button>
    </motion.div>
  );
}
