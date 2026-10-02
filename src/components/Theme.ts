export const DEFAULT_ACCENT = "#00ff88";
const STORAGE_KEY = "portfolio-accent";

export function getSavedAccent(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_ACCENT;
  } catch {
    return DEFAULT_ACCENT;
  }
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = hex.replace("#", "").match(/^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  return m ? { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) } : null;
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((x) => Math.round(x).toString(16).padStart(2, "0")).join("");
}

function lighten(hex: string, amount: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return rgbToHex(
    rgb.r + (255 - rgb.r) * amount,
    rgb.g + (255 - rgb.g) * amount,
    rgb.b + (255 - rgb.b) * amount
  );
}

export function applyAccent(hex: string) {
  const root = document.documentElement;
  root.style.setProperty("--terminal-green", hex);
  root.style.setProperty("--terminal-cyan", lighten(hex, 0.15));
}

export function setAccent(hex: string) {
  applyAccent(hex);
  try {
    localStorage.setItem(STORAGE_KEY, hex);
  } catch {
    // Storage can be blocked (private mode); the theme still applies for this visit
  }
}

// Apply the saved accent as soon as this module loads, so there is no flash of the default color.
if (typeof document !== "undefined") {
  applyAccent(getSavedAccent());
}
