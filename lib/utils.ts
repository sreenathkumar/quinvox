import { clsx, type ClassValue } from "clsx"
import { formatDate } from "date-fns";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

//format date type data in the table
export function formatCell(value: any) {
  if (!value) return "";

  // If value is a valid Date object
  if (value instanceof Date) {
    return formatDate(value, 'PP'); // format date
  }

  // If value is a date string (ISO string)
  if (typeof value === "string" && !isNaN(Date.parse(value))) {
    return formatDate(new Date(value), 'PP'); // format date
  }

  return value; // default for numbers, strings, etc.
}

export function truncate(text: string, maxLength: number) {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}
