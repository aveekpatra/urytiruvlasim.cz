import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import type { DailyMenuData } from "./DailyMenuPDF";

// Register fonts (local files in public/fonts/)
Font.register({
  family: "Playfair",
  fonts: [
    { src: "/fonts/PlayfairDisplay-Regular.ttf", fontWeight: 400 },
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

const gold = "#8B7D3C";
const charcoal = "#2C2C2C";
const muted = "#8B8680";
const stone = "#e8e4dc";
const green = "#15803d";

const s = StyleSheet.create({
  page: {
    fontFamily: "Playfair",
    backgroundColor: "#FFFEF9",
    paddingTop: 60,
    paddingBottom: 50,
    paddingHorizontal: 70,
  },
  // Header
  headerWrap: { textAlign: "center", marginBottom: 36 },
  headerSub: { fontFamily: "Inter", fontSize: 7, letterSpacing: 2.5, textTransform: "uppercase", color: muted, marginBottom: 10 },
  headerTitle: { fontSize: 26, color: charcoal, marginBottom: 10 },
  headerLine: { width: 40, height: 0.8, backgroundColor: gold, marginHorizontal: "auto" },

  // Section
  sectionLabel: { fontFamily: "Inter", fontSize: 7, letterSpacing: 2.5, textTransform: "uppercase", color: gold, marginBottom: 2 },
  sectionSub: { fontFamily: "Inter", fontSize: 6.5, letterSpacing: 2, textTransform: "uppercase", color: muted, marginBottom: 14 },

  // Item row
  itemRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 2 },
  itemName: { fontSize: 14, color: charcoal, flex: 1, paddingRight: 10 },
  itemPrice: { fontFamily: "Inter", fontSize: 10, fontWeight: 500, color: charcoal },
  itemDesc: { fontFamily: "Inter", fontSize: 8, color: muted, marginTop: 2, marginBottom: 10 },
  veg: { fontFamily: "Inter", fontSize: 6, color: green },
  allergenTag: { color: muted, opacity: 0.6 },

  // Divider
  dividerWrap: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginVertical: 20 },
  dividerLine: { width: 28, height: 0.5, backgroundColor: stone },
  dividerDot: { width: 3, height: 3, backgroundColor: gold, marginHorizontal: 8, transform: "rotate(45deg)" },

  // Footer
  footerWrap: { marginTop: 28, paddingTop: 16, borderTopWidth: 0.5, borderTopColor: "#E3E3E3", textAlign: "center" },
  footerText: { fontFamily: "Inter", fontSize: 6.5, color: muted, lineHeight: 1.8, maxWidth: 360, marginHorizontal: "auto", marginBottom: 6 },
  footerSmall: { fontFamily: "Inter", fontSize: 6.5, color: muted, marginBottom: 6 },

  // Restaurant
  restaurantName: { fontSize: 10, color: charcoal, textAlign: "center", marginTop: 18 },
  restaurantInfo: { fontFamily: "Inter", fontSize: 7, color: muted, textAlign: "center", marginTop: 3 },
});

function Divider() {
  return (
    <View style={s.dividerWrap}>
      <View style={s.dividerLine} />
      <View style={s.dividerDot} />
      <View style={s.dividerLine} />
    </View>
  );
}

function AllergenText({ allergens }: { allergens?: string }) {
  if (!allergens) return null;
  return <Text style={s.allergenTag}> ({allergens})</Text>;
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
        {/* Header */}
        <View style={s.headerWrap}>
          <Text style={s.headerSub}>Denní nabídka — {formatted}</Text>
          <Text style={s.headerTitle}>Menu</Text>
          <View style={s.headerLine} />
        </View>

        {/* Soup */}
        {menu.soup && (
          <View>
            <Text style={s.sectionLabel}>Polévka</Text>
            <View style={s.itemRow}>
              <Text style={s.itemName}>{menu.soup}</Text>
              <Text style={s.itemPrice}>{menu.soupPrice} Kč</Text>
            </View>
            {(menu.soupDescription || menu.soupAllergens) && (
              <Text style={s.itemDesc}>
                {menu.soupDescription}
                <AllergenText allergens={menu.soupAllergens} />
              </Text>
            )}
            <Divider />
          </View>
        )}

        {/* Main Courses */}
        {menu.items.length > 0 && (
          <View>
            <Text style={s.sectionLabel}>Hlavní chod</Text>
            {menu.items.map((item, i) => (
              <View key={i}>
                <View style={s.itemRow}>
                  <Text style={s.itemName}>
                    {item.name}
                    {item.isVegetarian && <Text style={s.veg}> (v)</Text>}
                  </Text>
                  <Text style={s.itemPrice}>{item.price} Kč</Text>
                </View>
                {(item.description || item.allergens) && (
                  <Text style={s.itemDesc}>
                    {item.description}
                    <AllergenText allergens={item.allergens} />
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Dessert */}
        {menu.dessert && (
          <View>
            <Divider />
            <Text style={s.sectionLabel}>Dezert</Text>
            <View style={s.itemRow}>
              <Text style={s.itemName}>{menu.dessert}</Text>
              {menu.dessertPrice && (
                <Text style={s.itemPrice}>{menu.dessertPrice} Kč</Text>
              )}
            </View>
            {(menu.dessertDescription || menu.dessertAllergens) && (
              <Text style={s.itemDesc}>
                {menu.dessertDescription}
                <AllergenText allergens={menu.dessertAllergens} />
              </Text>
            )}
          </View>
        )}

        {/* Footer */}
        <View style={s.footerWrap}>
          <Text style={s.footerText}>
            1 — obiloviny, 2 — korýši, 3 — vejce, 4 — ryby, 5 — arašídy, 6 — sója, 7 — mléko, 8 — skořápkové plody, 9 — celer, 10 — hořčice, 11 — sezam, 12 — oxid siřičitý, 13 — vlčí bob, 14 — měkkýši
          </Text>
          <Text style={s.footerSmall}>(V) — VEGETARIÁNSKÉ</Text>
          <Text style={s.footerSmall}>Informujte nás prosím o případných alergiích.</Text>
        </View>

        {/* Restaurant */}
        <Text style={s.restaurantName}>Zámecká restaurace U Blanických rytířů</Text>
        <Text style={s.restaurantInfo}>Zámek Vlašim · +420 732 878 238</Text>
      </Page>
    </Document>
  );
}
