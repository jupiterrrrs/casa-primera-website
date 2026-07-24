// Bridges the villa + rate package chosen in the Rates section over to the
// "Reserve Now" form in BookingCTA. Both live on the same page as separate
// components, so we hand off the selection two ways: a live CustomEvent for
// when BookingCTA is already mounted (always true on this single-page site),
// and sessionStorage as a fallback so the choice isn't lost on edge cases
// like a hard refresh right after clicking.
export const RESERVE_SELECTION_EVENT = "casa-primera:reserve-selection";
const STORAGE_KEY = "casa-primera:reserve-selection";

export type ReserveSelection = {
  villa: string; // full villa name, e.g. "Casa Primera Villa 4"
  guests: string; // guest count that maps back to the chosen package tier
  packageLabel: string; // e.g. "C"
};

export function publishReserveSelection(selection: ReserveSelection) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(selection));
  } catch {
    // Ignore storage failures (e.g. private browsing) — the live event below
    // still gets the job done.
  }
  window.dispatchEvent(new CustomEvent(RESERVE_SELECTION_EVENT, { detail: selection }));
}

export function readStoredReserveSelection(): ReserveSelection | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ReserveSelection) : null;
  } catch {
    return null;
  }
}

export function clearStoredReserveSelection() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

// Maps a rate package label to a representative guest count that makes the
// booking form's automatic tier calculation (see computeQuote in
// BookingCTA.tsx) land back on that same package.
export function guestsForPackageLabel(label: string): string {
  switch (label) {
    case "A":
      return "10";
    case "B":
      return "15";
    case "C":
      return "20";
    case "D–E":
    case "D-E":
      return "30";
    default:
      return "10";
  }
}
