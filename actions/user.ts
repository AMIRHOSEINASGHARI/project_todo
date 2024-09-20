"use server";

// next
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
// types
import { EditUserProps, User as UserType } from "@/types/user";
// utils
import { SECRET_KEY, SESSION_EXPIRATION } from "@/utils/vars";
import { getServerSession } from "@/utils/session";
import connectDB from "@/utils/connectDB";
// models
import Group from "@/utils/models/group";
import Todo from "@/utils/models/todo";
import User from "@/utils/models/user";
// jwt
import { sign } from "jsonwebtoken";

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

    if (!user) {
      return {
        data: null,
        message: "Success",
        status: "success",
        code: 200,
      };
    }

    const info = {
      username: user?.username,
      name: user?.name,
      createdAt: user?.createdAt,
      updatedAt: user?.updatedAt,
    };
    const all_todos = user?.todos;
    const completed_todos = user?.todos?.filter(
      (todo) => todo?.completed === true
    );
    const uncompleted_todos = user?.todos?.filter(
      (todo) => todo?.completed === false
    );
    const important_todos = user?.todos?.filter(
      (todo) => todo?.important === true
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
      })
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

export const editUser = async ({ username, name, avatar }: EditUserProps) => {
  try {
    await connectDB();

    const session = getServerSession();

    const user = await User.findById(session?.userId);

    if (!user) {
      return {
        message: "Unauthorized!",
        status: "failed",
        code: 404,
      };
    }

    if (
      username.length < 4 &&
      username.length > 10 &&
      name.length < 8 &&
      name.length > 15
    ) {
      return {
        message: "Invalid data",
        status: "failed",
        code: 400,
      };
    }

    const existingUsername = await User.findOne({ username });
    console.log(
      existingUsername && existingUsername?.username !== user?.username
    );

    if (existingUsername && existingUsername?.username !== user?.username) {
      return {
        message: "Username already exist!",
        status: "failed",
        code: 400,
      };
    }

    user.username = username;
    user.name = name;
    user.avatar = avatar;
    await user.save();

    // creating token
    const accessToken = sign(
      {
        userId: user._id,
        username,
        name: name,
        avatar: avatar,
      },
      SECRET_KEY || "",
      {
        expiresIn: SESSION_EXPIRATION,
      }
    );

    // setting token in cookie
    cookies().set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + SESSION_EXPIRATION),
      sameSite: "lax",
      path: "/",
    });

    revalidatePath("/", "layout");

    return {
      message: "Info updated!",
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
