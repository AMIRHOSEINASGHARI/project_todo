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
// mongoose
import { Types } from "mongoose";
// models
import Todo from "@/utils/models/todo";
import User from "@/utils/models/user";

export const createNewGroup = async ({
  group_name,
}: {
  group_name: string;
}) => {
  try {
    await connectDB();

    const session = getServerSession();

    const newGroup = await Group.create({
      group_name,
      user: new Types.ObjectId(session?.userId),
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
        }),
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

export const updateGroup = async ({
  _id,
  group_name,
}: {
  _id: string;
  group_name: string;
}) => {
  try {
    await connectDB();

    const session = getServerSession();

    if (!session) {
      return {
        message: "un-authorized",
        status: "failed",
        code: 404,
      };
    }

    const group = await Group.findById(_id).lean<GroupType>();

    if (!group?.user?.equals(session?.userId)) {
      return {
        message: "un-authorized! access denied",
        status: "failed",
        code: 404,
      };
    }

    console.log({
      _id,
      group_name,
    });

    await Group.findByIdAndUpdate(_id, {
      group_name,
    });

    revalidatePath("/", "layout");

    return {
      message: "Group updated",
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

export const getGroups = async () => {
  try {
    await connectDB();

    const session = getServerSession();

    const groups = await Group.find({
      user: session?.userId,
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

    const group = await Group.findById(id)
      .populate({
        path: "todos",
        model: Todo,
        match: { completed: { $ne: true } },
        options: {
          sort: { important: -1 },
        },
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
