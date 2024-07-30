// cmp
import ImportantTodosList from "./ui/ImportantTodosList";
import AddTodo from "@/components/shared/todoForm/AddTodo";

const ImportantTodos = () => {
  return (
    <div>
      <ImportantTodosList />
      <AddTodo important={true} />
    </div>
  );
};

export default ImportantTodos;
