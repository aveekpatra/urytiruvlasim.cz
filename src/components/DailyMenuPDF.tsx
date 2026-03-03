"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";

// Dynamically import react-pdf (it uses browser APIs)
const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);

const BlobProvider = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.BlobProvider),
  { ssr: false }
);

interface MenuItem {
  name: string;
  description: string;
  allergens?: string;
  price: number;
  isVegetarian?: boolean;
}

export interface DailyMenuData {
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

// Lazy-load the PDF document component
function usePDFDocument() {
  const [DocComponent, setDocComponent] = useState<any>(null);

  const loadDoc = useCallback(async () => {
    const mod = await import("./DailyMenuPDFDocument");
    return mod.DailyMenuPDFDocument;
  }, []);

  return { loadDoc, DocComponent, setDocComponent };
}

export function DailyMenuPreview({
  menu,
  onClose,
}: {
  menu: DailyMenuData;
  onClose: () => void;
}) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);

  const handleGenerate = useCallback(async () => {
    setGenerating(true);
    try {
      const { pdf } = await import("@react-pdf/renderer");
      const { DailyMenuPDFDocument } = await import("./DailyMenuPDFDocument");
      const blob = await pdf(DailyMenuPDFDocument({ menu })).toBlob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (e) {
      console.error("PDF generation failed:", e);
    } finally {
      setGenerating(false);
    }
  }, [menu]);

  const handleDownload = useCallback(async () => {
    setGenerating(true);
    try {
      const { pdf } = await import("@react-pdf/renderer");
      const { DailyMenuPDFDocument } = await import("./DailyMenuPDFDocument");
      const blob = await pdf(DailyMenuPDFDocument({ menu })).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `denni-menu-${menu.date}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("PDF download failed:", e);
    } finally {
      setGenerating(false);
    }
  }, [menu]);

  const handleClose = () => {
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center overflow-y-auto py-8 px-4">
      <div className="bg-white max-w-3xl w-full relative" style={{ minHeight: "80vh" }}>
        {/* Toolbar */}
        <div className="sticky top-0 z-10 bg-[var(--color-charcoal)] text-white px-6 py-3 flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider">Náhled denního menu</span>
          <div className="flex items-center gap-4">
            {!pdfUrl && (
              <button
                onClick={handleGenerate}
                disabled={generating}
                className="text-xs uppercase tracking-wider text-[var(--color-gold)] hover:text-white transition-colors disabled:opacity-50"
              >
                {generating ? "Generování..." : "Náhled PDF"}
              </button>
            )}
            <button
              onClick={handleDownload}
              disabled={generating}
              className="text-xs uppercase tracking-wider text-[var(--color-gold)] hover:text-white transition-colors disabled:opacity-50"
            >
              {generating ? "..." : "Stáhnout PDF"}
            </button>
            <button
              onClick={handleClose}
              className="text-white/60 hover:text-white text-lg"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Content */}
        {pdfUrl ? (
          <iframe
            src={pdfUrl}
            className="w-full border-0"
            style={{ height: "calc(80vh - 48px)" }}
            title="PDF náhled"
          />
        ) : (
          <div className="p-8 bg-[var(--color-ivory)]">
            <MenuPreviewCard menu={menu} />
          </div>
        )}
      </div>
    </div>
  );
}

// Simple HTML preview card (not for PDF, just for the modal preview before generating)
function MenuPreviewCard({ menu }: { menu: DailyMenuData }) {
  const formatted = new Date(menu.date + "T12:00:00").toLocaleDateString("cs-CZ", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-lg mx-auto bg-[#FFFEF9] px-8 py-12 sm:px-12 sm:py-16">
      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-[9px] tracking-[0.3em] uppercase text-[var(--color-text-muted)] mb-3">
          Denní nabídka — {formatted}
        </p>
        <h2 className="font-serif text-3xl text-[var(--color-charcoal)] mb-3">Menu</h2>
        <div className="w-12 h-px bg-[var(--color-gold)] mx-auto" />
      </div>

      {/* Soup */}
      {menu.soup && (
        <div className="mb-8">
          <p className="text-[9px] tracking-[0.3em] uppercase text-[var(--color-gold-dark)] mb-0.5">Polévka</p>
          <p className="text-[8px] tracking-[0.2em] uppercase text-[var(--color-text-muted)] mb-4">Soup</p>
          <div className="flex items-baseline justify-between gap-3">
            <span className="font-serif text-lg text-[var(--color-charcoal)]">{menu.soup}</span>
            <span className="text-sm font-medium text-[var(--color-charcoal)]">{menu.soupPrice} Kč</span>
          </div>
          {(menu.soupDescription || menu.soupAllergens) && (
            <p className="text-[10px] text-[var(--color-text-muted)] mt-1">
              {menu.soupDescription} {menu.soupAllergens && <span className="opacity-50">({menu.soupAllergens})</span>}
            </p>
          )}
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="w-8 h-px bg-[var(--color-stone)]" />
            <div className="w-1 h-1 bg-[var(--color-gold)] rotate-45" />
            <div className="w-8 h-px bg-[var(--color-stone)]" />
          </div>
        </div>
      )}

      {/* Mains */}
      {menu.items.length > 0 && (
        <div className="mb-8">
          <p className="text-[9px] tracking-[0.3em] uppercase text-[var(--color-gold-dark)] mb-0.5">Hlavní chod</p>
          <p className="text-[8px] tracking-[0.2em] uppercase text-[var(--color-text-muted)] mb-4">Main courses</p>
          <div className="space-y-4">
            {menu.items.map((item, i) => (
              <div key={i}>
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-serif text-lg text-[var(--color-charcoal)]">
                    {item.name}
                    {item.isVegetarian && <span className="text-[8px] text-green-700 ml-1">(v)</span>}
                  </span>
                  <span className="text-sm font-medium text-[var(--color-charcoal)]">{item.price} Kč</span>
                </div>
                {(item.description || item.allergens) && (
                  <p className="text-[10px] text-[var(--color-text-muted)] mt-1">
                    {item.description} {item.allergens && <span className="opacity-50">({item.allergens})</span>}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dessert */}
      {menu.dessert && (
        <div className="mb-8">
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="w-8 h-px bg-[var(--color-stone)]" />
            <div className="w-1 h-1 bg-[var(--color-gold)] rotate-45" />
            <div className="w-8 h-px bg-[var(--color-stone)]" />
          </div>
          <p className="text-[9px] tracking-[0.3em] uppercase text-[var(--color-gold-dark)] mb-0.5">Dezert</p>
          <p className="text-[8px] tracking-[0.2em] uppercase text-[var(--color-text-muted)] mb-4">Dessert</p>
          <div className="flex items-baseline justify-between gap-3">
            <span className="font-serif text-lg text-[var(--color-charcoal)]">{menu.dessert}</span>
            {menu.dessertPrice && (
              <span className="text-sm font-medium text-[var(--color-charcoal)]">{menu.dessertPrice} Kč</span>
            )}
          </div>
          {(menu.dessertDescription || menu.dessertAllergens) && (
            <p className="text-[10px] text-[var(--color-text-muted)] mt-1">
              {menu.dessertDescription} {menu.dessertAllergens && <span className="opacity-50">({menu.dessertAllergens})</span>}
            </p>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-[var(--color-charcoal)]/10 text-center space-y-2">
        <p className="text-[8px] text-[var(--color-text-muted)] leading-relaxed max-w-sm mx-auto">
          1 — obiloviny, 2 — korýši, 3 — vejce, 4 — ryby, 5 — arašídy, 6 — sója,
          7 — mléko, 8 — skořápkové plody, 9 — celer, 10 — hořčice, 11 — sezam,
          12 — oxid siřičitý, 13 — vlčí bob, 14 — měkkýši
        </p>
        <p className="text-[8px] text-[var(--color-text-muted)] uppercase tracking-wider">(v) — vegetariánské</p>
        <p className="text-[8px] text-[var(--color-text-muted)]">Informujte nás prosím o případných alergiích.</p>
      </div>

      {/* Restaurant */}
      <div className="text-center mt-6">
        <p className="font-serif text-xs text-[var(--color-charcoal)]">Zámecká restaurace U Blanických rytířů</p>
        <p className="text-[8px] text-[var(--color-text-muted)] mt-1">Zámek Vlašim · +420 732 878 238</p>
      </div>
    </div>
  );
}
