// next
import { cookies } from "next/headers";
// jwt
import { verify } from "jsonwebtoken";

const SECRET_KEY = process.env.SESSION_SECRET_KEY;

export const getServerSession = (): any => {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore?.get("accessToken")?.value || "";

    const session = verify(accessToken, SECRET_KEY!);
    //! SECRET_KEY!

    return session;
  } catch (error) {
    return null;
  }
};
