// cmp
import SidebarAddNewGroup from "../groups/SidebarAddNewGroup";
import SidebarTodoGroupsList from "../groups/SidebarTodoGroupsList";

const SidebarTodoGroups = () => {
  return (
    <div className="sm:px-5 px-2 flex flex-col">
      <SidebarAddNewGroup />
      <SidebarTodoGroupsList />
    </div>
  );
};

export default SidebarTodoGroups;
