// Full restaurant menu data — sourced from the official printed menu PDF

export interface FullMenuItem {
  name: string;
  description?: string;
  allergens?: string;
  weight?: string;
  price: number;
  isVegetarian?: boolean;
}

export interface MenuSection {
  title: string;
  items: FullMenuItem[];
}

export interface SimpleItem {
  name: string;
  price?: number;
}

export interface SimplePriceSection {
  title: string;
  items: SimpleItem[];
}

export const POLEVKY: FullMenuItem[] = [
  {
    name: "Hovězí vývar s játrovými knedlíčky",
    description: "zeleninou a nudlemi",
    allergens: "1,3,9",
    price: 70,
  },
  {
    name: "Zámecká cibulačka se slaninou",
    description: "vídeňskou cibulkou a bylinkovými krutony",
    allergens: "1,3,7",
    price: 90,
  },
];

export const PREDKRMY: FullMenuItem[] = [
  {
    name: "Hovězí carpaccio",
    description: "lanýžová majonéza, bylinkové pesto, domácí focaccia",
    allergens: "1,3",
    weight: "100g",
    price: 295,
  },
  {
    name: "Vepřové krokety 3ks",
    description: "omáčka z pečeného česneku, nakládaná zelenina, rozpečený chléb",
    allergens: "1,3,7",
    price: 175,
  },
  {
    name: "Grilovaný kozí sýr ve slanině",
    description: "rukolový salát s brusinkami, domácí focaccia",
    allergens: "1,7",
    price: 185,
  },
];

export const HOVEZI_MASO: FullMenuItem[] = [
  {
    name: "Steak z pravé svíčkové",
    description: "opečené máslové grenaille s rozmarýnem, pepřová omáčka",
    allergens: "1,7",
    weight: "250g",
    price: 595,
  },
  {
    name: "Filírovaný flank steak",
    description: "bramborová sláma a grilovaná zelenina",
    allergens: "1,11",
    weight: "250g",
    price: 425,
  },
  {
    name: "Burger z irského chuck rollu",
    description: "čedar a slaninový dip, domácí hranolky",
    allergens: "1,3,7,11",
    weight: "200g",
    price: 325,
  },
  {
    name: "Tatarský biftek z pravé svíčkové",
    description: "4ks topinky",
    allergens: "1,3,6,10",
    weight: "150g",
    price: 345,
  },
];

export const VEPROVE_MASO: FullMenuItem[] = [
  {
    name: "Steak z pečeně DUROC",
    description: "se sázeným vejcem, slaninovým chipsem, domácí hranolky",
    allergens: "1,3",
    weight: "250g",
    price: 355,
  },
  {
    name: 'Na másle smažený řízek „tomahawk"',
    description: "vídeňský bramborový salát",
    allergens: "1,3,7,10",
    weight: "300g",
    price: 345,
  },
  {
    name: "Medailonky z vepřové panenky",
    description: "slaninové fazolky s česnekem, omáčka z italské gorgonzoly",
    allergens: "1,7",
    weight: "200g",
    price: 305,
  },
  {
    name: "Vepřová líčka v hříbkové omáčce",
    description: "restované vaječné špecle",
    allergens: "1,3,7,10",
    price: 295,
  },
];

export const DRUBEZI_MASO: FullMenuItem[] = [
  {
    name: "Kuřecí prso se smetanovo-liškovou omáčkou",
    description: "domácí bramborové placky",
    allergens: "1,3,7",
    weight: "200g",
    price: 315,
  },
  {
    name: "Filírované kuřecí prsíčko sous-vide",
    description: "na lanýžovém rizotu",
    allergens: "7",
    weight: "200g",
    price: 335,
  },
  {
    name: "Konfitované kachní stehno",
    description: "karlovarský špalíček, červené zelí",
    allergens: "1,3,7",
    weight: "300g",
    price: 345,
  },
];

export const SALATY: FullMenuItem[] = [
  {
    name: "Caesar s grilovaným kuřecím masem",
    description: "krutony, slaninovým chipsem a parmezánem",
    allergens: "1,3,7",
    weight: "300g",
    price: 295,
  },
  {
    name: "Grilovaný kozí sýr na listovém salátu",
    description: "zelenina, červená řepa, medovo-hořčičná emulze, domácí focaccia",
    allergens: "1,3,7,10",
    weight: "300g",
    price: 285,
  },
];

export const VEGETARIANSKA_JIDLA: FullMenuItem[] = [
  {
    name: "Těstoviny s pestem z medvědího česneku",
    description: "a fermentovanými ředkvičkami",
    allergens: "1,3,7,8",
    weight: "300g",
    price: 245,
    isVegetarian: true,
  },
  {
    name: "Bramborové noky v omáčce z italské gorgonzoly",
    description: "se smaženou rukolou",
    allergens: "1,3,7",
    weight: "300g",
    price: 369,
    isVegetarian: true,
  },
];

export const RYBY: FullMenuItem[] = [
  {
    name: "Steak z norského lososa",
    description: "grilovaná zelenina",
    allergens: "4,11",
    weight: "200g",
    price: 390,
  },
];

