"use client";

import { useState, useCallback } from "react";

interface MenuItem {
  name: string;
  description: string;
  allergens?: string;
  price: number;
  isVegetarian?: boolean;
}

export interface DailyMenuData {
  date: string;
  soup: string;
  soupDescription?: string;
  soupAllergens?: string;
  soupPrice: number;
  items: MenuItem[];
  dessert?: string;
  dessertDescription?: string;
  dessertAllergens?: string;
  dessertPrice?: number;
  drinks?: MenuItem[];
}

export function DailyMenuPreview({
  menu,
  onClose,
}: {
  menu: DailyMenuData;
  onClose: () => void;
}) {
  const [generating, setGenerating] = useState(false);

  const handleDownload = useCallback(async () => {
    setGenerating(true);
    try {
      const { pdf } = await import("@react-pdf/renderer");
      const { DailyMenuPDFDocument } = await import("./DailyMenuPDFDocument");
      const blob = await pdf(DailyMenuPDFDocument({ menu })).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `denni-menu-${menu.date}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("PDF download failed:", e);
    } finally {
      setGenerating(false);
    }
  }, [menu]);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center overflow-y-auto py-8 px-4">
      <div className="bg-white max-w-3xl w-full relative" style={{ minHeight: "80vh" }}>
        {/* Toolbar */}
        <div className="sticky top-0 z-10 bg-[var(--color-charcoal)] text-white px-6 py-3 flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider">Náhled denního menu</span>
          <div className="flex items-center gap-4">
            <button
              onClick={handleDownload}
              disabled={generating}
              className="text-xs uppercase tracking-wider text-[var(--color-gold)] hover:text-white transition-colors disabled:opacity-50"
            >
              {generating ? "..." : "Stáhnout PDF"}
            </button>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white text-lg"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 bg-[var(--color-ivory)]">
          <MenuPreviewCard menu={menu} />
        </div>
      </div>
    </div>
  );
}

function PriceWithLines({ price }: { price: number }) {
  return (
    <div className="flex items-center justify-center gap-3 mt-2 mb-6">
      <div className="w-12 h-px bg-[var(--color-charcoal)]" />
      <span className="font-serif text-sm font-bold text-[var(--color-charcoal)]">
        {price} Kč
      </span>
      <div className="w-12 h-px bg-[var(--color-charcoal)]" />
    </div>
  );
}

function MenuPreviewCard({ menu }: { menu: DailyMenuData }) {
  const formatted = new Date(menu.date + "T12:00:00").toLocaleDateString("cs-CZ", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-lg mx-auto bg-[#FFFEF9] border border-[#D4D0C8] relative px-10 py-14 sm:px-14 sm:py-16">
      {/* Corner ornaments */}
      <svg className="absolute top-2 left-2 w-6 h-6 text-[#D4D0C8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
        <path d="M2 2 C2 2, 8 2, 12 6 C16 10, 16 16, 16 22 M2 2 C2 2, 2 8, 6 12 C10 16, 16 16, 22 16" />
      </svg>
      <svg className="absolute top-2 right-2 w-6 h-6 text-[#D4D0C8] -scale-x-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
        <path d="M2 2 C2 2, 8 2, 12 6 C16 10, 16 16, 16 22 M2 2 C2 2, 2 8, 6 12 C10 16, 16 16, 22 16" />
      </svg>
      <svg className="absolute bottom-2 left-2 w-6 h-6 text-[#D4D0C8] -scale-y-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
        <path d="M2 2 C2 2, 8 2, 12 6 C16 10, 16 16, 16 22 M2 2 C2 2, 2 8, 6 12 C10 16, 16 16, 22 16" />
      </svg>
      <svg className="absolute bottom-2 right-2 w-6 h-6 text-[#D4D0C8] -scale-x-100 -scale-y-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
        <path d="M2 2 C2 2, 8 2, 12 6 C16 10, 16 16, 16 22 M2 2 C2 2, 2 8, 6 12 C10 16, 16 16, 22 16" />
      </svg>

      {/* Date */}
      <p className="text-[9px] tracking-[0.25em] uppercase text-[var(--color-text-muted)] text-center mb-8">
        Denní nabídka — {formatted}
      </p>

      {/* Soup */}
      {menu.soup && (
        <div className="mb-4">
          <h3 className="font-serif text-2xl tracking-wider uppercase text-center text-[var(--color-charcoal)] mb-5">
            Polévka
          </h3>
          <p className="font-serif text-sm font-bold uppercase tracking-wider text-center text-[var(--color-charcoal)]">
            {menu.soup}
          </p>
          {menu.soupDescription && (
            <p className="text-[9px] tracking-[0.15em] uppercase text-center text-[var(--color-text-muted)] mt-1">
              {menu.soupDescription}
            </p>
          )}
          {menu.soupAllergens && (
            <p className="text-[9px] tracking-wider text-center text-[var(--color-text-muted)] mt-0.5">
              ({menu.soupAllergens})
            </p>
          )}
          <PriceWithLines price={menu.soupPrice} />
        </div>
      )}

      {/* Main courses */}
      {menu.items.length > 0 && (
        <div className="mt-8">
          <h3 className="font-serif text-2xl tracking-wider uppercase text-center text-[var(--color-charcoal)] mb-5">
            Hlavní chod
          </h3>
          {menu.items.map((item, i) => (
            <div key={i}>
              <p className="font-serif text-sm font-bold uppercase tracking-wider text-center text-[var(--color-charcoal)]">
                {item.name}
              </p>
              {item.description && (
                <p className="text-[9px] tracking-[0.15em] uppercase text-center text-[var(--color-text-muted)] mt-1">
                  {item.description}
                </p>
              )}
              {item.allergens && (
                <p className="text-[9px] tracking-wider text-center text-[var(--color-text-muted)] mt-0.5">
                  ({item.allergens})
                </p>
              )}
              {item.isVegetarian && (
                <p className="text-[8px] tracking-wider text-center text-green-700 mt-0.5">(V)</p>
              )}
              <PriceWithLines price={item.price} />
            </div>
          ))}
        </div>
      )}

      {/* Dessert */}
      {menu.dessert && (
        <div className="mt-8">
          <h3 className="font-serif text-2xl tracking-wider uppercase text-center text-[var(--color-charcoal)] mb-5">
            Dezert
          </h3>
          <p className="font-serif text-sm font-bold uppercase tracking-wider text-center text-[var(--color-charcoal)]">
            {menu.dessert}
          </p>
          {menu.dessertDescription && (
            <p className="text-[9px] tracking-[0.15em] uppercase text-center text-[var(--color-text-muted)] mt-1">
              {menu.dessertDescription}
            </p>
          )}
          {menu.dessertAllergens && (
            <p className="text-[9px] tracking-wider text-center text-[var(--color-text-muted)] mt-0.5">
              ({menu.dessertAllergens})
            </p>
          )}
          {menu.dessertPrice && <PriceWithLines price={menu.dessertPrice} />}
        </div>
      )}

      {/* Drinks */}
      {menu.drinks && menu.drinks.length > 0 && (
        <div className="mt-8">
          <h3 className="font-serif text-2xl tracking-wider uppercase text-center text-[var(--color-charcoal)] mb-5">
            Nápoje
          </h3>
          {menu.drinks.map((drink, i) => (
            <div key={i}>
              <p className="font-serif text-sm font-bold uppercase tracking-wider text-center text-[var(--color-charcoal)]">
                {drink.name}
              </p>
              {drink.description && (
                <p className="text-[9px] tracking-[0.15em] uppercase text-center text-[var(--color-text-muted)] mt-1">
                  {drink.description}
                </p>
              )}
              {drink.allergens && (
                <p className="text-[9px] tracking-wider text-center text-[var(--color-text-muted)] mt-0.5">
                  ({drink.allergens})
                </p>
              )}
              <PriceWithLines price={drink.price} />
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="mt-10 pt-6 text-center space-y-2">
        <p className="text-[7px] tracking-wider text-[var(--color-text-muted)] leading-relaxed max-w-sm mx-auto uppercase">
          1 — obiloviny, 2 — korýši, 3 — vejce, 4 — ryby, 5 — arašídy, 6 — sója,
          7 — mléko, 8 — skořápkové plody, 9 — celer, 10 — hořčice, 11 — sezam,
          12 — oxid siřičitý, 13 — vlčí bob, 14 — měkkýši
        </p>
        <p className="text-[7px] text-[var(--color-text-muted)] uppercase tracking-widest">(v) — vegetariánské</p>
        <p className="text-[7px] text-[var(--color-text-muted)] uppercase tracking-wider">Informujte nás prosím o případných alergiích.</p>
        {/* Bottom ornament */}
        <svg className="mx-auto mt-3 w-8 h-5 text-[#D4D0C8]" viewBox="0 0 30 20" fill="none" stroke="currentColor" strokeWidth="0.6">
          <path d="M15 2 C12 6, 6 8, 2 8 C6 8, 8 12, 8 16 M15 2 C18 6, 24 8, 28 8 C24 8, 22 12, 22 16 M8 16 C10 14, 13 14, 15 16 C17 14, 20 14, 22 16" />
        </svg>
      </div>
    </div>
  );
}
