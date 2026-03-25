import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Svg,
  Path,
} from "@react-pdf/renderer";
import type { DailyMenuData } from "./DailyMenuPDF";

// Register fonts
Font.register({
  family: "Playfair",
  fonts: [
    { src: "/fonts/PlayfairDisplay-Regular.ttf", fontWeight: 400 },
    { src: "/fonts/PlayfairDisplay-SemiBold.ttf", fontWeight: 600 },
    { src: "/fonts/PlayfairDisplay-Bold.ttf", fontWeight: 700 },
    { src: "/fonts/PlayfairDisplay-Italic.ttf", fontWeight: 400, fontStyle: "italic" },
  ],
});

Font.register({
  family: "Inter",
  fonts: [
    { src: "/fonts/Inter-Regular.ttf", fontWeight: 400 },
    { src: "/fonts/Inter-Medium.ttf", fontWeight: 500 },
  ],
});

const charcoal = "#2C2C2C";
const muted = "#8B8680";
const borderColor = "#D4D0C8";
const green = "#15803d";

const s = StyleSheet.create({
  page: {
    fontFamily: "Playfair",
    backgroundColor: "#FFFEF9",
    padding: 36,
  },
  // Outer border frame
  frame: {
    flex: 1,
    borderWidth: 0.8,
    borderColor: borderColor,
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 50,
  },
  // Section header (large uppercase centered)
  sectionHeader: {
    fontSize: 22,
    letterSpacing: 3,
    textTransform: "uppercase",
    color: charcoal,
    textAlign: "center",
    marginBottom: 24,
  },
  // Item name (bold, small-caps style, centered)
  itemName: {
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: charcoal,
    textAlign: "center",
    marginBottom: 3,
  },
  // Item description (small uppercase, centered)
  itemDesc: {
    fontFamily: "Inter",
    fontSize: 8,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: muted,
    textAlign: "center",
    marginBottom: 3,
  },
  // Allergens inline
  allergenText: {
    fontFamily: "Inter",
    fontSize: 8,
    letterSpacing: 1,
    color: muted,
    textAlign: "center",
    marginBottom: 2,
  },
  // Vegetarian tag
  veg: {
    fontFamily: "Inter",
    fontSize: 7,
    color: green,
    textAlign: "center",
    marginBottom: 2,
  },
  // Price line with decorative dashes
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    marginBottom: 20,
  },
  priceLine: {
    width: 50,
    height: 0.5,
    backgroundColor: charcoal,
  },
  priceText: {
    fontSize: 11,
    fontWeight: 700,
    color: charcoal,
    textAlign: "center",
    marginHorizontal: 10,
  },
  // Spacer between sections
  sectionSpacer: {
    height: 28,
  },
  // Footer
  footerWrap: {
    marginTop: "auto",
    paddingTop: 16,
    textAlign: "center",
  },
  footerText: {
    fontFamily: "Inter",
    fontSize: 6,
    color: muted,
    lineHeight: 1.8,
    maxWidth: 380,
    marginHorizontal: "auto",
    marginBottom: 4,
  },
  footerSmall: {
    fontFamily: "Inter",
    fontSize: 6,
    color: muted,
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  // Ornament
  ornamentWrap: {
    alignItems: "center",
    marginTop: 12,
  },
  // Date subtitle
  dateLine: {
    fontFamily: "Inter",
    fontSize: 7,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: muted,
    textAlign: "center",
    marginBottom: 20,
  },
});

