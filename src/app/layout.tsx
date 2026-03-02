import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { RESTAURANT_INFO } from "@/lib/constants";
import { MotionProvider } from "@/components/motion";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ublanickychrytiru.cz"),
  title: `${RESTAURANT_INFO.name} | Zámek Vlašim`,
  description:
    "Výjimečná gastronomie v srdci vlašimského zámku. Elegantní prostředí pro nezapomenutelné chvíle.",
  keywords: [
    "restaurace Vlašim",
    "zámek Vlašim",
    "svatba zámek",
    "česká kuchyně",
    "U Blanických rytířů",
  ],
  openGraph: {
    title: RESTAURANT_INFO.name,
    description: "Výjimečná gastronomie v srdci vlašimského zámku",
    url: "https://www.ublanickychrytiru.cz",
    siteName: RESTAURANT_INFO.name,
    locale: "cs_CZ",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: RESTAURANT_INFO.name,
  description: "Výjimečná gastronomie v srdci vlašimského zámku.",
  url: "https://www.ublanickychrytiru.cz",
  telephone: RESTAURANT_INFO.phone,
  email: RESTAURANT_INFO.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: RESTAURANT_INFO.address.street,
    addressLocality: RESTAURANT_INFO.address.city,
    postalCode: RESTAURANT_INFO.address.postalCode,
    addressCountry: "CZ",
  },
  servesCuisine: "Czech",
  priceRange: "$$$",
  acceptsReservations: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} antialiased overflow-x-hidden`}>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
