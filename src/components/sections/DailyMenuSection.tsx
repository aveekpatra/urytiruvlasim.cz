"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { FadeIn } from "@/components/motion";

function PriceLine({ price }: { price: number }) {
  return (
    <div className="flex items-center justify-center gap-3 mt-2 mb-6">
      <div className="w-14 h-px bg-[var(--color-charcoal)]/40" />
      <span className="font-serif text-sm font-bold text-[var(--color-charcoal)] tracking-wide">
        {price} Kč
      </span>
      <div className="w-14 h-px bg-[var(--color-charcoal)]/40" />
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="text-center mt-10 mb-6 first:mt-0">
      <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-wider uppercase text-[var(--color-charcoal)]">
        {title}
      </h3>
      <div className="w-48 h-px bg-[var(--color-stone)] mx-auto mt-2" />
    </div>
  );
}

function MenuItem({
  name,
  description,
  allergens,
  price,
  isVegetarian,
}: {
  name: string;
  description?: string;
  allergens?: string;
  price: number;
  isVegetarian?: boolean;
}) {
  return (
    <div className="text-center">
      <h4 className="font-serif text-base sm:text-lg font-bold uppercase tracking-wide text-[var(--color-charcoal)]">
        {name}
      </h4>
      {description && (
        <p className="text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-[var(--color-text-muted)] mt-1 leading-relaxed">
          {description}
          {allergens && ` (${allergens})`}
        </p>
      )}
      {!description && allergens && (
        <p className="text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-[var(--color-text-muted)] mt-1">
          ({allergens})
        </p>
      )}
      {isVegetarian && (
        <p className="text-[10px] tracking-[0.1em] uppercase text-green-700 mt-0.5">(V)</p>
      )}
      <PriceLine price={price} />
    </div>
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

  const formatted = new Date(todayMenu.date + "T12:00:00").toLocaleDateString("cs-CZ", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section id="menu" className="py-24 lg:py-40 bg-[var(--color-ivory)]">
      <div className="max-w-2xl mx-auto px-6 lg:px-12">
        <FadeIn>
          <div
            className="bg-[#FFFEF9] px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-[var(--color-stone)]/30 relative"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundBlendMode: "soft-light",
            }}
          >
            {/* Date */}
            <p className="text-center text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-[var(--color-text-muted)] mb-10">
              Denní nabídka — {formatted}
            </p>

            {/* Soup */}
            {todayMenu.soup && (
              <div>
                <SectionHeader title="Polévka" />
                <MenuItem
                  name={todayMenu.soup}
                  description={todayMenu.soupDescription}
                  allergens={todayMenu.soupAllergens}
                  price={todayMenu.soupPrice}
                />
              </div>
            )}

            {/* Main Courses */}
            {todayMenu.items.length > 0 && (
              <div>
                <SectionHeader title="Hlavní chod" />
                {todayMenu.items.map((item, index) => (
                  <MenuItem
                    key={index}
                    name={item.name}
                    description={item.description}
                    allergens={item.allergens}
                    price={item.price}
                    isVegetarian={item.isVegetarian}
                  />
                ))}
              </div>
            )}

            {/* Dessert */}
            {todayMenu.dessert && (
              <div>
                <SectionHeader title="Dezert" />
                <MenuItem
                  name={todayMenu.dessert}
                  description={todayMenu.dessertDescription}
                  allergens={todayMenu.dessertAllergens}
                  price={todayMenu.dessertPrice ?? 0}
                />
              </div>
            )}

            {/* Drinks */}
            {todayMenu.drinks && todayMenu.drinks.length > 0 && (
              <div>
                <SectionHeader title="Nápoje" />
                {todayMenu.drinks.map((drink, index) => (
                  <MenuItem
                    key={index}
                    name={drink.name}
                    description={drink.description}
                    allergens={drink.allergens}
                    price={drink.price}
                  />
                ))}
              </div>
            )}

            {/* Footer */}
            <div className="mt-8 pt-8 border-t border-[var(--color-charcoal)]/10 text-center space-y-3">
              <p className="text-[9px] sm:text-[10px] tracking-[0.15em] text-[var(--color-text-muted)] leading-relaxed max-w-md mx-auto">
                1 — obiloviny, 2 — korýši, 3 — vejce, 4 — ryby, 5 — arašídy,
                6 — sója, 7 — mléko, 8 — skořápkové plody, 9 — celer,
                10 — hořčice, 11 — sezam, 12 — oxid siřičitý, 13 — vlčí bob,
                14 — měkkýši
              </p>
              <p className="text-[9px] sm:text-[10px] tracking-[0.15em] uppercase text-[var(--color-text-muted)]">
                (v) — vegetariánské
              </p>
              <p className="text-[9px] sm:text-[10px] tracking-[0.15em] text-[var(--color-text-muted)]">
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
