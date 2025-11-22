import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateAvatar(name: string, gender: "MALE" | "FEMALE") {
  const username = name.replace(/\s+/g, "").toLowerCase();
  const base = "https://avatar.iran.liara.run/public";
  if (gender === "FEMALE") return `${base}/girl?username=${username}`;
  // default to boy
  return `${base}/boy?username=${username}`;
}

export const formatPhoneNumber = (value: string) => {
  if (!value) return value;

  const phoneNumber = value.replace(/[^\d]/g, "");
  const phoneNumberLength = phoneNumber.length;


  let formattedNumber = phoneNumber;
  if (phoneNumber.startsWith('20') && phoneNumberLength > 10) {
    formattedNumber = phoneNumber.slice(2);
  }

  const formattedLength = formattedNumber.length;

  if (formattedLength < 4) return formattedNumber;
  if (formattedLength < 7) {
    return `${formattedNumber.slice(0, 4)} ${formattedNumber.slice(4)}`;
  }
  if (formattedLength < 11) {
    return `${formattedNumber.slice(0, 4)} ${formattedNumber.slice(4, 7)} ${formattedNumber.slice(7)}`;
  }
  
  
  return `${formattedNumber.slice(0, 4)} ${formattedNumber.slice(4, 7)} ${formattedNumber.slice(7, 11)}`;
};