"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Restaurace", href: "#restaurace", homeOnly: true },
  { label: "Menu", href: "/menu", homeOnly: false },
  { label: "Svatby", href: "/svatby", homeOnly: false },
  { label: "Galerie", href: "/galerie", homeOnly: false },
  { label: "Kontakt", href: "/kontakt", homeOnly: false },
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
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                ublanickychrytiru@seznam.cz
              </a>
              <a
                href="tel:+420732878238"
                className="text-white/70 hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +420 732 878 238
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/restaurace_u_blanickych_rytiru"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://facebook.com/ublanickychrytiru"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors duration-200"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
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
                src="/Logo.svg"
                alt=""
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
              {navLinks.map((link) => (
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
              href="#rezervace"
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
            href="#rezervace"
            onClick={() => setIsMobileMenuOpen(false)}
            className="mt-4 px-8 py-4 border border-[var(--color-charcoal)] text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[var(--color-charcoal)] hover:text-white transition-colors duration-200"
          >
            Rezervace
          </Link>
        </nav>
      </div>
    </header>
  );
}
