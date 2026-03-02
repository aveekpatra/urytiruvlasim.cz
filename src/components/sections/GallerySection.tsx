import Image from "next/image";
import { IMAGES } from "@/lib/images";

export function GallerySection() {
  return (
    <section id="galerie" className="py-24 lg:py-40 bg-[var(--color-ivory)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[var(--color-gold)] mb-6 block">
            Nahlédněte
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl text-[var(--color-charcoal)] mb-6">
            Galerie
          </h2>
          <div className="w-16 h-px bg-[var(--color-gold)] mx-auto" />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] lg:auto-rows-[250px]">
          {IMAGES.gallery.map((image, index) => (
            <div
              key={index}
              className={`relative overflow-hidden group cursor-pointer ${image.span}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-[11px] tracking-[0.2em] uppercase">
                  {image.alt}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
