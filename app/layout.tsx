import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SiteUIProvider from "./site-ui";
import "./typography.css";

const spaceGrotesk = localFont({
  src: "./fonts/space-grotesk-variable.woff2",
  variable: "--font-ics-sans",
  weight: "300 700",
  style: "normal",
  display: "swap",
  preload: true,
  adjustFontFallback: "Arial",
});

export const metadata: Metadata = {
  title: "ICS — The coolest way to clean.",
  description: "Explore ICS dry ice cleaning, production and automation technology. Engineered in Slovakia. Working worldwide. 2026 website concept.",
  robots: { index: false, follow: false },
  icons: { icon: { url: "/ics/logo.svg", type: "image/svg+xml" } },
};

export const viewport: Viewport = {
  colorScheme: "only light",
  themeColor: "#202720",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} h-full antialiased`}
    >
      <body><SiteUIProvider>{children}</SiteUIProvider></body>
    </html>
  );
}
