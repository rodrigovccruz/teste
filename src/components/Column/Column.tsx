import type { ColumnConfig, Card } from "../../types";

interface ColumnProps {
  column: ColumnConfig;
  cards: Card[];
}

export function Column({ column, cards }: ColumnProps) {
  return (
    <div
      className={`flex items-center justify-between px-4 py-2 rounded-xl ${column.headerBg} border-b-2 ${column.accent}`}
    >
      <span className="text-sm font-bold text-gray-700">{column.label}</span>
      <span className="text-xs bg-white text-gray-500 font-semibold rounded-full px-2 py-0.5 shadow-sm">
        {cards.length}
      </span>
    </div>
  );
}
