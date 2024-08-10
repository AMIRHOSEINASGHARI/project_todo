import React from "react";
import SidebarLinks from "./SidebarLinks";
import { Separator } from "@/components/ui/separator";
import SidebarTodoGroups from "./SidebarTodoGroups";

const MobileNav = () => {
  return (
    <>
      <SidebarLinks />
      <SidebarTodoGroups />
    </>
  );
};

export default MobileNav;
