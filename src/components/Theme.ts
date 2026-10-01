export const DEFAULT_ACCENT = "#00ff88";
const STORAGE_KEY = "portfolio-accent";

export function getSavedAccent(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_ACCENT;
  } catch {
    return DEFAULT_ACCENT;
  }
}

export function applyAccent(hex: string) {
  document.documentElement.style.setProperty("--terminal-green", hex);
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