export type OwnerId = "eu" | "namorada";
export type ColumnId = "todo" | "wip" | "done";

export interface Card {
  id: string;
  title: string;
  description?: string;
  owner: OwnerId;
  columnId: ColumnId;
  createdAt: string;
  updatedAt: string;
}

export interface BoardState {
  cards: Card[];
  version: number;
}

export type BoardAction =
  | { type: "ADD_CARD"; payload: Omit<Card, "id" | "createdAt" | "updatedAt"> }
  | { type: "EDIT_CARD"; payload: { id: string } & Partial<Omit<Card, "id" | "createdAt">> }
  | { type: "DELETE_CARD"; payload: { id: string } }
  | { type: "MOVE_CARD"; payload: { id: string; owner: OwnerId; columnId: ColumnId } }
  | { type: "LOAD_STATE"; payload: BoardState };

export interface ColumnConfig {
  id: ColumnId;
  label: string;
  accent: string;
  headerBg: string;
}

export interface OwnerConfig {
  id: OwnerId;
  label: string;
  badgeBg: string;
  badgeText: string;
  cardBorder: string;
  laneBg: string;
  laneLabel: string;
}
