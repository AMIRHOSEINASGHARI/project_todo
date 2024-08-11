// actions
import { getImportantTodos } from "@/actions/todo";
// cmp
import TodosList from "@/components/shared/todos/TodosList";
import ZeroTodosText from "@/components/shared/ZeroTodosText";

const ImportantTodosList = async () => {
  const data = await getImportantTodos();

  const important_todos = data.important_todos;

  if (important_todos.length === 0)
    return <ZeroTodosText text="important and un-completed tasks" />;

  return (
    <section>
      <TodosList
        title={JSON.parse(JSON.stringify("Important"))}
        todos={JSON.parse(JSON.stringify(important_todos))}
      />
    </section>
  );
};

export default ImportantTodosList;
