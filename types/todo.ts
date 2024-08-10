import { Document, Schema } from "mongoose";
import { Group } from "./group";
import { User } from "./user";

export type TodoMarks =
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple";

export type TodoSteps = {
  _id?: Schema.Types.ObjectId;
  title: string;
  completed: boolean;
};

export type CreateTodoProps = {
  title: string;
  important?: boolean;
  isGrouped?: boolean;
  group?: Schema.Types.ObjectId;
};

export interface Todo extends Document {
  _id: string;
  title: string;
  steps?: [TodoSteps] | [];
  note: string;
  completed: boolean;
  important: boolean;
  marks: [TodoMarks] | [];
  isGrouped: boolean;
  group: Group;
  user: User;
  createdAt: Date;
  updatedAt: Date | null;
  completedAt: Date | null;
}

export type TodoDetailsProps = {
  _id: string;
  title: string;
  completed: boolean;
};

export type TodoDetailsFormStateProps = {
  title: string;
  note?: string;
  steps?: TodoSteps[];
  marks?: TodoMarks[];
};

export type DeleteTodoActionProps = {
  _id: string;
  pushRoute?: string;
};
