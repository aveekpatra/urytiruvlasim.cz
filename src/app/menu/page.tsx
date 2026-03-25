import { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/sections/Footer";
import { FadeIn, AnimatedImage } from "@/components/motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { DrinkIcon } from "@hugeicons/core-free-icons";

export const metadata: Metadata = {
  title: "Jídelní lístek | U Blanických rytířů",
  description:
    "Kompletní jídelní lístek restaurace U Blanických rytířů. Česká kuchyně z lokálních surovin v prostorách vlašimského zámku.",
};

export default function MenuPage() {
  return (
    <>
      <Navigation />

      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <AnimatedImage
          src="/images/menu/JHK09462.jpg"
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
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="text-center py-16">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-gold-dark)] mb-6 block">
                Připravujeme
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-charcoal)] mb-6">
                Jídelní lístek bude brzy k dispozici
              </h2>
              <div className="w-12 h-px bg-[var(--color-gold)] mx-auto mb-8" />
              <p className="text-[var(--color-text-muted)] text-sm leading-relaxed max-w-md mx-auto mb-12">
                Pracujeme na novém menu. Kompletní jídelní lístek zveřejníme
                od 1. dubna 2026. Pro aktuální nabídku nás neváhejte kontaktovat.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="tel:+420732878238"
                  className="px-10 py-4 bg-[var(--color-charcoal)] text-white text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[var(--color-gold)] transition-colors duration-300"
                >
                  Zavolat nyní
                </Link>
                <Link
                  href="/"
                  className="px-10 py-4 border border-[var(--color-charcoal)] text-[var(--color-charcoal)] text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[var(--color-charcoal)] hover:text-white transition-all duration-300"
                >
                  Zpět na hlavní stránku
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Draft Beer Section */}
      <section className="bg-[var(--color-cream)] py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-gold-dark)] mb-4 block">
                Na čepu
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-charcoal)] mb-4">
                Točené pivo
              </h2>
              <div className="w-12 h-px bg-[var(--color-gold)] mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div className="bg-[#FFFEF9] p-8 border border-[var(--color-stone)]/30 shadow-[0_2px_12px_rgba(0,0,0,0.05)] text-center">
                <HugeiconsIcon icon={DrinkIcon} size={32} color="var(--color-gold)" strokeWidth={1.5} className="mx-auto mb-4" />
                <h3 className="font-serif text-xl text-[var(--color-charcoal)] mb-2">
                  Plzeňský Prazdroj
                </h3>
                <p className="text-[var(--color-text-muted)] text-sm">
                  Točená Plzeň
                </p>
              </div>
              <div className="bg-[#FFFEF9] p-8 border border-[var(--color-stone)]/30 shadow-[0_2px_12px_rgba(0,0,0,0.05)] text-center">
                <HugeiconsIcon icon={DrinkIcon} size={32} color="var(--color-gold)" strokeWidth={1.5} className="mx-auto mb-4" />
                <h3 className="font-serif text-xl text-[var(--color-charcoal)] mb-2">
                  Velkopopovický Kozel
                </h3>
                <p className="text-[var(--color-text-muted)] text-sm">
                  Točený Kozel
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </>
  );
}
