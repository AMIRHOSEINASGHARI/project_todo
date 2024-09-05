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
        options: {
          sort: { completed: 1, important: -1 },
        },
        populate: {
          path: "group",
          model: Group,
        },
      })
      .populate({
        path: "groups",
        model: Group,
        select: "-user",
      })
      .select("-password")
      .lean<UserType>();

    // if (!user) {
    //   throw new Error("User not found");
    // }

    const info = {
      username: user?.username,
      name: user?.name,
      createdAt: user?.createdAt,
      updatedAt: user?.updatedAt,
    };
    const all_todos = user?.todos;
    const completed_todos = user?.todos?.filter(
      (todo) => todo?.completed === true,
    );
    const uncompleted_todos = user?.todos?.filter(
      (todo) => todo?.completed === false,
    );
    const important_todos = user?.todos?.filter(
      (todo) => todo?.important === true,
    );
    const groups = user?.groups;

    const data = JSON.parse(
      JSON.stringify({
        info,
        all_todos,
        completed_todos,
        uncompleted_todos,
        important_todos,
        groups,
      }),
    );

    return {
      data,
      message: "Success",
      status: "success",
      code: 200,
    };
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
