import type { ColumnConfig, OwnerConfig, Card } from "../types";

export const COLUMNS: ColumnConfig[] = [
  {
    id: "todo",
    label: "To Do",
    accent: "border-slate-400",
    headerBg: "bg-slate-100",
  },
  {
    id: "wip",
    label: "WIP",
    accent: "border-yellow-400",
    headerBg: "bg-yellow-50",
  },
  {
    id: "done",
    label: "Done",
    accent: "border-green-500",
    headerBg: "bg-green-50",
  },
];

export const OWNERS: OwnerConfig[] = [
  {
    id: "eu",
    label: "Eu",
    badgeBg: "bg-blue-500",
    badgeText: "text-white",
    cardBorder: "border-l-blue-500",
    laneBg: "bg-blue-50/40",
    laneLabel: "bg-blue-500",
  },
  {
    id: "namorada",
    label: "Minha Namorada",
    badgeBg: "bg-pink-500",
    badgeText: "text-white",
    cardBorder: "border-l-pink-500",
    laneBg: "bg-pink-50/40",
    laneLabel: "bg-pink-500",
  },
];

const now = new Date().toISOString();

export const SEED_CARDS: Card[] = [
  {
    id: "seed-1",
    title: "Academia",
    description: "Ir segunda, quarta e sexta",
    owner: "eu",
    columnId: "todo",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "seed-2",
    title: "Compras do mês",
    description: "Fazer lista e ir ao mercado",
    owner: "eu",
    columnId: "wip",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "seed-3",
    title: "Yoga",
    description: "Praticar toda manhã",
    owner: "namorada",
    columnId: "todo",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "seed-4",
    title: "Livro do clube",
    description: "Terminar antes do próximo encontro",
    owner: "namorada",
    columnId: "wip",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "seed-5",
    title: "Pagar contas",
    owner: "eu",
    columnId: "done",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "seed-6",
    title: "Marcar médico",
    owner: "namorada",
    columnId: "done",
    createdAt: now,
    updatedAt: now,
  },
];
