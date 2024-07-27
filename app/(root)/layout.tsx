// next
import { redirect } from "next/navigation";
// utils
import React from "react";

const PagesLayout = async ({ children }: { children: React.ReactNode }) => {
  //   const session = getServerSession();
  const session = true;

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <div className="pages_spaces">
        <div>{children}</div>
      </div>
    </div>
  );
};

export default PagesLayout;
