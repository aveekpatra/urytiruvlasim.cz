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
  stagger?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.8,
  once = true,
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Set initial state based on direction
    const initialState: gsap.TweenVars = {
      opacity: 0,
    };

    switch (direction) {
      case "up":
        initialState.y = 60;
        break;
      case "down":
        initialState.y = -60;
        break;
      case "left":
        initialState.x = 60;
        break;
      case "right":
        initialState.x = -60;
        break;
    }

    gsap.set(element, initialState);

    const animation = gsap.to(element, {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        end: "bottom 15%",
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
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

// Stagger animation for lists/grids
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
  stagger = 0.1,
  direction = "up",
  duration = 0.8,
}: ScrollRevealGroupProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.children;

    // Set initial state
    const initialState: gsap.TweenVars = {
      opacity: 0,
    };

    switch (direction) {
      case "up":
        initialState.y = 50;
        break;
      case "down":
        initialState.y = -50;
        break;
      case "left":
        initialState.x = 50;
        break;
      case "right":
        initialState.x = -50;
        break;
    }

    gsap.set(elements, initialState);

    const animation = gsap.to(elements, {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
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
