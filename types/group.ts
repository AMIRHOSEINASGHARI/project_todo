// mongoose
import { Document } from "mongoose";
// types
import { Todo } from "./todo";
import { User } from "./user";

export type Group = Document & {
  _id: string;
  group_name: string;
  todos: Todo[] | undefined;
  user: User;
  createdAt: Date;
  updatedAt: Date | null;
};
