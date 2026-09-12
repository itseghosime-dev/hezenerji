export interface StatProps {
  value: string;
  unit?: string;
  label: string;
  isPrimary?: boolean;
}

export interface CarouselImage {
  src: string;
  alt: string;
}

export const heroStats: StatProps[] = [
  { value: "24", unit: "MWe", label: "Full Operational Capacity", isPrimary: true },
  { value: "42K", unit: "ha", label: "Geothermal License Area", isPrimary: true },
  { value: "70K", unit: "TONS", label: "Annual CO2 Offset" },
  { value: "12", unit: "ACTIVE", label: "Extraction Wells" },
  { value: "R&D", unit: "PIONEERING", label: "Lithium Extraction" },
];

export const heroCarouselImages: CarouselImage[] = [
  { src: "/images/carousel/electric-lines.jpg", alt: "Hez Enerji Geothermal Operations" },
  { src: "/images/carousel/1.jpg", alt: "HEZ Enerji industrial water treatment facility" },
  { src: "/images/carousel/2.jpg", alt: "Aerial view of HEZ Enerji power facility" },
  { src: "/images/carousel/3.jpg", alt: "Aerial view of HEZ Enerji processing facility" },
];