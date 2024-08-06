"use server";

// types
import { User as UserType } from "@/types/user";
// utils
import { getServerSession } from "@/utils/session";
import connectDB from "@/utils/connectDB";
// models
import Group from "@/utils/models/group";
import Todo from "@/utils/models/todo";
import User from "@/utils/models/user";

export const getUser = async () => {
  try {
    await connectDB();

    const session = getServerSession();

    const user = await User.findById(session?.userId)
      .populate({
        path: "todos",
        model: Todo,
        select: "-user",
      })
      .populate({
        path: "groups",
        model: Group,
        select: "-user",
      })
      .select("-password")
      .lean<UserType>();

    if (!user) {
      return {
        data: null,
        message: "User not found",
        status: "failed",
        code: 422,
      };
    }

    const info = {
      username: user?.username,
      name: user?.name,
      createdAt: user?.createdAt,
      updatedAt: user?.updatedAt,
    };
    const all_todos = user?.todos?.length;
    const completed_todos = user?.todos?.filter(
      (todo) => todo?.completed === true
    )?.length;
    const uncompleted_todos = user?.todos?.filter(
      (todo) => todo?.completed === false
    )?.length;
    const important_todos = user?.todos?.filter(
      (todo) => todo?.important === true
    )?.length;
    const groups = user?.groups?.length;

    return {
      data: {
        info,
        all_todos,
        completed_todos,
        uncompleted_todos,
        important_todos,
        groups,
      },
      message: "Success",
      status: "success",
      code: 200,
    };
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
