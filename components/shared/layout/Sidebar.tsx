// cmp
import { Separator } from "@/components/ui/separator";
import SidebarLinks from "./SidebarLinks";
import SidebarTodoGroups from "./SidebarTodoGroups";
import SidebarUserProfile from "./SidebarUserProfile";

const Sidebar = () => {
  return (
    <aside className="sm:w-[250px] flex flex-col border-r border-gray-200 fixed z-30 left-0 h-screen bg-white overflow-y-auto sidebarScroll">
      <SidebarUserProfile />
      <Separator className="my-3" />
      <SidebarLinks />
      <Separator className="my-3" />
      <SidebarTodoGroups />
    </aside>
  );
};

export default Sidebar;
