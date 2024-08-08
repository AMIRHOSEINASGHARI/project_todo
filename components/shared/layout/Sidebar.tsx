// cmp
import { Separator } from "@/components/ui/separator";
import SidebarLinks from "./SidebarLinks";
import SidebarTodoGroups from "./SidebarTodoGroups";
import SidebarUserProfile from "./SidebarUserProfile";

const Sidebar = () => {
  return (
    <aside className="sidebarScroll fixed left-0 z-30 flex h-screen flex-col overflow-y-auto border-r border-gray-200 bg-white sm:w-[300px]">
      <SidebarUserProfile />
      <Separator className="my-3" />
      <SidebarLinks />
      <Separator className="my-3" />
      <SidebarTodoGroups />
    </aside>
  );
};

export default Sidebar;
