import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/sections/Footer";
import { FadeIn, AnimatedImage } from "@/components/motion";

export const metadata: Metadata = {
  title: "Jídelní lístek | U Blanických rytířů",
  description:
    "Kompletní jídelní lístek restaurace U Blanických rytířů. Česká kuchyně z lokálních surovin v prostorách vlašimského zámku.",
};

const menuCategories = [
  {
    id: "predkrmy",
    title: "Předkrmy",
    subtitle: "Starters",
    items: [
      {
        name: "Hovězí carpaccio 100g",
        description: "lanýžová majonéza, bylinkové pesto, domácí focaccia",
        allergens: "1,3",
        price: 135,
      },
      {
        name: "Vepřové krokety 3ks",
        description:
          "v omáčce z pečeného česneku, nakládaná zelenina, rozpečený chléb",
        allergens: "1,3,7",
        price: 287,
      },
      {
        name: "Grilovaný kozí sýr ve slanině 100g",
        description: "na rukolovém salátku s brusinkami, domácí focaccia",
        allergens: "1,7",
        price: 494,
      },
    ],
  },
  {
    id: "polevky",
    title: "Polévky",
    subtitle: "Soups",
    items: [
      {
        name: "Hovězí vývar s domácími játrovými knedlíčky",
        description: "zelenina a nudle",
        allergens: "1,3,9",
        price: 75,
      },
      {
        name: "Zámecká cibulačka",
        description:
          "se slaninou, vídeňskou cibulkou a bylinkovými krutony",
        allergens: "1,3,7",
        price: 96,
      },
    ],
  },
  {
    id: "hovezi",
    title: "Hovězí maso",
    subtitle: "Beef",
    items: [
      {
        name: "Steak z pravé svíčkové 250g",
        description:
          "opečené máslové grenaille s rozmarýnem, pepřová omáčka",
        allergens: "1,7",
        price: 595,
      },
      {
        name: "Filírovaný flank steak 250g",
        description: "bramborová sláma a grilovaná zelenina",
        allergens: "1,11",
        price: 369,
      },
      {
        name: "Burger z irského chuck rollu 200g",
        description: "s čedarem a slaninovým dipem, domácí hranolky",
        allergens: "1,3,7,11",
        price: 325,
      },
      {
        name: "Míchaný tatarský biftek 150g",
        description: "z pravé svíčkové, 4ks topinky",
        allergens: "1,3,6,10",
        price: 345,
      },
    ],
  },
  {
    id: "veprove",
    title: "Vepřové maso",
    subtitle: "Pork",
    items: [
      {
        name: "Steak z pečeně DUROC 250g",
        description:
          "se sázeným vejcem, slaninovým chipsem, domácí hranolky",
        allergens: "1,3",
        price: 679,
      },
      {
        name: 'Na másle smažený řízek „Tomahawk" 300g',
        description: "vídeňský bramborový salát",
        allergens: "1,3,7,10",
        price: 481,
      },
      {
        name: "Medailonky z vepřové panenky 200g",
        description:
          "slaninové fazolky s česnekem, omáčka z italské gorgonzoly",
        allergens: "1,7",
        price: 356,
      },
      {
        name: "Vepřová líčka 200g",
        description: "v hříbkové omáčce, restované vaječné špecle",
        allergens: "1,3,7,10",
        price: 305,
      },
    ],
  },
  {
    id: "drubezi",
    title: "Drůbeží maso",
    subtitle: "Poultry",
    items: [
      {
        name: "Kuřecí prso 200g",
        description:
          "se smetanovo-liškovou omáčkou, domácí bramborové placky",
        allergens: "1,3,7",
        price: 310,
      },
      {
        name: "Filírované kuřecí prsíčko sous-vide 200g",
        description: "na lanýžovém rizotu",
        allergens: "7",
        price: 345,
      },
      {
        name: "Konfitované kachní stehno 300g",
        description: "karlovarský špalíček, červené zelí",
        allergens: "1,3,7",
        price: 325,
      },
    ],
  },
  {
    id: "ryby",
    title: "Ryby",
    subtitle: "Fish",
    items: [
      {
        name: "Steak z norského lososa 200g",
        description: "grilovaná zelenina",
        allergens: "4,11",
        price: 380,
      },
    ],
  },
  {
    id: "salaty",
    title: "Saláty",
    subtitle: "Salads",
    items: [
      {
        name: "Caesar salát 300g",
        description:
          "s grilovaným kuřecím masem, krutony, slaninovým chipsem a parmezánem",
        allergens: "1,3,7",
        price: 295,
      },
      {
        name: "Grilovaný kozí sýr na listovém salátu 300g",
        description:
          "se zeleninou a červenou řepou, medovo-hořčičná emulze, domácí focaccia",
        allergens: "1,3,7,10",
        price: 285,
      },
    ],
  },
  {
    id: "vegetarianska",
    title: "Vegetariánská jídla",
    subtitle: "Vegetarian",
    items: [
      {
        name: "Těstoviny s pestem z medvědího česneku 300g",
        description: "fermentované ředkvičky",
        allergens: "1,3,7,8",
        price: 275,
      },
      {
        name: "Bramborové noky 300g",
        description: "v omáčce z italské gorgonzoly se smaženou rukolou",
        allergens: "1,3,7",
        price: 265,
      },
    ],
  },
  {
    id: "detska",
    title: "Dětská jídla",
    subtitle: "Kids menu",
    items: [
      {
        name: "Boloňské těstoviny 200g",
        description: "",
        allergens: "1,3",
        price: 125,
      },
      {
        name: "Kuřecí řízek 100g",
        description: "vařené brambory",
        allergens: "1,3,7",
        price: 139,
      },
    ],
  },
  {
    id: "dezerty",
    title: "Dezerty",
    subtitle: "Desserts",
    items: [
      {
        name: "Macerovaná hruška",
        description:
          "s omáčkou ze slaného karamelu a mandlovým griliášem",
        allergens: "7,8,12",
        price: 197,
      },
      {
        name: "Crème brûlée",
        description: "s křehkou karamelovou krustou a čerstvým ovocem",
        allergens: "3,7",
        price: 134,
      },
      {
        name: "Zmrzlinový pohár",
        description: "s lesním ovocem a šlehačkou",
        allergens: "7",
        price: 169,
      },
      {
        name: "Tvarohové knedlíčky",
        description: "s meruňkovým rozvarem",
        allergens: "1,3,7,12",
        price: 163,
      },
      {
        name: "Kopeček zmrzlina",
        description: "",
        allergens: "7",
        price: 30,
      },
    ],
  },
];

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

      {/* Menu Content */}
      <section className="bg-[var(--color-ivory)] py-20 lg:py-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          {/* Introduction */}
          <FadeIn>
            <div className="text-center mb-16 lg:mb-24">
              <p className="text-[var(--color-text-muted)] text-sm leading-relaxed max-w-xl mx-auto">
                Naše kuchyně staví na poctivých surovinách od lokálních dodavatelů
                z Podblanicka. Každý pokrm připravujeme s úctou k české
                gastronomické tradici.
              </p>
            </div>
          </FadeIn>

          {/* Menu Card */}
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
              <h2 className="font-serif text-3xl sm:text-4xl text-[var(--color-charcoal)] mb-4">
                Menu
              </h2>
              <div className="w-12 h-px bg-[var(--color-gold)] mx-auto" />
            </div>

            {/* Categories */}
            <div className="space-y-14 sm:space-y-16">
              {menuCategories.map((category) => (
                <div key={category.id}>
                  {/* Category Header */}
                  <div className="mb-8">
                    <h3 className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-gold-dark)] mb-1">
                      {category.title}
                    </h3>
                    <span className="text-[9px] tracking-[0.2em] uppercase text-[var(--color-text-muted)]">
                      {category.subtitle}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="space-y-6">
                    {category.items.map((item, index) => (
                      <div key={index}>
                        {/* Name + Price row */}
                        <div className="flex items-baseline gap-3">
                          <span className="font-serif text-lg sm:text-xl text-[var(--color-charcoal)]">
                            {item.name}
                          </span>
                          <span className="flex-1 border-b border-dotted border-[var(--color-charcoal)]/15 min-w-[2rem] translate-y-[-4px]" />
                          <span className="text-[var(--color-charcoal)] text-sm font-medium whitespace-nowrap">
                            {item.price} Kč
                          </span>
                        </div>
                        {/* Description + Allergens */}
                        <p className="text-[var(--color-text-muted)] text-xs mt-1 tracking-wide">
                          {item.description}
                          {item.description && item.allergens && " "}
                          {item.allergens && (
                            <span className="text-[var(--color-text-muted)]/60">
                              ({item.allergens})
                            </span>
                          )}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Category divider */}
                  <div className="mt-10 flex items-center justify-center gap-4">
                    <div className="w-8 h-px bg-[var(--color-stone)]" />
                    <div className="w-1 h-1 bg-[var(--color-gold)] rotate-45" />
                    <div className="w-8 h-px bg-[var(--color-stone)]" />
                  </div>
                </div>
              ))}
            </div>

            {/* Allergen Legend */}
            <div className="mt-16 pt-8 border-t border-[var(--color-charcoal)]/10 text-center space-y-3">
              <p className="text-[10px] tracking-[0.15em] text-[var(--color-text-muted)] leading-relaxed max-w-md mx-auto">
                1 — obiloviny, 2 — korýši, 3 — vejce, 4 — ryby, 5 — arašídy,
                6 — sója, 7 — mléko, 8 — skořápkové plody, 9 — celer,
                10 — hořčice, 11 — sezam, 12 — oxid siřičitý, 13 — vlčí bob,
                14 — měkkýši
              </p>
              <p className="text-[10px] tracking-[0.15em] text-[var(--color-text-muted)]">
                Informujte nás prosím o případných alergiích.
              </p>
            </div>
          </div>
          </FadeIn>

          {/* CTA Section */}
          <FadeIn delay={0.2}>
          <div className="mt-16 lg:mt-20 text-center">
            <p className="text-[var(--color-text-muted)] text-sm mb-8">
              Chcete rezervovat stůl?
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

      <Footer />
    </>
  );
}
