// types
import { TodoMarks } from "@/types/todo";

type MarksItem = {
  id: TodoMarks;
  label: TodoMarks;
};

type MarkColors = {
  red: string;
  orange: string;
  yellow: string;
  green: string;
  blue: string;
  purple: string;
};

export const btn_icon_variant = "ghost";

export const marksItems: MarksItem[] = [
  {
    id: "blue",
    label: "blue",
  },
  {
    id: "green",
    label: "green",
  },
  {
    id: "orange",
    label: "orange",
  },
  {
    id: "purple",
    label: "purple",
  },
  {
    id: "red",
    label: "red",
  },
  {
    id: "yellow",
    label: "yellow",
  },
];

export const markColors: MarkColors = {
  red: "#ef4444",
  orange: "#f59e0b",
  yellow: "#facc15",
  green: "#22c55e",
  blue: "#3b82f6",
  purple: "#9333ea",
};
