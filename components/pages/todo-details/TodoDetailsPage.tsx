// actions
import { getTodo } from "@/actions/todo";
// cmp
import TodoDetailsForm from "./ui/TodoDetailsForm";

const TodoDetailsPage = async ({ id }: { id: string }) => {
  const data = await getTodo(id);

  return <TodoDetailsForm todo={JSON.parse(JSON.stringify(data?.todo))} />;
};

export default TodoDetailsPage;
