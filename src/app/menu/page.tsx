import { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/sections/Footer";
import { FadeIn, AnimatedImage } from "@/components/motion";
import { cdn } from "@/lib/images";
import {
  PREDKRMY,
  POLEVKY,
  SALATY,
  HOVEZI_MASO,
  VEPROVE_MASO,
  DRUBEZI_MASO_A_RYBY,
  VEGETARIANSKA_JIDLA,
  DETSKA_JIDLA,
  PRILOHY,
  OMACKY_STUDENE,
  OMACKY_TEPLE,
  DEZERTY,
  NEALKO,
  NEALKO_APERITIVY,
  APERITIVY,
  PIVO_TOCENE,
  PIVO_LAHVOVE,
  ROZLEVANA_VINA,
  LIKERY,
  WHISKEY,
  DESTILATY,
  KONAKY,
  MICHANE_NAPOJE,
  TEPLE_NAPOJE,
  BILA_VINA,
  CERVENA_VINA,
  RUZOVE_VINO,
  SUMIVA_VINA,
  ALLERGEN_LIST,
  MENU_NOTES,
} from "@/lib/menuData";
import type { FullMenuItem, DrinkItem, SideItem, WineItem } from "@/lib/menuData";

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

/* ── Decorative corner ornament ──────────────────────────────────── */

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
      <path
        d="M8 3 C8 1 10 0 10 0 C10 0 12 1 12 3 C12 5 10 5.5 10 5.5 C10 5.5 8 5 8 3 Z"
        opacity="0.9"
      />
      <path
        d="M3 8 C1 8 0 10 0 10 C0 10 1 12 3 12 C5 12 5.5 10 5.5 10 C5.5 10 5 8 3 8 Z"
        opacity="0.9"
      />
    </svg>
  );
}

/* ── Reusable sub-components ─────────────────────────────────────── */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center mt-14 mb-6 first:mt-0">
      <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-wider uppercase text-[var(--color-charcoal)]">
        {children}
      </h3>
      <div className="w-48 h-px bg-[var(--color-stone)] mx-auto mt-2" />
    </div>
  );
}

function SubTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-center text-[10px] tracking-[0.2em] uppercase text-[var(--color-text-muted)] mt-6 mb-3">
      {children}
    </p>
  );
}

function FoodItem({ item }: { item: FullMenuItem }) {
  return (
    <div className="text-center mb-5">
      <h4 className="font-serif text-base sm:text-lg font-bold uppercase tracking-wide text-[var(--color-charcoal)]">
        {item.name}
        {item.weight && (
          <span className="text-[10px] sm:text-xs font-normal tracking-normal lowercase text-[var(--color-text-muted)] ml-2">
            {item.weight}
          </span>
        )}
      </h4>
      {item.description && (
        <p className="text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-[var(--color-text-muted)] mt-1 leading-relaxed">
          {item.description}
          {item.allergens && (
            <span className="ml-1">({item.allergens})</span>
          )}
        </p>
      )}
      {!item.description && item.allergens && (
        <p className="text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-[var(--color-text-muted)] mt-1">
          ({item.allergens})
        </p>
      )}
      {item.isVegetarian && (
        <p className="text-[10px] tracking-[0.1em] uppercase text-green-700 mt-0.5">
          (V)
        </p>
      )}
      <div className="flex items-center justify-center gap-3 mt-2">
        <div className="w-14 h-px bg-[var(--color-charcoal)]/40" />
        <span className="font-serif text-sm font-bold text-[var(--color-charcoal)] tracking-wide">
          {item.price} Kč
        </span>
        <div className="w-14 h-px bg-[var(--color-charcoal)]/40" />
      </div>
    </div>
  );
}

function DrinkRow({ item }: { item: DrinkItem }) {
  return (
    <div className="flex items-baseline justify-between gap-2 py-1.5 border-b border-[var(--color-stone)]/60 last:border-b-0">
      <div className="flex-1 min-w-0">
        <span className="font-serif text-sm sm:text-[15px] text-[var(--color-charcoal)]">
          {item.name}
        </span>
        {item.volume && (
          <span className="text-[10px] sm:text-[11px] text-[var(--color-text-muted)] ml-1.5">
            {item.volume}
          </span>
        )}
        {item.note && (
          <span className="block text-[9px] sm:text-[10px] tracking-[0.1em] text-[var(--color-text-muted)] mt-0.5 leading-relaxed">
            {item.note}
          </span>
        )}
      </div>
      <span className="font-serif text-sm font-bold text-[var(--color-charcoal)] whitespace-nowrap">
        {item.price} Kč
      </span>
    </div>
  );
}

