import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { DailyMenuSection } from "@/components/sections/DailyMenuSection";
import { WeddingsSection } from "@/components/sections/WeddingsSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { Footer } from "@/components/sections/Footer";
import { cdn } from "@/lib/images";

export const metadata: Metadata = {
  title: "U Blanických rytířů | Zámecká restaurace Vlašim",
  description:
    "Restaurace U Blanických rytířů — česká kuchyně z lokálních surovin v prostorách vlašimského zámku. Denní menu, svatby, oslavy. Zámek 1, Vlašim.",
  alternates: {
    canonical: "https://www.ublanickychrytiru.cz",
  },
  openGraph: {
    title: "U Blanických rytířů — Zámecká restaurace Vlašim",
    description:
      "Česká kuchyně z lokálních surovin v prostorách vlašimského zámku. Denní menu, svatby a oslavy.",
    images: [
      {
        url: cdn("/images/JHK09408-Enhanced-NR-Edit.jpg"),
        width: 1200,
        height: 630,
        alt: "Restaurace U Blanických rytířů — interiér zámecké restaurace",
      },
    ],
  },
};

export default function Home() {
  return (
    <>
      {/* Navigation */}
      <Navigation />

      <main>
        {/* Hero - Full screen with elegant overlay */}
        <HeroSection />

        {/* About Restaurant */}
        <AboutSection />

        {/* Daily Menu */}
        <DailyMenuSection />

        {/* Weddings & Events */}
        <WeddingsSection />

        {/* Gallery */}
        <GallerySection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
