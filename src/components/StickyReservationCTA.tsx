"use client";

import { useState, useEffect } from "react";
import { Icon } from "@/components/ui/Icon";

interface StickyReservationCTAProps {
  phoneNumber: string;
  label: string;
}

export function StickyReservationCTA({ phoneNumber, label }: StickyReservationCTAProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past the hero section (roughly 100vh)
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      setIsVisible(scrollY > windowHeight * 0.5);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-black/80 to-transparent lg:hidden">
      <a
        href={`tel:${phoneNumber.replace(/\s/g, "")}`}
        className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-[var(--color-primary)] text-[var(--color-secondary)] font-bold text-lg rounded-xl shadow-lg active:scale-95 transition-transform"
        style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom, 0px))" }}
      >
        <Icon name="phone" className="w-5 h-5" />
        {label}
      </a>
    </div>
  );
}
