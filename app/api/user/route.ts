// next
import { NextResponse } from "next/server";
// utils
import { getServerSession } from "@/utils/session";
import connectDB from "@/utils/connectDB";
// models
import User from "@/utils/models/user";

export async function GET() {
  try {
    await connectDB();

    const session = getServerSession();

    if (!session) {
      return NextResponse.json(
        {
          message: "Unauthorized!",
        },
        { status: 404 }
      );
    }

    const user = await User.findById(session?.userId);

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found!",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        _id: user?._id,
        name: user?.name,
        username: user?.username,
        avatar: user?.avatar,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Server error",
      },
      { status: 500 }
    );
  }
}
