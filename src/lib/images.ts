/**
 * Local restaurant images — professional photography by JHK
 * Served from GitHub raw to reduce Vercel CDN bandwidth costs.
 */

const CDN_BASE =
  "https://raw.githubusercontent.com/aveekpatra/Adel/master/public";

/** Prefix any /public path with CDN_BASE */
export function cdn(path: string): string {
  return `${CDN_BASE}${path}`;
}

export const IMAGES = {
  // Hero Section - Local video
  hero: {
    video: `${CDN_BASE}/bg.mp4`,
    fallback: `${CDN_BASE}/images/JHK09411-Enhanced-NR.jpg`,
  },

  // About Section - Restaurant Interior
  about: {
    interior: `${CDN_BASE}/images/JHK09424-Enhanced-NR.jpg`,
  },

  // Wedding / Events Section
  wedding: {
    background: `${CDN_BASE}/images/JHK09458-Enhanced-NR.jpg`,
    gallery: [
      `${CDN_BASE}/images/JHK09452-Enhanced-NR.jpg`, // Restaurace — reserved long table
      `${CDN_BASE}/images/JHK09524.jpg`, // Terrace — wide shot
      `${CDN_BASE}/images/JHK09458-Enhanced-NR.jpg`, // Restaurace — reserved table by window
      `${CDN_BASE}/images/JHK09408-Enhanced-NR-Edit.jpg`, // Pivnice — banquette seating
    ],
  },

  // Home page gallery grid
  gallery: [
    {
      src: `${CDN_BASE}/images/castle-2.jpeg`,
      alt: "Zámek Vlašim — panorama",
      span: "col-span-2 row-span-2",
    },
    {
      src: `${CDN_BASE}/images/JHK09458-Enhanced-NR.jpg`,
      alt: "Restaurace — slavnostní tabule",
      span: "col-span-1",
    },
    {
      src: `${CDN_BASE}/images/dishes/JHK09557.jpg`,
      alt: "Hovězí biftek s pepřovou omáčkou",
      span: "col-span-1",
    },
    {
      src: `${CDN_BASE}/images/JHK09524.jpg`,
      alt: "Venkovní terasa",
      span: "col-span-1 row-span-2",
    },
    {
      src: `${CDN_BASE}/images/dishes/JHK09591.jpg`,
      alt: "Crème brûlée s čerstvým ovocem",
      span: "col-span-1",
    },
    {
      src: `${CDN_BASE}/images/JHK09380.jpg`,
      alt: "Květiny na baru",
      span: "col-span-1",
    },
    {
      src: `${CDN_BASE}/images/drinks/JHK09520-Enhanced-NR.jpg`,
      alt: "Pivo U Blanických rytířů",
      span: "col-span-1",
    },
    {
      src: `${CDN_BASE}/images/JHK09347.jpg`,
      alt: "Rytířská zbroj",
      span: "col-span-1",
    },
  ],

  // Open Graph / Social sharing
  og: `${CDN_BASE}/images/JHK09408-Enhanced-NR-Edit.jpg`,
};
