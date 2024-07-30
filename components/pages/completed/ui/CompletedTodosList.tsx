// actions
import { getCompletedTodos } from "@/actions/todo";
import TodosList from "@/components/shared/todos/TodosList";
// cmp
import ZeroTodosText from "@/components/shared/ZeroTodosText";

const CompletedTodosList = async () => {
  const data = await getCompletedTodos();

  const completed_todos = data.completed_todos;

  if (completed_todos.length === 0)
    return <ZeroTodosText text="completed tasks" />;

  return (
    <section>
      <TodosList title="Tasks" todos={completed_todos} />
    </section>
  );
};

export default CompletedTodosList;
