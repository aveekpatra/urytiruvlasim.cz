"use client";

import { m } from "framer-motion";

interface StaggerContainerProps {
  children: React.ReactNode;
  stagger?: number;
  className?: string;
}

export function StaggerContainer({
  children,
  stagger = 0.1,
  className,
}: StaggerContainerProps) {
  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
          },
        },
      }}
      className={className}
    >
      {children}
    </m.div>
  );
}
