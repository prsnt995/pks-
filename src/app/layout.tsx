import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteLanguageContent from "@/components/layout/SiteLanguageContent";

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
    "A modern multi-venture corporate portfolio uniting engineering, digital innovation, creative services, and AI media production.",
  keywords: [
    "NEXORA GROUP",
    "PKS.ENG",
    "Nextepstudio",
    "Rozena",
    "Corporate Portfolio",
    "Engineering Systems",
    "Digital Studio",
    "AI Video Generation"
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
        {children}
        <SiteLanguageContent />
      </body>
    </html>
  );
}
