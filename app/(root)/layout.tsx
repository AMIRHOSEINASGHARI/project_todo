// react
import React from "react";
// next
import { redirect } from "next/navigation";
// utils
import { getServerSession } from "@/utils/session";
// actions
import { getUser } from "@/actions/user";
// cmp
import Sidebar from "@/components/shared/layout/Sidebar";
import MobileNav from "@/components/shared/layout/MobileNav";
import MobileDarkMode from "@/components/shared/MobileDarkMode";

const PagesLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = getServerSession();

  if (!session) {
    redirect("/login");
  }

  const current_user = await getUser();

  if (current_user?.code === 200) {
    return (
      <div>
        <aside className="sidebar dark:bg-dark2 border-border-light dark:border-border-dark flex w-[300px] flex-col gap-2 bg-white px-2 pb-5 max-sm:hidden sm:px-5">
          <Sidebar />
        </aside>
        <div className="mobile-nav">
          <MobileNav />
        </div>
        <div className="pages_spaces">
          <div>{children}</div>
        </div>
        <MobileDarkMode />
      </div>
    );
  } else {
    return null;
  }
};

export default PagesLayout;