function SideRow({ item }: { item: SideItem }) {
  return (
    <div className="flex items-baseline justify-between gap-2 py-1.5 border-b border-[var(--color-stone)]/60 last:border-b-0">
      <span className="font-serif text-sm sm:text-[15px] text-[var(--color-charcoal)]">
        {item.name}
      </span>
      <span className="font-serif text-sm font-bold text-[var(--color-charcoal)] whitespace-nowrap">
        {item.price} Kč
      </span>
    </div>
  );
}

function WineRow({ wine }: { wine: WineItem }) {
  return (
    <div className="flex items-baseline justify-between gap-2 py-2 border-b border-[var(--color-stone)]/60 last:border-b-0">
      <div className="flex-1 min-w-0">
        <span className="font-serif text-sm sm:text-[15px] text-[var(--color-charcoal)]">
          {wine.name}
        </span>
        <span className="block text-[9px] sm:text-[10px] tracking-[0.1em] text-[var(--color-text-muted)] mt-0.5 leading-relaxed">
          {wine.classification}
        </span>
        <span className="text-[9px] sm:text-[10px] tracking-[0.1em] italic text-[var(--color-text-muted)]">
          {wine.taste}
        </span>
      </div>
      <span className="font-serif text-sm font-bold text-[var(--color-charcoal)] whitespace-nowrap">
        {wine.price} Kč
      </span>
    </div>
  );
}

/* ── Ornamental card wrapper ─────────────────────────────────────── */

function MenuCard({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <FadeIn>
      <div
        id={id}
        className="bg-[#FFFEF9] p-2 sm:p-3 border border-[var(--color-charcoal)]/20 shadow-[0_4px_20px_rgba(0,0,0,0.08)] relative"
      >
        <CornerOrnament className="top-1 left-1 sm:top-1.5 sm:left-1.5" />
        <CornerOrnament className="top-1 right-1 sm:top-1.5 sm:right-1.5 -scale-x-100" />
        <CornerOrnament className="bottom-1 left-1 sm:bottom-1.5 sm:left-1.5 -scale-y-100" />
        <CornerOrnament className="bottom-1 right-1 sm:bottom-1.5 sm:right-1.5 -scale-x-100 -scale-y-100" />
        <div className="border border-[var(--color-charcoal)]/15 px-6 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
          {children}
        </div>
      </div>
    </FadeIn>
  );
}

/* ── Navigation tabs ─────────────────────────────────────────────── */

function MenuNav() {
  const links = [
    { label: "Jídelní lístek", href: "#jidelni-listek" },
    { label: "Nápojový lístek", href: "#napojovy-listek" },
    { label: "Vinný lístek", href: "#vinny-listek" },
  ];

  return (
    <FadeIn delay={0.3}>
      <nav className="flex flex-wrap justify-center gap-3 sm:gap-4">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="inline-block px-6 sm:px-8 py-3 border border-[var(--color-charcoal)] text-[var(--color-charcoal)] text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[var(--color-charcoal)] hover:text-white transition-all duration-300"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </FadeIn>
  );
}

