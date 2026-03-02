"use client";

import { m } from "framer-motion";

const EASE: [number, number, number, number] = [0.25, 0.4, 0.25, 1];

interface SlideInProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  delay?: number;
  duration?: number;
  className?: string;
}

export function SlideIn({
  children,
  direction = "left",
  delay = 0,
  duration = 0.7,
  className,
}: SlideInProps) {
  const x = direction === "left" ? -60 : 60;

  return (
    <m.div
      initial={{ opacity: 0, x }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </m.div>
  );
}
