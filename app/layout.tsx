import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  themeColor: "#42434e",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Buy Tickets Online – Events, Travel, Flights & More",
    template: "%s · TicketHub",
  },
  description: site.description,
  keywords: [
    "tickets",
    "events",
    "concerts",
    "theatre",
    "comedy",
    "sport",
    "festivals",
    "flights",
    "bus",
    "stay",
    "vouchers",
    "Johannesburg",
    "Cape Town",
    "Durban",
    "Pretoria",
    "South Africa",
  ],
  applicationName: "TicketHub",
  authors: [{ name: "TicketHub" }],
  appleWebApp: {
    capable: true,
    title: "TicketHub",
    statusBarStyle: "black-translucent",
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
  },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "/",
    siteName: "TicketHub",
    title: "Buy Tickets Online – Events, Travel, Flights & More",
    description: site.description,
    images: [
      {
        url: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&h=630&q=85",
        width: 1200,
        height: 630,
        alt: "TicketHub events and travel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy Tickets Online – Events, Travel, Flights & More",
    description: site.description,
    images: ["https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&h=630&q=85"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} min-h-screen bg-white text-ink`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:rounded-pill focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <AnnouncementBar />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
