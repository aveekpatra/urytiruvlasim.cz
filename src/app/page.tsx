import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { DailyMenuSection } from "@/components/sections/DailyMenuSection";
import { WeddingsSection } from "@/components/sections/WeddingsSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { Footer } from "@/components/sections/Footer";
import { SAMPLE_MENU } from "@/lib/constants";

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
        <DailyMenuSection menuItems={SAMPLE_MENU} />

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
