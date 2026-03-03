"use client";

import { useRef, useCallback } from "react";

interface MenuItem {
  name: string;
  description: string;
  allergens?: string;
  price: number;
  isVegetarian?: boolean;
}

interface DailyMenuData {
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
}

function AllergenTag({ allergens }: { allergens?: string }) {
  if (!allergens) return null;
  return <span style={{ opacity: 0.5 }}>({allergens})</span>;
}

function MenuCard({ menu, date }: { menu: DailyMenuData; date: string }) {
  const formatted = new Date(date + "T12:00:00").toLocaleDateString("cs-CZ", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        maxWidth: 600,
        margin: "0 auto",
        padding: "48px 40px",
        backgroundColor: "#FFFEF9",
        border: "1px solid #e8e4dc",
        color: "#2C2C2C",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 9,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#8B8680",
            marginBottom: 12,
          }}
        >
          Denní nabídka — {formatted}
        </p>
        <h2
          style={{
            fontSize: 28,
            fontWeight: 400,
            color: "#2C2C2C",
            marginBottom: 12,
          }}
        >
          Menu
        </h2>
        <div
          style={{
            width: 48,
            height: 1,
            backgroundColor: "#B8860B",
            margin: "0 auto",
          }}
        />
      </div>

      {/* Soup */}
      {menu.soup && (
        <div style={{ marginBottom: 32 }}>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 9,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#8B7D3C",
              marginBottom: 4,
            }}
          >
            Polévka
          </p>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 8,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#8B8680",
              marginBottom: 16,
            }}
          >
            Soup
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 16 }}>{menu.soup}</span>
            <span
              style={{
                flexShrink: 0,
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              {menu.soupPrice} Kč
            </span>
          </div>
          {(menu.soupDescription || menu.soupAllergens) && (
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 10,
                color: "#8B8680",
                marginTop: 4,
              }}
            >
              {menu.soupDescription} <AllergenTag allergens={menu.soupAllergens} />
            </p>
          )}

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              marginTop: 24,
            }}
          >
            <div style={{ width: 32, height: 1, backgroundColor: "#e8e4dc" }} />
            <div
              style={{
                width: 4,
                height: 4,
                backgroundColor: "#B8860B",
                transform: "rotate(45deg)",
              }}
            />
            <div style={{ width: 32, height: 1, backgroundColor: "#e8e4dc" }} />
          </div>
        </div>
      )}

      {/* Main Courses */}
      {menu.items.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 9,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#8B7D3C",
              marginBottom: 4,
            }}
          >
            Hlavní chod
          </p>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 8,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#8B8680",
              marginBottom: 16,
            }}
          >
            Main courses
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {menu.items.map((item, i) => (
              <div key={i}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: 12,
                  }}
                >
                  <span style={{ fontSize: 16 }}>
                    {item.name}
                    {item.isVegetarian && (
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: 8,
                          color: "#15803d",
                          marginLeft: 6,
                        }}
                      >
                        (v)
                      </span>
                    )}
                  </span>
                  <span
                    style={{
                      flexShrink: 0,
                      fontFamily: "Inter, sans-serif",
                      fontSize: 13,
                      fontWeight: 500,
                    }}
                  >
                    {item.price} Kč
                  </span>
                </div>
                {(item.description || item.allergens) && (
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 10,
                      color: "#8B8680",
                      marginTop: 4,
                    }}
                  >
                    {item.description} <AllergenTag allergens={item.allergens} />
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dessert */}
      {menu.dessert && (
        <div style={{ marginBottom: 32 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              marginBottom: 24,
            }}
          >
            <div style={{ width: 32, height: 1, backgroundColor: "#e8e4dc" }} />
            <div
              style={{
                width: 4,
                height: 4,
                backgroundColor: "#B8860B",
                transform: "rotate(45deg)",
              }}
            />
            <div style={{ width: 32, height: 1, backgroundColor: "#e8e4dc" }} />
          </div>

          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 9,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#8B7D3C",
              marginBottom: 4,
            }}
          >
            Dezert
          </p>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 8,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#8B8680",
              marginBottom: 16,
            }}
          >
            Dessert
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 16 }}>{menu.dessert}</span>
            {menu.dessertPrice && (
              <span
                style={{
                  flexShrink: 0,
                  fontFamily: "Inter, sans-serif",
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                {menu.dessertPrice} Kč
              </span>
            )}
          </div>
          {(menu.dessertDescription || menu.dessertAllergens) && (
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 10,
                color: "#8B8680",
                marginTop: 4,
              }}
            >
              {menu.dessertDescription} <AllergenTag allergens={menu.dessertAllergens} />
            </p>
          )}
        </div>
      )}

      {/* Footer */}
      <div
        style={{
          marginTop: 32,
          paddingTop: 20,
          borderTop: "1px solid rgba(44,44,44,0.1)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 8,
            color: "#8B8680",
            lineHeight: 1.8,
            maxWidth: 400,
            margin: "0 auto 8px",
          }}
        >
          1 — obiloviny, 2 — korýši, 3 — vejce, 4 — ryby, 5 — arašídy, 6 — sója,
          7 — mléko, 8 — skořápkové plody, 9 — celer, 10 — hořčice, 11 — sezam,
          12 — oxid siřičitý, 13 — vlčí bob, 14 — měkkýši
        </p>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 8,
            color: "#8B8680",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            marginBottom: 8,
          }}
        >
          (v) — vegetariánské
        </p>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 8,
            color: "#8B8680",
          }}
        >
          Informujte nás prosím o případných alergiích.
        </p>
      </div>

      {/* Restaurant info */}
      <div style={{ textAlign: "center", marginTop: 24 }}>
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 12,
            color: "#2C2C2C",
          }}
        >
          Zámecká restaurace U Blanických rytířů
        </p>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 8,
            color: "#8B8680",
            marginTop: 4,
          }}
        >
          Zámek Vlašim · +420 732 878 238
        </p>
      </div>
    </div>
  );
}

export function DailyMenuPreview({
  menu,
  onClose,
}: {
  menu: DailyMenuData;
  onClose: () => void;
}) {
  const menuRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(async () => {
    if (!menuRef.current) return;

    const html2canvas = (await import("html2canvas-pro")).default;
    const { jsPDF } = await import("jspdf");

    const canvas = await html2canvas(menuRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#FFFEF9",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`denni-menu-${menu.date}.pdf`);
  }, [menu.date]);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center overflow-y-auto py-8 px-4">
      <div className="bg-white max-w-2xl w-full relative">
        {/* Toolbar */}
        <div className="sticky top-0 z-10 bg-[var(--color-charcoal)] text-white px-6 py-3 flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider">Náhled denního menu</span>
          <div className="flex items-center gap-4">
            <button
              onClick={handleDownload}
              className="text-xs uppercase tracking-wider text-[var(--color-gold)] hover:text-white transition-colors"
            >
              Stáhnout PDF
            </button>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white text-lg"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Menu content */}
        <div ref={menuRef} className="p-8 bg-[var(--color-ivory)]">
          <MenuCard menu={menu} date={menu.date} />
        </div>
      </div>
    </div>
  );
}
