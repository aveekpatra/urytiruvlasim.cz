"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { FadeIn } from "@/components/motion";

function AllergenTag({ allergens }: { allergens?: string }) {
  if (!allergens) return null;
  return (
    <span className="text-[var(--color-text-muted)]/60">
      ({allergens})
    </span>
  );
}

export function DailyMenuSection() {
  const todayMenu = useQuery(api.dailyMenu.getToday);

  // Loading state
  if (todayMenu === undefined) {
    return (
      <section id="menu" className="py-24 lg:py-40 bg-[var(--color-ivory)]">
        <div className="max-w-2xl mx-auto px-6 lg:px-12 text-center">
          <p className="text-[var(--color-text-muted)] text-sm">Načítání menu...</p>
        </div>
      </section>
    );
  }

  // No menu published today
  if (!todayMenu) {
    return (
      <section id="menu" className="py-24 lg:py-40 bg-[var(--color-ivory)]">
        <div className="max-w-2xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-muted)] mb-4 block">
                Denní nabídka
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-charcoal)] mb-4">
                Menu
              </h2>
              <div className="w-12 h-px bg-[var(--color-gold)] mx-auto mb-8" />
              <p className="text-[var(--color-text-muted)] text-sm">
                Denní menu bude brzy zveřejněno.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="text-center">
              <Link
                href="/menu"
                className="inline-block px-10 py-4 border border-[var(--color-charcoal)] text-[var(--color-charcoal)] text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[var(--color-charcoal)] hover:text-white transition-all duration-300"
              >
                Kompletní menu
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    );
  }

  return (
    <section id="menu" className="py-24 lg:py-40 bg-[var(--color-ivory)]">
      <div className="max-w-2xl mx-auto px-6 lg:px-12">
        <FadeIn>
          <div
            className="bg-[#FFFEF9] px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[var(--color-stone)]/30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundBlendMode: "soft-light",
            }}
          >
            {/* Menu Header */}
            <div className="text-center mb-14 sm:mb-16">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-muted)] mb-4 block">
                Denní nabídka
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-charcoal)] mb-4">
                Menu
              </h2>
              <div className="w-12 h-px bg-[var(--color-gold)] mx-auto" />
            </div>

            {/* Soup */}
            {todayMenu.soup && (
              <div>
                <div className="mb-8">
                  <h3 className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-gold-dark)] mb-1">
                    Polévka
                  </h3>
                  <span className="text-[9px] tracking-[0.2em] uppercase text-[var(--color-text-muted)]">
                    Soup
                  </span>
                </div>

                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-lg sm:text-xl text-[var(--color-charcoal)]">
                      {todayMenu.soup}
                    </span>
                    <span className="flex-1 border-b border-dotted border-[var(--color-charcoal)]/15 min-w-[2rem] translate-y-[-4px]" />
                    <span className="text-[var(--color-charcoal)] text-sm font-medium whitespace-nowrap">
                      {todayMenu.soupPrice} Kč
                    </span>
                  </div>
                  <p className="text-[var(--color-text-muted)] text-xs mt-1 tracking-wide">
                    {todayMenu.soupDescription}
                    {todayMenu.soupDescription && todayMenu.soupAllergens && " "}
                    <AllergenTag allergens={todayMenu.soupAllergens} />
                  </p>
                </div>

                <div className="mt-10 flex items-center justify-center gap-4">
                  <div className="w-8 h-px bg-[var(--color-stone)]" />
                  <div className="w-1 h-1 bg-[var(--color-gold)] rotate-45" />
                  <div className="w-8 h-px bg-[var(--color-stone)]" />
                </div>
              </div>
            )}

            {/* Main Courses */}
            {todayMenu.items.length > 0 && (
              <div className={todayMenu.soup ? "mt-10" : ""}>
                <div className="mb-8">
                  <h3 className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-gold-dark)] mb-1">
                    Hlavní chod
                  </h3>
                  <span className="text-[9px] tracking-[0.2em] uppercase text-[var(--color-text-muted)]">
                    Main courses
                  </span>
                </div>

                <div className="space-y-6">
                  {todayMenu.items.map((item, index) => (
                    <div key={index}>
                      <div className="flex items-baseline gap-3">
                        <span className="font-serif text-lg sm:text-xl text-[var(--color-charcoal)]">
                          {item.name}
                        </span>
                        {item.isVegetarian && (
                          <span className="text-[9px] tracking-[0.1em] uppercase text-green-700 shrink-0">
                            (v)
                          </span>
                        )}
                        <span className="flex-1 border-b border-dotted border-[var(--color-charcoal)]/15 min-w-[2rem] translate-y-[-4px]" />
                        <span className="text-[var(--color-charcoal)] text-sm font-medium whitespace-nowrap">
                          {item.price} Kč
                        </span>
                      </div>
                      <p className="text-[var(--color-text-muted)] text-xs mt-1 tracking-wide">
                        {item.description}
                        {item.description && item.allergens && " "}
                        <AllergenTag allergens={item.allergens} />
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dessert */}
            {todayMenu.dessert && (
              <div className="mt-10">
                <div className="mt-10 mb-8 flex items-center justify-center gap-4">
                  <div className="w-8 h-px bg-[var(--color-stone)]" />
                  <div className="w-1 h-1 bg-[var(--color-gold)] rotate-45" />
                  <div className="w-8 h-px bg-[var(--color-stone)]" />
                </div>

                <div className="mb-8">
                  <h3 className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-gold-dark)] mb-1">
                    Dezert
                  </h3>
                  <span className="text-[9px] tracking-[0.2em] uppercase text-[var(--color-text-muted)]">
                    Dessert
                  </span>
                </div>

                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-lg sm:text-xl text-[var(--color-charcoal)]">
                      {todayMenu.dessert}
                    </span>
                    <span className="flex-1 border-b border-dotted border-[var(--color-charcoal)]/15 min-w-[2rem] translate-y-[-4px]" />
                    {todayMenu.dessertPrice && (
                      <span className="text-[var(--color-charcoal)] text-sm font-medium whitespace-nowrap">
                        {todayMenu.dessertPrice} Kč
                      </span>
                    )}
                  </div>
                  <p className="text-[var(--color-text-muted)] text-xs mt-1 tracking-wide">
                    {todayMenu.dessertDescription}
                    {todayMenu.dessertDescription && todayMenu.dessertAllergens && " "}
                    <AllergenTag allergens={todayMenu.dessertAllergens} />
                  </p>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-[var(--color-charcoal)]/10 text-center space-y-3">
              <p className="text-[10px] tracking-[0.15em] text-[var(--color-text-muted)] leading-relaxed max-w-md mx-auto">
                1 — obiloviny, 2 — korýši, 3 — vejce, 4 — ryby, 5 — arašídy,
                6 — sója, 7 — mléko, 8 — skořápkové plody, 9 — celer,
                10 — hořčice, 11 — sezam, 12 — oxid siřičitý, 13 — vlčí bob,
                14 — měkkýši
              </p>
              <p className="text-[10px] tracking-[0.15em] uppercase text-[var(--color-text-muted)]">
                (v) — vegetariánské
              </p>
              <p className="text-[10px] tracking-[0.15em] text-[var(--color-text-muted)]">
                Informujte nás prosím o případných alergiích.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn delay={0.2}>
          <div className="mt-12 text-center">
            <Link
              href="/menu"
              className="inline-block px-10 py-4 border border-[var(--color-charcoal)] text-[var(--color-charcoal)] text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[var(--color-charcoal)] hover:text-white transition-all duration-300"
            >
              Kompletní menu
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
