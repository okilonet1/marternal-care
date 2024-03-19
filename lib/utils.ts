import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateToDDMM(date: Date): string {
  // Extract day, month, and year from the date object
  const day: number = date.getDate();
  const month: number = date.getMonth() + 1; // Month is zero-indexed, so we add 1
  const year: number = date.getFullYear();

  // Pad day and month with leading zeros if needed
  const formattedDay: string = day < 10 ? "0" + day : day.toString();
  const formattedMonth: string = month < 10 ? "0" + month : month.toString();

  // Construct the DD/MM format string
  const formattedDate: string = `${formattedDay}/${formattedMonth}`;

  return formattedDate;
}
