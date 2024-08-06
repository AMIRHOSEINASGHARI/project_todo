// next
import { redirect } from "next/navigation";
// utils
import { getServerSession } from "@/utils/session";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const session = getServerSession();

  if (session) {
    redirect("/all");
  }

  return <div>{children}</div>;
};

export default AuthLayout;
