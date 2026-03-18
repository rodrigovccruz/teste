import { useState } from "react";
import { Button } from "../ui/Button";
import { CardModal } from "../CardModal/CardModal";
import type { Card } from "../../types";

interface HeaderProps {
  onAdd: (card: Omit<Card, "id" | "createdAt" | "updatedAt">) => void;
  onEdit: (id: string, updates: Partial<Omit<Card, "id" | "createdAt">>) => void;
}

export function Header({ onAdd, onEdit }: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="text-2xl">💑</span>
        <div>
          <h1 className="text-xl font-bold text-gray-900 leading-tight">Atividades do Casal</h1>
          <p className="text-xs text-gray-500">Organize suas atividades juntos</p>
        </div>
      </div>
      <Button variant="primary" onClick={() => setOpen(true)}>
        + Nova atividade
      </Button>

      <CardModal
        open={open}
        onClose={() => setOpen(false)}
        onAdd={onAdd}
        onEdit={onEdit}
      />
    </header>
  );
}
