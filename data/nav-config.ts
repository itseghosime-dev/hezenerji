export interface NavItem {
  label: string;
  href: string;
}

export const navLinks: NavItem[] = [
  { label: "Expertise", href: "#expertise" },
  { label: "Our Impact", href: "#impact" },
  { label: "Technology", href: "#technology" },
  { label: "Company", href: "#company" },
];

export const languages = [
  { code: "EN", label: "English", region: "United Kingdom", flag: "🇬🇧" },
  { code: "TR", label: "Türkçe", region: "Türkiye", flag: "🇹🇷" },
];