import { DndContext, closestCenter, DragOverlay, type DragEndEvent, type DragStartEvent } from "@dnd-kit/core";
import { useState } from "react";
import { SwimLane } from "../SwimLane/SwimLane";
import { Column } from "../Column/Column";
import { Card as CardComponent } from "../Card/Card";
import { COLUMNS, OWNERS } from "../../constants/board";
import type { Card, OwnerId, ColumnId } from "../../types";

interface BoardProps {
  cards: Card[];
  onAdd: (card: Omit<Card, "id" | "createdAt" | "updatedAt">) => void;
  onEdit: (id: string, updates: Partial<Omit<Card, "id" | "createdAt">>) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, owner: OwnerId, columnId: ColumnId) => void;
}

export function Board({ cards, onAdd, onEdit, onDelete, onMove }: BoardProps) {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const activeCard = activeCardId ? cards.find((c) => c.id === activeCardId) : null;

  const handleDragStart = (event: DragStartEvent) => {
    setActiveCardId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveCardId(null);
    const { active, over } = event;
    if (!over) return;

    const [targetOwner, targetColumn] = (over.id as string).split("::");
    if (!targetOwner || !targetColumn) return;

    onMove(active.id as string, targetOwner as OwnerId, targetColumn as ColumnId);
  };

  // Grid: 4 columns (label + 3 kanban), 3 rows (header + 2 lanes)
  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div
        className="grid gap-3 p-4"
        style={{
          gridTemplateColumns: "140px repeat(3, 1fr)",
          gridTemplateRows: "auto",
        }}
      >
        {/* Top-left corner: empty */}
        <div />

        {/* Column headers */}
        {COLUMNS.map((col) => (
          <Column
            key={col.id}
            column={col}
            cards={cards.filter((c) => c.columnId === col.id)}
          />
        ))}

        {/* Swim lanes */}
        {OWNERS.map((owner) => (
          <SwimLane
            key={owner.id}
            owner={owner}
            cards={cards}
            onAdd={onAdd}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* Drag overlay */}
      <DragOverlay>
        {activeCard && (
          <div className="rotate-2 opacity-95 pointer-events-none">
            <CardComponent
              card={activeCard}
              onEdit={onEdit}
              onDelete={onDelete}
              onAdd={onAdd}
            />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
