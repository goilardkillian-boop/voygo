import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Voygo — Ton voyage, parfaitement organisé",
  description:
    "Planifie, organise et partage tes voyages sans stress. Checklist, budget, restaurants, guide et collaboration — tout au même endroit.",
  keywords: ["voyage", "planification", "organisation", "checklist", "budget", "collaboration"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="min-h-screen font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
