"use client";

import { m } from "framer-motion";

const EASE: [number, number, number, number] = [0.25, 0.4, 0.25, 1];

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <m.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: EASE },
        },
      }}
      className={className}
    >
      {children}
    </m.div>
  );
}
