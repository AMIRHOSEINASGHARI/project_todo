// actions
import { getGroup } from "@/actions/group";
// cmp
import { Badge } from "@/components/ui/badge";
import AddTodo from "@/components/shared/todoForm/AddTodo";
import TodosList from "@/components/shared/todos/TodosList";
import ZeroTodosText from "@/components/shared/ZeroTodosText";
import GroupDetailsForm from "./ui/GroupDetailsForm";
import DeleteGroup from "./ui/DeleteGroup";

const GroupDetails = async ({ id }: { id: string }) => {
  const data = await getGroup(id);

  const group = data.group;
  const group_all_todos = group?.todos?.length;
  const group_completed_todos = group?.todos?.filter(
    (todo) => todo?.completed
  )?.length;

  return (
    <div>
      <GroupDetailsForm
        _id={JSON.parse(JSON.stringify(id))}
        group_name={JSON.parse(JSON.stringify(group?.group_name))}
      />
      <div className="flex items-center justify-between">
        <Badge
          variant={
            group_completed_todos === group_all_todos ? "green" : "orange"
          }
        >
          {group_completed_todos} of {group_all_todos}
        </Badge>
        <DeleteGroup _id={JSON.parse(JSON.stringify(id))} />
      </div>
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
