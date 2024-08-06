// mongoose
import { Document } from "mongoose";
// types
import { Todo } from "./todo";
import { Group } from "./group";

export type User = Document & {
  _id: string;
  username: string;
  password: string;
  name: string;
  todos: [Todo] | [];
  groups: [Group] | [];
  createdAt: Date;
  updatedAt: Date | null;
};

export type UserInformationProps = {
  username?: string | undefined;
  name?: string | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | null | undefined;
};

export type TodosInformationProps = {
  all_todos: number | undefined;
  completed_todos: number | undefined;
  uncompleted_todos: number | undefined;
  important_todos: number | undefined;
  groups: number | undefined;
};
