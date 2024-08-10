// cmp
import { Separator } from "@/components/ui/separator";
import SidebarLinks from "./SidebarLinks";
import SidebarTodoGroups from "./SidebarTodoGroups";
import SidebarUserProfile from "./SidebarUserProfile";

const Sidebar = () => {
  return (
    <>
      <SidebarUserProfile />
      <Separator className="my-3" />
      <SidebarLinks />
      <Separator className="my-3" />
      <SidebarTodoGroups />
    </>
  );
};

export default Sidebar;