export const DETSKA_JIDLA: FullMenuItem[] = [
  {
    name: "Boloňské těstoviny",
    allergens: "1,3",
    weight: "200g",
    price: 170,
  },
  {
    name: "Kuřecí řízek",
    description: "vařené brambory",
    allergens: "1,3,7",
    weight: "100g",
    price: 180,
  },
];

export const PRILOHY: string[] = [
  "Vařené brambory",
  "Šťouchané brambory",
  "Bramborové placky",
  "Domácí hranolky",
  "Rýže jasmínová",
  "Grilovaná zelenina",
  "Fazolky se slaninou",
  "Miska čerstvé zeleniny",
];

export const OMACKY: string[] = [
  "Tatarská omáčka",
  "Slaninový dip",
  "Kečup",
];

export const DEZERTY: FullMenuItem[] = [
  {
    name: "Macerovaná hruška",
    description: "s omáčkou ze slaného karamelu a mandlovým griliášem",
    allergens: "7,8,12",
    price: 185,
  },
  {
    name: "Crème brûlée",
    description: "s křehkou karamelovou krustou a čerstvým ovocem",
    allergens: "3,7",
    price: 155,
  },
  {
    name: "Zmrzlinový pohár",
    description: "lesní ovoce a šlehačka",
    allergens: "7",
    price: 145,
  },
  {
    name: "Tvarohové knedlíčky",
    description: "s meruňkovým rozvarem",
    allergens: "1,3,7,12",
    price: 175,
  },
  {
    name: "Kopeček zmrzlina",
    allergens: "7",
    price: 40,
  },
];

// ---- DRINKS ----

export interface DrinkItem {
  name: string;
  volume?: string;
  note?: string;
  price: number;
}

export interface DrinkSection {
  title: string;
  subsections?: { title: string; items: DrinkItem[] }[];
  items?: DrinkItem[];
}

export const NEALKO: DrinkItem[] = [
  { name: "Mattoni", volume: "0,33 l", note: "neperlivá / jemně perlivá", price: 45 },
  { name: "Stolní voda", volume: "1,0 l", note: "džbán, led, citron", price: 35 },
  { name: "Stolní voda", volume: "1,0 l", note: "perlivá / neperlivá", price: 65 },
  { name: "Domácí limonáda", price: 75 },
  { name: "Poctivá kola", volume: "0,1 l", price: 10 },
  { name: "Pepsi cola / Pepsi zero", volume: "0,25 l", price: 50 },
  { name: "7UP", volume: "0,25 l", price: 50 },
  { name: "Mirinda", volume: "0,25 l", price: 50 },
  { name: "Schweppes", volume: "0,25 l", note: "classic / ginger / pink", price: 50 },
  { name: "Džus Granini", volume: "0,25 l", note: "jahoda / pomeranč / jablko / grapefruit", price: 50 },
  { name: "Ledový čaj", volume: "0,25 l", price: 50 },
];

export const PIVO_TOCENE: DrinkItem[] = [
  { name: "Pilsner Urquell 12°", volume: "0,5 l", price: 65 },
  { name: "Pilsner Urquell 12°", volume: "0,3 l", price: 45 },
];

export const PIVO_LAHVOVE: DrinkItem[] = [
  { name: "Birell – světlé", volume: "0,33 l", price: 45 },
  { name: "Birell – pomelo & grep", volume: "0,33 l", price: 45 },
];

export const ROZLEVANA_VINA: DrinkItem[] = [
  { name: "Bílé víno", volume: "0,1 l", note: "Jižní Morava", price: 50 },
  { name: "Červené víno", volume: "0,1 l", note: "Jižní Morava", price: 50 },
  { name: "Prosecco", volume: "0,1 l", price: 65 },
];

export const APERITIVY: DrinkItem[] = [
  { name: "Crodino (nealkoholické)", volume: "0,1 l", price: 65 },
  { name: "Cinzano bianco", volume: "0,1 l", price: 65 },
  { name: "Cinzano rosso", volume: "0,1 l", price: 65 },
  { name: "Martini dry", volume: "0,1 l", price: 70 },
  { name: "Campari", volume: "0,5 l", price: 65 },
];

export const LIKERY: DrinkItem[] = [
  { name: "Griotte", volume: "0,04 l", price: 45 },
  { name: "Becherovka", volume: "0,04 l", price: 60 },
  { name: "Jägermeister", volume: "0,04 l", price: 65 },
  { name: "Medovina", volume: "0,04 l", price: 45 },
];

export const MICHANE_NAPOJE: DrinkItem[] = [
  { name: "Americká limonáda", note: "nealkoholické — kompotované ovoce, grenadina, pomerančový džus, soda, led", price: 80 },
  { name: "Virgin Mojito", note: "nealkoholické — tonic ginger, máta, limety, třtinový cukr, led", price: 85 },
  { name: "Aperol spritz", price: 120 },
  { name: "Mojito", note: "rum Havana Club, máta, limety, třtinový cukr, led", price: 140 },
];

