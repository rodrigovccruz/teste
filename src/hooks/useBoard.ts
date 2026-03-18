import { useReducer, useEffect, useCallback } from "react";
import { boardReducer, initialState } from "../store/boardStore";
import { loadBoard, saveBoard } from "../utils/localStorage";
import { SEED_CARDS } from "../constants/board";
import type { OwnerId, ColumnId, Card } from "../types";

export function useBoard() {
  const [state, dispatch] = useReducer(boardReducer, initialState);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const saved = loadBoard();
    if (saved) {
      dispatch({ type: "LOAD_STATE", payload: saved });
    } else {
      dispatch({
        type: "LOAD_STATE",
        payload: { cards: SEED_CARDS, version: 1 },
      });
    }
  }, []);

  // Persist on every state change
  useEffect(() => {
    saveBoard(state);
  }, [state]);

  const addCard = useCallback(
    (card: Omit<Card, "id" | "createdAt" | "updatedAt">) => {
      dispatch({ type: "ADD_CARD", payload: card });
    },
    []
  );

  const editCard = useCallback(
    (id: string, updates: Partial<Omit<Card, "id" | "createdAt">>) => {
      dispatch({ type: "EDIT_CARD", payload: { id, ...updates } });
    },
    []
  );

  const deleteCard = useCallback((id: string) => {
    dispatch({ type: "DELETE_CARD", payload: { id } });
  }, []);

  const moveCard = useCallback(
    (id: string, owner: OwnerId, columnId: ColumnId) => {
      dispatch({ type: "MOVE_CARD", payload: { id, owner, columnId } });
    },
    []
  );

  return { state, addCard, editCard, deleteCard, moveCard };
}
