import type { Metadata } from "next";
import { geistSans, geistMono } from "./fonts";
import "./globals.css";

import { Toaster } from "@/components/ui/toaster";

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
