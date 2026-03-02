"use client";

import { IMAGES } from "@/lib/images";
import { SlideIn, FadeIn, AnimatedImage } from "@/components/motion";

export function AboutSection() {
  return (
    <section id="restaurace" className="py-24 lg:py-40 bg-[var(--color-cream)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text Content */}
          <SlideIn direction="left" className="order-2 lg:order-1">
            <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--color-gold)] mb-6 block">
              O restauraci
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-[var(--color-charcoal)] mb-8 leading-tight">
              Kde se historie
              <span className="block italic">setkává s chutí</span>
            </h2>
            <div className="w-16 h-px bg-[var(--color-gold)] mb-8" />
            <div className="space-y-6 text-[var(--color-text-muted)] leading-relaxed">
              <p>
                Restaurace U Blanických rytířů se nachází v jedinečném prostředí
                vlašimského zámku, kde každý detail vypráví příběh staletí.
                Naše kuchyně ctí tradice české gastronomie a propojuje je
                se současnými technikami.
              </p>
              <p>
                Poctivé suroviny od lokálních farmářů, recepty předávané
                z generace na generaci a péče, která se promítá do každého
                pokrmu — to je filozofie, která nás definuje.
              </p>
            </div>
            <FadeIn delay={0.3}>
              <div className="mt-12 flex flex-col sm:flex-row gap-8">
                <div>
                  <span className="block font-serif text-4xl text-[var(--color-gold)]">75</span>
                  <span className="text-[11px] tracking-[0.2em] uppercase text-[var(--color-text-muted)]">
                    Hektarů zámeckého parku
                  </span>
                </div>
                <div>
                  <span className="block font-serif text-4xl text-[var(--color-gold)]">1850</span>
                  <span className="text-[11px] tracking-[0.2em] uppercase text-[var(--color-text-muted)]">
                    Historie zámku
                  </span>
                </div>
              </div>
            </FadeIn>
          </SlideIn>

          {/* Image */}
          <SlideIn direction="right" className="order-1 lg:order-2 relative">
            <div className="relative aspect-4/5 overflow-hidden">
              <AnimatedImage
                src={IMAGES.about.interior}
                alt="Interiér restaurace"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Decorative frame */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border border-[var(--color-gold)]/30 -z-10" />
          </SlideIn>
        </div>
      </div>
    </section>
  );
}
