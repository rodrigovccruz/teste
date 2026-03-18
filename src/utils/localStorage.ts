import type { BoardState } from "../types";

const KEY = "couples-board-v1";

export function loadBoard(): BoardState | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as BoardState;
  } catch {
    return null;
  }
}

export function saveBoard(state: BoardState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // quota exceeded or private mode — silently ignore
  }
}
