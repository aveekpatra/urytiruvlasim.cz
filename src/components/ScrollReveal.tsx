"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.5,
  once = true,
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const initialState: gsap.TweenVars = {
      opacity: 0,
    };

    switch (direction) {
      case "up":
        initialState.y = 24;
        break;
      case "down":
        initialState.y = -24;
        break;
      case "left":
        initialState.x = 24;
        break;
      case "right":
        initialState.x = -24;
        break;
    }

    gsap.set(element, initialState);

    const animation = gsap.to(element, {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      delay,
      ease: "power2.out",
      force3D: true,
      scrollTrigger: {
        trigger: element,
        start: "top 90%",
        toggleActions: once ? "play none none none" : "play reverse play reverse",
      },
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [delay, direction, duration, once]);

  return (
    <div ref={elementRef} className={className} style={{ willChange: "transform, opacity" }}>
      {children}
    </div>
  );
}

interface ScrollRevealGroupProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
}

export function ScrollRevealGroup({
  children,
  className = "",
  stagger = 0.05,
  direction = "up",
  duration = 0.4,
}: ScrollRevealGroupProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.children;

    const initialState: gsap.TweenVars = {
      opacity: 0,
    };

    switch (direction) {
      case "up":
        initialState.y = 20;
        break;
      case "down":
        initialState.y = -20;
        break;
      case "left":
        initialState.x = 20;
        break;
      case "right":
        initialState.x = -20;
        break;
    }

    gsap.set(elements, initialState);

    const animation = gsap.to(elements, {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      stagger,
      ease: "power2.out",
      force3D: true,
      scrollTrigger: {
        trigger: container,
        start: "top 88%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      animation.kill();
    };
  }, [stagger, direction, duration]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
