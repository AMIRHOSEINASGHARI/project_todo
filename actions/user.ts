"use server";

import { User as UserType } from "@/types/user";
import connectDB from "@/utils/connectDB";
import Group from "@/utils/models/group";
import Todo from "@/utils/models/todo";
import User from "@/utils/models/user";
import { getServerSession } from "@/utils/session";
import { redirect } from "next/navigation";

export const getUser = async () => {
  try {
    await connectDB();

    const session = getServerSession();

    if (!session) redirect("/login");

    const user = await User.findById(session.userId)
      .populate({
        path: "todos",
        model: Todo,
        select: "-user",
      })
      .populate({
        path: "todo_groups",
        model: Group,
        select: "-user",
      })
      .select("-password")
      .lean<UserType>();

    if (!user) throw new Error("User not found");

    return {
      user,
      message: "Success",
      status: "success",
      code: 200,
    };
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
