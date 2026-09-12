import type { Metadata } from "next";
import { DM_Sans, Poppins } from "next/font/google";
import type { Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/top/Navbar";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  style: "normal",
  weight: ["300", "400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000"),
  ),
  title: {
    default: "Hez Enerji | Pioneering Turkey’s Clean Energy Future",
    template: "%s | Hez Enerji",
  },
  description:
    "Leading Turkey's transition to a sustainable future through high-capacity geothermal power generation and cutting-edge R&D in lithium extraction and green hydrogen.",
  keywords: [
    "Geothermal Energy",
    "Renewable Energy Turkey",
    "Lithium Extraction",
    "Green Hydrogen",
    "Aydın Geothermal Plant",
    "Hez Enerji",
  ],
  authors: [{ name: "Hez Enerji" }],
  creator: "Itseghosime",
  publisher: "Hez Enerji",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "tr_TR",
    url: "https://www.hezenerji.com/",
    siteName: "Hez Enerji",
    title: "Hez Enerji | Pioneering Turkey’s Clean Energy Future",
    description:
      "Engineering the next generation of sustainable infrastructure, from 24 MW geothermal plants to advanced chemical R&D.",
    images: [
      {
        url: "/images/carousel/electric-lines.jpg",
        width: 1200,
        height: 630,
        alt: "Hez Enerji Geothermal Power Plant in Aydın",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hez Enerji | Pioneering Turkey’s Clean Energy Future",
    description:
      "Engineering the next generation of sustainable infrastructure, from 24 MW geothermal plants to advanced chemical R&D.",
    images: ["/images/carousel/electric-lines.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