/* ── Page ─────────────────────────────────────────────────────────── */

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
              Menu
            </h1>
          </FadeIn>
          <FadeIn delay={0.6}>
            <div className="w-16 h-px bg-[var(--color-gold)]" />
          </FadeIn>
        </div>
      </section>

      {/* Navigation tabs */}
      <section className="bg-[var(--color-ivory)] pt-16 pb-4">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <MenuNav />
        </div>
      </section>

      {/* ── FOOD MENU ─────────────────────────────────────────── */}
      <section className="bg-[var(--color-ivory)] py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 space-y-16">
          {/* Section heading */}
          <FadeIn>
            <div className="text-center mb-4">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-gold-dark)] mb-4 block">
                Restaurace U Blanických rytířů
              </span>
              <h2
                id="jidelni-listek"
                className="font-serif text-3xl sm:text-4xl tracking-wide uppercase text-[var(--color-charcoal)] scroll-mt-24"
              >
                Jídelní lístek
              </h2>
              <div className="w-16 h-px bg-[var(--color-gold)] mx-auto mt-4" />
            </div>
          </FadeIn>

          {/* Předkrmy */}
          <MenuCard>
            <SectionTitle>Předkrmy</SectionTitle>
            {PREDKRMY.map((item) => (
              <FoodItem key={item.name} item={item} />
            ))}
          </MenuCard>

          {/* Polévky */}
          <MenuCard>
            <SectionTitle>Polévky</SectionTitle>
            {POLEVKY.map((item) => (
              <FoodItem key={item.name} item={item} />
            ))}
          </MenuCard>

          {/* Saláty */}
          <MenuCard>
            <SectionTitle>Saláty</SectionTitle>
            {SALATY.map((item) => (
              <FoodItem key={item.name} item={item} />
            ))}
          </MenuCard>

          {/* Hovězí maso */}
          <MenuCard>
            <SectionTitle>Hovězí maso</SectionTitle>
            {HOVEZI_MASO.map((item) => (
              <FoodItem key={item.name} item={item} />
            ))}
          </MenuCard>

          {/* Vepřové maso */}
          <MenuCard>
            <SectionTitle>Vepřové maso</SectionTitle>
            {VEPROVE_MASO.map((item) => (
              <FoodItem key={item.name} item={item} />
            ))}
          </MenuCard>

          {/* Drůbeží maso a ryby */}
          <MenuCard>
            <SectionTitle>Drůbeží maso a ryby</SectionTitle>
            {DRUBEZI_MASO_A_RYBY.map((item) => (
              <FoodItem key={item.name} item={item} />
            ))}
          </MenuCard>

          {/* Vegetariánská jídla */}
          <MenuCard>
            <SectionTitle>Vegetariánská jídla</SectionTitle>
            {VEGETARIANSKA_JIDLA.map((item) => (
              <FoodItem key={item.name} item={item} />
            ))}
          </MenuCard>

          {/* Dětská jídla */}
          <MenuCard>
            <SectionTitle>Dětská jídla</SectionTitle>
            {DETSKA_JIDLA.map((item) => (
              <FoodItem key={item.name} item={item} />
            ))}
          </MenuCard>

          {/* Přílohy & Omáčky */}
          <MenuCard>
            <SectionTitle>Přílohy</SectionTitle>
            <div className="max-w-md mx-auto">
              {PRILOHY.map((item) => (
                <SideRow key={item.name} item={item} />
              ))}
            </div>

            <SectionTitle>Omáčky</SectionTitle>
            <SubTitle>Studené</SubTitle>
            <div className="max-w-md mx-auto">
              {OMACKY_STUDENE.map((item) => (
                <SideRow key={item.name} item={item} />
              ))}
            </div>
            <SubTitle>Teplé</SubTitle>
            <div className="max-w-md mx-auto">
              {OMACKY_TEPLE.map((item) => (
                <SideRow key={item.name} item={item} />
              ))}
            </div>
          </MenuCard>

          {/* Dezerty */}
          <MenuCard>
            <SectionTitle>Dezerty</SectionTitle>
            {DEZERTY.map((item) => (
              <FoodItem key={item.name} item={item} />
            ))}
          </MenuCard>

          {/* Allergens & notes */}
          <FadeIn>
            <div className="text-center space-y-3 max-w-lg mx-auto">
              <p className="text-[9px] sm:text-[10px] tracking-[0.15em] text-[var(--color-text-muted)] leading-relaxed">
                {ALLERGEN_LIST}
              </p>
              <p className="text-[9px] sm:text-[10px] tracking-[0.15em] uppercase text-[var(--color-text-muted)]">
                (v) — vegetariánské
              </p>
              {MENU_NOTES.map((note) => (
                <p
                  key={note}
                  className="text-[9px] sm:text-[10px] tracking-[0.15em] text-[var(--color-text-muted)]"
                >
                  {note}
                </p>
              ))}
              <p className="text-[9px] sm:text-[10px] tracking-[0.15em] text-[var(--color-text-muted)]">
                Informujte nás prosím o případných alergiích.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── DRINKS MENU ───────────────────────────────────────── */}
      <section className="bg-[var(--color-cream)] py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 space-y-16">
          <FadeIn>
            <div className="text-center mb-4">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-gold-dark)] mb-4 block">
                Restaurace U Blanických rytířů
              </span>
              <h2
                id="napojovy-listek"
                className="font-serif text-3xl sm:text-4xl tracking-wide uppercase text-[var(--color-charcoal)] scroll-mt-24"
              >
                Nápojový lístek
              </h2>
              <div className="w-16 h-px bg-[var(--color-gold)] mx-auto mt-4" />
            </div>
          </FadeIn>

          {/* Nealkoholické nápoje */}
          <MenuCard>
            <SectionTitle>Nealkoholické nápoje</SectionTitle>
            <div className="max-w-md mx-auto">
              {NEALKO.map((item, i) => (
                <DrinkRow key={`${item.name}-${item.volume}-${i}`} item={item} />
              ))}
            </div>
          </MenuCard>

          {/* Aperitivy */}
          <MenuCard>
            <SectionTitle>Nealkoholické aperitivy</SectionTitle>
            <div className="max-w-md mx-auto">
              {NEALKO_APERITIVY.map((item) => (
                <DrinkRow key={item.name} item={item} />
              ))}
            </div>

            <SectionTitle>Aperitivy</SectionTitle>
            <div className="max-w-md mx-auto">
              {APERITIVY.map((item) => (
                <DrinkRow key={item.name} item={item} />
              ))}
            </div>
          </MenuCard>

          {/* Pivo */}
          <MenuCard>
            <SectionTitle>Pivo</SectionTitle>
            <SubTitle>Točené</SubTitle>
            <div className="max-w-md mx-auto">
              {PIVO_TOCENE.map((item, i) => (
                <DrinkRow key={`${item.name}-${item.volume}-${i}`} item={item} />
              ))}
            </div>
            <SubTitle>Lahvové</SubTitle>
            <div className="max-w-md mx-auto">
              {PIVO_LAHVOVE.map((item) => (
                <DrinkRow key={item.name} item={item} />
              ))}
            </div>
          </MenuCard>

          {/* Rozlévaná vína */}
          <MenuCard>
            <SectionTitle>Rozlévaná vína</SectionTitle>
            <div className="max-w-md mx-auto">
              {ROZLEVANA_VINA.map((item) => (
                <DrinkRow key={item.name} item={item} />
              ))}
            </div>
          </MenuCard>

          {/* Likéry */}
          <MenuCard>
            <SectionTitle>Likéry</SectionTitle>
            <div className="max-w-md mx-auto">
              {LIKERY.map((item) => (
                <DrinkRow key={item.name} item={item} />
              ))}
            </div>
          </MenuCard>

          {/* Whiskey */}
          <MenuCard>
            <SectionTitle>Whiskey</SectionTitle>
            <div className="max-w-md mx-auto">
              {WHISKEY.map((item) => (
                <DrinkRow key={item.name} item={item} />
              ))}
            </div>
          </MenuCard>

          {/* Destiláty */}
          <MenuCard>
            <SectionTitle>Destiláty</SectionTitle>
            <div className="max-w-md mx-auto">
              {DESTILATY.map((item) => (
                <DrinkRow key={item.name} item={item} />
              ))}
            </div>
          </MenuCard>

          {/* Koňaky */}
          <MenuCard>
            <SectionTitle>Koňaky</SectionTitle>
            <div className="max-w-md mx-auto">
              {KONAKY.map((item) => (
                <DrinkRow key={item.name} item={item} />
              ))}
            </div>
          </MenuCard>

          {/* Míchané nápoje */}
          <MenuCard>
            <SectionTitle>Míchané nápoje</SectionTitle>
            <div className="max-w-md mx-auto">
              {MICHANE_NAPOJE.map((item) => (
                <DrinkRow key={item.name} item={item} />
              ))}
            </div>
          </MenuCard>

          {/* Teplé nápoje */}
          <MenuCard>
            <SectionTitle>Teplé nápoje</SectionTitle>
            <div className="max-w-md mx-auto">
              {TEPLE_NAPOJE.map((item) => (
                <DrinkRow key={item.name} item={item} />
              ))}
            </div>
          </MenuCard>
        </div>
      </section>

      {/* ── WINE LIST ─────────────────────────────────────────── */}
      <section className="bg-[var(--color-ivory)] py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 space-y-16">
          <FadeIn>
            <div className="text-center mb-4">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-gold-dark)] mb-4 block">
                Vinařství Buchtovi
              </span>
              <h2
                id="vinny-listek"
                className="font-serif text-3xl sm:text-4xl tracking-wide uppercase text-[var(--color-charcoal)] scroll-mt-24"
              >
                Vinný lístek
              </h2>
              <div className="w-16 h-px bg-[var(--color-gold)] mx-auto mt-4" />
            </div>
          </FadeIn>

          {/* Bílá vína */}
          <MenuCard>
            <SectionTitle>Bílá vína</SectionTitle>
            <div className="max-w-lg mx-auto">
              {BILA_VINA.map((wine) => (
                <WineRow key={wine.name} wine={wine} />
              ))}
            </div>
          </MenuCard>

          {/* Červená vína */}
          <MenuCard>
            <SectionTitle>Červená vína</SectionTitle>
            <div className="max-w-lg mx-auto">
              {CERVENA_VINA.map((wine) => (
                <WineRow key={wine.name} wine={wine} />
              ))}
            </div>
          </MenuCard>

          {/* Růžové víno */}
          <MenuCard>
            <SectionTitle>Růžové víno</SectionTitle>
            <div className="max-w-lg mx-auto">
              {RUZOVE_VINO.map((wine) => (
                <WineRow key={wine.name} wine={wine} />
              ))}
            </div>
          </MenuCard>

          {/* Šumivá vína */}
          <MenuCard>
            <SectionTitle>Šumivá vína</SectionTitle>
            <div className="max-w-lg mx-auto">
              {SUMIVA_VINA.map((wine) => (
                <WineRow key={wine.name} wine={wine} />
              ))}
            </div>
          </MenuCard>
        </div>
      </section>

      <Footer />
    </>
  );
}
