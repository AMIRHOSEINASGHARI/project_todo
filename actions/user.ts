"use server";

import { User as UserType } from "@/types/user";
import connectDB from "@/utils/connectDB";
import Group from "@/utils/models/group";
import Todo from "@/utils/models/todo";
import User from "@/utils/models/user";
import { getServerSession } from "@/utils/session";

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
