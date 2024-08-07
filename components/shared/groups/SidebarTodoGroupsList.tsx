// actions
import { getGroups } from "@/actions/group";
// constants
import { icons } from "@/constants";
// cmp
import SidebarLink from "../layout/SidebarLink";

const SidebarTodoGroupsList = async () => {
  const data = await getGroups();

  if (data?.code !== 200) return "!";

  const groups = data.groups;

  if (groups?.length === 0) return null;

  return (
    <div className="flex flex-col">
      {groups?.map((group) => (
        <SidebarLink
          key={group?._id}
          image={icons.menu}
          link={`/groups/${group?._id}`}
          title={group?.group_name}
          group_todos={group?.todos?.length}
        />
      ))}
    </div>
  );
};

export default SidebarTodoGroupsList;
