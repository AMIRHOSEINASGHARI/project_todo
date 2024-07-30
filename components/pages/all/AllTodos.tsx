import AddTodo from "@/components/shared/todoForm/AddTodo";
import AllTodosList from "./ui/AllTodosList";

const AllTodos = () => {
  return (
    <div>
      <AllTodosList />
      <AddTodo />
    </div>
  );
};

export default AllTodos;
