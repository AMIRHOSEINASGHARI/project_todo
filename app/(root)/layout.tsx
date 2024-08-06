// react
import React from "react";
// next
import { redirect } from "next/navigation";
// utils
import { getServerSession } from "@/utils/session";
// cmp
import Sidebar from "@/components/shared/layout/Sidebar";

const PagesLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <Sidebar />
      <div className="pages_spaces">
        <div>{children}</div>
      </div>
    </div>
  );
};

export default PagesLayout;
