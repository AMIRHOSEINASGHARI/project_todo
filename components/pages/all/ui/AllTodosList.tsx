// actions
import { getTodos } from "@/actions/todo";
// cmp
import TodosList from "@/components/shared/todos/TodosList";
import ZeroTodosText from "@/components/shared/ZeroTodosText";

const AllTodosList = async () => {
  const data = await getTodos();

  const groups = data.groups;
  const un_grouped_todos = data.un_grouped_todos;

  if (
    groups.every((group) => group.todos.length === 0) &&
    un_grouped_todos?.length === 0
  )
    return <ZeroTodosText text="incompleted tasks" />;

  return (
    <section className="space-y-10">
      <TodosList title="Tasks" todos={un_grouped_todos} />
      {groups?.length !== 0 &&
        groups.map((item) => <TodosList key={item._id} todos={item.todos} />)}
    </section>
  );
};

export default AllTodosList;
