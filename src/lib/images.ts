/**
 * Local restaurant images — professional photography by JHK
 * All images located in /public/images/
 */

export const IMAGES = {
  // Hero Section - Local video
  hero: {
    video: "/bg.mov",
    fallback: "/images/JHK09411-Enhanced-NR.jpg",
  },

  // About Section - Restaurant Interior
  about: {
    interior: "/images/JHK09424-Enhanced-NR.jpg",
  },

  // Wedding / Events Section
  wedding: {
    background: "/images/JHK09458-Enhanced-NR.jpg",
    gallery: [
      "/images/JHK09452-Enhanced-NR.jpg", // Pivnice — reserved long table
      "/images/JHK09524.jpg", // Terrace — wide shot
      "/images/JHK09458-Enhanced-NR.jpg", // Pivnice — reserved table by window
      "/images/JHK09408-Enhanced-NR-Edit.jpg", // Salonek — banquette seating
    ],
  },

  // Home page gallery grid
  gallery: [
    {
      src: "/images/JHK09411-Enhanced-NR.jpg",
      alt: "Salonek — interiér",
      span: "col-span-2 row-span-2",
    },
    {
      src: "/images/JHK09458-Enhanced-NR.jpg",
      alt: "Pivnice — slavnostní tabule",
      span: "col-span-1",
    },
    {
      src: "/images/dishes/JHK09557.jpg",
      alt: "Hovězí biftek s pepřovou omáčkou",
      span: "col-span-1",
    },
    {
      src: "/images/JHK09524.jpg",
      alt: "Venkovní terasa",
      span: "col-span-1 row-span-2",
    },
    {
      src: "/images/dishes/JHK09591.jpg",
      alt: "Crème brûlée s čerstvým ovocem",
      span: "col-span-1",
    },
    {
      src: "/images/JHK09380.jpg",
      alt: "Květiny na baru",
      span: "col-span-1",
    },
    {
      src: "/images/drinks/JHK09520-Enhanced-NR.jpg",
      alt: "Pivo U Blanických rytířů",
      span: "col-span-1",
    },
    {
      src: "/images/JHK09347.jpg",
      alt: "Rytířská zbroj",
      span: "col-span-1",
    },
  ],

  // Open Graph / Social sharing
  og: "/images/JHK09408-Enhanced-NR-Edit.jpg",
};
