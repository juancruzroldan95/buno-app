import type { Metadata } from "next";
import { lusitana } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Buno",
  description: "Encontrá a tu abogado de confianza",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${lusitana.className} antialiased`}>{children}</body>
    </html>
  );
}
