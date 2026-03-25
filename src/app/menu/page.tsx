import { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/sections/Footer";
import { FadeIn, SlideUp, AnimatedImage } from "@/components/motion";
import {
  POLEVKY,
  PREDKRMY,
  HOVEZI_MASO,
  VEPROVE_MASO,
  DRUBEZI_MASO,
  SALATY,
  VEGETARIANSKA_JIDLA,
  RYBY,
  DETSKA_JIDLA,
  PRILOHY,
  OMACKY,
  DEZERTY,
  NEALKO,
  PIVO_TOCENE,
  PIVO_LAHVOVE,
  ROZLEVANA_VINA,
  APERITIVY,
  LIKERY,
  MICHANE_NAPOJE,
  WHISKEY,
  DESTILATY,
  KONAKY,
  TEPLE_NAPOJE,
  BILA_VINA,
  CERVENA_VINA,
  RUZOVE_VINO,
  SUMIVA_VINA,
  ALLERGEN_LIST,
  MENU_NOTES,
} from "@/lib/menuData";
import type { FullMenuItem, DrinkItem, WineItem } from "@/lib/menuData";

export const metadata: Metadata = {
  title: "Jídelní lístek | U Blanických rytířů",
  description:
    "Kompletní jídelní lístek restaurace U Blanických rytířů. Česká kuchyně z lokálních surovin v prostorách vlašimského zámku.",
};

/* ─── Reusable components ─── */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <FadeIn>
      <div className="text-center mb-10 mt-4">
        <h2 className="font-serif text-2xl sm:text-3xl tracking-wide uppercase text-[var(--color-charcoal)]">
          {children}
        </h2>
        <div className="w-16 h-px bg-[var(--color-gold)] mx-auto mt-4" />
      </div>
    </FadeIn>
  );
}

function FoodItem({ item }: { item: FullMenuItem }) {
  return (
    <div className="text-center mb-8">
      <h3 className="font-serif text-base sm:text-lg font-bold tracking-wide uppercase text-[var(--color-charcoal)]">
        {item.name}
        {item.weight && (
          <span className="font-sans text-xs font-normal text-[var(--color-text-muted)] ml-2">
            {item.weight}
          </span>
        )}
      </h3>
      {item.description && (
        <p className="text-xs tracking-widest uppercase text-[var(--color-text-muted)] mt-1">
          {item.description}
        </p>
      )}
      {item.allergens && (
        <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
          ({item.allergens})
        </p>
      )}
      {item.isVegetarian && (
        <p className="text-xs text-green-700 mt-0.5">(V)</p>
      )}
      <div className="flex items-center justify-center gap-3 mt-2">
        <span className="w-10 h-px bg-[var(--color-charcoal)]" />
        <span className="font-serif text-sm font-bold text-[var(--color-charcoal)]">
          {item.price} Kč
        </span>
        <span className="w-10 h-px bg-[var(--color-charcoal)]" />
      </div>
    </div>
  );
}

function DrinkRow({ item }: { item: DrinkItem }) {
  return (
    <div className="flex items-baseline justify-between py-2 border-b border-[var(--color-stone)]/30 last:border-b-0">
      <div className="flex-1 min-w-0 pr-4">
        <span className="text-sm text-[var(--color-charcoal)]">
          {item.name}
        </span>
        {item.volume && (
          <span className="text-xs text-[var(--color-text-muted)] ml-1.5">
            {item.volume}
          </span>
        )}
        {item.note && (
          <span className="text-xs text-[var(--color-text-muted)] block sm:inline sm:ml-1.5">
            ({item.note})
          </span>
        )}
      </div>
      <span className="font-serif text-sm font-bold text-[var(--color-charcoal)] whitespace-nowrap">
        {item.price} Kč
      </span>
    </div>
  );
}

function WineRow({ item }: { item: WineItem }) {
  return (
    <div className="py-4 border-b border-[var(--color-stone)]/30 last:border-b-0">
      <div className="flex items-baseline justify-between">
        <h4 className="font-serif text-base font-bold text-[var(--color-charcoal)]">
          {item.name}
        </h4>
        <span className="font-serif text-sm font-bold text-[var(--color-charcoal)] whitespace-nowrap ml-4">
          {item.price} Kč
        </span>
      </div>
      <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
        {item.classification} | {item.taste}
      </p>
    </div>
  );
}

function DrinkSectionBlock({
  title,
  items,
}: {
  title: string;
  items: DrinkItem[];
}) {
  return (
    <div className="mb-8">
      <h3 className="font-serif text-lg tracking-wide uppercase text-[var(--color-charcoal)] mb-3 text-center">
        {title}
      </h3>
      <div className="w-10 h-px bg-[var(--color-gold)] mx-auto mb-4" />
      {items.map((item, i) => (
        <DrinkRow key={i} item={item} />
      ))}
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-center justify-center my-12">
      <span className="w-8 h-px bg-[var(--color-stone)]" />
      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)] mx-3" />
      <span className="w-8 h-px bg-[var(--color-stone)]" />
    </div>
  );
}

