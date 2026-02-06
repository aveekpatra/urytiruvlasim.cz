"use client";

import Link from "next/link";
import type { MenuItem } from "@/types";
import { ScrollReveal } from "@/components/ScrollReveal";

interface DailyMenuSectionProps {
  menuItems: MenuItem[];
}

export function DailyMenuSection({ menuItems }: DailyMenuSectionProps) {
  const soup = menuItems.find((item) => item.category === "soup");
  const mains = menuItems.filter((item) => item.category === "main");

  return (
    <section id="menu" className="py-24 lg:py-40 bg-[var(--color-ivory)]">
      <div className="max-w-2xl mx-auto px-6 lg:px-12">
        {/* Paper Menu Card */}
        <ScrollReveal direction="up" duration={1}>
          <div
          className="bg-[#FFFEF9] px-8 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[var(--color-stone)]/30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundBlendMode: 'soft-light',
          }}
        >
          {/* Menu Header */}
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-muted)] mb-4 block">
              Denní nabídka
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-charcoal)] mb-4">
              Menu
            </h2>
            <div className="w-12 h-px bg-[var(--color-gold)] mx-auto" />
          </div>

          {/* Menu Content */}
          <div className="space-y-10">
            {/* Soup */}
            {soup && (
              <div className="border-b border-[var(--color-charcoal)]/10 pb-8">
                <span className="text-[9px] tracking-[0.3em] uppercase text-[var(--color-text-muted)] mb-3 block">
                  Polévka
                </span>
                <div className="flex justify-between items-baseline gap-4">
                  <span className="font-serif text-lg sm:text-xl text-[var(--color-charcoal)]">
                    {soup.name}
                  </span>
                  <span className="text-[var(--color-charcoal)] text-sm">
                    {soup.price} {soup.currency}
                  </span>
                </div>
              </div>
            )}

            {/* Main Courses */}
            <div>
              <span className="text-[9px] tracking-[0.3em] uppercase text-[var(--color-text-muted)] mb-5 block">
                Hlavní chod
              </span>
              <div className="space-y-5">
                {mains.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-baseline gap-4"
                  >
                    <div className="flex-1">
                      <span className="font-serif text-lg sm:text-xl text-[var(--color-charcoal)]">
                        {item.name}
                      </span>
                      {item.isVegetarian && (
                        <span className="ml-2 text-[9px] tracking-[0.1em] uppercase text-green-700">
                          (v)
                        </span>
                      )}
                    </div>
                    <span className="text-[var(--color-charcoal)] text-sm whitespace-nowrap">
                      {item.price} {item.currency}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Menu Footer */}
          <div className="mt-12 pt-8 border-t border-[var(--color-charcoal)]/10 text-center">
            <p className="text-[10px] tracking-[0.15em] uppercase text-[var(--color-text-muted)]">
              Podáváme Po–Pá 11:00–14:00
            </p>
          </div>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal delay={0.3}>
          <div className="mt-12 text-center">
            <Link
              href="/menu"
              className="inline-block px-10 py-4 border border-[var(--color-charcoal)] text-[var(--color-charcoal)] text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[var(--color-charcoal)] hover:text-white transition-all duration-300"
            >
              Kompletní menu
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
