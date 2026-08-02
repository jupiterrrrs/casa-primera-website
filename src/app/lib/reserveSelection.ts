export const RESERVE_SELECTION_EVENT = "casa-primera:reserve-selection";
const STORAGE_KEY = "casa-primera:reserve-selection";
export type ReserveSelection = {
  villa: string;
  guests: string;
  packageLabel: string;
};
export function publishReserveSelection(selection: ReserveSelection) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(selection));
  } catch {}
  window.dispatchEvent(new CustomEvent(RESERVE_SELECTION_EVENT, {
    detail: selection
  }));
}
export function readStoredReserveSelection(): ReserveSelection | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) as ReserveSelection : null;
  } catch {
    return null;
  }
}
export function clearStoredReserveSelection() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {}
}
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
