import { Schema, model, models } from "mongoose";

const groupSchema = new Schema({
  group_name: {
    type: String,
    required: true,
  },
  todos: [{ type: Schema.Types.ObjectId, ref: "Todo" }],
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

const Group = models?.Group || model("Group", groupSchema);

export default Group;
