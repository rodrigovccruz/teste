import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { CardModal } from "../CardModal/CardModal";
import { OWNERS } from "../../constants/board";
import type { Card as CardType } from "../../types";

interface CardProps {
  card: CardType;
  onEdit: (id: string, updates: Partial<Omit<CardType, "id" | "createdAt">>) => void;
  onDelete: (id: string) => void;
  onAdd: (card: Omit<CardType, "id" | "createdAt" | "updatedAt">) => void;
}

export function Card({ card, onEdit, onDelete, onAdd }: CardProps) {
  const [editOpen, setEditOpen] = useState(false);

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: card.id });

  const ownerConfig = OWNERS.find((o) => o.id === card.owner)!;

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className={`group bg-white rounded-xl shadow-sm border border-gray-200 border-l-4 ${ownerConfig.cardBorder} p-3 cursor-grab active:cursor-grabbing transition-shadow hover:shadow-md`}
        {...attributes}
        {...listeners}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 leading-tight">{card.title}</p>
            {card.description && (
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">{card.description}</p>
            )}
          </div>
          {/* Action buttons shown on hover */}
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                setEditOpen(true);
              }}
              className="text-gray-400 hover:text-indigo-600 p-0.5 rounded"
              aria-label="Editar"
              title="Editar"
            >
              ✏️
            </button>
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                if (confirm(`Deletar "${card.title}"?`)) onDelete(card.id);
              }}
              className="text-gray-400 hover:text-red-600 p-0.5 rounded"
              aria-label="Deletar"
              title="Deletar"
            >
              🗑️
            </button>
          </div>
        </div>

        {/* Owner badge */}
        <div className="mt-2">
          <span
            className={`inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full ${ownerConfig.badgeBg} ${ownerConfig.badgeText}`}
          >
            {ownerConfig.label}
          </span>
        </div>
      </div>

      <CardModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        editCard={card}
        onAdd={onAdd}
        onEdit={onEdit}
      />
    </>
  );
}
