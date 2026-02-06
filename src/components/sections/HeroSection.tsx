"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IMAGES } from "@/lib/images";

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src={IMAGES.hero.video}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-end pb-32 lg:pb-40 px-6">
        {/* Centered tagline - appears at bottom */}
        <div
          className={`text-center transition-all duration-1000 delay-500 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-white/80 text-[11px] tracking-[0.4em] uppercase mb-6">
            Zámek Vlašim
          </p>
          <h1 className="font-serif text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl italic mb-8">
            Kulinářský zážitek
          </h1>
          <div className="w-16 h-px bg-[var(--color-gold)] mx-auto mb-8" />
          <p className="text-white/90 text-sm tracking-[0.15em] uppercase">
            v srdci historického zámku
          </p>
        </div>
      </div>

      {/* Bottom Booking Bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm transition-all duration-700 delay-700 ${
          isLoaded ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-12">
            <div className="hidden sm:block text-center sm:text-left">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[var(--color-text-muted)]">
                Otevírací doba
              </span>
              <p className="text-[var(--color-charcoal)] font-medium">
                Po–Ne 11:00–22:00
              </p>
            </div>

            <div className="hidden sm:block w-px h-10 bg-[var(--color-stone)]" />

            <div className="flex gap-3 sm:gap-4">
              <Link
                href="#menu"
                className="px-6 sm:px-8 py-3 bg-[var(--color-charcoal)] text-white text-[11px] tracking-[0.15em] uppercase font-medium hover:bg-[var(--color-gold)] transition-colors duration-300"
              >
                Menu
              </Link>
              <Link
                href="tel:+420123456789"
                className="px-6 sm:px-8 py-3 border border-[var(--color-charcoal)] text-[var(--color-charcoal)] text-[11px] tracking-[0.15em] uppercase font-medium hover:bg-[var(--color-charcoal)] hover:text-white transition-all duration-300"
              >
                Rezervovat stůl
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
