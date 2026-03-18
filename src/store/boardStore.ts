import type { BoardState, BoardAction, Card } from "../types";
import { generateId } from "../utils/id";

export const initialState: BoardState = {
  cards: [],
  version: 1,
};

export function boardReducer(state: BoardState, action: BoardAction): BoardState {
  const now = new Date().toISOString();

  switch (action.type) {
    case "LOAD_STATE":
      return action.payload;

    case "ADD_CARD": {
      const newCard: Card = {
        ...action.payload,
        id: generateId(),
        createdAt: now,
        updatedAt: now,
      };
      return { ...state, cards: [...state.cards, newCard] };
    }

    case "EDIT_CARD": {
      const { id, ...updates } = action.payload;
      return {
        ...state,
        cards: state.cards.map((c) =>
          c.id === id ? { ...c, ...updates, updatedAt: now } : c
        ),
      };
    }

    case "DELETE_CARD":
      return {
        ...state,
        cards: state.cards.filter((c) => c.id !== action.payload.id),
      };

    case "MOVE_CARD": {
      const { id, owner, columnId } = action.payload;
      return {
        ...state,
        cards: state.cards.map((c) =>
          c.id === id ? { ...c, owner, columnId, updatedAt: now } : c
        ),
      };
    }

    default:
      return state;
  }
}
