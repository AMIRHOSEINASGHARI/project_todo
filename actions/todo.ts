"use server";

// next
import { revalidatePath } from "next/cache";
// utils
import connectDB from "@/utils/connectDB";
import { getServerSession } from "@/utils/session";
// mongoose
import { Types } from "mongoose";
// models
import Todo from "@/utils/models/todo";
import Group from "@/utils/models/group";
import User from "@/utils/models/user";
// types
import {
  CreateTodoProps,
  TodoDetailsFormStateProps,
  Todo as TodoType,
} from "@/types/todo";
import { Group as GroupType } from "@/types/group";
import { User as UserType } from "@/types/user";

export const createTodo = async ({
  title,
  important,
  isGrouped,
  group,
}: CreateTodoProps) => {
  try {
    await connectDB();

    const session = getServerSession();

    const user = await User.findById(session?.userId);

    const newTodo = await Todo.create({
      title,
      important: important ?? false,
      group: group ?? null,
      isGrouped: isGrouped,
      user: new Types.ObjectId(session?.userId),
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

export const updateTodo = async ({
  _id,
  form,
}: {
  _id: string;
  form: TodoDetailsFormStateProps;
}) => {
  try {
    await connectDB();

    const session = getServerSession();

    const todo = await Todo.findById(_id).lean<TodoType>();

    if (!todo?.user?.equals(session?.userId)) {
      return {
        message: "un-authorized! access denied.",
        status: "failed",
        code: 404,
      };
    }

    const { title, note, marks, steps } = form;

    if (!title) {
      return {
        message: "Title cannot be empty",
        status: "failed",
        code: 404,
      };
    }

    await Todo.findByIdAndUpdate(_id, {
      title,
      note,
      marks,
      steps,
      updatedAt: new Date(),
    });

    revalidatePath("/", "layout");

    return {
      message: "Task updated",
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

export const deleteTodo = async ({ _id }: { _id: string }) => {
  try {
    await connectDB();

    const session = getServerSession();

    const todo = await Todo.findById(_id);

    if (!todo?.user?.equals(session?.userId)) {
      return {
        message: "un-authorized! access denied.",
        status: "failed",
        code: 404,
      };
    }

    if (todo?.isGrouped) {
      const group = await Group.findById(todo?.group?._id);
      const todo_index = group?.todos?.findIndex((item: TodoType) =>
        item?.equals(todo),
      );

      group?.todos?.splice(todo_index!, 1);
      await group?.save();
    }

    const user = await User.findById(todo?.user);
    const todo_index = user?.todos?.findIndex((item: TodoType) =>
      item.equals(todo),
    );

    user?.todos?.splice(todo_index!, 1);
    await user?.save();

    await Todo.findByIdAndDelete(_id);

    return {
      message: "Task deleted",
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

    const un_grouped_todos = await Todo.find({
      completed: false,
      user: session?.userId,
      isGrouped: false,
    }).lean<TodoType[]>();

    const groups = await Group.find({
      user: session?.userId,
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

export const getTodo = async (id: string) => {
  try {
    await connectDB();

    const session = getServerSession();

    const user = await User.findById(session?.userId).lean<UserType>();
    const todo = await Todo.findById(id)
      .populate({
        path: "user",
        model: User,
        select: "username name _id",
      })
      .populate({
        path: "group",
        model: Group,
        select: "group_name",
      })
      .lean<TodoType>();

    if (!todo?.user?._id?.equals(user?._id)) {
      throw new Error("un-authorized! access denied");
    }

    return {
      todo,
      message: "success",
      status: "success",
      code: 200,
    };
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const getSidebarTodos = async () => {
  try {
    await connectDB();

    const session = getServerSession();

    const todos = await Todo.find({
      user: session?.userId,
    }).lean<TodoType[]>();

    const un_completed_todos = todos?.filter(
      (todo) => todo?.completed === false,
    )?.length;
    const important_todos = todos?.filter(
      (todo) => todo?.important === true && todo?.completed === false,
    )?.length;

    return {
      un_completed_todos,
      important_todos,
      message: "success",
      status: "success",
      code: 200,
    };
  } catch (error: any) {
    console.log(error);
    return {
      message: "Server Error!",
      status: "failed",
      code: 500,
    };
  }
};

export const getImportantTodos = async () => {
  try {
    await connectDB();

    const session = getServerSession();

    const todos = await Todo.find({
      important: true,
      completed: false,
      user: session?.userId,
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

    const todos = await Todo.find({
      completed: true,
      user: session?.userId,
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
