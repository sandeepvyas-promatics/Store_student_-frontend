import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { store } from "@/lib/config";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const sora = Sora({ variable: "--font-sora", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: `${store.name}: one-of-a-kind clothing`, template: `%s | ${store.name}` },
  description: "Hand-picked clothing at fair prices. Every piece is one of a kind, so when it's gone, it's gone.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body>{children}</body>
    </html>
  );
}
