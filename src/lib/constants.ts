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
  phone: "+420 123 456 789",
  email: "rezervace@ublanickychrytiru.cz",
  coordinates: {
    lat: 49.7067,
    lng: 14.8997
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
    icon: "parking",
    title: "Parkování zdarma",
    description: "Nemusíte hledat místo. Parkujete přímo před vstupem do zámeckého areálu."
  },
  {
    icon: "family",
    title: "Pro rodiny s dětmi",
    description: "Terasa s dětským koutkem. Děti si hrají, rodiče si užívají klid."
  }
];

export const SAMPLE_MENU: MenuItem[] = [
  {
    id: "soup-1",
    category: "soup",
    name: "Cibulová s parmazánem",
    price: 55,
    currency: "Kč"
  },
  {
    id: "main-1",
    category: "main",
    name: "Svíčková na smetaně, karlovarský knedlík, brusinky",
    price: 245,
    currency: "Kč"
  },
  {
    id: "main-2",
    category: "main",
    name: "Kančí guláš z podblanických lesů, houskový knedlík",
    price: 225,
    currency: "Kč"
  },
  {
    id: "main-3",
    category: "main",
    name: "Bramborové taštičky s tvarohem, máslo, perník",
    description: "Vegetariánské",
    price: 195,
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
  "Exkluzivní pronájem restaurace",
  "Svatební menu na míru",
  "Koordinace s fotografem",
  "Parkování pro hosty",
  "Kapacita: 40–80 hostů"
];

export const ABOUT_TEXT = `Restaurace U Blanických rytířů není jen místem k jídlu – je to součást vlašimské historie. Naše kuchyně respektuje tradice české gastronomie: poctivé vývary, lokální suroviny a recepty, které stojí na pevných základech.

Ať už hledáte teplou večeři u krbu v zimě, nebo osvěžující oběd na terase v létě – u nás najdete klid, pohostinnost a chuť domova.`;
