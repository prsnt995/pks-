import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteLanguageContent from "@/components/layout/SiteLanguageContent";
import { LanguageProvider } from "@/context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#08090A",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://nexoragroup.com"),
  title: {
    default: "NEXORA GROUP — One Vision. Multiple Ventures.",
    template: "%s | NEXORA GROUP",
  },
  description:
    "A modern multi-venture corporate portfolio uniting AI platforms, immersive media art, 3D CG production, and contemporary Korean fashion.",
  keywords: [
    "NEXORA GROUP",
    "Rozena",
    "Damgara",
    "Nextep",
    "Noeul",
    "Corporate Portfolio",
    "AI Fashion Technology",
    "Interactive Media Art",
    "3D CG Production",
    "Contemporary Korean Fashion"
  ],
  authors: [{ name: "NEXORA GROUP" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nexoragroup.com",
    siteName: "NEXORA GROUP",
    title: "NEXORA GROUP — One Vision. Multiple Ventures.",
    description:
      "Discover the companies, ideas, and digital experiences shaping our next chapter.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "NEXORA GROUP Corporate Portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXORA GROUP — One Vision. Multiple Ventures.",
    description:
      "A modern multi-venture corporate portfolio connecting engineering, digital innovation, and creative services."
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#08090A] text-white selection:bg-white selection:text-black">
        <LanguageProvider>
          {children}
          <SiteLanguageContent />
        </LanguageProvider>
      </body>
    </html>
  );
}
