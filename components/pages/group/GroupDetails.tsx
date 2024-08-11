// actions
import { getGroup } from "@/actions/group";
// constants
import { icons } from "@/constants";
// cmp
import AddTodo from "@/components/shared/todoForm/AddTodo";
import TodosList from "@/components/shared/todos/TodosList";
import ZeroTodosText from "@/components/shared/ZeroTodosText";
import GroupDetailsForm from "./ui/GroupDetailsForm";

const GroupDetails = async ({ id }: { id: string }) => {
  const data = await getGroup(id);

  const group = data.group;

  return (
    <div>
      <GroupDetailsForm
        _id={JSON.parse(JSON.stringify(id))}
        group_name={JSON.parse(JSON.stringify(group?.group_name))}
      />
      {group?.todos?.length === 0 && (
        <ZeroTodosText text={group?.group_name + " tasks"} />
      )}
      <TodosList todos={JSON.parse(JSON.stringify(group?.todos))} />
      <AddTodo
        isGrouped={JSON.parse(JSON.stringify(true))}
        group={JSON.parse(JSON.stringify(group?._id))}
      />
    </div>
  );
};

export default GroupDetails;
