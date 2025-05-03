import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "Publicado hoy";
  if (diffInDays === 1) return "Publicado ayer";
  if (diffInDays < 7) return `Publicado hace ${diffInDays} días`;
  if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `Publicado hace ${weeks} ${weeks === 1 ? "semana" : "semanas"}`;
  }
  if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return `Publicado hace ${months} ${months === 1 ? "mes" : "meses"}`;
  }
  const years = Math.floor(diffInDays / 365);
  return `Publicado hace ${years} ${years === 1 ? "año" : "años"}`;
}

export const lawAreaColors: Record<number, string> = {
  1: "bg-yellow-100 text-yellow-800", // Despidos y Accidentes Laborales
  2: "bg-green-100 text-green-800", // Contratos
  3: "bg-pink-100 text-pink-800", // Divorcios
  4: "bg-indigo-100 text-indigo-800", // Marcas y Patentes
  5: "bg-red-100 text-red-800", // Siniestros
  6: "bg-gray-200 text-gray-900", // Penal
  7: "bg-purple-100 text-purple-800", // Familia
  8: "bg-blue-100 text-blue-800", // Migratorio
  9: "bg-orange-100 text-orange-800", // Corporativo
  10: "bg-rose-100 text-rose-800", // Tributario y Finanzas
};
