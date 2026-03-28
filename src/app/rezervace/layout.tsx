import type { Metadata } from "next";
import { cdn } from "@/lib/images";

export const metadata: Metadata = {
  title: "Rezervace stolu",
  description:
    "Rezervujte si stůl v restauraci U Blanických rytířů. Online rezervace nebo telefonicky na +420 732 878 238. Zámek 1, Vlašim.",
  alternates: {
    canonical: "https://www.ublanickychrytiru.cz/rezervace",
  },
  openGraph: {
    title: "Rezervace stolu — U Blanických rytířů",
    description:
      "Rezervujte si stůl v zámecké restauraci U Blanických rytířů ve Vlašimi.",
    images: [
      {
        url: cdn("/images/JHK09452-Enhanced-NR.jpg"),
        width: 1200,
        height: 630,
        alt: "Restaurace U Blanických rytířů — interiér pro rezervace",
      },
    ],
  },
};

export default function RezervaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
