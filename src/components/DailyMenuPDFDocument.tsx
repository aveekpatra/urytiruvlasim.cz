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

// Register fonts from Google Fonts static CDN (guaranteed compatible with @react-pdf/renderer)
Font.register({
  family: "Playfair",
  fonts: [
    { src: "https://fonts.gstatic.com/s/playfairdisplay/v38/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtM.ttf", fontWeight: 400 },
    { src: "https://fonts.gstatic.com/s/playfairdisplay/v38/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKeivXDXbtM.ttf", fontWeight: 600 },
    { src: "https://fonts.gstatic.com/s/playfairdisplay/v38/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKe7vXDXbtM.ttf", fontWeight: 700 },
    { src: "https://fonts.gstatic.com/s/playfairdisplay/v38/nuFRD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_qiTbtbK-F2rA0s.ttf", fontWeight: 400, fontStyle: "italic" },
  ],
});

Font.register({
  family: "Inter",
  fonts: [
    { src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hiA.ttf", fontWeight: 400 },
    { src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fAZ9hiA.ttf", fontWeight: 500 },
  ],
});

const charcoal = "#2C2C2C";
const muted = "#6B6560";
const borderColor = "#C8C4BC";
const green = "#15803d";

const s = StyleSheet.create({
  page: {
    fontFamily: "Playfair",
    backgroundColor: "#F8F6F1",
    padding: 28,
  },
  // Outer border frame
  frame: {
    flex: 1,
    borderWidth: 0.6,
    borderColor: borderColor,
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 60,
  },
  // Section header — large, THIN/regular weight, uppercase, generous spacing
  sectionHeader: {
    fontSize: 26,
    fontWeight: 400,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: charcoal,
    textAlign: "center",
    marginBottom: 6,
  },
  // Thin horizontal rule under section header
  sectionRule: {
    width: 200,
    height: 0.4,
    backgroundColor: borderColor,
    marginHorizontal: "auto",
    marginBottom: 20,
  },
  // Item name — bold, small-caps style, centered
  itemName: {
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    color: charcoal,
    textAlign: "center",
    marginBottom: 3,
  },
  // Item description + allergens inline — small caps, muted
  itemDesc: {
    fontFamily: "Inter",
    fontSize: 7.5,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: muted,
    textAlign: "center",
    lineHeight: 1.6,
    marginBottom: 2,
  },
  // Weight on its own line
  itemWeight: {
    fontFamily: "Inter",
    fontSize: 8,
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
  // Price line with dashes — "—— 295Kč ——"
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 3,
    marginBottom: 22,
  },
  priceLine: {
    width: 55,
    height: 0.5,
    backgroundColor: charcoal,
  },
  priceText: {
    fontSize: 11,
    fontWeight: 700,
    color: charcoal,
    textAlign: "center",
    marginHorizontal: 8,
  },
  // Spacer between sections
  sectionSpacer: {
    height: 30,
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
    marginBottom: 28,
  },
});

// Decorative corner ornament SVG — matching the PDF's flourish style
function CornerOrnament({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const size = 32;
  const isTop = position === "tl" || position === "tr";
  const isLeft = position === "tl" || position === "bl";

  const style: Record<string, number | string> = {
    position: "absolute",
    width: size,
    height: size,
  };

  if (isTop) style.top = 4;
  else style.bottom = 4;
  if (isLeft) style.left = 4;
  else style.right = 4;

  const scaleX = isLeft ? 1 : -1;
  const scaleY = isTop ? 1 : -1;

  return (
    <View style={style}>
      <Svg viewBox="0 0 32 32" width={size} height={size}>
        {/* Main curving flourish lines */}
        <Path
          d="M2 2 C2 2, 10 2, 16 8 C22 14, 22 22, 22 30"
          stroke={borderColor}
          strokeWidth={0.7}
          fill="none"
          transform={`scale(${scaleX}, ${scaleY}) translate(${scaleX < 0 ? -32 : 0}, ${scaleY < 0 ? -32 : 0})`}
        />
        <Path
          d="M2 2 C2 2, 2 10, 8 16 C14 22, 22 22, 30 22"
          stroke={borderColor}
          strokeWidth={0.7}
          fill="none"
          transform={`scale(${scaleX}, ${scaleY}) translate(${scaleX < 0 ? -32 : 0}, ${scaleY < 0 ? -32 : 0})`}
        />
        {/* Small inner curl */}
        <Path
          d="M4 4 C4 4, 7 4, 9 6 C11 8, 11 11, 11 14"
          stroke={borderColor}
          strokeWidth={0.5}
          fill="none"
          transform={`scale(${scaleX}, ${scaleY}) translate(${scaleX < 0 ? -32 : 0}, ${scaleY < 0 ? -32 : 0})`}
        />
        <Path
          d="M4 4 C4 4, 4 7, 6 9 C8 11, 11 11, 14 11"
          stroke={borderColor}
          strokeWidth={0.5}
          fill="none"
          transform={`scale(${scaleX}, ${scaleY}) translate(${scaleX < 0 ? -32 : 0}, ${scaleY < 0 ? -32 : 0})`}
        />
      </Svg>
    </View>
  );
}

function PriceLine({ price }: { price: number }) {
  return (
    <View style={s.priceRow}>
      <View style={s.priceLine} />
      <Text style={s.priceText}>{price}Kč</Text>
      <View style={s.priceLine} />
    </View>
  );
}

// Bottom ornament matching the PDF's centered decorative element
function BottomOrnament() {
  return (
    <View style={s.ornamentWrap}>
      <Svg viewBox="0 0 40 24" width={40} height={24}>
        {/* Symmetrical fleur-de-lis style ornament */}
        <Path
          d="M20 4 C17 8, 10 10, 5 10 C10 10, 12 14, 12 20"
          stroke={borderColor}
          strokeWidth={0.6}
          fill="none"
        />
        <Path
          d="M20 4 C23 8, 30 10, 35 10 C30 10, 28 14, 28 20"
          stroke={borderColor}
          strokeWidth={0.6}
          fill="none"
        />
        <Path
          d="M12 20 C15 17, 18 17, 20 20 C22 17, 25 17, 28 20"
          stroke={borderColor}
          strokeWidth={0.6}
          fill="none"
        />
        {/* Center dot */}
        <Path
          d="M19 10 A1 1 0 1 1 21 10 A1 1 0 1 1 19 10"
          fill={borderColor}
        />
      </Svg>
    </View>
  );
}

// Helper: format description with allergens inline like the PDF
function formatDescWithAllergens(
  description?: string,
  allergens?: string
): string {
  const parts: string[] = [];
  if (description) parts.push(description);
  if (allergens) {
    if (parts.length > 0) {
      // Append allergens to description: "description (1,3,7)"
      parts[parts.length - 1] += ` (${allergens})`;
    } else {
      parts.push(`(${allergens})`);
    }
  }
  return parts.join("");
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
              <View style={s.sectionRule} />
              <Text style={s.itemName}>{menu.soup}</Text>
              <Text style={s.itemDesc}>
                {formatDescWithAllergens(menu.soupDescription, menu.soupAllergens)}
              </Text>
              <PriceLine price={menu.soupPrice} />
            </View>
          )}

          {/* Main Courses */}
          {menu.items.length > 0 && (
            <View>
              <View style={s.sectionSpacer} />
              <Text style={s.sectionHeader}>Hlavní chod</Text>
              <View style={s.sectionRule} />
              {menu.items.map((item, i) => (
                <View key={i}>
                  <Text style={s.itemName}>{item.name}</Text>
                  <Text style={s.itemDesc}>
                    {formatDescWithAllergens(item.description, item.allergens)}
                  </Text>
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
              <View style={s.sectionRule} />
              <Text style={s.itemName}>{menu.dessert}</Text>
              <Text style={s.itemDesc}>
                {formatDescWithAllergens(menu.dessertDescription, menu.dessertAllergens)}
              </Text>
              {menu.dessertPrice && <PriceLine price={menu.dessertPrice} />}
            </View>
          )}

          {/* Drinks */}
          {menu.drinks && menu.drinks.length > 0 && (
            <View>
              <View style={s.sectionSpacer} />
              <Text style={s.sectionHeader}>Nápoje</Text>
              <View style={s.sectionRule} />
              {menu.drinks.map((drink, i) => (
                <View key={i}>
                  <Text style={s.itemName}>{drink.name}</Text>
                  <Text style={s.itemDesc}>
                    {formatDescWithAllergens(drink.description, drink.allergens)}
                  </Text>
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
