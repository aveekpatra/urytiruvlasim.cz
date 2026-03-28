"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { cdn } from "@/lib/images";
import { HugeiconsIcon } from "@hugeicons/react";
import { Mail01Icon, CallIcon, InstagramIcon, Facebook01Icon } from "@hugeicons/core-free-icons";

const navLinks = [
  { label: "Domů", href: "/", homeOnly: false, mobileOnly: false },
  { label: "Menu", href: "/menu", homeOnly: false, mobileOnly: false },
  { label: "Svatby & Oslavy", href: "/svatby", homeOnly: false, mobileOnly: false },
  { label: "Galerie", href: "/galerie", homeOnly: false, mobileOnly: false },
  { label: "Kontakt", href: "/kontakt", homeOnly: false, mobileOnly: false },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const getHref = (link: (typeof navLinks)[number]) => {
    if (!link.homeOnly) return link.href;
    return isHome ? link.href : `/${link.href}`;
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 80) {
        setIsScrolled(true);
      } else if (currentScrollY < 40) {
        setIsScrolled(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar - fades out on scroll */}
      <div
        className={cn(
          "hidden lg:block overflow-hidden transition-all duration-300 ease-out",
          isScrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-2">
          <div className="flex items-center justify-between text-[10px] tracking-[0.15em]">
            {/* Contact Info */}
            <div className="flex items-center gap-6">
              <a
                href="mailto:ublanickychrytiru@seznam.cz"
                className="text-white/70 hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                <HugeiconsIcon icon={Mail01Icon} size={12} strokeWidth={1.5} />
                ublanickychrytiru@seznam.cz
              </a>
              <a
                href="tel:+420732878238"
                className="text-white/70 hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                <HugeiconsIcon icon={CallIcon} size={12} strokeWidth={1.5} />
                +420 732 878 238
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/restaurace_u_blanickych_rytiru"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors duration-200"
              >
                <HugeiconsIcon icon={InstagramIcon} size={14} strokeWidth={1.5} />
                Instagram
              </a>
              <a
                href="https://facebook.com/ublanickychrytiru"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors duration-200"
              >
                <HugeiconsIcon icon={Facebook01Icon} size={14} strokeWidth={1.5} />
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div
        className={cn(
          "transition-all duration-300 ease-out",
          isScrolled
            ? "bg-[var(--color-cream)]/95 backdrop-blur-sm shadow-sm py-4"
            : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative z-10 flex items-center gap-3">
              <img
                src={cdn("/Logo.svg")}
                alt="U Blanických rytířů"
                className={cn(
                  "h-10 lg:h-12 w-auto transition-all duration-200",
                  isScrolled && "invert"
                )}
              />
              <div className="leading-none">
                <span
                  className={cn(
                    "block font-serif text-base lg:text-lg uppercase tracking-[0.05em] transition-colors duration-200",
                    isScrolled ? "text-[var(--color-charcoal)]" : "text-white"
                  )}
                >
                  Zámecká restaurace
                </span>
                <span
                  className={cn(
                    "block font-serif text-[11px] lg:text-xs uppercase tracking-[0.08em] mt-0.5 transition-colors duration-200",
                    isScrolled ? "text-[var(--color-charcoal)]" : "text-white/80"
                  )}
                >
                  U Blanických rytířů
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.filter((l) => !l.mobileOnly).map((link) => (
                <Link
                  key={link.label}
                  href={getHref(link)}
                  className={cn(
                    "text-[11px] tracking-[0.2em] uppercase font-medium transition-colors duration-200 hover:text-[var(--color-gold)]",
                    isScrolled ? "text-[var(--color-text)]" : "text-white"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Book Button */}
            <Link
              href="/rezervace"
              className={cn(
                "hidden lg:flex items-center justify-center px-6 py-3 text-[11px] tracking-[0.15em] uppercase font-medium border transition-colors duration-200",
                isScrolled
                  ? "border-[var(--color-charcoal)] text-[var(--color-charcoal)] hover:bg-[var(--color-charcoal)] hover:text-white"
                  : "border-white text-white hover:bg-white hover:text-[var(--color-charcoal)]"
              )}
            >
              Rezervace
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "lg:hidden relative z-10 p-2 transition-colors duration-200",
                isScrolled || isMobileMenuOpen ? "text-[var(--color-charcoal)]" : "text-white"
              )}
              aria-label="Menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span
                  className={cn(
                    "w-full h-px bg-current transition-transform duration-200 origin-center",
                    isMobileMenuOpen && "rotate-45 translate-y-2"
                  )}
                />
                <span
                  className={cn(
                    "w-full h-px bg-current transition-opacity duration-200",
                    isMobileMenuOpen && "opacity-0"
                  )}
                />
                <span
                  className={cn(
                    "w-full h-px bg-current transition-transform duration-200 origin-center",
                    isMobileMenuOpen && "-rotate-45 -translate-y-2"
                  )}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 bg-[var(--color-cream)] transition-opacity duration-300 ease-out",
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={getHref(link)}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-serif text-[var(--color-charcoal)] hover:text-[var(--color-gold)] transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/rezervace"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-4 px-8 py-4 border border-[var(--color-charcoal)] text-2xl font-serif lg:text-[11px] lg:font-medium tracking-[0.2em] uppercase hover:bg-[var(--color-charcoal)] hover:text-white transition-colors duration-200"
          >
            Rezervace
          </Link>
        </nav>
      </div>
    </header>
  );
}