// Decorative corner ornament SVG
function CornerOrnament({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const size = 24;
  const isTop = position === "tl" || position === "tr";
  const isLeft = position === "tl" || position === "bl";

  const style: Record<string, number | string> = {
    position: "absolute",
    width: size,
    height: size,
  };

  if (isTop) style.top = 8;
  else style.bottom = 8;
  if (isLeft) style.left = 8;
  else style.right = 8;

  // Scale/flip for each corner
  const scaleX = isLeft ? 1 : -1;
  const scaleY = isTop ? 1 : -1;

  return (
    <View style={style}>
      <Svg viewBox="0 0 24 24" width={size} height={size}>
        <Path
          d={`M2 2 C2 2, 8 2, 12 6 C16 10, 16 16, 16 22 M2 2 C2 2, 2 8, 6 12 C10 16, 16 16, 22 16`}
          stroke={borderColor}
          strokeWidth={0.8}
          fill="none"
          transform={`scale(${scaleX}, ${scaleY}) translate(${scaleX < 0 ? -24 : 0}, ${scaleY < 0 ? -24 : 0})`}
        />
      </Svg>
    </View>
  );
}

function PriceLine({ price }: { price: number }) {
  return (
    <View style={s.priceRow}>
      <View style={s.priceLine} />
      <Text style={s.priceText}>{price} Kč</Text>
      <View style={s.priceLine} />
    </View>
  );
}

// Small decorative ornament for bottom of page
function BottomOrnament() {
  return (
    <View style={s.ornamentWrap}>
      <Svg viewBox="0 0 30 20" width={30} height={20}>
        <Path
          d="M15 2 C12 6, 6 8, 2 8 C6 8, 8 12, 8 16 M15 2 C18 6, 24 8, 28 8 C24 8, 22 12, 22 16 M8 16 C10 14, 13 14, 15 16 C17 14, 20 14, 22 16"
          stroke={borderColor}
          strokeWidth={0.6}
          fill="none"
        />
      </Svg>
    </View>
  );
}

export function DailyMenuPDFDocument({ menu }: { menu: DailyMenuData }) {
  const formatted = new Date(menu.date + "T12:00:00").toLocaleDateString("cs-CZ", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Document title={`Denní menu — ${formatted}`} author="U Blanických rytířů">
      <Page size="A4" style={s.page}>
        <View style={s.frame}>
          {/* Corner ornaments */}
          <CornerOrnament position="tl" />
          <CornerOrnament position="tr" />
          <CornerOrnament position="bl" />
          <CornerOrnament position="br" />

          {/* Date */}
          <Text style={s.dateLine}>Denní nabídka — {formatted}</Text>

          {/* Soup */}
          {menu.soup && (
            <View>
              <Text style={s.sectionHeader}>Polévka</Text>
              <Text style={s.itemName}>{menu.soup}</Text>
              {menu.soupDescription && (
                <Text style={s.itemDesc}>{menu.soupDescription}</Text>
              )}
              {menu.soupAllergens && (
                <Text style={s.allergenText}>({menu.soupAllergens})</Text>
              )}
              <PriceLine price={menu.soupPrice} />
            </View>
          )}

          {/* Main Courses */}
          {menu.items.length > 0 && (
            <View>
              <View style={s.sectionSpacer} />
              <Text style={s.sectionHeader}>Hlavní chod</Text>
              {menu.items.map((item, i) => (
                <View key={i}>
                  <Text style={s.itemName}>{item.name}</Text>
                  {item.description && (
                    <Text style={s.itemDesc}>{item.description}</Text>
                  )}
                  {item.allergens && (
                    <Text style={s.allergenText}>({item.allergens})</Text>
                  )}
                  {item.isVegetarian && <Text style={s.veg}>(V)</Text>}
                  <PriceLine price={item.price} />
                </View>
              ))}
            </View>
          )}

          {/* Dessert */}
          {menu.dessert && (
            <View>
              <View style={s.sectionSpacer} />
              <Text style={s.sectionHeader}>Dezert</Text>
              <Text style={s.itemName}>{menu.dessert}</Text>
              {menu.dessertDescription && (
                <Text style={s.itemDesc}>{menu.dessertDescription}</Text>
              )}
              {menu.dessertAllergens && (
                <Text style={s.allergenText}>({menu.dessertAllergens})</Text>
              )}
              {menu.dessertPrice && <PriceLine price={menu.dessertPrice} />}
            </View>
          )}

          {/* Drinks */}
          {menu.drinks && menu.drinks.length > 0 && (
            <View>
              <View style={s.sectionSpacer} />
              <Text style={s.sectionHeader}>Nápoje</Text>
              {menu.drinks.map((drink, i) => (
                <View key={i}>
                  <Text style={s.itemName}>{drink.name}</Text>
                  {drink.description && (
                    <Text style={s.itemDesc}>{drink.description}</Text>
                  )}
                  {drink.allergens && (
                    <Text style={s.allergenText}>({drink.allergens})</Text>
                  )}
                  <PriceLine price={drink.price} />
                </View>
              ))}
            </View>
          )}

          {/* Footer */}
          <View style={s.footerWrap}>
            <Text style={s.footerText}>
              1 — obiloviny, 2 — korýši, 3 — vejce, 4 — ryby, 5 — arašídy, 6 — sója, 7 — mléko, 8 — skořápkové plody, 9 — celer, 10 — hořčice, 11 — sezam, 12 — oxid siřičitý, 13 — vlčí bob, 14 — měkkýši
            </Text>
            <Text style={s.footerSmall}>(V) — vegetariánské</Text>
            <Text style={s.footerSmall}>Informujte nás prosím o případných alergiích.</Text>
            <BottomOrnament />
          </View>
        </View>
      </Page>
    </Document>
  );
}
