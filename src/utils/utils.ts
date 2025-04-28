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
