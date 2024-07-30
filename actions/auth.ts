"use server";

// next
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// utils
import connectDB from "@/utils/connectDB";
import { hashPassword, verifyPassword } from "@/utils/functions";
// types
import { CreateUserProps, LoginUserProps } from "@/types/auth";
import { ServerActionOutput } from "@/types/shared";
// models
import User from "@/utils/models/user";
// jwt
import { sign } from "jsonwebtoken";
// vars
import { SECRET_KEY, SESSION_EXPIRATION } from "@/utils/vars";

export const createUser = async ({
  username,
  name,
  password,
}: CreateUserProps): Promise<ServerActionOutput> => {
  try {
    await connectDB();

    const user = await User.findOne({ username });

    if (user) {
      return {
        message: "Username already exist!",
        status: "failed",
        code: 402,
      };
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      username,
      name,
      password: hashedPassword,
    });

    if (newUser) {
      return {
        message: "User Created",
        status: "success",
        code: 200,
      };
    } else {
      return {
        message: "Cannot register user at this time!",
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

export const login = async ({
  username,
  password,
}: LoginUserProps): Promise<ServerActionOutput> => {
  try {
    await connectDB();

    const user = await User.findOne({ username });

    if (!user) {
      return {
        message: "User not found!",
        status: "failed",
        code: 404,
      };
    }

    // verify password
    const isValidPassword = await verifyPassword(password, user.password);

    if (!isValidPassword) {
      return {
        message: "Username or password is incorrect!",
        status: "failed",
        code: 404,
      };
    }

    // creating token
    const accessToken = sign(
      {
        username,
        userId: user._id,
        name: user.name,
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

    return {
      message: "Logged in successfully!",
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

export const signOut = () => {
  cookies().delete("accessToken");
  redirect("/");
};
