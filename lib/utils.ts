import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: Date | null) => {
  if (!date) return ""
  return new Date(date).toLocaleDateString("ru-RU", {day: "numeric", month: "long", year: "numeric"})
}