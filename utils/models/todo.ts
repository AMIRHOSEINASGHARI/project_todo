import { TodoMarks } from "@/types/todo";
import { Schema, model, models } from "mongoose";
// types
import {} from "@/types/todo";

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  steps: [
    {
      title: String,
      completed: Boolean,
    },
  ],
  note: {
    type: String,
    default: "",
  },
  completed: {
    type: Boolean,
    default: false,
  },
  important: {
    type: Boolean,
    default: false,
  },
  marks: {
    type: [String],
    enum: ["red", "orange", "yellow", "green", "blue", "purple"],
  },
  isGrouped: { type: Boolean, default: false },
  group: { type: Schema.Types.ObjectId, ref: "Group" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutabale: true,
  },
  updatedAt: {
    type: Date,
    default: null,
  },
});

const Todo = models?.Todo || model("Todo", todoSchema);

export default Todo;
