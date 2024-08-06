"use server";

// next
import { revalidatePath } from "next/cache";
// utils
import connectDB from "@/utils/connectDB";
import { getServerSession } from "@/utils/session";
// models
import Group from "@/utils/models/group";
// types
import { Group as GroupType } from "@/types/group";
import Todo from "@/utils/models/todo";
import { redirect } from "next/navigation";
import User from "@/utils/models/user";
import { Types } from "mongoose";

export const createNewGroup = async ({
  group_name,
}: {
  group_name: string;
}) => {
  try {
    await connectDB();

    const session = getServerSession();

    if (!session) redirect("/login");

    const newGroup = await Group.create({
      group_name,
      user: new Types.ObjectId(session.userId),
    });

    if (newGroup?._id) {
      const user = await User.findOne({
        username: session.username,
      });
      user?.groups?.push(newGroup?._id);
      await user.save();

      revalidatePath("/", "layout");
      return JSON.parse(
        JSON.stringify({
          groupId: newGroup._id,
          message: "Group created",
          status: "success",
          code: 200,
        })
      );
    } else {
      return {
        message: "Server Error!",
        status: "failed",
        code: 500,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      message: "Server Error!",
      status: "failed",
      code: 500,
    };
  }
};

export const getGroups = async () => {
  try {
    await connectDB();

    const session = getServerSession();

    if (!session) redirect("/login");

    const groups = await Group.find({
      user: session.userId,
    })
      .populate({
        path: "todos",
        model: Todo,
        match: { completed: { $ne: true } },
      })
      .lean<GroupType[]>();

    return {
      groups,
      message: "Success",
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

export const getGroup = async (id: string) => {
  try {
    await connectDB();

    const session = getServerSession();

    if (!session) redirect("/login");

    const group = await Group.findById(id)
      .populate({
        path: "todos",
        model: Todo,
        match: { completed: { $ne: true } },
      })
      .lean<GroupType>();

    return {
      group,
      message: "Success",
      status: "success",
      code: 200,
    };
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
