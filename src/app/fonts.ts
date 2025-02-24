import { Inter, Lusitana, Roboto, Geist, Geist_Mono } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const lusitana = Lusitana({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
