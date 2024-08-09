// cmp
import TodoDetailsPage from "@/components/pages/todo-details/TodoDetailsPage";

const TodoDetails = ({ params: { id } }: { params: { id: string } }) => {
  return <TodoDetailsPage id={id} />;
};

export default TodoDetails;
