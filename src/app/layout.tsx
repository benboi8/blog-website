import type { Metadata } from "next";
import "@/styles/globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "Northstar Journal — Ideas for the modern web", template: "%s — Northstar Journal" },
  description: "Thoughtful notes on technology, craft, and the systems shaping modern work.",
  openGraph: { type: "website", siteName: "Northstar Journal", title: "Northstar Journal", description: "Thoughtful notes on technology, craft, and the systems shaping modern work." },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body><ThemeProvider><Header />{children}<Footer /></ThemeProvider></body></html>;
}
