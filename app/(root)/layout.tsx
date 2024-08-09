// react
import React from "react";
// next
import { redirect } from "next/navigation";
// utils
import { getServerSession } from "@/utils/session";
// cmp
import Sidebar from "@/components/shared/layout/Sidebar";
import { getUser } from "@/actions/user";

const PagesLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = getServerSession();

  if (!session) {
    redirect("/login");
  }

  const current_user = await getUser();

  if (current_user?.code === 200) {
    return (
      <div>
        <Sidebar />
        <div className="pages_spaces">
          <div>{children}</div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default PagesLayout;
