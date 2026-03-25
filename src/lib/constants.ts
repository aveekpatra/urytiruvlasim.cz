import type { RestaurantInfo, Feature, MenuItem, Review, OpeningHours } from '@/types';

export const RESTAURANT_INFO: RestaurantInfo = {
  name: "U Blanických rytířů",
  tagline: "Gastronomie v srdci vlašimského zámku",
  address: {
    street: "Zámek 1",
    city: "Vlašim",
    postalCode: "258 01",
    country: "Česká republika"
  },
  phone: "+420 732 878 238",
  email: "ublanickychrytiru@seznam.cz",
  coordinates: {
    lat: 49.7073,
    lng: 14.8950
  },
  openingHours: [
    { days: "Po–Čt", hours: "11:00–22:00" },
    { days: "Pá–So", hours: "11:00–23:00" },
    { days: "Ne", hours: "11:00–21:00" }
  ]
};

export const USP_FEATURES: Feature[] = [
  {
    icon: "castle",
    title: "Jedinečná lokace",
    description: "Obědváte přímo v prostorách historického vlašimského zámku. Park s 75 hektary zeleně je ideální na procházku po jídle."
  },
  {
    icon: "family",
    title: "Pro rodiny s dětmi",
    description: "Terasa s dětským koutkem. Děti si hrají, rodiče si užívají klid."
  },
  {
    icon: "drink",
    title: "Točené pivo",
    description: "Točená Plzeň a Kozel přímo z tanku. Vychlazené, čerstvé, tak jak má být."
  }
];

export const SAMPLE_MENU: MenuItem[] = [
  {
    id: "soup-1",
    category: "soup",
    name: "Zámecká cibulačka",
    description: "se slaninou, vídeňskou cibulkou a bylinkovými krutony",
    allergens: "1,3,7",
    price: 96,
    currency: "Kč"
  },
  {
    id: "main-1",
    category: "main",
    name: "Vepřová líčka 200g",
    description: "v hříbkové omáčce, restované vaječné špecle",
    allergens: "1,3,7,10",
    price: 305,
    currency: "Kč"
  },
  {
    id: "main-2",
    category: "main",
    name: "Kuřecí prso 200g",
    description: "se smetanovo-liškovou omáčkou, domácí bramborové placky",
    allergens: "1,3,7",
    price: 310,
    currency: "Kč"
  },
  {
    id: "main-3",
    category: "main",
    name: "Bramborové noky 300g",
    description: "v omáčce z italské gorgonzoly se smaženou rukolou",
    allergens: "1,3,7",
    price: 265,
    currency: "Kč",
    isVegetarian: true
  }
];

export const REVIEWS: Review[] = [
  {
    id: "review-1",
    author: "Jana K.",
    text: "Perfektní místo na rodinnou oslavu. Prostředí zámku, výborná svíčková a milá obsluha. Děti si užívaly dětský koutek.",
    rating: 5,
    source: "google"
  },
  {
    id: "review-2",
    author: "Petr N.",
    text: "Krásné prostředí přímo na zámku. Jídlo výborné, ceny rozumné. Doporučujeme!",
    rating: 5,
    source: "tripadvisor"
  },
  {
    id: "review-3",
    author: "TripAdvisor Traveler",
    text: "Ideální zastávka po výletě na Blaník. Příjemná atmosféra a kvalitní česká kuchyně.",
    rating: 4,
    source: "tripadvisor"
  }
];

export const WEDDING_FEATURES = [
  "Pronájem restaurace pro vaši akci",
  "Menu a dekorace na míru",
  "Svatby, firemní akce, soukromé oslavy",
  "Kapacita: až 80 hostů"
];

export const ABOUT_TEXT = `Restaurace U Blanických rytířů není jen místem k jídlu – je to součást vlašimské historie. Naše kuchyně respektuje tradice české gastronomie: poctivé vývary, lokální suroviny a recepty, které stojí na pevných základech.

Ať už hledáte teplou večeři u krbu v zimě, nebo osvěžující oběd na terase v létě – u nás najdete klid, pohostinnost a chuť domova.`;
