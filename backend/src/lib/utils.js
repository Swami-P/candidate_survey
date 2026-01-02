import { v4 as uuid } from "uuid";

export function nowIso() {
  return new Date().toISOString();
}

export function ym(date = new Date()) {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

export function year(date = new Date()) {
  return String(date.getUTCFullYear());
}

export function createToken() {
  return uuid().replace(/-/g, "");
}

export const likertOrder = [
  "Strongly Disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly Agree"
];
