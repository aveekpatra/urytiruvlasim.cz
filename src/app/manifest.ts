import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "U Blanických rytířů — Zámecká restaurace",
    short_name: "U Blanických rytířů",
    description:
      "Výjimečná gastronomie v srdci vlašimského zámku. Česká kuchyně z lokálních surovin.",
    start_url: "/",
    display: "browser",
    theme_color: "#B8860B",
    background_color: "#FDFBF7",
    icons: [
      {
        src: "/Logo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
