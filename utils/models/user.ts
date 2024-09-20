import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  avatar: {
    type: String,
    validate: {
      validator: function (v: any) {
        return /^https?:\/\/.+\..+$/.test(v); // Simple URL validation regex
      },
      message: (props: any) => `${props.value} is not a valid URL!`,
    },
  },
  todos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Todo",
    },
  ],
  groups: [
    {
      type: Schema.Types.ObjectId,
      ref: "Group",
    },
  ],
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

const User = models?.User || model("User", userSchema);

export default User;
