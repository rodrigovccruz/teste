import { useState, useEffect } from "react";
import { Modal } from "../ui/Modal";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";
import { OWNERS, COLUMNS } from "../../constants/board";
import type { Card, OwnerId, ColumnId } from "../../types";

interface CardModalProps {
  open: boolean;
  onClose: () => void;
  initialOwner?: OwnerId;
  initialColumn?: ColumnId;
  editCard?: Card;
  onAdd: (card: Omit<Card, "id" | "createdAt" | "updatedAt">) => void;
  onEdit: (id: string, updates: Partial<Omit<Card, "id" | "createdAt">>) => void;
}

export function CardModal({
  open,
  onClose,
  initialOwner = "eu",
  initialColumn = "todo",
  editCard,
  onAdd,
  onEdit,
}: CardModalProps) {
  const isEditing = Boolean(editCard);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [owner, setOwner] = useState<OwnerId>(initialOwner);
  const [columnId, setColumnId] = useState<ColumnId>(initialColumn);

  // Sync form when modal opens
  useEffect(() => {
    if (!open) return;
    if (editCard) {
      setTitle(editCard.title);
      setDescription(editCard.description ?? "");
      setOwner(editCard.owner);
      setColumnId(editCard.columnId);
    } else {
      setTitle("");
      setDescription("");
      setOwner(initialOwner);
      setColumnId(initialColumn);
    }
  }, [open, editCard, initialOwner, initialColumn]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (isEditing && editCard) {
      onEdit(editCard.id, {
        title: title.trim(),
        description: description.trim() || undefined,
        owner,
        columnId,
      });
    } else {
      onAdd({
        title: title.trim(),
        description: description.trim() || undefined,
        owner,
        columnId,
      });
    }
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEditing ? "Editar atividade" : "Nova atividade"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: Ir à academia"
          required
          autoFocus
        />

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Descrição (opcional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detalhes..."
            rows={3}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
          />
        </div>

        <Select
          label="Responsável"
          value={owner}
          onChange={(e) => setOwner(e.target.value as OwnerId)}
          options={OWNERS.map((o) => ({ value: o.id, label: o.label }))}
        />

        <Select
          label="Coluna"
          value={columnId}
          onChange={(e) => setColumnId(e.target.value as ColumnId)}
          options={COLUMNS.map((c) => ({ value: c.id, label: c.label }))}
        />

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary">
            {isEditing ? "Salvar" : "Adicionar"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
