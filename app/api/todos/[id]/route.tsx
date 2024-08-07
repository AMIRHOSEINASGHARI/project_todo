// next
import { NextRequest, NextResponse } from "next/server";
// types
import { Todo as TodoType } from "@/types/todo";
import { User as UserType } from "@/types/user";
// models
import Todo from "@/utils/models/todo";
import User from "@/utils/models/user";
// utils
import connectDB from "@/utils/connectDB";
import { getServerSession } from "@/utils/session";

export async function GET(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const session = getServerSession();

    if (!session) {
      return NextResponse.json({ message: "un-authorized!" }, { status: 404 });
    }

    await connectDB();

    const todo = await Todo.findById(id)
      .populate({
        path: "user",
        model: User,
        select: "_id username name",
      })
      .select("-group -isGrouped")
      .lean<TodoType>();
    const user = await User.findById(session?.userId).lean<UserType>();

    if (!todo?.user?._id.equals(user?._id)) {
      return NextResponse.json({ message: "un-authorized!" }, { status: 404 });
    }

    return NextResponse.json({ message: "success", todo }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
}
