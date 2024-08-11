// actions
import { getGroup } from "@/actions/group";
// constants
import { icons } from "@/constants";
// cmp
import AddTodo from "@/components/shared/todoForm/AddTodo";
import TodosList from "@/components/shared/todos/TodosList";

const GroupDetails = async ({ id }: { id: string }) => {
  const data = await getGroup(id);

  const group = data.group;

  return (
    <div>
      <div className="mb-5 flex items-center gap-4">
        <div className="text-[30px]">{icons.menu}</div>
        <h1 className="h2">{group?.group_name}</h1>
      </div>
      <TodosList todos={JSON.parse(JSON.stringify(group?.todos))} />
      <AddTodo
        isGrouped={JSON.parse(JSON.stringify(true))}
        group={JSON.parse(JSON.stringify(group?._id))}
      />
    </div>
  );
};

export default GroupDetails;