/* ─── Page ─── */

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

      {/* ═══════════ FOOD MENU ═══════════ */}
      <section className="bg-[var(--color-ivory)] py-16 lg:py-24">
        <div className="max-w-2xl mx-auto px-6 lg:px-12">

          {/* Polévky */}
          <SectionTitle>Polévky</SectionTitle>
          {POLEVKY.map((item, i) => (
            <SlideUp key={i} delay={i * 0.05}>
              <FoodItem item={item} />
            </SlideUp>
          ))}

          <Divider />

          {/* Předkrmy */}
          <SectionTitle>Předkrmy</SectionTitle>
          {PREDKRMY.map((item, i) => (
            <SlideUp key={i} delay={i * 0.05}>
              <FoodItem item={item} />
            </SlideUp>
          ))}

          <Divider />

          {/* Hovězí maso */}
          <SectionTitle>Hovězí maso</SectionTitle>
          {HOVEZI_MASO.map((item, i) => (
            <SlideUp key={i} delay={i * 0.05}>
              <FoodItem item={item} />
            </SlideUp>
          ))}

          <Divider />

          {/* Vepřové maso */}
          <SectionTitle>Vepřové maso</SectionTitle>
          {VEPROVE_MASO.map((item, i) => (
            <SlideUp key={i} delay={i * 0.05}>
              <FoodItem item={item} />
            </SlideUp>
          ))}

          <Divider />

          {/* Drůbeží maso */}
          <SectionTitle>Drůbeží maso</SectionTitle>
          {DRUBEZI_MASO.map((item, i) => (
            <SlideUp key={i} delay={i * 0.05}>
              <FoodItem item={item} />
            </SlideUp>
          ))}

          <Divider />

          {/* Saláty */}
          <SectionTitle>Saláty</SectionTitle>
          {SALATY.map((item, i) => (
            <SlideUp key={i} delay={i * 0.05}>
              <FoodItem item={item} />
            </SlideUp>
          ))}

          <Divider />

          {/* Vegetariánská jídla */}
          <SectionTitle>Vegetariánská jídla</SectionTitle>
          {VEGETARIANSKA_JIDLA.map((item, i) => (
            <SlideUp key={i} delay={i * 0.05}>
              <FoodItem item={item} />
            </SlideUp>
          ))}

          <Divider />

          {/* Ryby */}
          <SectionTitle>Ryby</SectionTitle>
          {RYBY.map((item, i) => (
            <SlideUp key={i} delay={i * 0.05}>
              <FoodItem item={item} />
            </SlideUp>
          ))}

          <Divider />

          {/* Dětská jídla */}
          <SectionTitle>Dětská jídla</SectionTitle>
          {DETSKA_JIDLA.map((item, i) => (
            <SlideUp key={i} delay={i * 0.05}>
              <FoodItem item={item} />
            </SlideUp>
          ))}

          <Divider />

          {/* Přílohy & Omáčky */}
          <SectionTitle>Přílohy</SectionTitle>
          <FadeIn>
            <div className="text-center mb-8">
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-1">
                {PRILOHY.map((item, i) => (
                  <span
                    key={i}
                    className="text-xs tracking-widest uppercase text-[var(--color-text-muted)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="text-center mb-4">
              <h3 className="font-serif text-lg tracking-wide uppercase text-[var(--color-charcoal)] mb-3">
                Omáčky
              </h3>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-1">
                {OMACKY.map((item, i) => (
                  <span
                    key={i}
                    className="text-xs tracking-widest uppercase text-[var(--color-text-muted)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

          <Divider />

          {/* Dezerty */}
          <SectionTitle>Dezerty</SectionTitle>
          {DEZERTY.map((item, i) => (
            <SlideUp key={i} delay={i * 0.05}>
              <FoodItem item={item} />
            </SlideUp>
          ))}

          {/* Notes & Allergens */}
          <FadeIn>
            <div className="mt-12 pt-8 border-t border-[var(--color-stone)]/40 text-center">
              {MENU_NOTES.map((note, i) => (
                <p
                  key={i}
                  className="text-xs text-[var(--color-text-muted)] mb-1"
                >
                  {note}
                </p>
              ))}
              <p className="text-[10px] text-[var(--color-text-muted)] mt-4 max-w-md mx-auto leading-relaxed">
                {ALLERGEN_LIST}
              </p>
              <p className="text-[10px] text-green-700 mt-2">
                (V) — vegetariánské
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════ DRINKS ═══════════ */}
      <section className="bg-[var(--color-cream)] py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-gold-dark)] mb-4 block">
                Nápojový lístek
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl tracking-wide uppercase text-[var(--color-charcoal)]">
                Nápoje
              </h2>
              <div className="w-16 h-px bg-[var(--color-gold)] mx-auto mt-4" />
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            <FadeIn>
              <DrinkSectionBlock title="Nealkoholické nápoje" items={NEALKO} />
            </FadeIn>

            <FadeIn>
              <div className="mb-8">
                <h3 className="font-serif text-lg tracking-wide uppercase text-[var(--color-charcoal)] mb-3 text-center">
                  Pivo
                </h3>
                <div className="w-10 h-px bg-[var(--color-gold)] mx-auto mb-4" />
                <p className="text-xs tracking-widest uppercase text-[var(--color-text-muted)] mb-2 text-center">
                  Točené
                </p>
                {PIVO_TOCENE.map((item, i) => (
                  <DrinkRow key={i} item={item} />
                ))}
                <p className="text-xs tracking-widest uppercase text-[var(--color-text-muted)] mb-2 mt-4 text-center">
                  Lahvové
                </p>
                {PIVO_LAHVOVE.map((item, i) => (
                  <DrinkRow key={i} item={item} />
                ))}
              </div>
            </FadeIn>

            <FadeIn>
              <DrinkSectionBlock title="Rozlévaná vína" items={ROZLEVANA_VINA} />
            </FadeIn>

            <FadeIn>
              <DrinkSectionBlock title="Teplé nápoje" items={TEPLE_NAPOJE} />
            </FadeIn>

            <FadeIn>
              <DrinkSectionBlock title="Aperitivy" items={APERITIVY} />
            </FadeIn>

            <FadeIn>
              <DrinkSectionBlock title="Likéry" items={LIKERY} />
            </FadeIn>

            <FadeIn>
              <DrinkSectionBlock title="Míchané nápoje" items={MICHANE_NAPOJE} />
            </FadeIn>

            <FadeIn>
              <DrinkSectionBlock title="Whiskey" items={WHISKEY} />
            </FadeIn>

            <FadeIn>
              <DrinkSectionBlock title="Destiláty" items={DESTILATY} />
            </FadeIn>

            <FadeIn>
              <DrinkSectionBlock title="Koňaky" items={KONAKY} />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══════════ WINE LIST ═══════════ */}
      <section className="bg-[var(--color-ivory)] py-16 lg:py-24">
        <div className="max-w-2xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="text-center mb-6">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-gold-dark)] mb-4 block">
                Vinařství Buchtovi
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl tracking-wide uppercase text-[var(--color-charcoal)]">
                Vinný lístek
              </h2>
              <div className="w-16 h-px bg-[var(--color-gold)] mx-auto mt-4" />
            </div>
          </FadeIn>

          <FadeIn>
            <p className="text-sm text-[var(--color-text-muted)] text-center max-w-lg mx-auto mb-14 leading-relaxed">
              Rodinné vinařství z Velkých Pavlovic. Poctivá ročníková vína
              tvořená s úctou k přírodě i tradici.
            </p>
          </FadeIn>

          {/* Bílá vína */}
          <FadeIn>
            <h3 className="font-serif text-xl tracking-wide uppercase text-[var(--color-charcoal)] text-center mb-6">
              Bílá vína
            </h3>
            <div className="w-10 h-px bg-[var(--color-gold)] mx-auto mb-6" />
            {BILA_VINA.map((wine, i) => (
              <WineRow key={i} item={wine} />
            ))}
          </FadeIn>

          <Divider />

          {/* Červená vína */}
          <FadeIn>
            <h3 className="font-serif text-xl tracking-wide uppercase text-[var(--color-charcoal)] text-center mb-6">
              Červená vína
            </h3>
            <div className="w-10 h-px bg-[var(--color-gold)] mx-auto mb-6" />
            {CERVENA_VINA.map((wine, i) => (
              <WineRow key={i} item={wine} />
            ))}
          </FadeIn>

          <Divider />

          {/* Růžové víno */}
          <FadeIn>
            <h3 className="font-serif text-xl tracking-wide uppercase text-[var(--color-charcoal)] text-center mb-6">
              Růžové víno
            </h3>
            <div className="w-10 h-px bg-[var(--color-gold)] mx-auto mb-6" />
            {RUZOVE_VINO.map((wine, i) => (
              <WineRow key={i} item={wine} />
            ))}
          </FadeIn>

          <Divider />

          {/* Šumivá a perlivá vína */}
          <FadeIn>
            <h3 className="font-serif text-xl tracking-wide uppercase text-[var(--color-charcoal)] text-center mb-6">
              Šumivá a perlivá vína
            </h3>
            <div className="w-10 h-px bg-[var(--color-gold)] mx-auto mb-6" />
            {SUMIVA_VINA.map((wine, i) => (
              <WineRow key={i} item={wine} />
            ))}
          </FadeIn>
        </div>
      </section>

      <Footer />
    </>
  );
}
