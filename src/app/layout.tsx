import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { ProgressProvider } from "@/components/providers/ProgressProvider";
import { AppShell } from "@/components/layout/AppShell";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WorldMap — Apprends le monde",
  description:
    "Plateforme d'apprentissage de géographie mondiale pour élèves du secondaire au Québec.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full font-sans">
        <ProgressProvider>
          <AppShell>{children}</AppShell>
        </ProgressProvider>
      </body>
    </html>
  );
}