export const WHISKEY: DrinkItem[] = [
  { name: "Jameson", volume: "0,04 l", price: 85 },
  { name: "Jack Daniels", volume: "0,04 l", price: 85 },
  { name: "Jack Daniels Honey", volume: "0,04 l", price: 125 },
  { name: "Jack Daniels Barrel", volume: "0,04 l", price: 140 },
  { name: "Glenlivet 12yo", volume: "0,04 l", price: 155 },
  { name: "Dalwhinie 15yo", volume: "0,04 l", price: 165 },
];

export const DESTILATY: DrinkItem[] = [
  { name: "Zelená Bartida", volume: "0,04 l", price: 45 },
  { name: "Myslivec", volume: "0,04 l", price: 50 },
  { name: "Bacardi", volume: "0,04 l", price: 60 },
  { name: "Rum Diplomático", volume: "0,04 l", price: 135 },
  { name: "Rum Bumbu", volume: "0,04 l", price: 130 },
  { name: "Rum Bumbu Crema", volume: "0,04 l", price: 90 },
  { name: "Blue Mauricius", volume: "0,04 l", price: 165 },
  { name: "Vodka Finlandia", volume: "0,04 l", price: 65 },
  { name: "Grey Goose", volume: "0,04 l", price: 110 },
  { name: "Gin Gordons", volume: "0,04 l", price: 60 },
  { name: "Gin Mare", volume: "0,04 l", price: 105 },
  { name: "Slivovice Bartida", volume: "0,04 l", price: 85 },
  { name: "Hruškovice Bartida", volume: "0,04 l", price: 85 },
  { name: "Sierra Tequila Antiguo Plata", volume: "0,04 l", price: 75 },
];

export const KONAKY: DrinkItem[] = [
  { name: "Metaxa 7*", volume: "0,04 l", price: 85 },
  { name: "Cognac Frapin 1270", volume: "0,04 l", price: 140 },
  { name: "Frapin VSOP", volume: "0,04 l", price: 205 },
  { name: "Armagnac VS", volume: "0,04 l", price: 195 },
];

export const TEPLE_NAPOJE: DrinkItem[] = [
  { name: "Turecká káva", price: 55 },
  { name: "Espresso", price: 65 },
  { name: "Espresso Lungo", price: 65 },
  { name: "Espresso Macchiato", price: 70 },
];

// ---- WINE LIST (Vinařství Buchtovi) ----

export interface WineItem {
  name: string;
  classification: string;
  taste: string;
  price: number;
}

export const BILA_VINA: WineItem[] = [
  { name: "Veltlínské zelené", classification: "VOC Vinice Velké Pavlovice | Vinařství Buchtovi", taste: "suché", price: 419 },
  { name: "Ryzlink rýnský 2023", classification: "výběr z hroznů | Vinařství Buchtovi", taste: "suché", price: 489 },
  { name: "Rulandské šedé 2023", classification: "výběr z hroznů | Vinařství Buchtovi", taste: "suché", price: 349 },
  { name: "Sauvignon 2023", classification: "pozdní sběr | Vinařství Buchtovi", taste: "polosuché", price: 429 },
  { name: "Tramín červený", classification: "VOC Vinice Velké Pavlovice | Vinařství Buchtovi", taste: "polosuché", price: 439 },
  { name: "Chardonnay 2022", classification: "pozdní sběr | Vinařství Buchtovi", taste: "polosladké", price: 489 },
  { name: "Pálava 2023", classification: "výběr z hroznů | Vinařství Buchtovi", taste: "polosladké", price: 499 },
  { name: "Pálava 2024", classification: "výběr z hroznů | Vinařství Buchtovi", taste: "polosladké", price: 359 },
];

export const CERVENA_VINA: WineItem[] = [
  { name: "Cabernet Moravia 2021", classification: "jakostní | Vinařství Buchtovi", taste: "suché", price: 359 },
  { name: "Dunaj 2023", classification: "výběr z hroznů | Vinařství Buchtovi", taste: "suché", price: 489 },
];

export const RUZOVE_VINO: WineItem[] = [
  { name: "Cabernet Moravia Rosé 2023", classification: "pozdní sběr | Vinařství Buchtovi", taste: "polosuché", price: 389 },
];

export const SUMIVA_VINA: WineItem[] = [
  { name: "Muškát moravský", classification: "Frizzante | Vinařství Buchtovi", taste: "polosladké", price: 359 },
  { name: "Ryzlink rýnský SEKT", classification: "charmat | Vinařství Buchtovi", taste: "Brut", price: 489 },
];

// Allergen notes
export const ALLERGEN_LIST = "1 — obiloviny, 2 — korýši, 3 — vejce, 4 — ryby, 5 — arašídy, 6 — sója, 7 — mléko, 8 — skořápkové plody, 9 — celer, 10 — hořčice, 11 — sezam, 12 — oxid siřičitý, 13 — vlčí bob, 14 — měkkýši";

export const MENU_NOTES = [
  "Za poloviční porci jídla účtujeme 75 % z ceny.",
  "Při změně přílohy účtován doplatek 20 Kč.",
  "Standartní čekací doba na jídlo je 25 min.",
];
