import { LaneCell } from "../LaneCell/LaneCell";
import { COLUMNS } from "../../constants/board";
import type { OwnerConfig, Card, ColumnId } from "../../types";

interface SwimLaneProps {
  owner: OwnerConfig;
  cards: Card[];
  onAdd: (card: Omit<Card, "id" | "createdAt" | "updatedAt">) => void;
  onEdit: (id: string, updates: Partial<Omit<Card, "id" | "createdAt">>) => void;
  onDelete: (id: string) => void;
}

export function SwimLane({ owner, cards, onAdd, onEdit, onDelete }: SwimLaneProps) {
  const getColumnCards = (colId: ColumnId) =>
    cards.filter((c) => c.owner === owner.id && c.columnId === colId);

  return (
    <div className="contents">
      {/* Lane label cell */}
      <div
        className={`flex items-center justify-center rounded-xl p-3 ${owner.laneBg} border border-white/60`}
      >
        <span
          className={`text-white text-xs font-bold px-3 py-1.5 rounded-full ${owner.laneLabel} shadow-sm`}
          style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)" }}
        >
          {owner.label}
        </span>
      </div>

      {/* One cell per column */}
      {COLUMNS.map((col) => (
        <div
          key={col.id}
          className="bg-white/60 backdrop-blur-sm rounded-xl border border-white/80 shadow-sm"
        >
          <LaneCell
            owner={owner.id}
            columnId={col.id}
            cards={getColumnCards(col.id)}
            onAdd={onAdd}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
}
