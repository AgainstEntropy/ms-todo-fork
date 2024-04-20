import { type ClassValue, clsx } from "clsx"
import { format } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getNowISO() {
  return new Date().toISOString();
}

export function getToday() {
  return format(new Date(), "yyyy-MM-dd");
}

export function getTodayISO() {
  return new Date(getToday()).toISOString();
}

export function formatDate(date: string) {
  return format(date, "yyyy-MM-dd");
}
