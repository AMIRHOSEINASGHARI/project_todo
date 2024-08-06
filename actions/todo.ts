"use server";

// next
import { revalidatePath } from "next/cache";
// utils
import connectDB from "@/utils/connectDB";
import { getServerSession } from "@/utils/session";
// models
import Todo from "@/utils/models/todo";
// types
import { CreateTodoProps, Todo as TodoType } from "@/types/todo";
import Group from "@/utils/models/group";
import { Group as GroupType } from "@/types/group";
import { redirect } from "next/navigation";
import User from "@/utils/models/user";
import { Types } from "mongoose";

export const createTodo = async ({
  title,
  important,
  isGrouped,
  group,
}: CreateTodoProps) => {
  try {
    await connectDB();

    const session = getServerSession();

    if (!session) redirect("/login");

    const user = await User.findById(session.userId);

    const newTodo = await Todo.create({
      title,
      important: important ?? false,
      group: group ?? null,
      isGrouped: isGrouped,
      user: new Types.ObjectId(session.userId),
    });

    user?.todos?.push(newTodo?._id);
    await user.save();

    if (isGrouped && group) {
      const groupName = await Group.findById<GroupType>(group);
      groupName?.todos?.push(newTodo?._id);
      await groupName?.save();

      user?.todo_groups?.push(groupName?._id);
      await user.save();
    }

    revalidatePath("/all");

    return {
      message: "Todo created",
      status: "success",
      code: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Server Error!",
      status: "failed",
      code: 500,
    };
  }
};

export const completeTodo = async ({
  _id,
  completed,
}: {
  _id: string;
  completed: boolean;
}) => {
  try {
    await connectDB();

    const session = getServerSession();

    if (!session) redirect("/login");

    await Todo.findByIdAndUpdate(_id, {
      completed,
    });

    revalidatePath("/", "layout");

    return {
      message: "Todo updated",
      status: "success",
      code: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Server Error!",
      status: "failed",
      code: 500,
    };
  }
};

export const importantTodo = async ({
  _id,
  important,
}: {
  _id: string;
  important: boolean;
}) => {
  try {
    await connectDB();

    const session = getServerSession();

    if (!session) redirect("/login");

    await Todo.findByIdAndUpdate(_id, {
      important,
    });

    revalidatePath("/", "layout");

    return {
      message: "Todo updated",
      status: "success",
      code: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Server Error!",
      status: "failed",
      code: 500,
    };
  }
};

export const getTodos = async () => {
  try {
    await connectDB();

    const session = getServerSession();

    if (!session) redirect("/login");

    const un_grouped_todos = await Todo.find({
      completed: false,
      user: session.userId,
      isGrouped: false,
    }).lean<TodoType[]>();

    const groups = await Group.find({
      user: session.userId,
      $expr: { $gt: [{ $size: "$todos" }, 0] },
    })
      .populate({
        path: "todos",
        model: Todo,
        match: { completed: { $ne: true } },
        populate: {
          path: "group",
          model: Group,
        },
      })
      .lean<GroupType[]>();

    return {
      un_grouped_todos,
      groups,
      message: "Success",
      status: "success",
      code: 200,
    };
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const getImportantTodos = async () => {
  try {
    await connectDB();

    const session = getServerSession();

    if (!session) redirect("/login");

    const todos = await Todo.find({
      important: true,
      completed: false,
      user: session.userId,
    })
      .populate({
        path: "group",
        model: Group,
      })
      .lean<TodoType[]>();

    return {
      important_todos: todos,
      message: "Success",
      status: "success",
      code: 200,
    };
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const getCompletedTodos = async () => {
  try {
    await connectDB();

    const session = getServerSession();

    if (!session) redirect("/login");

    const todos = await Todo.find({
      completed: true,
      user: session.userId,
    })
      .populate({
        path: "group",
        model: Group,
      })
      .lean<TodoType[]>();

    return {
      completed_todos: todos,
      message: "Success",
      status: "success",
      code: 200,
    };
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
