import Link from "next/link";
import { RESTAURANT_INFO } from "@/lib/constants";

export function Footer() {
  return (
    <footer id="kontakt" className="bg-[var(--color-charcoal)] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6 flex items-center gap-3">
              <img
                src="/Logo.svg"
                alt=""
                className="h-12 w-auto"
              />
              <div className="leading-none">
                <span className="block font-serif text-base uppercase tracking-[0.05em]">
                  Zámecká restaurace
                </span>
                <span className="block font-serif text-[11px] uppercase tracking-[0.08em] mt-0.5 text-white/80">
                  U Blanických rytířů
                </span>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Výjimečná gastronomie v srdci vlašimského zámku.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-[var(--color-gold)] mb-6">
              Kontakt
            </h4>
            <div className="space-y-4 text-sm">
              <p className="text-white/80">
                {RESTAURANT_INFO.address.street}<br />
                {RESTAURANT_INFO.address.postalCode} {RESTAURANT_INFO.address.city}
              </p>
              <p>
                <a
                  href={`tel:${RESTAURANT_INFO.phone.replace(/\s/g, "")}`}
                  className="text-white/80 hover:text-[var(--color-gold)] transition-colors"
                >
                  {RESTAURANT_INFO.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${RESTAURANT_INFO.email}`}
                  className="text-white/80 hover:text-[var(--color-gold)] transition-colors"
                >
                  {RESTAURANT_INFO.email}
                </a>
              </p>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-[var(--color-gold)] mb-6">
              Otevírací doba
            </h4>
            <div className="space-y-3 text-sm">
              {RESTAURANT_INFO.openingHours.map((oh, index) => (
                <div key={index} className="flex justify-between max-w-[200px]">
                  <span className="text-white/60">{oh.days}</span>
                  <span className="text-white/80">{oh.hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reservation */}
          <div>
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-[var(--color-gold)] mb-6">
              Rezervace
            </h4>
            <p className="text-white/60 text-sm mb-6">
              Pro rezervaci stolu nás kontaktujte telefonicky nebo e-mailem.
            </p>
            <Link
              href={`tel:${RESTAURANT_INFO.phone.replace(/\s/g, "")}`}
              className="inline-block px-8 py-3 border border-[var(--color-gold)] text-[var(--color-gold)] text-[11px] tracking-[0.15em] uppercase font-medium hover:bg-[var(--color-gold)] hover:text-[var(--color-charcoal)] transition-all duration-300"
            >
              Zavolat nyní
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-xs">
              © {new Date().getFullYear()} {RESTAURANT_INFO.name}. Všechna práva vyhrazena.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="https://facebook.com/ublanickychrytiru"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-[var(--color-gold)] transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/restaurace_u_blanickych_rytiru"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-[var(--color-gold)] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
