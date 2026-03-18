import { useDroppable } from "@dnd-kit/core";
import { useState } from "react";
import { Card } from "../Card/Card";
import { CardModal } from "../CardModal/CardModal";
import type { Card as CardType, OwnerId, ColumnId } from "../../types";

interface LaneCellProps {
  owner: OwnerId;
  columnId: ColumnId;
  cards: CardType[];
  onAdd: (card: Omit<CardType, "id" | "createdAt" | "updatedAt">) => void;
  onEdit: (id: string, updates: Partial<Omit<CardType, "id" | "createdAt">>) => void;
  onDelete: (id: string) => void;
}

export function LaneCell({ owner, columnId, cards, onAdd, onEdit, onDelete }: LaneCellProps) {
  const droppableId = `${owner}::${columnId}`;
  const [addOpen, setAddOpen] = useState(false);

  const { isOver, setNodeRef } = useDroppable({ id: droppableId });

  return (
    <>
      <div
        ref={setNodeRef}
        className={`min-h-[120px] p-2 flex flex-col gap-2 rounded-xl transition-colors ${
          isOver ? "bg-indigo-50 ring-2 ring-indigo-300" : "bg-transparent"
        }`}
      >
        {cards.map((card) => (
          <Card key={card.id} card={card} onEdit={onEdit} onDelete={onDelete} onAdd={onAdd} />
        ))}

        <button
          onClick={() => setAddOpen(true)}
          className="mt-auto flex items-center gap-1 text-xs text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg px-2 py-1 transition-colors w-full"
          title="Adicionar atividade aqui"
        >
          <span className="text-base leading-none">+</span>
          <span>Adicionar</span>
        </button>
      </div>

      <CardModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        initialOwner={owner}
        initialColumn={columnId}
        onAdd={onAdd}
        onEdit={onEdit}
      />
    </>
  );
}
