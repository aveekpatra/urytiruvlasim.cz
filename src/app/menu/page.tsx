/*
 * MENU PAGE — temporarily showing "coming soon".
 * The full menu page code is preserved in git history (commit 86ba98e and earlier).
 * To restore: revert this file from that commit.
 */

import { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/sections/Footer";
import { FadeIn, AnimatedImage } from "@/components/motion";
import { cdn } from "@/lib/images";

export const metadata: Metadata = {
  title: "Jídelní lístek",
  description:
    "Kompletní jídelní lístek restaurace U Blanických rytířů. Česká kuchyně z lokálních surovin v prostorách vlašimského zámku.",
  alternates: {
    canonical: "https://www.ublanickychrytiru.cz/menu",
  },
  openGraph: {
    title: "Jídelní lístek — U Blanických rytířů",
    description:
      "Česká kuchyně z lokálních surovin v prostorách vlašimského zámku.",
    images: [
      {
        url: cdn("/images/menu/JHK09462.jpg"),
        width: 1200,
        height: 630,
        alt: "Jídelní lístek restaurace U Blanických rytířů",
      },
    ],
  },
};

function CornerOrnament({ className }: { className: string }) {
  return (
    <svg
      className={`absolute w-8 h-8 sm:w-10 sm:h-10 text-[var(--color-charcoal)] ${className}`}
      viewBox="0 0 40 40"
      fill="currentColor"
    >
      <path d="M4 2 L4 14 L2 14 L2 2 Z" />
      <path d="M2 2 L14 2 L14 4 L2 4 Z" />
      <path d="M6 6 C6 6 10 6 12 8 C14 10 14 14 14 14 L12 14 C12 14 12 11 10.5 9.5 C9 8 6 8 6 8 Z" />
      <path d="M6 6 C6 6 6 10 8 12 C10 14 14 14 14 14 L14 12 C14 12 11 12 9.5 10.5 C8 9 8 6 8 6 Z" />
      <path d="M8 3 C8 1 10 0 10 0 C10 0 12 1 12 3 C12 5 10 5.5 10 5.5 C10 5.5 8 5 8 3 Z" opacity="0.9" />
      <path d="M3 8 C1 8 0 10 0 10 C0 10 1 12 3 12 C5 12 5.5 10 5.5 10 C5.5 10 5 8 3 8 Z" opacity="0.9" />
    </svg>
  );
}

export default function MenuPage() {
  return (
    <>
      <Navigation />

      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <AnimatedImage
          src={cdn("/images/menu/JHK09462.jpg")}
          alt="Jídelní lístek U Blanických rytířů"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
          <FadeIn delay={0.2}>
            <span className="text-white/60 text-[10px] tracking-[0.4em] uppercase mb-6 block">
              Zámecká restaurace
            </span>
          </FadeIn>
          <FadeIn delay={0.4}>
            <h1 className="font-serif text-white text-4xl sm:text-5xl lg:text-6xl italic mb-6">
              Jídelní lístek
            </h1>
          </FadeIn>
          <FadeIn delay={0.6}>
            <div className="w-16 h-px bg-[var(--color-gold)]" />
          </FadeIn>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="bg-[var(--color-ivory)] py-20 lg:py-32">
        <div className="max-w-xl mx-auto px-6 lg:px-12">
          <div className="bg-[#FFFEF9] p-2 sm:p-3 border border-[var(--color-charcoal)]/20 shadow-[0_4px_20px_rgba(0,0,0,0.08)] relative">
            <CornerOrnament className="top-1 left-1 sm:top-1.5 sm:left-1.5" />
            <CornerOrnament className="top-1 right-1 sm:top-1.5 sm:right-1.5 -scale-x-100" />
            <CornerOrnament className="bottom-1 left-1 sm:bottom-1.5 sm:left-1.5 -scale-y-100" />
            <CornerOrnament className="bottom-1 right-1 sm:bottom-1.5 sm:right-1.5 -scale-x-100 -scale-y-100" />
            <div className="border border-[var(--color-charcoal)]/15 px-6 py-16 sm:px-10 sm:py-20">
              <FadeIn>
                <div className="text-center">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-gold-dark)] mb-4 block">
                    Jídelní &amp; nápojový lístek
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl tracking-wide uppercase text-[var(--color-charcoal)]">
                    Již brzy
                  </h2>
                  <div className="w-16 h-px bg-[var(--color-gold)] mx-auto mt-4 mb-6" />
                  <p className="text-sm text-[var(--color-text-muted)] max-w-sm mx-auto leading-relaxed">
                    Pracujeme na novém menu. Brzy zde naleznete kompletní nabídku našich pokrmů i nápojů.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
